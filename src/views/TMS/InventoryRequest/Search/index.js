import React from "react";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import SearchForm from "../../../../common/components/FormContainer/SearchForm";
import DataGrid from "../../../../common/components/DataGrid";
import InputGridNew from "../../../../common/components/FormContainer/FormControl/InputGridNew";
import { MessageModal } from "../../../../common/components/Modal";
import { formatDate } from "../../../../common/library/CommonLib.js";
import isBefore from 'date-fns/isBefore';
import formatDistance from 'date-fns/formatDistance';
import viLocale from "date-fns/locale/vi";
import { compareAsc, format, add } from 'date-fns';

import { INVENTORYREQUEST_VIEW, INVENTORYREQUEST_DELETE, INVENTORYREQUEST_EXPORT } from "../../../../constants/functionLists";
import { showModal, hideModal } from '../../../../actions/modal';
import { MODAL_TYPE_COMMONTMODALS } from '../../../../constants/actionTypes';

import {
    SearchElementList,
    SearchMLObjectDefinition,
    DataGridColumnList,
    AddLink,
    APIHostName,
    SearchAPIPath,
    GetInventoryTerm,
    DeleteNewAPIPath,
    IDSelectColumnName,
    PKColumnName,
    InitSearchParams,
    PagePath,
    AddLogAPIPath,
    TitleFormSearch
} from "../constants";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import { callGetCache } from "../../../../actions/cacheAction";
import ListInventoryRequestType from "../Component/ListInventoryRequestType";

