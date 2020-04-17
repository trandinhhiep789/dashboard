import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import Search from "./Search";
import Add from "./Add";
import Edit from "./Edit";
import NotFound from '../../../NotFound'
class ShipmentGoodsTypeCom extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Route exact path="/ShipmentGoodsType" component={Search} />
                <Route exact path="/ShipmentGoodsType/Add" component={Add} />
                <Route exact path="/ShipmentGoodsType/Edit/:id" component={Edit} />
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

const ShipmentGoodsType = connect(
    mapStateToProps,
    mapDispatchToProps
)(ShipmentGoodsTypeCom);
export default ShipmentGoodsType;
