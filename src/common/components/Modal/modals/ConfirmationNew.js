import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { hideModal } from '../../../../actions/modal';
import ElementModal from '../../../../common/components/FormContainer/FormElement/ElementModal';
import { ValidationField } from "../../../library/validation.js"
import { de } from 'date-fns/locale';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, .65);
`;
const Content = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10000;
  overflow: auto;
  text-align: center;
  overflow-scrolling: touch;
  padding: 4px;
  cursor: pointer;
  &:after {
    vertical-align: middle;
    display: inline-block;
    height: 100%;
    margin-left: -.05em;
    content: '';
    
  }
`;
const Dialog = styled.div`
  position: relative;
  width: 100%;
  background: white;
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  max-width: ${props => props.customStyle.maxWidth};
  cursor: default;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  outline: none;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 5px 10px;
`;

const Body = styled.div`
  padding-bottom: 16px;
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 1.25rem;
`;

class ConfirmationNew extends React.Component {
    constructor(props) {
        super(props);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.elementItemRefs = [];
        const formData = this.bindData();
        this.state = {
            Title: this.props.title ? this.props.title : "",
            FormData: formData
        };
    }

    //#region BinData
    bindData() {
        const dataSource = this.props.dataSource;
        let formData = {};

        const listElement = this.bindDataToControl(this.props.modalElementList, this.props.dataSource);
        listElement.map((elementItem) => {
            const elementname = elementItem.name;
            const ObjectName = {
                Name: elementname,
                value: elementItem.value,
                Controltype: elementItem.Type,
                Disabled: (elementItem.Disabled == undefined ? false : elementItem.Disabled),
                label: elementItem.label,
                labelError: elementItem.label,
                ErrorLst: [],
                validatonList: elementItem.validatonList
            };
            formData = Object.assign({}, formData, { [elementname]: ObjectName });
        });

        return formData;
    }

    bindDataToControl(listElement, dataSource) {
        let listElement1 = listElement;
        if (typeof dataSource != "undefined") {
            listElement1 = listElement.map((elementItem) => {
                const elementvalue = dataSource[elementItem.datasourcemember];
                if (typeof elementvalue != "undefined") {
                    const newElementItem = Object.assign({}, elementItem, { value: elementvalue });
                    return newElementItem;
                }
                return elementItem;
            });
        }
        return listElement1;
    }
    //#endregion BinData

    //#region InputChange && InputChangeList  
    handleInputChange(elementname, elementvalue, namelabel, valuelabel, filterrest, filterrestValue) {
        //console.log('change')

        const FormDataContolLstd = this.state.FormData;
        FormDataContolLstd[elementname].value = elementvalue;
        if (typeof filterrest != "undefined" && filterrest != "") {
            const objrest = filterrest.split(",");
            for (let i = 0; i < objrest.length; i++) {
                if (filterrestValue.includes(elementvalue) || elementvalue == -1) {
                    if (FormDataContolLstd[objrest[i]].Controltype == "ComboBox") {
                        FormDataContolLstd[objrest[i]].value = -1;
                        FormDataContolLstd[objrest[i]].Disabled = true;
                    }
                    else if (FormDataContolLstd[objrest[i]].Controltype == "checkbox") {
                        FormDataContolLstd[objrest[i]].value = false;
                        FormDataContolLstd[objrest[i]].Disabled = true;
                    }
                    else {
                        FormDataContolLstd[objrest[i]].value = "";
                        FormDataContolLstd[objrest[i]].Disabled = true;
                    }
                }
                else {
                    FormDataContolLstd[objrest[i]].Disabled = false;
                    if (FormDataContolLstd[objrest[i]].Controltype == "ComboBox") {
                        FormDataContolLstd[objrest[i]].value = -1;
                    }
                    else if (FormDataContolLstd[objrest[i]].Controltype == "checkbox") {
                        FormDataContolLstd[objrest[i]].value = false;
                    }
                    else {
                        FormDataContolLstd[objrest[i]].value = "";
                    }
                }
            }
        }
        if (typeof namelabel != "undefined" && namelabel != "") {
            FormDataContolLstd[namelabel].value = valuelabel;
        }

        if (typeof FormDataContolLstd[elementname].validatonList != "undefined") {
            const validation = ValidationField(FormDataContolLstd[elementname].validatonList, elementvalue, FormDataContolLstd[elementname].label, FormDataContolLstd[elementname]);
            const validationObject = { IsValidatonError: validation.IsError, ValidatonErrorMessage: validation.Message };
            FormDataContolLstd[elementname].ErrorLst = validationObject;
        }
        //  console.log("FormDataContolLstd", FormDataContolLstd)
        this.setState({
            FormData: FormDataContolLstd,
        });

    }
    //#region validation InputControl
    validationFormNew() {
        const FormDataContolLst = this.state.FormData;
        for (const key in FormDataContolLst) {
            if (typeof FormDataContolLst[key].validatonList != "undefined") {
                const validation = ValidationField(FormDataContolLst[key].validatonList, FormDataContolLst[key].value, FormDataContolLst[key].label, FormDataContolLst[key]);
                const validationObject = { IsValidatonError: validation.IsError, ValidatonErrorMessage: validation.Message };
                FormDataContolLst[key].ErrorLst = validationObject;
            }
        }
        this.setState({
            FormData: FormDataContolLst
        });

        return FormDataContolLst;
    }
    checkInputName(formValidation) {
        for (const key in formValidation) {
            //  console.log("validation:",formValidation[key].ErrorLst,formValidation[key].ErrorLst.IsValidatonError);
            if (formValidation[key].ErrorLst != [] && formValidation[key].ErrorLst.IsValidatonError) {
                this.elementItemRefs[key].focus();
                return key;
            }
        }
        return "";
    }

