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
    AddLogAPIPath
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { APPFEEDBACKTYPE_VIEW, FUELPRICE_VIEW, PARTNERTRANSACTION_VIEW } from "../../../../../constants/functionLists";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import indexedDBLib from "../../../../../common/library/indexedDBLib.js";
import { CACHE_OBJECT_STORENAME } from "../../../../../constants/systemVars.js";
import { callGetCache } from "../../../../../actions/cacheAction";
import { toIsoStringCus } from "../../../../../utils/function";
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
            IsShowForm: true,
            dataExport: []
        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        //this.callSearchData(this.state.SearchData);
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
            {
                SearchKey: "@AppDataSyncTypeID",
                SearchValue: MLObject.AppDataSyncTypeID
            },
            {
                SearchKey: "@SyncFrequencyType",
                SearchValue: MLObject.SyncFrequencyType
            },
            // {
            //     SearchKey: "@PartnerTransactionTypeID",
            //     SearchValue: MLObject.PartnerTransactionTypeID
            // },
            // {
            //     SearchKey: "@PartnerID",
            //     SearchValue: MLObject.PartnerID
            // },
            {
                SearchKey: "@FromDate",
                SearchValue: toIsoStringCus(new Date(MLObject.FromDate).toISOString())
            },
            {
                SearchKey: "@ToDate",
                SearchValue: toIsoStringCus(new Date(MLObject.ToDate).toISOString())
            }
        ];


        this.setState({ SearchData: postData });
        this.callSearchData(postData);
        //this.gridref.current.clearData();
        //console.log("handleSearchSubmit",MLObject);
    }

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            if (apiResult && !apiResult.IsError) {

                // xuất exel
                const exelData = apiResult.ResultObject.map((item, index) => {
                    let element = {
                        "Loại đồng bộ": item.AppDataSyncTypeName,
                        "Loại định kỳ": item.SyncFrequencyTypeName,
                        "Ngày/tháng đồng bộ": formatDate(item.SyncDate, true),
                        "Đã bắt đầu": item.IsBeginSync? "X": "",
                        "Đã kết thúc": item.IsCompletedSync? "X": "",
                        "Thời gian bắt đầu": formatDate(item.BeginSyncTime, true),
                        "Thời gian kết thúc": formatDate(item.EndSyncTime, true),
                        "Chuổi khoảng thời gian": item.SyncInterval,
                        "Tổng số dòng": item.TotalSyncRows,
                        "Mã giao dịch": item.PartnerTransactionID,
                        "Lỗi đồng bộ": item.IsSyncError? "X": "",
                        "Nội dung lỗi": item.ErrorContent
                    };
                    return element;

                })

                this.setState({
                    dataExport: exelData,
                    gridDataSource: apiResult.ResultObject,
                    IsShowForm: true
                });

            } else {
                this.showMessage(apiResult.Message);
                this.setState({
                    IsShowForm: false,
                    dataExport: []
                });
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
                        FormName="Tìm kiếm thông tin đồng bộ dữ liệu giữa các ứng dụng"
                        MLObjectDefinition={SearchMLObjectDefinition}
                        listelement={SearchElementList}
                        onSubmit={this.handleSearchSubmit}
                        ref={this.searchref}
                    />
                    <DataGrid
                        listColumn={DataGridColumnList}
                        dataSource={this.state.gridDataSource}
                        //AddLink={AddLink}
                        IsShowButtonAdd={false}
                        IsShowButtonDelete={false}
                        IDSelectColumnName={IDSelectColumnName}
                        PKColumnName={PKColumnName}
                        //onDeleteClick={this.handleDelete}
                        ref={this.gridref}
                        RequirePermission={APPFEEDBACKTYPE_VIEW}
                        ExportPermission={APPFEEDBACKTYPE_VIEW}
                        //DeletePermission={CANCELDELIVERYREASON_DELETE}
                        IsAutoPaging={true}
                        RowsPerPage={50}

                        IsExportFile={true}
                        DataExport={this.state.dataExport}
                        fileName="Danh sách đồng bộ dữ liệu giữa các ứng dụng"
                        onExportFile={this.handleExportFile.bind(this)}
                    />
                </React.Fragment>
            );
        }
        else {
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
        }
    };
};

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchCom);
export default Search;
