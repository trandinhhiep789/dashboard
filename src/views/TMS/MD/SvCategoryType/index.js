import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import { connect } from "react-redux";

import Add from "./Add";
import Edit from "./Edit";
import NotFound from '../../../NotFound';
import Search from "./Search";

class SvCategoryTypeCom extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route exact path="/SvCategoryType" component={Search} />
                <Route exact path="/SvCategoryType/Add" component={Add} />
                <Route exact path="/SvCategoryType/Edit/:id" component={Edit} />
                <Route path="*" component={NotFound} />
            </Switch>
        );
    }
}

export default connect(null, null)(SvCategoryTypeCom);
