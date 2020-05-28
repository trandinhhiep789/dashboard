import React, { Component } from "react";
import { connect } from 'react-redux';
import ModelContainer from "../../../../common/components/Modal/ModelContainer";
import { ModalManager } from 'react-dynamic-modal';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import Select from 'react-select';
import MapContainer from './MapContainer ';
import { Link } from "react-router-dom";
import { callGetCache } from "../../../../actions/cacheAction";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { ERPCOMMONCACHE_PROVINCE, ERPCOMMONCACHE_DISTRICT, ERPCOMMONCACHE_WARD } from "../../../../constants/keyCache";
import FormControl from "../../../../common/components/FormContainer/FormControl";
import { ValidationField } from "../../../../common/library/validation.js";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import {
    APIHostName,
} from "../constants";
const style = {
    width: '100%',
    height: '100%',
    position: 'relative'
}

const containerStyle = {
    position: 'absolute',
    width: '98%',
    height: '300px'
}


class ShipmentOrderAddressCom extends Component {
    constructor(props) {
        super(props);

        this.ShowModalSender = this.ShowModalSender.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.elementItemRefs = [];
        this.state = {
            ShipmentOrder: this.props.ShipmentOrderAddress,
            ShipmentOrderEdit: this.props.ShipmentOrderAddress,
            ProvinceLst: [],
            DistrictLst: [],
            WardLst: [],
            Province: [],
            District: [],
            Ward: [],
            dataOrderAddressSender: {},
            FormDataSenderLst: {}
        }
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        this.initCombobox();
        this.setValueCombobox();
    }

    CheckPermissionUser(id) {
        if (this.state.ShipmentOrder.CurrentStepPermissionList && this.state.ShipmentOrder.CurrentStepPermissionList.length > 0) {
            if (this.state.ShipmentOrder.CurrentStepPermissionList.some(a => a.ShipmentOrderPermissionID === id)) {
                return true;
            }
        }
        return false;
    }

    handleValueChange(name, value, label, labelnew, validatonList) {
        let { ShipmentOrderEdit, FormDataSenderLst } = this.state;
        let formData = FormDataSenderLst;
        const aa = { labelError: undefined }
        if (typeof validatonList != "undefined") {
            const validation = ValidationField(validatonList, value, label, aa);
            const validationObject = { IsValidatonError: validation.IsError, ValidatonErrorMessage: validation.Message };
            const ObjectName = { ErrorLst: validationObject };
            formData = Object.assign({}, formData, { [name]: ObjectName });
            ShipmentOrderEdit[name] = validation.fieldValue;
        }
        else {
            ShipmentOrderEdit[name] = value;
        }

        if (name == "SenderAddress") {
            ShipmentOrderEdit.SenderGeoLocation = "10.852982,105.700";
        }
        this.setState({ ShipmentOrderEdit: ShipmentOrderEdit, FormDataSenderLst: formData }, () => {
            this.ShowModalSender();
        });
    }

