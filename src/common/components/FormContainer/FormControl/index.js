
import React, { Component, PropTypes } from 'react';
import MultiSelectComboBox from "./MultiSelectComboBox";
import MultiUserComboBox from "./MultiSelectComboBox/MultiUserComboBox";

import ComboboxQTQHPX from "./CommonControl/ComboboxQTQHPX.js";
import { callGetCache, callGetUserCache } from "../../../../actions/cacheAction";
import { connect } from 'react-redux';
import { showModal, hideModal } from '../../../../actions/modal';
import { MODAL_TYPE_SEARCH } from '../../../../constants/actionTypes';
import SearchModal from "../../Form/AdvanceForm/FormControl/FormSearchModal"
import { createListTree } from "../../../library/ultils";
import { TreeSelect, DatePicker, TimePicker } from "antd";
import moment from 'moment';
import Datetime from 'react-datetime';
import "antd/dist/antd.css";
import Select from 'react-select';
import { formatMoney } from '../../../../utils/function';
import { formatDateNew } from '../../../../common/library/CommonLib.js';
import { ExportStringToDate, ExportStringDate } from "../../../../common/library/ultils";
import { Base64 } from 'js-base64';
import { el } from 'date-fns/locale';


//#region connect
const mapStateToProps = state => {
    return {
        AppInfo: state
    }
}
const mapDispatchToProps = dispatch => {
    return {
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
        callGetUserCache: (cacheKeyID) => {
            return dispatch(callGetUserCache(cacheKeyID));
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: () => {
            dispatch(hideModal());
        }
    }
}
//#endregion connect



class TextBoxNew extends React.Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handKeyDown = this.handKeyDown.bind(this);
    }
    static defaultProps = {
        controltype: 'InputControl'
    }

    handleValueChange(e) {
        if (this.props.onValueChange != null) {
            this.props.onValueChange(e.target.name, e.target.value, "", e, undefined);
        }

    }

    handKeyDown(e) {
        if (e.key == 'Enter') {
            if (this.props.onhandKeyDown != null) {
                this.props.onhandKeyDown(e.target.name, e.target.value, "", e, this.props.validatonList);
            }
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
        // console.log('this.props.label', this.props.label)
        console.log("222", Base64.decode(this.props.value), this.props.value)
        if (this.props.validationErrorMessage != "" && this.props.validationErrorMessage != undefined) {
            className += " is-invalid";

            return (
                <div className={formRowClassName} >
                    {this.props.label.length > 0 ?
                        <div className={labelDivClassName}>
                            <label className="col-form-label 2">
                                {this.props.label}<span className="text-danger"> {star}</span>
                            </label>
                        </div>
                        : ""
                    }

                    <div className={formGroupClassName}>
                        <input type="text" name={this.props.name}
                            onChange={this.handleValueChange}
                            onBlur={this.handKeyDown}
                            value={Base64.decode(this.props.value)}
                            key={this.props.name}
                            className={className}
                            autoFocus={true}
                            ref={this.props.inputRef}
                            placeholder={this.props.placeholder}
                            disabled={this.props.readOnly}
                            maxLength={this.props.maxSize}
                        />
                        <div className="invalid-feedback"><ul className="list-unstyled"><li>{this.props.validationErrorMessage}</li></ul></div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className={formRowClassName} >
                    {this.props.label.length > 0 ?
                        <div className={labelDivClassName}>
                            <label className="col-form-label 2">
                                {this.props.label}<span className="text-danger"> {star}</span>
                            </label>
                        </div>
                        : ""
                    }
                    <div className={formGroupClassName}>
                        <input type="text" name={this.props.name}
                            onChange={this.handleValueChange}
                            onKeyPress={(event) => this.handKeyDown(event)}
                            value={Base64.decode(this.props.value)}
                            key={this.props.name}
                            className={className}
                            autoFocus={false}
                            ref={this.props.inputRef}
                            placeholder={this.props.placeholder}
                            disabled={this.props.readOnly}
                            maxLength={this.props.maxSize}
                        />
                    </div>
                </div>
            );
        }
    }
}


class TextBox extends React.Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handKeyDown = this.handKeyDown.bind(this);
    }
    static defaultProps = {
        controltype: 'InputControl'
    }

    handleValueChange(e) {
        if (this.props.onValueChange != null) {
            this.props.onValueChange(e.target.name, e.target.value, "", e, undefined);
        }

    }

    handKeyDown(e) {
        if (e.key == 'Enter') {
            if (this.props.onhandKeyDown != null) {
                this.props.onhandKeyDown(e.target.name, e.target.value, "", e, this.props.validatonList);
            }
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
        // console.log('this.props.label', this.props.label)
        if (this.props.validationErrorMessage != "" && this.props.validationErrorMessage != undefined) {
            className += " is-invalid";

            return (
                <div className={formRowClassName} >
                    {this.props.label.length > 0 ?
                        <div className={labelDivClassName}>
                            <label className="col-form-label 2">
                                {this.props.label}<span className="text-danger"> {star}</span>
                            </label>
                        </div>
                        : ""
                    }

                    <div className={formGroupClassName}>
                        <input type="text" name={this.props.name}
                            onChange={this.handleValueChange}
                            onBlur={this.handKeyDown}
                            value={this.props.value}
                            key={this.props.name}
                            className={className}
                            autoFocus={true}
                            ref={this.props.inputRef}
                            placeholder={this.props.placeholder}
                            disabled={this.props.readOnly}
                            maxLength={this.props.maxSize}
                        />
                        <div className="invalid-feedback"><ul className="list-unstyled"><li>{this.props.validationErrorMessage}</li></ul></div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className={formRowClassName} >
                    {this.props.label.length > 0 ?
                        <div className={labelDivClassName}>
                            <label className="col-form-label 2">
                                {this.props.label}<span className="text-danger"> {star}</span>
                            </label>
                        </div>
                        : ""
                    }
                    <div className={formGroupClassName}>
                        <input type="text" name={this.props.name}
                            onChange={this.handleValueChange}
                            onKeyPress={(event) => this.handKeyDown(event)}
                            value={this.props.value}
                            key={this.props.name}
                            className={className}
                            autoFocus={false}
                            ref={this.props.inputRef}
                            placeholder={this.props.placeholder}
                            disabled={this.props.readOnly}
                            maxLength={this.props.maxSize}
                        />
                    </div>
                </div>
            );
        }
    }
}

