import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../actions/fetchAPIAction";
import NotFound from "../../NotFound";
import Search from "./Search";

class ShipmentRouteAutoCom extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Switch>
        <Route exact path="/ShipmentRouteAuto" component={Search} />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    AppInfo: state,
    FetchAPIInfo: state.FetchAPIInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    callFetchAPI: (hostname, hostURL, postData) => {
      return dispatch(callFetchAPI(hostname, hostURL, postData));
    },
  };
};

const ShipmentRouteAuto = connect(mapStateToProps, mapDispatchToProps)(ShipmentRouteAutoCom);
export default ShipmentRouteAuto;
