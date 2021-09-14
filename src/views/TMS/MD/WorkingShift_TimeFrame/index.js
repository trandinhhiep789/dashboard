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

class WorkingShift_TimeFrameCom extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route exact path="/WorkingShiftTimeFrame" component={Search} />
                <Route exact path="/WorkingShiftTimeFrame/Add" component={Add} />
                <Route exact path="/WorkingShiftTimeFrame/Edit/:id" component={Edit} />
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

const WorkingShift_TimeFrame = connect(mapStateToProps, mapDispatchToProps)(WorkingShift_TimeFrameCom);
export default WorkingShift_TimeFrame;
