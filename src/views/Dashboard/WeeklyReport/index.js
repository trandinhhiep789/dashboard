import React, { Component } from 'react';
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../actions/fetchAPIAction";
import { formatDate } from "../../../common/library/CommonLib.js";
import { HorizontalBar } from 'react-chartjs-2';


class WeeklyReportCom extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
    }



    render() {
        let dataSource = [];
        if ( this.props.DataSource != null && this.props.DataSource.length > 0) {
            dataSource = this.props.DataSource[0].WeekShipmentOrderCoordList;
        }
        const label = [];
        const data1 = [];
        if (dataSource.length > 0) {
            dataSource.map((item, i) => {
                label.push(formatDate(item.DateDay,true))
                data1.push(item.CoutShip)
            })
        }

        const data = {
            labels: label,
            datasets: [{
                label: 'Ngày điều phối nhiều nhất',
                data: data1,
                fill: false,
                borderColor: '#5b9bd5',
                backgroundColor: '#5b9bd5',
                pointBorderColor: '#5b9bd5',
                pointBackgroundColor: '#5b9bd5',
                pointHoverBackgroundColor: '#5b9bd5',
                pointHoverBorderColor: '#5b9bd5',
            }]
        };

        return (
            <div className="col-md-12 col-md-7 col-lg-7">
                <div className="card shadow-1">
                    <div className="card-header">
                        <h5 className="card-title">biểu đồ điều phối trong tuần</h5>
                    </div>
                    <div className="card-body">
                    <HorizontalBar data={data} height={197} />
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