// react library
import React from "react";
import { Link, Redirect, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { connect } from "react-redux";

// ACTIONS
import { callClearLocalCache, callGetCacheFromLocal } from "../../actions/cacheAction";
import { callLogin, loginFailure, loginRequest, loginSuccess } from "../../actions/loginAction";
import { callFetchAPI } from "../../actions/fetchAPIAction";

// LAYOUTS
import AppPath from "../Layout/AppPath";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";

// VIEWS
import AccountInfo from "../../views/Account";
import CacheManager from "../../views/System/CacheManager";
import ChangePassword from "../../views/ChangePassword";
import Dashboard from "../../views/Dashboard";
import Forms from "../../views/Test/Forms";
import PageTest from "../../views/Test/PageTest";
import PageUI from "../../views/Test/PageUI";
import PartnerUI from "../../views/Test/PartnerUI";
import TestCache from "../../views/Test/TestCache";
import TestFormContainer from "../../views/Test/TestFormContainer";
import TestModal from "../../views/Test/TestModal";
import TestPageLayout from "../../views/Test/TestPageLayout";
import TestTabs from "../../views/Test/TestTabs";
import UseGuide from "../../views/UseGuide";

// OTHERS
import { COOKIELOGIN } from "../../constants/systemVars.js";
import NotFound from "../NotFound";
import { PagePath, HiddenAppPath } from "./constants";
import PrivateRoute from "../../Route/PrivateRoute";
import { getCookie } from "../../common/library/CommonLib.js";

class HomeCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: true,
            isShowAppPath: true
        };

        this.handleIsShowAppPath = this.handleIsShowAppPath.bind(this);
    }

    componentDidMount() {
        const LoginInfo = localStorage.getItem("LoginInfo");

        if (!this.props.AuthenticationInfo.LoginInfo.IsLoginSuccess) {
            if (LoginInfo) {
                const LoginInfo1 = JSON.parse(LoginInfo);
                this.props.loginSuccess(LoginInfo1.LoginUserInfo, LoginInfo1.TokenString, LoginInfo1.Password);
                this.setState({ isLoggedIn: true });
                this.callLoadCacheList(LoginInfo1.LoginUserInfo.UserName);
            } else {
                this.setState({ isLoggedIn: false });
            }
        } else {
            this.callLoadCacheList(this.props.AuthenticationInfo.LoginInfo.Username);
        }
    }

    componentWillReceiveProps(nextProps) {
        // if (JSON.stringify(this.props.AuthenticationInfo) !== JSON.stringify(nextProps.AuthenticationInfo)) {
        //     const LoginInfo = localStorage.getItem('LoginInfo');
        //     if (!this.props.AuthenticationInfo.LoginInfo.IsLoginSuccess) {
        //         if (LoginInfo) {
        //             const LoginInfo1 = JSON.parse(LoginInfo)
        //             this.props.loginSuccess(LoginInfo1.LoginUserInfo, LoginInfo1.TokenString, LoginInfo1.Password);
        //             this.setState({ isLoggedIn: true })
        //         }
        //         else {
        //             this.setState({ isLoggedIn: false })
        //         }
        //     }
        // }

        this.handleIsShowAppPath();
    }

    callLoadCacheList(userName) {
        const APIHostName = "CacheAPI";
        this.props.callFetchAPI(APIHostName, "api/Cache/GetCacheList", userName).then((apiResult) => {
            //console.log("callLoadCacheList", apiResult);
            if (!apiResult.IsError) {
                const listCacheItem = apiResult.ResultObject.ListCacheItem;
                listCacheItem.map((cacheItem) => {
                    this.props.callGetCacheFromLocal(cacheItem.CacheKeyID).then((cacheItemLocal) => {
                        if (cacheItemLocal != null) {
                            if (cacheItemLocal.CreatedDate < cacheItem.CacheVersionDate) {
                                this.props.callClearLocalCache(cacheItem.CacheKeyID);
                            }
                        }
                    });
                });
            }
        });
    }
    handleIsShowAppPath() {
        const found = HiddenAppPath.findIndex(item => item == this.props.location.pathname);

        if (found != -1) {
            this.setState({
                isShowAppPath: false
            })
        } else {
            this.setState({
                isShowAppPath: true
            })
        }
    }

    render() {
        const { isLoggedIn, isShowAppPath } = this.state;
        const isRelogin = this.props.AuthenticationInfo.LoginInfo.IsRelogin;

        return (
            <React.Fragment>
                <Spin className="ant-spin-custom" spinning={this.props.AuthenticationInfo.FetchAPIInfo.IsFetchAPICompleted === false && this.props.AuthenticationInfo.FetchAPIInfo.HostURL} size="large">
                    <Header />
                    <main className="main-container">
                        <div className="main-content">
                            {isShowAppPath && <AppPath />}

                            <div className="row">
                                {/* {this.props.AuthenticationInfo.FetchAPIInfo.IsFetchAPICompleted === false && this.props.AuthenticationInfo.FetchAPIInfo.HostURL ? <div className="preloader"><div className="spinner-linear"><div className="line"></div></div></div> : ''} */}

                                <Switch>
                                    <PrivateRoute exact path="/" component={Dashboard} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/accountinfo" component={AccountInfo} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/PageUI" component={PageUI} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />

                                    <PrivateRoute path="/PartnerUI" component={PartnerUI} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />

                                    <PrivateRoute path="/TestModal" component={TestModal} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/TestCache" component={TestCache} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/TestFormContainer" component={TestFormContainer} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/TestTabs" component={TestTabs} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/TestPageLayout" component={TestPageLayout} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/changepassword" component={ChangePassword} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/CacheManager" component={CacheManager} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/Forms" component={Forms} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />

                                    

                                    <PrivateRoute path="*" component={NotFound} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                </Switch>
                            </div>
                        </div>
                    </main>
                    <Footer />
                </Spin>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        AuthenticationInfo: state,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updatePagePath: (pagePath) => {
            dispatch(updatePagePath(pagePath));
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        callGetCacheFromLocal: (cacheKeyID) => {
            return dispatch(callGetCacheFromLocal(cacheKeyID));
        },
        callClearLocalCache: (cacheKeyID) => {
            return dispatch(callClearLocalCache(cacheKeyID));
        },
        loginSuccess: (loginInfo, token, password) => {
            return dispatch(loginSuccess(loginInfo, token, password));
        },
    };
};

const Home = connect(mapStateToProps, mapDispatchToProps)(HomeCom);
export default Home;
