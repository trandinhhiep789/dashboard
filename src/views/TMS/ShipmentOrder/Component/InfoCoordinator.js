import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { ModalManager } from 'react-dynamic-modal';
import ModelContainer from "../../../../common/components/Modal/ModelContainer";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { callGetCache } from "../../../../actions/cacheAction";
import MultiSelectComboBox from "../../../../common/components/FormContainer/FormControl/MultiSelectComboBox";
import FormControl from "../../../../common/components/FormContainer/FormControl";
import { MessageModal } from "../../../../common/components/Modal";
import { showModal, hideModal } from '../../../../actions/modal';
import { MODAL_TYPE_SEARCH, MODAL_TYPE_COMMONTMODALS, MODAL_TYPE_CONFIRMATION, MODAL_TYPE_CONFIRMATIONNEW } from '../../../../constants/actionTypes';
import ListShipCoordinator from '../Component/ListShipCoordinator.js';
import Select from 'react-select';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import {
    APIHostName,
    BackLink,
    UpdateCoordinatorStoreEdit,
    MLObjectUpdateCoordinatorStore,
    IgnoreCheckRCGeolocationADD,
    MLObjectIgnoreCheckRCGeolocation
} from "../constants";
class InfoCoordinatorCom extends Component {
    constructor(props) {
        super(props);
        this.handleShipWorkFlowInsert = this.handleShipWorkFlowInsert.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleValueChange1 = this.handleValueChange1.bind(this);
        this.handleOnValueChange = this.handleOnValueChange.bind(this);

        this.handleOnValueChangeDeliverUser = this.handleOnValueChangeDeliverUser.bind(this);
        this.handleCancelDelivery = this.handleCancelDelivery.bind(this);
        this.handleCancelDeliveryInsert = this.handleCancelDeliveryInsert.bind(this);

        this.state = {
            ShipmentOrder: this.props.InfoCoordinator,
            validationErrorMessage: null,
            validationErroDeliverUser: null,
            validationErroCarrierPartner: null,
            validationErroCarrierType: null,
            ShipmentOrder_WorkFlow: {},
            IsCallAPIError: false,
            IsCloseForm: false,
            DeliverUserList: {},
            DeliverUserServerList: [],
            CANCELDELIVERYREASON: [],
            validationErrorCancelDeliveryReason: null,
            validationCancelDeliveryReasonNote: null,
            validationErroDriverUser: null,
            CancelDeliveryReasonID: null,
            CancelDeliveryReasonNote: "",
            validationErrorCancelStore: null,
            selectedOption: [],
            selectedOptionStore: [],
            lstPartnerUser: [],
            lstStore: []
        }
        this.notificationDOMRef = React.createRef();
    }


