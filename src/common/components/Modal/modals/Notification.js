import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import { hideModal } from '../../../../actions/modal';
import Modal from '../Modal';
import UpLoadFile from '../../UploadModal/UploadFile'


const Notification = ({ title, afterClose, hideModal, content }) => {
  const onClose = () => {
    hideModal();

    if (afterClose) {
      afterClose();
    }
  };
  return (
    <Modal title={title} onClose={onClose}>
      {content.isUploadFile ?
        <UpLoadFile
          accept={content.accept}
          multiple={content.multiple}
          maxSize={content.maxSize}
          minSize={content.minSize}
        /> :
        <div>{content.text}</div>
      }
      <button className="btn btn-bold btn-sm btn-outline btn-primary" onClick={onClose}>
        Ok
      </button>

    </Modal>
  );
};

Notification.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
  content: PropTypes.node
};

export default connect(null, { hideModal })(Notification);