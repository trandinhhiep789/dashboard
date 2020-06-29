import React from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
    APIHostName,
    BackLink,
    TitleFromFeeAppendixDetail,
    LoadNewAPIPath,

} from "../../../ServiceAgreement/Abiliti/contants/index.js";
import { ModalManager } from "react-dynamic-modal";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { formatDate } from "../../../../../common/library/CommonLib.js";

class DetailCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            IsLoadDataComplete: false,
            AbilityItem: {},
        };
    }

    componentDidMount() {
        this.callLoadData(this.props.match.params.id);

    }

    callLoadData(id) {
        this.props.callFetchAPI(APIHostName, LoadNewAPIPath, id).then((apiResult) => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
                this.setState({
                    AbilityItem: apiResult.ResultObject,
                    IsLoadDataComplete: true
                });
                const id= apiResult.ResultObject.ServiceAgreementID;
                const PagePath = [
                    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
                    { Link: "/ServiceAgreement", Title: "Danh sách hợp đồng dịch vụ " },
                    { Link: "/ServiceAgreement/Detail/" + id, Title: "Danh sách hợp đồng dịch vụ " },
                    { Link: "", Title: "Chi tiết năng lực" },
                ];
                this.props.updatePagePath(PagePath);
            }
        });
    }

    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
                onCloseModal={this.handleCloseMessage}
            />
        );
    }


    render() {

        const BackLinkTo = BackLink + this.state.AbilityItem.ServiceAgreementID + "/"
        if (this.state.IsLoadDataComplete) {
            return (
                <div className="col-md-12">
                    <div className="card">
                        <h4 className="card-title">
                            <strong>{TitleFromFeeAppendixDetail}</strong>
                        </h4>
                        <div className="card-body">
                            <div className="form-row">
                                <div className="form-group col-md-2">
                                    <label className="col-form-label bold">Loại mùa vụ</label>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="col-form-label">
                                        {this.state.AbilityItem.ServiceSeasonTypeName}
                                    </label>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-2">
                                    <label className="col-form-label bold">Từ ngày</label>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="col-form-label">
                                        {formatDate(this.state.AbilityItem.FromDate)}
                                    </label>
                                </div>

                                <div className="form-group col-md-2">
                                    <label className="col-form-label bold">Đến ngày</label>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="col-form-label">
                                        {formatDate(this.state.AbilityItem.ToDate)}
                                    </label>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-2">
                                    <label className="col-form-label bold">Theo tháng</label>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="col-form-label">
                                        {this.state.AbilityItem.MonthlyAbilityValue}
                                    </label>
                                </div>

                                <div className="form-group col-md-2">
                                    <label className="col-form-label bold">Theo ngày</label>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="col-form-label">
                                        {this.state.AbilityItem.DailyAbilityValue}
                                    </label>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-2">
                                    <label className="col-form-label bold">ghi chú</label>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="col-form-label">
                                        {this.state.AbilityItem.ServiceSeasonTypeName}
                                    </label>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-2">
                                    <label className="col-form-label bold">kích hoạt</label>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="col-form-label">
                                        <div className="checkbox customCheckbox">
                                            <label>
                                                <input type="checkbox" defaultChecked={this.state.AbilityItem.IsActived} disabled={true} />
                                                <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                                            </label>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-2">
                                    <label className="col-form-label bold">hệ thông</label>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="col-form-label">
                                        <div className="checkbox customCheckbox">
                                            <label>
                                                <input type="checkbox" defaultChecked={this.state.AbilityItem.IsSystem} disabled={true} />
                                                <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                                            </label>
                                        </div>

                                    </label>
                                </div>
                            </div>


                        </div>
                        <footer className="card-footer text-right">
                            <Link to={BackLinkTo}>
                                <button className="btn btn-sm btn-outline btn-primary" type="button">Quay lại</button>
                            </Link>
                        </footer>
                    </div>
                </div>
            );

        } else {
            return (
                <label>Đang nạp dữ liệu...</label>
            );
        }

    }
}

const mapStateToProps = state => {
    return {
        AppInfo: state,
        FetchAPIInfo: state.FetchAPIInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updatePagePath: pagePath => {
            dispatch(updatePagePath(pagePath));
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
    };
};

const Detail = connect(mapStateToProps, mapDispatchToProps)(DetailCom);
export default Detail;
