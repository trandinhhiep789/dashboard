import React from "react";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import SearchForm from "../../../../common/components/Form/SearchForm";
import DataGrid from "../../../../common/components/DataGrid";
import { MessageModal } from "../../../../common/components/Modal";
import {
    SearchElementList,
    SearchMLObjectDefinition,
    DataGridColumnList,
    DataGridColumnListMobile,
    AddLink,
    APIHostName,
    SearchAPIPath,
    DeleteAPIPath,
    IDSelectColumnName,
    PKColumnName,
    InitSearchParams,
    PagePath,
    AddLogAPIPath
} from "../Constants";
import Media from "react-media";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import {
    PARTNER_PRODUCT_MAP_TYPE_VIEW,
    PARTNER_PRODUCT_MAP_TYPE_DELETE
} from "../../../../constants/functionLists";
import { callGetCache, callClearLocalCache } from "../../../../actions/cacheAction";
import { PIMCACHE_PIM_PARTNERPRODUCTMAPTYPE } from "../../../../constants/keyCache";
import { showToastAlert } from '../../../../common/library/ultils'
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
        };
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        this.callSearchData(this.state.SearchData);
    }

    handleSearchSubmit(formData, MLObject) {
        const postData = [
            {
                SearchKey: "@Keyword",
                SearchValue: MLObject.Keyword
            }
        ];
        this.setState({ SearchData: postData });
        this.callSearchData(postData);
    }

    handleSubmitInsertLog() {
        let MLObject = {};
        MLObject.ActivityTitle = "Xóa loại bảng mã sản phẩm của đối tác";
        MLObject.ActivityDetail = "Xóa loại bảng mã sản phẩm của đối tác";
        MLObject.ObjectID = "PIM_PARTNERPRODUCTMAPTYPE";
        MLObject.ActivityUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        this.props.callFetchAPI(APIHostName, AddLogAPIPath, MLObject);
    }



    handleDelete(deleteList, pkColumnName) {
        let listMLObject = [];
        deleteList.map((row, index) => {
            let MLObject = {};
            pkColumnName.map((pkItem, pkIndex) => { MLObject[pkItem.key] = row.pkColumnName[pkIndex].value; });
            MLObject.DeletedUser = this.props.AppInfo.LoginInfo.Username;
            listMLObject.push(MLObject);
        });
        this.props.callFetchAPI(APIHostName, DeleteAPIPath, listMLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            showToastAlert(apiResult.Message, apiResult.IsError ? 'error' : 'success');
            if (!apiResult.IsError) {
                this.callSearchData(this.state.SearchData);
                this.props.callClearLocalCache(PIMCACHE_PIM_PARTNERPRODUCTMAPTYPE)
                this.handleSubmitInsertLog();
            }
        });
    }

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
            if (!apiResult.IsError) {
                this.setState({
                    gridDataSource: apiResult.ResultObject,
                    IsCallAPIError: apiResult.IsError
                });
            }
        });
    }

    handleCloseMessage() {
        if (!this.state.IsCallAPIError) {
            this.callSearchData(this.state.SearchData);
        }
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
        return (
            <React.Fragment>
                <SearchForm
                    FormName="Danh sách loại bảng mã sản phẩm của đối tác"
                    MLObjectDefinition={SearchMLObjectDefinition}
                    listelement={SearchElementList}
                    onSubmit={this.handleSearchSubmit}
                />
                <Media query="(max-width: 991px)">
                    {matches =>
                        matches ? (
                            <DataGrid
                                listColumn={DataGridColumnListMobile}
                                dataSource={this.state.gridDataSource}
                                AddLink={AddLink}
                                IDSelectColumnName={IDSelectColumnName}
                                PKColumnName={PKColumnName}
                                onDeleteClick={this.handleDelete}
                                ref={this.gridref}
                                hasSearch={false}
                                onSearchEvent={this.handleSearchEvent}
                                IsAutoPaging={true}
                                RequirePermission={
                                    PARTNER_PRODUCT_MAP_TYPE_VIEW
                                }
                                DeletePermission={
                                    PARTNER_PRODUCT_MAP_TYPE_DELETE
                                }
                                RowsPerPage={10}
                            />
                        ) : (
                                <DataGrid
                                    listColumn={DataGridColumnList}
                                    dataSource={this.state.gridDataSource}
                                    AddLink={AddLink}
                                    IDSelectColumnName={IDSelectColumnName}
                                    PKColumnName={PKColumnName}
                                    onDeleteClick={this.handleDelete}
                                    ref={this.gridref}
                                    hasSearch={false}
                                    onSearchEvent={this.handleSearchEvent}
                                    IsAutoPaging={true}
                                    RequirePermission={
                                        PARTNER_PRODUCT_MAP_TYPE_VIEW
                                    }
                                    DeletePermission={
                                        PARTNER_PRODUCT_MAP_TYPE_DELETE
                                    }
                                    RowsPerPage={10}
                                />
                            )
                    }
                </Media>
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
            return dispatch(callClearLocalCache(cacheKeyID))
        }
    };
};

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchCom);
export default Search;
