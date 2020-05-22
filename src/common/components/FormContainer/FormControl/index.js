
import React, { Component, PropTypes } from 'react';
import MultiSelectComboBox from "./MultiSelectComboBox";
import ComboboxQTQHPX from "./CommonControl/ComboboxQTQHPX.js";

import { callGetCache } from "../../../../actions/cacheAction";
import { connect } from 'react-redux';
import { showModal, hideModal } from '../../../../actions/modal';
import { MODAL_TYPE_SEARCH } from '../../../../constants/actionTypes';
import SearchModal from "../../Form/AdvanceForm/FormControl/FormSearchModal"
import { createListTree } from "../../../library/ultils";
import { TreeSelect } from "antd";
import Datetime from 'react-datetime';
import "antd/dist/antd.css";
import Select from 'react-select';



class TextBox extends React.Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
    }
    static defaultProps = {
        controltype: 'InputControl'
    }

    handleValueChange(e) {
        if (this.props.onValueChange != null) {
            this.props.onValueChange(e.target.name, e.target.value, this.props.label, undefined, this.props.validatonList);
        }

    }
    render() {

        let className = "form-control form-control-sm";
        if (this.props.CSSClassName != null)
            className = this.props.CSSClassName;
        let formGroupClassName = "form-group col-md-4";
        if (this.props.colspan != null) {
            formGroupClassName = "form-group col-md-" + this.props.colspan;
        }
        let labelDivClassName = "form-group col-md-2";
        if (this.props.labelcolspan != null) {
            labelDivClassName = "form-group col-md-" + this.props.labelcolspan;
        }
        let star;
        if (this.props.validatonList != undefined && this.props.validatonList.includes("required") == true) {
            star = '*'
        }

        let formRowClassName = "form-row ";
        if (this.props.classNameCustom != null) {
            formRowClassName += this.props.classNameCustom;
        }

        if (this.props.validationErrorMessage != "") {
            className += " is-invalid";

            if (this._myInput)
                this._myInput.focus();

            return (
                <div className={formRowClassName} >
                    <div className={labelDivClassName}>
                        <label className="col-form-label 2">
                            {this.props.label}<span className="text-danger"> {star}</span>
                        </label>
                    </div>
                    <div className={formGroupClassName}>
                        <input type="text" name={this.props.name}
                            onChange={this.handleValueChange}
                            value={this.props.value}
                            key={this.props.name}
                            className={className}
                            autoFocus={true}
                            ref={(node) => this._myInput = node}
                            placeholder={this.props.placeholder}
                            disabled={this.props.readOnly}
                        />
                        <div className="invalid-feedback"><ul className="list-unstyled"><li>{this.props.validationErrorMessage}</li></ul></div>
                    </div>
                </div>
            );


        }
        else {
            return (
                <div className={formRowClassName} >
                    <div className={labelDivClassName}>
                        <label className="col-form-label 3">
                            {this.props.label}<span className="text-danger"> {star}</span>
                        </label>
                    </div>
                    <div className={formGroupClassName}>
                        <input type="text" name={this.props.name}
                            onChange={this.handleValueChange}
                            value={this.props.value}
                            key={this.props.name}
                            className={className}
                            autoFocus={false}
                            ref={(node) => this._myInput = node}
                            placeholder={this.props.placeholder}
                            disabled={this.props.readOnly}
                        />
                    </div>
                </div>
            );
        }
    }
}

