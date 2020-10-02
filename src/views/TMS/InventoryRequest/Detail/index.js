import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from "react-router-dom";
import { ModalManager } from "react-dynamic-modal";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";

import {
    DetailAPIPath,
    LoadAPIPath,
    APIHostName,
    TitleFormDetail,
    GirdInventoryRequestDetailColumnList,
    GirdInventoryRequestRVLColumnList

} from "../constants";

import InputGrid from "../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
import { MessageModal } from "../../../../common/components/Modal";
import { showModal, hideModal } from '../../../../actions/modal';
import InventoryRequestInfo from "./InventoryRequestInfo";

class DetailCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DataSource: {},
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsLoadDataComplete: false,
            IsSystem: false,
            InventoryRequest: {},
            InventoryRequestDetail: [],
            InventoryRequestRVL: [],
            CurrentReviewLevelName: '',
            isUserNameReviewLevel: false
        }
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(DetailAPIPath);
        this.callLoadData(this.props.match.params.id);
    }

    callLoadData(id) {
        this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then((apiResult) => {

            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {

                let isUserNameReview = false;
                if (apiResult.ResultObject.InventoryRequest_RVList.length > 0) {
                    const resultUserNameReviewLevel = apiResult.ResultObject.InventoryRequest_RVList.filter((item, index) => {
                        if (item.ReviewLevelID == apiResult.ResultObject.CurrentReviewLevelID) {
                            return item;
                        }
                    })

                    const Username = this.props.AppInfo.LoginInfo.Username;
                    if (resultUserNameReviewLevel.length > 0) {
                        if (resultUserNameReviewLevel[0].UserName.trim() == Username.trim()) {
                            isUserNameReview = true;
                        }
                    }
                    const found = apiResult.ResultObject.InventoryRequest_RVList.find(n => n.ReviewStatus == 2);
                    if (found != undefined) {
                        isUserNameReview = false;
                    }
                }

                this.setState({
                    IsLoadDataComplete: true,
                    isUserNameReviewLevel: isUserNameReview,
                    CurrentReviewLevelName: apiResult.ResultObject.InventoryRequest_RVList.filter(a => a.ReviewLevelID === apiResult.ResultObject.CurrentReviewLevelID)[0].ReviewLevelName,
                    InventoryRequest: apiResult.ResultObject
                });
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

    addNotification(message1, IsError) {
        let cssNotification, iconNotification;
        if (!IsError) {
            cssNotification = "notification-custom-success";
            iconNotification = "fa fa-check"

        } else {
            cssNotification = "notification-danger";
            iconNotification = "fa fa-exclamation"

        }
        this.notificationDOMRef.current.addNotification({
            container: "bottom-right",
            content: (
                <div className={cssNotification}>
                    <div className="notification-custom-icon">
                        <i className={iconNotification} />
                    </div>
                    <div className="notification-custom-content">
                        <div className="notification-close">
                            <span>×</span>
                        </div>
                        <h4 className="notification-title">Thông Báo</h4>
                        <p className="notification-message">{message1}</p>
                    </div>
                </div>
            ),
            dismiss: { duration: 6000 },
            dismissable: { click: true }
        });
    }

    handleRequestRL(id) {
    }

    render() {
        const { IsSystem, InventoryRequest, InventoryRequestRVL, InventoryRequestDetail, isUserNameReviewLevel, CurrentReviewLevelName } = this.state;
        if (this.state.IsLoadDataComplete) {
            return (
                <div className="col-lg-12">
                    <div className="card">
                        <h4 className="card-title">
                            <strong>{TitleFormDetail}</strong>
                        </h4>
                        <div className="card-body">
                            <InventoryRequestInfo
                                InventoryRequest={InventoryRequest}
                            />

                            <div className="card">
                                <div className="card-title group-card-title">
                                    <h4 className="title">Danh sách vật tư kiểm kê</h4>
                                </div>
                                <div className="card-body">
                                    <InputGrid
                                        name="lstInventoryRequestDetail"
                                        controltype="GridControl"
                                        listColumn={GirdInventoryRequestDetailColumnList}
                                        dataSource={InventoryRequest.InventoryRequestDetail}
                                        isHideHeaderToolbar={true}
                                        colspan="12"
                                    />
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-title group-card-title">
                                    <h4 className="title">Danh sách duyệt</h4>
                                </div>
                                <div className="card-body">
                                    <InputGrid
                                        name="lstInventoryRequestRVL"
                                        controltype="GridControl"
                                        listColumn={GirdInventoryRequestRVLColumnList}
                                        dataSource={InventoryRequest.InventoryRequest_RVList}
                                        isHideHeaderToolbar={true}
                                        colspan="12"
                                    />
                                </div>
                            </div>

                        </div>
                        <footer className="card-footer text-right ">
                            {InventoryRequest.IsAutoReview == false ?
                                isUserNameReviewLevel == true ?
                                    <div className="btn-group btn-group-dropdown mr-3">
                                        <button className="btn btn-light dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="true">{CurrentReviewLevelName}</button>
                                        <div className="dropdown-menu" x-placement="bottom-start" >
                                            <button className="dropdown-item" type="button" onClick={() => this.handleRequestRL(1)}>Đồng ý</button>
                                            <button className="dropdown-item" type="button" onClick={() => this.handleRequestRL(2)}>Từ chối</button>
                                        </div>
                                    </div>
                                    :
                                    <div className="btn-group btn-group-dropdown mr-3">
                                        <button className="btn btn-light dropdown-toggle dropdown-toggle-disabled" disabled title="Bạn không có quyền duyệt" type="button" data-toggle="dropdown" aria-expanded="true">{CurrentReviewLevelName}</button>
                                        <div className="dropdown-menu" x-placement="bottom-start" >
                                            <button className="dropdown-item" type="button" onClick={() => this.handleRequestRL(1)}>Đồng ý</button>
                                            <button className="dropdown-item" type="button" onClick={() => this.handleRequestRL(2)}>Từ chối</button>
                                        </div>
                                    </div>
                                : <div></div>

                            }
                            {/* <button className="btn btn-primary mr-3" type="button">Tạo phiếu xuất</button> */}
                            <Link to="/InventoryRequest">
                                <button className="btn btn-sm btn-outline btn-primary" type="button">Quay lại</button>
                            </Link>
                        </footer>
                    </div>
                </div>
            );
        }
        return (
            <label>Đang nạp dữ liệu...</label>
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: () => {
            dispatch(hideModal());
        }
    };
};

const Detail = connect(mapStateToProps, mapDispatchToProps)(DetailCom);
export default Detail;
