import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { callGetCache } from "../../../../actions/cacheAction";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import MultiSelectComboBox from "../../../../common/components/FormContainer/FormControl/MultiSelectComboBox";
import FormControl from "../../../../common/components/FormContainer/FormControl";

class DeliverUserListCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleValueonKeyDown = this.handleValueonKeyDown.bind(this);

        this.handleValueChange1 = this.handleValueChange1.bind(this);
        this.state = { ListOption: [], SelectedOption: [] }
    }

    componentDidMount() {
    }
    bindData() {
        let values = this.props.value;
        let selectedOption = [];
        if (typeof values != "undefined" && values != []) {
            for (let i = 0; i < values.length; i++) {
                if (values[i].UserName != -1)
                    selectedOption.push({ value: values[i].UserName, label: values[i].FullName });
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

    handleValueChange(name, value) {

        let listMLObject = [];
        if (value) {
            if (this.props.isMultiSelect == true) {
                for (let i = 0; i < value.length; i++) {
                    listMLObject.push({
                        UserName: value[i],
                        CreatedUser: this.props.AppInfo.LoginInfo.Username

                    });
                }
            }
            else {
                listMLObject.push({
                    UserName: value,
                    CreatedUser: this.props.AppInfo.LoginInfo.Username

                });

            }

        }
        // let comboValues = this.getComboValue(selectedOption);


        if (this.props.onValueChange)
            this.props.onValueChange(this.props.name, listMLObject);
    }

    handleValueonKeyDown(e) {
        let value = e.target.value;
        if (value.length > 2 && e.keyCode != 40 && e.keyCode != 38) {
            this.callSearchData("*" + value + "*");
        }
    }
    handleValueChange1(name, selectedOption) {
        let listMLObject = [];
        if (selectedOption) {
            if (this.props.isMultiSelect == true) {

                for (let i = 0; i < selectedOption.length; i++) {
                    listMLObject.push({
                        UserName: selectedOption[i].value,
                        CreatedUser: this.props.AppInfo.LoginInfo.Username,
                    });
                }
            } else {
                listMLObject.push({
                    UserName: selectedOption.value,
                    CreatedUser: this.props.AppInfo.LoginInfo.Username,
                });
            }
        }

        if (this.props.onValueChange)
            this.props.onValueChange(this.props.name, listMLObject);

    }
    render() {
        let listOption = [];
        let objDeliverUser = [];
        if (this.props.value != -1) {
            if (this.props.filterValue != -1) {
                this.props.value && this.props.value.map((item, index) => {
                    objDeliverUser.push(item.UserName)
                })
            }
            else {
                this.props.value && this.props.value.map((item, index) => {
                    listOption.push({ value: item.UserName, label: item.UserName + "-" + item.FullName });
                })
            }
        }
        return (
            <div>
                {this.props.filterValue == -1 ?
                    <MultiSelectComboBox
                        name="ShipmentOrder_DeliverUserList"
                        colspan={this.props.colspan}
                        labelcolspan={this.props.labelcolspan}
                        label="Nhân viên giao"
                        disabled={this.props.disabled}
                        readOnly={this.props.readOnly}
                        IsLabelDiv={true}
                        isautoloaditemfromcache={false}
                        validatonList={["Comborequired"]}
                        controltype="InputControl"
                        value={listOption}
                        onChange={this.handleValueChange1}
                        listoption={[]}
                        isMultiSelect={this.props.isMultiSelect}
                        datasourcemember="ShipmentOrder_DeliverUserList"
                        validationErrorMessage={this.props.validationErrorMessage}

                    /> :
                    <FormControl.FormControlComboBox
                        name="ShipmentOrder_DeliverUserList"
                        colspan={this.props.colspan}
                        labelcolspan={this.props.labelcolspan}
                        label="Nhân viên giao"
                        validatonList={["Comborequired"]}
                        disabled={this.props.disabled}
                        readOnly={this.props.readOnly}
                        isautoloaditemfromcache={true}
                        loaditemcachekeyid="ERPCOMMONCACHE.PARTNERUSER"
                        valuemember="UserName"
                        nameMember="FullName"
                        controltype="InputControl"
                        value={objDeliverUser}
                        onValueChange={this.handleValueChange}
                        listoption={null}
                        datasourcemember="PartnerID"
                        placeholder="---Vui lòng chọn---"
                        isMultiSelect={this.props.isMultiSelect}
                        filterValue={this.props.filterValue}
                        filterobj="PartnerID"
                        validationErrorMessage={this.props.validationErrorMessage}
                    />
                }
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
const DeliverUserList = connect(mapStateToProps, mapDispatchToProps)(DeliverUserListCom);
export default DeliverUserList;