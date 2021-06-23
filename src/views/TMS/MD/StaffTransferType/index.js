import React from "react";
import {
    Route,
    Switch
} from "react-router-dom";
import { connect } from "react-redux";
import Search from "./Search";
import Add from "./Add";
import Detail from "./Detail";
import ReviewLevelDetail from './ReviewLevelDetail'
import NotFound from '../../../NotFound'

class StaffTransferTypeCom extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route exact path="/StaffTransferType" component={Search} />
                <Route exact path="/StaffTransferType/Add" component={Add} />
                <Route exact path="/StaffTransferType/Detail/:id" component={Detail} />
                <Route exact path="/StaffTransferType/ReviewLevelDetail/:id" component={ReviewLevelDetail} />
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

    };
};

const StaffTransferType = connect(
    mapStateToProps,
    mapDispatchToProps
)(StaffTransferTypeCom);

export default StaffTransferType;
