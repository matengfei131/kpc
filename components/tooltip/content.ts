import {createRef, Children, VNode} from 'intact';
import {
    DropdownMenu,
    DropdownMenuProps,
    DropdownMenuEvents,
    DropdownMenuBlocks,
} from '../dropdown/menu';
import template from './content.vdt';
import {bind} from '../utils';
import {Tooltip} from './tooltip';
import {useArrow} from './useArrow';

export interface TooltipContentProps extends DropdownMenuProps { } 
export interface TooltipContentEvents extends DropdownMenuEvents { }
export interface TooltipContentBlocks extends DropdownMenuBlocks {
    buttons: null
}

export class TooltipContent extends DropdownMenu<
    TooltipContentProps,
    TooltipContentEvents,
    TooltipContentBlocks
> {
    static template = template;

    private isEmptyChildren: boolean = true;
    private arrow = useArrow();

    init() {
        super.init();

        this.on('$receive:children', (vNodes: Children) => {
            this.isEmptyChildren = isEmptyChildren(vNodes);
        });
    }

    @bind
    private onEnter() {
        this.dropdown!.position();
    }

    @bind
    protected onMouseEnter(e: MouseEvent) {
        const dropdown = this.dropdown as Tooltip; 
        if (dropdown.get('hoverable')) {
            dropdown!.show();
        }
        dropdown.trigger('mouseenter', e);
    }

    @bind
    private ok() {
        const dropdown = this.dropdown as Tooltip; 
        dropdown.hide(true);
        dropdown.trigger('ok');
    }

    @bind
    private cancel() {
        const dropdown = this.dropdown as Tooltip; 
        dropdown.hide(true);
        dropdown.trigger('cancel');
    }
}

function isEmptyChildren(vNodes: Children): boolean {
    if (!vNodes) return true;
    if (Array.isArray(vNodes)) {
        return vNodes.every(vNode => isEmptyChildren(vNode));
    }
    if ((vNodes as VNode).type === 1) {
        return !(vNodes as VNode).children;
    }

    return false;
};
