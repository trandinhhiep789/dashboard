import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ValidationField } from "../../library/validation.js";
import {  GetMLObjectData } from "../../library/form/FormLib";
import { GET_CACHE_USER_FUNCTION_LIST } from "../../../constants/functionLists";
import { callGetCache } from "../../../actions/cacheAction";
import { Link } from "react-router-dom";
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

    FormValidationNew = {};
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.changeLoadComplete = this.changeLoadComplete.bind(this);
        this.handleInputChangeList = this.handleInputChangeList.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.elementItemRefs = [];
        const formData = this.bindData();
        console.log("formData",formData)
        this.state = {
            FormData: formData,
            FormValidation: {},
            ListTabError: [],
            focusTabIndex: -1,
            tabStateID: "",
            FormValidationList: []
        };
    }
    changeLoadComplete() {
    }
    componentDidMount() {
        this.checkPermission()
    }
    //#region BinData
    bindData() {
        const children = this.props.children;
        const dataSource = this.props.dataSource;
        let formData = {};
      
        React.Children.map(children, (child, i) => {
            if (child.type == "div") {
                const formDataTempList = this.bindDivChildrenData(child, dataSource);
                console.log("bindData formDataTempList",formDataTempList)
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
                controlvalue = dataSource[datasourcemember];
            }
            const ObjectName = { Name: controlname, value: controlvalue, Controltype: controltype, label: child.props.label, ErrorLst: [], validatonList: child.props.validatonList };
            return { [controlname]:ObjectName};
        }
        if (controltype == "GridControl") {
            controlvalue = child.props.dataSource;
            return { [controlname]: controlvalue };
        }
     
        const datasourcemember = child.props.datasourcemember;
        if (dataSource != null && datasourcemember != null) {
            controlvalue = dataSource[datasourcemember];
            return { [controlname]: controlvalue };
        }
    }

    //#region Bin all
    bindAllTabData(parent) {
        let formDataList = [];
        React.Children.map(parent.props.children, (child, index) => {
            const formData = this.bindDataTabrow(child.props.children);
            let formDataTemp = {};
            for (let i = 0; i < formData.length; i++) {
                formDataTemp = Object.assign({}, formDataTemp, formData[i]);
            }
            formDataList = Object.assign({}, formDataList, { [child.props.name]: formDataTemp });
        });
        return formDataList;
    }
    bindDivChildrenDataTab(children) {
        let formDataList = [];
        React.Children.map(children, (child, i) => {
            if (child.type == "div") {
                const formData = this.bindDivChildrenDataTab(child.props.children);
                for (let i = 0; i < formData.length; i++) {
                    formDataList.push(formData[i]);
                }
            }
            else {
                if (child.props.controltype != null) {
                    const formData = this.bindFormControlDataTab(child);
                    formDataList.push(formData);
                }
            }
        });
        return formDataList;
    }
    bindFormControlDataTab(child) {
        const controltype = child.props.controltype;
        let controlvalue = child.props.value;
        let controlname = child.props.name;
        if (controltype == "InputControl") {

            return { [controlname]: controlvalue };
        }
        if (controltype == "GridControl") {
            controlvalue = child.props.dataSource;
            return controlvalue;
        }
    }
    bindDataTabrow(children, dataSource) {
        let formDataList = [];
        React.Children.map(children, (child, i) => {
            if (child.type == "div") {
                const formData = this.bindDivChildrenDataTab(child, dataSource);
                for (let i = 0; i < formData.length; i++) {
                    formDataList.push(formData[i]);
                }
            }
            else {
                if (child.props.controltype != null) {
                    const formData = this.bindFormControlDataTab(child, dataSource);
                    formDataList.push(formData);
                }
            }
        });
        //  console.log("bindDataTabrow", formDataList);
        return formDataList;
    }
    bindDataToControl(listElement, dataSource) {
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
    //#endregion Bin all

    //#endregion BinData

    //#region InputChange && InputChangeList  
    handleInputChange(elementname, elementvalue, controllabel, listvalidation, listvalidationRow) {
        //console.log('change')
        if (typeof listvalidation != "undefined") {
            let formValidation1 = this.state.FormValidation;
            const formValidation = Object.assign({}, formValidation1, { [elementname]: listvalidation });
            this.setState({
                FormValidation: formValidation
            });
        }
   
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
    handleInputChangeList(formDataList, tabNameList, tabMLObjectDefinitionList, formValidationTap) {
        //console.log("FormContainer handleInputChangeList: ", formDataList, tabNameList, tabMLObjectDefinitionList, formValidationTap);
        if (typeof formValidationTap != "undefined") {
            let formValidation = this.state.FormValidation;
            const formValidationNew = Object.assign({}, formValidation, formValidationTap);
            this.setState({
                FormValidation: formValidationNew
            });
        }
        let formDataTemp = this.state.FormData;
        for (let i = 0; i < tabNameList.length; i++) {
            const tabName = tabNameList[i];
            const tabMLObjectDefinition = tabMLObjectDefinitionList[i];
            if (tabName != null && tabMLObjectDefinition != null) {
                const tabMLData = GetMLObjectData(tabMLObjectDefinition, formDataList[i]);
                formDataTemp = Object.assign({}, formDataTemp, { [tabName]: tabMLData });
            }
            else {
                const formData = formDataList[i];
                Object.keys(formData).forEach(function (key) {
                    formDataTemp = Object.assign({}, formDataTemp, { [key]: formData[key] });
                });
            }
        }
        this.setState({ FormData: formDataTemp });
        // console.log("FormContainer handleInputChangeList formDataTemp: ", formDataTemp,formValidationNew);
    }
    //#endregion

    //#region validation InputControl
    validationForm() {
        const children = this.props.children;
        if (children) {
            this.validationchildren(children)
        }
        this.setState({
            FormValidation: this.FormValidationNew
        });

        return this.FormValidationNew;
    }
    validationchildren(children) {
        //  console.log("validationchildren:", children);
        React.Children.map(children, (child, i) => {
            //  console.log("validationchildren:", child.type);
            if (child.type == "div") {
                this.validationchildren(child.props.children);
            }
            else {
                if (child.props.controltype != null) {
                    this.validationRow(child);

                }
            }
        });
    }
    validationRow(children) {
        React.Children.map(children, (child, i) => {
            const componenttype = child.props.controltype;
            switch (componenttype) {
                case "InputControl":
                    this.validationInputControl(child);
                    break;
                case "GridControl":
                    this.validationGridInputControl(child);
                default:
            }
        });
    }
    validationInputControl(child) {
        const name = child.props.name;
        const validatonList = child.props.validatonList;
        const value = this.state.FormData[name];

        // console.log("validationInputControl:name ", name + " /value: " + value + " /validatonList: " + JSON.stringify(validatonList));
        if (typeof validatonList != "undefined") {
            const validation = ValidationField(validatonList, value, child.props.label, child.props)
            const validationObject = { IsValidatonError: validation.IsError, ValidatonErrorMessage: validation.Message };
            this.FormValidationNew = Object.assign({}, this.FormValidationNew, { [name]: validationObject });
            //   console.log("validationInputControl:formValidation ", formValidation);
            //  console.log("validationInputControl:FormValidation ", JSON.stringify(this.state.FormValidation) + " /formValidation: " + JSON.stringify(formValidation) + " /validationObject: " + JSON.stringify(validationObject));
        }

    }
    validationGridInputControl(child) {
        const name = child.props.name;
        const listElement = child.props.listColumn;
        let inputGridData = this.state.FormData[child.props.name];
        //   console.log("inputGridData",inputGridData);
        let listgridData = {};
        inputGridData.map((row, indexRow) => {
            let elementobject = {};
            listElement.map((elementItem, index) => {
                const validatonList = elementItem.validatonList;
                if (typeof validatonList != "undefined") {
                    const inputvalue = row[elementItem.Name];
                    const validation = ValidationField(validatonList, inputvalue, elementItem.Caption)
                    //console.log("inputGridData",validation,elementItem.Name,inputvalue);
                    const validationObject = { IsValidatonError: validation.IsError, ValidationErrorMessage: validation.Message };
                    elementobject = Object.assign({}, elementobject, { [elementItem.Name]: validationObject });
                }
            });

            listgridData = Object.assign({}, listgridData, { [indexRow]: elementobject });
        });

        this.FormValidationNew = Object.assign({}, this.FormValidationNew, { [name]: listgridData });
        //    this.FormValidationNew = Object.assign({}, this.FormValidationNew, { [name]: validationObject });
    }

    validationFormNew() {
        const FormDataContolLst = this.state.FormData;
        console.log("validationFormNew",FormDataContolLst)
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

    //#endregion validation TabContainer


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
                    // let FormValidation1 = this.state.FormValidation;
                  
                    const controlname = child.props.name;
                    // const controlvalue = this.state.FormData[controlname];

                    // let validationErrorMessage = "";
                    // if (FormValidation1[child.props.name] != null) {
                    //     validationErrorMessage = FormValidation1[child.props.name].ValidatonErrorMessage;
                    // }
                   // console.log("controlname",controlname,this.state.FormData)
                   // console.log("aa",this.state.FormData[controlname].value,this.state.FormData[controlname].ErrorLst.ValidatonErrorMessage);
                    return React.cloneElement(child,
                        {
                            onValueChange: this.handleInputChange,
                            value: this.state.FormData[controlname].value,
                            validationErrorMessage: this.state.FormData[controlname].ErrorLst.ValidatonErrorMessage,
                            inputRef:ref => this.elementItemRefs[controlname] = ref
                        }
                    );
                }
                else if (controltype == "GridControl") {

                    let FormValidation1 = this.state.FormValidation;
                    const controlname = child.props.name;
                    const controlvalue = this.state.FormData[controlname];
                    let listvalidationError = {};
                    if (FormValidation1[child.props.name] != null) {
                        listvalidationError = FormValidation1[child.props.name];
                    }
                    return React.cloneElement(child,
                        {
                            onValueChange: this.handleInputChange,
                            value: controlvalue,
                            listvalidationError: listvalidationError,
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

        // const mLObjectDefinition = this.props.MLObjectDefinition;
        // console.log("handleSubmit mLObjectDefinition: ", JSON.stringify(mLObjectDefinition));
        // console.log("handleSubmit/FormData: ",JSON.stringify(this.state.FormData));
        // console.log("handleSubmit dataSource: ", JSON.stringify(this.props.dataSource));
        // const MLObject = GetMLObjectData(mLObjectDefinition, this.state.FormData, this.props.dataSource);
        //  console.log("Submit MLObject!", JSON.stringify(MLObject));
        // const formValidation = this.validationForm();

        // console.log("formValidation!", JSON.stringify(formValidation));

        // if (!this.checkInput(formValidation))
        //     return;
        // if (this.props.onSubmit != null) {
        //     this.props.onSubmit(this.state.FormData, MLObject);
        // }
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
    //#endregion  handleSubmit 

    render() {



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
        let cssSearchButton = "";

        return (
            <div className="col-lg-12">
                <form className="card" action="" onSubmit={this.handleSubmit}>
                    {this.props.FormName ? <h4 className="card-title"><strong>{this.props.FormName}</strong></h4> : ""}
                    <div className="card-body">
                        {
                            this.autoLayoutChildren()
                        }
                    </div>
                    <footer className="card-footer text-right" hidden={this.props.IsHideFooter}>
                        <button className="btn btn-primary" type="submit">{cssSearchButton} Cập nhật</button> {backLinkButton}
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
        }
    }
}
const FormContainer = connect(mapStateToProps, mapDispatchToProps)(FormContainerCom);
export default FormContainer; 