import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Datetime from 'react-datetime';
import Select from 'react-select';
import { DatePicker, Menu, Dropdown, Button } from 'antd';
import vi_VN from 'antd/es/date-picker/locale/vi_VN';
import moment from 'moment';

import { callGetCache, callGetUserCache } from "../../../../actions/cacheAction";
import { ExportStringToMonth } from "../../../../common/library/ultils";
import MultiSelectUserComboBox from "../FormControl/MultiSelectComboBox/MultiSelectUserComboBox";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";


import { TreeSelect } from 'antd';
const { SHOW_PARENT } = TreeSelect;

class ElementTextCom extends Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
    }
    handleValueChange(e) {
        e.preventDefault();
        if (this.props.onValueChange != null)
            this.props.onValueChange(e.target.name, e.target.value);
    }
    render() {
        let { name, label, placeholder, colspan, value, readonly, ValidatonErrorMessage, classNameCol, subLabel } = this.props;
        let className = "form-control form-control-sm";
        let colspanClassName = "col-md-3";
        if (colspan) {
            if (classNameCol) {
                colspanClassName = "col-md-" + this.props.colspan + " " + classNameCol;
            }
            else {
                colspanClassName = "col-md-" + this.props.colspan;
            }
        }

        let labeldiv = "";
        if (label && subLabel) {
            labeldiv = <label className="col-form-label" htmlFor="input-normal">{label} <small>( {subLabel} )</small></label>;
        } else if (label) {
            labeldiv = <label className="col-form-label" htmlFor="input-normal">{label}</label>;
        }

        if (ValidatonErrorMessage && ValidatonErrorMessage != "") {
            className += " is-invalid";
        }
        return (
            <div className={colspanClassName}  >
                <div className="input-group">
                    {labeldiv}
                    <input type="text"
                        className={className}
                        ref={this.props.inputRef}
                        name={name}
                        onChange={this.handleValueChange}
                        readOnly={readonly}
                        value={value}
                        placeholder={placeholder} />
                    <div className="invalid-feedback">{ValidatonErrorMessage}</div>
                </div>
            </div>
        );
    }
}
const ElementText = connect(null, null)(ElementTextCom);

class ElementTextdropdownCom extends Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);

    }
    handleValueChange(e) {
        e.preventDefault();

        if (this.props.onValueChange != null)
            this.props.onValueChange(e.target.name, e.target.value);
    }

    handleClick(e) {
        e.preventDefault();
        if (this.props.onValueChange != null)
            this.props.onValueChange(e.target.name, e.currentTarget.dataset.option);
    }

    render() {
        let { name, label, placeholder, colspan, value, readonly, ValidatonErrorMessage, nameOption, valuenameOption, listoption, classNameCol } = this.props;
        let className = "form-control form-control-sm txtKeyword";
        let colspanClassName = "col-md-3";
        if (colspan) {
            if (classNameCol) {
                colspanClassName = "col-md-" + this.props.colspan + " " + classNameCol;
            }
            else {
                colspanClassName = "col-md-" + this.props.colspan;
            }
        }
        let labeldiv;
        if (label) {
            labeldiv = <label className="col-form-label" htmlFor="input-normal">{label}</label>;
        }
        if (ValidatonErrorMessage && ValidatonErrorMessage != "") {
            className += " is-invalid";
        }

        return (
            <div className={colspanClassName}  >
                <div className="input-group">
                    {labeldiv}
                    <div className="group-text-select">
                        <input type="text"
                            className={className}
                            name={name}
                            onChange={this.handleValueChange}
                            readOnly={readonly}
                            defaultValue={value}
                            placeholder={placeholder} />
                        <div className="input-group-append">
                            <button className="btn dropdown-toggle" type="button" data-toggle="dropdown">{listoption.filter(a => a.value.toString() === valuenameOption.toString())[0].label}</button>
                            <div className="dropdown dropdown-menu dropdown-menu-right">
                                {listoption && listoption.map((optionItem) =>
                                    <a className={optionItem.value.toString() === valuenameOption.toString() ? "dropdown-item active" : "dropdown-item"}
                                        key={optionItem.value} name={nameOption} data-option={optionItem.value}
                                        onClick={this.handleClick.bind(this)}>
                                        {optionItem.label}</a>
                                )}
                            </div>
                        </div>
                        <div className="invalid-feedback">{ValidatonErrorMessage}</div>
                    </div>
                </div>
            </div>
        );
    }
}
const ElementTextdropdown = connect(null, null)(ElementTextdropdownCom);

class ElementCheckboxCom extends Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
    }
    handleValueChange(e) {
        // e.preventDefault();
        let inputvalue = e.target.type == 'checkbox' ? e.target.checked : e.target.value;
        const inputname = e.target.name;
        if (this.props.onValueChange != null)
            this.props.onValueChange(inputname, inputvalue);
    }
    render() {
        let { name, label, value, colspan, classNameCol } = this.props;
        let colspanClassName = "col-md-1";
        if (colspan) {
            if (classNameCol) {
                colspanClassName = "col-md-" + this.props.colspan + " " + classNameCol;
            }
            else {
                colspanClassName = "col-md-" + this.props.colspan;
            }
        }

        let labeldiv;
        if (label) {
            labeldiv = <label className="custom-control-label" htmlFor={name + "-search-avd-check"}><span>{label}</span></label>;
        }
        return (
            <div className={colspanClassName}  >
                {/* <div className="custom-control custom-checkbox">
                    <input type="checkbox" id="search-avd" className="custom-control-input" defaultChecked />
                    {labeldiv}
                </div> */}
                <div className="form-group form-group-input">
                    <label className="lbl-title">&nbsp;</label>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox"
                            id={name + "-search-avd-check"}
                            className="custom-control-input"
                            value={value}
                            // defaultValue={value}
                            name={name}
                            checked={value}
                            // defaultChecked={value}
                            onChange={this.handleValueChange}
                            ref={this.props.inputRef}
                            readOnly={this.props.readonly}
                        />
                        {labeldiv}
                    </div>
                </div>
            </div>
        );
    }
}
const ElementCheckbox = connect(null, null)(ElementCheckboxCom);

class ElementCheckLDivboxCom extends Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
    }
    handleValueChange(e) {
        e.preventDefault();
        if (this.props.onValueChange != null)
            this.props.onValueChange(e.target.name, e.target.value);
    }
    render() {
        let { label, colspan, classNameCol } = this.props;
        let colspanClassName = "col-md-4";
        if (colspan) {
            if (classNameCol) {
                colspanClassName = "col-md-" + this.props.colspan + " " + classNameCol;
            }
            else {
                colspanClassName = "col-md-" + this.props.colspan;
            }
        }

        let labeldiv;
        if (label) {
            labeldiv = <label className="input-normal" >{label}</label>;
        }
        return (
            <div className={colspanClassName}  >

                <div className="custom-control custom-checkbox">
                    {labeldiv}
                    <input type="checkbox" id="search-avd" className="custom-control-input" defaultChecked />
                </div>
            </div>
        );
    }
}
const ElementCheckLDivbox = connect(null, null)(ElementCheckLDivboxCom);

const mapDispatchToProps = dispatch => {
    return {
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
        callGetUserCache: (cacheKeyID) => {
            return dispatch(callGetUserCache(cacheKeyID));
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        }
    }
}

