import React from "react";
import { connect } from 'react-redux';
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';
import SearchForm from "../../../../../common/components/Form/SearchForm";
import DataGrid from "../../../../../common/components/DataGrid";
import { MessageModal } from "../../../../../common/components/Modal";
import {
    SearchElementList, SearchMLObjectDefinition, DataGridColumnList, AddLink, APIHostName,
    SearchAPIPath, DeleteAPIPath, IDSelectColumnName, PKColumnName, InitSearchParams, PagePath, AddLogAPIPath
} from "../Constants";
import { PRODUCT_VIEW, PRODUCT_DELETE } from "../../../../../constants/functionLists";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.addNotification = this.addNotification.bind(this);
        this.state = { CallAPIMessage: "", gridDataSource: [], IsCallAPIError: false, SearchData: InitSearchParams };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        this.callSearchData(this.state.SearchData);
    }

    handleSubmitInsertLog() {
        let MLObject = {};
        MLObject.ActivityTitle = "Xóa sản phẩm";
        MLObject.ActivityDetail = "Xóa sản phẩm";
        MLObject.ObjectID = "PIM_PRODUCT";
        MLObject.ActivityUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        this.props.callFetchAPI(APIHostName, AddLogAPIPath, MLObject);
    }

    handleDelete(deleteList) {
        let listMLObject = [];
        deleteList.map((selectItem) => {
            this.state.gridDataSource.map((row) => {
                if (row[PKColumnName] == selectItem.pkColumnName[0].value) {
                    row.DeletedUser = this.props.AppInfo.LoginInfo.Username;
                    listMLObject.push(row);
                }
            })
        });

        console.log("listMLObject", listMLObject, deleteList, PKColumnName, this.state.gridDataSource)
        this.props.callFetchAPI(APIHostName, DeleteAPIPath, listMLObject).then((apiResult) => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.addNotification(apiResult.Message, apiResult.IsError);
            if (!apiResult.IsError) {
                this.callSearchData(this.state.SearchData);
                this.handleSubmitInsertLog();
            }
        });
    }

    handleSearchSubmit(formData, MLObject) {
        const postData = [{
            SearchKey: "@Keyword",
            SearchValue: MLObject.Keyword
        },
        {
            SearchKey: "@ProductTypeID",
            SearchValue: formData.slProductTypeID ? formData.slProductTypeID : -1
        }
        ];
        this.setState({ SearchData: postData });
        this.callSearchData(postData);
    }

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then((apiResult) => {
            // console.log("callSearchData", APIHostName, SearchAPIPath, searchData, apiResult.ResultObject, apiResult.IsError, apiResult.Message)
            this.searchref.current.changeLoadComplete();
            if (!apiResult.IsError) {
                this.setState({ gridDataSource: apiResult.ResultObject, IsCallAPIError: apiResult.IsError })
            }
            else {
                this.showMessage(apiResult.Message + ':' + apiResult.MessageDetail);
            }
        });
    }

    handleCloseMessage() {
        if (!this.state.IsCallAPIError) {
            this.callSearchData(this.state.SearchData);
        }
    }

    showMessage(message) {
        ModalManager.open(<MessageModal title="Thông báo"
            message={message} onRequestClose={() => true}
            onCloseModal={this.handleCloseMessage}
        />);
    }

    addNotification(message1, IsError) {
        if (!IsError) {
            this.setState({
                cssNotification: "notification-custom-success",
                iconNotification: "fa fa-check"
            })
        }
        else {
            this.setState({
                cssNotification: "notification-danger",
                iconNotification: "fa fa-exclamation"
            })
        }
        this.notificationDOMRef.current.addNotification({
            container: "bottom-right",
            content: (
                <div className={this.state.cssNotification}>
                    <div className="notification-custom-icon">
                        <i className={this.state.iconNotification} />
                    </div>
                    <div className="notification-custom-content">
                        <div className="notification-close"><span>×</span></div>
                        <h4 className="notification-title">Thông Báo</h4>
                        <p className="notification-message">{message1}</p>
                    </div>
                </div>
            ),
            dismiss: { duration: 6000 },
            dismissable: { click: true }
        });
    }

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <SearchForm FormName="Danh sách  sản phẩm"
                    MLObjectDefinition={SearchMLObjectDefinition}
                    listelement={SearchElementList}
                    onSubmit={this.handleSearchSubmit}
                    ref={this.searchref}
                />
                <DataGrid listColumn={DataGridColumnList}
                    dataSource={this.state.gridDataSource}
                    AddLink={AddLink}
                    IDSelectColumnName={IDSelectColumnName}
                    PKColumnName={PKColumnName}
                    onDeleteClick={this.handleDelete}
                    ref={this.gridref}
                    hasSearch={false}
                    onSearchEvent={this.handleSearchEvent}
                    // RequirePermission={PRODUCT_VIEW}
                    // DeletePermission={PRODUCT_DELETE}
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