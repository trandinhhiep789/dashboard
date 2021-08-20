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
import Detail from "./Detail";
import NotFound from '../../../NotFound'
//import ReviewLevelDetail from "../ServiceRequestType_ReviewLevel/Detail";

class ServiceRequestTypeCom extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route exact path="/ServiceRequestType" component={Search} />
                <Route exact path="/ServiceRequestType/Add" component={Add} />
                <Route exact path="/ServiceRequestType/Edit/:id" component={Edit} />
                <Route exact path="/ServiceRequestType/Detail/:id" component={Detail} />
                {/* <Route exact path="/ServiceRequestType/ReviewLevelDetail/:id" component={ReviewLevelDetail} /> */}
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

const ServiceRequestType = connect(
    mapStateToProps,
    mapDispatchToProps
)(ServiceRequestTypeCom);
export default ServiceRequestType;