class ElementComboBoxNewChangeCom extends Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);

        this.state = {
            ListOption: [],
            Data: [],
            SelectedOption: []
        }

    }

    bindcombox(value, listOption) {
        let values = value;
        let selectedOption = [];
        if (values == null || values === -1)
            return { value: -1, label: this.props.placeholder };
        if (typeof values.toString() == "string")
            values = values.toString().split(',');
        for (let i = 0; i < values.length; i++) {
            for (let j = 0; j < listOption.length; j++) {
                if (values[i] == listOption[j].value) {
                    selectedOption.push({ value: listOption[j].value, label: listOption[j].label });
                }
            }
        }
        return selectedOption;
    }

    componentDidMount() {
        let { listoption, IsAutoLoadItemFromCache, LoadItemCacheKeyID, ValueMember, NameMember, filterValue, filterobj } = this.props;

        if (IsAutoLoadItemFromCache) {

            if (this.props.isUsercache == true) {
                this.props.callGetUserCache(LoadItemCacheKeyID).then((result) => {

                    listoption = [{ value: -1, label: this.props.placeholder }];
                    if (!result.IsError && result.ResultObject.CacheData != null) {
                        result.ResultObject.CacheData.map((cacheItem) => {
                            listoption.push({ value: cacheItem[ValueMember], label: cacheItem[ValueMember] + " - " + cacheItem[NameMember] });
                        }
                        );

                        this.setState({ ListOption: listoption });
                        const aa = this.bindcombox(this.props.value, listoption);
                        this.setState({ SelectedOption: aa });

                    }
                    else {
                        this.setState({ ListOption: listoption });

                    }
                });

            } else {
                this.props.callGetCache(LoadItemCacheKeyID).then((result) => {

                    listoption = [{ value: -1, label: this.props.placeholder }];
                    if (!result.IsError && result.ResultObject.CacheData != null) {
                        if (typeof filterobj != undefined) {
                            result.ResultObject.CacheData.filter(n => n[filterobj] == filterValue).map((cacheItem) => {
                                listoption.push({ value: cacheItem[ValueMember], label: cacheItem[ValueMember] + " - " + cacheItem[NameMember] });
                            });
                        } else {
                            result.ResultObject.CacheData.map((cacheItem) => {
                                listoption.push({ value: cacheItem[ValueMember], label: cacheItem[ValueMember] + " - " + cacheItem[NameMember] });
                            });
                        }

                        this.setState({ ListOption: listoption, Data: result.ResultObject.CacheData });
                        const aa = this.bindcombox(this.props.value, listoption);
                        this.setState({ SelectedOption: aa });
                    } else {
                        this.setState({ ListOption: listoption });
                    }

                });
            }

        } else {
            this.setState({ ListOption: listoption });
            const aa = this.bindcombox(this.props.value, listoption);
            this.setState({ SelectedOption: aa });
        }
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

    handleValueChange(selectedOption) {
        const comboValues = this.getComboValue(selectedOption);
        this.setState({ SelectedOption: comboValues });
        if (this.props.onValueChange)
            this.props.onValueChange(this.props.name, comboValues, this.props.filterrest);
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.filterValue) !== JSON.stringify(nextProps.filterValue)) // Check if it's a new user, you can also use some unique property, like the ID
        {
            let { filterobj, ValueMember, NameMember } = this.props;
            if (typeof filterobj != undefined) {
                let listoptionnew = [{ value: -1, label: this.props.placeholder }];
                //  console.log(filterobj,this.state.Data.filter(n => n[filterobj] == nextProps.filterValue))
                this.state.Data.filter(n => n[filterobj] == nextProps.filterValue).map((cacheItem) => {
                    listoptionnew.push({ value: cacheItem[ValueMember], label: cacheItem[ValueMember] + " - " + cacheItem[NameMember] });
                }
                );
                this.setState({ ListOption: listoptionnew });
            }

        }
        if (JSON.stringify(this.props.value) !== JSON.stringify(nextProps.value)) // Check if it's a new user, you can also use some unique property, like the ID
        {
            const aa = this.bindcombox(nextProps.value, this.state.ListOption);
            this.setState({ SelectedOption: aa });
        }
    }

    render() {
        let { name, label, colspan, ValidatonErrorMessage, placeholder, classNameCol } = this.props;
        let className = "select";
        let colspanClassName = "col-md-3";
        if (colspan) {
            if (classNameCol) {
                colspanClassName = "col-md-" + this.props.colspan + " " + classNameCol;
            }
            else {
                colspanClassName = "col-md-" + this.props.colspan;
            }
        }
        let labeldiv;
        if (label) {
            labeldiv = <label className="col-form-label" htmlFor="input-normal">{label}</label>;
        }

        if (ValidatonErrorMessage && ValidatonErrorMessage != "") {

            className += " is-invalid";
        }

        return (
            <div className={colspanClassName}  >
                <div className="form-group form-group-input form-group-input-select">
                    {labeldiv}
                    <Select
                        value={this.state.SelectedOption}
                        name={name}
                        ref={this.props.inputRef}
                        onChange={this.handleValueChange}
                        options={this.state.ListOption}
                        isMulti={this.props.isMultiSelect}
                        isSearchable={true}
                        placeholder={placeholder}
                        className={className}
                    />
                    <div className="invalid-feedback">{ValidatonErrorMessage}</div>
                </div>
            </div>
        );
    }
}

const ElementComboBoxNewChange = connect(null, mapDispatchToProps)(ElementComboBoxNewChangeCom);


class ElementComboBoxFilterTwoConditionCom extends Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);

        this.state = {
            ListOption: [],
            Data: [],
            SelectedOption: []
        }
    }

    bindcombox(value, listOption) {
        let values = value;
        let selectedOption = [];
        if (values == null || values === -1)
            return { value: -1, label: this.props.placeholder };
        if (typeof values.toString() == "string")
            values = values.toString().split(',');
        for (let i = 0; i < values.length; i++) {
            for (let j = 0; j < listOption.length; j++) {
                if (values[i] == listOption[j].value) {
                    selectedOption.push({ value: listOption[j].value, label: listOption[j].label });
                }
            }
        }
        return selectedOption;
    }

    componentDidMount() {
        let { listoption, IsAutoLoadItemFromCache, LoadItemCacheKeyID, ValueMember, NameMember, filterValue, filterobj, filterValue_1, filterobj_1 } = this.props;

        if (IsAutoLoadItemFromCache) {

            if (this.props.isUsercache == true) {
                this.props.callGetUserCache(LoadItemCacheKeyID).then((result) => {

                    listoption = [{ value: -1, label: this.props.placeholder }];

                    if (!result.IsError && result.ResultObject.CacheData != null) {
                        result.ResultObject.CacheData.map((cacheItem) => {
                            listoption.push({ value: cacheItem[ValueMember], label: cacheItem[ValueMember] + " - " + cacheItem[NameMember] });
                        }
                        );

                        this.setState({ ListOption: listoption });
                        const aa = this.bindcombox(this.props.value, listoption);
                        this.setState({ SelectedOption: aa });

                    } else {
                        this.setState({ ListOption: listoption });
                    }
                });

            } else {
                this.props.callGetCache(LoadItemCacheKeyID).then((result) => {

                    listoption = [{ value: -1, label: this.props.placeholder }];

                    if (!result.IsError && result.ResultObject.CacheData != null) {
                        let cacheData = result.ResultObject.CacheData;

                        if (typeof filterobj != undefined) {
                            cacheData = cacheData.filter(n => n[filterobj] == filterValue);
                        }

                        if (typeof filterobj_1 != undefined) {
                            cacheData = cacheData.filter(n => n[filterobj_1] == filterValue_1);
                        }

                        cacheData.forEach((cacheItem) => {
                            listoption.push({ value: cacheItem[ValueMember], label: cacheItem[ValueMember] + " - " + cacheItem[NameMember] });
                        });

                        this.setState({ ListOption: listoption, Data: result.ResultObject.CacheData });
                        const aa = this.bindcombox(this.props.value, listoption);
                        this.setState({ SelectedOption: aa });

                    } else {
                        this.setState({ ListOption: listoption });
                    }

                });
            }

        } else {
            this.setState({ ListOption: listoption });
            const aa = this.bindcombox(this.props.value, listoption);
            this.setState({ SelectedOption: aa });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.filterValue) !== JSON.stringify(nextProps.filterValue)) // Check if it's a new user, you can also use some unique property, like the ID
        {
            let { filterobj, filterobj_1, ValueMember, NameMember, placeholder } = this.props;
            let listoptionnew = [{ value: -1, label: placeholder }];
            let stateData = this.state.Data

            if (typeof filterobj != undefined) {
                stateData = stateData.filter(n => n[filterobj] == nextProps.filterValue);
            }

            if (typeof filterobj_1 != undefined) {
                stateData = stateData.filter(n => n[filterobj_1] == this.props.filterValue_1)
            }

            stateData.forEach((cacheItem) => {
                listoptionnew.push({ value: cacheItem[ValueMember], label: cacheItem[ValueMember] + " - " + cacheItem[NameMember] });
            });

            this.setState({ ListOption: listoptionnew });
        }

        if (JSON.stringify(this.props.value) !== JSON.stringify(nextProps.value)) // Check if it's a new user, you can also use some unique property, like the ID
        {
            const aa = this.bindcombox(nextProps.value, this.state.ListOption);
            this.setState({ SelectedOption: aa });
        }
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

    handleValueChange(selectedOption) {
        const comboValues = this.getComboValue(selectedOption);
        this.setState({ SelectedOption: comboValues });
        if (this.props.onValueChange)
            this.props.onValueChange(this.props.name, comboValues, this.props.filterrest);
    }

    render() {
        let { name, label, colspan, ValidatonErrorMessage, placeholder, classNameCol } = this.props;
        let className = "select";
        let colspanClassName = "col-md-3";
        if (colspan) {
            if (classNameCol) {
                colspanClassName = "col-md-" + this.props.colspan + " " + classNameCol;
            }
            else {
                colspanClassName = "col-md-" + this.props.colspan;
            }
        }
        let labeldiv;
        if (label) {
            labeldiv = <label className="col-form-label" htmlFor="input-normal">{label}</label>;
        }

        if (ValidatonErrorMessage && ValidatonErrorMessage != "") {

            className += " is-invalid";
        }

        return (
            <div className={colspanClassName}  >
                <div className="form-group form-group-input form-group-input-select">
                    {labeldiv}
                    <Select
                        value={this.state.SelectedOption}
                        name={name}
                        ref={this.props.inputRef}
                        onChange={this.handleValueChange}
                        options={this.state.ListOption}
                        isMulti={this.props.isMultiSelect}
                        isSearchable={true}
                        placeholder={placeholder}
                        className={className}
                    />
                    <div className="invalid-feedback">{ValidatonErrorMessage}</div>
                </div>
            </div>
        );
    }
}

