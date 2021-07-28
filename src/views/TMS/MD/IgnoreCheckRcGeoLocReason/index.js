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
class IgnoreCheckRcGeoLocReasonCom extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route exact path="/IgnoreCheckRcGeoLocReason" component={Search} />
                <Route exact path="/IgnoreCheckRcGeoLocReason/Add" component={Add} />
                <Route exact path="/IgnoreCheckRcGeoLocReason/Edit/:id" component={Edit} />
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

const IgnoreCheckRcGeoLocReason = connect(
    mapStateToProps,
    mapDispatchToProps
)(IgnoreCheckRcGeoLocReasonCom);
export default IgnoreCheckRcGeoLocReason;
