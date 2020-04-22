import React from "react";
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import AppRoute from '../../Route/AppRoute';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import AppPath from '../Layout/AppPath';
import { PagePath } from "./constants"
import { updatePagePath } from "../../actions/pageAction";
import { COOKIELOGIN, } from "../../constants/systemVars.js";
import { loginRequest, loginSuccess, loginFailure, callLogin } from "../../actions/loginAction";
import { getCookie } from "../../common/library/CommonLib.js";
import "../../css/custom.scss";
import PrivateRoute from '../../Route/PrivateRoute'


import TestModal from '../../views/Test/TestModal';
import TestCache from '../../views/Test/TestCache';
import TestFormContainer from '../../views/Test/TestFormContainer';
import TestTabs from '../../views/Test/TestTabs';
import TestPageLayout from '../../views/Test/TestPageLayout';
import CacheManager from '../../views/System/CacheManager';
import Dashboard from '../../views/Dashboard';
import AccountInfo from '../../views/Account';
import PartnerType from '../../views/TMS/PartnerType';
import CancelDeliveryReason from '../../views/TMS/MD/CancelDeliveryReason';
import CarrierType from '../../views/TMS/MD/CarrierType';
import Partner from '../../views/TMS/MD/Partner';
import PackageType from '../../views/TMS/MD/PackageType';
import ShipmentFeePaymentMethod from '../../views/TMS/MD/ShipmentFeePaymentMethod';
import ShipmentServiceType from '../../views/TMS/MD/ShipmentServiceType';
import ShipmentOrderStatus from '../../views/TMS/MD/ShipmentOrderStatus';
import ShipmentGoodsType from '../../views/TMS/MD/ShipmentGoodsType';
import ShipmentOrderType from '../../views/TMS/MD/ShipmentOrder/ShipmentOrderType';



class HomeCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: true
        }
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        var addScript = document.createElement('script');
        addScript.setAttribute('src', '/src/js/core.min.js');
        document.body.appendChild(addScript);

        // let sessionlogin = getCookie(COOKIELOGIN);
        // if (sessionlogin) {
        //     let LoginInfo = JSON.parse(sessionlogin);
        //     //console.log("Login.componentDidMount LoginInfo: ", LoginInfo);
        //     //console.log("Login.componentDidMount LoginInfo.Password: ", LoginInfo.Password);
        //     this.props.loginSuccess(LoginInfo.LoginUserInfo, LoginInfo.TokenString, LoginInfo.Password);
        //     this.setState({ isLoggedIn: true })
        // }
        const LoginInfo = localStorage.getItem('LoginInfo');
        //console.log('home LoginInfo', LoginInfo)
        if (LoginInfo) {
            const LoginInfo1 = JSON.parse(LoginInfo)
            this.props.loginSuccess(LoginInfo1.LoginUserInfo, LoginInfo1.TokenString, LoginInfo1.Password);
            this.setState({ isLoggedIn: true })
        }
        else {
            this.setState({ isLoggedIn: false })

        }

    }

    render() {
        // const { match } = this.props;
        let isShowAppPath = true;
        // if (this.props.location.pathname == "/dashboard") {
        //     isShowAppPath = false;
        // }
        // let isLoggedIn = this.props.AuthenticationInfo.LoginInfo.IsLoginSuccess;
        // if (!isLoginSuccess) {
        //     <Redirect to="/login" />
        // }
        //console.log("Home", isLoginSuccess);
        //console.log(isLoginSuccess);
        // let fullName = "";
        // if (isLoggedIn) {
        //     fullName = this.props.AuthenticationInfo.LoginInfo.LoginUserInfo.FullName;
        // }
        // if (this.props.location.pathname.toUpperCase() != "/LOGIN" && window.isReload != true) {
        //     return <Redirect
        //         to={{
        //             pathname: '/login',
        //             state: { from: this.props.location }
        //         }}
        //     />
        // }
        // isLoggedIn = true
        // console.log({ isLoggedIn })
        const { isLoggedIn } = this.state
        return (
            <React.Fragment>
                <Header />
                <main className="main-container">
                    <div className="main-content">
                        {isShowAppPath &&
                            <AppPath />
                        }
                        <div className="row">
                            {this.props.AuthenticationInfo.FetchAPIInfo.IsFetchAPICompleted === false && this.props.AuthenticationInfo.FetchAPIInfo.HostURL ? <div className="preloader"><div className="spinner-linear"><div className="line"></div></div></div> : ''}
                            {/* <Route path="/home" render={() => (
                                !isLoginSuccess ? (
                                    <Redirect to="/login" />
                                ) : (
                                        <React.Fragment>
                                            <AppRoute isLoginSuccess/>
                                        </React.Fragment>
                                    )
                            )} /> */}
                            <Switch>
                                <PrivateRoute exact path="/" component={Dashboard} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/accountinfo" component={AccountInfo} isLoggedIn={isLoggedIn} />
                               
                                <PrivateRoute path="/TestModal" component={TestModal} isLoggedIn={isLoggedIn} />

                                <PrivateRoute path="/TestCache" component={TestCache} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/TestFormContainer" component={TestFormContainer} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/TestTabs" component={TestTabs} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/TestPageLayout" component={TestPageLayout} isLoggedIn={isLoggedIn} />


                              
                                <PrivateRoute path="/CacheManager" component={CacheManager} isLoggedIn={isLoggedIn} />
                                {/* <PrivateRoute path="*" component={Category} isLoggedIn={isLoggedIn} /> */}

                                {/*menu tận tâm*/}
                                <PrivateRoute path="/CancelDeliveryReason" component={CancelDeliveryReason} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/CarrierType" component={CarrierType} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/Partner" component={Partner} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/PartnerType" component={PartnerType} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/PackageType" component={PackageType} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/ShipmentFeePaymentMethod" component={ShipmentFeePaymentMethod} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/ShipmentServiceType" component={ShipmentServiceType} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/ShipmentGoodsType" component={ShipmentGoodsType} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/ShipmentOrderStatus" component={ShipmentOrderStatus} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/ShipmentOrderType" component={ShipmentOrderType} isLoggedIn={isLoggedIn} />
                            </Switch>
                        </div>
                    </div>
                </main>
                <Footer />
            </React.Fragment>
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
        updatePagePath: (pagePath) => {
            dispatch(updatePagePath(pagePath));
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        loginSuccess: (loginInfo, token) => {
            return dispatch(loginSuccess(loginInfo, token))
        },
    }
}

const Home = connect(mapStateToProps, mapDispatchToProps)(HomeCom);
export default Home;