class FormControlTextBox extends React.Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
    }
    handleValueChange(e) {
        if (this.props.onValueChange != null) {
            this.props.onValueChange(e.target.name, e.target.value);
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

        let formRowClassName = "form-row ss ";

        if (this.props.classNameCustom != null) {
            formRowClassName += this.props.classNameCustom;

        }
        if (this.props.validationErrorMessage != "" && this.props.validationErrorMessage != undefined) {
            className += " is-invalid";
        }

        let hidenUIControll;
        if (this.props.hidenControll == undefined || this.props.hidenControll == false) {
            hidenUIControll = ''
        }
        else (
            hidenUIControll = ' d-none'
        )

        return (

            <div className={formRowClassName + hidenUIControll} >
                {this.props.label.length > 0 ?
                    <div className={labelDivClassName}>
                        <label className="col-form-label 2">
                            {this.props.label}<span className="text-danger"> {star}</span>
                        </label>
                    </div>
                    : ""
                }

                <div className={formGroupClassName}>
                    <input type="text" name={this.props.name}
                        onChange={this.handleValueChange}
                        onBlur={this.handKeyDown}
                        value={this.props.value}
                        key={this.props.name}
                        className={className}
                        autoFocus={true}
                        ref={this.props.inputRef}
                        placeholder={this.props.placeholder}
                        disabled={this.props.readOnly}
                        maxLength={this.props.maxSize}
                    />
                    <div className="invalid-feedback"><ul className="list-unstyled"><li>{this.props.validationErrorMessage}</li></ul></div>
                </div>
            </div>

        );
    }
}

