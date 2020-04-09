import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import { hideModal } from '../../../../actions/modal';
import Modal from '../Modal';

let formData1 = {};
let selectedFileList = {};
const Confirmation = ({ title, onConfirm, hideModal, modalElementList, formData }) => {
    formData1 = formData;
    const handleConfirm = (isConfirmed) => () => {
        hideModal();
        onConfirm(isConfirmed, formData1, selectedFileList);
    };
    const handleInputChange = (formData) => {
        // hideModal();
        if (formData) {
            formData1 = formData;
        }
    };
    const handleSelectedFile = (filelist) => {
        // hideModal();
        if (filelist) {
            selectedFileList = filelist;
        }
    };
    return (
        <Modal title={title} modalElementList={modalElementList} formData={formData} onValueChange={handleInputChange} onClose={handleConfirm(false)} onHandleSelectedFile={handleSelectedFile}>
            <div className="modal-footer">
                <button className="btn btn-w-md btn-round btn-info" type="button" onClick={handleConfirm(true)}>
                    Cập nhật
                </button>
                <button className="btn btn-w-md btn-round btn-secondary" type="button" onClick={handleConfirm(false)}>
                    Bỏ qua
                </button>
            </div>
        </Modal>
    );
};

Confirmation.propTypes = {
    title: PropTypes.string,
    onConfirm: PropTypes.func,
    modalElementList: PropTypes.array,
    // dataSource: PropTypes.dataSource
};

export default connect(null, { hideModal })(Confirmation);