import React from "react";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
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
import {
    ATTRIBUTE_CATEGORY_VIEW,
    ATTRIBUTE_CATEGORY_DELETE
} from "../../../../../constants/functionLists";
import { updatePagePath } from "../../../../../actions/pageAction";
import { showToastAlert } from '../../../../../common/library/ultils'
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";
import { PIMCACHE_ATTRIBUTECATEGORY } from "../../../../../constants/keyCache";
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
        this.gridref = React.createRef();
        this.searchref = React.createRef();
    }

    componentDidMount() {
        this.callSearchData(this.state.SearchData);
        this.props.updatePagePath(PagePath);
    }

    handleSearchEvent(searchText) {
        console.log("handleSearchEvent:", searchText);
    }

    handleSubmitInsertLog() {
        let MLObject = {};
        MLObject.ActivityTitle = "Xóa danh mục thuộc tính";
        MLObject.ActivityDetail = "Xóa danh mục thuộc tính";
        MLObject.ObjectID = "PIM_ATTRIBUTECATEGORY";
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
        this.props.callFetchAPI(APIHostName, DeleteAPIPath, listMLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            showToastAlert(apiResult.Message, apiResult.IsError ? 'error' : 'success');
            if (!apiResult.IsError) {
                this.callSearchData(this.state.SearchData);
                this.props.callClearLocalCache(PIMCACHE_ATTRIBUTECATEGORY)
                this.handleSubmitInsertLog();
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
                SearchKey: "@AttributeCategoryTypeID",
                SearchValue: MLObject.AttributeCategoryTypeID ? MLObject.AttributeCategoryTypeID : -1
            }
        ];
        this.setState({ SearchData: postData });
        this.callSearchData(postData);
    }

    callSearchData(searchData) {
        this.props
            .callFetchAPI(APIHostName, SearchAPIPath, searchData)
            .then(apiResult => {
                this.searchref.current.changeLoadComplete();
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
                    FormName="Đổi mật khẩu"
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
                    hasSearch={false}
                    onSearchEvent={this.handleSearchEvent}
                    RequirePermission={ATTRIBUTE_CATEGORY_VIEW}
                    DeletePermission={ATTRIBUTE_CATEGORY_DELETE}
                    IsAutoPaging={true}
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
            return dispatch(callClearLocalCache(cacheKeyID))
        }
    };
};

const Search = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchCom);
export default Search;
