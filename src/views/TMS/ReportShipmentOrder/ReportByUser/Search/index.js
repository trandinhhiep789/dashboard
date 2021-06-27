import React from "react";
import { connect } from "react-redux";
// import SearchForm from "../../../../../common/components/FormContainer/SearchForm";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import { MessageModal } from "../../../../../common/components/Modal";
import SearchForm from "../../../../../common/components/FormContainer/SearchForm";
import DataGrid from "../../../../../common/components/DataGrid";
import {
    PagePath,
    SearchMLObjectDefinition,
    SearchElementList,
    GridColumnList,
    APIHostName,
    SearchAPIPath,
    LoadReportUserNameByDate
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { SHIPMENTORDER_REPORT_EXPORT, SHIPMENTORDER_REPORT_VIEW } from "../../../../../constants/functionLists";
import { callGetCache } from "../../../../../actions/cacheAction";
import { showModal, hideModal } from '../../../../../actions/modal';
import { MODAL_TYPE_COMMONTMODALS } from "../../../../../constants/actionTypes";
import DataGirdReportShipmentOrder from '../../components/DataGirdReportShipmentOrder';
import { toIsoStringCus } from '../../../../../utils/function'
class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.state = {
            IsCallAPIError: false,
            gridDataSource: [],
            IsLoadDataComplete: false,
            widthPercent: "",
            FromDate: '',
            ToDate: '',
            shipmentOrderTypeID: "",
            cssNotification: "notification-custom-success",
            iconNotification: "fa fa-check",
            dataExport: []
        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({
            widthPercent: (window.innerWidth * 90) / 100
        })
    };

    handleSearchSubmit(formData, MLObject) {
        let result, result2;

        if (MLObject.ShipmentOrderType != -1 && MLObject.ShipmentOrderType != null && MLObject.ShipmentOrderType != "") {
            result = MLObject.ShipmentOrderType.reduce((data, item, index) => {
                const comma = data.length ? "," : "";
                return data + comma + item;
            }, '');
        }
        else {
            result = ""
        }

        if (MLObject.UserName != -1 && MLObject.UserName != null && MLObject.UserName != "") {
            result2 = MLObject.UserName.reduce((data, item, index) => {
                const comma = data.length ? "," : "";
                return data + comma + item.value;
            }, '');
        }
        else {
            result2 = ""
        }

        // console.log("MLObject", MLObject, result, result2)

        this.setState({
            FromDate: toIsoStringCus(new Date(MLObject.FromDate).toISOString()),
            ToDate: toIsoStringCus(new Date(MLObject.ToDate).toISOString()),
            shipmentOrderTypeID: result,
        })

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
                SearchKey: "@SHIPMENTORDERTYPEIDLIST",
                SearchValue: result  //MLObject.ShipmentOrderType
            },
            {
                SearchKey: "@USERNAMELIST",
                SearchValue: result2  //MLObject.CoordinatorStoreID
            },

        ];


        this.callSearchData(postData);
    }

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
            if (!apiResult.IsError) {


                // xuất exel
                const exelData = apiResult.ResultObject.map((item, index) => {
                    let element = {
                        "Nhân viên": item.DeliverUserFullNameList,
                        "Tổng đơn": item.TotalOrder,
                        "Chưa giao": item.TotalUndelivery,
                        "Đang giao": item.TotalDelivering,
                        "Giao xong": item.TotalDelivered,
                        "Hoàn tất": item.TotalCompletedOrder,
                        "Huỷ giao": item.TotalCancelDelivery,
                        "Đã nộp tiền": item.TotalPaidIn,
                        "Chưa nộp tiền": item.UnTotalPaidIn
                    };
                    return element;

                })
                this.setState({
                    dataExport: exelData,
                    gridDataSource: apiResult.ResultObject,
                    IsCallAPIError: apiResult.IsError,
                    IsLoadDataComplete: true
                });
            }
            else {
                this.setState({
                    dataExport: [],
                    gridDataSource: [],
                    IsCallAPIError: apiResult.IsError,
                    IsLoadDataComplete: true
                });
                this.showMessage(apiResult.MessageDetail)
            }
        });
    }

    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
                onCloseModal={this.handleCloseMessage}
            />
        );
    }

    getStatusDelivery(status) {
        switch (status) {
            case 'TotalUndelivery':
                return 1;
            case 'TotalDelivering':
                return 2;
            case 'TotalDelivered':
                return 3;
            case 'TotalCompletedOrder':
                return 4;
            case 'TotalCancelDelivery':
                return 5
            case 'TotalPaidIn':
                return 6
            case 'UnTotalPaidIn':
                return 7
            default:
                return 0;
        }
    }

    onShowModalDetail(objValue, name) {
        const status = this.getStatusDelivery(name);
        const { shipmentOrderTypeID } = this.state;
        const objData = {
            FromDate: toIsoStringCus(new Date(this.state.FromDate).toISOString()),
            ToDate: toIsoStringCus(new Date(this.state.ToDate).toISOString()),
            UserName: objValue[0].value,
            ShipmentOrderTypeID: shipmentOrderTypeID,
            StatusDelivery: status
        }

        this.props.callFetchAPI(APIHostName, LoadReportUserNameByDate, objData).then(apiResult => {
            if (!apiResult.IsError) {
                this.handleShowModal(apiResult.ResultObject, status)
            }
            else {
                this.showMessage(apiResult.MessageDetail)
            }
        });
    }

    handleShowModal(data, status) {
        const { widthPercent } = this.state;
        let titleModal;
        if(status == 1){
            titleModal = "Danh sách vận đơn chưa giao"
        }
        if(status == 2){
            titleModal = "Danh sách vận đơn đang  giao"
        }
        if(status == 3){
            titleModal = "Danh sách vận đơn giao xong"
        }
        if(status == 4){
            titleModal = "Danh sách vận đơn hoàn tất"
        }
        if(status == 5){
            titleModal = "Danh sách vận đơn huỷ giao"
        }
        if(status == 6){
            titleModal = "Danh sách vận đơn đã nộp tiền"
        }
        if(status == 7){
            titleModal = "Danh sách vận đơn chưa nộp tiền"
        }
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: titleModal,
            content: {
                text: <DataGirdReportShipmentOrder
                    dataSource={data}
                    RowsPerPage={20}
                    IsAutoPaging={true}
                    Status={status}
                />

            },
            maxWidth: widthPercent + 'px'
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

    handleExportFile(result) {
        this.addNotification(result.Message, result.IsError);
    }

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <SearchForm
                    FormName="Tìm kiếm danh sách thống kê vận đơn theo nhân viên"
                    MLObjectDefinition={SearchMLObjectDefinition}
                    listelement={SearchElementList}
                    onSubmit={this.handleSearchSubmit}
                    ref={this.searchref}
                    className="multiple"
                />

                <DataGrid
                    listColumn={GridColumnList}
                    dataSource={this.state.gridDataSource}
                    // AddLink=""
                    IsFixheaderTable={true}
                    IDSelectColumnName={'DeliverUserLst'}
                    PKColumnName={'DeliverUserLst'}
                    onShowModal={this.onShowModalDetail.bind(this)}
                    isHideHeaderToolbar={false}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    IsShowButtonPrint={false}
                    IsPrint={false}
                    IsAutoPaging={true}
                    RowsPerPage={30}
                    ref={this.gridref}
                    RequirePermission={SHIPMENTORDER_REPORT_VIEW}
                    ExportPermission={SHIPMENTORDER_REPORT_EXPORT}
                    IsExportFile={true}
                    DataExport={this.state.dataExport}
                    fileName="Danh sách thống kê vận đơn theo nhân viên"
                    onExportFile={this.handleExportFile.bind(this)}
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
