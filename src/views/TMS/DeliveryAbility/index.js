import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";

import NotFound from '../../NotFound';
import { callFetchAPI } from "../../../actions/fetchAPIAction";
import Search from './Search'
import Add from './Add';
import Edit from './Edit';

export class DeliveryAbility extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/DeliveryAbility" component={Search} />
                <Route exact path="/DeliveryAbility/Add" component={Add} />
                <Route exact path="/DeliveryAbility/Edit" component={Edit} />
                <Route path="*" component={NotFound} />
            </Switch>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryAbility)
