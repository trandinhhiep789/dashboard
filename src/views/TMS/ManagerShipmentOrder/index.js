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
import Add from "./Add";
import Edit from "./Edit";
import MapContainer from "./Component/MapContainer ";

import NotFound from '../../NotFound'
class ManagerShipmentOrderCom extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route exact path="/ManagerShipmentOrder" component={Search} />
                {/* <Route exact path="/ManagerShipmentOrder/Edit/:id" component={Edit} /> 
                <Route exact path="/ManagerShipmentOrder/Add" component={Add} />  */}
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

const ManagerShipmentOrder = connect(
    mapStateToProps,
    mapDispatchToProps
)(ManagerShipmentOrderCom);
export default ManagerShipmentOrder;
