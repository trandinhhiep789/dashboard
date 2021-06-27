import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import Search from "./Search";
import Add from "./Add";
import Edit from "./Edit";
import NotFound from '../../../NotFound'
import Detail from "./Detail";
class DeliveryGoodsGroupCom extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route exact path="/DeliveryGoodsGroup" component={Search} />
                <Route exact path="/DeliveryGoodsGroup/Add" component={Add} />
                <Route exact path="/DeliveryGoodsGroup/Edit/:id" component={Edit} />
                <Route exact path="/DeliveryGoodsGroup/Detail/:id" component={Detail} />
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

const DeliveryGoodsGroup = connect(
    mapStateToProps,
    mapDispatchToProps
)(DeliveryGoodsGroupCom);
export default DeliveryGoodsGroup;
