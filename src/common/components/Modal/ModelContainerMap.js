import React from "react";
import ReactDOM from "react-dom";
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';
import vbd from '../../../scripts/vietbandomapsapi.js';
const MessageModelStyle = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999999,
        overflow: 'hidden',
        perspective: 1300,
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },

    content: {
        position: 'relative',
        margin: '3% auto',
        width: '70%',
        border: '1px solid rgba(0, 0, 0, .2)',
        background: '#fff',
        overflow: 'auto',
        borderRadius: '4px',
        outline: 'none',
        boxShadow: '0 5px 10px rgba(0, 0, 0, .3)',
    }
}

export default class ModelContainerMap extends React.Component {
    constructor(props) {
        super(props);
        this.handleCLoseButton = this.handleCLoseButton.bind(this);
        this.handleChangeButton = this.handleChangeButton.bind(this);
    }

    handleCLoseButton() {
        ModalManager.close();
        if (this.props.onCloseModal != null)
            this.props.onCloseModal();
    }

    componentDidMount(){
    }

    handleChangeButton() {
        if (this.props.onChangeModal != null)
            this.props.onChangeModal();
    }

    render() {
        const { title, message, onRequestClose } = this.props;
        let hasHeaderToolbar = true;
        if (this.props.IsButton)
            hasHeaderToolbar = false;
        return (
            <Modal
                style={MessageModelStyle}
                onRequestClose={onRequestClose}
                effect={Effect.ScaleUp}
            >
                <div className="modal-content modal-custom  modal-custom-maps">
                    <div className="modal-header">
                        <h4 className="modal-title" id="myModalLabel">{title}</h4>
                        <button type="button" className="close" onClick={this.handleCLoseButton}>
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <React.Fragment>
                            {this.props.children}
                        </React.Fragment>
                    </div>
                    <div className="modal-footer">
                        {hasHeaderToolbar && <button className="btn btn-w-md btn-round btn-info" onClick={this.handleChangeButton}>Cập nhật</button>}
                        <button className="btn btn-w-md btn-round btn-secondary" onClick={this.handleCLoseButton}>Đóng</button>
                    </div>
                </div>
            </Modal>
        );
    }
}
