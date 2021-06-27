import React, { Component } from 'react'
import { connect } from 'react-redux'

export class AccountInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: ''
        }
    }

    componentDidMount() {
        const LoginInfo = localStorage.getItem('LoginInfo');
        if (LoginInfo) {
            const LoginInfo1 = JSON.parse(LoginInfo)
            this.setState({ fullName: LoginInfo1.LoginUserInfo.FullName })
        }
    }

    render() {
        const { fullName } = this.state;
        return (
            <div>
                {fullName}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo)
