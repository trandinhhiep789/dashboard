import React, { Component } from "react";
import { connect } from 'react-redux';
class ShipmentOrderAddressCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ShipmentOrder: this.props.ShipmentOrderAddress
        }
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.ShipmentOrderAddress) !== JSON.stringify(nextProps.ShipmentOrderAddress)) {
            this.setState({
                ShipmentOrder: nextProps.ShipmentOrderAddress
            })
        }
    }

    render() {
        return (
            <div className="card">
            <h4 className="card-title"><strong>Địa chỉ</strong></h4>
            <div className="card-body">
                <div className="card">
                    <div className="card-title">
                        <h4 className="title">Ngưởi gửi</h4>
                        <button className="btn btnEditCard">chỉnh sửa</button>
                    </div>
                    <div className="card-body">
                        <div className="form-row">
                            <div className="form-group col-md-1">
                                <label className="col-form-label icon">
                                    <i className="fa fa-user" aria-hidden="true"></i>
                                </label>
                            </div>
                            <div className="form-group col-md-5">
                                <label className="col-form-label" >{this.state.ShipmentOrder.SenderFullName}</label>
                            </div>
                            <div className="form-group col-md-1">
                                <label className="col-form-label icon">
                                    <i className="fa fa-mobile " aria-hidden="true"></i>
                                </label>
                            </div>
                            <div className="form-group col-md-5">
                                <label className="col-form-label">{this.state.ShipmentOrder.SenderPhoneNumber}</label>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-1">
                                <label className="col-form-label icon">
                                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                                </label>
                            </div>
                            <div className="form-group col-md-5">
                                <label className="col-form-label" >{this.state.ShipmentOrder.SenderFullAddress}</label>
                                <a className="mapslink">Xem bản đồ</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-title">
                        <h4 className="title">Người nhận</h4>
                        <button className="btn btnEditCard">chỉnh sửa</button>
                    </div>
                    <div className="card-body">
                        <div className="form-row">
                            <div className="form-group col-md-1">
                                <label className="col-form-label icon">
                                    <i className="fa fa-user" aria-hidden="true"></i>
                                </label>
                            </div>
                            <div className="form-group col-md-5">
                                <label className="col-form-label" >{this.state.ShipmentOrder.ReceiverFullName}</label>
                            </div>
                            <div className="form-group col-md-1">
                                <label className="col-form-label icon">
                                    <i className="fa fa-mobile " aria-hidden="true"></i>
                                </label>
                            </div>
                            <div className="form-group col-md-5">
                                <label className="col-form-label">{this.state.ShipmentOrder.ReceiverPhoneNumber}</label>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-1">
                                <label className="col-form-label icon">
                                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                                </label>
                            </div>
                            <div className="form-group col-md-5">
                                <label className="col-form-label" >{this.state.ShipmentOrder.ReceiverFullAddress}</label>
                                <a className="mapslink">Xem bản đồ</a>
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        }
    }
}


const ShipmentOrderAddress = connect(mapStateToProps, mapDispatchToProps)(ShipmentOrderAddressCom);
export default ShipmentOrderAddress;