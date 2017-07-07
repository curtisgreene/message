'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _splitReactElement = require('./splitReactElement');

var _splitReactElement2 = _interopRequireDefault(_splitReactElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (element) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'start';

  if (_react2.default.isValidElement(element) && _react2.default.Children.count(element.props.children) === 0) {
    return (0, _splitReactElement2.default)(element)[type].length;
  }

  if ((typeof element === 'undefined' ? 'undefined' : _typeof(element)) === 'object') {
    return element[type] ? element[type].length : 0;
  }

  return 0;
};