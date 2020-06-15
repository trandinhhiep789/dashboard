import React, { Component } from "react";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { formatDate } from "../../../../../common/library/CommonLib.js";
class FeeAppendixInfoInfoCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            FeeAppendixInfo: {}
        }
    }

    componentDidMount() {
    }
    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.FeeAppendixInfo) !== JSON.stringify(nextProps.FeeAppendixInfo)) {
            this.setState({
                FeeAppendixInfo: nextProps.FeeAppendixInfo
            })
        }
    }


    render() {
        return (
            <React.Fragment>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Tên phụ lục:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{this.state.FeeAppendixInfo.FeeAppendixName}</label>
                    </div><div className="form-group col-md-2">
                        <label className="col-form-label bold">Loại thời vụ:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {this.state.FeeAppendixInfo.ServiceSeasonTypeName}
                        </label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Từ ngày:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {formatDate(this.state.FeeAppendixInfo.ApplyFromDate)}
                        </label>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Đến ngày:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {formatDate(this.state.FeeAppendixInfo.ApplyToDate)}
                        </label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Mô tả:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <label className="col-form-label">
                            {this.state.FeeAppendixInfo.Description}
                        </label>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Kích hoạt:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            <div className="checkbox customCheckbox">
                                <label>
                                    <input type="checkbox" defaultChecked={this.state.FeeAppendixInfo.IsActived} disabled={true} />
                                    <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                                </label>
                            </div>
                        </label>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Hệ thống:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            <div className="checkbox customCheckbox">
                                <label>
                                    <input type="checkbox" defaultChecked={this.state.FeeAppendixInfo.IsSystem} disabled={true} />
                                    <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                                </label>
                            </div>
                        </label>
                    </div>
                </div>


            </React.Fragment>
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


const FeeAppendixInfo = connect(mapStateToProps, mapDispatchToProps)(FeeAppendixInfoInfoCom);
export default FeeAppendixInfo;