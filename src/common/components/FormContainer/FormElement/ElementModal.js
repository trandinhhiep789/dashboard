import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { callGetCache } from "../../../../actions/cacheAction";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { InputNumber, DatePicker } from "antd";
import { ExportStringToDate, ExportStringDate } from "../../../../common/library/ultils";
import moment from 'moment';
import "antd/dist/antd.css";

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
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
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

class ElementModalText extends React.Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
    }
    handleValueChange(e) {
        if (this.props.onValueChange != null)
            this.props.onValueChange(e.target.name, e.target.value);
    }


    render() {
        let classNamecolmd = "col-md-6";
        if (this.props.Colmd != null)
            classNamecolmd = "col-md-" + this.props.Colmd;

        let className = "form-control form-control-sm";
        if (this.props.CSSClassName != null)
            className = this.props.CSSClassName;

        if (this.props.Colmd == 12) {
            className = className + " customcontrol";
        }
        if (this.props.CSSClassName != null)
            className = this.props.CSSClassName;
        let formGroupClassName = "form-group col-md-8";
        if (this.props.colspan != null) {
            formGroupClassName = "form-group col-md-" + this.props.colspan;
        }
        let labelDivClassName = "form-group col-md-4";
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
        if (this.props.validationErrorMessage != "" && this.props.validationErrorMessage != undefined) {
            className += " is-invalid";
        }
        return (
            <div className={classNamecolmd}>
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
                            ref={this.props.inputRef}
                            placeholder={this.props.placeholder}
                            disabled={this.props.Disabled}
                            maxLength={this.props.maxsize}
                        />
                        <div className="invalid-feedback"><ul className="list-unstyled"><li>{this.props.validationErrorMessage}</li></ul></div>
                    </div>
                </div>
            </div>
        );
    }
}

class ElementModalNumber extends React.Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
    }
    handleValueChange(evalue) {
        if (this.props.onValueChange != null)
            this.props.onValueChange(this.props.name, evalue);
    }

    render() {
        let classNamecolmd = "col-md-6";
        if (this.props.Colmd != null)
            classNamecolmd = "col-md-" + this.props.Colmd;
        let className = "form-control form-control-sm";
        if (this.props.CSSClassName != null)
            className = this.props.CSSClassName;
        if (this.props.Colmd == 12) {
            className = className + " customcontrol";
        }
        if (this.props.CSSClassName != null)
            className = this.props.CSSClassName;
        let formGroupClassName = "form-group col-md-8";
        if (this.props.colspan != null) {
            formGroupClassName = "form-group col-md-" + this.props.colspan;
        }
        let labelDivClassName = "form-group col-md-4";
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
        if (this.props.validationErrorMessage != "" && this.props.validationErrorMessage != undefined) {
            className += " is-invalid";
        }
        return (
            <div className={classNamecolmd}>
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
                        <InputNumber
                            name={this.props.name}
                            min={this.props.min}
                            max={this.props.max}
                            value={this.props.value}
                            onChange={this.handleValueChange}
                            disabled={this.props.Disabled}
                            ref={this.props.inputRef}
                            className={className}
                        />
                        <div className="invalid-feedback"><ul className="list-unstyled"><li>{this.props.validationErrorMessage}</li></ul></div>
                    </div>
                </div>
            </div>
        );
    }
}

