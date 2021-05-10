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
        this.handleShipWorkFlowInsert = this.handleShipWorkFlowInsert.bind(this);
        this.handleValueChange1 = this.handleValueChange1.bind(this);
        this.handleOnValueChange = this.handleOnValueChange.bind(this);
        this.handleOnValueChangeDeliverUser = this.handleOnValueChangeDeliverUser.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);

        this.state = {
            ShipmentOrder: this.props.InfoCoordinator,
            objCoordinator: { CarrierPartnerID: -1, CarrierTypeID: 1 },
            selectedOption: [],
            objDeliverUser: [],
            DeliverUserList: {},
            DeliverUserServerList: [],
            FormValidation: {},
            CallAPIMessage: "",
            IsCallAPIError: false
        }
        this.notificationDOMRef = React.createRef();
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.InfoCoordinator) !== JSON.stringify(nextProps.InfoCoordinator)) {
            this.setState({
                ShipmentOrder: nextProps.InfoCoordinator
            })
        }
    }

    handleOnValueChange(name, value) {
        let { objCoordinator, objDeliverUser } = this.state;
        objCoordinator[name] = value;
        if (name == "CarrierPartnerID") {
            objDeliverUser = [];
            this.state.ShipmentOrder.map((row, indexRow) => {
                if (!row.IsCoordinator && row.IsPermission == true) {
                    row[name] = value;
                    row["ShipmentOrder_DeliverUserList"] = [];
                }
            });
        }
        else {
            this.state.ShipmentOrder.map((row, indexRow) => {
                if (!row.IsCoordinator && row.IsPermission == true) {
                    row[name] = value;
                }
            });
        }


        this.setState({
            objCoordinator: objCoordinator,
            objDeliverUser: objDeliverUser,
            ShipmentOrder: this.state.ShipmentOrder
        })
    }

    handleValueChange1(e, selectedOption1) {
        let objDeliverUser = [];
        let listStaffDebtObject = [];
        selectedOption1 && selectedOption1.map((item, index) => {
            let objShip_DeliverUser = { UserName: item.value, FullName: item.FullName }
            objDeliverUser.push(objShip_DeliverUser)
            listStaffDebtObject.push({
                UserName: item.value,
                StoreID: this.state.ShipmentOrder[0].CoordinatorStoreID
            });
        })

        if (selectedOption1) {
            this.props.callFetchAPI(APIHostName, 'api/StaffDebt/UserIsLockDelivery', listStaffDebtObject).then((apiResult) => {
                if (!apiResult.IsError) {
                    this.state.ShipmentOrder.map((row, indexRow) => {
                        if (!row.IsCoordinator && row.IsPermission == true && row.CarrierPartnerID <= 0)
                            row["ShipmentOrder_DeliverUserList"] = objDeliverUser;
                    });
                    this.setState({ selectedOption: selectedOption1, ShipmentOrder: this.state.ShipmentOrder });
                }
                else {
                    this.addNotification(apiResult.Message, apiResult.IsError);
                }
            });
        }
        else {
            this.setState({ selectedOption: selectedOption1 });
        }
    }

    handleOnValueChangeDeliverUser(name, value, selectedOption) {
        let objMultiDeliverUser = [];
        let listStaffDebtObject = [];
        selectedOption && selectedOption.map((item, index) => {
            let objMultiShip_DeliverUser = { UserName: item.value, FullName: item.name }
            objMultiDeliverUser.push(objMultiShip_DeliverUser)
            listStaffDebtObject.push({
                UserName: item.value,
                StoreID: this.state.ShipmentOrder[0].CoordinatorStoreID
            });
        })
        if (selectedOption) {
            this.props.callFetchAPI(APIHostName, 'api/StaffDebt/UserIsLockDelivery', listStaffDebtObject).then((apiResult) => {
                if (!apiResult.IsError) {
                    this.state.ShipmentOrder.map((row, indexRow) => {
                        if (!row.IsCoordinator && row.IsPermission == true && row.CarrierPartnerID > 0)
                            row["ShipmentOrder_DeliverUserList"] = objMultiDeliverUser;
                    });
                    this.setState({ objDeliverUser: value, ShipmentOrder: this.state.ShipmentOrder });
                }
                else {
                    this.addNotification(apiResult.Message, apiResult.IsError);
                }
            });
        }
        else {
            this.setState({ objDeliverUser: value });
        }
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

    handleShipWorkFlowInsert() {
        let elementobject = {};
        this.state.ShipmentOrder.map((row, indexRow) => {
          
            if (row["CarrierTypeID"] == -1 || row["CarrierTypeID"] == "-1") {
                const validationObject = { IsValidatonError: true, ValidationErrorMessage: "Vui lòng chọn phương tiện" };
                elementobject = Object.assign({}, elementobject, { ["CarrierTypeID-" + indexRow]: validationObject });
            }
            else {
                const validationObject = { IsValidatonError: false, ValidationErrorMessage: "" };
                elementobject = Object.assign({}, elementobject, { ["CarrierTypeID-" + indexRow]: validationObject });
            }
        });
        this.setState({ FormValidation: elementobject });

        if (this.checkInputName(elementobject) != "")
            return;
        this.props.callFetchAPI(APIHostName, 'api/ShipmentOrder/AddInfoCoordinatorLst', this.state.ShipmentOrder).then((apiResult) => {
            if (this.props.onChangeValue != null)
                this.props.onChangeValue(apiResult);
        });
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

    handleDeleteShip(e) {
        const value = e.currentTarget.dataset.id
        this.state.ShipmentOrder.splice(this.state.ShipmentOrder.findIndex(n => n.ShipmentOrderID == value), 1);
        this.setState({ ShipmentOrder: this.state.ShipmentOrder });
    }
    handleDeleteID(e, id) {
        this.state.ShipmentOrder.splice(this.state.ShipmentOrder.findIndex(n => n.ShipmentOrderID == id), 1);
        this.setState({ ShipmentOrder: this.state.ShipmentOrder });
    }
    handleonValueChange(rowname, rowvalue, rowIndex) {
        let objDeliverUser = [];
        let { ShipmentOrder } = this.state;
        if (rowname == "ShipmentOrder_DeliverUserList") {
            let listStaffDebtObject = [];
            rowvalue && rowvalue.map((item, index) => {
                if (item.value != -1 && item.value != 0) {
                    let objShipmentOrder_DeliverUser = { UserName: item.value,FullName: item.FullName }
                    objDeliverUser.push(objShipmentOrder_DeliverUser)
                    listStaffDebtObject.push({
                        UserName: item.value,
                        StoreID: this.state.ShipmentOrder[rowIndex]["CoordinatorStoreID"]
                    });
                }
            })

            if (listStaffDebtObject) {
                this.props.callFetchAPI(APIHostName, 'api/StaffDebt/UserIsLockDelivery', listStaffDebtObject).then((apiResult) => {
                    if (!apiResult.IsError) {
                        ShipmentOrder[rowIndex][rowname] = objDeliverUser;
                        this.setState({ ShipmentOrder: ShipmentOrder });
                    }
                    else {
                        this.addNotification(apiResult.Message, apiResult.IsError);
                    }
                });
            }
            else {
                ShipmentOrder[rowIndex][rowname] = [];
                this.setState({ ShipmentOrder: ShipmentOrder });
            }
        }

        if (rowname == "CarrierPartnerID") {
            ShipmentOrder[rowIndex]["ShipmentOrder_DeliverUserList"] = [];
            ShipmentOrder[rowIndex][rowname] = rowvalue
            this.setState({ ShipmentOrder: ShipmentOrder });
        }

        if (rowname == "CarrierTypeID") {
            ShipmentOrder[rowIndex]["DriverUser"] = "";
            ShipmentOrder[rowIndex]["DriverUserFull"] = "";
            ShipmentOrder[rowIndex].VehicleID = -1;
            ShipmentOrder[rowIndex][rowname] = rowvalue;
            this.setState({ ShipmentOrder: ShipmentOrder });
        }

        if (rowname == "DriverUser") {
            ShipmentOrder[rowIndex][rowname] = rowvalue.value;
            ShipmentOrder[rowIndex]["DriverUserFull"] = rowvalue.FullName;
            this.setState({ ShipmentOrder: ShipmentOrder });
        }
        if (rowname == "VehicleID") {
            ShipmentOrder[rowIndex][rowname] = rowvalue
            this.setState({ ShipmentOrder: ShipmentOrder });
        }
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
        console.log("this.state.ShipmentOrder",this.state.ShipmentOrder)
        return (
            <div className="card modalForm">
                <ReactNotification ref={this.notificationDOMRef} />
                <div className="card-body" style={{ minHeight: 430 }}>
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
                                value={this.state.objCoordinator.CarrierPartnerID}
                                listoption={null}
                                datasourcemember="CarrierPartnerID"
                                placeholder="---Vui lòng chọn---"
                                isMultiSelect={false}
                                disabled={!this.props.IsCoordinator}
                            />
                        </div>
                        <div className="col-md-6">
                            <FormControl.FormControlComboBox
                                name="CarrierTypeID"
                                colspan="8"
                                labelcolspan="4"
                                label="phương tiện"
                                isautoloaditemfromcache={true}
                                loaditemcachekeyid="ERPCOMMONCACHE.CARRIERTYPE"
                                valuemember="CarrierTypeID"
                                nameMember="CarrierTypeName"
                                controltype="InputControl"
                                onValueChange={this.handleOnValueChange}
                                value={this.state.objCoordinator.CarrierTypeID}
                                listoption={null}
                                datasourcemember="CarrierTypeID"
                                placeholder="---Vui lòng chọn---"
                                isMultiSelect={false}
                                disabled={!this.props.IsCoordinator}
                            />
                        </div>
                    </div>
                    {(this.state.objCoordinator.CarrierPartnerID == -1 || this.state.objCoordinator.CarrierPartnerID == 0) ?
                        <MultiSelectComboBox
                            name="ShipmentOrder_DeliverUserList"
                            colspan="10"
                            labelcolspan="2"
                            label="Nhân viên giao"
                            disabled={!this.props.IsUserCoordinator}
                            IsLabelDiv={true}
                            isSelectedOption={true}
                            isautoloaditemfromcache={false}
                            controltype="InputControl"
                            onChange={this.handleValueChange1}
                            value={this.state.selectedOption}
                            listoption={this.state.selectedOption}
                            isMultiSelect={true}
                            isPartner={true}
                            datasourcemember="ShipmentOrder_DeliverUserList"
                        /> :
                        <FormControl.FormControlComboBoxUser
                            name="ShipmentOrder_DeliverUserList"
                            colspan="10"
                            labelcolspan="2"
                            label="Nhân viên giao"
                            validatonList={["Comborequired"]}
                            isautoloaditemfromcache={true}
                            loaditemcachekeyid="ERPCOMMONCACHE.PARTNERUSER"
                            valuemember="UserName"
                            nameMember="FullName"
                            controltype="InputControl"
                            value={this.state.objDeliverUser}
                            onValueChange={this.handleOnValueChangeDeliverUser}
                            listoption={null}
                            datasourcemember="PartnerID"
                            placeholder="---Vui lòng chọn---"
                            isMultiSelect={true}
                            filterValue={this.state.objCoordinator.CarrierPartnerID}
                            filterobj="PartnerID"
                            disabled={!this.props.IsCoordinator}
                        />
                    }
                    <InputGridChageControl
                        name="ShipmentOrder_ItemList"
                        controltype="InputGridControl"
                        title="Danh sách vận đơn"
                        listColumn={DataGridColumnItemList}
                        dataSource={this.state.ShipmentOrder}
                        FormValidation={this.state.FormValidation}
                        onDeleteClick={this.handleDeleteID.bind(this)}
                        onValueChange={this.handleonValueChange.bind(this)}
                    />
                </div>
                <div className="modal-footer">
                    <button className="btn btnEditCard" onClick={this.handleShipWorkFlowInsert.bind(this)} type="submit" > Cập nhật</button>
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
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        }
    }
}


const ListShipCoordinator = connect(mapStateToProps, mapDispatchToProps)(ListShipCoordinatorCom);
export default ListShipCoordinator;