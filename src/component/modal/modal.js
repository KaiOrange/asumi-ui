/**
 * Created by elly on 2017/4/7.
 */
import React, {Component, PropTypes} from 'react';
import Button from '../button';
import classnames from 'classnames';

export default  class Modal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {size, mask, title, style, okText, closeText, maskClosable, className, footer, children, onOk, onClose}=this.props;
        let _classNames = classnames({
            'el-modal-content': true,
            'el-small': size === "small",
            'el-large': size === "large",
            className
        });
        return (
            <div>
                {!!mask && <div className="el-mask"></div>}
                <div className="el-modal-wrapper">
                    <div className="el-modal">
                        <div className={_classNames} style={style}>
                            <div className="el-modal-close" onClick={onClose}>×</div>
                            <div className="el-modal-header">{title}</div>
                            <div className="el-modal-body">{children}</div>
                            {footer !== null &&
                            <div className="el-modal-footer">
                                {footer ||
                                (<div>
                                    <Button
                                        style={{marginRight: 10}}
                                        size={size === "large" ? "default" : "small"}
                                        onClick={onClose}>{closeText}</Button>
                                    <Button
                                        type="primary"
                                        size={size === "large" ? "default" : "small"}
                                        onClick={onOk}>{okText}</Button>
                                </div>)}
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Modal.propTypes = {
    mask: PropTypes.bool,
    onOk: PropTypes.func,
    onClick: PropTypes.func,
    size: PropTypes.oneOf(['default', 'small', 'large'])
};

Modal.defaultProps = {
    mask: true,
    okText: '确定',
    closeText: '取消',
    onOk: ()=> {
    },
    onClose: ()=> {
    }
};