import React, { Component } from "react";
import { connect } from 'react-redux';
import { formatDate } from "../../../../common/library/CommonLib.js";
import { ModalManager } from 'react-dynamic-modal';
import ModelContainer from "../../../../common/components/Modal/ModelContainer";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import {
    APIHostName,
} from "../constants";
class ShipmentOrderDetailCom extends Component {
    constructor(props) {
        super(props);
        this.handleShipWorkFlowInsert = this.handleShipWorkFlowInsert.bind(this);
        this.state = {
            ShipmentOrder: this.props.ShipmentOrderDetail,
            validationErrorMessage: null,
            ShipmentOrder_WorkFlow: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.ShipmentOrderDetail) !== JSON.stringify(nextProps.ShipmentOrderDetail)) {
            this.setState({
                ShipmentOrder: nextProps.ShipmentOrderDetail
            })
        }
    }

    onChangeInput(e) {
        e.preventDefault();
        let value = e.currentTarget.dataset.option;
        let lable = e.currentTarget.dataset.lable;
        let { ShipmentOrder_WorkFlow } = this.state;
        ShipmentOrder_WorkFlow.ShipmentOrderID = this.state.ShipmentOrder.ShipmentOrderID
        ShipmentOrder_WorkFlow.ShipmentOrderStepID = value
        ShipmentOrder_WorkFlow.Note = ""
        ShipmentOrder_WorkFlow.ShipmentOrderStepName=lable
        this.setState({ ShipmentOrder_WorkFlow: ShipmentOrder_WorkFlow, validationErrorMessage: null }, () => {
            this.openViewStepModal();
        });
    }

    onChangetextarea(e) {
        let value = e.target.value;
        let { ShipmentOrder_WorkFlow, validationErrorMessage } = this.state;
        if (value == undefined || value.length == 0 || String(value).trim() == "") {
            validationErrorMessage = "Vui lòng nhập nội dung"
        }
        else {
            validationErrorMessage = null
        }

        ShipmentOrder_WorkFlow.Note = value
        this.setState({ ShipmentOrder_WorkFlow: ShipmentOrder_WorkFlow, validationErrorMessage: validationErrorMessage }, () => {
            this.openViewStepModal();
        });
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
                        <label class="col-form-label">{this.state.ShipmentOrder_WorkFlow.ShipmentOrderStepName}</label>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Nội dung <span className="text-danger"> *</span></label>
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

        if (ShipmentOrder_WorkFlow.Note == undefined || ShipmentOrder_WorkFlow.Note.length == 0 || String(ShipmentOrder_WorkFlow.Note).trim() == "") {
            validationErrorMessage = "Vui lòng nhập nội dung"
            this.setState({ validationErrorMessage: validationErrorMessage }, () => {
                this.openViewStepModal();
            });
        }
        else {
            ShipmentOrder_WorkFlow.IsProcess = true;
            ShipmentOrder_WorkFlow.ProcessUser = this.props.AppInfo.LoginInfo.Username;
            ShipmentOrder_WorkFlow.CreatedOrderTime = this.state.ShipmentOrder.CreatedOrderTime;
            ShipmentOrder_WorkFlow.CreatedUser = this.props.AppInfo.LoginInfo.Username;
            this.props.callFetchAPI(APIHostName, 'api/ShipmentOrder/InsertWorkFlow', ShipmentOrder_WorkFlow).then((apiResult) => {
                if (!apiResult.IsError) {
                    this.setState({
                        ShipmentOrder: apiResult.ResultObject
                    });
                    if (this.props.onhandleChange != null)
                        this.props.onhandleChange(apiResult.ResultObject)
                    ModalManager.close();
                }
            });
        }
    }

    render() {
        return (
            <div className="card">
                <h4 className="card-title"><strong>Thông tin yêu cầu vận chuyển</strong></h4>
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
                            <label className="col-form-label bold">Phương tiện vận chuyển:</label>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="col-form-label">{this.state.ShipmentOrder.CarrierTypeName}</label>
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
                        <div className="form-group col-md-4">
                            <label className="col-form-label">{formatDate(this.state.ShipmentOrder.ExpectedDeliveryDate)}</label>
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
                    <div className="form-row">
                        <div className="form-group col-md-2">
                            <label className="col-form-label bold">Trạng thái:</label>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="col-form-label" >{this.state.ShipmentOrder.ShipmentOrderStatusName}</label>
                        </div>
                        <div className="form-group col-md-2">
                            <label className="col-form-label bold">Xử lý qui trình:</label>
                        </div>
                        <div className="form-group form-group-dropdown col-md-4 ">
                            <div className="input-group input-group-dropdown-custom">
                                <div className="input-group-append">
                                    <button className="btn dropdown-toggle" type="button" data-toggle="dropdown">{this.state.ShipmentOrder.ShipmentOrderType_WorkFlowList.filter(a => a.ShipmentOrderStepID === this.state.ShipmentOrder.CurrentShipmentOrderStepID)[0].ShipmentOrderStepName}</button>
                                    <div className="dropdown dropdown-menu">
                                        {this.state.ShipmentOrder.ShipmentOrderType_WF_NextList && this.state.ShipmentOrder.ShipmentOrderType_WF_NextList.map(item =>
                                            <a className={item.NextShipmentOrderStep === this.state.ShipmentOrder.CurrentShipmentOrderStepID ? "dropdown-item active" : "dropdown-item"}
                                                key={item.NextShipmentOrderStep} name={item.NextShipmentOrderStep} data-option={item.NextShipmentOrderStep}
                                                data-lable={item.NextShipmentOrderStepName} onClick={this.onChangeInput.bind(this)}>
                                                {item.NextShipmentOrderStepName}</a>
                                        )}
                                    </div>
                                </div>
                            </div>
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
        }
    }
}


const ShipmentOrderDetail = connect(mapStateToProps, mapDispatchToProps)(ShipmentOrderDetailCom);
export default ShipmentOrderDetail;