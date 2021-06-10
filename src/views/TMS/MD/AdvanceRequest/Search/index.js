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
import { ADVANCEREQUEST_EXPORT, ADVANCEREQUEST_VIEW } from "../../../../../constants/functionLists";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { callGetCache } from "../../../../../actions/cacheAction";
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
                SearchKey: "@AdvanceRequestTypeID",
                SearchValue: MLObject.AdvanceRequestTypeID
            },
            {
                SearchKey: "@ReceiverStoreID",
                SearchValue: MLObject.ReceiverStoreID
            },
            {
                SearchKey: "@FromDate",
                SearchValue: MLObject.FromDate
            },
            {
                SearchKey: "@ToDate",
                SearchValue: MLObject.ToDate
            },
            {
                SearchKey: "@Status",
                SearchValue: parseInt(MLObject.Status)
            }
        ];
        this.setState({ SearchData: postData });
        this.callSearchData(postData);
        //this.gridref.current.clearData();
        //console.log("handleSearchSubmit",MLObject);
    }

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
            //this.searchref.current.changeLoadComplete();
            this.setState({ IsCallAPIError: apiResult.IsError });
            if (!apiResult.IsError) {

                // xuất exel
                const exelData = apiResult.ResultObject.map((item, index) => {
                    let element = {
                        "Mã yêu cầu tạm ứng": item.AdvanceRequestID,
                        "Tiêu đề yêu cầu tạm ứng": item.AdvanceRequestTitle,
                        "Loại yêu cầu tạm ứng": item.AdvanceRequestTypeName,
                        "Mã yêu cầu vận chuyển": item.ShipmentOrderID,
                        "Mã đơn hàng tạm ứng": item.SaleOrderID,
                        "Người yêu cầu": item.RequestUserName,
                        "Ngày yêu cầu": formatDate(item.RequestDate),
                        "Đã xuất": item.IsOutput ? "Có" : "Không",
                        "Đã hủy": item.IsDeleted ? "Có" : "Không",
                        "Đã bàn giao": item.IsHandoverMaterial ? "Có" : "Không",


                        // "Mô tả": item.Description,
                        // "Kích hoạt": item.IsActived ? "Có" : "Không",
                        // "Ngày tạo": formatDate(item.CreatedDate),
                        // "Người tạo": item.CreatedFullName
                    };
                    return element;

                })

                this.setState({
                    dataExport: exelData,
                    gridDataSource: apiResult.ResultObject,
                    IsCallAPIError: apiResult.IsError,
                    IsLoadDataComplete: true,
                    IsShowForm: true
                });



            } else {
                this.setState({ IsShowForm: false, MessageDetail: apiResult.Message });
            }

        });
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

    render() {
        if (this.state.IsShowForm) {
            return (
                <React.Fragment>
                    <ReactNotification ref={this.notificationDOMRef} />
                    <SearchForm
                        FormName="Tìm kiếm thông tin yêu cầu tạm ứng"
                        MLObjectDefinition={SearchMLObjectDefinition}
                        listelement={SearchElementList}
                        onSubmit={this.handleSearchSubmit}
                        ref={this.searchref}
                        proCNBtnSubmit={"search-forms-item item btnSearchSubmitCustom"}
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
                        RequirePermission={ADVANCEREQUEST_VIEW}
                        ExportPermission={ADVANCEREQUEST_EXPORT}
                        //DeletePermission={CANCELDELIVERYREASON_DELETE}
                        IsAutoPaging={true}
                        RowsPerPage={10}
                        IsExportFile={true}
                        DataExport={this.state.dataExport}
                        fileName="Danh sách thông tin yêu cầu tạm ứng"
                        onExportFile={this.handleExportFile.bind(this)}
                    />
                </React.Fragment>
            );
        }
        else {
            return (
                <div className="col-md-12 message-detail">
                    <label>{this.state.MessageDetail}</label>
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
