import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import { connect } from "react-redux";
import Search from "./Search";
import NotFound from '../../../NotFound';

class AirConditionerMTOrderReportCom extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route exact path="/AirConditionerMTOrderReport" component={Search} />
                <Route path="*" component={NotFound} />
            </Switch>
        );
    }
}

export default connect(null, null)(AirConditionerMTOrderReportCom);