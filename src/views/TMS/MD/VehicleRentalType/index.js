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
                <Route exact path="/VehicleRentalType" component={Search} />
                <Route exact path="/VehicleRentalType/Add/" component={Add} />
                <Route exact path="/VehicleRentalType/Edit/:id" component={Edit} />
                <Route path="*" component={VehicleRentalType} />
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

const VehicleRentalType = connect(mapStateToProps, mapDispatchToProps)(VehicleRentalTypeCom);
export default VehicleRentalType;
