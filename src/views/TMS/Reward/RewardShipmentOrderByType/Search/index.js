import React from "react";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
// import SearchForm from "../../../../../common/components/FormContainer/SearchForm";
import SearchForm from "../../../../../common/components/FormContainer/SearchForm";
import { MessageModal } from "../../../../../common/components/Modal";
import DataGrid from "../../../../../common/components/DataGrid";
import {
    PagePath,
    SearchMLObjectDefinition,
    SearchElementList,
    GridColumnList,
    APIHostName,
    SearchNewAPIPath,
    InitSearchParams
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { TMS_TMSREWARD_VIEW, TMS_TMSREWARD_SO_TYPE_VIEW, TMS_TMSREWARD_SO_TYPE_EXPORT } from "../../../../../constants/functionLists";
import { callGetCache } from "../../../../../actions/cacheAction";
import { toIsoStringCus } from '../../../../../utils/function';
import { showModal, hideModal } from '../../../../../actions/modal';
import { ERPCOMMONCACHE_TMSCONFIG } from "../../../../../constants/keyCache";
import { MODAL_TYPE_SHOWDOWNLOAD_EXCEL } from "../../../../../constants/actionTypes";

class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.callSearchData = this.callSearchData.bind(this);
        this.handleCallData = this.handleCallData.bind(this);

        this.state = {
            IsCallAPIError: false,
            gridDataSource: [],
            IsLoadDataComplete: false,
            SearchData: InitSearchParams,
            totalAmount: '',
            param: {},
            dataExport: [],
            pageIndex: 1,
            exportTemplateID: "",
            RewardTypeID: -1,
            fromDate: toIsoStringCus(new Date((new Date().getMonth() + 1) + "/" + '01' + "/" + new Date().getFullYear()).toISOString()),
            toDate: new Date()
        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        const param = {
            RewardTypeID: ""
        }
        this.setState({
            params: param
        })
        this.props.updatePagePath(PagePath);
        // this.handleCallData();
        this.getCacheMTG();
    }


    getCacheMTG() {
        this.props.callGetCache(ERPCOMMONCACHE_TMSCONFIG).then((result) => {
            if (result && !result.IsError && result.ResultObject) {

                let _configValueTemplateID = result.ResultObject.CacheData.filter(x => x.TMSConfigID == "TEMPLATE_EXPORT_REWARDSHIPMENTORDERTYPE");
                if (_configValueTemplateID) {
                    this.setState({
                        exportTemplateID: _configValueTemplateID[0].TMSConfigValue
                    })
                }

            }


        });
    }


    handleCallData() {
        const { SearchData } = this.state;
        this.callSearchData(SearchData);
    }

    handleSearchSubmit(formData, MLObject) {
        const param = {
            RewardTypeID: MLObject.RewardTypeID
        }
        this.setState({
            params: param,
            pageIndex: 1,
            RewardTypeID: MLObject.RewardTypeID,
            fromDate: toIsoStringCus(new Date(MLObject.FromDate).toISOString()),
            toDate: toIsoStringCus(new Date(MLObject.ToDate).toISOString())
        })

        const postData = [
            {
                SearchKey: "@FROMDATE",
                SearchValue: toIsoStringCus(new Date(MLObject.FromDate).toISOString()) //MLObject.FromDate
            },
            {
                SearchKey: "@TODATE",
                SearchValue: toIsoStringCus(new Date(MLObject.ToDate).toISOString()) //MLObject.ToDate
            },
            {
                SearchKey: "@REWARDTYPEID",
                SearchValue: MLObject.RewardTypeID
            },
            {
                SearchKey: "@PAGEINDEX",
                SearchValue: 1
            },
            {
                SearchKey: "@PAGESIZE",
                SearchValue: 31
            },

        ];
        this.callSearchData(postData);
    }

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, SearchNewAPIPath, searchData).then(apiResult => {
            console.log("1111", searchData, apiResult)
            if (!apiResult.IsError) {
                // const totalAmount = apiResult.ResultObject.reduce((sum, curValue, curIndex, []) => {
                //     sum += curValue.TotalReward
                //     return sum
                // }, 0);

                const tempDataExport = apiResult.ResultObject.map((item, index) => {
                    let element = {
                        "Mã nhân viên": item.RewardUser.trim(),
                        "Tên nhân viên": item.FullName.trim(),
                        "Tổng thưởng": item.TotalReward,

                    };

                    return element;
                })

                // const tempData = apiResult.ResultObject.map((item, index) => {
                //     item.NoteReward = "Điểm thưởng này chỉ mang tính chất tham khảo, kết quả thưởng cuối cùng sẽ được KSNB và Phòng Lao động tiền lương điều chỉnh sau khi đối chiếu với các số liệu khác";

                //     return item;

                // })

                this.setState({
                    gridDataSource: apiResult.ResultObject,
                    IsCallAPIError: apiResult.IsError,
                    totalAmount: apiResult.ResultObject[0].SumTotalReward,
                    IsLoadDataComplete: true,
                    dataExport: tempDataExport
                });
            }
            else {
                this.showMessage(apiResult.MessageDetail)
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

    handleExportFile(result) {
        this.addNotification(result.Message, result.IsError);
    }

    handleonChangePage(pageNum) {
        // console.log("pageNum", pageNum)
        let listMLObject = [];
        // const aa = { SearchKey: "@PAGEINDEX", SearchValue: pageNum };
        // listMLObject = Object.assign([], this.state.SearchData, { [3]: aa });
        // 
        const { RewardTypeID, fromDate, toDate } = this.state;

        const postData = [
            {
                SearchKey: "@FROMDATE",
                SearchValue: fromDate //MLObject.FromDate
            },
            {
                SearchKey: "@TODATE",
                SearchValue: toDate //MLObject.ToDate
            },
            {
                SearchKey: "@REWARDTYPEID",
                SearchValue: RewardTypeID
            },
            {
                SearchKey: "@PAGEINDEX",
                SearchValue: pageNum
            },
            {
                SearchKey: "@PAGESIZE",
                SearchValue: 31
            },

        ];
        this.callSearchData(postData);

        // this.callSearchData(listMLObject)
        this.setState({
            pageIndex: pageNum
        });
    }

    handleExportFileFormSearch(FormData, MLObject) {
        const { exportTemplateID } = this.state;

        const fromDate = toIsoStringCus(new Date(MLObject.FromDate).toISOString());
        const toDate = toIsoStringCus(new Date(MLObject.ToDate).toISOString());
        const postData = [
            {
                SearchKey: "@FROMDATE",
                SearchValue: fromDate //MLObject.FromDate
            },
            {
                SearchKey: "@TODATE",
                SearchValue: toDate //MLObject.ToDate
            },
            {
                SearchKey: "@REWARDTYPEID",
                SearchValue: MLObject.RewardTypeID
            },
            {
                SearchKey: "@PAGEINDEX",
                SearchValue: -1
            },
            {
                SearchKey: "@PAGESIZE",
                SearchValue: -1
            },

        ];


        const postDataNew = {
            DataExportTemplateID: exportTemplateID,
            LoadDataStoreName: 'TMS.TMS_TMSREWARDDETAIL_SRHBYTYPE',
            KeyCached: "TMS_TMSREWARD_SO_TYPE_VIEW",
            SearchParamList: postData,
            ExportDataParamsDescription: "FROMDATE: " + fromDate + " - TODATE: " + toDate + " - REWARDTYPEID: " + MLObject.RewardTypeID + " - PAGEINDEX: " + "-1" + " - PAGESIZE: " + "-1",
        }

        this.props.callFetchAPI(APIHostName, "api/DataExportQueue/AddQueueExport", postDataNew).then(apiResult => {
            if (!apiResult.IsError) {
                // console.log("aa", exportTemplateID, postDataNew, apiResult)
                this.props.showModal(MODAL_TYPE_SHOWDOWNLOAD_EXCEL, {
                    title: "Tải file",
                    maxWidth: '1200px',
                    ParamRequest: { DataExportTemplateID: exportTemplateID }
                });
            }
            else {
                this.showMessage(apiResult.Message)
            }
        });
    };

    handleHistorySearch() {
        const { exportTemplateID } = this.state;
        this.props.showModal(MODAL_TYPE_SHOWDOWNLOAD_EXCEL, {
            title: "Tải file",
            maxWidth: '1200px',
            ParamRequest: { DataExportTemplateID: exportTemplateID }
        });
    }

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <SearchForm
                    FormName="Tìm kiếm danh sách tổng thương giao hàng"
                    MLObjectDefinition={SearchMLObjectDefinition}
                    listelement={SearchElementList}
                    onSubmit={this.handleSearchSubmit}
                    ref={this.searchref}
                    className="multiple"
                    IsButtonExport={true}
                    onExportSubmit={this.handleExportFileFormSearch.bind(this)}
                    IsButtonhistory={true}
                    colGroupAction={5}
                    onHistorySubmit={this.handleHistorySearch.bind(this)}
                />

                <DataGrid
                    listColumn={GridColumnList}
                    dataSource={this.state.gridDataSource}
                    // AddLink=""
                    IDSelectColumnName={'RewardDate'}
                    PKColumnName={'RewardDate'}
                    isHideHeaderToolbar={false}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    IsShowButtonPrint={false}
                    IsPrint={false}
                    IsAutoPaging={true}
                    RowsPerPage={31}
                    totalCurrency={true}
                    params={this.state.params}
                    isPaginationServer={true}
                    PageNumber={this.state.pageIndex}
                    totalCurrencyColSpan={2}
                    totalCurrencyNumber={this.state.totalAmount}
                    RequirePermission={TMS_TMSREWARD_SO_TYPE_VIEW}
                    xportPermission={TMS_TMSREWARD_SO_TYPE_EXPORT}
                    IsExportFile={false}
                    onChangePage={this.handleonChangePage.bind(this)}
                    ref={this.gridref}
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
