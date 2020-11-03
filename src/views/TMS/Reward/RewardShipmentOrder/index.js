import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import Search from "./Search";
import SearchByUserName from "./SearchByUserName";
import SearchByDate from "./SearchByDate";
import NotFound from '../../../NotFound';

class RewardShipmentOrderCom extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route exact path="/RewardShipmentOrder" component={Search} />
                <Route exact path="/RewardShipmentOrder/UserName/:id" component={SearchByUserName} />
                <Route exact path="/RewardShipmentOrder/RewardDate/:id" component={SearchByDate} />
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

const RewardShipmentOrder = connect(mapStateToProps,mapDispatchToProps)(RewardShipmentOrderCom);
export default RewardShipmentOrder;
