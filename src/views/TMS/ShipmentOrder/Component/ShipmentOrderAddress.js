import React, { Component } from "react";
import { connect } from 'react-redux';
import ModelContainer from "../../../../common/components/Modal/ModelContainer";
import { ModalManager } from 'react-dynamic-modal';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import Select from 'react-select';
import MapContainer from './MapContainer ';
import Maps from './Maps';
import { Link } from "react-router-dom";
import { callGetCache } from "../../../../actions/cacheAction";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { ERPCOMMONCACHE_PROVINCE, ERPCOMMONCACHE_DISTRICT, ERPCOMMONCACHE_WARD } from "../../../../constants/keyCache";
import FormControl from "../../../../common/components/FormContainer/FormControl";
import { ValidationField } from "../../../../common/library/validation.js";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import vbd from '../../../../scripts/vietbandomapsapi.js';
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
    height: '250px'
}
const contStyle = {
    position: 'absolute',
    width: '98%',
    height: '498px'
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
            Geometry: {},
            dataOrderAddressSender: {},
            FormDataSenderLst: {},
            SenderGeoLocation: this.props.ShipmentOrderAddress.SenderGeoLocation,
            ReceiverGeoLocation: this.props.ShipmentOrderAddress.ReceiverGeoLocation
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
    handKeyDown(name, value, label, e, validatonList) {
        let paramsRequest = {
            "Keyword": value + "Phường" + "413 Lê Văn Quới, Phường Bình Trị Đông A, Quận Bình Tân, Thành Phố Hồ Chí Minh",
            "Page": 1,
            "PageSize": 1
        }
        this.props.callFetchAPI(APIHostName, 'api/Maps/SearchAll', paramsRequest).then((apiResult) => {
            if (!apiResult.IsError) {
                console.log(JSON.parse(apiResult.ResultObject).List[0].Latitude, JSON.parse(apiResult.ResultObject).List[0].Longitude);
                let { ShipmentOrderEdit } = this.state;
                ShipmentOrderEdit.SenderGeoLocation = JSON.parse(apiResult.ResultObject).List[0].Latitude + "," + JSON.parse(apiResult.ResultObject).List[0].Longitude;
                this.setState({ ShipmentOrderEdit: ShipmentOrderEdit }, () => {
                    this.ShowModalSender();
                });
            }
        });

    }

    handleValueChange(name, value, label, e, validatonList) {
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
            ShipmentOrderEdit.SenderFullAddress = this.getfulladress(value, ShipmentOrderEdit.SenderWardID, ShipmentOrderEdit.SenderDistrictID, ShipmentOrderEdit.SenderProvinceID);
        }
        this.setState({ ShipmentOrderEdit: ShipmentOrderEdit, FormDataSenderLst: formData }, () => {
            this.ShowModalSender();
        });
    }

    handleValueChangeReceiver(name, value, label, labelnew, validatonList) {
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

        if (name == "ReceiverAddress") {
            ShipmentOrderEdit.ReceiverGeoLocation = "10.852982,105.700";
        }
        ShipmentOrderEdit.ReceiverFullAddress = this.getfulladress(ShipmentOrderEdit.ReceiverAddress, ShipmentOrderEdit.ReceiverWardID, ShipmentOrderEdit.ReceiverDistrictID, ShipmentOrderEdit.ReceiverProvinceID);
        this.setState({ ShipmentOrderEdit: ShipmentOrderEdit, FormDataSenderLst: formData }, () => {
            this.ShowModalReceiver();
        });
    }

    handleValueChangeReceiverGeoLocation(name, lat, lng) {
        if (lat != "" && this.state.ShipmentOrderEdit.SenderGeoLocation != "") {
            const values = this.state.ShipmentOrderEdit.SenderGeoLocation.split(",")
            const v1 = parseFloat(values[0])
            const v2 = parseFloat(values[1])
            const Points = [{
                "Latitude": v1,
                "Longitude": v2
            },
            {
                "Latitude": lat,
                "Longitude": lng
            }];

            let paramsRequest = {
                "Alternative": 2147483647,
                "Distance": true,
                "Duration": true,
                "Geometry": true,
                "Instructions": true,
                "Points": Points,
                "RouteCriteria": 0,
                "Uturn": true,
                "VehicleType": 2
            };


            this.props.callFetchAPI(APIHostName, 'api/Maps/FindPathViaRoute', paramsRequest).then((apiResult) => {
                if (!apiResult.IsError) {

                    let { ShipmentOrderEdit } = this.state;
                    const Durations = Math.floor(JSON.parse(apiResult.ResultObject).Value.Routes[0].Via_Durations[1] / 60);
                    ShipmentOrderEdit["EstimateDeliveryDistance"] = JSON.parse(apiResult.ResultObject).Value.Routes[0].Via_Distances[1] / 1000;
                    ShipmentOrderEdit["EstimateDeliveryLong"] = Durations;
                    this.setState({ ShipmentOrderEdit: ShipmentOrderEdit, ReceiverGeoLocation: lat + "," + lng }, () => {
                        this.ShowModalReceiver();
                    });
                }
            });
        } else {
            this.setState({ ReceiverGeoLocation: lat + "," + lng }, () => {
                this.ShowModalReceiver();
            });

        }
    }

    handleValueChangeGeoLocation(name, lat, lng) {
        if (lat != "" && this.state.ShipmentOrderEdit.ReceiverGeoLocation != "") {
            const values = this.state.ShipmentOrderEdit.ReceiverGeoLocation.split(",")
            const v1 = parseFloat(values[0])
            const v2 = parseFloat(values[1])
            const Points = [{
                "Latitude": lat,
                "Longitude": lng
            },
            {
                "Latitude": v1,
                "Longitude": v2
            }];
            let paramsRequest = {
                "Alternative": 2147483647,
                "Distance": true,
                "Duration": true,
                "Geometry": true,
                "Instructions": true,
                "Points": Points,
                "RouteCriteria": 0,
                "Uturn": true,
                "VehicleType": 2
            };
            this.props.callFetchAPI(APIHostName, 'api/Maps/FindPathViaRoute', paramsRequest).then((apiResult) => {
                if (!apiResult.IsError) {

                    let { ShipmentOrderEdit } = this.state;
                    const Durations = Math.floor(JSON.parse(apiResult.ResultObject).Value.Routes[0].Via_Durations[1] / 60);
                    ShipmentOrderEdit["EstimateDeliveryDistance"] = JSON.parse(apiResult.ResultObject).Value.Routes[0].Via_Distances[1] / 1000;
                    ShipmentOrderEdit["EstimateDeliveryLong"] = Durations;
                    this.setState({ ShipmentOrderEdit: ShipmentOrderEdit, SenderGeoLocation: lat + "," + lng }, () => {
                        this.ShowModalSender();
                    });
                }
            });
        }
        else {
            this.setState({ SenderGeoLocation: lat + "," + lng }, () => {
                this.ShowModalSender();
            });
        }
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
        ShipmentOrderEdit.SenderFullAddress = this.getfulladress(ShipmentOrderEdit.SenderAddress, ShipmentOrderEdit.SenderWardID, ShipmentOrderEdit.SenderDistrictID, ShipmentOrderEdit.SenderProvinceID);
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
        ShipmentOrderEdit.SenderFullAddress = this.getfulladress(ShipmentOrderEdit.SenderAddress, ShipmentOrderEdit.SenderWardID, ShipmentOrderEdit.SenderDistrictID, ShipmentOrderEdit.SenderProvinceID);
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
        ShipmentOrderEdit.SenderFullAddress = this.getfulladress(ShipmentOrderEdit.SenderAddress, ShipmentOrderEdit.SenderWardID, ShipmentOrderEdit.SenderDistrictID, ShipmentOrderEdit.SenderProvinceID);
        this.setState({ ShipmentOrderEdit: ShipmentOrderEdit, FormDataSenderLst: formData }, () => {
            this.ShowModalSender();
        });
    }

    handleValueChangeReceiverProvince(selectedOption) {
        const comboValues = this.getComboValue(selectedOption);
        let { ShipmentOrderEdit, FormDataSenderLst } = this.state;
        ShipmentOrderEdit['ReceiverProvinceID'] = comboValues;
        ShipmentOrderEdit['ReceiverDistrictID'] = -1;
        ShipmentOrderEdit['ReceiverWardID'] = -1;
        this.setValueCombobox(2, comboValues, -1)
        let formData = FormDataSenderLst;
        const aa = { labelError: undefined }
        const validation = ValidationField(["Comborequired"], comboValues, "tỉnh/thành phố", aa);
        const validationObject = { IsValidatonError: validation.IsError, ValidatonErrorMessage: validation.Message };
        const ObjectName = { ErrorLst: validationObject };
        const ObjectNameDistrict = { ErrorLst: { IsValidatonError: true, ValidatonErrorMessage: "Vui lòng chọn quận/huyện" } };
        const ObjectNameWard = { ErrorLst: { IsValidatonError: true, ValidatonErrorMessage: "Vui lòng chọn phường/xã" } };
        formData = Object.assign({}, formData, { ["ReceiverProvinceID"]: ObjectName });
        formData = Object.assign({}, formData, { ["ReceiverDistrictID"]: ObjectNameDistrict });
        formData = Object.assign({}, formData, { ["ReceiverWardID"]: ObjectNameWard });
        ShipmentOrderEdit.ReceiverFullAddress = this.getfulladress(ShipmentOrderEdit.ReceiverAddress, ShipmentOrderEdit.ReceiverWardID, ShipmentOrderEdit.ReceiverDistrictID, ShipmentOrderEdit.ReceiverProvinceID);
        this.setState({ ShipmentOrderEdit: ShipmentOrderEdit, FormDataSenderLst: formData }, () => {
            this.ShowModalReceiver();
        });
    }
    handleValueChangeReceiverDistrict(selectedOption) {
        let { ShipmentOrderEdit, FormDataSenderLst } = this.state;
        const comboValues = this.getComboValue(selectedOption);
        ShipmentOrderEdit['ReceiverDistrictID'] = comboValues;
        ShipmentOrderEdit['ReceiverWardID'] = -1;
        this.setValueCombobox(2, ShipmentOrderEdit.ReceiverProvinceID, comboValues)
        let formData = FormDataSenderLst;
        if (parseInt(comboValues) < 0) {
            const ObjectNameDistrict = { ErrorLst: { IsValidatonError: true, ValidatonErrorMessage: "Vui lòng chọn quận/huyện" } };
            const ObjectNameWard = { ErrorLst: { IsValidatonError: true, ValidatonErrorMessage: "Vui lòng chọn phường/xã" } };
            formData = Object.assign({}, formData, { ["ReceiverDistrictID"]: ObjectNameDistrict });
            formData = Object.assign({}, formData, { ["SenderWardID"]: ObjectNameWard });
        }
        else {
            const ObjectNameDistrict = { ErrorLst: { IsValidatonError: false, ValidatonErrorMessage: "" } };
            const ObjectNameWard = { ErrorLst: { IsValidatonError: true, ValidatonErrorMessage: "Vui lòng chọn phường/xã" } };
            formData = Object.assign({}, formData, { ["ReceiverDistrictID"]: ObjectNameDistrict });
            formData = Object.assign({}, formData, { ["ReceiverWardID"]: ObjectNameWard });
        }
        ShipmentOrderEdit.ReceiverFullAddress = this.getfulladress(ShipmentOrderEdit.ReceiverAddress, ShipmentOrderEdit.ReceiverWardID, ShipmentOrderEdit.ReceiverDistrictID, ShipmentOrderEdit.ReceiverProvinceID);
        this.setState({ ShipmentOrderEdit: ShipmentOrderEdit, FormDataSenderLst: formData }, () => {
            this.ShowModalReceiver();
        });
    }

    handleValueChangeReceiverWard(selectedOption) {
        const comboValues = this.getComboValue(selectedOption);
        let { ShipmentOrderEdit, FormDataSenderLst } = this.state;
        ShipmentOrderEdit['ReceiverWardID'] = comboValues;
        this.setValueCombobox(2, ShipmentOrderEdit.ReceiverProvinceID, ShipmentOrderEdit.ReceiverDistrictID)
        let formData = FormDataSenderLst;
        if (parseInt(comboValues) < 0) {
            const ObjectNameWard = { ErrorLst: { IsValidatonError: true, ValidatonErrorMessage: "Vui lòng chọn phường/xã" } };
            formData = Object.assign({}, formData, { ["ReceiverWardID"]: ObjectNameWard });
        }
        else {
            const ObjectNameWard = { ErrorLst: { IsValidatonError: false, ValidatonErrorMessage: "" } };
            formData = Object.assign({}, formData, { ["ReceiverWardID"]: ObjectNameWard });
        }
        ShipmentOrderEdit.ReceiverFullAddress = this.getfulladress(ShipmentOrderEdit.ReceiverAddress, ShipmentOrderEdit.ReceiverWardID, ShipmentOrderEdit.ReceiverDistrictID, ShipmentOrderEdit.ReceiverProvinceID);
        this.setState({ ShipmentOrderEdit: ShipmentOrderEdit, FormDataSenderLst: formData }, () => {
            this.ShowModalReceiver();
        });
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


        if (this.checkInputName(formData) != "") {
            this.setState({ ShipmentOrderEdit: ShipmentOrderEdit, FormDataSenderLst: formData }, () => {
                this.ShowModalSender();
            });
        }
        else {

            ShipmentOrderEdit.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
            ShipmentOrderEdit.SenderGeoLocation = this.state.SenderGeoLocation;
            ShipmentOrderEdit.SenderFullAddress = this.getfulladress(ShipmentOrderEdit.SenderAddress, ShipmentOrderEdit.SenderWardID, ShipmentOrderEdit.SenderDistrictID, ShipmentOrderEdit.SenderProvinceID);
            this.props.callFetchAPI(APIHostName, 'api/ShipmentOrder/UpdateShipmentOrderAddress', ShipmentOrderEdit).then((apiResult) => {
                this.addNotification(apiResult.Message, apiResult.IsError);
                if (!apiResult.IsError) {
                    ModalManager.close();
                }
            });
        }
    }

    getfulladress(Address, WardID, DistrictID, ProvinceID) {
        let stringfulladress = Address;
        if (WardID != 0 && WardID != -1) {
            stringfulladress = stringfulladress + "," + this.state.Ward.find(element => element.WardID == WardID).WardName
        }
        if (DistrictID != 0 && DistrictID != -1) {
            stringfulladress = stringfulladress + "," + this.state.District.find(element => element.DistrictID == DistrictID).DistrictName
        }
        if (ProvinceID != 0 && ProvinceID != -1) {
            stringfulladress = stringfulladress + "," + this.state.Province.find(element => element.ProvinceID == ProvinceID).ProvinceName
        }


        return stringfulladress;

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



    handleShowModalSender() {

        let { ShipmentOrderEdit } = this.state;
        this.setValueCombobox(2, this.state.ShipmentOrderEdit.SenderProvinceID, this.state.ShipmentOrderEdit.SenderDistrictID)
        this.setState({ ShipmentOrderEdit: ShipmentOrderEdit }, () => {
            this.ShowModalSender();
        });
    }

    handleShowModalReceiver() {
        let { ShipmentOrderEdit } = this.state;
        this.setValueCombobox(2, this.state.ShipmentOrderEdit.ReceiverProvinceID, this.state.ShipmentOrderEdit.ReceiverDistrictID)
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
                IsButton={!this.CheckPermissionUser(3) || !this.CheckPermissionUser(4)}
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
                            onhandKeyDown={this.handKeyDown.bind(this)}
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

                    <div className="form-group col-md-12">
                        <FormControl.TextBox
                            name="SenderFullAddress"
                            colspan="10"
                            labelcolspan="2"
                            label="địa chỉ"
                            readOnly={true}
                            controltype="InputControl"
                            value={this.state.ShipmentOrderEdit.SenderFullAddress}
                            datasourcemember="SenderFullAddress"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label className="col-form-label">Tọa độ:</label>
                            </div>
                            <div className="form-group col-md-8">
                                <label className="col-form-label">{this.state.SenderGeoLocation}</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group col-md-3">
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label className="col-form-label">Khoảng cách:</label>
                            </div>
                            <div className="form-group col-md-6">
                                <label className="col-form-label">{this.state.ShipmentOrderEdit.EstimateDeliveryDistance}km</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group col-md-3">
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label className="col-form-label">Thời gian:</label>
                            </div>
                            <div className="form-group col-md-6">
                                <label className="col-form-label">{this.state.ShipmentOrderEdit.EstimateDeliveryLong > 59 ? Math.floor(this.state.ShipmentOrderEdit.EstimateDeliveryLong / 60) + "giời" : this.state.ShipmentOrderEdit.EstimateDeliveryLong + "phút"}</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-row google-maps">
                    <MapContainer
                        SenderGeoLocation={this.state.ShipmentOrderEdit.SenderGeoLocation}
                        onChange={this.handleValueChangeGeoLocation.bind(this)}
                        isGeoLocation={this.CheckPermissionUser(4)}
                        name={"SenderGeoLocation"}
                        classContainerStyle={containerStyle}
                    />
                </div>

            </ModelContainer>
        )
    }

    ShowModalReceiver() {
        const Province = this.bindcombox(this.state.ProvinceLst, this.state.ShipmentOrderEdit.ReceiverProvinceID);
        const District = this.bindcombox(this.state.DistrictLst, this.state.ShipmentOrderEdit.ReceiverDistrictID);
        const Ward = this.bindcombox(this.state.WardLst, this.state.ShipmentOrderEdit.ReceiverWardID);

        ModalManager.open(
            <ModelContainer
                title="Cập nhật thông tin địa chỉ người nhận"
                name=""
                content={""}
                onRequestClose={() => false}
                IsButton={!this.CheckPermissionUser(3) || !this.CheckPermissionUser(4)}
                onChangeModal={this.handleUpdateAddressReceiver.bind(this)}
            >
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <FormControl.TextBox
                            name="ReceiverFullName"
                            colspan="8"
                            labelcolspan="4"
                            label="họ và tên"
                            onValueChange={this.handleValueChangeReceiver.bind(this)}
                            readOnly={!this.CheckPermissionUser(3)}
                            inputRef={ref => this.elementItemRefs["ReceiverFullName"] = ref}
                            placeholder="Họ và tên"
                            controltype="InputControl"
                            value={this.state.ShipmentOrderEdit.ReceiverFullName}
                            datasourcemember="ReceiverFullName"
                            validatonList={["required"]}
                            validationErrorMessage={(this.state.FormDataSenderLst["ReceiverFullName"] != undefined ? this.state.FormDataSenderLst["ReceiverFullName"].ErrorLst.ValidatonErrorMessage : "")}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <FormControl.TextBox
                            name="ReceiverPhoneNumber"
                            colspan="8"
                            labelcolspan="4"
                            label="số điện thoại"
                            onValueChange={this.handleValueChangeReceiver.bind(this)}
                            readOnly={!this.CheckPermissionUser(3)}
                            inputRef={ref => this.elementItemRefs["ReceiverPhoneNumber"] = ref}
                            placeholder="Số điện thoại"
                            controltype="InputControl"
                            value={this.state.ShipmentOrderEdit.ReceiverPhoneNumber}
                            datasourcemember="ReceiverPhoneNumber"
                            validatonList={["required", "number"]}
                            validationErrorMessage={(this.state.FormDataSenderLst["ReceiverPhoneNumber"] != undefined ? this.state.FormDataSenderLst["ReceiverPhoneNumber"].ErrorLst.ValidatonErrorMessage : "")}
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
                                        name={"ReceiverProvinceID"}
                                        onChange={this.handleValueChangeReceiverProvince.bind(this)}
                                        options={this.state.ProvinceLst}
                                        isDisabled={!this.CheckPermissionUser(4)}
                                        inputRef={ref => this.elementItemRefs["ReceiverProvinceID"] = ref}
                                        isMulti={false}
                                        isSearchable={true}
                                        className={(this.state.ShipmentOrderEdit.ReceiverProvinceID == -1 ? "react-select is-invalid" : "react-select")}
                                        placeholder="--Vui lòng chọn--"
                                    />
                                    <div className="invalid-feedback"><ul className="list-unstyled"><li>{(this.state.FormDataSenderLst["ReceiverProvinceID"] != undefined ? this.state.FormDataSenderLst["ReceiverProvinceID"].ErrorLst.ValidatonErrorMessage : "")}</li></ul></div>
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
                                        name={"ReceiverDistrictID"}
                                        onChange={this.handleValueChangeReceiverDistrict.bind(this)}
                                        options={this.state.DistrictLst}
                                        isDisabled={!this.CheckPermissionUser(4)}
                                        inputRef={ref => this.elementItemRefs["ReceiverDistrictID"] = ref}
                                        isMulti={false}
                                        isSearchable={true}
                                        className={(this.state.ShipmentOrderEdit.ReceiverDistrictID == -1 ? "react-select is-invalid" : "react-select")}
                                        placeholder='--Vui lòng chọn--'
                                    />
                                    <div className="invalid-feedback"><ul className="list-unstyled"><li>{(this.state.FormDataSenderLst["ReceiverDistrictID"] != undefined ? this.state.FormDataSenderLst["ReceiverDistrictID"].ErrorLst.ValidatonErrorMessage : "")}</li></ul></div>
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
                                        name={"ReceiverWardID"}
                                        onChange={this.handleValueChangeReceiverWard.bind(this)}
                                        options={this.state.WardLst}
                                        isDisabled={!this.CheckPermissionUser(4)}
                                        inputRef={ref => this.elementItemRefs["ReceiverWardID"] = ref}
                                        isMulti={false}
                                        isSearchable={true}
                                        className={(this.state.ShipmentOrderEdit.ReceiverWardID == -1 ? "react-select is-invalid" : "react-select")}
                                        placeholder="--Vui lòng chọn--"
                                    />
                                    <div className="invalid-feedback"><ul className="list-unstyled"><li>{(this.state.FormDataSenderLst["ReceiverWardID"] != undefined ? this.state.FormDataSenderLst["ReceiverWardID"].ErrorLst.ValidatonErrorMessage : "")}</li></ul></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group col-md-6">
                        <FormControl.TextBox
                            name="ReceiverAddress"
                            colspan="8"
                            labelcolspan="4"
                            label="số nhà/đường"
                            onValueChange={this.handleValueChangeReceiver.bind(this)}
                            readOnly={!this.CheckPermissionUser(4)}
                            placeholder="Số điện thoại người nhận"
                            controltype="InputControl"
                            value={this.state.ShipmentOrderEdit.ReceiverAddress}
                            inputRef={ref => this.elementItemRefs["ReceiverAddress"] = ref}
                            datasourcemember="ReceiverAddress"
                            validatonList={["required"]}
                            validationErrorMessage={""}
                        />
                    </div>
                    <div className="form-group col-md-12">
                        <FormControl.TextBox
                            name="ReceiverFullAddress"
                            colspan="10"
                            labelcolspan="2"
                            label="địa chỉ"
                            readOnly={true}
                            controltype="InputControl"
                            value={this.state.ShipmentOrderEdit.ReceiverFullAddress}
                            datasourcemember="ReceiverFullAddress"
                        />
                    </div>
                </div>


                <div className="form-row">
                    <div className="form-group col-md-6">
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label className="col-form-label">Tọa độ:</label>
                            </div>
                            <div className="form-group col-md-8">
                                <label className="col-form-label">{this.state.ReceiverGeoLocation}</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group col-md-3">
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label className="col-form-label">Khoảng cách:</label>
                            </div>
                            <div className="form-group col-md-6">
                                <label className="col-form-label">{this.state.ShipmentOrderEdit.EstimateDeliveryDistance}km</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group col-md-3">
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label className="col-form-label">Thời gian:</label>
                            </div>
                            <div className="form-group col-md-6">
                                <label className="col-form-label">{this.state.ShipmentOrderEdit.EstimateDeliveryLong}phút</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-row google-maps">
                    <MapContainer
                        SenderGeoLocation={this.state.ShipmentOrderEdit.ReceiverGeoLocation}
                        onChange={this.handleValueChangeReceiverGeoLocation.bind(this)}
                        isGeoLocation={this.CheckPermissionUser(4)}
                        name={"ReceiverGeoLocation"}
                        classContainerStyle={containerStyle}
                    />
                </div>

            </ModelContainer>
        )
    }
    handleUpdateAddressReceiver() {
        let { ShipmentOrderEdit, FormDataSenderLst } = this.state;

        let formData = FormDataSenderLst;
        if (ShipmentOrderEdit.ReceiverFullName.length == 0 || String(ShipmentOrderEdit.ReceiverFullName).trim() == "") {
            const ObjectNameReceiverFullName = { ErrorLst: { IsValidatonError: true, ValidatonErrorMessage: "Vui lòng nhập họ và tên" } };
            formData = Object.assign({}, formData, { ["ReceiverFullName"]: ObjectNameReceiverFullName });
        }
        if (ShipmentOrderEdit.ReceiverPhoneNumber.length == 0 || String(ShipmentOrderEdit.ReceiverPhoneNumber).trim() == "") {
            const ObjectNameReceiverPhoneNumber = { ErrorLst: { IsValidatonError: true, ValidatonErrorMessage: "Vui lòng nhập số điện thoại" } };
            formData = Object.assign({}, formData, { ["ReceiverPhoneNumber"]: ObjectNameReceiverPhoneNumber });
        }
        if (parseInt(ShipmentOrderEdit.ReceiverProvinceID) < 0) {
            const ObjectNameReceiverProvinceID = { ErrorLst: { IsValidatonError: true, ValidatonErrorMessage: "Vui lòng chọn tỉnh/thành phố" } };
            formData = Object.assign({}, formData, { ["ReceiverProvinceID"]: ObjectNameReceiverProvinceID });
        }
        if (parseInt(ShipmentOrderEdit.ReceiverDistrictID) < 0) {
            const ObjectNameReceiverDistrictID = { ErrorLst: { IsValidatonError: true, ValidatonErrorMessage: "Vui lòng chọn quận/huyện" } };
            formData = Object.assign({}, formData, { ["ReceiverDistrictID"]: ObjectNameReceiverDistrictID });
        }
        if (parseInt(ShipmentOrderEdit.ReceiverWardID) < 0) {
            const ObjectNameReceiverWardID = { ErrorLst: { IsValidatonError: true, ValidatonErrorMessage: "Vui lòng chọn phường/xã" } };
            formData = Object.assign({}, formData, { ["ReceiverWardID"]: ObjectNameReceiverWardID });
        }
        if (ShipmentOrderEdit.ReceiverAddress.length == 0 || String(ShipmentOrderEdit.ReceiverAddress).trim() == "") {
            const ObjectNameReceiverAddress = { ErrorLst: { IsValidatonError: true, ValidatonErrorMessage: "Vui lòng nhập số nhà/đường" } };
            formData = Object.assign({}, formData, { ["ReceiverAddress"]: ObjectNameReceiverAddress });
        }
        if (this.checkInputName(formData) != "") {
            this.setState({ ShipmentOrderEdit: ShipmentOrderEdit, FormDataSenderLst: formData }, () => {
                this.ShowModalSender();
            });
        }
        else {
            ShipmentOrderEdit.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
            ShipmentOrderEdit.ReceiverGeoLocation = this.state.ReceiverGeoLocation;
            ShipmentOrderEdit.ReceiverFullAddress = this.getfulladress(ShipmentOrderEdit.ReceiverAddress, ShipmentOrderEdit.ReceiverWardID, ShipmentOrderEdit.ReceiverDistrictID, ShipmentOrderEdit.ReceiverProvinceID);
            this.props.callFetchAPI(APIHostName, 'api/ShipmentOrder/UpdateShipmentOrderAddress', ShipmentOrderEdit).then((apiResult) => {
                this.addNotification(apiResult.Message, apiResult.IsError);
                if (!apiResult.IsError) {
                    ModalManager.close();
                }
            });
        }
    }

    handleMapSender() {
    }

    handleShowModalSenderReceiver() {
        if (this.state.SenderGeoLocation != "" && this.state.ReceiverGeoLocation != "") {
            const valuesSender = this.state.SenderGeoLocation.split(",")
            const valuesReceiver = this.state.ReceiverGeoLocation.split(",")
            const Points = [{
                "Latitude": valuesSender[0],
                "Longitude": valuesSender[1]
            },
            {
                "Latitude": valuesReceiver[0],
                "Longitude": valuesReceiver[1]
            }];

            let paramsRequest = {
                "Alternative": 2147483647,
                "Distance": true,
                "Duration": true,
                "Geometry": true,
                "Instructions": true,
                "Points": Points,
                "RouteCriteria": 0,
                "Uturn": true,
                "VehicleType": 2
            };
            this.props.callFetchAPI(APIHostName, 'api/Maps/FindPathViaRoute', paramsRequest).then((apiResult) => {
                if (!apiResult.IsError) {
                    this.setState({
                        SenderGeoLocation: this.state.SenderGeoLocation,
                        ReceiverGeoLocation: this.state.ReceiverGeoLocation,
                        Geometry: JSON.parse(apiResult.ResultObject).Value.Routes[0].Geometry
                    }, () => {
                        this.ShowModalSenderReceiver();
                    });
                }
            });
        }
        else {
            this.setState({
                SenderGeoLocation: this.state.SenderGeoLocation,
                ReceiverGeoLocation: this.state.ReceiverGeoLocation,
                Geometry: this.state.Geometry
            }, () => {
                this.ShowModalSenderReceiver();
            });
        }
    }
    ShowModalSenderReceiver() {
        ModalManager.open(
            <ModelContainer
                title="Thông tin đường đi"
                name=""
                content={""}
                IsButton={true}
                onRequestClose={() => false}
            >

                <div className="form-row google-maps-custom">
                    <Maps
                        Geometry={this.state.Geometry}
                        SenderGeoLocation={this.state.SenderGeoLocation}
                        ReceiverGeoLocation={this.state.ReceiverGeoLocation}
                        classContainerStyle={contStyle}
                    ></Maps>

                </div>

            </ModelContainer>
        )
    }

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
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
                                        <label className="col-form-label">{this.props.ShipmentOrderAddress.SenderPhoneNumber}</label>
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
                                        <a className="mapslink" onClick={this.handleShowModalSenderReceiver.bind(this)}>Xem bản đồ</a>
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
                                        <a className="mapslink" onClick={this.handleShowModalSenderReceiver.bind(this)}>Xem bản đồ</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>

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
