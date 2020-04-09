import React, { Component, PropTypes } from 'react';
import { Link } from "react-router-dom";
export default class TabContainer extends Component {
    static defaultProps = {
        componenttype: 'TabContainer'
    }
    constructor(props) {
        super(props);

        this.handleTabClick = this.handleTabClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.valueChangeInputGrid = this.valueChangeInputGrid.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        const bindTabData = this.bindAllTabData();
        this.state = {
            activeTabIndex: this.props.defaultActiveTabIndex,
            FormDataList: bindTabData.FormDataList, FormValidation: {},
            TabNameList: bindTabData.TabNameList,
            TabMLObjectDefinitionList: bindTabData.TabMLObjectDefinitionList,
            focusTabIndex: -1,
            prevtabStateID: "",
            IsSystem: bindTabData.IsSystem

        };
        if (this.props.onValueChange != null) {
            this.props.onValueChange(this.state.FormDataList, this.state.TabNameList, this.state.TabMLObjectDefinitionList);
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.tabStateID !== prevState.prevtabStateID) {
            return {
                focusTabIndex: nextProps.focusTabIndex,
                prevtabStateID: nextProps.tabStateID
            };
        }
        return null;
    }

    handleInputChange(controlname, controlvalue) {
        const index = this.state.activeTabIndex;
        let formDataList = this.state.FormDataList;
        const formData = Object.assign({}, formDataList[index], { [controlname]: controlvalue });
        formDataList[index] = formData;
        this.setState({
            FormDataList: formDataList
        });
        if (this.props.onValueChange != null) {
            this.props.onValueChange(formDataList, this.state.TabNameList, this.state.TabMLObjectDefinitionList);
        }
    }

    valueChangeInputGrid(elementdata, index, name) {
        if (this.props.onValueChangeInputGrid) {
            this.props.onValueChangeInputGrid(elementdata, index, name);
        }
    }

    handleValueChange(name, value) {
        if (this.props.onValueChange) {
            this.props.onValueChange(name, value);
        }
    }

    bindAllTabData() {
        let formDataList = [];
        let tabMLObjectDefinitionList = [];
        let tabNameList = [];
        let isSystem = false;

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
                if (formData[i]["IsSystem"]) {
                    isSystem = true;
                }
            }
            formDataList.push(formDataTemp);
            tabNameList.push(tabName);

        });
        return { FormDataList: formDataList, TabNameList: tabNameList, TabMLObjectDefinitionList: tabMLObjectDefinitionList, IsSystem: isSystem };
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
        const controltype = child.props.controltype;
        if (controltype == "InputControl" || controltype == "GridControl") {
            const controlname = child.props.name;
            const index = this.state.activeTabIndex;
            const controlvalue = this.state.FormDataList[index][controlname];
            let formGroupClassName = "form-group col-md-8";
            if (child.props.colspan != null) {
                formGroupClassName = "form-group col-md-" + child.props.colspan;
            }
            let labelDivClassName = "form-group col-md-2";
            if (child.props.labelcolspan != null) {
                labelDivClassName = "form-group col-md-" + child.props.labelcolspan;
            }
            return React.cloneElement(child,
                {
                    onValueChangeInputGrid: this.valueChangeInputGrid,
                    onValueChange: this.handleValueChange,
                    value: controlvalue,
                    isSystem: (this.props.loginUserName && this.props.loginUserName == "administrator" && (child.props.name).toLowerCase().includes('system')) ? false : this.state.IsSystem
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

    renderFormControl(child) {
        if (child.props.controltype != null) {
            const controltype = child.props.controltype;
            if (controltype == "InputControl" || controltype == "GridControl") {
                const index = this.state.activeTabIndex;
                const controlname = child.props.name;
                const controlvalue = this.state.FormDataList[index][controlname];
                return React.cloneElement(child,
                    {
                        onValueChangeInputGrid: this.valueChangeInputGrid,
                        onValueChange: this.handleValueChange,
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
    autoLayoutChildren(children) {
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

    handleTabClick(tabIndex, searchAPIPath, addAPIPath, updateAPIPath, deleteAPIPath, name) {
        this.setState({ focusTabIndex: -1 });
        this.setState({
            activeTabIndex: tabIndex === this.state.activeTabIndex ? this.props.defaultActiveTabIndex : tabIndex
        });
        if (this.props.onHandleTabClick) {
            this.props.onHandleTabClick(searchAPIPath, addAPIPath, updateAPIPath, deleteAPIPath, name);
        }
    }

    handleSubmit() {
        if (this.props.loginUserName && this.props.loginUserName != "administrator" && this.state.IsSystem) {
            return;
        }

        if (this.props.onHandleSubmit) {
            this.props.onHandleSubmit();
        }
    }

    renderChildrenWithTabsApiAsProps() {
        let selectedTabIndex = this.state.activeTabIndex;
        if (this.state.focusTabIndex >= 0)
            selectedTabIndex = this.state.focusTabIndex;
        return React.Children.map(this.props.children, (child, index) => {
            return React.cloneElement(child, {
                onClick: this.handleTabClick,
                tabIndex: index,
                isActive: index === selectedTabIndex
            });
        });
    }

    renderActiveTabContent() {
        const { children } = this.props;
        let { activeTabIndex } = this.state;
        let focusTabIndex = this.props.focusTabIndex;
        if (focusTabIndex == null)
            focusTabIndex = -1;
        if (this.state.focusTabIndex >= 0)
            activeTabIndex = this.state.focusTabIndex;
        if (children[activeTabIndex]) {
            if (this.props.IsAutoLayout) {
                return this.autoLayoutChildren(children[activeTabIndex].props.children);
            }
            else {
                return this.renderChildren(children[activeTabIndex].props.children);
            }
        }
    }

    render() {
        return (
            // <div className="card-body" style={{ backgroundColor: 'white' }}>
            //     <ul className="nav nav-tabs">
            //         {this.renderChildrenWithTabsApiAsProps()}
            //     </ul>
            //     <div className="tab-content">
            //         <div className="tab-pane fade active show">
            //             <div className="card-body">
            //                 {this.renderActiveTabContent()}
            //             </div>
            //         </div>
            //     </div>
            // </div>

            <div className="col-lg-12">
                <form className="card" action="">
                    <h4 className="card-title"><strong>{this.props.title}</strong></h4>
                    <div className="card-body" style={{ backgroundColor: 'white' }}>
                        <div>
                            <ul className="nav nav-tabs">
                                {this.renderChildrenWithTabsApiAsProps()}
                            </ul>

                            <div className="tab-content">
                                <div className="tab-pane fade in active show">
                                    {this.renderActiveTabContent()}
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer className="card-footer text-right">
                        {this.props.IsShowSubmitButton && <button className="btn btn-primary" type="button" onClick={this.handleSubmit}>Cập nhật</button>}
                    </footer>

                </form>
            </div>
        );
    }
}