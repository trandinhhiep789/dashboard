import React from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { MessageModal } from "../../../../../common/components/Modal";
import {
    APIHostName,
    BackLink,
    TitleFromFeeAppendixDetail,
    LoadNewAPIPath

} from "../../../ServiceAgreement/FeeAppendixDetail/constants/index.js";
import { ModalManager } from "react-dynamic-modal";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";


class DetailCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            IsLoadDataComplete: false,
            FeeAppendixDetail: {},
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
                    FeeAppendixDetail: apiResult.ResultObject,
                    IsLoadDataComplete: true
                });

                const idAgreement =apiResult.ResultObject.ServiceAgreementID;
                const idFeeAppendix =apiResult.ResultObject.FeeAppendixID;

                const DetailAPIPath = [
                    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
                    { Link: "/ServiceAgreement", Title: "Danh sách hợp đồng dịch vụ " },
                    { Link: "/ServiceAgreement/Detail/" + idAgreement, Title: "Danh sách hợp đồng dịch vụ " },
                    { Link: "/ServiceAgreement/FeeAppendix/Detail/" + idFeeAppendix, Title: "Danh sách hợp đồng dịch vụ " },
                    { Link: "", Title: "Thông tin chi tiết phụ lục biểu phí" },
                ];
                this.props.updatePagePath(DetailAPIPath)
            }
        });
    }

    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
            />
        );
    }


    render() {
        const BackLinkTo = BackLink + this.state.FeeAppendixDetail.FeeAppendixID + "/"
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
                                    <label className="col-form-label bold">Nhóm hàng</label>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="col-form-label">
                                        {this.state.FeeAppendixDetail.SubGroupName}
                                    </label>
                                </div>
                                <div className="form-group col-md-2">
                                    <label className="col-form-label bold">Thông số kỹ thuật</label>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="col-form-label">
                                        {this.state.FeeAppendixDetail.TechspecsName}
                                    </label>
                                </div>

                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-2">
                                    <label className="col-form-label bold">Giá trị thông số</label>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="col-form-label">
                                        {this.state.FeeAppendixDetail.TechspecsValue}
                                    </label>
                                </div>

                                <div className="form-group col-md-2">
                                    <label className="col-form-label bold">Sản phẩm</label>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="col-form-label">
                                        {this.state.FeeAppendixDetail.ProductName}
                                    </label>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-2">
                                    <label className="col-form-label bold">Giá dịch vụ</label>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="col-form-label">
                                        {this.state.FeeAppendixDetail.ServiceFee}
                                    </label>
                                </div>

                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-2">
                                    <label className="col-form-label bold">Ghi chú</label>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="col-form-label">
                                        {this.state.FeeAppendixDetail.Note}
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
                                                <input type="checkbox" defaultChecked={this.state.FeeAppendixDetail.IsActived} disabled={true} />
                                                <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                                            </label>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-2">
                                    <label className="col-form-label bold">hệ thống</label>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="col-form-label">
                                        <div className="checkbox customCheckbox">
                                            <label>
                                                <input type="checkbox" defaultChecked={this.state.FeeAppendixDetail.IsSystem} disabled={true} />
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
        }
        else {
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
