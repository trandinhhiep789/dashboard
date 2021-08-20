import React from "react";
import ReactNotification from "react-notifications-component";
import { ModalManager } from 'react-dynamic-modal';
import { connect } from "react-redux";

import FormControl from "../../../../../common/components/FormContainer/FormControl";
import { MessageModal } from "../../../../../common/components/Modal";
import { callGetCache } from "../../../../../actions/cacheAction";
import { showModal, hideModal } from '../../../../../actions/modal';

class PartnerCustomerAddModalCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errorCustomer: "",
            submitCustomer: null,
            submitIsActived: false,
            submitIsSystem: false,
        };

        this.gridref = React.createRef();
        this.notificationDOMRef = React.createRef();
        this.searchref = React.createRef();

        this.handleChangeCustomer = this.handleChangeCustomer.bind(this);
        this.handleChangeIsActived = this.handleChangeIsActived.bind(this);
        this.handleChangeIsSystem = this.handleChangeIsSystem.bind(this);
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

    handleChangeCustomer(value) {
        if (!value) {
            this.setState({
                errorCustomer: "Vui lòng chọn khách hàng"
            })
        } else {
            this.setState({
                errorCustomer: ""
            })
        }

        this.setState({
            submitCustomer: value
        })
    }

    handleChangeIsActived(name, value) {
        this.setState({
            submitIsActived: value
        })
    }

    handleChangeIsSystem(name, value) {
        this.setState({
            submitIsSystem: value
        })
    }

    handleSubmit() {
        try {
            if (!this.state.submitCustomer) {
                this.setState({
                    errorCustomer: "Vui lòng chọn khách hàng"
                })
                return;
            }

            const { propsPartnerCustomer, propsHandlePartnerCustomer } = this.props;

            const updateSubmitCustomer = {
                ...this.state.submitCustomer,
                IsActived: this.state.submitIsActived,
                IsSystem: this.state.submitIsSystem
            };

            if (propsPartnerCustomer.length == 0) {
                propsHandlePartnerCustomer([updateSubmitCustomer]);
                this.props.hideModal();
            } else {
                const found = propsPartnerCustomer.find(item => item.CustomerID == this.state.submitCustomer.CustomerID);

                if (found == undefined) {
                    propsHandlePartnerCustomer([...propsPartnerCustomer, updateSubmitCustomer]);
                    this.props.hideModal();
                } else {
                    this.showMessage("Mã khách hàng đã tồn tại");
                }
            }
        } catch (error) {
            console.log(error)
            this.showMessage("Lỗi thêm");
        }
    }

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />

                <div className="row p-4">
                    <div className="col-12 mb-2">
                        <FormControl.PartialSelect
                            colspan="8"
                            isMultiSelect={false}
                            isShowLable={false}
                            isautoloaditemfromcache={true}
                            label="mã khách hàng"
                            labelcolspan="4"
                            loaditemcachekeyid="ERPCOMMONCACHE.CUSTOMER"
                            name="cbCustomerID"
                            nameMember="CustomerName"
                            onChange={this.handleChangeCustomer}
                            placeholder="Mã khách hàng"
                            validatonList={["Comborequired"]}
                            valuemember="CustomerID"
                            validationErrorMessage={this.state.errorCustomer}
                        />
                    </div>

                    <div className="col-12">
                        <FormControl.CheckBox
                            classNameCustom=""
                            colspan="8"
                            controltype="InputControl"
                            label="Kích hoạt"
                            labelcolspan="4"
                            name="chkIsActived"
                            onValueChange={this.handleChangeIsActived}
                            value={this.state.submitIsActived}
                        />
                    </div>

                    <div className="col-12">
                        <FormControl.CheckBox
                            classNameCustom=""
                            colspan="8"
                            controltype="InputControl"
                            label="Hệ thống"
                            labelcolspan="4"
                            name="chkIsSystem"
                            onValueChange={this.handleChangeIsSystem}
                            value={this.state.submitIsSystem}
                        />
                    </div>
                </div>

                <div className="row justify-content-end px-4 py-2">
                    <button
                        className="btn btn-primary mr-2"
                        onClick={this.handleSubmit}
                        type="button"
                    >
                        Cập nhật
                    </button>
                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => this.props.hideModal()}
                        type="button"
                    >
                        Đóng
                    </button>
                </div>
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
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: (type, props) => {
            dispatch(hideModal(type, props));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PartnerCustomerAddModalCom);
