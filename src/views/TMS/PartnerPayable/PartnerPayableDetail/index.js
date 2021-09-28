import React from "react";
import { connect } from "react-redux";
import DataGrid from "../../../../common/components/DataGrid";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import { MessageModal } from "../../../../common/components/Modal";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import {
    APIHostName,
    DataPartnerPayableDetailGridColumnList,
    InitSearchPartnerPayableDetail,
    PagePathDate,
    SearchByDateAPIPath,
    SearchPartnerPayableDetailElementList,
    SearchPartnerPayableDetailMLObjectDefinition,
} from "../constants";

import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { callGetCache } from "../../../../actions/cacheAction";
import { toIsoStringCus } from '../../../../utils/function'
import { ERPCOMMONCACHE_TMSCONFIG } from "../../../../constants/keyCache";
import { MODAL_TYPE_SHOWDOWNLOAD_EXCEL } from "../../../../constants/actionTypes";
import { PARTNERPAYABLEDETAIL_VIEW, PARTNERPAYABLEDETAIL_EXPORT } from "../../../../constants/functionLists";
import { showModal, hideModal } from '../../../../actions/modal';
import { updatePagePath } from "../../../../actions/pageAction";
import SearchForm from "../../../../common/components/FormContainer/SearchForm";


class PartnerPayableDetailCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // dataExport: [],
            gridDataSource: [],
            gridDataSourcePrint: [],
            IsLoadDataComplete: false,
            searchParam: InitSearchPartnerPayableDetail,
            totalPayableAmount: 0,
        }
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(PagePathDate);
        this.getCacheMTG();
    }

    getCacheMTG() {
        this.props.callGetCache(ERPCOMMONCACHE_TMSCONFIG).then((result) => {
            if (result && !result.IsError && result.ResultObject) {
                let _configValue = result.ResultObject.CacheData.find(x => x.TMSConfigID == "TEMPLATE_EXPORT_PARTNERPAYABLE");
                if (_configValue) {
                    this.setState({
                        exportTemplateID: _configValue.TMSConfigValue
                    })
                }


            }


        });
    }

    groupBy(data, fields, sumBy = 'Quantity') {
        let r = [], cmp = (x, y) => fields.reduce((a, b) => a && x[b] == y[b], true);
        data.forEach(x => {
            let y = r.find(z => cmp(x, z));
            let w = [...fields, sumBy].reduce((a, b) => (a[b] = x[b], a), {})
            y ? y[sumBy] = +y[sumBy] + (+x[sumBy]) : r.push(w);
        });
        return r;
    }

    callData(SearchData) {
        this.props.callFetchAPI(APIHostName, SearchByDateAPIPath, SearchData).then(apiResult => {
            // console.log("apiResult",SearchData, apiResult)
            if (!apiResult.IsError) {
                if (apiResult.ResultObject.length > 0) {
                    const totalPayableAmount = apiResult.ResultObject.reduce((sum, curValue, curIndex, []) => {
                        sum += curValue.PayableAmount
                        return sum
                    }, 0);

                    const sortResult = apiResult.ResultObject.sort((a, b) => (a.SubGroupID > b.SubGroupID) ? 1
                        : (a.SubGroupID === b.SubGroupID) ? 1 : -1)

                    let gridDataSourcePrint = [];
                    gridDataSourcePrint = this.groupBy(sortResult, ['SubGroupID', 'SubGroupName', 'PartnerName', 'ServiceFee', 'SubGroupID'])

                    // const dataExport = apiResult.ResultObject.map((item, index) => {
                    //     let element = {
                    //         "Mã vận đơn": item.ShipmentOrderID,
                    //         "Mã đơn hàng": item.PartnerSaleOrderID,
                    //         "Thời gian giao": item.PayableDate,
                    //         "Khách hàng": item.ReceiverFullName,
                    //         "Sản phẩm": item.ProductID,
                    //         "Nhóm hàng": item.SubGroupID,
                    //         "Kho xuất": item.SenderFullAddress,
                    //         "Kho tạo": item.StoreName,
                    //         "NV điều phối": item.CoordinatorUser,
                    //         "NV giao": item.DeliveryUser,
                    //         "Số lượng": item.Quantity,
                    //         "Đơn giá": item.ServiceFee,
                    //         "Thành tiền": item.PayableAmount,

                    //     };

                    //     return element;

                    // })

                    this.setState({
                        gridDataSource: apiResult.ResultObject,
                        IsLoadDataComplete: true,
                        gridDataSourcePrint,
                        totalPayableAmount,
                        // dataExport
                    })
                }
                else {
                    this.showMessage('Không có dữ liệu cần tim.')
                    this.setState({
                        IsLoadDataComplete: true,
                        gridDataSourcePrint: [],
                        totalPayableAmount: 0,
                        gridDataSource: apiResult.ResultObject,
                    })
                }
            }
            else {
                this.showMessage(apiResult.Message)
            }

        })
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
                SearchKey: "@PARTNERID",
                SearchValue: MLObject.PartnerID
            },
        ];
        this.setState({
            searchParam: postData
        })
        this.callData(postData);
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

    // handleExportFile(result) {
    //     this.addNotification(result.Message, result.IsError);
    // }

    handleExportFileFormSearch(FormData, MLObject) {

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
                SearchKey: "@PARTNERID",
                SearchValue: MLObject.PartnerID
            },
        ];
        const postData = {
            DataExportTemplateID: this.state.exportTemplateID,
            LoadDataStoreName: 'TMS.TMS_PPD_SRH_BY_DATE',
            KeyCached: "PARTNERPAYABLEDETAIL_EXPORT",
            SearchParamList: postDataNew,
            ExportDataParamsDescription: "FROMDATE: " + MLObject.FromDate + " - TODATE: " + MLObject.ToDate + " - REWARDPOSITIONID: " + MLObject.PartnerID
        }

        this.props.callFetchAPI(APIHostName, "api/DataExportQueue/AddQueueExport", postData).then(apiResult => {
            if (!apiResult.IsError) {
                this.props.showModal(MODAL_TYPE_SHOWDOWNLOAD_EXCEL, {
                    title: "Tải file",
                    maxWidth: '1200px',
                    ParamRequest: { DataExportTemplateID: this.state.exportTemplateID }
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
            ParamRequest: { DataExportTemplateID: this.state.exportTemplateID }
        });
    }

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <SearchForm
                    className="multiple"
                    classNamebtnSearch="groupAction"
                    FormName="Tìm kiếm danh sách tiền phải trả cho nhà cung cấp dịch vụ theo ngày"
                    IsButtonExport={true}
                    IsButtonhistory={true}
                    listelement={SearchPartnerPayableDetailElementList}
                    MLObjectDefinition={SearchPartnerPayableDetailMLObjectDefinition}
                    onExportSubmit={this.handleExportFileFormSearch.bind(this)}
                    onHistorySubmit={this.handleHistorySearch.bind(this)}
                    onSubmit={this.handleSearchSubmit.bind(this)}
                    ref={this.searchref}
                />

                <DataGrid
                    // DataExport={this.state.dataExport}
                    // ExportPermission={PARTNERPAYABLEDETAIL_EXPORT}
                    // IsExportFile={true}
                    // onExportFile={this.handleExportFile.bind(this)}
                    AddLink=""
                    dataPrint={this.state.gridDataSourcePrint}
                    dataSource={this.state.gridDataSource}
                    fileName="Danh sách chi tiết tiền phải trả cho nhà cung cấp dịch vụ"
                    IDSelectColumnName="PartnerPayableDetailID"
                    IsAutoPaging={false}
                    isHideHeaderToolbar={false}
                    IsPrint={true}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    IsShowButtonPrint={true}
                    listColumn={DataPartnerPayableDetailGridColumnList}
                    PKColumnName="PartnerPayableDetailID"
                    ref={this.gridref}
                    RequirePermission={PARTNERPAYABLEDETAIL_VIEW}
                    RowsPerPage={10}
                    TitlePrint="Danh sách chi tiết tiền phải trả cho nhà cung cấp dịch vụ"
                    totalCurrency={true}
                    totalCurrencyColSpan={13}
                    totalCurrencyNumber={this.state.totalPayableAmount}
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
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        updatePagePath: pagePath => {
            dispatch(updatePagePath(pagePath));
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

const PartnerPayableDetail = connect(mapStateToProps, mapDispatchToProps)(PartnerPayableDetailCom);
export default PartnerPayableDetail;
