import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Datetime from 'react-datetime';
import Select from 'react-select';
import { DatePicker } from 'antd';
import { callGetCache, callGetUserCache } from "../../../../actions/cacheAction";
import vi_VN from 'antd/es/date-picker/locale/vi_VN';
import moment from 'moment';
import { ExportStringToMonth } from "../../../../common/library/ultils";
import MultiSelectUserComboBox from "../FormControl/MultiSelectComboBox/MultiSelectUserComboBox";


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
        let { name, label, placeholder, icon, colspan, value, readonly, ValidatonErrorMessage, classNameCol } = this.props;
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
                    <input type="text"
                        className={className}
                        ref={this.props.inputRef}
                        name={name}
                        onChange={this.handleValueChange}
                        readOnly={readonly}
                        defaultValue={value}
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
        let { name, label, placeholder, icon, colspan, value, readonly, ValidatonErrorMessage, nameOption, valuenameOption, listoption, classNameCol } = this.props;
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
        e.preventDefault();
        if (this.props.onValueChange != null)
            this.props.onValueChange(e.target.name, e.target.value);
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
            labeldiv = <label className="custom-control-label" htmlFor="search-avd">{label}</label>;
        }
        return (
            <div className={colspanClassName}  >
                {/* <div className="custom-control custom-checkbox">
                    <input type="checkbox" id="search-avd" className="custom-control-input" defaultChecked />
                    {labeldiv}
                </div> */}
                <div className="form-group form-group-input">
                    <label>&nbsp;</label>
                    <div class="custom-control custom-checkbox">
                        <input type="checkbox" id="search-avd" className="custom-control-input" defaultChecked />
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
        let { name, label, value, colspan, classNameCol } = this.props;
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
        let { listoption, IsAutoLoadItemFromCache, LoadItemCacheKeyID, ValueMember, NameMember, filterName, filterValue, filterobj } = this.props;
        // console.log("this.props.isautoloaditemfromcachess: ", this.props.isautoloaditemfromcache,this.props.loaditemcachekeyid,this.props.listoption)
        if (IsAutoLoadItemFromCache) {
            // console.log("ValueMember ", ValueMember, NameMember, this.props);

            if (this.props.isUsercache == true) {
                this.props.callGetUserCache(LoadItemCacheKeyID).then((result) => {
                    // console.log("this.props.isautoloaditemfromcach2: ", this.props.LoadItemCacheKeyID, this.state.Listoption, result);
                    listoption = [{ value: -1, label: this.props.placeholder}];
                    if (!result.IsError && result.ResultObject.CacheData != null) {
                        result.ResultObject.CacheData.map((cacheItem) => {
                            listoption.push({ value: cacheItem[ValueMember],  label: cacheItem[ValueMember] + " - " + cacheItem[NameMember]});
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
            let { filterName, filterobj, ValueMember, NameMember } = this.props;
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
        let { name, label, icon, colspan, isMultiSelect, ValidatonErrorMessage, placeholder, classNameCol } = this.props;
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

const mapDispatchToProps = dispatch => {
    return {
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
        callGetUserCache: (cacheKeyID) => {
            return dispatch(callGetUserCache(cacheKeyID));
        },
    }
}
const ElementComboBox = connect(null, mapDispatchToProps)(ElementComboBoxCom);


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
        let { name, label, icon, colspan, isMultiSelect, validationErrorMessage, placeholder, classNameCol } = this.props;
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
        let { name, label, placeholder, icon, colspan, value, readonly, validationErrorMessage, classNameCol } = this.props;
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
        let { name, label, placeholder, icon, colspan, value, readonly, validationErrorMessage, classNameCol } = this.props;
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
        let { name, label, timeFormat, dateFormat, colspan, value, ValidatonErrorMessage, classNameCol } = this.props;
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
                            onChange={this.handleValueChange}
                            onChange={(moment) => this.handleValueChange(name, moment)}
                            defaultValue={value}
                            timeFormat={timeFormat}
                            dateFormat={dateFormat} >
                        </Datetime>
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
                                onChange={this.handleValueChange}
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
                                onChange={this.handleValueChange}
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
        const momentNew = ExportStringToMonth(moment)
        if (this.props.onValueChange != null)
            this.props.onValueChange(name, moment);
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
        return (
            <div className={colspanClassName}  >
                <div className="form-group form-group-input form-group-input-date">
                    {labeldiv}
                    <div className="input-group ">
                        <DatePicker
                            picker="month"
                            placeholder={this.props.placeholder}
                            className={className}
                            onChange={(moment)=>this.handleValueChange(name, moment)}
                            value={(value != '' && value != null) ? moment(value, 'YYYY-MM') : ''}
                            //value={value}
                            name={name}
                            format={format}
                            locale={vi_VN}
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
        let { listoption, IsAutoLoadItemFromCache, LoadItemCacheKeyID, ValueMember, NameMember, filterName, filterValue, filterobj } = this.props;
        // console.log("this.props.isautoloaditemfromcachess: ", this.props.isautoloaditemfromcache,this.props.loaditemcachekeyid,this.props.listoption)
        if (IsAutoLoadItemFromCache) {
            // console.log("ValueMember ", ValueMember, NameMember, this.props);

            if (this.props.isUsercache == true) {
                this.props.callGetUserCache(LoadItemCacheKeyID).then((result) => {
                    // console.log("this.props.isautoloaditemfromcach2: ", this.props.LoadItemCacheKeyID, this.state.Listoption, result);
                    listoption = [{ value: -1, label: this.props.placeholder}];
                    if (!result.IsError && result.ResultObject.CacheData != null) {
                        result.ResultObject.CacheData.map((cacheItem) => {
                            listoption.push({ value: cacheItem[ValueMember],  label: cacheItem[ValueMember] + " - " + cacheItem[NameMember]});
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
            let { filterName, filterobj, ValueMember, NameMember } = this.props;
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
        let { name, label, icon, colspan, isMultiSelect, ValidatonErrorMessage, placeholder, classNameCol } = this.props;
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

export default {
    ElementText,
    ElementTextdropdown,
    ElementCheckbox,
    ElementComboBox,
    ElementComboBoxByCompany,
    ElementDatetime,
    ElementDatetimeFromTo,
    ElementCheckLDivbox,
    ElementComboBoxNew,
    ElementTextNew,
    ElementTextNewFull,
    ElementDatetimeMonthYear,
    MultiSelectUserComboBox
};

