import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../actions/pageAction";
import { APIHostName, SearchAPIPath } from './Constants';

class BrandCom extends Component {
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
        },
        {
            SearchKey: "@ManufacturerID",
            SearchValue: -1
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
                <div className="card card-brand">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-3 icon">
                                {/* <img src="/src/img/icon/iconbrand.png" alt="Sản phẩm" /> */}
                                <i className="fa fa-braille fa-5x"></i>
                            </div>
                            <div className="col-9 text-right content">
                                <span className="Count">{this.state.count}</span>
                                <h3 className="title">Nhãn hiệu</h3>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <Link to="/Brand" className="view-detail">
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

const Brand = connect(mapStateToProps, mapDispatchToProps)(BrandCom);
export default Brand;