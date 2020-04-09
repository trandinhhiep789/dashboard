import React, { Component, PropTypes } from 'react';
import { Link } from "react-router-dom";
import { ValidationField } from "../../../library/validation.js";
export default class TabContainer extends Component {
    static defaultProps = {
        componenttype: 'TabContainer'
    }
    constructor(props) {
        super(props);

        this.handleTabClick = this.handleTabClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        const bindTabData = this.bindAllTabData();
        this.state = {
            activeTabIndex: this.props.defaultActiveTabIndex,
            FormDataList: bindTabData.FormDataList,
            FormValidation: {},
            FormValidationList: {},
            TabNameList: bindTabData.TabNameList,
            TabMLObjectDefinitionList: bindTabData.TabMLObjectDefinitionList,
            focusTabIndex: bindTabData.FocusTabIndex,
            prevtabStateID: ""
        };
    }
    //#region Bin all
    bindAllTabData() {
        let formDataList = [];
        let tabMLObjectDefinitionList = [];
        let tabNameList = [];

        React.Children.map(this.props.children, (child, index) => {
            let dataSource = child.props.datasource;
            if (dataSource == null)
                dataSource = this.props.datasource;
            const formData = this.bindData(child.props.children, dataSource);
            const mLObjectDefinition = child.props.MLObjectDefinition;
            const tabName = child.props.name;
            tabMLObjectDefinitionList.push(mLObjectDefinition);
            let formDataTemp = {};
            for (let i = 0; i < formData.length; i++) {
                formDataTemp = Object.assign({}, formDataTemp, formData[i]);
            }
            formDataList.push(formDataTemp);
            tabNameList.push(tabName);
        });
        return { FormDataList: formDataList, TabNameList: tabNameList, TabMLObjectDefinitionList: tabMLObjectDefinitionList, FocusTabIndex: this.props.focusTabIndex };
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
        const datasourcemember = child.props.datasourcemember;
        if (dataSource != null && datasourcemember != null) {
            controlvalue = dataSource[datasourcemember];
            return { [controlname]: controlvalue };
        }
    }
    bindData(children, dataSource) {

        let formDataList = [];
        React.Children.map(children, (child, i) => {
            if (child.type == "div") {
                const formData = this.bindDivChildrenData(child, dataSource);
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
    //#endregion Bin all

    handleInputChange(elementname, elementvalue, controllabel, listvalidation, listvalidationRow) {
        const index = this.state.activeTabIndex;
        const { children } = this.props;
        const nameTap = children[index].props.name;
        let formValidationTap = {};
        if (typeof listvalidation != "undefined") {
            let formValidation = this.props.FormValidation;
            const formVal = Object.assign({},listvalidation);
            const formVall = {[nameTap]:formVal};
            const formValidationRow = Object.assign({}, formValidation[nameTap],formVall);
            formValidationTap = Object.assign({}, formValidation,{[nameTap]: formValidationRow});
        }
        else if (typeof listvalidationRow != "undefined") {
            const validation = ValidationField(listvalidationRow, elementvalue, controllabel)
            let formValidation = this.props.FormValidation;
            const validationObject = { IsValidatonError: validation.IsError, ValidatonErrorMessage: validation.Message };
            const formValidationRow = Object.assign({}, formValidation[nameTap], { [elementname]: validationObject });
            formValidationTap = Object.assign({}, formValidation, { [nameTap]: formValidationRow });
        }

        let formDataList = this.state.FormDataList;
        const formData = Object.assign({}, formDataList[index], { [elementname]: elementvalue });
     //  console.log("handleInputChange formValidationTap",formValidationTap);

        formDataList[index] = formData;
        this.setState({
            FormDataList: formDataList
        });
        if (this.props.onValueChange != null) {
            //   console.log("handleInputChange this.props.onValueChange", this.props.onValueChange);
            this.props.onValueChange(formDataList, this.state.TabNameList, this.state.TabMLObjectDefinitionList, formValidationTap);
        }
    }

    renderFormControl(child) {
        if (child.props.controltype != null) {
            const controltype = child.props.controltype;
            if (controltype == "InputControl" || controltype == "GridControl") {
                const index = this.state.activeTabIndex;
                const controlname = child.props.name;
                const controlvalue = this.state.FormDataList[index][controlname];
                return React.cloneElement(child,
                    {
                        onValueChange: this.handleInputChange,
                        value: controlvalue
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
        return child;
    }

    renderChildren(children) {
        return React.Children.map(children, (child, i) => {
            if (child.type == "div") {
                return this.renderDivChildren(child);
            }
            else {
                return this.renderFormControl(child);
            }
        });
    }
   
    //#region render Tabs
    renderChildrenWithTabsApiAsProps() {
        let selectedTabIndex = this.state.activeTabIndex;
        if (this.props.focusTabIndex >= 0)
            selectedTabIndex = this.props.focusTabIndex;
        if (this.state.focusTabIndex >= 0)
            selectedTabIndex = this.state.focusTabIndex;
     
        return React.Children.map(this.props.children, (child, index) => {
            let tapActiveError = false;
            
                if (!this.checkInput(this.props.FormValidation[child.props.name])) {
                    tapActiveError = true;
            }
            return React.cloneElement(child, {
                onClick: this.handleTabClick,
                tabIndex: index,
                isActive: index === selectedTabIndex,
                isError: tapActiveError
            });
        });
    }
    handleTabClick(tabIndex) {
        this.setState({ focusTabIndex: tabIndex });
        this.setState({
            activeTabIndex: tabIndex === this.state.activeTabIndex ? this.props.defaultActiveTabIndex : tabIndex
        });
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
                for (const key1 in elementob) {
                    if (elementob[key1].IsValidatonError != undefined) {
                        if (elementob[key1].IsValidatonError) {
                            return false;
                        }
                    }
                    else {

                        const element = elementob[key1];
                        for (const key2 in element) {
                            if (element[key2].IsValidatonError) {
                                return false;
                            }
                        }
                    }
                }
            }
        }
        return true;
    }
    //#endregion render Tabs

    renderActiveTabContent() {
        const { children } = this.props;
        let { activeTabIndex } = this.state;
        if (this.props.focusTabIndex >= 0)
            activeTabIndex = this.props.focusTabIndex;
        if (this.state.focusTabIndex >= 0)
            activeTabIndex = this.state.focusTabIndex;

        if (children[activeTabIndex]) {
            if (this.props.IsAutoLayout) {
                return this.autoLayoutChildren(children[activeTabIndex].props.children, children[activeTabIndex].props.name);
            }
            else {
                return this.renderChildren(children[activeTabIndex].props.children);
            }
        }
    }
    autoLayoutChildren(children, nameTap) {
        return React.Children.map(children, (child, i) => {
            if (child.type == "div") {
                return this.renderDivChildren(child, nameTap);
            }
            else {
                if (child.props.controltype != null) {
                    return this.layoutFormControl(child, nameTap);
                }
                return child;
            }
        });
    }
    renderDivChildren(children, nameTap) {
        return React.Children.map(children, (child, i) => {
            if (child.type == "div") {
                return <div className={child.props.className}>
                    {this.renderDivChildren(child.props.children, nameTap)}
                </div>
            }
            else {
                if (child.props.controltype != null) {
                    return this.layoutFormControl(child, nameTap);
                }
                else {
                    return child;
                }
            }
        });
    }

    layoutFormControl(child, nameTap) {
        const controltype = child.props.controltype;
        if (controltype == "InputControl") {
            const controlname = child.props.name;
            let { activeTabIndex } = this.state;
            if (this.props.focusTabIndex >= 0)
                activeTabIndex = this.props.focusTabIndex;
            if (this.state.focusTabIndex >= 0)
                activeTabIndex = this.state.focusTabIndex;

            const controlvalue = this.state.FormDataList[activeTabIndex][controlname];
            let formValidation = this.props.FormValidation;
            let validationErrorMessage = "";
            if (formValidation[nameTap] != null && formValidation[nameTap][child.props.name]) {
                validationErrorMessage = formValidation[nameTap][child.props.name].ValidatonErrorMessage;
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
            const controlname = child.props.name;
            let { activeTabIndex } = this.state;
            if (this.props.focusTabIndex >= 0)
                activeTabIndex = this.props.focusTabIndex;
            if (this.state.focusTabIndex >= 0)
                activeTabIndex = this.state.focusTabIndex;

            const controlvalue = this.state.FormDataList[activeTabIndex][controlname];
            let formValidation = this.props.FormValidation;
            let listvalidationError = {};
            if (formValidation[nameTap] != null && formValidation[nameTap][child.props.name]) {
                listvalidationError = formValidation[nameTap][child.props.name];
            }

            return React.cloneElement(child,
                {
                    onValueChange: this.handleInputChange,
                    value: controlvalue,
                    listvalidationError: listvalidationError,
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

    render() {
        let ClassNameProductTab = "";
        if (this.props.ClassNameProductTab != null) {
            ClassNameProductTab =  this.props.ClassNameProductTab;
        }
        return (
            <div className={"card-body " + ClassNameProductTab} style={{ backgroundColor: 'white' }}>
                <ul className="nav nav-tabs">
                    {this.renderChildrenWithTabsApiAsProps()}
                </ul>
                <div className="tab-content">
                    <div className="tab-pane fade active show">
                        <div className="card-body">
                            {this.renderActiveTabContent()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}