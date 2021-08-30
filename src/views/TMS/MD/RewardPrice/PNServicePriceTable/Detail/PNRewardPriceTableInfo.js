import React, { Component } from "react";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../../../../actions/fetchAPIAction";
import { formatDate } from "../../../../../../common/library/CommonLib.js";
import { tr } from "date-fns/locale";

class PNRewardPriceTableInfoCom extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { PNRewardPriceTableInfo } = this.props;

        return (
            <React.Fragment>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Tên bảng đơn giá thưởng:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{PNRewardPriceTableInfo.PNServicePriceTableName}</label>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Loại mùa vụ:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{PNRewardPriceTableInfo.ServiceSeasonTypeID + " - " + PNRewardPriceTableInfo.ServiceSeasonTypeName}</label>
                    </div>
                </div>

                <div className="form-row">
                    {/* <div className="form-group col-md-2">
                        <label className="col-form-label bold">khu vực: </label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{PNRewardPriceTableInfo.ServiceAreaID + " - " + PNRewardPriceTableInfo.AreaName}</label>
                    </div> */}
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Người tạo:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{PNRewardPriceTableInfo.CreatedUser + " - " + PNRewardPriceTableInfo.FullName}</label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Mô tả:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <label className="col-form-label">{PNRewardPriceTableInfo.Description}</label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Kích hoạt:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <div className="checkbox customCheckbox">
                            <label><input type="checkbox" disabled={true} defaultChecked={PNRewardPriceTableInfo.IsActived} />
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
                            <label><input type="checkbox" disabled={true} defaultChecked={PNRewardPriceTableInfo.IsSystem} />
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


const PNRewardPriceTableInfo = connect(mapStateToProps, mapDispatchToProps)(PNRewardPriceTableInfoCom);
export default PNRewardPriceTableInfo;