    handleValueChangeGeoLocation(lat, lng) {
        let { ShipmentOrderEdit } = this.state;
    }
    handleValueChangeProvince(selectedOption) {
        const comboValues = this.getComboValue(selectedOption);
        let { ShipmentOrderEdit, FormDataSenderLst } = this.state;
        ShipmentOrderEdit['SenderProvinceID'] = comboValues;
        ShipmentOrderEdit['SenderDistrictID'] = -1;
        ShipmentOrderEdit['SenderWardID'] = -1;
        this.setValueCombobox(2, comboValues, -1)
        let formData = FormDataSenderLst;
        const aa = { labelError: undefined }
        const validation = ValidationField(["Comborequired"], comboValues, "tỉnh/thành phố", aa);
        const validationObject = { IsValidatonError: validation.IsError, ValidatonErrorMessage: validation.Message };
        const ObjectName = { ErrorLst: validationObject };
        const ObjectNameDistrict = { ErrorLst: { IsValidatonError: true, ValidatonErrorMessage: "Vui lòng chọn quận/huyện" } };
        const ObjectNameWard = { ErrorLst: { IsValidatonError: true, ValidatonErrorMessage: "Vui lòng chọn phường/xã" } };
        formData = Object.assign({}, formData, { ["SenderProvinceID"]: ObjectName });
        formData = Object.assign({}, formData, { ["SenderDistrictID"]: ObjectNameDistrict });
        formData = Object.assign({}, formData, { ["SenderWardID"]: ObjectNameWard });
        this.setState({ ShipmentOrderEdit: ShipmentOrderEdit, FormDataSenderLst: formData }, () => {
            this.ShowModalSender();
        });
    }
    handleValueChangeDistrict(selectedOption) {
        let { ShipmentOrderEdit, FormDataSenderLst } = this.state;
        const comboValues = this.getComboValue(selectedOption);
        ShipmentOrderEdit['SenderDistrictID'] = comboValues;
        ShipmentOrderEdit['SenderWardID'] = -1;
        this.setValueCombobox(2, ShipmentOrderEdit.SenderProvinceID, comboValues)
        let formData = FormDataSenderLst;
        if (parseInt(comboValues) < 0) {
            const ObjectNameDistrict = { ErrorLst: { IsValidatonError: true, ValidatonErrorMessage: "Vui lòng chọn quận/huyện" } };
            const ObjectNameWard = { ErrorLst: { IsValidatonError: true, ValidatonErrorMessage: "Vui lòng chọn phường/xã" } };
            formData = Object.assign({}, formData, { ["SenderDistrictID"]: ObjectNameDistrict });
            formData = Object.assign({}, formData, { ["SenderWardID"]: ObjectNameWard });
        }
        else {
            const ObjectNameDistrict = { ErrorLst: { IsValidatonError: false, ValidatonErrorMessage: "" } };
            const ObjectNameWard = { ErrorLst: { IsValidatonError: true, ValidatonErrorMessage: "Vui lòng chọn phường/xã" } };
            formData = Object.assign({}, formData, { ["SenderDistrictID"]: ObjectNameDistrict });
            formData = Object.assign({}, formData, { ["SenderWardID"]: ObjectNameWard });
        }

        this.setState({ ShipmentOrderEdit: ShipmentOrderEdit, FormDataSenderLst: formData }, () => {
            this.ShowModalSender();
        });
    }
    handleValueChangeWard(selectedOption) {
        const comboValues = this.getComboValue(selectedOption);
        let { ShipmentOrderEdit, FormDataSenderLst } = this.state;
        ShipmentOrderEdit['SenderWardID'] = comboValues;
        this.setValueCombobox(2, ShipmentOrderEdit.SenderProvinceID, ShipmentOrderEdit.SenderDistrictID)
        let formData = FormDataSenderLst;
        if (parseInt(comboValues) < 0) {
            const ObjectNameWard = { ErrorLst: { IsValidatonError: true, ValidatonErrorMessage: "Vui lòng chọn phường/xã" } };
            formData = Object.assign({}, formData, { ["SenderWardID"]: ObjectNameWard });
        }
        else {
            const ObjectNameWard = { ErrorLst: { IsValidatonError: false, ValidatonErrorMessage: "" } };
            formData = Object.assign({}, formData, { ["SenderWardID"]: ObjectNameWard });
        }
        this.setState({ ShipmentOrderEdit: ShipmentOrderEdit, FormDataSenderLst: formData }, () => {
            this.ShowModalSender();
        });
    }
    ShowModalSender() {
        const Province = this.bindcombox(this.state.ProvinceLst, this.state.ShipmentOrderEdit.SenderProvinceID);
        const District = this.bindcombox(this.state.DistrictLst, this.state.ShipmentOrderEdit.SenderDistrictID);
        const Ward = this.bindcombox(this.state.WardLst, this.state.ShipmentOrderEdit.SenderWardID);
        ModalManager.open(
            <ModelContainer
                title="Cập nhật thông tin địa chỉ người gửi"
                name=""
                content={""}
                onRequestClose={() => false}
                IsButton={!this.CheckPermissionUser(3)||!this.CheckPermissionUser(4)}
                onChangeModal={this.handleUpdateAddressSender.bind(this)}
            >
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <FormControl.TextBox
                            name="SenderFullName"
                            colspan="8"
                            labelcolspan="4"
                            label="họ và tên"
                            onValueChange={this.handleValueChange.bind(this)}
                            readOnly={!this.CheckPermissionUser(3)}
                            inputRef={ref => this.elementItemRefs["SenderFullName"] = ref}
                            placeholder="Họ và tên"
                            controltype="InputControl"
                            value={this.state.ShipmentOrderEdit.SenderFullName}
                            datasourcemember="SenderFullName"
                            validatonList={["required"]}
                            validationErrorMessage={(this.state.FormDataSenderLst["SenderFullName"] != undefined ? this.state.FormDataSenderLst["SenderFullName"].ErrorLst.ValidatonErrorMessage : "")}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <FormControl.TextBox
                            name="SenderPhoneNumber"
                            colspan="8"
                            labelcolspan="4"
                            label="số điện thoại"
                            onValueChange={this.handleValueChange.bind(this)}
                            readOnly={!this.CheckPermissionUser(3)}
                            inputRef={ref => this.elementItemRefs["SenderPhoneNumber"] = ref}
                            placeholder="Số điện thoại"
                            controltype="InputControl"
                            value={this.state.ShipmentOrderEdit.SenderPhoneNumber}
                            datasourcemember="SenderPhoneNumber"
                            validatonList={["required", "number"]}
                            validationErrorMessage={(this.state.FormDataSenderLst["SenderPhoneNumber"] != undefined ? this.state.FormDataSenderLst["SenderPhoneNumber"].ErrorLst.ValidatonErrorMessage : "")}
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label className="col-form-label 6">Tỉnh/thành phố<span className="text-danger">*</span></label>
                            </div>
                            <div className="form-group col-md-8">
                                <div className="form-group-input-select">
                                    <Select
                                        value={Province}
                                        name={"SenderProvinceID"}
                                        onChange={this.handleValueChangeProvince.bind(this)}
                                        options={this.state.ProvinceLst}
                                        isDisabled={!this.CheckPermissionUser(4)}
                                        inputRef={ref => this.elementItemRefs["SenderProvinceID"] = ref}
                                        isMulti={false}
                                        isSearchable={true}
                                        className={(this.state.ShipmentOrderEdit.SenderProvinceID == -1 ? "react-select is-invalid" : "react-select")}
                                        placeholder="--Vui lòng chọn--"
                                    />
                                    <div className="invalid-feedback"><ul className="list-unstyled"><li>{(this.state.FormDataSenderLst["SenderProvinceID"] != undefined ? this.state.FormDataSenderLst["SenderProvinceID"].ErrorLst.ValidatonErrorMessage : "")}</li></ul></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group col-md-6">
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label className="col-form-label 6">Quận/huyện<span className="text-danger">*</span></label>
                            </div>
                            <div className="form-group col-md-8">
                                <div className="form-group-input-select">
                                    <Select
                                        value={District}
                                        name={"SenderDistrictID"}
                                        onChange={this.handleValueChangeDistrict.bind(this)}
                                        options={this.state.DistrictLst}
                                        isDisabled={!this.CheckPermissionUser(4)}
                                        inputRef={ref => this.elementItemRefs["SenderDistrictID"] = ref}
                                        isMulti={false}
                                        isSearchable={true}
                                        className={(this.state.ShipmentOrderEdit.SenderDistrictID == -1 ? "react-select is-invalid" : "react-select")}
                                        placeholder='--Vui lòng chọn--'
                                    />
                                    <div className="invalid-feedback"><ul className="list-unstyled"><li>{(this.state.FormDataSenderLst["SenderDistrictID"] != undefined ? this.state.FormDataSenderLst["SenderDistrictID"].ErrorLst.ValidatonErrorMessage : "")}</li></ul></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label className="col-form-label 6">Phường/xã<span className="text-danger">*</span></label>
                            </div>
                            <div className="form-group col-md-8">
                                <div className="form-group-input-select">
                                    <Select
                                        value={Ward}
                                        name={"SenderWardID"}
                                        onChange={this.handleValueChangeWard.bind(this)}
                                        options={this.state.WardLst}
                                        isDisabled={!this.CheckPermissionUser(4)}
                                        inputRef={ref => this.elementItemRefs["SenderWardID"] = ref}
                                        isMulti={false}
                                        isSearchable={true}
                                        className={(this.state.ShipmentOrderEdit.SenderWardID == -1 ? "react-select is-invalid" : "react-select")}
                                        placeholder="--Vui lòng chọn--"
                                    />
                                    <div className="invalid-feedback"><ul className="list-unstyled"><li>{(this.state.FormDataSenderLst["SenderWardID"] != undefined ? this.state.FormDataSenderLst["SenderWardID"].ErrorLst.ValidatonErrorMessage : "")}</li></ul></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group col-md-6">
                        <FormControl.TextBox
                            name="SenderAddress"
                            colspan="8"
                            labelcolspan="4"
                            label="số nhà/đường"
                            onValueChange={this.handleValueChange.bind(this)}
                            readOnly={!this.CheckPermissionUser(4)}
                            placeholder="Số điện thoại người gửi"
                            controltype="InputControl"
                            value={this.state.ShipmentOrderEdit.SenderAddress}
                            inputRef={ref => this.elementItemRefs["SenderAddress"] = ref}
                            datasourcemember="SenderAddress"
                            validatonList={["required"]}
                            validationErrorMessage={""}
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-4">
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label className="col-form-label">Tọa độ:</label>
                            </div>
                            <div className="form-group col-md-8">
                                <label className="col-form-label">{this.state.ShipmentOrderEdit.SenderGeoLocation}</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group col-md-4">
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label className="col-form-label">Khoảng cách:</label>
                            </div>
                            <div className="form-group col-md-8">
                                <label className="col-form-label">{this.state.ShipmentOrderEdit.EstimateDeliveryDistance}km</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group col-md-4">
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label className="col-form-label">Thời gian:</label>
                            </div>
                            <div className="form-group col-md-8">
                                <label className="col-form-label">{this.state.ShipmentOrderEdit.EstimateDeliveryLong}phút</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-row google-maps">
                    <MapContainer
                        SenderGeoLocation={this.state.ShipmentOrderEdit.SenderGeoLocation}
                        onChange={this.handleValueChangeGeoLocation.bind(this)}
                        classStyle={style} classContainerStyle={containerStyle}
                    />
                </div>

            </ModelContainer>
        )
    }
    checkInputName(formValidation) {
        for (const key in formValidation) {
            //  console.log("validation:",formValidation[key].ErrorLst,formValidation[key].ErrorLst.IsValidatonError);
            if (formValidation[key].ErrorLst != undefined) {
                if (formValidation[key].ErrorLst != [] && formValidation[key].ErrorLst.IsValidatonError) {
                    this.elementItemRefs[key].focus();
                    return key;
                }
            }
        }
        return "";
    }
    handleUpdateAddressSender() {
        let { ShipmentOrderEdit, FormDataSenderLst } = this.state;
        let formData = FormDataSenderLst;
        if (ShipmentOrderEdit.SenderFullName.length == 0 || String(ShipmentOrderEdit.SenderFullName).trim() == "") {
            const ObjectNameSenderFullName = { ErrorLst: { IsValidatonError: true, ValidatonErrorMessage: "Vui lòng nhập họ và tên" } };
            formData = Object.assign({}, formData, { ["SenderFullName"]: ObjectNameSenderFullName });
        }
        if (ShipmentOrderEdit.SenderPhoneNumber.length == 0 || String(ShipmentOrderEdit.SenderPhoneNumber).trim() == "") {
            const ObjectNameSenderPhoneNumber = { ErrorLst: { IsValidatonError: true, ValidatonErrorMessage: "Vui lòng nhập số điện thoại" } };
            formData = Object.assign({}, formData, { ["SenderPhoneNumber"]: ObjectNameSenderPhoneNumber });
        }
        if (parseInt(ShipmentOrderEdit.SenderProvinceID) < 0) {
            const ObjectNameProvince = { ErrorLst: { IsValidatonError: true, ValidatonErrorMessage: "Vui lòng chọn tỉnh/thành phố" } };
            formData = Object.assign({}, formData, { ["SenderProvinceID"]: ObjectNameProvince });
        }
        if (parseInt(ShipmentOrderEdit.SenderDistrictID) < 0) {
            const ObjectNameDistrict = { ErrorLst: { IsValidatonError: true, ValidatonErrorMessage: "Vui lòng chọn quận/huyện" } };
            formData = Object.assign({}, formData, { ["SenderDistrictID"]: ObjectNameDistrict });
        }
        if (parseInt(ShipmentOrderEdit.SenderWardID) < 0) {
            const ObjectNameWard = { ErrorLst: { IsValidatonError: true, ValidatonErrorMessage: "Vui lòng chọn phường/xã" } };
            formData = Object.assign({}, formData, { ["SenderWardID"]: ObjectNameWard });
        }
        if (ShipmentOrderEdit.SenderAddress.length == 0 || String(ShipmentOrderEdit.SenderAddress).trim() == "") {
            const ObjectNameSenderAddress = { ErrorLst: { IsValidatonError: true, ValidatonErrorMessage: "Vui lòng nhập số nhà/đường" } };
            formData = Object.assign({}, formData, { ["SenderAddress"]: ObjectNameSenderAddress });
        }
        if (this.checkInputName(formData) != "")
        {
            this.setState({ ShipmentOrderEdit: ShipmentOrderEdit, FormDataSenderLst: formData }, () => {
                this.ShowModalSender();
            });
        }
        else
        {
            ShipmentOrderEdit.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
            this.props.callFetchAPI(APIHostName, 'api/ShipmentOrder/UpdateShipmentOrderAddress', ShipmentOrderEdit).then((apiResult) => {
                if (!apiResult.IsError) {
                    ModalManager.close();
                }
            });
        }
    }

    
    addNotification(message1, IsError) {
        if (!IsError) {
            this.setState({
                cssNotification: "notification-custom-success",
                iconNotification: "fa fa-check"
            });
        } else {
            this.setState({
                cssNotification: "notification-danger",
                iconNotification: "fa fa-exclamation"
            });
        }
        this.notificationDOMRef.current.addNotification({
            container: "bottom-right",
            content: (
                <div className={this.state.cssNotification}>
                    <div className="notification-custom-icon">
                        <i className={this.state.iconNotification} />
                    </div>
                    <div className="notification-custom-content">
                        <div className="notification-close">
                            <span>×</span>
                        </div>
                        <h4 className="notification-title">Thông Báo</h4>
                        <p className="notification-message">{message1}</p>
                    </div>
                </div>
            ),
            dismiss: { duration: 6000 },
            dismissable: { click: true }
        });
    }

