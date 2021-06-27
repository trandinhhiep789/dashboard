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
import Detail from "./Detail";
import NotFound from '../../../NotFound'
//import ReviewLevelDetail from "../DataExportTemplate_Format/Detail";

class DataExportTemplateCom extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route exact path="/DataExportTemplate" component={Search} />
                <Route exact path="/DataExportTemplate/Add" component={Add} />
                <Route exact path="/DataExportTemplate/Edit/:id" component={Edit} />
                <Route exact path="/DataExportTemplate/Detail/:id" component={Detail} />
                {/* <Route exact path="/DataExportTemplate/ReviewLevelDetail/:id" component={ReviewLevelDetail} /> */}
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

const DataExportTemplate = connect(
    mapStateToProps,
    mapDispatchToProps
)(DataExportTemplateCom);
export default DataExportTemplate;