class TextArea extends React.Component {
    static defaultProps = {
        componenttype: 'InputControl'
    }
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
    }
    handleValueChange(e) {
        if (this.props.onValueChange != null)
            this.props.onValueChange(e.target.name, e.target.value);
    }
    render() {
        let className = "form-control form-control-sm";
        if (this.props.CSSClassName != null)
            className = this.props.CSSClassName;
        let formGroupClassName = "form-group col-md-4";
        if (this.props.colspan != null) {
            formGroupClassName = "form-group col-md-" + this.props.colspan;
        }
        let labelDivClassName = "form-group col-md-2";
        if (this.props.labelcolspan != null) {
            labelDivClassName = "form-group col-md-" + this.props.labelcolspan;
        }
        let star;
        if (this.props.validatonList != undefined && this.props.validatonList.includes("required") == true) {
            star = '*'
        }
        return (

            <div className="form-row" >
                <div className={labelDivClassName}>
                    <label className="col-form-label 4">
                        {this.props.label}<span className="text-danger"> {star}</span>
                    </label>
                </div>
                <div className={formGroupClassName}>
                    <textarea name={this.props.name} onChange={this.handleValueChange}
                        value={this.props.value}
                        className={className} placeholder={this.props.placeholder}
                        readOnly={this.props.readonly}
                    />
                </div>
            </div>

        );
    }
}

