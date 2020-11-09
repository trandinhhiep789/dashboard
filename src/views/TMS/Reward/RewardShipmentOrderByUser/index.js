import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import Search from "./Search";
import SearchUserByDate from "./SearchUserByDate";

import NotFound from '../../../NotFound';

class RewardShipmentOrderByUserCom extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route exact path="/RewardShipmentOrderByUser" component={Search} />
                <Route exact path="/RewardShipmentOrderByUser/RewardByDate/:id" component={SearchUserByDate} />
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

const RewardShipmentOrderByUser = connect(mapStateToProps,mapDispatchToProps)(RewardShipmentOrderByUserCom);
export default RewardShipmentOrderByUser;