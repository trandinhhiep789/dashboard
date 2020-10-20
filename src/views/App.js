import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, HashRouter, Route, Switch, Router } from 'react-router-dom';
import { connect } from 'react-redux';
// import Home from "./Home";
// import Login from "./Login";
// import Logout from "./Logout";
// import ModalRoot from '../common/components/Modal/ModalRoot';

const Home = React.lazy(() => import('./Home'));
const Login = React.lazy(() => import('./Login'));
const Logout = React.lazy(() => import('./Logout'));
const ModalRoot = React.lazy(() => import('../common/components/Modal/ModalRoot'));

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

class AppCom extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // this.props.updatePagePath(PagePath);
        var addScript = document.createElement('script');
        addScript.setAttribute('src', '/src/js/core.min.js');
        document.body.appendChild(addScript);
    }

    render() {

        return (
            <BrowserRouter>
                <React.Suspense fallback={loading()}>
                    <div id="mainRouter">
                        <ModalRoot />
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/login" component={Login} />
                            <Route path="/logout" component={Logout} />
                            <Route path="*" component={Home} />

                        </Switch>
                    </div>
                </React.Suspense>
            </BrowserRouter>
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