const ElementComboBoxFilterTwoCondition = connect(null, mapDispatchToProps)(ElementComboBoxFilterTwoConditionCom);


class ElementComboBoxCom extends Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);

        this.state = {
            ListOption: [],
            Data: [],
            SelectedOption: []
        }

    }

    bindcombox(value, listOption) {
        let values = value;
        let selectedOption = [];
        if (values == null || values === -1)
            return { value: -1, label: this.props.placeholder };
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
    componentDidMount() {
        let { listoption, IsAutoLoadItemFromCache, LoadItemCacheKeyID, ValueMember, NameMember, filterValue, filterobj } = this.props;
        // console.log("this.props.isautoloaditemfromcachess: ", this.props.isautoloaditemfromcache,this.props.loaditemcachekeyid,this.props.listoption)
        if (IsAutoLoadItemFromCache) {
            // console.log("ValueMember ", ValueMember, NameMember, this.props);

            if (this.props.isUsercache == true) {
                this.props.callGetUserCache(LoadItemCacheKeyID).then((result) => {
                    // console.log("this.props.isautoloaditemfromcach2: ", this.props.LoadItemCacheKeyID, this.state.Listoption, result);
                    listoption = [{ value: -1, label: this.props.placeholder }];
                    if (!result.IsError && result.ResultObject.CacheData != null) {
                        result.ResultObject.CacheData.map((cacheItem) => {
                            listoption.push({ value: cacheItem[ValueMember], label: cacheItem[ValueMember] + " - " + cacheItem[NameMember] });
                        }
                        );

                        this.setState({ ListOption: listoption });
                        const aa = this.bindcombox(this.props.value, listoption);
                        this.setState({ SelectedOption: aa });

                    }
                    else {
                        this.setState({ ListOption: listoption });

                    }
                    //  console.log("this.props.isautoloaditemfromcachess: ",this.props.loaditemcachekeyid, this.state.Listoption);
                });

            }
            else {
                this.props.callGetCache(LoadItemCacheKeyID).then((result) => {

                    // console.log("this.props.isautoloaditemfromcach2: ", result);
                    listoption = [{ value: -1, label: this.props.placeholder }];
                    if (!result.IsError && result.ResultObject.CacheData != null) {
                        if (typeof filterobj != undefined) {
                            // console.log(filterobj,result.ResultObject.CacheData,result.ResultObject.CacheData.filter(n => n.filterobj == 1))
                            result.ResultObject.CacheData.filter(n => n[filterobj] == filterValue).map((cacheItem) => {
                                listoption.push({ value: cacheItem[ValueMember], label: cacheItem[ValueMember] + " - " + cacheItem[NameMember] });
                            }
                            );

                        }
                        else {
                            result.ResultObject.CacheData.map((cacheItem) => {
                                listoption.push({ value: cacheItem[ValueMember], label: cacheItem[ValueMember] + " - " + cacheItem[NameMember] });
                            }
                            );
                        }

                        this.setState({ ListOption: listoption, Data: result.ResultObject.CacheData });
                        const aa = this.bindcombox(this.props.value, listoption);
                        this.setState({ SelectedOption: aa });
                    }
                    else {
                        this.setState({ ListOption: listoption });
                    }
                    //  console.log("this.props.isautoloaditemfromcachess: ",this.props.loaditemcachekeyid, this.state.Listoption);
                });
            }

        }
        else {
            //console.log("this.props.isautoloaditemfromcache1: ",this.props.loaditemcachekeyid, this.state.Listoption);
            this.setState({ ListOption: listoption });
            const aa = this.bindcombox(this.props.value, listoption);
            this.setState({ SelectedOption: aa });
        }
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

    handleValueChange(selectedOption) {
        const comboValues = this.getComboValue(selectedOption);
        if (this.props.onValueChange)
            this.props.onValueChange(this.props.name, comboValues, this.props.filterrest);
    }

    componentWillReceiveProps(nextProps) {

        if (JSON.stringify(this.props.filterValue) !== JSON.stringify(nextProps.filterValue)) // Check if it's a new user, you can also use some unique property, like the ID
        {
            let { filterobj, ValueMember, NameMember } = this.props;
            if (typeof filterobj != undefined) {
                let listoptionnew = [{ value: -1, label: this.props.placeholder }];
                //  console.log(filterobj,this.state.Data.filter(n => n[filterobj] == nextProps.filterValue))
                
                var abc = nextProps.filterValue 
                abc = abc + ""
                abc = abc.split(',')
                for(let i = 0; i < abc.length; i++)
                {
                    try{
                        if(abc[i]){
                            if(this.state.Data.filter(n => n[filterobj] == abc[i])[0].ProvinceName){
                                listoptionnew.push({value: -1, label: "------ " + this.state.Data.filter(n => n[filterobj] == abc[i])[0].ProvinceName + " ------"})
                            }
                        }
                    }catch (error) {
                        console.log(error)
                    }
                    
                    this.state.Data.filter(n => n[filterobj] == abc[i]).map((cacheItem) => {
                        listoptionnew.push({ value: cacheItem[ValueMember], label: cacheItem[ValueMember] + " - " + cacheItem[NameMember] });
                    }
                    );

                }
                this.setState({ ListOption: listoptionnew });
            }
        }
        if (JSON.stringify(this.props.value) !== JSON.stringify(nextProps.value)) // Check if it's a new user, you can also use some unique property, like the ID
        {
            const aa = this.bindcombox(nextProps.value, this.state.ListOption);
            this.setState({ SelectedOption: aa });
        }
    }

    render() {
        let { name, label, colspan, ValidatonErrorMessage, placeholder, classNameCol } = this.props;
        let className = "select";
        let colspanClassName = "col-md-3";
        if (colspan) {
            if (classNameCol) {
                colspanClassName = "col-md-" + this.props.colspan + " " + classNameCol;
            }
            else {
                colspanClassName = "col-md-" + this.props.colspan;
            }
        }
        let labeldiv;
        if (label) {
            labeldiv = <label className="col-form-label" htmlFor="input-normal">{label}</label>;
        }

        if (ValidatonErrorMessage && ValidatonErrorMessage != "") {

            className += " is-invalid";
        }

        return (
            <div className={colspanClassName}  >
                <div className="form-group form-group-input form-group-input-select">
                    {labeldiv}
                    <Select
                        value={this.state.SelectedOption}
                        name={name}
                        ref={this.props.inputRef}
                        onChange={this.handleValueChange}
                        options={this.state.ListOption}
                        isMulti={this.props.isMultiSelect}
                        isSearchable={true}
                        placeholder={placeholder}
                        className={className}
                    />
                    <div className="invalid-feedback">{ValidatonErrorMessage}</div>
                </div>
            </div>
        );
    }
}

const ElementComboBox = connect(null, mapDispatchToProps)(ElementComboBoxCom);

class ElementComboBoxNewMIDCom extends Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);

        this.state = {
            ListOption: [],
            Data: [],
            SelectedOption: []
        }

    }

    bindcombox(value, listOption) {
        let values = value;
        let selectedOption = [];
        if (values == null || values === -1)
            return { value: -1, label: this.props.placeholder };
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
    componentDidMount() {
        let { listoption, IsAutoLoadItemFromCache, LoadItemCacheKeyID, ValueMember, NameMember, filterValue, filterobj } = this.props;
        // console.log("this.props.isautoloaditemfromcachess: ", this.props.isautoloaditemfromcache,this.props.loaditemcachekeyid,this.props.listoption)
        if (IsAutoLoadItemFromCache) {
            // console.log("ValueMember ", ValueMember, NameMember, this.props);

            if (this.props.isUsercache == true) {
                this.props.callGetUserCache(LoadItemCacheKeyID).then((result) => {
                    // console.log("this.props.isautoloaditemfromcach2: ", this.props.LoadItemCacheKeyID, this.state.Listoption, result);
                    listoption = [{ value: -1, label: this.props.placeholder }];
                    if (!result.IsError && result.ResultObject.CacheData != null) {
                        result.ResultObject.CacheData.map((cacheItem) => {
                            listoption.push({ value: cacheItem[ValueMember], label: cacheItem[NameMember] });
                        }
                        );

                        this.setState({ ListOption: listoption });
                        const aa = this.bindcombox(this.props.value, listoption);
                        this.setState({ SelectedOption: aa });

                    }
                    else {
                        this.setState({ ListOption: listoption });

                    }
                    //  console.log("this.props.isautoloaditemfromcachess: ",this.props.loaditemcachekeyid, this.state.Listoption);
                });

            }
            else {
                this.props.callGetCache(LoadItemCacheKeyID).then((result) => {

                    // console.log("this.props.isautoloaditemfromcach2: ", result);
                    listoption = [{ value: -1, label: this.props.placeholder }];
                    if (!result.IsError && result.ResultObject.CacheData != null) {
                        if (typeof filterobj != undefined) {
                            // console.log(filterobj,result.ResultObject.CacheData,result.ResultObject.CacheData.filter(n => n.filterobj == 1))
                            result.ResultObject.CacheData.filter(n => n[filterobj] == filterValue).map((cacheItem) => {
                                listoption.push({ value: cacheItem[ValueMember], label: cacheItem[NameMember] });
                            }
                            );

                        }
                        else {
                            result.ResultObject.CacheData.map((cacheItem) => {
                                listoption.push({ value: cacheItem[ValueMember], label: cacheItem[NameMember] });
                            }
                            );
                        }

                        this.setState({ ListOption: listoption, Data: result.ResultObject.CacheData });
                        const aa = this.bindcombox(this.props.value, listoption);
                        this.setState({ SelectedOption: aa });
                    }
                    else {
                        this.setState({ ListOption: listoption });
                    }
                    //  console.log("this.props.isautoloaditemfromcachess: ",this.props.loaditemcachekeyid, this.state.Listoption);
                });
            }

        }
        else {
            //console.log("this.props.isautoloaditemfromcache1: ",this.props.loaditemcachekeyid, this.state.Listoption);
            this.setState({ ListOption: listoption });
            const aa = this.bindcombox(this.props.value, listoption);
            this.setState({ SelectedOption: aa });
        }
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

    handleValueChange(selectedOption) {
        const comboValues = this.getComboValue(selectedOption);
        if (this.props.onValueChange)
            this.props.onValueChange(this.props.name, comboValues, this.props.filterrest);
    }

    componentWillReceiveProps(nextProps) {

        if (JSON.stringify(this.props.filterValue) !== JSON.stringify(nextProps.filterValue)) // Check if it's a new user, you can also use some unique property, like the ID
        {
            let { filterobj, ValueMember, NameMember } = this.props;
            if (typeof filterobj != undefined) {
                let listoptionnew = [{ value: -1, label: this.props.placeholder }];
                //  console.log(filterobj,this.state.Data.filter(n => n[filterobj] == nextProps.filterValue))
                
                var abc = nextProps.filterValue 
                abc = abc + ""
                abc = abc.split(',')
                for(let i = 0; i < abc.length; i++)
                {
                    try{
                        if(abc[i]){
                            if(this.state.Data.filter(n => n[filterobj] == abc[i])[0].ProvinceName){
                                listoptionnew.push({value: -1, label: "------ " + this.state.Data.filter(n => n[filterobj] == abc[i])[0].ProvinceName + " ------"})
                            }
                        }
                    }catch (error) {
                        console.log(error)
                    }
                    
                    this.state.Data.filter(n => n[filterobj] == abc[i]).map((cacheItem) => {
                        listoptionnew.push({ value: cacheItem[ValueMember], label: cacheItem[NameMember] });
                    }
                    );

                }
                this.setState({ ListOption: listoptionnew });
            }
        }
        if (JSON.stringify(this.props.value) !== JSON.stringify(nextProps.value)) // Check if it's a new user, you can also use some unique property, like the ID
        {
            const aa = this.bindcombox(nextProps.value, this.state.ListOption);
            this.setState({ SelectedOption: aa });
        }
    }

    render() {
        let { name, label, colspan, ValidatonErrorMessage, placeholder, classNameCol } = this.props;
        let className = "select";
        let colspanClassName = "col-md-3";
        if (colspan) {
            if (classNameCol) {
                colspanClassName = "col-md-" + this.props.colspan + " " + classNameCol;
            }
            else {
                colspanClassName = "col-md-" + this.props.colspan;
            }
        }
        let labeldiv;
        if (label) {
            labeldiv = <label className="col-form-label" htmlFor="input-normal">{label}</label>;
        }

        if (ValidatonErrorMessage && ValidatonErrorMessage != "") {

            className += " is-invalid";
        }

        return (
            <div className={colspanClassName}  >
                <div className="form-group form-group-input form-group-input-select">
                    {labeldiv}
                    <Select
                        value={this.state.SelectedOption}
                        name={name}
                        ref={this.props.inputRef}
                        onChange={this.handleValueChange}
                        options={this.state.ListOption}
                        isMulti={this.props.isMultiSelect}
                        isSearchable={true}
                        placeholder={placeholder}
                        className={className}
                    />
                    <div className="invalid-feedback">{ValidatonErrorMessage}</div>
                </div>
            </div>
        );
    }
}

const ElementComboBoxNewMID = connect(null, mapDispatchToProps)(ElementComboBoxNewMIDCom);


class ElementComboBoxNewCom extends Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);

        this.state = { ListOption: [], SelectedOption: [] }

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
                    selectedOption.push({ value: listOption[j].value, label: listOption[j].label });
                }
            }
        }
        return selectedOption;
    }

    componentDidMount() {
        let { listoption } = this.props;
        this.setState({ ListOption: listoption })

    }
    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.listoption) !== JSON.stringify(nextProps.listoption)) // Check if it's a new user, you can also use some unique property, like the ID
        {
            this.setState({ ListOption: nextProps.listoption })
        }
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

    handleValueChange(selectedOption) {
        const comboValues = this.getComboValue(selectedOption);
        if (this.props.onValueChange)
            this.props.onValueChange(this.props.name, comboValues);
    }

    render() {
        let { name, isMultiSelect, validationErrorMessage, placeholder, classNameCol } = this.props;
        let className = "select";

        let formRowClassName = "form-row";
        if (this.props.rowspan != null) {
            formRowClassName = "form-row col-md-" + this.props.rowspan;
        }

        let labelDivClassName = "form-group col-md-2";
        if (this.props.labelcolspan != null) {
            labelDivClassName = "form-group col-md-" + this.props.labelcolspan;
        }
        let formGroupClassName = "form-group col-md-8";
        if (this.props.colspan != null) {
            if (classNameCol) {
                formGroupClassName = "form-group col-md-" + this.props.colspan + " " + classNameCol;
            }
            else {
                formGroupClassName = "form-group col-md-" + this.props.colspan;
            }
        }

        if (validationErrorMessage && validationErrorMessage != "") {

            className += " is-invalid";
        }

        let star;
        if (this.props.validatonList != undefined && this.props.validatonList.includes("Comborequired") == true) {
            star = '*'
        }
        const selectedOption = this.bindcombox(this.props.listoption);
        return (
            <div className="col-md-6">
                <div className={formRowClassName}>
                    <div className={labelDivClassName}>
                        <label className="col-form-label">
                            {this.props.label}<span className="text-danger"> {star}</span>
                        </label>
                    </div>
                    <div className={formGroupClassName}>
                        <div className="form-group-input-select">
                            <Select
                                value={selectedOption}
                                name={name}
                                ref={this.props.inputRef}
                                onChange={this.handleValueChange}
                                options={this.state.ListOption}
                                isMulti={isMultiSelect}
                                isSearchable={true}
                                placeholder={placeholder}
                                className={className}
                            />
                            <div className="invalid-feedback">{validationErrorMessage}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const ElementComboBoxNew = connect(null, mapDispatchToProps)(ElementComboBoxNewCom);

class ElementTextNewCom extends Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
    }
    handleValueChange(e) {
        e.preventDefault();
        if (this.props.onValueChange != null)
            this.props.onValueChange(e.target.name, e.target.value);
    }
    render() {
        let { name, placeholder, value, readonly, validationErrorMessage, classNameCol } = this.props;
        let className = "form-control form-control-sm";
        if (this.props.CSSClassName != null)
            className = this.props.CSSClassName;
        let formGroupClassName = "form-group col-md-2";
        if (this.props.colspan != null) {
            if (classNameCol) {
                formGroupClassName = "form-group col-md-" + this.props.colspan + " " + classNameCol;
            }
            else {
                formGroupClassName = "form-group col-md-" + this.props.colspan;
            }
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

        return (
            <div className="col-md-6">
                <div className={formRowClassName} >
                    <div className={labelDivClassName}>
                        <label className="col-form-label 3">
                            {this.props.label}<span className="text-danger"> {star}</span>
                        </label>
                    </div>
                    <div className={formGroupClassName}>
                        <input type="text"
                            className={className}
                            ref={this.props.inputRef}
                            name={name}
                            onChange={this.handleValueChange}
                            readOnly={readonly}
                            defaultValue={value}
                            placeholder={placeholder} />
                        <div className="invalid-feedback">{validationErrorMessage}</div>
                    </div>
                </div>
            </div>

        );
    }
}
const ElementTextNew = connect(null, null)(ElementTextNewCom);

class ElementTextNewFullCom extends Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
    }
    handleValueChange(e) {
        e.preventDefault();
        if (this.props.onValueChange != null)
            this.props.onValueChange(e.target.name, e.target.value);
    }
    render() {
        let { name, placeholder, value, validationErrorMessage, classNameCol } = this.props;
        let className = "form-control form-control-sm";
        if (this.props.CSSClassName != null)
            className = this.props.CSSClassName;
        let formGroupClassName = "form-group col-md-2";
        if (this.props.colspan != null) {
            if (classNameCol) {
                formGroupClassName = "form-group col-md-" + this.props.colspan + " " + classNameCol;
            }
            else {
                formGroupClassName = "form-group col-md-" + this.props.colspan;
            }
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

        return (
            <div className="col-md-12">
                <div className={formRowClassName} >
                    <div className={labelDivClassName}>
                        <label className="col-form-label 3">
                            {this.props.label}<span className="text-danger"> {star}</span>
                        </label>
                    </div>
                    <div className={formGroupClassName}>
                        <input type="text"
                            className={className}
                            ref={this.props.inputRef}
                            name={name}
                            onChange={this.handleValueChange}
                            readOnly={true}
                            value={value}
                            placeholder={placeholder} />
                        <div className="invalid-feedback">{validationErrorMessage}</div>
                    </div>
                </div>
            </div>

        );
    }
}
const ElementTextNewFull = connect(null, null)(ElementTextNewFullCom);

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
        let { name, label, timeFormat, dateFormat, colspan, value, ValidatonErrorMessage, classNameCol, isValidDate } = this.props;
        let className = "";
        let colspanClassName = "col-md-3";
        if (colspan) {
            if (classNameCol) {
                colspanClassName = "form-group col-md-" + this.props.colspan + " " + classNameCol;
            }
            else {
                colspanClassName = "form-group col-md-" + this.props.colspan;
            }
        }
        let labeldiv;
        if (label) {
            labeldiv = <label htmlFor="input-normal">{label}</label>;
        }
        if (ValidatonErrorMessage && ValidatonErrorMessage != "") {
            className += " is-invalid";
        }

        return (
            <div className={colspanClassName}  >
                <div className="form-group form-group-input form-group-input-date">
                    {labeldiv}
                    <div className="input-group ">
                        <Datetime
                            className={className}
                            name={name}
                            // onChange={this.handleValueChange}
                            onChange={(moment) => this.handleValueChange(name, moment)}
                            defaultValue={value}
                            timeFormat={timeFormat}
                            dateFormat={dateFormat}
                            isValidDate={isValidDate}
                            {...this.props}
                        />

                        <div className="invalid-feedback">{ValidatonErrorMessage}</div>
                    </div>
                </div>
            </div>
        );
    }
}
const ElementDatetime = connect(null, null)(ElementDatetimeCom);

