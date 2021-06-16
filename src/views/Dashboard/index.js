import React, { Component } from 'react';
import { connect } from 'react-redux';
import { callFetchAPI } from "../../actions/fetchAPIAction";
import { updatePagePath } from "../../actions/pageAction";
import { PagePath } from "./constants"
import NoCoordinated from './NoCoordinated';
import NoDelivery from './NoDelivery';
import Delivery from './Delivery';
import Delivered from './Delivered';
import ProcessHistory from './ProcessHistory';
import WeeklyReport from './WeeklyReport';
import ListCoordinated from './ListCoordinated';
import {
    APIHostName,
    SearchAPIPath
} from "./constants"

class DashboardCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            LstDataSource: [],
            WeekShipmentOrderCoord: [],
            ShipmentOrderActionLogList: [],
            IsLoadDataComplete: false,
            NoCoordinated: 0,
            NoDelivery: 0,
            Delivery: 0,
            Delivered: 0,
            ShipmentOrderStatusGroup7: 0

        };
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        this.callSearchDataReport()
        this.props.callFetchAPI(APIHostName, "api/ShipmentOrder/GetListMaterialHouseWork",210614000000072).then((apiResult) => {
            console.log("GetListMaterialHouseWork",apiResult)
           
        });

    }

    callSearchDataReport() {
        const postData = [];
        this.props.callFetchAPI(APIHostName, SearchAPIPath, postData).then(apiResult => {
            if (!apiResult.IsError) {
                this.setState({
                    LstDataSource: apiResult.ResultObject == null ? [] : apiResult.ResultObject.ShipmentOrderItemList,
                    WeekShipmentOrderCoord: apiResult.ResultObject == null ? [] : apiResult.ResultObject.WeekShipmentOrderCoordList,
                    ShipmentOrderActionLogList: apiResult.ResultObject == null ? [] : apiResult.ResultObject.ShipmentOrder_ActionLogList,
                    NoCoordinated: apiResult.ResultObject.NoCoordinated,
                    NoDelivery: apiResult.ResultObject.NoDelivery,
                    Delivery: apiResult.ResultObject.Delivery,
                    Delivered: apiResult.ResultObject.Delivered,
                    ShipmentOrderStatusGroup7: apiResult.ResultObject.ShipmentOrderStatusGroup7,
                    IsLoadDataComplete: true,

                });
            }
        });
    }


    render() {
        if (this.state.IsLoadDataComplete) {
            return (
                <div className="col-lg-12 dashboard">
                    <div className="row">
                        <NoCoordinated NoCoordinated={this.state.NoCoordinated} />
                        <NoDelivery NoDelivery={this.state.NoDelivery} />
                        <Delivery Delivery={this.state.Delivery} />
                        <Delivered ShipmentOrderStatusGroup7={this.state.ShipmentOrderStatusGroup7} />
                    </div>
                    <div className="row">
                        <WeeklyReport DataSource={this.state.WeekShipmentOrderCoord} />
                        <ProcessHistory DataSource={this.state.ShipmentOrderActionLogList} />
                    </div>
                    <div className="row">
                        <ListCoordinated DataSource={this.state.LstDataSource} />
                    </div>
                </div>
            );
        }
        return <label>Đang nạp dữ liệu...</label>;
    }
}

const mapStateToProps = state => {
    return {
        AppInfo: state,
        FetchAPIInfo: state.FetchAPIInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updatePagePath: (pagePath) => {
            dispatch(updatePagePath(pagePath));
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        }
    }
}

const Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardCom);
export default Dashboard;