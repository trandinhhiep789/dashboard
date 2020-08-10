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
                <div className="card shadow-1">
                    <div className="card-header">
                        <h5 className="card-title">Nhật ký xử lý</h5>
                    </div>
                    <div className="card-body">
                        <div className=" table-responsive">
                            <table className="table table-sm table-striped table-bordered table-hover table-condensed" cellSpacing="0" >
                                <thead className="thead-light">
                                    <tr>
                                        <th className="jsgrid-header-cell" style={{ width: 150 }} >Mã vận đơn</th>
                                        <th className="jsgrid-header-cell" style={{ width: 150 }}>Thời gian xử lý</th>
                                        <th className="jsgrid-header-cell" style={{ width: 700}} >Nội dung</th>
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
                                                  <td>{rowItem.ShipmentOrderID}</td>
                                                  <td>{formatDate(rowItem.CreatedDate)}</td>
                                                  <td>{rowItem.ActionContent}</td>
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