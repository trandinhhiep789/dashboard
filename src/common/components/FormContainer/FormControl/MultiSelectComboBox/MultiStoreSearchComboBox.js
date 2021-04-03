import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { callGetCache } from "../../../../../actions/cacheAction";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";

class MultiStoreSearchComboBoxCom extends React.Component {
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
        if (value.length > 2 && e.keyCode != 40 && e.keyCode != 38) {
            this.callSearchData(value);
        }

    }
    render() {
        let { name, label, icon, colspan, isMultiSelect, ValidatonErrorMessage, placeholder, classNameCol } = this.props;
        const listOption = this.state.ListOption;
        let listOptionNew = [{ value: -1, label: "--Kho tạo--" }];
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

        let className = "select";
        let colspanClassName = "col-md-3";
        if (colspan) {
            if (classNameCol) {
                colspanClassName = "col-md-" + this.props.colspan + " " + classNameCol;
            }
            else {
                colspanClassName = "col-md-" + this.props.colspan;
            }
        }
        let labeldiv;
        if (label) {
            labeldiv = <label className="col-form-label" htmlFor="input-normal">{label}</label>;
        }

        if (ValidatonErrorMessage && ValidatonErrorMessage != "") {

            className += " is-invalid";
        }
        return (
            <div className={colspanClassName}  >
            <div className="form-group form-group-input form-group-input-select">
                {labeldiv}
                <Select
                    value={selectedOption}
                    onChange={this.handleValueChange}
                    onKeyDown={this.handleValueChange1}
                       options={listOptionNew}
                    isMulti={this.props.isMultiSelect}
                    isSearchable={true}
                    placeholder={placeholder}
                    className={className}
                />
                <div className="invalid-feedback">{ValidatonErrorMessage}</div>
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
const MultiStoreSearchComboBox = connect(mapStateToProps, mapDispatchToProps)(MultiStoreSearchComboBoxCom);
export default MultiStoreSearchComboBox;