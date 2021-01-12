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
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { TMS_INVESTIGATION_SO_STATUS } from "../../../../../constants/functionLists";
import { callGetCache } from "../../../../../actions/cacheAction";
import { showModal, hideModal } from '../../../../../actions/modal';
import InfoShipmentOrder from "../InfoShipmentOrder";

class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.callSearchData = this.callSearchData.bind(this);

        this.state = {
            IsCallAPIError: false,
            gridDataSource: [],
            IsLoadDataComplete: false,

        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
    }

    handleSearchSubmit(formData, MLObject) {
        console.log("MLObject", MLObject)
        const postData = [];
        //this.callSearchData(postData)
    }

    callSearchData(searchData) {

        // this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
        //     console.log("apiResult",searchData, apiResult)
        //     if (!apiResult.IsError) {
        //         let objStaffDebtID = {}
        //         const tempData = apiResult.ResultObject.map((item, index) => {
        //             objStaffDebtID = {
        //                 UserName: item.UserName,
        //                 StoreID: item.StoreID
        //             }
        //             item.StaffDebtID = Base64.encode(JSON.stringify(objStaffDebtID));
        //             item.FullNameMember = item.UserName + " - " + item.FullName
        //             item.Note = "Xem"
        //             if (item.IsLockDelivery) {
        //                 item.DeliveryStatus = <span className='lblstatusLock'>Đã khóa</span>;
        //             }
        //             else {
        //                 item.DeliveryStatus = <span className='lblstatusUnlock'>Hoạt động</span>;
        //             }
        //             return item;
        //         })

        //         const tempDataExport = apiResult.ResultObject.map((item, index) => {
        //             let element = {
        //                 "Mã NV nợ": item.FullNameMember,
        //                 "Kho điều phối": item.StoreID+"-"+item.StoreName,
        //                 "Tổng tiền phải thu hộ": item.TotalCOD,
        //                 "Tổng tiền phải thu vật tư": item.TotalSaleMaterialMoney,
        //                 "Tổng tiền phải thu": item.TotalMoney,
        //                 "Tổng tiền đã thu của khách hàng": item.CollectedTotalMoney,
        //                 "Tổng vận đơn còn nợ": item.TotalDebtOrders,
        //                 "Tổng vận đơn nợ quá hạn": item.TotALoverDueDebtOrders,
        //                 "Tình trạng": item.IsLockDelivery == false ? "Hoạt động" : "Đã khóa",
        //             };

        //             return element;
        //         })

        //         this.setState({
        //             gridDataSource: tempData,
        //             dataExport: tempDataExport,
        //         })
        //     }
        //     else {
        //         this.setState({
        //             gridDataSource: []
        //         })
        //         this.showMessage(apiResult.MessageDetail)
        //     }
        // });
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
                    FormName="Tìm kiếm danh sách trạng thái vận đơn"
                    MLObjectDefinition={SearchMLObjectDefinition}
                    listelement={SearchElementList}
                    onSubmit={this.handleSearchSubmit}
                    ref={this.searchref}
                />

                <InfoShipmentOrder dataShipmentOder= {this.state.gridDataSource} />

                <DataGrid
                    listColumn={GridColumnList}
                    dataSource={this.state.gridDataSource}
                    IsFixheaderTable={false}
                    IDSelectColumnName={''}
                    PKColumnName={''}
                    isHideHeaderToolbar={false}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    IsShowButtonPrint={false}
                    IsPrint={false}
                    IsAutoPaging={true}
                    RowsPerPage={10}
                    //RequirePermission={TMS_INVESTIGATION_SO_STATUS}
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