class ElementDatetimeFromToCom extends Component {
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

        let { name, label, nameOption, valueOption, timeFormat, dateFormat, colspan, value, ValidatonErrorMessage, classNameCol } = this.props;
        let className = "";
        let colspanClassName = "col-md-4";
        if (colspan) {
            if (classNameCol) {
                colspanClassName = "form-group col-md-" + this.props.colspan + " " + classNameCol;
            }
            else {
                colspanClassName = "form-group col-md-" + this.props.colspan;
            }
        }
        let labeldiv;
        if (label) {
            labeldiv = <label className="col-form-label" htmlFor="input-normal">{label}</label>;
        }
        if (ValidatonErrorMessage && ValidatonErrorMessage != "") {
            className += " is-invalid";
        }
        return (
            <div className={colspanClassName}  >
                {/* <div className="form-group form-group-input form-group-input-date form-group-input-dates">
                    {labeldiv}
                    <div className="input-group ">
                        <div className="rdt rdtOpen">
                            <Datetime
                                className={className}
                                name={name}
                                onChange={this.handleValueChange}
                                onChange={(moment) => this.handleValueChange(name, moment)}
                                defaultValue={value}
                                timeFormat={timeFormat}
                                dateFormat={dateFormat} >
                            </Datetime>
                            <div className="invalid-feedback">{ValidatonErrorMessage}</div>
                        </div>
                        <span className="date-to">To</span>
                        <div className="rdt rdtOpen">
                            <Datetime
                                className={className}
                                name={nameOption}
                                onChange={this.handleValueChange}
                                onChange={(moment) => this.handleValueChange(name, moment)}
                                defaultValue={valueOption}
                                timeFormat={timeFormat}
                                dateFormat={dateFormat} >
                            </Datetime>
                            <div className="invalid-feedback">{ValidatonErrorMessage}</div>
                        </div>
                    </div>
                </div> */}
                <div className="form-group form-group-input form-group-input-date form-group-input-dates">
                    {labeldiv}
                    <div className="input-group">
                        <div className="input-date from-date">
                            <Datetime
                                className={className}
                                name={name}
                                // onChange={this.handleValueChange}
                                onChange={(moment) => this.handleValueChange(name, moment)}
                                defaultValue={value}
                                timeFormat={timeFormat}
                                dateFormat={dateFormat} >
                            </Datetime>
                            <div className="invalid-feedback">{ValidatonErrorMessage}</div>
                        </div>
                        <span className="date-to">To</span>
                        <div className="input-date to-date">
                            <Datetime
                                className={className}
                                name={nameOption}
                                // onChange={this.handleValueChange}
                                onChange={(moment) => this.handleValueChange(name, moment)}
                                defaultValue={valueOption}
                                timeFormat={timeFormat}
                                dateFormat={dateFormat} >
                            </Datetime>
                            <div className="invalid-feedback">{ValidatonErrorMessage}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const ElementDatetimeFromTo = connect(null, null)(ElementDatetimeFromToCom);


class ElementDatetimeMonthYearCom extends Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
    }

