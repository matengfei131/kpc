import "core-js/modules/es.number.constructor";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import _Reflect$construct from "@babel/runtime-corejs3/core-js/reflect/construct";
import _Object$assign from "@babel/runtime-corejs3/core-js/object/assign";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/getPrototypeOf";
import _inheritsLoose from "../../../inheritsLoose";
import _defineProperty from "@babel/runtime-corejs3/helpers/defineProperty";

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(_Reflect$construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import { DShape } from './shape';
export var DRectangle = /*#__PURE__*/function (_DShape) {
  _inheritsLoose(DRectangle, _DShape);

  var _super = _createSuper(DRectangle);

  function DRectangle() {
    return _DShape.apply(this, arguments) || this;
  }

  var _proto = DRectangle.prototype;

  _proto.defaults = function defaults() {
    return _Object$assign({}, _DShape.prototype.defaults.call(this), {
      width: 120,
      height: 60,
      rounded: 0
    });
  };

  _proto._getStylesheet = function _getStylesheet() {
    var _this$get = this.get(),
        rounded = _this$get.rounded;

    return "rounded=" + (+rounded ? 1 : 0) + ";whiteSpace=wrap;html=1;arcSize=" + rounded;
  };

  return DRectangle;
}(DShape);

_defineProperty(DRectangle, "displayName", 'DRectangle');

_defineProperty(DRectangle, "propTypes", _Object$assign({}, DShape.propTypes, {
  rounded: [Number, String]
}));