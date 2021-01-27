import React from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import SimpleForm from "../../../../../../common/components/Form/SimpleForm";
import { MessageModal } from "../../../../../../common/components/Modal";
import {
    APIHostName,
    LoadAPIPath,
    BackLink,
    EditPagePath,
    DetailPagePath
} from "../constants";
import { callFetchAPI } from "../../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../../actions/pageAction";
import { callGetCache } from "../../../../../../actions/cacheAction";
import { format } from "date-fns";
import { formatDate } from "../../../../../../common/library/CommonLib";
import PartnerUserRole from "../../PartnerUserRole";
import PartnerUserIDDocument from "../../ParnerUserIDDocument";


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
                apiResult.ResultObject.Birthday = apiResult.ResultObject.BirthdayString;
                this.setState({
                    DataSource: apiResult.ResultObject,
                    ListPartnerUser_Role: apiResult.ResultObject.ListPartnerUser_Role ? apiResult.ResultObject.ListPartnerUser_Role : [],
                    ListPartnerUser_IDDocument: apiResult.ResultObject.ListPartnerUser_IDDocument ? apiResult.ResultObject.ListPartnerUser_IDDocument : []
                });
                //console.log("ListPartnerUser_Role", apiResult.ResultObject.ListPartnerUser_Role, apiResult.ResultObject.ListPartnerUser_IDDocument);
            }
            this.setState({
                IsLoadDataComplete: true
            });
        });
    }

    onComponentSubmitChange() {
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
                                <h2>Thông tin người dùng nhà cung cấp</h2>
                                <div className="clearfix"></div>
                            </div>

                            <div className="x_content col-md-12">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Tên truy cập người dùng: </span>
                                            <span className="xcode">{this.state.DataSource.UserName}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Nhà cung cấp: </span>
                                            <span>{this.state.DataSource.PartnerName}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Họ tên đầy đủ: </span>
                                            <span>{this.state.DataSource.FullName}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Điện thoại: </span>
                                            <span>{this.state.DataSource.PhoneNumber}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Ngày sinh: </span>
                                            <span>{this.state.DataSource.Birthday}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Email: </span>
                                            <span>{this.state.DataSource.Email}</span>
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
                                            <span>Người cập nhật: </span>
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
                                    {/* <div className="col-md-6">
                                        <div className="form-group">
                                            <span> Thứ tự hiển thị: </span>
                                            <span>{this.state.DataSource.OrderIndex}</span>
                                        </div>
                                    </div> */}
                                </div>



                            </div>
                        </div>
                    </div>

                    <PartnerUserRole
                        UserName={this.props.match.params.id}
                        DataSource={this.state.ListPartnerUser_Role}
                        onComponentSubmitChange={this.onComponentSubmitChange.bind(this)}
                    />

                    <PartnerUserIDDocument
                        UserName={this.props.match.params.id}
                        DataSource={this.state.ListPartnerUser_IDDocument}
                        onComponentSubmitChange={this.onComponentSubmitChange.bind(this)}
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

const Detail = connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailCom);
export default Detail;
