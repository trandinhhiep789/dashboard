
import React from "react";
import {
    Route,
    Switch
} from "react-router-dom";
import { connect } from "react-redux";

import Search from "./Search";
import Add from "./Add";
import Edit from "./Edit";
import NotFound from '../../../NotFound'

class VehicleRentalRequestType extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route exact path="/VehicleRentalRequestType" component={Search} />
                <Route exact path="/VehicleRentalRequestType/Add" component={Add} />
                <Route exact path="/VehicleRentalRequestType/Edit/:id" component={Edit} />
                <Route path="*" component={NotFound} />
            </Switch>
        );
    }
}

export default connect(null, null)(VehicleRentalRequestType);
