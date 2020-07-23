import React, { Component } from 'react';
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../actions/fetchAPIAction";


class WeeklyReportCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
   
        };
    }

    componentDidMount() {
    }



    render() {

        return (
            <div className="col-md-12 col-md-7 col-lg-7">
                <div className="card shadow-1">
                    <div className="card-header">
                        <h5 className="card-title">biểu đồ điều phối trong tuần</h5>
                    </div>
                    <div className="card-body">
                        aa
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

const WeeklyReport = connect(mapStateToProps, mapDispatchToProps)(WeeklyReportCom);
export default WeeklyReport;