import React, { Component } from "react";
import { connect } from 'react-redux';
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import ReactNotification from "react-notifications-component";

import { MessageModal } from "../../../../../common/components/Modal";
import { APIHostName, UpdateUnlockAPIPath, MLObjectChangeActiveModal } from '../constants'
import FormContainer from "../../../../../common/components/FormContainer";
import FormControl from "../../../../../common/components/FormContainer/FormControl";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { showModal, hideModal } from '../../../../../actions/modal';

class ChangeActiveDetailtModalCom extends Component {
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
        const { value } = FormData.txtDescription;

        if (!value) {
            this.showMessage("Vui lòng điền nội dung vào ô mô tả");
            return;
        };

        const { dataSource, objId } = this.state;
        let objDataRequest = {}
        const dataFind = dataSource.find(n => {
            return n.StaffDebtDetailID == objId[0].value
        });

        if (dataFind.IsUnLockDelivery) {
            objDataRequest.IsLockDelivery = 1
            objDataRequest.IsUnLockDelivery = 0
        } else {
            objDataRequest.IsLockDelivery = 0
            objDataRequest.IsUnLockDelivery = 1
        }

        objDataRequest.UnLockDeliveryNote = value;
        objDataRequest.StaffDebtDetailID = dataFind.StaffDebtDetailID;
        objDataRequest.ShipmentOrderID = dataFind.ShipmentOrderID;
        objDataRequest.UserName = dataFind.UserName;
        objDataRequest.StoreID = dataFind.StoreID;
        this.props.ObjDataRequest(objDataRequest);

        this.props.hideModal();
    }

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />

                <FormContainer
                    MLObjectDefinition={MLObjectChangeActiveModal}
                    dataSource={null}
                    listelement={[]}
                    onSubmit={this.handleSubmit.bind(this)}
                    IsCloseModal={true}
                >
                    <div className="col-md-12">
                        <FormControl.TextArea
                            labelcolspan={2}
                            colspan={10}
                            name="txtDescription"
                            label="Mô tả"
                            placeholder="Mô tả"
                            datasourcemember="Description"
                            controltype="InputControl"
                            rows={6}
                            maxSize={500}
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

const ChangeActiveDetailtModal = connect(mapStateToProps, mapDispatchToProps)(ChangeActiveDetailtModalCom);
export default ChangeActiveDetailtModal;