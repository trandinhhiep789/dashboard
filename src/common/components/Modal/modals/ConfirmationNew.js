import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { hideModal } from '../../../../actions/modal';
import FormElement from '../../../../common/components/FormContainer/FormElement';
import { ValidationField } from "../../../library/validation.js"


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

        const formData = this.bindData();
        this.state = {
            Title: this.props.title ? this.props.title : "",
            FormData: formData,
            FormValidation: {}

        };
    }

    //#region BinData
    bindData() {
        const dataSource = this.props.dataSource;
        let formData = {};
        const listElement = this.bindDataToControl(this.props.modalElementOl, this.props.dataSource);
        if (typeof dataSource != "undefined") {
            listElement.map((elementItem) => {
                const elementname = elementItem.Name;
                formData = Object.assign({}, formData, { [elementname]: elementItem.value });
            });
        }
        return formData;
    }

    bindDataToControl(listElement, dataSource) {
      //  console.log("bindDataToControl",listElement,dataSource);
        let listElement1 = listElement;
        if (typeof dataSource != "undefined") {
            listElement1 = listElement.map((elementItem) => {
                const elementvalue = dataSource[elementItem.DataSourceMember];
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
    handleInputChange(elementname, elementvalue, controllabel, listvalidation, listvalidationRow,elementdata) {
      
        if (typeof listvalidationRow != "undefined") {
            let formValidation1 = this.state.FormValidation;
            const validation = ValidationField(listvalidationRow, elementvalue, controllabel)
            const validationObject = { IsValidatonError: validation.IsError, ValidatonErrorMessage: validation.Message };
            const formValidation = Object.assign({}, formValidation1, { [elementname]: validationObject });
            this.setState({
                FormValidation: formValidation
            });
        }
        if (typeof elementdata != "undefined") {
            const formData = Object.assign({}, this.state.FormData, elementdata);

            this.setState({
                FormData: formData
            });
        }
        else
        {
            const formData = Object.assign({}, this.state.FormData, { [elementname]: elementvalue });
            this.setState({
                FormData: formData
            });
        }
    }
    //#endregion InputChange && InputChangeList  

    validationForm() {
        const listElement = this.props.modalElementList;
        listElement.map((elementItem) => {
            const validatonList = elementItem.validatonList;
            if (validatonList && validatonList.length > 0) {
                const inputvalue = this.state.FormData[elementItem.Name];
                //   console.log("inputvalue:", inputvalue);
                //   console.log("elementItem.Name:", elementItem.name);
                const validation = ValidationField(validatonList, inputvalue, elementItem.Caption)
                const validationObject = { IsValidatonError: validation.IsError, ValidatonErrorMessage: validation.Message };
                //  console.log("validation:", validation, validationObject);
                this.FormValidationNew = Object.assign({}, this.FormValidationNew, { [elementItem.Name]: validationObject });
            }
        });

     
        this.setState({
            FormValidation: this.FormValidationNew
        });

        return this.FormValidationNew;
    }
    checkInput(formValidation) {
        for (const key in formValidation) {
            if (formValidation[key].IsValidatonError != undefined) {
                if (formValidation[key].IsValidatonError) {
                    return false;
                }
            }
            else {
                const elementob = formValidation[key];
                //console.log("elementob",elementob,key)
                for (const key1 in elementob) {
                    if (elementob[key1].IsValidatonError != undefined) {
                        if (elementob[key1].IsValidatonError) {
                            return false;
                        }
                    }
                    else {

                        const element = elementob[key1];
                        for (const key2 in element) {
                            if (element[key2].IsValidatonError != undefined) {
                                if (element[key2].IsValidatonError) {
                                    return false;
                                }
                            }
                            else {

                                const elem = element[key2];
                                for (const key3 in elem) {
                                    if (elem[key3].IsValidatonError) {
                                        return false;
                                    }
                                }
                            }

                        }
                    }
                }
            }
        }
        return true;
    }

    handleConfirm() {
        const formValidation = this.validationForm();

        if (!this.checkInput(formValidation))
            return;
        if (this.props.onConfirm != null) {
            if(this.props.autoCloseModal){
                this.props.hideModal();
            }
            this.props.onConfirm(false, this.state.FormData, this.state.SelectedFile);
        }

    }
    handleClose() {
        this.props.hideModal();
    }
    renderModalFormElement() {
        const listElement = this.props.modalElementList;
        if (listElement == null)
            return null;

        return listElement.map((elementItem, index) => {
            let validationErrorMessage = "";
            if (this.state.FormValidation && this.state.FormValidation[elementItem.Name]) {
                validationErrorMessage = this.state.FormValidation[elementItem.Name].ValidatonErrorMessage;
            }
            // console.log("listElement",this.state.FormData[elementItem.Name]);
            return (<div className="form-row" key={"div" + elementItem.Name}>
                <FormElement type={elementItem.Type} name={elementItem.Name}
                    id={elementItem.ID}
                    CSSClassName="form-control form-control-sm"
                    value={this.state.FormData[elementItem.Name]}
                    label={elementItem.Caption}
                    cation={elementItem.Caption}
                    placeholder={elementItem.placeholder}
                    icon={elementItem.icon}
                    onValueChange={this.handleInputChange}
                    listoption={elementItem.listoption}
                    key={elementItem.Name}
                    readonly={elementItem.readonly}
                    validatonList={elementItem.validatonList}
                    validationErrorMessage={validationErrorMessage}
                    IsAutoLoadItemFromCache={elementItem.IsAutoLoadItemFromCache}
                    LoadItemCacheKeyID={elementItem.LoadItemCacheKeyID}
                    ValueMember={elementItem.ValueMember}
                    NameMember={elementItem.NameMember}
                    accept={elementItem.accept}
                    multiple={elementItem.multiple}
                    maxSize={elementItem.maxSize}
                    minSize={elementItem.minSize}
                />
            </div>);
        }
        );
    }

    render() {
        const { Title } = this.state;
        let elmentRender = "";
        if (this.props.modalElementList) elmentRender = this.renderModalFormElement();
        let maxWidth = '900px';
        if (this.props.maxWidth) maxWidth = this.props.maxWidth;
        return (
            <div className='modals mfp-zoom-out modalconfirmcus'>
                <Overlay />
                <Content onClick={this.onOverlayClick}>
                    <Dialog onClick={this.onDialogClick} customStyle={{ maxWidth: maxWidth }}>
                        <div className="modal-header">
                            {Title}

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
