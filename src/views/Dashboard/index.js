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

class DashboardCom extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
    }

    render() {
        return (
            <div className="col-lg-12 dashboard">
                <div className="row">
                    <NoCoordinated />
                    <NoDelivery />
                    <Delivery />
                    <Delivered />
                </div>
                <div className="row">
                    <WeeklyReport/>
                    <ProcessHistory />
                </div>
                <div className="row">
                    <ListCoordinated/>
                </div>
            </div>
        );
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