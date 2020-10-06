import React, { Component } from "react";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import {
    APIHostName,
} from "../constants";

import { formatDate } from "../../../../common/library/CommonLib.js";

class DestroyRequestInfoCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DestroyRequest: {}
        }
    }

    componentDidMount() {
        this.setState({
            DestroyRequest: this.props.DestroyRequest
        })
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.DestroyRequest) !== JSON.stringify(nextProps.DestroyRequest)) {
            this.setState({ DestroyRequest: nextProps.DestroyRequest });
        }
    }


    render() {
        const { DestroyRequest } = this.state;
        return (
            <React.Fragment>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Mã yêu cầu:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{this.props.DestroyRequest.DestroyRequestID}</label>
                    </div><div className="form-group col-md-2">
                        <label className="col-form-label bold">Loại yêu cầu:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {this.props.DestroyRequest.DestroyRequestTypeName}
                        </label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Tiêu đề:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <label className="col-form-label">{DestroyRequest.DestroyRequestTitle}</label>
                    </div>
                </div>

                <div className="form-row">

                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Kho yêu cầu:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{this.props.DestroyRequest.StoreName}</label>
                    </div>

                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Ngày yêu cầu:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{formatDate(this.props.DestroyRequest.RequestDate, true)}</label>
                    </div>

                </div>

                <div className="form-row">

                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Người yêu cầu:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{DestroyRequest.RequestUser + " - " + DestroyRequest.FullName}</label>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Mô tả:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{DestroyRequest.Description}</label>
                    </div>

                </div>

                <div className="form-row">

                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Đã duyệt:</label>
                    </div>
                    <div className="form-group col-md-4">

                        <div className="checkbox customCheckbox">
                            <label>
                                <input type="checkbox" disabled={true} defaultChecked={DestroyRequest.IsreViewed} />
                                <span className="cr"><i className="cr-icon fa fa-check"></i>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Người duyệt:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{DestroyRequest.reViewedUser + " - " + DestroyRequest.ReViewedUserName}</label>
                    </div>

                </div>

                <div className="form-row">

                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Ngày duyệt:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{formatDate(DestroyRequest.reViewedDate, true)}</label>
                    </div>

                  
                </div>

                <div className="form-row">
                <div className="form-group col-md-2">
                        <label className="col-form-label bold">Đã tạo đơn hàng hủy vật tư:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <div className="checkbox customCheckbox">
                            <label>
                                <input type="checkbox" disabled={true} defaultChecked={DestroyRequest.IsCreatedOrder} />
                                <span className="cr"><i className="cr-icon fa fa-check"></i>
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Người tạo đơn hàng hủy vật tư:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{DestroyRequest.CreatedOrderUser + " - " + DestroyRequest.CreatedOrderUserName}</label>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Ngày tạo đơn hàng hủy vật tư:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <div className="checkbox customCheckbox">
                            <label className="col-form-label">{formatDate(DestroyRequest.CreatedOrderDate, true)}</label>
                        </div>

                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Mã đơn hàng hủy vật tư:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{DestroyRequest.SaleOrderID}</label>
                    </div>
                    
                </div>

                <div className="form-row">

                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Mã phiếu xuất:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{DestroyRequest.OutputVoucherID}</label>
                    </div>

                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Hệ thống:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <div className="checkbox customCheckbox">
                            <label>
                                <input type="checkbox" disabled={true} defaultChecked={DestroyRequest.IsSystem} />
                                <span className="cr"><i className="cr-icon fa fa-check"></i>
                                </span>
                            </label>
                        </div>

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


const DestroyRequestInfo = connect(mapStateToProps, mapDispatchToProps)(DestroyRequestInfoCom);
export default DestroyRequestInfo;