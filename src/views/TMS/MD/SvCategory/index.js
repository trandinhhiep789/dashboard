import React from "react";
import {
    Route,
    Switch
} from "react-router-dom";
import { connect } from "react-redux";

import Add from "./Add";
import Edit from "./Edit";
import NotFound from '../../../NotFound';
import Search from "./Search";

class SvCategoryCom extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route exact path="/SvCategory" component={Search} />
                <Route exact path="/SvCategory/Add" component={Add} />
                <Route exact path="/SvCategory/Edit/:id" component={Edit} />
                <Route path="*" component={NotFound} />
            </Switch>
        );
    }
}

export default connect(null, null)(SvCategoryCom);
