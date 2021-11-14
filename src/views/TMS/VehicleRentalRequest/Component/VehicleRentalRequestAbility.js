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
    APIHostName,
    UpdateProcessAPIPath
} from "../constants";

import { showModal, hideModal } from '../../../../actions/modal';
import { GET_CACHE_USER_FUNCTION_LIST } from "../../../../constants/functionLists";

class VehicleRentalRequestAbilityCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            IsCallAPIError: false,
            IsCloseForm: false,
            MessageError: '',
            SelectItem: 0,
            optionItem: this.props.optionItem,
            VehicleRentalRequestItem: this.props.VehicleRentalRequestItem
        }
        this.notificationDOMRef = React.createRef();
        this.handleCloseMessage = this.handleCloseMessage.bind(this)

    }

    componentDidMount() {

    }

    handleCloseMessage() {
        this.setState({ IsCloseForm: true });
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

    handleSubmit = () => {
        const { SelectItem, optionItem, VehicleRentalRequestItem } = this.state;
        console.log("submit", SelectItem,VehicleRentalRequestItem, optionItem)
        this.props.hideModal();
        let valueNextStep =optionItem.valueNextStep;
        let ChooseFunctionID = optionItem.ChooseFunctionID;
        if (ChooseFunctionID != "") {
            this.checkPermission(ChooseFunctionID).then(result => {
                if (result) {
                    let MLObject = {}
                    MLObject.VehicleRentalRequestID = VehicleRentalRequestItem.VehicleRentalRequestID;
                    MLObject.VehicleRentalRequestTypeID = VehicleRentalRequestItem.VehicleRentalRequestTypeID;
                    MLObject.RequestDate = VehicleRentalRequestItem.RequestDate;
                    MLObject.NextVehicleRentalRequestStepID = valueNextStep;
                    MLObject.VehicleID = VehicleRentalRequestItem.VehicleID;
                    MLObject.StartTime = VehicleRentalRequestItem.StartTime;
                    MLObject.EndTime = VehicleRentalRequestItem.EndTime;
                    MLObject.StoreID = VehicleRentalRequestItem.StoreID;
                    MLObject.ChooseFunctionID = ChooseFunctionID;
                    MLObject.Ability = SelectItem.value;
                    MLObject.CurrentVehicleRentalRequestStepID = VehicleRentalRequestItem.CurrentVehicleRentalRequestStepID
                    MLObject.CurrentVehicleRentalStatusID= VehicleRentalRequestItem.CurrentVehicleRentalStatusID

                    console.log("checkPermission:", result, MLObject)
                    this.props.callFetchAPI(APIHostName, UpdateProcessAPIPath, MLObject).then(apiResult => {
                        if (this.props.onUpdateAbility)
                            this.props.onUpdateAbility(apiResult)
                    });

                }
                else {
                    this.showMessage("Bạn không có quyền chuyển bước.")
                }
            })
        }
        else {
            this.showMessage("Bạn không có quyền chuyển bước.")
        }

    }

    handleValueChange(selectedOption) {
        this.setState({
            SelectItem: { value: selectedOption.value, label: selectedOption.value + '%' }
        });
        console.log("object", selectedOption)
    }

    handleCloseModal() {
        this.props.hideModal();
    }


    render() {
        const listOption = [
            { value: 50, label: '50%' },
            { value: 60, label: '60%' },
            { value: 70, label: '70%' },
            { value: 80, label: '80%' },
            { value: 90, label: '90%' },
            { value: 100, label: '100%' },
        ]
        return (
            <div className="card modalForm">
                <div className="card-body">
                    <div className="form-row">
                        <div className="col-md-12">
                            <Select
                                value={this.state.SelectItem}
                                onChange={this.handleValueChange.bind(this)}
                                options={listOption}
                                placeholder={"--Vui lòng chọn--"}
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


const VehicleRentalRequestAbility = connect(mapStateToProps, mapDispatchToProps)(withRouter(VehicleRentalRequestAbilityCom));
export default VehicleRentalRequestAbility;