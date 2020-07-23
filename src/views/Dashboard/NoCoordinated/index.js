import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../actions/fetchAPIAction";

class NoCoordinatedCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: ""
        };
    }

    componentDidMount() {

    }


    render() {
        return (
            <div className="col-12 col-md-6 col-lg-3">
                <div className="card card-Coordinated">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-3 icon">
                                <i className="fa fa-calendar fa-4x"></i>
                            </div>
                            <div className="col-9 text-right content">
                                <span className="Count">{this.props.DataSource.filter(n => n.CoordinatorUser != "").length}</span>
                                <h3 className="title">Chưa điều phối</h3>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <Link to="/ShipmentOrder" className="view-detail">
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

const NoCoordinated = connect(mapStateToProps, mapDispatchToProps)(NoCoordinatedCom);
export default NoCoordinated;