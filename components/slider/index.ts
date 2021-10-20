import {Component, TypeDefs} from 'intact';
import template from './index.vdt';
import {minMaxStep, bind} from '../utils';
import step from '~/components/slider/demos/step';

export interface SliderProps {
    max: Number,
    min: Number,
    value: [Number, Array],
    isRange: Boolean,
    unit: String,
    isShowEnd: Boolean,
    isShowInput: Boolean,
    step: [Number, Object, Function],
    isShowStop: Boolean,
    marks: Object,
    disabled: Boolean,
    showTooltip: Boolean,
    always: Boolean,
    animate: Boolean,
    tooltipProps: Object,

    _sliderValue: Number,
    _inputValue: Number,
    _isDragging: Boolean,
    _isFirst: Boolean,
    _isSecond: Boolean
}

const typeDefs: Required<TypeDefs<SliderProps>> = {
    max: Number,
    min: Number,
    value: [Number, Array],
    isRange: Boolean,
    unit: String,
    isShowEnd: Boolean,
    isShowInput: Boolean,
    step: [Number, Object, Function],
    isShowStop: Boolean,
    marks: Object,
    disabled: Boolean,
    showTooltip: Boolean,
    always: Boolean,
    animate: Boolean,
    tooltipProps: Object,

    _sliderValue: Number,
    _inputValue: Number,
    _isDragging: Boolean,
    _isFirst: Boolean,
    _isSecond: Boolean
};

const defaults = (): Partial<SliderProps> => ({
    max: 100,
    min: 0,
    value: undefined,
    isRange: false,
    unit: '',
    isShowEnd: true,
    isShowInput: true,
    step: 1,
    isShowStop: false,
    marks: undefined,
    disabled: false,
    showTooltip: false,
    always: false,
    animate: true,
    tooltipProps: undefined,

    _sliderValue: 0,
    _inputValue: 0,
    _isDragging: false,
    _isFirst: false,
    _isSecond: false,
});

function isEqual(v1:any, v2:any) {
    return JSON.stringify(v1) === JSON.stringify(v2);
}

export default class Slider <T extends SliderProps = SliderProps> extends Component<T> {
    static template = template;
    static typeDefs = typeDefs;
    static defaults = defaults;

    static events = {
        change: true,
    };

    static blocks = ['tooltip'];

    @bind
    private _getStep(i) {
        let step = this.get('step');
        if (Object.prototype.toString.call(step) === '[object Object]') {
            let keys = Object.keys(step);
            for (let j = 0; j < keys.length; j++) {
                if (keys[j] <= i && i < keys[j+1]) {
                    return step[Number(keys[j])];
                }
                else if (i < keys[0]) {
                    return step[Number(keys[0])];
                }
                else if (i >= keys[keys.length-1]) {
                    return step[Number(keys[keys.length-1])];
                }
            }
        } else {
            return step;
        }
    }

    @bind
    private _setFixedValue(value, isFromSpinner) {
        const fixedValue = this._getFixedValue(value);
        this.set({
            value: fixedValue,
            _inputValue: isFromSpinner ? value : fixedValue,
            _sliderValue: fixedValue,
        });
    }

    @bind
    private _getFixedValue(value) {
        let {min, isRange} = this.get();

        let fixedValue;
        if (isRange) {
            if (!Array.isArray(value)) {
                fixedValue = [min, min];
            } else {
                fixedValue = [this._fix(value[0]), this._fix(value[1])];
            }
        } else {
            fixedValue = this._fix(value);
        }

        return fixedValue;
    }

    @bind
    private _fix(v) {
        let {max} = this.get();
        const [step, min] = this._getStep(v);

        if (min > max) {
            //Intact.utils.error(new Error(`[Slider] min must less than or equal to max, but got min: ${min} max: ${max}`));
            return 0;
        }

        if (Number.isNaN(Number(v))) return min;
        return minMaxStep(v, min, max, step);
    }

    @bind
    private _clickWrapper(e) {
        if (!this || this.get('disabled') || this.get('_isDragging')) return;

        let currentPosition = e.clientX;
        let newValue = this._getSlidingValue(currentPosition);
        if (this.get('isRange')) {
            newValue = this._generateRangeValue(newValue);
        }

        this._setFixedValue(newValue);
    }

    @bind
    private _generateRangeValue(v) {
        const [min, max] = this.get('value');
        if (Math.abs(min - v) <= Math.abs(max - v)) {
            return [v, max];
        } else {
            return [min, v];
        }
    }

    @bind
    private _getSlidingValue(pos) {
        const rect = this.$slider.getBoundingClientRect();
        const percent = (pos - rect.left) / rect.width;
        const {max, min} = this.get();
        const sliderWidth = max - min;

        if (percent <= 0 ) {
            return min;
        } else if (percent >= 1) {
            return max;
        } else {
            return min + sliderWidth * percent;
        }
    }

    @bind
    private onDrag(indexFlag, e) {
        if (this.get('disabled')) return;

        this._isDragging = true;

        // when start drag, the element has been focusin
        // so we need not handle it here

        this.__onRangeSliding = this._onRangeSliding.bind(this, indexFlag);
        this.__onRangeSlideEnd = this._onRangeSlideEnd.bind(this, indexFlag);
        window.addEventListener('mousemove', this.__onRangeSliding);
        window.addEventListener('mouseup', this.__onRangeSlideEnd);
    }

    @bind
    private _onRangeSliding(indexFlag, e){
        let tempValue = this._getSlidingValue(e.clientX, this.get('_isDragging'));
        let fixedValue;

        tempValue = this._getTempValue(
            tempValue, indexFlag,
            this._min, this._max,
            indexFlag === '_isFirst'
        );

        fixedValue = this._getFixedValue(tempValue);

        this.set({
            value: fixedValue,
            _inputValue: fixedValue,
            _sliderValue: tempValue,
        });
        this._showTooltip();
    }
    
