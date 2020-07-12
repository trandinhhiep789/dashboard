import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ValidationField } from "../../library/validation.js";
import { GetMLObjectData, GetMLObjectObjData } from "../../library/form/FormLib";
import { GET_CACHE_USER_FUNCTION_LIST } from "../../../constants/functionLists";
import { callGetCache } from "../../../actions/cacheAction";
import { Link } from "react-router-dom";
import FormElement from '../FormContainer/FormElement';
import ElementModal from '../FormContainer/FormElement/ElementModal';
import { showModal, hideModal } from '../../../actions/modal';

function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function GUID() {
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
}

class FormContainerCom extends Component {

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputChangeObj = this.handleInputChangeObj.bind(this);
        this.changeLoadComplete = this.changeLoadComplete.bind(this);
        this.handleInputChangeList = this.handleInputChangeList.bind(this);
        this.handleInputChangeMulti = this.handleInputChangeMulti.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.elementItemRefs = [];
        const formData = this.bindData();
        this.state = {
            FormData: formData,
            FormValidation: {},
            ListTabError: [],
            focusTabIndex: -1,
            tabStateID: "",
            FormValidationList: [],
            isDisabled: false,
        };
    }
    changeLoadComplete() {

    }
    componentDidMount() {
        this.setState({
            isDisabled: (this.props.dataSource != undefined ? this.props.dataSource.IsSystem : false)
        })
        this.checkPermission()
    }
    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.dataSource) !== JSON.stringify(nextProps.dataSource)) {
            const FormDataContol = this.state.FormData;
            for (const key in FormDataContol) {
                FormDataContol[key].value = nextProps.dataSource[FormDataContol[key].datasourcemember];
            }
            this.setState({
                FormData: FormDataContol
            });
        }
    }
    //#region BinData
    bindData() {
        const children = this.props.children;
        const dataSource = this.props.dataSource;
        let formData = {};
        const listElement = this.bindDataToControl(typeof this.props.listelement != "undefined" ? this.props.listelement : [], this.props.dataSource);
        if (typeof dataSource != "undefined") {
            listElement.map((elementItem) => {
                const elementname = elementItem.name;
                const ObjectName = { Name: elementname, datasourcemember: elementItem.datasourcemember, value: elementItem.value, Controltype: elementItem.type, label: elementItem.label, labelError: elementItem.label, ErrorLst: [], validatonList: elementItem.validatonList };
                formData = Object.assign({}, formData, { [elementname]: ObjectName });
            });
        }
        React.Children.map(children, (child, i) => {
            if (child.type == "div") {
                const formDataTempList = this.bindDivChildrenData(child, dataSource);
                //  console.log("bindData formDataTempList",formDataTempList)
                for (let i = 0; i < formDataTempList.length; i++) {
                    formData = Object.assign({}, formData, formDataTempList[i]);
                }
            }
            else {
                if (child.props.controltype != null) {
                    const formDataTemp = this.bindFormControlData(child, dataSource);
                    formData = Object.assign({}, formData, formDataTemp);
                }
            }
        });
        return formData;
    }
    bindDivChildrenData(children, dataSource) {
        let formDataList = [];
        React.Children.map(children, (child, i) => {
            if (child.type == "div") {
                const formData = this.bindDivChildrenData(child.props.children, dataSource);
                for (let i = 0; i < formData.length; i++) {
                    formDataList.push(formData[i]);
                }
            }
            else {
                if (child.props.controltype != null) {
                    const formData = this.bindFormControlData(child, dataSource);
                    //  console.log("bindDivChildrenData formData",formData)
                    formDataList.push(formData);
                }
            }
        });
        //   console.log("formDataList",formDataList)
        return formDataList;
    }
    bindFormControlData(child, dataSource) {

        const controltype = child.props.controltype;
        let controlvalue = child.props.value;
        let controlname = child.props.name;
        if (controltype == "InputControl") {
            const datasourcemember = child.props.datasourcemember;
            if (dataSource != null && datasourcemember != null) {
                if (typeof dataSource != "undefined" && datasourcemember != null) {
                    controlvalue = dataSource[datasourcemember];
                }
            }
            const ObjectName = { Name: controlname, datasourcemember: datasourcemember, value: controlvalue, Controltype: controltype, label: child.props.label, ErrorLst: [], validatonList: child.props.validatonList };
            return { [controlname]: ObjectName };
        }
        if (controltype == "InputControlNew") {
            const objvalue = GetMLObjectData(child.props.MLObjectDefinition, {}, this.props.dataSource);
            const ObjectName = { Name: controlname, datasourcemember: datasourcemember, value: objvalue, Controltype: controltype, label: child.props.label, ErrorLst: [], validatonList: child.props.validatonList, listelement: child.props.listelement };
            return { [controlname]: ObjectName };
        }
        if (controltype == "GridControl" || controltype == "InputGridControl") {
            let controlname = child.props.name;
            const ObjectName = { Name: controlname, datasourcemember: controlname, value: child.props.dataSource, Controltype: controltype, label: child.props.label, ErrorLst: [], validatonList: child.props.validatonList };
            return { [controlname]: ObjectName };
        }
        if (controltype == "InputMultiControl") {
            let controlname = child.props.name;
            let controlvalue = child.props.dataSource;
            const datasourcemember = child.props.datasourcemember;
            if (typeof dataSource != "undefined" && datasourcemember != null) {
                controlvalue = dataSource[datasourcemember];
            }
            const ObjectName = { Name: controlname, datasourcemember: controlname, value: controlvalue, Controltype: controltype, label: child.props.label, ErrorLst: [], validatonList: child.props.validatonList };
            return { [controlname]: ObjectName };
        }

        const datasourcemember = child.props.datasourcemember;
        if (typeof dataSource != "undefined" && datasourcemember != null) {
            controlvalue = dataSource[datasourcemember];
            return { [controlname]: controlvalue };
        }
    }

    //#region Bin all

    bindDataToControl(listElement, dataSource) {
        let listElement1 = listElement;
        if (typeof dataSource != "undefined" && listElement1 != [] && dataSource != null) {
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
    //#endregion Bin all

    //#endregion BinData

    //#region InputChange && InputChangeList
    handleInputChange(elementname, elementvalue, namelabel, valuelabel, filterrest) {

        const FormDataContolLstd = this.state.FormData;
        FormDataContolLstd[elementname].value = elementvalue;
        if (typeof filterrest != "undefined" && filterrest != "") {
            const objrest = filterrest.split(",");
            for (let i = 0; i < objrest.length; i++) {
                FormDataContolLstd[objrest[i]].value = -1;
            }
        }
        if (typeof FormDataContolLstd[elementname].validatonList != "undefined") {
            const validation = ValidationField(FormDataContolLstd[elementname].validatonList, elementvalue, FormDataContolLstd[elementname].label, FormDataContolLstd[elementname]);
            const validationObject = { IsValidatonError: validation.IsError, ValidatonErrorMessage: validation.Message };
            FormDataContolLstd[elementname].ErrorLst = validationObject;
        }
        if (typeof namelabel != "undefined" && namelabel != "") {
            FormDataContolLstd[namelabel].value = valuelabel;
        }



        this.setState({
            FormData: FormDataContolLstd,
        });
        if (this.props.onchange != null) {
            this.props.onchange(this.state.FormData, this.props.MLObjectDefinition);
        }

    }

    handleInputChangeMulti(elementname, elementvalue) {
        const FormDataContolLstd = this.state.FormData;
        FormDataContolLstd[elementname].value = elementvalue;
        if (typeof FormDataContolLstd[elementname].validatonList != "undefined") {
            if (elementvalue.length < 1) {
                const validationObject = { IsValidatonError: true, ValidatonErrorMessage: "vui lòng chọn " + FormDataContolLstd[elementname].label };
                FormDataContolLstd[elementname].ErrorLst = validationObject;
            }
            else {
                const validationObject = { IsValidatonError: false, ValidatonErrorMessage: "" };
                FormDataContolLstd[elementname].ErrorLst = validationObject;
            }
        }
        this.setState({
            FormData: FormDataContolLstd,
        });

    }
    handleInputChangeObj(elementname, elementvalue) {
        let FormDataContolLstd = this.state.FormData;
        let objelementname = Object.assign({}, FormDataContolLstd[elementname], { value: elementvalue });
        FormDataContolLstd = Object.assign({}, FormDataContolLstd, { [elementname]: objelementname });

        this.setState({
            FormData: FormDataContolLstd,
        });
    }

    handleInputChangeList(name, tabNameList) {
        const FormDataContolLstd = this.state.FormData;

        FormDataContolLstd[name].value = tabNameList;
        this.setState({
            FormData: FormDataContolLstd,
        });
    }
    //#endregion

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
            //      console.log("formValidation:", formValidation);

            if (formValidation[key].ErrorLst != undefined) {
                // console.log("validation:", key, this.elementItemRefs[key]);
                if (formValidation[key].ErrorLst != [] && formValidation[key].ErrorLst.IsValidatonError) {
                    this.elementItemRefs[key].focus()
                    // this.elementItemRefs[key].getElementsByTagName('input')[0].focus()
                    //     console.log("elementItemRefs[key].",key,this.elementItemRefs[key].Children)
                    // this.elementItemRefs[key].find("input")[0].focus()
                    return key;
                }
            }
        }
        return "";
    }

    //#endregion validation TabContainers


    checkPermission() {
        let permissionKey = this.props.RequirePermission;
        if (!permissionKey) {
            this.setState({ IsPermision: true });
            return;
        }
        this.props.callGetCache(GET_CACHE_USER_FUNCTION_LIST).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                for (let i = 0; i < result.ResultObject.CacheData.length; i++) {
                    if (result.ResultObject.CacheData[i].FunctionID == permissionKey) {
                        this.setState({ IsPermision: true });
                        return;
                    }
                }
                this.setState({ IsPermision: false });
            } else {
                this.setState({ IsPermision: 'error' });
            }

        });
    }

    //#region render Children
    autoLayoutChildren() {
        const children = this.props.children;
        return React.Children.map(children, (child, i) => {
            if (child.type == "div") {
                return this.renderDivChildren(child);
            }
            else {
                if (child.props.controltype != null) {

                    return this.layoutFormControl(child);
                }
                return child;
            }
        });
    }
    renderDivChildren(children) {
        return React.Children.map(children, (child, i) => {
            if (child.type == "div") {
                return <div className={child.props.className}>
                    {this.renderDivChildren(child.props.children)}
                </div>
            }
            else {
                if (child.props.controltype != null) {
                    return this.layoutFormControl(child);
                }
                else {
                    return child;
                }
            }
        });
    }
    layoutFormControl(child) {
        if (child != null) {
            if (child.props.controltype != null) {
                const controltype = child.props.controltype;
                if (controltype == "InputControl") {
                    const controlname = child.props.name;
                    let strfilterValue = child.props.filterValue;
                    if (typeof child.props.filterName != "undefined") {
                        strfilterValue = this.state.FormData[child.props.filterName].value
                    }
                    return React.cloneElement(child,
                        {
                            onValueChange: this.handleInputChange,
                            value: this.state.FormData[controlname].value,
                            filterValue: strfilterValue,
                            validationErrorMessage: this.state.FormData[controlname].ErrorLst.ValidatonErrorMessage,
                            inputRef: ref => this.elementItemRefs[controlname] = ref
                        }
                    );
                }
                else if (controltype == "InputControlNew") {
                    const controlname = child.props.name;
                    return React.cloneElement(child,
                        {
                            onValueChange: this.handleInputChangeObj,
                            value: this.state.FormData[controlname].value,
                            inputRef: ref => this.elementItemRefs[controlname] = ref
                        }
                    );
                }
                else if (controltype == "GridControl" || controltype == "InputGridControl") {
                    const controlname = child.props.name;

                    return React.cloneElement(child,
                        {
                            onValueChange: this.handleInputChangeList,
                            value: this.state.FormData[controlname].value
                        }
                    );
                }
                else if (controltype == "InputMultiControl") {
                    const controlname = child.props.name;
                    let strfilterValue = child.props.filterValue;
                    if (typeof child.props.filterName != "undefined") {
                        strfilterValue = this.state.FormData[child.props.filterName].value
                    }
                    return React.cloneElement(child,
                        {
                            onValueChange: this.handleInputChangeMulti,
                            value: this.state.FormData[controlname].value,
                            filterValue: strfilterValue,
                            inputRef: ref => this.elementItemRefs[controlname] = ref,
                            validationErrorMessage: this.state.FormData[controlname].ErrorLst.ValidatonErrorMessage,
                        }
                    );
                }
            }
        }
        return child;
    }
    //#endregion render Children

    //#region  handleSubmit
    handleSubmit(e) {
        e.preventDefault();
        const formValidation = this.validationFormNew();
        if (this.checkInputName(formValidation) != "")
            return;

        let MLObject = {};
        const mLObjectDefinition = this.props.MLObjectDefinition;
        mLObjectDefinition.map((Item) => {
            const controlName = Item.BindControlName;
            if (controlName.length > 0) {
                if (typeof this.state.FormData[controlName] != "undefined") {
                    if (this.state.FormData[controlName].Controltype == "InputControl") {
                        MLObject = Object.assign({}, MLObject, { [Item.Name]: this.state.FormData[controlName].value });
                    }
                    else if (this.state.FormData[controlName].Controltype == "hidden") {
                        MLObject = Object.assign({}, MLObject, { [Item.Name]: this.state.FormData[controlName].value });
                    }
                    else if (this.state.FormData[controlName].Controltype == "InputControlNew") {
                        MLObject = Object.assign({}, MLObject, this.state.FormData[controlName].value);
                    }
                    else {
                        MLObject = Object.assign({}, MLObject, { [Item.Name]: this.state.FormData[controlName].value });
                    }
                }
            }
        });
        if (this.props.onSubmit != null) {
            this.props.onSubmit(this.state.FormData, MLObject);
        }
    }

    //#endregion  handleSubmit
    // renderOneColumnForm() {
    //     const listElement = this.props.listelement;
    //     if (listElement == null)
    //         return null;

    //     return listElement.map((elementItem, index) => {
    //         if (elementItem.type != "hidden") {
    //             return (<div className="form-row" key={"div" + elementItem.name}>
    //                 <FormElement type={elementItem.type} name={elementItem.name}
    //                     CSSClassName="form-control form-control-sm"
    //                     value={this.state.FormData[elementItem.name].value}
    //                     label={elementItem.label} placeholder={elementItem.placeholder}
    //                     icon={elementItem.icon}
    //                     onValueChange={this.handleInputChange}
    //                     inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
    //                     listoption={elementItem.listoption}
    //                     key={elementItem.name}
    //                     readonly={elementItem.readonly}
    //                     validatonList={elementItem.validatonList}
    //                     validationErrorMessage={this.state.FormData[elementItem.name].ErrorLst.ValidatonErrorMessage}
    //                     IsAutoLoadItemFromCache={elementItem.IsAutoLoadItemFromCache}
    //                     LoadItemCacheKeyID={elementItem.LoadItemCacheKeyID}
    //                     ValueMember={elementItem.ValueMember}
    //                     NameMember={elementItem.NameMember}
    //                     accept={elementItem.accept}
    //                     multiple={elementItem.multiple}
    //                     maxSize={elementItem.maxSize}
    //                     minSize={elementItem.minSize}
    //                 />
    //             </div>);
    //         }
    //     }
    //     );
    // }

    renderOneColumnForm() {
        let listElement = this.props.listelement;
        if (listElement == null)
            return null;

        return (
            <div className="row">
                {
                    listElement.sort((a, b) => (a.OrderIndex > b.OrderIndex) ? 1 : -1).map((elementItem, index) => {
                        switch (elementItem.type) {
                            case "text":
                                return (
                                    <ElementModal.ElementModalText
                                        onValueChange={this.handleInputChange}

                                        validationErrorMessage={this.state.FormData[elementItem.name].ErrorLst.ValidatonErrorMessage}
                                        inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                                        {...elementItem}
                                        value={this.state.FormData[elementItem.name].value}
                                        disabled={this.state.isDisabled}
                                        key={index}
                                    />
                                );
                            case "TextNumber":
                                return (
                                    <ElementModal.ElementModalNumber
                                        onValueChange={this.handleInputChange}
                                        validationErrorMessage={this.state.FormData[elementItem.name].ErrorLst.ValidatonErrorMessage}
                                        inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                                        {...elementItem}
                                        value={this.state.FormData[elementItem.name].value}
                                        disabled={this.state.isDisabled}
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
                                        disabled={this.state.isDisabled}

                                        key={index}
                                    />
                                );

                            case "select":

                                if (typeof elementItem.filterName != "undefined") {
                                    elementItem.filterValue = this.state.FormData[elementItem.filterName].value;
                                }
                                return (
                                    <ElementModal.ElementModalComboBox
                                        onValueChange={this.handleInputChange}
                                        validationErrorMessage={this.state.FormData[elementItem.name].ErrorLst.ValidatonErrorMessage}
                                        inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                                        {...elementItem}
                                        value={this.state.FormData[elementItem.name].value}
                                        disabled={this.state.isDisabled}

                                        key={index}
                                    />
                                );
                            case "ProductCombo":
                                if (this.state.FormData[elementItem.name].value != "" && typeof this.state.FormData[elementItem.name].value != "undefined")
                                    elementItem.value = { value: this.state.FormData[elementItem.name].value, label: this.state.FormData[elementItem.namelabel].value }



                                return (
                                    <ElementModal.ProductComboBox
                                        onValueChange={this.handleInputChange}
                                        validationErrorMessage={this.state.FormData[elementItem.name].ErrorLst.ValidatonErrorMessage}
                                        inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                                        {...elementItem}
                                        value={this.state.FormData[elementItem.name].value}
                                        disabled={this.state.isDisabled}
                                        key={index}
                                    />
                                );

                            case "checkbox":
                                if (elementItem.datasourcemember != "IsSystem")
                                    elementItem.disabled = this.state.isDisabled

                                return (
                                    <ElementModal.CheckBox
                                        onValueChange={this.handleInputChange}
                                        validationErrorMessage={this.state.FormData[elementItem.name].ErrorLst.ValidatonErrorMessage}
                                        inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                                        {...elementItem}
                                        value={this.state.FormData[elementItem.name].value}
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

    handleCloseModle() {
        this.props.hideModal();
    }

    render() {
        let elmentRender = this.renderOneColumnForm();
        if (this.state.IsPermision == undefined) {
            return <p className="col-md-12">Đang kiểm tra quyền...</p>
        }
        if (this.state.IsPermision == false) {
            return <p className="col-md-12">Bạn không có quyền</p>
        }
        if (this.state.IsPermision === 'error') {
            return <p className="col-md-12">Lỗi khi kiểm tra quyền, vui lòng thử lại</p>
        }

        let backLinkButton = "";
        if (this.props.BackLink != null) {
            if (this.props.BackLink.length > 0) {
                backLinkButton = (<Link to={this.props.BackLink}>
                    <button className="btn btn-sm btn-outline btn-primary" type="button">Quay lại</button></Link>);
            }
        }
        let closeLinkButton = "";
        if (this.props.IsCloseModal != undefined) {
            if (this.props.IsCloseModal == true) {
                closeLinkButton = (
                    <button onClick={this.handleCloseModle.bind(this)} className="btn btn-sm btn-outline btn-primary" type="button">Đóng</button>);
            }
        }

        let cssSearchButton = "";
        // console.log("this.props.isSubmitForm ", this.props.isSubmitFrom )
        return (
            <div className="col-lg-12">
                <form className="card" action="" onSubmit={this.handleSubmit}>
                    {this.props.FormName ? <h4 className="card-title"><strong>{this.props.FormName}</strong></h4> : ""}
                    <div className="card-body">
                        {elmentRender}
                        {
                            this.autoLayoutChildren()
                        }
                    </div>
                    <footer className="card-footer text-right" hidden={this.props.IsHideFooter}>
                        {(this.props.isSubmitForm == undefined || this.props.isSubmitForm == true) &&
                            <button className="btn btn-primary mr-3" type="submit">{cssSearchButton} Cập nhật</button>
                        }
                        {backLinkButton}
                        {closeLinkButton}
                    </footer>
                </form>
            </div>
        );

    }
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: () => {
            dispatch(hideModal());
        }
    }
}
const FormContainer = connect(mapStateToProps, mapDispatchToProps)(FormContainerCom);
export default FormContainer;