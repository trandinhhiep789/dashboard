import React from "react";
import { connect } from "react-redux";
import "react-notifications-component/dist/theme.css";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import ReactNotification from "react-notifications-component";

import {
    APIHostName,
    DataGridColumnList,
    DeleteNewAPIPath,
    IDSelectColumnName,
    InitSearchParams,
    PagePath,
    PKColumnName,
    SearchAPIPath,
    SearchElementList,
    SearchMLObjectDefinition,
    TitleFormSearch,
} from "../constants";

import {
    GET_CACHE_USER_FUNCTION_LIST,
    MATERIALRECLAIM_VIEW,
    TMS_MATERIALRECLAIM_DESTROY,
    TMS_MATERIALRECLAIM_RETURN,
} from "../../../../constants/functionLists";

import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { callGetCache, callGetUserCache } from "../../../../actions/cacheAction";
import { ERPCOMMONCACHE_TMSCONFIG } from "../../../../constants/keyCache";
import { MessageModal } from "../../../../common/components/Modal";
import { MODAL_TYPE_COMMONTMODALS } from '../../../../constants/actionTypes';
import { showModal, hideModal } from '../../../../actions/modal';
import { updatePagePath } from "../../../../actions/pageAction";
import DataGrid from "../../../../common/components/DataGrid";
import FormContainer from "../../../../common/components/FormContainer";
import FormControl from "../../../../common/components/FormContainer/FormControl";
import SearchForm from "../../../../common/components/FormContainer/SearchForm";

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

        this.callSearchData = this.callSearchData.bind(this);
        this.checkPermission = this.checkPermission.bind(this);
        this.getCacheKeyConfig = this.getCacheKeyConfig.bind(this);
        this.gridref = React.createRef();
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleSubmitFirstClick = this.handleSubmitFirstClick.bind(this);
        this.handleSubmitTwoClick = this.handleSubmitTwoClick.bind(this);
        this.notificationDOMRef = React.createRef();
        this.searchref = React.createRef();
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
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Mô tả hiện trạng vật tư',
            content: {
                text: <FormContainer
                    dataSource={[]}
                    IsCloseModal={true}
                    MLObjectDefinition={[
                        {
                            Name: "Description",
                            DefaultValue: "",
                            BindControlName: "txtDescription",
                            DataSourceMember: "Description"
                        }
                    ]}
                    onSubmit={(FormData, MLObject) => this.handleSubmitFirstClick(FormData, MLObject, MLObjectDefinition, modalElementList)}
                >
                    <div className="row">
                        <div className="col-md-12">
                            <FormControl.TextArea
                                classNameCustom="customcontrol"
                                colspan="9"
                                controltype="InputControl"
                                datasourcemember="Description"
                                label="mô tả hiện trạng vật tư"
                                labelcolspan="3"
                                maxSize={20}
                                name="txtDescription"
                                placeholder="Mô tả hiện trạng vật tư"
                                validatonList={["required"]}
                                value=""
                            />
                        </div>
                    </div>
                </FormContainer>
            },
            maxWidth: '800px'
        });
    }

    handleSubmitFirstClick(FormData, MLObject, MLObjectDefinition, modalElementList) {
        const { gridDataSource, DataKeyConfig } = this.state;

        this.checkPermission(TMS_MATERIALRECLAIM_RETURN).then((result) => {
            if (result) {
                const MTReturnRequestID = MLObjectDefinition.pkColumnName[0].value;
                const tempData = gridDataSource.find(n => n.MaterialReclaimID == MTReturnRequestID);
                const MTReturnRequestTypeID = DataKeyConfig.find(n => n.TMSConfigID == "TMS_MATERIALRECLAIM_RETURNRQTYPEID");

                tempData.MTReturnRequestTypeID = MTReturnRequestTypeID.TMSConfigValue;
                tempData.Description = MLObject.Description;

                if (!tempData.IsAfterReclaimProcess) {
                    this.props.callFetchAPI(APIHostName, "api/MaterialReclaim/UpdateMTRequset", tempData).then(apiResult => {
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

    handleUpdateTwoClick(MLObjectDefinition, modalElementList) {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Mô tả hiện trạng vật tư',
            content: {
                text: <FormContainer
                    dataSource={[]}
                    IsCloseModal={true}
                    MLObjectDefinition={[
                        {
                            Name: "Description",
                            DefaultValue: "",
                            BindControlName: "txtDescription",
                            DataSourceMember: "Description"
                        }
                    ]}
                    onSubmit={(FormData, MLObject) => this.handleSubmitTwoClick(FormData, MLObject, MLObjectDefinition, modalElementList)}
                >
                    <div className="row">
                        <div className="col-md-12">
                            <FormControl.TextArea
                                classNameCustom="customcontrol"
                                colspan="9"
                                controltype="InputControl"
                                datasourcemember="Description"
                                label="mô tả hiện trạng vật tư"
                                labelcolspan="3"
                                maxSize={20}
                                name="txtDescription"
                                placeholder="Mô tả hiện trạng vật tư"
                                validatonList={["required"]}
                                value=""
                            />
                        </div>
                    </div>
                </FormContainer>
            },
            maxWidth: '800px'
        });
    }

    handleSubmitTwoClick(FormData, MLObject, MLObjectDefinition, modalElementList) {
        const { gridDataSource, DataKeyConfig } = this.state;

        this.checkPermission(TMS_MATERIALRECLAIM_DESTROY).then((result) => {
            if (result) {
                const MTReturnRequestID = MLObjectDefinition.pkColumnName[0].value;
                const tempData = gridDataSource.find(n => n.MaterialReclaimID == MTReturnRequestID);
                const DestroyRequestTypeID = DataKeyConfig.find(n => n.TMSConfigID == "TMS_MATERIALRECLAIM_RETURNDESTROYRQTYPEID");

                tempData.DestroyRequestTypeID = DestroyRequestTypeID != undefined ? DestroyRequestTypeID.TMSConfigValue : 0;
                tempData.Description = MLObject.Description;

                if (!tempData.IsAfterReclaimProcess) {
                    this.props.callFetchAPI(APIHostName, "api/MaterialReclaim/UpdateDestroyRequest", tempData).then(apiResult => {
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

    callSearchData(searchData) {
        const { callFetchAPI } = this.props;
        callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {

            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
                const gridDataSource = apiResult.ResultObject.map(item => {
                    if (item.IsAfterReclaimProcess) {
                        return {
                            ...item,
                            AfterReclaimProcessTypeIDName: `${item.AfterReclaimProcessTypeID} - ${item.AfterReclaimProcessTypeName}`
                        }
                    } else {
                        return {
                            ...item,
                            AfterReclaimProcessTypeIDName: ""
                        }
                    }
                })

                this.setState({
                    gridDataSource,
                    IsCallAPIError: apiResult.IsError
                });
                this.getCacheKeyConfig();
            }
        })
    }

    handleSearchSubmit(formData, MLObject) {

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
    }

    handleDelete(listDeleteID, pkColumnName) {

    }

    handleUpdateList(lstID, pkColumnName) {

    }

    checkPermission(permissionKey) {
        return new Promise((resolve, reject) => {
            this.props.callGetUserCache(GET_CACHE_USER_FUNCTION_LIST).then((result) => {

                if (!result.IsError && result.ResultObject.CacheData != null) {
                    for (let i = 0; i < result.ResultObject.CacheData.length; i++) {
                        if (result.ResultObject.CacheData[i].FunctionID == permissionKey) {

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
                    className="multiple multiple-custom multiple-custom-display"
                    classNamebtnSearch="btn-custom-bottom"
                    FormName={TitleFormSearch}
                    listelement={SearchElementList}
                    MLObjectDefinition={SearchMLObjectDefinition}
                    onSubmit={this.handleSearchSubmit}
                    ref={this.searchref}

                />
                <DataGrid
                    // IconUpdateList="ti-close"
                    // IconUpdateListItem="ti-back-left"
                    // IsExportFile={false}
                    // IsUpdateList={true}
                    // IsUpdateListItem={true}
                    // onInsertClick={this.handleInputGridInsert.bind(this)}
                    // onUpdateList={this.handleUpdateList.bind(this)}
                    // onUpdateListItem={this.handleUpdateListItem.bind(this)}
                    // TitleUpdateList="Hủy vật tư"
                    // TitleUpdateListItem="Thu hồi vật tư về kho"
                    //AddLink={AddLink}
                    dataSource={this.state.gridDataSource}
                    IDSelectColumnName={IDSelectColumnName}
                    IsAutoPaging={true}
                    IsCustomAddLink={false}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    listColumn={DataGridColumnList}
                    onDeleteClick={this.handleDelete.bind(this)}
                    onUpdateFirstClick={this.handleUpdateFirstClick.bind(this)}
                    onUpdateTwoClick={this.handleUpdateTwoClick.bind(this)}
                    PKColumnName={PKColumnName}
                    RequirePermission={MATERIALRECLAIM_VIEW}
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
