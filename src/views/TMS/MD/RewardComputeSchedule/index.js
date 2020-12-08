import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import Search from "./Search";
import Add from "./Add";
import Edit from "./Edit";
import NotFound from '../../../NotFound'
import Detail from "./Detail";
class RewardComputeScheduleCom extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route exact path="/RewardComputeSchedule" component={Search} />
                <Route exact path="/RewardComputeSchedule/Add" component={Add} />
                <Route exact path="/RewardComputeSchedule/Edit/:id" component={Edit} />
                <Route exact path="/RewardComputeSchedule/Detail/:id" component={Detail} />
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

const RewardComputeSchedule = connect(
    mapStateToProps,
    mapDispatchToProps
)(RewardComputeScheduleCom);
export default RewardComputeSchedule;
