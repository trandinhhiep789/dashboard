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
    SearchAPIPath,
    SearchByUserAPIPath,
    titleModal
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { TMS_TMSREWARD_EXPORT, TMS_TMSREWARD_VIEW } from "../../../../../constants/functionLists";
import { callGetCache } from "../../../../../actions/cacheAction";
import { toIsoStringCus } from '../../../../../utils/function'
import DataGirdRewardShipmentOrder from '../component/DataGirdRewardShipmentOrder'
import { MODAL_TYPE_COMMONTMODALS, MODAL_TYPE_SHOWDOWNLOAD_EXCEL } from "../../../../../constants/actionTypes";
import { showModal, hideModal } from '../../../../../actions/modal';
import { ERPCOMMONCACHE_TMSCONFIG } from "../../../../../constants/keyCache";


class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.callSearchData = this.callSearchData.bind(this);
        // this.handleCallData = this.handleCallData.bind(this);
        this.renderRewardTotalTable = this.renderRewardTotalTable.bind(this);
        this.setExcelDataExport = this.setExcelDataExport.bind(this);
        this.initTableHeader = this.initTableHeader.bind(this);

        this.state = {
            IsCallAPIError: false,
            gridDataSource: [],
            IsLoadDataComplete: false,
            dataExport: [],
            widthPercent: "",
            fromDate: '',
            toDate: '',
            listColumn: [],
            exportTemplateID: ""
        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        // this.handleCallData();
        this.updateWindowDimensions();
        this.initTableHeader();
        window.addEventListener("resize", this.updateWindowDimensions);
        this.getCacheMTG();
    }

    getCacheMTG() {
        this.props.callGetCache(ERPCOMMONCACHE_TMSCONFIG).then((result) => {
            if (result && !result.IsError && result.ResultObject) {
                let _configValue = result.ResultObject.CacheData.filter(x => x.TMSConfigID == "TEMPLATE_EXPORT_TOTAL_REWARD");
                if (_configValue) {
                    this.setState({
                        exportTemplateID: _configValue[0].TMSConfigValue
                    })
                }


            }


        });
    }


    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({
            widthPercent: (window.innerWidth * 90) / 100
        })
    };

    // handleCallData() {
    //     const { SearchData } = this.state;
    //     this.callSearchData(SearchData);
    // }

    initTableHeader() {
        let cloneGridColumnList = [...GridColumnList];

        this.props.callGetCache("ERPCOMMONCACHE.TMSREWARDTYPE").then((result) => {
            cloneGridColumnList[3] = {
                Name: "TotalReward1", // update sau
                Type: "textCurrency",
                Caption: result.ResultObject.CacheData[0].RewardTypeName,
                DataSourceMember: "TotalReward1", // update sau
                Width: 100
            };
        });

        this.setState({
            listColumn: cloneGridColumnList
        });
    }

    setExcelDataExport(dataSource = [], arrColumn = []) {
        try {
            const tempDataExport = dataSource.map((item, index) => {

                const element = arrColumn.reduce((acc, val) => {
                    return {
                        ...acc,
                        [val.Caption]: typeof item[val.DataSourceMember] == "string"
                            ? item[val.DataSourceMember].trim()
                            : item[val.DataSourceMember]
                    }
                }, {})

                return element;
            });

            this.setState({
                dataExport: tempDataExport
            });
        } catch (error) {
            this.showMessage("Lỗi client, vui lòng liên hệ quản trị viên.");
        }
    }

    renderRewardTotalTable(searchData, apiResultObject) {
        try {
            const objRewardTypeIDSearch = searchData.find(item => item.SearchKey == "@REWARDTYPEID");

            this.props.callGetCache("ERPCOMMONCACHE.TMSREWARDTYPE").then((result) => {
                const objRewardType = result.ResultObject.CacheData.find(item => item.RewardTypeID == parseInt(objRewardTypeIDSearch.SearchValue));

                let cloneGridColumnList = [...GridColumnList];

                if (objRewardType == undefined || objRewardType == -1) {
                    cloneGridColumnList[3] = {
                        Name: "TotalReward1", // update sau
                        Type: "textCurrency",
                        Caption: result.ResultObject.CacheData[0].RewardTypeName,
                        DataSourceMember: "TotalReward1", // update sau
                        Width: 100
                    };
                } else {
                    cloneGridColumnList[3] = {
                        Name: "TotalReward1", // update sau
                        Type: "textCurrency",
                        Caption: objRewardType.RewardTypeName,
                        DataSourceMember: "TotalReward1", // update sau
                        Width: 100
                    };
                };

                this.setState({
                    listColumn: cloneGridColumnList
                });

                // set data export excel
                this.setExcelDataExport(apiResultObject, cloneGridColumnList);
            });

        } catch (error) {
            this.showMessage("Lỗi client, vui lòng liên hệ quản trị viên.");
        }
    }

    handleSearchSubmit(formData, MLObject) {
        const postData = [
            {
                SearchKey: "@FROMDATE",
                SearchValue: toIsoStringCus(new Date(MLObject.FromDate).toISOString())//MLObject.FromDate
            },
            {
                SearchKey: "@TODATE",
                SearchValue: toIsoStringCus(new Date(MLObject.ToDate).toISOString()) //MLObject.ToDate
            },
            {
                SearchKey: "@REWARDPOSITIONID",
                SearchValue: MLObject.RewardPositionID
            },
            {
                SearchKey: "@REWARDTYPEID",
                SearchValue: MLObject.RewardTypeID
            }
        ];
        this.setState({
            fromDate: toIsoStringCus(new Date(MLObject.FromDate).toISOString()),
            toDate: toIsoStringCus(new Date(MLObject.ToDate).toISOString())
        })
        this.callSearchData(postData);
    }

    callSearchData(searchData) {

        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
            if (!apiResult.IsError) {

                this.renderRewardTotalTable(searchData, apiResult.ResultObject);

                // const tempDataExport = apiResult.ResultObject.map((item, index) => {
                //     let element = {
                //         "Mã nhân viên": item.RewardUser.trim(),
                //         "Tên nhân viên": item.FullName.trim(),
                //         "Thưởng giao hàng": item.TotalReward1,
                //         "Phụ cấp ống đồng": item.TotalReward2,
                //         "Tiền xăng": item.TotalReward3,
                //         "Thực lãnh": item.TotalReward,

                //     };

                //     return element;

                // })

                this.setState({
                    gridDataSource: apiResult.ResultObject,
                    IsCallAPIError: apiResult.IsError,
                    IsLoadDataComplete: true,
                    // dataExport: tempDataExport
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

    onShowModalDetail(objValue, name) {
        const { fromDate, toDate } = this.state;
        const postData = {
            UserName: objValue[0].value,
            FromDate: fromDate,
            ToDate: toDate
        }

        this.props.callFetchAPI(APIHostName, SearchByUserAPIPath, postData).then(apiResult => {
            if (!apiResult.IsError) {
                this.handleShowModal(apiResult.ResultObject, postData)
            }
            else {
                this.showMessage(apiResult.MessageDetail)
            }
        })
    }

    handleShowModal(data, paramData) {
        const { widthPercent } = this.state;

        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: titleModal,
            content: {
                text: <DataGirdRewardShipmentOrder
                    dataSource={data}
                    paramData={paramData}
                    RowsPerPage={20}
                    IsAutoPaging={true}
                />

            },
            maxWidth: widthPercent + 'px'
        });
    }

    handleHistorySearch() {
        const { exportTemplateID } = this.state;
        this.props.showModal(MODAL_TYPE_SHOWDOWNLOAD_EXCEL, {
            title: "Tải file",
            maxWidth: '1200px',
            ParamRequest: { DataExportTemplateID: exportTemplateID }
        });
    }

    handleExportFileFormSearch(FormData, MLObject) {
        const { exportTemplateID } = this.state
        const postDataNew = [
            {
                SearchKey: "@FROMDATE",
                SearchValue: toIsoStringCus(new Date(MLObject.FromDate).toISOString())//MLObject.FromDate
            },
            {
                SearchKey: "@TODATE",
                SearchValue: toIsoStringCus(new Date(MLObject.ToDate).toISOString()) //MLObject.ToDate
            },
            {
                SearchKey: "@REWARDPOSITIONID",
                SearchValue: MLObject.RewardPositionID
            },
            {
                SearchKey: "@REWARDTYPEID",
                SearchValue: MLObject.RewardTypeID
            }
        ];


        const postData = {
            DataExportTemplateID: exportTemplateID,
            LoadDataStoreName: 'TMS.TMS_RWD_EXPBYDATE',
            KeyCached: "TMS_TMSREWARD_EXPORT",
            SearchParamList: postDataNew,
            ExportDataParamsDescription: "FROMDATE: " + MLObject.FromDate + " - TODATE: " + MLObject.ToDate + " - REWARDPOSITIONID: " + MLObject.RewardPositionID + " - REWARDTYPEID: " + MLObject.RewardTypeID
        }

        this.props.callFetchAPI(APIHostName, "api/DataExportQueue/AddQueueExport", postData).then(apiResult => {
            if (!apiResult.IsError) {
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

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <SearchForm
                    className="multiple"
                    classNamebtnSearch="groupAction"
                    FormName="Tìm kiếm danh sách tổng thương giao hàng"
                    IsButtonExport={true}
                    IsButtonhistory={true}
                    listelement={SearchElementList}
                    MLObjectDefinition={SearchMLObjectDefinition}
                    onExportSubmit={this.handleExportFileFormSearch.bind(this)}
                    onHistorySubmit={this.handleHistorySearch.bind(this)}
                    onSubmit={this.handleSearchSubmit}
                    ref={this.searchref}
                />

                <DataGrid
                    // AddLink=""
                    // listColumn={GridColumnList}
                    DataExport={this.state.dataExport}
                    dataSource={this.state.gridDataSource}
                    ExportPermission={TMS_TMSREWARD_EXPORT}
                    fileName="Danh sách tổng xuất thưởng"
                    IDSelectColumnName={'RewardUser'}
                    IsAutoPaging={true}
                    IsExportFile={false}
                    IsExportFile={false}
                    isHideHeaderToolbar={false}
                    IsPrint={false}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    IsShowButtonPrint={false}
                    listColumn={this.state.listColumn}
                    onExportFile={this.handleExportFile.bind(this)}
                    onShowModal={this.onShowModalDetail.bind(this)}
                    PKColumnName={'RewardUser'}
                    ref={this.gridref}
                    RequirePermission={TMS_TMSREWARD_VIEW}
                    RowsPerPage={50}
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
