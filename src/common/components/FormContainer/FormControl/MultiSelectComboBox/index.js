import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { callGetCache } from "../../../../../actions/cacheAction";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";

class MultiSelectComboBoxCom extends React.Component {
    static defaultProps = {
        componenttype: 'InputControl'
    }
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleValueChange1 = this.handleValueChange1.bind(this);
        this.state = { ListOption: [], SelectedOption: [] }
    }



    componentDidMount() {
        this.setState({
            ListOption: this.props.listoption,
            SelectedOption: this.props.value == undefined ? this.props.listoption : this.props.value
        });
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.value) !== JSON.stringify(nextProps.value)) {
            this.setState({
                SelectedOption: nextProps.value
            })
        }
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
            let listOptionNew1 = [];
            for (let i = 0; i < apiResult.ResultObject.length; i++) {
                if(this.props.isCheckPartner == undefined)
                {
                    if (apiResult.ResultObject[i].UserName.substr(0, 3) != "004") {
                        listOptionNew1.push({
                            value: apiResult.ResultObject[i].UserName,
                            name: apiResult.ResultObject[i].UserName + "-" + apiResult.ResultObject[i].FullName,
                            FullName: apiResult.ResultObject[i].FullName,
                            DepartmentName: apiResult.ResultObject[i].DepartmentName,
                            PositionName: apiResult.ResultObject[i].PositionName,
                            Address: apiResult.ResultObject[i].Address
                        });
                    }
                }
                else
                {
                    listOptionNew1.push({
                        value: apiResult.ResultObject[i].UserName,
                        name: apiResult.ResultObject[i].UserName + "-" + apiResult.ResultObject[i].FullName,
                        FullName: apiResult.ResultObject[i].FullName,
                        DepartmentName: apiResult.ResultObject[i].DepartmentName,
                        PositionName: apiResult.ResultObject[i].PositionName,
                        Address: apiResult.ResultObject[i].Address
                    });

                }
                
            }
            this.setState({
                ListOption: listOptionNew1
            });
        });
    }

    handleValueChange(selectedOption) {
        if (this.props.isSelectedOption == undefined || this.props.isSelectedOption == false)
            this.setState({ SelectedOption: selectedOption });

        if (this.props.onChange)
            this.props.onChange(this.props.name, selectedOption);

        if (this.props.onValueChange != null) {
            this.props.onValueChange(this.props.name, selectedOption);
        }
    }

    handleValueChange1(e) {
        let value = e.target.value;
        if (this.props.isPartner == undefined || this.props.isPartner == false) {
            if (value.length > 3 && e.keyCode != 40 && e.keyCode != 38) {
                this.callSearchData("*" + value + "*");
            }
        }
        else {
            if (value.length > 3 && e.keyCode != 40 && e.keyCode != 38 && value.substr(0, 3) != "004") {
                this.callSearchData("*" + value + "*");
            }
        }


    }
    render() {
        const listOption = this.state.ListOption;
        let listOptionNew = [];
        if (listOption != []) {
            for (let i = 0; i < listOption.length; i++) {
                listOptionNew.push({
                    value: listOption[i].value,
                    label: listOption[i].value + "-" + listOption[i].FullName,
                    FullName: listOption[i].FullName,
                    DepartmentName: listOption[i].DepartmentName,
                    PositionName: listOption[i].PositionName,
                    Address: listOption[i].Address,
                    style: { color: 'red' }
                });
            }
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
const MultiSelectComboBox = connect(mapStateToProps, mapDispatchToProps)(MultiSelectComboBoxCom);
export default MultiSelectComboBox;