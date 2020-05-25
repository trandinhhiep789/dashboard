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
        this.getcombox = this.getcombox.bind(this);
        console.log("formDataContol", formDataContol);
        this.state = { FormData: formDataContol };
    }

    bindDataContol() {
        let formData = {};
        const listElement = this.props.listelement;
        listElement.map((elementItem) => {
            const elementname = elementItem.name;
            let lstobj=[];
            if(elementItem.IsAutoLoadItemFromCache)
            {
                 lstobj= this.getcombox(elementItem.LoadItemCacheKeyID,elementItem.ValueMember,elementItem.NameMember);
            }
            console.log(elementname,lstobj)
            const ObjectName = { Name: elementname, value: elementItem.value,
                 Controltype: elementItem.type, label: elementItem.label, ErrorLst: [], 
                 validatonList: elementItem.validatonList,listoption:lstobj };
            formData = Object.assign({}, formData, { [elementname]: ObjectName });

        });
        return formData;
    }

    getcombox(LoadItemCacheKeyID,ValueMember,NameMember) {
        let  listoption = [{ value: -1, label: "--Vui lòng chọn--" }];
        this.props.callGetCache(LoadItemCacheKeyID).then((result) => {
            debugger;
            listoption = [{ value: -1, label: "--Vui lòng chọn--" }];
            if (!result.IsError && result.ResultObject.CacheData != null) {
                result.ResultObject.CacheData.map((cacheItem) => {
                    listoption.push({ value: cacheItem[ValueMember], label: cacheItem[ValueMember] + "-" + cacheItem[NameMember] });
                }
                );
            }
         
        });
        return listoption;
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