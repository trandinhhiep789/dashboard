import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import { MessageModal } from "../../../../common/components/Modal";
import DataGrid from "../../../../common/components/DataGrid";
import { MODAL_TYPE_CONFIRMATION, MODAL_TYPE_COMMONTMODALS } from '../../../../constants/actionTypes';
import { showModal, hideModal } from '../../../../actions/modal';
import { GetMLObjectData } from "../../../../common/library/form/FormLib";
import Collapsible from 'react-collapsible';
import {
    AddAPIPath, UpdateAPIPath, DeleteAPIPath, APIHostName,
    ModalColumnList_Insert, ModalColumnList_Edit, DataGridColumnList, MLObjectDefinition
} from "./constants";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { callGetCache, callClearLocalCache, callGetUserCache } from "../../../../actions/cacheAction";
import { GET_CACHE_USER_FUNCTION_LIST, DESTROYREQUESTTYPE_ADD, DESTROYREQUESTTYPE_DELETE, DESTROYREQUESTTYPE_UPDATE, COORDINATORGROUP_ADD, COORDINATORGROUP_UPDATE, COORDINATORGROUP_DELETE } from "../../../../constants/functionLists";
import CoordinatorUser from "./Components/CoordinatorUser";

class CoordinatorGroup_DUserCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleInsert = this.handleInsert.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.onClose = this.onClose.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false,
            cssNotification: "",
            iconNotification: "",
            DataSource: this.props.DataSource ? this.props.DataSource : [],
            DataSource: this.props.DataSource ? this.props.DataSource : [],
            CoordinatorGroupID: this.props.CoordinatorGroupID,
            IsInsert: true,
            ModalColumnList_Insert: ModalColumnList_Insert,
            ModalColumnList_Edit: ModalColumnList_Edit
        };
        this.notificationDOMRef = React.createRef();
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.CoordinatorGroupID !== this.state.CoordinatorGroupID) {
            this.setState({ CoordinatorGroupID: nextProps.CoordinatorGroupID });
        }

        if (nextProps.DataSource !== this.state.DataSource) {
            this.setState({ DataSource: nextProps.DataSource });
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
            //console.log("objUser", objUser);
            if (objUser.value != "") {
                const postData = [
                    {
                        SearchKey: "@USERNAME",
                        SearchValue: objUser.value
                    }
                ];
                this.callLoadData(postData);
                //this.callLoadDataSkill(postData)
            }
        }
    }

    checkPermission() {
        let IsAllowedAdd = false;
        let IsAllowedDelete = false;
        let IsAllowedUpdate = false;
        this.props.callGetUserCache(GET_CACHE_USER_FUNCTION_LIST).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                let isAllowAdd = result.ResultObject.CacheData.filter(x => x.FunctionID == COORDINATORGROUP_ADD);
                if (isAllowAdd && isAllowAdd.length > 0) {
                    IsAllowedAdd = true;
                }

                let isAllowUpdate = result.ResultObject.CacheData.filter(x => x.FunctionID == COORDINATORGROUP_UPDATE);
                if (isAllowUpdate && isAllowUpdate.length > 0) {
                    IsAllowedUpdate = true;
                }

                let isAllowDelete = result.ResultObject.CacheData.filter(x => x.FunctionID == COORDINATORGROUP_DELETE);
                if (isAllowDelete && isAllowDelete.length > 0) {
                    IsAllowedDelete = true;
                }
                this.setState({
                    IsAllowedAdd: IsAllowedAdd,
                    IsAllowedDelete: IsAllowedDelete,
                    IsAllowedUpdate: IsAllowedUpdate
                });
            }
        });
    }





    onClose() {
        this.props.hideModal();
    }

    onComplete(message, isError) {
        this.addNotification(message, isError);
    }

    handleInsert(MLObjectDefinition, modalElementList, dataSource) {
        // let reviewLevelOption = [{ value: -1, label: "--Vui lòng chọn--" }];

        // if (this.state.DataSource.length > 0) {
        //     let reviewLevel_DataSource = this.state.DataSource;
        //     reviewLevel_DataSource.forEach(element => {
        //         reviewLevelOption.push({ value: element.ReviewLevelID, label: element.ReviewLevelName });
        //     });
        // }

        if (!this.state.IsAllowedAdd) {
            this.showMessage("Bạn không có quyền");
            return;
        }

        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Thêm trưởng nhóm thuộc nhóm điều phối',
            content: {
                text: <CoordinatorUser
                    //ReviewLevelOptions={reviewLevelOption}
                    CoordinatorGroupID={this.props.CoordinatorGroupID}
                    onComponentChange={this.props.onComponentChange}
                    onComplete={this.onComplete.bind(this)}
                    closePopup={this.onClose}

                />
            },
            maxWidth: '1000px'
        })
    }

    handleEdit(value, pkColumnName) {
        if (!this.state.IsAllowedUpdate) {
            this.showMessage("Bạn không có quyền");
            return;
        }
        this.setState({ IsInsert: false });
        let _DataSource = {};
        this.state.DataSource.map((item, index) => {
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
                _DataSource = item;
            }
        });

        //console.log("_DataSource", _DataSource)

        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Cập nhật trưởng nhóm thuộc nhóm điều phối',
            content: {
                text: <CoordinatorUser
                    //ReviewLevelOptions={reviewLevelOption}
                    IsEdit={true}
                    DataSource={_DataSource}
                    CoordinatorGroupID={this.props.CoordinatorGroupID}
                    onComponentChange={this.props.onComponentChange}
                    onComplete={this.onComplete.bind(this)}
                    closePopup={this.onClose}

                />
            },
            maxWidth: '1000px'
        })

        // this.props.showModal(MODAL_TYPE_CONFIRMATION, {
        //     title: 'Chỉnh sửa mức duyệt',
        //     //onValueChange: this.handleModalChange,
        //     onClose: this.onClose,
        //     onConfirm: (isConfirmed, formData) => {
        //         if (isConfirmed) {
        //             let MLObject = GetMLObjectData(MLObjectDefinition, formData, _DestroyRequestType_ReviewLevel_DataSource);
        //             if (MLObject) {
        //                 MLObject.DestroyRequestTypeID = this.state.DestroyRequestTypeID;
        //                 MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
        //                 MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        //                 this.props.callFetchAPI(APIHostName, UpdateAPIPath, MLObject).then(apiResult => {
        //                     if (!apiResult.IsError) {
        //                         if (this.props.onComponentChange) {
        //                             this.props.onComponentChange();
        //                         }
        //                         this.props.hideModal();
        //                     }
        //                     //this.showMessage(apiResult.Message);
        //                     this.addNotification(apiResult.Message, apiResult.IsError);
        //                 });
        //                 //this.resetCombobox();
        //             }
        //         }
        //     },
        //     modalElementList: ModalColumnList_Edit,
        //     formData: _DestroyRequestType_ReviewLevel_DataSource
        // });
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

            MLObject.CoordinatorGroupID = this.props.CoordinatorGroupID;
            MLObject.DeletedUser = this.props.AppInfo.LoginInfo.Username;
            listMLObject.push(MLObject);
        });


        //console.log("listMLObject", listMLObject);

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
                    dataSource={this.state.DataSource}
                    modalElementList={ModalColumnList_Insert}
                    MLObjectDefinition={MLObjectDefinition}
                    IDSelectColumnName={"chkSelectUserName"}
                    PKColumnName={"UserName"}
                    onDeleteClick={this.handleDelete}
                    onInsertClick={this.handleInsert}
                    onInsertClickEdit={this.handleEdit}
                    IsAutoPaging={false}
                    //RowsPerPage={10}
                    IsCustomAddLink={true}
                    headingTitle={"Nhân viên giao hàng thuộc 1 nhóm điều phối"}
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

const CoordinatorGroup_DUser = connect(mapStateToProps, mapDispatchToProps)(CoordinatorGroup_DUserCom);
export default CoordinatorGroup_DUser;
