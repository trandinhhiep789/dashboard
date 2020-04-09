
import React, { Component, PropTypes } from 'react';
import MultiSelectComboBox from "./MultiSelectComboBox";
import { callGetCache } from "../../../../actions/cacheAction";
import { connect } from 'react-redux';
import { showModal, hideModal } from '../../../../actions/modal';
import { MODAL_TYPE_SEARCH } from '../../../../constants/actionTypes';
import SearchModal from "../../Form/AdvanceForm/FormControl/FormSearchModal"

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
        if (this.props.validationErrorMessage != "") {
            className += " is-invalid";

            if (this._myInput)
                this._myInput.focus();

            return (
                <div className="form-row" >
                    <div className={labelDivClassName}>
                        <label className="col-form-label">{this.props.label}</label>
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
                <div className="form-row" >
                    <div className={labelDivClassName}>
                        <label className="col-form-label">{this.props.label}</label>
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

        return (

            <div className="form-row" >
                <div className={labelDivClassName}>
                    <label className="col-form-label">{this.props.label}</label>
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
        return (

            <div className={formRowClassName} >
                <div className={labelDivClassName}>
                    <label className="col-form-label">{this.props.label}</label>
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
                            listOption.push({ value: cacheItem[valueMember], label: cacheItem[nameMember] });
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

        if (this.props.validationErrorMessage != "") {
            className += " is-invalid";
            return (
                <div className={formRowClassName} >
                    <div className={labelDivClassName}>
                        <label className="col-form-label">{this.props.label}</label>
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
                        <div className="invalid-feedback"><ul className="list-unstyled"><li>{this.props.validationErrorMessage}</li></ul></div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className={formRowClassName} >
                    <div className={labelDivClassName}>
                        <label className="col-form-label">{this.props.label}</label>
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
        return (
            <React.Fragment>
                <div className={formRowClassName + " input-group-cus"} >
                    <div className={labelDivClassName}>
                        <label className="col-form-label">{this.props.label}</label>
                    </div>
                    <div className={formGroupClassName + " input-group"}>
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
                        <span className="input-group-prepend">
                            <button className="btn btn-light" type="button" onClick={this.handleSubmit}>
                                <i className="fa fa-search"></i>
                            </button>
                        </span>
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

export default { TextBox, TextArea, CheckBox, ComboBox, MultiSelectComboBox, modal,GroupTextBox };
