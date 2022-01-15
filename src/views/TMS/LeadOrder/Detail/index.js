import React from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";


import {
    APIHostName,
    APILoadPath,
    DetailPagePath,
    ListLeadOrderDetailColumn
} from "../constants";

import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { callGetCache } from "../../../../actions/cacheAction";
import { formatDate } from "../../../../common/library/CommonLib";
import { MessageModal } from "../../../../common/components/Modal";
import { updatePagePath } from "../../../../actions/pageAction";
import DataGrid from "../../../../common/components/DataGrid";

class DetailCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            CallAPIMessage: "",
            IsCloseForm: false,
            DataSource: null
        };

        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.callLoadData = this.callLoadData.bind(this);
    }

    componentDidMount() {
        this.props.updatePagePath(DetailPagePath);
        this.callLoadData();

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
    callLoadData() {
        this.props.callFetchAPI(APIHostName, APILoadPath, this.props.match.params.id).then(apiResult => {
            if (apiResult.IsError) {
                this.showMessage(apiResult.Message);
            } else {
                const ListLeadOrderDetail = apiResult.ResultObject.ListLeadOrderDetail.map(item => {
                    return {
                        ...item,
                        CreatedUserIDName: `${item.CreatedUser} - ${item.CreatedUserName}`
                    }
                })
                apiResult.ResultObject.ListLeadOrderDetail = ListLeadOrderDetail;
                this.setState({ DataSource: apiResult.ResultObject });
            }
        });
    }

    handleCloseMessage() {

    }

    render() {

        if (this.state.DataSource == null) {
            return <React.Fragment>Đang nạp dữ liệu...</React.Fragment>
        } else {
            return (
                <React.Fragment>
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="x_panel">
                            <div className="x_title">
                                <h2>Thông tin mối bán hàng</h2>
                                <div className="clearfix"></div>
                            </div>

                            <div className="x_content col-md-12">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Loại mối bán hàng: </span>
                                            <span>{this.state.DataSource.LeadOrderTypeID} - {this.state.DataSource.LeadOrderTypeName}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Trạng thái hiện tại: </span>
                                            <span>{this.state.DataSource.CurrentStatusID} - {this.state.DataSource.CurrentStatusName}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Bước hiện tại: </span>
                                            <span>{this.state.DataSource.CurrentLeadOrderStepID} - {this.state.DataSource.CurrentLeadOrderStepName}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Ngày hẹn giao: </span>
                                            <span>{formatDate(this.state.DataSource.ExpectedDeliveryDate)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Mô tả: </span>
                                            <span>{this.state.DataSource.Description}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Mã vận đơn gốc: </span>
                                            <span>{this.state.DataSource.VoucherConcern}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Kho điều phối: </span>
                                            <span>{this.state.DataSource.CoordinatorStoreID} - {this.state.DataSource.CoordinatorStoreName}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Nhân viên tư vấn: </span>
                                            <span>{this.state.DataSource.StaffUser} - {this.state.DataSource.StaffUserName}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Tên khách hàng: </span>
                                            <span>{this.state.DataSource.CustomerID} - {this.state.DataSource.CustomerName}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Giới tính khách hàng: </span>
                                            <span>{this.state.DataSource.CustomerGender ? "Nam" : "Nữ"}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Số điện thoại khách hàng: </span>
                                            <span>{this.state.DataSource.CustomerPhone}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Địa chỉ đầy đủ của khách hàng: </span>
                                            <span>{this.state.DataSource.CustomerFullAddress}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <span>Tạo đơn hàng tương lai thành công: </span>
                                        <label>
                                            <input name="IsActived" type="checkbox" id="IsActived" checked={this.state.DataSource.IsCreatedSaleOrder} />
                                        </label>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Mã số thuế của khách hàng: </span>
                                            <span>{this.state.DataSource.CustomerTaxID}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <span>Ngày tạo đơn hàng tương lai: </span>
                                        <span>{formatDate(this.state.DataSource.CreatedSaleOrderDate)}</span>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Người tạo đơn hàng tương lai: </span>
                                            <span>{this.state.DataSource.CreatedSaleOrderUser} - {this.state.DataSource.CreatedSaleOrderUserName}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Tư vấn thất bại: </span>
                                            <label>
                                                <input name="IsActived" type="checkbox" id="IsActived" checked={this.state.DataSource.IsFaildAdvice} />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <span>Mô tả lý do tư vấn thất bại: </span>
                                        <span>{this.state.DataSource.FailAdviseDescription}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DataGrid
                        headingTitle="Danh sách chi tiết mối bán hàng"
                        dataSource={this.state.DataSource.ListLeadOrderDetail}
                        IDSelectColumnName={""}
                        IsAutoPaging={true}
                        IsDelete={false}
                        IsExportFile={false}
                        IsShowButtonAdd={false}
                        IsShowButtonDelete={false}
                        listColumn={ListLeadOrderDetailColumn}
                        PKColumnName={"LeadOrderDetailID"}
                        // RequirePermission={}
                        RowsPerPage={20}
                    />
                </React.Fragment >
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
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        }
    };
};

const Detail = connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailCom);
export default Detail;