class FormControlComboBoxCom extends Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.state = { Listoption: [], SelectedOption: [] }
    }
    handleValueChange(selectedOption) {
        const comboValues = this.getComboValue(selectedOption);
        if (this.props.isselectedOp) {
            if (this.props.onValueChange != null)
                this.props.onValueChange(this.props.name, selectedOption, this.props.namelabel, selectedOption != null ? selectedOption.name : "", this.props.filterrest);
        }
        else {
            if (this.props.onValueChange != null)
                this.props.onValueChange(this.props.name, comboValues, this.props.namelabel, selectedOption != null ? selectedOption.name : "", this.props.filterrest);
        }

    }

    bindcombox(value, listOption) {
        let values = value;
        let selectedOption = [];
        if ((values == null || values === -1) && !this.props.isMultiSelect)
            return { value: -1, label: "--Vui lòng chọn--" };
        if (typeof values.toString() == "string")
            values = values.toString().split(",");
        for (let i = 0; i < values.length; i++) {
            for (let j = 0; j < listOption.length; j++) {
                if (values[i] == listOption[j].value) {
                    selectedOption.push({ value: listOption[j].value, label: listOption[j].label });
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
        let { filterValue, filterobj, isMultiSelect } = this.props;
        if (this.props.isautoloaditemfromcache) {
            const cacheKeyID = this.props.loaditemcachekeyid;
            const valueMember = this.props.valuemember;
            const nameMember = this.props.nameMember;
            if (this.props.isusercache == true) {
                this.props.callGetUserCache(cacheKeyID).then((result) => {
                    //console.log("this.props.isautoloaditemfromcach2: ", this.props.loaditemcachekeyid, this.state.Listoption, result);
                    listOption = [{ value: -1, label: "--Vui lòng chọn--" }];
                    if (!result.IsError && result.ResultObject.CacheData != null) {
                        result.ResultObject.CacheData.map((cacheItem) => {
                            listOption.push({ value: cacheItem[valueMember], label: cacheItem[nameMember], name: cacheItem[nameMember] });
                        }
                        );
                        this.setState({ Listoption: listOption });
                        const aa = this.bindcombox(this.props.value, listOption);
                        this.setState({ SelectedOption: aa });

                    }
                    else {
                        this.setState({ Listoption: listOption });

                    }
                    //  console.log("this.props.isautoloaditemfromcachess: ",this.props.loaditemcachekeyid, this.state.Listoption);
                });

            }
            else {
                this.props.callGetCache(cacheKeyID).then((result) => {
                    if (!isMultiSelect) {
                        listOption = [{ value: -1, label: "--Vui lòng chọn--" }];
                    }
                    else {
                        listOption = [];
                    }

                    if (!result.IsError && result.ResultObject.CacheData != null) {
                        if (typeof filterobj != undefined && filterValue != "") {

                            result.ResultObject.CacheData.filter(n => n[filterobj] == filterValue).map((cacheItem) => {
                                // console.log("valueMember", cacheItem[valueMember])
                                listOption.push({ value: cacheItem[valueMember], label: cacheItem[valueMember] + "-" + cacheItem[nameMember], name: cacheItem[nameMember] });
                            }
                            );
                        }
                        else {
                            result.ResultObject.CacheData.map((cacheItem) => {
                                // console.log("11", cacheItem[valueMember])
                                listOption.push({ value: cacheItem[valueMember], label: cacheItem[valueMember] + "-" + cacheItem[nameMember], name: cacheItem[nameMember] });
                            }
                            );
                        }
                        this.setState({ Listoption: listOption, Data: result.ResultObject.CacheData });
                        const strSelectedOption = this.bindcombox(this.props.value, listOption);
                        this.setState({ SelectedOption: strSelectedOption });
                    }
                    else {
                        this.setState({ Listoption: listOption });
                    }
                });
            }

        }
        else {
            this.setState({ Listoption: listOption });
            const strSelectedOption = this.bindcombox(this.props.value, listOption);
            this.setState({ SelectedOption: strSelectedOption });
        }
    }
    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.filterValue) !== JSON.stringify(nextProps.filterValue)) // Check if it's a new user, you can also use some unique property, like the ID
        {
            let { filterobj, valuemember, nameMember, isMultiSelect } = this.props;
            if (typeof filterobj != undefined && nextProps.filterValue != "") {
                let listoptionnew = []
                if (!isMultiSelect)
                    listoptionnew = [{ value: -1, label: "--Vui lòng chọn--" }];
                this.state.Data.filter(n => n[filterobj] == nextProps.filterValue).map((cacheItem) => {
                    listoptionnew.push({ value: cacheItem[valuemember], label: cacheItem[valuemember] + "-" + cacheItem[nameMember], name: cacheItem[nameMember] });
                }
                );
                this.setState({ Listoption: listoptionnew });
            }
        }
        if (JSON.stringify(this.props.value) !== JSON.stringify(nextProps.value)) {
            const aa = this.bindcombox(nextProps.value, this.state.Listoption);
            this.setState({ SelectedOption: aa });
        }

        if (JSON.stringify(this.props.listoption) !== JSON.stringify(nextProps.listoption)) // Check if it's a new user, you can also use some unique property, like the ID
        {
            this.setState({ Listoption: nextProps.listoption });
        }
    }

    render() {
        let { name, label, rowspan, colspan, labelcolspan, validatonList, isMultiSelect, disabled, validationErrorMessage, placeholder, listoption } = this.props;
        let formRowClassName = "form-row";
        if (rowspan != null) {
            formRowClassName = "form-row col-md-" + rowspan;
        }

        let formGroupClassName = "form-group col-md-4";
        if (colspan != null) {
            formGroupClassName = "form-group col-md-" + colspan;
        }
        let labelDivClassName = "form-group col-md-2";
        if (labelcolspan != null) {
            labelDivClassName = "form-group col-md-" + labelcolspan;
        }
        let star;
        if (validatonList != undefined && validatonList.includes("Comborequired") == true) {
            star = '*'
        }
        let className = "react-select";
        if (validationErrorMessage != undefined && validationErrorMessage != "") {
            className += " is-invalid";
        }
        const selectedOption = this.state.SelectedOption;
        const listOption = this.state.Listoption;
        return (
            <div className={formRowClassName} >
                <div className={labelDivClassName}>
                    <label className="col-form-label 6">
                        {label}<span className="text-danger"> {star}</span>
                    </label>
                </div>
                <div className={formGroupClassName}>
                    <Select
                        value={selectedOption}
                        name={name}
                        ref={this.props.inputRef}
                        onChange={this.handleValueChange}
                        options={listOption}
                        isDisabled={disabled}
                        isMulti={isMultiSelect}
                        isSearchable={true}
                        placeholder={placeholder}
                        className={className}
                    />
                    <div className="invalid-feedback"><ul className="list-unstyled"><li>{validationErrorMessage}</li></ul></div>
                </div>
            </div>
        );
    }
}
export const FormControlComboBox = connect(mapStateToProps, mapDispatchToProps)(FormControlComboBoxCom);

