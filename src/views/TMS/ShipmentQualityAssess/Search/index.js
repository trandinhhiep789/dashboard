import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNotification from "react-notifications-component";

import { updatePagePath } from "../../../../actions/pageAction";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import {
    PagePath, SearchAPIPath, APIHostName
} from "../constants";

export class SearchCom extends Component {
    constructor(props) {
        super(props);

        this.notificationDOMRef = React.createRef();
        this.callSearchData = this.callSearchData.bind(this);
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        this.callSearchData()
    }

    callSearchData() {
        const searchData = [
            {
                SearchKey: "@Keyword",
                SearchValue: ""
            }
        ];

        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
            if (!apiResult.IsError) {
                console.log("🚀 ~ file: index.js ~ line 34 ~ SearchCom ~ this.props.callFetchAPI ~ apiResult", apiResult)
            } else {
                console.log("🚀 ~ file: index.js ~ line 36 ~ SearchCom ~ this.props.callFetchAPI ~ apiResult", apiResult)
            }
        });
    }

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />

            </React.Fragment>
        )
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
        updatePagePath: pagePath => {
            dispatch(updatePagePath(pagePath));
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchCom);
