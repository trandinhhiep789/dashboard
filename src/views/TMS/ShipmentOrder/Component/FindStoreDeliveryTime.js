import React, { Component } from "react";
import { connect } from 'react-redux';
import { ModalManager } from 'react-dynamic-modal';
import ModelContainer from "../../../../common/components/Modal/ModelContainer";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { callGetCache } from "../../../../actions/cacheAction";
import MultiSelectComboBox from "../../../../common/components/FormContainer/FormControl/MultiSelectComboBox";
import FormControl from "../../../../common/components/FormContainer/FormControl";
import { MessageModal } from "../../../../common/components/Modal";
import Select from 'react-select';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Link, Redirect, useHistory, withRouter } from "react-router-dom";
import {

    MLObjectExpectedDeliveryNew,
} from "../constants";
import FormContainer from "../../../../common/components/FormContainer";
import { Menu, Dropdown } from 'antd';

import { showModal, hideModal } from '../../../../actions/modal';
import { ERPCOMMONCACHE_TMS_SERVICETYPE, ERPCOMMONCACHE_SERVICEREQUESTTYPE, ERPCOMMONCACHE_PARTNER_CUSTOMER } from "../../../../constants/keyCache";

class FindStoreDeliveryTimeCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            IsCallAPIError: false,
            IsCloseForm: false,
            ServiceRequestTypeID: '',
            MessageError: '',
            MessageErrorValueTime: '',
            DeliveryTimeAllGroup: this.props.DeliveryTimeAllGroup,
            ListSuggestTime: [],
            DeliveryTime: "",
            MLObject: this.props.MLObject,
            valueDate: '',
            valueTime: "",
            ListSuggestTimeChildren: []


        }
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
    }

    handleCloseMessage() {
        this.setState({ IsCloseForm: true });
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



    handleCloseModal() {
        this.props.hideModal();
    }

    handleSubmit(formData, MLObject) {
        console.log("submit", formData, MLObject)
    
    }
   
    handleChangeForm(formData, MLObject) {
        console.log("object", formData, MLObject)
        const { ListSuggestTimeChildren, DeliveryTimeAllGroup } = this.state;

        if (formData.cbDeliveryDate.value > 0 || formData.cbDeliveryDate.value != undefined) {
            const ListSuggestTimeChildren = DeliveryTimeAllGroup.find(e => { return e.value == formData.cbDeliveryDate.value })
            this.setState({
                ListSuggestTimeChildren: ListSuggestTimeChildren.children
            })
        }

    }

    render() {
        const { DeliveryTimeAllGroup, ListSuggestTime } = this.state;

        console.log("â", this.state.ListSuggestTimeChildren)
        return (

            <FormContainer
                // FormName='Cập nhật thời gian giao dự kiến'
                MLObjectDefinition={MLObjectExpectedDeliveryNew}
                listelement={[]}
                // BackLink={BackLink}
                onSubmit={this.handleSubmit.bind(this)}
                onchange={this.handleChangeForm.bind(this)}
            >
                <div className="form-row">
                    <div className="col-md-6">

                        <FormControl.FormControlComboBox
                            name="cbDeliverydateUpdateReasonID"
                            label="Lý do thay đổi"
                            isautoloaditemfromcache={true}
                            loaditemcachekeyid="ERPCOMMONCACHE.DELIVERYDATEUPDATEREASON"
                            valuemember="DeliverydateUpdateReasonID"
                            nameMember="DeliverydateUpdateReasonName"
                            controltype="InputControl"
                            value={-1}
                            listoption={[]}
                            datasourcemember="DeliverydateUpdateReasonID"
                            labelcolspan={4}
                            colspan={8}
                            validatonList={["Comborequired"]}
                        />

                    </div>
                    <div className="col-md-6"></div>
                    <div className="col-md-6">
                        <FormControl.FormControlComboBox
                            name="cbDeliveryDate"
                            labelcolspan={4}
                            colspan={8}
                            label="Ngày hẹn"
                            validatonList={["Comborequired"]}
                            placeholder="-- Vui lòng chọn --"
                            isautoloaditemfromcache={false}
                            valuemember="DeliveryValue"
                            nameMember="DeliveryText"
                            controltype="InputControl"
                            value={this.state.valueDate}
                            listoption={this.state.DeliveryTimeAllGroup}
                            datasourcemember="DeliveryDate"
                            validationErrorMessage={this.state.MessageError}
                        />



                    </div>
                    <div className="col-md-6">

                        <FormControl.FormControlComboBox
                            name="cbDeliveryTime"
                            labelcolspan={4}
                            colspan={8}
                            label="Giờ hẹn"
                            validatonList={["Comborequired"]}
                            placeholder="-- Vui lòng chọn --"
                            isautoloaditemfromcache={false}
                            valuemember="DeliveryValue"
                            nameMember="DeliveryText"
                            controltype="InputControl"
                            value={this.state.valueTime}
                            listoption={this.state.ListSuggestTimeChildren}
                            datasourcemember="DeliveryValue"
                            validationErrorMessage={this.state.MessageErrorValueTime}
                        />


                    </div>

                    <div className="col-md-12">
                        <FormControl.TextArea
                            labelcolspan={2}
                            colspan={10}
                            name="txtDeliverydateUpdateReasonNote"
                            label="Ghi chú"
                            placeholder="Nội dung chỉ giới hạn 5500 ký tự"
                            datasourcemember="DeliverydateUpdateReasonNote"
                            controltype="InputControl"
                            rows={8}
                            value=""
                            classNameCustom="customcontrol"
                        />
                    </div>

                </div>

            </FormContainer>

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
        }
    }
}


const FindStoreDeliveryTime = connect(mapStateToProps, mapDispatchToProps)(withRouter(FindStoreDeliveryTimeCom));
export default FindStoreDeliveryTime;