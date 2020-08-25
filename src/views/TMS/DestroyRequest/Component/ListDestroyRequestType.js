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

class ListDestroyRequestTypeCom extends Component {
    constructor(props) {
        super(props);
        this.handleOnValueChange = this.handleOnValueChange.bind(this);
        this.state = {
            IsCallAPIError: false,
            IsCloseForm: false,
            DestroyRequestType: '',
            MessageError: ''
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
        console.log("handleOnValueChange", name, value)
        if (value > 0) {
            this.setState({
                DestroyRequestType: value,
                MessageError: ''
            })
        }
        else {
            this.setState({
                DestroyRequestType: value,
                MessageError: 'Vui lòng chọn loại yêu cầu hủy vật tư',
            })
        }

    }

    handleCloseModal() {
        this.props.hideModal();
    }

    handleSubmit = () => {
        const { DestroyRequestType } = this.state;
        if (DestroyRequestType > 0) {
            this.setState({
                MessageError: ''
            })
            this.props.history.push(AddLink, {
                DestroyRequestTypeID: DestroyRequestType
            })
        }
        else {
            this.setState({
                MessageError: 'Vui lòng chọn loại yêu cầu hủy vật tư',
            })
        }
    }

    render() {
        console.log("this.state.DestroyRequestType", this.state.DestroyRequestType)
        return (
            <div className="card modalForm">
                <div className="card-body">
                    <div className="form-row">
                        <div className="col-md-12">
                            <FormControl.FormControlComboBox
                                name="DestroyRequestTypeID"
                                colspan="8"
                                labelcolspan="4"
                                label="Loại yêu cầu hủy vật tư"
                                isautoloaditemfromcache={true}
                                loaditemcachekeyid="ERPCOMMONCACHE.DESTROYREQUESTTYPE"
                                valuemember="DestroyRequestTypeID"
                                nameMember="DestroyRequestTypeName"
                                controltype="InputControl"
                                onValueChange={this.handleOnValueChange}
                                value={this.state.DestroyRequestType}
                                listoption={null}
                                datasourcemember="DestroyRequestTypeID"
                                placeholder="---Vui lòng chọn---"
                                validationErrorMessage={this.state.MessageError}
                                isMultiSelect={false}
                            //disabled={}
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
        }
    }
}


const ListDestroyRequestType = connect(mapStateToProps, mapDispatchToProps)(withRouter(ListDestroyRequestTypeCom));
export default ListDestroyRequestType;