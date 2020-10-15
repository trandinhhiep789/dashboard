import React, { Component } from "react";
import { connect } from 'react-redux';
import FormContainer from "../../../../../common/components/FormContainer";
import FormControl from "../../../../../common/components/FormContainer/FormControl";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";

import {
    LoadAPIPath,
    MLObjectAbilitiItem,
    AddAPIAbilityPath,
    APIHostName,
    AddAPIAbilitiPath,
    EditAPIAbilitiPath
} from "../contants/index.js";
import { ERPCOMMONCACHE_SERVICESEASONTYPE } from "../../../../../constants/keyCache";

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

        // if (MLObject.MonthlyAbilityValue == "" && MLObject.DailyAbilityValue == "") {
        //     formData.txtDailyAbilityValue.ErrorLst.IsValidatonError = true;
        //     formData.txtDailyAbilityValue.ErrorLst.ValidatonErrorMessage = "Vui lòng thêm dữ liệu";

        //     formData.txtMonthlyAbilityValue.ErrorLst.IsValidatonError = true;
        //     formData.txtMonthlyAbilityValue.ErrorLst.ValidatonErrorMessage = "Vui lòng thêm dữ liệu";
        // }
        // else {
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        MLObject.ServiceAgreementID = this.props.dataSource.ServiceAgreementID.trim();
        MLObject.SignedDate = this.props.dataSource.SignedDate;

        // console.log("MLObject", MLObject)

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
    // }


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

    if (formData.txtDailyAbilityValue.value != '' || formData.txtMonthlyAbilityValue.value != '') {
        if (formData.txtDailyAbilityValue.value != '') {
            if (/^[0-9][0-9]*$/.test(formData.txtDailyAbilityValue.value.toString())) {
                formData.txtDailyAbilityValue.ErrorLst.IsValidatonError = false;
                formData.txtDailyAbilityValue.ErrorLst.ValidatonErrorMessage = "";
                formData.txtMonthlyAbilityValue.ErrorLst.IsValidatonError = false;
                formData.txtMonthlyAbilityValue.ErrorLst.ValidatonErrorMessage = ""
            } else {

                formData.txtDailyAbilityValue.ErrorLst.IsValidatonError = true;
                formData.txtDailyAbilityValue.ErrorLst.ValidatonErrorMessage = "Vui lòng nhập số";
            }
        }

        if (formData.txtMonthlyAbilityValue.value !="") {
            if (/^[0-9][0-9]*$/.test(formData.txtMonthlyAbilityValue.value.toString())) {
                formData.txtMonthlyAbilityValue.ErrorLst.IsValidatonError = false;
                formData.txtMonthlyAbilityValue.ErrorLst.ValidatonErrorMessage = ""
                formData.txtDailyAbilityValue.ErrorLst.IsValidatonError = false;
                formData.txtDailyAbilityValue.ErrorLst.ValidatonErrorMessage = "";
            }
            else {
                ;
                formData.txtMonthlyAbilityValue.ErrorLst.IsValidatonError = true;
                formData.txtMonthlyAbilityValue.ErrorLst.ValidatonErrorMessage = "Vui lòng nhập số";
            }
        }
    }
    else {
        // formData.txtDailyAbilityValue.ErrorLst.IsValidatonError = true;
        // formData.txtDailyAbilityValue.ErrorLst.ValidatonErrorMessage = "Vui lòng thêm dữ liệu";

        // formData.txtMonthlyAbilityValue.ErrorLst.IsValidatonError = true;
        // formData.txtMonthlyAbilityValue.ErrorLst.ValidatonErrorMessage = "Vui lòng thêm dữ liệu";

        formData.txtDailyAbilityValue.ErrorLst.IsValidatonError = false;
        formData.txtDailyAbilityValue.ErrorLst.ValidatonErrorMessage = "";

        formData.txtMonthlyAbilityValue.ErrorLst.IsValidatonError = false;
        formData.txtMonthlyAbilityValue.ErrorLst.ValidatonErrorMessage = "";
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
                        name="txtAbilityID"
                        colspan="9"
                        labelcolspan="3"
                        readOnly={true}
                        hidenControll={true}
                        label="mã năng lực"
                        placeholder="Mã năng lực tự động nhập"
                        controltype="InputControl"
                        value=""
                        datasourcemember="AbilityID"
                    />

                </div>
                <div className="col-md-6">
                    <FormControl.FormControlComboBox
                        name="cbServiceSeasonTypeID"
                        colspan="9"
                        labelcolspan="3"
                        label="loại mùa vụ"
                        disabled={IsSystem}
                        validatonList={["Comborequired"]}
                        isautoloaditemfromcache={true}
                        loaditemcachekeyid= {ERPCOMMONCACHE_SERVICESEASONTYPE} //"ERPCOMMONCACHE.SERVICESEASONTYPE"
                        valuemember="ServiceSeasonTypeID"
                        nameMember="ServiceSeasonTypeName"
                        controltype="InputControl"
                        value={-1}
                        listoption={[]}
                        datasourcemember="ServiceSeasonTypeID"
                    />

                </div>

                <div className="col-md-6"></div>

                <div className="col-md-6">
                    <FormControl.FormControlDatetimeNew
                        name="dtFromDate"
                        colspan="9"
                        labelcolspan="3"
                        readOnly={false}
                        timeFormat={false}
                        showTime={false}
                        disabled={IsSystem}
                        dateFormat="DD-MM-YYYY"//"YYYY-MM-DD"
                        label="Từ ngày"
                        placeholder="Từ ngày"
                        controltype="InputControl"
                        value={""}
                        validatonList={["required"]}
                        datasourcemember="FromDate"

                    />
                </div>

                <div className="col-md-6">
                    <FormControl.FormControlDatetimeNew
                        name="dtToDate"
                        colspan="9"
                        labelcolspan="3"
                        readOnly={false}
                        disabled={IsSystem}
                        showTime={false}
                        timeFormat={false}
                        dateFormat="DD-MM-YYYY"//"YYYY-MM-DD"
                        label="đến ngày"
                        placeholder="đến ngày"
                        controltype="InputControl"
                        value={""}
                        validatonList={["required"]}
                        datasourcemember="ToDate"

                    />
                </div>

                <div className="col-md-6">
                    <FormControl.TextBox
                        name="txtMonthlyAbilityValue"
                        colspan="9"
                        labelcolspan="3"
                        readOnly={IsSystem}
                        disabled={IsSystem}
                        label="theo tháng"
                        placeholder="theo tháng"
                        controltype="InputControl"
                        value=""
                        datasourcemember="MonthlyAbilityValue"
                        classNameCustom="customcontrol"
                        maxSize={6}
                    />
                </div>
                <div className="col-md-6">
                    <FormControl.TextBox
                        name="txtDailyAbilityValue"
                        colspan="9"
                        labelcolspan="3"
                        readOnly={IsSystem}
                        disabled={IsSystem}
                        label="theo ngày"
                        placeholder="theo ngày"
                        controltype="InputControl"
                        value=""
                        datasourcemember="DailyAbilityValue"
                        classNameCustom="customcontrol"
                        maxSize={6}
                    />
                </div>

                <div className="col-md-6">
                    <FormControl.TextBox
                        name="txtNote"
                        colspan="9"
                        labelcolspan="3"
                        readOnly={IsSystem}
                        disabled={IsSystem}
                        label="Ghi chú"
                        controltype="InputControl"
                        value=""
                        datasourcemember="Note"
                        classNameCustom="customcontrol"
                    />
                </div>

                <div className="col-md-6"></div>

                <div className="col-md-6">
                    <FormControl.CheckBox
                        name="ckIsActived"
                        colspan="9"
                        labelcolspan="3"
                        readOnly={IsSystem}
                        disabled={IsSystem}
                        label="kích hoạt"
                        controltype="InputControl"
                        value={true}
                        datasourcemember="IsActived"
                        classNameCustom="customCheckbox"
                    />
                </div>
                <div className="col-md-6">
                    <FormControl.CheckBox
                        name="ckIsSystem"
                        colspan="9"
                        labelcolspan="3"
                        readOnly={false}
                        label="hệ thống"
                        controltype="InputControl"
                        value=""
                        datasourcemember="IsSystem"
                        classNameCustom="customCheckbox"
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