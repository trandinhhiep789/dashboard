import React, { Component } from "react";
import { connect } from 'react-redux';
import { ModalManager } from 'react-dynamic-modal';
import { withRouter } from "react-router-dom";
import "react-notifications-component/dist/theme.css";

import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { callGetCache } from "../../../../actions/cacheAction";
import FormControl from "../../../../common/components/FormContainer/FormControl";
import { MessageModal } from "../../../../common/components/Modal";
import { AddLink } from "./constants";
import { showModal, hideModal } from '../../../../actions/modal';
import { ERPCOMMONCACHE_STAFFTRANSFERTYPE, ERPCOMMONCACHE_USER_COOSTORE_BYUSER } from "../../../../constants/keyCache";

class AddModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            IsCallAPIError: false,
            IsCloseForm: false,
            StaffTransferTypeID: '',
            RequestStoreID: '',
            MessageError: '',
            MessageErrorRequestStore: ''
        }

        this.notificationDOMRef = React.createRef();
        this.handleOnValueChange = this.handleOnValueChange.bind(this);
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
        if (name == 'cboStaffTransferTypeID') {
            if (value > 0) {
                this.setState({
                    StaffTransferTypeID: value,
                    MessageError: ''
                })
            }
            else {
                this.setState({
                    StaffTransferTypeID: value,
                    MessageError: 'Vui lòng chọn loại hình thuyên chuyển nhân viên',
                })
            }
        }
    }

    handleCloseModal() {
        this.props.hideModal();
    }

    handleSubmit = () => {
        const { StaffTransferTypeID, RequestStoreID } = this.state;
        if (StaffTransferTypeID > 0 && RequestStoreID > 0) {
            this.setState({
                MessageError: ''
            })
            this.props.history.push(AddLink, {
                StaffTransferTypeID,
                RequestStoreID
            })
        } else {
            if (StaffTransferTypeID < 0 || StaffTransferTypeID == "") {
                this.setState({
                    MessageError: 'Vui lòng chọn loại hình thuyên chuyển nhân viên',
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
                                name="cboStaffTransferTypeID"
                                colspan="8"
                                labelcolspan="4"
                                label="Loại hình thuyên chuyển nhân viên"
                                isautoloaditemfromcache={true}
                                loaditemcachekeyid={ERPCOMMONCACHE_STAFFTRANSFERTYPE}
                                valuemember="StaffTransferTypeID"
                                nameMember="StaffTransferTypeName"
                                controltype="InputControl"
                                onValueChange={this.handleOnValueChange}
                                value={this.state.StaffTransferTypeID}
                                listoption={null}
                                datasourcemember="StaffTransferTypeID"
                                placeholder="---Vui lòng chọn---"
                                validationErrorMessage={this.state.MessageError}
                                isMultiSelect={false}
                                validatonList={["Comborequired"]}
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
                                onValueChange={this.handleOnValueChange}
                                isusercache={true}
                                loaditemcachekeyid={ERPCOMMONCACHE_USER_COOSTORE_BYUSER}
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
                    <button className="btn btn-primary" type="button" onClick={this.handleSubmit.bind(this)}>
                        Cập nhật
                    </button>

                    <button type="button" className="btn btn-export ml-10" title="" onClick={this.handleCloseModal.bind(this)}>
                        Đóng
                    </button>
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


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddModal));