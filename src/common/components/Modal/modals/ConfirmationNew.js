import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { hideModal } from '../../../../actions/modal';
import FormElement from '../../../../common/components/FormContainer/FormElement/ModelIndex.js';
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
                const elementname = elementItem.Name;
                const ObjectName = { Name: elementname, value: elementItem.value, Controltype: elementItem.Type, label: elementItem.Caption,labelError: elementItem.Caption, ErrorLst: [], validatonList: elementItem.validatonList };
                formData = Object.assign({}, formData, { [elementname]: ObjectName });
            });
        
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
    handleInputChange(elementname, elementvalue, controllabel, listvalidation, listvalidationRow) {
        //console.log('change')
        const FormDataContolLstd = this.state.FormData;
        FormDataContolLstd[elementname].value = elementvalue;
        if (typeof FormDataContolLstd[elementname].validatonList != "undefined") {
            const validation = ValidationField(FormDataContolLstd[elementname].validatonList, elementvalue, FormDataContolLstd[elementname].label, FormDataContolLstd[elementname]);
            const validationObject = { IsValidatonError: validation.IsError, ValidatonErrorMessage: validation.Message };
            FormDataContolLstd[elementname].ErrorLst = validationObject;
        }
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
                if (controlName.length > 0) {
                    console.log(this.state.FormData,this.state.FormData[controlName].value);
                    MLObject = Object.assign({}, MLObject, { [Item.Name]: this.state.FormData[controlName].value });
                }
            });
            this.props.onConfirm(false,MLObject, this.state.SelectedFile);
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
            return (<div className="form-row" key={"div" + elementItem.Name}>
                <FormElement type={elementItem.Type} name={elementItem.Name}
                    CSSClassName="form-control form-control-sm"
                    value={this.state.FormData[elementItem.Name].value}
                    label={elementItem.Caption}
                    cation={elementItem.Caption}
                    placeholder={elementItem.placeholder}
                    icon={elementItem.icon}
                    onValueChange={this.handleInputChange}
                    inputRef={ref => this.elementItemRefs[elementItem.Name] = ref}
                    listoption={elementItem.listoption}
                    key={elementItem.Name}
                    readonly={elementItem.readonly}
                    validatonList={elementItem.validatonList}
                    validationErrorMessage={this.state.FormData[elementItem.Name].ErrorLst.ValidatonErrorMessage}
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
