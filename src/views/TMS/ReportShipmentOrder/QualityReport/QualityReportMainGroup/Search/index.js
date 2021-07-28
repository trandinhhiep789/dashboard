import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNotification from "react-notifications-component";
import { ModalManager } from 'react-dynamic-modal';

import { updatePagePath } from "../../../../../../actions/pageAction";
import {
    APIHostName, PagePath, SearchElementList,
    SearchMLObjectDefinition, SearchAPIPath, InitSearchParams
} from '../constants';
import SearchForm from "../../../../../../common/components/FormContainer/SearchForm";
import DataGrid from "../../../../../../common/components/DataGrid";
import { callFetchAPI } from "../../../../../../actions/fetchAPIAction";
import { callGetCache } from "../../../../../../actions/cacheAction";
import { MessageModal } from "../../../../../../common/components/Modal";
import { MODAL_TYPE_SHOWDOWNLOAD_EXCEL } from '../../../../../../constants/actionTypes';
import { showModal, hideModal } from '../../../../../../actions/modal';
import GridPage from "../../../../../../common/components/DataGrid/GridPage";
import { DEFAULT_ROW_PER_PAGE } from "../../../../../../constants/systemVars.js";
import { toIsoStringCus, toIsoStringCusNew, formatNumber, formatNumberNew, toIsoStringNew } from '../../../../../../utils/function';
import { ERPCOMMONCACHE_TMSCONFIG } from '../../../../../../constants/keyCache';

