import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ValidationField } from "../../library/validation.js";
import { GetMLObjectData, GetMLObjectObjData } from "../../library/form/FormLib";
import { GET_CACHE_USER_FUNCTION_LIST } from "../../../constants/functionLists";
import { callGetCache } from "../../../actions/cacheAction";
import { Link } from "react-router-dom";
import FormElement from '../FormContainer/FormElement';
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
        this.handleSubmit = this.handleSubmit.bind(this);
        this.elementItemRefs = [];
        const formData = this.bindData();
        console.log("formData", formData)
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
    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.dataSource) !== JSON.stringify(nextProps.dataSource)) {
            console.log("nextProps.dataSource",this.state.FormData,nextProps.dataSource)
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
                const ObjectName = { Name: elementname,datasourcemember:elementItem.datasourcemember, value: elementItem.value, Controltype: elementItem.type, label: elementItem.label, labelError: elementItem.label, ErrorLst: [], validatonList: elementItem.validatonList };
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
                controlvalue = dataSource[datasourcemember];
            }
            const ObjectName = { Name: controlname,datasourcemember:datasourcemember, value: controlvalue, Controltype: controltype, label: child.props.label, ErrorLst: [], validatonList: child.props.validatonList };
            return { [controlname]: ObjectName };
        }
        if (controltype == "InputControlNew") {
            const objvalue = GetMLObjectData(child.props.MLObjectDefinition, {}, this.props.dataSource);
            const ObjectName = { Name: controlname,datasourcemember:datasourcemember, value: objvalue, Controltype: controltype, label: child.props.label, ErrorLst: [], validatonList: child.props.validatonList, listelement: child.props.listelement };
            return { [controlname]: ObjectName };
        }
        if (controltype == "GridControl"||controltype == "InputGridControl") {
            let controlname = child.props.name;
            const ObjectName = { Name: controlname,datasourcemember:controlname, value: child.props.dataSource, Controltype: controltype, label: child.props.label, ErrorLst: [], validatonList: child.props.validatonList };
            return { [controlname]: ObjectName };
        }

        const datasourcemember = child.props.datasourcemember;
        if (dataSource != null && datasourcemember != null) {
            controlvalue = dataSource[datasourcemember];
            return { [controlname]: controlvalue };
        }
    }

    //#region Bin all

    bindDataToControl(listElement, dataSource) {
        let listElement1 = listElement;
        if (typeof dataSource != "undefined" && listElement1 != []) {
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
                    this.elementItemRefs[key].focus();
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
                    return React.cloneElement(child,
                        {
                            onValueChange: this.handleInputChange,
                            value: this.state.FormData[controlname].value,
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
                    else if (this.state.FormData[controlName].Controltype == "InputControlNew") {
                        MLObject = Object.assign({}, MLObject, this.state.FormData[controlName].value);
                    }
                }
            }
        });
        console.log("MLObject", MLObject,this.state.FormData)
        if (this.props.onSubmit != null) {
            this.props.onSubmit(this.state.FormData, MLObject);
        }
    }

    //#endregion  handleSubmit
    renderOneColumnForm() {
        const listElement = this.props.listelement;
        if (listElement == null)
            return null;

        return listElement.map((elementItem, index) => {
            return (<div className="form-row" key={"div" + elementItem.name}>
                <FormElement type={elementItem.type} name={elementItem.name}
                    CSSClassName="form-control form-control-sm"
                    value={this.state.FormData[elementItem.name].value}
                    label={elementItem.label} placeholder={elementItem.placeholder}
                    icon={elementItem.icon}
                    onValueChange={this.handleInputChange}
                    inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                    listoption={elementItem.listoption}
                    key={elementItem.name}
                    readonly={elementItem.readonly}
                    validatonList={elementItem.validatonList}
                    validationErrorMessage={this.state.FormData[elementItem.name].ErrorLst.ValidatonErrorMessage}
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
        let cssSearchButton = "";

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