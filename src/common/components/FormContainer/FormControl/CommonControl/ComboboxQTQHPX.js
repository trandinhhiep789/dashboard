import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { callGetCache } from "../../../../../actions/cacheAction";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import ElementSearch from '../../FormElement/ElementSearch';
import { ValidationField } from "../../../../library/validation.js";

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
            Provincelst: [],
            Districtlst: []
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
        //console.log('change')
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
        let districtlst= [];
        this.props.callGetCache("ERPCOMMONCACHE.DISTRICT").then((result) => {
            districtlst = [{ value: -1, label: "--Vui lòng chọn--" }];
            if (!result.IsError && result.ResultObject.CacheData != null) {
                result.ResultObject.CacheData.map((cacheItem) => {
                    districtlst.push({ value: cacheItem['DistrictID'], label: cacheItem['DistrictID'] + "-" + cacheItem['DistrictName'] });
                }
                );
            }
        });
        this.setState({Districtlst: districtlst });

    }
    renderSearchForm() {
        const listElement = this.props.listelement;
        //  console.log("ComboboxQTQHPXCom", this.state, this.props)
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