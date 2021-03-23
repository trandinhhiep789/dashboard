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
        this.handleOnInputChange = this.handleOnInputChange.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false
        };
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

    showPassWord(name) {
        var x = document.getElementsByName(name)[0];
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }
    handleOnInputChange(name, value, formdata) {
        if (name == "txtPassWord") {
            this.setState({ PassWord: value });
        } else if (name == "txtPassWordConfirm") {
            this.setState({ PassWordConfirm: value });
        } else if (name == "chkShowPassWord") {
            this.showPassWord("txtPassWord");
            this.showPassWord("txtPassWordConfirm");
            this.showPassWord("txtOldPassWord");
            return;
        }
    }

    handleSubmit(formData, MLObject) {
        //check password valid
        let { PassWord, PassWordConfirm } = this.state;
        if (PassWord != PassWordConfirm) {
            this.setState({ IsCallAPIError: true });
            this.showMessage("Xác nhận mật khẩu chưa đúng.");
            return false;
        }

        const hostname = "TMSAPI";
        const apiPath = "api/PartnerUser/UpdatePassWordUserPartner";
        let userLogin = this.props.AppInfo.LoginInfo.Username;
        const postData = {
            Username: userLogin,
            Password: MLObject.PassWord,
            PasswordOld: MLObject.OldPassWord,
            UpdatedUser: userLogin,
            PasswordMd5: MD5Digest(MLObject.PassWord)
        }
        this.props.callFetchAPI(hostname, apiPath, postData).then((apiResult) => {
            this.setState({ IsCallAPIError: apiResult.IsError })
            this.showMessage(apiResult.Message);
        });
        //console.log("postdata", postData);
    }
    render() {
        //let listElement1 = ElementList;
        //let user = this.props.AppInfo.LoginInfo.Username;
        //listElement1[0].value = this.props.AppInfo.LoginInfo.Username;
        // const dataSource = {
        //     UserName: this.state.UserName
        // }
        return (
            <React.Fragment>
                <SimpleForm
                    FormName="Đổi mật khẩu"
                    MLObjectDefinition={MLObjectDefinition}
                    listelement={ElementList}
                    onValueChange={this.handleOnInputChange}
                    //url="http://localhost:8910/api/contact"
                    onSubmit={this.handleSubmit}
                    FormCols="1"
                    //dataSource={dataSource}
                    FormMessage={this.state.CallAPIMessage}
                    IsErrorMessage={this.state.IsCallAPIError}
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