import React from "react";
import {
    Route,
    Switch
} from "react-router-dom";
import { connect } from "react-redux";

import Search from "./Search";
import NotFound from '../../../NotFound';

class OverdueStaffDebt extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route exact path="/OverdueStaffDebt" component={Search} />
                <Route path="*" component={NotFound} />
            </Switch>
        );
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(OverdueStaffDebt);