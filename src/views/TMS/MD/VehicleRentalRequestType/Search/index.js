import React from "react";
import "react-notifications-component/dist/theme.css";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import ReactNotification from "react-notifications-component";

import {
    // DataGridCoordinatorStoreColumnList
    // DeleteNewAPIPath,
    // InitSearchParams,
    AddLink,
    APIHostName,
    DataGridColumnList,
    IDSelectColumnName,
    PagePath,
    PKColumnName,
    SearchAPIPath,
    SearchElementList,
    SearchMLObjectDefinition,
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

        this.state = {
            cssNotification: "",
            gridDataSource: [],
            iconNotification: "",
            SearchData: [
                {
                    SearchKey: "@KEYWORD",
                    SearchValue: ""
                }
            ],
        };

        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.callSearchData(this.state.SearchData);
        this.props.updatePagePath(PagePath);
    }

    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
            // onCloseModal={}
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
        // const DeleteList = deleteList.map(item => {
        //     return {
        //         VehicleID: item.pkColumnName[0].value,
        //         DeletedUser: this.props.AppInfo.LoginInfo.Username
        //     }
        // })

        // this.props.callFetchAPI(APIHostName, DeleteNewAPIPath, DeleteList).then(apiResult => {
        //     this.addNotification(apiResult.Message, apiResult.IsError);
        //     if (!apiResult.IsError) {
        //         this.callSearchData(this.state.SearchData);
        //     }
        // });
    }

    handleSearchSubmit(formData, MLObject) {
        const SearchData = [
            {
                SearchKey: "@KEYWORD",
                SearchValue: MLObject.Keyword
            }
        ];
        this.setState({ SearchData });
        this.callSearchData(SearchData);
    }

    callSearchData(searchData) {
        return;
        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
            if (!apiResult.IsError) {
                this.setState({
                    gridDataSource: apiResult.ResultObject
                });
            } else {
                this.showMessage(apiResult.Message);
            }
        });
    }

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />

                <SearchForm
                    FormName="Loại xử lý của yêu cầu thuê xe"
                    MLObjectDefinition={SearchMLObjectDefinition}
                    listelement={SearchElementList}
                    onSubmit={this.handleSearchSubmit}
                    ref={this.searchref}
                />

                <DataGrid
                    AddLink={AddLink}
                    dataSource={this.state.gridDataSource}
                    DeletePermission={""}
                    IDSelectColumnName={IDSelectColumnName}
                    IsAutoPaging={true}
                    listColumn={DataGridColumnList}
                    onDeleteClick={this.handleDelete}
                    PKColumnName={PKColumnName}
                    ref={this.gridref}
                    RequirePermission={""}
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
