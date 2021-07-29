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
//import ReviewLevelDetail from "../DeliveryAbilityStore_ReviewLevel/Detail";

class DeliveryAbilityStoreCom extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route exact path="/DeliveryAbilityStore" component={Search} />
                <Route exact path="/DeliveryAbilityStore/Add" component={Add} />
                <Route exact path="/DeliveryAbilityStore/Edit/:id" component={Edit} />
                <Route exact path="/DeliveryAbilityStore/Detail/:id" component={Detail} />
                {/* <Route exact path="/DeliveryAbilityStore/ReviewLevelDetail/:id" component={ReviewLevelDetail} /> */}
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

const DeliveryAbilityStore = connect(
    mapStateToProps,
    mapDispatchToProps
)(DeliveryAbilityStoreCom);
export default DeliveryAbilityStore;