    handleValueChange(name, moment) {
        //e.preventDefault();
        // console.log('moment', moment.format('LL'))
        if (this.props.onValueChange != null)
            this.props.onValueChange(name, moment);
    }

    handleDisableDate(current){
        return current && current > moment().startOf('day');
    }

    render() {
        let { name, label, format, colspan, value, ValidatonErrorMessage, classNameCol } = this.props;
        let className = "custom-month ";
        let colspanClassName = "col-md-3";
        if (colspan) {
            if (classNameCol) {
                colspanClassName = "col-md-" + this.props.colspan + " " + classNameCol;
            }
            else {
                colspanClassName = "col-md-" + this.props.colspan;
            }
        }
        let labeldiv;
        if (label) {
            labeldiv = <label htmlFor="input-normal">{label}</label>;
        }
        if (ValidatonErrorMessage && ValidatonErrorMessage != "") {
            className += " is-invalid";
        }
        let classnameCus = "form-group form-group-input form-group-input-date "
        if (this.props.classNameCustom != undefined || this.props.classNameCustom != "") {
            classnameCus = "form-group form-group-input form-group-input-date " + this.props.classNameCustom
        }

        return (
            <div className={colspanClassName}  >
                <div className={classnameCus}>
                    {labeldiv}
                    <div className="input-group ">
                        <DatePicker
                            picker="month"
                            placeholder={this.props.placeholder}
                            className={className}
                            onChange={(moment) => this.handleValueChange(name, moment)}
                            value={(value != '' && value != null) ? moment(value, 'YYYY-MM') : ''}
                            //value={value}
                            name={name}
                            format={format}
                            locale={vi_VN}
                            disabledDate={this.props.isDisableNext ? this.handleDisableDate : null}
                            allowClear={this.props.isAllowClear ? true : false}
                            monthCellContentRender={() => this.handleMonthCellRender}
                        />
                        <div className="invalid-feedback">{ValidatonErrorMessage}</div>
                    </div>
                </div>
            </div >
        );
    }
}
const ElementDatetimeMonthYear = connect(null, null)(ElementDatetimeMonthYearCom);


