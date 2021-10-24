import React from "react";
import { connect } from "react-redux";
import "react-notifications-component/dist/theme.css";
import { ModalManager } from "react-dynamic-modal";
import ReactNotification from "react-notifications-component";

import {
    APIHostName,
    CreateInputVoucherAPIPath,
    DataGridColumnList,
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
    TMS_MATERIALRETURN_RETURN,
    MATERIALRETURN_VIEW
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
            gridDataSource: [],
            SearchParam: InitSearchParams,
            DataKeyConfig: []
        };

        this.gridref = React.createRef();
        this.notificationDOMRef = React.createRef();
        this.searchref = React.createRef();

        this.callSearchData = this.callSearchData.bind(this);
        this.checkPermission = this.checkPermission.bind(this);
        this.getCacheKeyConfig = this.getCacheKeyConfig.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleShowDescriptionModal = this.handleShowDescriptionModal.bind(this);
        this.handleSubmitMaterialReturn = this.handleSubmitMaterialReturn.bind(this);
        this.showMessage = this.showMessage.bind(this);
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        this.getCacheKeyConfig();
        this.callSearchData(InitSearchParams);
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

    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
            />
        );
    }

    callSearchData(arrSearchParam) {
        this.props.callFetchAPI(APIHostName, SearchAPIPath, arrSearchParam).then(apiResult => {
            if (apiResult.IsError) {
                this.showMessage(apiResult.Message);
            } else {
                const uptGridDataSource = apiResult.ResultObject.map(item => {
                    return {
                        ...item,
                        ReturnUserIDName: `${item.ReturnUser} - ${item.ReturnUserName}`,
                        ReturnStoreIDName: `${item.ReturnStoreID} - ${item.ReturnStoreName}`
                    }
                })

                this.setState({
                    gridDataSource: uptGridDataSource
                })
            }
        })
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

    handleSearchSubmit(formData, MLObject) {
        const SearchParam = [
            {
                SearchKey: "@KEYWORD",
                SearchValue: MLObject.Keyword
            },
            {
                SearchKey: "@SRHTYPE",
                SearchValue: MLObject.srhType
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
                SearchKey: "@RETURNSTORE",
                SearchValue: MLObject.StoreID
            },
            {
                SearchKey: "@ISCREATEDINPUTVOUCHER",
                SearchValue: MLObject.IsCreatedInputVoucher
            },
            {
                SearchKey: "@RETURNUSER",
                SearchValue: MLObject.RequestUser == -1 ? "" : MLObject.RequestUser.value
            }
        ];

        this.callSearchData(SearchParam);

        this.setState({
            SearchParam: SearchParam
        });
    }

    handleShowDescriptionModal(MLObjectDefinition, modalElementList) {
        this.checkPermission(TMS_MATERIALRETURN_RETURN).then((result) => {
            if (result) {
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
                            onSubmit={(FormData, MLObject) => this.handleSubmitMaterialReturn(FormData, MLObject, MLObjectDefinition, modalElementList)}
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
                                        maxSize={1000}
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
            } else {
                this.addNotification("Bạn không có quyền nhập trả xác linh kiện về kho", true);
            }
        }).catch(error => {
            console.log(error);
            this.showMessage("Lỗi kiểm tra quyền");
        })


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
                    resolve(false);
                } else {
                    reject('error');
                }
            });
        });
    }

    handleSubmitMaterialReturn(FormData, MLObject, MLObjectDefinition, modalElementList) {
        let tempData = this.state.gridDataSource.find(n => n.MaterialReturnID == MLObjectDefinition.pkColumnName[0].value);

        if (tempData.IsCreatedInputVoucher) {
            this.showMessage("Yêu cầu này đã tạo phiếu nhập, không thể cập nhật");
            return;
        }

        tempData.Description = MLObject.Description;

        this.props.callFetchAPI(APIHostName, CreateInputVoucherAPIPath, tempData).then(apiResult => {
            if (apiResult.IsError) {
                this.showMessage(apiResult.Message);
            } else {
                this.props.hideModal();
                this.showMessage(apiResult.Message);
                this.callSearchData(this.state.SearchParam);
            }
        })
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
                    dataSource={this.state.gridDataSource}
                    IDSelectColumnName={IDSelectColumnName}
                    IsAutoPaging={true}
                    IsCustomAddLink={false}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    listColumn={DataGridColumnList}
                    onUpdateFirstClick={this.handleShowDescriptionModal.bind(this)}
                    PKColumnName={PKColumnName}
                    RequirePermission={""}
                    RowsPerPage={20}
                />
            </React.Fragment>
        )
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