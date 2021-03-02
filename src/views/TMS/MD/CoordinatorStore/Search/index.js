import React from "react";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
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
    PagePath,
    DataGridCoordinatorStoreColumnList
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { COORDINATORSTORE_VIEW, COORDINATORSTORE_DELETE } from "../../../../../constants/functionLists";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import indexedDBLib from "../../../../../common/library/indexedDBLib.js";
import { CACHE_OBJECT_STORENAME } from "../../../../../constants/systemVars.js";
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";
import { ERPCOMMONCACHE_CARRIERTYPE } from "../../../../../constants/keyCache";

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
            cssNotification: "",
            iconNotification: "",
            IsLoadDataComplete: false,
            dataExport: []
        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        //this.callSearchData(this.state.SearchData);

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
        const postData = [
            {
                SearchKey: "@ShipmentOrderTypeID",
                SearchValue: MLObject.ShipmentOrderTypeID
            },
            {
                SearchKey: "@StoreID",
                SearchValue: MLObject.StoreID
            }
        ];
        this.setState({ SearchData: postData });
        this.callSearchData(postData);
    }

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
            // console.log("â", searchData, apiResult)
            if (!apiResult.IsError) {
                const result = apiResult.ResultObject.map((item) => {
                    item.SenderStoreNameLable = item.SenderStoreID + " - " + item.SenderStoreName;
                    item.StoreNameLable = item.StoreID + " - " + item.StoreName
                    item.PartnerLable = item.PartnerID + " - " + item.PartnerName
                    item.ShipmentOrderTypeLable = item.ShipmentOrderTypeID + " - " + item.ShipmentOrderTypeName
                    return item;
                })

                // xuất exel
                const exelData = apiResult.ResultObject.map((item, index) => {
                    let element = {
                        "Loại yêu cầu xuất": item.ShipmentOrderTypeID + " - " + item.ShipmentOrderTypeName,
                        "Đối tác": item.PartnerID + " - " + item.PartnerName,
                        "Kho điều phối": item.StoreID + " - " + item.StoreName,
                        "Kho gửi": item.SenderStoreID + " - " + item.SenderStoreName,
                    };
                    return element;

                })

                this.setState({
                    dataExport: exelData,
                    gridDataSource: result,
                    IsCallAPIError: apiResult.IsError,
                    IsLoadDataComplete: true
                });
            }
            else {
                this.showMessage(apiResult.Message);
                this.setState({
                    IsLoadDataComplete: false
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
    handleExportFile(result) {
        // console.log("result", result)
        this.addNotification(result.Message);
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
                    IsAutoPaging={true}
                    RowsPerPage={10}
                    IsExportFile={true}
                    DataExport={this.state.dataExport}
                    fileName="Danh sách định nghĩa kho điều phối giao hàng"
                    onExportFile={this.handleExportFile.bind(this)}
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
