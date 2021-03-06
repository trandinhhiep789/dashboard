import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { callGetCache } from "../../../../../actions/cacheAction";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";

class ProductComboBoxCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleValueonKeyDown = this.handleValueonKeyDown.bind(this);
        this.state = { ListOption: [], SelectedOption: [] }
    }

    componentDidMount() {
        let selectedOption = [];
        let values = this.props.value;
        if (values && !Array.isArray(values)) {
            selectedOption = this.callSearchData(values.trim(), true);
        }
    }

    bindData() {
        let values = this.props.value;
        let selectedOption = [];
        if (values && !Array.isArray(values)) {
            selectedOption = this.state.SelectedOption;
        }
        else if (typeof values != "undefined" && values != []) {
            for (let i = 0; i < values.length; i++) {
                selectedOption.push({ value: values[i].ProductID, label: values[i].ProductName });
            }
        }
        return selectedOption;
    }

    callSearchData(KeyWord, isFirstLoad) {
        let listMLObject =
        {
            "QueryParamList": [
                {
                    "QueryKey": "",
                    "QueryValue": "",
                    "QueryType": 18,
                    "IsNotQuery": false,
                    "SubQueryParamList": [
                        {
                            "QueryKey": "pRODUCTID",
                            "QueryValue": KeyWord,
                            "QueryType": 1,
                            "IsNotQuery": false
                        },
                        {
                            "QueryKey": "pRODUCTNAME",
                            "QueryValue": KeyWord,
                            "QueryType": 2,
                            "IsNotQuery": false
                        },
                        {
                            "QueryKey": "pRODUCTSHORTNAME",
                            "QueryValue": KeyWord,
                            "QueryType": 2,
                            "IsNotQuery": false
                        }
                    ]
                }
            ],
            "Top": 1000,
            "IndexName": "product",
            "TypeName": "product",
            "IsCompressResultData": false
        }
        this.props.callFetchAPI("ERPAPI", 'api/ProductSearch/Search', listMLObject).then(apiResult => {
            let dataSource = apiResult.ResultObject;
            let listOptionNew = [{ value: null, label: "------ Ch???n ------" }];
            let selectedOption = [];

            if(this.props.isFilter){
                dataSource=this.handleFilter(dataSource);
            }
           
            for (let i = 0; i < dataSource.length; i++) {
                listOptionNew.push({ value: dataSource[i].ProductID, label: dataSource[i].ProductName });
                selectedOption.push({ value:dataSource[i].ProductID, label: dataSource[i].ProductName });
            }

            // if (!isFirstLoad) {
            //     listOptionNew.unshift({ value: null, label: "------ Ch???n ------" });
            // }

            this.setState({
                ListOption: listOptionNew,
                SelectedOption: isFirstLoad ? selectedOption : []
            });
            return listOptionNew;
        });
    }

    getComboValue(selectedOption) {
        let values = [];
        if (selectedOption == null)
            return values;
        for (let i = 0; i < selectedOption.length; i++) {
            values.push({ ProductID: selectedOption[i].value, ProductName: selectedOption[i].label });
        }
        return values;
    }

    handleValueChange(selectedOption) {
        let comboValues = [];
        if (Array.isArray(selectedOption)) {
            comboValues = this.getComboValue(selectedOption);
        } else if (selectedOption == null) {
            comboValues.push({ ProductID: -1, ProductName: '------ Ch???n ------' });
        } else {
            comboValues.push({ ProductID: selectedOption.value, ProductName: selectedOption.label });
        }

        if (this.props.onValueChange)
            this.props.onValueChange(this.props.name, comboValues);


    }

    handleFilter(listOption) {
        const { isFilter, arrFieldFilter, arrValueFilter } = this.props;
        let result = [];
        if (isFilter) {
            result = listOption.filter(itemSource => {
                return arrFieldFilter.some(x => {
                    if (x in itemSource) {
                        let index = arrFieldFilter.findIndex(f => f == x);
                        let valueFilter = arrValueFilter[index];
                        return valueFilter.includes(itemSource[x]);
                    }
                })
            });
        }
        return result;
    }

    handleValueonKeyDown(e) {
        let value = e.target.value;
        if (value.length > 2 && e.keyCode != 40 && e.keyCode != 38) {
            this.callSearchData(value);
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

        let disabled = this.props.IsSystem ? this.props.IsSystem : this.props.disabled;
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
                        name={this.props.name}
                        value={selectedOption}
                        onChange={this.handleValueChange}
                        onKeyDown={this.handleValueonKeyDown}
                        options={listOption}
                        isMulti={this.props.isMulti !== undefined ? this.props.isMulti : true}
                        isDisabled={disabled}
                        isSearchable={true}
                        placeholder={"Nh???p m?? s???n ph???m"}
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
const ProductComboBox = connect(mapStateToProps, mapDispatchToProps)(ProductComboBoxCom);
export default ProductComboBox;