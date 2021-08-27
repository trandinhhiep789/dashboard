import React, { Component } from "react";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import {
    APIHostName,
} from "../constants";

class FeeAppendixCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            FeeAppendix: this.props.FeeAppendix
        }
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.FeeAppendix) !== JSON.stringify(nextProps.FeeAppendix)) {
            this.setState({
                Abiliti: nextProps.FeeAppendix
            })
        }
    }


    render() {
        return (
            <div className="card">
                <h4 className="card-title"><strong>Phụ lục biểu phí</strong></h4>
                <div className="card-body">
                    <div className="form-row">
                        <div className="col-md-12">
                            <div className="table-responsive">
                                <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                    <thead className="thead-light">
                                        <tr>
                                            <th className="jsgrid-header-cell">Tên phụ lục</th>
                                            <th className="jsgrid-header-cell">Loại mùa dịch vụ</th>
                                            <th className="jsgrid-header-cell">Từ ngày</th>
                                            <th className="jsgrid-header-cell">Đến ngày</th>
                                            <th className="jsgrid-header-cell">Đơn vị tính</th>
                                            <th className="jsgrid-header-cell">Kích hoạt</th>
                                            <th className="jsgrid-header-cell">Tác vụ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.FeeAppendix && this.state.FeeAppendix.map((item, index) => {
                                            return (<tr key={index}>
                                                <td>
                                                    <div className="checkbox">
                                                        <label>
                                                            <input type="checkbox" readOnly className="form-control form-control-sm" checked={item.FeeAppendixID} />
                                                            <span className="cr">
                                                                <i className="cr-icon fa fa-check"></i>
                                                            </span>
                                                        </label>
                                                    </div>
                                                </td>
                                                <td>{item.FeeAppendixName}</td>
                                                <td>{item.ServiceSeasonTypeID}</td>
                                                <td>{item.ApplyToDate}</td>
                                                <td>{item.ApplyFromDate}</td>
                                                <td>{item.IsActived}</td>
                                            </tr>)
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
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
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        }
    }
}


const FeeAppendix = connect(mapStateToProps, mapDispatchToProps)(FeeAppendixCom);
export default FeeAppendix;