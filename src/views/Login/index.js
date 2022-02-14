import React from 'react'
import { connect } from 'react-redux'
import { Button, Input, notification } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import { setCookie, getCookie } from '../../common/library/CommonLib.js'
import MD5Digest from '../../common/library/cryptography/MD5Digest.js'
import { AUTHEN_HOSTNAME, COOKIELOGIN, SESSION_EXPIRE_MINUTE } from '../../constants/systemVars.js'
import { callRegisterClient } from '../../actions/registerClient'
import { loginSuccess, callLogin, logout } from '../../actions/loginAction'
import './Login.css'

class LoginCom extends React.Component {
  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
    this.onTextChange = this.onTextChange.bind(this)
    this.state = {
      IsClickLoginButton: false,
      IsLoginSuccess: false,
      txtUserName: '',
      txtPassword: '',
      LoginMessage: '',
      txtremember: false
    }
  }

  onTextChange(e) {
    const ischecked = e.target.type == 'checkbox' ? e.target.checked : false
    const name = e.target.name
    let value = e.target.value
    if (e.target.type == 'checkbox') {
      value = ischecked
    }
    this.setState({ [name]: value })
  }

  onShowPassChange(e) {
    const ischecked = e.target.type == 'checkbox' ? e.target.checked : false
    var x = document.getElementsByName('txtPassword')[0]
    if (x.type === 'password' && ischecked) {
      x.type = 'text'
    } else {
      x.type = 'password'
    }
  }

  registerClient(username, password) {
    this.props.callRegisterClient(AUTHEN_HOSTNAME, username, password).then(registerResult => {
      if (!registerResult.IsError) {
        this.callLogin(username, password)
      } else {
        this.setState({ LoginMessage: registerResult.Message })
      }
    })
  }

  callLogin = (username, password) => {
    this.props.callLogin(username, password).then(loginResult => {
      if (!loginResult.IsError) {
        this.setState({ IsLoginSuccess: true })
        var LoginInfo = JSON.stringify(this.props.AuthenticationInfo.LoginInfo)
        localStorage.setItem('LoginInfo', LoginInfo)
        if (this.state.txtremember) {
          setCookie(COOKIELOGIN, LoginInfo, SESSION_EXPIRE_MINUTE)
        }
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        this.props.history.push(from)
        this.setState({ IsClickLoginButton: true })
      } else {
        this.setState({ IsClickLoginButton: false })
        this.openNotificationWithIcon('error', loginResult.Message)
      }
    })
  }

  componentDidMount() {
    let sessionlogin = getCookie(COOKIELOGIN)
    if (sessionlogin) {
      let LoginInfo = JSON.parse(sessionlogin)
      //   console.log("componentDidMount login",LoginInfo);
      this.props.loginSuccess(LoginInfo.LoginUserInfo, LoginInfo.TokenString, LoginInfo.Password)
      this.setState({ IsLoginSuccess: true })
    }
  }

  handleLogin(e) {
    e.preventDefault()
    this.setState({ IsClickLoginButton: true })
    const userName = this.state.txtUserName
    const passWord = MD5Digest(this.state.txtPassword)
    if (userName && this.state.txtPassword) {
      this.registerClient(userName, passWord)
    } else {
      this.openNotificationWithIcon('error', 'Vui lòng nhập tên truy cập hoặc mật khẩu')
      this.setState({ IsClickLoginButton: false })
    }
  }

  openNotificationWithIcon(type, message) {
    notification[type]({
      message: 'Thông báo',
      description: message
    })
  }

  render() {
    return (
      <div className="LoginCom">
        <div className="LoginCom__content">
          <div className="LoginCom__content__img">
            <img className="LoginCom__content__imgAvata" src="src/img/avatar/avatar_2x.png" />
          </div>
          <br />
          <form className="form-signin">
            <Input
              placeholder="Tên truy cập"
              autoFocus
              name="txtUserName"
              value={this.state.txtUserName}
              onChange={this.onTextChange}
              prefix={<UserOutlined />}
              size="large"
            />
            <br />
            <br />
            <Input
              type="password"
              placeholder="Mật khẩu"
              name="txtPassword"
              value={this.state.txtPassword}
              onChange={this.onTextChange}
              prefix={<LockOutlined />}
              size="large"
            />
            <br />
            <br />
            <div>
              <div>
                <input
                  type="checkbox"
                  name="txtremember"
                  id="txtremember"
                  checked={this.state.txtremember}
                  onChange={this.onTextChange}
                  className="custom-control-input"
                />
                <label className="custom-control-label" htmlFor="txtremember">
                  Nhớ mật khẩu
                </label>
              </div>
            </div>
            <div>
              <div>
                <input
                  type="checkbox"
                  name="txtshowpass"
                  id="txtshowpass"
                  onChange={this.onShowPassChange}
                  className="custom-control-input"
                />
                <label className="custom-control-label" htmlFor="txtshowpass">
                  Hiển thị mật khẩu
                </label>
              </div>
            </div>

            <br />
            <Button
              type="primary"
              block
              shape="round"
              loading={this.state.IsClickLoginButton}
              onClick={this.handleLogin}
            >
              Đăng nhập
            </Button>
          </form>
        </div>
      </div>
    )
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
      return dispatch(callRegisterClient(hostname, username, password))
    },
    logout: () => {
      dispatch(logout())
    }
  }
}

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginCom)
export default Login
