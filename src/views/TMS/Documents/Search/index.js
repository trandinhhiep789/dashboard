import React from "react";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import SearchForm from "../../../../common/components/FormContainer/SearchForm";
//import DataGrid from "../../../../common/components/DataGrid/getdataserver.js";
import DataGrid from "../../../../common/components/DataGrid";
import InputGridNew from "../../../../common/components/FormContainer/FormControl/InputGridNew";
import { MessageModal } from "../../../../common/components/Modal";
import { formatDate } from "../../../../common/library/CommonLib.js";
import isBefore from 'date-fns/isBefore';
import formatDistance from 'date-fns/formatDistance';
import viLocale from "date-fns/locale/vi";
import { compareAsc, format, add } from 'date-fns';

import { SERVICEAGREEMENT_VIEW, SERVICEAGREEMENT_DELETE, SERVICEAGREEMENT_EXPORT, DOCUMENT_VIEW, DOCUMENT_DELETE } from "../../../../constants/functionLists";


import {
    SearchElementList,
    SearchMLObjectDefinition,
    DataGridColumnList,
    AddLink,
    APIHostName,
    SearchAPIPath,
    DeleteNewAPIPath,
    IDSelectColumnName,
    PKColumnName,
    InitSearchParams,
    PagePath,
    TitleFormSearch,
    schema,
} from "../constants";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Base64 } from 'js-base64';
import { callGetCache } from "../../../../actions/cacheAction";

class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
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
         //this.callSearchDataMobi();
    }



    callSearchDataMobi() {
        const params = {
            PageIndex: 1,
            PageZise: 10
        }
        // this.props.callFetchAPI(APIHostName, "api/Document/SearchMobi", params).then(apiResult => {
        //     console.log("callSearchDataMobi", params, apiResult)
        // });
      const intDocumentID = 34;
        this.props.callFetchAPI(APIHostName, "api/Document/LoadMobi", intDocumentID).then(apiResult => {
            console.log("LoadMobi", params, apiResult)
        });  

        // const paramsComment = {
        //     DocumentID: 7,
        //     Content: "Tài liệu hay và đầy đủ thông tin. Cảm ơn đồng đội...."
        // }
        // this.props.callFetchAPI(APIHostName, "api/Document_Comment/AddMobi", paramsComment).then(apiResult => {
        //     console.log("paramsComment", paramsComment, apiResult)
        // });

        // const paramsLike = {
        //     DocumentID: 35,
        //     IsLike: false
        // }
        // this.props.callFetchAPI(APIHostName, "api/Document_Like/AddLike", paramsLike).then(apiResult => {
        //     console.log("paramsComment", paramsLike, apiResult)
        // });
        

        // const strCommentID = "C61C29408EB95504E053D105010A63D8       ";
        // this.props.callFetchAPI(APIHostName, "api/Document_Comment/Delete", strCommentID).then(apiResult => {
        //     console.log("paramsComment",strCommentID, apiResult)
        // });


    }

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
            console.log("aa",apiResult )
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
                // this.callSearchDataMobi();
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
            />
        );
    }

    handleDelete(deleteList, pkColumnName) {
        console.log("delete", deleteList, pkColumnName)
        let listMLObject = [];
        deleteList.map((row, index) => {
            let MLObject = {};
            pkColumnName.map((pkItem, pkIndex) => {
                MLObject[pkItem.key] = row.pkColumnName[pkIndex].value;
            });
            MLObject.DeletedUser = this.props.AppInfo.LoginInfo.Username;
            listMLObject.push(MLObject);
        });
  

        console.log("listMLObject", listMLObject)

        this.props.callFetchAPI(APIHostName, DeleteNewAPIPath, listMLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.addNotification(apiResult.Message, apiResult.IsError);
            if (!apiResult.IsError) {
                this.callSearchData(this.state.SearchData);
            }
        });
    }


    addNotification(message1, IsError) {
        let cssNotification, iconNotification;
        if (!IsError) {
            cssNotification = "notification-custom-success";
            iconNotification = "fa fa-check"
        } else {
            cssNotification = "notification-danger";
            iconNotification = "fa fa-exclamation"
        }
        this.notificationDOMRef.current.addNotification({
            container: "bottom-right",
            content: (
                <div className={cssNotification}>
                    <div className="notification-custom-icon">
                        <i className={iconNotification} />
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
        console.log("MLObject", formData, MLObject)
        const DataSearch = [
            {
                SearchKey: "@Keyword",
                SearchValue: MLObject.Keyword
            },
            {
                SearchKey: "@DOCUMENTTYPEID",
                SearchValue: MLObject.DocumentTypeID
            },
            {
                SearchKey: "@FROMDATE",
                SearchValue: MLObject.FromDate
            },
            {
                SearchKey: "@TODATE",
                SearchValue: MLObject.ToDate
            },
            {
                SearchKey: "@PAGESIZE",
                SearchValue: 50
            },
            {
                SearchKey: "@PAGEINDEX",
                SearchValue: 1
            }

        ];

        this.setState({
            SearchData: DataSearch
        });

        this.callSearchData(DataSearch);
    }

    handleExportFile(result) {
        this.addNotification(result.Message, result.IsError);
    }

    

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <SearchForm
                    FormName={TitleFormSearch}
                    MLObjectDefinition={SearchMLObjectDefinition}
                    listelement={SearchElementList}
                    onSubmit={this.handleSearchSubmit}
                    ref={this.searchref}
                    className="multiple"

                />
                <DataGrid
                    listColumn={DataGridColumnList}
                    dataSource={this.state.gridDataSource}
                    AddLink={AddLink}
                    IDSelectColumnName={IDSelectColumnName}
                    PKColumnName={PKColumnName}
                    onDeleteClick={this.handleDelete}
                    IsDelete={true}
                    IsAutoPaging={true}
                    RowsPerPage={20}
                    RequirePermission={DOCUMENT_VIEW}
                    DeletePermission={DOCUMENT_DELETE}
                    IsExportFile={false}
                    IsImportFile={false}

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
