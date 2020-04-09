import React, { Component } from 'react';
import Product from "./Product";
import Category from "./Category";
import Brand from "./Brand";
import PieRequest from "./PieRequest";
import TopProducts from "./TopProducts";
import UserActivity from "./UserActivity";
import PieRequestList from "./PieRequest/list.js";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../actions/fetchAPIAction";
import { updatePagePath } from "../../actions/pageAction";
import { PagePath } from "./constants"

class DashboardCom extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
    }

    render() {
        return (
            <div className="col-lg-12 dashboard">
                <div className="row">
                    <Product />
                    <Category />
                    <Brand />
                    <PieRequest />
                    <TopProducts />
                    <UserActivity />
                    <PieRequestList />
                </div>
            </div>
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
        updatePagePath: (pagePath) => {
            dispatch(updatePagePath(pagePath));
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        }
    }
}

const Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardCom);
export default Dashboard;