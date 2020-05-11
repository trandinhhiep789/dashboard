import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import Search from "./Search";
import Add from "./Add";
import Edit from "./Edit";
class McPriviledgeCom extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Route exact path="/PartnerPriviledge" component={Search} />
                <Route path="/PartnerPriviledge/add" component={Add} />
                <Route path="/PartnerPriviledge/edit/:id" component={Edit} />
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

const McPriviledge = connect(
    mapStateToProps,
    mapDispatchToProps
)(McPriviledgeCom);
export default McPriviledge;
