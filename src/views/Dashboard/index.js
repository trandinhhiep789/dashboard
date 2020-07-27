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
            IsLoadDataComplete: false,

        };
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        this.callSearchDataReport()

    }

    callSearchDataReport() {
        const postData = [];
        this.props.callFetchAPI(APIHostName, SearchAPIPath, postData).then(apiResult => {

            if (!apiResult.IsError) {
                this.setState({
                    LstDataSource: apiResult.ResultObject == null ? [] : apiResult.ResultObject,
                    IsLoadDataComplete: true
                });
            }
        });
    }

    render() {
        if (this.state.IsLoadDataComplete) {
            return (
                <div className="col-lg-12 dashboard">
                    <div className="row">
                        <NoCoordinated DataSource={this.state.LstDataSource} />
                        <NoDelivery DataSource={this.state.LstDataSource} />
                        <Delivery DataSource={this.state.LstDataSource} />
                        <Delivered DataSource={this.state.LstDataSource} />
                    </div>
                    <div className="row">
                        <WeeklyReport DataSource={this.state.LstDataSource} />
                        <ProcessHistory />
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