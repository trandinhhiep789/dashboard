import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import { hideModal } from '../../../../actions/modal';
import Modal from '../Modal';

const previewMedia = ({ title, hideModal, src, typeMedia }) => {
    const handleConfirm = () => () => {
        hideModal();
    };
    return (
        <Modal title={title} onClose={handleConfirm(false)} src={src} typeMedia={typeMedia}>
            <div className="modal-footer">
                <button className="btn btn-bold btn-sm btn-outline btn-primary" type="button" onClick={handleConfirm(false)}>
                    Đóng
            </button>
            </div>
        </Modal>
    );
};

previewMedia.propTypes = {
    title: PropTypes.string,
};

export default connect(null, { hideModal })(previewMedia);