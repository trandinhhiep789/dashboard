import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import Search from "./Search";
import Add from "./Add";
import Edit from "./Edit";

class InstallBundleCom extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Route exact path="/InstallBundle" component={Search} />
                <Route path="/InstallBundle/add" component={Add} />
                <Route path="/InstallBundle/edit/:id" component={Edit} />
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

const InstallBundle = connect(
    mapStateToProps,
    mapDispatchToProps
)(InstallBundleCom);

export default InstallBundle;