    componentDidMount() {
        this.props.callGetCache("ERPCOMMONCACHE.CANCELDELIVERYREASON").then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                //console.log("FormElement listOption: ", listOption)
                let listOption = [{ value: -1, label: "--Vui lòng chọn--" }];
                result.ResultObject.CacheData.map((cacheItem) => {
                    listOption.push({ value: cacheItem["CancelDeliveryReasonID"], label: cacheItem["CancelDeliveryReasonName"] });
                }
                );
                this.setState({
                    CANCELDELIVERYREASON: listOption
                });
            }
        });

        this.props.callGetCache("ERPCOMMONCACHE.PARTNERUSER").then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                //console.log("FormElement listOption: ", listOption)
                let listOption = [];
                result.ResultObject.CacheData.map((cacheItem) => {
                    listOption.push({ value: cacheItem["UserName"], label: cacheItem["FullName"], PartnerID: cacheItem["PartnerID"] });
                }
                );
                this.setState({
                    lstPartnerUser: listOption
                });
            }
        });
        this.props.callGetCache("ERPCOMMONCACHE.STORE").then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                let listOptionStore = [{ value: -1, label: "--Vui lòng chọn--" }];
                result.ResultObject.CacheData.filter(n => n["CompanyID"] == 10 && n["StoreID"] != this.state.ShipmentOrder.CoordinatorStoreID).map((cacheItem) => {
                    listOptionStore.push({ value: cacheItem["StoreID"], label: cacheItem["StoreID"] + '-' + cacheItem["StoreName"] });
                }
                );
                this.setState({
                    lstStore: listOptionStore
                });
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.InfoCoordinator) !== JSON.stringify(nextProps.InfoCoordinator)) {

            this.setState({
                ShipmentOrder: nextProps.InfoCoordinator
            })
        }
    }

    handleValueCancelDeliveryReason(selectedOption) {
        let validationErrorCancelDeliveryReason = null
        if (selectedOption.value == undefined || selectedOption.value == -1) {
            validationErrorCancelDeliveryReason = "Vui lòng chọn lý do hủy giào"
        }

        this.setState({ selectedOption: selectedOption, validationErrorCancelDeliveryReason: validationErrorCancelDeliveryReason }, () => {
            this.openCancelDeliveryModal();
        });

    }
    handleValueCancelDeliveryReasonNote(e) {
        let value = e.target.value;
        let { validationCancelDeliveryReasonNote } = this.state;
        if (value == undefined || value.length == 0 || String(value).trim() == "") {
            validationCancelDeliveryReasonNote = "Vui lòng nhập nội dung"
        }
        else {
            validationCancelDeliveryReasonNote = null
        }


        this.setState({ CancelDeliveryReasonNote: value, validationCancelDeliveryReasonNote: validationCancelDeliveryReasonNote }, () => {
            this.openCancelDeliveryModal();
        });

    }

    handleCancelDelivery() {
        this.openCancelDeliveryModal();
    }

    openCancelDeliveryModal() {
        let formGroupclassName = "form-group col-md-9";
        let selectclassName = "form-control form-control-sm";
        if (this.state.validationCancelDeliveryReasonNote != null) {
            if (this.state.validationCancelDeliveryReasonNote.length > 0) {
                formGroupclassName += " has-error has-danger";
                selectclassName += " is-invalid";
            }
        }
        ModalManager.open(
            <ModelContainer
                title="Thông tin hủy giao hàng"
                name=""
                content={"Cập nhật loại đơn vị thành công!"} onRequestClose={() => false}
                onChangeModal={this.handleCancelDeliveryInsert}  >
                <div className="form-row">
                    <div className="form-group col-md-3">
                        <label className="col-form-label 6">Lý do hủy giao hàng<span className="text-danger">*</span></label>
                    </div>
                    <div className="form-group col-md-9">
                        <div className="form-group-input-select">
                            <Select
                                value={this.state.selectedOption}
                                name={"CancelDeliveryReasonID"}
                                onChange={this.handleValueCancelDeliveryReason.bind(this)}
                                options={this.state.CANCELDELIVERYREASON}
                                isMulti={false}
                                isSearchable={true}
                                className={(this.state.validationErrorCancelDeliveryReason != null ? "react-select is-invalid" : "react-select")}
                                placeholder="--Vui lòng chọn--"
                            />
                            <div className="invalid-feedback"><ul className="list-unstyled"><li>{this.state.validationErrorCancelDeliveryReason}</li></ul></div>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-3">
                        <label className="col-form-label bold">Nội dung hủy giao hàng <span className="text-danger"> *</span></label>
                    </div>
                    <div className={formGroupclassName}>
                        <textarea className={selectclassName} maxLength={1950}
                            rows="5" cols="50" name="Title"
                            value={this.state.CancelDeliveryReasonNote}
                            onChange={this.handleValueCancelDeliveryReasonNote.bind(this)}
                            placeholder="Nội dung" />
                        <div className="invalid-feedback"><ul className="list-unstyled"><li>{this.state.validationCancelDeliveryReasonNote}</li></ul></div>
                    </div>
                </div>
            </ModelContainer>
        );
    }

    handleCancelDeliveryInsert() {

        let { ShipmentOrder, selectedOption, CancelDeliveryReasonNote, validationErrorCancelDeliveryReason, validationCancelDeliveryReasonNote } = this.state;
        if (selectedOption.value == undefined || selectedOption.length == 0) {
            validationErrorCancelDeliveryReason = "Vui lòng chọn lý do hủy giao"
            this.setState({ validationErrorCancelDeliveryReason: validationErrorCancelDeliveryReason }, () => {
                this.openCancelDeliveryModal();
            });
        }
        else if (CancelDeliveryReasonNote == undefined || CancelDeliveryReasonNote.length == 0 || String(CancelDeliveryReasonNote).trim() == "") {
            validationCancelDeliveryReasonNote = "Vui lòng nhập nội dung"
            this.setState({ validationCancelDeliveryReasonNote: validationCancelDeliveryReasonNote }, () => {
                this.openCancelDeliveryModal();
            });
        }
        else {
            ShipmentOrder.CancelDeliveryReasonID = selectedOption.value;
            ShipmentOrder.CancelDeliveryUser = this.props.AppInfo.LoginInfo.Username;
            ShipmentOrder.CancelDeliveryReasonNote = CancelDeliveryReasonNote;
            this.props.callFetchAPI(APIHostName, 'api/ShipmentOrder/UpdateCancelDelivery', ShipmentOrder).then((apiResult) => {
                this.addNotification(apiResult.Message, apiResult.IsError);
                if (!apiResult.IsError) {
                    if (this.props.onhandleChange != null)
                        this.props.onhandleChange(apiResult.ResultObject)

                    ModalManager.close();
                }
            });
        }

    }

    handleValueChange(e) {
        let value = e.target.value;
        let { ShipmentOrder } = this.state;
        ShipmentOrder[e.target.name] = value;
        this.setState({ ShipmentOrder: ShipmentOrder })
    }
    handleOnValueChange(name, value) {
        let { ShipmentOrder } = this.state;
        ShipmentOrder[name] = value;

        if (name == "CarrierPartnerID") {
            let { ShipmentOrder } = this.state;
            ShipmentOrder.ShipmentOrder_DeliverUserList = [];
        }
        if (name == "CarrierTypeID") {
            if (parseInt(value) < 0) {
                this.setState({ validationErroCarrierType: "Vui lòng chọn phương tiện vận chuyển" });
            }
            else {
                this.setState({ validationErroCarrierType: null });
                ShipmentOrder.DriverUser = "";
                ShipmentOrder.DriverUserFull = "";
                ShipmentOrder.VehicleID = "";
            }
        }

        if (name == "VehicleID") {
            let { ShipmentOrder } = this.state;
            ShipmentOrder.VehicleID = value.value;
        }

        this.setState({ ShipmentOrder: ShipmentOrder })
    }
    handleValueChange1(e, selectedOption) {
        let listMLObject = [];
        let listStaffDebtObject = [];
        if (selectedOption) {
            for (let i = 0; i < selectedOption.length; i++) {
                listMLObject.push({
                    ShipmentOrderID: this.state.ShipmentOrder.ShipmentOrderID,
                    UserName: selectedOption[i].value,
                    FullName: selectedOption[i].FullName,
                    CreatedUser: this.props.AppInfo.LoginInfo.Username,
                    CreatedOrderTime: this.state.ShipmentOrder.CreatedOrderTime
                });
                listStaffDebtObject.push({
                    UserName: selectedOption[i].value,
                    StoreID: this.state.ShipmentOrder.CoordinatorStoreID
                });
            }
        }

        let { ShipmentOrder } = this.state;
        if (selectedOption) {
            this.props.callFetchAPI(APIHostName, 'api/StaffDebt/UserIsLockDelivery', listStaffDebtObject).then((apiResult) => {
                if (!apiResult.IsError) {
                    ShipmentOrder.ShipmentOrder_DeliverUserList = listMLObject;
                    this.setState({ ShipmentOrder: ShipmentOrder })
                }
                else {
                    this.addNotification(apiResult.Message, apiResult.IsError);
                }
            });
        }
        else {
            ShipmentOrder.ShipmentOrder_DeliverUserList = [];
            this.setState({ ShipmentOrder: ShipmentOrder })
        }

    }
    handleValueChangeDriverUser(e, selectedOption) {
        let { ShipmentOrder } = this.state;
        ShipmentOrder.DriverUser = selectedOption.value;
        ShipmentOrder.DriverUserFull = selectedOption.FullName;
        if (ShipmentOrder.DriverUser == "") {
            this.setState({ validationErroDriverUser: "Vui lòng chọn nhân tài xế" });
        }
        else {
            this.setState({ validationErroDriverUser: null });
        }
        this.setState({ ShipmentOrder: ShipmentOrder })
    }

    handleOnValueChangeDeliverUser(name, selectedOption) {

        let listMLObject = [];
        let listStaffDebtObject = [];
        if (selectedOption) {
            for (let i = 0; i < selectedOption.length; i++) {
                listMLObject.push({
                    ShipmentOrderID: this.state.ShipmentOrder.ShipmentOrderID,
                    UserName: selectedOption[i].value,
                    FullName: selectedOption[i].name,
                    CreatedUser: this.props.AppInfo.LoginInfo.Username,
                    CreatedOrderTime: this.state.ShipmentOrder.CreatedOrderTime
                });
                listStaffDebtObject.push({
                    UserName: selectedOption[i].value,
                    StoreID: this.state.ShipmentOrder.CoordinatorStoreID
                });
            }
        }

        let { ShipmentOrder } = this.state;
        if (selectedOption) {
            this.props.callFetchAPI(APIHostName, 'api/StaffDebt/UserIsLockDelivery', listStaffDebtObject).then((apiResult) => {
                if (!apiResult.IsError) {
                    ShipmentOrder.ShipmentOrder_DeliverUserList = listMLObject;
                    this.setState({ ShipmentOrder: ShipmentOrder })
                }
                else {
                    this.addNotification(apiResult.Message, apiResult.IsError);
                }
            });
        }
        else {
            ShipmentOrder.ShipmentOrder_DeliverUserList = [];
            this.setState({ ShipmentOrder: ShipmentOrder })
        }
    }

    handleCloseMessage() {
        if (!this.state.IsCallAPIError) this.setState({ IsCloseForm: true });
    }

    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
                onCloseModal={this.handleCloseMessage.bind(this)}
            />
        );
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

    handleCheckDeliverUser(e) {
        const strDeliverUservalue = e.target.value;
        const isCheck = e.target.checked;
        if (isCheck) {
            let { ShipmentOrder, lstPartnerUser } = this.state;
            if (this.state.ShipmentOrder.CarrierPartnerID != -1 && this.state.ShipmentOrder.CarrierPartnerID != 0) {
                if (ShipmentOrder.ShipmentOrder_DeliverUserList.find(n => n.UserName == strDeliverUservalue) == undefined) {
                    if (lstPartnerUser.filter(n => n.value == strDeliverUservalue && n.PartnerID == this.state.ShipmentOrder.CarrierPartnerID).length > 0) {
                        ShipmentOrder.ShipmentOrder_DeliverUserList.push(
                            {
                                ShipmentOrderID: this.state.ShipmentOrder.ShipmentOrderID,
                                UserName: strDeliverUservalue,
                                FullName: e.currentTarget.dataset.fullname,
                                CreatedUser: this.props.AppInfo.LoginInfo.Username,
                                CreatedOrderTime: this.state.ShipmentOrder.CreatedOrderTime
                            }
                        )
                    }
                }
            }
            else {
                if (ShipmentOrder.ShipmentOrder_DeliverUserList.find(n => n.UserName == strDeliverUservalue) == undefined) {
                    ShipmentOrder.ShipmentOrder_DeliverUserList.push(
                        {
                            ShipmentOrderID: this.state.ShipmentOrder.ShipmentOrderID,
                            UserName: strDeliverUservalue,
                            FullName: e.currentTarget.dataset.fullname,
                            CreatedUser: this.props.AppInfo.LoginInfo.Username,
                            CreatedOrderTime: this.state.ShipmentOrder.CreatedOrderTime
                        }
                    )
                }
            }

            //  console.log(" ShipmentOrder.ShipmentOrder_DeliverUserList", ShipmentOrder.ShipmentOrder_DeliverUserList)
            this.setState({ ShipmentOrder: ShipmentOrder })

            //   console.log("handleCheckDeliverUser",strDeliverUservalue,isCheck,e.currentTarget.dataset.fullname)
        }
    }

    handleShipWorkFlowInsert() {
        let { ShipmentOrder, validationErroDeliverUser, validationErroCarrierPartner, validationErroDriverUser, validationErroCarrierType } = this.state;
        if (ShipmentOrder.CarrierTypeID == undefined || parseInt(ShipmentOrder.CarrierTypeID) <= 0) {
            validationErroCarrierType = "Vui lòng chọn phương tiện vận chuyển"
            this.setState({ validationErroCarrierType: validationErroCarrierType });
            return;
        }
        // else if (ShipmentOrder.DriverUser == undefined || ShipmentOrder.DriverUser == "") {
        //     validationErroDriverUser = "Vui lòng chọn nhân viên tài xế"
        //     this.setState({ validationErroDriverUser: validationErroDriverUser });
        //     return;
        // }

        else {
            this.state.ShipmentOrder.UpdatedUser = this.props.AppInfo.LoginInfo.Username,
                this.props.callFetchAPI(APIHostName, 'api/ShipmentOrder/AddInfoCoordinator', this.state.ShipmentOrder).then((apiResult) => {
                    this.addNotification(apiResult.Message, apiResult.IsError);
                    if (!apiResult.IsError) {
                        setTimeout(() => { this.setState({ IsCloseForm: true }) }, 2000);
                    }
                });
        }
    }

    handleCancelDeliverUser() {
        this.openCancelDeliverUserModal();
    }

    openCancelDeliverUserModal() {

        ModalManager.open(
            <ModelContainer
                title="Gợi ý nhân viên giao hàng"
                name=""
                content={"Cập nhật loại đơn vị thành công!"}
                onRequestClose={() => false}
                IsButton={true}
            >
                <div className="form-row">
                    <div className="table-responsive">
                        <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                            <thead className="thead-light">
                                <tr>
                                    <th className="jsgrid-header-cell"></th>
                                    <th className="jsgrid-header-cell">Tên nhân viên giao </th>
                                    <th className="jsgrid-header-cell">Số lượng đơn hàng</th>
                                    <th className="jsgrid-header-cell">Đơn hàng đã giao</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.ShipmentOrder.DeliverUserList && this.state.ShipmentOrder.DeliverUserList.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <div className="checkbox">
                                                    <label>
                                                        <input type="checkbox" className="form-control form-control-sm"
                                                            onChange={this.handleCheckDeliverUser.bind(this)}
                                                            value={item.UserName}
                                                            data-fullname={item.FullName}
                                                        />
                                                        <span className="cr">
                                                            <i className="cr-icon fa fa-check"></i>
                                                        </span>
                                                    </label>
                                                </div>
                                            </td>
                                            <td>{item.UserName + "-" + item.FullName}</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    )
                                })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </ModelContainer>
        );
    }

    //Chuyển kho điều phối
    handleCoordinatorStore() {

        //this.openCoordinatorStoreModal();
        this.props.showModal(MODAL_TYPE_CONFIRMATIONNEW, {
            title: 'Chuyển kho điều phối',
            onConfirmNew: (isConfirmed, formData) => {

                let ShipmentOrderCoord =
                {
                    ShipmentOrderID: this.state.ShipmentOrder.ShipmentOrderID,
                    CreatedOrderTime: this.state.ShipmentOrder.CreatedOrderTime,
                    CoordinatorStoreID: this.state.ShipmentOrder.CoordinatorStoreID,
                    CoordinatorStoreNewID: formData.CoordinatorStoreNewID,
                    CoordinatorNote: formData.CoordinatorNote,
                    UpdatedUser: this.props.AppInfo.LoginInfo.Username

                }


                this.props.callFetchAPI(APIHostName, 'api/ShipmentOrder/UpdateCoordinatorStore', ShipmentOrderCoord).then((apiResult) => {
                    this.addNotification(apiResult.Message, apiResult.IsError);
                    if (!apiResult.IsError) {
                        this.props.hideModal();
                        setTimeout(() => { this.setState({ IsCloseForm: true }) }, 2000);

                    }
                });

            },
            modalElementList: UpdateCoordinatorStoreEdit,
            modalElementOl: MLObjectUpdateCoordinatorStore,
            dataSource: { CoordinatorStoreID: this.state.ShipmentOrder.CoordinatorStoreID, CoordinatorNote: this.state.ShipmentOrder.CoordinatorNote },
            isaddComboBox: true

        });

    }

    handleIgnoreCheckRCGeolocation() {
        this.props.showModal(MODAL_TYPE_CONFIRMATIONNEW, {
            title: 'Cập nhật bỏ qua kiểm tra tọa độ nhận hàng',
            onConfirmNew: (isConfirmed, formData) => {
                let ShipmentOrderCoord =
                {
                    ShipmentOrderID: this.state.ShipmentOrder.ShipmentOrderID,
                    IgnoreCheckRCGeolocReasonNote: formData.IgnoreCheckRCGeolocReasonNote,
                    IgnoreCheckRCGeolocReasonID: formData.IgnoreCheckRCGeolocReasonID
                }


                this.props.callFetchAPI(APIHostName, 'api/ShipmentOrder/UpdateIgnoreCheckRCGeolocation', ShipmentOrderCoord).then((apiResult) => {
                    this.addNotification(apiResult.Message, apiResult.IsError);
                    if (!apiResult.IsError) {
                        this.props.hideModal();
                        setTimeout(() => { this.setState({ IsCloseForm: true }) }, 2000);

                    }
                });

            },
            modalElementList: IgnoreCheckRCGeolocationADD,
            modalElementOl: MLObjectIgnoreCheckRCGeolocation,
            dataSource: { CoordinatorStoreID: this.state.ShipmentOrder.CoordinatorStoreID, CoordinatorNote: this.state.ShipmentOrder.CoordinatorNote },
            isaddComboBox: true

        });

    }

    handleValueCancelStore(selectedOption) {
        let validationErrorCancelStore = null
        if (selectedOption.value == undefined || selectedOption.value == -1) {
            validationErrorCancelStore = "Vui lòng chọn lý do hủy giao"
        }

        this.setState({ selectedOptionStore: selectedOption, validationErrorCancelStore: validationErrorCancelStore }, () => {
            this.openCoordinatorStoreModal();
        });

    }

    openCoordinatorStoreModal() {
        ModalManager.open(
            <ModelContainer
                title="Thông tin kho điều phối"
                name=""
                content={"Cập nhật kho điều phối thành công!"} onRequestClose={() => false}
                onChangeModal={this.handleCoordinatorStoreInsert.bind(this)}  >
                <div className="form-row">

                    <div className="form-group col-md-3">
                        <label className="col-form-label 6">Kho điều phối<span className="text-danger">*</span></label>
                    </div>
                    <div className="form-group col-md-9">
                        <div className="form-group-input-select">
                            <Select
                                value={this.state.selectedOptionStore}
                                name={"StoreID"}
                                onChange={this.handleValueCancelStore.bind(this)}
                                options={this.state.lstStore}
                                isMulti={false}
                                isSearchable={true}
                                className={(this.state.validationErrorCancelStore != null ? "react-select is-invalid" : "react-select")}
                                placeholder="--Vui lòng chọn--"
                            />
                            <div className="invalid-feedback"><ul className="list-unstyled"><li>{this.state.validationErrorCancelStore}</li></ul></div>
                        </div>
                    </div>
                </div>

            </ModelContainer>
        );
    }

    handleCoordinatorStoreInsert() {
        let { ShipmentOrder, selectedOptionStore, validationErrorCancelStore } = this.state;
        if (selectedOptionStore.value == undefined || selectedOptionStore.length == 0) {
            validationErrorCancelStore = "Vui lòng chọn kho điều phối"
            this.setState({ validationErrorCancelStore: validationErrorCancelStore }, () => {
                this.openCoordinatorStoreModal();
            });
        }
        else {
            ShipmentOrder.CoordinatorStoreNewID = selectedOptionStore.value;
            ShipmentOrder.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
            this.props.callFetchAPI(APIHostName, 'api/ShipmentOrder/UpdateCoordinatorStore', ShipmentOrder).then((apiResult) => {
                this.addNotification(apiResult.Message, apiResult.IsError);
                if (!apiResult.IsError) {
                    ModalManager.close();
                    setTimeout(() => { this.setState({ IsCloseForm: true }) }, 2000);
                }
            });
        }

    }
    
    handleShipCancelDelivery(apiResult) {
        this.addNotification(apiResult.Message, apiResult.IsError);
        if (!apiResult.IsError) {
            this.props.hideModal();
            this.setState({ GridDataShip: [] });
            if (!apiResult.IsError) {
                if (this.props.onhandleChange != null)
                    this.props.onhandleChange(apiResult.ResultObject)
            }
        }
    }

    handleCancelDeliveryNew() {

        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Điều phối nhân viên ',
            content: {
                text: <ListShipCoordinator
                    ShipmentOrderID={this.state.ShipmentOrder.ShipmentOrderID}
                    InfoCoordinator={this.state.ShipmentOrder}
                    IsUserCoordinator={true}
                    IsCoordinator={true}
                    IsCancelDelivery={true}
                    onhandleChange={this.handleShipCancelDelivery.bind(this)}
                />
            },
            maxWidth: '1300px'
        });
    }
    //End chuyển kho điều phối

    render() {

        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }

        const Usernamelst = "73309,55503,142168";
        let objUsernamecheck = Usernamelst.includes(this.props.AppInfo.LoginInfo.Username)

        let listOption = [];
        let objDeliverUser = [];
        let listOptionDriverUser = [];
        if (this.state.ShipmentOrder.CarrierPartnerID != -1 && this.state.ShipmentOrder.CarrierPartnerID != 0) {
            this.state.ShipmentOrder.ShipmentOrder_DeliverUserList && this.state.ShipmentOrder.ShipmentOrder_DeliverUserList.map((item, index) => {
                objDeliverUser.push(item.UserName)
            })
        }
        else {
            this.state.ShipmentOrder.ShipmentOrder_DeliverUserList && this.state.ShipmentOrder.ShipmentOrder_DeliverUserList.map((item, index) => {
                listOption.push({ value: item.UserName, label: item.UserName + "-" + item.FullName, FullName: item.FullName });
            })
        }
        if (this.state.ShipmentOrder.DriverUser != "") {
            listOptionDriverUser.push({ value: this.state.ShipmentOrder.DriverUser, label: this.state.ShipmentOrder.DriverUser + "-" + this.state.ShipmentOrder.DriverUserFull, FullName: this.state.ShipmentOrder.DriverUserFull });
        }
        // let IsCoordinatorNew = this.props.IsCoordinator;
        // let IsUserCoordinatorNew = this.props.IsUserCoordinator;
        let IsCoordinatorNew = false;
        let IsUserCoordinatorNew = false;

        if (objUsernamecheck == true) {
            IsCoordinatorNew = true;
            IsUserCoordinatorNew = true;
        }

        return (
            <div className="card">
                <ReactNotification ref={this.notificationDOMRef} />
                <div className="card-title group-card-title">
                    <h4 className="title">Thông tin điều phối</h4>
                </div>
                <div className="card-body">
                    <div className="form-row">
                        <div className="col-md-6">
                            <FormControl.ComboBoxPartner
                                name="CarrierPartnerID"
                                colspan="8"
                                labelcolspan="4"
                                label="Đối tác vận chuyển:"
                                isautoloaditemfromcache={true}
                                loaditemcachekeyid="ERPCOMMONCACHE.PARTNER"
                                valuemember="PartnerID"
                                nameMember="PartnerName"
                                controltype="InputControl"
                                onChange={this.handleOnValueChange}
                                value={this.state.ShipmentOrder.CarrierPartnerID}
                                listoption={null}
                                datasourcemember="CarrierPartnerID"
                                placeholder="---Vui lòng chọn---"
                                isMultiSelect={false}
                                disabled={!IsCoordinatorNew}
                                validationErrorMessage={this.state.validationErroCarrierPartner}
                            />
                        </div>
                        <div className="col-md-6">
                            <div className="form-row">
                                <div className="form-group col-md-3"><label className="col-form-label 6">Kho điều phối</label></div>
                                <div className="form-group col-md-9"><label className="col-form-label 6">{this.state.ShipmentOrder.CoordinatorStoreID + '-' + this.state.ShipmentOrder.CoordinatorStoreName}</label></div>
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-6">
                            {(this.state.ShipmentOrder.CarrierPartnerID == -1 || this.state.ShipmentOrder.CarrierPartnerID == 0) ?
                                <MultiSelectComboBox
                                    name="ShipmentOrder_DeliverUserList"
                                    colspan="8"
                                    labelcolspan="4"
                                    label="Nhân viên giao"
                                    disabled={!IsUserCoordinatorNew}
                                    IsLabelDiv={true}
                                    isSelectedOption={true}
                                    isautoloaditemfromcache={false}
                                    loaditemcachekeyid={"PIMCACHE_PIM_SHIPPINGMETHOD"}
                                    valuemember="ShippingMethodID"
                                    nameMember="ShippingMethodName"
                                    controltype="InputControl"
                                    value={listOption}
                                    ShipmentOrder={this.state.ShipmentOrder}
                                    onChange={this.handleValueChange1}
                                    listoption={[]}
                                    isMultiSelect={true}
                                    isPartner={true}
                                    datasourcemember="ShipmentOrder_DeliverUserList"

                                /> :
                                <FormControl.FormControlComboBox
                                    name="ShipmentOrder_DeliverUserList"
                                    colspan="8"
                                    labelcolspan="4"
                                    label="Nhân viên giao"
                                    isautoloaditemfromcache={true}
                                    loaditemcachekeyid="ERPCOMMONCACHE.PARTNERUSER"
                                    valuemember="UserName"
                                    nameMember="FullName"
                                    controltype="InputControl"
                                    value={objDeliverUser}
                                    onValueChange={this.handleOnValueChangeDeliverUser}
                                    listoption={null}
                                    datasourcemember="PartnerID"
                                    placeholder="---Vui lòng chọn---"
                                    isMultiSelect={true}
                                    filterValue={this.state.ShipmentOrder.CarrierPartnerID}
                                    filterobj="PartnerID"
                                    disabled={!IsCoordinatorNew}
                                    isselectedOp={true}
                                />
                            }
                        </div>
                        <div className="col-md-6">
                            <FormControl.FormControlComboBox
                                name="CarrierTypeID"
                                colspan="9"
                                labelcolspan="3"
                                label="phương tiện vận chuyển"
                                validatonList={["Comborequired"]}
                                isautoloaditemfromcache={true}
                                loaditemcachekeyid="ERPCOMMONCACHE.CARRIERTYPE"
                                valuemember="CarrierTypeID"
                                nameMember="CarrierTypeName"
                                controltype="InputControl"
                                onValueChange={this.handleOnValueChange}
                                value={this.state.ShipmentOrder.CarrierTypeID}
                                listoption={null}
                                datasourcemember="CarrierTypeID"
                                placeholder="---Vui lòng chọn---"
                                isMultiSelect={false}
                                disabled={!IsCoordinatorNew}
                                validationErrorMessage={this.state.validationErroCarrierType}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-6">
                            <MultiSelectComboBox
                                name="DriverUser"
                                colspan="8"
                                labelcolspan="4"
                                label="Tài xế"
                                disabled={this.state.ShipmentOrder.CarrierTypeID != 1 ? false : true}
                                IsLabelDiv={true}
                                isautoloaditemfromcache={false}
                                controltype="InputControl"
                                value={listOptionDriverUser}
                                ShipmentOrder={this.state.ShipmentOrder.DriverUser}
                                onChange={this.handleValueChangeDriverUser.bind(this)}
                                listoption={[]}
                                isMultiSelect={false}
                                datasourcemember="DriverUser"
                            />
                        </div>
                        <div className="col-md-6">
                            <FormControl.FormControlComboBox
                                name="VehicleID"
                                colspan="9"
                                labelcolspan="3"
                                label="Bảng số xe"
                                isautoloaditemfromcache={true}
                                loaditemcachekeyid="ERPCOMMONCACHE.VEHICLE"
                                valuemember="VehicleID"
                                nameMember="LicensePlateNumber"
                                controltype="InputControl"
                                onValueChange={this.handleOnValueChange}
                                value={this.state.ShipmentOrder.VehicleID}
                                listoption={null}
                                datasourcemember="VehicleID"
                                placeholder="---Vui lòng chọn---"
                                isMultiSelect={false}
                                isselectedOp={true}
                                filterValue={this.state.ShipmentOrder.CoordinatorStoreID}
                                filterobj="MaincoordinAtorStoreID"
                                disabled={this.state.ShipmentOrder.CarrierTypeID != 1 ? false : true}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-2">
                            <label className="col-form-label bold">Ghi chú:</label>
                        </div>
                        <div className="form-group col-md-10">
                            <input key={"CoordinatorNote"} type="text" name="CoordinatorNote"
                                value={this.state.ShipmentOrder.CoordinatorNote}
                                disabled={!this.props.IsCoordinator}
                                onChange={this.handleValueChange}
                                className="form-control form-control-sm"
                                placeholder={"ghi chú"}
                            />
                        </div>
                    </div>
                    <div className="form-row suggest-shipper">
                        <div className="form-group col-md-2">
                        </div>
                        <div className="form-group col-md-10">
                            <button className="btn btnEditCard" type="submit" onClick={this.handleCancelDeliverUser.bind(this)}><span className="fa">Gợi ý nhân viên giao hàng</span></button>
                        </div>
                    </div>
                    {/* <div className="form-row">
                        <div className="form-group col-md-2">
                        </div>
                        <div className="form-group col-md-10">
                            <div className="col-md-12">
                                <h3 className="title">Gợi ý nhân viên giao hàng:</h3>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                    <thead className="thead-light">
                                        <tr>
                                            <th className="jsgrid-header-cell"></th>
                                            <th className="jsgrid-header-cell">Tên nhân viên giao </th>
                                            <th className="jsgrid-header-cell">Số lượng đơn hàng</th>
                                            <th className="jsgrid-header-cell">đơn hoàn đã giao</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.ShipmentOrder.DeliverUserList && this.state.ShipmentOrder.DeliverUserList.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        <div className="checkbox">
                                                            <label>
                                                                <input type="checkbox" className="form-control form-control-sm"
                                                                    onChange={this.handleCheckDeliverUser.bind(this)}
                                                                    value={item.UserName}
                                                                    data-fullname={item.FullName}
                                                                />
                                                                <span className="cr">
                                                                    <i className="cr-icon fa fa-check"></i>
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td>{item.UserName + "-" + item.FullName}</td>
                                                    <td>10</td>
                                                    <td>6</td>
                                                </tr>
                                            )
                                        })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div> */}

                    <div className="form-row">

                        <div className="form-group col-md-12 form-group-btncustom">
                            {
                                this.state.ShipmentOrder.IsIGnoreCheckRCGeolocation == false ? <button className="btn btnDelivery mr-10" type="submit" onClick={this.handleIgnoreCheckRCGeolocation.bind(this)}><span className="fa fa-remove">Bỏ qua kiểm tra toạ độ</span></button> : ""
                            }

                            {
                                this.props.IsCancelDelivery == true ? <button className="btn btnDelivery mr-10" type="submit" onClick={this.handleCancelDeliveryNew.bind(this)}><span className="fa fa-remove"> Hủy giao hàng</span></button> : <button className="btn btnDelivery mr-10" disabled title="Bạn Không có quyền xử lý!" type="submit"  ><span className="fa fa-remove"> Hủy giao hàng</span></button>
                            }
                            {
                                this.props.IsCoordinator == true ? <button className="btn btnEditCard mr-10" type="submit" onClick={this.handleCoordinatorStore.bind(this)}>Chuyển kho điều phối</button> : <button className="btn btnEditCard mr-10" disabled title="Bạn Không có quyền xử lý!" type="submit"  ><span className="fa fa-edit">Chuyển kho điều phối</span></button>
                            }
                            {
                                this.props.IsCoordinator == true ? <button className="btn btnEditCard" type="submit" onClick={this.handleShipWorkFlowInsert}> Cập nhật</button> : <button className="btn btnEditCard" disabled title="Bạn Không có quyền xử lý!" type="submit"  ><span className="fa fa-edit"> Cập nhật</span></button>
                            }
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
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: () => {
            dispatch(hideModal());
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        }
    }
}


const InfoCoordinator = connect(mapStateToProps, mapDispatchToProps)(InfoCoordinatorCom);
export default InfoCoordinator;