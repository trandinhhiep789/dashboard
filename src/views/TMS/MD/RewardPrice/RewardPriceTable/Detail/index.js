import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from "react-router-dom";
import { ModalManager } from "react-dynamic-modal";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../../actions/pageAction";
import InputGridControl from "../../../../../../common/components/FormContainer/FormControl/InputGrid/InputGridControl.js";
import {
    APIHostName,
    DetailPagePath,
    LoadNewAPIPath,
    TitleFormDetail,
    DataGridColumnItemListRPTDetail,
    TitleFromRPTDetail,
    DeleteAPIRPTExceptionPath,
    TitleFromRPTException,
    DataGridColumnItemListRPTException,
    DeleteAPIRPTDetailPath

} from "../constants";
import { MessageModal } from "../../../../../../common/components/Modal";
import RewardPriceTableInfo from "./RewardPriceTableInfo";

import { showModal, hideModal } from '../../../../../../actions/modal';
import { MODAL_TYPE_COMMONTMODALS } from '../../../../../../constants/actionTypes';
import ReactNotification from "react-notifications-component";
import RewardPriceTableDetail from "../../RewardPriceTableDetail";
import UpdateRewardPriceTableDetail from "../../RewardPriceTableDetail/Update.js";
import RewardPriceTableException from "../../RewardPriceTableException";


class DetailCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputChangeObjItem = this.handleInputChangeObjItem.bind(this);
        this.handleInputChangeObjExceptionItem = this.handleInputChangeObjExceptionItem.bind(this);
        this.state = {
            DataSource: {},
            CallAPIMessage: "",
            IsCallAPIError: false,
            RewardPriceTableInfo: {},
            PageNumber: 1,
            Abiliti: {},
            IsLoadDataComplete: false,
            IsSystem: false,
            RewardPriceTableID: ''
        }
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(DetailPagePath);
        this.callLoadData(this.props.match.params.id);
        this.setState({
            RewardPriceTableID: this.props.match.params.id
        })
    }

    callLoadData(id) {
        this.props.callFetchAPI(APIHostName, LoadNewAPIPath, id).then((apiResult) => {
             console.log('apiResult', apiResult)
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {


                this.setState({
                    // DataSource: apiResult.ResultObject,
                    DataSource: apiResult.ResultObject,
                    IsLoadDataComplete: true,
                    IsSystem: apiResult.ResultObject.IsSystem
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

    handleInputChangeObjItem(id, apiResult) {
        if (apiResult.IsError) {
            this.showMessage(apiResult.Message);
        }
        else {
            this.addNotification(apiResult.Message, apiResult.IsError);
            this.callLoadData(id);
            this.props.hideModal();
        }

    }

    handleItemInsertRPTDetail() {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Thêm chi tiết đơn giá',
            content: {
                text: <RewardPriceTableDetail
                    dataSource={this.state.DataSource}
                    onInputChangeObj={this.handleInputChangeObjItem}

                />
            },
            maxWidth: '1000px'
        });
    }

    handleItemEditRPTDetail(index) {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Cập nhật chi tiết đơn giá',
            content: {
                text: <RewardPriceTableDetail
                    dataSource={this.state.DataSource}
                    index={index}
                    onInputChangeObj={this.handleInputChangeObjItem}

                />
            },
            maxWidth: '1000px'
        });
    }

    handleItemDeleteRPTDetail(index) {

        const { RewardPriceTableID, DataSource } = this.state;

        const resultItem = DataSource.RewardPriceTableDetailList[index];
        let MLObject = {};
        MLObject.RewardPriceTableDetailID = resultItem.RewardPriceTableDetailID.trim();

        this.props.callFetchAPI(APIHostName, DeleteAPIRPTDetailPath, MLObject).then((apiResult) => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.addNotification(apiResult.Message, apiResult.IsError);
            if (!apiResult.IsError) {
                this.callLoadData(RewardPriceTableID);
            }
        });
    }

    handleInputChangeObjExceptionItem(id, apiResult) {
        // console.log("â", id, apiResult)
        if (apiResult.IsError) {
            this.showMessage(apiResult.Message);
        }
        else {
            this.addNotification(apiResult.Message, apiResult.IsError);
            this.callLoadData(id);
            this.props.hideModal();
        }

    }

    handleItemInsertRPTException() {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Thêm chi tiết đơn giá ngoại lệ',
            content: {
                text: <RewardPriceTableException
                    dataSource={this.state.DataSource}
                    onInputChangeObj={this.handleInputChangeObjExceptionItem}

                />
            },
            maxWidth: '1000px'
        });
    }

    handleItemEditRPTException(index) {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Cập nhật chi tiết đơn giá ngoại lệ',
            content: {
                text: <RewardPriceTableException
                    dataSource={this.state.DataSource}
                    index={index}
                    onInputChangeObj={this.handleInputChangeObjExceptionItem}

                />
            },
            maxWidth: '1000px'
        });
    }

    handleItemDeleteRPTException(index) {
        const { RewardPriceTableID, DataSource } = this.state;

        const resultItem = DataSource.RewardPriceTable_ExceptionList[index];
        let MLObject = {};
        MLObject.RewardPriceTableExceptionID = resultItem.RewardPriceTableExceptionID.trim();

        this.props.callFetchAPI(APIHostName, DeleteAPIRPTExceptionPath, MLObject).then((apiResult) => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.addNotification(apiResult.Message, apiResult.IsError);
            if (!apiResult.IsError) {
                this.callLoadData(RewardPriceTableID);
            }
        });
    }

    addNotification(message1, IsError) {
        let cssNotification, iconNotification;
        if (!IsError) {
            cssNotification = "notification-custom-success";
            iconNotification = "fa fa-check"
            // this.setState({
            //     cssNotification: "notification-custom-success",
            //     iconNotification: "fa fa-check"
            // });
        } else {
            cssNotification = "notification-danger";
            iconNotification = "fa fa-exclamation"
            // this.setState({
            //     cssNotification: "notification-danger",
            //     iconNotification: "fa fa-exclamation"
            // });
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
        const { IsSystem } = this.state;
        if (this.state.IsLoadDataComplete) {
            return (
                <div className="col-lg-12">
                    <ReactNotification ref={this.notificationDOMRef} />
                    <div className="card">
                        <h4 className="card-title">
                            <strong>{TitleFormDetail}</strong>
                        </h4>
                        <div className="card-body">

                            <RewardPriceTableInfo
                                RewardPriceTableInfo={this.state.DataSource}
                            />

                            <InputGridControl
                                name="RewardPriceTableDetailList"
                                controltype="InputGridControl"
                                title={TitleFromRPTDetail}
                                IDSelectColumnName={"RewardPriceTableDetailID"}
                                PKColumnName={"RewardPriceTableDetailID"}
                                listColumn={DataGridColumnItemListRPTDetail}
                                dataSource={this.state.DataSource.RewardPriceTableDetailList}
                                onInsertClick={this.handleItemInsertRPTDetail.bind(this)}
                                onEditClick={this.handleItemEditRPTDetail.bind(this)}
                                onDeleteClick={this.handleItemDeleteRPTDetail.bind(this)}
                                ref={this.gridref}
                                isSystem={IsSystem}
                            />

                            <InputGridControl
                                name="RewardPriceTableExceptionList"
                                controltype="InputGridControl"
                                title={TitleFromRPTException}
                                IDSelectColumnName={"RewardPriceTableExceptionID"}
                                PKColumnName={"RewardPriceTableExceptionID"}
                                listColumn={DataGridColumnItemListRPTException}
                                dataSource={this.state.DataSource.RewardPriceTable_ExceptionList}
                                onInsertClick={this.handleItemInsertRPTException.bind(this)}
                                onEditClick={this.handleItemEditRPTException.bind(this)}
                                onDeleteClick={this.handleItemDeleteRPTException.bind(this)}
                                ref={this.gridref}
                                isSystem={IsSystem}
                            />

                        </div>
                        <footer className="card-footer text-right">
                            <Link to="/RewardPriceTable">
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
