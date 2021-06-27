import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import Search from "./Search";
import ShipmentOrderLateInfo from "./Detail/ShipmentOrderLateInfo";
import ShipmentOrderLateInfo30 from "./Detail/ShipmentOrderLateInfo30";

import NotFound from '../../../NotFound';

class ReportLateCom extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route exact path="/ReportLate" component={Search} />
                <Route exact path="/ReportLate/ShipmentOrderLateInfo/:id" component={ShipmentOrderLateInfo} />
                <Route exact path="/ReportLate/ShipmentOrderLateInfo30/:id" component={ShipmentOrderLateInfo30} />
                <Route path="*" component={NotFound} />
            </Switch>
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
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        }
    };
};

const ReportLate = connect(mapStateToProps, mapDispatchToProps)(ReportLateCom);
export default ReportLate;
