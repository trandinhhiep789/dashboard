import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNotification from "react-notifications-component";
import { ModalManager } from 'react-dynamic-modal';

import { updatePagePath } from "../../../../../actions/pageAction";
import {
    APIHostName, PagePath, SearchElementList,
    SearchMLObjectDefinition, SearchAPIPath,
    PageMainGroupPath, PageBranchPath, PageBranchGeneralPath, PageUserPath,
    SearchByUserElementList, SearchByUserMLObjectDefinition
} from '../constants';
import SearchForm from "../../../../../common/components/FormContainer/SearchForm";
import DataGrid from "../../../../../common/components/DataGrid";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { MessageModal } from "../../../../../common/components/Modal";
import { MODAL_TYPE_SHOWDOWNLOAD_EXCEL } from '../../../../../constants/actionTypes';
import { showModal, hideModal } from '../../../../../actions/modal';
import QuanlityReportAll from '../components/QuanlityReportAll';
import QualityReportMainGroup from '../components/QualityReportMainGroup';
import QualityReportBranch from '../components/QualityReportBranch'
import QualityReportBranchGeneral from '../components/QualityReportBranchGeneral '
import QualityReportByUser from '../components/QualityReportByUser'

import { toIsoStringCus, toIsoStringCusNew, formatNumber, formatNumberNew, toIsoStringNew } from '../../../../../utils/function'
export class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cssNotification: "",
            iconNotification: "",
            dataSource: [],
            ReportQualityTypeID: 5,
            SearchElementList: SearchElementList,
            SearchByUserElementList: SearchByUserElementList,
            IsLoadDataComplete: false,
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
        this.renderGirdData = this.renderGirdData.bind(this)
        this.getComboxDataCooGroupByArea = this.getComboxDataCooGroupByArea.bind(this)
        this.renderFormSeach = this.renderFormSeach.bind(this)
    };

    componentWillReceiveProps(nextProps) {

    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        // this.showMessage("Tính năng đang phát triển");

        console.log("state", this.state.SearchElementList, Date.parse(toIsoStringCusNew(new Date((new Date().getMonth() + 1) + "/" + '01' + "/" + new Date().getFullYear()).toISOString(), false)))



        const objData = {
            "storedName": "MD_COORDINATORGROUP_CACHE",
            "params": [
                {
                    "name": "V_DATE",
                    "value": 1626368400000.0,
                    "op": "timestamp"
                },
                {
                    "name": "V_AREAIDLIST",
                    "value": 1,
                    "op": "array"
                }
            ]
        }

        this.getComboxDataCooGroupByArea(objData)


        // this.state.SearchElementList.find(n => n.name == 'cbMonthlyCoordGropup').listoption = listoption;
    }

    getComboxDataCooGroupByArea(objData) {
        let _SearchElementList = this.state.SearchElementList;
        let _SearchByUserElementList = this.state.SearchByUserElementList;

        this.props.callFetchAPI(APIHostName, "api/CoordinatorGroup/GetDataCooGroupByArea", objData).then(apiResult => {
            console.log("aaa", apiResult)
            if (apiResult.IsError) {
                this.showMessage("Lỗi lấy danh sách cache.")
            }
            else {

                _SearchElementList.forEach(function (objElement) {
                    if (objElement.type == 'MGCOOMultiTreeSelect') {
                        objElement.listoption = apiResult.ResultObject;
                        objElement.value = -1;
                    }
                });
                _SearchByUserElementList.forEach(function (objElement) {
                    if (objElement.type == 'MGCOOMultiTreeSelect') {
                        objElement.listoption = apiResult.ResultObject;
                        objElement.value = -1;
                    }
                });

                this.setState({
                    SearchElementList: _SearchElementList,
                    SearchByUserElementList: _SearchByUserElementList,
                    IsLoadDataComplete: true
                });
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

        this.props.callFetchAPI(APIHostName, "api/QualityAssessmentReport/Search", searchData).then(apiResult => {
            console.log("searh", searchData, apiResult)
            let sumItem = {};
            if (!apiResult.IsError) {

                const totalCOD = apiResult.ResultObject.reduce((sum, curValue, curIndex, []) => {
                    sum += curValue.TotalQuantityLike
                    return sum
                }, 0);
                console.log("searh", totalCOD)
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
        const { ReportQualityTypeID } = this.state;
        let postData;
        switch (ReportQualityTypeID) {
            case 1:
                postData = [
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


                ];
                break;
            case 2:
                postData = [
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


                ];
                break;
            case 3:
                postData = [
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


                ];
                break;
            case 4:
                postData = [
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


                ];
                break;
            case 5:
                this.setState({
                    FromDate: MLObject.FromDate,
                    ToDate: MLObject.ToDate,
                    AreaID: "",
                    CoordinatorGroupID: ""
                })
                postData = [
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
                        SearchValue: "" //MLObject.AreaID
                    },
                    {
                        SearchKey: "@COORDINATORGROUPIDLIST",
                        SearchValue: ""// MLObject.CoordinatorGroupID 
                    },
                    {
                        SearchKey: "@PAGEINDEX",
                        SearchValue: this.state.pageNumber
                    },
                    {
                        SearchKey: "@PAGESIZE",
                        SearchValue: 3
                    },


                ];
                break;
            default:
                break;
        }

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
        const postData = {
            FromDate: "",
            ToDate: "",
            AreaID: -1
        }
        const ReportQualityTypeID = FormData.cbReportQualityType.value
        this.setState({
            ReportQualityTypeID: ReportQualityTypeID
        });


        // const objData = {
        //     "storedName": "MD_COORDINATORGROUP_CACHE",
        //     "params": [
        //         {
        //             "name": "V_DATE",
        //             "value": 1626368400000.0,
        //             "op": "timestamp"
        //         },
        //         {
        //             "name": "V_AREAIDLIST",
        //             "value": 1,
        //             "op": "array"
        //         }
        //     ]
        // }

        // this.getComboxDataCooGroupByArea(objData)


    }

    handleChangePage(numPage) {
        console.log("handleChangePage", numPage)


        this.setState({
            pageNumber: numPage
        });

        const { ReportQualityTypeID } = this.state;

        let postData;
        switch (ReportQualityTypeID) {
            case 1:
                postData = [
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


                ];
                break;
            case 2:
                postData = [
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


                ];
                break;
            case 3:
                postData = [
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


                ];
                break;
            case 4:
                postData = [
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


                ];
                break;
            case 5:
                postData = [
                    {
                        SearchKey: "@FROMDATE",
                        SearchValue: this.state.FromDate
                    },
                    {
                        SearchKey: "@TODATE",
                        SearchValue: this.state.ToDate
                    },
                    {
                        SearchKey: "@AREAIDLIST",
                        SearchValue: this.state.AreaID
                    },
                    {
                        SearchKey: "@COORDINATORGROUPIDLIST",
                        SearchValue: this.state.CoordinatorGroupID
                    },
                    {
                        SearchKey: "@PAGEINDEX",
                        SearchValue: numPage
                    },
                    {
                        SearchKey: "@PAGESIZE",
                        SearchValue: this.state.pageSize
                    },


                ];
                break;
            default:
                break;
        }
        console.log("change page:", postData, this.state)
        this.callSearchData(postData);



    }

    renderGirdData() {
        const { ReportQualityTypeID, dataSource } = this.state;
        let girdData;
        switch (ReportQualityTypeID) {
            case 1:
                girdData = <QuanlityReportAll dataSource={dataSource} />
                break;
            case 2:
                girdData = <QualityReportMainGroup dataSource={dataSource} />
                break;
            case 3:
                girdData = <QualityReportBranch dataSource={dataSource} />
                break;
            case 4:
                girdData = <QualityReportBranchGeneral dataSource={dataSource} />
                break;
            case 5:
                girdData = <QualityReportByUser
                    dataSource={dataSource}
                    pageNumber={this.state.pageNumber}
                    onChangePage={this.handleChangePage.bind(this)}
                    RowsPerPage={3}
                />
                break;
            default:
                break;
        }
        return girdData;
    }

    renderFormSeach() {
        const { ReportQualityTypeID } = this.state;
 
        let formSearch;
        console.log("render search", ReportQualityTypeID)
        switch (ReportQualityTypeID) {
            case 1:
                formSearch = <SearchForm
                    FormName="Tìm kiếm báo cáo chất lượng toàn quốc"
                    listelement={this.state.SearchElementList}
                    MLObjectDefinition={SearchMLObjectDefinition}
                    onSubmit={this.handleSearchSubmit}
                    ref={this.searchref}
                    colGroupAction={9}
                    IsButtonExport={true}
                    IsButtonhistory={true}
                    onHistorySubmit={this.handleHistorySearch.bind(this)}
                    onExportSubmit={this.handleExportSubmit.bind(this)}
                    onchange={this.handleChangeSearch.bind(this)}
                    className="multiple "
                />

                break;
            case 2:
                formSearch = <SearchForm
                    FormName="Tìm kiếm báo cáo chất lượng theo nghành hàng và nhóm hàng"
                    listelement={this.state.SearchElementList}
                    MLObjectDefinition={SearchMLObjectDefinition}
                    onSubmit={this.handleSearchSubmit}
                    ref={this.searchref}
                    colGroupAction={9}
                    IsButtonExport={true}
                    IsButtonhistory={true}
                    onHistorySubmit={this.handleHistorySearch.bind(this)}
                    onExportSubmit={this.handleExportSubmit.bind(this)}
                    onchange={this.handleChangeSearch.bind(this)}
                    className="multiple "
                />

                break;
            case 3:
                formSearch = <SearchForm
                    FormName="Tìm kiếm báo cáo chất lượng theo chi nhánh"
                    listelement={this.state.SearchElementList}
                    MLObjectDefinition={SearchMLObjectDefinition}
                    onSubmit={this.handleSearchSubmit}
                    ref={this.searchref}
                    colGroupAction={9}
                    IsButtonExport={true}
                    IsButtonhistory={true}
                    onHistorySubmit={this.handleHistorySearch.bind(this)}
                    onExportSubmit={this.handleExportSubmit.bind(this)}
                    onchange={this.handleChangeSearch.bind(this)}
                    className="multiple "
                />

                break;
            case 4:
                formSearch = <SearchForm
                    FormName="Tìm kiếm báo cáo chất lượng tổng hợp theo chi nhanh"
                    listelement={this.state.SearchElementList}
                    MLObjectDefinition={SearchMLObjectDefinition}
                    onSubmit={this.handleSearchSubmit}
                    ref={this.searchref}
                    colGroupAction={9}
                    IsButtonExport={true}
                    IsButtonhistory={true}
                    onHistorySubmit={this.handleHistorySearch.bind(this)}
                    onExportSubmit={this.handleExportSubmit.bind(this)}
                    onchange={this.handleChangeSearch.bind(this)}
                    className="multiple "
                />

                break;
            case 5:
                formSearch = <SearchForm
                    FormName="Tìm kiếm báo cáo chất lượng theo nhân viên"
                    listelement={this.state.SearchByUserElementList}
                    MLObjectDefinition={SearchByUserMLObjectDefinition}
                    onSubmit={this.handleSearchSubmit}
                    ref={this.searchref}
                    colGroupAction={9}
                    IsButtonExport={true}
                    IsButtonhistory={true}
                    onHistorySubmit={this.handleHistorySearch.bind(this)}
                    onExportSubmit={this.handleExportSubmit.bind(this)}
                    onchange={this.handleChangeSearch.bind(this)}
                    className="multiple "
                />

                break;
            default:
                formSearch = <SearchForm
                    FormName="Tìm kiếm báo cáo chất lượng toàn quốc"
                    listelement={this.state.SearchElementList}
                    MLObjectDefinition={SearchMLObjectDefinition}
                    onSubmit={this.handleSearchSubmit}
                    ref={this.searchref}
                    colGroupAction={9}
                    IsButtonExport={true}
                    IsButtonhistory={true}
                    onHistorySubmit={this.handleHistorySearch.bind(this)}
                    onExportSubmit={this.handleExportSubmit.bind(this)}
                    onchange={this.handleChangeSearch.bind(this)}
                    className="multiple "
                />

                break;
        }
    
        return formSearch;
     
    }

    render() {

        let girdData = this.renderGirdData();
        let formSearch = this.renderFormSeach()
        if (this.state.IsLoadDataComplete) {
            return (
                <React.Fragment>
                    <ReactNotification ref={this.notificationDOMRef} />
                    {formSearch}

                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <div className=" table-responsive">
                                    {girdData}
                                </div>
                            </div>
                        </div>
                    </div>

                </React.Fragment>
            )
        }
        return (
            <React.Fragment>
                <label>Đang nạp dữ liệu...</label>
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: (type, props) => {
            dispatch(hideModal(type, props));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search)
