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
import { showModal } from '../../../../../actions/modal';
import { MODAL_TYPE_DOWNLOAD_EXCEL } from "../../../../../constants/actionTypes";

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
        this.handleExoprtExcel = this.handleExoprtExcel.bind(this);
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
        this.props.callFetchAPI(APIHostName, "api/ShipmentOrder/OverdueOrderReport", searchData).then(apiResult => {
            console.log("aa", searchData, apiResult)
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
            // {
            //     SearchKey: "@SHIPMENTORDERSTATUSGROUPID",
            //     SearchValue: MLObject.ShipmentOrderStatusGroupID
            // },
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

    handleExoprtExcel(DataExport, fileName) {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        let result;
        if (DataExport.length == 0) {
            this.addNotification("Dữ liệu không tồn tại. Không thể xuất file!", true);
        }
        else {

            const ws = XLSX.utils.json_to_sheet(DataExport);
            const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: fileType });
            FileSaver.saveAs(data, "Báo-cáo-thống-kê-công-nợ-quá-hạn" + fileExtension);

            this.addNotification("Xuất file thành công!", false);
            
        }
    }

    handleExportFile() {

    };

    handleExportFileFormSearch(FormData, MLObject) {
        console.log("a1", FormData, MLObject)
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
                SearchKey: "@Keyword",
                SearchValue: MLObject.Keyword
            },
            {
                SearchKey: "@TYPENAME",
                SearchValue: MLObject.Typename
            }

        ];


        this.props.callFetchAPI(APIHostName, "api/ShipmentOrder/OverdueOrderReportExport", postData).then(apiResult => {
        console.log("a2", postData, apiResult)

            if (!apiResult.IsError) {
                // this.props.showModal(MODAL_TYPE_DOWNLOAD_EXCEL, {
                //     title: "Tải file",
                //     URLDownloadFile: apiResult.Message,
                //     maxWidth: '300px'
                // });
                const exelData = apiResult.ResultObject.map((item, index) => {
                    let element = {
                        "Mã đơn hàng": item.PartnerSaleOrderID,
                        "Mã vận đơn": item.ShipmentOrderID,
                        "Thời gian xuất hàng": item.HandOverGoodsDate,
                        "Ngày hẹn giao": item.ExpectedDeliveryDate,
                        "Số tiền COD": item.TotalCOD,
                        "Tổng tiền nhập trả": item.TotalReturnPrice,
                        "Tổng tiền phải thu của vận đơn": item.CollectedTotalMoney,
                        "Tiền vật tư": item.TotalSaleMaterialMoney,
                        "Nhân viên giao": item.DeliverUserFullNameList,

                        "TN điều phối": item.CoordinatorUserName,
                        "Kho điều phối": item.CoordinatorStoreName,
                        "Trạng thái vận đơn": item.ShipmentOrderStatusName,
                        "Số ngày trễ so với ngày xuất hàng": item.TotalDebtDate,
                    };
                    return element;

                })
                this.handleExoprtExcel(exelData, "Báo-cáo-chi-tiết-vận-đơn-quá-hạn");
            }
            else {
                this.showMessage(apiResult.Message)
            }
        });
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
                    className="multiple"
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);