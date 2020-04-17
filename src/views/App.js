import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import Home from "./Home";
import Login from "./Login";
import Logout from "./Logout";
import ModalRoot from '../common/components/Modal/ModalRoot';

class AppCom extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const isLoginSuccess = this.props.AuthenticationInfo.LoginInfo.IsLoginSuccess;
        return (
            <Router>
                <div id="mainRouter">
                    <ModalRoot />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/logout" component={Logout} />
                        <Route path="*" component={Home} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = state => {
    return {
        AuthenticationInfo: state
    }
}

const App = connect(mapStateToProps, null)(AppCom);
export default App;
