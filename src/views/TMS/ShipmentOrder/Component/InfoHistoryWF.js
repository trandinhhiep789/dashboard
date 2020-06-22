import React, { Component } from "react";
import { connect } from 'react-redux';
import { formatDate } from "../../../../common/library/CommonLib.js";
import { showModal, hideModal } from '../../../../actions/modal';
import { MODAL_TYPE_COMMONTMODALS, MODAL_TYPE_IMAGE_SLIDE } from '../../../../constants/actionTypes';


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

    handleShowImage() {
        const { ShipmentOrderType_WF } = this.state;
        console.log('ShipmentOrderType_WF', ShipmentOrderType_WF)
        const images = [
            {
                original: 'https://picsum.photos/id/1018/1000/600/',
                thumbnail: 'https://picsum.photos/id/1018/250/150/',
            },
            {
                original: 'https://picsum.photos/id/1015/1000/600/',
                thumbnail: 'https://picsum.photos/id/1015/250/150/',
            },
        ];


        this.props.showModal(MODAL_TYPE_IMAGE_SLIDE, {
            title: 'Danh sách hình ảnh',
            content: {
                lstImage: images
            },
        });
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
                                    const objlst = item.ImageFileURL.split(",");
                                    if (item.ProcessDate != null) {
                                        return (<tr key={index}>
                                            <td>{formatDate(item.ProcessDate)}</td>
                                            <td>{item.ShipmentOrderStepName}</td>
                                            <td>{item.ProcessUser}</td>
                                            <td>
                                                <ul className="img-group" onClick={this.handleShowImage.bind(this)}>
                                                    {objlst[0] != "" && objlst.map((item, index) =>
                                                        <li key={index}>
                                                            <div className="img-item">
                                                                <img src={item} />
                                                            </div>
                                                        </li>
                                                    )}

                                                </ul>
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
        },
        hideModal: () => {
            dispatch(hideModal());
        }
    }
}


const InfoHistoryWF = connect(mapStateToProps, mapDispatchToProps)(InfoHistoryWFCom);
export default InfoHistoryWF;