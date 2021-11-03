import React from "react";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import ReactNotification from "react-notifications-component";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import "react-notifications-component/dist/theme.css";

// import SearchForm from "../../../../../common/components/FormContainer/SearchForm";
import SearchForm from "../../../../../common/components/FormContainer/SearchForm";
import { MessageModal } from "../../../../../common/components/Modal";
import { MODAL_TYPE_DOWNLOAD_EXCEL, MODAL_TYPE_SHOWDOWNLOAD_EXCEL } from "../../../../../constants/actionTypes";
import {
    PagePath,
    APIHostName,
    SearchMLObjectDefinition,
    SearchElementList,
    SearchElementListNew,
    SearchMLObjectDefinitionNew
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callGetCache } from "../../../../../actions/cacheAction";
import { showModal, hideModal } from '../../../../../actions/modal';
import { formatDate } from "../../../../../common/library/CommonLib";


class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            IsCallAPIError: false,
        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
    }

    treatAsUTC(date) {
        var result = new Date(date);
        result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
        return result;
    }

    daysBetween(startDate, endDate) {
        var millisecondsPerDay = 24 * 60 * 60 * 1000;
        return (this.treatAsUTC(endDate) - this.treatAsUTC(startDate)) / millisecondsPerDay;
    }

    handleSearchSubmit(formData, MLObject) {
        //không cho xuất quá 15 ngày
        let days = this.daysBetween(MLObject.FromDate, MLObject.ToDate);
        if (days > 15) {
            this.addNotification("Vượt quá giới hạn 15 ngày, không thể xuất file.", true);
            return false;
        }

        const postDataNew = [
            {
                SearchKey: "@FROMDATE",
                SearchValue: MLObject.FromDate
            },
            {
                SearchKey: "@TODATE",
                SearchValue: MLObject.ToDate
            },
            {
                SearchKey: "@AREAID",
                SearchValue: MLObject.AreaID
            },
            {
                SearchKey: "@STOREID",
                SearchValue: MLObject.StoreID
            },
            {
                SearchKey: "@SHIPMENTORDERTYPEID",
                SearchValue: MLObject.ShipmentOrderTypeID
            }


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

    handleHistorySearch() {
        this.props.showModal(MODAL_TYPE_SHOWDOWNLOAD_EXCEL, {
            title: "Tải file",
            maxWidth: '1200px',
            ParamRequest: { DataExportTemplateID: 3 }
        });
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


    handleExportCSV(dataExport) {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const fileName = 'Báo cáo danh sách vận đơn';
        let result;
        if (dataExport.length == 0) {
            result = {
                IsError: true,
                Message: "Dữ liệu không tồn tại. Không thể xuất file!"
            };
        }
        else {

            const ws = XLSX.utils.json_to_sheet(dataExport);
            const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: fileType });


            FileSaver.saveAs(data, fileName + fileExtension);

            result = {
                IsError: false,
                Message: "Xuất file thành công!"
            };
            this.addNotification(result.Message, result.IsError);
        }
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


    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <SearchForm
                    FormName="Tìm kiếm danh sách vận đơn để xuất dữ liệu"
                    MLObjectDefinition={SearchMLObjectDefinitionNew}
                    listelement={SearchElementListNew}
                    TitleButton="Xuất dữ liệu"
                    IsShowButtonSearch={false}
                    IsButtonExport={true}
                    IsButtonhistory={true}
                    onHistorySubmit={this.handleHistorySearch.bind(this)}
                    onSubmit={this.handleSearchSubmit.bind(this)}
                    onExportSubmit={this.handleSearchSubmit.bind(this)}
                    ref={this.searchref}
                    //colGroupAction={8}
                    className="multiple"
                    classNamebtnSearch="groupAction"
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
