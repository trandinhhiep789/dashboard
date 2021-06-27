import React, { Component } from "react";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { formatDate } from "../../../../../common/library/CommonLib.js";

class ServicePriceTableInfoCom extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { ServicePriceTableInfo } = this.props;
        return (
            <React.Fragment>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Mã bảng giá dịch vụ:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{ServicePriceTableInfo.ServicePriceTableID}</label>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">	Tên bảng giá dịch vụ:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{ServicePriceTableInfo.ServicePriceTableName}</label>
                    </div>
                </div>


                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Mô tả:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <label className="col-form-label">{ServicePriceTableInfo.Description}</label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Kích hoạt:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <div className="checkbox customCheckbox">
                            <label><input type="checkbox" disabled={true} defaultChecked={ServicePriceTableInfo.IsActived} />
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
                            <label><input type="checkbox" disabled={true} defaultChecked={ServicePriceTableInfo.IsSystem} />
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


const ServicePriceTableInfo = connect(mapStateToProps, mapDispatchToProps)(ServicePriceTableInfoCom);
export default ServicePriceTableInfo;