    //#endregion validation TabContainers

    handleConfirm() {
        const formValidation = this.validationFormNew();
        if (this.checkInputName(formValidation) != "")
            return;
        if (this.props.onConfirm != null) {
            this.props.hideModal();
            const mLObjectDefinition = this.props.modalElementOl;
            let MLObject = {};
            mLObjectDefinition.map((Item) => {
                const controlName = Item.BindControlName;
                if (controlName.length > 0 && this.state.FormData[controlName] != undefined) {
                    MLObject = Object.assign({}, MLObject, { [Item.Name]: this.state.FormData[controlName].value });
                }
            });
            this.props.onConfirm(false, MLObject, this.state.SelectedFile);
        }
        if (this.props.onConfirmNew != null) {
            const mLObjectDefinition = this.props.modalElementOl;
            let MLObject = {};
            mLObjectDefinition.map((Item) => {
                const controlName = Item.BindControlName;
                if (controlName.length > 0 && this.state.FormData[controlName] != undefined) {
                    MLObject = Object.assign({}, MLObject, { [Item.Name]: this.state.FormData[controlName].value });
                }
            });
            this.props.onConfirmNew(false, MLObject, this.state.SelectedFile);
        }

    }
    handleClose() {
        this.props.hideModal();
    }
    renderModalFormElement() {
        let listElement = this.props.modalElementList.filter((person, index) => {
            if (this.props.modalElementList[index].iputpop == true || this.props.modalElementList[index].iputpop === undefined) { return person; }
        });

        if (listElement == null)
            return null;

        return (
            <div className="row">
                {
                    listElement.sort((a, b) => (a.OrderIndex > b.OrderIndex) ? 1 : -1).map((elementItem, index) => {
                        switch (elementItem.Type) {
                            case "textbox":
                                let blDisabledtx = false
                                if (typeof elementItem.objrestValue != "undefined") {
                                    if (elementItem.filterrestValue.includes(this.state.FormData[elementItem.objrestValue].value) || this.state.FormData[elementItem.objrestValue].value == -1) {
                                        blDisabledtx = true;
                                    }
                                }
                                return (
                                    <ElementModal.ElementModalText
                                        onValueChange={this.handleInputChange}
                                        validationErrorMessage={this.state.FormData[elementItem.name].ErrorLst.ValidatonErrorMessage}
                                        inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                                        {...elementItem}
                                        value={this.state.FormData[elementItem.name].value}
                                        Disabled={blDisabledtx}
                                        key={index}
                                    />
                                );
                            case "Datetime":
                                    return (
                                        <ElementModal.ElementModalDatetime
                                            onValueChange={this.handleInputChange}
                                            validationErrorMessage={this.state.FormData[elementItem.name].ErrorLst.ValidatonErrorMessage}
                                            inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                                            {...elementItem}
                                            value={this.state.FormData[elementItem.name].value}
                                            key={index}
                                        />
                                    );
                            case "TextNumber":
                                let blDisabledt = false
                                if (typeof elementItem.objrestValue != "undefined") {
                                    if (elementItem.filterrestValue.includes(this.state.FormData[elementItem.objrestValue].value) || this.state.FormData[elementItem.objrestValue].value == -1) {
                                        blDisabledt = true;
                                    }
                                }

                                return (
                                    <ElementModal.ElementModalNumber
                                        onValueChange={this.handleInputChange}
                                        validationErrorMessage={this.state.FormData[elementItem.name].ErrorLst.ValidatonErrorMessage}
                                        inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                                        {...elementItem}
                                        value={this.state.FormData[elementItem.name].value}
                                        Disabled={blDisabledt}
                                        key={index}
                                    />
                                );
                            case "TextArea":
                                return (
                                    <ElementModal.TextArea
                                        onValueChange={this.handleInputChange}
                                        validationErrorMessage={this.state.FormData[elementItem.name].ErrorLst.ValidatonErrorMessage}
                                        inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                                        {...elementItem}
                                        value={this.state.FormData[elementItem.name].value}
                                        key={index}
                                    />
                                );

                            case "ComboBox":
                                let blDisabled = false
                                if (typeof elementItem.objrestValue != "undefined") {
                                    if (elementItem.filterrestValue.includes(this.state.FormData[elementItem.objrestValue].value) || this.state.FormData[elementItem.objrestValue].value == -1) {
                                        blDisabled = true;
                                    }
                                }

                                return (
                                    <ElementModal.ElementModalComboBox
                                        onValueChange={this.handleInputChange}
                                        inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                                        {...elementItem}
                                        value={this.state.FormData[elementItem.name].value}
                                        validationErrorMessage={this.state.FormData[elementItem.name].ErrorLst.ValidatonErrorMessage}
                                        Disabled={typeof elementItem.objrestValue != "undefined" ? blDisabled : elementItem.Disabled}
                                        key={index}
                                    />
                                );

                            case "ComboBoxEdit":
                                return (
                                    <ElementModal.ElementModalComboBox
                                        onValueChange={this.handleInputChange}
                                        inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                                        {...elementItem}
                                        value={this.state.FormData[elementItem.name].value}
                                        validationErrorMessage={this.state.FormData[elementItem.name].ErrorLst.ValidatonErrorMessage}
                                        Disabled={this.props.isaddComboBox == true ? false : true}
                                        key={index}
                                    />
                                );

                          case "ComboBoxStore":
                                    return (
                                        <ElementModal.ElementModalComboBoxStore
                                            onValueChange={this.handleInputChange}
                                            inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                                            {...elementItem}
                                            value={this.state.FormData[elementItem.name].value}
                                            validationErrorMessage={this.state.FormData[elementItem.name].ErrorLst.ValidatonErrorMessage}
                                            key={index}
                                        />
                                    );
                            case "ProductCombo":
                                let valuename = []
                                if (this.state.FormData[elementItem.name].value != "" && typeof this.state.FormData[elementItem.name].value != "undefined" && this.state.FormData[elementItem.name].value != -1) {
                                    valuename = { value: this.state.FormData[elementItem.name].value, label: this.state.FormData[elementItem.name].value + "-" + this.state.FormData[elementItem.namelabel].value }
                                }
                                return (
                                    <ElementModal.ProductComboBox
                                        onValueChange={this.handleInputChange}
                                        validationErrorMessage={this.state.FormData[elementItem.name].ErrorLst.ValidatonErrorMessage}
                                        inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                                        {...elementItem}
                                        value={valuename}
                                        key={index}
                                    />
                                );

                            case "checkbox":
                                let blDisabledck = false
                                if (typeof elementItem.objrestValue != "undefined") {
                                    if (elementItem.filterrestValue.includes(this.state.FormData[elementItem.objrestValue].value) || this.state.FormData[elementItem.objrestValue].value == -1) {
                                        blDisabledck = true;
                                    }
                                }
                                return (
                                    <ElementModal.CheckBox
                                        onValueChange={this.handleInputChange}
                                        validationErrorMessage={this.state.FormData[elementItem.name].ErrorLst.ValidatonErrorMessage}
                                        inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                                        {...elementItem}
                                        value={this.state.FormData[elementItem.name].value}
                                        Disabled={blDisabledck}
                                        key={index}
                                    />
                                );
                            default:
                                break;
                        }
                    })
                }
            </div>
        );
    }

    render() {
        const { Title } = this.state;
        let elmentRender = "";
        if (this.props.modalElementList) elmentRender = this.renderModalFormElement();
        let maxWidth = '900px';
        if (this.props.maxWidth) maxWidth = this.props.maxWidth;
        return (
            <div className='modals mfp-zoom-out modalconfirmcus modalconfirmcus1'>
                <Overlay />
                <Content onClick={this.onOverlayClick}>
                    <Dialog onClick={this.onDialogClick} customStyle={{ maxWidth: maxWidth }}>
                        <div className="modal-header">
                            <h4 className="modal-title"> {Title}</h4>
                            <button type="button" className="close" onClick={this.handleClose}>
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <Body>
                            {elmentRender}
                            <div className="modal-footer">
                                <button className="btn btn-w-md btn-round btn-info" type="button" onClick={this.handleConfirm}>Cập nhật</button>
                                <button className="btn btn-w-md btn-round btn-secondary" type="button" onClick={this.handleClose}>Bỏ qua</button>
                            </div>
                        </Body>
                    </Dialog>
                </Content>
            </div>
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
export default connect(null, mapDispatchToProps)(ConfirmationNew);
