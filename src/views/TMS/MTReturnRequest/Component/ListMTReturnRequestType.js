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

    AddLink,
} from "../constants";

import { showModal, hideModal } from '../../../../actions/modal';

class ListMTReturnRequestTypeCom extends Component {
    constructor(props) {
        super(props);
        this.handleOnValueChange = this.handleOnValueChange.bind(this);
        this.state = {
            IsCallAPIError: false,
            IsCloseForm: false,
            MtreturnRequestType: '',
            RequestStoreID: '',
            MessageError: '',
            MessageErrorRequestStore: ''
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
        if (name == 'MtreturnRequestTypeID') {
            if (value > 0) {
                this.setState({
                    MtreturnRequestType: value,
                    MessageError: ''
                })
            }
            else {
                this.setState({
                    MtreturnRequestType: value,
                    MessageError: 'Vui lòng chọn loại yêu cầu hủy vật tư',
                })
            }
        }


    }

    handleCloseModal() {
        this.props.hideModal();
    }

    handleSubmit = () => {
        const { MtreturnRequestType, RequestStoreID } = this.state;
        if (MtreturnRequestType > 0 && RequestStoreID > 0) {
            this.setState({
                MessageError: ''
            })
            this.props.history.push(AddLink, {
                MtreturnRequestTypeID: MtreturnRequestType,
                RequestStoreID: RequestStoreID
            })
        }
        else {
            if (MtreturnRequestType < 0 || MtreturnRequestType == "") {
                this.setState({
                    MessageError: 'Vui lòng chọn loại yêu cầu nhập trả vật tư',
                })
            }
            if (RequestStoreID < 0 || RequestStoreID == "") {
                this.setState({
                    MessageErrorRequestStore: 'Vui lòng chọn kho yêu cầu',
                })
            }

        }
    }

    render() {
        return (
            <div className="card modalForm">
                <div className="card-body">
                    <div className="form-row">
                        <div className="col-md-12">
                            <FormControl.FormControlComboBox
                                name="MtreturnRequestTypeID"
                                colspan="8"
                                labelcolspan="4"
                                label="Loại yêu cầu nhập trả vật tư"
                                isautoloaditemfromcache={true}
                                loaditemcachekeyid="ERPCOMMONCACHE.MTRETURNREQUESTTYPE"
                                valuemember="MtreturnRequestTypeID"
                                nameMember="MtreturnRequestTypeName"
                                controltype="InputControl"
                                onValueChange={this.handleOnValueChange}
                                value={this.state.MtreturnRequestType}
                                listoption={null}
                                datasourcemember="MtreturnRequestTypeID"
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
        }
    }
}


const ListMTReturnRequestType = connect(mapStateToProps, mapDispatchToProps)(withRouter(ListMTReturnRequestTypeCom));
export default ListMTReturnRequestType;