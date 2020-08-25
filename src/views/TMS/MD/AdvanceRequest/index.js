import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import Search from "./Search";
import Edit from "./Edit";
import Add from "./Add";
import NotFound from '../../../NotFound'
class AdvanceRequestCom extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route exact path="/AdvanceRequest" component={Search} />
                <Route exact path="/AdvanceRequest/Add" component={Add} />
                <Route exact path="/AdvanceRequest/Edit/:id" component={Edit} />
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

const AdvanceRequest = connect(
    mapStateToProps,
    mapDispatchToProps
)(AdvanceRequestCom);
export default AdvanceRequest;
