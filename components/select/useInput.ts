import {
    useInstance,
    nextTick,
    createVNode as h,
    Children,
    VNode,
    VNodeComponentClass,
    directClone,
    createRef,
    Props,
} from 'intact';
import {useState, State} from '../../hooks/useState';
import type {Select, SelectProps} from './select';
import {Option, OptionProps} from './option';
import {OptionGroup, OptionGroupProps} from './group';
import {isNullOrUndefined, EMPTY_OBJ, isStringOrNumber} from 'intact-shared';
import {getTextByChildren, mapChildren, isComponentVNode} from '../utils';
import type {Input} from '../input';

export function useInput(resetKeywords: (keywords: State<string>) => void) {
    const component = useInstance() as Select;
    const keywords = useState('');
    const inputRef = createRef<Input>();

    function onInput(value: string) {
        keywords.set(value.trim());

        const dropdown = component.dropdownRef.value!;
        // the position may be flip, and the select input height may change height too,
        // so we should reset the position
        nextTick(() => {
            dropdown.focusFirst();
            dropdown.position();
        });
    }

    // if menu showed and value changed on multiple mode
    // focus the input
    function focusInput() {
        if (component.get('filterable')) {
            inputRef.value!.focus();
        }
    }

    component.on('$changed:_show', show => {
        if (show) {
            focusInput();
            resetKeywords(keywords);
        } else if (component.get('multiple')) {
            resetKeywords(keywords);
        }
    });
    component.on('$changed:value', () => {
        const {multiple, filterable} = component.get();
        if (multiple && filterable) {
            focusInput();
            resetKeywords(keywords);
        }
    });

    return {onInput, keywords, inputRef};
}