    getComboValue(selectedOption) {
        let values = [];
        if (selectedOption == null)
            return -1;
        if (this.props.isMultiSelect) {
            for (let i = 0; i < selectedOption.length; i++) {
                values.push(selectedOption[i].value);
            }
        } else {
            return selectedOption.value;
        }

        return values;
    }
    getDataCombobox(data, valueMember, nameMember, conditionName, conditionValue) {
        let listOption = [{ value: -1, label: "--Vui lòng chọn--" }];
        data.map((cacheItem) => {
            if (conditionName) {
                if (cacheItem[conditionName] == conditionValue) {
                    listOption.push({ value: cacheItem[valueMember], label: cacheItem[nameMember], name: cacheItem[nameMember] });
                }
            }
            else {
                listOption.push({ value: cacheItem[valueMember], label: cacheItem[nameMember], name: cacheItem[nameMember] });
            }
        });
        return listOption;
    }
    initCombobox() {

        // tỉnh thành phố
        this.props.callGetCache(ERPCOMMONCACHE_PROVINCE).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                //console.log("FormElement listOption: ", listOption)
                this.setState({
                    Province: result.ResultObject.CacheData
                });
            }
        });

        // quận huyện
        this.props.callGetCache(ERPCOMMONCACHE_DISTRICT).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                //console.log("FormElement listOption: ", listOption)
                this.setState({
                    District: result.ResultObject.CacheData
                });
            }
        });


        // phường xã
        this.props.callGetCache(ERPCOMMONCACHE_WARD).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                //console.log("FormElement listOption: ", listOption)
                this.setState({
                    Ward: result.ResultObject.CacheData
                });
            }
        });
        this.setState({
            IsLoadDataComplete: true
        });

    }
    bindcombox(listOption, values) {
        let selectedOption = [];
        if (values == null || values === -1)
            return selectedOption;
        if (typeof values.toString() == "string")
            values = values.toString().split();
        for (let i = 0; i < values.length; i++) {
            for (let j = 0; j < listOption.length; j++) {
                if (values[i] == listOption[j].value) {
                    selectedOption.push({ value: listOption[j].value, label: listOption[j].label });
                }
            }
        }
        return selectedOption;
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.ShipmentOrderAddress) !== JSON.stringify(nextProps.ShipmentOrderAddress)) {
            this.setState({
                ShipmentOrder: nextProps.ShipmentOrderAddress
            })
        }
    }



    handleUpdateAddressReceiver() {
        console.log("show modal update", this.state.ShipmentOrderEdit);
    }

    handleShowModalSender() {

        let { ShipmentOrderEdit } = this.state;
        this.setValueCombobox(2, this.state.ShipmentOrderEdit.SenderProvinceID, this.state.ShipmentOrderEdit.SenderDistrictID)
        this.setState({ ShipmentOrderEdit: ShipmentOrderEdit }, () => {
            this.ShowModalSender();
        });
    }

    handleShowModalReceiver() {
        let { ShipmentOrderEdit } = this.state;
        this.setValueCombobox(2, this.state.ShipmentOrderEdit.SenderProvinceID, this.state.ShipmentOrderEdit.SenderDistrictID)
        this.setState({ ShipmentOrderEdit: ShipmentOrderEdit }, () => {
            this.ShowModalReceiver();
        });
    }

    setValueCombobox(CountryID, ProvinceID, WardID) {
        let province = [{ value: -1, label: "--Vui lòng chọn--" }];
        let district = [{ value: -1, label: "--Vui lòng chọn--" }];
        let ward = [{ value: -1, label: "--Vui lòng chọn--" }];
        province = this.getDataCombobox(this.state.Province, "ProvinceID", "ProvinceName", "CountryID", CountryID);
        district = this.getDataCombobox(this.state.District, "DistrictID", "DistrictName", "ProvinceID", ProvinceID);
        ward = this.getDataCombobox(this.state.Ward, "WardID", "WardName", "DistrictID", WardID);
        this.setState({
            ProvinceLst: province,
            DistrictLst: district,
            WardLst: ward
        });
    }

    ShowModalReceiver() {
        const Province = this.bindcombox(this.state.ProvinceLst, this.state.ShipmentOrderEdit.SenderProvinceID);
        const District = this.bindcombox(this.state.DistrictLst, this.state.ShipmentOrderEdit.SenderDistrictID);
        const Ward = this.bindcombox(this.state.WardLst, this.state.ShipmentOrderEdit.SenderWardID);

        ModalManager.open(
            <ModelContainer
                title="Cập nhật thông tin địa chỉ người nhận"
                name=""
                content={""}
                onRequestClose={() => false}
                onChangeModal={this.handleUpdateAddressSender.bind(this)}
            >
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label className="col-form-label">Họ và tên:</label>
                            </div>
                            <div className="form-group col-md-8">
                                <input
                                    type="text"
                                    name="SenderFullName"
                                    onChange={this.handleValueChange.bind(this)}
                                    className="form-control form-control-sm"
                                    value={this.state.ShipmentOrderEdit.SenderFullName}
                                    placeholder="Họ và tên"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group col-md-6">
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label className="col-form-label">Số điện thoại:</label>
                            </div>
                            <div className="form-group col-md-8">
                                <input
                                    type="text"
                                    name="SenderPhoneNumber"
                                    onChange={this.handleValueChange.bind(this)}
                                    className="form-control form-control-sm"
                                    value={this.state.ShipmentOrderEdit.SenderPhoneNumber}
                                    placeholder="Số điện thoại người gửi"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label className="col-form-label">Tỉnh/thành phố:</label>
                            </div>
                            <div className="form-group col-md-8">
                                <div className="form-group-input-select">
                                    <Select
                                        value={Province}
                                        name={"SenderProvinceID"}
                                        onChange={this.handleValueChangeProvince.bind(this)}
                                        options={this.state.ProvinceLst}
                                        isMulti={false}
                                        isSearchable={true}
                                        className={'select'}
                                        placeholder="--Vui lòng chọn--"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group col-md-6">
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label className="col-form-label">Quận/huyện:</label>
                            </div>
                            <div className="form-group col-md-8">
                                <div className="form-group-input-select">
                                    <Select
                                        value={District}
                                        name={"SenderDistrictID"}
                                        onChange={this.handleValueChangeDistrict.bind(this)}
                                        options={this.state.DistrictLst}
                                        isMulti={false}
                                        isSearchable={true}
                                        className={'select'}
                                        placeholder="--Vui lòng chọn--"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label className="col-form-label">Phường/xã:</label>
                            </div>
                            <div className="form-group col-md-8">
                                <div className="form-group-input-select">
                                    <Select
                                        value={Ward}
                                        name={"SenderWardID"}
                                        onChange={this.handleValueChangeWard.bind(this)}
                                        options={this.state.WardLst}
                                        isMulti={false}
                                        isSearchable={true}
                                        className={'select'}
                                        placeholder="--Vui lòng chọn--"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group col-md-6">
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label className="col-form-label">Số nhà/đường:</label>
                            </div>
                            <div className="form-group col-md-8">
                                <input
                                    name="SenderAddress"
                                    onChange={this.handleValueChange.bind(this)}
                                    value={this.state.ShipmentOrderEdit.SenderAddress}
                                    className="form-control form-control-sm"
                                    placeholder="Số điện thoại người gửi"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-4">
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label className="col-form-label">Tọa độ:</label>
                            </div>
                            <div className="form-group col-md-8">
                                <label className="col-form-label">{this.state.ShipmentOrderEdit.SenderGeoLocation}</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group col-md-4">
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label className="col-form-label">Khoảng cách:</label>
                            </div>
                            <div className="form-group col-md-8">
                                <label className="col-form-label">3Km</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group col-md-4">
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label className="col-form-label">Thời gian:</label>
                            </div>
                            <div className="form-group col-md-8">
                                <label className="col-form-label">15 phút</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-row google-maps">
                    <MapContainer
                        SenderGeoLocation={this.state.ShipmentOrderEdit.SenderGeoLocation}
                        onChange={this.handleValueChangeGeoLocation.bind(this)}
                        classStyle={style} classContainerStyle={containerStyle}
                    />
                    {/* <div id="map-container"></div> */}
                </div>

            </ModelContainer>
        )
    }



    render() {
        <ReactNotification ref={this.notificationDOMRef} />
        return (
            <div className="card">
                <h4 className="card-title"><strong>Địa chỉ</strong></h4>
                <div className="card-body">
                    <div className="card">
                        <div className="card-title">
                            <h4 className="title">Ngưởi gửi</h4>
                            <button className="btn btnEditCard" onClick={this.handleShowModalSender.bind(this)}>chỉnh sửa</button>
                        </div>
                        <div className="card-body">
                            <div className="form-row">
                                <div className="form-group col-md-1">
                                    <label className="col-form-label icon">
                                        <i className="fa fa-user" aria-hidden="true"></i>
                                    </label>
                                </div>
                                <div className="form-group col-md-5">
                                    <label className="col-form-label" >{this.state.ShipmentOrder.SenderFullName}</label>
                                </div>
                                <div className="form-group col-md-1">
                                    <label className="col-form-label icon">
                                        <i className="fa fa-mobile " aria-hidden="true"></i>
                                    </label>
                                </div>
                                <div className="form-group col-md-5">
                                    <label className="col-form-label">{this.state.ShipmentOrder.SenderPhoneNumber}</label>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-1">
                                    <label className="col-form-label icon">
                                        <i className="fa fa-map-marker" aria-hidden="true"></i>
                                    </label>
                                </div>
                                <div className="form-group col-md-8">
                                    <label className="col-form-label" >{this.state.ShipmentOrder.SenderFullAddress}</label>
                                    <Link className="mapslink" to="/Maps">Xem bản đồ</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-title">
                            <h4 className="title">Người nhận</h4>
                            <button className="btn btnEditCard" onClick={this.handleShowModalReceiver.bind(this)}>chỉnh sửa</button>
                        </div>
                        <div className="card-body">
                            <div className="form-row">
                                <div className="form-group col-md-1">
                                    <label className="col-form-label icon">
                                        <i className="fa fa-user" aria-hidden="true"></i>
                                    </label>
                                </div>
                                <div className="form-group col-md-5">
                                    <label className="col-form-label" >{this.state.ShipmentOrder.ReceiverFullName}</label>
                                </div>
                                <div className="form-group col-md-1">
                                    <label className="col-form-label icon">
                                        <i className="fa fa-mobile " aria-hidden="true"></i>
                                    </label>
                                </div>
                                <div className="form-group col-md-5">
                                    <label className="col-form-label">{this.state.ShipmentOrder.ReceiverPhoneNumber}</label>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-1">
                                    <label className="col-form-label icon">
                                        <i className="fa fa-map-marker" aria-hidden="true"></i>
                                    </label>
                                </div>
                                <div className="form-group col-md-8">
                                    <label className="col-form-label" >{this.state.ShipmentOrder.ReceiverFullAddress}</label>
                                    <Link className="mapslink" to="/Map">Xem bản đồ</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        }
    }
}


const ShipmentOrderAddress = connect(mapStateToProps, mapDispatchToProps)(ShipmentOrderAddressCom);
export default ShipmentOrderAddress;
