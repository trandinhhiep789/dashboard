import React, { Component } from "react";
import { connect } from 'react-redux';
import { formatDate, formatDateNew } from "../../../../common/library/CommonLib.js";
import { ModalManager } from 'react-dynamic-modal';
import ModelContainer from "../../../../common/components/Modal/ModelContainer";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { GET_CACHE_USER_FUNCTION_LIST } from "../../../../constants/functionLists";
import { callGetCache, callGetUserCache } from "../../../../actions/cacheAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import FormControl from "../../../../common/components/FormContainer/FormControl";
import Collapsible from 'react-collapsible';
import {
    APIHostName,
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
            dtExpectedDeliveryDate: this.props.ShipmentOrderDetail.ExpectedDeliveryDate
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
        this.props.callFetchAPI(APIHostName, 'api/ShipmentOrder/ProcessWorkFlow', objWorkFlowProcessingRequest).then((apiResult) => {
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


    onValueChangeControlDatetime(name, mod) {
        this.setState({
            dtExpectedDeliveryDate: mod
        })
    }
    handleUpdateExpectedDelivery(id) {

        if (id == 1) {
            this.setState({
                IsUpdateDate: true,
                IsDisable: false
            })
        }
        if (id == 2) {
            this.setState({
                IsUpdateDate: false,
                IsDisable: true
            })
        }
        if (id == 3) {
            let objShipmentOrder = { ShipmentOrderID: this.state.ShipmentOrder.ShipmentOrderID, ExpectedDeliveryDate: this.state.dtExpectedDeliveryDate };
            this.props.callFetchAPI(APIHostName, 'api/ShipmentOrder/UpdateExpectedDeliveryDate', objShipmentOrder).then((apiResult) => {
                this.addNotification(apiResult.Message, apiResult.IsError);
                if (!apiResult.IsError) {
                    this.setState({
                        IsUpdateDate: false,
                        IsDisable: true
                    })
                    ModalManager.close();
                }
            });
        }
    }


    render() {
        let strShipmentOrderStepName = "";
        let IsMustCompleteCollection = false;
        if (this.state.ShipmentOrder.ShipmentOrderType_WorkFlowList.filter(a => a.ShipmentOrderStepID === this.state.ShipmentOrder.CurrentShipmentOrderStepID).length > 0) {
            strShipmentOrderStepName = this.state.ShipmentOrder.ShipmentOrderType_WorkFlowList.filter(a => a.ShipmentOrderStepID === this.state.ShipmentOrder.CurrentShipmentOrderStepID)[0].ShipmentOrderStepName
            IsMustCompleteCollection = this.state.ShipmentOrder.ShipmentOrderType_WorkFlowList.filter(a => a.ShipmentOrderStepID === this.state.ShipmentOrder.CurrentShipmentOrderStepID)[0].IsMustCompleteCollection
        }
        const { ShipmentOrder, IsUpdateDate, IsDisable } = this.state;
        const linkHistoryTransaction = "/PartnerTransaction/Edit/" + ShipmentOrder.PartnerTransactionID;
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <Collapsible trigger=
                    {<div className="collapsibleCustom">
                        <div className="card-title">
                            <h4 className="title">
                                <strong>Thông tin yêu cầu vận chuyển</strong>
                            </h4>
                            <div className="form-group form-group-dropdown form-group-dropdown-custom">
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
                            </div>
                        </div>
                    </div>}
                    easing="ease-in" open={true}>
                    <div className="card cardCollapsible">
                        {/* <div>
                    <div className="card-title">
                        <h4 className="title">
                            <strong>Thông tin yêu cầu vận chuyển</strong>
                        </h4>
                        <div className="form-group form-group-dropdown form-group-dropdown-custom">
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
                        </div>
                    </div>
                </div> */}
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
                                    <label className="col-form-label" >{this.state.ShipmentOrder.ShipmentOrderTypeName}</label>
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
                                    <label className="col-form-label" >{this.state.ShipmentOrder.SenderStoreName}</label>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-2">
                                    <label className="col-form-label bold">Loại dịch vụ:</label>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="col-form-label" >{this.state.ShipmentOrder.ShipmentServiceTypeName}</label>
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
                                <div className="form-group col-md-5 dateTimeCus">
                                    <FormControl.FormControlDatetime
                                        name="dtCreatedOrderTime"
                                        colspan="7"
                                        labelcolspan="5"
                                        disabled={IsDisable}
                                        timeFormat={false}
                                        ISdisabledDate={true}
                                        dateFormat="DD-MM-YYYY HH:mm"//"YYYY-MM-DD HH:mm"
                                        IsGetTime={true}
                                        label="Thời gian giao dự kiến:"
                                        placeholder="Thời gian giao dự kiến"
                                        controltype="InputControl"
                                        onValueChange={this.onValueChangeControlDatetime.bind(this)}
                                        value={this.state.dtExpectedDeliveryDate}
                                        validatonList={["required"]}
                                        datasourcemember="CreatedOrderTime"
                                        className="frmDateTime"
                                    />

                                </div>
                                <div className="form-group col-md-1">
                                    <div className="group-btn-update">
                                        {
                                            IsUpdateDate == false ?
                                                <button className="btn btn-update-submit" type="button" onClick={() => this.handleUpdateExpectedDelivery(1)}>
                                                    <i className="ti ti-pencil-alt"></i>
                                                </button>
                                                :
                                                <React.Fragment>
                                                    <button className="btn btn-update-submit" type="button" onClick={() => this.handleUpdateExpectedDelivery(3)}>
                                                        <i className="ti-check"></i>
                                                    </button>
                                                    <button className="btn btn-update-cancel" type="button" onClick={() => this.handleUpdateExpectedDelivery(2)}>
                                                        <i className="ti-close"></i>
                                                    </button>
                                                </React.Fragment>
                                        }

                                    </div>
                                </div>
                                {/* <div className="form-group col-md-2">
                            <label className="col-form-label bold">Thời gian giao dự kiến:</label>
                        </div>
                        <div className="form-group col-md-4">
                             <label className="col-form-label">{formatDate(this.state.ShipmentOrder.ExpectedDeliveryDate)}</label> 
                            
                        </div> */}
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
                                            <label className="col-form-label" >Lúc: {formatDate(this.state.ShipmentOrder.CancelDeliveryTime)}</label>
                                        </div>
                                        <div className="form-group col-md-8">
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
                                    <Link to={linkHistoryTransaction} target="_blank" className="btn-link">
                                        <i className="fa fa-history"></i>
                                    </Link>
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
        }
    }
}


const ShipmentOrderDetail = connect(mapStateToProps, mapDispatchToProps)(ShipmentOrderDetailCom);
export default ShipmentOrderDetail;