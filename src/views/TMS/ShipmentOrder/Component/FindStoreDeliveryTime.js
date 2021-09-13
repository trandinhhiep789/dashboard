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
import { Link, Redirect, useHistory, withRouter } from "react-router-dom";
import {
    APIHostName,
    MLObjectExpectedDeliveryNew,
} from "../constants";
import FormContainer from "../../../../common/components/FormContainer";
import { Menu, Dropdown } from 'antd';

import { showModal, hideModal } from '../../../../actions/modal';
import { ERPCOMMONCACHE_TMS_SERVICETYPE, ERPCOMMONCACHE_SERVICEREQUESTTYPE, ERPCOMMONCACHE_PARTNER_CUSTOMER } from "../../../../constants/keyCache";
import { formatDate, formatDateCusNew } from "../../../../common/library/CommonLib";

class FindStoreDeliveryTimeCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            IsCallAPIError: false,
            IsCloseForm: false,
            ServiceRequestTypeID: '',
            MessageError: '',
            MessageErrorValueTime: '',
            DeliveryTimeAllGroup: [],
            ShipmentOrder: this.props.ShipmentOrder,
            ListSuggestTime: [],
            DeliveryTime: "",
            MLObject: this.props.MLObject,
            valueDate: '',
            valueTime: "",
            ListSuggestTimeChildren: []


        }
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        console.log("object", this.props)
        const { ShipmentOrder } = this.props

        const lstProduct = ShipmentOrder.ShipmentOrder_ItemList.map((item, index) => {
            return {

                PRODUCTID: item.ProductID,
                QUANTITY: item.Quantity,
                ISSETUPPRODUCT: item.IsInstallItem == true ? 1 : 0,
                MAINGROUPID: item.MainGroupID,
                SUBGROUPID: item.SubGroupID,
                ISONLINEONLY: 0,
                ISPARTNER: 0,
                ISNORMAL: 0,
                OUTPUTSTOREID: ShipmentOrder.SenderStoreID,
                COMBOID: 0,
                SALEORDERDETAILONLINEID: null,
                APPLYSALEODERDETAILID: null,
                SALEPRICE: 0.0,
                OUTPUTTYPEID: 8
            }
        })

        const dtFromdate = new Date();
        const toDate = new Date();
        toDate.setDate(new Date().getDate() + 2);
        const param = {
            "lstOutputStoreID": ShipmentOrder.SenderStoreID,
            "VehicleType": ShipmentOrder.CarrierTypeID,
            "iProvinceID": ShipmentOrder.ReceiverProvinceID,
            "iDistrictID": ShipmentOrder.ReceiverDistrictID,
            "iWardID": ShipmentOrder.ReceiverWardID,
            "dtDateFrom": formatDateCusNew(dtFromdate, true),
            "dtDateTo": formatDateCusNew(toDate, true),
            "decRange": "0",
            "iDayTranfer": "0",
            "isCheckProvince": "true",
            "intDeliveryTypeID": "281",
            "iCreateStoreID": "1",
            "lstProduct": lstProduct
        }

        this._FindStoreDeliveryTime(param)
    }

    _FindStoreDeliveryTime(param) {
        this.props.callFetchAPI(APIHostName, "api/ShipmentOrder/FindStoreDeliveryTime", param).then((apiResult) => {
            if (apiResult.IsError) {
                this.showMessage("Lỗi lấy thông tin tải giao hàng");
            }
            else {
                if (!!apiResult.ResultObject.Data.LSTSUGGESTTIME && apiResult.ResultObject.Data.LSTSUGGESTTIME != null && apiResult.ResultObject.Data.LSTSUGGESTTIME.length > 0) {
                    const tempData = apiResult.ResultObject.Data.LSTSUGGESTTIME;
                    let tempDataNew = [];
                    if (tempData.length > 0) {
                        tempData.map((item, index) => {

                            if (item.ISWARNING == false) {
                                item.value = item.DELIVERYVALUE;
                                item.label = item.DELIVERYTEXT;
                                item.name = item.DELIVERYVALUE;
                                tempDataNew.push(item)
                            }
                        })
                        const dataSource = tempDataNew.reduce((catsSoFar, item, index) => {
                            const tempArray = item.DELIVERYVALUE.split('T')
                            const deliveryValue = tempArray[0]
                            if (!catsSoFar[deliveryValue]) catsSoFar[deliveryValue] = [];
                            catsSoFar[deliveryValue].push(item);
                            return catsSoFar;
                        }, {});

                        const newDatasource = Object.keys(dataSource).map(function (key) {
                            let element = {}
                            element.parentKey = key
                            element.label = formatDate(key, true),
                                element.name = key,
                                element.value = key,
                                element.children = dataSource[key]
                            return element

                        })

                        this.setState({
                            DeliveryTimeAllGroup: newDatasource,

                        })
                    }
                    else {
                        this.showMessage("Danh sách tải không tồn tại");
                    }


                    // this.showFindStoreDeliveryTime(newDatasource, MLObject)
                }
                else {
                    this.showMessage("Lỗi lấy danh sách tải giao hàng");
                }
            }
        });
    }

    handleCloseMessage() {
        this.setState({ IsCloseForm: true });
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



    handleCloseModal() {
        this.props.hideModal();
    }

    handleSubmit(formData, MLObject) {
        console.log("submit", formData, MLObject)
        let objDLDateLog =
        {
            ShipmentOrderID: this.props.ShipmentOrder.ShipmentOrderID,
            PartnerSaleOrderID: this.props.ShipmentOrder.PartnerSaleOrderID,
            CreatedOrderTime: this.props.ShipmentOrder.CreatedOrderTime,
            DeliverydateUpdateTypeID: 2,
            DeliverydateUpdateReasonID: MLObject.DeliverydateUpdateReasonID,
            OldExpectedDeliveryDate: this.props.ShipmentOrder.ExpectedDeliveryDate,
            NewExpectedDeliveryDate: MLObject.DeliveryValue,
            DeliverydateUpdateReasonNote: MLObject.DeliverydateUpdateReasonNote,

        }
        this.props.callFetchAPI(APIHostName, 'api/ShipmentOrder_DLDateLog/Add', objDLDateLog).then((apiResult) => {
            this.addNotification(apiResult.Message, apiResult.IsError);
            if (!apiResult.IsError) {
                this.props.hideModal();
            }
        });

    }

    handleChangeForm(formData, MLObject) {
        // console.log("object", formData, MLObject)
        const { ListSuggestTimeChildren, DeliveryTimeAllGroup } = this.state;

        if (formData.cbDeliveryDate.value > 0 || formData.cbDeliveryDate.value != undefined) {
            const ListSuggestTimeChildren = DeliveryTimeAllGroup.find(e => { return e.value == formData.cbDeliveryDate.value })
            this.setState({
                ListSuggestTimeChildren: ListSuggestTimeChildren.children
            })
        }
    }


    addNotification(message1, IsError) {
        let cssNotification = "";
        let iconNotification = "";
        if (!IsError) {

            cssNotification = "notification-custom-success"
            iconNotification = "fa fa-check"

        } else {

            cssNotification = "notification-danger",
            iconNotification = "fa fa-exclamation"
        }
        this.notificationDOMRef.current.addNotification({
            container: "bottom-right",
            content: (
                <div className={cssNotification}>
                    <div className="notification-custom-icon">
                        <i className={iconNotification} />
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
        const { DeliveryTimeAllGroup, ListSuggestTime } = this.state;

        return (

            <FormContainer
                // FormName='Cập nhật thời gian giao dự kiến'
                MLObjectDefinition={MLObjectExpectedDeliveryNew}
                listelement={[]}
                // BackLink={BackLink}
                onSubmit={this.handleSubmit.bind(this)}
                onchange={this.handleChangeForm.bind(this)}
            >
                <div className="form-row">
                    <div className="col-md-6">

                        <FormControl.FormControlComboBox
                            name="cbDeliverydateUpdateReasonID"
                            label="Lý do thay đổi"
                            isautoloaditemfromcache={true}
                            loaditemcachekeyid="ERPCOMMONCACHE.DELIVERYDATEUPDATEREASON"
                            valuemember="DeliverydateUpdateReasonID"
                            nameMember="DeliverydateUpdateReasonName"
                            controltype="InputControl"
                            value={-1}
                            listoption={[]}
                            datasourcemember="DeliverydateUpdateReasonID"
                            labelcolspan={4}
                            colspan={8}
                            validatonList={["Comborequired"]}
                        />

                    </div>
                    <div className="col-md-6"></div>
                    <div className="col-md-6">
                        <FormControl.FormControlComboBox
                            name="cbDeliveryDate"
                            labelcolspan={4}
                            colspan={8}
                            label="Ngày hẹn"
                            validatonList={["Comborequired"]}
                            placeholder="-- Vui lòng chọn --"
                            isautoloaditemfromcache={false}
                            valuemember="DeliveryValue"
                            nameMember="DeliveryText"
                            controltype="InputControl"
                            value={this.state.valueDate}
                            listoption={this.state.DeliveryTimeAllGroup}
                            datasourcemember="DeliveryDate"
                            validationErrorMessage={this.state.MessageError}
                        />



                    </div>
                    <div className="col-md-6">

                        <FormControl.FormControlComboBox
                            name="cbDeliveryTime"
                            labelcolspan={4}
                            colspan={8}
                            label="Giờ hẹn"
                            validatonList={["Comborequired"]}
                            placeholder="-- Vui lòng chọn --"
                            isautoloaditemfromcache={false}
                            valuemember="DeliveryValue"
                            nameMember="DeliveryText"
                            controltype="InputControl"
                            value={this.state.valueTime}
                            listoption={this.state.ListSuggestTimeChildren}
                            datasourcemember="DeliveryValue"
                            validationErrorMessage={this.state.MessageErrorValueTime}
                        />


                    </div>

                    <div className="col-md-12">
                        <FormControl.TextArea
                            labelcolspan={2}
                            colspan={10}
                            name="txtDeliverydateUpdateReasonNote"
                            label="Ghi chú"
                            placeholder="Nội dung chỉ giới hạn 5500 ký tự"
                            datasourcemember="DeliverydateUpdateReasonNote"
                            controltype="InputControl"
                            rows={8}
                            value=""
                            classNameCustom="customcontrol"
                        />
                    </div>

                </div>

            </FormContainer>

        )
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


const FindStoreDeliveryTime = connect(mapStateToProps, mapDispatchToProps)(withRouter(FindStoreDeliveryTimeCom));
export default FindStoreDeliveryTime;