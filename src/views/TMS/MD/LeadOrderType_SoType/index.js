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
import NotFound from '../../../NotFound';
class LeadOrderType_SoTypeCom extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route exact path="/LeadOrderTypeSoType" component={Search} />
                <Route exact path="/LeadOrderTypeSoType/Add" component={Add} />
                <Route exact path="/LeadOrderTypeSoType/Edit/:leadOrderTypedID/:saleOrderTypeID" component={Edit} />
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

const LeadOrderType_SoType = connect(
    mapStateToProps,
    mapDispatchToProps
)(LeadOrderType_SoTypeCom);
export default LeadOrderType_SoType;
