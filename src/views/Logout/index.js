import React from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';
import { logout } from "../../actions/loginAction";
import { MessageModal } from "../../common/components/Modal";
import { COOKIELOGIN } from '../../constants/systemVars'
import { callFetchAPI } from "../../actions/fetchAPIAction";
import { deleteCookie } from "../../common/library/CommonLib.js";
import { clearAllLocalCacheData } from "../../common/library/CommonLib.js";

class LogoutCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.state = { IsLogoutSuccess: false };
    }
    handleCloseMessage() {
        /*if(!this.state.IsCallAPIError)
        {
           
        }  */
    }
    showMessage(message) {
        ModalManager.open(<MessageModal title="Thông báo"
            message={message} onRequestClose={() => true}
            onCloseModal={this.handleCloseMessage}
        />);
    }

    componentDidMount() {
        const hostname = "AuthenAPI";
        const apiPath = "api/Authentication/Logout";
        const postData = {};
        this.props.callFetchAPI(hostname, apiPath, postData).then((apiResult) => {
            if (!apiResult.IsError) {
                this.props.addLogout();
                this.setState({ IsLogoutSuccess: true });
            }
            else {
                //this.setState({IsCallAPIError: apiResult.IsError})
                this.props.addLogout();
                this.setState({ IsLogoutSuccess: true });
                this.props.history.push("/login");
                //this.showMessage(apiResult.Message);

            }
        });
        deleteCookie(COOKIELOGIN);
        clearAllLocalCacheData();
        localStorage.removeItem('LoginInfo')
    }

    delete_cookie(name) {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    

    render() {
        if (this.state.IsLogoutSuccess) {
            return <Redirect to="" />;
        }
        return (
            <div align="center"><br /><br /> <br /> <br /> <br />
                Đang đăng xuất....
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        AppInfo: state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addLogout: () => {
            dispatch(logout())
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        }

    }
}

const Logout = connect(mapStateToProps, mapDispatchToProps)(LogoutCom);
export default Logout;