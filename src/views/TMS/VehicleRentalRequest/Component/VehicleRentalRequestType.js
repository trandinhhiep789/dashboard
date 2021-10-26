import React, { Component } from "react";
import { connect } from 'react-redux';
import { ModalManager } from 'react-dynamic-modal';
import ModelContainer from "../../../../common/components/Modal/ModelContainer";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { callGetCache, callGetUserCache } from "../../../../actions/cacheAction";
import MultiSelectComboBox from "../../../../common/components/FormContainer/FormControl/MultiSelectComboBox";
import FormControl from "../../../../common/components/FormContainer/FormControl";
import { MessageModal } from "../../../../common/components/Modal";
import Select from 'react-select';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Link, Redirect, useHistory, withRouter } from "react-router-dom";
import {

    AddLink,
} from "../constants";

import { showModal, hideModal } from '../../../../actions/modal';
import { GET_CACHE_USER_FUNCTION_LIST } from "../../../../constants/functionLists";

class VehicleRentalRequestTypeCom extends Component {
    constructor(props) {
        super(props);
        this.handleOnValueChange = this.handleOnValueChange.bind(this);
        this.getCacheKey = this.getCacheKey.bind(this)
        this.state = {
            IsCallAPIError: false,
            IsCloseForm: false,
            VehicleRentalReqTypeID: '',
            RequestStoreID: '',
            MessageError: '',
            MessageErrorRequestStore: '',
            VehicleRentalReqType: []
        }
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        this.getCacheKey();
    }

    handleCloseMessage() {
        this.setState({ IsCloseForm: true });
    }

    getCacheKey() {
        this.props.callGetCache("ERPCOMMONCACHE.VEHICLERENTALREQTYPE").then(apiResult => {
            console.log("cache", apiResult)
            if (apiResult.IsError) {
                this.showMessage(apiResult.Message)
            }
            else {

                this.setState({
                    VehicleRentalReqType: apiResult.ResultObject.CacheData
                })
            }
        })
    }


    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
                onCloseModal={this.handleCloseMessage}
            />
        );
    }

    handleOnValueChange(name, value) {
        if (name == 'cboRequestStore') {
            if (value > 0) {
                this.setState({
                    RequestStoreID: value,
                    MessageErrorRequestStore: ''
                })
            }
            else {
                this.setState({
                    RequestStoreID: value,
                    MessageErrorRequestStore: 'Vui lòng chọn kho yêu cầu',
                })
            }
        }
        if (name == 'cbVehicleRentalReqType') {
            if (value > 0) {
                this.setState({
                    VehicleRentalReqTypeID: value,
                    MessageError: ''
                })
            }
            else {
                this.setState({
                    VehicleRentalReqTypeID: value,
                    MessageError: 'Vui lòng chọn loại yêu cầu hủy vật tư',
                })
            }
        }


    }

    handleCloseModal() {
        this.props.hideModal();
    }

    handleSubmit = () => {
        const { VehicleRentalReqTypeID, RequestStoreID, VehicleRentalReqType } = this.state;


        if (VehicleRentalReqTypeID > 0 && RequestStoreID > 0) {
            this.setState({
                MessageError: ''
            })
            const VehicleRentalReqTypeItem = VehicleRentalReqType.find(n => n.VehicleRentalReqTypeID == VehicleRentalReqTypeID);
            console.log("VehicleRentalReqTypeItem", VehicleRentalReqTypeItem)

            this.checkPermission(VehicleRentalReqTypeItem.AddFunctionID).then(result => {
                console.log("permission", result)
                if (result == true) {
                    this.props.history.push(AddLink, {
                        VehicleRentalReqTypeID: VehicleRentalReqTypeID,
                        RequestStoreID: RequestStoreID,
                        AddFunctionID: VehicleRentalReqTypeItem.AddFunctionID
                    })
                } else {
                    this.showMessage("Bạn không có quyền xóa!")
                }
            })
        }
        else {
            if (VehicleRentalReqTypeID < 0 || VehicleRentalReqTypeID == "") {
                this.setState({
                    MessageError: 'Vui lòng chọn loại yêu cầu thuê xe',
                })
            }
            if (RequestStoreID < 0 || RequestStoreID == "") {
                this.setState({
                    MessageErrorRequestStore: 'Vui lòng chọn kho yêu cầu',
                })
            }

        }



    }


    checkPermission(permissionKey) {
        return new Promise((resolve, reject) => {
            this.props.callGetUserCache(GET_CACHE_USER_FUNCTION_LIST).then((result) => {
                if (!result.IsError && result.ResultObject.CacheData != null) {
                    for (let i = 0; i < result.ResultObject.CacheData.length; i++) {
                        if (result.ResultObject.CacheData[i].FunctionID == permissionKey) {
                            resolve(true);
                            return;
                        }
                    }
                    resolve(false)
                } else {
                    resolve('error');
                }
            });
        });
    }

    render() {
        return (
            <div className="card modalForm">
                <div className="card-body">
                    <div className="form-row">
                        <div className="col-md-12">
                            <FormControl.FormControlComboBox
                                name="cbVehicleRentalReqType"
                                colspan="8"
                                labelcolspan="4"
                                label="Loại yêu cầu thuê xe"
                                isautoloaditemfromcache={true}
                                loaditemcachekeyid="ERPCOMMONCACHE.VEHICLERENTALREQTYPE"
                                valuemember="VehicleRentalReqTypeID"
                                nameMember="VehicleRentalReqTypeName"
                                controltype="InputControl"
                                onValueChange={this.handleOnValueChange}
                                value={this.state.VehicleRentalReqTypeID}
                                listoption={null}
                                datasourcemember="VehicleRentalReqTypeID"
                                placeholder="---Vui lòng chọn---"
                                validationErrorMessage={this.state.MessageError}
                                isMultiSelect={false}
                                validatonList={["Comborequired"]}
                            //disabled={}
                            />
                        </div>
                        <div className="col-md-12">

                            <FormControl.FormControlComboBox
                                name="cboRequestStore"
                                colspan="8"
                                labelcolspan="4"
                                label="kho yêu cầu"
                                validatonList={["Comborequired"]}
                                placeholder="-- Vui lòng chọn --"
                                isautoloaditemfromcache={true}
                                isusercache={true}
                                onValueChange={this.handleOnValueChange}
                                loaditemcachekeyid="ERPCOMMONCACHE.USER_COOSTORE_BYUSER"
                                valuemember="StoreID"
                                nameMember="StoreName"
                                controltype="InputControl"
                                value={this.state.RequestStoreID}
                                listoption={null}
                                validationErrorMessage={this.state.MessageErrorRequestStore}
                                datasourcemember="StoreID" />
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-primary" type="button" onClick={this.handleSubmit.bind(this)}> Tạo yêu cầu</button>
                    <button type="button" className="btn btn-export ml-10" title="" onClick={this.handleCloseModal.bind(this)}>Đóng</button>
                </div>
            </div>
        )
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
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: (type, props) => {
            dispatch(hideModal(type, props));
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
        callGetUserCache: (cacheKeyID) => {
            return dispatch(callGetUserCache(cacheKeyID));
        },
    }
}


const VehicleRentalRequestType = connect(mapStateToProps, mapDispatchToProps)(withRouter(VehicleRentalRequestTypeCom));
export default VehicleRentalRequestType;