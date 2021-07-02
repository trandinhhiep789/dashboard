import React, { Component } from 'react';
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';

export default class MyModal extends Component {
    render() {
        const { text, onRequestClose, handleSubmitModal, children } = this.props;
        return (
            <Modal
                onRequestClose={onRequestClose}
                effect={Effect.ScaleUp}>
                <div className="m-4">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                        <h4 className="modal-title">{text}</h4>
                        <button type="button" className="close" onClick={ModalManager.close}>
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    {children}
                    <div className="d-flex justify-content-end align-items-end mt-2">
                        <button className="btn btn-w-md btn-round btn-info mr-2" onClick={handleSubmitModal}>Cập nhật</button>
                        <button className="btn btn-w-md btn-round btn-secondary" onClick={ModalManager.close}>Đóng</button>
                    </div>
                </div>
            </Modal>
        );
    }
}