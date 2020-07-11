import React, { Component } from "react";
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
import {
    APIHostName,
} from "../constants";
class ListShipCoordinatorCom extends Component {
    constructor(props) {
        super(props);
        this.handleShipWorkFlowInsert = this.handleShipWorkFlowInsert.bind(this);
        this.handleValueChange1 = this.handleValueChange1.bind(this);
        this.handleOnValueChange = this.handleOnValueChange.bind(this);

        this.handleOnValueChangeDeliverUser = this.handleOnValueChangeDeliverUser.bind(this);
        this.handleCancelDelivery = this.handleCancelDelivery.bind(this);
        this.handleCancelDeliveryInsert = this.handleCancelDeliveryInsert.bind(this);

        this.state = {
            ShipmentOrder: this.props.InfoCoordinator,
            objCoordinator: { CarrierPartnerID: -1, CarrierTypeID: 1 },
            selectedOption: [],
            objDeliverUser: [],
            IsCallAPIError: false,
            IsCloseForm: false,
            DeliverUserList: {},
            DeliverUserServerList: []

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

    }

    handleOnValueChange(name, value) {
        let { objCoordinator } = this.state;
        objCoordinator[name] = value;
        this.setState({ objCoordinator: objCoordinator })
    }

    handleValueChange1(e, selectedOption1) {
        this.setState({ selectedOption: selectedOption1 })
    }

    handleOnValueChangeDeliverUser(name, value) {
        let { objDeliverUser } = this.state;
        this.setState({ objDeliverUser: value })
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
        let { ShipmentOrder, validationErroDeliverUser, validationErroCarrierPartner } = this.state;
        if (ShipmentOrder.CarrierTypeID == undefined || parseInt(ShipmentOrder.CarrierTypeID) <= 0) {
            validationErroCarrierType = "Vui lòng chọn phương tiện vận chuyển"
            this.setState({ validationErroCarrierType: validationErroCarrierType });
            return;
        }
        else if (ShipmentOrder.ShipmentOrder_DeliverUserList == undefined || ShipmentOrder.ShipmentOrder_DeliverUserList.length <= 0) {
            validationErroDeliverUser = "Vui lòng chọn nhân viên giao"
            this.setState({ validationErroDeliverUser: validationErroDeliverUser });
            return;
        }

        else {
            this.state.ShipmentOrder.UpdatedUser = this.props.AppInfo.LoginInfo.Username,
                this.props.callFetchAPI(APIHostName, 'api/ShipmentOrder/AddInfoCoordinator', this.state.ShipmentOrder).then((apiResult) => {
                    this.setState({ IsCallAPIError: apiResult.IsError });
                    this.showMessage(apiResult.Message);
                    if (!apiResult.IsError) {
                    }
                });
        }
    }

    handleDeleteShip(e) {
        const value = e.currentTarget.dataset.id
        this.state.ShipmentOrder.splice(this.state.ShipmentOrder.findIndex(n => n.ShipmentOrderID == value), 1);
        this.setState({ ShipmentOrder: this.state.ShipmentOrder });
    }
    render() {

         const DataGridColumnItemList = [
            {
                Name: "ShipmentOrderID",
                Type: "text",
                Caption: "Mã vận đơn",
                DataSourceMember: "ShipmentOrderID",
                Width: 250
            },
            {
                Name: "CarrierPartnerID",
                Type: "text",
                Caption: "Mã sản phẩm",
                DataSourceMember: "CarrierPartnerID",
                Width: 250
            },
            {
                Name: "Action",
                Type: "editnew",
                Caption: "Tác vụ",
                DataSourceMember: "CarrierPartnerID",
                Width: 70,
                iputpop: false
            }
        ];

        let listOption = [];

        return (
            <div className="card">
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
                            ShipmentOrder={this.state.ShipmentOrder}
                            onChange={this.handleValueChange1}
                            value={this.state.selectedOption}
                            listoption={[]}
                            isMultiSelect={true}
                            datasourcemember="ShipmentOrder_DeliverUserList"
                        /> :
                        <FormControl.FormControlComboBox
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
                    <div className="form-row" style={{ minHeight: 200 }}>
                        <div className="table-responsive">
                            <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                <thead className="thead-light">
                                    <tr>
                                        <th className="jsgrid-header-cell" style={{ width: 50, minWidth: 70 }}>Mã vận đơn</th>
                                        <th className="jsgrid-header-cell" style={{ width: 250, minWidth: 250 }}>Đối tác</th>
                                        <th className="jsgrid-header-cell" style={{ width: 250, minWidth: 250 }}>Nhân viên điều phối</th>
                                        <th className="jsgrid-header-cell" style={{ width: 150, minWidth: 150 }}>Phương Tiện Vận Chuyển</th>
                                        <th className="jsgrid-header-cell" style={{ width: 50 }}>Tác vụ</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {this.state.ShipmentOrder != null &&
                                        this.state.ShipmentOrder.map((rowItem, rowIndex) => {
                                            let rowClass = "jsgrid-row";
                                            if (index % 2 != 0) {
                                                rowClass = "jsgrid-alt-row";
                                            }
                                            return (<tr key={rowIndex}>
                                                <td>{rowItem.ShipmentOrderID}</td>
                                                <td>  <FormControl.ComboBoxPartner
                                                    name="CarrierPartnerID"
                                                    colspan="11"
                                                    labelcolspan="1"
                                                    IsLabelDiv={false}
                                                    isautoloaditemfromcache={true}
                                                    loaditemcachekeyid="ERPCOMMONCACHE.PARTNER"
                                                    valuemember="PartnerID"
                                                    nameMember="PartnerName"
                                                    controltype="InputControl"
                                                    onChange={this.handleOnValueChange}
                                                    value={rowItem.CarrierPartnerID}
                                                    listoption={null}
                                                    datasourcemember="CarrierPartnerID"
                                                    placeholder="---Vui lòng chọn---"
                                                    isMultiSelect={false}
                                                    disabled={!this.props.IsCoordinator}
                                                /></td>
                                                <td> <MultiSelectComboBox
                                                    name="ShipmentOrder_DeliverUserList"
                                                    colspan="10"
                                                    labelcolspan="2"
                                                    disabled={!this.props.IsUserCoordinator}
                                                    IsLabelDiv={false}
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
                                                    datasourcemember="ShipmentOrder_DeliverUserList"
                                                    validatonList={["Comborequired"]}
                                                    validationErrorMessage={this.state.validationErroDeliverUser}
                                                /> </td>
                                                <td><FormControl.FormControlComboBox
                                                    name="CarrierTypeID"
                                                    colspan="11"
                                                    labelcolspan="1"
                                                    IsLabelDiv={false}
                                                    isautoloaditemfromcache={true}
                                                    loaditemcachekeyid="ERPCOMMONCACHE.CARRIERTYPE"
                                                    valuemember="CarrierTypeID"
                                                    nameMember="CarrierTypeName"
                                                    controltype="InputControl"
                                                    onValueChange={this.handleOnValueChange}
                                                    value={rowItem.CarrierTypeID}
                                                    listoption={null}
                                                    datasourcemember="CarrierTypeID"
                                                    placeholder="---Vui lòng chọn---"
                                                    isMultiSelect={false}
                                                    disabled={!this.props.IsCoordinator}
                                                    validationErrorMessage={""}
                                                /></td>
                                                <td> <a name="ShipmentOrderID" data-id={rowItem.ShipmentOrderID} onClick={this.handleDeleteShip.bind(this)} className="table-action hover-danger item-action" title="Xóa">
                                                    <i className="ti-trash"></i>
                                                </a> </td>
                                            </tr>
                                            );
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>

                    <InputGridChageControl
                        name="ShipmentOrder_ItemList"
                        controltype="InputGridControl"
                        title="Danh sách hàng hóa"
                        listColumn={DataGridColumnItemList}
                        dataSource={this.state.ShipmentOrder}
                    />
                    <div className="form-row">
                        <div className="form-group col-md-12 form-group-btncustom">
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
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        }
    }
}


const ListShipCoordinator = connect(mapStateToProps, mapDispatchToProps)(ListShipCoordinatorCom);
export default ListShipCoordinator;