import React, { Component } from "react";
import { connect } from 'react-redux';
import { formatDate, formatDateNew } from "../../../../common/library/CommonLib.js";
import { ModalManager } from 'react-dynamic-modal';
import ModelContainer from "../../../../common/components/Modal/ModelContainer";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { GET_CACHE_USER_FUNCTION_LIST, SHIPMENTORDER_EXPECTEDDELIVERYDATE } from "../../../../constants/functionLists";
import { callGetCache, callGetUserCache } from "../../../../actions/cacheAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import FormControl from "../../../../common/components/FormContainer/FormControl";
import Collapsible from 'react-collapsible';
import { showModal, hideModal } from '../../../../actions/modal';
import { ExportStringDate } from "../../../../common/library/ultils";
import { MODAL_TYPE_CONFIRMATIONNEW, MODAL_TYPE_COMMONTMODALS } from '../../../../constants/actionTypes';
import ReactTooltip from 'react-tooltip';

import { toIsoStringCus } from '../../../../utils/function'

import { DatePicker, Menu, Dropdown, Button } from 'antd';
import {
    APIHostName,
    MLObjectExpectedDelivery,
    ExpectedDeliveryDateEdit
} from "../constants";
import { Link } from "react-router-dom";
class ShipmentOrderDetailCom extends Component {
    constructor(props) {
        super(props);
        this.handleShipWorkFlowInsert = this.handleShipWorkFlowInsert.bind(this);
        this.handleUpdateExpectedDelivery = this.handleUpdateExpectedDelivery.bind(this);

        this.state = {
            ShipmentOrder: this.props.ShipmentOrderDetail,
            validationErrorMessage: null,
            ShipmentOrder_WorkFlow: {},
            IsPermision: false,
            IsUpdateDate: false,
            IsDisable: true,
            IsExpectedDeliveryDate: false,
            dtExpectedDeliveryDate: this.props.ShipmentOrderDetail.ExpectedDeliveryDate,
            ShipmentOrder_DLDateLogItemList: [],
            HistoryTransactionItemList: []
        }
        this.notificationDOMRef = React.createRef();
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.ShipmentOrderDetail) !== JSON.stringify(nextProps.ShipmentOrderDetail)) {
            this.setState({
                ShipmentOrder: nextProps.ShipmentOrderDetail
            })
        }
    }

    componentDidMount() {
        this.props.callGetUserCache(GET_CACHE_USER_FUNCTION_LIST).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                const found = result.ResultObject.CacheData.find(x => x.FunctionID == SHIPMENTORDER_EXPECTEDDELIVERYDATE);
                if (found != undefined) {
                    this.setState({
                        IsExpectedDeliveryDate: true
                    });
                }
                else {
                    this.setState({
                        IsExpectedDeliveryDate: false
                    });
                }
            }
        });
    }

    checkPermission(permissionKey) {
        return new Promise((resolve, reject) => {
            if (permissionKey == "") {
                resolve(true);
                return
            }
            else {
                this.props.callGetUserCache(GET_CACHE_USER_FUNCTION_LIST).then((result) => {
                    if (!result.IsError && result.ResultObject.CacheData != null) {
                        for (let i = 0; i < result.ResultObject.CacheData.length; i++) {
                            if (result.ResultObject.CacheData[i].FunctionID == permissionKey) {
                                resolve(true);
                                return;
                            }
                        }
                        resolve(false)
                    } else {
                        resolve('error');
                    }
                });
            }
        });

    }

    onChangeInput(e) {
        e.preventDefault();
        let value = e.currentTarget.dataset.option;
        let lable = e.currentTarget.dataset.lable;
        let ChooseFunctionID = e.currentTarget.dataset.functionid;
        let { ShipmentOrder_WorkFlow, ShipmentOrder } = this.state;
        ShipmentOrder_WorkFlow.ShipmentOrderID = ShipmentOrder.ShipmentOrderID
        ShipmentOrder_WorkFlow.ShipmentOrderStepID = value
        ShipmentOrder_WorkFlow.Note = ""
        ShipmentOrder_WorkFlow.ShipmentOrderStepName = lable
        let IsMustCompleteCollection = false;
        if (ShipmentOrder.ShipmentOrderType_WorkFlowList.filter(a => a.ShipmentOrderStepID === ShipmentOrder.CurrentShipmentOrderStepID).length > 0) {
            IsMustCompleteCollection = ShipmentOrder.ShipmentOrderType_WorkFlowList.filter(a => a.ShipmentOrderStepID === ShipmentOrder.CurrentShipmentOrderStepID)[0].IsMustCompleteCollection
        }
        if (ChooseFunctionID != "") {
            if (IsMustCompleteCollection == false) {
                this.checkPermission(ChooseFunctionID).then(result => {
                    if (result == true) {
                        this.setState({ ShipmentOrder_WorkFlow: ShipmentOrder_WorkFlow, validationErrorMessage: null }, () => {
                            this.openViewStepModal();
                        });
                    }
                    else if (result == 'error') {
                        this.setState({ ShipmentOrder_WorkFlow: ShipmentOrder_WorkFlow, validationErrorMessage: null }, () => {
                            this.openViewStepModalFunction();
                        });

                    } else {
                        this.setState({ ShipmentOrder_WorkFlow: ShipmentOrder_WorkFlow, validationErrorMessage: null }, () => {
                            this.openViewStepModalFunction();
                        });

                    }
                })
            }
            else {
                if (ShipmentOrder.IsCollectedMoney == true) {
                    this.checkPermission(ChooseFunctionID).then(result => {
                        if (result == true) {
                            this.setState({ ShipmentOrder_WorkFlow: ShipmentOrder_WorkFlow, validationErrorMessage: null }, () => {
                                this.openViewStepModal();
                            });
                        }
                        else if (result == 'error') {
                            this.setState({ ShipmentOrder_WorkFlow: ShipmentOrder_WorkFlow, validationErrorMessage: null }, () => {
                                this.openViewStepModalFunction();
                            });

                        } else {
                            this.setState({ ShipmentOrder_WorkFlow: ShipmentOrder_WorkFlow, validationErrorMessage: null }, () => {
                                this.openViewStepModalFunction();
                            });

                        }
                    })
                }
                else {
                    this.setState({ ShipmentOrder_WorkFlow: ShipmentOrder_WorkFlow, validationErrorMessage: null }, () => {
                        this.openViewIsCollectedMoney();
                    });
                }

            }
        }
        else {
            if (IsMustCompleteCollection == true && ShipmentOrder.IsCollectedMoney == true) {
                this.setState({ ShipmentOrder_WorkFlow: ShipmentOrder_WorkFlow, validationErrorMessage: null }, () => {
                    this.openViewIsCollectedMoney();
                });
            }
            else {
                this.setState({ ShipmentOrder_WorkFlow: ShipmentOrder_WorkFlow, validationErrorMessage: null }, () => {
                    this.openViewStepModal();
                });
            }
        }
    }

    onChangetextarea(e) {
        let value = e.target.value;
        let { ShipmentOrder_WorkFlow, validationErrorMessage } = this.state;
        // if (value == undefined || value.length == 0 || String(value).trim() == "") {
        //     validationErrorMessage = "Vui lòng nhập nội dung"
        // }
        // else {
        //     validationErrorMessage = null
        // }

        ShipmentOrder_WorkFlow.Note = value
        this.setState({ ShipmentOrder_WorkFlow: ShipmentOrder_WorkFlow, validationErrorMessage: validationErrorMessage }, () => {
            this.openViewStepModal();
        });
    }

    openViewStepModalFunction() {

        ModalManager.open(
            <ModelContainer
                title="Chuyển bước xử lý"
                name=""
                IsButton={true}
                content={"Cập nhật loại đơn vị thành công!"} onRequestClose={() => true}
            >
                <div className="form-row">
                    <span className="lblstatus lbl-permission">Bạn không có quyền xử lý chuyển bước kế tiếp.</span>
                </div>
            </ModelContainer>
        );
    }

    openViewIsCollectedMoney() {

        ModalManager.open(
            <ModelContainer
                title="Chuyển bước xử lý"
                name=""
                IsButton={true}
                content={"Cập nhật loại đơn vị thành công!"} onRequestClose={() => true}
            >
                <div className="form-row">
                    <span className="lblstatus lbl-permission">Vui lòng hoàn tất thu tiền đơn hàng này để tiếp tục.</span>
                </div>
            </ModelContainer>
        );
    }

    openViewStepModal() {
        let formGroupclassName = "form-group col-md-10";
        let selectclassName = "form-control form-control-sm";
        if (this.state.validationErrorMessage != null) {
            if (this.state.validationErrorMessage.length > 0) {
                formGroupclassName += " has-error has-danger";
                selectclassName += " is-invalid";
            }
        }
        ModalManager.open(
            <ModelContainer
                title="Chuyển bước xử lý"
                name=""
                content={"Cập nhật loại đơn vị thành công!"} onRequestClose={() => true}
                onChangeModal={this.handleShipWorkFlowInsert}  >
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Chuyển bước kế tiếp</label>
                    </div>
                    <div className="form-group col-md-10">
                        <label className="col-form-label">{this.state.ShipmentOrder_WorkFlow.ShipmentOrderStepName}</label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Nội dung </label>
                    </div>
                    <div className={formGroupclassName}>
                        <textarea className={selectclassName} maxLength={1950} rows="10" cols="50" name="Title" value={this.state.ShipmentOrder_WorkFlow.Note} placeholder="Nội dung" onChange={this.onChangetextarea.bind(this)} />
                        <div className="invalid-feedback"><ul className="list-unstyled"><li>{this.state.validationErrorMessage}</li></ul></div>
                    </div>
                </div>

            </ModelContainer>
        );
    }
    handleShipWorkFlowInsert() {
        let { ShipmentOrder_WorkFlow, validationErrorMessage } = this.state;

        // if (ShipmentOrder_WorkFlow.Note == undefined || ShipmentOrder_WorkFlow.Note.length == 0 || String(ShipmentOrder_WorkFlow.Note).trim() == "") {
        //     validationErrorMessage = "Vui lòng nhập nội dung"
        //     this.setState({ validationErrorMessage: validationErrorMessage }, () => {
        //         this.openViewStepModal();
        //     });
        // }
        // else {
        ShipmentOrder_WorkFlow.IsProcess = true;
        ShipmentOrder_WorkFlow.ProcessUser = this.props.AppInfo.LoginInfo.Username;
        ShipmentOrder_WorkFlow.CreatedOrderTime = this.state.ShipmentOrder.CreatedOrderTime;
        ShipmentOrder_WorkFlow.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        let objWorkFlowProcessingRequest = {
            ShipmentOrderID: ShipmentOrder_WorkFlow.ShipmentOrderID,
            ShipmentOrderStepID: ShipmentOrder_WorkFlow.ShipmentOrderStepID,
            CurrentShipmentOrderStepID: this.state.ShipmentOrder.CurrentShipmentOrderStepID,
            ProcessUser: ShipmentOrder_WorkFlow.ProcessUser,
            ProcessGeoLocation: "",
            Note: ShipmentOrder_WorkFlow.Note
        }
        this.props.callFetchAPI(APIHostName, 'api/ShipmentOrder/ProcessWorkFlowWeb', objWorkFlowProcessingRequest).then((apiResult) => {
            this.addNotification(apiResult.Message, apiResult.IsError);
            if (!apiResult.IsError) {
                this.setState({
                    ShipmentOrder: apiResult.ResultObject
                });
                if (this.props.onhandleChange != null)
                    this.props.onhandleChange(apiResult.ResultObject)
                ModalManager.close();
            }
        });
        //}
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

    onValueChangeControlDatetime(name, mod) {
        this.setState({
            dtExpectedDeliveryDate: mod
        })
    }

    handleUpdateExpectedDelivery() {
        const dtFromdate = new Date()
        this.props.showModal(MODAL_TYPE_CONFIRMATIONNEW, {
            title: 'Cập nhật thời gian giao dự kiến 1111',
            onConfirmNew: (isConfirmed, formData) => {
                let objDLDateLog =
                {
                    ShipmentOrderID: this.state.ShipmentOrder.ShipmentOrderID,
                    PartnerSaleOrderID: this.state.ShipmentOrder.PartnerSaleOrderID,
                    CreatedOrderTime: this.state.ShipmentOrder.CreatedOrderTime,
                    DeliverydateUpdateTypeID: 2,
                    DeliverydateUpdateReasonID: formData.DeliverydateUpdateReasonID,
                    OldExpectedDeliveryDate: this.props.ShipmentOrderDetail.ExpectedDeliveryDate,
                    NewExpectedDeliveryDate: toIsoStringCus(new Date(formData.NewExpectedDeliveryDate).toISOString()),//formData.NewExpectedDeliveryDate,
                    DeliverydateUpdateReasonNote: formData.DeliverydateUpdateReasonNote,

                    // NewExpectedDeliveryDateNew: toIsoStringCus(new Date(formData.NewExpectedDeliveryDate).toISOString()),
                }
                // console.log("param", objDLDateLog)
                this.props.callFetchAPI(APIHostName, 'api/ShipmentOrder_DLDateLog/Add', objDLDateLog).then((apiResult) => {
                    this.addNotification(apiResult.Message, apiResult.IsError);
                    if (!apiResult.IsError) {
                        this.props.hideModal();
                        this.setState({
                            dtExpectedDeliveryDate: formData.NewExpectedDeliveryDate
                        })
                    }
                });

            },
            modalElementList: ExpectedDeliveryDateEdit,
            modalElementOl: MLObjectExpectedDelivery,
            dataSource: { OldExpectedDeliveryDate: this.state.dtExpectedDeliveryDate, NewExpectedDeliveryDate: dtFromdate },
            isaddComboBox: true

        });
    }


    _CheckTime(dates, id) {
        if (id = 1002) {
            const date = new Date(Date.parse(dates));
            let currentDate = new Date();
            var timeDiff = Math.abs(currentDate.getTime() - date.getTime());
            var diffMinutes = parseInt((timeDiff / (3600 * 24)));
            if (diffMinutes < 43200) {
                return true;
            }
            else {
                return false
            }
        }
        else {
            const date = new Date(Date.parse(dates));
            let currentDate = new Date();
            var timeDiff = Math.abs(currentDate.getTime() - date.getTime());
            var diffMinutes = parseInt((timeDiff / (3600 * 24)));
            if (diffMinutes < 1440) {
                return true;
            }
            else {
                return false
            }
        }
    }

    handleShowDataExpectedDelivery() {
        const postData = [
            {
                SearchKey: "@SHIPMENTORDERID",
                SearchValue: this.state.ShipmentOrder.ShipmentOrderID.Trim()
            }
        ];

        this.props.callFetchAPI(APIHostName, 'api/ShipmentOrder_DLDateLog/LoadByShipmentOrderID', postData).then((apiResult) => {
            if (!apiResult.IsError) {
                this.setState({ ShipmentOrder_DLDateLogItemList: apiResult.ResultObject }, () => {
                    this.showModalExpectedDeliveryLog();
                });
            }
        });
    }

    showModalExpectedDeliveryLog() {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Lịch sử  thay đổi thời gian giao',
            content: {
                text:
                    <div className="col-lg-12">
                        <div className="table-responsive mt-3">
                            <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                <thead className="thead-light">
                                    <tr>
                                        <th className="jsgrid-header-cell">Nguồn thay đổi </th>
                                        <th className="jsgrid-header-cell">Người đổi</th>
                                        <th className="jsgrid-header-cell">Ngày đổi</th>
                                        <th className="jsgrid-header-cell">Thời gian chuyển đổi</th>
                                        <th className="jsgrid-header-cell">Lý do thay đổi</th>
                                        <th className="jsgrid-header-cell">Nội dung </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.ShipmentOrder_DLDateLogItemList && this.state.ShipmentOrder_DLDateLogItemList.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{item.DeliverydateUpdateTypeName}</td>
                                                    <td>{item.CreatedUser + "-" + item.CreatedUserFullName}</td>
                                                    <td>{formatDate(item.CreatedDate)}</td>
                                                    <td>{formatDate(item.OldExpectedDeliveryDate) + " => " + formatDate(item.NewExpectedDeliveryDate)}</td>
                                                    <td>{item.DeliverydateUpdateReasonName}</td>
                                                    <td>{item.DeliverydateUpdateReasonNote}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
            },
            maxWidth: '1000px'
        });
    }



    handleShowHistoryTransaction() {
        this.props.callFetchAPI(APIHostName, 'api/PartnerTransaction/GetListByShipmentOrderID', this.state.ShipmentOrder.ShipmentOrderID.Trim()).then((apiResult) => {
            if (!apiResult.IsError) {
                this.setState({ HistoryTransactionItemList: apiResult.ResultObject }, () => {
                    this.showModalHistoryTransactionLog();
                });
            }
        });
    }
    showModalHistoryTransactionLog() {


        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Lịch sử thay đổi vận đơn',
            content: {
                text:
                    <div className="col-lg-12">
                        <div className="table-responsive mt-3">
                            <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                <thead className="thead-light">
                                    <tr>
                                        <th className="jsgrid-header-cell">Loại giao dịch với đối tác</th>
                                        <th className="jsgrid-header-cell">Thời gian thay đổi</th>
                                        <th className="jsgrid-header-cell">Tác vụ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.HistoryTransactionItemList && this.state.HistoryTransactionItemList.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{item.PartnerTransactionTypeID + "-" + item.PartnerTransactionTypeName}</td>
                                                    <td>{formatDate(item.CreatedDate)}</td>
                                                    <td>
                                                        <Link to={"/PartnerTransaction/Edit/" + item.PartnerTransactionID} target="_blank">
                                                            {item.PartnerTransactionID}
                                                        </Link>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
            },
            maxWidth: '1000px'
        });
    }



    render() {
        let strShipmentOrderStepName = "";
        let IsMustCompleteCollection = false;
        if (this.state.ShipmentOrder.ShipmentOrderType_WorkFlowList.filter(a => a.ShipmentOrderStepID === this.state.ShipmentOrder.CurrentShipmentOrderStepID).length > 0) {
            strShipmentOrderStepName = this.state.ShipmentOrder.ShipmentOrderType_WorkFlowList.filter(a => a.ShipmentOrderStepID === this.state.ShipmentOrder.CurrentShipmentOrderStepID)[0].ShipmentOrderStepName
            IsMustCompleteCollection = this.state.ShipmentOrder.ShipmentOrderType_WorkFlowList.filter(a => a.ShipmentOrderStepID === this.state.ShipmentOrder.CurrentShipmentOrderStepID)[0].IsMustCompleteCollection
        }
        const { ShipmentOrder, IsUpdateDate, IsDisable, IsExpectedDeliveryDate } = this.state;
        let onclin = this._CheckTime(this.state.ShipmentOrder.CreatedOrderTime, this.state.ShipmentOrder.ShipmentOrderTypeID)

        const linkHistoryTransaction = "/PartnerTransaction/Edit/" + ShipmentOrder.PartnerTransactionID;


        const dropdownItem = () => {
            return <Menu>

                {this.state.ShipmentOrder.ShipmentOrderType_WF_NextList.map((optionItem) => <Menu.Item key={optionItem.NextShipmentOrderStep}>
                    <a className={optionItem.NextShipmentOrderStep === this.state.ShipmentOrder.CurrentShipmentOrderStepID ? "dropdown-item active" : "dropdown-item"}
                        key={optionItem.NextShipmentOrderStep}
                        name={optionItem.NextShipmentOrderStep}
                        data-option={optionItem.NextShipmentOrderStep}
                        data-functionid={optionItem.ChooseFunctionID}
                        data-lable={optionItem.NextShipmentOrderStepName}
                        onClick={this.onChangeInput.bind(this)}
                    >
                        {optionItem.NextShipmentOrderStepName}
                    </a>
                </Menu.Item>)}
            </Menu>
        }

        let triggerDropdown = this.state.ShipmentOrder.ShipmentOrderType_WF_NextList != undefined && this.state.ShipmentOrder.ShipmentOrderType_WF_NextList.length > 0 ? "click" : "contextMenu";

        return (
            <div className="ShipmentOrderDetail">
                <ReactNotification ref={this.notificationDOMRef} />
                <Collapsible trigger=
                    {<div className="collapsibleCustom">
                        <div className="card-title">
                            <h4 className="title">
                                <strong>Thông tin yêu cầu vận chuyển</strong>
                            </h4>
                            {/* <div className="form-group form-group-dropdown form-group-dropdown-custom">
                                <div className="input-group input-group-dropdown-custom">
                                    <div className="input-group-append">

                                        <button className="btn dropdown-toggle" type="button" data-toggle="dropdown">{strShipmentOrderStepName}</button>
                                        <div className="dropdown dropdown-menu">
                                            {this.state.ShipmentOrder.ShipmentOrderType_WF_NextList && this.state.ShipmentOrder.ShipmentOrderType_WF_NextList.map(item =>
                                                <a className={item.NextShipmentOrderStep === this.state.ShipmentOrder.CurrentShipmentOrderStepID ? "dropdown-item active" : "dropdown-item"}
                                                    key={item.NextShipmentOrderStep} name={item.NextShipmentOrderStep} data-option={item.NextShipmentOrderStep}
                                                    data-functionid={item.ChooseFunctionID}
                                                    data-lable={item.NextShipmentOrderStepName} onClick={this.onChangeInput.bind(this)}>
                                                    {item.NextShipmentOrderStepName}</a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div> */}

                            <div className="form-group form-group-dropdown form-group-dropdown-custom">
                                <div className="input-group input-group-dropdown-custom">
                                    <Dropdown overlay={dropdownItem} trigger={[triggerDropdown]}>
                                        <div className="btn dropdown-toggle">
                                            {strShipmentOrderStepName}
                                        </div>
                                    </Dropdown>
                                </div>
                            </div>

                        </div>
                    </div>}

                    easing="ease-in" open={false}>
                    <div className="card cardCollapsible">
                        <div className="card-body">
                            <div className="form-row">
                                <div className="form-group col-md-2">
                                    <label className="col-form-label bold">Mã yêu cầu vận chuyển:</label>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="col-form-label" >{this.state.ShipmentOrder.ShipmentOrderID}</label>
                                </div><div className="form-group col-md-2">
                                    <label className="col-form-label bold">Loại yêu cầu vận chuyển:</label>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="col-form-label" >{this.state.ShipmentOrder.ShipmentOrderTypeID + " - " + this.state.ShipmentOrder.ShipmentOrderTypeName}</label>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-2">
                                    <label className="col-form-label bold">Đối tác yêu cầu:</label>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="col-form-label" >{this.state.ShipmentOrder.PartnerName}</label>
                                </div>
                                <div className="form-group col-md-2">
                                    <label className="col-form-label bold">Kho gửi:</label>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="col-form-label" >{this.state.ShipmentOrder.SenderStoreID + " - " + this.state.ShipmentOrder.SenderStoreName}</label>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-2">
                                    <label className="col-form-label bold">Loại dịch vụ:</label>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="col-form-label" >{this.state.ShipmentOrder.ShipmentServiceTypeID + " - " + this.state.ShipmentOrder.ShipmentServiceTypeName}</label>
                                </div>
                                <div className="form-group col-md-2">
                                    <label className="col-form-label bold">Trạng thái:</label>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="col-form-label" >{this.state.ShipmentOrder.ShipmentOrderStatusName}</label>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-2">
                                    <label className="col-form-label bold">Ngày tạo yêu cầu:</label>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="col-form-label" >{formatDate(this.state.ShipmentOrder.CreatedOrderTime)}</label>
                                </div>
                                <div className="form-group col-md-2">
                                    <label className="col-form-label bold">Thời gian giao dự kiến:</label>
                                </div>
                                <div className="form-group col-md-3 dateTimeCus">
                                    <label className="col-form-label" >{formatDate(this.state.dtExpectedDeliveryDate)}</label>
                                </div>
                                <div className="form-group col-md-1">
                                    {(onclin == true || IsExpectedDeliveryDate == true) ?
                                        <div className="group-btn-update">
                                            <button className="btn btn-update-submit" type="button" onClick={() => this.handleUpdateExpectedDelivery()}>
                                                <i className="ti ti-pencil-alt"></i>
                                            </button>
                                            <button className="btn btn-round btn-secondary" type="button" onClick={() => this.handleShowDataExpectedDelivery()}>
                                                <i className="fa fa-eye"></i>
                                            </button>
                                        </div>
                                        :
                                        <div className="group-btn-update">
                                            <button data-tip data-for={"ExpectedDeliveryD"} className="btn btn-update-submit" data-id={"ExpectedDeliveryD"} ><i className="ti ti-pencil-alt"></i></button>
                                            <ReactTooltip id={"ExpectedDeliveryD"} type='error'>
                                                <span>{"Nhân viên điều phối không có quyền đổi thời gian sau 24h tạo vận đơn. Xin liên hệ cấp quản lý."}</span>
                                            </ReactTooltip>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-2">
                                    <label className="col-form-label bold">Lấy hàng trong khoảng:</label>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="col-form-label" >{formatDate(this.state.ShipmentOrder.EarliestPickUpTime)}  - {formatDate(this.state.ShipmentOrder.LatestPickUpTime)}</label>
                                </div>
                                <div className="form-group col-md-2">
                                    <label className="col-form-label bold">Giao trong khoảng:</label>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="col-form-label">{formatDate(this.state.ShipmentOrder.EarliestDeliveryTime)}  - {formatDate(this.state.ShipmentOrder.LatestDeliveryTime)}</label>
                                </div>
                            </div>
                            {
                                this.state.ShipmentOrder.IsCancelDelivery == true ?
                                    <div className="form-row">
                                        <div className="form-group col-md-2">
                                            <span className="badge badge-danger">Hủy giao hàng</span>
                                        </div>
                                        <div className="form-group col-md-2">
                                            <label className="col-form-label" >Người hủy: {this.state.ShipmentOrder.CancelDeliveryUser}</label>
                                        </div>
                                        <div className="form-group col-md-2">
                                            <label className="col-form-label" >Lúc: {formatDate(this.state.ShipmentOrder.CancelDeliveryTime)}</label>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label className="col-form-label" >Ghi chú lý do hủy: {this.state.ShipmentOrder.CancelDeliveryReasonNote}</label>
                                        </div>
                                    </div>
                                    : ""
                            }
                            <div className="form-row">
                                <div className="form-group col-md-2">
                                    <label className="col-form-label bold">Lịch sử giao dịch:</label>
                                </div>
                                <div className="form-group col-md-4">
                                    {/* <Link to={linkHistoryTransaction} target="_blank" className="btn-link">
                                        <i className="fa fa-history"></i>
                                    </Link> */}

                                    <button className="btn btn-round btn-secondary" type="button" onClick={() => this.handleShowHistoryTransaction()}>
                                        <i className="fa fa-history"></i>
                                    </button>
                                </div>
                                <div className="form-group col-md-2">
                                    <label className="col-form-label bold">Mã đơn hàng của đối tác:</label>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="col-form-label">{this.state.ShipmentOrder.PartnerSaleOrderID}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </Collapsible>
            </div >
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
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        callGetUserCache: (cacheKeyID) => {
            return dispatch(callGetUserCache(cacheKeyID));
        },
        hideModal: () => {
            dispatch(hideModal());
        }
    }
}


const ShipmentOrderDetail = connect(mapStateToProps, mapDispatchToProps)(ShipmentOrderDetailCom);
export default ShipmentOrderDetail;