import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import Search from "./Search";
import Add from "./Add";
import Edit from "./Edit";
import Detail from "./Detail";
import NotFound from '../../../NotFound'

class ProductCom extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route exact path="/Product" component={Search} />
                    <Route exact path="/Product/Add" component={Add} />
                    <Route exact path="/Product/Edit/:id" component={Edit} />
                    <Route exact path="/Product/Detail/:id" component={Detail} />
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


const Product = connect(mapStateToProps, mapDispatchToProps)(ProductCom);
export default Product;