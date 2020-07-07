import React, { Component } from "react";
import { connect } from 'react-redux';
import { formatDate } from "../../../../common/library/CommonLib.js";
import { showModal, hideModal } from '../../../../actions/modal';
import { MODAL_TYPE_COMMONTMODALS, MODAL_TYPE_IMAGE_SLIDE } from '../../../../constants/actionTypes';
import ModelContainer from "../../../../common/components/Modal/ModelContainer";
import { ModalManager } from 'react-dynamic-modal';
import MapContainer from './MapContainer ';

const containerStyle = {
    position: 'absolute',
    width: '98%',
    height: '250px'
}
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

    handleShowImage(e) {
        let images = [];
        const objIme = e.currentTarget.dataset.id;
        const objlst = objIme.split(",");
        for (let i = 0; i < objlst.length; i++) {
            images.push({ original: objlst[i], thumbnail: objlst[i] });
        }
        this.props.showModal(MODAL_TYPE_IMAGE_SLIDE, {
            title: 'Danh sách hình ảnh',
            content: {
                lstImage: images
            },
        });
    }

    handleShowGeoLocation(e)
    {
        const objIme = e.currentTarget.dataset.id;
        ModalManager.open(
            <ModelContainer
                title="Tọa độ GPS"
                name=""
                content={""}
                IsButton={true}
                onRequestClose={() => false}
            >
                <div className="form-row google-maps">
                    <MapContainer
                        SenderGeoLocation={objIme}
                        isGeoLocation={false}
                        classContainerStyle={containerStyle}
                    />
                </div>
            </ModelContainer>
        )
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
                                    <th className="jsgrid-header-cell" style={{ width: 100 }} >Thời gian</th>
                                    <th className="jsgrid-header-cell" style={{ width: 250 }} >Bước xử lý</th>
                                    <th className="jsgrid-header-cell" style={{ width: 150 }} >Nhân viên</th>
                                    <th className="jsgrid-header-cell" style={{ width: 150 }} >Hình ảnh</th>
                                    <th className="jsgrid-header-cell" style={{ width: 50 }} >Tọa độ GPS</th>
                                    <th className="jsgrid-header-cell" style={{ width: 250 }} >Ghi chú</th>
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
                                                <ul className="img-group" data-id={item.ImageFileURL} onClick={this.handleShowImage.bind(this)}>
                                                    {objlst[0] != "" && objlst.map((item, index) =>
                                                        <li key={index}>
                                                            <div className="img-item">
                                                                <img src={item} />
                                                            </div>
                                                        </li>
                                                    )}

                                                </ul>
                                            </td>
                                            <td>
                                                {(item.ProcessGeoLocation != "" && item.ProcessGeoLocation != null) ?
                                                (<button className="btn btn-icon-modal" data-id={item.ProcessGeoLocation} onClick={this.handleShowGeoLocation.bind(this)}><i className="fa fa-map-marker"></i></button>) : ""}
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