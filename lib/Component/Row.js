'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by BG236557 on 2016/5/27.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var TreeRow = function (_Component) {
    _inherits(TreeRow, _Component);

    function TreeRow(props) {
        _classCallCheck(this, TreeRow);

        return _possibleConstructorReturn(this, (TreeRow.__proto__ || Object.getPrototypeOf(TreeRow)).call(this, props));
    }

    _createClass(TreeRow, [{
        key: 'cellRender',
        value: function cellRender() {
            var output = [];
            var _props = this.props;
            var data = _props.data;
            var cols = _props.cols;
            var isKey = _props.isKey;
            var checked = _props.checked;
            var isSelect = _props.isSelect;
            var selectRow = _props.selectRow;
            var hideSelectColumn = _props.hideSelectColumn;


            var _key = data[isKey];

            if (isSelect && !hideSelectColumn) {
                output.push(_react2.default.createElement(
                    'td',
                    { key: _key, style: { backgroundColor: checked && selectRow.bgColor, textAlign: 'center' } },
                    _react2.default.createElement('input', { type: selectRow.mode, checked: checked, readOnly: true })
                ));
            }

            cols.map(function (key, i, col) {

                var cell = data[key.id];
                var dataFormat = key.dataFormat;

                var style = {
                    width: key.width,
                    maxWidth: key.width,
                    textAlign: key.dataAlign,
                    display: key.hidden && 'none',
                    backgroundColor: isSelect && checked && selectRow.bgColor
                };

                if (dataFormat) {
                    cell = dataFormat.call(null, data[key.id], data, i, col);
                }

                output.push(_react2.default.createElement(
                    'td',
                    { style: style,
                        key: '' + _key + i
                    },
                    cell
                ));
            });
            return output;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props;
            var data = _props2.data;
            var hover = _props2.hover;
            var checked = _props2.checked;
            var isSelect = _props2.isSelect;
            var selectRow = _props2.selectRow;
            var hoverStyle = _props2.hoverStyle;
            var onMouseOut = _props2.onMouseOut;
            var onMouseOver = _props2.onMouseOver;

            return _react2.default.createElement(
                'tr',
                { style: hover ? hoverStyle : {},
                    onMouseOut: onMouseOut, onMouseOver: onMouseOver,
                    onClick: isSelect ? function () {
                        return selectRow.onSelect(!checked, data);
                    } : function () {
                        return false;
                    }
                },
                this.cellRender()
            );
        }
    }]);

    return TreeRow;
}(_react.Component);

exports.default = TreeRow;


TreeRow.defaultProps = {
    hideSelectColumn: false
};