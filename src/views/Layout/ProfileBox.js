import React from "react";
import ReactDOM from "react-dom";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
//import "../../CSS/dropdownmenu.css";
class ProfileBoxCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: ''
        }
    }

    componentDidMount() {
       

        const LoginInfo = localStorage.getItem('LoginInfo');
        //console.log('home LoginInfo', LoginInfo)
        if (LoginInfo) {
            const LoginInfo1 = JSON.parse(LoginInfo)
            //console.log('home LoginInfo1', LoginInfo1)
            this.setState({ fullName: LoginInfo1.LoginUserInfo.FullName })
        }
    }

    render() {
        const { fullName } = this.state;
        return (
            <li className="dropdown">
                <span className="topbar-btn" data-toggle="dropdown">
                    {fullName} &nbsp;
            <img className="avatar" src="/src/img/avatar/1.jpg" alt="..." /></span>
                <div className="dropdown-menu dropdown-menu-right">
                    <Link className="dropdown-item" to="/accountinfo"><i className="ti-user"></i>Thông tin cá nhân</Link>
                    <Link className="dropdown-item" to="/CacheManager"><i className="ti-lock"></i>Quản lý cache</Link>
                    <Link className="dropdown-item" to="/changepassword"><i className="ti-lock"></i>Đổi mật khẩu</Link>
                    <Link className="dropdown-item" to="/UseGuide"><i className="ti-lock"></i>Hướng dẫn sử dụng</Link>

                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="/logout"><i className="ti-power-off"></i>Đăng xuất</Link>
                </div>
            </li>
        );
    }
}

const mapStateToProps = state => {
    return {
        AuthenticationInfo: state
    }
}



const ProfileBox = connect(mapStateToProps, null)(ProfileBoxCom);
export default ProfileBox;
