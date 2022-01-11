import React from "react";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
// import SearchForm from "../../../../../common/components/FormContainer/SearchForm";
import SearchForm from "../../../../../common/components/FormContainer/SearchForm";
import { MessageModal } from "../../../../../common/components/Modal";
import DataGrid from "../../../../../common/components/DataGrid";
import {
    PagePath,
    SearchMLObjectDefinition,
    SearchElementList,
    GridColumnList,
    APIHostName,
    SearchAPIPath,
    SearchDetailAPIPath
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { SHIPMENTORDER_REPORT_EXPORT, SHIPMENTORDER_REPORT_VIEW } from "../../../../../constants/functionLists";
import { callGetCache } from "../../../../../actions/cacheAction";
import { MODAL_TYPE_COMMONTMODALS } from "../../../../../constants/actionTypes";
import { showModal, hideModal } from '../../../../../actions/modal';
import { toIsoStringCus } from '../../../../../utils/function';
import DataGirdOrderStatisticsReport from "../../components/DataGirdOrderStatisticsReport";

class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.callSearchData = this.callSearchData.bind(this);

        this.state = {
            IsCallAPIError: false,
            gridDataSource: [],
            IsLoadDataComplete: false,
            widthPercent: "",
            shipmentOrderTypeID: "",
            coordinatorStoreID: "",
            cssNotification: "notification-custom-success",
            iconNotification: "fa fa-check",
            dataExport: []
        };
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
        if (MLObject.ShipmentOrderTypeID == "" || MLObject.ShipmentOrderTypeID == -1) {
            this.addNotification("Vui lòng chọn loại yêu cầu vận chuyển.", true)
            return;
        }

        if (MLObject.FromDate > MLObject.ToDate) {
            this.addNotification("Ngày tháng không hợp lệ", true);
            return;
        }

        var diffDays = parseInt((new Date(MLObject.ToDate) - new Date(MLObject.FromDate)) / (1000 * 60 * 60 * 24), 10);

        if (diffDays >= 31) {
            this.addNotification("Chỉ được chọn trong vòng 31 ngày", true);
            return;
        }



        // let result, result2;
        // if (MLObject.ShipmentOrderType != -1 && MLObject.ShipmentOrderType != null && MLObject.ShipmentOrderType != "") {
        //     result = MLObject.ShipmentOrderType.reduce((data, item, index) => {
        //         const comma = data.length ? "," : "";
        //         return data + comma + item;
        //     }, '');
        // }
        // else {
        //     result = ""
        // }

        // if (MLObject.CoordinatorStore != -1 && MLObject.CoordinatorStore != null && MLObject.CoordinatorStore != "") {
        //     result2 = MLObject.CoordinatorStore.reduce((data, item, index) => {
        //         const comma = data.length ? "," : "";
        //         return data + comma + item;
        //     }, '');
        // }
        // else {
        //     result2 = ""
        // }

        // this.setState({
        //     shipmentOrderTypeID: result
        //     //coordinatorStoreID: result2
        // })



        const postData = [
            {
                SearchKey: "@FROMDATE",
                SearchValue: toIsoStringCus(new Date(MLObject.FromDate).toISOString()) //MLObject.FromDate
            },
            {
                SearchKey: "@TODATE",
                SearchValue: toIsoStringCus(new Date(MLObject.ToDate).toISOString()) //MLObject.ToDate
            },
            {
                SearchKey: "@ISVIEWDETAILBYDATE",
                SearchValue: MLObject.ViewByDay
            },
            {
                SearchKey: "@ISCLICKVIEWDETAIL",
                SearchValue: 0
            },
            {
                SearchKey: "@SHIPMENTORDERTYPEID",
                SearchValue: MLObject.ShipmentOrderTypeID
            },
            {
                SearchKey: "@PAGEINDEX",
                SearchValue: 1
            },
            {
                SearchKey: "@PAGESIZE",
                SearchValue: -1
            },

        ];
        this.setState({
            FromDate: toIsoStringCus(new Date(MLObject.FromDate).toISOString()),
            ToDate: toIsoStringCus(new Date(MLObject.ToDate).toISOString()),
            ShipmentOrderTypeID: MLObject.ShipmentOrderTypeID,
            ViewByDay: MLObject.ViewByDay
        });
        this.callSearchData(postData);
    }

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
            //console.log("apiResult", apiResult);
            if (!apiResult.IsError) {
                // xuất exel
                const exelData = apiResult.ResultObject.map((item, index) => {
                    let element = {
                        "Ngày tạo": item.CreatedOrderTime,
                        "Số lượng đơn hàng thành công": item.ShipmentOrderComplete,
                        "Số lượng đơn hàng chưa xuất ": item.ShipmentOrderNotOutput,
                        "Thanh toán công nợ thành công trên hệ thống ": item.ShipmentOrderIsPaid,
                        "Số lượng đơn hàng hủy giao": item.ShipmentOrderIsCancelDelivery
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

    getStatusDelivery(status) {
        switch (status) {
            case 'ShipmentOrderIsCancelDelivery':
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
        //console.log("dsad", objValue, name);
        let { ShipmentOrderTypeID, FromDate, ToDate, ViewByDay } = this.state;
        const status = this.getStatusDelivery(name);
        if (ViewByDay) {
            const dtmCreatedOrderTime = objValue[0].value
            let dtmCreatedOrderTimeArr = dtmCreatedOrderTime.split('/');
            let _date = new Date(dtmCreatedOrderTimeArr[2], dtmCreatedOrderTimeArr[1], dtmCreatedOrderTimeArr[0]);
            _date = new Date(_date.setMonth(_date.getMonth()-1));
            FromDate = toIsoStringCus(new Date(_date).toISOString());
            ToDate = toIsoStringCus(new Date(_date).toISOString());
        }
        

        // const objData = {
        //     CreatedOrderTime: dtmCreatedOrderTime,
        //     StatusDelivery: status,
        //     ShipmentOrderTypeID: shipmentOrderTypeID,
        //     CoordinatorStoreID: coordinatorStoreID
        // }

        const postData = [
            {
                SearchKey: "@FROMDATE",
                SearchValue: FromDate
            },
            {
                SearchKey: "@TODATE",
                SearchValue: ToDate
            },
            {
                SearchKey: "@ISVIEWDETAILBYDATE",
                SearchValue: this.state.ViewByDay
            },
            {
                SearchKey: "@ISCLICKVIEWDETAIL",
                SearchValue: 1
            },
            {
                SearchKey: "@SHIPMENTORDERTYPEID",
                SearchValue: ShipmentOrderTypeID
            },
            {
                SearchKey: "@PAGEINDEX",
                SearchValue: 1
            },
            {
                SearchKey: "@PAGESIZE",
                SearchValue: -1
            },

        ];

        //console.log("postData",postData);

        this.props.callFetchAPI(APIHostName, SearchDetailAPIPath, postData).then(apiResult => {
            //console.log("apiResult",apiResult)
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
        //console.log('status', status)
        let titleModal;

        if (status == 1) {
            titleModal = "Danh sách vận đơn hủy giao"
        }
        if (status == 2) {
            titleModal = "Danh sách vận đơn đang  giao"
        }
        if (status == 3) {
            titleModal = "Danh sách vận đơn giao xong"
        }
        if (status == 4) {
            titleModal = "Danh sách vận đơn hoàn tất"
        }
        if (status == 5) {
            titleModal = "Danh sách vận đơn huỷ giao"
        }
        if (status == 6) {
            titleModal = "Danh sách vận đơn đã nộp tiền"
        }
        if (status == 7) {
            titleModal = "Danh sách vận đơn chưa nộp tiền"
        }

        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: titleModal,
            content: {
                text: <DataGirdOrderStatisticsReport
                    dataSource={data}
                    RowsPerPage={20}
                    IsAutoPaging={true}
                    Status={status}
                />

            },
            maxWidth: widthPercent + 'px'
        });
    }

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <SearchForm
                    FormName="Tìm kiếm danh sách thống kê đơn hàng"
                    MLObjectDefinition={SearchMLObjectDefinition}
                    listelement={SearchElementList}
                    onSubmit={this.handleSearchSubmit}
                    ref={this.searchref}
                    className="multiple pdlr"
                />

                <DataGrid
                    listColumn={GridColumnList}
                    dataSource={this.state.gridDataSource}
                    // AddLink=""
                    IsFixheaderTable={true}
                    IDSelectColumnName={'CreatedOrderTime'}
                    PKColumnName={'CreatedOrderTime'}
                    onShowModal={this.onShowModalDetail.bind(this)}
                    isHideHeaderToolbar={false}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    IsShowButtonPrint={false}
                    IsPrint={false}
                    IsAutoPaging={true}
                    RowsPerPage={30}
                    RequirePermission={SHIPMENTORDER_REPORT_VIEW}
                    ref={this.gridref}
                    ExportPermission={SHIPMENTORDER_REPORT_EXPORT}
                    IsExportFile={true}
                    DataExport={this.state.dataExport}
                    fileName="Thống kê đơn hàng TMS"
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
