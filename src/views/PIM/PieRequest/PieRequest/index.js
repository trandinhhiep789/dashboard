import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import Search from "./Search";
import PieRequestAdd from "./Add";
import Edit from "./Edit";
import AddProduct from "../../PierequestProduct/PierequestProduct";

import NotFound from '../../../NotFound'
class PieRequestCom extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route exact path="/PieRequest" component={Search} />
                    <Route exact path="/PieRequest/Add" component={PieRequestAdd} />
                    <Route exact path="/PieRequest/Edit/:id" component={Edit} />
                    <Route exact path="/PierequestProduct/Add/:id" component={AddProduct} />
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


const PieRequest = connect(mapStateToProps, mapDispatchToProps)(PieRequestCom);
export default PieRequest;