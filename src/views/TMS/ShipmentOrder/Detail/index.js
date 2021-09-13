import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import ShipmentOrderDetail from '../Component/ShipmentOrderDetail.js';
import ShipmentOrderTypeWF from '../Component/ShipmentOrderTypeWF.js';
import ShipmentOrderAddress from '../Component/ShipmentOrderAddress.js';
import InfoProduct from '../Component/InfoProduct.js';
import InfoCoordinator from '../Component/InfoCoordinator.js';
import InfoHistoryWF from '../Component/InfoHistoryWF.js';
import ShipmentOrderAttachment from '../Component/ShipmentOrderAttachment.js';
import ShipmentOrderComment from '../Component/ShipmentOrderComment.js';
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';
import { MessageModal } from "../../../../common/components/Modal";
import {
    APIHostName,
    LoadAPIPath,
    PagePath,
    DetailAPIPath
} from "../constants";
import { toIsoStringCusNew, toIsoStringNew } from "../../../../utils/function";
import { ExportStringToDate } from "../../../../common/library/ultils";
import moment from 'moment';
import { formatDate, formatDateCusNew } from "../../../../common/library/CommonLib";

class DetailCom extends React.Component {
    constructor(props) {
        super(props);
        this.ChangeLoadData = this.ChangeLoadData.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.state = {
            DataSource: {},
            ShipmentOrderType_WorkFlowList: null,
            CurrentShipmentOrderStepID: 0,
            IsCancelDelivery: false,
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsLoadDataComplete: false,
            ListSuggestTime: []
        }
    }

    handleCloseMessage() {
        if (!this.state.IsCallAPIError) {
            this.callSearchData(this.state.SearchData);
        }
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

    componentDidMount() {
        this.props.updatePagePath(DetailAPIPath);
        this.callLoadData(this.props.match.params.id);


    }


    _FindStoreDeliveryTime(param) {
        this.props.callFetchAPI(APIHostName, "api/ShipmentOrder/FindStoreDeliveryTime", param).then((apiResult) => {
            console.log('_FindStoreDeliveryTime', param, apiResult)
            if (apiResult.IsError) {
                this.showMessage("Lỗi lấy thông tin tải giao hàng");
            }
            else {
                if (!!apiResult.ResultObject.Data.LSTSUGGESTTIME && apiResult.ResultObject.Data.LSTSUGGESTTIME != null && apiResult.ResultObject.Data.LSTSUGGESTTIME.length > 0) {
                    const tempData = apiResult.ResultObject.Data.LSTSUGGESTTIME
                    console.log("tempData", tempData)
                    tempData.map((item, index) => {
                        item.value = item.DELIVERYVALUE,
                            item.label = item.DELIVERYTEXT,
                            item.name = item.DELIVERYVALUE
                    })

                    const dataSource = tempData.reduce((catsSoFar, item, index) => {
                        const tempArray = item.DELIVERYVALUE.split('T')
                        const deliveryValue = tempArray[0]
                        if (!catsSoFar[deliveryValue]) catsSoFar[deliveryValue] = [];
                        catsSoFar[deliveryValue].push(item);
                        return catsSoFar;
                    }, {});

                    const newDatasource = Object.keys(dataSource).map(function (key) {
                        let element = {}
                        element.parentKey = key
                        element.label = formatDate(key, true),
                            element.name = key,
                            element.value = key,
                            element.children = dataSource[key]
                        return element

                    })

                    console.log("newDatasource", newDatasource)

                    this.setState({
                        ListSuggestTime: newDatasource,
                        IsLoadDataComplete: true
                    })

                    // this.showFindStoreDeliveryTime(newDatasource, MLObject)
                }
                else {
                    this.showMessage("Lỗi lấy danh sách tải giao hàng", true);
                }
            }
        });
    }


    callLoadData(id) {

        // let objAdvanceRequestLoad=
        // {ShipmentOrderID:'210707000000085',RCNotContactableUpdatedUser:'73309',RCNotContactableUpdateNote:"hoclenho"}

        // this.props.callFetchAPI(APIHostName, "api/ShipmentOrder/GetBankAccount",id).then((apiResult) => {
        //     console.log("apiResult.ResultObject",apiResult)
        // });
        this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then((apiResult) => {
            console.log("id", id, apiResult)
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
                //    console.log("apiResult.ResultObject.ShipmentOrderType_WorkFlowList",apiResult.ResultObject.ShipmentOrderType_WorkFlowList)

                this.setState({
                    DataSource: apiResult.ResultObject,
                    ShipmentOrderType_WorkFlowList: apiResult.ResultObject.ShipmentOrderType_WorkFlowList,
                    CurrentShipmentOrderStepID: apiResult.ResultObject.CurrentShipmentOrderStepID,
                  
                });


                const lstProduct = apiResult.ResultObject.ShipmentOrder_ItemList.map((item, index) => {
                    return {

                        PRODUCTID: item.ProductID,
                        QUANTITY: item.Quantity,
                        ISSETUPPRODUCT: item.IsInstallItem == true ? 1 : 0,
                        MAINGROUPID: item.MainGroupID,
                        SUBGROUPID: item.SubGroupID,
                        ISONLINEONLY: 0,
                        ISPARTNER: 0,
                        ISNORMAL: 0,
                        OUTPUTSTOREID: apiResult.ResultObject.SenderStoreID,
                        COMBOID: 0,
                        SALEORDERDETAILONLINEID: null,
                        APPLYSALEODERDETAILID: null,
                        SALEPRICE: 0.0,
                        OUTPUTTYPEID: 8
                    }
                })

                const dtFromdate = new Date();
                const toDate = new Date();
                toDate.setDate(new Date().getDate() + 2);
                const param = {
                    "lstOutputStoreID": apiResult.ResultObject.SenderStoreID,
                    "VehicleType": apiResult.ResultObject.CarrierTypeID,
                    "iProvinceID": apiResult.ResultObject.ReceiverProvinceID,
                    "iDistrictID": apiResult.ResultObject.ReceiverDistrictID,
                    "iWardID": apiResult.ResultObject.ReceiverWardID,
                    "dtDateFrom": formatDateCusNew(dtFromdate, true),
                    "dtDateTo": formatDateCusNew(toDate, true),
                    "decRange": "0",
                    "iDayTranfer": "0",
                    "isCheckProvince": "true",
                    "intDeliveryTypeID": "281",
                    "iCreateStoreID": "1",
                    "lstProduct": lstProduct
                }

                console.log("param", param)
                this._FindStoreDeliveryTime(param)

            }
        });
    }

