import React from "react";
import { connect } from "react-redux";
import "react-notifications-component/dist/theme.css";
import { ModalManager } from "react-dynamic-modal";
import ReactNotification from "react-notifications-component";

import {
    AddLink,
    APIHostName,
    DataGridColumnList,
    DeleteNewAPIPath,
    IDSelectColumnName,
    InitSearchParams,
    PagePath,
    PKColumnName,
    SearchAPIPath,
    SearchElementList,
    SearchMLObjectDefinition,
    DataGridCoordinatorStoreColumnList
} from "../constants";

import { CACHE_OBJECT_STORENAME } from "../../../../../constants/systemVars.js";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";
import { ERPCOMMONCACHE_CARRIERTYPE } from "../../../../../constants/keyCache";
import { MessageModal } from "../../../../../common/components/Modal";
import { updatePagePath } from "../../../../../actions/pageAction";
import { VEHICLE_VIEW, VEHICLE_DELETE } from "../../../../../constants/functionLists";
import DataGrid from "../../../../../common/components/DataGrid";
import indexedDBLib from "../../../../../common/library/indexedDBLib.js";
import SearchForm from "../../../../../common/components/FormContainer/SearchForm";

class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.state = {
            cssNotification: "",
            gridDataSource: [],
            iconNotification: "",
            SearchData: InitSearchParams,
        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        // this.callSearchData(this.state.SearchData);
        this.props.updatePagePath(PagePath);
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
            this.addNotification(apiResult.Message, apiResult.IsError);
            if (!apiResult.IsError) {
                this.callSearchData(this.state.SearchData);
            }
        });
    }

    handleSearchSubmit(formData, MLObject) {
        const SearchData = [
            {
                SearchKey: "@KEYWORD",
                SearchValue: MLObject.Keyword
            },
            {
                SearchKey: "@SRHTYPE",
                SearchValue: MLObject.srhType
            },
            {
                SearchKey: "@PARTNERID",
                SearchValue: MLObject.PartnerID
            },
            {
                SearchKey: "@FROMWEIGHT",
                SearchValue: MLObject.FromWeight
            },
            {
                SearchKey: "@TOWEIGHT",
                SearchValue: MLObject.ToWeight
            },
            {
                SearchKey: "@FROMVOLUME",
                SearchValue: MLObject.FromVolume
            },
            {
                SearchKey: "@TOVOLUME",
                SearchValue: MLObject.ToVolume
            },
            {
                SearchKey: "@ACTIVITYSTATUSID",
                SearchValue: MLObject.ActivityStatusID
            },
        ];
        this.setState({ SearchData });
        this.callSearchData(SearchData);
    }

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
            if (!apiResult.IsError) {
                const uptResultObject = apiResult.ResultObject.map(item => {
                    return {
                        ...item,
                        MainDriverUserIDName: `${item.MainDriverUser} - ${item.MainDriverUserName}`,
                        PartnerIDName: `${item.PartnerID} - ${item.PartnerName}`,
                        ActivityStatusIDName: `${item.ActivityStatusID} - ${item.ActivityStatusName}`
                    }
                })
                this.setState({
                    gridDataSource: uptResultObject
                });
            }
            else {
                this.showMessage(apiResult.Message);
            }
        });
    }

    handleCloseMessage() { }

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <SearchForm
                    className="multiple multiple-custom multiple-custom-display"
                    classNamebtnSearch="btn-custom-bottom"
                    FormName="Tìm kiếm danh sách xe"
                    listelement={SearchElementList}
                    MLObjectDefinition={SearchMLObjectDefinition}
                    onSubmit={this.handleSearchSubmit}
                    ref={this.searchref}
                />
                <DataGrid
                    AddLink={AddLink}
                    dataSource={this.state.gridDataSource}
                    DeletePermission={VEHICLE_DELETE}
                    IDSelectColumnName={IDSelectColumnName}
                    IsAutoPaging={true}
                    listColumn={DataGridColumnList}
                    onDeleteClick={this.handleDelete}
                    PKColumnName={PKColumnName}
                    ref={this.gridref}
                    RequirePermission={VEHICLE_VIEW}
                    RowsPerPage={10}
                />
            </React.Fragment>
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
