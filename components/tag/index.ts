import {Component, TypeDefs} from 'intact';
import {bind} from '../utils';
import template from './index.vdt';
import {sizes} from '../../styles/utils';

export interface TagProps {
    type: 'default' | 'primary' | 'danger' | 'success' | 'warning',
    closable: boolean,
    closed: boolean,
    disabled: boolean,
    size: string
}

const typeDefs: Required<TypeDefs<TagProps>> = {
    type: ['default', 'primary', 'danger', 'success', 'warning'],
    closable: Boolean,
    closed: Boolean,
    disabled: Boolean,
    size: sizes
};

const defaults = (): Partial<TagProps> => ({
    type: 'default',
    size: 'default',
});

export default class Tag<T extends TagProps = TagProps> extends Component<T> {
    static template = template;
    static typeDefs = typeDefs;
    static defaults = defaults;

    @bind
    private onClose(e: MouseEvent): void {
        e.stopPropagation();
        this.trigger('close', e);
    }
}

export {Tag};