class CheckBox extends React.Component {
    static defaultProps = {
        componenttype: 'InputControl'
    }
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
    }
    handleValueChange(e) {
        if (this.props.onValueChange != null)
            this.props.onValueChange(e.target.name, e.target.checked);
        // console.log("Checkbox:", e.target.checked);
    }
    render() {
        let formRowClassName = "form-row";
        if (this.props.rowspan != null) {
            formRowClassName = "form-row col-md-" + this.props.rowspan;
        }
        let className = "form-control form-control-sm";
        if (this.props.CSSClassName != null)
            className = this.props.CSSClassName;
        let formGroupClassName = "form-group col-md-4";
        if (this.props.colspan != null) {
            formGroupClassName = "form-group col-md-" + this.props.colspan;
        }
        let labelDivClassName = "form-group col-md-2";
        if (this.props.labelcolspan != null) {
            labelDivClassName = "form-group col-md-" + this.props.labelcolspan;
        }
        let star;
        if (this.props.validatonList != undefined && this.props.validatonList.includes("required") == true) {
            star = '*'
        }
        return (

            <div className={formRowClassName} >
                <div className={labelDivClassName}>
                    <label className="col-form-label 5">
                        {this.props.label}<span className="text-danger"> {star}</span>
                    </label>
                </div>
                <div className={formGroupClassName}>

                    <div className="checkbox">
                        <label>
                            <input className={this.props.CSSClassName} name={this.props.name} type="checkbox"
                                checked={this.props.value} onChange={this.handleValueChange} readOnly={this.props.readonly}
                                className={this.props.CSSClassName}
                            />
                            <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}

class ComboBoxCom extends Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.state = { Listoption: [], value: this.props.value }
    }
    handleValueChange(e) {
        e.preventDefault();
        this.setState({ value: e.target.value });
        if (this.props.onValueChange != null)
            this.props.onValueChange(e.target.name, e.target.value, this.props.label, undefined, this.props.validatonList);
        if (this.props.onValueChangeCus) {
            this.props.onValueChangeCus(e.target.name, e.target.value);
        }
    }
    //#region tree category
    categoryNamePrefix(categoryLevel) {
        let resultStr = "";
        for (let i = 0; i < categoryLevel; i++) {
            resultStr += "---";
        }
        return resultStr;
    }
    createCategoryTree(originListItem) {
        let childListItem = originListItem.filter(item => item.ParentID == 0);
        //  console.log("createCategoryTree childListItem:", childListItem);
        let itemListResult = [{ value: -1, label: "--Vui lòng chọn--" }];
        for (let i = 0; i < childListItem.length; i++) {
            itemListResult.push({ value: childListItem[i].CategoryID, label: childListItem[i].CategoryName });
            let childItemTree = this.createChildCategoryTree(originListItem, childListItem[i].CategoryID, 1);
            // console.log("createCategoryTree childItemTree:", childItemTree);
            for (let j = 0; j < childItemTree.length; j++) {
                //itemListResult.push(childItemTree[j]);
                itemListResult.push({ value: childItemTree[j].CategoryID, label: childItemTree[j].CategoryName });
            }
        }
        return itemListResult;
    }
    createChildCategoryTree(originListItem, parentID, categoryLevel) {
        let childListItem = originListItem.filter(item => item.ParentID == parentID);
        // console.log("createChildCategoryTree childListItem:", childListItem);
        let itemListResult = []
        for (let i = 0; i < childListItem.length; i++) {
            let item = childListItem[i];
            item.CategoryName = this.categoryNamePrefix(categoryLevel) + item.CategoryName;
            //   console.log("createChildCategoryTree childListItem:",item);
            itemListResult.push(item);
            //itemListResult.push({ value: item.CategoryID, label: item.CategoryName });
            const newCategoryLevel = categoryLevel + 1;
            let childListItem2 = originListItem.filter(item => item.ParentID == item.CategoryID);
            //  console.log("createChildCategoryTree childListItem2:",childListItem2);
            if (childListItem2.length > 0) {
                const childItemTree2 = this.createChildCategoryTree(originListItem, item.CategoryID, newCategoryLevel);
                for (j = 0; j < childItemTree2.length; j++) {
                    itemListResult.push(childItemTree2[j]);
                    itemListResult.push({ value: childItemTree2[j].CategoryID, label: childItemTree2[j].CategoryName });
                }
            }
        }
        return itemListResult;

    }
    //#endregion tree category

    componentDidMount() {
        let listOption = this.props.listoption;
        // console.log("this.props.isautoloaditemfromcachess: ", this.props.isautoloaditemfromcache,this.props.loaditemcachekeyid,this.props.listoption)
        if (this.props.isautoloaditemfromcache) {
            const cacheKeyID = this.props.loaditemcachekeyid;
            const valueMember = this.props.valuemember;
            const nameMember = this.props.nameMember;
            const isCategory = this.props.isCategory;
            //    console.log("this.props.isautoloaditemfromcache1: ",this.props.loaditemcachekeyid, this.state.Listoption);
            this.props.callGetCache(cacheKeyID).then((result) => {
                //  console.log("this.props.isautoloaditemfromcach2: ",this.props.loaditemcachekeyid, this.state.Listoption);
                listOption = [{ value: -1, label: "--Vui lòng chọn--" }];
                if (!result.IsError && result.ResultObject.CacheData != null) {
                    if (!isCategory) {

                        result.ResultObject.CacheData.map((cacheItem) => {
                            listOption.push({ value: cacheItem[valueMember], label: cacheItem[valueMember] + " - " + cacheItem[nameMember], name: cacheItem[nameMember] });
                        }
                        );
                        this.setState({ Listoption: listOption });
                    }
                    else {
                        const categoryTree = this.createCategoryTree(result.ResultObject.CacheData, 0, 0);
                        this.setState({ Listoption: categoryTree });
                    }
                }
                else {
                    this.setState({ Listoption: listOption });
                }
                //  console.log("this.props.isautoloaditemfromcachess: ",this.props.loaditemcachekeyid, this.state.Listoption);
            });
        }
        else {
            //console.log("this.props.isautoloaditemfromcache1: ",this.props.loaditemcachekeyid, this.state.Listoption);
            this.setState({ Listoption: listOption });
        }
    }

    render() {
        let formRowClassName = "form-row";
        if (this.props.rowspan != null) {
            formRowClassName = "form-row col-md-" + this.props.rowspan;
        }
        let className = "form-control form-control-sm";
        if (this.props.CSSClassName != null)
            className = this.props.CSSClassName;
        const listOption = this.state.Listoption;
        let formGroupClassName = "form-group col-md-4";
        if (this.props.colspan != null) {
            formGroupClassName = "form-group col-md-" + this.props.colspan;
        }
        let labelDivClassName = "form-group col-md-2";
        if (this.props.labelcolspan != null) {
            labelDivClassName = "form-group col-md-" + this.props.labelcolspan;
        }
        let star;
        if (this.props.validatonList != undefined && this.props.validatonList.includes("Comborequired") == true) {
            star = '*'
        }

        if (this.props.validationErrorMessage != "") {
            className += " is-invalid";
            return (
                <div className={formRowClassName} >
                    <div className={labelDivClassName}>
                        <label className="col-form-label 6">
                            {this.props.label}<span className="text-danger"> {star}</span>
                        </label>
                    </div>
                    <div className={formGroupClassName}>
                        <select className={className} name={this.props.name}
                            onChange={this.handleValueChange}
                            value={this.state.value}
                            disabled={this.props.disabled}
                            required={this.props.required}
                        >
                            {listOption.map((optionItem) =>
                                <option key={optionItem.value} value={optionItem.value}>{(optionItem.value == -1 ? "" : optionItem.value + " - ") + optionItem.label}</option>
                            )}
                        </select>
                        <div className="invalid-feedback"><ul className="list-unstyled"><li>{this.props.validationErrorMessage}</li></ul></div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className={formRowClassName} >
                    <div className={labelDivClassName}>
                        <label className="col-form-label 7">
                            {this.props.label}<span className="text-danger"> {star}</span>
                        </label>
                    </div>
                    <div className={formGroupClassName}>
                        <select className={className} name={this.props.name}
                            onChange={this.handleValueChange} value={this.state.value}
                            disabled={this.props.disabled}
                            required={this.props.required}
                        >
                            {listOption.map((optionItem) =>
                                <option key={optionItem.value} value={optionItem.value}>{optionItem.label}</option>
                            )}
                        </select>
                    </div>
                </div>
            );
        }
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

export const ComboBox = connect(null, mapDispatchToProps)(ComboBoxCom);

class SubmitButton extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        let className = "btn btn-primary";
        if (this.props.CSSClassName != null)
            className = this.props.CSSClassName;

        return (
            <input type="submit" name={this.props.name} value={this.props.value}
                className={className}
            />
        );
    }
}