class ElementComboBoxByCompanyCom extends Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);

        this.state = {
            ListOption: [],
            Data: [],
            SelectedOption: []
        }

    }

    bindcombox(value, listOption) {
        let values = value;
        let selectedOption = [];
        if (values == null || values === -1)
            return { value: -1, label: this.props.placeholder };
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
    componentDidMount() {
        let { listoption, IsAutoLoadItemFromCache, LoadItemCacheKeyID, ValueMember, NameMember, filterValue, filterobj } = this.props;
        // console.log("this.props.isautoloaditemfromcachess: ", this.props.isautoloaditemfromcache,this.props.loaditemcachekeyid,this.props.listoption)
        if (IsAutoLoadItemFromCache) {
            // console.log("ValueMember ", ValueMember, NameMember, this.props);

            if (this.props.isUsercache == true) {
                this.props.callGetUserCache(LoadItemCacheKeyID).then((result) => {
                    // console.log("this.props.isautoloaditemfromcach2: ", this.props.LoadItemCacheKeyID, this.state.Listoption, result);
                    listoption = [{ value: -1, label: this.props.placeholder }];
                    if (!result.IsError && result.ResultObject.CacheData != null) {
                        result.ResultObject.CacheData.map((cacheItem) => {
                            listoption.push({ value: cacheItem[ValueMember], label: cacheItem[ValueMember] + " - " + cacheItem[NameMember] });
                        }
                        );

                        this.setState({ ListOption: listoption });
                        const aa = this.bindcombox(this.props.value, listoption);
                        this.setState({ SelectedOption: aa });

                    }
                    else {
                        this.setState({ ListOption: listoption });

                    }
                    //  console.log("this.props.isautoloaditemfromcachess: ",this.props.loaditemcachekeyid, this.state.Listoption);
                });

            }
            else {
                this.props.callGetCache(LoadItemCacheKeyID).then((result) => {

                    // console.log("this.props.isautoloaditemfromcach2: ", result);
                    listoption = [{ value: -1, label: this.props.placeholder }];
                    if (!result.IsError && result.ResultObject.CacheData != null) {
                        if (typeof filterobj != undefined) {
                            // console.log(filterobj,result.ResultObject.CacheData,result.ResultObject.CacheData.filter(n => n.filterobj == 1))
                            result.ResultObject.CacheData.filter(n => n[filterobj] == filterValue).map((cacheItem) => {
                                listoption.push({ value: cacheItem[ValueMember], label: cacheItem[ValueMember] + " - " + cacheItem[NameMember] });
                            }
                            );

                        }
                        else {
                            result.ResultObject.CacheData.map((cacheItem) => {
                                listoption.push({ value: cacheItem[ValueMember], label: cacheItem[ValueMember] + " - " + cacheItem[NameMember] });
                            }
                            );
                        }

                        this.setState({ ListOption: listoption, Data: result.ResultObject.CacheData });
                        const aa = this.bindcombox(this.props.value, listoption);
                        this.setState({ SelectedOption: aa });
                    }
                    else {
                        this.setState({ ListOption: listoption });
                    }
                    //  console.log("this.props.isautoloaditemfromcachess: ",this.props.loaditemcachekeyid, this.state.Listoption);
                });
            }

        }
        else {
            //console.log("this.props.isautoloaditemfromcache1: ",this.props.loaditemcachekeyid, this.state.Listoption);
            this.setState({ ListOption: listoption });
            const aa = this.bindcombox(this.props.value, listoption);
            this.setState({ SelectedOption: aa });
        }
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
    handleValueChange(selectedOption) {
        const comboValues = this.getComboValue(selectedOption);
        if (this.props.onValueChange)
            this.props.onValueChange(this.props.name, comboValues, this.props.filterrest);
    }
    componentWillReceiveProps(nextProps) {

        if (JSON.stringify(this.props.filterValue) !== JSON.stringify(nextProps.filterValue)) // Check if it's a new user, you can also use some unique property, like the ID
        {
            let { filterobj, ValueMember, NameMember } = this.props;
            if (typeof filterobj != undefined) {
                let listoptionnew = [{ value: -1, label: this.props.placeholder }];
                //  console.log(filterobj,this.state.Data.filter(n => n[filterobj] == nextProps.filterValue))
                this.state.Data.filter(n => n[filterobj] == nextProps.filterValue).map((cacheItem) => {
                    listoptionnew.push({ value: cacheItem[ValueMember], label: cacheItem[ValueMember] + " - " + cacheItem[NameMember] });
                }
                );
                this.setState({ ListOption: listoptionnew });
            }

        }
        if (JSON.stringify(this.props.value) !== JSON.stringify(nextProps.value)) // Check if it's a new user, you can also use some unique property, like the ID
        {
            const aa = this.bindcombox(nextProps.value, this.state.ListOption);
            this.setState({ SelectedOption: aa });
        }
    }

    render() {
        let { name, label, colspan, isMultiSelect, ValidatonErrorMessage, placeholder, classNameCol } = this.props;
        let className = "select";
        let colspanClassName = "col-md-3";
        if (colspan) {
            if (classNameCol) {
                colspanClassName = "col-md-" + this.props.colspan + " " + classNameCol;
            }
            else {
                colspanClassName = "col-md-" + this.props.colspan;
            }
        }
        let labeldiv;
        if (label) {
            labeldiv = <label className="col-form-label" htmlFor="input-normal">{label}</label>;
        }

        if (ValidatonErrorMessage && ValidatonErrorMessage != "") {

            className += " is-invalid";
        }
        const selectedOption = this.state.SelectedOption;
        // console.log("ListOption",this.state.ListOption, selectedOption)
        return (
            <div className={colspanClassName}  >
                <div className="form-group form-group-input form-group-input-select">
                    {labeldiv}
                    <Select
                        value={selectedOption}
                        name={name}
                        ref={this.props.inputRef}
                        onChange={this.handleValueChange}
                        options={this.state.ListOption}
                        isMulti={isMultiSelect}
                        isSearchable={true}
                        placeholder={placeholder}
                        className={className}
                    />
                    <div className="invalid-feedback">{ValidatonErrorMessage}</div>
                </div>
            </div>
        );
    }
}

const ElementComboBoxByCompany = connect(null, mapDispatchToProps)(ElementComboBoxByCompanyCom);

class ProductComboBoxCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleValueonKeyDown = this.handleValueonKeyDown.bind(this);
        this.state = { ListOption: [], SelectedOption: [] }
    }

    componentDidMount() {
        let selectedOption = [];
        let values = this.props.value;
        if (values && !Array.isArray(values)) {
            selectedOption = this.callSearchData(values.trim(), true);
        }
    }

    bindData() {
        let values = this.props.value;
        let selectedOption = [];
        if (values && !Array.isArray(values)) {
            selectedOption = this.state.SelectedOption;
        }
        else if (typeof values != "undefined" && values != []) {
            for (let i = 0; i < values.length; i++) {
                selectedOption.push({ value: values[i].ProductID, label: values[i].ProductName });
            }
        }
        return selectedOption;
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
            let listOptionNew = [{ value: null, label: "------ Ch???n ------" }];
            let selectedOption = [];

            for (let i = 0; i < apiResult.ResultObject.length; i++) {
                listOptionNew.push({ value: apiResult.ResultObject[i].ProductID, label: apiResult.ResultObject[i].ProductName });
                selectedOption.push({ value: apiResult.ResultObject[i].ProductID, label: apiResult.ResultObject[i].ProductName });
            }

            // if (!isFirstLoad) {
            //     listOptionNew.unshift({ value: null, label: "------ Ch???n ------" });
            // }

            this.setState({
                ListOption: listOptionNew,
                SelectedOption: isFirstLoad ? selectedOption : []
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
        let comboValues = [];
        if (Array.isArray(selectedOption)) {
            comboValues = this.getComboValue(selectedOption);
        } else if (selectedOption == null) {
            comboValues.push({ ProductID: -1, ProductName: '------ Ch???n ------' });
        } else {
            comboValues.push({ ProductID: selectedOption.value, ProductName: selectedOption.label });
        }

        if (this.props.onValueChange)
            this.props.onValueChange(this.props.name, comboValues);


    }

    handleValueonKeyDown(e) {
        let value = e.target.value;
        if (value.length > 2 && e.keyCode != 40 && e.keyCode != 38) {
            this.callSearchData(value);
        }
    }
    render() {

        const listOption = this.state.ListOption;
        const selectedOption = this.bindData();
        let formRowClassName = "form-row";
        if (this.props.rowspan)
            formRowClassName = "form-row col-md-" + this.props.rowspan;
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
        let isLabelDiv = true;
        if (typeof this.props.IsLabelDiv !== 'undefined' || typeof this.props.IsLabelDiv !== null)
            isLabelDiv = this.props.IsLabelDiv;
        if (isLabelDiv == false)
            formGroupClassName = "form-group col-md-12";
        let star;
        if (this.props.validatonList != undefined && this.props.validatonList.includes("Comborequired") == true) {
            star = '*'
        }
        let classNameselect = "react-select";
        if (this.props.validationErrorMessage != undefined && this.props.validationErrorMessage != "") {
            classNameselect += " is-invalid";
        }

        let disabled = this.props.IsSystem ? this.props.IsSystem : this.props.disabled;
        return (
            <div className={formRowClassName} >
                {isLabelDiv &&
                    // <div className={labelDivClassName}>
                    <label className="col-form-label 6">
                        {this.props.label}<span className="text-danger"> {star}</span>
                    </label>
                    // </div> 
                }
                <div className={formGroupClassName}>
                    <Select
                        name={this.props.name}
                        value={selectedOption}
                        onChange={this.handleValueChange}
                        onKeyDown={this.handleValueonKeyDown}
                        options={listOption}
                        isMulti={this.props.isMulti !== undefined ? this.props.isMulti : true}
                        isDisabled={disabled}
                        isSearchable={true}
                        placeholder={"Nh???p m?? s???n ph???m"}
                        className={classNameselect}
                    />
                    <div className="invalid-feedback"><ul className="list-unstyled"><li>{this.props.validationErrorMessage}</li></ul></div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        AppInfo: state,
        FetchAPIInfo: state.FetchAPIInfo
    };
};
const ProductComboBox = connect(mapStateToProps, mapDispatchToProps)(ProductComboBoxCom);

class ElementTextdropdownNewCom extends Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);

    }
    handleValueChange(e) {
        e.preventDefault();

        if (this.props.onValueChange != null)
            this.props.onValueChange(e.target.name, e.target.value);
    }

    handleClick(e) {
        e.preventDefault();
        if (this.props.onValueChange != null)
            this.props.onValueChange(e.target.name, e.currentTarget.dataset.option);
    }

    render() {
        let { name, label, placeholder, colspan, value, readonly, ValidatonErrorMessage, nameOption, valuenameOption, listoption, classNameCol } = this.props;
        let className = "form-control form-control-sm txtKeyword";
        let colspanClassName = "col-md-3";
        if (colspan) {
            if (classNameCol) {
                colspanClassName = "col-md-" + this.props.colspan + " " + classNameCol;
            }
            else {
                colspanClassName = "col-md-" + this.props.colspan;
            }
        }
        let labeldiv;
        if (label) {
            labeldiv = <label className="col-form-label" htmlFor="input-normal">{label}</label>;
        }
        if (ValidatonErrorMessage && ValidatonErrorMessage != "") {
            className += " is-invalid";
        }

        const dropdownItem = () => {
            return <Menu className={this.props.classNameDropdown != "" ? this.props.classNameDropdown : ""}>
                {listoption.map((optionItem) => <Menu.Item key={`menuItem${optionItem.value}`}>
                    <a className={optionItem.value.toString() === valuenameOption.toString() ? "dropdown-item active" : "dropdown-item"}
                        key={optionItem.value} name={nameOption} data-option={optionItem.value}
                        onClick={this.handleClick.bind(this)}>
                        {optionItem.label}
                    </a>
                </Menu.Item>)}
            </Menu>
        }
        return (
            <div className={colspanClassName}  >
                <div className="input-group">
                    {labeldiv}
                    <div className="group-text-select">
                        <input type="text"
                            className={className}
                            name={name}
                            onChange={this.handleValueChange}
                            readOnly={readonly}
                            defaultValue={value}
                            placeholder={placeholder} />
                        <div className="input-group-append">
                            <Dropdown overlay={dropdownItem} trigger={["click"]} >
                                <div className="btn dropdown-toggle">
                                    {listoption.filter(a => a.value.toString() === valuenameOption.toString())[0].label}
                                </div>
                            </Dropdown>
                        </div>
                        <div className="invalid-feedback">{ValidatonErrorMessage}</div>
                    </div>
                </div>
            </div>
        );
    }
}

