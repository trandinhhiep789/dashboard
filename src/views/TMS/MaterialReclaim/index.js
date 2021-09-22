import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../actions/fetchAPIAction";
import Search from "./Search";
import Detail from "./Detail";
import NotFound from '../../NotFound';


class MaterialReclaimCom extends React.Component {


    render() {
        return (
            <Switch>
                <Route exact path="/MaterialReclaim" component={Search} />
                <Route exact path="/MaterialReclaim/Detail/:id" component={Detail} />
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

const MaterialReclaim = connect(mapStateToProps, mapDispatchToProps)(MaterialReclaimCom);
export default MaterialReclaim;
