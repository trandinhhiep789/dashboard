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
import "react-notifications-component/dist/theme.css";
import { SHIPMENTORDER_REPORT_VIEW } from "../../../../../constants/functionLists";
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
        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
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
            FromDate: MLObject.FromDate,
            ToDate: MLObject.ToDate
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
                this.setState({
                    gridDataSource: apiResult.ResultObject,
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

        const objData = {
            FromDate: this.state.FromDate,
            ToDate: this.state.ToDate,
            UserName: objValue[0].value,
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


    render() {
        return (
            <React.Fragment>
                <SearchForm
                    FormName="Tìm kiếm danh sách thống kê vận đơn theo kho điều phối"
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
                    ref={this.gridref}
                    RequirePermission={SHIPMENTORDER_REPORT_VIEW}
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
