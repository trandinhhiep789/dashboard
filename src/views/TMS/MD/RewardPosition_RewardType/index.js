import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import { MessageModal } from "../../../../common/components/Modal";
import DataGrid from "../../../../common/components/DataGrid";
import { MODAL_TYPE_CONFIRMATION } from '../../../../constants/actionTypes';
import { showModal, hideModal } from '../../../../actions/modal';
import { GetMLObjectData } from "../../../../common/library/form/FormLib";
import Collapsible from 'react-collapsible';
import {
    AddAPIPath, UpdateAPIPath, DeleteAPIPath, APIHostName,
    ModalColumnList_Insert, ModalColumnList_Edit, DataGridColumnList, MLObjectDefinition
} from "./constants";
import ReactNotification from "react-notifications-component";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { callGetCache, callClearLocalCache, callGetUserCache } from "../../../../actions/cacheAction";
import { GET_CACHE_USER_FUNCTION_LIST, INVENTORYREQUESTTYPE_ADD, INVENTORYREQUESTTYPE_DELETE, INVENTORYREQUESTTYPE_UPDATE, REWARDPOSITION_REWARDTYPE_ADD, REWARDPOSITION_REWARDTYPE_DELETE, REWARDPOSITION_REWARDTYPE_UPDATE } from "../../../../constants/functionLists";

class RewardPosition_RewardTypeCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleInsert = this.handleInsert.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleModalChange = this.handleModalChange.bind(this);
        this.onClose = this.onClose.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false,
            cssNotification: "",
            iconNotification: "",
            RewardPosition_RewardType_DataSource: this.props.RewardPosition_RewardType_DataSource ? this.props.RewardPosition_RewardType_DataSource : [],
            RewardPositionID: this.props.RewardPositionID,
            IsInsert: true,
            ModalColumnList_Insert: ModalColumnList_Insert,
            ModalColumnList_Edit: ModalColumnList_Edit
        };
        this.notificationDOMRef = React.createRef();
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.RewardPositionID !== this.state.RewardPositionID) {
            this.setState({ RewardPositionID: nextProps.RewardPositionID });
        }

        if (nextProps.RewardPosition_RewardType_DataSource !== this.state.RewardPosition_RewardType_DataSource) {
            this.setState({ RewardPosition_RewardType_DataSource: nextProps.RewardPosition_RewardType_DataSource });
        }
    }

    componentDidMount() {
        this.checkPermission();
    }

    handleCloseMessage() {
        //if (!this.state.IsCallAPIError) this.setState({ IsCloseForm: true });
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


    checkPermission() {
        let IsAllowedAdd = false;
        let IsAllowedUpdate = false;
        let IsAllowedDelete = false;

        this.props.callGetUserCache(GET_CACHE_USER_FUNCTION_LIST).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                let isAllowAdd = result.ResultObject.CacheData.filter(x => x.FunctionID == REWARDPOSITION_REWARDTYPE_ADD);
                if (isAllowAdd && isAllowAdd.length > 0) {
                    IsAllowedAdd = true;
                }

                let isAllowUpdate = result.ResultObject.CacheData.filter(x => x.FunctionID == REWARDPOSITION_REWARDTYPE_UPDATE);
                if (isAllowUpdate && isAllowUpdate.length > 0) {
                    IsAllowedUpdate = true;
                }

                let isAllowDelete = result.ResultObject.CacheData.filter(x => x.FunctionID == REWARDPOSITION_REWARDTYPE_DELETE);
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

    onClose() {

    }

    displayInputControl(elementValue) {
        var selector = document.getElementsByClassName("form-row");
            selector[8].style.display = elementValue ? "" : "none";
    }

    handleModalChange(formData, formValidation, elementName, elementValue) {
        if (elementName == "IsLimitTotalReward") {
            var selector = document.getElementsByClassName("form-row");
            selector[8].style.display = elementValue ? "" : "none";
        }
    }

    handleInsert(MLObjectDefinition, modalElementList, dataSource) {
        if (!this.state.IsAllowedAdd) {
            this.showMessage("Bạn không có quyền");
            return;
        }
        this.setState({ IsInsert: true });
        this.props.showModal(MODAL_TYPE_CONFIRMATION, {
            title: 'Thêm mới loại thưởng của một vị trí thưởng',
            autoCloseModal: false,
            onValueChange: this.handleModalChange,
            onClose: this.onClose,
            onConfirm: (isConfirmed, formData) => {
                if (isConfirmed) {
                    let MLObject = GetMLObjectData(MLObjectDefinition, formData, dataSource);
                    if (MLObject) {
                        MLObject.RewardPositionID = this.state.RewardPositionID;
                        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
                        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
                        this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then(apiResult => {
                            if (!apiResult.IsError) {
                                if (this.props.onComponentChange) {
                                    this.props.onComponentChange();
                                }
                                this.props.hideModal();
                            }
                            //this.showMessage(apiResult.Message);
                            this.addNotification(apiResult.Message, apiResult.IsError);
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
        let _RewardPosition_RewardType_DataSource = {};
        this.state.RewardPosition_RewardType_DataSource.map((item, index) => {
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
                _RewardPosition_RewardType_DataSource = item;
            }
        });

        let _IsLimitTotalReward = _RewardPosition_RewardType_DataSource.IsLimitTotalReward;
        setTimeout(() => {
            this.displayInputControl(_IsLimitTotalReward);
        }, 100);

        this.props.showModal(MODAL_TYPE_CONFIRMATION, {
            title: 'Chỉnh sửa loại thưởng của một vị trí thưởng',
            onValueChange: this.handleModalChange,
            onClose: this.onClose,
            onConfirm: (isConfirmed, formData) => {
                if (isConfirmed) {
                    let MLObject = GetMLObjectData(MLObjectDefinition, formData, _RewardPosition_RewardType_DataSource);
                    if (MLObject) {
                        MLObject.RewardPositionID = this.state.RewardPositionID;
                        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
                        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
                        this.props.callFetchAPI(APIHostName, UpdateAPIPath, MLObject).then(apiResult => {
                            if (!apiResult.IsError) {
                                if (this.props.onComponentChange) {
                                    this.props.onComponentChange();
                                }
                                this.props.hideModal();
                            }
                            //this.showMessage(apiResult.Message);
                            this.addNotification(apiResult.Message, apiResult.IsError);
                        });
                        //this.resetCombobox();
                        //console.log("edit", MLObject);
                    }
                }
            },
            modalElementList: ModalColumnList_Edit,
            formData: _RewardPosition_RewardType_DataSource
        });
    }


    handleDelete(deleteList, pkColumnName) {
        // if(!this.state.IsAllowedDelete){
        //     this.showMessage("Bạn không có quyền");
        //     return;
        // }
        let listMLObject = [];
        let _RewardPosition_RewardType_DataSource = this.state.RewardPosition_RewardType_DataSource;
        deleteList.map((row, index) => {
            let MLObject = {};
            pkColumnName.map((pkItem, pkIndex) => {
                MLObject[pkItem.key] = row.pkColumnName[pkIndex].value;
            });

            let _deleteList = _RewardPosition_RewardType_DataSource.filter(item => item.RewardPositionCSID == MLObject.RewardPositionCSID);
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
            //this.showMessage(apiResult.Message);
            this.addNotification(apiResult.Message, apiResult.IsError);
        });

    }


    render() {
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }

        return (
            <div className="sub-grid detail">
                <ReactNotification ref={this.notificationDOMRef} />
                <DataGrid listColumn={DataGridColumnList}
                    dataSource={this.state.RewardPosition_RewardType_DataSource}
                    modalElementList={ModalColumnList_Insert}
                    MLObjectDefinition={MLObjectDefinition}
                    IDSelectColumnName={"chkSelectRewardPositionCSID"}
                    PKColumnName={"RewardPositionCSID"}
                    onDeleteClick={this.handleDelete}
                    onInsertClick={this.handleInsert}
                    onInsertClickEdit={this.handleEdit}
                    IsAutoPaging={false}
                    //RowsPerPage={10}
                    IsCustomAddLink={true}
                    headingTitle={"Loại thưởng của một vị trí thưởng"}
                />
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

const RewardPosition_RewardType = connect(mapStateToProps, mapDispatchToProps)(RewardPosition_RewardTypeCom);
export default RewardPosition_RewardType;
