import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNotification from "react-notifications-component";
import { ModalManager } from 'react-dynamic-modal';

import { updatePagePath } from "../../../../../actions/pageAction";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import {
    APIHostName, PagePath, SearchElementList,
    SearchMLObjectDefinition, SearchAPIPath, GridColumnList
} from '../constants';
import SearchForm from "../../../../../common/components/FormContainer/SearchForm";
import DataGrid from "../../../../../common/components/DataGrid";
import { MessageModal } from "../../../../../common/components/Modal";
import { toIsoStringCus } from '../../../../../utils/function';
import { SHIPMENTORDER_REPORT_EXPORT, TMS_STAFFDEBT_REPORT_VIEW } from "../../../../../constants/functionLists";
import "react-notifications-component/dist/theme.css";
import DataGirdStaffDebt from '../DataGirdStaffDebt';
import { MODAL_TYPE_COMMONTMODALS, MODAL_TYPE_DOWNLOAD_EXCEL } from "../../../../../constants/actionTypes";
import { showModal, hideModal } from '../../../../../actions/modal';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.searchref = React.createRef();
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.showMessage = this.showMessage.bind(this);
        this.callSearchData = this.callSearchData.bind(this);
        this.handleExportFileFormSearch = this.handleExportFileFormSearch.bind(this);
        this.handleExportCSV = this.handleExportCSV.bind(this);

        this.state = {
            IsCallAPIError: false,
            gridDataSource: [],
            dataExport: []
        };
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        // this.showMessage("Tính năng đang phát triển");
    };

    showMessage(message) {
        ModalManager.open(<MessageModal title="Thông báo"
            message={message} onRequestClose={() => true}
            onCloseModal={this.handleCloseMessage}
        />);
    };

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, "api/StaffDebt/SearchOverdueStaffDebt", searchData).then(apiResult => {
            console.log("search", searchData, apiResult)
            if (!apiResult.IsError) {

                const tempData = apiResult.ResultObject.map((item, index) => {
                    item.Detail = "Xem"
                    return item;
                })
                this.setState({
                    gridDataSource: tempData
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
                SearchKey: "@STOREID",
                SearchValue: MLObject.CoordinatorStoreID != "" ? MLObject.CoordinatorStoreID : -1
            },

        ];

        this.callSearchData(postData);
    };

    handleExportFile(result) {
        this.addNotification(result.Message, result.IsError);
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

    onShowModal(dataSource) {
        const { widthPercent } = this.state;
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: "Chi tiết danh sách nợ tiền thu hộ theo nhân viên",
            content: {
                text: <DataGirdStaffDebt
                    dataSource={dataSource}
                />

            },
            maxWidth: widthPercent + 'px'
        });
    }


    onShowModalDetail(objValue, name) {
        const param = [
            {
                SearchKey: "@STOREID",
                SearchValue: objValue[0].value
            },

        ]

        this.props.callFetchAPI(APIHostName, "api/StaffDebtDetail/SearchDetailByStore", param).then(apiResult => {
            if (!apiResult.IsError) {

                this.onShowModal(apiResult.ResultObject)
            }
            else {
                this.showMessage(apiResult.Message)
            }
        })

    }



    handleExportFileFormSearch(FormData, MLObject) {
        const postData = [
            {
                SearchKey: "@STOREID",
                SearchValue: MLObject.CoordinatorStoreID != "" ? MLObject.CoordinatorStoreID : -1
            },

        ];

        this.props.callFetchAPI(APIHostName, "api/StaffDebt/ExportOverdueStaffDebt", postData).then(apiResult => {
            console.log("export", postData, apiResult)
            if (!apiResult.IsError) {
                const exelData = apiResult.ResultObject.map((item, index) => {
                    let element = {
                        "Kho điều phối": item.StoreName,
                        "Tổng tiền phải thu hộ": item.TotalCOD,
                        "Tổng tiền phải thu vật tư": item.TotalSaleMaterialMoney,
                        "Tổng tiền còn nợ": item.TotalMoneyDebt,
                        "Tổng vận đơn còn nợ": item.TotalDebtOrders,
                        "Tổng vận đơn nợ quá hạn": item.TotALoverDueDebtOrders,
                    };
                    return element;

                })
                this.handleExportCSV(exelData);
            }
            else {
                this.showMessage(apiResult.Message)
            }
        });
    }


    handleExportCSV(DataExport) {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        let result;

        if (DataExport.length == 0) {
            // result = {
            //     IsError: true,
            //     Message: "Dữ liệu không tồn tại. Không thể xuất file!"
            // };
            this.addNotification("Dữ liệu không tồn tại. Không thể xuất file!", true);
        }
        else {

            const ws = XLSX.utils.json_to_sheet(DataExport);
            const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: fileType });


            FileSaver.saveAs(data, "Báo-cáo-thống-kê-công-nợ-quá-hạn" + fileExtension);

            // result = {
            //     IsError: false,
            //     Message: "Xuất file thành công!"
            // };

            this.addNotification("Xuất file thành công!", false);

        }

    }



    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />

                <SearchForm
                    FormName="Tìm kiếm báo cáo thống kê công nợ công nợ"
                    listelement={SearchElementList}
                    MLObjectDefinition={SearchMLObjectDefinition}
                    onSubmit={this.handleSearchSubmit}
                    ref={this.searchref}
                    className="multiple"
                    IsButtonExport={true}
                    onExportSubmit={this.handleExportFileFormSearch}
                />

                <DataGrid
                    listColumn={GridColumnList}
                    dataSource={this.state.gridDataSource}
                    // AddLink=""
                    IsFixheaderTable={false}
                    IDSelectColumnName={'StoreID'}
                    PKColumnName={'StoreID'}
                    onShowModal={this.onShowModalDetail.bind(this)}
                    isHideHeaderToolbar={false}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    IsShowButtonPrint={false}
                    IsPrint={false}
                    IsAutoPaging={false}
                    RowsPerPage={30}
                    ref={this.gridref}
                    RequirePermission={TMS_STAFFDEBT_REPORT_VIEW}
                    ExportPermission={SHIPMENTORDER_REPORT_EXPORT}
                    IsExportFile={false}
                    DataExport={this.state.dataExport}
                    fileName="Danh sách báo cáo thống kê công nợ quá hạn"
                // onExportFile={this.handleExportFile.bind(this)}
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
        hideModal: (type, props) => {
            dispatch(hideModal(type, props));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);