import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Button from '../button';
import TransferPanel from './transferPanel';

export default class Transfer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            leftChecked: [],
            rightChecked: []
        }
    }

    handleChange(isLeft, value) {
        isLeft ? this.setState({ leftChecked: value }) : this.setState({ rightChecked: value });
    }

    get sourceData() {
        const { data, value, propsAlias } = this.props;
        return data.filter(item => !value.includes(item[propsAlias.value]));
    }

    get targetData() {
        const { data, value, propsAlias } = this.props;
        return data.filter(item => value.includes(item[propsAlias.value]));
    }

    addToLeft() {
        const { value } = this.props;
        const { rightChecked } = this.state;
        let currentValue = value.slice();
        rightChecked.forEach(item => {
            const index = currentValue.indexOf(item);
            if (index > -1) {
                currentValue.splice(index, 1);
            }
        });
        this.setState({ leftChecked: [], rightChecked: [] }, () =>
            this.props.onChange(currentValue))
    };


    addToRight() {
        const { value } = this.props;
        const { leftChecked } = this.state;
        let currentValue = value.slice();
        leftChecked.forEach(item => {
            if (!value.includes(item)) {
                currentValue = currentValue.concat(item);
            }
        });
        this.setState({ rightChecked: [], leftChecked: [] }, () =>
            this.props.onChange(currentValue))
    };

    render() {
        const { data, titles, ...others } = this.props;
        const { leftChecked, rightChecked } = this.state;

        let isTopBtnDisabled = leftChecked.length == 0 ? true : false;
        let isBottmBtnDisabled = rightChecked.length == 0 ? true : false;
        return (
            <div className="el-transfer" >
                <TransferPanel
                    data={this.sourceData}
                    checkedList={leftChecked}
                    title={titles[0]}
                    changeChecked={this.handleChange.bind(this, true)}
                    {...others}
                />
                <div className="el-transfer__buttons">
                    <Button
                        type="primary"
                        className="el-transfer__button"
                        disabled={isTopBtnDisabled}
                        onClick={this.addToRight.bind(this)}
                    >
                        <i className="fa fa-chevron-right"></i>
                    </Button>
                    <Button
                        type="primary"
                        className="el-transfer__button"
                        disabled={isBottmBtnDisabled}
                        onClick={this.addToLeft.bind(this)}
                    >
                        <i className="fa fa-chevron-left"></i>
                    </Button>
                </div>
                <TransferPanel
                    data={this.targetData}
                    checkedList={rightChecked}
                    title={titles[1]}
                    changeChecked={this.handleChange.bind(this, false)}
                    {...others}
                />
            </div>
        )
    }
}

Transfer.propTypes = {
    data: PropTypes.array, //array[{ value, label, disabled }]
    filterable: PropTypes.bool,
    filterPlaceholder: PropTypes.string,
    filterMethod: PropTypes.func,
    titles: PropTypes.array,
    props: PropTypes.object,
    onChange: PropTypes.func,
    propsAlias: PropTypes.object,
    value: PropTypes.array
};

Transfer.defaultProps = {
    filterable: false,
    filterPlaceholder: '请输入搜索内容',
    titles: ['', ''],
    props: {},
    onChange: () => { },
    propsAlias: {
        label: 'label',
        value: 'value',
        disabled: 'false'
    },
    value: []
};