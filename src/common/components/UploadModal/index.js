import React from "react";
import ReactDOM from "react-dom";
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';
import UpLoadFile from './UploadFile'

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
    position: 'absolute',
    margin: 'auto',
    width: '40%',
    border: '1px solid rgba(0, 0, 0, .2)',
    background: '#fff',
    overflow: 'auto',
    borderRadius: '4px',
    outline: 'none',
    boxShadow: '0 5px 10px rgba(0, 0, 0, .3)',
    top: '15%',
    left: 0,
    right: 0,
    bottom: '15%',
  }
}

export class UploadModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleCLoseButton = this.handleCLoseButton.bind(this);
  }

  handleCLoseButton() {
    ModalManager.close();
    // if(this.props.onCloseModal != null)
    //   this.props.onCloseModal();
  }

  render() {
    const { title, onRequestClose, accept, multiple, disabled, maxSize, minSize } = this.props;
    return (
      <Modal style={MessageModelStyle}
        onRequestClose={onRequestClose}
        effect={Effect.ScaleUp}>

        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="myModalLabel">{title}</h4>
            <button type="button" className="close" onClick={this.handleCLoseButton}>
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <UpLoadFile
              accept={accept}
              multiple={multiple}
              disabled={disabled}
              maxSize={maxSize}
              minSize={minSize}
            />
          </div>
          <div className="modal-footer">
            <button className="btn btn-bold btn-pure btn-primary" onClick={this.handleCLoseButton}>Close</button>
          </div>
        </div>
      </Modal>
    );
  }
}