class ElementModalComboBoxCom extends Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.state = { Listoption: [], SelectedOption: [] }
    }
    handleValueChange(selectedOption) {
        const comboValues = this.getComboValue(selectedOption);
        if (this.props.onValueChange != null)
            this.props.onValueChange(this.props.name, comboValues, this.props.namelabel, selectedOption != null ? selectedOption.label : "", this.props.filterrest, this.props.filterrestValue);
    }

    bindcombox(value, listOption) {
        let { isMultiSelect } = this.props;
        let values = value;
        let selectedOption = [];


        if (values == null || values === -1) {
            if (isMultiSelect) {
                return selectedOption;
            }
            else {
                return { value: -1, label: "--Vui lòng chọn--" };
            }
        }
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
        let { isautoloaditemfromcache, loaditemcachekeyid, valuemember, nameMember, filterValue, filterobj, isMultiSelect } = this.props;
        if (isautoloaditemfromcache) {
            this.props.callGetCache(loaditemcachekeyid).then((result) => {

                if (!isMultiSelect) {
                    listOption = [{ value: -1, label: "--Vui lòng chọn--" }];
                }
                else {
                    listOption = []
                }

                if (!result.IsError && result.ResultObject.CacheData != null) {
                    if (typeof filterobj != undefined) {
                        result.ResultObject.CacheData.filter(n => n[filterobj] == filterValue).map((cacheItem) => {
                            listOption.push({ value: cacheItem[valuemember], label: cacheItem[nameMember] });
                        }
                        );
                    }
                    else {
                        result.ResultObject.CacheData.map((cacheItem) => {
                            listOption.push({ value: cacheItem[valueMember], label: cacheItem[nameMember] });
                        }
                        );
                    }
                    //console.log("componentDidMount",loaditemcachekeyid,result.ResultObject.CacheData)
                    this.setState({ Listoption: listOption, Data: result.ResultObject.CacheData });
                    const strSelectedOption = this.bindcombox(this.props.value, listOption);
                    this.setState({ SelectedOption: strSelectedOption });
                }
                else {
                    this.setState({ Listoption: listOption });
                }
            });
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
            if (typeof filterobj != undefined) {
                let listoptionnew = [{ value: -1, label: "--Vui lòng chọn--" }];
                if (isMultiSelect)
                    listoptionnew = [];

                if (typeof nextProps.filterValue != "undefined") {
                    this.state.Data.filter(n => n[filterobj] == nextProps.filterValue).map((cacheItem) => {
                        listoptionnew.push({ value: cacheItem[valuemember], label: cacheItem[nameMember] });
                    }
                    );
                }
                this.setState({ Listoption: listoptionnew });
            }

        }

        if (JSON.stringify(this.props.value) !== JSON.stringify(nextProps.value)) {
            const aa = this.bindcombox(nextProps.value, this.state.Listoption);
            this.setState({ SelectedOption: aa });
        }
    }

    render() {
        let { name, label, rowspan, colspan, labelcolspan, validatonList, isMultiSelect, disabled, validationErrorMessage, placeholder, listoption } = this.props;
        let { SelectedOption } = this.state;
        let classNamecolmd = "col-md-6";
        if (this.props.Colmd != null)
            classNamecolmd = "col-md-" + this.props.Colmd;

        let formRowClassName = "form-row";
        if (rowspan != null) {
            formRowClassName = "form-row col-md-" + rowspan;
        }

        let formGroupClassName = "form-group col-md-8";
        if (colspan != null) {
            formGroupClassName = "form-group col-md-" + colspan;
        }
        let labelDivClassName = "form-group col-md-4";
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

        const listOption = this.state.Listoption;
        return (
            <div className={classNamecolmd}>
                <div className={formRowClassName} >
                    <div className={labelDivClassName}>
                        <label className="col-form-label 6">
                            {label}<span className="text-danger"> {star}</span>
                        </label>
                    </div>
                    <div className={formGroupClassName}>
                        <Select
                            value={SelectedOption}
                            name={name}
                            ref={this.props.inputRef}
                            onChange={this.handleValueChange}
                            options={listOption}
                            isDisabled={this.props.Disabled}
                            isMulti={isMultiSelect}
                            isSearchable={true}
                            placeholder={placeholder}
                            className={className}
                        />
                        <div className="invalid-feedback"><ul className="list-unstyled"><li>{validationErrorMessage}</li></ul></div>
                    </div>
                </div>
            </div>

        );
    }
}
export const ElementModalComboBox = connect(mapStateToProps, mapDispatchToProps)(ElementModalComboBoxCom);

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
        let classNamecolmd = "col-md-6";
        if (this.props.Colmd != null)
            classNamecolmd = "col-md-" + this.props.Colmd;
        let formRowClassName = "form-row";
        if (this.props.rowspan != null) {
            formRowClassName = "form-row col-md-" + this.props.rowspan;
        }
        let className = "form-control form-control-sm";
        if (this.props.CSSClassName != null)
            className = this.props.CSSClassName;
        let formGroupClassName = "form-group col-md-8";
        if (this.props.colspan != null) {
            formGroupClassName = "form-group col-md-" + this.props.colspan;
        }
        let labelDivClassName = "form-group col-md-4";
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
            <div className={classNamecolmd}>
                <div className={formRowClassName} >
                    <div className={labelDivClassName}>
                        <label className="col-form-label 5">
                            {this.props.label}<span className="text-danger"> {star}</span>
                        </label>
                    </div>
                    <div className={formGroupClassName}>

                        <div className={classNameCustom}>
                            <label>
                                <input className={this.props.CSSClassName} name={this.props.name} type="checkbox"
                                    checked={this.props.value} onChange={this.handleValueChange} disabled={this.props.Disabled}
                                    className={this.props.CSSClassName}
                                />
                                <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        );
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
        let classNamecolmd = "col-md-6";
        if (this.props.Colmd != null)
            classNamecolmd = "col-md-" + this.props.Colmd;

        let className = "form-control form-control-sm";
        if (this.props.CSSClassName != null)
            className = this.props.CSSClassName;
        let formGroupClassName = "form-group col-md-8";
        if (this.props.colspan != null) {
            formGroupClassName = "form-group col-md-" + this.props.colspan;
        }
        let labelDivClassName = "form-group col-md-4";
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
            <div className={classNamecolmd}>
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
                            readOnly={this.props.disabled == true ? true : this.props.readonly}
                            rows="5"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

class ProductComboBoxCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleValueonKeyDown = this.handleValueonKeyDown.bind(this);
        this.state = { ListOption: [{ value: -1, label: "--vui lòng chọn--" }], SelectedOption: [] }
    }

    componentDidMount() {
    }

    callSearchData(KeyWord, isFirstLoad) {
        let listMLObject =
        {
            "QueryParamList": [
                {
                    "QueryKey": "",
                    "QueryValue": "",
                    "QueryType": 18,
                    "IsNotQuery": false,
                    "SubQueryParamList": [
                        {
                            "QueryKey": "pRODUCTID",
                            "QueryValue": KeyWord,
                            "QueryType": 1,
                            "IsNotQuery": false
                        },
                        {
                            "QueryKey": "pRODUCTNAME",
                            "QueryValue": KeyWord,
                            "QueryType": 2,
                            "IsNotQuery": false
                        },
                        {
                            "QueryKey": "pRODUCTSHORTNAME",
                            "QueryValue": KeyWord,
                            "QueryType": 2,
                            "IsNotQuery": false
                        }
                    ]
                }
            ],
            "Top": 1000,
            "IndexName": "product",
            "TypeName": "product",
            "IsCompressResultData": false
        }
        this.props.callFetchAPI("ERPAPI", 'api/ProductSearch/Search', listMLObject).then(apiResult => {
            let listOptionNew = [{ value: -1, label: "--vui lòng chọn--" }];
            for (let i = 0; i < apiResult.ResultObject.length; i++) {
                listOptionNew.push({ value: apiResult.ResultObject[i].ProductID, label: apiResult.ResultObject[i].ProductID + "-" + apiResult.ResultObject[i].ProductName, name: apiResult.ResultObject[i].ProductName });
            }
            this.setState({
                ListOption: listOptionNew,
                SelectedOption: isFirstLoad ? listOptionNew : []
            });
            return listOptionNew;
        });
    }

    getComboValue(selectedOption) {
        let values = [];
        if (selectedOption == null)
            return values;
        for (let i = 0; i < selectedOption.length; i++) {
            values.push({ ProductID: selectedOption[i].value, ProductName: selectedOption[i].label });
        }
        return values;
    }

    handleValueChange(selectedOption) {
        if (this.props.onValueChange)
            this.props.onValueChange(this.props.name, selectedOption.value, this.props.namelabel, selectedOption.value != -1 ? selectedOption.name : "");
    }

    handleValueonKeyDown(e) {
        let value = e.target.value;
        if (value.length > 4 && e.keyCode != 40 && e.keyCode != 38) {
            this.callSearchData(value);
        }
    }
    render() {
        const listOption = this.state.ListOption;
        const selectedOption = this.props.value;

        let classNamecolmd = "col-md-6";
        if (this.props.Colmd != null)
            classNamecolmd = "col-md-" + this.props.Colmd;

        let formRowClassName = "form-row";
        if (this.props.rowspan)
            formRowClassName = "form-row col-md-" + this.props.rowspan;
        let className = "form-control form-control-sm";
        if (this.props.CSSClassName != null)
            className = this.props.CSSClassName;
        let formGroupClassName = "form-group col-md-8";
        if (this.props.colspan != null) {
            formGroupClassName = "form-group col-md-" + this.props.colspan;
        }
        let labelDivClassName = "form-group col-md-4";
        if (this.props.labelcolspan != null) {
            labelDivClassName = "form-group col-md-" + this.props.labelcolspan;
        }

        let star;
        if (this.props.validatonList != undefined && this.props.validatonList.includes("Comborequired") == true) {
            star = '*'
        }
        let classNameselect = "react-select";
        if (this.props.validationErrorMessage != undefined && this.props.validationErrorMessage != "") {
            classNameselect += " is-invalid";
        }
        return (
            <div className={classNamecolmd}>
                <div className={formRowClassName} >

                    <div className={labelDivClassName}>
                        <label className="col-form-label 6">
                            {this.props.label}<span className="text-danger"> {star}</span>
                        </label>
                    </div>

                    <div className={formGroupClassName}>
                        <Select
                            name={this.props.name}
                            value={selectedOption}
                            onChange={this.handleValueChange}
                            onKeyDown={this.handleValueonKeyDown}
                            options={listOption}
                            isMulti={false}
                            isDisabled={this.props.disabled == true ? true : this.props.readonly}
                            isSearchable={true}
                            placeholder={"Nhập mã sản phẩm"}
                            className={classNameselect}
                        />
                        <div className="invalid-feedback"><ul className="list-unstyled"><li>{this.props.validationErrorMessage}</li></ul></div>
                    </div>
                </div>
            </div>
        );
    }
}
const ProductComboBox = connect(mapStateToProps, mapDispatchToProps)(ProductComboBoxCom);

