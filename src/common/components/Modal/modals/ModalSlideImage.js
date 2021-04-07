import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import ImageGallery from 'react-image-gallery';

import { formatStrToDate } from "../../../../common/library/CommonLib.js";
import { hideModal } from '../../../../actions/modal';
import Modal from '../Modal';


const ModalSlideImage = ({ ImageCaptureGeoLocation, afterClose, hideModal, content, id, maxWidth }) => {
    const [timeImg, setTimeImg] = useState("")

    useEffect(() => {
        if (content.lstImage[0].ImageCaptureTime) {
            let imgCaptureTime = content.lstImage[0].ImageCaptureTime
            setTimeImg(formatStrToDate(imgCaptureTime))
        }

        return () => { }
    }, [])

    const onClose = () => {
        hideModal(id);
        if (afterClose) {
            afterClose();
        }
    };

    const handleImageCaptureTime = (currentIndex) => {
        try {
            let imgCaptureTime = content.lstImage[currentIndex].ImageCaptureTime
            setTimeImg(formatStrToDate(imgCaptureTime))
        } catch (error) {
            setTimeImg("")
        }
    }

    const herfurl = "https://www.google.com/maps/search/" + ImageCaptureGeoLocation + "?sa=X&ved=2ahUKEwidyvfo7tvsAhUlwosBHXBpAngQ8gEwAHoECAEQAQ";

    return (
        // <Modal title={ <a target="_blank" href={herfurl}>Danh sách hình ảnh  | Tọa độ: {ImageCaptureGeoLocation}</a>} onClose={onClose} id={"modalid-" + id} maxWidth={maxWidth}>
        <Modal
            // title={<a target="_blank" href={herfurl}>Danh sách hình ảnh  | Tọa độ: {ImageCaptureGeoLocation}</a>}
            title={
                <div>
                    Danh sách hình ảnh | <a className="text-success" target="_blank" href={herfurl}>Tọa độ</a> | Thời gian: {timeImg}
                </div>
            }
            onClose={onClose}
            id={"modalid-" + id}
            maxWidth={maxWidth}
        >
            {content.lstImage != undefined && content.lstImage.length > 1 ? <ImageGallery
                items={content.lstImage}
                originalClass="img-original"
                onSlide={handleImageCaptureTime}
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