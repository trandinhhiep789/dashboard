import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../actions/fetchAPIAction";
import Search from "./Search";
import Add from "./Add";
import Edit from "./Edit";
import MapContainer from "./Component/MapContainer ";

import NotFound from '../../NotFound'
class ServiceAgreementCom extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route exact path="/ServiceAgreement" component={Search} />
                <Route exact path="/ServiceAgreement/Add/" component={Detail} />
                <Route exact path="/ServiceAgreement/Edit/:id" component={Edit} />
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

const ServiceAgreement = connect(mapStateToProps, mapDispatchToProps)(ServiceAgreementCom);
export default ServiceAgreement;
