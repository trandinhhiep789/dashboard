import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../actions/pageAction";
import {
    APIHostName,
    SearchAPIPath
} from "./Constants"

class ProductCom extends Component {
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
                <div className="card card-product">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-3 icon">
                                <i className="fa fa-shopping-cart fa-5x"></i>
                            </div>
                            <div className="col-9 text-right content">
                                <span className="Count">{this.state.count}</span>
                                <h3 className="title">Sản phẩm</h3>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <Link to="/Product" className="view-detail">
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
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        }
    }
}

const Product = connect(mapStateToProps, mapDispatchToProps)(ProductCom);
export default Product;