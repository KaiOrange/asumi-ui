'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Row = require('./Row');

var _Row2 = _interopRequireDefault(_Row);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Dropdown = require('../Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _Pagination = require('../Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

var _NestedHeader = require('./NestedHeader');

var _NestedHeader2 = _interopRequireDefault(_NestedHeader);

var _SimplePagination = require('../Pagination/SimplePagination');

var _SimplePagination2 = _interopRequireDefault(_SimplePagination);

var _Util = require('../Util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Elly on 2016/5/26.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * EL Table
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Author: Eleanor Mao
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Table = function (_Component) {
    _inherits(Table, _Component);

    function Table(props) {
        _classCallCheck(this, Table);

        var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

        _this.state = {
            isHover: null,
            order: undefined,
            sortField: undefined,
            data: props.data.slice(),
            currentPage: (props.pagination || props.topPagination) && props.options.page || 1,
            length: (props.pagination || props.topPagination) && props.options.sizePerPage || props.data.length
        };
        return _this;
    }

    _createClass(Table, [{
        key: '_initColumnData',
        value: function _initColumnData(props) {
            var columnData = [];
            _react2['default'].Children.map(props.children, function (column) {
                columnData.push({
                    width: column.props.width,
                    id: column.props.dataField,
                    name: column.props.children,
                    hidden: column.props.hidden,
                    render: column.props.render,
                    colSpan: column.props.colSpan,
                    showArrow: column.props.showArrow,
                    dataAlign: column.props.dataAlign,
                    dataFixed: column.props.dataFixed,
                    dataFormat: column.props.dataFormat
                });
            });
            var sortedData = (0, _Util.sort)(columnData);
            this.columnData = sortedData.sorted;
            this.leftColumnData = sortedData.left;
            this.rightColumnData = sortedData.right;
        }
    }, {
        key: '_getAllValue',
        value: function _getAllValue(data, isKey) {
            var output = [];
            for (var i = 0, len = data.length; i < len; i++) {
                output.push(data[i][isKey]);
            }
            return output;
        }
    }, {
        key: '_getLastChild',
        value: function _getLastChild(data) {
            var unavail = [],
                list = [];
            for (var i = 0, len = data.length; i < len; i++) {
                if (data[i].hidden) {
                    unavail.push(i);
                }
                list.push(i);
            }
            var diffList = (0, _Util.diff)(list, unavail);
            return diffList[diffList.length - 1];
        }
    }, {
        key: '_sliceData',
        value: function _sliceData(data, page, length) {
            return data.slice((page - 1) * length, page * length);
        }
    }, {
        key: '_adjustWidth',
        value: function _adjustWidth(me) {
            var refs = this.refs || me,
                firstRow = refs.colgroup.childNodes,
                cells = refs.thead.refs.thead.childNodes,
                fixedLeftRow = refs.left && refs.left.childNodes,
                fixedRightRow = refs.right && refs.right.childNodes,
                nestedRow = refs.nested && refs.nested.refs.colgroup.childNodes,
                fixedLeftHeadRow = refs.lthead && refs.lthead.refs.colgroup.childNodes,
                fixedRightHeadRow = refs.rthead && refs.rthead.refs.colgroup.childNodes,
                isNoData = refs.tbody.firstChild.childElementCount === 1,
                length = cells.length,
                rightFixedLength = fixedRightRow ? length - fixedRightRow.length : 0;

            if (firstRow.length !== length) return;

            var scrollBarWidth = (0, _Util.getScrollBarWidth)(),
                haveScrollBar = refs.body.offsetWidth !== refs.thead.refs.header.offsetWidth;

            var lastChild = this._getLastChild(this.columnData),
                fixedRightWidth = 0;
            lastChild = this.props.selectRow.mode !== 'none' ? lastChild + 1 : lastChild;

            for (var i = 0; i < length; i++) {
                var cell = cells[i];
                var rightIndex = i - rightFixedLength;
                var computedStyle = getComputedStyle(cell);
                var width = parseFloat(computedStyle.width.replace('px', ''));
                if (!-[1]) {
                    var paddingLeftWidth = parseFloat(computedStyle.paddingLeft.replace('px', ''));
                    var paddingRightWidth = parseFloat(computedStyle.paddingRight.replace('px', ''));
                    var borderRightWidth = parseFloat(computedStyle.borderRightWidth.replace('px', ''));
                    var borderLeftWidth = parseFloat(computedStyle.borderLeftWidth.replace('px', ''));
                    width = width + paddingLeftWidth + paddingRightWidth + borderRightWidth + borderLeftWidth;
                }

                var lastPaddingWidth = -(lastChild === i && haveScrollBar ? scrollBarWidth : 0);

                if (!width) {
                    width = 120;
                    cell.width = width + lastPaddingWidth + 'px';
                }

                var result = (width + lastPaddingWidth).toFixed(2) + 'px';

                if (!isNoData) {
                    firstRow[i].style.width = result;
                    firstRow[i].style.maxWidth = result;
                }

                if (nestedRow && nestedRow[i]) {
                    var display = computedStyle.display;
                    nestedRow[i].style.width = width.toFixed(2) + 'px';
                    nestedRow[i].style.maxWidth = width.toFixed(2) + 'px';
                    if (display === 'none') nestedRow[i].style.display = display;
                }

                if (fixedLeftRow && fixedLeftRow[i]) {
                    fixedLeftRow[i].style.width = result;
                    fixedLeftRow[i].style.maxWidth = result;
                    fixedLeftHeadRow[i].style.width = result;
                    fixedLeftHeadRow[i].style.maxWidth = result;
                }

                if (fixedRightRow && fixedRightRow[rightIndex] && !cell.dataset.input) {
                    fixedRightWidth += width;
                    fixedRightRow[rightIndex].style.width = result;
                    fixedRightRow[rightIndex].style.maxWidth = result;
                    fixedRightHeadRow[rightIndex].style.width = width.toFixed(2) + 'px';
                    fixedRightHeadRow[rightIndex].style.maxWidth = width.toFixed(2) + 'px';
                }
            }

            if (fixedRightWidth) {
                refs.rightBody.style.width = fixedRightWidth - (haveScrollBar ? scrollBarWidth : 0) + 'px';
            }

            if (fixedLeftRow || fixedRightRow) {
                var tbody = refs.tbody.childNodes;
                var ltbody = refs.ltbody && refs.ltbody.childNodes;
                var rtbody = refs.rtbody && refs.rtbody.childNodes;
                var headHeight = getComputedStyle(refs.thead.refs.thead).height;
                if (refs.lthead) refs.lthead.refs.thead.style.height = headHeight;
                if (refs.rthead) refs.rthead.refs.thead.style.height = headHeight;
                for (var _i = 0; _i < tbody.length; _i++) {
                    var row = tbody[_i];
                    var height = getComputedStyle(row).height;
                    if (ltbody && ltbody[_i]) {
                        ltbody[_i].style.height = height;
                        ltbody[_i].style.maxHeight = height;
                    }
                    if (rtbody && rtbody[_i]) {
                        rtbody[_i].style.height = height;
                        rtbody[_i].style.maxHeight = height;
                    }
                }
            }
        }
    }, {
        key: '_scrollHeader',
        value: function _scrollHeader(e) {
            this.refs.thead.refs.header.scrollLeft = e.currentTarget.scrollLeft;
            if (this.refs.nested) this.refs.nested.refs.header.scrollLeft = e.currentTarget.scrollLeft;
        }
    }, {
        key: '_scrollHeight',
        value: function _scrollHeight(e) {
            if (this.refs.leftContainer) {
                this.refs.leftContainer.scrollTop = e.currentTarget.scrollTop;
            }
            if (this.refs.rightContainer && this.refs.leftContainer) {
                this.refs.container.scrollTop = e.currentTarget.scrollTop;
            }
        }
    }, {
        key: '_tryRender',
        value: function _tryRender() {
            var _props = this.props;
            var selectRow = _props.selectRow;
            var nestedHead = _props.nestedHead;

            var warning = 'color:red';

            if (nestedHead.length && (this.leftColumnData.length || this.rightColumnData.length)) {
                console.warn('%c!Warning: Since you set props `nestedHead`, it\'s better not set `dataFixed` in `TreeHeadCol`', warning);
            }
            if (selectRow.mode !== 'none') {
                if (selectRow.mode === 'radio' && selectRow.selected.length > 1) {
                    console.warn('%c!Warning: Since you set `selectRow.mode` to `radio`,' + '`selectRow.selected` should only have one child, if not `TreeTable` will use the first child of `selectRow.selected`', warning);
                }
            }
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            this._initColumnData(this.props);
            this._tryRender();
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this._adjustWidth(this.refs);
            (0, _Util.addEvent)(window, 'resize', this._adjustWidth.bind(this));
            (0, _Util.addEvent)(this.refs.container, 'scroll', this._scrollHeader.bind(this));
            // window.addEventListener('resize', this._adjustWidth.bind(this));
            // this.refs.container.addEventListener('scroll', this._scrollHeader.bind(this));
            if (this.refs.rightContainer) {
                (0, _Util.addEvent)(this.refs.rightContainer, 'scroll', this._scrollHeight.bind(this));
                // this.refs.rightContainer.addEventListener('scroll', this._scrollHeight.bind(this));
            }
            if (this.refs.leftContainer && !this.refs.rightContainer) {
                (0, _Util.addEvent)(this.refs.container, 'scroll', this._scrollHeight.bind(this));
                // this.refs.container.addEventListener('scroll', this._scrollHeight.bind(this));
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            (0, _Util.removeEvent)(window, 'resize', this._adjustWidth.bind(this));
            (0, _Util.removeEvent)(this.refs.container, 'scroll', this._scrollHeader.bind(this));
            // window.removeEventListener('resize', this._adjustWidth.bind(this));
            // this.refs.container.removeEventListener('scroll', this._scrollHeader.bind(this));
            if (this.refs.rightContainer) {
                (0, _Util.removeEvent)(this.refs.rightContainer, 'scroll', this._scrollHeight.bind(this));
                // this.refs.rightContainer.removeEventListener('scroll', this._scrollHeight.bind(this));
            }
            if (this.refs.leftContainer && !this.refs.rightContainer) {
                (0, _Util.removeEvent)(this.refs.container, 'scroll', this._scrollHeight.bind(this));
                // this.refs.container.removeEventListener('scroll', this._scrollHeight.bind(this));
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this._adjustWidth(this.refs);
            if (this.refs.rightContainer) {
                (0, _Util.addEvent)(this.refs.rightContainer, 'scroll', this._scrollHeight.bind(this));
                // this.refs.rightContainer.addEventListener('scroll', this._scrollHeight.bind(this));
            }
            if (this.refs.leftContainer && !this.refs.rightContainer) {
                (0, _Util.addEvent)(this.refs.container, 'scroll', this._scrollHeight.bind(this));
                // this.refs.container.addEventListener('scroll', this._scrollHeight.bind(this));
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this2 = this;

            this._initColumnData(nextProps);

            this.setState(function (prevState) {
                prevState.data = nextProps.data.slice();
                prevState.length = (nextProps.pagination || nextProps.topPagination) && nextProps.options.sizePerPage || nextProps.data.length;
                prevState.currentPage = (nextProps.pagination || nextProps.topPagination) && nextProps.options.page || _this2.state.currentPage;
                return prevState;
            });
        }
    }, {
        key: 'handleSelectAll',
        value: function handleSelectAll(checked) {
            if (checked) {
                this.props.selectRow.onSelectAll(checked, this.state.data.slice());
            } else {
                this.props.selectRow.onSelectAll(checked, []);
            }
        }
    }, {
        key: 'handleSort',
        value: function handleSort(sortField, order) {
            var _this3 = this;

            var _props2 = this.props;
            var remote = _props2.remote;
            var onSortChange = _props2.onSortChange;

            if (remote) {
                onSortChange(sortField, order);
            } else {
                (function () {
                    var data = _this3.state.data.slice();

                    data.sort(function (a, b) {
                        var ValueA = a[sortField];
                        var ValueB = b[sortField];
                        if (order === 'asc') {
                            if (typeof ValueA === 'string') {
                                return ValueA.localeCompare(ValueB);
                            } else {
                                return ValueA < ValueB ? -1 : ValueA > ValueB ? 1 : 0;
                            }
                        } else {
                            if (typeof ValueB === 'string') {
                                return ValueB.localeCompare(ValueA);
                            } else {
                                return ValueB < ValueA ? -1 : ValueB > ValueA ? 1 : 0;
                            }
                        }
                    });

                    _this3.setState(function (prevState) {
                        prevState.data = data;
                        prevState.order = order;
                        prevState.sortField = sortField;
                        return prevState;
                    });

                    onSortChange(sortField, order);
                })();
            }
        }
    }, {
        key: 'handleClick',
        value: function handleClick(page, sizePerPage) {
            this.setState(function (prevState) {
                prevState.currentPage = page;
                return prevState;
            });
            this.props.options.onPageChange(page, sizePerPage);
        }
    }, {
        key: 'handleFlip',
        value: function handleFlip(length) {
            var _props3 = this.props;
            var remote = _props3.remote;
            var options = _props3.options;

            var page = remote ? options.page : this.state.currentPage;
            if (!remote) {
                this.setState(function (prevState) {
                    prevState.length = length;
                    if (!remote && (page - 1) * length > prevState.data.length) {
                        prevState.currentPage = 1;
                    }
                    return prevState;
                });
            }

            options.onPageChange && options.onPageChange(page, length);
            options.onSizePageChange && options.onSizePageChange(length);
        }
    }, {
        key: 'handleHover',
        value: function handleHover(hover) {
            this.setState(function (prevState) {
                prevState.isHover = hover;
                return prevState;
            });
        }
    }, {
        key: 'colgroupRender',
        value: function colgroupRender(data, mode) {
            var output = [];
            if (mode !== 'none') {
                output.push(_react2['default'].createElement('col', { key: 'select', style: { textAlign: 'center', width: 46 } }));
            }
            data.map(function (item, index) {
                var style = {
                    width: item.width,
                    maxWidth: item.width,
                    textAlign: item.dataAlign,
                    display: item.hidden && 'none'
                };
                output.push(_react2['default'].createElement('col', { style: style, key: index }));
            });
            return output;
        }
    }, {
        key: 'rowsRender',
        value: function rowsRender(data, cols, hideSelectColumn) {
            var isHover = this.state.isHover;
            var _props4 = this.props;
            var hover = _props4.hover;
            var isKey = _props4.isKey;
            var selectRow = _props4.selectRow;
            var hoverStyle = _props4.hoverStyle;

            var isSelect = selectRow.mode !== 'none';
            var output = [];

            if (data && data.length) {
                for (var i = 0; i < data.length; i++) {
                    var node = data[i];
                    var key = node[isKey];
                    output.push(_react2['default'].createElement(_Row2['default'], {
                        key: key,
                        data: node,
                        cols: cols,
                        colIndex: i,
                        isKey: isKey,
                        isSelect: isSelect,
                        selectRow: selectRow,
                        hover: isHover === key,
                        hoverStyle: hoverStyle,
                        hideSelectColumn: hideSelectColumn,
                        onMouseOut: hover ? this.handleHover.bind(this, null) : function () {},
                        onMouseOver: hover ? this.handleHover.bind(this, key) : function () {},
                        checked: selectRow.mode === 'checkbox' ? !!~selectRow.selected.indexOf(key) : selectRow.selected[0] === key
                    }));
                }
            }
            return output;
        }
    }, {
        key: 'blankRender',
        value: function blankRender(data, colSpan, showText) {
            if (data.length) return null;
            return _react2['default'].createElement(
                'tr',
                null,
                _react2['default'].createElement(
                    'td',
                    { className: 'text-center', colSpan: colSpan },
                    showText && this.props.noDataText
                )
            );
        }
    }, {
        key: 'bodyRender',
        value: function bodyRender(data, className, height, selectRow) {
            return _react2['default'].createElement(
                'div',
                { className: 'table-container table-body-container', style: { height: height || 'auto' },
                    ref: 'container' },
                _react2['default'].createElement(
                    'table',
                    { className: className, ref: 'body' },
                    _react2['default'].createElement(
                        'colgroup',
                        { ref: 'colgroup' },
                        this.colgroupRender(this.columnData, selectRow.hideSelectColumn ? 'none' : selectRow.mode)
                    ),
                    _react2['default'].createElement(
                        'tbody',
                        { ref: 'tbody' },
                        this.blankRender(data, this.columnData.length, true),
                        this.rowsRender(data, this.columnData, selectRow.hideSelectColumn)
                    )
                )
            );
        }
    }, {
        key: 'leftBodyRender',
        value: function leftBodyRender(data, className, height, selectRow) {
            if (this.leftColumnData.length) {
                return _react2['default'].createElement(
                    'div',
                    { className: 'table-container table-body-container', style: { height: height || 'auto' },
                        ref: 'leftContainer' },
                    _react2['default'].createElement(
                        'table',
                        { className: className },
                        _react2['default'].createElement(
                            'colgroup',
                            { ref: 'left' },
                            this.colgroupRender(this.leftColumnData, selectRow.hideSelectColumn ? 'none' : selectRow.mode)
                        ),
                        _react2['default'].createElement(
                            'tbody',
                            { ref: 'ltbody' },
                            this.blankRender(data, this.leftColumnData.length),
                            this.rowsRender(data, this.leftColumnData, selectRow.hideSelectColumn)
                        )
                    )
                );
            }
        }
    }, {
        key: 'rightBodyRender',
        value: function rightBodyRender(data, className, height) {
            if (this.rightColumnData.length) {
                return _react2['default'].createElement(
                    'div',
                    { className: 'table-container table-body-container', style: { height: height || 'auto' },
                        ref: 'rightContainer' },
                    _react2['default'].createElement(
                        'table',
                        { className: className, ref: 'rightBody' },
                        _react2['default'].createElement(
                            'colgroup',
                            { ref: 'right' },
                            this.colgroupRender(this.rightColumnData, 'none')
                        ),
                        _react2['default'].createElement(
                            'tbody',
                            { ref: 'rtbody' },
                            this.blankRender(data, this.rightColumnData.length),
                            this.rowsRender(data, this.rightColumnData, true, true)
                        )
                    )
                );
            }
        }
    }, {
        key: 'paginationTotalRender',
        value: function paginationTotalRender() {
            var _props5 = this.props;
            var data = _props5.data;
            var remote = _props5.remote;
            var options = _props5.options;
            var dataSize = _props5.dataSize;
            var pagination = _props5.pagination;

            if (pagination && options.paginationShowsTotal) {
                var len = remote ? options.sizePerPage : this.state.length;
                var current = remote ? (options.page - 1) * len : (this.state.currentPage - 1) * len;
                var start = remote ? current + 1 : Math.min(data.length, current + 1);
                var to = remote ? current + data.length : Math.min(data.length, current + len);
                return _react2['default'].createElement(
                    'div',
                    { style: { margin: '20px 0 0 20px ', display: 'inline-block' } },
                    options.paginationShowsTotal === true ? _react2['default'].createElement(
                        'div',
                        null,
                        '\u663E\u793A ',
                        start,
                        ' \u81F3 ',
                        to,
                        '\u6761 \u5171',
                        remote ? dataSize : data.length,
                        '\u6761'
                    ) : options.paginationShowsTotal(start, to, dataSize)
                );
            }
        }
    }, {
        key: 'dropDownListRender',
        value: function dropDownListRender() {
            var _props6 = this.props;
            var remote = _props6.remote;
            var options = _props6.options;
            var pagination = _props6.pagination;

            var sizePageList = options.sizePageList;
            var length = sizePageList && sizePageList.length;
            if (pagination && (length > 1 || length === 1 && sizePageList[0] !== options.sizePerPage)) {
                if (remote) {
                    return _react2['default'].createElement(
                        _Dropdown2['default'],
                        { list: sizePageList,
                            onClick: this.handleFlip.bind(this) },
                        options.sizePerPage
                    );
                } else {
                    return _react2['default'].createElement(
                        _Dropdown2['default'],
                        { list: sizePageList, onClick: this.handleFlip.bind(this) },
                        this.state.length
                    );
                }
            }
        }
    }, {
        key: 'pagingRender',
        value: function pagingRender() {
            var _props7 = this.props;
            var remote = _props7.remote;
            var options = _props7.options;
            var dataSize = _props7.dataSize;

            return _react2['default'].createElement(
                'div',
                { className: 'fr' },
                remote ? _react2['default'].createElement(_Pagination2['default'], {
                    dataSize: dataSize,
                    current: options.page,
                    endLabel: options.endLabel,
                    prevLabel: options.prevLabel,
                    nextLabel: options.nextLabel,
                    startLabel: options.startLabel,
                    sizePerPage: options.sizePerPage,
                    hideEndLabel: options.hideEndLabel,
                    paginationSize: options.paginationSize,
                    hideStartLabel: options.hideStartLabel,
                    showTotalPages: options.showTotalPages,
                    onPageChange: options.onPageChange
                }) : _react2['default'].createElement(_Pagination2['default'], {
                    endLabel: options.endLabel,
                    prevLabel: options.prevLabel,
                    nextLabel: options.nextLabel,
                    sizePerPage: this.state.length,
                    startLabel: options.startLabel,
                    current: this.state.currentPage,
                    dataSize: this.props.data.length,
                    hideEndLabel: options.hideEndLabel,
                    paginationSize: options.paginationSize,
                    hideStartLabel: options.hideStartLabel,
                    showTotalPages: options.showTotalPages,
                    onPageChange: this.handleClick.bind(this)
                })
            );
        }
    }, {
        key: 'topPagingRender',
        value: function topPagingRender() {
            var _props8 = this.props;
            var remote = _props8.remote;
            var options = _props8.options;
            var dataSize = _props8.dataSize;

            return _react2['default'].createElement(
                'div',
                { className: 'fr' },
                remote ? _react2['default'].createElement(_SimplePagination2['default'], {
                    dataSize: dataSize,
                    current: options.page,
                    showTotalPages: false,
                    prevLabel: options.prevLabel,
                    nextLabel: options.nextLabel,
                    sizePerPage: options.sizePerPage,
                    onPageChange: options.onPageChange
                }) : _react2['default'].createElement(_SimplePagination2['default'], {
                    showTotalPages: false,
                    prevLabel: options.prevLabel,
                    nextLabel: options.nextLabel,
                    sizePerPage: this.state.length,
                    current: this.state.currentPage,
                    dataSize: this.props.data.length,
                    onPageChange: this.handleClick.bind(this)
                })
            );
        }
    }, {
        key: 'pagingRowRender',
        value: function pagingRowRender() {
            if (!this.props.pagination || !this.props.data.length) return null;
            return _react2['default'].createElement(
                'div',
                { className: 'row' },
                _react2['default'].createElement(
                    'div',
                    { className: 'fl' },
                    this.dropDownListRender(),
                    this.paginationTotalRender()
                ),
                _react2['default'].createElement(
                    'div',
                    { className: 'fr' },
                    this.pagingRender()
                )
            );
        }
    }, {
        key: 'topPagingRowRender',
        value: function topPagingRowRender() {
            if (!this.props.topPagination || !this.props.data.length) return null;
            return _react2['default'].createElement(
                'div',
                { className: 'row' },
                _react2['default'].createElement(
                    'div',
                    { className: 'fr' },
                    this.topPagingRender()
                )
            );
        }
    }, {
        key: 'titleRender',
        value: function titleRender() {
            var title = this.props.title;
            if (!title) return null;
            return _react2['default'].createElement(
                'div',
                { className: 'el-table-title' },
                typeof title === 'function' ? title(this.props.data.slice()) : title
            );
        }
    }, {
        key: 'footerRender',
        value: function footerRender() {
            var footer = this.props.footer;
            if (!footer) return null;
            return _react2['default'].createElement(
                'div',
                { className: 'el-table-footer' },
                typeof footer === 'function' ? footer(this.props.data.slice()) : footer
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _props9 = this.props;
            var width = _props9.width;
            var isKey = _props9.isKey;
            var remote = _props9.remote;
            var height = _props9.height;
            var striped = _props9.striped;
            var children = _props9.children;
            var sortName = _props9.sortName;
            var lineWrap = _props9.lineWrap;
            var selectRow = _props9.selectRow;
            var sortOrder = _props9.sortOrder;
            var nestedHead = _props9.nestedHead;
            var pagination = _props9.pagination;
            var topPagination = _props9.topPagination;
            var _state = this.state;
            var data = _state.data;
            var order = _state.order;
            var length = _state.length;
            var sortField = _state.sortField;
            var currentPage = _state.currentPage;


            var checked = false;
            var className = (0, _classnames2['default'])({
                'table': true,
                'table-bordered': true,
                'table-striped': striped
            });
            var renderList = (topPagination || pagination) && !remote ? this._sliceData(data, currentPage, length) : data.slice();
            if (selectRow.mode !== 'none') {
                checked = this._getAllValue(renderList.slice(), isKey).sort().toString() === selectRow.selected.slice().sort().toString();
            }
            return _react2['default'].createElement(
                'div',
                { className: "react-table " + lineWrap },
                this.titleRender(),
                this.topPagingRowRender(),
                !!nestedHead.length && _react2['default'].createElement(_NestedHeader2['default'], {
                    ref: 'nested', nestedHead: nestedHead,
                    selectRow: selectRow, lineWrap: lineWrap,
                    cols: this.columnData
                }),
                _react2['default'].createElement(
                    'div',
                    { className: 'el-table-wrapper', style: { width: width || '100%' } },
                    _react2['default'].createElement(
                        'div',
                        { className: 'el-table' },
                        _react2['default'].createElement(
                            _Header2['default'],
                            {
                                ref: 'thead',
                                onSelectAll: this.handleSelectAll.bind(this),
                                selectRow: selectRow, checked: checked,
                                sortOrder: remote ? sortOrder : order,
                                sortName: remote ? sortName : sortField,
                                onSort: this.handleSort.bind(this)
                            },
                            children
                        ),
                        this.bodyRender(renderList, className, height, selectRow)
                    ),
                    !!this.leftColumnData.length && _react2['default'].createElement(
                        'div',
                        { className: 'el-table table-fixed table-left-fixed' },
                        _react2['default'].createElement(
                            _Header2['default'],
                            {
                                ref: 'lthead', left: this.leftColumnData.length,
                                onSelectAll: this.handleSelectAll.bind(this),
                                selectRow: selectRow, checked: checked,
                                sortName: remote ? sortName : sortField,
                                sortOrder: remote ? sortOrder : order,
                                onSort: this.handleSort.bind(this)
                            },
                            children
                        ),
                        this.leftBodyRender(renderList, className, height, selectRow)
                    ),
                    !!this.rightColumnData.length && _react2['default'].createElement(
                        'div',
                        { className: 'el-table table-fixed table-right-fixed' },
                        _react2['default'].createElement(
                            _Header2['default'],
                            {
                                ref: 'rthead', right: this.rightColumnData.length,
                                sortName: remote ? sortName : sortField,
                                sortOrder: remote ? sortOrder : order,
                                onSort: this.handleSort.bind(this)
                            },
                            children
                        ),
                        this.rightBodyRender(renderList, className, height)
                    ),
                    this.footerRender()
                ),
                this.pagingRowRender()
            );
        }
    }]);

    return Table;
}(_react.Component);

exports['default'] = Table;


Table.defaultProps = {
    data: [],
    dataSize: 0,
    hover: false,
    remote: false,
    striped: false,
    nestedHead: [],
    pagination: false,
    topPagination: false,
    onSortChange: _Util.empty,
    sortName: undefined,
    sortOrder: undefined,
    lineWrap: 'ellipsis',
    noDataText: _react2['default'].createElement(
        'span',
        null,
        '\u6682\u65E0\u6570\u636E'
    ),
    hoverStyle: {
        backgroundColor: '#f4f5f9'
    },
    selectRow: {
        mode: 'none',
        selected: [],
        onSelect: _Util.empty,
        onSelectAll: _Util.empty,
        bgColor: '#ffd800',
        hideSelectColumn: false
    },
    options: {
        sizePerPage: 10,
        paginationSize: 6,
        sizePageList: [10],
        onPageChange: _Util.empty,
        onSizePageChange: _Util.empty
    }
};

Table.propTypes = {
    data: _react.PropTypes.array,
    remote: _react.PropTypes.bool,
    hover: _react.PropTypes.bool,
    striped: _react.PropTypes.bool,
    dataSize: _react.PropTypes.number,
    pagination: _react.PropTypes.bool,
    onSortChange: _react.PropTypes.func,
    hoverStyle: _react.PropTypes.object,
    topPagination: _react.PropTypes.bool,
    isKey: _react.PropTypes.string.isRequired,
    nestedHead: _react.PropTypes.arrayOf(_react.PropTypes.array),
    lineWrap: _react.PropTypes.oneOf(['ellipsis', 'break']),
    width: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
    height: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
    title: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number, _react.PropTypes.node, _react.PropTypes.func, _react.PropTypes.element]),
    footer: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number, _react.PropTypes.node, _react.PropTypes.func, _react.PropTypes.element]),
    noDataText: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number, _react.PropTypes.node, _react.PropTypes.func, _react.PropTypes.element]),
    selectRow: _react.PropTypes.shape({
        mode: _react.PropTypes.oneOf(['none', 'radio', 'checkbox']),
        onSelect: _react.PropTypes.func,
        bgColor: _react.PropTypes.string,
        selected: _react.PropTypes.array,
        onSelectAll: _react.PropTypes.func,
        hideSelectColumn: _react.PropTypes.bool
    }),
    options: _react.PropTypes.shape({
        page: _react.PropTypes.number,
        onPageChange: _react.PropTypes.func,
        sizePerPage: _react.PropTypes.number,
        sizePageList: _react.PropTypes.array,
        onSizePageChange: _react.PropTypes.func,
        paginationSize: _react.PropTypes.number,
        paginationShowsTotal: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.func])
    })
};