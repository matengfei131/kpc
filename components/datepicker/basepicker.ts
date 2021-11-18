/**
 * The base hook for handling value of Datepicker and Timepicker
 */
import {useInstance, Component, TypeDefs} from 'intact';
import {useState, watchState, State} from '../../hooks/useState';
import dayjs, {Dayjs, OpUnitType} from './dayjs';
import {findValueIndex} from './helpers';
import type {useFormats} from './useFormats';
import type {useDisabled} from './useDisabled';
import {isEqualArray, last, bind} from '../utils';
import {PanelTypes, PanelFlags, usePanel} from './usePanel';
import {BaseSelect, BaseSelectProps, BaseSelectEvents, BaseSelectBlocks} from '../select/base';

export type StateValueRange = [Dayjs, Dayjs?];
export type StateValueItem = Dayjs | StateValueRange;
export type StateValue = StateValueItem[]

export type StringValue = string | string[] | [string, string] | [string, string][]
export type DayjsValueRange = [Dayjs, Dayjs]
export type DayjsValueItem = Dayjs | DayjsValueRange
export type DayjsValue = DayjsValueItem[]

export interface BasePickerProps<Value> extends BaseSelectProps {
    value?: Value | Value[] | [Value, Value] | [Value, Value][] | null
    range?: boolean
    format?: string
    valueFormat?: string
    showFormat?: string
    min?: Value
    max?: Value
    disabledDate?: (v: Value) => boolean
}

export interface BasePickerEvents extends BaseSelectEvents { }

export interface BasePickerBlocks extends BaseSelectBlocks { }

export type Value = string | Date | number | Dayjs;

const typeDefs: Required<TypeDefs<BasePickerProps<Value>>> = {
    ...BaseSelect.typeDefs,
    value: [String, Array, Date, Number, dayjs.Dayjs],
    range: Boolean,
    format: String,
    valueFormat: String,
    showFormat: String,
    min: [String, Date, Number, dayjs.Dayjs],
    max: [String, Date, Number, dayjs.Dayjs],
    disabledDate: Function,
};

const defaults = (): Partial<BasePickerProps<any>> => ({
    ...BaseSelect.defaults(),
    filterable: true,
});

export abstract class BasePicker<
    T extends BasePickerProps<any> = BasePickerProps<any>,
    E extends BasePickerEvents = BasePickerEvents,
    B extends BasePickerBlocks = BasePickerBlocks,
> extends BaseSelect<T, E, B> {
    static typeDefs = typeDefs;
    static defaults = defaults;

    public abstract value: ReturnType<typeof useValue>
    public abstract formats: ReturnType<typeof useFormats>

    @bind
    public resetKeywords(keywords: State<string>) {
        const {multiple, range} = this.get();
        const dayjsValue = this.value.getDayjsValue();
        const {getShowString} = this.formats;
        const value = last(dayjsValue);

        keywords.set(
            multiple ?  '' : !range ?
                value ? getShowString(value as Dayjs) : '' :
                value ? [
                    getShowString((value as DayjsValueRange)[0]),
                    getShowString((value as DayjsValueRange)[1]),
                ].join(' ~ ') : ''
        );
    }
}

