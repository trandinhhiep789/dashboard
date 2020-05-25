import React, { Component } from "react";
import { connect } from 'react-redux';
import ModelContainer from "../../../../common/components/Modal/ModelContainer";
import { ModalManager } from 'react-dynamic-modal';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import Select from 'react-select';
import MapContainer from './MapContainer ';
import { Link } from "react-router-dom";
import { callGetCache } from "../../../../actions/cacheAction";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import {  ERPCOMMONCACHE_PROVINCE, ERPCOMMONCACHE_DISTRICT, ERPCOMMONCACHE_WARD } from "../../../../constants/keyCache";

const style = {
    width: '100%',
    height: '100%',
    position: 'relative'
}

const containerStyle = {
    position: 'absolute',
    width: '98%',
    height: '300px'
}


class ShipmentOrderAddressCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ShipmentOrder: this.props.ShipmentOrderAddress,
            ShipmentOrderEdit: this.props.ShipmentOrderAddress,
            Province: [],
            District: [],
            Ward: []
        }
    }

    componentDidMount(){
        this.initCombobox();
    }

    initCombobox() {

        // tỉnh thành phố
        this.props.callGetCache(ERPCOMMONCACHE_PROVINCE).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                //console.log("FormElement listOption: ", listOption)
                this.setState({
                    Province: result.ResultObject.CacheData
                });
            }
        });

        // quận huyện
        this.props.callGetCache(ERPCOMMONCACHE_DISTRICT).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                //console.log("FormElement listOption: ", listOption)
                this.setState({
                    District: result.ResultObject.CacheData
                });
            }
        });


        // phường xã
        this.props.callGetCache(ERPCOMMONCACHE_WARD).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                //console.log("FormElement listOption: ", listOption)
                this.setState({
                    Ward: result.ResultObject.CacheData
                });
            }
        });
      

    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.ShipmentOrderAddress) !== JSON.stringify(nextProps.ShipmentOrderAddress)) {
            this.setState({
                ShipmentOrder: nextProps.ShipmentOrderAddress
            })
        }
    }
    handleUpdateAddressSender() {
        console.log("show modal update");
    }

    fetchPlaces(mapProps, map) {
        const { google } = mapProps;
        const service = new google.maps.places.PlacesService(map);
    }


    handleShowModalSender()
    {
        let { ShipmentOrderEdit } = this.state;

        this.setState({ ShipmentOrderEdit:ShipmentOrderEdit}, () => {
            this.ShowModalSender();
        });
    }
    ShowModalSender() {
        //cobombox

        ModalManager.open(
            <ModelContainer
                title="Cập nhật thông tin địa chỉ người gửi"
                name=""
                content={""}
                onRequestClose={() => false}
                onChangeModal={this.handleUpdateAddressSender.bind(this)}
            >
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label className="col-form-label">Họ và tên:</label>
                            </div>
                            <div className="form-group col-md-8">
                                <input className="form-control form-control-sm" value={this.state.ShipmentOrderEdit.SenderFullName} placeholder="Họ và tên" />
                            </div>
                        </div>
                    </div>
                    <div className="form-group col-md-6">
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label className="col-form-label">Số điện thoại:</label>
                            </div>
                            <div className="form-group col-md-8">
                                <input className="form-control form-control-sm"  value={this.state.ShipmentOrderEdit.SenderPhoneNumber} placeholder="Số điện thoại người gửi" />
                            </div>
                        </div>
                    </div>
                </div>
           
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label className="col-form-label">Tỉnh/thành phố:</label>
                            </div>
                            <div className="form-group col-md-8">
                            {/* <Select
                                value={{ value: -1, label: "--Vui lòng chọn--" }}
                                name={"name"}
                                options={{ value: -1, label: "--Vui lòng chọn--" }}
                                isMulti={false}
                                isSearchable={true}
                                className={"select"}
                            /> */}
                            </div>
                        </div>
                    </div>
                    <div className="form-group col-md-6">
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label className="col-form-label">Quận/huyện:</label>
                            </div>
                            <div className="form-group col-md-8">
                                <input defaultValue className="form-control form-control-sm" placeholder="Số điện thoại người gửi" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label className="col-form-label">Phường/xã:</label>
                            </div>
                            <div className="form-group col-md-8">
                                <input defaultValue className="form-control form-control-sm" placeholder="Họ và tên" />
                            </div>
                        </div>
                    </div>
                    <div className="form-group col-md-6">
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label className="col-form-label">Số nhà/đường:</label>
                            </div>
                            <div className="form-group col-md-8">
                                <input defaultValue className="form-control form-control-sm" placeholder="Số điện thoại người gửi" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label className="col-form-label">Tọa độ:</label>
                            </div>
                            <div className="form-group col-md-8">
                                <label className="col-form-label">{this.state.ShipmentOrderEdit.SenderGeoLocation}</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group col-md-6">
                        <button className="btn btnEditCard">chỉnh sửa</button>
                    </div>
                </div>

                <div className="form-row google-maps">
                    <MapContainer  SenderGeoLocation ={this.state.ShipmentOrderEdit.SenderGeoLocation} classStyle={style} classContainerStyle={containerStyle}/>
                </div>

            </ModelContainer>
        )
    }

    render() {
        return (
            <div className="card">
                <h4 className="card-title"><strong>Địa chỉ</strong></h4>
                <div className="card-body">
                    <div className="card">
                        <div className="card-title">
                            <h4 className="title">Ngưởi gửi</h4>
                            <button className="btn btnEditCard" onClick={this.handleShowModalSender.bind(this)}>chỉnh sửa</button>
                        </div>
                        <div className="card-body">
                            <div className="form-row">
                                <div className="form-group col-md-1">
                                    <label className="col-form-label icon">
                                        <i className="fa fa-user" aria-hidden="true"></i>
                                    </label>
                                </div>
                                <div className="form-group col-md-5">
                                    <label className="col-form-label" >{this.state.ShipmentOrder.SenderFullName}</label>
                                </div>
                                <div className="form-group col-md-1">
                                    <label className="col-form-label icon">
                                        <i className="fa fa-mobile " aria-hidden="true"></i>
                                    </label>
                                </div>
                                <div className="form-group col-md-5">
                                    <label className="col-form-label">{this.state.ShipmentOrder.SenderPhoneNumber}</label>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-1">
                                    <label className="col-form-label icon">
                                        <i className="fa fa-map-marker" aria-hidden="true"></i>
                                    </label>
                                </div>
                                <div className="form-group col-md-5">
                                    <label className="col-form-label" >{this.state.ShipmentOrder.SenderFullAddress}</label>
                                    <Link className="mapslink" to="/Maps">Xem bản đồ</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-title">
                            <h4 className="title">Người nhận</h4>
                            <button className="btn btnEditCard">chỉnh sửa</button>
                        </div>
                        <div className="card-body">
                            <div className="form-row">
                                <div className="form-group col-md-1">
                                    <label className="col-form-label icon">
                                        <i className="fa fa-user" aria-hidden="true"></i>
                                    </label>
                                </div>
                                <div className="form-group col-md-5">
                                    <label className="col-form-label" >{this.state.ShipmentOrder.ReceiverFullName}</label>
                                </div>
                                <div className="form-group col-md-1">
                                    <label className="col-form-label icon">
                                        <i className="fa fa-mobile " aria-hidden="true"></i>
                                    </label>
                                </div>
                                <div className="form-group col-md-5">
                                    <label className="col-form-label">{this.state.ShipmentOrder.ReceiverPhoneNumber}</label>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-1">
                                    <label className="col-form-label icon">
                                        <i className="fa fa-map-marker" aria-hidden="true"></i>
                                    </label>
                                </div>
                                <div className="form-group col-md-5">
                                    <label className="col-form-label" >{this.state.ShipmentOrder.ReceiverFullAddress}</label>
                                    <Link className="mapslink" to="/Map">Xem bản đồ</Link>
                                </div>
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        }
    }
}


const ShipmentOrderAddress = connect(mapStateToProps, mapDispatchToProps)(ShipmentOrderAddressCom);
export default ShipmentOrderAddress;