//hoc.lenho test
class modal extends Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.onShowClick = this.onShowClick.bind(this);
        this.onDialogClick = this.onDialogClick.bind(this);
        this.state = { Ismodal: false };
    }
    onShowClick() {
        this.setState({ Ismodal: true });
    }
    onDialogClick() {
        this.setState({ Ismodal: false });
    }
    handleValueChange(e) {
        if (this.props.onValueChange != null)
            this.props.onValueChange(e.target.name, e.target.value);
    }
    render() {
        let classNameShow = "";
        let classNameShowbackdrop = "";
        let displayShow = "none";

        if (this.state.Ismodal) {
            classNameShow = "show";
            classNameShowbackdrop = "modal-backdrop fade show";
            displayShow = "block";

        }
        return (
            <div>
                <div className={classNameShowbackdrop} ></div>
                <div className="modal fade" className={classNameShow} id="modal-large" tabIndex={-1} style={{ paddingRight: 16, display: displayShow }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" id="myModalLabel">Modal title</h4>
                                <button type="button" className="close" data-dismiss="modal">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Your content comes here</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-bold btn-pure btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-bold btn-pure btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


class GroupTextBoxCom extends Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            ListOption: []
        }
    }


    componentDidMount() {
        let listOption = this.props.listoption;
        this.setState({ ListOption: listOption });
    }



    handleinsertItem(formData) {
        this.props.onClickInsertItem(formData)
    }

    handleSubmit() {
        this.props.showModal(MODAL_TYPE_SEARCH, {
            title: this.props.titleModal,
            content: {
                text: <SearchModal
                    PKColumnName={this.props.PKColumnName}
                    multipleCheck={this.props.multipleCheck}
                    SearchMLObjectDefinition={this.props.SearchMLObjectDefinition}
                    DataGridColumnList={this.props.dataGridColumnList}
                    GridDataSource={this.props.gridDataSource}
                    SearchAPIPath={this.props.SearchAPIPath}
                    SearchElementList={this.props.SearchElementList}
                    onClickInsertItem={this.handleinsertItem.bind(this)}
                    IDSelectColumnName={this.props.IDSelectColumnName}
                    name={this.props.dataNamesourcemember}
                    value={this.props.datasourcemember}
                >
                </SearchModal>
            }
        });

    }

    //delete item option
    handleValueChange(index) {
        let optionItems = this.props.lstOption;
        optionItems.splice(index, 1);
        this.setState({ ListOption: optionItems });
        if (this.props.onClickInsertItem != null) {
            this.props.onClickInsertItem(optionItems);
        }

    }

    render() {
        const selectedOption = this.props.lstOption;

        let formRowClassName = "form-row";
        if (this.props.rowspan != null) {
            formRowClassName = "form-row col-md-" + this.props.rowspan;
        }
        let className = "form-control form-control-sm value-container-input-group";
        if (this.props.CSSClassName != null)
            className = this.props.CSSClassName;
        let formGroupClassName = "form-group col-md-4";
        if (this.props.colspan != null) {
            formGroupClassName = "form-group col-md-" + this.props.colspan;
        }
        let labelDivClassName = "form-group col-md-2";
        if (this.props.labelcolspan != null) {
            labelDivClassName = "form-group col-md-" + this.props.labelcolspan;
        }
        return (
            <React.Fragment>
                <div className={formRowClassName + " input-group-cus"} >
                    <div className={labelDivClassName}>
                        <label className="col-form-label 8">{this.props.label}</label>
                    </div>
                    <div className={formGroupClassName + " input-group"}>
                        <div className="container-input-group-box">
                            <div className="control-input-group">
                                <div className={className}>
                                    {selectedOption &&
                                        selectedOption.map((item, index) => {
                                            return (
                                                <div className="item-group" key={index}>
                                                    <label>{item.label}</label>
                                                    <span className="icon-delete" onClick={() => { this.handleValueChange(index) }}>
                                                        <i className="fa fa-times"></i>
                                                    </span>
                                                </div>

                                            )
                                        })
                                    }
                                </div>
                                <div className="input-group-prepend">
                                    <span className="indicatorSeparator"></span>
                                    <button className="btn btn-light btn-cus" type="button" onClick={this.handleSubmit}>
                                        <i className="fa fa-search"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export const GroupTextBox = connect(null, mapDispatchToProps)(GroupTextBoxCom);

const mapStateToProps = state => {
    return {
        AppInfo: state
    }
}

//End hoc.lenho test

class TreeSelectCom extends React.Component {
    static defaultProps = {
        componenttype: 'InputControl'
    }
    constructor(props) {
        super(props);
        //this.handleValueChange = this.handleValueChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            IsDisabled: false,
            value: this.props.value,
        };
    }

    componentDidMount() {

        const validatonDisabled = this.props.isDisabled;
        if (this.props.AppInfo.LoginInfo.Username == "administrator" && (this.props.name).toLowerCase().includes('system')) {
            this.setState({
                IsDisabled: false
            })
        }
        else if (validatonDisabled) {
            this.setState({
                IsDisabled: true
            })
        }

        let treeData = this.props.treeData ? this.props.treeData : [];
        if (this.props.IsAutoLoadItemFromCache) {
            const { loadItemCachekeyID, valueMember, nameMember, rootID, rootKey } = this.props;
            this.props.callGetCache(loadItemCachekeyID).then((result) => {

                if (!result.IsError && result.ResultObject.CacheData != null) {
                    treeData = createListTree(result.ResultObject.CacheData, rootID, rootKey, valueMember, nameMember)
                    treeData.unshift({
                        ParentID: -1,
                        CategoryID: -1,
                        CategoryName: "- Vui lòng chọn - -",
                        key: -1,
                        value: -1,
                        title: "- - Vui lòng chọn - -",
                    })
                }
                else {
                    console.log("ghi log cache lỗi", loadItemCachekeyID);
                }
                this.setState({ treeData: treeData, });
            });
        }
        else {
            this.setState({ treeData: treeData });
        }
    }

    onChange(inputname, inputvalue) {
        //console.log("Change", this.props, inputname, inputvalue);
        this.setState({ value: inputvalue });
        if (this.props.onValueChange != null)
            this.props.onValueChange(inputname, inputvalue, this.props.label, undefined, this.props.validatonList);
        if (this.props.onValueChangeCus) {
            this.props.onValueChangeCus(inputname, inputvalue);
        }
    };

    render() {
        let className = "form-control form-control-sm";
        if (this.props.CSSClassName != null)
            className = this.props.CSSClassName;
        let formGroupClassName = "form-group col-md-4";
        if (this.props.colspan != null) {
            formGroupClassName = "form-group col-md-" + this.props.colspan;
        }
        let labelDivClassName = "form-group col-md-2";
        if (this.props.labelcolspan != null) {
            labelDivClassName = "form-group col-md-" + this.props.labelcolspan;
        }
        let star;
        if (this.props.validatonList != undefined && this.props.validatonList.includes("Comborequired") == true) {
            star = '*'
        }
        let disabledd = this.state.IsDisabled;
        if (!disabledd) {
            if (typeof this.props.disabled !== "undefined" && this.props.disabled == true) {
                disabledd = this.props.disabled;
            }
        }
        //console.log("aaa",this.props.validationErrorMessage )
        if (this.props.validationErrorMessage != "") {
            className += " is-invalid";
            return (

                <div className="form-row" >
                    <div className={labelDivClassName}>
                        <label className="col-form-label 4">
                            {this.props.label}<span className="text-danger"> {star}</span>
                        </label>
                    </div>
                    <div className={formGroupClassName}>
                        <TreeSelect
                            className={className}
                            disabled={disabledd}
                            bordered={false}
                            ref={this.props.inputRef}
                            value={this.state.value}
                            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                            treeData={this.state.treeData}
                            placeholder="Vui lòng chọn"
                            treeDefaultExpandAll
                            onChange={(value) => this.onChange(this.props.name, value)}
                            onSelect={this.onSelect}
                            dropdownClassName="tree-select-custom"
                        />
                        <div className="invalid-feedback">
                            <ul className="list-unstyled">
                                <li>{this.props.validationErrorMessage}</li>
                            </ul>
                        </div>
                    </div>
                </div>

            );
        }
        else {
            return (

                <div className="form-row" >
                    <div className={labelDivClassName}>
                        <label className="col-form-label 4">
                            {this.props.label}<span className="text-danger"> {star}</span>
                        </label>
                    </div>
                    <div className={formGroupClassName}>
                        <TreeSelect
                            className={className}
                            disabled={disabledd}
                            bordered={false}
                            ref={this.props.inputRef}
                            value={this.state.value}
                            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                            treeData={this.state.treeData}
                            placeholder="Vui lòng chọn"
                            treeDefaultExpandAll
                            onChange={(value) => this.onChange(this.props.name, value)}
                            onSelect={this.onSelect}
                            dropdownClassName="tree-select-custom"
                        />
                    </div>
                </div>

            );
        }


    }
}

export const TreeSelectCus = connect(mapStateToProps, mapDispatchToProps)(TreeSelectCom);


class ElementDatetimeCom extends Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
    }
    handleValueChange(name, moment) {
        //e.preventDefault();
        if (this.props.onValueChange != null)
            this.props.onValueChange(name, moment);
    }
    render() {
        let { name, label, timeFormat, dateFormat, colspan, value, ValidatonErrorMessage } = this.props;

        let formRowClassName = "form-row";
        if (this.props.rowspan != null) {
            formRowClassName = "form-row col-md-" + this.props.rowspan;
        }
        let className = "form-control form-control-sm";
        if (this.props.CSSClassName != null)
            className = this.props.CSSClassName;
        let formGroupClassName = "form-group col-md-4";
        if (this.props.colspan != null) {
            formGroupClassName = "form-group col-md-" + this.props.colspan;
        }
        let labelDivClassName = "form-group col-md-2";
        if (this.props.labelcolspan != null) {
            labelDivClassName = "form-group col-md-" + this.props.labelcolspan;
        }
        let star;
        if (this.props.validatonList != undefined && this.props.validatonList.includes("Comborequired") == true) {
            star = '*'
        }

        if (this.props.validationErrorMessage != "") {
            className += " is-invalid";
            return (
                <div className={formRowClassName} >
                    <div className={labelDivClassName}>
                        <label className="col-form-label 6">
                            {this.props.label}<span className="text-danger"> {star}</span>
                        </label>
                    </div>
                    <div className={formGroupClassName}>
                        <Datetime
                            className={className}
                            name={name}
                            onChange={this.handleValueChange}
                            onChange={(moment) => this.handleValueChange(name, moment)}
                            defaultValue={value}
                            timeFormat={timeFormat}
                            dateFormat={dateFormat} >
                        </Datetime>
                        <div className="invalid-feedback"><ul className="list-unstyled"><li>{this.props.validationErrorMessage}</li></ul></div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className={formRowClassName} >
                    <div className={labelDivClassName}>
                        <label className="col-form-label 7">
                            {this.props.label}<span className="text-danger"> {star}</span>
                        </label>
                    </div>
                    <div className={formGroupClassName}>
                        <Datetime
                            name={name}
                            onChange={this.handleValueChange}
                            onChange={(moment) => this.handleValueChange(name, moment)}
                            defaultValue={value}
                            timeFormat={timeFormat}
                            dateFormat={dateFormat} >
                        </Datetime>
                    </div>
                </div>
            );
        }
    }
}
const ElementDatetime = connect(null, null)(ElementDatetimeCom);

