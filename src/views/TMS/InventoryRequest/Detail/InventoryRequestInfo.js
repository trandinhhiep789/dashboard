import React, { Component } from "react";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import {
    APIHostName,
} from "../constants";

import { formatDate } from "../../../../common/library/CommonLib.js";

class InventoryRequestInfoCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            InventoryRequest: {}
        }
    }

    componentDidMount() {
        this.setState({
            InventoryRequest: this.props.InventoryRequest
        })
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.InventoryRequest) !== JSON.stringify(nextProps.InventoryRequest)) {
            this.setState({ InventoryRequest: nextProps.InventoryRequest });
        }
    }


    render() {
        const { InventoryRequest } = this.state;
        return (
            <React.Fragment>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Mã yêu cầu kiểm kê:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{InventoryRequest.InventoryRequestID}</label>
                    </div>
                    
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Mã kỳ kiểm kê:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {InventoryRequest.InventorytermID}
                        </label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Loại yêu cầu kiểm kê:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {InventoryRequest.InventoryRequestTypeName}
                        </label>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Tiêu đề yêu cầu kiểm kê:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{InventoryRequest.InventoryRequestTitle}</label>
                    </div>
                    
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Người yêu cầu:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{InventoryRequest.RequestUser + " - " + InventoryRequest.RequestFullName}</label>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Kho yêu cầu:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{InventoryRequest.RequestStoreID + " - " + InventoryRequest.StoreName}</label>
                    </div>

                    
                    
                </div>

              

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Ngày yêu cầu:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{formatDate(InventoryRequest.RequestDate, false)}</label>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Đã duyệt:</label>
                    </div>
                    <div className="form-group col-md-4">

                        <div className="checkbox customCheckbox">
                            <label><input type="checkbox" disabled={true} defaultChecked={InventoryRequest.IsreViewed} />
                                <span className="cr"><i className="cr-icon fa fa-check"></i>
                                </span>
                            </label>
                        </div>
                    </div>
                    

                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Người duyệt:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{InventoryRequest.RequestUser + " - " + InventoryRequest.RequestFullName}</label>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Ngày duyệt:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{formatDate(InventoryRequest.reViewedDate, false)}</label>
                    </div>

                </div>
                
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Người xử lý chênh lệch:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{InventoryRequest.ProcessInventoryUser + " - " + InventoryRequest.ProcessInventoryUserFullName}</label>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Ngày xử lý chênh lệch:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{formatDate(InventoryRequest.ProcessInventoryDate, false)}</label>
                    </div>

                    
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Đã xử lý chênh lệch:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <div className="checkbox customCheckbox">
                            <label><input type="checkbox" disabled={true} defaultChecked={InventoryRequest.IsProcessInventory} />
                                <span className="cr"><i className="cr-icon fa fa-check"></i>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Đã tạo đơn hàng kiểm kê:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <div className="checkbox customCheckbox">
                            <label><input type="checkbox" disabled={true} defaultChecked={InventoryRequest.IsCreatedOrder} />
                                <span className="cr"><i className="cr-icon fa fa-check"></i>
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="form-row">

                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Người tạo đơn hàng kiểm kê:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{InventoryRequest.CreatedOrderUser + " - " + InventoryRequest.CreatedOrderFullName}</label>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Ngày tạo đơn hàng kiểm kê:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <div className="checkbox customCheckbox">
                            <label className="col-form-label">{formatDate(InventoryRequest.CreatedOrderDate, false)}</label>
                        </div>

                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Mã đơn hàng kiểm kê:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{InventoryRequest.SaleOrderID}</label>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Đã xuất kiểm kê:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <div className="checkbox customCheckbox">
                            <label><input type="checkbox" disabled={true} defaultChecked={InventoryRequest.IsCreatedOrder} />
                                <span className="cr"><i className="cr-icon fa fa-check"></i>
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="form-row">

                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Người xuất kiểm kê:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{InventoryRequest.CreatedOrderUser}</label>
                    </div>

                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Ngày xuất:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{formatDate(InventoryRequest.CreatedOrderDate,false)}</label>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Mô tả:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <label className="col-form-label">{InventoryRequest.Description}</label>
                    </div>

                </div>
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        }
    }
}


const InventoryRequestInfo = connect(mapStateToProps, mapDispatchToProps)(InventoryRequestInfoCom);
export default InventoryRequestInfo;