class ElementModalDatetimeCom extends Component {
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
        let classNamecolmd = "col-md-6";
        if (this.props.Colmd != null)
            classNamecolmd = "col-md-" + this.props.Colmd;

        let className = "form-control form-control-sm";
        if (this.props.CSSClassName != null)
            className = this.props.CSSClassName;

        if (this.props.Colmd == 12) {
            className = className + " customcontrol";
        }
        if (this.props.CSSClassName != null)
            className = this.props.CSSClassName;
        let formGroupClassName = "form-group col-md-8";
        if (this.props.colspan != null) {
            formGroupClassName = "form-group col-md-" + this.props.colspan;
        }
        let labelDivClassName = "form-group col-md-4";
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
        if (this.props.validationErrorMessage != "" && this.props.validationErrorMessage != undefined) {
            className += " is-invalid";
        }

        let isShowTime;
        if (this.props.showTime == undefined || this.props.showTime == true) {
            isShowTime = true
        }
        else {
            isShowTime = false
        }
        return (
            <div className={classNamecolmd}>
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
                        <div className="invalid-feedback"><ul className="list-unstyled"><li>{this.props.validationErrorMessage}</li></ul></div>
                    </div>
                </div>
            </div>
        );
    }
}
const ElementModalDatetime = connect(null, null)(ElementModalDatetimeCom);


