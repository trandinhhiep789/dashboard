import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNotification from "react-notifications-component";
import { ModalManager } from 'react-dynamic-modal';

import { updatePagePath } from "../../../../../actions/pageAction";
import {
    APIHostName, PagePath, SearchElementList,
    SearchMLObjectDefinition, SearchAPIPath
} from '../constants';
import SearchForm from "../../../../../common/components/FormContainer/SearchForm";
import DataGrid from "../../../../../common/components/DataGrid";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { MessageModal } from "../../../../../common/components/Modal";
import { MODAL_TYPE_SHOWDOWNLOAD_EXCEL } from '../../../../../constants/actionTypes';
import { showModal, hideModal } from '../../../../../actions/modal';
import QuanlityReportAll from '../components/QuanlityReportAll';

import { toIsoStringCus, toIsoStringCusNew, formatNumber, formatNumberNew, toIsoStringNew } from '../../../../../utils/function'
export class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cssNotification: "",
            iconNotification: "",
            dataSource: [],
            ReportQualityTypeID: 1,
            SearchElementList: SearchElementList,
            IsLoadDataComplete: false,
            fromDate: "",
            toDate: "",
            AreaIDList: ""
        }

        this.searchref = React.createRef();
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.showMessage = this.showMessage.bind(this);
        this.callSearchData = this.callSearchData.bind(this);
        this.renderGirdData = this.renderGirdData.bind(this)
        this.getComboxDataCooGroupByArea = this.getComboxDataCooGroupByArea.bind(this)
    };

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        // this.showMessage("Tính năng đang phát triển");

      console.log("state",this.state.SearchElementList, Date.parse(toIsoStringCusNew(new Date((new Date().getMonth() + 1) + "/" + '01' + "/" + new Date().getFullYear()).toISOString(), false)))



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
                this.setState({
                    SearchElementList: _SearchElementList,
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
            console.log("searh",apiResult )
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


        ];
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
        console.log("change", FormData.cbFromDate.value)
        const postData = {
            FromDate: "",
            ToDate: "",
            AreaID: -1
        }

        // this.setState({
        //     IsLoadDataComplete: false
        // });


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

    renderGirdData() {
        const { ReportQualityTypeID } = this.state;
        let girdData;
        switch (ReportQualityTypeID) {
            case 1:
                girdData = <QuanlityReportAll dataSource={[]} />
                break;
            default:
                break;
        }
        return girdData;
    }

    render() {

        let girdData = this.renderGirdData();
        // console.log("state", this.state.SearchElementList)
        if (this.state.IsLoadDataComplete) {
            return (
                <React.Fragment>
                    <ReactNotification ref={this.notificationDOMRef} />

                    <SearchForm
                        FormName="Tìm kiếm báo cáo chất lượng dịch vụ"
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
