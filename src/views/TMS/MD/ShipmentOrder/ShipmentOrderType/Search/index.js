import React from "react";
import { connect } from 'react-redux';
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';
import SearchForm from "../../../../../../common/components/Form/SearchForm";
import DataGrid from "../../../../../../common/components/DataGrid";
import { MessageModal } from "../../../../../../common/components/Modal";
import { showModal, hideModal } from '../../../../../../actions/modal';
import { MODAL_TYPE_CONFIRMATION } from '../../../../../../constants/actionTypes';
import { GetMLObjectData } from "../../../../../../common/library/form/FormLib";
import {
    SearchElementList,
    SearchMLObjectDefinition,
    DataGridColumnList,
    APIHostName,
    SearchAPIPath,
    DeleteAPIPath,
    AddAPIPath,
    IDSelectColumnName,
    PKColumnName,
    InitSearchParams,
    PagePath,
    AddModalColumnList,
    MLObjectDefinition,
    AddLogAPIPath
} from "../constants"
import {
    callFetchAPI
} from "../../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../../actions/pageAction";
import { SHIPMENTORDERTYPE_VIEW, SHIPMENTORDERTYPE_DELETE, SHIPMENTORDERTYPE_ADD } from "../../../../../../constants/functionLists";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { callGetCache, callClearLocalCache } from "../../../../../../actions/cacheAction";
import { ERPCOMMONCACHE_SHIPMENTORDERTYPE, ERPUSERCACHE_FUNCTION } from "../../../../../../constants/keyCache";

