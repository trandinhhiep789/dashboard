import React, { Component } from "react";
import { connect } from 'react-redux';
import { ModalManager } from 'react-dynamic-modal';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { callGetCache } from "../../../../actions/cacheAction";
import MultiSelectComboBox from "../../../../common/components/FormContainer/FormControl/MultiSelectComboBox";
import FormControl from "../../../../common/components/FormContainer/FormControl";
import { MessageModal } from "../../../../common/components/Modal";
import InputGridChageControl from "../../../../common/components/FormContainer/FormControl/InputGrid/InputGridChageControl";
import { showModal, hideModal } from '../../../../actions/modal';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import {
    APIHostName
} from "../constants";

class ListShipCoordinatorCom extends Component {
    constructor(props) {
        super(props);
        this.handleOnValueChange = this.handleOnValueChange.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);

        this.state = {
            ShipmentOrder: this.props.InfoCoordinator,
            objCoordinator: { CancelDeliveryReasonID: -1, CancelDeliveryUser: "", CancelDeliveryReasonNote: "" },
            ErrorCoordinator: { CancelDeliveryReasonID: "", CancelDeliveryUser: "", CancelDeliveryReasonNote: "" },
            CallAPIMessage: "",
            IsCallAPIError: false
        }
        this.notificationDOMRef = React.createRef();
    }



    handleOnValueChange(name, value) {

        let { objCoordinator, ErrorCoordinator } = this.state;
        objCoordinator[name] = value;
        if (name == "CancelDeliveryReasonID" && value == -1) {
            ErrorCoordinator[name] = "Vui lòng chọn lý do hủy giao"
        }
        else if (name == "CancelDeliveryReasonNote" && (value == "" || value.length == 0)) {
            ErrorCoordinator[name] = "Vui lòng nhập nội dung"
        }
        else {
            ErrorCoordinator[name] = ""
        }
        this.setState({
            objCoordinator: objCoordinator,
            ErrorCoordinator, ErrorCoordinator
        })
    }

    handleCloseMessage() {
        if (!this.state.IsCallAPIError) {
            if (this.props.onChangeValue != null)
                this.props.onChangeValue();
        }
    }

    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
                onCloseModal={this.handleCloseMessage}
            />
        );
    }

    handleCancelDeliveryInsert() {

        let { objCoordinator, ErrorCoordinator } = this.state;
        if (objCoordinator.CancelDeliveryReasonID ==-1) {
            ErrorCoordinator.CancelDeliveryReasonID= "Vui lòng chọn lý do hủy giao";
        }
        if (objCoordinator.CancelDeliveryUser == "") {
            ErrorCoordinator.CancelDeliveryUser = "Vui lòng chọn nhân viên yêu cầu";
         
        }
        if (objCoordinator.CancelDeliveryReasonNote == "" || objCoordinator.CancelDeliveryReasonNote.length == 0 || String(objCoordinator.CancelDeliveryReasonNote).trim() == "") {
            ErrorCoordinator.CancelDeliveryReasonNote = "Vui lòng nhập nội dung";
        }
        // else {
        //     ShipmentOrder.CancelDeliveryReasonID = selectedOption.value;
        //     ShipmentOrder.CancelDeliveryUser = this.props.AppInfo.LoginInfo.Username;
        //     ShipmentOrder.CancelDeliveryReasonNote = CancelDeliveryReasonNote;
        //     this.props.callFetchAPI(APIHostName, 'api/ShipmentOrder/UpdateCancelDelivery', ShipmentOrder).then((apiResult) => {
        //         this.addNotification(apiResult.Message, apiResult.IsError);
        //         if (!apiResult.IsError) {
        //             if (this.props.onhandleChange != null)
        //                 this.props.onhandleChange(apiResult.ResultObject)

        //             ModalManager.close();
        //         }
        //     });
        // }
        this.setState({
            ErrorCoordinator, ErrorCoordinator
        })

    }

    checkInputName(formValidation) {
        for (const key in formValidation) {
            //      console.log("formValidation:", formValidation);

            if (formValidation[key] != undefined) {
                // console.log("validation:", key, this.elementItemRefs[key]);
                if (formValidation[key] != [] && formValidation[key].IsValidatonError) {

                    return key;
                }
            }
        }
        return "";
    }

    handleCloseModal() {
        this.props.hideModal();
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

    render() {
        let { objCoordinator, ErrorCoordinator } = this.state;
        const DataGridColumnItemList = [
            {
                name: "ShipmentOrderID",
                type: "text",
                caption: "Mã vận đơn",
                dataSourcemember: "ShipmentOrderID",
                width: 50
            },
            {
                name: "CarrierPartnerID",
                type: "ComboBox",
                caption: "Đối tác",
                dataSourcemember: "CarrierPartnerID",
                width: 250,
                isautoloaditemfromcache: true,
                loaditemcachekeyid: "ERPCOMMONCACHE.PARTNER",
                valuemember: "PartnerID",
                nameMember: "PartnerName",
                value: -1,
                listoption: null,
                filterValue: "2",
                filterobj: "PartnerTypeID",
                placeholder: "---Vui lòng chọn---",
                isMultiSelect: false,
                disabled: false
            },
            {
                name: "ShipmentOrder_DeliverUserList",
                type: "ComboUserBox",
                caption: "Nhân viên giao nhận",
                dataSourcemember: "ShipmentOrder_DeliverUserList",
                width: 250,
                isautoloaditemfromcache: true,
                loaditemcachekeyid: "ERPCOMMONCACHE.PARTNERUSER",
                valuemember: "UserName",
                nameMember: "FullName",
                value: -1,
                listoption: null,
                placeholder: "---Nhân viên giao nhận---",
                isMultiSelect: true,
                disabled: false,
                isPartner: true,
                filterValue: "-1",
                filterobj: "PartnerID",
                filterrest: "CarrierPartnerID"
            },
            {
                name: "CarrierTypeID",
                type: "ComboBox",
                caption: "Phương tiện",
                dataSourcemember: "CarrierTypeID",
                width: 150,
                isautoloaditemfromcache: true,
                loaditemcachekeyid: "ERPCOMMONCACHE.CARRIERTYPE",
                valuemember: "CarrierTypeID",
                nameMember: "CarrierTypeName",
                value: -1,
                listoption: null,
                placeholder: "---Phương tiện---",
                isMultiSelect: false,
                disabled: false
            },
            {
                name: "VehicleID",
                type: "ComboBox",
                caption: "Xe tải",
                dataSourcemember: "VehicleID",
                width: 150,
                isautoloaditemfromcache: true,
                loaditemcachekeyid: "ERPCOMMONCACHE.VEHICLE",
                valuemember: "VehicleID",
                nameMember: "LicensePlateNumber",
                value: -1,
                listoption: null,
                filterValue: "4121",
                filterobj: "MaincoordinAtorStoreID",
                placeholder: "---Chọn---",
                isMultiSelect: false,
                disabled: false
            },
            {
                name: "DriverUser",
                type: "ComboUserDriverUserBox",
                caption: "Tài xế",
                dataSourcemember: "DriverUser",
                width: 150,
                isautoloaditemfromcache: false,
                value: -1,
                listoption: null,
                placeholder: "---Nhân viên tài xế---",
                isMultiSelect: false,
                disabled: false,
            },
            {
                name: "ShipmentOrderID",
                type: "edit",
                caption: "Tác vụ",
                dataSourcemember: "ShipmentOrderID",
                width: 50

            },
            {
                name: "IsPermission",
                type: "text",
                caption: "Mã vận đơn",
                dataSourcemember: "IsPermission",
                width: 50,
                hideInput: false
            }
            // },
            // {
            //     Name: "Action",
            //     Type: "editnew",
            //     Caption: "Tác vụ",
            //     label:"Mã vận đơn",
            //     DataSourceMember: "CarrierPartnerID",
            //     Width: 70,
            //     iputpop: false
            // }
        ];
        return (
            <div className="card modalForm">
                <ReactNotification ref={this.notificationDOMRef} />
                <div className="card-body" style={{ minHeight: 430 }}>
                    <div className="form-row">
                        <div className="col-md-6">
                            <FormControl.FormControlComboBox
                                name="CancelDeliveryReasonID"
                                colspan="8"
                                labelcolspan="4"
                                label="Lý do hủy giao hàng:"
                                isautoloaditemfromcache={true}
                                loaditemcachekeyid="ERPCOMMONCACHE.CANCELDELIVERYREASON"
                                valuemember="CancelDeliveryReasonID"
                                nameMember="CancelDeliveryReasonName"
                                controltype="InputControl"
                                onValueChange={this.handleOnValueChange}
                                value={objCoordinator.CancelDeliveryReasonID}
                                listoption={null}
                                datasourcemember="CancelDeliveryReasonID"
                                placeholder="---Vui lòng chọn---"
                                validationErrorMessage={ErrorCoordinator.CancelDeliveryReasonID}
                                validatonList={"Comborequired"}
                            />
                        </div>
                        <div className="col-md-6">
                            <MultiSelectComboBox
                                name="CancelDeliveryUser"
                                colspan="8"
                                labelcolspan="4"
                                label="Nhân viên giao"
                                IsLabelDiv={true}
                                isSelectedOption={true}
                                isautoloaditemfromcache={false}
                                controltype="InputControl"
                                onChange={this.handleOnValueChange}
                                value={objCoordinator.CancelDeliveryUser}
                                listoption={[]}
                                isMultiSelect={false}
                                isCheckPartner={false}
                                datasourcemember="CancelDeliveryUser"
                                validationErrorMessage={ErrorCoordinator.CancelDeliveryUser}
                                validatonList={"Comborequired"}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-12">
                            <FormControl.TextArea
                                name="CancelDeliveryReasonNote"
                                colspan="10"
                                labelcolspan="2"
                                label="Nội dung hủy giao hàng"
                                controltype="InputControl"
                                onValueChange={this.handleOnValueChange}
                                value={objCoordinator.CancelDeliveryReasonNote}
                                datasourcemember="CancelDeliveryReasonNote"
                                placeholder="---Vui lòng chọn---"
                                validationErrorMessage={ErrorCoordinator.CancelDeliveryReasonNote}
                                validatonList={"required"}
                            />
                        </div>
                    </div>

                    <InputGridChageControl
                        name="ShipmentOrder_ItemList"
                        controltype="InputGridControl"
                        title="Danh sách vận đơn"
                        listColumn={DataGridColumnItemList}
                        dataSource={this.state.ShipmentOrder}
                    />
                </div>
                <div className="modal-footer">
                    <button className="btn btnEditCard" onClick={this.handleCancelDeliveryInsert.bind(this)} type="submit" > Cập nhật</button>
                    <button type="button" className="btn btn-export ml-10" title="" onClick={this.handleCloseModal.bind(this)}>Đóng</button>
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
        hideModal: (type, props) => {
            dispatch(hideModal(type, props));
        }
    }
}


const ListShipCoordinator = connect(mapStateToProps, mapDispatchToProps)(ListShipCoordinatorCom);
export default ListShipCoordinator;