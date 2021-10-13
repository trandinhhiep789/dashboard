import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect
} from "react-router-dom";

import { formatDate } from '../../../../common/library/CommonLib';

class MaterialReturnInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MaterialReclaim: this.props.MaterialReturn
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="mb-4">
                    <div className="form-row">
                        <div className="form-group col-md-2">
                            <label className="col-form-label bold">Mã yêu cầu nhập xác linh kiện</label>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="col-form-label">
                                {this.state.MaterialReclaim.MaterialReturnID}
                            </label>
                        </div>

                        <div className="form-group col-md-2">
                            <label className="col-form-label bold">Mã vận đơn</label>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="col-form-label">
                                <Link to={`/ShipmentOrder/Detail/${this.state.MaterialReclaim.ShipmentOrderID}`} target="_blank">{this.state.MaterialReclaim.ShipmentOrderID}</Link>
                            </label>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-2">
                            <label className="col-form-label bold">Nhân viên yêu cầu</label>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="col-form-label">
                                {this.state.MaterialReclaim.ReturnUser} - {this.state.MaterialReclaim.ReturnUserName}
                            </label>
                        </div>

                        <div className="form-group col-md-2">
                            <label className="col-form-label bold">Mã kho</label>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="col-form-label">
                                {this.state.MaterialReclaim.ReturnStoreID} - {this.state.MaterialReclaim.ReturnStoreName}
                            </label>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-2">
                            <label className="col-form-label bold">Ngày yêu cầu</label>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="col-form-label">
                                {formatDate(this.state.MaterialReclaim.ReturnDate, false)}
                            </label>
                        </div>

                        <div className="form-group col-md-2">
                            <label className="col-form-label bold">Mã phiếu nhập trả vật tư</label>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="col-form-label">
                                {this.state.MaterialReclaim.InputVoucherID}
                            </label>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-2">
                            <label className="col-form-label bold">Người tạo phiếu nhập</label>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="col-form-label">
                                {this.state.MaterialReclaim.CreatedInputVoucherUser} - {this.state.MaterialReclaim.CreatedInputVoucherUserName}
                            </label>
                        </div>

                        <div className="form-group col-md-2">
                            <label className="col-form-label bold">Đã tạo phiếu nhập</label>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="col-form-label">
                                {
                                    this.state.MaterialReclaim.IsCreatedInputVoucher && <span className="fa fa-check"></span>
                                }
                            </label>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-2">
                            <label className="col-form-label bold">Ngày tạo phiếu nhập</label>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="col-form-label">
                                {formatDate(this.state.MaterialReclaim.CreatedInputVoucherDate, false)}
                            </label>
                        </div>

                        <div className="form-group col-md-2">
                            <label className="col-form-label bold">Mô tả</label>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="col-form-label">
                                {this.state.MaterialReclaim.Description}
                            </label>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

MaterialReturnInfo.defaultProps = {
    MaterialReclaim: {}
}

export default connect(null, null)(MaterialReturnInfo);
