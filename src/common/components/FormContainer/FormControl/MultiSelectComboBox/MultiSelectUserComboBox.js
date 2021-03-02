import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { callGetCache, callGetUserCache } from "../../../../../actions/cacheAction";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { GET_CACHE_USER_FUNCTION_LIST } from "../../../../../constants/functionLists";

class MultiSelectUserComboBoxCom extends React.Component {
    static defaultProps = {
        componenttype: 'InputControl'
    }
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleValueChange1 = this.handleValueChange1.bind(this);
        this.checkPermission = this.checkPermission.bind(this);
        this.state = { ListOption: [], SelectedOption: [], IsDisabled: true }
    }



    componentDidMount() {
        const { disabled, IsPermission, PermissionKey } = this.props;
        this.setState({
            ListOption: this.props.listoption,
            SelectedOption: this.props.value == undefined ? this.props.listoption : this.props.value
        });

        if (!disabled) {
            this.setState({ IsDisabled: false });
        }
        if (!disabled && IsPermission) {
            this.checkPermission(PermissionKey);
        }
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
                listOptionNew1.push({
                    value: apiResult.ResultObject[i].UserName,
                    name: apiResult.ResultObject[i].UserName + "-" + apiResult.ResultObject[i].FullName,
                    FullName: apiResult.ResultObject[i].FullName,
                    DepartmentName: apiResult.ResultObject[i].DepartmentName,
                    PositionName: apiResult.ResultObject[i].PositionName,
                    Address: apiResult.ResultObject[i].Address

                });
            }
            this.setState({
                ListOption: listOptionNew1
            });
        });
    }

    handleValueChange(selectedOption) {
        this.setState({ SelectedOption: selectedOption });
        if (this.props.onValueChange)
            this.props.onValueChange(this.props.name, selectedOption);
    }

    handleValueChange1(e) {
        let value = e.target.value;
        if (value.length > 3 && e.keyCode != 40 && e.keyCode != 38) {
            this.callSearchData("*" + value + "*");
        }
    }


    checkPermission(permissionKey) {
        this.props.callGetUserCache(GET_CACHE_USER_FUNCTION_LIST).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                for (let i = 0; i < result.ResultObject.CacheData.length; i++) {
                    if (result.ResultObject.CacheData[i].FunctionID == permissionKey) {
                        this.setState({ IsDisabled: false });
                        return;
                    }
                }
            }

            const LoginInfo = localStorage.getItem('LoginInfo');
            if (LoginInfo) {
                const LoginInfo1 = JSON.parse(LoginInfo);

                this.handleValueChange({
                    value: LoginInfo1.LoginUserInfo.UserName,
                    label: LoginInfo1.LoginUserInfo.UserName + "-" + LoginInfo1.LoginUserInfo.FullName,
                    name: LoginInfo1.LoginUserInfo.UserName + "-" + LoginInfo1.LoginUserInfo.FullName,
                    FullName: LoginInfo1.LoginUserInfo.FullName,
                    DepartmentName: LoginInfo1.LoginUserInfo.DepartmentName,
                    PositionName: LoginInfo1.LoginUserInfo.PositionName,
                    Address: ""
                })

                this.setState({ IsDisabled: true });
            }
        });
    }

    render() {
        const listOption = this.state.ListOption;
        let listOptionNew = [];
        for (let i = 0; i < listOption.length; i++) {
            listOptionNew.push({
                value: listOption[i].value,
                label: listOption[i].name,
                FullName: listOption[i].FullName,
                DepartmentName: listOption[i].DepartmentName,
                PositionName: listOption[i].PositionName,
                Address: listOption[i].Address,
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
        let labelDivClassName = "col-md-2";
        if (this.props.labelcolspan != null) {
            labelDivClassName = "col-md-" + this.props.labelcolspan;
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
        let classNameselect = "select react-select";
        if (this.props.validationErrorMessage != undefined && this.props.validationErrorMessage != "") {
            classNameselect += " is-invalid";
        }
        // console.log("ListOption", this.state.SelectedOption, this.props.isMultiSelect)
        // console.log("props", this.props)
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
                        // isDisabled={this.props.disabled }
                        isDisabled={this.state.IsDisabled}
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
        },
        callGetUserCache: (cacheKeyID) => {
            return dispatch(callGetUserCache(cacheKeyID));
        }
    }
}
const MultiSelectUserComboBox = connect(mapStateToProps, mapDispatchToProps)(MultiSelectUserComboBoxCom);
export default MultiSelectUserComboBox;