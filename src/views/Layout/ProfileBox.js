import React from "react";
import ReactDOM from "react-dom";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Menu, Dropdown } from 'antd';

const { SubMenu } = Menu;

//import "../../CSS/dropdownmenu.css";
import Avatar from '../../img/avatar/1.jpg'
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

    menu() {
        return <Menu className="dropdown-custom">
            <Menu.Item key="accountinfo">
                <Link to="/accountinfo"><i className="ti-user"></i>{"  "}Thông tin cá nhân</Link>
            </Menu.Item>
            <Menu.Item key="CacheManager">
                <Link to="/CacheManager"><i className="ti-lock"></i>{"  "}Quản lý cache</Link>
            </Menu.Item>
            <Menu.Item key="changepassword">
                <Link to="/changepassword"><i className="ti-lock"></i>{"  "}Đổi mật khẩu</Link>
            </Menu.Item>
            <Menu.Item key="UseGuide">
                <Link to="/UseGuide"><i className="ti-lock"></i>{"  "}Hướng dẫn sử dụng</Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="PageUI">
                <Link to="/PageUI"><i className="ti-lock"></i>{"  "}Page UI</Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="logout">
                <Link to="/logout"><i className="ti-power-off"></i>{"  "}Đăng xuất</Link>
            </Menu.Item>
        </Menu >
    }

    render() {
        const { fullName } = this.state;
        return (
            // <li className="dropdown">
            //     <span className="topbar-btn" data-toggle="dropdown">
            //         {fullName} &nbsp;
            // <img className="avatar" src="/src/img/avatar/1.jpg" alt="..." /></span>
            //     <div className="dropdown-menu dropdown-menu-right">
            //         <Link className="dropdown-item" to="/accountinfo"><i className="ti-user"></i>Thông tin cá nhân</Link>
            //         <Link className="dropdown-item" to="/CacheManager"><i className="ti-lock"></i>Quản lý cache</Link>
            //         <Link className="dropdown-item" to="/changepassword"><i className="ti-lock"></i>Đổi mật khẩu</Link>
            //         <Link className="dropdown-item" to="/UseGuide"><i className="ti-lock"></i>Hướng dẫn sử dụng</Link>
            //         <div className="dropdown-divider"></div>
            //         <Link className="dropdown-item" to="/PageUI"><i className="ti-lock"></i>Page UI</Link>
            //         <div className="dropdown-divider"></div>
            //         <Link className="dropdown-item" to="/logout"><i className="ti-power-off"></i>Đăng xuất</Link>
            //     </div>
            // </li>
            <Dropdown overlay={this.menu} trigger={["click"]}>
                <a className="ant-dropdown-link">
                    <span>{fullName}</span>&nbsp;<img className="avatar" src="/src/img/avatar/1.jpg" alt="..." />
                </a>
            </Dropdown >

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
