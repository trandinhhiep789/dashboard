import React from "react";
import {
    Route,
    Switch
} from "react-router-dom";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import Search from "./Search";
import Add from "./Add";
import Edit from "./Edit";
import NotFound from '../../../NotFound'
class AttributeCategoryTypeCom extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route exact path="/AttributeCategoryType" component={Search} />
                    <Route exact path="/AttributeCategoryType/Add" component={Add} />
                    <Route exact path="/AttributeCategoryType/Edit/:id" component={Edit} />
                    <Route path="*" component={NotFound} />
                </Switch>
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

const AttributeCategoryType = connect(
    mapStateToProps,
    mapDispatchToProps
)(AttributeCategoryTypeCom);
export default AttributeCategoryType;
