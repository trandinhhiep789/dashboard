import React from "react";
import {
    Route,
    Switch
} from "react-router-dom";
import { connect } from "react-redux";

import Search from "./Search";
import NotFound from '../../../NotFound';

class GeneralReportCom extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route exact path="/SaleSummaryReport" component={Search} />
                <Route path="*" component={NotFound} />
            </Switch>
        );
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

const GeneralReport = connect(mapStateToProps, mapDispatchToProps)(GeneralReportCom);
export default GeneralReport;
