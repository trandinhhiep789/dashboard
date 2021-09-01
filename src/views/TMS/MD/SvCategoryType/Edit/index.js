import React from "react";
import { connect } from "react-redux";
import ReactNotification from "react-notifications-component";
import { ModalManager } from 'react-dynamic-modal';

import {
    API_SvCategoryType_Update,
    API_SvCategoryType_Load,
    APIHostName,
    MLObjectDefinition_Add,
    PagePath_Edit
} from "../constants";

import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { MessageModal } from "../../../../../common/components/Modal";
import { showModal, hideModal } from '../../../../../actions/modal';
import { updatePagePath } from "../../../../../actions/pageAction";
import FormContainer from "../../../../../common/components/FormContainer";
import FormControl from "../../../../../common/components/FormContainer/FormControl";

class EditCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: null
        };

        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();

        this.addNotification = this.addNotification.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFetchAPI = this.handleFetchAPI.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showMessage = this.showMessage.bind(this);
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath_Edit);
        this.handleFetchAPI();
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

    handleFetchAPI() {
        this.props.callFetchAPI(APIHostName, API_SvCategoryType_Load, this.props.match.params.id).then(apiResult => {
            if (!apiResult.IsError) {
                this.setState({
                    dataSource: apiResult.ResultObject
                });
            } else {
                this.addNotification(apiResult.Message, true);
            }
        });
    }

    handleSubmit(formData, MLObject) {
        const dataSubmit = {
            ...MLObject,
            CreatedUser: this.props.AppInfo.LoginInfo.Username,
            IsSystem: MLObject.IsSystem == undefined ? false : MLObject.IsSystem,
            LoginlogID: JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID,
            OrderIndex: parseInt(MLObject.OrderIndex),
            svCategoryTypeID: parseInt(MLObject.svCategoryTypeID),
            svCategoryTypeID: parseInt(this.props.match.params.id),
            UpdatedUser: this.props.AppInfo.LoginInfo.Username
        }

        this.props.callFetchAPI(APIHostName, API_SvCategoryType_Update, dataSubmit).then(apiResult => {
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
        if (this.state.dataSource == null) {
            return <React.Fragment>...</React.Fragment>
        } else {
            return (
                <React.Fragment>
                    <ReactNotification ref={this.notificationDOMRef} />

                    <FormContainer
                        BackLink={"/SvCategoryType"}
                        FormName={"Chỉnh sửa loại danh mục dịch vụ"}
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
                                    datasourcemember="svCategoryTypeName"
                                    label="tên loại danh mục dịch vụ"
                                    labelcolspan="4"
                                    maxSize={200}
                                    name="txtsvCategoryTypeName"
                                    placeholder="Tên loại danh mục dịch vụ"
                                    readOnly={false}
                                    validatonList={['required']}
                                    value={this.state.dataSource.svCategoryTypeName}
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
                                    value={this.state.dataSource.OrderIndex}
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
                                    value={this.state.dataSource.Description}
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
                                    value={this.state.dataSource.IsActived}
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
                                    value={this.state.dataSource.IsSystem}
                                />
                            </div>
                        </div>
                    </FormContainer>
                </React.Fragment>
            );
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(EditCom);