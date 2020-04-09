import React from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import Search from "./Search";
import Add from "./Add";
import Edit from "./Edit";
import Detail from "./Detail";

class ProductCom extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <React.Fragment>
                <Route exact path="/Product" component={Search} />
                <Route path="/Product/Add" component={Add} />
                <Route path="/Product/Edit/:id" component={Edit} />
                <Route path="/Product/Detail/:id" component={Detail} />
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