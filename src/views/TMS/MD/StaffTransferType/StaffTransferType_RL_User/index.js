import React from "react";
import { connect } from "react-redux";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import { ModalManager } from "react-dynamic-modal";
import { MessageModal } from "../../../../../common/components/Modal";
import DataGrid from "../../../../../common/components/DataGrid";
import { MODAL_TYPE_COMMONTMODALS } from '../../../../../constants/actionTypes';
import { showModal, hideModal } from '../../../../../actions/modal';
import {
    listColumn, ModalColumnList_Insert, MLObjectDefinition, APIHostName, DeleteAPIPath
} from "./constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callGetCache, callClearLocalCache, callGetUserCache } from "../../../../../actions/cacheAction";
import ReviewLevel_User from './ReviewLevel_User';
import { GET_CACHE_USER_FUNCTION_LIST, STAFFTRANSFERTYPE_ADD, STAFFTRANSFERTYPE_DELETE } from '../../../../../constants/functionLists'

class StaffTransferType_RL_User extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            cssNotification: "",
            iconNotification: "",
            DataSource: this.props.DataSource,
            IsAllowedAdd: false,
            IsAllowedDelete: false
        };

        this.notificationDOMRef = React.createRef();
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleInsert = this.handleInsert.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.onClose = this.onClose.bind(this);
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.StaffTransferTypeID !== this.state.StaffTransferTypeID) {
            this.setState({ StaffTransferTypeID: nextProps.StaffTransferTypeID });
        }

        if (nextProps.DataSource !== this.state.DataSource) {
            this.setState({ DataSource: nextProps.DataSource });
        }
    }

    componentDidMount() {
        this.checkPermission();
    }

    handleCloseMessage() {

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
        if (!IsError) {
            this.setState({
                cssNotification: "notification-custom-success",
                iconNotification: "fa fa-check"
            });
        } else {
            this.setState({
                cssNotification: "notification-danger",
                iconNotification: "fa fa-exclamation"
            });
        }
        this.notificationDOMRef.current.addNotification({
            container: "bottom-right",
            content: (
                <div className={this.state.cssNotification}>
                    <div className="notification-custom-icon">
                        <i className={this.state.iconNotification} />
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

    onChangeUser(name, objUser) {
        if (name == "StoreUser") {
            let validationStoreUser = ""
            if (objUser.value == "") {
                validationStoreUser = "vui lòng chọn nhân viên";
            }

            let objStoreUser = {
                UserName: objUser.value,
                FullName: objUser.FullName
            }
            this.setState({
                objStoreUser: objStoreUser,
                validationStoreUser: validationStoreUser
            });
        }
        else {
            this.setState({
                Username: objUser.value,
                DepartmentName: objUser.DepartmentName,
                PositionName: objUser.PositionName,
                Address: objUser.Address,
                FullName: objUser.label
            });

            if (objUser.value != "") {
                const postData = [
                    {
                        SearchKey: "@USERNAME",
                        SearchValue: objUser.value
                    }
                ];
                this.callLoadData(postData);
            }
        }
    }

    checkPermission() {
        let IsAllowedAdd = false;
        let IsAllowedDelete = false;

        this.props.callGetUserCache(GET_CACHE_USER_FUNCTION_LIST).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                let isAllowAdd = result.ResultObject.CacheData.filter(x => x.FunctionID == STAFFTRANSFERTYPE_ADD);
                if (isAllowAdd && isAllowAdd.length > 0) {
                    IsAllowedAdd = true;
                }

                let isAllowDelete = result.ResultObject.CacheData.filter(x => x.FunctionID == STAFFTRANSFERTYPE_DELETE);
                if (isAllowDelete && isAllowDelete.length > 0) {
                    IsAllowedDelete = true;
                }
                this.setState({
                    IsAllowedAdd: IsAllowedAdd,
                    IsAllowedDelete: IsAllowedDelete
                });
            }
        });
    }

    onComplete(message, isError) {
        this.showMessage(message);
    }

    onClose() {
        this.props.hideModal();
    }

    handleInsert(MLObjectDefinition, modalElementList, dataSource) {
        if (!this.state.IsAllowedAdd) {
            this.showMessage("Bạn không có quyền");
            return;
        }

        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Người duyệt',
            content: {
                text: <ReviewLevel_User
                    ReviewLevelID={this.props.ReviewLevelID}
                    onComponentChange={this.props.onComponentChange}
                    onComplete={this.onComplete.bind(this)}
                    closePopup={this.onClose}
                />
            },
            maxWidth: '1000px'
        })
    }


    handleDelete(deleteList, pkColumnName) {
        if (!this.state.IsAllowedDelete) {
            this.showMessage("Bạn không có quyền");
            return;
        }
        let listMLObject = [];
        let _RV_User_DataSource = this.state.DataSource;
        deleteList.map((row, index) => {
            let MLObject = {};
            pkColumnName.map((pkItem, pkIndex) => {
                MLObject[pkItem.key] = row.pkColumnName[pkIndex].value;
            });

            let _deleteList = _RV_User_DataSource.filter(item => item.CSID == MLObject.CSID);
            if (_deleteList && _deleteList.length > 0) {
                _deleteList[0].DeletedUser = this.props.AppInfo.LoginInfo.Username;
                listMLObject.push(_deleteList[0]);
            }

        });

        this.props.callFetchAPI(APIHostName, DeleteAPIPath, listMLObject).then(apiResult => {
            if (!apiResult.IsError) {
                if (this.props.onComponentChange) {
                    this.props.onComponentChange();
                }
                this.props.hideModal();
            }

            this.addNotification(apiResult.Message, apiResult.IsError);
        });

    }

    render() {
        return (
            <div className="sub-grid detail">
                <ReactNotification ref={this.notificationDOMRef} />
                <DataGrid
                    listColumn={listColumn}
                    dataSource={this.state.DataSource}
                    modalElementList={ModalColumnList_Insert}
                    MLObjectDefinition={MLObjectDefinition}
                    IDSelectColumnName={"chkSelectCSID"}
                    PKColumnName={"CSID"}
                    onDeleteClick={this.handleDelete}
                    onInsertClick={this.handleInsert}
                    IsAutoPaging={false}
                    IsCustomAddLink={true}
                    headingTitle={"Người duyệt"}
                />
            </div>
        );
    }
}

StaffTransferType_RL_User.defaultProps = {
    DataSource: []
};

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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: () => {
            dispatch(hideModal());
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
        callClearLocalCache: (cacheKeyID) => {
            return dispatch(callClearLocalCache(cacheKeyID));
        },
        callGetUserCache: (cacheKeyID) => {
            return dispatch(callGetUserCache(cacheKeyID));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StaffTransferType_RL_User);