class ComboBox1Com extends Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.state = { Listoption: [], value: this.props.value, SelectedOption: {} }
    }
    handleValueChange(selectedOption) {
        const comboValues = this.getComboValue(selectedOption);
        this.setState({ SelectedOption: selectedOption });
        if (this.props.onChange)
            this.props.onChange(this.props.name, comboValues);
    }

    bindcombox(listOption) {
        let values = this.props.value;
        let selectedOption = [];
        if (values == null || values === -1)
            return selectedOption;
        if (typeof values.toString() == "string")
            values = values.toString().split();
        for (let i = 0; i < values.length; i++) {
            for (let j = 0; j < listOption.length; j++) {
                if (values[i] == listOption[j].value) {
                    selectedOption.push({ value: listOption[j].value, label: listOption[j].value + "-" + listOption[j].name });
                }
            }
        }
        return selectedOption;
    }
    getComboValue(selectedOption) {
        let values = [];
        if (selectedOption == null)
            return -1;
        if (this.props.isMultiSelect) {
            for (let i = 0; i < selectedOption.length; i++) {
                values.push(selectedOption[i].value);
            }
        } else {
            return selectedOption.value;
        }

        return values;
    }
    //#endregion tree category

    componentDidMount() {
        let listOption = this.props.listoption;
        // console.log("this.props.isautoloaditemfromcachess: ", this.props.isautoloaditemfromcache,this.props.loaditemcachekeyid,this.props.listoption)
        if (this.props.isautoloaditemfromcache) {
            const cacheKeyID = this.props.loaditemcachekeyid;
            const valueMember = this.props.valuemember;
            const nameMember = this.props.nameMember;
            const isCategory = this.props.isCategory;
            //    console.log("this.props.isautoloaditemfromcache1: ",this.props.loaditemcachekeyid, this.state.Listoption);
            this.props.callGetCache(cacheKeyID).then((result) => {
                //  console.log("this.props.isautoloaditemfromcach2: ",this.props.loaditemcachekeyid, this.state.Listoption);
                listOption = [{ value: -1, label: "--Vui lòng chọn--" }];
                if (!result.IsError && result.ResultObject.CacheData != null) {
                    result.ResultObject.CacheData.map((cacheItem) => {
                        listOption.push({ value: cacheItem[valueMember], label: cacheItem[valueMember] + " - " + cacheItem[nameMember], name: cacheItem[nameMember] });
                    }
                    );
                    let aa = this.bindcombox(listOption);
                    this.setState({ Listoption: listOption, SelectedOption: aa });
                }
                else {
                    this.setState({ Listoption: listOption });
                }
                //  console.log("this.props.isautoloaditemfromcachess: ",this.props.loaditemcachekeyid, this.state.Listoption);
            });
        }
        else {
            //console.log("this.props.isautoloaditemfromcache1: ",this.props.loaditemcachekeyid, this.state.Listoption);
            this.setState({ Listoption: listOption });
        }
    }

    render() {
        let { name, label, icon, colspan, isMultiSelect, ValidatonErrorMessage, placeholder } = this.props;
        let formRowClassName = "form-row";
        if (this.props.rowspan != null) {
            formRowClassName = "form-row col-md-" + this.props.rowspan;
        }
        let className = "react-select";
        const listOption = this.state.Listoption;
        let formGroupClassName = "form-group col-md-4";
        if (this.props.colspan != null) {
            formGroupClassName = "form-group col-md-" + this.props.colspan;
        }
        let labelDivClassName = "form-group col-md-2";
        if (this.props.labelcolspan != null) {
            labelDivClassName = "form-group col-md-" + this.props.labelcolspan;
        }
        let star;
        if (this.props.validatonList != undefined && this.props.validatonList.includes("Comborequired") == true) {
            star = '*'
        }

        if (this.props.validationErrorMessage != "") {
            className += " is-invalid";
            return (
                <div className={formRowClassName} >
                    <div className={labelDivClassName}>
                        <label className="col-form-label 6">
                            {this.props.label}<span className="text-danger"> {star}</span>
                        </label>
                    </div>

                    <div className={formGroupClassName}>
                        <Select
                            value={this.state.SelectedOption}
                            name={this.props.name}
                            ref={this.props.inputRef}
                            onChange={this.handleValueChange}
                            options={this.state.Listoption}
                            isMulti={isMultiSelect}
                            isSearchable={true}
                            placeholder={placeholder}
                            className={className}
                        />
                        <div className="invalid-feedback"><ul className="list-unstyled"><li>{this.props.validationErrorMessage}</li></ul></div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className={formRowClassName} >
                    <div className={labelDivClassName}>
                        <label className="col-form-label 7">
                            {this.props.label}<span className="text-danger"> {star}</span>
                        </label>
                    </div>
                    <div className={formGroupClassName}>
                        <div className="form-group-input-select">
                            <Select
                                value={this.state.selectedOption}
                                name={this.props.name}
                                ref={this.props.inputRef}
                                onChange={this.handleValueChange}
                                options={this.state.ListOption}
                                isMulti={isMultiSelect}
                                isSearchable={true}
                                placeholder={placeholder}
                                className={className}
                            />
                        </div>
                        {/* <select className={className} name={this.props.name}
                            onChange={this.handleValueChange} value={this.state.value}
                            disabled={this.props.disabled}
                            required={this.props.required}
                        >
                            {listOption.map((optionItem) =>
                                <option key={optionItem.value} value={optionItem.value}>{optionItem.label}</option>
                            )}
                        </select> */}

                    </div>
                </div>
            );
        }
    }
}


export const ComboBox1 = connect(null, mapDispatchToProps)(ComboBox1Com);


export default { TextBox, TextArea, CheckBox, ComboBox, MultiSelectComboBox, modal, GroupTextBox, TreeSelectCus, ElementDatetime, ComboBox1, ComboboxQTQHPX };

