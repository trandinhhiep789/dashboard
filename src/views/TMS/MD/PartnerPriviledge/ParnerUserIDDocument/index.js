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
    APIHostName,
    Modal_PartnerUserIDDocument_Add, Modal_PartnerUserIDDocument_Edit, PartnerUserIDDocument_DataGrid_ColumnList, MLObject_PartnerUserIDDocument,
    AddAPIPath_PartnerUserIDDocument, UpdateAPIPath_PartnerUserIDDocument, DeleteAPIPath_PartnerUserIDDocument
} from "./constants";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callGetCache, callClearLocalCache, callGetUserCache } from "../../../../../actions/cacheAction";
import { GET_CACHE_USER_FUNCTION_LIST, PARTNERUSER_ADD, PARTNERUSER_DELETE, PARTNERUSER_UPDATE } from "../../../../../constants/functionLists";


class PartnerUserIDDocumentCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleInsert = this.handleInsert.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSelectedFile = this.handleSelectedFile.bind(this);
        this.checkPermission = this.checkPermission.bind(this);
        this.onClose = this.onClose.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false,
            UserName: this.props.UserName,
            DataSource: this.props.DataSource ? this.props.DataSource : [],
            IsInsert: true,
            Files: [],

        };
        this.notificationDOMRef = React.createRef();

    }


    componentWillReceiveProps(nextProps) {
        // if (nextProps.MaterialGroupID !== this.state.MaterialGroupID) {
        //     this.setState({ MaterialGroupID: nextProps.MaterialGroupID });
        // }

        // if (nextProps.MaterialGroupProductDataSource !== this.state.MaterialGroupProductDataSource) {
        //     this.setState({ MaterialGroupProductDataSource: nextProps.MaterialGroupProductDataSource });
        // }

        if (nextProps.DataSource !== this.state.DataSource) {
            this.setState({ DataSource: nextProps.DataSource });
        }
    }


    checkPermission() {
        let IsAllowedAdd = false;
        let IsAllowedDelete = false;
        let IsAllowedUpdate = false;
        this.props.callGetUserCache(GET_CACHE_USER_FUNCTION_LIST).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                let _isAllowedAdd = result.ResultObject.CacheData.filter(x => x.FunctionID == PARTNERUSER_ADD);
                if (_isAllowedAdd && _isAllowedAdd.length > 0) {
                    IsAllowedAdd = true;
                }

                let _isAllowedUpdate = result.ResultObject.CacheData.filter(x => x.FunctionID == PARTNERUSER_UPDATE);
                if (_isAllowedUpdate && _isAllowedUpdate.length > 0) {
                    IsAllowedUpdate = true;
                }

                let _isAlloweDelete = result.ResultObject.CacheData.filter(x => x.FunctionID == PARTNERUSER_DELETE);
                if (_isAlloweDelete && _isAlloweDelete.length > 0) {
                    IsAllowedDelete = true;
                }
                
                this.setState({
                    IsAllowedAdd,
                    IsAllowedUpdate,
                    IsAllowedDelete
                });
            }
        });
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

    onClose() {
        //this.resetCombobox();
    }

    //file upload
    handleSelectedFile(file, nameValue, isDeletetedFile) {
        const filelist = { [nameValue]: file, "KeyName": nameValue, IsDeletetedFile: isDeletetedFile };
        let files = this.state.Files;
        let result = [];
        if (files && files.length > 0) {
            result = files.map(function (item, index) {
                if (Object.keys(item)[0] != nameValue) {
                    return item;
                }
            });
        }
        result = result.filter(x => x != undefined);
        result.push(filelist);

        this.setState({ Files: result });
    }

    handleInsert(MLObjectDefinition, modalElementList, dataSource) {
        if(!this.state.IsAllowedAdd){
            this.showMessage("Bạn không có quyền");
            return;
        }
        this.props.showModal(MODAL_TYPE_CONFIRMATION, {
            title: 'Thêm mới giấy tờ tùy thân của người dùng',
            autoCloseModal: false,
            onHandleSelectedFile: this.handleSelectedFile,
            onConfirm: (isConfirmed, formData) => {
                if (isConfirmed) {
                    let MLObject = GetMLObjectData(MLObjectDefinition, formData, dataSource);
                    if (MLObject) {
                        MLObject.UserName = this.state.UserName;
                        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;

                        var data = new FormData();
                        if (this.state.Files.length > 0) {
                            this.state.Files.map((item, index) => {
                                if (item.KeyName == "FrontIDDocumentImageURL") {
                                    MLObject.FrontIDDocumentImageURL = item.FrontIDDocumentImageURL ? item.FrontIDDocumentImageURL.name : "";
                                    data.append("FrontIDDocumentImageURL", item.FrontIDDocumentImageURL);
                                }
                                if (item.KeyName == "BackSideIDDocumentImageURL") {
                                    MLObject.BackSideIDDocumentImageURL = item.BackSideIDDocumentImageURL ? item.BackSideIDDocumentImageURL.name : "";
                                    data.append("BackSideIDDocumentImageURL", item.BackSideIDDocumentImageURL);
                                }
                            });
                        }

                        data.append("PartnerUserIDDocumentObj", JSON.stringify(MLObject));

                        this.props.callFetchAPI(APIHostName, AddAPIPath_PartnerUserIDDocument, data).then((apiResult) => {
                            if (!apiResult.IsError) {
                                this.props.onComponentSubmitChange();
                                this.props.hideModal();
                                this.setState({ Files: [] });
                            }
                            this.addNotification(apiResult.Message, apiResult.IsError);
                            this.setState({ IsCallAPIError: apiResult.IsError });
                        });

                        // let partnerUser_IDDocument = [];
                        // let match = [];
                        // let formData = {};
                        // let filesData = this.state.FilesData;
                        // if (this.state.DataSource.ListPartnerUser_IDDocument) {
                        //     partnerUser_IDDocument = this.state.DataSource.ListPartnerUser_IDDocument;
                        // }          
                        // match = partnerUser_IDDocument.filter(item => item.IDDocumentNumber == MLObject.IDDocumentNumber);
                        // if (match && match.length > 0) {
                        //     this.showMessage2("Giấy tờ tùy thân này đã tồn tại.");
                        // } else { 
                        //     this.state.Files.map(function (item, index) {
                        //         // if (Object.keys(item)[0] == "FrontIDDocumentImageURL") {
                        //         //     MLObject.FrontIDDocumentImageUR = item.FrontIDDocumentImageURL;
                        //         // }
                        //         // if (Object.keys(item)[0] == "BackSideidDocumentImageURL") {
                        //         //     MLObject.BackSideidDocumentImageURL = item.BackSideidDocumentImageURL;
                        //         // }
                        //         item.IDDocumentNumber = MLObject.IDDocumentNumber
                        //         filesData.push(item);
                        //     });
                        //     partnerUser_IDDocument.push(MLObject);
                        //     formData = Object.assign({}, this.state.DataSource, { ["ListPartnerUser_IDDocument"]: partnerUser_IDDocument });
                        //     this.setState({ DataSource: formData, FilesData: filesData });
                        //     this.props.hideModal();
                        // }
                        //this.setState({ Files: [] });
                        // console.log("MLObject", MLObject);
                        // console.log("filesData", this.state.Files);
                    }
                }
            },
            modalElementList: modalElementList,
        });
    }

    handleEdit(value, pkColumnName) {

        if(!this.state.IsAllowedUpdate){
            this.showMessage("Bạn không có quyền");
            return;
        }

        let partnerUser_IDDocument = {};
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
                partnerUser_IDDocument = item;
            }
        });

        this.props.showModal(MODAL_TYPE_CONFIRMATION, {
            title: 'Chỉnh sửa giấy tờ tùy thân của người dùng',
            autoCloseModal: false,
            onHandleSelectedFile: this.handleSelectedFile,
            onConfirm: (isConfirmed, formData) => {
                if (isConfirmed) {
                    let MLObject = GetMLObjectData(MLObject_PartnerUserIDDocument, formData, partnerUser_IDDocument);
                    if (MLObject) {
                        MLObject.UserName = this.state.UserName;
                        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;

                        var data = new FormData();
                        if (this.state.Files.length > 0) {
                            this.state.Files.map((item, index) => {
                                if (item.KeyName == "FrontIDDocumentImageURL") {
                                    MLObject.FrontIDDocumentImageURL = item.FrontIDDocumentImageURL ? item.FrontIDDocumentImageURL.name : "";
                                    data.append("FrontIDDocumentImageURL", item.FrontIDDocumentImageURL);
                                }
                                if (item.KeyName == "BackSideIDDocumentImageURL") {
                                    MLObject.BackSideIDDocumentImageURL = item.BackSideIDDocumentImageURL ? item.BackSideIDDocumentImageURL.name : "";
                                    data.append("BackSideIDDocumentImageURL", item.BackSideIDDocumentImageURL);
                                }
                            });
                        }

                        data.append("PartnerUserIDDocumentObj", JSON.stringify(MLObject));
                        this.props.callFetchAPI(APIHostName, UpdateAPIPath_PartnerUserIDDocument, data).then((apiResult) => {
                            if (!apiResult.IsError) {
                                this.props.onComponentSubmitChange();
                                this.props.hideModal();
                                this.setState({ Files: [] });
                            }
                            this.addNotification(apiResult.Message, apiResult.IsError);
                            this.setState({ IsCallAPIError: apiResult.IsError });
                        });
                        // console.log("MLObject", MLObject);
                        // console.log("filesData", this.state.Files);
                    }
                }
            },
            modalElementList: Modal_PartnerUserIDDocument_Edit,
            formData: partnerUser_IDDocument
        });
    }

    handleDelete(deleteList, pkColumnName) {

        if(!this.state.IsAllowedDelete){
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
        this.props.callFetchAPI(APIHostName, DeleteAPIPath_PartnerUserIDDocument, listMLObject).then((apiResult) => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            if (!apiResult.IsError) {
                this.props.onComponentSubmitChange();
            }
            this.addNotification(apiResult.Message, apiResult.IsError);
        });
    }



    render() {
        //let datasource = this.state.MaterialGroupProductDataSource.filter(item => item.IsDeleted == undefined || item.IsDeleted == false);
        //datasource = this.initDatasource(datasource);


        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        // if (!this.state.MaterialGroupID) {
        //     return (
        //         <Collapsible trigger="Sản phẩm của nhóm vật tư" easing="ease-in" open={true}>
        //             Đang nạp dữ liệu ......
        //         </Collapsible>
        //     );
        // }

        return (
            // <Collapsible trigger="Sản phẩm của nhóm vật tư" easing="ease-in" open={true}>

            // </Collapsible>
            <div className="sub-grid detail">
                <ReactNotification ref={this.notificationDOMRef} />
                <DataGrid listColumn={PartnerUserIDDocument_DataGrid_ColumnList}
                    dataSource={this.state.DataSource}
                    modalElementList={Modal_PartnerUserIDDocument_Add}
                    MLObjectDefinition={MLObject_PartnerUserIDDocument}
                    IDSelectColumnName={"chkSelectIDDocumentID"}
                    PKColumnName={"IDDocumentID"}
                    onDeleteClick={this.handleDelete}
                    onInsertClick={this.handleInsert}
                    onInsertClickEdit={this.handleEdit}
                    IsAutoPaging={false}
                    RowsPerPage={10}
                    IsCustomAddLink={true}
                    headingTitle={"Giấy tờ tùy thân của người dùng"}
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

const PartnerUserIDDocument = connect(mapStateToProps, mapDispatchToProps)(PartnerUserIDDocumentCom);
export default PartnerUserIDDocument;
