import React, { Component } from 'react';
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../actions/fetchAPIAction";


class ProcessHistoryCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
   
        };
    }

    componentDidMount() {
    }



    render() {

        return (
            <div className="col-12 col-md-5 col-lg-5">
                <div className="card shadow-1">
                    <div className="card-header">
                        <h5 className="card-title">Nhật ký xử lý</h5>
                    </div>
                    <div className="card-body">
                        Table
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

const ProcessHistory = connect(mapStateToProps, mapDispatchToProps)(ProcessHistoryCom);
export default ProcessHistory;