import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { callGetCache } from "../../../../../actions/cacheAction";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import ElementSearch from '../../FormElement/ElementSearch';
import { ValidationField } from "../../../../library/validation.js";
import { GetMLObjectData, GetMLObjectObjData } from "../../../../library/form/FormLib";
import { ERPCOMMONCACHE_PARTNER, ERPCOMMONCACHE_COUNTRY, ERPCOMMONCACHE_PROVINCE, ERPCOMMONCACHE_DISTRICT, ERPCOMMONCACHE_WARD } from "../../../../../constants/keyCache";

class ComboboxQTQHPXCom extends React.Component {
    static defaultProps = {
        componenttype: 'InputControl'
    }
    constructor(props) {
        super(props);
        this.elementItemRefs = [];
        const formDataContol = this.bindDataContol(this.props.value);
        console.log("formDataContol", formDataContol)
        this.handleInputChange = this.handleInputChange.bind(this);
        this.InputChange = this.InputChange.bind(this);
        this.state = {
            FormData: formDataContol,
            Country: [],
            Province: [],
            District: [],
            Ward: []
        };
    }
    InputChange() {
        console.log("InputChange")
    }
    bindDataContol(dataSource) {
        let formData = {};
        const listElement = this.props.listelement;
        const listElementw = this.bindDataToControl(typeof this.props.listelement != "undefined" ? this.props.listelement : [], dataSource);
        listElementw.map((elementItem) => {
            const elementname = elementItem.name;
            const ObjectName = {
                Name: elementname, value: elementItem.value,
                Controltype: elementItem.type, label: elementItem.label, ErrorLst: [],
                validatonList: elementItem.validatonList, listoption: []
            };
            formData = Object.assign({}, formData, { [elementname]: ObjectName });

        });
        return formData;
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.value) !== JSON.stringify(nextProps.value)) // Check if it's a new user, you can also use some unique property, like the ID
        {
            let formDataContol = this.bindDataContol(nextProps.value);
            console.log("formDataContol", formDataContol)
            // const FormDataContolLst = this.state.FormData;
            for (const key in formDataContol) {
                if (typeof formDataContol[key].validatonList != "undefined") {
                    const validation = ValidationField(formDataContol[key].validatonList, formDataContol[key].value, formDataContol[key].label, formDataContol[key]);
                    const validationObject = { IsValidatonError: validation.IsError, ValidatonErrorMessage: validation.Message };
                    formDataContol[key].ErrorLst = validationObject;
                }
            }
            this.setState({ FormData: formDataContol })
        }
    }

    bindDataToControl(listElement, dataSource) {
        let listElement1 = listElement;
        if (typeof dataSource != "undefined" && listElement1 != []) {

            listElement1 = listElement.map((elementItem) => {
                const elementvalue = dataSource[elementItem.DataSourceMember];
                if (typeof elementvalue != "undefined") {
                    const newElementItem = Object.assign({}, elementItem, { value: elementvalue });
                    return newElementItem;
                }
                return elementItem;
            });
        }
        return listElement1;
    }

    handleInputChange(elementname, elementvalue, controllabel, listvalidation, listvalidationRow) {
        let FormDataContolLstd = this.state.FormData;
        let objelementname = {};
        let objelementDistrict = {};
        let objelementWard = {};
        // FormDataContolLstd[elementname].value = elementvalue;
        if (typeof FormDataContolLstd[elementname].validatonList != "undefined") {
            const validation = ValidationField(FormDataContolLstd[elementname].validatonList, elementvalue, FormDataContolLstd[elementname].label, FormDataContolLstd[elementname]);
            const validationObject = { IsValidatonError: validation.IsError, ValidatonErrorMessage: validation.Message };
            objelementname = Object.assign({}, FormDataContolLstd[elementname], { value: elementvalue, ErrorLst: validationObject });
            FormDataContolLstd = Object.assign({}, FormDataContolLstd, { [elementname]: objelementname });
        }
        else {
            objelementname = Object.assign({}, FormDataContolLstd[elementname], { value: elementvalue });
            FormDataContolLstd = Object.assign({}, FormDataContolLstd, { [elementname]: objelementname });

        }

        if (elementname == "cbProvinceID") {
            if (typeof FormDataContolLstd["cbDistrictID"].validatonList != "undefined") {
                const validation = ValidationField(FormDataContolLstd["cbDistrictID"].validatonList, -1, FormDataContolLstd["cbDistrictID"].label, FormDataContolLstd["cbDistrictID"]);
                const validationObject = { IsValidatonError: validation.IsError, ValidatonErrorMessage: validation.Message };
                objelementDistrict = Object.assign({}, FormDataContolLstd["cbDistrictID"], { value: -1, ErrorLst: validationObject });
                FormDataContolLstd = Object.assign({}, FormDataContolLstd, { ["cbDistrictID"]: objelementDistrict });

            }
            else {
                objelementDistrict = Object.assign({}, FormDataContolLstd["cbDistrictID"], { value: -1 });
                FormDataContolLstd = Object.assign({}, FormDataContolLstd, { ["cbDistrictID"]: objelementDistrict });
            }
            if (typeof FormDataContolLstd["cbWardID"].validatonList != "undefined") {
                const validation = ValidationField(FormDataContolLstd["cbWardID"].validatonList, -1, FormDataContolLstd["cbWardID"].label, FormDataContolLstd["cbWardID"]);
                const validationObject = { IsValidatonError: validation.IsError, ValidatonErrorMessage: validation.Message };
                objelementWard = Object.assign({}, FormDataContolLstd["cbWardID"], { value: -1, ErrorLst: validationObject });
                FormDataContolLstd = Object.assign({}, FormDataContolLstd, { ["cbWardID"]: objelementWard });
            }
            else {
                objelementWard = Object.assign({}, FormDataContolLstd["cbWardID"], { value: -1 });
                FormDataContolLstd = Object.assign({}, FormDataContolLstd, { ["cbWardID"]: objelementWard });
            }
        }
        if (elementname == "cbDistrictID") {
            if (typeof FormDataContolLstd["cbWardID"].validatonList != "undefined") {
                const validation = ValidationField(FormDataContolLstd["cbWardID"].validatonList, -1, FormDataContolLstd["cbWardID"].label, FormDataContolLstd["cbWardID"]);
                const validationObject = { IsValidatonError: validation.IsError, ValidatonErrorMessage: validation.Message };
                objelementWard = Object.assign({}, FormDataContolLstd["cbWardID"], { value: -1, ErrorLst: validationObject });
                FormDataContolLstd = Object.assign({}, FormDataContolLstd, { ["cbWardID"]: objelementWard });
            }
            else {
                objelementWard = Object.assign({}, FormDataContolLstd["cbWardID"], { value: -1 });
                FormDataContolLstd = Object.assign({}, FormDataContolLstd, { ["cbWardID"]: objelementWard });
            }
        }
        // this.setState({
        //     FormData: FormDataContolLstd,
        // });
        FormDataContolLstd["txtFullAddress"].value = this.getfulladress(FormDataContolLstd["txtAddress"].value, FormDataContolLstd["cbWardID"].value, FormDataContolLstd["cbDistrictID"].value, FormDataContolLstd["cbProvinceID"].value)
        const MLObject = GetMLObjectObjData(this.props.MLObjectDefinition, FormDataContolLstd, this.props.value);
        if (this.props.onValueChange != null) {
            this.props.onValueChange(this.props.name, MLObject);
        }
    }
    getfulladress(Address, WardID, DistrictID, ProvinceID) {
        let stringfulladress = Address;
        if (WardID != 0 && WardID != -1) {
            stringfulladress = stringfulladress + "," + this.state.Ward.find(element => element.WardID == WardID).WardName
        }
        if (DistrictID != 0 && DistrictID != -1) {
            stringfulladress = stringfulladress + "," + this.state.District.find(element => element.DistrictID == DistrictID).DistrictName
        }
        if (ProvinceID != 0 && ProvinceID != -1) {
            stringfulladress = stringfulladress + "," + this.state.Province.find(element => element.ProvinceID == ProvinceID).ProvinceName
        }


        return stringfulladress;

    }
    componentDidMount() {
        this.initCombobox();
    }
    initCombobox() {
        // t???nh th??nh ph???
        this.props.callGetCache(ERPCOMMONCACHE_PROVINCE).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                //console.log("FormElement listOption: ", listOption)
                this.setState({
                    Province: result.ResultObject.CacheData
                });
            }
        });
        // qu???n huy???n
        this.props.callGetCache(ERPCOMMONCACHE_DISTRICT).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                //console.log("FormElement listOption: ", listOption)
                this.setState({
                    District: result.ResultObject.CacheData
                });
            }
        });
        // ph?????ng x??
        this.props.callGetCache(ERPCOMMONCACHE_WARD).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {

                this.setState({
                    Ward: result.ResultObject.CacheData
                });
            }
        });
    }
    getDataComboboxNew(data, valueMember, nameMember, conditionName, conditionValue) {
        let listOption = [{ value: -1, label: "--Vui l??ng ch???n--" }];
        data.filter(n => n[conditionName] == conditionValue).map((cacheItem) => {
            listOption.push({ value: cacheItem[valueMember], label: cacheItem[nameMember], name: cacheItem[nameMember] });
        });
        return listOption;
    }

    renderSearchForm() {
        const listElement = this.props.listelement;
        return (
            <React.Fragment>
                {
                    listElement.map((elementItem, index) => {
                        switch (elementItem.type) {
                            case "text":
                                elementItem.value = this.state.FormData[elementItem.name].value;
                                return (
                                    <ElementSearch.ElementTextNew
                                        onValueChange={this.handleInputChange}
                                        value={this.state.FormData[elementItem.name].value}
                                        validationErrorMessage={this.state.FormData[elementItem.name].ErrorLst.ValidatonErrorMessage}
                                        inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                                        {...elementItem}
                                        key={index}
                                    />
                                );
                            case "textfull":
                                elementItem.value = this.state.FormData[elementItem.name].value;
                                return (
                                    <ElementSearch.ElementTextNewFull
                                        onValueChange={this.handleInputChange}
                                        value={this.state.FormData[elementItem.name].value}
                                        validationErrorMessage={this.state.FormData[elementItem.name].ErrorLst.ValidatonErrorMessage}
                                        inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                                        {...elementItem}
                                        key={index}
                                    />
                                );
                            case "ComboBox":
                                if (elementItem.name == "cbProvinceID") {
                                    const aa = this.getDataComboboxNew(this.state.Province, elementItem.ValueMember, elementItem.NameMember, elementItem.nameOption, elementItem.nameValue == -1 ? this.state.FormData[elementItem.name].value : elementItem.nameValue);
                                    elementItem.listoption = aa;
                                }
                                else if (elementItem.name == "cbDistrictID") {
                                    const aaa = this.getDataComboboxNew(this.state.District, elementItem.ValueMember, elementItem.NameMember, elementItem.nameOption, elementItem.nameValue == -1 ? this.state.FormData[elementItem.nameOption1].value : elementItem.nameValue);
                                    elementItem.listoption = aaa;
                                }
                                else if (elementItem.name == "cbWardID") {
                                    const aaaa = this.getDataComboboxNew(this.state.Ward, elementItem.ValueMember, elementItem.NameMember, elementItem.nameOption, elementItem.nameValue == -1 ? this.state.FormData[elementItem.nameOption1].value : elementItem.nameValue);
                                    elementItem.listoption = aaaa;

                                }
                                elementItem.value = this.state.FormData[elementItem.name].value;
                                return (
                                    <ElementSearch.ElementComboBoxNew
                                        onValueChange={this.handleInputChange}
                                        validationErrorMessage={this.state.FormData[elementItem.name].ErrorLst.ValidatonErrorMessage}
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
            </React.Fragment>
        );
    }
    render() {
        let elmentRender = this.renderSearchForm();

        return (
            <React.Fragment>
                {elmentRender}
            </React.Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {
        AppInfo: state,
        FetchAPIInfo: state.FetchAPIInfo
    };
};


const mapDispatchToProps = dispatch => {
    return {
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        }
    }
}
const ComboboxQTQHPX = connect(mapStateToProps, mapDispatchToProps)(ComboboxQTQHPXCom);
export default ComboboxQTQHPX;