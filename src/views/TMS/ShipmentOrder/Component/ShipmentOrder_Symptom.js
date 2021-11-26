import React, { Component } from "react";
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';

import { formatDate } from "../../../../common/library/CommonLib.js";
import { showModal, hideModal } from '../../../../actions/modal';
import { MODAL_TYPE_COMMONTMODALS, MODAL_TYPE_IMAGE_SLIDE } from '../../../../constants/actionTypes';
import ModelContainerMap from "../../../../common/components/Modal/ModelContainerMap";
import { ModalManager } from 'react-dynamic-modal';
import MapContainer from './MapContainer ';
import { millisToMinutesAndSeconds } from '../../../../utils/function'


const containerStyle = {
    position: 'absolute',
    width: '98%',
    height: 'calc(100vh - 50%)'//'480px'
}
class ShipmentOrder_SymptomCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ShipmentOrder_SymptomList: this.props.ShipmentOrder_SymptomList
        }

        this.CompareTime = this.CompareTime.bind(this);
        this.renderItemImage = this.renderItemImage.bind(this);
        this.renderThumbInner = this.renderThumbInner.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.ShipmentOrder_SymptomList) !== JSON.stringify(nextProps.ShipmentOrder_SymptomList)) {
            this.setState({
                ShipmentOrder_SymptomList: nextProps.ShipmentOrder_SymptomList
            })
        }
    }

    CompareTime(datetimeago, datetimelater) {
        let timeDiff = Math.abs(datetimelater - datetimeago);
        const result = millisToMinutesAndSeconds(timeDiff);
        return result;
    }

    renderItemImage(original, description, versionApp) {
        return <div className="image-gallery-image image-gallery-image-custom">
            <img src={original} title={description} />
            <span className="image-gallery-description-custom d-flex justify-content-around">
                <div>{description}</div>
                <div>{versionApp}</div>
            </span>
        </div>;
    }

    renderThumbInner(original) {
        return <div className="image-gallery-thumbnails-custom">
            <div className="image-thumbnails-item-custom" style={{ backgroundImage: `url(${original})` }}></div>
        </div>
    }

    handleShowImage(e) {
        let images = [], dtCaptureTime = "", datetimeago = 0, datetimelater = 0;
        const objIme = e.currentTarget.dataset.id;
        const objlst = objIme.split(";");

        for (let i = 0; i < objlst.length; i++) {
            if (JSON.parse(objlst[i]).SampleImageId == 59) {
                datetimeago = JSON.parse(objlst[i]).ImageCaptureTimeNumber;
            }
            if (JSON.parse(objlst[i]).SampleImageId == 60) {
                datetimelater = JSON.parse(objlst[i]).ImageCaptureTimeNumber;
            }

            if (datetimeago > 0 && datetimelater > 0) {
                dtCaptureTime = this.CompareTime(datetimeago, datetimelater);
            }

            const description = `${JSON.parse(objlst[i]).SampleImageId} ${JSON.parse(objlst[i]).SampleImageName && '-'} ${JSON.parse(objlst[i]).SampleImageName}${JSON.parse(objlst[i]).SampleImageId == 60 ? ", " + dtCaptureTime : ""}`;

            images.push({
                original: JSON.parse(objlst[i]).ImageFileURL,
                thumbnail: JSON.parse(objlst[i]).ImageFileURL,
                ImageCaptureGeoLocation: JSON.parse(objlst[i]).ImageCaptureGeoLocation,
                ImageCaptureTimeNumber: JSON.parse(objlst[i]).ImageCaptureTimeNumber,
                renderItem: () => this.renderItemImage(JSON.parse(objlst[i]).ImageFileURL, description, JSON.parse(objlst[i]).note),
                renderThumbInner: () => this.renderThumbInner(JSON.parse(objlst[i]).ImageFileURL)
            });
        }

        this.props.showModal(MODAL_TYPE_IMAGE_SLIDE, {
            title: 'Danh sách hình ảnh ',
            ImageCaptureGeoLocation: JSON.parse(objlst[0]).ImageCaptureGeoLocation,
            content: {
                lstImage: images
            },
        });
    }

    handleShowGeoLocation(e) {
        const objIme = e.currentTarget.dataset.id;
        ModalManager.open(
            <ModelContainerMap
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
            </ModelContainerMap>
        )
    }

    render() {
        // var a = this.state.ShipmentOrderType_WF.sort((a, b) => new Date(a.ProcessDate) - new Date(b.ProcessDate));
        // let InfoActionLogLst = this.state.ShipmentOrder_SymptomList.sort((a, b) => new Date(a.CreatedDate) - new Date(b.CreatedDate));

        return (
            <div className="card">
                <h4 className="card-title"><strong>Lỗi thực tế do nhân viên cập nhật</strong></h4>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                            <thead className="thead-light">
                                <tr>
                                    <th className="jsgrid-header-cell" style={{ width: 250 }} >Mã lỗi</th>
                                    <th className="jsgrid-header-cell" style={{ width: 250 }} >Tên lỗi</th>
                                    <th className="jsgrid-header-cell" style={{ width: 250 }} >Thời gian</th>
                                    <th className="jsgrid-header-cell" style={{ width: 250 }} >Nhân viên</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.ShipmentOrder_SymptomList && this.state.ShipmentOrder_SymptomList.map((item, index) => {
                                    return (<tr key={index}>
                                        <td>{item.SymptomID}</td>
                                        <td>{item.SymptomName}</td>
                                        <td>{formatDate(item.CreatedDate)}</td>
                                        <td>{item.CreatedUserFullName}</td>
                                    </tr>)
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


const ShipmentOrder_Symptom = connect(mapStateToProps, mapDispatchToProps)(ShipmentOrder_SymptomCom);
export default ShipmentOrder_Symptom;