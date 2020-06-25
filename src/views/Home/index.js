import React from "react";
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
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
import ShipmentOrderStep from '../../views/TMS/MD/ShipmentOrderStep';
import PartnerPriviledgeGroup from '../../views/TMS/MD/PartnerPriviledge/PartnerPriviledgeGroup';
import ShipmentOrder from '../../views/TMS/ShipmentOrder';
import MapContainer from '../../views/TMS/ShipmentOrder/Component/MapContainer ';
import Maps from '../../views/TMS/ShipmentOrder/Component/Maps';
import McPriviledge from '../../views/TMS/MD/PartnerPriviledge/McPriviledge';
import PartnerRole from '../../views/TMS/MD/PartnerPriviledge/PartnerRole';
import PartnerUser from '../../views/TMS/MD/PartnerPriviledge/PartnerUser';
import InstallBundle from '../../views/TMS/MD/Installed/InstallBundle';
import InstallMaterial from '../../views/TMS/MD/Installed/InstallMaterial';
import ServiceAgreement from '../../views/TMS/ServiceAgreement';
import ShipmentFeeType from '../../views/TMS/MD/ShipmentFeeType';
import ServiceType from '../../views/TMS/MD/ServiceType';
import ServiceSeasonType from '../../views/TMS/MD/ServiceSeasonType';
import ServiceAgreementType from '../../views/TMS/MD/ServiceAgreementType';
import IDDocumentType from '../../views/TMS/MD/IDDocumentType';
import UserCoordinator from '../../views/TMS/User/UserCoordinator';
import UserGroup from '../../views/TMS/User/UserGroup';





import NotFound from '../NotFound'

class HomeCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: true
        }
    }

    componentDidMount() {
        // this.props.updatePagePath(PagePath);
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
        //console.log('home props.AuthenticationInfo ', this.props.AuthenticationInfo);
        if(!this.props.AuthenticationInfo.LoginInfo.IsLoginSuccess)
        {
            if (LoginInfo) {
                const LoginInfo1 = JSON.parse(LoginInfo)
             //   console.log("componentDidMount Home",LoginInfo1,LoginInfo1.Password);
                this.props.loginSuccess(LoginInfo1.LoginUserInfo, LoginInfo1.TokenString,"e10adc3949ba59abbe56e057f20f883e");
                this.setState({ isLoggedIn: true })
            }
            else {
                this.setState({ isLoggedIn: false })
    
            }
        }
        //console.log('home LoginInfo', LoginInfo)
        

    }

    render() {
        let isShowAppPath = true;
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
                                <PrivateRoute path="/ShipmentOrderStep" component={ShipmentOrderStep} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/PartnerPriviledgeGroup" component={PartnerPriviledgeGroup} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/PartnerPriviledge" component={McPriviledge} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/PartnerRole" component={PartnerRole} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/PartnerUser" component={PartnerUser} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/ShipmentFeeType" component={ShipmentFeeType} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/ServiceAgreement" component={ServiceAgreement} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/ServiceType" component={ServiceType} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/ServiceSeasonType" component={ServiceSeasonType} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/ServiceAgreementType" component={ServiceAgreementType} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/IDDocumentType" component={IDDocumentType} isLoggedIn={isLoggedIn} />

                                <PrivateRoute path="/ShipmentOrder" component={ShipmentOrder} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/Maps" component={MapContainer} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/Map" component={Maps} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/InstallBundle" component={InstallBundle} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/InstallMaterial" component={InstallMaterial} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/UserCoordinator" component={UserCoordinator} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/UserGroup" component={UserGroup} isLoggedIn={isLoggedIn} />
                                
                                <PrivateRoute path="*" component={NotFound} isLoggedIn={isLoggedIn} />

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
        loginSuccess: (loginInfo, token,password) => {
            return dispatch(loginSuccess(loginInfo, token, password))
        },
    }
}

const Home = connect(mapStateToProps, mapDispatchToProps)(HomeCom);
export default Home;