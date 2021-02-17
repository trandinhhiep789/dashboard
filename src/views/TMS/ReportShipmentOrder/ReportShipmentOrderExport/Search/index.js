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
import DataGrid from "../../../../../common/components/DataGrid";
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
import { SHIPMENTORDER_REPORT_VIEW } from "../../../../../constants/functionLists";
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

    componentDidMount(){
        this.props.updatePagePath(PagePath);
    }

    handleSearchSubmit(formData, MLObject) {
        console.log("search:", formData, MLObject)
        // const postData = [

        //     {
        //         SearchKey: "@FROMDATE",
        //         SearchValue: MLObject.FromDate
        //     },
        //     {
        //         SearchKey: "@TODATE",
        //         SearchValue: MLObject.ToDate
        //     },
        //     {
        //         SearchKey: "@RECEIVERPROVINCEID",
        //         SearchValue: MLObject.ReceiverProvinceID
        //     },
        //     {
        //         SearchKey: "@RECEIVERDISTRICTID",
        //         SearchValue: MLObject.ReceiverDistrictID
        //     },
        //     {
        //         SearchKey: "@SENDERSTOREID",
        //         SearchValue: MLObject.SenderStoreID
        //     },
        //     {
        //         SearchKey: "@COORDINATORSTOREID",
        //         SearchValue: MLObject.CoordinatorStoreID
        //     },
        //     {
        //         SearchKey: "@USERNAME",
        //         SearchValue: MLObject.UserName == -1 ? MLObject.UserName : MLObject.UserName.value
        //     },

        // ];

        const dtFromdate = new Date();
        dtFromdate.setDate(new Date().getDate() - 30);

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

        this.callSearchData(postDataNew);

    }

    callSearchData(postData) {
        //api/ShipmentOrder/SearchReportExport
        this.props.callFetchAPI(APIHostName, "api/ShipmentOrder/SearchReportExportNew", postData).then(apiResult => {
            //console.log("postData:", postData, apiResult)
            if (!apiResult.IsError) {
                if (apiResult.ResultObject.length > 0) {
                    const exelData = apiResult.ResultObject.map((item, index) => {
                        let element = {
                            "Mã vận đơn": item.ShipmentOrderID,
                            "Thời gian tạo": formatDate(item.CreatedOrderTime, false),
                            "Mã đơn hàng": item.PartnerSaleOrderID,
                            "Thời gian hẹn giao": formatDate(item.ExpectedDeliveryDate, false),
                            "Thời gian thực giao": formatDate(item.ActualDeliveryDate, false),
                            "Tên khách hàng": item.ReceiverFullName,
                            "Địa chỉ": item.ReceiverFullAddress,
                            "Nhân viên giao": item.DeliverUserFullNameList,
                            "Mã phương tiện(1 XM,2.XT)": item.CarrierTypeID,
                            "Km giao dự kiến": item.EstimateDeliveryDistance,
                            "Km giao thực tế": item.ActualDeliveryDistance,
                            "Nhân viên điều phối": item.CoordinatorUserName,
                            "Sản phẩm giao chính": item.PrimaryShipItemName,
                            "Tổng COD": item.TotalCOD,
                            "Mã ngành hàng": item.MainGroupID,
                            "Mã nhóm hàng": item.SubGroupID,
                            "Mã sản phẩm": item.ProductID,
                            "Tên sản phẩm": item.ProductName,
                            "Số lượng": item.Quantity,
                            "Giá": item.Price,
                            "Có lắp đặt": item.IsInstallItem,
                            "Đã hoàn thành": item.IsCompleteDeliverIed,
                            "Đã hủy giao": item.IsCancelDelivery,
                            "Trạng thái giao hàng": item.ShipmentOrderStatusName
                        };
                        return element;

                    })

                    this.handleExportCSV(exelData);
                   // this.showMessage("Chức năng đang phát triển chưa.")
                } else {
                    this.showMessage("Dữ liệu không tồn tại nên không thể xuất.")
                }
            }
            else {
                this.showMessage(apiResult.Message)
            }
        });
    }

    addNotification(message1, IsError) {
        if (!IsError) {
            this.setState({
                cssNotification: "notification-custom-success",
                iconNotification: "fa fa-check"
            });
        } else {
            this.setState({
                cssNotification: "notification-danger",
                iconNotification: "fa fa-exclamation"
            });
        }
        this.notificationDOMRef.current.addNotification({
            container: "bottom-right",
            content: (
                <div className={this.state.cssNotification}>
                    <div className="notification-custom-icon">
                        <i className={this.state.iconNotification} />
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
                    onSubmit={this.handleSearchSubmit.bind(this)}
                    ref={this.searchref}
                    className="multiple"
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
