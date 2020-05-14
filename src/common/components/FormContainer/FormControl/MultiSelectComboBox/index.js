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

        let SelectedOption = [];

        this.state = { ListOption: [], SelectedOption: [] }
    }



    componentDidMount() {

        this.setState({
            ListOption: this.props.listoption,
            SelectedOption: this.props.value
        });
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
                listOptionNew1.push({ value: apiResult.ResultObject[i].UserName, name: apiResult.ResultObject[i].UserName + "-" + apiResult.ResultObject[i].FullName });
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

        let listMLObject = [];
        if (selectedOption) {
            for (let i = 0; i < selectedOption.length; i++) {
                listMLObject.push({
                    ShipmentOrderID: this.props.ShipmentOrder.ShipmentOrderID, UserName: selectedOption[i].value,
                    CreatedUser: "administrator",
                    CreatedOrderTime: this.props.ShipmentOrder.CreatedOrderTime
                });
            }
        }
        else {
            listMLObject.push({
                ShipmentOrderID: this.props.ShipmentOrder.ShipmentOrderID,
                CreatedUser: "administrator"
            });
        }
        this.props.callFetchAPI("PIMAPI", 'api/ShipmentOrder_DeliverUser/AddList', listMLObject).then(apiResult => {
            this.setState({ SelectedOption: selectedOption });
        });

    }

    handleValueChange1(e) {
        let value = e.target.value;
        if (value.length > 3 && e.keyCode != 40 && e.keyCode != 38) {
            this.callSearchData("*" + value + "*");
        }

    }
    render() {

        const listOption = this.state.ListOption;
        let listOptionNew = [];
        for (let i = 0; i < listOption.length; i++) {
            listOptionNew.push({ value: listOption[i].value, label: listOption[i].name, style: { color: 'red' } });
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

        return (
            <div className={formRowClassName} >
                {isLabelDiv &&
                    <div className={labelDivClassName}>
                        <label className="col-form-label">{this.props.label}</label>
                    </div>
                }
                <div className={formGroupClassName}>
                    <Select
                        value={selectedOption}
                        onChange={this.handleValueChange}
                        onKeyDown={this.handleValueChange1}
                        options={listOptionNew}
                        isMulti={true}
                        isDisabled={this.props.disabled}
                        isSearchable={true}
                        placeholder={"----Chọn -----"}
                        className={"select-custom"}
                    />
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