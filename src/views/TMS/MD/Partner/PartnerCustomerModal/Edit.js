import React from "react";
import { connect } from "react-redux";
import ReactNotification from "react-notifications-component";
import { ModalManager } from 'react-dynamic-modal';

import { MessageModal } from "../../../../../common/components/Modal";
import { showModal, hideModal } from '../../../../../actions/modal';
import { MLObjectDefinitionPartnerCustomeModal } from '../constants';
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
            const { propsIndexPartnerCustomer, propsArrPartnerCustomer, propsHandlePartnerCustomer } = this.props;

            const clonePropsArrPartnerCustomer = propsArrPartnerCustomer.map((item, index) => {
                if (index == propsIndexPartnerCustomer) {
                    return MLObject;
                } else {
                    return item;
                }
            });

            propsHandlePartnerCustomer(clonePropsArrPartnerCustomer);
            this.props.hideModal();
        } catch (error) {
            this.showMessage("Lỗi thêm");
        }
    }

    render() {
        const { propsIndexPartnerCustomer, propsArrPartnerCustomer } = this.props;
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />

                <FormContainer
                    MLObjectDefinition={MLObjectDefinitionPartnerCustomeModal}
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
                                readOnly={true}
                                label="mã khách hàng"
                                placeholder="Mã khách hàng"
                                controltype="InputControl"
                                value={propsArrPartnerCustomer[propsIndexPartnerCustomer].CustomerID}
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
                                value={propsArrPartnerCustomer[propsIndexPartnerCustomer].IsActived}
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
                                value={propsArrPartnerCustomer[propsIndexPartnerCustomer].IsSystem}
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
