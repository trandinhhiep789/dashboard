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


class VehicleRentalTypeCom extends React.Component {
    

    render() {
        return (
            <Switch>
                <Route exact path="/RentalType" component={Search} />
                <Route exact path="/RentalType/Add/" component={Add} />
                <Route exact path="/RentalType/Edit/:id" component={Edit} />
                <Route path="*" component={RentalType} />
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

const RentalType = connect(mapStateToProps, mapDispatchToProps)(VehicleRentalTypeCom);
export default RentalType;
