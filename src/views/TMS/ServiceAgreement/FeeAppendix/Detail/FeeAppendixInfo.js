import React, { Component } from "react";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";

class FeeAppendixInfoInfoCom extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
         console.log('FeeAppendixInfoInfoCom', this.props)
    }


    render() {
        return (
            <React.Fragment>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Tên phụ lục:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">11</label>
                    </div><div className="form-group col-md-2">
                        <label className="col-form-label bold">Loại thời vụ:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            22
                        </label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Từ ngày:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">333</label>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Đến ngày:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">444</label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Mô tả:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <label className="col-form-label">555</label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Kích hoạt:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <label className="col-form-label">66</label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Hệ thống:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <label className="col-form-label">67</label>
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