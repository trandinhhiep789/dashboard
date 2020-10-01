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
            InventoryRequestDetail:[],
            InventoryRequestRVL: []
        }
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(DetailAPIPath);
        this.callLoadData(this.props.match.params.id);
    }

    callLoadData(id) {
        this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then((apiResult) => {
            console.log("apiResult", apiResult, id)
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {


                this.setState({
                    IsLoadDataComplete: true,
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

    render() {
        const { IsSystem, InventoryRequest, InventoryRequestRVL, InventoryRequestDetail } = this.state;
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
                            <div className="btn-group btn-group-dropdown mr-3">
                                <button className="btn btn-light dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="true">mức 1</button>
                                <div className="dropdown-menu" x-placement="bottom-start" >
                                    <button className="dropdown-item" type="button" >Đồng ý</button>
                                    <button className="dropdown-item" type="button">Từ chối</button>
                                </div>
                            </div>
                            <button className="btn btn-primary mr-3" type="button">Tạo phiếu xuất</button>
                            <Link to="/DestroyRequest">
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