class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.callSearchData = this.callSearchData.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleInputGridInsert = this.handleInputGridInsert.bind(this);
        this.state = {
            CallAPIMessage: "",
            gridDataSource: [],
            IsCallAPIError: false,
            SearchData: InitSearchParams,
            cssNotification: "",
            iconNotification: "",
            PageNumber: 1,
            IsLoadDataComplete: false,
            SearchElementlist: null,
            dataExport: []

        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        this.callSearchData(this.state.SearchData);
        this.GetInventoryTermData();
    }

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
                const dataSource = apiResult.ResultObject.map((item, index) => {
                    if (item.IsCreatedOrder) {
                        item.OutputStatusLable = <span className='lblstatus text-success'>Đã xuất</span>;
                    }
                    else {
                        item.OutputStatusLable = <span className='lblstatus text-warning'>Chưa xuất</span>;
                    }
                    if (item.IsreViewed) {
                        item.ReviewStatusLable = <span className='lblstatus text-success'>Đã duyệt</span>;

                    }
                    else {
                        item.ReviewStatusLable = <span className='lblstatus text-warning'>Chưa duyệt</span>;

                    }
                    return {
                        ...item,
                        ApproverName: `${item.RequestUser} - ${item.FullName}`
                    }
                    
                })
                const tempData = apiResult.ResultObject.map((item, index) => {
                    let element = {
                        "Mã yêu cầu": item.InventoryRequestID,
                        "Tiêu Đề yêu cầu": item.InventoryRequestTitle,
                        "Loại yêu cầu hủy vật tư": item.InventoryRequestTypeID + "-" + item.InventoryRequestTypeName,
                        "Kho yêu cầu": item.RequestStoreID + "-" + item.StoreName,
                        "Ngày yêu cầu": item.RequestDate,
                        "Người yêu cầu": item.RequestUser + " - " + item.FullName,
                        "Đã duyệt": item.IsreViewed = true ? 'Đã duyệt' : 'Chưa duyệt',
                        "Đã xuất": item.IsCreatedOrder = true ? 'Đã xuất' : 'Chưa xuất'
                    };

                    return element;
                })

                this.setState({
                    gridDataSource: dataSource,
                    dataExport: tempData,
                    IsCallAPIError: apiResult.IsError,
                });
            }
        });
    }
    GetInventoryTermData() {
        let _SearchElementList = SearchElementList;
        let listOption = [{ value: -1, label: "---Vui lòng chọn---" }];
        let param = {};
        this.props.callFetchAPI(APIHostName, GetInventoryTerm, param).then(apiResult => {
            if (apiResult.IsError) {
                listOption = listOptionNull;
                _SearchElementList.forEach(function (objElement) {
                    if (objElement.DataSourceMember == "InventorytermID") {
                        objElement.listoption = listOption;
                        objElement.value = -1;
                    }
                }.bind(this));
            } else {
                if (apiResult.ResultObject) {
                    apiResult.ResultObject.map((cacheItem) => {
                        listOption.push({ value: cacheItem["inventoryTermID"], label: cacheItem["inventoryTermID"] + ' - ' + cacheItem['inventoryTermName'] });
                    });
                }
                _SearchElementList.forEach(function (objElement) {
                    if (objElement.DataSourceMember == "InventorytermID") {
                        objElement.listoption = listOption;
                        objElement.value = -1;
                    }
                }.bind(this));
            }
           
            this.setState({
                SearchElementlist: _SearchElementList
            });

           
        });


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
        console.log("listMLObject", deleteList, pkColumnName, listMLObject);
        this.props.callFetchAPI(APIHostName, DeleteNewAPIPath, listMLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.addNotification(apiResult.Message, apiResult.IsError);
            if (!apiResult.IsError) {
                this.callSearchData(this.state.SearchData);
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

    handleSearchSubmit(formData, MLObject) {
        const DataSearch = [
            {
                SearchKey: "@Keyword",
                SearchValue: MLObject.Keyword
            },
            {
                SearchKey: "@INVENTORYREQUESTTYPEID",
                SearchValue: MLObject.InventoryRequestTypeID
            },
            {
                SearchKey: "@INVENTORYTERMID",
                SearchValue: MLObject.InventorytermID
            },
            {
                SearchKey: "@REQUESTSTOREID",
                SearchValue: MLObject.RequestStoreID
            },
            {
                SearchKey: "@FROMDATE",
                SearchValue: MLObject.FromDate
            },
            {
                SearchKey: "@TODATE",
                SearchValue: MLObject.ToDate
            },
            {
                SearchKey: "@ISREVIEWED",
                SearchValue: MLObject.IsreViewed
            },
            {
                SearchKey: "@ISCREATEDORDER",
                SearchValue: MLObject.IsCreatedOrder
            }
        ];

        this.setState({
            SearchData: DataSearch
        });

        this.callSearchData(DataSearch);
    }

    handleExportFile(result) {
        this.addNotification(result.Message, result.IsError);
    }

    handleInputGridInsert(MLObjectDefinition, modalElementList, dataSource) {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Loại yêu cầu kiểm kê',
            content: {
                text: <ListInventoryRequestType />
            },
            maxWidth: '800px'
        });
    }

    render() {
        console.log(this.state.SearchElementlist);
        let {SearchElementlist} = this.state;
        if (SearchElementlist == null) {
            return <React.Fragment>Đang tải dữ liệu...</React.Fragment>
        } else{
            return (
                <React.Fragment>
                    <ReactNotification ref={this.notificationDOMRef} />
                    <SearchForm
                        FormName={TitleFormSearch}
                        MLObjectDefinition={SearchMLObjectDefinition}
                        listelement={SearchElementlist}
                        onSubmit={this.handleSearchSubmit}
                        ref={this.searchref}
                        className="multiple multiple-custom multiple-custom-display"
                        classNamebtnSearch="btn-custom-bottom"
                    />
                    <DataGrid
                        listColumn={DataGridColumnList}
                        dataSource={this.state.gridDataSource}
                        //AddLink={AddLink}
                        IDSelectColumnName={IDSelectColumnName}
                        PKColumnName={PKColumnName}
                        onDeleteClick={this.handleDelete}
                        onInsertClick={this.handleInputGridInsert}
                        IsCustomAddLink={true}
                        IsDelete={true}
                        IsAutoPaging={true}
                        RowsPerPage={10}
                        IsExportFile={true}
                        DataExport={this.state.dataExport}
                        RequirePermission={INVENTORYREQUEST_VIEW}
                        DeletePermission={INVENTORYREQUEST_DELETE}
                        ExportPermission={INVENTORYREQUEST_EXPORT}
                        fileName="Danh sách yêu cầu kiểm kê"
                        onExportFile={this.handleExportFile.bind(this)}
                    />
                </React.Fragment>
            );
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: (type, props) => {
            dispatch(hideModal(type, props));
        }
    };
};

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchCom);
export default Search;
