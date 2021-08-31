import React from "react";
import { connect } from "react-redux";
import ReactNotification from "react-notifications-component";
import { ModalManager } from 'react-dynamic-modal';

import {
    API_SvCategoryType_Add,
    APIHostName,
    MLObjectDefinition_Add,
    PagePath_Add
} from "../constants";

import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { MessageModal } from "../../../../../common/components/Modal";
import { showModal, hideModal } from '../../../../../actions/modal';
import { updatePagePath } from "../../../../../actions/pageAction";
import FormContainer from "../../../../../common/components/FormContainer";
import FormControl from "../../../../../common/components/FormContainer/FormControl";

class AddCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };

        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();

        this.addNotification = this.addNotification.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showMessage = this.showMessage.bind(this);
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath_Add);
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

    handleChange(formData, MLObject) {

    }

    handleSubmit(formData, MLObject) {
        const dataSubmit = {
            ...MLObject,
            CreatedUser: this.props.AppInfo.LoginInfo.Username,
            IsSystem: MLObject.IsSystem == undefined ? false : MLObject.IsSystem,
            LoginlogID: JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID,
            OrderIndex: parseInt(MLObject.OrderIndex),
            svCategoryTypeID: parseInt(MLObject.svCategoryTypeID)
        }

        this.props.callFetchAPI(APIHostName, API_SvCategoryType_Add, dataSubmit).then(apiResult => {
            if (!apiResult.IsError) {
                this.showMessage(apiResult.Message);
                this.props.history.push("/SvCategoryType");
            } else {
                this.addNotification(apiResult.Message, true);
            }
        });
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

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />

                <FormContainer
                    BackLink={"/SvCategoryType"}
                    FormName={"Thêm loại danh mục dịch vụ"}
                    listelement={[]}
                    MLObjectDefinition={MLObjectDefinition_Add}
                    onchange={this.handleChange}
                    onSubmit={this.handleSubmit}
                >
                    <div className="row">
                        <div className="col-md-6">
                            <FormControl.TextBox
                                colspan="8"
                                controltype="InputControl"
                                datasourcemember="svCategoryTypeID"
                                label="mã loại danh mục dịch vụ"
                                labelcolspan="4"
                                maxSize={4}
                                name="txtsvCategoryTypeID"
                                placeholder="Mã loại danh mục dịch vụ"
                                readOnly={false}
                                validatonList={['required', 'number']}
                                value=""
                            />
                        </div>

                        <div className="col-md-6">
                            <FormControl.TextBox
                                colspan="8"
                                controltype="InputControl"
                                datasourcemember="svCategoryTypeName"
                                label="tên loại danh mục dịch vụ"
                                labelcolspan="4"
                                maxSize={200}
                                name="txtsvCategoryTypeName"
                                placeholder="Tên loại danh mục dịch vụ"
                                readOnly={false}
                                validatonList={['required']}
                                value=""
                            />
                        </div>

                        <div className="col-md-6">
                            <FormControl.TextArea
                                classNameCustom="customcontrol"
                                colspan="8"
                                controltype="InputControl"
                                datasourcemember="Description"
                                label="Mô tả"
                                labelcolspan="4"
                                maxSize={500}
                                name="txtDescription"
                                placeholder="Mô tả"
                                rows={6}
                            />
                        </div>

                        <div className="col-md-6">
                            <FormControl.TextBox
                                colspan="8"
                                controltype="InputControl"
                                datasourcemember="OrderIndex"
                                label="thứ tự hiển thị"
                                labelcolspan="4"
                                maxSize={9}
                                name="txtOrderIndex"
                                placeholder="Thứ tự hiển thị"
                                readOnly={false}
                                validatonList={['required', 'number']}
                                value=""
                            />
                        </div>

                        <div className="col-md-12">
                            <FormControl.CheckBox
                                classNameCustom="customCheckbox"
                                colspan={10}
                                controltype="InputControl"
                                datasourcemember="IsActived"
                                label="kích hoạt"
                                labelcolspan={2}
                                name="chkIsActived"
                                value={true}
                            />
                        </div>

                        <div className="col-md-12">
                            <FormControl.CheckBox
                                classNameCustom="customCheckbox"
                                colspan={10}
                                controltype="InputControl"
                                datasourcemember="IsSystem"
                                label="hệ thống"
                                labelcolspan={2}
                                name="chkIsSystem"
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
        updatePagePath: pagePath => {
            dispatch(updatePagePath(pagePath));
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: (type, props) => {
            dispatch(hideModal(type, props));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCom);