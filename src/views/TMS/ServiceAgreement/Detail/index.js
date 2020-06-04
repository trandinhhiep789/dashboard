import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";

import {
    APIHostName,
    LoadAPIPath,
    PagePath,
    DetailAPIPath
} from "../constants";
import ServiceAgreementInfo from "./ServiceAgreementInfo";


class DetailCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DataSource: {},
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsLoadDataComplete: false,
        }
    }

    componentDidMount() {
        console.log("DetailCom", this.props)
        this.props.updatePagePath(DetailAPIPath);
    }



    render() {
        if (this.state.IsLoadDataComplete) {
            return (
                <div className="col-lg-12 page-detail">
                    <ServiceAgreementInfo />
                </div >
            );
        }
        return (
            <label>Đang nạp dữ liệu...</label>
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
        updatePagePath: pagePath => {
            dispatch(updatePagePath(pagePath));
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        }
    };
};

const Detail = connect(mapStateToProps, mapDispatchToProps)(DetailCom);
export default Detail;
