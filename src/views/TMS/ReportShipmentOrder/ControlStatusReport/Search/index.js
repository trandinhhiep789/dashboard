import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNotification from "react-notifications-component";
import { ModalManager } from 'react-dynamic-modal';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import { updatePagePath } from "../../../../../actions/pageAction";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import {
    APIHostName, PagePath, SearchElementList,
    SearchMLObjectDefinition, SearchAPIPath,
    GridColumnList
} from '../constants';
import SearchForm from "../../../../../common/components/FormContainer/SearchForm";
import DataGrid from "../../../../../common/components/DataGrid";
import { MessageModal } from "../../../../../common/components/Modal";
import { SHIPMENTORDER_REPORT_EXPORT, SHIPMENTORDER_REPORT_VIEW } from "../../../../../constants/functionLists";

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gridDataSource: [],
            dataExport: [],
            PageNumber: 1,
            SearchData: []
        }

        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.showMessage = this.showMessage.bind(this);
        this.addNotification = this.addNotification.bind(this);
        this.callSearchData = this.callSearchData.bind(this);
        this.handleExportFile = this.handleExportFile.bind(this);
        this.handleExportFileFormSearch = this.handleExportFileFormSearch.bind(this);
        this.handleExportExcel = this.handleExportExcel.bind(this);
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
    };

    showMessage(message) {
        ModalManager.open(<MessageModal title="Thông báo"
            message={message} onRequestClose={() => true}
            onCloseModal={this.handleCloseMessage}
        />);
    };

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

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, "api/ShipmentOrder/ControlStatusReport", searchData).then(apiResult => {
            console.log("aa",searchData, apiResult)
            if (!apiResult.IsError) {
                this.setState({
                    gridDataSource: apiResult.ResultObject
                });
            }
            else {
                this.showMessage(apiResult.Message, apiResult.IsError);
            }
        });
    };

    handleSearchSubmit(formData, MLObject) {
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
                SearchKey: "@TYPECOD",
                SearchValue: MLObject.COD
            },
            {
                SearchKey: "@SHIPMENTORDERSTATUSGROUPID",
                SearchValue: MLObject.ShipmentOrderStatusGroupID
            },
            {
                SearchKey: "@Keyword",
                SearchValue: MLObject.Keyword
            },
            {
                SearchKey: "@TYPENAME",
                SearchValue: MLObject.Typename
            },
            {
                SearchKey: "@PAGESIZE",
                SearchValue: 50
            },
            {
                SearchKey: "@PAGEINDEX",
                SearchValue: 0
            }

        ];

        this.setState({
            SearchData: postData
        });

        this.callSearchData(postData);
    };

    handleExportExcel(dataExport, fileName) {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';

        const ws = XLSX.utils.json_to_sheet(dataExport);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });

        FileSaver.saveAs(data, fileName + fileExtension);

        const result = {
            IsError: false,
            Message: "Xuất file thành công!"
        }

        this.addNotification(result.Message, result.IsError);
    }

    handleExportFile() {

    };

    handleExportFileFormSearch(FormData, MLObject) {
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
                SearchKey: "@TYPECOD",
                SearchValue: MLObject.COD
            },
            {
                SearchKey: "@SHIPMENTORDERSTATUSGROUPID",
                SearchValue: MLObject.ShipmentOrderStatusGroupID
            },
            {
                SearchKey: "@Keyword",
                SearchValue: MLObject.Keyword
            },
            {
                SearchKey: "@TYPENAME",
                SearchValue: MLObject.Typename
            }

        ];
        this.showMessage("Tính năng đang phát triển.")

        // this.props.callFetchAPI(APIHostName, "api/ShipmentOrder/OverdueOrderReportExport", postData).then(apiResult => {
        //     if (!apiResult.IsError) {
        //         const { ResultObject } = apiResult;

        //         const dataExport = ResultObject.map(item => {
        //             const result = GridColumnList.reduce((acc, val) => {
        //                 return {
        //                     ...acc,
        //                     [val.Caption]: item[val.DataSourceMember]
        //                 }
        //             }, {});

        //             return result;
        //         });

        //         this.handleExportExcel(dataExport, "Báo cáo chi tiết vận đơn quá hạn");
        //     } else {
        //         this.addNotification(apiResult.Message, apiResult.IsError);
        //     }
        // });
    };

    handleonChangePage(pageNum) {
        const { SearchData } = this.state;

        const listMLObject = SearchData.map(item => {
            if (item.SearchKey == "@PAGEINDEX") {
                return {
                    SearchKey: "@PAGEINDEX",
                    SearchValue: pageNum - 1
                };
            } else {
                return item;
            }
        });

        this.callSearchData(listMLObject);
        this.setState({
            PageNumber: pageNum
        });
    }

    render() {
        const { gridDataSource } = this.state;

        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />

                <SearchForm
                    FormName="Tìm kiếm chi tiết vận đơn quá hạn"
                    className="multiple multiple-custom"
                    classNamebtnSearch="groupAction"
                    listelement={SearchElementList}
                    MLObjectDefinition={SearchMLObjectDefinition}
                    ref={this.searchref}
                    IsButtonExport={true}
                    onExportSubmit={this.handleExportFileFormSearch}
                    onSubmit={this.handleSearchSubmit}
                />

                <DataGrid
                    fileName="Danh sách chi tiết vận đơn quá hạn"
                    listColumn={GridColumnList}
                    dataSource={gridDataSource}
                    IsFixheaderTable={true}
                    IDSelectColumnName={'ShipmentOrderID'}
                    PKColumnName={'ShipmentOrderID'}
                    isHideHeaderToolbar={false}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    IsShowButtonPrint={false}
                    IsPrint={false}
                    IsAutoPaging={true}
                    RowsPerPage={50}
                    ref={this.gridref}
                    IsExportFile={false}
                    DataExport={this.state.dataExport}
                    isPaginationServer={true}
                    PageNumber={this.state.PageNumber}
                    onChangePage={this.handleonChangePage.bind(this)}
                    onExportFile={this.handleExportFile}
                    RequirePermission={SHIPMENTORDER_REPORT_VIEW}
                    ExportPermission={SHIPMENTORDER_REPORT_EXPORT}
                // onShowModal={this.onShowModalDetail.bind(this)}
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);