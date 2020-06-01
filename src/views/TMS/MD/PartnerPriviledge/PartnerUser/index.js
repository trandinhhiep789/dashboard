import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import Search from "./Search";
import Add from "./Add";
import Edit from "./Edit";

class PartnerUserCom extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Route exact path="/PartnerUser" component={Search} />
                <Route path="/PartnerUser/add" component={Add} />
                <Route path="/PartnerUser/edit/:id" component={Edit} />
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

const PartnerUser = connect(
    mapStateToProps,
    mapDispatchToProps
)(PartnerUserCom);

export default PartnerUser;
