import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../actions/fetchAPIAction";
import Search from "./Search";
import DetailByPartner from "./DetailByPartner";
import DetailByDate from "./DetailByDate";

import NotFound from '../../NotFound';

class PartnerPayableCom extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route exact path="/PartnerPayable" component={Search} />
                <Route exact path="/PartnerPayable/DetailByPartner/:id" component={DetailByPartner} /> 
                <Route exact path="/PartnerPayable/DetailByDate/:id" component={DetailByDate} /> 
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

const PartnerPayable = connect(mapStateToProps,mapDispatchToProps)(PartnerPayableCom);
export default PartnerPayable;
