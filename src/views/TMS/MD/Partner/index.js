import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import Search from "./Search";
import Add from "./Add";
import Edit from "./Edit";
import NotFound from '../../../NotFound'
class PartnerCom extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Route exact path="/Partner" component={Search} />
                <Route exact path="/Partner/Add" component={Add} />
                <Route exact path="/Partner/Edit/:id" component={Edit} />
                <Route path="*" component={NotFound} />
            </React.Fragment>
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

const Partner = connect(
    mapStateToProps,
    mapDispatchToProps
)(PartnerCom);
export default Partner;
