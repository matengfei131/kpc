import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import _Reflect$construct from "@babel/runtime-corejs3/core-js/reflect/construct";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js/object/get-own-property-descriptor";
import _Object$assign from "@babel/runtime-corejs3/core-js/object/assign";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/getPrototypeOf";
import _inheritsLoose from "../../inheritsLoose";
import _defineProperty from "@babel/runtime-corejs3/helpers/defineProperty";
import _applyDecoratedDescriptor from "@babel/runtime-corejs3/helpers/applyDecoratedDescriptor";

var _dec, _class, _init, _class2, _temp;

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(_Reflect$construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import Intact from 'intact-vue';
import template from './index.vdt';
import Dialog from '../dialog';
import { findParentComponent } from '../utils';
import './index.css';
var Drawer = (_dec = Intact.template(), (_class = (_temp = _class2 = /*#__PURE__*/function (_Dialog) {
  _inheritsLoose(Drawer, _Dialog);

  var _super = _createSuper(Drawer);

  function Drawer() {
    return _Dialog.apply(this, arguments) || this;
  }

  var _proto = Drawer.prototype;

  _proto.defaults = function defaults() {
    return _Object$assign({}, _Dialog.prototype.defaults.call(this), {
      placement: 'right'
    });
  };

  _proto._center = function _center() {};

  _proto._dragStart = function _dragStart(e) {};

  return Drawer;
}(Dialog), _defineProperty(_class2, "template", template), _defineProperty(_class2, "propTypes", _Object$assign({}, Dialog.propTypes, {
  placement: String
})), _temp), (_applyDecoratedDescriptor(_class, "template", [_dec], (_init = _Object$getOwnPropertyDescriptor(_class, "template"), _init = _init ? _init.value : undefined, {
  enumerable: true,
  configurable: true,
  writable: true,
  initializer: function initializer() {
    return _init;
  }
}), _class)), _class));
export { Drawer as default };
export { Drawer };