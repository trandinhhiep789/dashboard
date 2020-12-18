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
import { callFetchAPI } from "../../actions/fetchAPIAction";
import { callGetCacheFromLocal, callClearLocalCache } from "../../actions/cacheAction";
import { getCookie } from "../../common/library/CommonLib.js";

import PrivateRoute from '../../Route/PrivateRoute'

import PageUI from '../../views/Test/PageUI';
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
import WorkingPlan from '../../views/TMS/WorkingPlan';
import ShipmentOrderControl from '../../views/TMS/ShipmentOrderControl';
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
import PartnerTransaction from '../../views/TMS/MD/PartnerTransaction';
import CoordinatorStore from '../../views/TMS/MD/CoordinatorStore';
import Skill from "../TMS/MD/Skill";
import SkillCategory from "../TMS/MD/SkillCategory";
import SkillRank from "../TMS/MD/SkillRank";
import Vehicle from '../../views/TMS/MD/Vehicle';
import WorkingShift from '../../views/TMS/MD/WorkingShift';
import Area from "../TMS/MD/Area";
import AreaType from "../TMS/MD/AreaType";
import UserSkill from "../TMS/User/UserSkill";
import MaterialGroup from "../TMS/MD/MaterialGroup";
import PartnerPayable from '../../views/TMS/PartnerPayable';
import Compute from '../../views/TMS/PartnerPayable/Compute';
import PartnerPayableDetail from '../../views/TMS/PartnerPayable/PartnerPayableDetail';
import ApiCallLog from "../TMS/MD/ApiCallLog";
import AdvanceRequest from "../TMS/MD/AdvanceRequest";
import AdvanceRequestType from "../TMS/MD/AdvanceRequestType";
import DestroyRequestType from "../TMS/MD/DestroyRequestType";
import LimitType from "../TMS/MD/Limit/LimitType";
import UserLimit from "../TMS/MD/Limit/UserLimit";
import UserLimitTest from "../TMS/MD/Limit/UserLimit/Search/indexNew.js";
import DestroyRequest from "../TMS/DestroyRequest";
import InventoryRequest from "../TMS/InventoryRequest";
import RewardPriceTable from "../TMS/MD/RewardPrice/RewardPriceTable";
import UseGuide from "../../views/UseGuide";
import CurrentAdvanceDebt from "../TMS/CurrentAdvanceDebt";


import NotFound from '../NotFound'
import InventoryRequestType from "../TMS/MD/InventoryRequestType";
import RewardType from "../TMS/MD/RewardType";
import RewardPriceType from "../TMS/MD/RewardPriceType";
import RewardPosition from "../TMS/MD/RewardPosition";
import ShipmentOrderStatusGroup from "../TMS/MD/ShipmentOrderStatusGroup";
import RewardPosition_User from "../TMS/MD/RewardPosition_User";
import ShipmentSetupType from "../TMS/MD/ShipmentSetupType";

import ReportByDate from "../TMS/ReportShipmentOrder/ReportByDate";
import ReportByStore from "../TMS/ReportShipmentOrder/ReportByStore";
import ReportByUser from "../TMS/ReportShipmentOrder/ReportByUser";
import DebtByUser from "../TMS/ReportShipmentOrder/DebtByUser";

import RewardShipmentOrderByType from "../TMS/Reward/RewardShipmentOrderByType";
import RewardShipmentOrder from "../TMS/Reward/RewardShipmentOrder";
import RewardShipmentOrderByUser from "../TMS/Reward/RewardShipmentOrderByUser";
import RewardCompute from "../TMS/Reward/RewardCompute";
import TotalRewardExport from "../TMS/Reward/TotalRewardExport";
import RewardDetailExport from "../TMS/Reward/RewardDetailExport";

