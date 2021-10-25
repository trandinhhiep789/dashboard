import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import Search from "./Search";
import Add from "./Add";
import Edit from "./Edit";

const VehicleActivityStatus = () => {
    
    return (
        
        <Switch>
            <Route exact path="/VehicleActivityStatus" component={Search} />
            <Route exact path="/VehicleActivityStatus/Add" component={Add} />
            <Route exact path="/VehicleActivityStatus/Edit/:id" component={Edit} />
            <Route path="*" component={VehicleActivityStatus} />
        </Switch>
        
    );
};

export default VehicleActivityStatus;


