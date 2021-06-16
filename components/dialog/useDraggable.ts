import {useInstance} from 'intact';
import {useDraggable as useBaseDraggable} from '../../hooks/useDraggable';
import {scrollbarWidth} from '../position';
import type {Dialog} from './index';

export function useDraggable() {
    const component = useInstance() as Dialog;
    let x = 0;
    let y = 0;
    let width = 0;
    let height = 0;
    let areaWidth = 0;
    let areaHeight = 0;

    function onStart(e: MouseEvent) {
        const dialog = component.dialogRef.value!;

        x = dialog.offsetLeft - e.clientX;
        y = dialog.offsetTop - e.clientY;
        width = dialog.offsetWidth;
        height = dialog.offsetHeight;

        const body = document.body;
        const html = document.documentElement;
        
        if (!component.get('overlay')) {
            areaWidth = Math.max(body.scrollWidth, html.scrollWidth);
            areaHeight = Math.max(body.scrollHeight, html.scrollHeight);
        } else {
            areaWidth = html.offsetWidth;
            areaHeight = html.offsetHeight;
        }
    }

    function onMove(e: MouseEvent) {
        const style = component.dialogRef.value!.style;
        let _areaWidth = areaWidth;
        if (component.get('overlay')) {
            // detect the wrapper has scrollbar or not
            const wrapper = component.wrapperRef.value!;
            if (wrapper.scrollHeight > wrapper.offsetHeight) {
                const scrollBarWidth = scrollbarWidth();
                _areaWidth -= scrollBarWidth;
            }
        }

        const left = Math.min(
            Math.max(x + e.clientX, 0),
            Math.max(_areaWidth - width, 0)
        );
        const top = Math.min(
            Math.max(y + e.clientY, 0),
            Math.max(areaHeight - height, 0)
        );

        style.left = `${left}px`;
        style.top = `${top}px`;
    }

    return useBaseDraggable({onStart, onMove});
}
