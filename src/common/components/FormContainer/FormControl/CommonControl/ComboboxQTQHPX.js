import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { callGetCache } from "../../../../../actions/cacheAction";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import ElementSearch from '../../FormElement/ElementSearch';
import { ValidationField } from "../../../../library/validation.js";
import { ERPCOMMONCACHE_PARTNER, ERPCOMMONCACHE_COUNTRY, ERPCOMMONCACHE_PROVINCE, ERPCOMMONCACHE_DISTRICT, ERPCOMMONCACHE_WARD } from "../../../../../constants/keyCache";

class ComboboxQTQHPXCom extends React.Component {
    static defaultProps = {
        componenttype: 'InputControl'
    }
    constructor(props) {
        super(props);
        this.elementItemRefs = [];
        const formDataContol = this.bindDataContol();
        this.handleInputChange = this.handleInputChange.bind(this);
        // console.log("formDataContol", formDataContol);
        this.state = {
            FormData: formDataContol,
            Country: [],
            Province: [],
            District: [],
            Ward: []
        };
    }

    bindDataContol() {
        let formData = {};
        const listElement = this.props.listelement;
        listElement.map((elementItem) => {
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

    handleInputChange(elementname, elementvalue, controllabel, listvalidation, listvalidationRow) {
        const FormDataContolLstd = this.state.FormData;
        FormDataContolLstd[elementname].value = elementvalue;
        if (typeof FormDataContolLstd[elementname].validatonList != "undefined") {
            const validation = ValidationField(FormDataContolLstd[elementname].validatonList, elementvalue, FormDataContolLstd[elementname].label, FormDataContolLstd[elementname]);
            const validationObject = { IsValidatonError: validation.IsError, ValidatonErrorMessage: validation.Message };
            FormDataContolLstd[elementname].ErrorLst = validationObject;
          
        }
        this.setState({
            FormData: FormDataContolLstd,
        });
    }

    componentDidMount() {
        this.initCombobox();
    }
    initCombobox() {

        // tỉnh thành phố
        this.props.callGetCache(ERPCOMMONCACHE_PROVINCE).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                //console.log("FormElement listOption: ", listOption)
                this.setState({
                    Province: result.ResultObject.CacheData
                });
            }
        });

        // quận huyện
        this.props.callGetCache(ERPCOMMONCACHE_DISTRICT).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                //console.log("FormElement listOption: ", listOption)
                this.setState({
                    District: result.ResultObject.CacheData
                });
            }
        });


        // phường xã
        this.props.callGetCache(ERPCOMMONCACHE_WARD).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                //console.log("FormElement listOption: ", listOption)
                this.setState({
                    Ward: result.ResultObject.CacheData
                });
            }
        });
      

    }
    getDataCombobox(data, valueMember, nameMember, conditionName, conditionValue) {
        let listOption = [{ value: -1, label: "--Vui lòng chọn--" }];
        data.map((cacheItem) => {
            if (conditionName) {
                if (cacheItem[conditionName] == conditionValue) {
                    listOption.push({ value: cacheItem[valueMember], label: cacheItem[nameMember], name: cacheItem[nameMember] });
                }
            }
            else {
                listOption.push({ value: cacheItem[valueMember], label: cacheItem[nameMember], name: cacheItem[nameMember] });
            }
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
                                return (
                                    <ElementSearch.ElementTextNew
                                        onValueChange={this.handleInputChange}
                                        // value={1}
                                        // ValidatonErrorMessage={''}
                                        value={this.state.FormData[elementItem.name].value}
                                        validationErrorMessage={this.state.FormData[elementItem.name].ErrorLst.ValidatonErrorMessage}
                                        inputRef={ref => this.elementItemRefs[elementItem.name] = ref}
                                        {...elementItem}
                                        key={index}
                                    />
                                );
                            case "ComboBox":
                                if (elementItem.name == "cbProvinceID") {
                                    const aa = this.getDataCombobox(this.state.Province, elementItem.ValueMember, elementItem.NameMember, elementItem.nameOption, elementItem.nameValue == -1 ? this.state.FormData[elementItem.name].value : elementItem.nameValue);
                                    elementItem.listoption = aa;
                                }
                                else if (elementItem.name == "cbDistrictID") {
                                    const aaa = this.getDataCombobox(this.state.District, elementItem.ValueMember, elementItem.NameMember, elementItem.nameOption, elementItem.nameValue == -1 ? this.state.FormData[elementItem.nameOption1].value : elementItem.nameValue);
                                    elementItem.listoption = aaa;

                                }
                                else if (elementItem.name == "cbWardID") {
                                    const aaaa = this.getDataCombobox(this.state.Ward, elementItem.ValueMember, elementItem.NameMember, elementItem.nameOption, elementItem.nameValue == -1 ? this.state.FormData[elementItem.nameOption1].value : elementItem.nameValue);
                                    elementItem.listoption = aaaa;

                                }
                           
                                return (
                                    <ElementSearch.ElementComboBoxNew
                                        onValueChange={this.handleInputChange}
                                        value={this.state.FormData[elementItem.name].value}
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