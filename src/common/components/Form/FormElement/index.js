import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ValidationField } from "../../../library/validation.js";
import { callGetCache } from "../../../../actions/cacheAction";
import { UploadModal } from "../../UploadModal/index";
import { ModalManager } from 'react-dynamic-modal';
import Datetime from 'react-datetime';
import MultiSelectComboBox from "../AdvanceForm/FormControl/MultiSelectComboBox";
import "../../../../../node_modules/react-datetime/css/react-datetime.css";
import JoditEditor from "jodit-react";


const singleFileUploadImage = {
    maxWidth: "100px",
    minWidth: "100px",
    minHeight: "50px",
    marginRight: "20px"
};

const singleFileUploadDeletebtn = {
    fontSize: "37px",
    color: "red",
    cursor: "pointer",
    marginRight: "10px"
};

const cssDisabled = {
    disabled: "disabled"
}
class FormElementCom extends Component {
    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.showUploadModal = this.showUploadModal.bind(this);
        this.handleSelectedFile = this.handleSelectedFile.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleMultiSelectChange = this.handleMultiSelectChange.bind(this);
        this.resetFile = this.resetFile.bind(this);
        this.state = {
            value: this.props.value,
            ValidationError: "",
            Listoption: [],
            IsDisabled: false,
            src: this.props.cdn + this.props.value,
            content: "",
            acceptType: "image/*",
            defaultImage: "/src/img/avatar/noimage.gif"
        };
    }

    componentDidMount() {
        if (this.props.type == "Editor") {
            this.setState({
                content: this.props.value
            })
        }
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


        //singlefileupload
        if (!this.props.value || this.state.src == "" || this.state.src == NaN) {
            this.setState({ src: this.state.defaultImage });
        }

        //console.log("FormElement: ", this.props)
        if (this.props.type == "select" || this.props.type == "multiselect" || this.props.type == "groupTextAndSelect") {
            let listOption = this.props.listoption;
            if (this.props.IsAutoLoadItemFromCache) {
                const cacheKeyID = this.props.LoadItemCacheKeyID;
                const valueMember = this.props.ValueMember;
                const nameMember = this.props.NameMember;
                const keyFilter = this.props.KeyFilter;
                const valueFilter = this.props.ValueFilter;
                this.props.callGetCache(cacheKeyID).then((result) => {
                    //console.log("FormElement callGetCache: ", result)
                    listOption = [{ value: -1, label: "--Vui lòng chọn--" }];
                    if (!result.IsError && result.ResultObject.CacheData != null) {
                        //console.log("FormElement listOption: ", listOption)
                        result.ResultObject.CacheData.map((cacheItem) => {
                            listOption.push({ value: cacheItem[valueMember], label: cacheItem[nameMember], name: cacheItem[nameMember] });
                        });
                    }
                    else {
                        console.log("ghi log cache lỗi", cacheKeyID);
                    }
                    this.setState({ Listoption: listOption });
                });
            }
            else {
                this.setState({ Listoption: listOption });
            }
            //console.log("FormElement listOption 2: ", listOption)

        }




    }
    componentWillReceiveProps(nextProps) {
        //console.log("FormElement componentWillReceiveProps:", nextProps);
        //this.setState({value: this.props.value});
        if (nextProps.type == "select") {
            //console.log("FormElement componentWillReceiveProps:", nextProps);
            let listOption = nextProps.listoption;
            this.setState({ Listoption: listOption });
        }
    }

    onChangeEditor() {
        //console.log("FormElement componentWillReceiveProps:", this.props);
        //this.setState({value: this.props.value});
    }
    onChangeEditor = editorState => {
        //console.log("editorState", editorState);
        this.props.onValueChange(this.props.name, editorState, false, "");

    };

    handleInputChange(e) {
        let inputvalue = e.target.type == 'checkbox' ? e.target.checked : e.target.value;
        const inputname = e.target.name;
        if (this.props.type == 'numeric') {
            inputvalue = this.formatNumeric(inputvalue);
        }
        this.validateInput(inputname, inputvalue)
    }

    handleDateTimeChange(inputname, moment) {
        this.validateInput(inputname, moment ? moment._d : null);
    }

    handleMultiSelectChange(name, comboValues) {
        if (this.props.onValueChange)
            this.props.onValueChange(name, comboValues);
    }

    validateInput(inputname, inputvalue) {
        let isVavalidatonError = false;
        let validationErrorMessage = "";
        if (this.props.validatonList != null) {
            if (this.props.validatonList.length > 0) {
                const validation = ValidationField(this.props.validatonList, inputvalue, this.props.label, this.props.elementItem)
                if (validation.IsError) {
                    this.setState({ ValidationError: validation.Message });
                    isVavalidatonError = true;
                    validationErrorMessage = validation.Message;
                    //e.target.focus();
                }
                else {
                    this.setState({ ValidationError: "" });
                }
                inputvalue = validation.fieldValue;
            }
        }
        this.props.onValueChange(inputname, inputvalue, isVavalidatonError, validationErrorMessage);
    }
    showUploadModal() {
        ModalManager.open(<UploadModal title="Upload File"
            onRequestClose={() => true}
            accept={this.props.accept}
            multiple={this.props.multiple}
            disabled={this.props.disabled}
            maxSize={this.props.maxSize}
            minSize={this.props.minSize}
        />);
    }

    handleSelectedFile(event) {
        if (this.props.onHandleSelectedFile != null) {
            this.props.onHandleSelectedFile(event.target.files[0], this.props.NameMember, false);
            this.setState({ value: event.target.files[0].name, src: URL.createObjectURL(event.target.files[0]) });
            //console.log("selipfile", event.target.files[0]);
        }
    }

    formatNumeric(value) {
        value = value.replace(/\D/g, '');
        if (isNaN(value)) {
            value = 0;
        }
        return parseInt(value);
    }

    resetFile() {
        let id = this.props.name;
        document.getElementById(id).value = "";
        this.props.onHandleSelectedFile(null, this.props.NameMember, true);

        this.setState({
            src: this.state.defaultImage,
            value: "",
        });
    }
    config = {
        readonly: false,
        uploader: {
            insertImageAsBase64URI: true
        }
    }

    handleUpload() {
        this.props.onHandleUpload();
    }
    render() {
        const type = this.props.type;
        const icon = this.props.icon;
        var checked = false;
        if (this.props.checked)
            checked = true;

        let formGroupclassName = "form-group col-md-4";
        if (this.props.IsThreeColumnForm) {
            let formGroupclassName = "form-group col-md-2";
        }
        let controlCSSClassName = this.props.CSSClassName;
        if (this.props.validationErrorMessage != null) {
            if (this.props.validationErrorMessage.length > 0) {
                formGroupclassName += " has-error has-danger";
                controlCSSClassName += " is-invalid";
            }
        }
        let star;
        if (this.props.validatonList != undefined && this.props.validatonList.includes("required") == true) {
            star = '*'
        }


        let control;
        switch (type) {
            case 'groupTextAndSelect':
                control = (
                    <div className="group-text-select">
                        <input className={controlCSSClassName + " txtKeyword"}
                            name={this.props.name}
                            type="text"
                            placeholder={this.props.placeholder}
                            defaultValue={this.props.value}
                            onChange={this.handleInputChange}
                            readOnly={this.props.readonly}
                            disabled={this.state.IsDisabled} />

                        <select className={this.props.CSSClassName + " cboption"}
                            name={this.props.nameOption}
                            onChange={this.handleInputChange}
                            value={this.props.valueOption}
                            disabled={this.state.IsDisabled}>
                            {this.state.Listoption && this.state.Listoption.map((optionItem) =>
                                <option value={optionItem.value} key={optionItem.value} >{optionItem.label}</option>
                            )}
                        </select>
                    </div>
                )
                break;
            case "textarea":
                control = <textarea className={this.props.CSSClassName} rows={this.props.rows} name={this.props.name} ref={this.props.inputRef} placeholder={this.props.placeholder} defaultValue={this.props.value} onChange={this.handleInputChange} readOnly={this.props.readonly} disabled={this.state.IsDisabled} maxLength={this.props.maxSize} />;
                break;
            case "select":
                let disabled = this.state.IsDisabled;
                if (!disabled) {
                    if (typeof this.props.disabled !== "undefined" && this.props.disabled == true) {
                        disabled = this.props.disabled;
                    }
                }

                control = (
                    <select className={controlCSSClassName} name={this.props.name} ref={this.props.inputRef} onChange={this.handleInputChange} value={this.props.value} disabled={disabled}>
                        {this.state.Listoption && this.state.Listoption.map((optionItem) =>
                            <option value={optionItem.value} key={optionItem.value} >{optionItem.label}</option>
                        )}
                    </select>
                );

                break;
            case "multiselect":

                control = (
                    <MultiSelectComboBox
                        className={this.props.CSSClassName}
                        name={this.props.name}
                        onChange={this.handleInputChange}
                        value={this.props.value}
                        disabled={this.state.IsDisabled}
                        colspan={this.props.colspan}
                        labelcolspan={this.props.labelcolspan}
                        controltype={this.props.controltype}
                        listoption={this.state.Listoption}
                        IsLabelDiv={false}
                        onValueChange={this.handleMultiSelectChange}
                    />
                );

                break;
            case "radiogroup":
                const listValue = this.props.listoption;
                control = (<div>
                    {listValue.map((valueItem) =>
                        <div>
                            <input className={this.props.CSSClassName} name={this.props.name} type="radio" value={valueItem.value} key={valueItem.value} onChange={this.handleInputChange} />
                            {valueItem.name}
                        </div>
                    )}
                </div>
                );
                break;
            case "checkbox":
                control = (
                    <div className="checkbox">
                        <label>
                            <input name={this.props.name} type={this.props.type} defaultChecked={this.props.value} onChange={this.handleInputChange} readOnly={this.props.readonly} disabled={this.state.IsDisabled} />
                            <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                        </label>
                    </div>
                );
                break;
            case "radio":
                control = <input className={this.props.CSSClassName} name={this.props.name} type={this.props.type} defaultValue={this.props.value} checked={this.props.value} onChange={this.handleInputChange} readOnly={this.props.readonly} />;
                break;
            case "text":
                control = <input className={controlCSSClassName} name={this.props.name} ref={this.props.inputRef} type={this.props.type} placeholder={this.props.placeholder} defaultValue={this.props.value} onChange={this.handleInputChange} readOnly={this.props.readonly} disabled={this.state.IsDisabled} maxLength={this.props.maxSize} />;
                break;
            case "textType":
                control = <input className={controlCSSClassName} name={this.props.name} type={this.props.type} type="text" placeholder={this.props.placeholder} defaultValue={this.props.value} onChange={this.handleInputChange} readOnly={this.props.readonly} disabled={this.state.IsDisabled} />;
                break;
            case "number":
                control = (
                    <input className={controlCSSClassName} name={this.props.name} type={this.props.type} placeholder={this.props.placeholder}
                        defaultValue={this.props.value} onChange={this.handleInputChange}
                        readOnly={this.props.readonly} disabled={this.state.IsDisabled}
                        min={this.props.min} max={this.props.max}
                    />
                );
                break;
            case "numeric":
                let valueFormat = this.props.value ? Number(this.props.value).toLocaleString() : 0;
                control = <input className={controlCSSClassName} name={this.props.name} ref={this.props.inputRef} value={valueFormat} type="text" placeholder={this.props.placeholder} onChange={this.handleInputChange} readOnly={this.props.readonly} disabled={this.state.IsDisabled} maxLength={this.props.maxSize} onKeyUp={(e) => { e.target.value = Number(this.formatNumeric(e.target.value)).toLocaleString() }} />;
                break;
            case "file":
                const CSSClassName = this.props.CSSClassName + "btn btn-bold btn-pure btn-primary"
                control = <button className={CSSClassName} type="button" onClick={this.showUploadModal}>{this.props.label}</button>
                break;
            case "singleFileUpload":
                control = (
                    <div className="input-group file-group">
                        {/* <input type="text" className="form-control file-value" value={this.state.value} placeholder="Choose file..." readOnly /> */}
                        <img src={this.state.src} alt="No image" style={singleFileUploadImage} />
                        <input type="file" id={this.props.name} onChange={this.handleSelectedFile} accept={this.state.acceptType} disabled={this.state.IsDisabled} />
                        {this.state.value != null && this.state.value != "" ? <i className="fa fa-remove" style={singleFileUploadDeletebtn} onClick={this.resetFile}></i> : ""}
                        <span className="input-group-append" >
                            <label className="btn btn-light file-browser" htmlFor={this.props.name} >
                                <i className="fa fa-upload"></i>
                            </label>
                        </span>
                    </div>
                );
                break;
            case "browser":
                control = (
                    <div className="input-group file-group">
                        <input type="text" className="form-control file-value" value={this.props.value} placeholder="Choose file..." readOnly />
                        <input type="file" multiple id={this.props.name} onChange={this.handleSelectedFile} accept={this.props.acceptType} />
                        <span className="input-group-append" >
                            <label className="btn btn-light file-browser" htmlFor={this.props.name} >
                                <i className="fa fa-upload"></i>
                            </label>
                        </span>
                    </div>
                );
                break;
            case "Editor":
                control = (
                    <JoditEditor
                        ref={null}
                        value={this.state.content}
                        config={this.config}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={this.onChangeEditor.bind(this)}
                        onChange={this.onChangeEditor.bind(this)}
                    />
                );
                break;
            case 'datetime':
                const defaultDate = new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear();
                const valueDate = new Date(this.props.value).getDate() + '/' + (new Date(this.props.value).getMonth() + 1) + '/' + new Date(this.props.value).getFullYear();
                control = <Datetime dateFormat="DD/MM/YYYY" timeFormat={false} defaultValue={defaultDate} value={this.props.value ? valueDate : defaultDate} readOnly={this.props.readonly} name={this.props.name} type={this.props.type} className={this.state.IsDisabled ? "de-active" : ""} onChange={(moment) => this.handleDateTimeChange(this.props.name, moment)}></Datetime>
                break;
            case 'date':
                control = <Datetime timeFormat={false} dateFormat="DD/MM/YYYY" value={this.props.value} readOnly={this.props.readonly} name={this.props.name} type={this.props.type} className={CSSClassName} onChange={(moment) => this.handleDateTimeChange(this.props.name, moment)}></Datetime>
                break;
            default:
                control = <input className={controlCSSClassName} name={this.props.name} type={this.props.type} placeholder={this.props.placeholder} defaultValue={this.props.value} onChange={this.handleInputChange} readOnly={this.props.readonly} />;
                break;
        }

        let divControl = (
            <React.Fragment>
                <div className="form-group col-md-2">
                    <label className="col-form-label 11">
                        {this.props.label}<span className="text-danger"> {star}</span>
                    </label>
                </div>
                <div className={formGroupclassName}>
                    {control}
                    <div className="invalid-feedback">
                        <ul className="list-unstyled"><li>{this.props.validationErrorMessage}</li></ul>
                    </div>
                </div>

            </React.Fragment>
        );
        if (this.props.IsSearchForm && this.props.type != "textType") {
            divControl = (
                <div className="input-group">
                    <label className="col-form-label">{this.props.label}</label>
                    {control}
                </div>
            );
        }
        if (this.props.IsSearchForm && this.props.type == "textType") {
            divControl = (
                <div className="input-group">
                    {control}
                </div>
            );
        }
        if (this.props.IsSearchForm && this.props.type == "groupTextAndSelect") {
            divControl = (
                <div className="input-group">
                    {control}
                </div>
            );
        }

        if (this.props.IsModalForm) {
            formGroupclassName = "form-group col-md-9";
            controlCSSClassName = this.props.CSSClassName;
            if (this.props.validationErrorMessage != null) {
                if (this.props.validationErrorMessage.length > 0) {
                    formGroupclassName += " has-error has-danger";
                    controlCSSClassName += " is-invalid";
                }
            }
            divControl = (
                <React.Fragment>
                    <div className="form-group col-md-3">
                        <label className="col-form-label modal-label-left">{this.props.label}:</label>
                    </div>
                    <div className={formGroupclassName}>
                        {control}
                        <div className="invalid-feedback">
                            <ul className="list-unstyled"><li>{this.props.validationErrorMessage}</li></ul>
                        </div>
                    </div>

                </React.Fragment>
            );
        }
        return divControl;
    }
}


const mapStateToProps = state => {
    return {
        AppInfo: state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        }
    }
}


const FormElement = connect(mapStateToProps, mapDispatchToProps)(FormElementCom);
export default FormElement;