import UserRewardStore from "../TMS/MD/RewardStoreUser";
import FuelPrice from "../TMS/MD/FuelPrice";
import AppFeedBackPriority from "../TMS/MD/AppFeedBack/AppFeedBackPriority";
import AppFeedBackStatus from "../TMS/MD/AppFeedBack/AppFeedBackStatus";
import AppFeedBackQuality from "../TMS/MD/AppFeedBack/AppFeedBackQuality";
import AppFeedBackPermission from "../TMS/MD/AppFeedBack/AppFeedBackPermission";
import AppFeedBackStep from "../TMS/MD/AppFeedBack/AppFeedBackStep";
import AppFeedBackGroup from "../TMS/MD/AppFeedBack/AppFeedBackGroup";
import AppFeedBackCategory from "../TMS/MD/AppFeedBack/AppFeedBackCategory";
import AppFeedBackType from "../TMS/MD/AppFeedBack/AppFeedBackType";
import RewardComputeSchedule from "../TMS/MD/RewardComputeSchedule";
import RewardComputeLog from "../TMS/MD/RewardComputeLog";
import ShipmentOrderStepGroup from "../TMS/MD/ShipmentOrderStepGroup";


class HomeCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: true
        }
    }

    componentDidMount() {
        // this.props.updatePagePath(PagePath);

        const LoginInfo = localStorage.getItem('LoginInfo');
        //console.log("componentDidMount this.props.AuthenticationInfo", this.props.AuthenticationInfo);
        if (!this.props.AuthenticationInfo.LoginInfo.IsLoginSuccess) {
            if (LoginInfo) {
                const LoginInfo1 = JSON.parse(LoginInfo)
                this.props.loginSuccess(LoginInfo1.LoginUserInfo, LoginInfo1.TokenString, LoginInfo1.Password);
                this.setState({ isLoggedIn: true });
                this.callLoadCacheList(LoginInfo1.LoginUserInfo.UserName);
            }
            else {
                this.setState({ isLoggedIn: false })
            }
        }
        else {
            this.callLoadCacheList(this.props.AuthenticationInfo.LoginInfo.Username);

        }
    }

    callLoadCacheList(userName) {
        const APIHostName = "CacheAPI";
        this.props.callFetchAPI(APIHostName, 'api/Cache/GetCacheList', userName).then(apiResult => {

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
                    }

                    );
                }

                );
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.AuthenticationInfo) !== JSON.stringify(nextProps.AuthenticationInfo)) {
            const LoginInfo = localStorage.getItem('LoginInfo');

            if (!this.props.AuthenticationInfo.LoginInfo.IsLoginSuccess) {
                if (LoginInfo) {
                    const LoginInfo1 = JSON.parse(LoginInfo)
                    this.props.loginSuccess(LoginInfo1.LoginUserInfo, LoginInfo1.TokenString, LoginInfo1.Password);
                    this.setState({ isLoggedIn: true })
                }
                else {
                    this.setState({ isLoggedIn: false })
                }
            }
        }
    }

    render() {
        let isShowAppPath = true;
        const { isLoggedIn } = this.state;
        const isRelogin = this.props.AuthenticationInfo.LoginInfo.IsRelogin;
        // console.log("Home this.props.AuthenticationInfo.LoginInfo: ", this.props.AuthenticationInfo.LoginInfo);

           

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
                                <PrivateRoute exact path="/" component={Dashboard} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/accountinfo" component={AccountInfo} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/PageUI" component={PageUI} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/TestModal" component={TestModal} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/TestCache" component={TestCache} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/TestFormContainer" component={TestFormContainer} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/TestTabs" component={TestTabs} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/TestPageLayout" component={TestPageLayout} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />

                                <PrivateRoute path="/CacheManager" component={CacheManager} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
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
                                <PrivateRoute path="/ShipmentOrderStatusGroup" component={ShipmentOrderStatusGroup} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/ShipmentOrderType" component={ShipmentOrderType} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/ShipmentOrderStep" component={ShipmentOrderStep} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/ShipmentOrderStepGroup" component={ShipmentOrderStepGroup} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/ShipmentSetupType" component={ShipmentSetupType} isLoggedIn={isLoggedIn} />
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
                                <PrivateRoute path="/PartnerTransaction" component={PartnerTransaction} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/CoordinatorStore" component={CoordinatorStore} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/Skill" component={Skill} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/SkillCategory" component={SkillCategory} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/SkillRank" component={SkillRank} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/UserSkill" component={UserSkill} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/MaterialGroup" component={MaterialGroup} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/LimitType" component={LimitType} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/UserLimit" component={UserLimit} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/UserLimitTest" component={UserLimitTest} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/Vehicle" component={Vehicle} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/WorkingShift" component={WorkingShift} isLoggedIn={isLoggedIn} />

                                <PrivateRoute path="/RewardPriceTable" component={RewardPriceTable} isLoggedIn={isLoggedIn} />

                                <PrivateRoute path="/CurrentAdvanceDebt" component={CurrentAdvanceDebt} isLoggedIn={isLoggedIn} />

                                <PrivateRoute path="/ReportByDate" component={ReportByDate} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/ReportByStore" component={ReportByStore} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/ReportByUser" component={ReportByUser} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/DebtByUser" component={DebtByUser} isLoggedIn={isLoggedIn} />

                                <PrivateRoute path="/RewardShipmentOrderByType" component={RewardShipmentOrderByType} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/RewardShipmentOrder" component={RewardShipmentOrder} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/RewardShipmentOrderByUser" component={RewardShipmentOrderByUser} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/RewardCompute" component={RewardCompute} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/TotalRewardExport" component={TotalRewardExport} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/RewardDetailExport" component={RewardDetailExport} isLoggedIn={isLoggedIn} />

                                <PrivateRoute path="/AreaType" component={AreaType} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/Area" component={Area} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/ShipmentOrder" component={ShipmentOrder} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/ShipmentOrderControl" component={ShipmentOrderControl} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/Maps" component={MapContainer} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/Map" component={Maps} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/InstallBundle" component={InstallBundle} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/InstallMaterial" component={InstallMaterial} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/UserCoordinator" component={UserCoordinator} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/UserGroup" component={UserGroup} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/CallLog" component={ApiCallLog} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/AdvanceRequest" component={AdvanceRequest} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/AdvanceRequestType" component={AdvanceRequestType} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/DestroyRequestType" component={DestroyRequestType} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/InventoryRequestType" component={InventoryRequestType} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/WorkingPlan" component={WorkingPlan} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/PartnerPayable" component={PartnerPayable} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/Compute" component={Compute} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/PartnerPayableDetail" component={PartnerPayableDetail} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/DestroyRequest" component={DestroyRequest} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/InventoryRequest" component={InventoryRequest} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/UseGuide" component={UseGuide} isLoggedIn={isLoggedIn} />

                                <PrivateRoute path="/RewardType" component={RewardType} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/RewardPriceType" component={RewardPriceType} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/RewardPosition" component={RewardPosition} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/RewardPosition_User" component={RewardPosition_User} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/UserRewardStore" component={UserRewardStore} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/FuelPrice" component={FuelPrice} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/RewardComputeSchedule" component={RewardComputeSchedule} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/RewardComputeLog" component={RewardComputeLog} isLoggedIn={isLoggedIn} />

                                <PrivateRoute path="/AppFeedBackPriority" component={AppFeedBackPriority} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/AppFeedBackStatus" component={AppFeedBackStatus} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/AppFeedBackQuality" component={AppFeedBackQuality} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/AppFeedBackPermission" component={AppFeedBackPermission} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/AppFeedBackStep" component={AppFeedBackStep} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/AppFeedBackGroup" component={AppFeedBackGroup} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/AppFeedBackCategory" component={AppFeedBackCategory} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/AppFeedBackType" component={AppFeedBackType} isLoggedIn={isLoggedIn} />
                                
                                <PrivateRoute path="*" component={NotFound} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />

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
        callGetCacheFromLocal: (cacheKeyID) => {
            return dispatch(callGetCacheFromLocal(cacheKeyID));
        },
        callClearLocalCache: (cacheKeyID) => {
            return dispatch(callClearLocalCache(cacheKeyID));
        },
        loginSuccess: (loginInfo, token, password) => {
            return dispatch(loginSuccess(loginInfo, token, password))
        },
    }
}

const Home = connect(mapStateToProps, mapDispatchToProps)(HomeCom);
export default Home;