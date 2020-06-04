import React, { Component } from "react";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import {
    APIHostName,
} from "../constants";

class ServiceAgreementInfoCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
  
        }
    }


    render() {
        return (
            <div className="card">
                <h4 className="card-title"><strong>Thông tin hợp đồng</strong></h4>
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
                                                onClick={this.onChangeInput.bind(this)}>
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


const ServiceAgreementInfo = connect(mapStateToProps, mapDispatchToProps)(ServiceAgreementInfoCom);
export default ServiceAgreementInfo;