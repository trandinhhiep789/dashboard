import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNotification from "react-notifications-component";
import { ModalManager } from 'react-dynamic-modal';

import { updatePagePath } from "../../../../../../actions/pageAction";
import {
    APIHostName, PagePath, SearchElementList,
    SearchMLObjectDefinition, SearchAPIPath,InitSearchParams
} from '../constants';
import SearchForm from "../../../../../../common/components/FormContainer/SearchForm";
import DataGrid from "../../../../../../common/components/DataGrid";
import { callFetchAPI } from "../../../../../../actions/fetchAPIAction";
import { MessageModal } from "../../../../../../common/components/Modal";
import { MODAL_TYPE_SHOWDOWNLOAD_EXCEL } from '../../../../../../constants/actionTypes';
import { showModal, hideModal } from '../../../../../../actions/modal';
import GridPage from "../../../../../../common/components/DataGrid/GridPage";
import { DEFAULT_ROW_PER_PAGE } from "../../../../../../constants/systemVars.js";
import { toIsoStringCus, toIsoStringCusNew, formatNumber, formatNumberNew, toIsoStringNew } from '../../../../../../utils/function';

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
            fromDate: "",
            toDate: "",
            AreaIDList: "",
            pageNumber: 1,
            pageSize: 3,
            FromDate: "",
            ToDate: "",
            AreaID: "",
            CoordinatorGroupID: ""
        }

        this.searchref = React.createRef();
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.showMessage = this.showMessage.bind(this);
        this.callSearchData = this.callSearchData.bind(this);
        this.onChangePageToServerHandle = this.onChangePageToServerHandle.bind(this)
    };

    componentWillReceiveProps(nextProps) {

    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
    }


    showMessage(message) {
        ModalManager.open(<MessageModal title="Thông báo"
            message={message} onRequestClose={() => true}
            onCloseModal={this.handleCloseMessage}
        />);
    };

    callSearchData(searchData) {

        this.props.callFetchAPI(APIHostName, "api/QualityAssessmentReport/QuanlityReportAll", searchData).then(apiResult => {
            console.log("searh", searchData, apiResult)
            if (!apiResult.IsError) {
                this.setState({
                    dataSource: apiResult.ResultObject
                });
            }
            else {
                this.showMessage(apiResult.Message, apiResult.IsError);
            }
        });

    };

    handleSearchSubmit(formData, MLObject) {
        console.log("submit", MLObject)

        let result, result2;

        if (MLObject.SubGroupID != -1 && MLObject.SubGroupID != null && MLObject.SubGroupID != "") {
            result = MLObject.SubGroupID.reduce((data, item, index) => {
                const comma = data.length ? "," : "";
                return data + comma + item;
            }, '');
        }
        else {
            result = ""
        }

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
                SearchValue: MLObject.FromDate
            },
            {
                SearchKey: "@TODATE",
                SearchValue: MLObject.ToDate
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
                SearchKey: "@MAINGROUPIDLIST",
                SearchValue: MLObject.MainGroupID > 0 ? MLObject.MainGroupID : ""
            },
            {
                SearchKey: "@SUBGROUPIDLIST",
                SearchValue: result
            },
            {
                SearchKey: "@PAGESIZE",
                SearchValue: 3
            },
            {
                SearchKey: "@PAGEINDEX",
                SearchValue: this.state.pageNumber
            },
        ];
        console.log("submit", MLObject, postData)
        this.setState({
            SearchData: postData
        })
        this.callSearchData(postData);
    };

    handleHistorySearch() {
        this.props.showModal(MODAL_TYPE_SHOWDOWNLOAD_EXCEL, {
            title: "Tải file",
            maxWidth: '1200px',
            ParamRequest: { DataExportTemplateID: 3 }
        });
    }

    handleExportSubmit(formData, MLObject) {
        console.log("export", MLObject)
        const postDataNew = [
            {
                SearchKey: "@FROMDATE",
                SearchValue: MLObject.FromDate
            },
            {
                SearchKey: "@TODATE",
                SearchValue: MLObject.ToDate
            },


        ];

        const postData = {
            DataExportTemplateID: 3,
            LoadDataStoreName: 'TMS.TMS_SHIPMENT_ITEM_REPORT',
            KeyCached: "SHIPMENTORDER_REPORT_EXPORT",
            SearchParamList: postDataNew,
            ExportDataParamsDescription: "FROMDATE: " + formatDate(MLObject.FromDate) + " - TODATE: " + formatDate(MLObject.ToDate)
        }
        this.props.callFetchAPI(APIHostName, "api/DataExportQueue/AddQueueExport", postData).then(apiResult => {
            if (!apiResult.IsError) {
                this.props.showModal(MODAL_TYPE_SHOWDOWNLOAD_EXCEL, {
                    title: "Tải file",
                    maxWidth: '1200px',
                    ParamRequest: { DataExportTemplateID: 3 }
                });
            }
            else {
                this.showMessage(apiResult.Message)
            }
        });
    }

    handleChangeSearch(FormData, MLObject) {
        console.log("change", FormData, MLObject)

    }

    handleChangePage(numPage) {
        console.log("handleChangePage", numPage)


        this.setState({
            pageNumber: numPage
        });

        const postData = [
            {
                SearchKey: "@FROMDATE",
                SearchValue: MLObject.FromDate
            },
            {
                SearchKey: "@TODATE",
                SearchValue: MLObject.ToDate
            },
            {
                SearchKey: "@AREAIDLIST",
                SearchValue: MLObject.AreaID
            },
            {
                SearchKey: "@COORDINATORGROUPIDLIST",
                SearchValue: MLObject.CoordinatorGroupID
            },

            {
                SearchKey: "@MAINGROUPIDLIST",
                SearchValue: MLObject.MainGroupID
            },
            {
                SearchKey: "@SUBGROUPIDLIST",
                SearchValue: MLObject.SubGroupID
            },
            {
                SearchKey: "@PAGEINDEX",
                SearchValue: numPage
            },
            {
                SearchKey: "@PAGESIZE",
                SearchValue: this.state.pageSize
            },

        ];;

        this.callSearchData(postData);



    }

    onChangePageToServerHandle(pageNum) {
        this.setState({ pageNumber: pageNum });
        let listMLObject = [];
        const aa = { SearchKey: "@PAGEINDEX", SearchValue: pageNum };
        listMLObject = Object.assign([], this.state.SearchData, { [7]: aa });
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
        const { dataSource, pageNumber } = this.state;
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
                    className="multiple "
                />

                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <div className=" table-responsive">
                                <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                    <thead className="thead-light">
                                        <tr>
                                            <th className="jsgrid-header-cell text-center" style={{ width: "22%" }} colSpan={4}>Tổng đơn hàng</th>
                                            <th className="jsgrid-header-cell text-center" style={{ width: "13%" }} colSpan={4}>Tổng lỗi</th>
                                            <th className="jsgrid-header-cell text-center" style={{ width: "13%" }} colSpan={4}>Thời gian</th>
                                            <th className="jsgrid-header-cell text-center" style={{ width: "13%" }} colSpan={4}>Thái độ</th>
                                            <th className="jsgrid-header-cell text-center" style={{ width: "13%" }} colSpan={4}>Thẩm mỹ</th>
                                            <th className="jsgrid-header-cell text-center" style={{ width: "13%" }} colSpan={4}>Tay nghề</th>
                                            <th className="jsgrid-header-cell text-center" style={{ width: "13%" }} colSpan={4}>Quy trình</th>
                                        </tr>
                                        <tr>
                                            <th className="jsgrid-header-cell text-center" style={{ width: 200 }}>Miền</th>
                                            <th className="jsgrid-header-cell text-center" style={{ width: 200 }}>Ngành hàng</th>
                                            <th className="jsgrid-header-cell text-center" style={{ width: 200 }}>nhóm hàng</th>
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
                                        {/* <tr className="sum-total">
                                            <td style={{ width: 200 }}>Tổng cộng</td>
                                            <td style={{ width: 200 }}></td>
                                            <td style={{ width: 200 }}></td>
                                            <td style={{ width: 150 }}>1</td>

                                            <td style={{ width: 150 }}>1</td>
                                            <td style={{ width: 150 }}>1</td>
                                            <td style={{ width: 150 }}>1</td>
                                            <td style={{ width: 150 }}>1</td>

                                            <td style={{ width: 150 }}>1</td>
                                            <td style={{ width: 150 }}>1</td>
                                            <td style={{ width: 150 }}>1</td>
                                            <td style={{ width: 150 }}>1</td>

                                            <td style={{ width: 150 }}>1</td>
                                            <td style={{ width: 150 }}>1</td>
                                            <td style={{ width: 150 }}>1</td>
                                            <td style={{ width: 150 }}>1</td>

                                            <td style={{ width: 150 }}>1</td>
                                            <td style={{ width: 150 }}>1</td>
                                            <td style={{ width: 150 }}>1</td>
                                            <td style={{ width: 150 }}>1</td>

                                            <td style={{ width: 150 }}>1</td>
                                            <td style={{ width: 150 }}>1</td>
                                            <td style={{ width: 150 }}>1</td>
                                            <td style={{ width: 150 }}>1</td>

                                            <td style={{ width: 150 }}>1</td>
                                            <td style={{ width: 150 }}>1</td>
                                            <td style={{ width: 150 }}>1</td>
                                            <td style={{ width: 150 }}>1</td>

                                        </tr> */}

                                        {
                                            dataSource.map((item, index) => {
                                                return <tr key={index}>
                                                    <td style={{ width: 200 }}>{item.AreaName}</td>
                                                    <td style={{ width: 200 }}>{item.MainGroupName}</td>
                                                    <td style={{ width: 200 }}>{item.SubGroupName}</td>
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
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search)
