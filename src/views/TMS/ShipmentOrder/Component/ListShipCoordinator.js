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
import Select from 'react-select';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import InputGridChageControl from "../../../../common/components/FormContainer/FormControl/InputGrid/InputGridChageControl";
import { showModal, hideModal } from '../../../../actions/modal';
import {
    APIHostName,
    BackLink
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
            IsCloseForm: false,
            DeliverUserList: {},
            DeliverUserServerList: [],
            FormValidation: {},
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false

        }
        this.notificationDOMRef = React.createRef();
    }


    componentDidMount() {
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
        }

        this.state.ShipmentOrder.map((row, indexRow) => {
            if (!row.IsCoordinator) {
                row[name] = value;
                row["ShipmentOrder_DeliverUserList"] = [];
            }

        });
        this.setState({
            objCoordinator: objCoordinator,
            objDeliverUser: objDeliverUser,
            ShipmentOrder: this.state.ShipmentOrder
        })
    }

    handleValueChange1(e, selectedOption1) {
        let objDeliverUser = [];
        selectedOption1 && selectedOption1.map((item, index) => {
            let objShip_DeliverUser = { UserName: item.value, FullName: item.label }
            objDeliverUser.push(objShip_DeliverUser)
        })
        this.state.ShipmentOrder.map((row, indexRow) => {
            if (!row.IsCoordinator)
                row["ShipmentOrder_DeliverUserList"] = objDeliverUser;
        });
        this.setState({ selectedOption: selectedOption1, ShipmentOrder: this.state.ShipmentOrder });
    }

    handleOnValueChangeDeliverUser(name, value, selectedOption) {
        let objMultiDeliverUser = [];
        selectedOption && selectedOption.map((item, index) => {
            let objMultiShip_DeliverUser = { UserName: item.value, FullName: item.label }
            objMultiDeliverUser.push(objMultiShip_DeliverUser)
        })
        this.state.ShipmentOrder.map((row, indexRow) => {
            if (!row.IsCoordinator)
                row["ShipmentOrder_DeliverUserList"] = objMultiDeliverUser;
        });
        this.setState({ objDeliverUser: value, ShipmentOrder: this.state.ShipmentOrder });
    }

    handleCloseMessage() {
        if (!this.state.IsCallAPIError) {
            this.setState({ IsCloseForm: true });
            this.props.hideModal();
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

    handleShipWorkFlowInsert() {


        this.props.callFetchAPI(APIHostName, 'api/ShipmentOrder/AddInfoCoordinatorLst', this.state.ShipmentOrder).then((apiResult) => {
            if (!apiResult.IsError) {
                this.props.hideModal();
            }
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);

        });

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
        this.state.ShipmentOrder[rowIndex][rowname] = rowvalue;
        if (rowname == "ShipmentOrder_DeliverUserList") {
            rowvalue && rowvalue.map((item, index) => {
                let objShipmentOrder_DeliverUser = { UserName: item.value, FullName: item.label }
                objDeliverUser.push(objShipmentOrder_DeliverUser)
            })
            this.state.ShipmentOrder[rowIndex][rowname] = objDeliverUser;
        }

        if (rowname == "CarrierPartnerID") {
            this.state.ShipmentOrder[rowIndex]["ShipmentOrder_DeliverUserList"] = [];
        }

        this.setState({ ShipmentOrder: this.state.ShipmentOrder });
    }

    handleCloseModal() {
        this.props.hideModal();
    }

    render() {
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }

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
                name: "ShipmentOrderID",
                type: "edit",
                caption: "Tác vụ",
                dataSourcemember: "ShipmentOrderID",
                width: 50

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

                <div className="card-body" style={{ minHeight: 500 }}>
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
                            isautoloaditemfromcache={false}
                            loaditemcachekeyid={"PIMCACHE_PIM_SHIPPINGMETHOD"}
                            valuemember="ShippingMethodID"
                            nameMember="ShippingMethodName"
                            controltype="InputControl"
                            onChange={this.handleValueChange1}
                            value={this.state.selectedOption}
                            listoption={this.state.selectedOption}
                            isMultiSelect={true}
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
                        title="Danh sách hàng hóa"
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