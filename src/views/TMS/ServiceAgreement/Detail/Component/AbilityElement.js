import React, { Component } from "react";
import { connect } from 'react-redux';

import {
    AddAPIAbilitiPath,
    APIHostName,
    EditAPIAbilitiPath,
    MLObjectAbilitiItem
} from "../contants/index.js";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { ERPCOMMONCACHE_SERVICESEASONTYPE } from "../../../../../constants/keyCache";
import FormContainer from "../../../../../common/components/FormContainer";
import FormControl from "../../../../../common/components/FormContainer/FormControl";

class AbilityElementCom extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            IsSystem: false
        }
    }

    componentDidMount() {
        if (this.props.index != undefined) {
            this.setState({
                IsSystem: this.props.dataSource.Ability_ItemList[this.props.index].IsSystem
            })
        }
    }

    handleSubmit(formData, MLObject) {
        if (MLObject.DailyAbilityValue == "" || parseFloat(MLObject.DailyAbilityValue) == 0) {
            formData.txtDailyAbilityValue.ErrorLst.IsValidatonError = true;
            formData.txtDailyAbilityValue.ErrorLst.ValidatonErrorMessage = "Vui lòng nhập số";
            return;
        }

        if (MLObject.MonthlyAbilityValue == "" || parseFloat(MLObject.MonthlyAbilityValue) == 0) {
            formData.txtMonthlyAbilityValue.ErrorLst.IsValidatonError = true;
            formData.txtMonthlyAbilityValue.ErrorLst.ValidatonErrorMessage = "Vui lòng nhập số";
            return;
        }

        MLObject.DailyAbilityValue = parseFloat(MLObject.DailyAbilityValue);
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        MLObject.MonthlyAbilityValue = parseFloat(MLObject.MonthlyAbilityValue);
        MLObject.ServiceAgreementID = this.props.dataSource.ServiceAgreementID.trim();
        MLObject.SignedDate = this.props.dataSource.SignedDate;

        if (this.props.index != undefined) {
            MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
            this.props.callFetchAPI(APIHostName, EditAPIAbilitiPath, MLObject).then(apiResult => {
                this.props.onInputChangeObj(this.props.dataSource.ServiceAgreementID, apiResult);
            });
        }
        else {
            MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
            this.props.callFetchAPI(APIHostName, AddAPIAbilitiPath, MLObject).then(apiResult => {
                this.props.onInputChangeObj(this.props.dataSource.ServiceAgreementID, apiResult);
            });
        }
    }

    handleChange(formData, MLObject) {
        if (formData.dtToDate.value.length > 0) {
            if (formData.dtFromDate.value >= formData.dtToDate.value) {
                formData.dtToDate.ErrorLst.IsValidatonError = true;
                formData.dtToDate.ErrorLst.ValidatonErrorMessage = "Ngày kết thúc phải lớn hơn bắt đầu";
            }
            else {
                formData.dtToDate.ErrorLst.IsValidatonError = false;
                formData.dtToDate.ErrorLst.ValidatonErrorMessage = "";
            }
        }

        if (formData.txtDailyAbilityValue.value != '') {
            if (/^\d*\.?\d+$/.test(formData.txtDailyAbilityValue.value.toString())) {
                formData.txtDailyAbilityValue.ErrorLst.IsValidatonError = false;
                formData.txtDailyAbilityValue.ErrorLst.ValidatonErrorMessage = "";
            } else {
                formData.txtDailyAbilityValue.ErrorLst.IsValidatonError = true;
                formData.txtDailyAbilityValue.ErrorLst.ValidatonErrorMessage = "Vui lòng nhập số";
            }
        }

        if (formData.txtMonthlyAbilityValue.value != "") {
            if (/^\d*\.?\d+$/.test(formData.txtMonthlyAbilityValue.value.toString())) {
                formData.txtMonthlyAbilityValue.ErrorLst.IsValidatonError = false;
                formData.txtMonthlyAbilityValue.ErrorLst.ValidatonErrorMessage = ""
            }
            else {
                formData.txtMonthlyAbilityValue.ErrorLst.IsValidatonError = true;
                formData.txtMonthlyAbilityValue.ErrorLst.ValidatonErrorMessage = "Vui lòng nhập số";
            }
        }
    }

    render() {

        const AddElementList = []
        const { IsSystem } = this.state;
        return (
            <FormContainer
                MLObjectDefinition={MLObjectAbilitiItem}
                dataSource={this.props.index != undefined ? this.props.dataSource.Ability_ItemList[this.props.index] : null}
                listelement={AddElementList}
                onSubmit={this.handleSubmit}
                IsCloseModal={true}
                onchange={this.handleChange.bind(this)}
            >

                <div className="row">
                    <div className="col-md-12">
                        <FormControl.FormControlTextBox
                            colspan="9"
                            controltype="InputControl"
                            datasourcemember="AbilityID"
                            hidenControll={true}
                            label="mã năng lực"
                            labelcolspan="3"
                            name="txtAbilityID"
                            placeholder="Mã năng lực tự động nhập"
                            readOnly={true}
                            value=""
                        />

                    </div>
                    <div className="col-md-6">
                        <FormControl.FormControlComboBox
                            colspan="9"
                            controltype="InputControl"
                            datasourcemember="ServiceSeasonTypeID"
                            disabled={IsSystem}
                            isautoloaditemfromcache={true}
                            label="Loại mùa dịch vụ"
                            labelcolspan="3"
                            listoption={[]}
                            loaditemcachekeyid={ERPCOMMONCACHE_SERVICESEASONTYPE} //"ERPCOMMONCACHE.SERVICESEASONTYPE"
                            name="cbServiceSeasonTypeID"
                            nameMember="ServiceSeasonTypeName"
                            validatonList={["Comborequired"]}
                            value={-1}
                            valuemember="ServiceSeasonTypeID"
                        />

                    </div>

                    <div className="col-md-6"></div>

                    <div className="col-md-6">
                        <FormControl.FormControlDatetimeNew
                            colspan="9"
                            controltype="InputControl"
                            datasourcemember="FromDate"
                            dateFormat="DD-MM-YYYY"//"YYYY-MM-DD"
                            disabled={IsSystem}
                            label="Từ ngày"
                            labelcolspan="3"
                            name="dtFromDate"
                            placeholder="Từ ngày"
                            readOnly={false}
                            showTime={false}
                            timeFormat={false}
                            validatonList={["required"]}
                            value={""}

                        />
                    </div>

                    <div className="col-md-6">
                        <FormControl.FormControlDatetimeNew
                            colspan="9"
                            controltype="InputControl"
                            datasourcemember="ToDate"
                            dateFormat="DD-MM-YYYY"//"YYYY-MM-DD"
                            disabled={IsSystem}
                            label="đến ngày"
                            labelcolspan="3"
                            name="dtToDate"
                            placeholder="đến ngày"
                            readOnly={false}
                            showTime={false}
                            timeFormat={false}
                            validatonList={["required"]}
                            value={""}

                        />
                    </div>

                    <div className="col-md-6">
                        <FormControl.TextBox
                            classNameCustom="customcontrol"
                            colspan="9"
                            controltype="InputControl"
                            datasourcemember="MonthlyAbilityValue"
                            disabled={IsSystem}
                            label="theo tháng"
                            labelcolspan="3"
                            maxSize={6}
                            name="txtMonthlyAbilityValue"
                            placeholder="theo tháng"
                            readOnly={IsSystem}
                            value=""
                        />
                    </div>
                    <div className="col-md-6">
                        <FormControl.TextBox
                            classNameCustom="customcontrol"
                            colspan="9"
                            controltype="InputControl"
                            datasourcemember="DailyAbilityValue"
                            disabled={IsSystem}
                            label="theo ngày"
                            labelcolspan="3"
                            maxSize={6}
                            name="txtDailyAbilityValue"
                            placeholder="theo ngày"
                            readOnly={IsSystem}
                            value=""
                        />
                    </div>

                    <div className="col-md-6">
                        <FormControl.TextBox
                            classNameCustom="customcontrol"
                            colspan="9"
                            controltype="InputControl"
                            datasourcemember="Note"
                            disabled={IsSystem}
                            label="Ghi chú"
                            labelcolspan="3"
                            name="txtNote"
                            readOnly={IsSystem}
                            value=""
                        />
                    </div>

                    <div className="col-md-6"></div>

                    <div className="col-md-6">
                        <FormControl.CheckBox
                            classNameCustom="customCheckbox"
                            colspan="9"
                            controltype="InputControl"
                            datasourcemember="IsActived"
                            disabled={IsSystem}
                            label="kích hoạt"
                            labelcolspan="3"
                            name="ckIsActived"
                            readOnly={IsSystem}
                            value={true}
                        />
                    </div>
                    <div className="col-md-6">
                        <FormControl.CheckBox
                            classNameCustom="customCheckbox"
                            colspan="9"
                            controltype="InputControl"
                            datasourcemember="IsSystem"
                            label="hệ thống"
                            labelcolspan="3"
                            name="ckIsSystem"
                            readOnly={false}
                            value=""
                        />
                    </div>

                </div>

            </FormContainer>
        );
    }
}

const mapStateToProps = state => {
    return {
        AppInfo: state,
        FetchAPIInfo: state.FetchAPIInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },

    }
}


const AbilityElement = connect(mapStateToProps, mapDispatchToProps)(AbilityElementCom);
export default AbilityElement;