import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import { connect } from "react-redux";

import Search from "./Search";
import Add from "./Add";
import Edit from "./Edit";
import NotFound from '../../../NotFound'

class VehicleRentalRequestStep extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route exact path="/VehicleRentalRequestStep" component={Search} />
                <Route exact path="/VehicleRentalRequestStep/Add" component={Add} />
                <Route exact path="/VehicleRentalRequestStep/Edit/:id" component={Edit} />
                <Route path="*" component={NotFound} />
            </Switch>
        );
    }
}

export default connect(null, null)(VehicleRentalRequestStep);