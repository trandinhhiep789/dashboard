import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import Search from "./Search";
import Add from "./Add";
import Edit from "./Edit";
import NotFound from '../../../NotFound'
class SymptomApplyCom extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route exact path="/SymptomApply" component={Search} />
                <Route exact path="/SymptomApply/Add" component={Add} />
                <Route exact path="/SymptomApply/Edit/:id" component={Edit} />
                <Route path="*" component={NotFound} />
            </Switch>
        );
    }
}

const mapStateToProps = state => {
    return {
        AppInfo: state,
        FetchAPIInfo: state.FetchAPIInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        }
    };
};

const SymptomApply = connect(
    mapStateToProps,
    mapDispatchToProps
)(SymptomApplyCom);
export default SymptomApply;