    @bind
    private _showTooltip() {
        if (!this.get('showTooltip')) return;

        const {tooltip1, tooltip2} = this.refs;
        tooltip1.show();
        tooltip1.position();
        if (tooltip2) {
            tooltip2.show();
            tooltip2.position();
        }
    }

    @bind
    private _hideTooltip() {
        const {tooltip1, tooltip2} = this.refs;
        tooltip1.hide();
        if (tooltip2) {
            tooltip2.hide();
        }
    }

    @bind
    private _getTempValue(value, isRange, min, max, isFirst) {
        if (isRange) {
            if (isFirst) {
                return [
                    Math.min(value, max),
                    Math.max(value, max)
                ];
            } else {
                return [
                    Math.min(value, min),
                    Math.max(value, min)
                ]
            }
        }
        return value;
    }

    @bind
    private _onRangeSlideEnd(indexFlag, e){
        if (this.get('_isDragging')) {
            this.set('_isDragging', false, {async: true});
            let newValue = this._getSlidingValue(e.clientX);
            if (indexFlag) {
                if (indexFlag === '_isFirst') {
                    this.$sliderFirstBtn.blur();

                    this.set('_isFirst', false, {async: true});
                    newValue = [
                        Math.min(newValue, this._max),
                        Math.max(newValue, this._max)
                    ];
                } else {
                    this.$sliderSecondBtn.blur();

                    this.set('_isSecond', false, {async: true});
                    newValue = [
                        Math.min(newValue, this._min),
                        Math.max(newValue, this._min)
                    ];
                }
            } else {
                this.$sliderFirstBtn.blur();
            }

            this._setFixedValue(newValue);

            // this.trigger('stop', this.get('value'));
            this._triggerChangeEvent();

            window.removeEventListener('mousemove', this.__onRangeSliding);
            window.removeEventListener('mouseup', this.__onRangeSlideEnd);

            this._isDragging = false;
        }
    }

    @bind
    private _onFocusin(indexFlag, e) {
        if (this.get('disabled')) return;

        // when mouse down the handle will focus too
        // if the focusin is invoked by mousedown for dragging
        // let the handle element blur to ignore keyboard operations
        // but we also need to set the states
        if (this._isDragging) {
            e.target.blur();
        }

        // remain the old value to detect change to trigger change event
        this._oldValue = this.get('value');

        if (this.get('isRange')) {
            const value = this.get('value');
            this._min = value[0];
            this._max = value[1];
            if (indexFlag === '_isFirst') {
                this._initValue = this._min;
                this.set({
                    _isDragging: true,
                    _isFirst: true,
                    _isSecond: false
                });
            } else {
                this._initValue = this._max;
                this.set({
                    _isDragging: true,
                    _isFirst: false,
                    _isSecond: true
                });
            }
        } else {
            this.set('_isDragging', true);
        }
        this._showTooltip();
    }

    @bind
    private _onFocusout(indexFlag) {
        if (this.get('disabled') || this._isDragging) return;

        if (this.get('isRange')) {
            if (indexFlag === '_isFirst') {
                this.set('_isFirst', false, {async: true});
            } else {
                this.set('_isSecond', false, {async: true});
            }
        }

        this.set('_isDragging', false, {async: true});
        this._hideTooltip();
    }

    @bind
    private _onKeydown(indexFlag, e) {
        if (this.get('disabled')) return;

        const value = this.get('value');
        if (e.keyCode === 37) { // left
            const [step] = this._getStep(value, 'decrease');
            this._setValue(indexFlag, -step);
        } else if (e.keyCode === 39) { // right
            const [step] = this._getStep(value, 'increase');
            this._setValue(indexFlag, step);
        }
    }

    // trigger change event when keyup
    @bind
    private _onKeyUp({keyCode}) {
        if (keyCode === 37 || keyCode === 39) {
            this._triggerChangeEvent();
        }
    }

    @bind
    private _triggerChangeEvent() {
        const {value} = this.get();
        if (!isEqual(this._oldValue, value)) {
            this._oldValue = value;
            this.trigger('change', value);
        }
    }

    @bind
    private _setValue(indexFlag, step) {
        const value = this.get('value');

        if (!this.get('isRange')) {
            this._setFixedValue(value + step);
        } else {
            this._initValue += step;
            this._initValue = this._fix(this._initValue);

            let _value = this._getTempValue(
                this._initValue, indexFlag,
                this._min, this._max,
                indexFlag === '_isFirst'
            );

            this._setFixedValue(_value);

            // if overstep the boundary, reverse it
            if (indexFlag === '_isFirst') {
                if (this._initValue > this._max) {
                    this.$sliderFirstBtn.blur();
                    this.$sliderSecondBtn.focus();
                }
            } else if (indexFlag === '_isSecond') {
                if (this._initValue < this._min) {
                    this.$sliderSecondBtn.blur();
                    this.$sliderFirstBtn.focus();
                }
            }
        }
        this._showTooltip();
    }

    @bind
    private _onChange() {
        this.set('_inputValue', this.get('value'));
    }

    @bind
    private _setOneValue(v) {
        if (!this.get('isRange')) {
            this._setFixedValue(v);
        } else {
            this._setFixedValue(this._generateRangeValue(v));
        }
    }

    @bind
    private _stopPropagation(e) {
        /* istanbul ignore next */
        e.stopPropagation();
    }

    @bind
    private _destroy() {
        this._onRangeSlideEnd()
    }
}

export {Slider};
