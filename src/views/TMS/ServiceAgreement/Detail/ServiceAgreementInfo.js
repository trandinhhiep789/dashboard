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

    componentDidMount() {
        console.log('ServiceAgreementInfoCom', this.props.ServiceAgreementInfo)
    }


    render() {
        return (
            <div className="card">
                <h4 className="card-title"><strong>Thông tin hợp đồng</strong></h4>
                <div className="card-body">
                    <div className="form-row">
                        <div className="form-group col-md-2">
                            <label className="col-form-label bold">Mã hợp đồng:</label>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="col-form-label">{this.props.ServiceAgreementInfo.ServiceAgreementID}</label>
                        </div><div className="form-group col-md-2">
                            <label className="col-form-label bold">Loại hợp đồng:</label>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="col-form-label">
                            {this.props.ServiceAgreementInfo.ServiceTypeID}
                            </label>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-2">
                            <label className="col-form-label bold">Loại dịch vụ:</label>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="col-form-label">Lắp đặt</label>
                        </div><div className="form-group col-md-2">
                            <label className="col-form-label bold">Đối tác:</label>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="col-form-label">Công ty TNHH Điện lạnh Blue Sky</label>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-2">
                            <label className="col-form-label bold">Khu vực:</label>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="col-form-label">HCM</label>
                        </div><div className="form-group col-md-2">
                            <label className="col-form-label bold">Nhân viên đại diện:</label>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="col-form-label">PhanNV</label>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-2">
                            <label className="col-form-label bold">Ngày ký hợp đồng:</label>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="col-form-label">03/06/2020</label>
                        </div><div className="form-group col-md-2">
                            <label className="col-form-label bold">Ngày hết hạn hợp đồng:</label>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="col-form-label">03/06/2020</label>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-2">
                            <label className="col-form-label bold">Đã gia hạn hợp đồng:</label>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="col-form-label"></label>
                        </div><div className="form-group col-md-2">
                            <label className="col-form-label bold">Gia hạn đến ngày:</label>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="col-form-label">03/06/2020</label>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-2">
                            <label className="col-form-label bold">Đã thanh lý hợp đồng:</label>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="col-form-label"></label>
                        </div><div className="form-group col-md-2">
                            <label className="col-form-label bold">Ngày thanh lý hợp đồng:</label>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="col-form-label">03/06/2020</label>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-2">
                            <label className="col-form-label bold">Đã ký quỹ:</label>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="col-form-label"></label>
                        </div><div className="form-group col-md-2">
                            <label className="col-form-label bold">Số tiền ký quỹ:</label>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="col-form-label">5,000</label>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-2">
                            <label className="col-form-label bold">Ngày ký quỹ:</label>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="col-form-label"></label>
                        </div><div className="form-group col-md-2">
                            <label className="col-form-label bold">Ghi chú ký quỹ:</label>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="col-form-label">5,000</label>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-2">
                            <label className="col-form-label bold">Mô tả:</label>
                        </div>
                        <div className="form-group col-md-10">
                            <label className="col-form-label"></label>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-2">
                            <label className="col-form-label bold">Kích hoạt:</label>
                        </div>
                        <div className="form-group col-md-10">
                            <label className="col-form-label"></label>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-2">
                            <label className="col-form-label bold">Hệ thống:</label>
                        </div>
                        <div className="form-group col-md-10">
                            <label className="col-form-label"></label>
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