const ElementTextdropdownNew = connect(null, null)(ElementTextdropdownNewCom);


class ElementTreeSelectCom extends Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);

        this.state = {
            ListOption: [],
            Data: [],
            SelectedOption: []
        }

    }

    bindcombox(value, listOption) {
        let values = value;
        let selectedOption = [];
        if (values == null || values === -1)
            return { value: -1, label: this.props.placeholder };
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
    componentDidMount() {
        let { listoption, IsAutoLoadItemFromCache, LoadItemCacheKeyID, ValueMember, NameMember, filterValue, filterobj } = this.props;
        // console.log("this.props.isautoloaditemfromcachess: ", this.props.isautoloaditemfromcache,this.props.loaditemcachekeyid,this.props.listoption)
        if (IsAutoLoadItemFromCache) {
            // console.log("ValueMember ", ValueMember, NameMember, this.props);

            if (this.props.isUsercache == true) {
                this.props.callGetUserCache(LoadItemCacheKeyID).then((result) => {
                    // console.log("this.props.isautoloaditemfromcach2: ", this.props.LoadItemCacheKeyID, this.state.Listoption, result);
                    // listoption = [{ value: -1, label: this.props.placeholder }];
                    listoption = []
                    if (!result.IsError && result.ResultObject.CacheData != null) {
                        result.ResultObject.CacheData.map((cacheItem) => {
                            listoption.push({ value: cacheItem[ValueMember], label: cacheItem[ValueMember] + " - " + cacheItem[NameMember] });
                        }
                        );

                        this.setState({ ListOption: listoption });
                        const aa = this.bindcombox(this.props.value, listoption);
                        this.setState({ SelectedOption: aa });

                    }
                    else {
                        this.setState({ ListOption: listoption });

                    }
                    //  console.log("this.props.isautoloaditemfromcachess: ",this.props.loaditemcachekeyid, this.state.Listoption);
                });

            }
            else {
                this.props.callGetCache(LoadItemCacheKeyID).then((result) => {

                    // console.log("this.props.isautoloaditemfromcach2: ", result);
                    // listoption = [{ value: -1, label: this.props.placeholder }];
                    listoption = []
                    if (!result.IsError && result.ResultObject.CacheData != null) {
                        if (typeof filterobj != undefined) {
                            // console.log(filterobj,result.ResultObject.CacheData,result.ResultObject.CacheData.filter(n => n.filterobj == 1))
                            result.ResultObject.CacheData.filter(n => n[filterobj] == filterValue).map((cacheItem) => {
                                listoption.push({ value: cacheItem[ValueMember], label: cacheItem[ValueMember] + " - " + cacheItem[NameMember] });
                            }
                            );

                        }
                        else {
                            result.ResultObject.CacheData.map((cacheItem) => {
                                listoption.push({ value: cacheItem[ValueMember], label: cacheItem[ValueMember] + " - " + cacheItem[NameMember] });
                            }
                            );
                        }

                        this.setState({ ListOption: listoption, Data: result.ResultObject.CacheData });
                        const aa = this.bindcombox(this.props.value, listoption);
                        this.setState({ SelectedOption: aa });
                    }
                    else {
                        this.setState({ ListOption: listoption });
                    }
                    //  console.log("this.props.isautoloaditemfromcachess: ",this.props.loaditemcachekeyid, this.state.Listoption);
                });
            }

        }
        else {
            //console.log("this.props.isautoloaditemfromcache1: ",this.props.loaditemcachekeyid, this.state.Listoption);
            this.setState({ ListOption: listoption });
            const aa = this.bindcombox(this.props.value, listoption);
            this.setState({ SelectedOption: aa });
        }
    }



    getComboValue(selectedOption) {
        let result = "";
        if (selectedOption != -1 && selectedOption != null && selectedOption != "") {
            result = selectedOption.reduce((data, item) => {
                const comma = data.length ? "," : "";
                return data + comma + item;
            }, '');
        }
        return result;
    }

    handleValueChange(selectedOption) {

        let comboValues = [];
        if (Array.isArray(selectedOption)) {
            comboValues = this.getComboValue(selectedOption);
        }
        if (this.props.onValueChange)
            this.props.onValueChange(this.props.name, comboValues, this.props.filterrest);
    }

    componentWillReceiveProps(nextProps) {

        if (JSON.stringify(this.props.filterValue) !== JSON.stringify(nextProps.filterValue)) // Check if it's a new user, you can also use some unique property, like the ID
        {
            let { filterobj, ValueMember, NameMember } = this.props;
            if (typeof filterobj != undefined) {
                let listoptionnew = [{ value: -1, label: this.props.placeholder }];
                //  console.log(filterobj,this.state.Data.filter(n => n[filterobj] == nextProps.filterValue))
                this.state.Data.filter(n => n[filterobj] == nextProps.filterValue).map((cacheItem) => {
                    listoptionnew.push({ value: cacheItem[ValueMember], label: cacheItem[ValueMember] + " - " + cacheItem[NameMember] });
                }
                );
                this.setState({ ListOption: listoptionnew });
            }

        }
        if (JSON.stringify(this.props.value) !== JSON.stringify(nextProps.value)) // Check if it's a new user, you can also use some unique property, like the ID
        {
            const aa = this.bindcombox(nextProps.value, this.state.ListOption);
            this.setState({ SelectedOption: aa });
        }
    }

    render() {
        let { label, colspan, ValidatonErrorMessage, placeholder, classNameCol, maxTagCount } = this.props;
        let className = "select";
        let colspanClassName = "col-md-3";
        if (colspan) {
            if (classNameCol) {
                colspanClassName = "col-md-" + this.props.colspan + " " + classNameCol;
            }
            else {
                colspanClassName = "col-md-" + this.props.colspan;
            }
        }
        let labeldiv;
        if (label) {
            labeldiv = <label className="col-form-label" htmlFor="input-normal">{label}</label>;
        }

        if (ValidatonErrorMessage && ValidatonErrorMessage != "") {

            className += " is-invalid";
        }

        const tProps = {
            treeData: this.state.ListOption,
            value: this.state.SelectedOption,
            onChange: this.handleValueChange,
            treeCheckable: true,
            showCheckedStrategy: SHOW_PARENT,
            maxTagCount: maxTagCount,
            placeholder: placeholder,
            style: {
                width: '100%',
            },
            filterTreeNode: (search, item) => {
                try{
                    if(item.title){
                        return item.title.toLowerCase().indexOf(search.toLowerCase()) >= 0;
                    }
                    else{
                        return item.label.toLowerCase().indexOf(search.toLowerCase()) >= 0;
                    }
                }catch (error) {
                    console.log(error)
                    return false;
                }
            }
        };

        return (
            <div className={colspanClassName}  >
                <div className="form-group form-group-input form-group-input-select">
                    {labeldiv}
                    <TreeSelect {...tProps} />
                    <div className="invalid-feedback">{ValidatonErrorMessage}</div>
                </div>
            </div>
        );
    }
}

const ElementTreeSelect = connect(null, mapDispatchToProps)(ElementTreeSelectCom);


export default {
    ElementCheckbox,
    ElementCheckLDivbox,
    ElementComboBox,
    ElementComboBoxNewMID,
    ElementComboBoxByCompany,
    ElementComboBoxFilterTwoCondition,
    ElementComboBoxNew,
    ElementComboBoxNewChange,
    ElementDatetime,
    ElementDatetimeFromTo,
    ElementDatetimeMonthYear,
    ElementText,
    ElementTextdropdown,
    ElementTextdropdownNew,
    ElementTextNew,
    ElementTextNewFull,
    ElementTreeSelect,
    MultiSelectUserComboBox,
    ProductComboBox,
};

