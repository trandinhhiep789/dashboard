import React, { Component, PropTypes } from 'react';
import ElementSearch from '../FormElement/ElementSearch';
import { ValidationField } from "../../../library/validation";
import MultiSelectUserComboBox from "../FormControl/MultiSelectComboBox/MultiSelectUserComboBox";
import ProductComboBox from "../FormControl/MultiSelectComboBox/ProductComboBox";
import MultiTreeSelect from '../FormControl/MultiSelectComboBox/MultiTreeSelect'
import MultiStoreSearchComboBox from '../FormControl/MultiSelectComboBox/MultiStoreSearchComboBox';
import ReactTooltip from 'react-tooltip';

import MultiTreeSelectByMGCOO from '../FormControl/MultiSelectComboBox/MultiTreeSelectByMGCOO'

class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.onValueChange = this.onValueChange.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        const formDataContol = this.bindDataContol();
        //console.log("formDataContol",formDataContol)
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

    onValueChange(elementname, elementvalue, filterrest) {

        const FormDataContolLstd = this.state.FormData;
        FormDataContolLstd[elementname].value = elementvalue;

        if (typeof filterrest != "undefined" && filterrest != "") {
            const objrest = filterrest.split(",");
            for (let i = 0; i < objrest.length; i++) {
                FormDataContolLstd[objrest[i]].value = -1;
            }
        }

        if (typeof FormDataContolLstd[elementname].validatonList != "undefined") {
            const validation = ValidationField(FormDataContolLstd[elementname].validatonList, elementvalue, FormDataContolLstd[elementname].label, FormDataContolLstd[elementname]);
            const validationObject = { IsValidatonError: validation.IsError, ValidatonErrorMessage: validation.Message };
            FormDataContolLstd[elementname].ErrorLst = validationObject;
        }
        this.setState({
            FormData: FormDataContolLstd,
        });
        if (this.props.onchange != null) {
            this.props.onchange(FormDataContolLstd, this.props.MLObjectDefinition);
        }

    }

    validationFormNew() {
        const FormDataContolLst = this.state.FormData;
        // console.log("validationFormNew", FormDataContolLst)
        for (const key in FormDataContolLst) {
            if (typeof FormDataContolLst[key].validatonList != "undefined") {
                const validation = ValidationField(FormDataContolLst[key].validatonList, FormDataContolLst[key].value, FormDataContolLst[key].label, FormDataContolLst[key]);
                const validationObject = { IsValidatonError: validation.IsError, ValidatonErrorMessage: validation.Message };
                FormDataContolLst[key].ErrorLst = validationObject;
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

    handleExportSubmit() {
        const { FormData } = this.state;
        let MLObject = {};
        const mLObjectDefinition = this.props.MLObjectDefinition;
        mLObjectDefinition.map((Item) => {
            const controlName = Item.BindControlName;
            if (controlName.length > 0) {
                MLObject = Object.assign({}, MLObject, { [Item.Name]: FormData[controlName].value });
            }
        });
        if (this.props.onExportSubmit != null) {
            this.props.onExportSubmit(FormData, MLObject);
        }
    }

    handlehistorySubmit() {
        if (this.props.onHistorySubmit != null) {
            this.props.onHistorySubmit();
        }
    }

    changeLoadComplete() {
    }
    HandleSetting = () => {
        let MLObject = {};
        const mLObjectDefinition = this.props.MLObjectDefinition;
        mLObjectDefinition.map((Item) => {
            const controlName = Item.BindControlName;
            if (controlName.length > 0) {
                MLObject = Object.assign({}, MLObject, { [Item.Name]: this.state.FormData[controlName].value });
            }
        });
        var MLObjectInfo = JSON.stringify(MLObject);
        localStorage.setItem('SearchShipmentOrderInfo', MLObjectInfo)

    };

    renderSearchForm() {
        const listElement = this.props.listelement;

        let classNamebtnSearch;
        let colGroupAction = (this.props.colGroupAction == "" || this.props.colGroupAction == undefined) ? 2 : this.props.colGroupAction;

        if (this.props.classNamebtnSearch) {
            classNamebtnSearch = "col-md-" + colGroupAction + " item  col-custom " + this.props.classNamebtnSearch;
        }
        else {
            classNamebtnSearch = "col-md-" + colGroupAction + " item  col-custom";
        }
        return (
            <div className="row">
                {
                    listElement.map((elementItem, index) => {
                        switch (elementItem.type) {
                            case "text":
                                return (
                                    <ElementSearch.ElementText
                                        onValueChange={this.onValueChange}
                                        ValidatonErrorMessage={this.state.FormData[elementItem.name].ErrorLst.ValidatonErrorMessage}
                                        inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                                        {...elementItem}
                                        value={this.state.FormData[elementItem.name].value}
                                        key={index}

                                    />
                                );
                            case "textdropdown":
                                return (
                                    <ElementSearch.ElementTextdropdown
                                        onValueChange={this.onValueChange}
                                        valuenameOption={this.state.FormData[elementItem.nameOption].value}
                                        ValidatonErrorMessage={this.state.FormData[elementItem.name].ErrorLst.ValidatonErrorMessage}
                                        inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                                        {...elementItem}
                                        value={this.state.FormData[elementItem.name].value}
                                        key={index}
                                    />

                                );
                            case "textdropdownNew":
                                return (
                                    <ElementSearch.ElementTextdropdownNew
                                        onValueChange={this.onValueChange}
                                        valuenameOption={this.state.FormData[elementItem.nameOption].value}
                                        ValidatonErrorMessage={this.state.FormData[elementItem.name].ErrorLst.ValidatonErrorMessage}
                                        inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                                        {...elementItem}
                                        value={this.state.FormData[elementItem.name].value}
                                        key={index}
                                    />
                                );
                            case "checkbox":
                                return (
                                    <ElementSearch.ElementCheckbox
                                        onValueChange={this.onValueChange}
                                        inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                                        {...elementItem}
                                        value={this.state.FormData[elementItem.name].value}
                                        key={index}
                                    />
                                );
                            case "ComboBox":
                                if (typeof elementItem.filterName != "undefined") {
                                    elementItem.filterValue = this.state.FormData[elementItem.filterName].value;
                                }

                                return (
                                    <React.Fragment>
                                        {elementItem.name === "cbReceiverProvinceID" && <div style={{ display: "none" }}>{elementItem.colspan = 12}</div>}
                                        {elementItem.name === "cbReceiverProvinceID" && (elementItem.value = "")}
                                        {elementItem.name === "cbReceiverProvinceID" && <div style={{ display: "none" }}>{elementItem.maxTagCount = 1}</div>}
                                        {elementItem.name === "cbReceiverProvinceID" && <div style={{ display: "none" }}>{elementItem.rowspan = 2}</div>}
                                        {elementItem.name === "cbReceiverProvinceID" ?
                                            <MultiTreeSelect
                                                style={{ width: '100%' }}
                                                onValueChange={this.onValueChange}
                                                ValidatonErrorMessage={this.state.FormData[elementItem.name].ErrorLst.ValidatonErrorMessage}
                                                inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                                                {...elementItem}
                                                value={this.state.FormData[elementItem.name].value}
                                                key={index}
                                            />
                                            :
                                            <ElementSearch.ElementComboBox
                                                onValueChange={this.onValueChange}
                                                ValidatonErrorMessage={this.state.FormData[elementItem.name].ErrorLst.ValidatonErrorMessage}
                                                inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                                                {...elementItem}
                                                value={this.state.FormData[elementItem.name].value}
                                                key={index}
                                            />
                                        }
                                    </React.Fragment>
                                );
                            case "ComboBoxNewMID":
                                if (typeof elementItem.filterName != "undefined") {
                                    elementItem.filterValue = this.state.FormData[elementItem.filterName].value;
                                }

                                return (
                                    <React.Fragment>
                                        {elementItem.name === "cbReceiverProvinceID" && <div style={{ display: "none" }}>{elementItem.colspan = 12}</div>}
                                        {elementItem.name === "cbReceiverProvinceID" && (elementItem.value = "")}
                                        {elementItem.name === "cbReceiverProvinceID" && <div style={{ display: "none" }}>{elementItem.maxTagCount = 1}</div>}
                                        {elementItem.name === "cbReceiverProvinceID" && <div style={{ display: "none" }}>{elementItem.rowspan = 2}</div>}
                                        {elementItem.name === "cbReceiverProvinceID" ?
                                            <MultiTreeSelect
                                                style={{ width: '100%' }}
                                                onValueChange={this.onValueChange}
                                                ValidatonErrorMessage={this.state.FormData[elementItem.name].ErrorLst.ValidatonErrorMessage}
                                                inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                                                {...elementItem}
                                                value={this.state.FormData[elementItem.name].value}
                                                key={index}
                                            />
                                            :
                                            <ElementSearch.ElementComboBoxNewMID
                                                onValueChange={this.onValueChange}
                                                ValidatonErrorMessage={this.state.FormData[elementItem.name].ErrorLst.ValidatonErrorMessage}
                                                inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                                                {...elementItem}
                                                value={this.state.FormData[elementItem.name].value}
                                                key={index}
                                            />
                                        }
                                    </React.Fragment>
                                );
                            case "ComboTreeSelect":
                                if (typeof elementItem.filterName != "undefined") {
                                    elementItem.filterValue = this.state.FormData[elementItem.filterName].value;
                                }

                                return (
                                    <ElementSearch.ElementTreeSelect
                                        onValueChange={this.onValueChange}
                                        ValidatonErrorMessage={this.state.FormData[elementItem.name].ErrorLst.ValidatonErrorMessage}
                                        inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                                        {...elementItem}
                                        value={this.state.FormData[elementItem.name].value}
                                        key={index}
                                    />
                                );

                            case "ComboBoxNewChange":
                                if (typeof elementItem.filterName != "undefined") {
                                    elementItem.filterValue = this.state.FormData[elementItem.filterName].value;
                                }

                                return (
                                    <ElementSearch.ElementComboBoxNewChange
                                        onValueChange={this.onValueChange}
                                        ValidatonErrorMessage={this.state.FormData[elementItem.name].ErrorLst.ValidatonErrorMessage}
                                        inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                                        {...elementItem}
                                        value={this.state.FormData[elementItem.name].value}
                                        key={index}
                                    />
                                );

                            case "ComboBoxFilterTwoCondition": // l???c theo 2 ??i???u ki???n: 1 theo field search kh??c, 2 l?? gi?? tr??? t??? truy???n v??o
                                if (typeof elementItem.filterName != "undefined") {
                                    elementItem.filterValue = this.state.FormData[elementItem.filterName].value;
                                }

                                return (
                                    <ElementSearch.ElementComboBoxFilterTwoCondition
                                        onValueChange={this.onValueChange}
                                        ValidatonErrorMessage={this.state.FormData[elementItem.name].ErrorLst.ValidatonErrorMessage}
                                        inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                                        {...elementItem}
                                        value={this.state.FormData[elementItem.name].value}
                                        key={index}
                                    />
                                );

                            case "ComboBoxByCompany":
                                if (typeof elementItem.filterName != "undefined") {
                                    elementItem.filterValue = this.state.FormData[elementItem.filterName].value;
                                }

                                return (
                                    <ElementSearch.ElementComboBoxByCompany
                                        onValueChange={this.onValueChange}
                                        ValidatonErrorMessage={this.state.FormData[elementItem.name].ErrorLst.ValidatonErrorMessage}
                                        inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                                        {...elementItem}
                                        value={this.state.FormData[elementItem.name].value}
                                        key={index}
                                    />
                                );
                            case "Datetime":
                                return (
                                    <ElementSearch.ElementDatetime
                                        onValueChange={this.onValueChange}
                                        ValidatonErrorMessage={this.state.FormData[elementItem.name].ErrorLst.ValidatonErrorMessage}
                                        inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                                        {...elementItem}
                                        value={this.state.FormData[elementItem.name].value}
                                        key={index}
                                    />
                                );
                            case "DatetimeFromTo":
                                return (
                                    <ElementSearch.ElementDatetimeFromTo
                                        onValueChange={this.onValueChange}
                                        ValidatonErrorMessage={this.state.FormData[elementItem.name].ErrorLst.ValidatonErrorMessage}
                                        inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                                        {...elementItem}
                                        value={this.state.FormData[elementItem.name].value}
                                        key={index}
                                    />
                                );
                            case "MultiSelectUser":
                                return (
                                    <MultiSelectUserComboBox
                                        onValueChange={this.onValueChange}
                                        ValidatonErrorMessage={this.state.FormData[elementItem.name].ErrorLst.ValidatonErrorMessage}
                                        inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                                        {...elementItem}
                                        value={this.state.FormData[elementItem.name].value}
                                        key={index}
                                    />
                                );
                            case "MonthPicker":
                                return (
                                    <ElementSearch.ElementDatetimeMonthYear
                                        onValueChange={this.onValueChange}
                                        ValidatonErrorMessage={this.state.FormData[elementItem.name].ErrorLst.ValidatonErrorMessage}
                                        inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                                        {...elementItem}
                                        value={this.state.FormData[elementItem.name].value}
                                        key={index}
                                    />
                                );
                            case "ProductComboBox":
                                return (
                                    <ProductComboBox
                                        onValueChange={this.onValueChange}
                                        ValidatonErrorMessage={this.state.FormData[elementItem.name].ErrorLst.ValidatonErrorMessage}
                                        inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                                        {...elementItem}
                                        value={this.state.FormData[elementItem.name].value}
                                        key={index}
                                    />
                                );

                            case "ProductComboBoxCustom":
                                return (
                                    <ElementSearch.ProductComboBox
                                        onValueChange={this.onValueChange}
                                        ValidatonErrorMessage={this.state.FormData[elementItem.name].ErrorLst.ValidatonErrorMessage}
                                        inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                                        {...elementItem}
                                        value={this.state.FormData[elementItem.name].value}
                                        key={index}
                                    />
                                );

                            case "MultiTreeSelect":
                                return (
                                    <MultiTreeSelect
                                        onValueChange={this.onValueChange}
                                        ValidatonErrorMessage={this.state.FormData[elementItem.name].ErrorLst.ValidatonErrorMessage}
                                        inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                                        {...elementItem}
                                        value={this.state.FormData[elementItem.name].value}
                                        key={index}
                                    />
                                );
                            case "MGCOOMultiTreeSelect":
                                return (
                                    <MultiTreeSelectByMGCOO
                                        onValueChange={this.onValueChange}
                                        ValidatonErrorMessage={this.state.FormData[elementItem.name].ErrorLst.ValidatonErrorMessage}
                                        inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                                        {...elementItem}
                                        value={this.state.FormData[elementItem.name].value}
                                        key={index}
                                    />
                                );

                            case "StoreComboBox":
                                return (
                                    <MultiStoreSearchComboBox
                                        onValueChange={this.onValueChange}
                                        ValidatonErrorMessage={this.state.FormData[elementItem.name].ErrorLst.ValidatonErrorMessage}
                                        inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                                        {...elementItem}
                                        value={this.state.FormData[elementItem.name].value}
                                        key={index}
                                    />
                                );
                            default:
                                break;
                        }
                    })
                }

                <div className={classNamebtnSearch}>
                    {/* <div className="btnSearch btncustom"> */}
                    <div className={this.props.btnGroup ? this.props.btnGroup : 'btnSearch btncustom'}>
                        {this.props.IsSetting == true ? (
                            <div className="btn-settings">
                                <i onClick={() => this.HandleSetting(this)} className="ti-settings"></i>
                            </div>
                        ) : ""
                        }
                        <button className={this.props.IsShowButtonSearch != undefined && this.props.IsShowButtonSearch == false ? "btnHide" : "btn btn-primary"} type="submit" disabled={this.props.IsDisabledBtnSearch}>
                            {
                                !!this.props.TitleButton ? this.props.TitleButton : <span className="fa fa-search">T??m Ki???m</span>

                            }

                        </button>
                        {
                            // this.props.IsButtonExport != undefined && this.props.IsButtonExport == true && <button className="btn btn-export ml-1" type="button" onClick={this.handleExportSubmit.bind(this)}>
                            this.props.IsButtonExport != undefined
                            && this.props.IsButtonExport == true &&
                            // && <button
                            //     className={this.props.btnExport ? this.props.btnExport : "btn btn-export ml-1"} type="button"
                            //     onClick={this.handleExportSubmit.bind(this)}
                            // >
                            //     {
                            //         !!this.props.TitleButtonExport ? <span className="ti ti-export"> {this.props.TitleButtonExport}</span> : <span className="ti ti-export"> Xu???t d??? li???u</span>
                            //     }
                            // </button>
                            <button type="button" className={this.props.btnExport ? this.props.btnExport : "btn btn-label btn-info btn-export-cus  ml-1"} onClick={this.handleExportSubmit.bind(this)} disabled={this.props.IsDisabledBtnExport}>
                                <label><i className="ti-export"></i></label> Xu???t d??? li???u
                            </button>
                        }
                        {
                            this.props.IsButtonhistory == true &&
                            // && <button type="button" className="btn btn-history ml-1"  onClick={this.handlehistorySubmit.bind(this)} title="" data-provide="tooltip" data-original-title="Xem l???ch s???">
                            //     <i className="ti-eye"> L???ch s??? t???i</i>
                            // </button>
                            <React.Fragment>
                                <button data-tip data-for="btn-historyExport" data-id="btn-historyExport" type="button" onClick={this.handlehistorySubmit.bind(this)} className="btn btn-square btn-git ml-1"><i className="ti-eye"></i></button>
                                <ReactTooltip id="btn-historyExport" type='warning'>
                                    <span>L???ch s??? xu???t d??? li???u</span>
                                </ReactTooltip>
                            </React.Fragment>


                        }


                    </div>
                </div>
            </div>
        );
    }

    render() {
        //this.renderTwoColumnForm();
        const listElement = this.props.listelement;
        let elmentRender = this.renderSearchForm();
        let classNameCustom;
        if (this.props.className == undefined && this.props.className == '') {
            classNameCustom = "col-lg-12 SearchForm ";
        } else {
            classNameCustom = "col-lg-12 SearchForm " + this.props.className;
        }
        return (
            // <form action="" onSubmit={this.handleSearchSubmit}>
            //     {elmentRender}
            // </form>
            <div style={{ padding: "0px" }} className={classNameCustom}>
                <form className="card mb-0 pt-2 border" action="" onSubmit={this.handleSearchSubmit}>
                    <div className="card-body">
                        {elmentRender}
                    </div>
                </form>
            </div>
        );
    }
}

SearchForm.defaultProps = {
    IsDisabledBtnExport: false,
    IsDisabledBtnSearch: false
}

export default SearchForm;