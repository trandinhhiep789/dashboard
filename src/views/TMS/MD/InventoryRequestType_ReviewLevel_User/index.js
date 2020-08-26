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
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { callGetCache, callClearLocalCache } from "../../../../actions/cacheAction";
import { GET_CACHE_USER_FUNCTION_LIST, INVENTORYREQUESTTYPE_ADD, INVENTORYREQUESTTYPE_DELETE } from "../../../../constants/functionLists";
import ReviewLevel_User from "./Components/ReviewLevel_User";

class InventoryRequestType_ReviewLevel_UserCom extends React.Component {
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
            InventoryRequestType_ReviewLevel_User_DataSource: this.props.InventoryRequestType_ReviewLevel_User_DataSource ? this.props.InventoryRequestType_ReviewLevel_User_DataSource : [],
            InventoryRequestType_ReviewLevel_User_DataSource: this.props.InventoryRequestType_ReviewLevel_User_DataSource ? this.props.InventoryRequestType_ReviewLevel_User_DataSource : [],
            InventoryRequestTypeID: this.props.InventoryRequestTypeID,
            IsInsert: true,
            ModalColumnList_Insert: ModalColumnList_Insert,
            ModalColumnList_Edit: ModalColumnList_Edit
        };
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.InventoryRequestTypeID !== this.state.InventoryRequestTypeID) {
            this.setState({ InventoryRequestTypeID: nextProps.InventoryRequestTypeID });
        }

        if (nextProps.InventoryRequestType_ReviewLevel_DataSource !== this.state.InventoryRequestType_ReviewLevel_DataSource) {
            this.setState({ InventoryRequestType_ReviewLevel_DataSource: nextProps.InventoryRequestType_ReviewLevel_DataSource });
        }

        if (nextProps.InventoryRequestType_ReviewLevel_User_DataSource !== this.state.InventoryRequestType_ReviewLevel_User_DataSource) {
            this.setState({ InventoryRequestType_ReviewLevel_User_DataSource: nextProps.InventoryRequestType_ReviewLevel_User_DataSource });
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
        this.props.callGetCache(GET_CACHE_USER_FUNCTION_LIST).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                let isAllowAdd = result.ResultObject.CacheData.filter(x => x.FunctionID == INVENTORYREQUESTTYPE_ADD);
                if (isAllowAdd && isAllowAdd.length > 0) {
                    IsAllowedAdd = true;
                }

                let isAllowDelete = result.ResultObject.CacheData.filter(x => x.FunctionID == INVENTORYREQUESTTYPE_DELETE);
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





    onClose() {
        this.props.hideModal();
    }

    handleInsert(MLObjectDefinition, modalElementList, dataSource) {
        let reviewLevelOption = [{ value: -1, label: "--Vui lòng chọn--" }];

        if (this.state.InventoryRequestType_ReviewLevel_DataSource.length > 0) {
            let reviewLevel_DataSource = this.state.InventoryRequestType_ReviewLevel_DataSource;
            reviewLevel_DataSource.forEach(element => {
                reviewLevelOption.push({ value: element.ReviewLevelID, label: element.ReviewLevelName });
            });
        }

        if (!this.state.IsAllowedAdd) {
            this.showMessage("Bạn không có quyền");
            return;
        }

        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Người duyệt',
            content: {
                text: <ReviewLevel_User
                    ReviewLevelOptions={reviewLevelOption}
                    onComponentChange={this.props.onComponentChange}
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
        let _RV_User_DataSource = this.state.InventoryRequestType_ReviewLevel_User_DataSource;
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

        //console.log("listMLObject", listMLObject);

        this.props.callFetchAPI(APIHostName, DeleteAPIPath, listMLObject).then(apiResult => {
            if (!apiResult.IsError) {
                if (this.props.onComponentChange) {
                    this.props.onComponentChange();
                }
                this.props.hideModal();
            }
            this.showMessage(apiResult.Message);
        });

    }


    render() {
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }

        return (
            <div className="sub-grid detail">
                <DataGrid listColumn={DataGridColumnList}
                    dataSource={this.state.InventoryRequestType_ReviewLevel_User_DataSource}
                    modalElementList={ModalColumnList_Insert}
                    MLObjectDefinition={MLObjectDefinition}
                    IDSelectColumnName={"chkSelectCSID"}
                    PKColumnName={"CSID"}
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
        }

    };
};

const InventoryRequestType_ReviewLevel_User = connect(mapStateToProps, mapDispatchToProps)(InventoryRequestType_ReviewLevel_UserCom);
export default InventoryRequestType_ReviewLevel_User;
