import React from "react";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import SearchForm from "../../../../common/components/FormContainer/SearchForm";
import DataGrid from "../../../../common/components/DataGrid";
import { MessageModal } from "../../../../common/components/Modal";
import { showModal, hideModal } from '../../../../actions/modal';
import { MODAL_TYPE_COMMONTMODALS } from '../../../../constants/actionTypes';
import {

    APIHostName,
    SearchAPIPath,
    PagePath,
    DataGridColumnList,
    IDSelectColumnName,
    PKColumnName,
    TitleFormSearch,
    SearchMLObjectDefinition,
    SearchElementList,
    InitSearchParams,
    DeleteNewAPIPath

} from "../constants";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { callGetCache } from "../../../../actions/cacheAction";

import {
    MATERIALRECLAIM_VIEW
} from "../../../../constants/functionLists";

class SearchCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            CallAPIMessage: "",
            gridDataSource: [],
            IsCallAPIError: false,
            SearchData: InitSearchParams,
        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.callSearchData = this.callSearchData.bind(this);
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        this.callSearchData(this.state.SearchData);
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


   
    handleInputGridInsert(MLObjectDefinition, modalElementList, dataSource) {
    

    }

    callSearchData(searchData) {
        const { callFetchAPI } = this.props;
        callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
            console.log("object", searchData, apiResult)
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {

                this.setState({
                    gridDataSource:  apiResult.ResultObject,
                    IsCallAPIError: apiResult.IsError
                });
            }
        })
    }

    handleSearchSubmit(formData, MLObject) {
        console.log("search", formData, MLObject)
        const DataSearch = [
            {
                SearchKey: "@KEYWORD",
                SearchValue: MLObject.Keyword
            },
            {
                SearchKey: "@TYPE",
                SearchValue: MLObject.Typename
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
                SearchKey: "@RETURNSTOREID",
                SearchValue: MLObject.StoreID
            },
            {
                SearchKey: "@AFTERRECLAIMPROCESSTYPEID",
                SearchValue: MLObject.AfterreClaimProcessTypeID
            },
            {
                SearchKey: "@RETURNUSER",
                SearchValue: MLObject.RequestUser == -1 ? MLObject.RequestUser : MLObject.RequestUser.value
            }
        ];

        this.setState({
            SearchData: DataSearch
        });

        this.callSearchData(DataSearch);
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
                    className="multiple multiple-custom multiple-custom-display"
                    classNamebtnSearch="btn-custom-bottom"

                />
                <DataGrid
                    listColumn={DataGridColumnList}
                    dataSource={this.state.gridDataSource}
                    //AddLink={AddLink}
                    IDSelectColumnName={IDSelectColumnName}
                    PKColumnName={PKColumnName}
                    onInsertClick={this.handleInputGridInsert.bind(this)}
                    IsCustomAddLink={true}
                    IsDelete={true}
                    IsAutoPaging={true}
                    RowsPerPage={20}
                    IsExportFile={false}
                    // RequirePermission={TMS_MTRETURNREQUEST_VIEW}
                    // DeletePermission={TMS_MTRETURNREQUEST_DELETE}
                    // ExportPermission={TMS_MTRETURNREQUEST_EXPORT}
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: (type, props) => {
            dispatch(hideModal(type, props));
        }
    };
};

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchCom);
export default Search;