class ElementModalComboBoxStoreCom extends Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.state = { Listoption: [], SelectedOption: [] }
    }
    handleValueChange(selectedOption) {
        const comboValues = this.getComboValue(selectedOption);
        if (this.props.onValueChange != null)
            this.props.onValueChange(this.props.name, comboValues, this.props.namelabel, selectedOption != null ? selectedOption.label : "", this.props.filterrest, this.props.filterrestValue);
    }

    bindcombox(value, listOption) {
        let values = value;
        let selectedOption = [];
        if (values == null || values === -1)
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
        let { isautoloaditemfromcache, loaditemcachekeyid, valuemember, nameMember, filterValue, filterobj, othername, Othervalue } = this.props;
        if (isautoloaditemfromcache) {
            this.props.callGetCache(loaditemcachekeyid).then((result) => {
                listOption = [{ value: -1, label: "--Vui lòng chọn--" }];
                if (!result.IsError && result.ResultObject.CacheData != null) {
                    if (typeof filterobj != "undefined" && othername != "undefined") {
                        result.ResultObject.CacheData.filter(n => n[filterobj] == filterValue).map((cacheItem) => {
                            if (cacheItem[valuemember] != Othervalue) {
                                listOption.push({ value: cacheItem[valuemember], label: cacheItem[valuemember] + "-" + cacheItem[nameMember] });
                            }

                        }
                        );
                    }
                    else if (typeof filterobj != "undefined") {
                        result.ResultObject.CacheData.filter(n => n[filterobj] == filterValue).map((cacheItem) => {
                            listOption.push({ value: cacheItem[valuemember], label: cacheItem[valuemember] + "-" + cacheItem[nameMember] });
                        }
                        );

                    } else {
                        result.ResultObject.CacheData.map((cacheItem) => {
                            listOption.push({ value: cacheItem[valueMember], label: cacheItem[valuemember] + "-" + cacheItem[nameMember] });
                        }
                        );
                    }
                    //console.log("componentDidMount",loaditemcachekeyid,result.ResultObject.CacheData)
                    this.setState({ Listoption: listOption, Data: result.ResultObject.CacheData });
                    const strSelectedOption = this.bindcombox(this.props.value, listOption);
                    this.setState({ SelectedOption: strSelectedOption });
                }
                else {
                    this.setState({ Listoption: listOption });
                }
            });
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
            let { filterobj, valuemember, nameMember, othername, Othervalue } = this.props;
            if (typeof filterobj != "undefined" && othername != "undefined") {
                let listoptionnew = [{ value: -1, label: "--Vui lòng chọn--" }];
                if (typeof nextProps.filterValue != "undefined") {
                    this.state.Data.filter(n => n[filterobj] == nextProps.filterValue).map((cacheItem) => {
                        if (cacheItem[valuemember] != Othervalue) {
                            listoptionnew.push({ value: cacheItem[valuemember], label: cacheItem[valuemember] + "-" + cacheItem[nameMember] });
                        }
                    }
                    );
                }
                this.setState({ Listoption: listoptionnew });
            }
            else if (typeof filterobj != "undefined") {
                let listoptionnew = [{ value: -1, label: "--Vui lòng chọn--" }];
                if (typeof nextProps.filterValue != "undefined") {
                    this.state.Data.filter(n => n[filterobj] == nextProps.filterValue).map((cacheItem) => {
                        listoptionnew.push({ value: cacheItem[valuemember], label: cacheItem[valuemember] + "-" + cacheItem[nameMember] });
                    }
                    );
                }
                this.setState({ Listoption: listoptionnew });
            }

        }

        if (JSON.stringify(this.props.value) !== JSON.stringify(nextProps.value)) {
            const aa = this.bindcombox(nextProps.value, this.state.Listoption);
            this.setState({ SelectedOption: aa });
        }
    }


    render() {
        let { name, label, rowspan, colspan, labelcolspan, validatonList, isMultiSelect, disabled, validationErrorMessage, placeholder, listoption } = this.props;

        let classNamecolmd = "col-md-6";
        if (this.props.Colmd != null)
            classNamecolmd = "col-md-" + this.props.Colmd;

        let formRowClassName = "form-row";
        if (rowspan != null) {
            formRowClassName = "form-row col-md-" + rowspan;
        }

        let formGroupClassName = "form-group col-md-8";
        if (colspan != null) {
            formGroupClassName = "form-group col-md-" + colspan;
        }
        let labelDivClassName = "form-group col-md-4";
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
            <div className={classNamecolmd}>
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
                            isDisabled={this.props.Disabled}
                            isMulti={isMultiSelect}
                            isSearchable={true}
                            placeholder={placeholder}
                            className={className}
                        />
                        <div className="invalid-feedback"><ul className="list-unstyled"><li>{validationErrorMessage}</li></ul></div>
                    </div>
                </div>
            </div>

        );
    }
}
export const ElementModalComboBoxStore = connect(mapStateToProps, mapDispatchToProps)(ElementModalComboBoxStoreCom);

export default { ElementModalText, ElementModalComboBox, CheckBox, TextArea, ElementModalNumber, ProductComboBox, ElementModalDatetime, ElementModalComboBoxStore };

