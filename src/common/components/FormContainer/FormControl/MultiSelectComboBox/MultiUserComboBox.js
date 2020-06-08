import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { callGetCache } from "../../../../../actions/cacheAction";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";

class MultiUserComboBoxCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleValueonKeyDown = this.handleValueonKeyDown.bind(this);
        this.state = { ListOption: [], SelectedOption: [] }
    }

    componentDidMount() {
    }
    bindData() {
        let values = this.props.value;
        let selectedOption = [];
        if (typeof values != "undefined" && values!=[]) {
            for (let i = 0; i < values.length; i++) {
                selectedOption.push({ value: values[i].UserName, label:values[i].FullName });
            }
        }
        return selectedOption;
    }

    callSearchData(KeyWord) {
        let listMLObject = {
            "IndexName": "user",
            "TypeName": "user",
            "Top": 10,
            "IsCompressResultData": false,
            "QueryParamList":
                [
                    {
                        "QueryKey": "", "QueryValue": "", "QueryType": 18, "IsNotQuery": false,
                        "SubQueryParamList":
                            [
                                {
                                    "QueryKey": "uSERNAME",
                                    "QueryValue": KeyWord,
                                    "QueryType": 2,
                                    "IsNotQuery": false
                                },

                                {
                                    "QueryKey": "fULLNAME",
                                    "QueryValue": KeyWord,
                                    "QueryType": 2,
                                    "IsNotQuery": false
                                }
                            ]
                    }
                ]
        }
        this.props.callFetchAPI("ERPAPI", 'api/UserSearch/Search', listMLObject).then(apiResult => {
            let listOptionNew = [];
            for (let i = 0; i < apiResult.ResultObject.length; i++) {
                listOptionNew.push({ value: apiResult.ResultObject[i].UserName, label: apiResult.ResultObject[i].FullName });
            }
            this.setState({
                ListOption: listOptionNew
            });
        });
    }

    getComboValue(selectedOption) {
        let values = [];
        if (selectedOption == null)
            return values;
        for (let i = 0; i < selectedOption.length; i++) {
            values.push({ UserName: selectedOption[i].value, FullName: selectedOption[i].label });
        }
        return values;
    }

    handleValueChange(selectedOption) {
        let comboValues = this.getComboValue(selectedOption);
        if (this.props.onValueChange)
            this.props.onValueChange(this.props.name, comboValues);
    }

    handleValueonKeyDown(e) {
        let value = e.target.value;
        if (value.length > 2 && e.keyCode != 40 && e.keyCode != 38) {
            this.callSearchData("*" + value + "*");
        }
    }
    render() {

        const listOption = this.state.ListOption;
        const selectedOption = this.bindData();
        let formRowClassName = "form-row";
        if (this.props.rowspan)
            formRowClassName = "form-row col-md-" + this.props.rowspan;
        let className = "form-control form-control-sm";
        if (this.props.CSSClassName != null)
            className = this.props.CSSClassName;
        let formGroupClassName = "form-group col-md-4";
        if (this.props.colspan != null) {
            formGroupClassName = "form-group col-md-" + this.props.colspan;
        }
        let labelDivClassName = "form-group col-md-2";
        if (this.props.labelcolspan != null) {
            labelDivClassName = "form-group col-md-" + this.props.labelcolspan;
        }
        let isLabelDiv = true;
        if (typeof this.props.IsLabelDiv !== 'undefined' || typeof this.props.IsLabelDiv !== null)
            isLabelDiv = this.props.IsLabelDiv;
        if (isLabelDiv == false)
            formGroupClassName = "form-group col-md-12";
        let star;
        if (this.props.validatonList != undefined && this.props.validatonList.includes("Comborequired") == true) {
            star = '*'
        }
        let classNameselect = "react-select";
        if (this.props.validationErrorMessage != undefined && this.props.validationErrorMessage != "") {
            classNameselect += " is-invalid";
        }
        return (
            <div className={formRowClassName} >
                {isLabelDiv &&
                    <div className={labelDivClassName}>
                        <label className="col-form-label 6">
                            {this.props.label}<span className="text-danger"> {star}</span>
                        </label>
                    </div>
                }
                <div className={formGroupClassName}>
                    <Select
                        value={selectedOption}
                        onChange={this.handleValueChange}
                        onKeyDown={this.handleValueonKeyDown}
                        options={listOption}
                        isMulti={true}
                        isDisabled={this.props.disabled}
                        isSearchable={true}
                        placeholder={"----Chọn -----"}
                        className={classNameselect}
                    />
                    <div className="invalid-feedback"><ul className="list-unstyled"><li>{this.props.validationErrorMessage}</li></ul></div>
                </div>
            </div>
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
const MultiUserComboBox = connect(mapStateToProps, mapDispatchToProps)(MultiUserComboBoxCom);
export default MultiUserComboBox;