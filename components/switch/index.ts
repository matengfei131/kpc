import {Component, TypeDefs, createRef} from 'intact';
import template from './index.vdt';
import {sizes, Sizes} from '../../styles/utils';
import {bind} from '../utils';
import {useDraggable} from './useDraggable';

export interface SwitchProps {
    name?: string
    on?: string 
    off?: string 
    value?: boolean
    trueValue?: any
    falseValue?: any
    width?: number | string
    height?: number | string
    size?: Sizes
    disabled?: boolean
}

export interface SwitchEvents {
    click: [MouseEvent]
    keypress: [KeyboardEvent]
}

export interface SwitchBlocks {
    off: null
    on: null
}

const typeDefs: Required<TypeDefs<SwitchProps>> = {
    name: String,
    on: String,
    off: String,
    value: null,
    trueValue: null,
    falseValue: null,
    width: [Number, String],
    height: [Number, String],
    size: sizes,
    disabled: Boolean,
};

const defaults = (): Partial<SwitchProps> => ({
    value: false,
    trueValue: true,
    falseValue: false,
    size: 'default',
});

interface MouseEventWithIgnore extends MouseEvent {
    _switchIgnore?: boolean
}

export class Switch extends Component<SwitchProps, SwitchEvents, SwitchBlocks> {
    static template = template;
    static typeDefs = typeDefs;
    static defaults = defaults;

    private elementRef = createRef<HTMLElement>();
    private draggable = useDraggable(this.elementRef);

    @bind
    private onClick(e: MouseEventWithIgnore) {
        if (!e._switchIgnore) {
            this.toggle(false);
        }
        this.trigger('click', e);
    }

    @bind
    private onClickOnHandle(e: MouseEventWithIgnore) {
        // we can not stop propagation, otherwise the click can not be listen at outer
        e._switchIgnore = true;
    }

    @bind
    private onKeypress(e: KeyboardEvent) {
        this.trigger('keypress', e);
        if (e.keyCode === 13) {
            this.toggle(true);
        }
    }

    public toggle(isKeypress: boolean) {
        if (this.get('disabled')) return;

         // if is not keypress, we blur it to remove focus style
         if (!isKeypress) {
             this.elementRef.value!.blur();
         }

         if (this.isChecked()) {
             this.uncheck();
         } else {
             this.check();
         }
    }

    public isChecked() {
        return this.get('value') === this.get('trueValue');
    }

    public check() {
        this.set('value', this.get('trueValue'));
    }

    public uncheck() {
        this.set('value', this.get('falseValue'));
    }
}
