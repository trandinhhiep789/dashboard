import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../actions/fetchAPIAction";
import Searchnew from "./Search/indexnew";
import SearchnewCopy from "./Search/indexnewCopy";
import SearchShipmentRoute from "./Search/ShipmentRoute";
import Detail from "./Detail";
import NotFound from '../../NotFound'

class ShipmentRouteCom extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route exact path="/ShipmentRoute" component={Searchnew} />
                <Route exact path="/ShipmentRouteNew" component={SearchnewCopy} />
                <Route exact path="/ShipmentRoute/Detail/:id" component={Detail} />
                <Route exact path="/ShipmentRoute/Manager" component={SearchShipmentRoute} />
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

const ShipmentRoute = connect(
    mapStateToProps,
    mapDispatchToProps
)(ShipmentRouteCom);
export default ShipmentRoute;
