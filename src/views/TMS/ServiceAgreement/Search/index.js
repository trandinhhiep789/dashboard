import React from "react";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import SearchForm from "../../../../common/components/FormContainer/SearchForm";
import DataGrid from "../../../../common/components/DataGrid/getdataserver.js";
//import DataGrid from "../../../../common/components/DataGrid";
import InputGridNew from "../../../../common/components/FormContainer/FormControl/InputGridNew";
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
    AddLogAPIPath,
    TitleFormSearch
} from "../constants";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import { callGetCache } from "../../../../actions/cacheAction";

class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleonChangePage = this.handleonChangePage.bind(this);
        this.callSearchData = this.callSearchData.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.state = {
            CallAPIMessage: "",
            gridDataSource: [],
            IsCallAPIError: false,
            SearchData: InitSearchParams,
            cssNotification: "",
            iconNotification: "",
            PageNumber: 1,
            IsLoadDataComplete: false,

        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        this.callSearchData(this.state.SearchData);
    }

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
            console.log('Service Agree', apiResult)
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else{
                this.setState({
                    gridDataSource: apiResult.ResultObject,
                    IsCallAPIError: apiResult.IsError,
                });
            }
        });
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

    handleDelete(id) {
        const objServiceAgreement = {
            ServiceAgreementID: id,
            DeletedUser: this.props.AppInfo.LoginInfo.Username
        };
        this.props.callFetchAPI(APIHostName, DeleteAPIPath, objServiceAgreement).then(apiResult => {
            console.log('handleDelete', apiResult, objServiceAgreement)
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.addNotification(apiResult.Message, apiResult.IsError);
            if (!apiResult.IsError) {
                this.callSearchData(this.state.SearchData);
            }
        });
    }

    handleonChangePage(pageNum) {
        console.log('handleonChangePage', pageNum)

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

    handleSearchSubmit(formData, MLObject) {
        const DataSearch = [
            {
                SearchKey: "@Keyword",
                SearchValue: MLObject.Keyword
            },
            {
                SearchKey: "@SERVICETYPEID",
                SearchValue: MLObject.ServiceTypeID
            },
            {
                SearchKey: "@AREAID",
                SearchValue: MLObject.AreaID
            },
            {
                SearchKey: "@FromDate",
                SearchValue: MLObject.SignedDate
            },
            {
                SearchKey: "@ToDate",
                SearchValue: MLObject.SignedDate
            }

        ];

        this.setState({
            SearchData: DataSearch
        });

        this.callSearchData(DataSearch);
    }


    render() {
        //console.log('gridDataSource', this.state.gridDataSource)
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <SearchForm
                    FormName={TitleFormSearch}
                    MLObjectDefinition={SearchMLObjectDefinition}
                    listelement={SearchElementList}
                    onSubmit={this.handleSearchSubmit}
                    ref={this.searchref}
                    className="multiple multiple-custom"

                />
                <DataGrid
                    listColumn={DataGridColumnList}
                    dataSource={this.state.gridDataSource}
                    AddLink={AddLink}
                    IDSelectColumnName={IDSelectColumnName}
                    PKColumnName={PKColumnName}
                    onDeleteClick={this.handleDelete}
                    onChangePage={this.handleonChangePage}
                    IsDelete={true}
                    PageNumber={this.state.PageNumber}
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
        }
    };
};

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchCom);
export default Search;