class FormControlComboBoxUserCom extends Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.state = { Listoption: [], SelectedOption: [] }
    }
    handleValueChange(selectedOption) {
        debugger;
        const comboValues = this.getComboValue(selectedOption);
        if (this.props.onValueChange != null)
            this.props.onValueChange(this.props.name, comboValues, selectedOption);
     
    }

    bindcombox(value, listOption) {
        let values = value;
        let selectedOption = [];
        if ((values == null || values === -1) && !this.props.isMultiSelect)
            return { value: -1, label: "--Vui lòng chọn--" };
        if (typeof values.toString() == "string")
            values = values.toString().split(",");
        for (let i = 0; i < values.length; i++) {
            for (let j = 0; j < listOption.length; j++) {
                if (values[i] == listOption[j].value) {
                    selectedOption.push({ value: listOption[j].value, label: listOption[j].label, name: listOption[j].name });
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
        let { filterValue, filterobj, isMultiSelect } = this.props;
        if (this.props.isautoloaditemfromcache) {
            const cacheKeyID = this.props.loaditemcachekeyid;
            const valueMember = this.props.valuemember;
            const nameMember = this.props.nameMember;
            if (this.props.isusercache == true) {
                this.props.callGetUserCache(cacheKeyID).then((result) => {
                    //console.log("this.props.isautoloaditemfromcach2: ", this.props.loaditemcachekeyid, this.state.Listoption, result);
                    listOption = [{ value: -1, label: "--Vui lòng chọn--" }];
                    if (!result.IsError && result.ResultObject.CacheData != null) {
                        result.ResultObject.CacheData.map((cacheItem) => {
                            listOption.push({ value: cacheItem[valueMember], label: cacheItem[nameMember], name: cacheItem[nameMember] });
                        }
                        );
                        this.setState({ Listoption: listOption });
                        const aa = this.bindcombox(this.props.value, listOption);
                        this.setState({ SelectedOption: aa });

                    }
                    else {
                        this.setState({ Listoption: listOption });

                    }
                    //  console.log("this.props.isautoloaditemfromcachess: ",this.props.loaditemcachekeyid, this.state.Listoption);
                });

            }
            else {
                this.props.callGetCache(cacheKeyID).then((result) => {
                    if (!isMultiSelect) {
                        listOption = [{ value: -1, label: "--Vui lòng chọn--" }];
                    }
                    else {
                        listOption = [];
                    }

                    if (!result.IsError && result.ResultObject.CacheData != null) {
                        if (typeof filterobj != undefined && filterValue != "") {

                            result.ResultObject.CacheData.filter(n => n[filterobj] == filterValue).map((cacheItem) => {
                                // console.log("valueMember", cacheItem[valueMember])
                                listOption.push({ value: cacheItem[valueMember], label: cacheItem[valueMember] + "-" + cacheItem[nameMember], name: cacheItem[nameMember] });
                            }
                            );
                        }
                        else {
                            result.ResultObject.CacheData.map((cacheItem) => {
                                // console.log("11", cacheItem[valueMember])
                                listOption.push({ value: cacheItem[valueMember], label: cacheItem[valueMember] + "-" + cacheItem[nameMember], name: cacheItem[nameMember] });
                            }
                            );
                        }
                        this.setState({ Listoption: listOption, Data: result.ResultObject.CacheData });
                        const strSelectedOption = this.bindcombox(this.props.value, listOption);
                        this.setState({ SelectedOption: strSelectedOption });
                    }
                    else {
                        this.setState({ Listoption: listOption });
                    }
                });
            }

        }
        else {
            this.setState({ Listoption: listOption });
            const strSelectedOption = this.bindcombox(this.props.value, listOption);
            this.setState({ SelectedOption: strSelectedOption });
        }
    }
    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.filterValue) !== JSON.stringify(nextProps.filterValue)) // Check if it's a new user, you can also use some unique property, like the ID
        {
            let { filterobj, valuemember, nameMember, isMultiSelect } = this.props;
            if (typeof filterobj != undefined && nextProps.filterValue != "") {
                let listoptionnew = []
                if (!isMultiSelect)
                    listoptionnew = [{ value: -1, label: "--Vui lòng chọn--" }];
                this.state.Data.filter(n => n[filterobj] == nextProps.filterValue).map((cacheItem) => {
                    listoptionnew.push({ value: cacheItem[valuemember], label: cacheItem[valuemember] + "-" + cacheItem[nameMember], name: cacheItem[nameMember] });
                }
                );
                this.setState({ Listoption: listoptionnew });
            }
        }
        if (JSON.stringify(this.props.value) !== JSON.stringify(nextProps.value)) {
            const aa = this.bindcombox(nextProps.value, this.state.Listoption);
            this.setState({ SelectedOption: aa });
        }

        if (JSON.stringify(this.props.listoption) !== JSON.stringify(nextProps.listoption)) // Check if it's a new user, you can also use some unique property, like the ID
        {
            this.setState({ Listoption: nextProps.listoption });
        }
    }

    render() {
        let { name, label, rowspan, colspan, labelcolspan, validatonList, isMultiSelect, disabled, validationErrorMessage, placeholder, listoption } = this.props;
        let formRowClassName = "form-row";
        if (rowspan != null) {
            formRowClassName = "form-row col-md-" + rowspan;
        }

        let formGroupClassName = "form-group col-md-4";
        if (colspan != null) {
            formGroupClassName = "form-group col-md-" + colspan;
        }
        let labelDivClassName = "form-group col-md-2";
        if (labelcolspan != null) {
            labelDivClassName = "form-group col-md-" + labelcolspan;
        }
        let star;
        if (validatonList != undefined && validatonList.includes("Comborequired") == true) {
            star = '*'
        }
        let className = "react-select";
        if (validationErrorMessage != undefined && validationErrorMessage != "") {
            className += " is-invalid";
        }
        const selectedOption = this.state.SelectedOption;
        const listOption = this.state.Listoption;
        return (
            <div className={formRowClassName} >
                <div className={labelDivClassName}>
                    <label className="col-form-label 6">
                        {label}<span className="text-danger"> {star}</span>
                    </label>
                </div>
                <div className={formGroupClassName}>
                    <Select
                        value={selectedOption}
                        name={name}
                        ref={this.props.inputRef}
                        onChange={this.handleValueChange}
                        options={listOption}
                        isDisabled={disabled}
                        isMulti={isMultiSelect}
                        isSearchable={true}
                        placeholder={placeholder}
                        className={className}
                    />
                    <div className="invalid-feedback"><ul className="list-unstyled"><li>{validationErrorMessage}</li></ul></div>
                </div>
            </div>
        );
    }
}
export const FormControlComboBoxUser = connect(mapStateToProps, mapDispatchToProps)(FormControlComboBoxUserCom);
class FormControlDatetimeCom extends Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
    }
    handleValueChange(name, moment) {
        let noGetTime = false;
        if (!this.props.IsGetTime) {
            noGetTime = false
        }
        else {
            noGetTime = true
        }
        const momentNew = ExportStringDate(moment, noGetTime)
        if (this.props.onValueChange != null)
            this.props.onValueChange(this.props.name, momentNew);
    }
    componentDidMount() {

    }
    disabledDate(current) {
        // Can not select days before today and today
        return current && current <= moment().startOf('day');
    }

    render() {
        let { name, label, timeFormat, dateFormat, colspan, value, validationErrorMessage } = this.props;

        let formRowClassName = "form-row";
        if (this.props.rowspan != null) {
            formRowClassName = "form-row col-md-" + this.props.rowspan;
        }
        let className = "ant-picker-custom";
        if (this.props.CSSClassName != null)
            className = this.props.CSSClassName;
        let formGroupClassName = "form-group col-md-4";
        if (this.props.colspan != null) {
            formGroupClassName = "form-group col-md-" + this.props.colspan + " " + this.props.className;
        }
        let labelDivClassName = "form-group col-md-2";
        if (this.props.labelcolspan != null) {
            labelDivClassName = "form-group col-md-" + this.props.labelcolspan;
        }
        let star;
        if (this.props.validatonList != undefined && this.props.validatonList.includes("required") == true) {
            star = '*'
        }
        if (validationErrorMessage != "" && validationErrorMessage != undefined) {
            className += " is-invalid";
        }
        ;

        let isShowTime;
        if (this.props.showTime == undefined || this.props.showTime == true) {
            isShowTime = true
        }
        else {
            isShowTime = false
        }
        return (
            <div className={formRowClassName} >
                <div className={labelDivClassName}>
                    <label className="col-form-label 6">
                        {this.props.label}<span className="text-danger"> {star}</span>
                    </label>
                </div>

                <div className={formGroupClassName}>
                    <DatePicker
                        disabledDate={this.props.ISdisabledDate == true ? this.disabledDate : ''}
                        showTime={isShowTime}
                        // value={(value != '' && value != null) ? moment(value, dateFormat) : ''}
                        defaultValue={(value != '' && value != null) ? moment(value, 'YYYY-MM-DD HH:mm') : ''}
                        format={dateFormat}
                        className={className}
                        dropdownClassName="tree-select-custom"
                        ref={this.props.inputRef}
                        placeholder={this.props.placeholder}
                        onChange={this.handleValueChange}
                        disabled={this.props.disabled}
                    />
                    <div className="invalid-feedback">
                        <ul className="list-unstyled">
                            <li>{validationErrorMessage}</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
const FormControlDatetime = connect(null, null)(FormControlDatetimeCom);



class FormControlDatetimeNewCom extends Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
    }
    handleValueChange(name, moment) {

        const momentNew = ExportStringToDate(moment)
        console.log("moment", moment, momentNew)
        if (this.props.onValueChange != null)
            this.props.onValueChange(this.props.name, momentNew);
    }



    render() {
        let { name, label, timeFormat, dateFormat, colspan, value, validationErrorMessage } = this.props;
        let formRowClassName = "form-row";
        if (this.props.rowspan != null) {
            formRowClassName = "form-row col-md-" + this.props.rowspan;
        }
        let className = "ant-picker-custom";
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
        if (validationErrorMessage != "" && validationErrorMessage != undefined) {
            className += " is-invalid";
        }
        ;

        let isShowTime;
        if (this.props.showTime == undefined || this.props.showTime == true) {
            isShowTime = true
        }
        else {
            isShowTime = false
        }
        return (
            <div className={formRowClassName} >
                <div className={labelDivClassName}>
                    <label className="col-form-label 6">
                        {this.props.label}<span className="text-danger"> {star}</span>
                    </label>
                </div>

                <div className={formGroupClassName}>
                    <DatePicker
                        showTime={isShowTime}
                        //value={(value != '' && value != null) ?  moment(value, dateFormat): ''}// 'YYYY-MM-DD'
                        defaultValue={(value != '' && value != null) ? moment(value, 'YYYY-MM-DD') : ''}
                        format={dateFormat}
                        className={className}
                        dropdownClassName="tree-select-custom"
                        ref={this.props.inputRef}
                        placeholder={this.props.placeholder}
                        onChange={this.handleValueChange}
                        disabled={this.props.disabled}
                    />
                    <div className="invalid-feedback">
                        <ul className="list-unstyled">
                            <li>{validationErrorMessage}</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
const FormControlDatetimeNew = connect(null, null)(FormControlDatetimeNewCom);

class FormControlHourCom extends Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.state = { value: "" }
    }

    handleValueChange(name, moment) {
        if (this.props.onValueChange != null)
            this.props.onValueChange(this.props.name, moment);
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.value) !== JSON.stringify(nextProps.value)) {
            this.setState({ value: nextProps.value });
        }
    }


    render() {
        let { name, label, formatHour, dateFormat, colspan, value, validationErrorMessage } = this.props;
        let formRowClassName = "form-row";
        if (this.props.rowspan != null) {
            formRowClassName = "form-row col-md-" + this.props.rowspan;
        }
        let className = "timepickercus";
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
        if (validationErrorMessage != "" && validationErrorMessage != undefined) {
            className += " is-invalid";
        }
        ;

        let isShowTime;
        if (this.props.showTime == undefined || this.props.showTime == true) {
            isShowTime = true
        }
        else {
            isShowTime = false
        }
        return (
            <div className={formRowClassName} >
                <div className={labelDivClassName}>
                    <label className="col-form-label 6">
                        {this.props.label}<span className="text-danger"> {star}</span>
                    </label>
                </div>

                <div className={formGroupClassName}>
                    <TimePicker
                        value={(this.state.value != '' && this.state.value != null) ? moment(this.state.value, formatHour) : ''}
                        format={formatHour}
                        className={className}
                        ref={this.props.inputRef}
                        placeholder={this.props.placeholder}
                        onChange={this.handleValueChange}
                        disabled={this.props.disabled}
                    />
                    <div className="invalid-feedback">
                        <ul className="list-unstyled">
                            <li>{validationErrorMessage}</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
const FormControlHour = connect(null, null)(FormControlHourCom);

class TextBoxCurrency extends React.Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handKeyDown = this.handKeyDown.bind(this);
    }
    static defaultProps = {
        controltype: 'InputControl'
    }

    componentDidMount() {


    }

    handleValueChange(e) {
        if (this.props.onValueChange != null) {
            this.props.onValueChange(e.target.name, e.target.value, "", e, undefined);
        }

    }

    handKeyDown(e) {
        if (e.key == 'Enter') {
            if (this.props.onhandKeyDown != null) {
                this.props.onhandKeyDown(e.target.name, e.target.value, '', e, this.props.validatonList);
            }
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
        // console.log('this.props.label', this.props.label)
        if (this.props.validationErrorMessage != "" && this.props.validationErrorMessage != undefined) {
            className += " is-invalid";

            return (
                <div className={formRowClassName} >
                    {this.props.label.length > 0 ?
                        <div className={labelDivClassName}>
                            <label className="col-form-label 2">
                                {this.props.label}<span className="text-danger"> {star}</span>
                            </label>
                        </div>
                        : ""
                    }

                    <div className={formGroupClassName}>
                        <input
                            type="text"
                            name={this.props.name}
                            onChange={this.handleValueChange}
                            onBlur={this.handKeyDown}
                            value={formatMoney(this.props.value, 0)}
                            key={this.props.name}
                            className={className}
                            ref={this.props.inputRef}
                            placeholder={this.props.placeholder}
                            disabled={this.props.readOnly}
                            maxLength={this.props.maxSize}
                        />
                        <div className="invalid-feedback"><ul className="list-unstyled"><li>{this.props.validationErrorMessage}</li></ul></div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className={formRowClassName} >
                    {this.props.label.length > 0 ?
                        <div className={labelDivClassName}>
                            <label className="col-form-label 2">
                                {this.props.label}<span className="text-danger"> {star}</span>
                            </label>
                        </div>
                        : ""
                    }
                    <div className={formGroupClassName}>
                        <input
                            type="text"
                            name={this.props.name}
                            onChange={this.handleValueChange}
                            onKeyPress={(event) => this.handKeyDown(event)}
                            value={formatMoney(this.props.value, 0)}
                            key={this.props.name}
                            className={className}
                            autoFocus={false}
                            ref={this.props.inputRef}
                            placeholder={this.props.placeholder}
                            disabled={this.props.readOnly}
                            maxLength={this.props.maxSize}
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
        let formRowClassName = "form-row ";
        if (this.props.classNameCustom != null || this.props.classNameCustom != undefined) {
            formRowClassName += this.props.classNameCustom;
        }
        return (

            <div className={formRowClassName} >
                <div className={labelDivClassName}>
                    <label className="col-form-label 4">
                        {this.props.label}<span className="text-danger"> {star}</span>
                    </label>
                </div>
                <div className={formGroupClassName}>
                    <textarea
                        name={this.props.name}
                        onChange={this.handleValueChange}
                        value={this.props.value}
                        className={className}
                        placeholder={this.props.placeholder}
                        readOnly={this.props.readonly}
                        rows="5"
                        disabled={this.props.disabled}
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
        console.log('â', this.props)
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
        let classNameCustom = "checkbox ";
        if (this.props.classNameCustom != undefined || this.props.classNameCustom != '') {
            classNameCustom += this.props.classNameCustom;
        }
        return (

            <div className={formRowClassName} >
                <div className={labelDivClassName}>
                    <label className="col-form-label 5">
                        {this.props.label}<span className="text-danger"> {star}</span>
                        

                    </label>
                </div>
                <div className={formGroupClassName}>

                    <div className={classNameCustom}>
                        <label>
                            <input
                                className={this.props.CSSClassName}
                                name={this.props.name}
                                type="checkbox"
                                checked={this.props.value}
                                onChange={this.handleValueChange}
                                readOnly={this.props.readonly}
                                className={this.props.CSSClassName}
                                disabled={this.props.disabled}
                            />
                            <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                            
                        </label>
                        {this.props.titleSmall != null ? <span className="txtSmall">{this.props.titleSmall}</span> : ""}
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

        if (this.props.validationErrorMessage != "" && this.props.validationErrorMessage != undefined) {
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
                            ref={this.props.inputRef}
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
                                <option key={optionItem.value} value={optionItem.value}>{(optionItem.value == -1 ? "" : optionItem.value + " - ") + optionItem.label}</option>
                            )}
                        </select>
                    </div>
                </div>
            );
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
//End hoc.lenho test


class ElementDatetimeCom extends Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
    }
    handleValueChange(name, moment) {
        //e.preventDefault();
        if (this.props.onValueChange != null)
            this.props.onValueChange(name, moment._d);
    }
    componentDidMount() {

    }

    render() {
        let { name, label, timeFormat, dateFormat, colspan, value, validationErrorMessage } = this.props;

        let formRowClassName = "form-row";
        if (this.props.rowspan != null) {
            formRowClassName = "form-row col-md-" + this.props.rowspan;
        }
        let className = "";
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
        if (validationErrorMessage != "" && validationErrorMessage != undefined) {
            className += " is-invalid";
        }
        return (
            <div className={formRowClassName} >
                <div className={labelDivClassName}>
                    <label className="col-form-label 6">
                        {label}<span className="text-danger"> {star}</span>
                    </label>
                </div>
                <div ref={this.inputRef} className={formGroupClassName}>
                    <Datetime
                        className={className}
                        name={name}
                        onChange={(moment) => this.handleValueChange(name, moment)}
                        value={value != null ? value : ""}
                        timeFormat={timeFormat}
                        dateFormat={dateFormat} >
                    </Datetime>
                    <div className="invalid-feedback">
                        <ul className="list-unstyled">
                            <li>{validationErrorMessage}</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
const ElementDatetime = connect(null, null)(ElementDatetimeCom);

class ComboBoxPartnerCom extends Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.state = { Listoption: [], SelectedOption: [] }
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
        if (this.props.isautoloaditemfromcache) {
            const cacheKeyID = this.props.loaditemcachekeyid;
            const valueMember = this.props.valuemember;
            const nameMember = this.props.nameMember;
            const isCategory = this.props.isCategory;
            this.props.callGetCache(cacheKeyID).then((result) => {
                listOption = [{ value: -1, label: "--Vui lòng chọn--" }];
                if (!result.IsError && result.ResultObject.CacheData != null) {
                    result.ResultObject.CacheData.filter(a => a.PartnerTypeID == 2).map((cacheItem) => {
                        listOption.push({ value: cacheItem[valueMember], label: cacheItem[valueMember] + " - " + cacheItem[nameMember], name: cacheItem[nameMember] });
                    }
                    );
                    let aa = this.bindcombox(listOption);
                    this.setState({ Listoption: listOption, SelectedOption: aa });
                }
                else {
                    this.setState({ Listoption: listOption });
                }
            });
        }
        else {
            this.setState({ Listoption: listOption });
        }
    }

    render() {
        let { name, label, icon, colspan, isMultiSelect, ValidatonErrorMessage, placeholder } = this.props;
        let formRowClassName = "form-row";
        if (this.props.rowspan != null) {
            formRowClassName = "form-row col-md-" + this.props.rowspan;
        }

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
        let className = "react-select";
        if (this.props.validationErrorMessage != undefined && this.props.validationErrorMessage != "") {
            className += " is-invalid";
        }
        const selectedOption = this.state.SelectedOption;
        if (this.props.validationErrorMessage != "") {
            return (
                <div className={formRowClassName} >
                    <div className={labelDivClassName}>
                        <label className="col-form-label 6">
                            {this.props.label}<span className="text-danger"> {star}</span>
                        </label>
                    </div>

                    <div className={formGroupClassName}>
                        <Select
                            value={selectedOption}
                            name={this.props.name}
                            ref={this.props.inputRef}
                            onChange={this.handleValueChange}
                            options={listOption}
                            isDisabled={this.props.disabled}
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
    }
}
export const ComboBoxPartner = connect(mapStateToProps, mapDispatchToProps)(ComboBoxPartnerCom);

class ComboBoxNewCom extends Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.state = { Listoption: [], SelectedOption: [] }
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
    }

    render() {
        let { name, label, icon, colspan, isMultiSelect, ValidatonErrorMessage, placeholder, listoption } = this.props;
        let formRowClassName = "form-row";
        if (this.props.rowspan != null) {
            formRowClassName = "form-row col-md-" + this.props.rowspan;
        }

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
        let className = "react-select";
        if (this.props.validationErrorMessage != undefined && this.props.validationErrorMessage != "") {
            className += " is-invalid";
        }
        const selectedOption = this.state.SelectedOption;
        if (this.props.validationErrorMessage != "") {
            return (
                <div className={formRowClassName} >
                    <div className={labelDivClassName}>
                        <label className="col-form-label 6">
                            {this.props.label}<span className="text-danger"> {star}</span>
                        </label>
                    </div>

                    <div className={formGroupClassName}>
                        <Select
                            value={selectedOption}
                            name={this.props.name}
                            ref={this.props.inputRef}
                            onChange={this.handleValueChange}
                            options={listoption}
                            isDisabled={this.props.disabled}
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
    }
}
export const ComboBoxNew = connect(mapStateToProps, mapDispatchToProps)(ComboBoxNewCom);

class ComboBoxSelectCom extends Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.state = { Listoption: [], SelectedOption: [] }
    }
    handleValueChange(selectedOption) {
        const comboValues = this.getComboValue(selectedOption);
        if (this.props.onValueChange != null) {
            this.props.onValueChange(this.props.name, comboValues, this.props.namelabel, selectedOption.name, this.props.filterrest);

        }

        if (this.props.onValueChangeCustom != null)
            this.props.onValueChangeCustom(this.props.name, comboValues);
    }

    bindcombox(value, listOption) {
        let values = value;
        let selectedOption = [];
        if (values == null || values === -1)
            return { value: -1, label: "--Vui lòng chọn--" };
        if (typeof values.toString() == "string")
            values = values.toString().split();
        for (let i = 0; i < values.length; i++) {
            for (let j = 0; j < listOption.length; j++) {
                if (values[i] == listOption[j].value) {
                    selectedOption.push({ value: listOption[j].value, label: listOption[j].label });
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
            if (this.props.isusercache == true) {
                this.props.callGetUserCache(cacheKeyID).then((result) => {
                    //console.log("this.props.isautoloaditemfromcach2: ", this.props.loaditemcachekeyid, this.state.Listoption, result);
                    listOption = [{ value: -1, label: "--Vui lòng chọn--" }];
                    if (!result.IsError && result.ResultObject.CacheData != null) {
                        result.ResultObject.CacheData.map((cacheItem) => {
                            listOption.push({ value: cacheItem[valueMember], label: cacheItem[valueMember] + " - " + cacheItem[nameMember], name: cacheItem[nameMember] });
                        }
                        );
                        this.setState({ Listoption: listOption });
                        const aa = this.bindcombox(this.props.value, listOption);
                        this.setState({ SelectedOption: aa });

                    }
                    else {
                        this.setState({ Listoption: listOption });

                    }
                    //  console.log("this.props.isautoloaditemfromcachess: ",this.props.loaditemcachekeyid, this.state.Listoption);
                });

            }
            else {
                this.props.callGetCache(cacheKeyID).then((result) => {
                    //console.log("this.props.isautoloaditemfromcach2: ", this.props.loaditemcachekeyid, this.state.Listoption, result);
                    listOption = [{ value: -1, label: "--Vui lòng chọn--" }];
                    if (!result.IsError && result.ResultObject.CacheData != null) {
                        result.ResultObject.CacheData.map((cacheItem) => {
                            listOption.push({ value: cacheItem[valueMember], label: cacheItem[valueMember] + " - " + cacheItem[nameMember], name: cacheItem[nameMember] });
                        }
                        );
                        this.setState({ Listoption: listOption });
                        const aa = this.bindcombox(this.props.value, listOption);
                        this.setState({ SelectedOption: aa });

                    }
                    else {
                        this.setState({ Listoption: listOption });

                    }
                    //  console.log("this.props.isautoloaditemfromcachess: ",this.props.loaditemcachekeyid, this.state.Listoption);
                });
            }
            //    console.log("this.props.isautoloaditemfromcache1: ",this.props.loaditemcachekeyid, this.state.Listoption);

        }
        else {
            //console.log("this.props.isautoloaditemfromcache1: ",this.props.loaditemcachekeyid, this.state.Listoption);
            this.setState({ Listoption: listOption });
            const aa = this.bindcombox(this.props.value, listOption);
            this.setState({ SelectedOption: aa });
        }
    }
    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.value) !== JSON.stringify(nextProps.value)) {
            const aa = this.bindcombox(nextProps.value, this.state.Listoption);
            this.setState({ SelectedOption: aa });
        }
    }

    render() {
        let { name, label, icon, colspan, isMultiSelect, ValidatonErrorMessage, placeholder, listoption } = this.props;
        let formRowClassName = "form-row";
        if (this.props.rowspan != null) {
            formRowClassName = "form-row col-md-" + this.props.rowspan;
        }

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
        let className = "react-select";
        if (this.props.validationErrorMessage != undefined && this.props.validationErrorMessage != "") {
            className += " is-invalid";
        }
        const selectedOption = this.state.SelectedOption;
        const listOption = this.state.Listoption;
        if (this.props.validationErrorMessage != "") {
            return (
                <div className={formRowClassName} >
                    <div className={labelDivClassName}>
                        <label className="col-form-label 6">
                            {this.props.label}<span className="text-danger"> {star}</span>
                        </label>
                    </div>

                    <div className={formGroupClassName}>
                        <Select
                            value={selectedOption}
                            name={this.props.name}
                            ref={this.props.inputRef}
                            onChange={this.handleValueChange}
                            options={listOption}
                            isDisabled={this.props.disabled}
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
                        <label className="col-form-label 6">
                            {this.props.label}<span className="text-danger"> {star}</span>
                        </label>
                    </div>

                    <div className={formGroupClassName}>
                        <Select
                            value={selectedOption}
                            name={this.props.name}
                            ref={this.props.inputRef}
                            onChange={this.handleValueChange}
                            options={listOption}
                            isDisabled={this.props.disabled}
                            isMulti={isMultiSelect}
                            isSearchable={true}
                            placeholder={placeholder}
                            className={className}
                        />
                    </div>
                </div>
            );
        }

    }
}
export const ComboBoxSelect = connect(mapStateToProps, mapDispatchToProps)(ComboBoxSelectCom);


export default {
    FormControlTextBox, TextBox, TextArea, CheckBox, modal, TextBoxCurrency, TextBoxNew,
    FormControlComboBox,
    FormControlComboBoxUser,
    FormControlDatetime,
    FormControlDatetimeNew,
    ComboBox,
    ComboBoxNew,
    MultiSelectComboBox,
    ElementDatetime,
    ComboBoxPartner,
    ComboboxQTQHPX,
    ComboBoxSelect,
    MultiUserComboBox,
    FormControlHour
};

