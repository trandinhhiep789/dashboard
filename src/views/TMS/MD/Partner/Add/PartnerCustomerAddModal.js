import React from "react";
import { connect } from "react-redux";
import ReactNotification from "react-notifications-component";
import { ModalManager } from 'react-dynamic-modal';

import { MessageModal } from "../../../../../common/components/Modal";
import { showModal, hideModal } from '../../../../../actions/modal';
import { MLObjectDefinitionPartnerCustomeAddModal } from '../constants';
import FormContainer from "../../../../../common/components/FormContainer";
import FormControl from "../../../../../common/components/FormContainer/FormControl";

class PartnerCustomerAddModalCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };

        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
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

    addNotification(message, IsError) {
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
                        <p className="notification-message">{message}</p>
                    </div>
                </div>
            ),
            dismiss: { duration: 6000 },
            dismissable: { click: true }
        });
    }

    handleSubmit(FormData, MLObject) {
        try {
            const { propsPartnerCustomer, propsHandlePartnerCustomer } = this.props;
            if (propsPartnerCustomer.length == 0) {
                propsHandlePartnerCustomer([MLObject]);
                this.props.hideModal();
            } else {
                const found = propsPartnerCustomer.find(item => item.CustomerID == MLObject.CustomerID);

                if (found == undefined) {
                    propsHandlePartnerCustomer([...propsPartnerCustomer, MLObject]);
                    this.props.hideModal();
                } else {
                    this.showMessage("Mã khách hàng đã tồn tại");
                }
            }
        } catch (error) {
            this.showMessage("Lỗi thêm");
        }
    }

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />

                <FormContainer
                    MLObjectDefinition={MLObjectDefinitionPartnerCustomeAddModal}
                    listelement={[]}
                    onSubmit={this.handleSubmit}
                    IsCloseModal={true}
                >
                    <div className="row">
                        <div className="col-12 mb-2">
                            <FormControl.TextBox
                                name="txtCustomerID"
                                colspan="8"
                                labelcolspan="4"
                                readOnly={false}
                                label="mã khách hàng"
                                placeholder="Mã khách hàng"
                                controltype="InputControl"
                                value=""
                                datasourcemember="CustomerID"
                                validatonList={['required', 'number']}
                                maxSize={10}
                            />
                        </div>

                        <div className="col-12">
                            <FormControl.CheckBox
                                label="Kích hoạt"
                                name="chkIsActived"
                                datasourcemember="IsActived"
                                controltype="InputControl"
                                colspan="8"
                                labelcolspan="4"
                                classNameCustom=""
                                value={true}
                            />
                        </div>


                        <div className="col-12">
                            <FormControl.CheckBox
                                label="Hệ thống"
                                name="chkIsSystem"
                                datasourcemember="IsSystem"
                                controltype="InputControl"
                                colspan="8"
                                labelcolspan="4"
                                classNameCustom=""
                                value={false}
                            />
                        </div>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: (type, props) => {
            dispatch(hideModal(type, props));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PartnerCustomerAddModalCom);
