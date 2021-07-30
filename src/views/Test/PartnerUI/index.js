import React from "react";
import { Link } from "react-router-dom";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../actions/pageAction";
import SearchForm from "../../../common/components/FormContainer/SearchForm";
import DataGrid from "../../../common/components/DataGrid";
import {
    SearchElementList,
    SearchMLObjectDefinition,
    DataGridColumnList,
    BackLink,
    AddLink,
    PagePath
} from "./constants";
import { showModal, hideModal } from '../../../actions/modal';
import Search from "./Search";
import Add from "./Add";
import Edit from "./Edit";
import Detail from "./Detail";
import NotFound from '../../NotFound';

class PartnerUICom extends React.Component {
    
    render() {
        return (
            <Switch>
                <Route exact path="/PartnerUI" component={Search} />
                <Route exact path="/PartnerUI/Add/" component={Add} />
                <Route exact path="/PartnerUI/Edit/:id" component={Edit} />
                <Route exact path="/PartnerUI/Detail/:id" component={Detail} />
        
                <Route path="*" component={NotFound} />
            </Switch>
        );
    }

}

const mapStateToProps = state => {
    return {
        AppInfo: state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updatePagePath: pagePath => {
            dispatch(updatePagePath(pagePath));
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        callClearLocalCache: (cacheKeyID) => {
            return dispatch(callClearLocalCache(cacheKeyID))
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: (type, props) => {
            dispatch(hideModal(type, props));
        }

    }
}

const PartnerUI = connect(mapStateToProps, mapDispatchToProps)(PartnerUICom);
export default PartnerUI;