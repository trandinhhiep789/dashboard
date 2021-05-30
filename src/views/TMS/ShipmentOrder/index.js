import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../actions/fetchAPIAction";
import Search from "./Search";
import Detail from "./Detail";
import Edit from "./Edit";
import MapContainer from "./Component/MapContainer ";

import NotFound from '../../NotFound'
class ShipmentOrderCom extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route exact path="/ShipmentOrder" component={Search} />
                <Route exact path="/ShipmentOrder/Detail/:id" component={Detail} />
                {/* <Route exact path="/ShipmentOrder/Edit/:id" component={Edit} />  */}
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

const ShipmentOrder = connect(
    mapStateToProps,
    mapDispatchToProps
)(ShipmentOrderCom);
export default ShipmentOrder;
