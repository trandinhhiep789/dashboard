import React from "react";
import { connect } from "react-redux";
import {
    Route,
    Switch
} from "react-router-dom";

import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import NotFound from '../../../NotFound';
import Search from "./Search";

class InventoryComponentCom extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route exact path="/InventoryComponent" component={Search} />
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

export default connect(mapStateToProps, mapDispatchToProps)(InventoryComponentCom);