import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import { hideModal } from '../../../../actions/modal';
import Modal from '../Modal';


const ModalSearch = ({ title, hideModal, content }) => {
    const onClose = () => {
        hideModal();
    };
    const maxWidth = '80%'; 

    return (
        <Modal title={title} onClose={onClose} maxWidth ={maxWidth}>
            {content.text}
        </Modal>
    );
};

ModalSearch.propTypes = {
    title: PropTypes.string,
    onConfirm: PropTypes.func
};

export default connect(null, { hideModal })(ModalSearch);