import React from "react";
import { connect } from "react-redux";
import { ModalManager } from 'react-dynamic-modal';
import ReactNotification from "react-notifications-component";

import {
    APIHostName,
    listColumn,
    listElementSearch,
    MLObjectDefinition,
    PagePath,
    APISearchPath,
} from "../constants";

import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { callGetCache, callClearLocalCache } from "../../../../actions/cacheAction";
import { ERPCOMMONCACHE_TMSCONFIG } from '../../../../constants/keyCache';
import { LEADORDER_VIEW } from "../../../../constants/functionLists";
import { MessageModal } from "../../../../common/components/Modal";
import { MODAL_TYPE_SHOWDOWNLOAD_EXCEL } from "../../../../constants/actionTypes";
import { showModal, hideModal } from '../../../../actions/modal';
import { updatePagePath } from "../../../../actions/pageAction";
import DataGrid from "../../../../common/components/DataGrid";
import SearchForm from "../../../../common/components/FormContainer/SearchForm";

class SearchCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gridData: [],
            IsDisabledBtn: false,
            exportTemplateID: ""
        };

        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();

        this.addNotification = this.addNotification.bind(this);
        this.handleExportSubmit = this.handleExportSubmit.bind(this);
        this.handleHistorySubmit = this.handleHistorySubmit.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleChangeSearchForm = this.handleChangeSearchForm.bind(this);
        this.showMessage = this.showMessage.bind(this);
        this.getCacheMTG = this.getCacheMTG.bind(this);
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        this.getCacheMTG();
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

    addNotification(message, IsError) {
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
                        <p className="notification-message">{message}</p>
                    </div>
                </div>
            ),
            dismiss: { duration: 6000 },
            dismissable: { click: true }
        });
    }

    getCacheMTG() {
        this.props.callGetCache(ERPCOMMONCACHE_TMSCONFIG).then((result) => {
            console.log(result)
            if (result && !result.IsError && result.ResultObject) {
                const _configValue = result.ResultObject.CacheData.find(x => x.TMSConfigID == "TEMPLATE_LEADORDER_REPORT_EXPORT");

                if (_configValue) {
                    this.setState({
                        exportTemplateID: _configValue.TMSConfigValue
                    })
                }
            }
        });
    }

    handleExportSubmit(formData, MLObject) {
        const SearchParamList = [
            {
                SearchKey: "@KEYWORD",
                SearchValue: MLObject.KeyWord
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
                SearchKey: "@COORDINATORSTOREID",
                SearchValue: MLObject.CoordinatorStoreID
            },
            {
                SearchKey: "@ISFAILDADVICE",
                SearchValue: MLObject.IsFaildAdvice
            }
        ];

        const postData = {
            DataExportTemplateID: this.state.exportTemplateID,
            LoadDataStoreName: 'TMS.TMS_LEADORDER_EXPORT',
            KeyCached: "LEADORDER_REPORT_EXPORT",
            SearchParamList: SearchParamList,
            ExportDataParamsDescription: ""
        }
        this.props.callFetchAPI(APIHostName, "api/DataExportQueue/AddQueueExport", postData).then(apiResult => {
            if (!apiResult.IsError) {
                this.props.showModal(MODAL_TYPE_SHOWDOWNLOAD_EXCEL, {
                    title: "Tải file",
                    maxWidth: '1200px',
                    ParamRequest: { DataExportTemplateID: this.state.exportTemplateID }
                });
            }
            else {
                this.showMessage(apiResult.Message)
            }
        });
    }

    handleHistorySubmit() {

    }

    handleSearchSubmit(formData, MLObject) {
        const SearchParamList = [
            {
                SearchKey: "@KEYWORD",
                SearchValue: MLObject.KeyWord
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
                SearchKey: "@COORDINATORSTOREID",
                SearchValue: MLObject.CoordinatorStoreID
            },
            {
                SearchKey: "@ISFAILDADVICE",
                SearchValue: MLObject.IsFaildAdvice
            }
        ];

        this.props.callFetchAPI(APIHostName, APISearchPath, SearchParamList).then(apiResult => {
            if (!apiResult.IsError) {
                if (apiResult.ResultObject.length == 0) {
                    this.addNotification("Dữ liệu trống", apiResult.IsError);
                    this.setState({
                        gridData: []
                    })
                } else {
                    const uptResultObject = apiResult.ResultObject.map(item => {
                        return {
                            ...item,
                            CoordinatorStoreIDName: `${item.CoordinatorStoreID} - ${item.CoordinatorStoreName}`,
                            CurrentStatusIDName: `${item.CurrentStatusID} - ${item.CurrentStatusName}`,
                            CustomerIDName: `${item.CustomerID} - ${item.CustomerName}`,
                            StaffUserIDName: `${item.StaffUser} - ${item.StaffUserName}`,
                            FailAdviceReasonIDName: item.FailAdviceReasonID == 0 ? "" : `${item.FailAdviceReasonID} - ${item.FailAdviseReasonName}`,
                        }
                    })

                    this.setState({
                        gridData: uptResultObject
                    })
                }
            } else {
                this.showMessage(apiResult.Message);
            }
        });
    }

    handleChangeSearchForm(FormDataContolLstd, MLObjectDefinition) {
        const FromDate = new Date(FormDataContolLstd.dtFromDate.value)
        const ToDate = new Date(FormDataContolLstd.dtToDate.value)

        if (FromDate > ToDate) {
            this.setState({
                IsDisabledBtn: true
            })
            this.addNotification("Từ ngày phải nhỏ hơn đến ngày", true);
        } else {
            this.setState({
                IsDisabledBtn: false
            })
        }
    }

    render() {

        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />

                <SearchForm
                    className="multiple"
                    classNamebtnSearch="groupAction"
                    FormName="Báo cáo mối bán hàng"
                    IsButtonExport={true}
                    IsButtonhistory={false}
                    IsDisabledBtnExport={this.state.IsDisabledBtn}
                    IsDisabledBtnSearch={this.state.IsDisabledBtn}
                    IsShowButtonSearch={true}
                    listelement={listElementSearch}
                    MLObjectDefinition={MLObjectDefinition}
                    onchange={this.handleChangeSearchForm}
                    onExportSubmit={this.handleExportSubmit}
                    onHistorySubmit={this.handleHistorySubmit}
                    onSubmit={this.handleSearchSubmit}
                    ref={this.searchref}
                    TitleButtonExport="Xuất dữ liệu"
                />

                <DataGrid
                    RequirePermission={LEADORDER_VIEW}
                    dataSource={this.state.gridData}
                    IDSelectColumnName={"chkSelect"}
                    IsAutoPaging={true}
                    IsDelete={false}
                    IsExportFile={false}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    listColumn={listColumn}
                    PKColumnName={"LeadOrderID"}
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
        callClearLocalCache: (cacheKeyID) => {
            return dispatch(callClearLocalCache(cacheKeyID));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchCom);