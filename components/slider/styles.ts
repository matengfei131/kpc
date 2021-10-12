import {css} from '@emotion/css';
import {deepDefaults, sizes, palette} from '../../styles/utils';
import {theme} from '../../styles/theme';
import '../../styles/global';

const {slider} = deepDefaults(theme, {
    slider: {
        height: '4px',
        bgColor: '#eaeef2',
        get barColor() { return theme.color.primary },
        margin: '14px 0',
        padding: '14px',
        borderRadius: '7px',

        handleHeight: 12,
        handleWidth: 12,
        get handleBorder() { return '2px solid ' + theme.color.primary; },
        handleBorderRadius: '50%',
        handleBgColor: '#fff',
        handleHoverTransform: 'scale(1.5)',
        get handleHoverBgColor() { return theme.color.primary },
        handleDisabledBgColor: '#fff',

        boxPadding: '10px 2px 0',
        get disabledColor() { return theme.color.disabled; },
        get disabledBgColor() { return theme.color.disabledBorder; },
        spinnerWidth: '135px',

        stopPointWidth: '7px', 
        stopPointHeight: '7px',
        stopPointBgColor: '#fff',

        marksHeight: '26px',
        get marksActiveColor() { return theme.color.primary },
        transition: '.25s ease-in-out',
        dropdownMenuZIndex: 1
    }
});

export default function makeStyles() {
    return css`
        position: relative;
        outline: none;
        display: inline-block;
        width: 100%;
        .k-bar-wrapper {
            cursor: pointer;
            padding: ${slider.margin};
        }
        .k-slider-wrapper {
            .k-wrapper {
                height: ${slider.height};
                background-color: ${slider.bgColor};
                border-radius: ${slider.borderRadius};
                position: relative;
                user-select: none;
            }
            .k-box {
                :last-child {
                    float: right;
                }
                span {
                    cursor: pointer;
                }
            }
            .k-bar {
                background-color: ${slider.barColor};
                position: absolute;
                height: 100%;
                border-radius: ${slider.borderRadius};
                transition: all ${slider.transition};
            }
            .k-handle-wrapper {
                position: absolute;
                top: -95%;
                transition: left ${slider.transition};
                z-index: 1;
            }
            .k-handle {
                height: ${slider.handleHeight + 'px'};
                width: ${slider.handleWidth + 'px'};
                text-align: center;
                transition: all ${slider.transition};
                border: ${slider.handleBorder};
                border-radius: ${slider.handleBorderRadius};
                background-color: ${slider.handleBgColor};
                transition: all ${slider.transition};
                outline: none;
                z-index: ${slider.dropdownMenuZIndex} + 1;
                position: relative;
                &:hover
                &:focus {
                    transform: ${slider.handleHoverTransform};
                    cursor: grab;
                    background-color: ${slider.handleHoverBgColor};
                }
            }
        }
            
        &.k-show-input {
            .k-slider-wrapper {
                margin-right: ${slider.spinnerWidth};
            }
        }

        .k-spinner-wrapper {
            position: absolute;
            top: 0;
            right: 0;
        }

        &.k-dragging {
            .k-bar {
                transition: none;
            }
            .k-handle-wrapper {
                transition: none;
            }
            .k-handle.k-active {
                cursor: grabbing;
                transform: ${slider.handleHoverTransform};
                background-color: ${slider.handleHoverBgColor};
            }
        }

        &.k-disabled {
            .k-wrapper {
                cursor: not-allowed;
            }
            .k-bar {
                background-color: disabled-color;
            }
            .k-handle {
                border-color: disabled-color;
                &:hover
                &:focus {
                    background-color: ${slider.handleDisabledBgColor};
                    cursor: not-allowed;
                    transform: none;
                }
            }
        }
            
        .k-point {
            position: absolute;
            top: 0;
            width: ${slider.stopPointWidth};
            height: ${slider.stopPointHeight};
            background: ${slider.stopPointBgColor};
            //margin-left: -(@width / 2);
        }
            
        .k-marks {
            position: relative;
            height: ${slider.marksHeight};
            > span {
                position: absolute;
                transform: translateX(-50%);
                white-space: nowrap;
                cursor: pointer;
                &:first-child {
                    transform: none;
                }
                &:last-child {
                    transform: translateX(-100%);
                }
                &.k-active {
                    color: ${slider.marksActiveColor};
                }
            }
        }
            
        .k-handle-wrapper {
            .k-tooltip-content {
                white-space nowrap
            }
        }
    `;
}
