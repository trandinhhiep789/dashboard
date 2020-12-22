import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import { hideModal } from '../../../../actions/modal';
import ModalRight from '../ModalRight';
import Modal from '../Modal';


const CommontModals = ({ title, afterClose, hideModal, content, id, maxWidth }) => {

    const onClose = () => {
        hideModal(id);
        if (afterClose) {
            afterClose();
        }
    };
    
    return (
        <ModalRight title={title} onClose={onClose} id={"modalid-" + id} maxWidth={maxWidth}>
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