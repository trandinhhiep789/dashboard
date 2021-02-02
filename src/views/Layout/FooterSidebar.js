import React from 'react';
import { Link } from "react-router-dom";

class FooterSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: ""
        }
    }

    componentDidMount() {
        const LoginInfo = localStorage.getItem('LoginInfo');
        if (LoginInfo) {
            const LoginInfo1 = JSON.parse(LoginInfo);
            this.setState({ fullName: LoginInfo1.LoginUserInfo.FullName });
        }
    }

    render() {
        const { fullName } = this.state;
        return (
            <div className="footer-sidebar" >
                <div className="profile">
                    <img className="avatar" src="/src/img/avatar/1.jpg" alt="..." />
                    <div className="profile-name">{fullName}</div>
                </div>
                <div>
                    <Link className="link-logout" to="/logout"><i className="fa fa-sign-out"></i></Link>
                </div>
            </div>
        )
    }
}

export default FooterSidebar
