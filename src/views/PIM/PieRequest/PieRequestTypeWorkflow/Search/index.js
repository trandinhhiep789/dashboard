import React from "react";
import {
    connect
} from 'react-redux';
import {
    Modal,
    ModalManager,
    Effect
} from 'react-dynamic-modal';
import SearchForm from "../../../../../common/components/Form/SearchForm";
import DataGrid from "../../../../../common/components/DataGrid";
import {
    MessageModal
} from "../../../../../common/components/Modal";
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
    PagePath
} from "../constants"
import {
    callFetchAPI
} from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
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
            SearchData: InitSearchParams
        };
        this.gridref = React.createRef();
    }

    handleCloseMessage() {
        if (!this.state.IsCallAPIError) {
            this.callSearchData(this.state.SearchData);
        }
    }
    showMessage(message) {
        ModalManager.open(< MessageModal title="Thông báo"
            message={message}
            onRequestClose={() => true}
            onCloseModal={this.handleCloseMessage}
        />);
    }
    componentDidMount() {
        this.callSearchData(this.state.SearchData);
        this.props.updatePagePath(PagePath);
    }
    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then((apiResult) => {
            if (!apiResult.IsError) {
                this.setState({
                    gridDataSource: apiResult.ResultObject,
                    IsCallAPIError: apiResult.IsError
                })
            }
            else {
                this.setState({ IsCallAPIError: apiResult.IsError })
                this.showMessage(apiResult.Message);
            }
        });
    }
    handleDelete(deleteList) {
        this.props.callFetchAPI(APIHostName, DeleteAPIPath, deleteList).then((apiResult) => {
            this.setState({
                IsCallAPIError: apiResult.IsError
            });
            this.showMessage(apiResult.Message);
        });
    }
    handleSearchSubmit(formData, MLObject) {
        const postData = [{
            SearchKey: "@Keyword",
            SearchValue: MLObject.Keyword
        }];
        this.setState({
            SearchData: postData
        });
        this.callSearchData(postData);
        this.gridref.current.clearData();
    }

    render() {
        return (
            < React.Fragment >
                <SearchForm FormName="Đổi mật khẩu"
                    MLObjectDefinition={SearchMLObjectDefinition}
                    listelement={SearchElementList}
                    onSubmit={this.handleSearchSubmit}
                />
                <DataGrid listColumn={DataGridColumnList}
                    dataSource={this.state.gridDataSource}
                    AddLink={AddLink}
                    IDSelectColumnName={IDSelectColumnName}
                    PKColumnName={PKColumnName}
                    onDeleteClick={this.handleDelete}
                    ref={this.gridref}
                    IsAutoPaging={true}
                    RowsPerPage={10}
                />
            </ React.Fragment >
        );
    }
}

const mapStateToProps = state => {
    return {
        AppInfo: state,
        FetchAPIInfo: state.FetchAPIInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updatePagePath: (pagePath) => {
            dispatch(updatePagePath(pagePath));
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        }
    }
}

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchCom);
export default Search;