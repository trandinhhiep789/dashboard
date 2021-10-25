import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Add from "./Add";
import Edit from "./Edit";
import NotFound from "../../../NotFound";
import React from "react";
import Search from "./Search";
import { connect } from "react-redux";

class VehicleModel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Switch>
        <Route exact path="/VehicleModel" component={Search} />
        <Route exact path="/VehicleModel/Add" component={Add} />
        <Route exact path="/VehicleModel/Edit/:id" component={Edit} />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default connect(null, null)(VehicleModel);
