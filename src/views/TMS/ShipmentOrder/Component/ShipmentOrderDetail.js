import React, { Component } from "react";
import { connect } from 'react-redux';
import { formatDate } from "../../../../common/library/CommonLib.js";
class ShipmentOrderDetailCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ShipmentOrder: this.props.ShipmentOrderDetail
        }
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.ShipmentOrderDetail) !== JSON.stringify(nextProps.ShipmentOrderDetail)) {
            this.setState({
                ShipmentOrder: nextProps.ShipmentOrderDetail
            })
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
                            <label className="col-form-label" >{this.state.ShipmentOrder.ShipmentServiceTypeName}</label>
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
                            <label className="col-form-label" >{this.state.ShipmentOrder.ShipmentOrderTypeName}</label>
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        }
    }
}


const ShipmentOrderDetail = connect(mapStateToProps, mapDispatchToProps)(ShipmentOrderDetailCom);
export default ShipmentOrderDetail;