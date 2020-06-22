import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import { hideModal } from '../../../../actions/modal';
import Modal from '../Modal';
import ImageGallery from 'react-image-gallery';





const ModalSlideImage = ({ title, afterClose, hideModal, content, id, maxWidth }) => {
    const onClose = () => {
        hideModal(id);
        if (afterClose) {
            afterClose();
        }
    };

    return (
        <Modal title={title} onClose={onClose} id={"modalid-" + id} maxWidth={maxWidth}>
            {content.lstImage != undefined && content.lstImage.length > 1 ? <ImageGallery
                items={content.lstImage}
                originalClass="img-original"
            />
            : <img src={content.lstImage[0].original} />
            }
        </Modal>
    );
};

ModalSlideImage.propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func,
    // content: PropTypes.node
};

export default connect(null, { hideModal })(ModalSlideImage);