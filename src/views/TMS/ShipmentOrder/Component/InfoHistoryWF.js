import React, { Component } from "react";
import { connect } from 'react-redux';
import { formatDate } from "../../../../common/library/CommonLib.js";
class InfoHistoryWFCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ShipmentOrderType_WF: this.props.InfoHistoryWF
        }
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.InfoHistoryWF) !== JSON.stringify(nextProps.InfoHistoryWF)) {
            this.setState({
                ShipmentOrderType_WF: nextProps.InfoHistoryWF
            })
        }
    }

    render() {
        var a = this.state.ShipmentOrderType_WF.sort((a, b) => new Date(a.ProcessDate) - new Date(b.ProcessDate));
        return (
            <div className="card">
                <h4 className="card-title"><strong>Lịch sử xử lý</strong></h4>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                            <thead className="thead-light">
                                <tr>
                                    <th className="jsgrid-header-cell">Thời gian</th>
                                    <th className="jsgrid-header-cell">Bước xử lý</th>
                                    <th className="jsgrid-header-cell">Nhân viên</th>
                                    <th className="jsgrid-header-cell">Hình ảnh</th>
                                    <th className="jsgrid-header-cell">Ghi chú</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.ShipmentOrderType_WF && a.map((item, index) => {
                                    if (item.ProcessDate != null) {
                                        return (<tr key={index}>
                                            <td>{formatDate(item.ProcessDate)}</td>
                                            <td>{item.ShipmentOrderStepName}</td>
                                            <td>{item.ProcessUser}</td>
                                            <td>
                                                <div className="media">
                                                    <img className="avatar" src='http://wfimagecdn.tterpbeta.vn/Normal_3b026f1e-8ce0-44a2-bc02-2c1ec1ac2561_202005211115.jpg' />
                                                    <img className="avatar" src='http://wfimagecdn.tterpbeta.vn/Normal_3b026f1e-8ce0-44a2-bc02-2c1ec1ac2561_202005211115.jpg' />
                                                    <img className="avatar" src='http://wfimagecdn.tterpbeta.vn/Normal_3b026f1e-8ce0-44a2-bc02-2c1ec1ac2561_202005211115.jpg' />
                                                    <img className="avatar" src='http://wfimagecdn.tterpbeta.vn/Normal_3b026f1e-8ce0-44a2-bc02-2c1ec1ac2561_202005211115.jpg' />

                                                </div>

                                            </td>
                                            <td>{item.Note}</td>
                                        </tr>)
                                    }
                                })}
                            </tbody>
                        </table>
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        }
    }
}


const InfoHistoryWF = connect(mapStateToProps, mapDispatchToProps)(InfoHistoryWFCom);
export default InfoHistoryWF;