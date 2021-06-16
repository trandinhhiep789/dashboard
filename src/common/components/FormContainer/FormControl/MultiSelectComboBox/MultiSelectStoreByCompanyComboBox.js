import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { callGetCache } from "../../../../../actions/cacheAction";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";

import { DatePicker, Menu, Dropdown, Button } from 'antd';

class MultiSelectStoreByCompanyComboBoxCom extends React.Component {
    static defaultProps = {
        componenttype: 'InputControl'
    }
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleValueChange1 = this.handleValueChange1.bind(this);

        let SelectedOption = [];


        this.state = {
            ListOption: [],
            SelectedOption: [],
            valueNameOption: (this.props.valueNameOption == undefined || this.props.valueNameOption == "") ? -1 : this.props.valueNameOption
        }
    }



    componentDidMount() {
        this.setState({
            ListOption: this.props.listoption,
            SelectedOption: this.props.value == undefined ? this.props.listoption : this.props.value
        });
    }

    callSearchData(KeyWord) {
        const { valueNameOption } = this.state
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
                    "QueryValue": valueNameOption, //"1",
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
            console.log("apiResult", listMLObject, apiResult)
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

    handleClick(e) {
        console.log("handleClick", e.target.name, e.currentTarget.dataset.option)
        this.setState({
            valueNameOption: e.currentTarget.dataset.option
        })
        // e.preventDefault();

        // if (this.props.onValueChange != null)
        //     this.props.onValueChange(e.target.name, e.currentTarget.dataset.option);
    }


    render() {

        const listOption = this.state.ListOption;
        const { listoptionDropdown, nameOption } = this.props;
        const { valueNameOption } = this.state;
        console.log("props", this.props)

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
            formRowClassName = "form-row resss col-md-" + this.props.rowspan;
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


        const dropdownItem = () => {
            return <Menu className={this.props.classNameDropdown != "" ? this.props.classNameDropdown : ""}>
                {listoptionDropdown.map((optionItem) => <Menu.Item key={`menuItem${optionItem.value}`}>
                    <a className={optionItem.value.toString() === valueNameOption.toString() ? "dropdown-item active" : "dropdown-item"}
                        key={optionItem.value} name={nameOption} data-option={optionItem.value}
                        onClick={this.handleClick.bind(this)}>
                        {optionItem.value + " - " + optionItem.label}
                    </a>
                </Menu.Item>)}
            </Menu>
        }

        let labelNameDrop = "--Vui lòng chọn--";

        const tempListoptionDropdown = listoptionDropdown.filter(item => item.value.toString() === valueNameOption.toString())
        if (tempListoptionDropdown.length > 0) {
            labelNameDrop = tempListoptionDropdown[0].value + " - " + tempListoptionDropdown[0].label;
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
                    <div className={(this.props.classRows == "" || this.props.classRows == undefined) ? "groupSelectDrop" : "groupSelectDrop " + this.props.classRows}>
                        <Select
                            value={selectedOption}
                            onChange={this.handleValueChange}
                            onKeyDown={this.handleValueChange1}
                            options={listOptionNew}
                            isMulti={this.props.isMultiSelect}
                            isDisabled={this.props.disabled}
                            isSearchable={true}
                            placeholder={"----Chọn -----"}
                            className={classNameselect}
                        />
                        <div className="input-group-append">
                            <Dropdown overlay={dropdownItem} trigger={["click"]} >
                                <div className="btn dropdown-toggle">
                                    {labelNameDrop}
                                </div>
                            </Dropdown>
                        </div>

                    </div>
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
const MultiSelectStoreByCompanyComboBox = connect(mapStateToProps, mapDispatchToProps)(MultiSelectStoreByCompanyComboBoxCom);
export default MultiSelectStoreByCompanyComboBox;