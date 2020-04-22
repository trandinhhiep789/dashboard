import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ValidationField } from "../../library/validation.js";
import { bindDataToControl, GetMLObjectData, transform1To2Column, transform1To3Column } from "../../library/form/FormLib";
import FormElement from '../FormContainer/FormElement';
import { GET_CACHE_USER_FUNCTION_LIST } from "../../../constants/functionLists";
import { callGetCache } from "../../../actions/cacheAction";
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
        const formData = this.bindData();
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
        const listElement = this.bindDataToControl(this.props.listelement, this.props.dataSource);
        if (typeof dataSource != "undefined") {
            listElement.map((elementItem) => {
                const elementname = elementItem.name;
                formData = Object.assign({}, formData, { [elementname]: elementItem.value });
            });
        }
        React.Children.map(children, (child, i) => {
            if (child.type == "div") {
                const formDataTempList = this.bindDivChildrenData(child, dataSource);
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
                    formDataList.push(formData);
                }
            }
        });
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
            return { [controlname]: controlvalue };
        }
        if (controltype == "GridControl") {
            controlvalue = child.props.dataSource;
            return { [controlname]: controlvalue };
        }
        if (controltype == "TabContainer") {
            const bindTabData = this.bindAllTabData(child);
            return bindTabData;
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
        if (typeof listvalidation != "undefined") {
            let formValidation1 = this.state.FormValidation;
            const formValidation = Object.assign({}, formValidation1, { [elementname]: listvalidation });
            this.setState({
                FormValidation: formValidation
            });
        }
        else if (typeof listvalidationRow != "undefined") {
            let formValidation1 = this.state.FormValidation;
            const validation = ValidationField(listvalidationRow, elementvalue, controllabel)
            const validationObject = { IsValidatonError: validation.IsError, ValidatonErrorMessage: validation.Message };
            const formValidation = Object.assign({}, formValidation1, { [elementname]: validationObject });

          //  console.log("listvalidationRow",listvalidationRow,validation,formValidation );
            this.setState({
                FormValidation: formValidation
            });
        }
        const formData = Object.assign({}, this.state.FormData, { [elementname]: elementvalue });
     //   console.log("formData",formData);
        this.setState({
            FormData: formData
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
        const listElement = this.props.listelement;
        //console.log("listElement/formValidation:", listElement, formValidation);
        listElement.map((elementItem) => {
            const validatonList = elementItem.validatonList;
            if (validatonList && validatonList.length > 0) {
                const inputvalue = this.state.FormData[elementItem.name];
                //   console.log("inputvalue:", inputvalue);
                //   console.log("elementItem.Name:", elementItem.name);
                const validation = ValidationField(validatonList, inputvalue, elementItem.label)
                const validationObject = { IsValidatonError: validation.IsError, ValidatonErrorMessage: validation.Message };
                //  console.log("validation:", validation, validationObject);
                this.FormValidationNew = Object.assign({}, this.FormValidationNew, { [elementItem.name]: validationObject });
            }
        });

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
                case "Row":
                    break;
                case "Col":
                    break;
                case "InputControl":
                    this.validationInputControl(child);
                    break;
                case "GridControl":
                    this.validationGridInputControl(child);
                    break;
                case "TabContainer":
                    this.validationTabContainer(child);
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
            const validation = ValidationField(validatonList, value, child.props.label)
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

    //#endregion validation TabContainer

    //#region validation TabContainer
    validationTabContainer(parent) {
        React.Children.map(parent.props.children, (child, i) => {
            this.TabvalidationFormDIV(child, child.props.name);
        });
    }
    TabvalidationFormDIV(children, name) {
        React.Children.map(children.props.children, (child, i) => {
            if (child.type == "div") {
                this.TabvalidationFormControlDIV(child.props.children, name);
            }
            else {
                if (child.props.controltype != null) {
                    this.TabvalidationFormControl(child, name);
                }
            }
        });
    }
    TabvalidationFormControlDIV(children, name) {
        React.Children.map(children, (child, i) => {
            if (child.type == "div") {
                this.TabvalidationFormControlDIV(child.props.children, name);
            }
            else {
                if (child.props.controltype != null) {
                    this.TabvalidationFormControl(child, name);
                }
            }
        });
    }
    TabvalidationFormControl(child, name) {
        if (child.props.controltype == "InputControl") {
            const name1 = child.props.datasourcemember;
            const validatonList = child.props.validatonList;
            const value = this.state.FormData[name][name1];
            if (typeof validatonList != "undefined") {
                const validation = ValidationField(validatonList, value, child.props.label)
                const validationObject = { IsValidatonError: validation.IsError, ValidatonErrorMessage: validation.Message };
                const formValidation1 = Object.assign({}, this.FormValidationNew[name], { [name1]: validationObject });
                this.FormValidationNew = Object.assign({}, this.FormValidationNew, { [name]: formValidation1 });
            }
        }
        else {
            const listElement = child.props.listColumn;
            let inputGridData = this.state.FormData[name];
            inputGridData = Object.assign([], inputGridData);
            let listgridData = {};
            inputGridData.map((row, indexRow) => {
                let elementobject = {};
                listElement.map((elementItem, index) => {
                    const validatonList = elementItem.validatonList;
                    if (typeof validatonList != "undefined") {
                        const inputvalue = row[elementItem.Name];
                        const validation = ValidationField(validatonList, inputvalue, elementItem.Caption)
                        const validationObject = { IsValidatonError: validation.IsError, ValidationErrorMessage: validation.Message };
                        elementobject = Object.assign({}, elementobject, { [elementItem.Name]: validationObject });
                    }
                });
                listgridData = Object.assign({}, listgridData, { [indexRow]: elementobject });
            });
            const elementob = Object.assign({}, {}, { [child.props.name]: listgridData });
            this.FormValidationNew = Object.assign({}, this.FormValidationNew, { [name]: elementob });
        }
    }
    //#endregion validation TabContainer

    checkPermission() {
        let permissionKey = this.props.RequirePermission;
        console.log("permissionKey", permissionKey);
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
    renderChildren() {
        const children = this.props.children;
        return React.Children.map(children, (child, i) => {
            return this.renderRow(child);
        });
    }
    renderRow(children) {
        return React.Children.map(children, (child, i) => {
            const componenttype = child.props.componenttype;
            switch (componenttype) {
                case "Row":
                    return <div className="row">{this.renderRow(child.props.children)}</div>;
                case "Col":
                    {
                        const className = this.getColClassName(child.props);
                        return <div className={className}>{this.renderRow(child.props.children)}</div>;
                    }
                case "InputControl":
                    return this.renderInputControl(child);

                case "TabContainer":
                    return React.cloneElement(child,
                        {
                            focusTabIndex: this.state.focusTabIndex,
                            tabStateID: this.state.tabStateID,
                            onValueChange: this.handleInputChangeList,
                            listTabError: this.state.ListTabError
                        }
                    );
                default:
                    return child;
            }
        });
    }
    renderInputControl(child) {
        const controlname = child.props.name;
        const controlvalue = this.state.FormData[controlname];
        return React.cloneElement(child,
            {
                onValueChange: this.handleInputChange,
                value: controlvalue
            }
        );
    }
    //#endregion render Children

    //#region  render auto Layout Children IsAutoLayout:True
    autoLayoutForm() {
        const listElement = this.props.listelement;
        let elmentRender = this.renderOneColumnForm();
        const colCount = parseInt(this.props.FormCols);
        switch (colCount) {
            case 1: elmentRender = this.renderOneColumnForm();
                break;
            case 2: elmentRender = this.renderTwoColumnForm();
                break;
            case 3: elmentRender = this.renderThreeColumnForm();
                break;
        }

        let backLinkButton = "";
        if (this.props.BackLink != null) {
            if (this.props.BackLink.length > 0) {
                backLinkButton = (<Link to={this.props.BackLink}>
                    <button className="btn btn-sm btn-outline btn-primary" type="button">Quay lại</button></Link>);
            }
        }

        let ClassNameSingePage = "col-lg-12";
        if (this.props.ClassNameSingePage != null) {
            ClassNameSingePage = "col-lg-12 " + this.props.ClassNameSingePage;
        }

        let cssSearchButton = "";
        return (
            <div className={ClassNameSingePage}>
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
    layoutFormControl(child) {
        if (child != null) {
            if (child.props.controltype != null) {
                const controltype = child.props.controltype;
                if (controltype == "InputControl") {
                    let FormValidation1 = this.state.FormValidation;
                    if (Object.keys(this.props.Lstchangvalition).length > 0) {
                        FormValidation1 = this.props.Lstchangvalition
                    }
                    const controlname = child.props.name;
                    const controlvalue = this.state.FormData[controlname];
                    let validationErrorMessage = "";
                    if (FormValidation1[child.props.name] != null) {
                        validationErrorMessage = FormValidation1[child.props.name].ValidatonErrorMessage;
                    }
                    return React.cloneElement(child,
                        {
                            onValueChange: this.handleInputChange,
                            value: controlvalue,
                            validationErrorMessage: validationErrorMessage,
                        }
                    );
                }
                else if (controltype == "GridControl") {

                    let FormValidation1 = this.state.FormValidation;
                    if (Object.keys(this.props.Lstchangvalition).length > 0) {
                        FormValidation1 = this.props.Lstchangvalition
                    }
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
                else if (controltype == "TabContainer") {
                    let FormValidation1 = this.state.FormValidation;
                    if (Object.keys(this.props.Lstchangvalition).length > 0) {
                        FormValidation1 = this.props.Lstchangvalition
                    }
                    return React.cloneElement(child,
                        {
                            // focusTabIndex: aa,
                            focusTabIndex:this.state.focusTabIndex,
                            tabStateID: this.state.tabStateID,
                            onValueChange: this.handleInputChangeList,
                            FormValidation: FormValidation1,
                        }
                    );
                }
                else if (controltype == "SubmitControl") {
                    return React.cloneElement(child,
                        {
                            onClick: this.handleSubmit
                        }
                    );
                }
            }
        }
        return child;
    }
    
    renderOneColumnForm() {
        const listElement = this.props.listelement;
        if (listElement == null)
            return null;

        return listElement.map((elementItem, index) => {
            let validationErrorMessage = "";
            if (this.state.FormValidation[elementItem.name] != null) {
                validationErrorMessage = this.state.FormValidation[elementItem.name].ValidatonErrorMessage;
            }
            return (<div className="form-row" key={"div" + elementItem.name}>
                <FormElement type={elementItem.type} name={elementItem.name}
                    CSSClassName="form-control form-control-sm"
                    value={this.state.FormData[elementItem.name]}
                    label={elementItem.label} placeholder={elementItem.placeholder}
                    icon={elementItem.icon}
                    onValueChange={this.handleInputChange}
                    listoption={elementItem.listoption}
                    key={elementItem.name}
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
    renderTwoColumnForm() {
        const listElement = this.props.listelement;
        const listElement1 = transform1To2Column(listElement);
        //     console.log("renderTwoColumnForm", listElement, listElement1)

        return listElement1.map((elementItem, index) => {
            if (isEmpty(elementItem.Item2)) {
                return (<div className="form-row" key={"div" + elementItem.Item1.name} >
                    <FormElement type={elementItem.Item1.type} name={elementItem.Item1.name}
                        CSSClassName="form-control form-control-sm"
                        value={this.state.FormData[elementItem.Item1.name]}
                        label={elementItem.Item1.label} placeholder={elementItem.Item1.placeholder}
                        icon={elementItem.Item1.icon}
                        onValueChange={this.handleInputChange}
                        listoption={elementItem.Item1.listoption}
                        key={elementItem.Item1.name}
                        validatonList={elementItem.Item1.validatonList}
                        IsAutoLoadItemFromCache={elementItem.Item1.IsAutoLoadItemFromCache}
                        LoadItemCacheKeyID={elementItem.Item1.LoadItemCacheKeyID}
                        ValueMember={elementItem.Item1.ValueMember}
                        NameMember={elementItem.Item1.NameMember}
                        readonly={elementItem.readonly}
                        accept={elementItem.accept}
                        multiple={elementItem.multiple}
                        maxSize={elementItem.maxSize}
                        minSize={elementItem.minSize}
                    />
                </div>)
            }
            return (<div className="form-row" key={"div" + elementItem.Item1.name} >
                <FormElement type={elementItem.Item1.type} name={elementItem.Item1.name}
                    CSSClassName="form-control form-control-sm"
                    value={this.state.FormData[elementItem.Item1.name]}
                    label={elementItem.Item1.label} placeholder={elementItem.Item1.placeholder}
                    icon={elementItem.Item1.icon}
                    onValueChange={this.handleInputChange}
                    listoption={elementItem.Item1.listoption}
                    key={elementItem.Item1.name}
                    validatonList={elementItem.Item1.validatonList}
                    IsAutoLoadItemFromCache={elementItem.Item1.IsAutoLoadItemFromCache}
                    LoadItemCacheKeyID={elementItem.Item1.LoadItemCacheKeyID}
                    ValueMember={elementItem.Item1.ValueMember}
                    NameMember={elementItem.Item1.NameMember}
                    readonly={elementItem.Item1.readonly}
                    accept={elementItem.accept}
                    multiple={elementItem.multiple}
                    maxSize={elementItem.maxSize}
                    minSize={elementItem.minSize}
                />
                <FormElement type={elementItem.Item2.type} name={elementItem.Item2.name}
                    CSSClassName="form-control form-control-sm"
                    value={this.state.FormData[elementItem.Item2.name]}
                    label={elementItem.Item2.label} placeholder={elementItem.Item2.placeholder}
                    icon={elementItem.Item2.icon}
                    onValueChange={this.handleInputChange}
                    listoption={elementItem.Item2.listoption}
                    key={elementItem.Item2.name}
                    validatonList={elementItem.Item2.validatonList}
                    IsAutoLoadItemFromCache={elementItem.Item2.IsAutoLoadItemFromCache}
                    LoadItemCacheKeyID={elementItem.Item2.LoadItemCacheKeyID}
                    ValueMember={elementItem.Item2.ValueMember}
                    NameMember={elementItem.Item2.NameMember}
                    readonly={elementItem.Item2.readonly}
                    accept={elementItem.accept}
                    multiple={elementItem.multiple}
                    maxSize={elementItem.maxSize}
                    minSize={elementItem.minSize}
                />
            </div>);
        }
        );
        //console.log(listElement1)
    }
    renderThreeColumnForm() {
        const listElement = this.props.listelement;
        const dataSource = this.props.dataSource;
        let listElement1 = listElement;
        if (typeof dataSource != "") {
            listElement1 = listElement.map((elementItem) => {
                const elementvalue = dataSource[elementItem.DataSourceMember];
                const newElementItem = Object.assign({}, elementItem, { value: elementvalue });
                return newElementItem;
            });
        }
        listElement1 = transform1To3Column(listElement1);

        return listElement1.map((elementItem, index) => {

            if (isEmpty(elementItem.Item2) && isEmpty(elementItem.Item3)) {
                return (<div className="form-row" key={"div1" + elementItem.Item1.name} >
                    <FormElement type={elementItem.Item1.type} name={elementItem.Item1.name}
                        CSSClassName="form-control form-control-sm"
                        value={this.state.FormData[elementItem.Item1.name]}
                        label={elementItem.Item1.label} placeholder={elementItem.Item1.placeholder}
                        icon={elementItem.Item1.icon}
                        onValueChange={this.handleInputChange}
                        listoption={elementItem.Item1.listoption}
                        key={elementItem.Item1.name}
                        validatonList={elementItem.Item1.validatonList}
                        IsThreeColumnForm="true"
                        IsAutoLoadItemFromCache={elementItem.Item1.IsAutoLoadItemFromCache}
                        LoadItemCacheKeyID={elementItem.Item1.LoadItemCacheKeyID}
                        ValueMember={elementItem.Item1.ValueMember}
                        NameMember={elementItem.Item1.NameMember}
                        accept={elementItem.accept}
                        multiple={elementItem.multiple}
                        maxSize={elementItem.maxSize}
                        minSize={elementItem.minSize}
                    />
                    <div className="form-group col-md-2"></div>
                    <div className="form-group col-md-2"> </div>
                    <div className="form-group col-md-2"></div>
                    <div className="form-group col-md-2"> </div>
                </div>
                )
            }

            if (isEmpty(elementItem.Item3)) {
                return (<div className="form-row" key={"div1" + elementItem.Item1.name} >
                    <FormElement type={elementItem.Item1.type} name={elementItem.Item1.name}
                        CSSClassName="form-control form-control-sm"
                        value={this.state.FormData[elementItem.Item1.name]}
                        label={elementItem.Item1.label} placeholder={elementItem.Item1.placeholder}
                        icon={elementItem.Item1.icon}
                        onValueChange={this.handleInputChange}
                        listoption={elementItem.Item1.listoption}
                        key={elementItem.Item1.name}
                        validatonList={elementItem.Item1.validatonList}
                        IsThreeColumnForm="true"
                        IsAutoLoadItemFromCache={elementItem.Item1.IsAutoLoadItemFromCache}
                        LoadItemCacheKeyID={elementItem.Item1.LoadItemCacheKeyID}
                        ValueMember={elementItem.Item1.ValueMember}
                        NameMember={elementItem.Item1.NameMember}
                        accept={elementItem.accept}
                        multiple={elementItem.multiple}
                        maxSize={elementItem.maxSize}
                        minSize={elementItem.minSize}
                    />
                    <FormElement type={elementItem.Item2.type} name={elementItem.Item2.name}
                        CSSClassName="form-control form-control-sm"
                        value={this.state.FormData[elementItem.Item2.name]}
                        label={elementItem.Item2.label} placeholder={elementItem.Item2.placeholder}
                        icon={elementItem.Item2.icon}
                        onValueChange={this.handleInputChange}
                        listoption={elementItem.Item2.listoption}
                        key={elementItem.Item2.name}
                        validatonList={elementItem.Item2.validatonList}
                        IsThreeColumnForm="true"
                        IsAutoLoadItemFromCache={elementItem.Item2.IsAutoLoadItemFromCache}
                        LoadItemCacheKeyID={elementItem.Item2.LoadItemCacheKeyID}
                        ValueMember={elementItem.Item2.ValueMember}
                        NameMember={elementItem.Item2.NameMember}
                        accept={elementItem.accept}
                        multiple={elementItem.multiple}
                        maxSize={elementItem.maxSize}
                        minSize={elementItem.minSize}
                    />
                    <div className="form-group col-md-2"></div>
                    <div className="form-group col-md-2"> </div>
                </div>)
            }

            return (<div className="form-row" key={"div1" + elementItem.Item1.name} >
                <FormElement type={elementItem.Item1.type} name={elementItem.Item1.name}
                    CSSClassName="form-control form-control-sm"
                    value={this.state.FormData[elementItem.Item1.name]}
                    label={elementItem.Item1.label} placeholder={elementItem.Item1.placeholder}
                    icon={elementItem.Item1.icon}
                    onValueChange={this.handleInputChange}
                    listoption={elementItem.Item1.listoption}
                    key={elementItem.Item1.name}
                    validatonList={elementItem.Item1.validatonList}
                    IsThreeColumnForm="true"
                    IsAutoLoadItemFromCache={elementItem.Item1.IsAutoLoadItemFromCache}
                    LoadItemCacheKeyID={elementItem.Item1.LoadItemCacheKeyID}
                    ValueMember={elementItem.Item1.ValueMember}
                    NameMember={elementItem.Item1.NameMember}
                    accept={elementItem.accept}
                    multiple={elementItem.multiple}
                    maxSize={elementItem.maxSize}
                    minSize={elementItem.minSize}
                />
                <FormElement type={elementItem.Item2.type} name={elementItem.Item2.name}
                    CSSClassName="form-control form-control-sm"
                    value={this.state.FormData[elementItem.Item2.name]}
                    label={elementItem.Item2.label} placeholder={elementItem.Item2.placeholder}
                    icon={elementItem.Item2.icon}
                    onValueChange={this.handleInputChange}
                    listoption={elementItem.Item2.listoption}
                    key={elementItem.Item2.name}
                    validatonList={elementItem.Item2.validatonList}
                    IsThreeColumnForm="true"
                    IsAutoLoadItemFromCache={elementItem.Item2.IsAutoLoadItemFromCache}
                    LoadItemCacheKeyID={elementItem.Item2.LoadItemCacheKeyID}
                    ValueMember={elementItem.Item2.ValueMember}
                    NameMember={elementItem.Item2.NameMember}
                    accept={elementItem.accept}
                    multiple={elementItem.multiple}
                    maxSize={elementItem.maxSize}
                    minSize={elementItem.minSize}
                />
                <FormElement type={elementItem.Item3.type} name={elementItem.Item3.name}
                    CSSClassName="form-control form-control-sm"
                    value={this.state.FormData[elementItem.Item3.name]}
                    label={elementItem.Item3.label} placeholder={elementItem.Item3.placeholder}
                    icon={elementItem.Item3.icon}
                    onValueChange={this.handleInputChange}
                    listoption={elementItem.Item3.listoption}
                    key={elementItem.Item3.name}
                    validatonList={elementItem.Item3.validatonList}
                    IsThreeColumnForm="true"
                    IsAutoLoadItemFromCache={elementItem.Item3.IsAutoLoadItemFromCache}
                    LoadItemCacheKeyID={elementItem.Item3.LoadItemCacheKeyID}
                    ValueMember={elementItem.Item3.ValueMember}
                    NameMember={elementItem.Item3.NameMember}
                    accept={elementItem.accept}
                    multiple={elementItem.multiple}
                    maxSize={elementItem.maxSize}
                    minSize={elementItem.minSize}
                />
            </div>);
        }
        );
        //console.log(listElement1)
    }
    getColClassName(colprops) {
        let className = "";
        className += colprops.xs == null ? "" : " col-" + colprops.xs;
        className += colprops.sm == null ? "" : " col-sm-" + colprops.sm;
        className += colprops.md == null ? "" : " col-md-" + colpropss.md;
        className += colprops.lg == null ? "" : " col-lg-" + colprops.lg;
        className += colprops.xl == null ? "" : " col-xl-" + colprops.xl;
        className = className.trim();
        if (className.length == 0)
            className = "col";
        return className;
    }
    //#endregion render auto Layout Children

    //#region  handleSubmit 
    handleSubmit(e) {
        e.preventDefault();
        const mLObjectDefinition = this.props.MLObjectDefinition;
        //  console.log("handleSubmit mLObjectDefinition: ", mLObjectDefinition);
         // console.log("handleSubmit/FormData: " + this.state.FormData);
        // console.log("handleSubmit dataSource: " + this.props.dataSource);
        const MLObject = GetMLObjectData(mLObjectDefinition, this.state.FormData, this.props.dataSource);
        // console.log("Submit MLObject!", MLObject);
        const formValidation = this.validationForm();
        //console.log("formValidation!", formValidation);

        if (!this.checkInput(formValidation))
            return;
        if (this.props.onSubmit != null) {
            this.props.onSubmit(this.state.FormData, MLObject);
        }
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
        if (this.props.IsAutoLayout) {
            return this.autoLayoutForm();
        }
        else {
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
                                this.renderChildren()
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