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
import { callGetCache, callGetUserCache } from "../../../../actions/cacheAction";

import {
    MATERIALRECLAIM_VIEW,
    TMS_MATERIALRECLAIM_DESTROY,
    TMS_MATERIALRECLAIM_RETURN,
    GET_CACHE_USER_FUNCTION_LIST
} from "../../../../constants/functionLists";

import { ERPCOMMONCACHE_TMSCONFIG } from "../../../../constants/keyCache";

class SearchCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            CallAPIMessage: "",
            gridDataSource: [],
            IsCallAPIError: false,
            SearchData: InitSearchParams,
            DataKeyConfig: [],
        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.callSearchData = this.callSearchData.bind(this);
        this.notificationDOMRef = React.createRef();
        this.checkPermission = this.checkPermission.bind(this)
        this.getCacheKeyConfig = this.getCacheKeyConfig.bind(this)
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

    getCacheKeyConfig() {
        this.props.callGetCache(ERPCOMMONCACHE_TMSCONFIG).then(apiResult => {
            if (apiResult.IsError) {
                this.showMessage(apiResult.Message)
            }
            else {
                this.setState({
                    DataKeyConfig: apiResult.ResultObject.CacheData,
                })
            }
        })
    }



    handleUpdateFirstClick(MLObjectDefinition, modalElementList) {
        const { gridDataSource, DataKeyConfig } = this.state;

        const confir = confirm("Bạn có chắc muốn thu hồi vật tư về kho?");
        console.log("confir", confir)
        if (confir) {
            this.checkPermission(TMS_MATERIALRECLAIM_RETURN).then((result) => {
                if (result) {
                    const MTReturnRequestID = MLObjectDefinition.pkColumnName[0].value;
                    const tempData = gridDataSource.find(n => n.MaterialReclaimID == MTReturnRequestID);
                    const MTReturnRequestTypeID = DataKeyConfig.find(n => n.TMSConfigID == "TMS_MATERIALRECLAIM_RETURNRQTYPEID");

                    tempData.MTReturnRequestTypeID = MTReturnRequestTypeID.TMSConfigValue;

                    if (!tempData.IsAfterReclaimProcess) {

                        this.props.callFetchAPI(APIHostName, "api/MaterialReclaim/UpdateMTRequset", tempData).then(apiResult => {
                            console.log("apiResult", tempData, apiResult)
                            this.showMessage(apiResult.Message);
                            this.callSearchData(this.state.SearchData);

                        })
                    }
                    else {
                        this.showMessage("Vật tư đã được cập nhật trạng thái")
                    }
                }
                else {
                    this.showMessage("Bạn không có quyền thu hồi vật tư về kho")
                }

            })
        }
    }

    handleUpdateTwoClick(MLObjectDefinition, modalElementList) {
        const { gridDataSource, DataKeyConfig } = this.state;

        const confir = confirm("Bạn có chắc muốn hủy vật tư thu hồi này không?");
        console.log("confir", confir)
        if (confir) {
            this.checkPermission(TMS_MATERIALRECLAIM_DESTROY).then((result) => {
                if (result) {
                    const MTReturnRequestID = MLObjectDefinition.pkColumnName[0].value;
                    const tempData = gridDataSource.find(n => n.MaterialReclaimID == MTReturnRequestID);
                    const DestroyRequestTypeID = DataKeyConfig.find(n => n.TMSConfigID == "TMS_MATERIALRECLAIM_RETURNDESTROYRQTYPEID");

                    tempData.DestroyRequestTypeID = DestroyRequestTypeID != undefined ?  DestroyRequestTypeID.TMSConfigValue : 0;

                    if (!tempData.IsAfterReclaimProcess) {

                       
                        this.props.callFetchAPI(APIHostName, "api/MaterialReclaim/UpdateDestroyRequest", tempData).then(apiResult => {
                            console.log("apiResult", tempData, apiResult)
                            this.showMessage(apiResult.Message);
                            this.callSearchData(this.state.SearchData);

                        })
                    }
                    else {
                        this.showMessage("Vật tư đã được cập nhật trạng thái")
                    }
                }
                else {
                    this.showMessage("Bạn không có quyền thu hồi vật tư về kho")
                }

            })
        }
        

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
                    gridDataSource: apiResult.ResultObject,
                    IsCallAPIError: apiResult.IsError
                });
                this.getCacheKeyConfig();
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

    handleUpdateListItem(lstID, pkColumnName) {
        console.log("select item", lstID, pkColumnName)
    }

    handleDelete(listDeleteID, pkColumnName) {
        console.log("delete item", listDeleteID, pkColumnName)

    }

    handleUpdateList(lstID, pkColumnName) {
        console.log("select item 222", lstID, pkColumnName)

    }

    checkPermission(permissionKey) {
        return new Promise((resolve, reject) => {
            this.props.callGetUserCache(GET_CACHE_USER_FUNCTION_LIST).then((result) => {
                console.log("checkPermission", result)
                if (!result.IsError && result.ResultObject.CacheData != null) {
                    for (let i = 0; i < result.ResultObject.CacheData.length; i++) {
                        if (result.ResultObject.CacheData[i].FunctionID == permissionKey) {
                            console.log("object", result.ResultObject.CacheData[i])
                            resolve(true);
                            return;
                        }
                    }
                    resolve(false)
                } else {
                    resolve('error');
                }
            });
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
                    // onInsertClick={this.handleInputGridInsert.bind(this)}
                    onUpdateFirstClick={this.handleUpdateFirstClick.bind(this)}
                    onUpdateTwoClick={this.handleUpdateTwoClick.bind(this)}
                    IsCustomAddLink={false}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    onDeleteClick={this.handleDelete.bind(this)}
                    IsAutoPaging={true}
                    RowsPerPage={20}
                    // IsExportFile={false}
                    // TitleUpdateListItem="Thu hồi vật tư về kho"
                    // IconUpdateListItem="ti-back-left"
                    // IsUpdateListItem={true}
                    // onUpdateListItem={this.handleUpdateListItem.bind(this)}
                    // IsUpdateList={true}
                    // TitleUpdateList="Hủy vật tư"
                    // IconUpdateList="ti-close"
                    // onUpdateList={this.handleUpdateList.bind(this)}
                    RequirePermission={MATERIALRECLAIM_VIEW}
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
        },
        callGetUserCache: (cacheKeyID) => {
            return dispatch(callGetUserCache(cacheKeyID));
        },
    };
};

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchCom);
export default Search;