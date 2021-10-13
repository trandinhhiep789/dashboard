import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import { connect } from "react-redux";

import Search from "./Search";
import Detail from "./Detail";
import NotFound from '../../NotFound';

class MaterialReturnCom extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/MaterialReturn" component={Search} />
                <Route exact path="/MaterialReturn/Detail/:id" component={Detail} />
                <Route path="*" component={NotFound} />
            </Switch>
        );
    }
}

const MaterialReturn = connect(null, null)(MaterialReturnCom);
export default MaterialReturn;
