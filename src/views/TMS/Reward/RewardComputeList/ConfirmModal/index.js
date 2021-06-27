import React, { Component } from "react";
import { connect } from 'react-redux';
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import ReactNotification from "react-notifications-component";

import { MessageModal } from "../../../../../common/components/Modal";
import { APIHostName, MLObjectChangeConfirmModal, ConfirmAPIPath } from '../constants'
import FormContainer from "../../../../../common/components/FormContainer";
import FormControl from "../../../../../common/components/FormContainer/FormControl";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { showModal, hideModal } from '../../../../../actions/modal';

class ConfirmModalCom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: this.props.dataSource,
            objId: this.props.objId
        };

        this.showMessage = this.showMessage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.notificationDOMRef = React.createRef();
        this.addNotification = this.addNotification.bind(this);
    }

    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
            />
        );
    }

    addNotification(message1, IsError) {
        let cssNotification, iconNotification;
        if (!IsError) {
            cssNotification = "notification-custom-success";
            iconNotification = "fa fa-check"

        } else {
            cssNotification = "notification-danger";
            iconNotification = "fa fa-exclamation"
        }
        this.notificationDOMRef.current.addNotification({
            container: "bottom-right",
            content: (
                <div className={cssNotification}>
                    <div className="notification-custom-icon">
                        <i className={iconNotification} />
                    </div>
                    <div className="notification-custom-content">
                        <div className="notification-close">
                            <span>×</span>
                        </div>
                        <h4 className="notification-title">Thông Báo</h4>
                        <p className="notification-message">{message1}</p>
                    </div>
                </div>
            ),
            dismiss: { duration: 6000 },
            dismissable: { click: true }
        });
    }

    handleSubmit(FormData, MLObject) {
        const { dataSource, objId } = this.state;


        let objDataRequest = {}


        if (MLObject.IsConfirm == 1) {
            objDataRequest.IsConfirm = 1
            objDataRequest.IsUnConfirm = 0
        } else {
            objDataRequest.IsConfirm = 0
            objDataRequest.IsUnConfirm = 1
        }
        objDataRequest.RewardComputeListID = dataSource.RewardComputeListID;
        objDataRequest.RewardDate = dataSource.RewardDate;

        // console.log("objDataRequest", objDataRequest)
        this.props.callFetchAPI(APIHostName, ConfirmAPIPath, objDataRequest).then(apiResult => {
            // console.log("data", apiResult)
            if (!apiResult.IsError) {
                this.props.ObjDataRequest(apiResult);
            }
            else {
                this.showMessage(apiResult.Message)
            }
        });
        this.props.hideModal();
    }

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <FormContainer
                    MLObjectDefinition={MLObjectChangeConfirmModal}
                    dataSource={null}
                    listelement={[]}
                    onSubmit={this.handleSubmit.bind(this)}
                    IsCloseModal={true}
                >
                    <div className="col-md-12">
                        <FormControl.FormControlComboBox
                            labelcolspan={2}
                            colspan={10}
                            name="cbIsConfirm"
                            label="chốt thưởng"
                            datasourcemember="IsConfirm"
                            controltype="InputControl"
                            rows={6}
                            value={1}
                            isMultiSelect={false}
                            isautoloaditemfromcache={false}
                            listoption={[
                                { value: 1, label: "Chốt thưởng" },
                                { value: 2, label: "Không chốt thưởng" }
                            ]}
                            classNameCustom="customcontrol"
                            readOnly={this.state.IsSystem}
                            disabled={this.state.IsSystem}
                        />
                    </div>

                </FormContainer>
            </React.Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {
        AppInfo: state,
        FetchAPIInfo: state.FetchAPIInfo
    }
};

const mapDispatchToProps = dispatch => {
    return {
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        hideModal: (type, props) => {
            dispatch(hideModal(type, props));
        }
    }
};

const ConfirmModal = connect(mapStateToProps, mapDispatchToProps)(ConfirmModalCom);
export default ConfirmModal;