export class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cssNotification: "",
            iconNotification: "",
            dataSource: [],
            SearchElementList: SearchElementList,
            IsLoadDataComplete: false,
            SearchData: InitSearchParams,
            dataTotalSource: {},
            SearchTotalData: InitSearchParams,
            fromDate: "",
            toDate: "",
            AreaIDList: "",
            pageNumber: 1,
            pageSize: 31,
            FromDate: "",
            ToDate: "",
            AreaID: "",
            CoordinatorGroupID: "",
            exportTemplateID: ""
        }

        this.searchref = React.createRef();
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.showMessage = this.showMessage.bind(this);
        this.callSearchData = this.callSearchData.bind(this);
        this.onChangePageToServerHandle = this.onChangePageToServerHandle.bind(this)
        this.getCacheMTG = this.getCacheMTG.bind(this);
    };


    componentDidMount() {
        this.props.updatePagePath(PagePath);
        this.getCacheMTG();
    }


    getCacheMTG() {
        this.props.callGetCache(ERPCOMMONCACHE_TMSCONFIG).then((result) => {
            if (result && !result.IsError && result.ResultObject) {
                let _configValue = result.ResultObject.CacheData.filter(x => x.TMSConfigID == "TEMPLATE_EXPORT_QUALITYASSESS_BYMAIN");
                if (_configValue) {
                    this.setState({
                        exportTemplateID: _configValue[0].TMSConfigValue
                    })
                }


            }


        });
    }

    showMessage(message) {
        ModalManager.open(<MessageModal title="Thông báo"
            message={message} onRequestClose={() => true}
            onCloseModal={this.handleCloseMessage}
        />);
    };

    callSearchData(searchData) {

        this.props.callFetchAPI(APIHostName, "api/QualityAssessmentReport/QualityReportMainGroup", searchData).then(apiResult => {
            console.log("search", searchData, apiResult)
            if (!apiResult.IsError) {
                if (apiResult.ResultObject.length > 0) {
                    this.setState({
                        dataSource: apiResult.ResultObject
                    });
                }
                else {
                    this.setState({
                        dataSource: apiResult.ResultObject,
                    });
                    this.showMessage("Dữ liệu cần không tồn tại. Vui lòng chọn lại.");
                }
                this.callSearchTotalData();
            }
            else {
                this.showMessage(apiResult.Message, apiResult.IsError);
            }
        });

    };

    callSearchTotalData() {
        const { SearchTotalData } = this.state
        this.props.callFetchAPI(APIHostName, "api/QualityAssessmentReport/TotalQualityReportMainGroup", SearchTotalData).then(apiResult => {
            console.log("searh total", SearchTotalData, apiResult)
            if (!apiResult.IsError) {
                this.setState({
                    dataTotalSource: apiResult.ResultObject[0]
                });

            }
            else {
                this.showMessage(apiResult.Message, apiResult.IsError);
            }
        });
    }

    handleSearchSubmit(formData, MLObject) {

        let result, result2;

        if (MLObject.CoordinatorGroupID != -1 && MLObject.CoordinatorGroupID != null && MLObject.CoordinatorGroupID != "") {
            result2 = MLObject.CoordinatorGroupID.reduce((data, item, index) => {
                const comma = data.length ? "," : "";
                return data + comma + item;
            }, '');
        }
        else {
            result2 = ""
        }

        const postData = [
            {
                SearchKey: "@FROMDATE",
                SearchValue: toIsoStringCus(new Date(MLObject.FromDate).toISOString()) //MLObject.FromDate 
            },
            {
                SearchKey: "@TODATE",
                SearchValue:  toIsoStringCus(new Date(MLObject.ToDate).toISOString()) //MLObject.ToDate
            },
            {
                SearchKey: "@AREAIDLIST",
                SearchValue: MLObject.AreaID > 0 ? MLObject.AreaID : ""
            },
            {
                SearchKey: "@COORDINATORGROUPIDLIST",
                SearchValue: result2
            },

            {
                SearchKey: "@ISDETAIL",
                SearchValue: 1
            },

            {
                SearchKey: "@PAGESIZE",
                SearchValue: this.state.pageSize
            },
            {
                SearchKey: "@PAGEINDEX",
                SearchValue: this.state.pageNumber
            },
        ];


        const postTotalData = [
            {
                SearchKey: "@FROMDATE",
                SearchValue: toIsoStringCus(new Date(MLObject.FromDate).toISOString()) //MLObject.FromDate 
            },
            {
                SearchKey: "@TODATE",
                SearchValue:  toIsoStringCus(new Date(MLObject.ToDate).toISOString()) //MLObject.ToDate
            },
            {
                SearchKey: "@AREAIDLIST",
                SearchValue: MLObject.AreaID > 0 ? MLObject.AreaID : ""
            },
            {
                SearchKey: "@COORDINATORGROUPIDLIST",
                SearchValue: result2
            },

            {
                SearchKey: "@ISDETAIL",
                SearchValue: 0
            },

            {
                SearchKey: "@PAGESIZE",
                SearchValue: this.state.pageSize
            },
            {
                SearchKey: "@PAGEINDEX",
                SearchValue: this.state.pageNumber
            },
        ];

        console.log("submit", MLObject, postData)
        this.setState({
            SearchData: postData,
            SearchTotalData: postTotalData
        })
        this.callSearchData(postData);
    };

    handleHistorySearch() {
        const { exportTemplateID } = this.state;
        this.props.showModal(MODAL_TYPE_SHOWDOWNLOAD_EXCEL, {
            title: "Lịch sử tải file",
            maxWidth: '1200px',
            ParamRequest: { DataExportTemplateID: exportTemplateID }
        });
    }

    handleExportSubmit(formData, MLObject) {
        const { exportTemplateID } = this.state


        let result, result2;

        if (MLObject.CoordinatorGroupID != -1 && MLObject.CoordinatorGroupID != null && MLObject.CoordinatorGroupID != "") {
            result2 = MLObject.CoordinatorGroupID.reduce((data, item, index) => {
                const comma = data.length ? "," : "";
                return data + comma + item;
            }, '');
        }
        else {
            result2 = ""
        }

        const areaID = MLObject.AreaID > 0 ? MLObject.AreaID : "";
        const mainGroupID = MLObject.MainGroupID > 0 ? MLObject.MainGroupID : "";

        const postDataNew = [
            {
                SearchKey: "@FROMDATE",
                SearchValue: toIsoStringCus(new Date(MLObject.FromDate).toISOString()) //MLObject.FromDate 
            },
            {
                SearchKey: "@TODATE",
                SearchValue:  toIsoStringCus(new Date(MLObject.ToDate).toISOString()) //MLObject.ToDate
            },
            {
                SearchKey: "@AREAIDLIST",
                SearchValue: areaID
            },
            {
                SearchKey: "@COORDINATORGROUPIDLIST",
                SearchValue: result2
            },

            {
                SearchKey: "@ISDETAIL",
                SearchValue: 1
            },
            {
                SearchKey: "@PAGESIZE",
                SearchValue: -1
            },
            {
                SearchKey: "@PAGEINDEX",
                SearchValue: -1
            },
        ];

        console.log("export", MLObject, postDataNew)

        const postData = {
            DataExportTemplateID: exportTemplateID,
            LoadDataStoreName: 'TMS.RPT_SHIPQUALITYASSESS',
            KeyCached: "SHIPMENTORDER_REPORT_EXPORT",
            SearchParamList: postDataNew,
            ExportDataParamsDescription: "FROMDATE: " + MLObject.FromDate + " - TODATE: " + MLObject.ToDate + " - AREAIDLIST: " + areaID + " - COORDINATORGROUPIDLIST: " + result2 + " - ISDETAIL: " + 1 + " - PAGESIZE: " + "-1" + " - PAGEINDEX: " + "-1"
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
    }

    handleChangeSearch(FormData, MLObject) {


    }


    onChangePageToServerHandle(pageNum) {
        this.setState({ pageNumber: pageNum });
        let listMLObject = [];
        const aa = { SearchKey: "@PAGEINDEX", SearchValue: pageNum };
        listMLObject = Object.assign([], this.state.SearchData, { [6]: aa });
        // console.log(this.state.SearchData,listMLObject)
        this.callSearchData(listMLObject)

    }

    getPageCountToServer(dataRows) {
        if (dataRows == null || dataRows.length == 0)
            return 1;
        let rowsPerPage = DEFAULT_ROW_PER_PAGE;
        if (this.state.pageSize != null && dataRows.length > 0)
            rowsPerPage = this.state.pageSize;
        let pageCount = parseInt(Math.ceil(dataRows[0].TotaLRows / rowsPerPage));
        if (pageCount < 1)
            pageCount = 1;
        return pageCount;
    }

    render() {
        const { dataSource, pageNumber, dataTotalSource } = this.state;
        const pageCount = this.getPageCountToServer(dataSource);
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <SearchForm
                    FormName="Tìm kiếm báo cáo chất lượng toàn quốc"
                    listelement={this.state.SearchElementList}
                    MLObjectDefinition={SearchMLObjectDefinition}
                    onSubmit={this.handleSearchSubmit}
                    ref={this.searchref}
                    colGroupAction={6}
                    IsButtonExport={true}
                    IsButtonhistory={true}
                    onHistorySubmit={this.handleHistorySearch.bind(this)}
                    onExportSubmit={this.handleExportSubmit.bind(this)}
                    onchange={this.handleChangeSearch.bind(this)}
                    className="multiple multiple-custom"
                />

                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <div className=" table-responsive">
                                <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                    <thead className="thead-light">
                                        <tr>
                                            <th className="jsgrid-header-cell text-center" style={{ width: "22%" }} colSpan={3}>Tổng đơn hàng</th>
                                            <th className="jsgrid-header-cell text-center" style={{ width: "13%" }} colSpan={4}>Tổng lỗi {dataTotalSource.PercentageQuantityLike != undefined ? dataTotalSource.PercentageQuantityLike : 0} %</th>
                                            <th className="jsgrid-header-cell text-center" style={{ width: "13%" }} colSpan={4}>Thời gian {dataTotalSource.PercentageTimeLike != undefined ? dataTotalSource.PercentageTimeLike : 0} %</th>
                                            <th className="jsgrid-header-cell text-center" style={{ width: "13%" }} colSpan={4}>Thái độ {dataTotalSource.PercentageAttitudeLike != undefined ? dataTotalSource.PercentageAttitudeLike : 0} %</th>
                                            <th className="jsgrid-header-cell text-center" style={{ width: "13%" }} colSpan={4}>Thẩm mỹ {dataTotalSource.PercentageBeautyLike != undefined ? dataTotalSource.PercentageBeautyLike : 0} %</th>
                                            <th className="jsgrid-header-cell text-center" style={{ width: "13%" }} colSpan={4}>Tay nghề {dataTotalSource.PercentageTechLike != undefined ? dataTotalSource.PercentageTechLike : 0} %</th>
                                            <th className="jsgrid-header-cell text-center" style={{ width: "13%" }} colSpan={4}>Quy trình {dataTotalSource.PercentageFlowLike != undefined ? dataTotalSource.PercentageFlowLike : 0} %</th>
                                        </tr>
                                        <tr>
                                            <th className="jsgrid-header-cell text-center" style={{ width: 200 }}>Khu vực</th>
                                            <th className="jsgrid-header-cell text-center" style={{ width: 200 }}>Ngành hàng</th>
                                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>SL giao lắp</th>

                                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Không hài lòng</th>
                                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Hài lòng</th>
                                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Tổng cộng</th>
                                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Tỷ lệ hài lòng</th>

                                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Không hài lòng</th>
                                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Hài lòng</th>
                                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Tổng cộng</th>
                                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Tỷ lệ hài lòng</th>

                                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Không hài lòng</th>
                                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Hài lòng</th>
                                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Tổng cộng</th>
                                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Tỷ lệ hài lòng</th>

                                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Không hài lòng</th>
                                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Hài lòng</th>
                                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Tổng cộng</th>
                                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Tỷ lệ hài lòng</th>

                                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Không hài lòng</th>
                                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Hài lòng</th>
                                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Tổng cộng</th>
                                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Tỷ lệ hài lòng</th>

                                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Không hài lòng</th>
                                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Hài lòng</th>
                                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Tổng cộng</th>
                                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Tỷ lệ hài lòng</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            !!Object.keys(dataTotalSource).length > 0 && <tr className="sum-total">
                                                <td style={{ width: 200 }}>Tổng cộng</td>
                                                <td style={{ width: 200 }}></td>
                                                <td style={{ width: 150 }}>{dataTotalSource.TotalQuantity}</td>

                                                <td style={{ width: 150 }}>{dataTotalSource.TotalQuantityUnlike}</td>
                                                <td style={{ width: 150 }}>{dataTotalSource.TotalQuantityLike}</td>
                                                <td style={{ width: 150 }}>{dataTotalSource.TotalQuantityValue}</td>
                                                <td style={{ width: 150 }}>{dataTotalSource.PercentageQuantityLike + "%"}</td>

                                                <td style={{ width: 150 }}>{dataTotalSource.TotalQuantityTimeUnlike}</td>
                                                <td style={{ width: 150 }}>{dataTotalSource.TotalQuantityTimeLike}</td>
                                                <td style={{ width: 150 }}>{dataTotalSource.TotalQuantityTimeValue}</td>
                                                <td style={{ width: 150 }}>{dataTotalSource.PercentageTimeLike + "%"}</td>

                                                <td style={{ width: 150 }}>{dataTotalSource.TotalQuantityAttitudeUnlike}</td>
                                                <td style={{ width: 150 }}>{dataTotalSource.TotalQuantityAttitudeLike}</td>
                                                <td style={{ width: 150 }}>{dataTotalSource.TotalQuantityAttitudeValue}</td>
                                                <td style={{ width: 150 }}>{dataTotalSource.PercentageAttitudeLike + "%"}</td>

                                                <td style={{ width: 150 }}>{dataTotalSource.TotalQuantityBeautyUnlike}</td>
                                                <td style={{ width: 150 }}>{dataTotalSource.TotalQuantityBeautyLike}</td>
                                                <td style={{ width: 150 }}>{dataTotalSource.TotalQuantityBeautyValue}</td>
                                                <td style={{ width: 150 }}>{dataTotalSource.PercentageBeautyLike + "%"}</td>

                                                <td style={{ width: 150 }}>{dataTotalSource.TotalQuantityTechUnlike}</td>
                                                <td style={{ width: 150 }}>{dataTotalSource.TotalQuantityTechLike}</td>
                                                <td style={{ width: 150 }}>{dataTotalSource.TotalQuantityTechValue}</td>
                                                <td style={{ width: 150 }}>{dataTotalSource.PercentageTechLike + "%"}</td>

                                                <td style={{ width: 150 }}>{dataTotalSource.TotalQuantityFlowUnlike}</td>
                                                <td style={{ width: 150 }}>{dataTotalSource.TotalQuantityFlowLike}</td>
                                                <td style={{ width: 150 }}>{dataTotalSource.TotalQuantityFlowValue}</td>
                                                <td style={{ width: 150 }}>{dataTotalSource.PercentageFlowLike + "%"}</td>

                                            </tr>
                                        }

                                        {
                                            dataSource.map((item, index) => {
                                                return <tr key={index}>
                                                    <td style={{ width: 200 }}>{item.AreaName}</td>
                                                    <td style={{ width: 200 }}>{item.MainGroupName}</td>
                                                    <td style={{ width: 150 }}>{item.TotalQuantity}</td>

                                                    <td style={{ width: 150 }}>{item.TotalQuantityUnlike}</td>
                                                    <td style={{ width: 150 }}>{item.TotalQuantityLike}</td>
                                                    <td style={{ width: 150 }}>{item.TotalQuantityValue}</td>
                                                    <td style={{ width: 150 }}>{item.PercentageQuantityLike}</td>

                                                    <td style={{ width: 150 }}>{item.TotalQuantityTimeUnlike}</td>
                                                    <td style={{ width: 150 }}>{item.TotalQuantityTimeLike}</td>
                                                    <td style={{ width: 150 }}>{item.TotalQuantityTimeValue}</td>
                                                    <td style={{ width: 150 }}>{item.PercentageTimeLike}</td>

                                                    <td style={{ width: 150 }}>{item.TotalQuantityAttitudeUnlike}</td>
                                                    <td style={{ width: 150 }}>{item.TotalQuantityAttitudeLike}</td>
                                                    <td style={{ width: 150 }}>{item.TotalQuantityAttitudeValue}</td>
                                                    <td style={{ width: 150 }}>{item.PercentageAttitudeLike}</td>

                                                    <td style={{ width: 150 }}>{item.TotalQuantityBeautyUnlike}</td>
                                                    <td style={{ width: 150 }}>{item.TotalQuantityBeautyLike}</td>
                                                    <td style={{ width: 150 }}>{item.TotalQuantityBeautyValue}</td>
                                                    <td style={{ width: 150 }}>{item.PercentageBeautyLike}</td>

                                                    <td style={{ width: 150 }}>{item.TotalQuantityTechUnlike}</td>
                                                    <td style={{ width: 150 }}>{item.TotalQuantityTechLike}</td>
                                                    <td style={{ width: 150 }}>{item.TotalQuantityTechValue}</td>
                                                    <td style={{ width: 150 }}>{item.PercentageTechLike}</td>

                                                    <td style={{ width: 150 }}>{item.TotalQuantityFlowUnlike}</td>
                                                    <td style={{ width: 150 }}>{item.TotalQuantityFlowLike}</td>
                                                    <td style={{ width: 150 }}>{item.TotalQuantityFlowValue}</td>
                                                    <td style={{ width: 150 }}>{item.PercentageFlowLike}</td>

                                                </tr>
                                            })
                                        }

                                    </tbody>
                                </table>
                                <GridPage numPage={pageCount} currentPage={pageNumber} maxPageShow={10} onChangePage={this.onChangePageToServerHandle.bind(this)} />
                            </div>
                        </div>
                    </div>
                </div>

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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: (type, props) => {
            dispatch(hideModal(type, props));
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search)
