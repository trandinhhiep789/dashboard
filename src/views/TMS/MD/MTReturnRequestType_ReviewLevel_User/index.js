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
import { callGetCache, callClearLocalCache,callGetUserCache } from "../../../../actions/cacheAction";
import { GET_CACHE_USER_FUNCTION_LIST, MTRETURNREQUESTTYPE_ADD, MTRETURNREQUESTTYPE_DELETE } from "../../../../constants/functionLists";
import ReviewLevel_User from "./Components/ReviewLevel_User";

class MTReturnRequestType_ReviewLevel_UserCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleInsert = this.handleInsert.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.onClose = this.onClose.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false,
            cssNotification: "",
            iconNotification: "",
            DataSource: this.props.DataSource ? this.props.DataSource : [],
            IsInsert: true,
            ModalColumnList_Insert: ModalColumnList_Insert,
            ModalColumnList_Edit: ModalColumnList_Edit
        };
        this.notificationDOMRef = React.createRef();

    }


    componentWillReceiveProps(nextProps) {
        // if (nextProps.MTReturnRequestTypeID !== this.state.MTReturnRequestTypeID) {
        //     this.setState({ MTReturnRequestTypeID: nextProps.MTReturnRequestTypeID });
        // }

        if (nextProps.DataSource !== this.state.DataSource) {
            this.setState({ DataSource: nextProps.DataSource });
        }
    }

    componentDidMount() {
        this.checkPermission();
        //console.log("dsadsad", this.props.DataSource)
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
        this.props.callGetUserCache(GET_CACHE_USER_FUNCTION_LIST).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                let isAllowAdd = result.ResultObject.CacheData.filter(x => x.FunctionID == MTRETURNREQUESTTYPE_ADD);
                if (isAllowAdd && isAllowAdd.length > 0) {
                    IsAllowedAdd = true;
                }

                let isAllowDelete = result.ResultObject.CacheData.filter(x => x.FunctionID == MTRETURNREQUESTTYPE_DELETE);
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

    onComplete(message,isError){
        this.addNotification(message, isError);
    }



    onClose() {
        this.props.hideModal();
    }

    handleInsert(MLObjectDefinition, modalElementList, dataSource) {
        // let reviewLevelOption = [{ value: -1, label: "--Vui lòng chọn--" }];

        // if (this.state.MTReturnRequestType_ReviewLevel_DataSource.length > 0) {
        //     let reviewLevel_DataSource = this.state.MTReturnRequestType_ReviewLevel_DataSource;
        //     reviewLevel_DataSource.forEach(element => {
        //         reviewLevelOption.push({ value: element.ReviewLevelID, label: element.ReviewLevelName });
        //     });
        // }

        if (!this.state.IsAllowedAdd) {
            this.showMessage("Bạn không có quyền");
            return;
        }

        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Người duyệt',
            content: {
                text: <ReviewLevel_User
                    //ReviewLevelOptions={reviewLevelOption}
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
        // let listMLObject = [];
        // let _RV_User_DataSource = this.state.DataSource;
        // deleteList.map((row, index) => {
        //     let MLObject = {};
        //     pkColumnName.map((pkItem, pkIndex) => {
        //         MLObject[pkItem.key] = row.pkColumnName[pkIndex].value;
        //     });
            
        //     let _deleteList = _RV_User_DataSource.filter(item => item.CSID == MLObject.CSID);
        //     if (_deleteList && _deleteList.length > 0) {
        //         _deleteList[0].DeletedUser = this.props.AppInfo.LoginInfo.Username;
        //         listMLObject.push(_deleteList[0]);
        //     }

        // });

        let listMLObject = [];
        deleteList.map((row, index) => {
            let MLObject = {};
            pkColumnName.map((pkItem, pkIndex) => {
                MLObject[pkItem.key] = row.pkColumnName[pkIndex].value;
            });
            MLObject.ReviewLevelID = this.props.ReviewLevelID;
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
                    IDSelectColumnName={"chkSelectStoreID"}
                    PKColumnName={"StoreID,UserName"}
                    onDeleteClick={this.handleDelete}
                    onInsertClick={this.handleInsert}
                    IsAutoPaging={false}
                    //RowsPerPage={10}
                    IsCustomAddLink={true}
                    headingTitle={"Người duyệt"}
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

const MTReturnRequestType_ReviewLevel_User = connect(mapStateToProps, mapDispatchToProps)(MTReturnRequestType_ReviewLevel_UserCom);
export default MTReturnRequestType_ReviewLevel_User;
