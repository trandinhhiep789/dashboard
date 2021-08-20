import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import { hideModal } from '../../../../actions/modal';
import ModalRight from '../ModalRight';
import Modal from '../Modal';


const CommontModals = ({ title, afterClose, hideModal, content, id, maxWidth, onhideModal }) => {

    const onClose = () => {
        hideModal(id);
        if (afterClose) {
            afterClose();
        }
    };

    const handleClose = () => {
        onhideModal(id);
    }

    return (
        <ModalRight title={title} onClose={handleClose} id={"modalid-" + id} maxWidth={maxWidth} >
            <div>{content.text}</div>
        </ModalRight>
    );
};

CommontModals.propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func,

    // content: PropTypes.node
};

export default connect(null, { hideModal })(CommontModals);