import React, { Component, PropTypes } from 'react';
import ElementSearch from '../FormElement/ElementSearch';
import { ValidationField } from "../../../library/validation";

export default class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.onValueChange = this.onValueChange.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        const formDataContol = this.bindDataContol();
        this.elementItemRefs = [];
        this.state = { FormData: formDataContol };
    }

    bindDataContol() {

        let formData = {};
        const listElement = this.props.listelement;
        listElement.map((elementItem) => {
            const elementname = elementItem.name;
            if (elementItem.nameOption != null && elementItem.nameOption !== undefined) {
                const ObjectName = { Name: elementname, value: elementItem.value, Controltype: elementItem.type, label: elementItem.label, ErrorLst: [], validatonList: elementItem.validatonList };
                formData = Object.assign({}, formData, { [elementname]: ObjectName });
                const ObjectNameOption = { Name: elementItem.nameOption, value: elementItem.valueOption, Controltype: "", label: "", ErrorLst: [], validatonList: undefined };
                formData = Object.assign({}, formData, { [elementItem.nameOption]: ObjectNameOption });
            }
            else {
                const ObjectName = { Name: elementname, value: elementItem.value, Controltype: elementItem.type, label: elementItem.label, ErrorLst: [], validatonList: elementItem.validatonList };
                formData = Object.assign({}, formData, { [elementname]: ObjectName });
            }
        });
        return formData;
    }

    onValueChange(elementname, elementvalue) {
        const FormDataContolLstd = this.state.FormData;
        FormDataContolLstd[elementname].value = elementvalue;
        if (typeof FormDataContolLstd[elementname].validatonList != "undefined") {
            const validation = ValidationField(FormDataContolLstd[elementname].validatonList, elementvalue, FormDataContolLstd[elementname].label);
            const validationObject = { IsValidatonError: validation.IsError, ValidatonErrorMessage: validation.Message };
            FormDataContolLstd[elementname].ErrorLst = validationObject;
        }
        this.setState({
            FormData: FormDataContolLstd,
        });
    }

    validationFormNew() {
        const FormDataContolLst = this.state.FormData;
        for (const key in FormDataContolLst) {

            if (typeof FormDataContolLst[key].validatonList != "undefined") {
                const validation = ValidationField(FormDataContolLst[key].validatonList, FormDataContolLst[key].value, FormDataContolLst[key].label);
                //  console.log("validation:",validation);
                const validationObject = { IsValidatonError: validation.IsError, ValidatonErrorMessage: validation.Message };
                FormDataContolLst[key].ErrorLst = validationObject;
                //  console.log("FormDataContolLst:", key, FormDataContolLst[key], FormDataContolLst,validation);
            }

        }


        this.setState({
            FormData: FormDataContolLst
        });

        return FormDataContolLst;
    }

    checkInputName(formValidation) {
        for (const key in formValidation) {
            //  console.log("validation:",formValidation[key].ErrorLst,formValidation[key].ErrorLst.IsValidatonError);
            if (formValidation[key].ErrorLst != [] && formValidation[key].ErrorLst.IsValidatonError) {
                this.elementItemRefs[key].focus();
                return key;
            }
        }
        return "";
    }

    handleSearchSubmit(event) {
        event.preventDefault();
        const formValidation = this.validationFormNew();
        if (this.checkInputName(formValidation) != "")
            return;

        let MLObject = {};
        const mLObjectDefinition = this.props.MLObjectDefinition;
        mLObjectDefinition.map((Item) => {
            const controlName = Item.BindControlName;

            if (controlName.length > 0) {
                MLObject = Object.assign({}, MLObject, { [Item.Name]: this.state.FormData[controlName].value });
            }
        });
        if (this.props.onSubmit != null) {
            this.props.onSubmit(this.state.FormData, MLObject);
        }
    }

    changeLoadComplete() {
    }

    renderSearchForm() {
        const listElement = this.props.listelement;
        let cssSearchButton = "";
        return (
            <div className="row">
                {
                    listElement.map((elementItem, index) => {
                        switch (elementItem.type) {
                            case "text":
                                return (
                                    <ElementSearch.ElementText
                                        onValueChange={this.onValueChange}
                                        value={this.state.FormData[elementItem.name].value}
                                        ValidatonErrorMessage={this.state.FormData[elementItem.name].ErrorLst.ValidatonErrorMessage}
                                        inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                                        {...elementItem}
                                        key={index}
                                    />
                                );
                            case "textdropdown":
                                return (
                                    <ElementSearch.ElementTextdropdown
                                        onValueChange={this.onValueChange}
                                        value={this.state.FormData[elementItem.name].value}
                                        valuenameOption={this.state.FormData[elementItem.nameOption].value}
                                        ValidatonErrorMessage={this.state.FormData[elementItem.name].ErrorLst.ValidatonErrorMessage}
                                        inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                                        {...elementItem}
                                        key={index}
                                    />
                                );
                            case "checkbox":
                                return (
                                    <ElementSearch.ElementCheckbox
                                        onValueChange={this.onValueChange}
                                        value={this.state.FormData[elementItem.name].value}
                                        inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                                        {...elementItem}
                                        key={index}
                                    />
                                );
                            case "ComboBox":
                                return (
                                    <ElementSearch.ElementComboBox
                                        onValueChange={this.onValueChange}
                                        value={this.state.FormData[elementItem.name].value}
                                        ValidatonErrorMessage={this.state.FormData[elementItem.name].ErrorLst.ValidatonErrorMessage}
                                        inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                                        {...elementItem}
                                        key={index}
                                    />
                                );
                            case "Datetime":
                                return (
                                    <ElementSearch.ElementDatetime
                                        onValueChange={this.onValueChange}
                                        value={this.state.FormData[elementItem.name].value}
                                        ValidatonErrorMessage={this.state.FormData[elementItem.name].ErrorLst.ValidatonErrorMessage}
                                        inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                                        {...elementItem}
                                        key={index}
                                    />
                                );
                            case "DatetimeFromTo":
                                return (
                                    <ElementSearch.ElementDatetimeFromTo
                                        onValueChange={this.onValueChange}
                                        value={this.state.FormData[elementItem.name].value}
                                        ValidatonErrorMessage={this.state.FormData[elementItem.name].ErrorLst.ValidatonErrorMessage}
                                        inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                                        {...elementItem}
                                        key={index}
                                    />
                                );
                            default:
                                break;
                        }
                    })
                }

                <div className="col-md-2 item">
                    <div className="btnSearch">
                        <button className="btn btn-primary" type="submit">
                            <span className="fa fa-search"> Tìm Kiếm</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        //this.renderTwoColumnForm();
        const listElement = this.props.listelement;
        let elmentRender = this.renderSearchForm();
        return (
            // <form action="" onSubmit={this.handleSearchSubmit}>
            //     {elmentRender}
            // </form>
            <div className="col-lg-12 SearchForm">
                <form className="card" action="" onSubmit={this.handleSearchSubmit}>
                    <div className="card-body">
                        {elmentRender}
                    </div>
                </form>
            </div>
        );
    }
}
