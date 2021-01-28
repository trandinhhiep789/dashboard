import React from "react";
import { connect } from 'react-redux';
import { ModalManager } from 'react-dynamic-modal';
import { Button } from 'antd'

import { setCookie, getCookie } from "../../common/library/CommonLib.js";
import { MessageModal } from "../../common/components/Modal";
import MD5Digest from "../../common/library/cryptography/MD5Digest.js";
import { AUTHEN_HOSTNAME, COOKIELOGIN, SESSION_EXPIRE_MINUTE } from "../../constants/systemVars.js";
import { callRegisterClient } from "../../actions/registerClient";
import { loginSuccess, callLogin, logout } from "../../actions/loginAction";


class LoginCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.state = {
            IsClickLoginButton: false,
            IsLoginSuccess: false,
            txtUserName: "",
            txtPassword: "",
            LoginMessage: "",
            txtremember: false
        };
    }

    showMessage(message) {
        ModalManager.open(<MessageModal title="Thông báo"
            message={message} onRequestClose={() => true}
        />);
    }

    onTextChange(e) {
        const ischecked = e.target.type == 'checkbox' ? e.target.checked : false;
        const name = e.target.name;
        let value = e.target.value;
        if (e.target.type == 'checkbox') {
            value = ischecked;
        }
        this.setState({ [name]: value });
    }

    registerClient(username, password) {
        this.props.callRegisterClient(AUTHEN_HOSTNAME, username, password).then((registerResult) => {
            if (!registerResult.IsError) {
                this.callLogin(username, password);
            }
            else {
                this.setState({ LoginMessage: registerResult.Message });
            }
        });
    }

    callLogin = (username, password) => {
        this.props.callLogin(username, password).then((loginResult) => {
            if (!loginResult.IsError) {
                this.setState({ IsLoginSuccess: true });
                var LoginInfo = JSON.stringify(this.props.AuthenticationInfo.LoginInfo);
                localStorage.setItem('LoginInfo', LoginInfo)
                if (this.state.txtremember) {
                    setCookie(COOKIELOGIN, LoginInfo, SESSION_EXPIRE_MINUTE);
                }
                const { from } = this.props.location.state || { from: { pathname: '/' } }
                this.props.history.push(from)
                this.setState({ IsClickLoginButton: true })
            }
            else {

                this.setState({ IsClickLoginButton: false })
                this.showMessage(loginResult.Message);
            }
        });
    }

    componentDidMount() {
        let sessionlogin = getCookie(COOKIELOGIN);
        if (sessionlogin) {
            let LoginInfo = JSON.parse(sessionlogin);
            //   console.log("componentDidMount login",LoginInfo);
            this.props.loginSuccess(LoginInfo.LoginUserInfo, LoginInfo.TokenString, LoginInfo.Password);
            this.setState({ IsLoginSuccess: true })
        }
    }

    handleLogin(e) {
        e.preventDefault();
        this.setState({ IsClickLoginButton: true });
        const userName = this.state.txtUserName;
        const passWord = MD5Digest(this.state.txtPassword);
        if (userName && this.state.txtPassword) {
            this.registerClient(userName, passWord);
        } else {
            this.showMessage("Vui lòng nhập tên truy cập hoặc mật khẩu");
            this.setState({ IsClickLoginButton: false })
        }
    }

    render() {
        return (
            <div className="container">
                <div className="cardlogin card-container">
                    <img id="profile-img" className="profile-img-card" src="src/img/avatar/avatar_2x.png" />
                    <p id="profile-name" className="profile-name-card"></p>
                    <form className="form-signin">
                        <span id="reauth-email" className="reauth-email"></span>
                        <input type="text" id="inputEmail" className="form-control" placeholder="Tên truy cập" autoFocus name="txtUserName" value={this.state.txtUserName} onChange={this.onTextChange} />
                        <input type="password" id="inputPassword" className="form-control" placeholder="Mật khẩu" name="txtPassword" value={this.state.txtPassword} onChange={this.onTextChange} />
                        <div className="form-group flexbox flex-column flex-md-row w-100">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" name="txtremember" id="txtremember" checked={this.state.txtremember} onChange={this.onTextChange} className="custom-control-input" />
                                <label className="custom-control-label" htmlFor="txtremember" >Nhớ mật khẩu</label>
                            </div>
                            <a className="text-muted hover-primary fs-13 mt-2 mt-md-0" href="#">Quên mật khẩu?</a>
                        </div>
                        {/* <button className="btn btn-lg btn-primary btn-block btn-signin" type="submit" onClick={this.handleLogin} >Đăng nhập</button> */}
                        <Button className="btn btn-lg btn-primary btn-block btn-signin" onClick={this.handleLogin} loading={this.state.IsClickLoginButton}>Đăng nhập</Button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        AuthenticationInfo: state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        callLogin: (username, password) => {
            return dispatch(callLogin(username, password))
        },
        loginSuccess: (loginInfo, token) => {
            return dispatch(loginSuccess(loginInfo, token))
        },
        callRegisterClient: (hostname, username, password) => {
            return dispatch(callRegisterClient(hostname, username, password));
        },
        logout: () => {
            dispatch(logout())
        },
    }
}

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginCom);
export default Login;
