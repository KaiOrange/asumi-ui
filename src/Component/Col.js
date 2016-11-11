import React, {
    Component,
    PropTypes
} from 'react';

class Col extends Component {
    constructor(props) {
        super(props);
    }

    caretRender(dataField, sortName, sortOrder) {
        const SortGroup =
            <span className="order">
                <span className="dropdown">
                    <span className="caret" style={{margin: '10px 0 10px 5px', color: '#ccc'}}/>
                </span>
                <span className="dropup">
                    <span className="caret" style={{margin: '10px 0', color: '#ccc'}}/>
                </span>
           </span>;
        const AscCaret = <span className="caret" style={{margin: '10px 0 10px 5px'}}/>;
        if (dataField === sortName && sortOrder) {
            return <span className={"order " + (sortOrder === 'desc' ? '' : 'dropup')}>{AscCaret}</span>;
        } else {
            return SortGroup;
        }

    }

    render() {
        const {
            width,
            hidden,
            onSort,
            colSpan,
            children,
            dataSort,
            sortName,
            sortOrder,
            dataField,
            dataAlign
        } = this.props;

        const style = {
            width: width,
            maxWidth: width,
            textAlign: dataAlign,
            display: hidden && 'none'
        };

        return (
            <th style={style} colSpan={colSpan}
                onClick={dataSort ? ()=>onSort(dataField, sortOrder === 'asc' ? 'desc' : 'asc') : ()=> {
                    return false;
                }}>
                <span>{children}</span>{dataSort && this.caretRender(dataField, sortName, sortOrder)}
            </th>
        );
    }
}

Col.defaultProps = {
    render: null,
    colSpan: null,
    dataSort: false,
    dataFixed: 'auto',
    dataAlign: 'center'
};

Col.propTypes = {
    hidden: PropTypes.bool,
    dataSort: PropTypes.bool,
    colSpan: PropTypes.number,
    dataFormat: PropTypes.func,
    dataFixed: PropTypes.oneOf(['left', 'right', 'auto']),
    dataAlign: PropTypes.oneOf(['left', 'right', 'center']),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default Col;