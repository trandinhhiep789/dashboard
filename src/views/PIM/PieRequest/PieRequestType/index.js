import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import Search from "./Search";
import Edit from "./Edit";
import NotFound from '../../../NotFound'
class PieRequestTypeCom extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route exact path="/PieRequestType" component={Search} />
                    <Route exact path="/PieRequestType/Edit/:id" component={Edit} />
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        }
    }
}

const PieRequestType = connect(mapStateToProps, mapDispatchToProps)(PieRequestTypeCom);
export default PieRequestType;