export function useValue(
    {
        createDateByValueFormat,
        createDateByShowFormat,
        getShowString,
        getValueString,
    }: ReturnType<typeof useFormats>,
    {isDisabled}: ReturnType<typeof useDisabled>,
    panel: ReturnType<typeof usePanel>,
    shouldUpdateValue: (v: StateValueItem) => boolean,
    updateValueOnInput: (v: DayjsValueItem) => void,
    getEqualType: () => OpUnitType,
) {
    // Normalize the value to multipe values, no matter it's multipe or not
    const value = useState<StateValue>([]);
    const instance = useInstance() as BasePicker<BasePickerProps<Value>>;
    let dayjsValue: DayjsValue = [];

    instance.watch('value', (newValue, oldValue) => {
        if (isEqualArray(newValue, oldValue)) return;
        dayjsValue = convertToDayjs(newValue);
        value.set(dayjsValue.slice());
        // should update keywords
        instance.resetKeywords(instance.input.keywords);
    });

    watchState(instance.input.keywords, v => {
        const range = instance.get('range');
        if (range) {
            const [start, end] = v.split(/\s*~\s*/).map(s => s.trim());
            if (start && end) {
                const startDate = createDateByShowFormat(start);
                if (!isValidDate(startDate)) {
                    return;
                }
                const endDate = createDateByShowFormat(end);
                if (!isValidDate(endDate)) {
                    return;
                }
                if (endDate.isAfter(startDate)) {
                    updateValueOnInput([startDate, endDate]);
                }
            }
        } else {
            const date = createDateByShowFormat(v);
            if (isValidDate(date)) {
                updateValueOnInput(date);
            }
        }
    });

    function convertToDayjs(v: BasePickerProps<Value>['value']): DayjsValue {
        if (!v || Array.isArray(v) && !v.length) return [];

        const {multiple} = instance.get();
        if (!multiple) {
            v = [v] as any;
        }
        return (v as (Value | [Value, Value])[]).map(value => {
            if (Array.isArray(value)) {
                // range
                return value.map(createDateByValueFormat);
            }
            return createDateByValueFormat(value);
        }) as DayjsValue;
    }

    function convertToValueString(v: DayjsValue): StringValue | null {
        const results = v.map(value => {
            if (Array.isArray(value)) {
                return value.map(getValueString);
            }
            return getValueString(value);
        });

        if (!instance.get('multiple')) {
            return results[0] || null;
        }
        return results as StringValue;
    }

    function format(): string | string[] {
        const results = dayjsValue.map(value => {
            if (Array.isArray(value)) {
                return value.map(getShowString).join(' ~ ');
            }
            return getShowString(value);
        });

        if (!instance.get('multiple')) {
            return results[0];
        }
        return results;
    }

    function setSingleDate(v: StateValueItem, fromInput: boolean) {
        const {range}  = instance.get();
        value.set([v]);
        if (fromInput || shouldUpdateValue(v)) {
            updateValue();
        }
    }

    function addMultipeDate(v: StateValueItem, fromInput: boolean) {
        const {range} = instance.get();
        let _value = value.value as StateValueItem[];
        _value = !_value ? [] : _value.slice();

        if (range && (v as StateValueRange).length === 2) {
            // pop the last value firstly, if it only has the start date 
            const lastValue = last(_value);
            if (lastValue && (lastValue as StateValueRange).length < 2) {
                _value.pop();
            }
        }

        let _shouldUpdateValue = true;
        if (fromInput || shouldUpdateValue(v)) {
            // if select the date/year/month, then toggle the value.
            // if from input, treat the value as the final value
            const index = findValueIndex(_value, v, getEqualType());
            if (index > -1) {
                _value.splice(index, 1);
            } else {
                _value.push(v);
            }
        } else {
            // select the datetime, only push the value,
            // and unique the array on click confrim button
            _value.push(v); 
            _shouldUpdateValue = false;
        }

        value.set(_value);

        if (_shouldUpdateValue) {
            updateValue();
        }
    }

    function setValue(v: StateValueItem, fromInput: boolean) {
        const multiple = instance.get('multiple');
        if (multiple) {
            addMultipeDate(v, fromInput);
        } else {
            setSingleDate(v, fromInput);
        }
    }

    function updateValue() {
        const _value = value.value as DayjsValue;
        const valueStr = convertToValueString(_value); 
        instance.set('value', valueStr);
        instance.resetKeywords(instance.input.keywords);
    }

    function onConfirm() {
        // unique
        if (!instance.get('multiple')) {
            instance.hide();
        } else {
            unique();
            panel.reset();
        }
        updateValue();
    }

    function unique() {
        const _value = value.value;
        const map: Record<string, true> = {};
        const results: StateValue = [];
        _value.forEach(value => {
            let key: string;
            if (Array.isArray(value)) {
                key = (value as DayjsValueRange).map(getValueString).join(' ~ ');
            } else {
                key = getValueString(value);
            }
            if (!map[key]) {
                map[key] = true;
                results.push(value);
            }
        });

        value.set(results);
    }

    function isValidDate(date: Dayjs) {
        return date.isValid() && !isDisabled(date);
    }

    function onChangeTime(date: Dayjs, flag: PanelFlags) {
        const {range} = instance.get();
        const values = value.value.slice();
        const lastIndex = values.length - 1;
        let _value: StateValueItem = date;

        if (range) {
            _value = (values as DayjsValueRange[])[lastIndex].slice() as DayjsValueRange;
            _value[flag] = date;
        }

        values[lastIndex] = _value;
        value.set(values);
    }

    function getTimeValue(flag: PanelFlags): Dayjs | null | undefined {
        const _value = value.value;
        if (!_value.length) return null;

        const {range} = instance.get();
        const lastValue = last(_value);

        if (range) {
            return (lastValue as StateValueRange)[flag];
        }
        return lastValue as Dayjs;
    }

    function getDayjsValue() {
        return dayjsValue;
    }

    return {
        value,
        format,
        onConfirm,
        onChangeTime,
        getTimeValue,
        setValue,
        convertToDayjs,
        getDayjsValue,
    };
}
