import React from "react";
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';

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
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        pointerEvents: 'none',

    },

    content: {
        position: 'relative',
        margin: '100px auto',
        width: '40%',
        border: '1px solid rgba(0, 0, 0, .2)',
        background: '#fff',
        overflow: 'auto',
        borderRadius: '4px',
        outline: 'none',
        boxShadow: '0 5px 10px rgba(0, 0, 0, .3)',
    }
}

const modalBody = {
    whiteSpace: 'pre-wrap',
    fontSize: '14px'
};

export class MessageModal extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseButton = this.handleCloseButton.bind(this);
        this.handleOkButton = this.handleOkButton.bind(this);
    }

    handleCloseButton() {
        document.body.classList.remove('modal-open');
        ModalManager.close();
        //console.log("MessageModal this.props:", this.props);
        if (this.props.onCloseModal != null)
            this.props.onCloseModal();
    }

    handleOkButton(){
        document.body.classList.remove('modal-open');
        ModalManager.close();
        if(this.props.onOkModal){
            this.props.onOkModal();
        }
    }
    
    componentDidMount(){
        document.body.classList.add('modal-open');
    }

    render() {
        const { title, message, onRequestClose, isConfirm, textOk } = this.props;
        return (
            <Modal style={MessageModelStyle}
                onRequestClose={onRequestClose}
                effect={Effect.ScaleUp}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" id="myModalLabel">{title}</h4>
                        <button type="button" className="close" onClick={this.handleCloseButton}>
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <React.Fragment>
                            <p style={modalBody}>{message}</p>
                        </React.Fragment>
                    </div>
                    <div className="modal-footer">
                       {isConfirm && <button className="btn btn-w-md btn-round" style={{color:"white", backgroundColor:"#3498db"}} onClick={this.handleOkButton}>{textOk==""?"Ok":textOk}</button>}
                        <button className="btn btn-w-md btn-round" onClick={this.handleCloseButton}>Đóng</button>
                    </div>
                </div>
            </Modal>
        );
    }
}
