import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { callGetCache } from "../../../../../actions/cacheAction";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";

class MultiAllStoreComboBoxCom extends React.Component {
    static defaultProps = {
        componenttype: 'InputControl'
    }
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleValueChange1 = this.handleValueChange1.bind(this);

        let SelectedOption = [];

        this.state = { ListOption: [], SelectedOption: [] }
    }



    componentDidMount() {
        this.setState({
            ListOption: this.props.listoption,
            SelectedOption: this.props.value == undefined ? this.props.listoption : this.props.value
        });
    }

    callSearchData(KeyWord) {

        let listMLObject = {
            "QueryParamList": [
                {
                    "QueryKey": "",
                    "QueryValue": "",
                    "QueryType": 18,
                    "IsNotQuery": false,
                    "SubQueryParamList": [
                        {
                            "QueryKey": "sTOREID",
                            "QueryValue": /^[0-9][0-9]*$/.test(KeyWord) == true ? KeyWord : "",
                            "QueryType": 3,
                            "IsNotQuery": false
                        },
                        {
                            "QueryKey": "sTORENAME",
                            "QueryValue": KeyWord,
                            "QueryType": 2,
                            "IsNotQuery": false
                        }
                    ]
                }
                ,
                {
                    "QueryKey": "cOMPANYID",
                    "QueryValue": "1",
                    "QueryType": 1,
                    "IsNotQuery": false,

                }
            ],
            "Top": 10,
            "IndexName": "store",
            "TypeName": "store",
            "IsCompressResultData": false
        }
        this.props.callFetchAPI("ERPAPI", 'api/CommonSearch/Search', listMLObject).then(apiResult => {
            const objStore = JSON.parse(apiResult.ResultObject).hits.hits;
            let listOptionNew1 = [];
            for (let i = 0; i < objStore.length; i++) {
                listOptionNew1.push({
                    value: objStore[i]._source.sTOREID,
                    name: objStore[i]._source.sTORENAME,
                    StoreFax: objStore[i]._source.sTOREPHONENUM,
                    StoreAddress: objStore[i]._source.sTOREADDRESS
                });
            }
            this.setState({
                ListOption: listOptionNew1
            });
        });
    }


    getComboValue(selectedOption) {
        let values = [];
        if (selectedOption == null)
            return values;
        for (let i = 0; i < selectedOption.length; i++) {
            values.push(selectedOption[i].value);
        }
        return values;
    }

    handleValueChange(selectedOption) {
        const comboValues = this.getComboValue(selectedOption);
        this.setState({ SelectedOption: selectedOption });
        if (this.props.onChange)
            this.props.onChange(this.props.name, selectedOption);
        if (this.props.onValueChange != null)
            this.props.onValueChange(this.props.name, selectedOption.value, this.props.namelabel, selectedOption.name, this.props.filterrest);
    }

    handleValueChange1(e) {
        let value = e.target.value;
        if (value.length > 3 && e.keyCode != 40 && e.keyCode != 38) {
            this.callSearchData(value);
        }

    }
    render() {

        const listOption = this.state.ListOption;
        let listOptionNew = [];
        for (let i = 0; i < listOption.length; i++) {
            listOptionNew.push(
                {
                    value: listOption[i].value,
                    label: listOption[i].value + "-" + listOption[i].name,
                    name: listOption[i].name,
                    StoreFax: listOption[i].StoreFax,
                    StoreAddress: listOption[i].StoreAddress,
                    style: { color: 'red' }
                });
        }
        const selectedOption = this.state.SelectedOption;
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
                        onKeyDown={this.handleValueChange1}
                        options={listOptionNew}
                        isMulti={this.props.isMultiSelect}
                        isDisabled={this.props.disabled}
                        isSearchable={true}
                        placeholder={"----Ch???n -----"}
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
const MultiAllStoreComboBox = connect(mapStateToProps, mapDispatchToProps)(MultiAllStoreComboBoxCom);
export default MultiAllStoreComboBox;