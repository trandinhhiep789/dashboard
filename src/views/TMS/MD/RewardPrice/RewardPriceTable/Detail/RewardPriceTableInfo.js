import React, { Component } from "react";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../../../../actions/fetchAPIAction";
import { formatDate } from "../../../../../../common/library/CommonLib.js";
import { tr } from "date-fns/locale";

class RewardPriceTableInfoCom extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { RewardPriceTableInfo } = this.props;
        return (
            <React.Fragment>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Tên bảng đơn giá thưởng:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{RewardPriceTableInfo.RewardPriceTableName}</label>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Loại đơn giá thưởng:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{RewardPriceTableInfo.RewardPriceTypeName}</label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Loại phương tiện:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{RewardPriceTableInfo.CarrierTypeName}</label>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Khu vực:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{RewardPriceTableInfo.AreaName}</label>
                    </div>
                </div>


                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Mặc định:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <div className="checkbox customCheckbox">
                            <label><input type="checkbox" disabled={true} defaultChecked={RewardPriceTableInfo.IsDefault} />
                                <span className="cr">
                                    <i className="cr-icon fa fa-check"></i>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Người tạo:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{RewardPriceTableInfo.CreatedUser + " - " + RewardPriceTableInfo.FullName}</label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Mô tả:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <label className="col-form-label">{RewardPriceTableInfo.Description}</label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Kích hoạt:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <div className="checkbox customCheckbox">
                            <label><input type="checkbox" disabled={true} defaultChecked={RewardPriceTableInfo.IsActived} />
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
                            <label><input type="checkbox" disabled={true} defaultChecked={RewardPriceTableInfo.IsSystem} />
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


const RewardPriceTableInfo = connect(mapStateToProps, mapDispatchToProps)(RewardPriceTableInfoCom);
export default RewardPriceTableInfo;