class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleInputGridInsert = this.handleInputGridInsert.bind(this);
        this.checkAddPermission = this.checkAddPermission.bind(this);
        this.addNotification = this.addNotification.bind(this);
        this.state = {
            CallAPIMessage: "",
            gridDataSource: [],
            IsCallAPIError: false,
            SearchData: InitSearchParams,
            IsAllowAdd: false
        };
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        this.callSearchData(this.state.SearchData);
        this.checkAddPermission();
        this.props.updatePagePath(PagePath);
    }


    checkAddPermission() {
        this.props.callGetCache(ERPUSERCACHE_FUNCTION).then((result) => {
            if (result && !result.IsError && result.ResultObject) {
                let match = result.ResultObject.CacheData.filter(x => x.FunctionID == SHIPMENTORDERTYPE_ADD);
                if (match && match.length > 0) {
                    this.setState({ IsAllowAdd: true });
                }
            }
            //console.log("handleGetCache: ", result);
        });
    }


    handleDeleteInsertLog() {
        let MLObject = {};
        MLObject.ActivityTitle = "Xóa loại yêu cầu chỉnh sửa thông tin";
        MLObject.ActivityDetail = "Xóa loại yêu cầu chỉnh sửa thông tin";
        MLObject.ObjectID = "PIM_PIEREQUESTTYPE";
        MLObject.ActivityUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        this.props.callFetchAPI(APIHostName, AddLogAPIPath, MLObject);
    }

    handleDelete(deleteList, pkColumnName) {
        let listMLObject = [];
        deleteList.map((row, index) => {
            let MLObject = {};
            pkColumnName.map((pkItem, pkIndex) => {
                MLObject[pkItem.key] = row.pkColumnName[pkIndex].value;
            });
            MLObject.DeletedUser = this.props.AppInfo.LoginInfo.Username;
            listMLObject.push(MLObject);
        });
        this.props.callFetchAPI(APIHostName, DeleteAPIPath, listMLObject).then((apiResult) => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            if (!apiResult.IsError) {
                this.callSearchData(this.state.SearchData);
                this.props.callClearLocalCache(ERPCOMMONCACHE_SHIPMENTORDERTYPE);
                //this.handleDeleteInsertLog();
            }
            this.addNotification(apiResult.Message, apiResult.IsError);
        });
    }
    handleSearchSubmit(formData, MLObject) {
        const postData = [{
            SearchKey: "@Keyword",
            SearchValue: MLObject.Keyword
        }];
        this.setState({ SearchData: postData });
        this.callSearchData(postData);
    }


    handleSubmitInsertLog(MLObject) {
        MLObject.ActivityTitle = "Thêm mới loại yêu cầu chỉnh sửa thông tin";
        MLObject.ActivityDetail = "Thêm mới loại yêu cầu chỉnh sửa thông tin";
        MLObject.ObjectID = "PIM_PIEREQUESTTYPE";
        MLObject.ActivityUser = MLObject.CreatedUser;
        this.props.callFetchAPI(APIHostName, AddLogAPIPath, MLObject);
    }


    handleInputGridInsert(MLObjectDefinition, modalElementList, dataSource) {
        //kiểm tra quyền thêm mới loại yêu cầu vận chuyển
        if (!this.state.IsAllowAdd) {
            this.showMessage("Bạn không có quyền thao tác.");
        } else {
            this.props.showModal(MODAL_TYPE_CONFIRMATION, {
                title: 'Thêm mới loại yêu cầu vận chuyển',
                autoCloseModal: false,
                onConfirm: (isConfirmed, formData) => {
                    if (isConfirmed) {
                        let MLObject = GetMLObjectData(MLObjectDefinition, formData, dataSource);
                        if (MLObject) {
                            MLObject.AddFunctionID = MLObject.AddFunctionID && Array.isArray(MLObject.AddFunctionID) ? MLObject.AddFunctionID[0] : "";
                            MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
                            MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
                            this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then((apiResult) => {
                                if (!apiResult.IsError) {
                                    this.callSearchData(this.state.SearchData);
                                    this.props.callClearLocalCache(ERPCOMMONCACHE_SHIPMENTORDERTYPE);
                                    this.props.hideModal();
                                    this.addNotification(apiResult.Message, apiResult.IsError);
                                } else {
                                    this.showMessage(apiResult.Message);
                                }
                                this.setState({ IsCallAPIError: apiResult.IsError });
                            });
                        }
                    }
                },
                modalElementList: modalElementList
            });
        }

    }

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then((apiResult) => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            if (!apiResult.IsError) {
                this.setState({
                    gridDataSource: apiResult.ResultObject,
                    IsShowForm: true
                });
                //console.log("gridDataSource",apiResult.ResultObject);
            }
            else {
                this.setState({ IsCallAPIError: apiResult.IsError, IsShowForm: false })
                this.addNotification(apiResult.Message, apiResult.IsError);
            }
        });
    }

    handleCloseMessage() {
        // if (!this.state.IsCallAPIError) {
        //     this.callSearchData(this.state.SearchData);
        // }
    }
    showMessage(message) {
        ModalManager.open(< MessageModal title="Thông báo"
            message={
                message
            }
            onRequestClose={
                () => true
            }
            onCloseModal={
                this.handleCloseMessage
            }
        />);
    }

    addNotification(message1, IsError) {
        let cssNotification = "";
        let iconNotification = "";
        if (!IsError) {
            cssNotification = "notification-custom-success";
            iconNotification = "fa fa-check";
        }
        else {
            cssNotification = "notification-danger";
            iconNotification = "fa fa-exclamation";
        }
        this.notificationDOMRef.current.addNotification({
            container: "bottom-right",
            content: (
                <div className={cssNotification}>
                    <div className="notification-custom-icon">
                        <i className={iconNotification} />
                    </div>
                    <div className="notification-custom-content">
                        <div className="notification-close"><span>×</span></div>
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
        if (this.state.IsShowForm) {
            return (
                <React.Fragment>
                    <ReactNotification ref={this.notificationDOMRef} />
                    <SearchForm FormName="Tìm kiếm Loại yêu cầu vận chuyển"
                        MLObjectDefinition={SearchMLObjectDefinition}
                        listelement={SearchElementList}
                        onSubmit={this.handleSearchSubmit}
                    />
                    <DataGrid listColumn={DataGridColumnList}
                        dataSource={this.state.gridDataSource}
                        modalElementList={AddModalColumnList}
                        MLObjectDefinition={MLObjectDefinition}
                        IDSelectColumnName={IDSelectColumnName}
                        PKColumnName={PKColumnName}
                        onDeleteClick={this.handleDelete}
                        onInsertClick={this.handleInputGridInsert}
                        IsAutoPaging={true}
                        RowsPerPage={10}
                        IsCustomAddLink={true}
                        RequirePermission={SHIPMENTORDERTYPE_VIEW}
                        DeletePermission={SHIPMENTORDERTYPE_DELETE}
                    />
                </ React.Fragment >
            );
        } else {
            return (
                <div>
                    <label>Đang nạp dữ liệu ......</label>
                </div>
            )
        }

    }
}

const mapStateToProps = state => {
    return {
        AppInfo: state,
        FetchAPIInfo: state.FetchAPIInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updatePagePath: (pagePath) => {
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
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
        callClearLocalCache: (cacheKeyID) => {
            return dispatch(callClearLocalCache(cacheKeyID));
        }

    }
}

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchCom);
export default Search;