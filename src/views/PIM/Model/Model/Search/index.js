import React from "react";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
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
    AddAPIPath,
    DeleteAPIPath,
    IDSelectColumnName,
    PKColumnName,
    InitSearchParams,
    PagePath,
    MLObjectDefinition1,
    AddModelColumnList,
    AddLogAPIPath
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { showModal } from "../../../../../actions/modal";
import { MODAL_TYPE_CONFIRMATION } from "../../../../../constants/actionTypes";
import { GetMLObjectData } from "../../../../../common/library/form/FormLib";
import { showToastAlert } from '../../../../../common/library/ultils'

class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleInputGridInsert = this.handleInputGridInsert.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.state = {
            CallAPIMessage: "",
            gridDataSource: [],
            IsCallAPIError: false,
            SearchData: InitSearchParams
        };
        this.gridref = React.createRef();
    }

    componentDidMount() {
        this.callSearchData(this.state.SearchData);
        this.props.updatePagePath(PagePath);
    }

    handleDeleteInsertLog() {
        let MLObject = {};
        MLObject.ActivityTitle = "Xóa model";
        MLObject.ActivityDetail = "Xóa model";
        MLObject.ObjectID = "PIM_MODEL";
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
                this.handleDeleteInsertLog();
            }
        });
    }

    handleSubmitInsertLog(MLObject) {
        MLObject.ActivityTitle = `Thêm mới model: ${MLObject.ModelName}`;
        MLObject.ActivityDetail = `Thêm mới model: ${MLObject.ModelName} ${"\n"}Mô tả: ${MLObject.ModelDescription}`;
        MLObject.ObjectID = "PIM_MODEL";
        MLObject.ActivityUser = MLObject.CreatedUser;
        this.props.callFetchAPI(APIHostName, AddLogAPIPath, MLObject);
    }

    handleInputGridInsert(MLObjectDefinition, modalElementList, dataSource) {
        this.props.showModal(MODAL_TYPE_CONFIRMATION, {
            title: "Thêm mới Model",
            onConfirm: (isConfirmed, formData) => {
                if (isConfirmed) {
                    let MLObject = GetMLObjectData(MLObjectDefinition, formData, dataSource);
                    if (MLObject) {
                        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
                        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
                        this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then(apiResult => {
                            if (!apiResult.IsError) {
                                this.callSearchData(this.state.SearchData);
                                this.handleSubmitInsertLog(MLObject);
                            }
                            this.setState({ IsCallAPIError: apiResult.IsError });
                            showToastAlert(apiResult.Message, apiResult.IsError ? 'error' : 'success');
                        });
                    }
                }
            },
            modalElementList: modalElementList
        });
    }

    handleSearchSubmit(formData, MLObject) {
        const postData = [{
            SearchKey: "@Keyword",
            SearchValue: MLObject.Keyword
        }];
        this.setState({ SearchData: postData });
        this.callSearchData(postData);
    }

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
            if (!apiResult.IsError) {
                this.setState({
                    gridDataSource: apiResult.ResultObject,
                    IsCallAPIError: apiResult.IsError
                });
            } else {
                this.setState({ IsCallAPIError: apiResult.IsError });
                this.showMessage(apiResult.Message);
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
                    FormName="Model"
                    MLObjectDefinition={SearchMLObjectDefinition}
                    listelement={SearchElementList}
                    onSubmit={this.handleSearchSubmit}
                />
                <DataGrid
                    listColumn={DataGridColumnList}
                    dataSource={this.state.gridDataSource}
                    modalElementList={AddModelColumnList}
                    MLObjectDefinition={MLObjectDefinition1}
                    AddLink={AddLink}
                    IDSelectColumnName={IDSelectColumnName}
                    PKColumnName={PKColumnName}
                    onDeleteClick={this.handleDelete}
                    onInsertClick={this.handleInputGridInsert}
                    ref={this.gridref}
                    IsAutoPaging={true}
                    RowsPerPage={10}
                    IsCustomAddLink={true}
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        }
    };
};

const Search = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchCom);
export default Search;
