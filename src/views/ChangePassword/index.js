import React from "react";
import { ModalManager } from 'react-dynamic-modal';
import { connect } from 'react-redux';
import MD5Digest from "../../common/library/cryptography/MD5Digest.js";

import SimpleForm from "../../common/components/Form/SimpleForm";
import { MessageModal } from "../../common/components/Modal";
import { ElementList, MLObjectDefinition, PagePath } from "./constants"
import { callFetchAPI } from "../../actions/fetchAPIAction";
import { updatePagePath } from "../../actions/pageAction";
class ChangePasswordCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.state = { CallAPIMessage: "", IsCallAPIError: false };
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
    }
    handleCloseMessage() {
        //if(!this.state.IsCallAPIError)
        //this.setState({IsCloseForm: true});
    }
    showMessage(message) {
        ModalManager.open(<MessageModal title="Thông báo"
            message={message} onRequestClose={() => true}
            onCloseModal={this.handleCloseMessage}
        />);
    }

    handleSubmit(formData, MLObject) {
        const hostname = "AuthenAPI";
        const apiPath = "api/Authentication/ChangePassword";
        const postData = {
            UserName: MLObject.UserName,
            OldPassword: MD5Digest(MLObject.OldPassword),
            NewPassword: MD5Digest(MLObject.NewPassword)
        }
        this.props.callFetchAPI(hostname, apiPath, postData).then((apiResult) => {
            this.setState({ IsCallAPIError: apiResult.IsError })
            this.showMessage(apiResult.Message);
        });
    }
    render() {
        let listElement1 = ElementList;
      //  listElement1[0].value = this.props.AppInfo.LoginInfo.LoginUserInfo.UserName;
        return (
            <React.Fragment>
                <SimpleForm FormName="Đổi mật khẩu" MLObjectDefinition={MLObjectDefinition} listelement={listElement1} url="http://localhost:8910/api/contact" onSubmit={this.handleSubmit}
                    FormCols="1"
                    FormMessage={this.state.CallAPIMessage} IsErrorMessage={this.state.IsCallAPIError}
                    BackLink=""
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        AppInfo: state,
        FetchAPIInfo: state.FetchAPIInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updatePagePath: (pagePath) => {
            dispatch(updatePagePath(pagePath));
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        }
    }
}

const ChangePassword = connect(mapStateToProps, mapDispatchToProps)(ChangePasswordCom);
export default ChangePassword;