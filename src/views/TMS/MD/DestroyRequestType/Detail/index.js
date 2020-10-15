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
    DetailPagePath
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callGetCache } from "../../../../../actions/cacheAction";
import { format } from "date-fns";
import { formatDate } from "../../../../../common/library/CommonLib";
import DestroyRequestType_Product from "../../DestroyRequestType_Product";
import DestroyRequestType_ReviewLevel from "../../DestroyRequestType_ReviewLevel";
import DestroyRequestType_ReviewLevel_User from "../../DestroyRequestType_ReviewLevel_User";


class DetailCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.callLoadData = this.callLoadData.bind(this);
        this.onComponentChange = this.onComponentChange.bind(this);
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
                this.setState({ DataSource: apiResult.ResultObject });
            }
            this.setState({
                IsLoadDataComplete: true
            });
            //console.log("apiResult", apiResult);
        });
    }

    onComponentChange() {
        this.callLoadData();
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
                                <h2>Thông tin loại yêu cầu hủy vật tư</h2>
                                <div className="clearfix"></div>
                            </div>

                            <div className="x_content col-md-12">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Mã loại yêu cầu hủy vật tư: </span>
                                            <span className="xcode">{this.state.DataSource.DestroyRequestTypeID}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Tên loại yêu cầu hủy vật tư: </span>
                                            <span>{this.state.DataSource.DestroyRequestTypeName}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Quyền thêm: </span>
                                            <span>{this.state.DataSource.AddFunctionName}</span>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span> Thứ tự hiển thị: </span>
                                            <span>{this.state.DataSource.OrderIndex}</span>
                                        </div>
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group checkbox customCheckbox">
                                            <span>Có tự động duyệt: </span>
                                            <label>
                                                <input name="IsAutoReview" type="checkbox" id="IsAutoReview" checked={this.state.DataSource.IsAutoReview} />
                                                <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group checkbox customCheckbox">
                                            <span>Có tự động xuất: </span>
                                            <label>
                                                <input name="IsAutoOutput" type="checkbox" id="IsAutoOutput" checked={this.state.DataSource.IsAutoOutput} />
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
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span> Mô tả: </span>
                                            <span>{this.state.DataSource.Description}</span>
                                        </div>
                                    </div>
                                </div>



                            </div>
                        </div>
                    </div>

                    <br />
                    <DestroyRequestType_Product
                        DestroyRequestTypeID={this.props.match.params.id}
                        DestroyRequestType_Product_DataSource={this.state.DataSource.ListDestroyRequestType_Product ? this.state.DataSource.ListDestroyRequestType_Product : []}
                        onComponentChange={this.onComponentChange}
                    />
                    <br />
                    {
                        !this.state.DataSource.IsAutoReview ?
                            <DestroyRequestType_ReviewLevel
                                DestroyRequestTypeID={this.props.match.params.id}
                                DestroyRequestType_ReviewLevel_DataSource={this.state.DataSource.ListDestroyRequestType_ReviewLevel ? this.state.DataSource.ListDestroyRequestType_ReviewLevel : []}
                                onComponentChange={this.onComponentChange}
                            />
                            : ""
                    }

                    {/* <DestroyRequestType_ReviewLevel_User
                        DestroyRequestTypeID={this.props.match.params.id}
                        DestroyRequestType_ReviewLevel_DataSource={this.state.DataSource.ListDestroyRequestType_ReviewLevel ? this.state.DataSource.ListDestroyRequestType_ReviewLevel : []}
                        DestroyRequestType_ReviewLevel_User_DataSource={this.state.DataSource.ListDestroyRequestType_ReviewLevel_User ? this.state.DataSource.ListDestroyRequestType_ReviewLevel_User : []}
                        onComponentChange={this.onComponentChange}
                    /> */}
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
