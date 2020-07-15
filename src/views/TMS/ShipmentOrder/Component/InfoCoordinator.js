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
import {
    APIHostName,
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
            CancelDeliveryReasonID: null,
            CancelDeliveryReasonNote: "",
            selectedOption: []
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
            validationErrorCancelDeliveryReason = "Vui lòng chọn lý do hủy giào"
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
            }
        }

        this.setState({ ShipmentOrder: ShipmentOrder })
    }
    handleValueChange1(e, selectedOption) {
        let listMLObject = [];
        if (selectedOption) {
            for (let i = 0; i < selectedOption.length; i++) {
                listMLObject.push({
                    ShipmentOrderID: this.state.ShipmentOrder.ShipmentOrderID,
                    UserName: selectedOption[i].value,
                    FullName:selectedOption[i].FullName,
                    CreatedUser: this.props.AppInfo.LoginInfo.Username,
                    CreatedOrderTime: this.state.ShipmentOrder.CreatedOrderTime
                });
            }
        }

        let { ShipmentOrder } = this.state;
        ShipmentOrder.ShipmentOrder_DeliverUserList = listMLObject;
        if (ShipmentOrder.ShipmentOrder_DeliverUserList.length <= 0) {
            this.setState({ validationErroDeliverUser: "Vui lòng chọn nhân viên giao" });
        }
        else {
            this.setState({ validationErroDeliverUser: null });
        }
        this.setState({ ShipmentOrder: ShipmentOrder })
        //this.setState({ ShipmentOrder_WorkFlow: listMLObject })
    }
    handleOnValueChangeDeliverUser(name, value) {
        let listMLObject = [];
        if (value) {
            for (let i = 0; i < value.length; i++) {
                listMLObject.push({
                    ShipmentOrderID: this.state.ShipmentOrder.ShipmentOrderID,
                    UserName: value[i],
                    CreatedUser: this.props.AppInfo.LoginInfo.Username,
                    CreatedOrderTime: this.state.ShipmentOrder.CreatedOrderTime
                });
            }
        }

        let { ShipmentOrder } = this.state;
        ShipmentOrder.ShipmentOrder_DeliverUserList = listMLObject;
        if (ShipmentOrder.ShipmentOrder_DeliverUserList.length <= 0) {
            this.setState({ validationErroDeliverUser: "Vui lòng chọn nhân viên giao" });
        }
        else {
            this.setState({ validationErroDeliverUser: null });
        }
        this.setState({ ShipmentOrder: ShipmentOrder })
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
    render() {
        let listOption = [];
        let objDeliverUser = [];
        if (this.state.ShipmentOrder.CarrierPartnerID != -1 && this.state.ShipmentOrder.CarrierPartnerID != 0) {
            this.state.ShipmentOrder.ShipmentOrder_DeliverUserList && this.state.ShipmentOrder.ShipmentOrder_DeliverUserList.map((item, index) => {
                objDeliverUser.push(item.UserName)
            })
        }
        else {
            this.state.ShipmentOrder.ShipmentOrder_DeliverUserList && this.state.ShipmentOrder.ShipmentOrder_DeliverUserList.map((item, index) => {
                listOption.push({ value: item.UserName, label: item.UserName + "-" + item.FullName });
            })
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
                                disabled={!this.props.IsCoordinator}
                                validationErrorMessage={this.state.validationErroCarrierPartner}
                            />
                        </div>
                        <div className="col-md-6">
                            <FormControl.FormControlComboBox
                                name="CarrierTypeID"
                                colspan="8"
                                labelcolspan="4"
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
                                disabled={!this.props.IsCoordinator}
                                validationErrorMessage={this.state.validationErroCarrierType}
                            />
                        </div>
                    </div>

                    {(this.state.ShipmentOrder.CarrierPartnerID == -1 || this.state.ShipmentOrder.CarrierPartnerID == 0) ?
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
                            value={listOption}
                            ShipmentOrder={this.state.ShipmentOrder}
                            onChange={this.handleValueChange1}
                            listoption={[]}
                            isMultiSelect={true}
                            datasourcemember="ShipmentOrder_DeliverUserList"
                            validatonList={["Comborequired"]}
                            validationErrorMessage={this.state.validationErroDeliverUser}
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
                            value={objDeliverUser}
                            onValueChange={this.handleOnValueChangeDeliverUser}
                            listoption={null}
                            datasourcemember="PartnerID"
                            placeholder="---Vui lòng chọn---"
                            isMultiSelect={true}
                            filterValue={this.state.ShipmentOrder.CarrierPartnerID}
                            filterobj="PartnerID"
                            disabled={!this.props.IsCoordinator}
                            validationErrorMessage={this.state.validationErroDeliverUser}
                        />
                    }

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
                    <div className="form-row">

                        <div className="form-group col-md-12 form-group-btncustom">
                            {
                                this.props.IsCancelDelivery == true ? <button className="btn btnDelivery mr-10" type="submit" onClick={this.handleCancelDelivery}><span className="fa fa-remove"> Hủy giao hàng</span></button> : <button className="btn btnDelivery mr-10" disabled title="Bạn Không có quyền xử lý!" type="submit"  ><span className="fa fa-remove"> Hủy giao hàng</span></button>
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
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        }
    }
}


const InfoCoordinator = connect(mapStateToProps, mapDispatchToProps)(InfoCoordinatorCom);
export default InfoCoordinator;