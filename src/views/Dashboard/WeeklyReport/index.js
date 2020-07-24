import React, { Component } from 'react';
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../actions/fetchAPIAction";
import { formatDate } from "../../../common/library/CommonLib.js";


class WeeklyReportCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
   
        };
    }

    componentDidMount() {
    }



    render() {
        const dataSource = this.props.DataSource[0].WeekShipmentOrderCoordList;
        return (
            <div className="col-md-12 col-md-7 col-lg-7">
            <div className="card shadow-1">
                <div className="card-header">
                        <h5 className="card-title">biểu đồ điều phối trong tuần</h5>
                    </div>
                    <div className="card-body">
                        <div className=" table-responsive">
                            <table className="table table-sm table-striped table-bordered table-hover table-condensed" cellSpacing="0" >
                                <thead className="thead-light">
                                    <tr>
                                        <th className="jsgrid-header-cell" style={{ width: 190, minWidth: 190 }} >Ngày</th>
                                        <th className="jsgrid-header-cell" style={{ width: 300, minWidth: 350 }}>Số lượng điều phối</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataSource != null &&
                                        dataSource.map((rowItem, rowIndex) => {
                                            let rowClass = "jsgrid-row";
                                            if (index % 2 != 0) {
                                                rowClass = "jsgrid-alt-row";
                                            }
                                            return (<tr key={rowIndex}>
                                               <td>{formatDate(rowItem.DateDay)}</td>
                                               <td>{rowItem.CoutShip}</td>
                                            </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
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