import React from "react";
import ReactDOM from "react-dom";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../actions/fetchAPIAction";
import Search from "./Search";
import Add from "./Add";
import Edit from "./Edit";
import NotFound from '../../NotFound'
class PartnerTypeCom extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Route exact path="/PartnerType" component={Search} />
                <Route exact path="/PartnerType/Add" component={Add} />
                <Route exact path="/PartnerType/Edit/:id" component={Edit} />
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

const PartnerType = connect(
    mapStateToProps,
    mapDispatchToProps
)(PartnerTypeCom);
export default PartnerType;
