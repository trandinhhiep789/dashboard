import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import { MessageModal } from "../../../../../common/components/Modal";
import DataGrid from "../../../../../common/components/DataGrid";
import { MODAL_TYPE_CONFIRMATION } from '../../../../../constants/actionTypes';
import { showModal, hideModal } from '../../../../../actions/modal';
import { GetMLObjectData } from "../../../../../common/library/form/FormLib";
import {
    listColumn, BackLink, MLObjectDefinition, ModalColumnList_Insert, APIAdd, APIHostName, ModalColumnList_Edit, UpdateAPIPath, DeleteAPIPath
} from "./constants";
import ReactNotification from "react-notifications-component";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callGetCache, callClearLocalCache, callGetUserCache } from "../../../../../actions/cacheAction";
import { GET_CACHE_USER_FUNCTION_LIST, STAFFTRANSFERTYPE_ADD, STAFFTRANSFERTYPE_UPDATE, STAFFTRANSFERTYPE_DELETE } from "../../../../../constants/functionLists";

class StaffTransferType_RVLevel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            IsCallAPIError: false,
            IsCloseForm: false,
            cssNotification: "",
            iconNotification: "",
            StaffTransferType_RVLevel_DataSource: this.props.StaffTransferType_RVLevel_DataSource ? this.props.StaffTransferType_RVLevel_DataSource : [],
            StaffTransferTypeID: this.props.StaffTransferTypeID,
            IsInsert: true,
            IsAllowedAdd: false,
            IsAllowedUpdate: false,
            IsAllowedDelete: false
        };

        this.notificationDOMRef = React.createRef();
        this.handleInsert = this.handleInsert.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.onClose = this.onClose.bind(this);
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.InventoryRequestTypeID !== this.state.InventoryRequestTypeID) {
            this.setState({ InventoryRequestTypeID: nextProps.InventoryRequestTypeID });
        }

        if (nextProps.StaffTransferType_RVLevel_DataSource !== this.state.StaffTransferType_RVLevel_DataSource) {
            this.setState({ StaffTransferType_RVLevel_DataSource: nextProps.StaffTransferType_RVLevel_DataSource });
        }
    }

    componentDidMount() {
        this.checkPermission();
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


    checkPermission() {
        let IsAllowedAdd = false;
        let IsAllowedUpdate = false;
        let IsAllowedDelete = false;

        this.props.callGetUserCache(GET_CACHE_USER_FUNCTION_LIST).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                let isAllowAdd = result.ResultObject.CacheData.filter(x => x.FunctionID == STAFFTRANSFERTYPE_ADD);
                if (isAllowAdd && isAllowAdd.length > 0) {
                    IsAllowedAdd = true;
                }

                let isAllowUpdate = result.ResultObject.CacheData.filter(x => x.FunctionID == STAFFTRANSFERTYPE_UPDATE);
                if (isAllowUpdate && isAllowUpdate.length > 0) {
                    IsAllowedUpdate = true;
                }

                let isAllowDelete = result.ResultObject.CacheData.filter(x => x.FunctionID == STAFFTRANSFERTYPE_DELETE);
                if (isAllowDelete && isAllowDelete.length > 0) {
                    IsAllowedDelete = true;
                }
                this.setState({
                    IsAllowedAdd: IsAllowedAdd,
                    IsAllowedUpdate: IsAllowedUpdate,
                    IsAllowedDelete: IsAllowedDelete
                });
            }
        });
    }

    onClose() { }

    handleInsert(MLObjectDefinition, modalElementList, dataSource) {
        if (!this.state.IsAllowedAdd) {
            this.showMessage("Bạn không có quyền");
            return;
        }
        this.setState({ IsInsert: true });
        this.props.showModal(MODAL_TYPE_CONFIRMATION, {
            title: 'Thêm mới mức duyệt',
            autoCloseModal: false,
            onClose: this.onClose,
            onConfirm: (isConfirmed, formData) => {
                if (isConfirmed) {
                    let MLObject = GetMLObjectData(MLObjectDefinition, formData, dataSource);
                    if (MLObject) {
                        MLObject.StaffTransferTypeID = this.state.StaffTransferTypeID;
                        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
                        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;

                        this.props.callFetchAPI(APIHostName, APIAdd, MLObject).then(apiResult => {

                            if (!apiResult.IsError) {
                                this.props.onComponentChange();
                                this.props.hideModal();
                            }
                            this.showMessage(apiResult.Message);
                        });
                    }
                }
            },
            modalElementList: modalElementList,
        });
    }

    handleEdit(value, pkColumnName) {
        if (!this.state.IsAllowedUpdate) {
            this.showMessage("Bạn không có quyền");
            return;
        }
        this.setState({ IsInsert: false });
        let _StaffTransferType_RVLevel_DataSource = {};
        this.state.StaffTransferType_RVLevel_DataSource.map((item, index) => {
            let isMath = false;
            for (var j = 0; j < pkColumnName.length; j++) {
                if (item[pkColumnName[j].key] != value.pkColumnName[j].value) {
                    isMath = false;
                    break;
                }
                else {
                    isMath = true;
                }
            }
            if (isMath) {
                _StaffTransferType_RVLevel_DataSource = item;
            }
        });

        this.props.showModal(MODAL_TYPE_CONFIRMATION, {
            title: 'Chỉnh sửa mức duyệt',
            onClose: this.onClose,
            onConfirm: (isConfirmed, formData) => {
                if (isConfirmed) {
                    let MLObject = GetMLObjectData(MLObjectDefinition, formData, _StaffTransferType_RVLevel_DataSource);
                    if (MLObject) {
                        MLObject.StaffTransferTypeID = this.state.StaffTransferTypeID;
                        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
                        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
                        this.props.callFetchAPI(APIHostName, UpdateAPIPath, MLObject).then(apiResult => {
                            if (!apiResult.IsError) {
                                if (this.props.onComponentChange) {
                                    this.props.onComponentChange();
                                }
                                this.props.hideModal();
                            }
                            this.showMessage(apiResult.Message);
                        });
                    }
                }
            },
            modalElementList: ModalColumnList_Edit,
            formData: _StaffTransferType_RVLevel_DataSource
        });
    }


    handleDelete(deleteList, pkColumnName) {
        if (!this.state.IsAllowedDelete) {
            this.showMessage("Bạn không có quyền");
            return;
        }
        let listMLObject = [];
        deleteList.map((row, index) => {
            let MLObject = {};
            pkColumnName.map((pkItem, pkIndex) => {
                MLObject[pkItem.key] = row.pkColumnName[pkIndex].value;
            });

            MLObject.DeletedUser = this.props.AppInfo.LoginInfo.Username;
            listMLObject.push(MLObject);
        });


        this.props.callFetchAPI(APIHostName, DeleteAPIPath, listMLObject).then(apiResult => {
            if (!apiResult.IsError) {
                if (this.props.onComponentChange) {
                    this.props.onComponentChange();
                }
                this.props.hideModal();
            }
            // this.addNotification(apiResult.Message, apiResult.IsError);
            this.showMessage(apiResult.Message);
        });

    }


    render() {
        const { IsCloseForm, StaffTransferType_RVLevel_DataSource } = this.state;

        if (IsCloseForm) {
            return <Redirect to={BackLink} />;
        }

        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <DataGrid
                    listColumn={listColumn}
                    dataSource={StaffTransferType_RVLevel_DataSource}
                    modalElementList={ModalColumnList_Insert}
                    MLObjectDefinition={MLObjectDefinition}
                    IDSelectColumnName={"chkSelectReviewLevelID"}
                    PKColumnName={"ReviewLevelID"}
                    onDeleteClick={this.handleDelete}
                    onInsertClick={this.handleInsert}
                    onInsertClickEdit={this.handleEdit}
                    IsAutoPaging={false}
                    IsCustomAddLink={true}
                    headingTitle={"Mức duyệt"}
                />
            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(StaffTransferType_RVLevel);
