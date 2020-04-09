import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { callFetchAPI } from "../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../actions/pageAction";
import { APIHostName, SearchAPIPath } from './Constants';

class PieRequestCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: ""
        };
    }

    componentDidMount() {
        const searchData = [{
            SearchKey: "@Keyword",
            SearchValue: ""
        }
        ];
        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then((apiResult) => {

            if (!apiResult.IsError) {
                this.setState({
                    count: apiResult.ResultObject.length
                })
            }

        });
    }

    render() {
        return (
            <div className="col-sm-12 col-md-6 col-lg-3">
                <div className="card card-pierequest">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-3 icon">
                                <i className="fa fa-tasks fa-5x"></i>
                            </div>
                            <div className="col-9 text-right content">
                                <span className="Count">{this.state.count}</span>
                                <h3 className="title">Yêu cầu chỉnh sửa</h3>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <Link to="/PieRequest" className="view-detail">
                            <span className="pull-left">Chi tiết</span>
                            <span className="btn-pull-right">
                                <i className="fa fa-arrow-circle-right"></i>
                            </span>
                        </Link>
                    </div>
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

const PieRequest = connect(mapStateToProps, mapDispatchToProps)(PieRequestCom);
export default PieRequest;