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
import Detail from "./Detail";
import NotFound from '../../NotFound'
class ServiceAgreementCom extends React.Component {
    

    render() {
        return (
            <Switch>
                <Route exact path="/ServiceAgreement" component={Search} />
                <Route exact path="/ServiceAgreement/Add/" component={Add} />
                <Route exact path="/ServiceAgreement/Edit/:id" component={Edit} />
                <Route exact path="/ShipmentOrder/Detail/:id" component={Detail} />
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
