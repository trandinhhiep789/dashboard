import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import { hideModal } from '../../../../actions/modal';
import Modal from '../Modal';
import UpLoadFile from '../../UploadModal/UploadFile'


const CommontModals = ({ title, afterClose, hideModal, content, id, maxWidth }) => {

    const onClose = () => {
        $("body").removeClass("showModal")
        hideModal(id);
        if (afterClose) {
            afterClose();
        }
    };

   
    useEffect(() => {
        $("body").addClass("showModal")
    }, [])
    

    return (
        <Modal id="moda" title={title} onClose={onClose} id={"modalid-" + id} maxWidth={maxWidth}>
            {content.isUploadFile ?
                <UpLoadFile
                    accept={content.accept}
                    multiple={content.multiple}
                    maxSize={content.maxSize}
                    minSize={content.minSize}
                /> :
                <div>{content.text}</div>
            }
        </Modal>
    );
};

CommontModals.propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func,
    // content: PropTypes.node
};

export default connect(null, { hideModal })(CommontModals);