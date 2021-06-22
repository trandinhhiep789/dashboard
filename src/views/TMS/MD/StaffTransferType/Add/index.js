import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import SimpleForm from "../../../../../common/components/Form/SimpleForm";
import { MessageModal } from "../../../../../common/components/Modal";
import {
    APIHostName,
    APIAdd,
    AddElementList,
    AddMLObjectDefinition,
    BackLink,
    AddPagePath
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";

class AddCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
    }

    componentDidMount() {
        this.props.updatePagePath(AddPagePath);
    }

    handleSubmit(formData, MLObject) {
        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        MLObject.AddFunctionID = MLObject.AddFunctionID && Array.isArray(MLObject.AddFunctionID) ? MLObject.AddFunctionID[0] : MLObject.AddFunctionID;

        if (!MLObject.IsAutoReview && MLObject.IsAutoTransfer) {
            this.setState({ IsCallAPIError: true });
            this.showMessage("Phải có tự động duyệt thì mới có tự động thuyên chuyển.");
        } else {
            this.props.callFetchAPI(APIHostName, APIAdd, MLObject).then(apiResult => {
                this.setState({ IsCallAPIError: apiResult.IsError });
                this.showMessage(apiResult.Message);
            });
        }
    }

    handleCloseMessage() {
        if (!this.state.IsCallAPIError) this.setState({ IsCloseForm: true });
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

    render() {
        const { IsCloseForm, CallAPIMessage, IsCallAPIError } = this.state;

        if (IsCloseForm) {
            return <Redirect to={BackLink} />;
        }

        return (
            <SimpleForm
                FormName="Thêm loại hình thuyên chuyển nhân viên"
                MLObjectDefinition={AddMLObjectDefinition}
                listelement={AddElementList}
                onSubmit={this.handleSubmit}
                FormMessage={CallAPIMessage}
                IsErrorMessage={IsCallAPIError}
                dataSource={{ IsActived: true }}
                BackLink={BackLink}
                RequirePermission={""}
                ref={this.searchref}
            />
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
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
        callClearLocalCache: (cacheKeyID) => {
            return dispatch(callClearLocalCache(cacheKeyID));
        }
    };
};

const Add = connect(mapStateToProps, mapDispatchToProps)(AddCom);
export default Add;
