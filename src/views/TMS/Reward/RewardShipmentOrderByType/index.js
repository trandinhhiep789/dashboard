import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import Search from "./Search";
import SearchRewardTypeByDate from "./SearchRewardTypeByDate";
// import SearchByDate from "./SearchByDate";
import NotFound from '../../../NotFound';

class RewardShipmentOrderByTypeCom extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route exact path="/RewardShipmentOrderByType" component={Search} />
                <Route exact path="/RewardShipmentOrderByType/RewardDate/:id" component={SearchRewardTypeByDate} />
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

const RewardShipmentOrderByType = connect(mapStateToProps,mapDispatchToProps)(RewardShipmentOrderByTypeCom);
export default RewardShipmentOrderByType;
