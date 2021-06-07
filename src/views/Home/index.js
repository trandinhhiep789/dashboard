import React from "react";
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import { Spin } from 'antd'

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
import ChangePassword from '../../views/ChangePassword';
import PageUI from '../../views/Test/PageUI';
import TestModal from '../../views/Test/TestModal';
import TestCache from '../../views/Test/TestCache';
import TestFormContainer from '../../views/Test/TestFormContainer';
import TestTabs from '../../views/Test/TestTabs';
import TestPageLayout from '../../views/Test/TestPageLayout';
import PageTest from '../../views/Test/PageTest'
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
import ManagerShipmentOrder from '../../views/TMS/ManagerShipmentOrder';

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
import MTReturnRequest from "../TMS/MTReturnRequest";
import InventoryRequest from "../TMS/InventoryRequest";
import RewardPriceTable from "../TMS/MD/RewardPrice/RewardPriceTable";
import UseGuide from "../../views/UseGuide";
import CurrentAdvanceDebt from "../TMS/CurrentAdvanceDebt";
import PNServicePriceTable from "../TMS/MD/RewardPrice/PNServicePriceTable";



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
import StaffDebt from "../TMS/ReportShipmentOrder/StaffDebt";
import ReportCoordinatorByDate from "../TMS/ReportShipmentOrder/ReportCoordinatorByDate";
import ReportCoordinatorByUser from "../TMS/ReportShipmentOrder/ReportCoordinatorByUser";
import ReportShipmentOrderExport from "../TMS/ReportShipmentOrder/ReportShipmentOrderExport";
import InvestigationShipmentOrderStatus from "../TMS/ReportShipmentOrder/InvestigationShipmentOrderStatus";
import InventoryMaterials from "../TMS/ReportShipmentOrder/InventoryMaterials";
import ComprehensiveReport from "../TMS/ReportShipmentOrder/ComprehensiveReport";
import SaleSummaryReport from "../TMS/ReportShipmentOrder/SaleSummaryReport";
import OverdueOrderReport from '../TMS/ReportShipmentOrder/OverdueOrderReport';
import OverdueStaffDebt from '../TMS/ReportShipmentOrder/OverdueStaffDebt';
import ControlStatusReport from '../TMS/ReportShipmentOrder/ControlStatusReport';

import RewardShipmentOrderByType from "../TMS/Reward/RewardShipmentOrderByType";
import RewardShipmentOrder from "../TMS/Reward/RewardShipmentOrder";
import OtherRewardTotal from "../TMS/Reward/OtherRewardTotal";
import RewardShipmentOrderByUser from "../TMS/Reward/RewardShipmentOrderByUser";
import RewardCompute from "../TMS/Reward/RewardCompute";
import TotalRewardExport from "../TMS/Reward/TotalRewardExport";
import RewardDetailExport from "../TMS/Reward/RewardDetailExport";
import RewardPointReview from "../TMS/Reward/RewardPointReview";


