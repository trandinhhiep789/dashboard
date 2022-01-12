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
import Detail from "./Detail";
import NotFound from '../../../NotFound';
import LeadAdviceApplyAdd from "../LeadAdviceApply/Add/index";
// import LeadAdviceApplyEdit from "./Component/LeadAdviceApply/Edit"
class LeadAdviceCom extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route exact path="/LeadAdvice" component={Search} />
                <Route exact path="/LeadAdvice/Add" component={Add} />
                <Route exact path="/LeadAdvice/Edit/:id" component={Edit} />
                <Route exact path="/LeadAdvice/Detail/:id" component={Detail} />
                <Route exact path="/LeadAdviceApply/Add" component={LeadAdviceApplyAdd} />
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

const LeadAdvice = connect(
    mapStateToProps,
    mapDispatchToProps
)(LeadAdviceCom);
export default LeadAdvice;
