import _Object$assign from "@babel/runtime-corejs3/core-js/object/assign";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js/instance/map";
import _sliceInstanceProperty from "@babel/runtime-corejs3/core-js/instance/slice";
import CollapseItem from './item';
import { mapChildren, getRestProps } from '../utils';
export default function (obj, _Vdt, blocks, $callee) {
  var _classNameObj;

  _Vdt || (_Vdt = Vdt);
  obj || (obj = {});
  blocks || (blocks = {});

  var h = _Vdt.miss.h,
      hc = _Vdt.miss.hc,
      hu = _Vdt.miss.hu,
      widgets = this && this.widgets || {},
      _blocks = {},
      __blocks = {},
      __u = _Vdt.utils,
      extend = __u.extend,
      _e = __u.error,
      _className = __u.className,
      __slice = _sliceInstanceProperty(__u),
      __noop = __u.noop,
      __m = _mapInstanceProperty(__u),
      __o = __u.Options,
      _getModel = __o.getModel,
      _setModel = __o.setModel,
      _setCheckboxModel = __u.setCheckboxModel,
      _detectCheckboxChecked = __u.detectCheckboxChecked,
      _setSelectModel = __u.setSelectModel,
      self = this.data,
      $this = this,
      scope = obj,
      Animate = self && self.Animate,
      parent = ($callee || {})._super;

  var _self$get = self.get(),
      className = _self$get.className,
      value = _self$get.value,
      children = _self$get.children,
      arrow = _self$get.arrow,
      noBorder = _self$get.noBorder;

  var classNameObj = (_classNameObj = {
    'k-collapse': true
  }, _classNameObj[className] = className, _classNameObj['k-left'] = arrow === 'left', _classNameObj['k-border'] = !noBorder, _classNameObj);
  var index = 0;

  var _children = mapChildren(children, function (vNode) {
    if (vNode.tag === CollapseItem) {
      var props = vNode.props;
      var _props = {
        _parent: self
      };

      if (props.value == null) {
        _props.value = "$" + index++;
      }

      vNode.props = _Object$assign({}, props, {}, _props);
      vNode.$ = true;
    }

    return vNode;
  });

  return h('div', _Object$assign({}, function () {
    try {
      return getRestProps(self);
    } catch (e) {
      _e(e);
    }
  }.call($this)), function () {
    try {
      return _children;
    } catch (e) {
      _e(e);
    }
  }.call($this), _className(function () {
    try {
      return classNameObj;
    } catch (e) {
      _e(e);
    }
  }.call($this)));
}