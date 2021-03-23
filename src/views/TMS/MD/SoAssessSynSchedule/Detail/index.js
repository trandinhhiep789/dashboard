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
    BackLink,
    EditPagePath,
    DetailPagePath
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callGetCache } from "../../../../../actions/cacheAction";
import { format } from "date-fns";
import { formatDate } from "../../../../../common/library/CommonLib";


class DetailCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.callLoadData = this.callLoadData.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsLoadDataComplete: false,
            IsCloseForm: false
        };
    }

    componentDidMount() {
        this.props.updatePagePath(DetailPagePath);
        this.callLoadData();

    }

    callLoadData() {
        const id = this.props.match.params.id;
        this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then(apiResult => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            } else {
                this.setState({
                    DataSource: apiResult.ResultObject
                });
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
            return (
                <React.Fragment>
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="x_panel">
                            <div className="x_title">
                                <h2>Thông tin lịch đồng bộ dữ liệu đánh giá vận đơn</h2>
                                <div className="clearfix"></div>
                            </div>

                            <div className="x_content col-md-12">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Mã lịch đồng bộ: </span>
                                            <span className="xcode">{this.state.DataSource.SoAssessSynScheduleID}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Ngày đồng bộ: </span>
                                            <span>{this.state.DataSource.SynDateString}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group checkbox customCheckbox">
                                            <span>Lịch tự động thêm: </span>
                                            <label>
                                                <input name="IsAutoAdd" type="checkbox" id="IsAutoAdd" checked={this.state.DataSource.IsAutoAdd} />
                                                <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Mô tả: </span>
                                            <span>{this.state.DataSource.Description}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group checkbox customCheckbox">
                                            <span>Bắt đầu đồng bộ: </span>
                                            <label>
                                                <input name="IsBeginCompute" type="checkbox" id="IsBeginCompute" checked={this.state.DataSource.IsBeginsyn} />
                                                <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group checkbox customCheckbox">
                                            <span>Kết thúc đồng bộ: </span>
                                            <label>
                                                <input name="IsCompletedCompute" type="checkbox" id="IsCompletedCompute" checked={this.state.DataSource.IsCompletedsyn} />
                                                <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Thời gian bắt đầu đồng bộ: </span>
                                            <span>{formatDate(this.state.DataSource.BeginsynTime)}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Thời gian kết thúc đồng bộ: </span>
                                            <span>{formatDate(this.state.DataSource.EndsynTime)}</span>
                                        </div>
                                    </div>

                                </div>


                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Thời gian tính: </span>
                                            {/* <span>{parseFloat((this.state.DataSource.ComputeInterval / 1000) % 60).toFixed(2)}</span> */}
                                            <span>{this.state.DataSource.SynIntervalString}</span>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group checkbox customCheckbox">
                                            <span>Lỗi đồng bộ: </span>
                                            <label>
                                                <input name="IsComputeError" type="checkbox" id="IsComputeError" checked={this.state.DataSource.IssynError} />
                                                <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group checkbox customCheckbox">
                                            <span>Kích hoạt: </span>
                                            <label>
                                                <input name="IsActived" type="checkbox" id="IsActived" checked={this.state.DataSource.IsActived} />
                                                <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group checkbox customCheckbox">
                                            <span>Hệ thống: </span>
                                            <label>
                                                <input name="IsSystem" type="checkbox" id="IsSystem" checked={this.state.DataSource.IsSystem} />
                                                <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Người tạo: </span>
                                            <span>{this.state.DataSource.CreatedUserFullName}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Ngày tạo: </span>
                                            <span>{formatDate(this.state.DataSource.CreatedDate)}</span>
                                        </div>
                                    </div>

                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <span>Thứ tự ưu tiên: </span>
                                            <span>{this.state.DataSource.PriorityIndex}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <span>Nội dung lỗi: </span>
                                            <span className="xcontent"><code>{this.state.DataSource.ErrorContent}</code></span>
                                        </div>
                                    </div>
                                </div>



                            </div>
                        </div>
                    </div>

                   

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

const Detail = connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailCom);
export default Detail;
