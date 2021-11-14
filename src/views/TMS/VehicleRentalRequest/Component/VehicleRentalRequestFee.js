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

class VehicleRentalRequestFeeCom extends Component {
    constructor(props) {
        super(props);
        this.handleOnValueChange = this.handleOnValueChange.bind(this);
        this.getCacheKey = this.getCacheKey.bind(this)
        this.handleCloseMessage = this.handleCloseMessage.bind(this)
        this.state = {
            IsCallAPIError: false,
            IsCloseForm: false,
            Cost: 0,
            MessageError: '',
            SelectItem: this.props.MLObject[0]
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
        console.log("fee", name, value, this.props)

        this.setState({
            Cost: value
        })

    }

    handleCloseModal() {
        this.props.hideModal();
    }

    handleSubmit = () => {
        const { SelectItem, Cost } = this.state;
        SelectItem.Cost = Cost
        console.log("submit", SelectItem, Cost)
        this.props.hideModal();
        if (this.props.onSelect)
            this.props.onSelect(SelectItem)
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
                            <FormControl.TextBoxCurrency
                                name="txtCost"
                                colspan="8"
                                labelcolspan="4"
                                readOnly={false}
                                label="Chi phí"
                                placeholder="Chi phí"
                                controltype="InputControl"
                                value={this.state.Cost}
                                datasourcemember="Cost"
                                maxSize={15}
                                onValueChange={this.handleOnValueChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-primary" type="button" onClick={this.handleSubmit.bind(this)}> Cập nhật</button>
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


const VehicleRentalRequestFee = connect(mapStateToProps, mapDispatchToProps)(withRouter(VehicleRentalRequestFeeCom));
export default VehicleRentalRequestFee;