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
import { updatePagePath } from "../../../../../actions/pageAction";
import {
    CONTENTTYPE_VIEW,
    CONTENTTYPE_DELETE
} from "../../../../../constants/functionLists";
import { showToastAlert } from '../../../../../common/library/ultils'

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
            SearchElementList: SearchElementList,
            IsLoading: true
        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
    }

    componentDidMount() {
        this.callSearchData(this.state.SearchData);
        this.props.updatePagePath(PagePath);
    }

    handleSubmitInsertLog() {
        let MLObject = {};
        MLObject.ActivityTitle = "Xóa loại nội dung";
        MLObject.ActivityDetail = "Xóa loại nội dung";
        MLObject.ObjectID = "PIM_CONTENTTYPE";
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
                this.handleSubmitInsertLog();
            }
        });
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
        this.gridref.current.clearData();
    }

    callSearchData(searchData) {
        this.setState({ IsLoading: true });
        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
            if (apiResult && !apiResult.IsError) {
                this.setState({
                    gridDataSource: apiResult.ResultObject,
                    IsCallAPIError: apiResult.IsError,
                    IsLoading: false
                });
            } else {
                this.setState({ IsLoading: false });
                this.showMessage(
                    "Lỗi kết nối! Vui lòng kiểm tra lại kết nối mạng"
                );
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
                    MLObjectDefinition={SearchMLObjectDefinition}
                    listelement={this.state.SearchElementList}
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
                    IsAutoPaging={true}
                    RowsPerPage={20}
                    RequirePermission={CONTENTTYPE_VIEW}
                    DeletePermission={CONTENTTYPE_DELETE}
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
        }
    };
};

const Search = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchCom);
export default Search;
