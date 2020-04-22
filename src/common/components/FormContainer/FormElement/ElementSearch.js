import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Datetime from 'react-datetime';
import Select from 'react-select';

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
        let { Name, label, placeholder, icon, colspan, value, readonly, ValidatonErrorMessage } = this.props;
        let className = "form-control form-control-sm";
        let colspanClassName = "col-md-3";
        if (colspan) {
            colspanClassName = "col-md-" + this.props.colspan;
        }
        let labeldiv;
        if (label) {
            labeldiv = <label  className="col-form-label" htmlFor="input-normal">{label}</label>;
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
                        name={Name}
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
            labeldiv = <label  className="col-form-label" htmlFor="input-normal">{label}</label>;
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
        let { name, label, value ,colspan} = this.props;
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
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" id="search-avd" className="custom-control-input" defaultChecked />
                    {labeldiv}
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
        let { name, label, value ,colspan} = this.props;
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
    getComboValue(selectedOption) {
        let values = [];
        if (selectedOption == null)
            return -1;
        if (this.props.isMultiSelect) {
            for (let i = 0; i < selectedOption.length; i++) {
                values.push(selectedOption[i].value);
            }
        } else {
            return selectedOption;
        }

        return values;
    }
    handleValueChange(selectedOption) {
        const comboValues = this.getComboValue(selectedOption);
        if (this.props.onValueChange)
            this.props.onValueChange(this.props.name, comboValues);
    }
    render() {
        let { name, label, icon, colspan, isMultiSelect, ValidatonErrorMessage, listoption } = this.props;
        let className = "form-control";
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
                <div className="form-group form-group-input form-group-input-select">
                    <Select
                        value={this.state.selectedOption}
                        name={name}
                        onChange={this.handleValueChange}
                        options={listoption}
                        isMulti={isMultiSelect}
                        isSearchable={true}
                        placeholder={"----Chọn -----"}
                        className="select"
                    />
                </div>
            </div>
        );
    }
}
const ElementComboBox = connect(null, null)(ElementComboBoxCom);

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
        if (label) {
            labeldiv = <label  className="col-form-label" htmlFor="input-normal">{label}</label>;
        }
        if (ValidatonErrorMessage && ValidatonErrorMessage != "") {
            className += " is-invalid";
        }
        return (
            <div className={colspanClassName}  >
                <div className="input-group">
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
                </div>
            </div>
        );
    }
}
const ElementDatetimeFromTo = connect(null, null)(ElementDatetimeFromToCom);

export default { ElementText, ElementTextdropdown, ElementCheckbox, ElementComboBox, ElementDatetime, ElementDatetimeFromTo,ElementCheckLDivbox };

