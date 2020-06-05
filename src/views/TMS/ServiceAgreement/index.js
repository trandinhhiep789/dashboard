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
import NotFound from '../../NotFound';

import FeeAppendixAdd from "./FeeAppendix/Add";
import FeeAppendixEdit from "./FeeAppendix/Edit";
import FeeAppendixSearch from "./FeeAppendix/Search";
class ServiceAgreementCom extends React.Component {
    

    render() {
        return (
            <Switch>
                <Route exact path="/ServiceAgreement" component={Search} />
                <Route exact path="/ServiceAgreement/Add/" component={Add} />
                <Route exact path="/ServiceAgreement/Edit/:id" component={Edit} />
                <Route exact path="/ServiceAgreement/Detail/:id" component={Detail} />

                <Route exact path="/ServiceAgreement/FeeAppendix" component={FeeAppendixSearch} />
                <Route exact path="/ServiceAgreement/FeeAppendix/Add/" component={FeeAppendixAdd} />
                <Route exact path="/ServiceAgreement/FeeAppendix/Edit/:id" component={FeeAppendixEdit} />

                <Route exact path="/ServiceAgreement/Abiliti" component={Edit} />
                <Route exact path="/ServiceAgreement/Abiliti/Add" component={Edit} />
                <Route exact path="/ServiceAgreement/Abiliti/Edit/:id" component={Edit} />
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
