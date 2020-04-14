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
class ShipmentFeePaymentMethodCom extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Route exact path="/ShipmentFeePaymentMethod" component={Search} />
                <Route path="/ShipmentFeePaymentMethod/Add" component={Add} />
                <Route path="/ShipmentFeePaymentMethod/Edit/:id" component={Edit}
                />
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

const ShipmentFeePaymentMethod = connect(
    mapStateToProps,
    mapDispatchToProps
)(ShipmentFeePaymentMethodCom);
export default ShipmentFeePaymentMethod;