import ServicePriceTable from "../TMS/MD/ServicePriceTable";


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
import TMSConfig from "../TMS/MD/TMSConfig";
import DeliveryDateUpdateType from "../TMS/MD/DeliveryDateUpdateType";
import DeliveryDateUpdateReason from "../TMS/MD/DeliveryDateUpdateReason";
import PeriodUserRWPosition from "../TMS/MD/PeriodUserRWPosition";
import MTReturnRequestType from "../TMS/MD/MTReturnRequestType";
import QualityAssessGroup from "../TMS/MD/QualityAssessGroup";
import QualityAssessType from "../TMS/MD/QualityAssessType";
import SoAssessSynSchedule from "../TMS/MD/SoAssessSynSchedule";
import DeliveryGoodsGroup from "../TMS/MD/DeliveryGoodsGroup";
import DeliveryTimeFrame from "../TMS/MD/DeliveryTimeFrame";
import WeekDay from "../TMS/MD/WeekDay";
import DeliveryAbility from '../../views/TMS/DeliveryAbility';
import CoordinatorGroup from "../TMS/MD/CoordinatorGroup";
import ReportLate from "../TMS/ReportShipmentOrder/ReportLate";
import SMSTemplate from "../TMS/MD/SMSTemplate";
import ServiceGroup from "../TMS/MD/ServiceGroup";
import ServicePriceApply from "../TMS/MD/ServicePriceApply";
import PartnerSaleChannel from "../TMS/MD/PartnerSaleChannel";

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

    // componentWillReceiveProps(nextProps) {
    //     if (JSON.stringify(this.props.AuthenticationInfo) !== JSON.stringify(nextProps.AuthenticationInfo)) {
    //         const LoginInfo = localStorage.getItem('LoginInfo');
    //         if (!this.props.AuthenticationInfo.LoginInfo.IsLoginSuccess) {
    //             if (LoginInfo) {
    //                 const LoginInfo1 = JSON.parse(LoginInfo)
    //                 this.props.loginSuccess(LoginInfo1.LoginUserInfo, LoginInfo1.TokenString, LoginInfo1.Password);
    //                 this.setState({ isLoggedIn: true })
    //             }
    //             else {
    //                 this.setState({ isLoggedIn: false })
    //             }
    //         }
    //     }
    // }

    render() {
        let isShowAppPath = true;
        const { isLoggedIn } = this.state;
        const isRelogin = this.props.AuthenticationInfo.LoginInfo.IsRelogin;
        // console.log("Home LoginInfo: ", this.props.AuthenticationInfo.LoginInfo);
        //console.log("Home this.props.AuthenticationInfo.LoginInfo.IsRelogin: ", this.props.AuthenticationInfo.LoginInfo.IsRelogin);
        return (
            <React.Fragment>
                {/* <Spin className="ant-spin-custom" spinning={this.props.AuthenticationInfo.FetchAPIInfo.IsFetchAPICompleted === false && this.props.AuthenticationInfo.FetchAPIInfo.HostURL} size="large"> */}
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
                                <PrivateRoute path="/changepassword" component={ChangePassword} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/CacheManager" component={CacheManager} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                {/* <PrivateRoute path="*" component={Category} isLoggedIn={isLoggedIn} /> */}

                                {/*menu tận tâm*/}
                                <PrivateRoute path="/CancelDeliveryReason" component={CancelDeliveryReason} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/CarrierType" component={CarrierType} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/Partner" component={Partner} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/PartnerType" component={PartnerType} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/PackageType" component={PackageType} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/ShipmentFeePaymentMethod" component={ShipmentFeePaymentMethod} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/ShipmentServiceType" component={ShipmentServiceType} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/ShipmentGoodsType" component={ShipmentGoodsType} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/ShipmentOrderStatus" component={ShipmentOrderStatus} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/ShipmentOrderStatusGroup" component={ShipmentOrderStatusGroup} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/ShipmentOrderType" component={ShipmentOrderType} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/ShipmentOrderStep" component={ShipmentOrderStep} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/ShipmentOrderStepGroup" component={ShipmentOrderStepGroup} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/ShipmentSetupType" component={ShipmentSetupType} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/PartnerPriviledgeGroup" component={PartnerPriviledgeGroup} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/PartnerPriviledge" component={McPriviledge} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/PartnerRole" component={PartnerRole} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/PartnerUser" component={PartnerUser} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/ShipmentFeeType" component={ShipmentFeeType} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/ServiceAgreement" component={ServiceAgreement} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/ServiceType" component={ServiceType} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/ServiceSeasonType" component={ServiceSeasonType} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/ServiceAgreementType" component={ServiceAgreementType} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/IDDocumentType" component={IDDocumentType} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/PartnerTransaction" component={PartnerTransaction} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/CoordinatorStore" component={CoordinatorStore} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/Skill" component={Skill} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/SkillCategory" component={SkillCategory} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/SkillRank" component={SkillRank} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/UserSkill" component={UserSkill} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/MaterialGroup" component={MaterialGroup} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/LimitType" component={LimitType} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/UserLimit" component={UserLimit} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/UserLimitTest" component={UserLimitTest} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/Vehicle" component={Vehicle} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/WorkingShift" component={WorkingShift} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />

                                <PrivateRoute path="/RewardPriceTable" component={RewardPriceTable} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/PNServicePriceTable" component={PNServicePriceTable} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />


                                <PrivateRoute path="/CurrentAdvanceDebt" component={CurrentAdvanceDebt} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />

                                <PrivateRoute path="/ReportByDate" component={ReportByDate} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/ReportByStore" component={ReportByStore} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/ReportByUser" component={ReportByUser} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/DebtByUser" component={DebtByUser} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/StaffDebt" component={StaffDebt} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/ReportCoordinatorByDate" component={ReportCoordinatorByDate} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/ReportCoordinatorByUser" component={ReportCoordinatorByUser} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/ReportShipmentOrderExport" component={ReportShipmentOrderExport} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/InvestigationShipmentOrderStatus" component={InvestigationShipmentOrderStatus} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/InventoryMaterials" component={InventoryMaterials} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/ComprehensiveReport" component={ComprehensiveReport} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/SaleSummaryReport" component={SaleSummaryReport} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/OverdueOrderReport" component={OverdueOrderReport} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/OverdueStaffDebt" component={OverdueStaffDebt} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/ControlStatusReport" component={ControlStatusReport} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />


                                <PrivateRoute path="/RewardShipmentOrderByType" component={RewardShipmentOrderByType} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/RewardShipmentOrder" component={RewardShipmentOrder} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/OtherRewardTotal" component={OtherRewardTotal} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/RewardShipmentOrderByUser" component={RewardShipmentOrderByUser} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/RewardCompute" component={RewardCompute} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/TotalRewardExport" component={TotalRewardExport} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/RewardDetailExport" component={RewardDetailExport} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/RewardPointReview" component={RewardPointReview} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />

                                <PrivateRoute path="/AreaType" component={AreaType} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/Area" component={Area} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/ShipmentOrder" component={ShipmentOrder} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />

                                <PrivateRoute path="/ManagerShipmentOrder" component={ManagerShipmentOrder} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/ShipmentOrderControl" component={ShipmentOrderControl} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/Maps" component={MapContainer} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/Map" component={Maps} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/InstallBundle" component={InstallBundle} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/InstallMaterial" component={InstallMaterial} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/UserCoordinator" component={UserCoordinator} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/UserGroup" component={UserGroup} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/CallLog" component={ApiCallLog} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/AdvanceRequest" component={AdvanceRequest} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/AdvanceRequestType" component={AdvanceRequestType} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/DestroyRequestType" component={DestroyRequestType} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/InventoryRequestType" component={InventoryRequestType} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/WorkingPlan" component={WorkingPlan} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/PartnerPayable" component={PartnerPayable} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/Compute" component={Compute} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/PartnerPayableDetail" component={PartnerPayableDetail} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/DestroyRequest" component={DestroyRequest} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/InventoryRequest" component={InventoryRequest} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/UseGuide" component={UseGuide} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />

                                <PrivateRoute path="/MTReturnRequest" component={MTReturnRequest} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />

                                <PrivateRoute path="/RewardType" component={RewardType} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/RewardPriceType" component={RewardPriceType} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/RewardPosition" component={RewardPosition} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/RewardPosition_User" component={RewardPosition_User} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/PeriodUserRWPosition" component={PeriodUserRWPosition} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/UserRewardStore" component={UserRewardStore} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/FuelPrice" component={FuelPrice} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/RewardComputeSchedule" component={RewardComputeSchedule} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/RewardComputeLog" component={RewardComputeLog} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />

                                <PrivateRoute path="/AppFeedBackPriority" component={AppFeedBackPriority} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/AppFeedBackStatus" component={AppFeedBackStatus} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/AppFeedBackQuality" component={AppFeedBackQuality} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/AppFeedBackPermission" component={AppFeedBackPermission} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/AppFeedBackStep" component={AppFeedBackStep} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/AppFeedBackGroup" component={AppFeedBackGroup} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/AppFeedBackCategory" component={AppFeedBackCategory} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/AppFeedBackType" component={AppFeedBackType} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/TMSConfig" component={TMSConfig} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/DeliveryDateUpdateType" component={DeliveryDateUpdateType} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/DeliveryDateUpdateReason" component={DeliveryDateUpdateReason} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/DeliveryGoodsGroup" component={DeliveryGoodsGroup} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/DeliveryTimeFrame" component={DeliveryTimeFrame} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/WeekDay" component={WeekDay} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />

                                <PrivateRoute path="/MTReturnRequestType" component={MTReturnRequestType} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/QualityAssessGroup" component={QualityAssessGroup} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/QualityAssessType" component={QualityAssessType} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/SoAssessSynSchedule" component={SoAssessSynSchedule} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/DeliveryAbility" component={DeliveryAbility} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/DevTest" component={PageTest} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/CoordinatorGroup" component={CoordinatorGroup} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/ReportLate" component={ReportLate} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/SMSTemplate" component={SMSTemplate} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/ServiceGroup" component={ServiceGroup} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/ServicePriceApply" component={ServicePriceApply} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/ServicePriceTable" component={ServicePriceTable} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                <PrivateRoute path="/PartnerSaleChannel" component={PartnerSaleChannel} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />



                                <PrivateRoute path="*" component={NotFound} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />

                            </Switch>

                        </div>

                    </div>
                </main>
                <Footer />
                {/* </Spin> */}
            </React.Fragment >
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