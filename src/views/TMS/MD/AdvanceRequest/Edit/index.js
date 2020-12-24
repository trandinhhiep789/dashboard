import React from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import SimpleForm from "../../../../../common/components/Form/SimpleForm";
import { MessageModal } from "../../../../../common/components/Modal";
import {
    APIHostName,
    LoadAPIPath,
    UpdateAPIPath,
    EditElementList,
    MLObjectDefinition,
    BackLink,
    EditPagePath,
    LoadLoadWebAPIPath,
    AddLogAPIPath
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { CANCELDELIVERYREASON_UPDATE } from "../../../../../constants/functionLists";
import indexedDBLib from "../../../../../common/library/indexedDBLib.js";
import { CACHE_OBJECT_STORENAME } from "../../../../../constants/systemVars.js";
import { callGetCache } from "../../../../../actions/cacheAction";
import { format } from "date-fns";
import { formatDate } from "../../../../../common/library/CommonLib";
import AdvanceRequestDetail from "../../AdvanceRequestDetail";


class EditCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsLoadDataComplete: false,
            IsCloseForm: false
        };
    }

    componentDidMount() {
        this.props.updatePagePath(EditPagePath);
        const id = this.props.match.params.id;
        this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then(apiResult => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            } else {
                this.setState({ DataSource: apiResult.ResultObject });
            }
            this.setState({
                IsLoadDataComplete: true
            });
        });
    }

    handleCloseMessage() {
        if (this.state.IsCallAPIError) this.setState({ IsCloseForm: true });
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



        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }

        if (this.state.IsLoadDataComplete && !this.state.IsCallAPIError) {
            let IsShow = false;
            if (this.state.DataSource.AdvanceRequest_ShipOrderList.length > 0) {
                IsShow = true;
            }
            return (
                <React.Fragment>
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="x_panel">
                            <div className="x_title">
                                <h2>Thông tin yêu cầu tạm ứng</h2>
                                <div className="clearfix"></div>
                            </div>

                            <div className="x_content col-md-12">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Mã yêu cầu tạm ứng: </span>
                                            <span className="xcode">{this.state.DataSource.AdvanceRequestID}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Loại yêu cầu tạm ứng: </span>
                                            <span>{this.state.DataSource.AdvanceRequestTypeName}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Tiêu đề yêu cầu tạm ứng: </span>
                                            <span>{this.state.DataSource.AdvanceRequestTitle}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Mã yêu cầu vận chuyển: </span>
                                            <span>{this.state.DataSource.ShipmentOrderID}</span>
                                        </div>
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Ngày yêu cầu: </span>
                                            <span>{formatDate(this.state.DataSource.RequestDate)}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Người yêu cầu: </span>
                                            <span>{this.state.DataSource.RequestUserFull}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span> Mô tả: </span>
                                            <span>{this.state.DataSource.Description}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group checkbox customCheckbox">
                                            <span>Đã duyệt: </span>
                                            <label>
                                                <input name="IsResponse" type="checkbox" id="IsResponse" checked={this.state.DataSource.IsReviewed} />
                                                <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Người duyệt: </span>
                                            <span>{this.state.DataSource.ReviewedUser != "" ? this.state.DataSource.ReviewedUserFull : ""}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Ngày duyệt: </span>
                                            <span>{formatDate(this.state.DataSource.ReviewedDate)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group checkbox customCheckbox">
                                            <span>Đã tạo đơn hàng tạm ứng: </span>
                                            <label>
                                                <input name="IsResponse" type="checkbox" id="IsResponse" checked={this.state.DataSource.IsCreatedOrder} />
                                                <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span> Người tạo đơn hàng tạm ứng: </span>
                                            <span>{this.state.DataSource.CreatedOrderUserFull}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span> Ngày tạo đơn hàng tạm ứng: </span>
                                            <span>{formatDate(this.state.DataSource.CreatedOrderDate)}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Mã đơn hàng tạm ứng: </span>
                                            <span>{this.state.DataSource.SaleOrderID}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group checkbox customCheckbox">
                                            <span>Đã xuất tạm ứng: </span>
                                            <label>
                                                <input name="IsOutput" type="checkbox" id="IsOutput" checked={this.state.DataSource.IsOutput} />
                                                <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span> Người xuất tạm ứng: </span>
                                            <span>{this.state.DataSource.OutputUser != "" ? this.state.DataSource.OutputUserFull : ""}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span> Ngày xuất: </span>
                                            <span>{formatDate(this.state.DataSource.OutputDate)}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span> Mã phiếu xuất: </span>
                                            <span>{this.state.DataSource.OutputVoucherID}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group checkbox customCheckbox">
                                            <span>Đã bàn giao: </span>
                                            <label>
                                                <input name="IsHandoverMaterial" type="checkbox" id="IsHandoverMaterial" checked={this.state.DataSource.IsHandoverMaterial} />
                                                <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span> Người bàn giao: </span>
                                            <span>{this.state.DataSource.HandoverUser != "" ? this.state.DataSource.HandoverUserFull : ""}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span> Ngày bàn giao: </span>
                                            <span>{formatDate(this.state.DataSource.HandoverDate)}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group checkbox customCheckbox">
                                            <span>Đã hủy: </span>
                                            <label>
                                                <input name="IsDeleted" type="checkbox" id="IsDeleted" checked={this.state.DataSource.IsDeleted} />
                                                <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {IsShow == true ?
                        <React.Fragment>
                            <div className="col-lg-12 page-detail">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th className="jsgrid-header-cell" style={{ width: "80%" }}>Mã vận đơn cần tạm ứng</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.DataSource.AdvanceRequest_ShipOrderList.map((item, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td>{item.ShipmentOrderID}</td>
                                                                </tr>
                                                            )
                                                        })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                        : <div></div>}
                    <br />
                    <AdvanceRequestDetail
                        AdvanceRequestID={this.props.match.params.id}
                        DataSource={this.state.DataSource}
                        AdvanceRequestDetailDataSource={this.state.DataSource.AdvanceRequestDetailList}
                    />
                </React.Fragment >
            );
        }
        return (
            <div>
                <label>Đang nạp dữ liệu...</label>
            </div>
        );
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

const Edit = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditCom);
export default Edit;
