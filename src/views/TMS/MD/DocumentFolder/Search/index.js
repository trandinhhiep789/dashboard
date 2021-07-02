import React from "react";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import SearchForm from "../../../../../common/components/Form/SearchForm";
import DataGrid from "../../../../../common/components/DataGrid";
import { MessageModal } from "../../../../../common/components/Modal";
import {
    SearchElementList,
    SearchMLObjectDefinition,
    DataGridColumnList,
    AddLink,
    APIHostName,
    SearchAPIPath,
    DeleteAPIPath,
    IDSelectColumnName,
    PKColumnName,
    InitSearchParams,
    PagePath,
    ExportAPIPath
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";
import { ERPCOMMONCACHE_AREATT, ERPCOMMONCACHE_DOCUMENTFOLDER, ERPCOMMONCACHE_PARTNER } from "../../../../../constants/keyCache";
import { AREA_VIEW, AREA_DELETE, DOCUMENT_VIEW, DOCUMENT_DELETE } from "../../../../../constants/functionLists";
import { formatDate } from "../../../../../common/library/CommonLib";

class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.state = {
            CallAPIMessage: "",
            gridDataSource: [],
            IsCallAPIError: false,
            SearchData: InitSearchParams,
            dataExport: []
        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        this.callSearchData(this.state.SearchData);
        //this.callExportData();
        this.props.updatePagePath(PagePath);
    }

    handleExportFile(result) {
        this.addNotification(result.Message, result.IsError);
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
        this.props.callFetchAPI(APIHostName, DeleteAPIPath, listMLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.addNotification(apiResult.Message, apiResult.IsError);
            if (!apiResult.IsError) {
                this.callSearchData(this.state.SearchData);
                this.props.callClearLocalCache(ERPCOMMONCACHE_DOCUMENTFOLDER);
                // this.handleClearLocalCache();
                // this.handleSubmitInsertLog();
            }
        });
    }

    handleSearchSubmit(formData, MLObject) {
        const postData = [
            {
                SearchKey: "@Keyword",
                SearchValue: MLObject.Keyword
            },
            // {
            //     SearchKey: "@AreaTypeID",
            //     SearchValue: MLObject.AreaTypeID
            // }
        ];
        this.setState({ SearchData: postData });
        this.callSearchData(postData);
        //this.gridref.current.clearData();
    }

    callExportData() {
        this.props.callFetchAPI(APIHostName, ExportAPIPath, null).then(apiResult => {
            //this.searchref.current.changeLoadComplete();
            //this.setState({ IsCallAPIError: apiResult.IsError });
            if (!apiResult.IsError) {
                // xuất exel
                const exelData = apiResult.ResultObject.map((item, index) => {
                    let element = {
                        "Mã khu vực": item.AreaID,
                        "Tên khu vực": item.AreaName,
                        "Loại khu vực": item.AreaTypeName,
                        "Khu vực cha": item.ParentName,
                        "Mã kho điều phối": item.StoreID,
                        "Tên kho điều phối": item.StoreName,
                        //"Tỉnh thành": item.ProvinceName,
                        "Mô tả": item.Description,
                        "Kích hoạt": item.IsActived ? "Có" : "Không",
                        "Ngày cập nhật": formatDate(item.UpdatedDate),
                        "Người cập nhật": item.UpdatedUserFullName
                    };
                    return element;

                })

                this.setState({
                    dataExport: exelData,
                    // IsCallAPIError: apiResult.IsError,
                    // IsLoadDataComplete: true,
                    // IsShowForm: true
                });
            } else {
                this.showMessage(apiResult.Message);
                this.setState({
                    //IsShowForm: false,
                    dataExport: []
                });
            }
        });
    }

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
            //this.searchref.current.changeLoadComplete();
            this.setState({ IsCallAPIError: apiResult.IsError });
            if (!apiResult.IsError) {
                this.setState({
                    gridDataSource: apiResult.ResultObject,
                    IsShowForm: true
                });
            } else {
                this.showMessage(apiResult.Message);
                this.setState({ IsShowForm: false });
            }
        });
    }

    handleCloseMessage() {
        // if (!this.state.IsCallAPIError) {
        //     this.callSearchData(this.state.SearchData);
        // }
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


    render() {
        if (this.state.IsShowForm) {
            return (
                <React.Fragment>
                    <ReactNotification ref={this.notificationDOMRef} />
                    <SearchForm
                        FormName="Tìm kiếm danh mục tài liệu"
                        MLObjectDefinition={SearchMLObjectDefinition}
                        listelement={SearchElementList}
                        onSubmit={this.handleSearchSubmit}
                        ref={this.searchref}
                    />
                    <DataGrid
                        listColumn={DataGridColumnList}
                        dataSource={this.state.gridDataSource}
                        AddLink={AddLink}
                        IDSelectColumnName={IDSelectColumnName}
                        PKColumnName={PKColumnName}
                        onDeleteClick={this.handleDelete}
                        ref={this.gridref}
                        RequirePermission={DOCUMENT_VIEW}
                        DeletePermission={DOCUMENT_DELETE}
                        //ExportPermission={AREA_VIEW}
                        IsAutoPaging={true}
                        RowsPerPage={10}
                        // IsExportFile={true}
                        // DataExport={this.state.dataExport}
                        // fileName="Danh mục tài liệu"
                        // onExportFile={this.handleExportFile.bind(this)}
                    />
                </React.Fragment>
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
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
        callClearLocalCache: (cacheKeyID) => {
            return dispatch(callClearLocalCache(cacheKeyID));
        }
    };
};

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchCom);
export default Search;
