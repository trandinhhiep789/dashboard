import React, { Component } from 'react';
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../actions/fetchAPIAction";
import { formatDate } from "../../../common/library/CommonLib.js";


class ProcessHistoryCom extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
    }



    render() {
        const dataSource = this.props.DataSource;
        return (
            <div className="col-12 col-md-7 col-lg-7">
                <div className="card shadow-1 Process-history">
                    <div className="card-header">
                        <h5 className="card-title">Nhật ký xử lý</h5>
                    </div>
                    <div className="card-body">
                        <div className="jsgrid">
                            <div className="jsgrid-grid-header jsgrid-header-scrollbar">
                                <table className="jsgrid-table">
                                    <thead className="jsgrid-header-row">
                                        <tr>
                                            <th className="jsgrid-header-cell" style={{ width: '20%' }} >Mã vận đơn</th>
                                            <th className="jsgrid-header-cell" style={{ width: '20%' }}>Thời gian xử lý</th>
                                            <th className="jsgrid-header-cell" style={{ width: '60%' }} >Nội dung</th>
                                        </tr>
                                    </thead>
                                </table>
                                
                            </div>
                            <div className="jsgrid-grid-body">
                                    <table className="jsgrid-table">
                                        <tbody>
                                            {dataSource != null &&
                                                dataSource.map((rowItem, rowIndex) => {
                                                    let rowClass = "jsgrid-row";
                                                    if (index % 2 != 0) {
                                                        rowClass = "jsgrid-alt-row";
                                                    }
                                                    return (<tr key={rowIndex} className="jsgrid-row">
                                                        <td className="jsgrid-cell" style={{ width: '20%' }}>{rowItem.ShipmentOrderID}</td>
                                                        <td className="jsgrid-cell" style={{ width: '20%' }}>{formatDate(rowItem.CreatedDate)}</td>
                                                        <td className="jsgrid-cell" style={{ width: '60%' }}>{rowItem.ActionContent}</td>
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