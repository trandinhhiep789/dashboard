import React, { Component } from "react";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";

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
        console.log('FeeAppendixInfoInfoCom', this.state.FeeAppendixInfo.FeeAppendixName)
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
                            {this.state.FeeAppendixInfo.ApplyFromDate}
                        </label>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Đến ngày:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {this.state.FeeAppendixInfo.ApplyToDate}
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
                    <div className="col-md-6">
                        <div className="form-row">
                            <div className="form-group col-md-2">
                                <label className="col-form-label bold">Kích hoạt:</label>
                            </div>
                            <div className="form-group col-md-10">
                                <label className="col-form-label">
                                    {this.state.FeeAppendixInfo.IsActived}
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-row">
                            <div className="form-group col-md-2">
                                <label className="col-form-label bold">Hệ thống:</label>
                            </div>
                            <div className="form-group col-md-10">
                                <label className="col-form-label">
                                    {this.state.FeeAppendixInfo.IsSystem}
                                </label>
                            </div>
                        </div>
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