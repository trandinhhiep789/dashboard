import React from "react";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import ReactNotification from "react-notifications-component";

import {
    AddAPIPath,
    AddElementList,
    AddPagePath,
    APIHostName,
    BackLink,
    MLObjectDefinitionVehicleRentalRequestType,
    AddMLObjectDefinition
} from "../constants";

import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { callGetCache } from "../../../../../actions/cacheAction";
import { MessageModal } from "../../../../../common/components/Modal";
import { showModal, hideModal } from '../../../../../actions/modal';
import { updatePagePath } from "../../../../../actions/pageAction";
import SimpleForm from "../../../../../common/components/Form/SimpleForm";

class AddCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            DataSource: {},
        };

        this.searchref = React.createRef();
        this.gridref = React.createRef();
        this.notificationDOMRef = React.createRef();

        this.addNotification = this.addNotification.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showMessage = this.showMessage.bind(this);
    }

    componentDidMount() {
        this.props.updatePagePath(AddPagePath);
    }

    handleSubmit(formData, MLObject) {
        const uptMLObject = {
            ...MLObject,
            AddFunctionID: MLObject.AddFunctionID.length == 1 ? MLObject.AddFunctionID[0] : (MLObject.AddFunctionID.length == 0 ? -1 : MLObject.AddFunctionID)
        }

        this.props.callFetchAPI(APIHostName, AddAPIPath, uptMLObject).then(apiResult => {
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
            />
        );
    }

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />

                <SimpleForm
                    BackLink={BackLink}
                    dataSource={this.state.dataSource}
                    FormMessage={""}
                    FormName="Thêm loại yêu cầu thuê phương tiện"
                    IsErrorMessage={false}
                    listelement={AddElementList}
                    MLObjectDefinition={AddMLObjectDefinition}
                    onSubmit={this.handleSubmit}
                    ref={this.searchref}
                    RequirePermission={""}
                />
            </React.Fragment>
        )
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
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: () => {
            dispatch(hideModal());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCom);