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
    LoadReportUndeliveryByUserName,
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { SHIPMENTORDER_REPORT_VIEW } from "../../../../../constants/functionLists";
import { callGetCache } from "../../../../../actions/cacheAction";
import { MODAL_TYPE_COMMONTMODALS } from "../../../../../constants/actionTypes";
import { showModal, hideModal } from '../../../../../actions/modal';
import DataGirdReportCoordinator from '../../components/DataGirdReportCoordinator'
import { toIsoStringCus } from '../../../../../utils/function'

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
            FromDate: '',
            ToDate: '',
            shipmentOrderTypeID: '',
            coordinatorUser: ''
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
       

        this.setState({
            FromDate: toIsoStringCus(new Date(MLObject.FromDate).toISOString()),
            ToDate: toIsoStringCus(new Date(MLObject.ToDate).toISOString()),
            shipmentOrderTypeID: MLObject.ShipmentOrderType,
            coordinatorUser: MLObject.UserName.value
        })
        
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
                SearchKey: "@SHIPMENTORDERTYPEID",
                SearchValue: MLObject.ShipmentOrderType
            },
            {
                SearchKey: "@COORDINATORUSER",
                SearchValue: MLObject.UserName.value
            },

        ]; 
        // console.log("postData", postData, MLObject)
        this.callSearchData(postData);
    }

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
            // console.log("postData", searchData, apiResult)
            if (!apiResult.IsError) {
                const tempData = apiResult.ResultObject.map((item, index)=>{
                    item.DeliverUserFullName = item.DeliverUserLst +"-"+item.DeliverUserFullNameList
                    return item;
                })
                // console.log("apiResult", apiResult, tempData)
                this.setState({
                    gridDataSource: tempData,
                    IsCallAPIError: apiResult.IsError,
                    IsLoadDataComplete: true
                });
            }
            else {
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
        console.log("objValue", objValue, name)
        const {shipmentOrderTypeID, coordinatorUser, FromDate, ToDate}= this.state;
        const status = this.getStatusDelivery(name);
        const UserName = objValue[0].value
      
        const objData = {
            FromDate: FromDate,
            ToDate: ToDate,
            ShipmentOrderTypeID: shipmentOrderTypeID,
            CoordinatorUser: coordinatorUser,
            StatusDelivery: status,
            UserName: UserName

        }
        this.props.callFetchAPI(APIHostName, LoadReportUndeliveryByUserName, objData).then(apiResult => {
            console.log("objData", objData, apiResult)
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
        console.log('status', status)
        let titleModal;

        if (status == 1) {
            titleModal = "Danh sách vận đơn chưa giao"
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
                text: <DataGirdReportCoordinator
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
                    FormName="Tìm kiếm danh sách thống kê vận đơn theo ngày"
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
                    IsExportFile={false}
                    IsAutoPaging={true}
                    RowsPerPage={30}
                    RequirePermission={SHIPMENTORDER_REPORT_VIEW}
                    ref={this.gridref}
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
