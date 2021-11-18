import {Component, TypeDefs} from 'intact';
import template from './item.vdt';
import {Sizes, sizes} from '../../styles/utils';
import {Types, types} from './styles';

export interface TimelineItemProps {
    type?: Types
    size?: Sizes
}

export interface TimelineItemEvents { }

export interface TimelineItemBlocks {
    dot: null
}

const typeDefs: Required<TypeDefs<TimelineItemProps>> = {
    type: types,
    size: sizes,
};

const defaults = (): Partial<TimelineItemProps> => ({
    type: 'primary',
    size: 'default',
})

export class TimelineItem extends Component<TimelineItemProps, TimelineItemEvents, TimelineItemBlocks> {
    static template = template;
    static typeDefs = typeDefs;
    static defaults = defaults;
}
