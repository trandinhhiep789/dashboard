import React, { Component } from "react";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import {
    APIHostName,
} from "../constants";

import { formatDate } from "../../../../common/library/CommonLib.js";

class ServiceAgreementInfoCom extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        console.log('info', this.props)
    }


    render() {
        return (
            <React.Fragment>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Số hợp đồng:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{this.props.ServiceAgreementInfo.ServiceAgreementNumber}</label>
                    </div><div className="form-group col-md-2">
                        <label className="col-form-label bold">Loại hợp đồng:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {this.props.ServiceAgreementInfo.ServiceAgreementTypeName}
                        </label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Loại dịch vụ:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{this.props.ServiceAgreementInfo.ServiceTypeName}</label>
                    </div><div className="form-group col-md-2">
                        <label className="col-form-label bold">Đơn vị vận chuyển:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{this.props.ServiceAgreementInfo.PartnerName}</label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Khu vực:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{this.props.ServiceAgreementInfo.AreaName}</label>
                    </div><div className="form-group col-md-2">
                        <label className="col-form-label bold">Nhân viên đại diện:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{this.props.ServiceAgreementInfo.DeputyUserName}</label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Ngày ký hợp đồng:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{formatDate(this.props.ServiceAgreementInfo.SignedDate, true)}</label>
                    </div><div className="form-group col-md-2">
                        <label className="col-form-label bold">Ngày hết hạn hợp đồng:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{formatDate(this.props.ServiceAgreementInfo.ExpiredDate, true)}</label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Đã gia hạn hợp đồng:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <div className="checkbox customCheckbox">
                            <label><input type="checkbox" disabled={true} defaultChecked={this.props.ServiceAgreementInfo.IsExtended} />
                                <span className="cr"><i className="cr-icon fa fa-check"></i>
                                </span>
                            </label>
                        </div>
                    </div><div className="form-group col-md-2">
                        <label className="col-form-label bold">Gia hạn đến ngày:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{formatDate(this.props.ServiceAgreementInfo.ExtendedDate, true)}</label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Đã thanh lý hợp đồng:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <div className="checkbox customCheckbox">
                            <label><input type="checkbox" disabled={true} defaultChecked={this.props.ServiceAgreementInfo.IsLiquidated} />
                                <span className="cr"><i className="cr-icon fa fa-check"></i>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Ngày thanh lý hợp đồng:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{formatDate(this.props.ServiceAgreementInfo.Liquidateddate, true)}</label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Đã ký quỹ:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <div className="checkbox customCheckbox">
                            <label><input type="checkbox" disabled={true} defaultChecked={this.props.ServiceAgreementInfo.IsDeposited} />
                                <span className="cr"><i className="cr-icon fa fa-check"></i>
                                </span>
                            </label>
                        </div>

                    </div><div className="form-group col-md-2">
                        <label className="col-form-label bold">Số tiền ký quỹ:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{this.props.ServiceAgreementInfo.DepositMoney}</label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Ngày ký quỹ:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{formatDate(this.props.ServiceAgreementInfo.DepositedDate, true)}</label>
                    </div><div className="form-group col-md-2">
                        <label className="col-form-label bold">Ghi chú ký quỹ:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{this.props.ServiceAgreementInfo.DepositNote}</label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Mô tả:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <label className="col-form-label">{this.props.ServiceAgreementInfo.Description}</label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Kích hoạt:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <div className="checkbox customCheckbox">
                            <label><input type="checkbox" disabled={true} defaultChecked={this.props.ServiceAgreementInfo.IsActived} />
                                <span className="cr"><i className="cr-icon fa fa-check"></i>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Hệ thống:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <div className="checkbox customCheckbox">
                            <label><input type="checkbox" disabled={true} defaultChecked={this.props.ServiceAgreementInfo.IsSystem} />
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


const ServiceAgreementInfo = connect(mapStateToProps, mapDispatchToProps)(ServiceAgreementInfoCom);
export default ServiceAgreementInfo;