import {Component, TypeDefs} from 'intact';
import template from './index.vdt';
import {BaseSelect, BaseSelectProps} from '../select/base';
import {_$} from '../../i18n';
import {isNullOrUndefined} from 'intact-shared';
import {useValue} from './useValue';
import {useLabel} from './useLabel';
import {useLoad} from './useLoad';
import {useFilterable} from './useFilterable';

export interface CascaderProps extends BaseSelectProps {
    data?: CascaderData[]
    trigger?: 'click' | 'hover'
    changeOnSelect?: boolean
    format?: (labels: string[]) => string
    loadData?: (data: CascaderData) => CascaderData[]
    filter?: (keywords: string, data: CascaderData) => boolean,
}

export type CascaderData = {
    value: any
    label: string
    disabled?: boolean
    loaded?: boolean
    children?: CascaderData[]
}

const typeDefs: Required<TypeDefs<CascaderProps>> = {
    ...BaseSelect.typeDefs,
    data: Array,
    trigger: ['click', 'hover'],
    changeOnSelect: Boolean,
    format: Function,
    loadData: Function,
    filter: Function,
}

const defaults = (): Partial<CascaderProps> => ({
    ...BaseSelect.defaults(),
    data: [],
    trigger: 'click',
    format: (labels: string[]) => labels.join(' / '),
    filter: (keywords: string, data: CascaderData) => data.label.includes(keywords),
});

export class Cascader extends BaseSelect<CascaderProps> {
    static template = template;
    static typeDefs = typeDefs;
    static defaults = defaults;

    private value = useValue();
    private label = useLabel();
    private load = useLoad();
    private filterable = useFilterable(this.input.keywords, this.value.setValue);
    private positionObj = {my: 'left top', at: 'right top', collisionDirection: ['left']};

    protected getPlaceholder() {
        const {placeholder, filterable} = this.get();

        return isNullOrUndefined(placeholder) ?
            filterable ? _$('请输入或选择') : _$('请选择') :
            placeholder;
    }

    protected getLabel() {
        return this.label.getLabel();
    }
}
