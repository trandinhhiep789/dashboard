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


class DetailCom extends React.Component {
    constructor(props) {
        super(props);
        this.ChangeLoadData = this.ChangeLoadData.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.state = {
            DataSource: {},
            ShipmentOrderType_WorkFlowList: null,
            CurrentShipmentOrderStepID: 0,
            IsCancelDelivery:false,
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsLoadDataComplete: false,
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

    callLoadData(id) {
        this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then((apiResult) => {
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
                    IsLoadDataComplete: true
                });
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
            IsCancelDelivery:ShipmentOrderData.IsCancelDelivery
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
                        IsCancelDelivery={this.state.IsCancelDelivery}
                    />
                    
                    <ShipmentOrderDetail
                        ShipmentOrderID={this.props.match.params.id}
                        ShipmentOrderDetail={this.state.DataSource}
                        onhandleChange={this.ChangeLoadData}
                        IsShipDetail={this.CheckPermissionUser(1)}
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
