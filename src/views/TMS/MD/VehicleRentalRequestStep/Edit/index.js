import React from "react";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import ReactNotification from "react-notifications-component";

import {
    EditElementList,
    APIHostName,
    BackLink,
    EditAPIPath,
    EditPagePath,
    LoadAPIPath,
    MLObjectDefinition,
    Edit
} from "../constants";

import {
} from "../../../../../constants/keyCache";

import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { MessageModal } from "../../../../../common/components/Modal";
import { showModal, hideModal } from '../../../../../actions/modal';
import { updatePagePath } from "../../../../../actions/pageAction";
import SimpleForm from "../../../../../common/components/Form/SimpleForm";

class EditCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: null
        };

        this.gridref = React.createRef();
        this.notificationDOMRef = React.createRef();
        this.searchref = React.createRef();

        this.addNotification = this.addNotification.bind(this);
        this.fetchVehicleRentalRequestStepInfo = this.fetchVehicleRentalRequestStepInfo.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showMessage = this.showMessage.bind(this);
    }

    componentDidMount() {
        this.props.updatePagePath(EditPagePath);
        this.fetchVehicleRentalRequestStepInfo();
    }

    fetchVehicleRentalRequestStepInfo() {
        this.props.callFetchAPI(APIHostName, LoadAPIPath, this.props.match.params.id).then(apiResult => {
            if (apiResult.IsError) {
                this.showMessage(apiResult.Message);
            } else {
                this.setState({
                    dataSource: apiResult.ResultObject
                })
            }
        })
    }

    handleSubmit(formData, MLObject) {
        const uptMLObject = {
            ...MLObject,
            VehicleRentalRequestStepID: this.props.match.params.id
        };

        this.props.callFetchAPI(APIHostName, EditAPIPath, uptMLObject).then(apiResult => {
            this.showMessage(apiResult.Message);
            if (!apiResult.IsError) {
                this.props.history.push(BackLink);
            }
        });
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

    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
                onCloseModal={() => { }}
            />
        );
    }

    render() {
        if (this.state.dataSource == null) {
            return (
                <React.Fragment>
                    <ReactNotification ref={this.notificationDOMRef} />
                    Đang tải dữ liệu ...
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <ReactNotification ref={this.notificationDOMRef} />

                    <SimpleForm
                        BackLink={BackLink}
                        dataSource={this.state.dataSource}
                        FormMessage={""}
                        FormName="Chỉnh sửa bước xử lý của yêu cầu thuê xe"
                        IsErrorMessage={false}
                        listelement={EditElementList}
                        MLObjectDefinition={MLObjectDefinition}
                        onSubmit={this.handleSubmit}
                        ref={this.searchref}
                        RequirePermission={""}
                    />
                </React.Fragment>
            )
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
        hideModal: () => {
            dispatch(hideModal());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCom);