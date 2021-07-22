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
import { TMS_TMSREWARD_REVIEW } from "../../../../../constants/functionLists";
import { callGetCache } from "../../../../../actions/cacheAction";
import { toIsoStringCus } from '../../../../../utils/function'

class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.callSearchData = this.callSearchData.bind(this);
        this.handleCallData = this.handleCallData.bind(this);

        this.state = {
            IsCallAPIError: false,
            gridDataSource: [],
            totalAmount: 0,
            IsLoadDataComplete: false,
        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
    }



    handleCallData() {
        const { SearchData } = this.state;
        this.callSearchData(SearchData);
    }

    handleSearchSubmit(formData, MLObject) {
        if (MLObject.ShipmentOderId == "" && MLObject.ProductID == "") {
            this.showMessage("Vui lòng nhập mã sản phẩm hoặc mã đơn hàng để tìm kiếm.")
        }
        else {
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
                    SearchKey: "@REWARDTYPEID",
                    SearchValue: MLObject.RewardTypeID
                },
                {
                    SearchKey: "@PRODUCTID",
                    SearchValue: MLObject.ProductID != "" ? MLObject.ProductID[0].ProductID : MLObject.ProductID
                },
                {
                    SearchKey: "@SHIPMENTORDERID",
                    SearchValue: MLObject.ShipmentOderId
                },

            ];
            this.callSearchData(postData);
        }


    }

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
            console.log("searchData", searchData, apiResult)
            if (!apiResult.IsError) {
                if (apiResult.ResultObject.length > 0) {

                    const totalAmount = apiResult.ResultObject.reduce((sum, curValue, curIndex, []) => {
                        sum += curValue.TotalReward
                        return sum
                    }, 0);

                    this.setState({
                        gridDataSource: apiResult.ResultObject,
                        IsCallAPIError: apiResult.IsError,
                        IsLoadDataComplete: true,
                        totalAmount: totalAmount,
                    });
                }
                else {
                    this.setState({
                        gridDataSource: apiResult.ResultObject,
                        IsCallAPIError: apiResult.IsError,
                        IsLoadDataComplete: true,
                        totalAmount: 0,
                    });
                    this.showMessage("Dữ liệu cần tìm kiếm không tồn tại. Vui lòng nhập lại dữ liệu cần tìm.")
                }
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


    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <SearchForm
                    FormName="Tìm kiếm danh sách tổng thương giao hàng"
                    MLObjectDefinition={SearchMLObjectDefinition}
                    listelement={SearchElementList}
                    onSubmit={this.handleSearchSubmit}
                    ref={this.searchref}
                    className="multiple multiple-custom"
                />

                <DataGrid
                    listColumn={GridColumnList}
                    dataSource={this.state.gridDataSource}
                    IDSelectColumnName={'ShipmentOrderID'}
                    PKColumnName={'ShipmentOrderID'}
                    isHideHeaderToolbar={false}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    IsShowButtonPrint={false}
                    IsPrint={false}
                    IsExportFile={false}
                    IsAutoPaging={true}
                    RowsPerPage={50}
                    RequirePermission={TMS_TMSREWARD_REVIEW}
                    IsExportFile={false}
                    totalCurrency={true}
                    totalCurrencyColSpan={8}
                    totalCurrencyNumber={this.state.totalAmount}

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
        }
    };
};

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchCom);
export default Search;
