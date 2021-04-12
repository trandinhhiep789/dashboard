import React from "react";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

// import SearchForm from "../../../../../common/components/Form/SearchForm";
import SearchForm from "../../../../../common/components/FormContainer/SearchForm";

import DataGrid from "../../../../../common/components/DataGrid";
import { MessageModal } from "../../../../../common/components/Modal";
import {
    SearchElementList,
    SearchMLObjectDefinition,
    DataGridColumnList,
    AddLink,
    APIHostName,
    SearchAPIPath,
    DeleteNewAPIPath,
    IDSelectColumnName,
    PKColumnName,
    InitSearchParams,
    InitSearchExportParams,
    PagePath,
    DataGridCoordinatorStoreColumnList,
    APIDataExport
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { COORDINATORSTORE_VIEW, COORDINATORSTORE_DELETE, COORDINATORSTORE_EXPORT } from "../../../../../constants/functionLists";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import indexedDBLib from "../../../../../common/library/indexedDBLib.js";
import { CACHE_OBJECT_STORENAME } from "../../../../../constants/systemVars.js";
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";
import { ERPCOMMONCACHE_CARRIERTYPE } from "../../../../../constants/keyCache";
import { formatDistance } from "date-fns";

class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.callDataExport = this.callDataExport.bind(this);
        this.state = {
            CallAPIMessage: "",
            gridDataSource: [],
            IsCallAPIError: false,
            SearchData: InitSearchParams,
            paramExport: InitSearchExportParams,
            cssNotification: "",
            iconNotification: "",
            IsLoadDataComplete: false,
            dataExport: [],
            PageNumber: 1,
        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        this.callSearchData(this.state.SearchData);
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
        this.props.callFetchAPI(APIHostName, DeleteNewAPIPath, listMLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.addNotification(apiResult.Message, apiResult.IsError);
            if (!apiResult.IsError) {
                this.callSearchData(this.state.SearchData);
            }
        });
    }

    handleSearchSubmit(formData, MLObject) {
        console.log("search", MLObject)
        const postData = [
            {
                SearchKey: "@SHIPMENTORDERTYPEID",
                SearchValue: MLObject.ShipmentOrderTypeID
            },
            {
                SearchKey: "@STOREID",
                SearchValue: MLObject.StoreID
            },
            {
                SearchKey: "@PAGESIZE",
                SearchValue: 100
            },
            {
                SearchKey: "@PAGEINDEX",
                SearchValue: 0
            }
        ];

        const SearchExportParams = [
            {
                SearchKey: "@SHIPMENTORDERTYPEID",
                SearchValue: MLObject.ShipmentOrderTypeID
            },
            {
                SearchKey: "@STOREID",
                SearchValue: MLObject.StoreID
            },
        ];
        // if ((MLObject.ShipmentOrderTypeID == "" || MLObject.ShipmentOrderTypeID < 0) && (MLObject.StoreID == "" || MLObject.StoreID < 0)) {
        //     this.showMessage("Không tôn tại dữ liệu theo điều kiện tìm kiếm!");
        //     this.setState({
        //         gridDataSource: [],
        //         dataExport: []
        //     })
        // }
        // else {
        //     this.setState({ SearchData: postData });
        //     this.callSearchData(postData);
        // }

        this.setState({
            SearchData: postData,
            paramExport: SearchExportParams
        });
        this.callSearchData(postData);
    }

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
            if (!apiResult.IsError) {
                const result = apiResult.ResultObject.map((item) => {
                    item.SenderStoreNameLable = item.SenderStoreID + " - " + item.SenderStoreName;
                    item.StoreNameLable = item.StoreID + " - " + item.StoreName
                    item.PartnerLable = item.PartnerID + " - " + item.PartnerName
                    item.ShipmentOrderTypeLable = item.ShipmentOrderTypeID + " - " + item.ShipmentOrderTypeName
                    return item;
                })

                this.setState({
                    gridDataSource: result,
                    IsCallAPIError: apiResult.IsError,
                    IsLoadDataComplete: true
                });
            }
            else {
                this.showMessage(apiResult.Message);
                this.setState({
                    IsLoadDataComplete: false,
                    gridDataSource: [],
                });
            }

        });
    }

    callDataExport() {
        const { paramExport } = this.state

        let excelData = []
        this.props.callFetchAPI(APIHostName, APIDataExport, paramExport).then(apiResult => {
            console.log("object", apiResult)
            if (!apiResult.IsError) {
                excelData = apiResult.ResultObject.map((item, index) => {
                    let element = {
                        "Loại yêu cầu xuất": item.ShipmentOrderTypeID + " - " + item.ShipmentOrderTypeName,
                        "Đối tác": item.PartnerID + " - " + item.PartnerName,
                        "Kho điều phối": item.StoreID + " - " + item.StoreName,
                        "Kho gửi": item.SenderStoreID + " - " + item.SenderStoreName,
                    };
                    return element;
                })
                this.handleExportFile(excelData)
            } else {
                this.showMessage(apiResult.Message);
            }
        })

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

    handleExportFile(excelData) {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';

        if (excelData.length == 0) {
            this.addNotification("Dữ liệu không tồn tại. Không thể xuất file!")
        } else {
            const ws = XLSX.utils.json_to_sheet(excelData);
            const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: fileType });

            FileSaver.saveAs(data, "Danh sách định nghĩa kho điều phối giao hàng" + fileExtension);

            this.addNotification("Xuất file thành công!")
        }
    }

    handleonChangePage(pageNum) {
        let listMLObject = [];
        const aa = { SearchKey: "@PAGEINDEX", SearchValue: pageNum - 1 };
        listMLObject = Object.assign([], this.state.SearchData, { [3]: aa });
        // console.log(this.state.SearchData,listMLObject)
        this.callSearchData(listMLObject)
        this.setState({
            PageNumber: pageNum
        });
    }

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <SearchForm
                    FormName="Tìm kiếm danh sách định nghĩa kho điều phối giao hàng"
                    MLObjectDefinition={SearchMLObjectDefinition}
                    listelement={SearchElementList}
                    onSubmit={this.handleSearchSubmit}
                    ref={this.searchref}
                    className="multiple"
                />
                <DataGrid
                    listColumn={DataGridCoordinatorStoreColumnList}
                    dataSource={this.state.gridDataSource}
                    AddLink={AddLink}
                    IDSelectColumnName={IDSelectColumnName}
                    PKColumnName={PKColumnName}
                    onDeleteClick={this.handleDelete}
                    ref={this.gridref}
                    RequirePermission={COORDINATORSTORE_VIEW}
                    DeletePermission={COORDINATORSTORE_DELETE}
                    ExportPermission={COORDINATORSTORE_EXPORT}
                    IsAutoPaging={true}
                    RowsPerPage={100}
                    IsExportFile={true}
                    DataExport={this.state.dataExport}
                    onExportFile={this.callDataExport.bind(this)}
                    isPaginationServer={true}
                    PageNumber={this.state.PageNumber}
                    onChangePage={this.handleonChangePage.bind(this)}

                />
            </React.Fragment>
        );
        // if (this.state.IsLoadDataComplete) {

        // }
        // else {
        //     return (
        //         <React.Fragment>
        //             <ReactNotification ref={this.notificationDOMRef} />
        //             <SearchForm
        //                 FormName="Tìm kiếm danh sách định nghĩa kho điều phối giao hàng"
        //                 MLObjectDefinition={SearchMLObjectDefinition}
        //                 listelement={SearchElementList}
        //                 onSubmit={this.handleSearchSubmit}
        //                 ref={this.searchref}
        //             />
        //             <label>Đang nạp dữ liệu...</label>
        //         </React.Fragment>
        //     );
        // }
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
