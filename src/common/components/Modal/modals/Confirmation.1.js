import React from 'react';
import { connect } from 'react-redux';

import { hideModal } from '../../../../actions/modal';
import Modal from '../Modal';
import { ValidationField } from "../../../library/validation.js"

class Confirmation extends React.Component {
    constructor(props) {
        super(props);
        this.validationForm = this.validationForm.bind(this);
        this.checkInput = this.checkInput.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectedFile = this.handleSelectedFile.bind(this);

        let formData = this.props.formData
        if (!formData) {
            if (this.props.modalElementList) {
                this.props.modalElementList.map((elementItem) => {
                    const elementname = elementItem.Name;
                    formData = Object.assign({}, formData, { [elementname]: elementItem.value });
                });
            }
        }
        this.state = {
            Title: this.props.title ? this.props.title : "",
            FormData: formData,
            FormValidation: this.props.formValidation ? this.props.formValidation : {},
            SelectedFile: {},
            ModalElementList: this.props.modalElementList ? this.props.modalElementList : []
        };
    }
    componentDidMount() {

    }
    validationForm() {
        let formValidation;
        this.state.ModalElementList.map((elementItem) => {
            const validatonList = elementItem.validatonList;
            if (validatonList && validatonList.length > 0) {
                const inputvalue = this.state.FormData[elementItem.Name];
                const validation = ValidationField(validatonList, inputvalue, elementItem.label, elementItem);
                const validationObject = { IsValidationError: validation.IsError, ValidationErrorMessage: validation.Message };
                formValidation = Object.assign({}, formValidation, { [elementItem.Name]: validationObject });
            }
        });
        return formValidation;
    }
    checkInput(formValidation) {
        for (const key in formValidation) {
            if (formValidation[key].IsValidationError)
                return false;
        }
        return true;
    }
    handleConfirm() {
        debugger;
        const formValidation = this.validationForm();
        if (!this.checkInput(formValidation)) {
            this.setState({ FormValidation: formValidation, IsSubmit: true });
        }
        else {
            if(this.props.autoCloseModal){
                this.props.hideModal();
            }
            this.props.onConfirm(true, this.state.FormData, this.state.SelectedFile);
        }
    }
    handleClose() {
        this.props.hideModal();
    }
    handleInputChange(formData, formValidation) {
        this.setState({ FormData: formData, FormValidation: formValidation, IsSubmit: false });
    }
    handleSelectedFile(filelist) {
        if (filelist) {
            this.setState({ SelectedFile: filelist });
        }
    }
    render() {
        const { Title, FormData, FormValidation, ModalElementList, IsSubmit } = this.state;
        return (
            <Modal title={Title} modalElementList={ModalElementList} formData={FormData} onValueChange={this.handleInputChange}
                onClose={this.handleClose} onHandleSelectedFile={this.handleSelectedFile} formValidation={FormValidation} isSubmit={IsSubmit}
            >
                <div className="modal-footer">
                    <button className="btn btn-w-md btn-round btn-info" type="button" onClick={this.handleConfirm}>
                        Cập nhật
                    </button>
                    <button className="btn btn-w-md btn-round btn-secondary" type="button" onClick={this.handleClose}>
                        Bỏ qua
                    </button>
                </div>
            </Modal>
        );
    }
}
const mapDispatchToProps = dispatch => {
    return {
        hideModal: () => {
            dispatch(hideModal());
        }
    };
};
export default connect(null, mapDispatchToProps)(Confirmation);
