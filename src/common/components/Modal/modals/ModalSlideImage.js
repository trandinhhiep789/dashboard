import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import { hideModal } from '../../../../actions/modal';
import Modal from '../Modal';
import ImageGallery from 'react-image-gallery';




const ModalSlideImage = ({ ImageCaptureGeoLocation, ImageCaptureTime, afterClose, hideModal, content, id, maxWidth }) => {
    const onClose = () => {
        hideModal(id);
        if (afterClose) {
            afterClose();
        }
    };
    const herfurl = "https://www.google.com/maps/search/" + ImageCaptureGeoLocation + "?sa=X&ved=2ahUKEwidyvfo7tvsAhUlwosBHXBpAngQ8gEwAHoECAEQAQ";
    return (
        // <Modal title={ <a target="_blank" href={herfurl}>Danh sách hình ảnh  | Tọa độ: {ImageCaptureGeoLocation}</a>} onClose={onClose} id={"modalid-" + id} maxWidth={maxWidth}>
        <Modal
            // title={<a target="_blank" href={herfurl}>Danh sách hình ảnh  | Tọa độ: {ImageCaptureGeoLocation}</a>}
            title={
                <div>
                    Danh sách hình ảnh | <a className="text-success" target="_blank" href={herfurl}>Tọa độ</a> | Thời gian: {ImageCaptureTime}
                </div>
            }
            onClose={onClose}
            id={"modalid-" + id}
            maxWidth={maxWidth}
        >
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