import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import { MessageModal } from "../../../../../common/components/Modal";
import DataGrid from "../../../../../common/components/DataGrid";
import { MODAL_TYPE_CONFIRMATION } from '../../../../../constants/actionTypes';
import { showModal, hideModal } from '../../../../../actions/modal';
import { GetMLObjectData } from "../../../../../common/library/form/FormLib";
import Collapsible from 'react-collapsible';
import {
    AddAPIPath, UpdateAPIPath, DeleteAPIPath, APIHostName, SearchAPIPath,
    ModalColumnList_Insert, ModalColumnList_Edit, DataGridColumnList, MLObjectDefinition
} from "./constants";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";
import { GET_CACHE_USER_FUNCTION_LIST, DESTROYREQUESTTYPE_ADD, DESTROYREQUESTTYPE_DELETE, DESTROYREQUESTTYPE_UPDATE } from "../../../../../constants/functionLists";
import { ERPCOMMONCACHE_DES_RVLEVEL } from "../../../../../constants/keyCache";


class ShipmentOrderTypeWorkflowImageCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleInsert = this.handleInsert.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSelectedFile = this.handleSelectedFile.bind(this);
        this.onClose = this.onClose.bind(this);
        const postData = [
            {
                SearchKey: "@ShipmentOrderTypeID",
                SearchValue: this.props.ShipmentOrderTypeID
            },
            {
                SearchKey: "@ShipmentOrderStepID",
                SearchValue: this.props.ShipmentOrderStepID
            }
        ];
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false,
            cssNotification: "",
            iconNotification: "",
            ShipmentOrderTypeWorkflowImage_DataSource: this.props.ShipmentOrderTypeWorkflowImage_DataSource ? this.props.ShipmentOrderTypeWorkflowImage_DataSource : [],
            DestroyRequestTypeID: this.props.DestroyRequestTypeID,
            IsInsert: true,
            ModalColumnList_Insert: ModalColumnList_Insert,
            ModalColumnList_Edit: ModalColumnList_Edit,
            Files: [],
            DataSource: [],
            InitSearchParams: postData,

        };
        this.notificationDOMRef = React.createRef();
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.DestroyRequestTypeID !== this.state.DestroyRequestTypeID) {
            this.setState({ DestroyRequestTypeID: nextProps.DestroyRequestTypeID });
        }

        if (nextProps.ShipmentOrderTypeWorkflowImage_DataSource !== this.state.ShipmentOrderTypeWorkflowImage_DataSource) {
            this.setState({ ShipmentOrderTypeWorkflowImage_DataSource: nextProps.ShipmentOrderTypeWorkflowImage_DataSource });
        }
    }

    componentDidMount() {
        //this.checkPermission();
        this.callSearchData();
    }


    callSearchData() {
        this.props.callFetchAPI(APIHostName, SearchAPIPath, this.state.InitSearchParams).then(apiResult => {
            //this.searchref.current.changeLoadComplete();
            this.setState({ IsCallAPIError: apiResult.IsError });
            if (!apiResult.IsError) {
                this.setState({
                    DataSource: apiResult.ResultObject,
                    IsShowForm: true
                });
            } else {
                this.showMessage(apiResult.Message);
                this.setState({ IsShowForm: false });
            }
        });
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

        this.props.callGetCache(GET_CACHE_USER_FUNCTION_LIST).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                let isAllowAdd = result.ResultObject.CacheData.filter(x => x.FunctionID == DESTROYREQUESTTYPE_ADD);
                if (isAllowAdd && isAllowAdd.length > 0) {
                    IsAllowedAdd = true;
                }

                let isAllowUpdate = result.ResultObject.CacheData.filter(x => x.FunctionID == DESTROYREQUESTTYPE_UPDATE);
                if (isAllowUpdate && isAllowUpdate.length > 0) {
                    IsAllowedUpdate = true;
                }

                let isAllowDelete = result.ResultObject.CacheData.filter(x => x.FunctionID == DESTROYREQUESTTYPE_DELETE);
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
        // if (!this.state.IsAllowedAdd) {
        //     this.showMessage("Bạn không có quyền");
        //     return;
        // }
        this.setState({ IsInsert: true });
        this.props.showModal(MODAL_TYPE_CONFIRMATION, {
            title: 'Thêm mới hình mẫu tại một bước xử lý',
            autoCloseModal: false,
            onHandleSelectedFile: this.handleSelectedFile,
            //onValueChange: this.handleModalChange,
            onClose: this.onClose,
            onConfirm: (isConfirmed, formData) => {
                if (isConfirmed) {
                    let MLObject = GetMLObjectData(MLObjectDefinition, formData, dataSource);
                    if (MLObject) {
                        MLObject.ShipmentOrderTypeID = this.props.ShipmentOrderTypeID;
                        MLObject.ShipmentOrderStepID = this.props.ShipmentOrderStepID;
                        MLObject.SubGroupID = MLObject.SubGroupID && Array.isArray(MLObject.SubGroupID) ? MLObject.SubGroupID[0] : MLObject.SubGroupID;
                        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
                        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;

                        
                        // if (this.state.Files.length > 0) {
                        //     this.state.Files.map((item, index) => {
                        //         if (item.KeyName == "FrontIDDocumentImageURL") {
                        //             MLObject.FrontIDDocumentImageURL = item.FrontIDDocumentImageURL ? item.FrontIDDocumentImageURL.name : "";
                        //             data.append("FrontIDDocumentImageURL", item.FrontIDDocumentImageURL);
                        //         }
                        //         if (item.KeyName == "BackSideIDDocumentImageURL") {
                        //             MLObject.BackSideIDDocumentImageURL = item.BackSideIDDocumentImageURL ? item.BackSideIDDocumentImageURL.name : "";
                        //             data.append("BackSideIDDocumentImageURL", item.BackSideIDDocumentImageURL);
                        //         }
                        //     });
                        // }

                        var data = new FormData();
                        if (this.state.Files.length > 0) {
                            if(this.state.Files[0].IsDeletetedFile){
                                MLObject.SampleImageFileURL = "";
                            }
                            data.append("SampleImageFileURL", this.state.Files[0].SampleImageFileURL);
                        }
                        data.append("ShipmentOrderType_WF_ImgObj", JSON.stringify(MLObject));

                        this.props.callFetchAPI(APIHostName, AddAPIPath, data).then(apiResult => {
                            if (!apiResult.IsError) {
                                this.setState({ Files: [] });
                                this.callSearchData();
                                this.props.hideModal();
                            }
                            //this.showMessage(apiResult.Message);
                            this.addNotification(apiResult.Message, apiResult.IsError);
                            //this.props.callClearLocalCache(ERPCOMMONCACHE_DES_RVLEVEL);
                        });
                        // console.log("MLObject",MLObject);
                        // console.log("file",this.state.Files);
                    }
                }
            },
            modalElementList: modalElementList,
        });
    }

    handleEdit(value, pkColumnName) {
        // if (!this.state.IsAllowedUpdate) {
        //     this.showMessage("Bạn không có quyền");
        //     return;
        // }
        this.setState({ IsInsert: false });
        let _ShipmentOrderTypeWorkflowImage_DataSource = {};
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
                _ShipmentOrderTypeWorkflowImage_DataSource = item;
            }
        });

        this.props.showModal(MODAL_TYPE_CONFIRMATION, {
            title: 'Chỉnh sửa hình mẫu tại một bước xử lý',
            //onValueChange: this.handleModalChange,
            onHandleSelectedFile: this.handleSelectedFile,
            onClose: this.onClose,
            onConfirm: (isConfirmed, formData) => {
                if (isConfirmed) {
                    let MLObject = GetMLObjectData(MLObjectDefinition, formData, _ShipmentOrderTypeWorkflowImage_DataSource);
                    if (MLObject) {
                        MLObject.ShipmentOrderTypeID = this.props.ShipmentOrderTypeID;
                        MLObject.ShipmentOrderStepID = this.props.ShipmentOrderStepID;
                        MLObject.SubGroupID = MLObject.SubGroupID && Array.isArray(MLObject.SubGroupID) ? MLObject.SubGroupID[0] : MLObject.SubGroupID;
                        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
                        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;

                        var data = new FormData();
                        if (this.state.Files.length > 0) {
                            if(this.state.Files[0].IsDeletetedFile){
                                MLObject.SampleImageFileURL = "";
                            }
                            data.append("SampleImageFileURL", this.state.Files[0].SampleImageFileURL);
                        }
                        data.append("ShipmentOrderType_WF_ImgObj", JSON.stringify(MLObject));


                        this.props.callFetchAPI(APIHostName, UpdateAPIPath, data).then(apiResult => {
                            if (!apiResult.IsError) {
                                this.setState({ Files: [] });
                                this.callSearchData();
                                this.props.hideModal();
                            }
                            //this.showMessage(apiResult.Message);
                            this.addNotification(apiResult.Message, apiResult.IsError);
                        });
                        //this.resetCombobox();
                        console.log("files", this.state.Files);
                        console.log("MLObject", MLObject);
                    }
                }
            },
            modalElementList: ModalColumnList_Edit,
            formData: _ShipmentOrderTypeWorkflowImage_DataSource
        });
    }


    handleDelete(deleteList, pkColumnName) {
        // if (!this.state.IsAllowedDelete) {
        //     this.showMessage("Bạn không có quyền");
        //     return;
        // }
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
                this.setState({ Files: [] });
                this.callSearchData();
            }
            //this.showMessage(apiResult.Message);
            this.addNotification(apiResult.Message, apiResult.IsError);
            //this.props.callClearLocalCache(ERPCOMMONCACHE_DES_RVLEVEL);
        });
        //console.log("listMLObject",listMLObject);

    }


    render() {
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }

        return (
            <div>
                <ReactNotification ref={this.notificationDOMRef} />
                <DataGrid listColumn={DataGridColumnList}
                    dataSource={this.state.DataSource}
                    modalElementList={ModalColumnList_Insert}
                    MLObjectDefinition={MLObjectDefinition}
                    IDSelectColumnName={"chkSelectSampleImageID"}
                    PKColumnName={"SampleImageID"}
                    onDeleteClick={this.handleDelete}
                    onInsertClick={this.handleInsert}
                    onInsertClickEdit={this.handleEdit}
                    IsAutoPaging={false}
                    //RowsPerPage={10}
                    IsCustomAddLink={true}
                //headingTitle={"Danh sách hình mẫu tại một bước xử lý"}
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

const ShipmentOrderTypeWorkflowImage = connect(mapStateToProps, mapDispatchToProps)(ShipmentOrderTypeWorkflowImageCom);
export default ShipmentOrderTypeWorkflowImage;