    CheckPermissionUser(id) {
        if (this.state.DataSource.CurrentStepPermissionList && this.state.DataSource.CurrentStepPermissionList.length > 0) {
            if (this.state.DataSource.CurrentStepPermissionList.some(a => a.ShipmentOrderPermissionID === id)) {
                return true;
            }
        }
        return false;
    }
    ChangeLoadData(ShipmentOrderData) {
        this.setState({
            ShipmentOrderType_WorkFlowList: ShipmentOrderData.ShipmentOrderType_WorkFlowList,
            CurrentShipmentOrderStepID: ShipmentOrderData.CurrentShipmentOrderStepID,
            IsCancelDelivery: ShipmentOrderData.IsCancelDelivery
        });
    }

    render() {
        if (this.state.IsLoadDataComplete) {
            return (
                <div className="col-lg-12 page-detail">

                    <ShipmentOrderTypeWF
                        ShipmentOrderID={this.props.match.params.id}
                        ShipmentOrderTypeWF={this.state.ShipmentOrderType_WorkFlowList}
                        CurrentShipmentOrderStepID={this.state.CurrentShipmentOrderStepID}
                        TotalMoney={this.state.DataSource.CollectedTotalMoney + this.state.DataSource.TotalCOD}
                        TotalCOD={this.state.DataSource.TotalCOD}
                        TotalSaleMaterialMoney={this.state.DataSource.TotalSaleMaterialMoney}
                        TotalReturnPrice={this.state.DataSource.TotalReturnPrice}
                        IsCancelDelivery={this.state.IsCancelDelivery}
                    />

                    <ShipmentOrderDetail
                        ShipmentOrderID={this.props.match.params.id}
                        ShipmentOrderDetail={this.state.DataSource}
                        onhandleChange={this.ChangeLoadData}
                        IsShipDetail={this.CheckPermissionUser(1)}
                        ListSuggestTime= {this.state.ListSuggestTime}
                    />
                    <InfoCoordinator
                        ShipmentOrderID={this.props.match.params.id}
                        InfoCoordinator={this.state.DataSource}
                        onhandleChange={this.ChangeLoadData}
                        IsUserCoordinator={this.CheckPermissionUser(16)}
                        IsCoordinator={this.CheckPermissionUser(17)}
                        IsCancelDelivery={(this.CheckPermissionUser(23) && !this.state.DataSource.IsCancelDelivery)}
                    />
                    <ShipmentOrderAddress
                        ShipmentOrderID={this.props.match.params.id}
                        ShipmentOrderAddress={this.state.DataSource}
                        ShipmentOrderAddressEdit={this.state.DataSource}
                    />

                    <InfoProduct
                        ShipmentOrderID={this.props.match.params.id}
                        InfoProduct={this.state.DataSource}
                    />
                    <InfoHistoryWF
                        ShipmentOrderID={this.props.match.params.id}
                        InfoHistoryWF={this.state.ShipmentOrderType_WorkFlowList}
                        InfoActionLogList={this.state.DataSource.ShipmentOrder_ActionLogList}
                    />

                    <ShipmentOrderAttachment
                        ShipmentOrderID={this.props.match.params.id}
                        ShipmentOrderAttachment={this.state.DataSource}
                        IsAttachment={this.CheckPermissionUser(18)}
                    />

                    <ShipmentOrderComment
                        ShipmentOrderID={this.props.match.params.id}
                        ShipmentOrderComment={this.state.DataSource}
                        IsComment={this.CheckPermissionUser(19)}
                    />
                </div >
            );
        }
        return (
            <label>Đang nạp dữ liệu...</label>
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
        }
    };
};

const Detail = connect(mapStateToProps, mapDispatchToProps)(DetailCom);
export default Detail;
