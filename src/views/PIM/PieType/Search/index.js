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
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import {
    PIE_TYPE_VIEW,
    PIE_TYPE_DELETE
} from "../../../../constants/functionLists";
import { callGetCache, callClearLocalCache } from "../../../../actions/cacheAction";
import { PIMCACHE_PIETYPE } from "../../../../constants/keyCache";
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
            SearchElementList: SearchElementList,
        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
    }

    handleGetCache() {
        this.props.callGetCache("PIMCACHE.PIETYPE").then((result) => {
            console.log("handleGetCache: ", result);
        });
    }

    componentDidMount() {
        this.callSearchData(this.state.SearchData);
        this.props.updatePagePath(PagePath);
    }

    componentWillMount() {
        this.getPieTypeList();
    }

    handleSubmitInsertLog() {
        let MLObject = {};
        MLObject.ActivityTitle = "Xóa loại chỉnh sửa";
        MLObject.ActivityDetail = "Xóa loại chỉnh sửa";
        MLObject.ObjectID = "PIM_PIETYPE";
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
                this.handleSubmitInsertLog();
                this.props.callClearLocalCache(PIMCACHE_PIETYPE)
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

    getPieTypeList() {
        this.props.callFetchAPI(APIHostName, "api/PieType/Search", [{ SearchKey: "@Keyword", SearchValue: "" }]).then(apiResult => {
            if (apiResult) {
                if (apiResult.IsError) {
                    this.setState({
                        IsCallAPIError: apiResult.IsError
                    });
                    this.showMessage(apiResult.Message);
                } else {
                    let convertdata = apiResult.ResultObject.map(function (
                        objData
                    ) {
                        return {
                            value: objData.PieTypeID,
                            name: objData.PieTypeName
                        };
                    });
                    convertdata = [{ value: -1, name: "Tất cả" }].concat(
                        convertdata
                    );
                    let _SearchElementList = this.state.SearchElementList;
                    _SearchElementList.forEach(function (objElement) {
                        if (objElement.DataSourceMember == "PieTypeID") {
                            objElement.listoption = convertdata;
                        }
                    });
                    this.setState({
                        SearchElementList: _SearchElementList
                    });
                    this.callSearchData(this.state.SearchData);
                }
            }
        });
    }

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
            if (apiResult && !apiResult.IsError) {
                this.setState({
                    gridDataSource: apiResult.ResultObject,
                    IsCallAPIError: apiResult.IsError
                });
                console.log("dsadsad", apiResult.ResultObject);
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
                    FormName="Thêm loại chỉnh sửa thông tin"
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
                    RequirePermission={PIE_TYPE_VIEW}
                    DeletePermission={PIE_TYPE_DELETE}
                    IsAutoPaging={true}
                    RowsPerPage={20}
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

const SearchPieType = connect(mapStateToProps, mapDispatchToProps)(SearchCom);
export default SearchPieType;
