import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Datetime from 'react-datetime';
import Select from 'react-select';
import { callGetCache } from "../../../../actions/cacheAction";

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
        let { name, label, placeholder, icon, colspan, value, readonly, ValidatonErrorMessage } = this.props;
        let className = "form-control form-control-sm";
        let colspanClassName = "col-md-3";
        if (colspan) {
            colspanClassName = "col-md-" + this.props.colspan;
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
        let { name, label, placeholder, icon, colspan, value, readonly, ValidatonErrorMessage, nameOption, valuenameOption, listoption } = this.props;
        let className = "form-control form-control-sm txtKeyword";
        let colspanClassName = "col-md-3";
        if (colspan) {
            colspanClassName = "col-md-" + this.props.colspan;
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
        let { name, label, value, colspan } = this.props;
        let colspanClassName = "col-md-1";
        if (colspan) {
            colspanClassName = "col-md-" + this.props.colspan;
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
                <div class="form-group form-group-input">
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
        let { name, label, value, colspan } = this.props;
        let colspanClassName = "col-md-4";
        if (colspan) {
            colspanClassName = "col-md-" + this.props.colspan;
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

        this.state = { ListOption: [], SelectedOption: this.bindcombox() }

    }
    bindcombox() {
        let values = this.props.value;
        let selectedOption = [];
        if (values == null || values === -1)
            return selectedOption;
        if (typeof values.toString() == "string")
            values = values.toString().split();
        for (let i = 0; i < values.length; i++) {
            for (let j = 0; j < listOption.length; j++) {
                if (values[i] == listOption[j].value) {
                    selectedOption.push({ value: listOption[j].value, label: listOption[j].name });
                }
            }
        }
        return selectedOption;
    }
    componentDidMount() {
        let { listoption, IsAutoLoadItemFromCache, LoadItemCacheKeyID, ValueMember, NameMember } = this.props;
        // console.log("this.props.isautoloaditemfromcachess: ", this.props.isautoloaditemfromcache,this.props.loaditemcachekeyid,this.props.listoption)
        if (IsAutoLoadItemFromCache) {
            this.props.callGetCache(LoadItemCacheKeyID).then((result) => {
                //  console.log("this.props.isautoloaditemfromcach2: ",this.props.loaditemcachekeyid, this.state.Listoption);
                listoption = [{ value: -1, label: "--Vui lòng chọn--" }];
                if (!result.IsError && result.ResultObject.CacheData != null) {


                    result.ResultObject.CacheData.map((cacheItem) => {
                        listoption.push({ value: cacheItem[ValueMember], label: cacheItem[NameMember] });
                    }
                    );
                    this.setState({ ListOption: listoption });
                }
                else {
                    this.setState({ ListOption: listoption });
                }
                //  console.log("this.props.isautoloaditemfromcachess: ",this.props.loaditemcachekeyid, this.state.Listoption);
            });
        }
        else {
            //console.log("this.props.isautoloaditemfromcache1: ",this.props.loaditemcachekeyid, this.state.Listoption);
            this.setState({ ListOption: listoption });
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
        let { name, label, icon, colspan, isMultiSelect, ValidatonErrorMessage, placeholder } = this.props;
        let className = "select";
        let colspanClassName = "col-md-3";
        if (colspan) {
            colspanClassName = "col-md-" + this.props.colspan;
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
                        value={this.state.selectedOption}
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
        }
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
        let { listoption, IsAutoLoadItemFromCache, LoadItemCacheKeyID, ValueMember, NameMember,NameMemberop } = this.props;
        // console.log("this.props.isautoloaditemfromcachess: ", this.props.isautoloaditemfromcache,this.props.loaditemcachekeyid,this.props.listoption)
        if (IsAutoLoadItemFromCache) {
            this.props.callGetCache(LoadItemCacheKeyID).then((result) => {
                //  console.log("this.props.isautoloaditemfromcach2: ",this.props.loaditemcachekeyid, this.state.Listoption);
                listoption = [{ value: -1, label: "--Vui lòng chọn--" }];
                if (!result.IsError && result.ResultObject.CacheData != null) {


                    result.ResultObject.CacheData.filter(person => person[NameMemberop]===3).map((cacheItem) => {
                        listoption.push({ value: cacheItem[ValueMember], label: cacheItem[ValueMember] + "-" + cacheItem[NameMember] });
                    }
                    );
                    this.setState({ ListOption: listoption })
                    const selectedOption = this.bindcombox(this.state.ListOption);
                    this.setState({ SelectedOption: selectedOption });
                }
                else {
                    this.setState({ ListOption: listoption });
                }
                //  console.log("this.props.isautoloaditemfromcachess: ",this.props.loaditemcachekeyid, this.state.Listoption);
            });
        }
        else {
            //console.log("this.props.isautoloaditemfromcache1: ",this.props.loaditemcachekeyid, this.state.Listoption);
            this.setState({ ListOption: listoption });
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
        this.setState({ SelectedOption: selectedOption });
        if (this.props.onValueChange)
            this.props.onValueChange(this.props.name, comboValues);
    }

    render() {

        let { name, label, icon, colspan, isMultiSelect, validationErrorMessage, placeholder } = this.props;
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
            formGroupClassName = "form-group col-md-" + this.props.colspan;
        }

        if (validationErrorMessage && validationErrorMessage != "") {

            className += " is-invalid";
        }

        let star;
        if (this.props.validatonList != undefined && this.props.validatonList.includes("Comborequired") == true) {
            star = '*'
        }
        const selectedOption = this.state.SelectedOption;
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
        let { name, label, placeholder, icon, colspan, value, readonly, validationErrorMessage } = this.props;
        let className = "form-control form-control-sm";
        if (this.props.CSSClassName != null)
            className = this.props.CSSClassName;
        let formGroupClassName = "form-group col-md-2";
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
        let className = "";
        let colspanClassName = "col-md-3";
        if (colspan) {
            colspanClassName = "col-md-" + this.props.colspan;
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
        let { name, label, nameOption, valueOption, timeFormat, dateFormat, colspan, value, ValidatonErrorMessage } = this.props;
        let className = "";
        let colspanClassName = "col-md-4";
        if (colspan) {
            colspanClassName = "col-md-" + this.props.colspan;
        }
        let labeldiv;
        console.log("zzzz", label)
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

export default { ElementText, ElementTextdropdown, ElementCheckbox, ElementComboBox, ElementDatetime, ElementDatetimeFromTo, ElementCheckLDivbox, ElementComboBoxNew, ElementTextNew };

