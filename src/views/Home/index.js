import { Link, Redirect, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { callClearLocalCache, callGetCacheFromLocal } from "../../actions/cacheAction";
import { callLogin, loginFailure, loginRequest, loginSuccess } from "../../actions/loginAction";

import AccountInfo from "../../views/Account";
import AdvanceRequest from "../TMS/MD/AdvanceRequest";
import AdvanceRequestType from "../TMS/MD/AdvanceRequestType";
import AfterReclaimProcessType from "../TMS/MD/AfterReclaimProcessType";
import AirConditionerMTOrderReport from "../TMS/ReportShipmentOrder/AirConditionerMTOrderReport";
import ApiCallLog from "../TMS/MD/ApiCallLog";
import AppDataSyncList from "../TMS/MD/AppDataSyncList";
import AppDataSyncLog from "../TMS/MD/AppDataSyncLog";
import AppDataSyncType from "../TMS/MD/AppDataSyncType";
import AppFeedBackCategory from "../TMS/MD/AppFeedBack/AppFeedBackCategory";
import AppFeedBackGroup from "../TMS/MD/AppFeedBack/AppFeedBackGroup";
import AppFeedBackPermission from "../TMS/MD/AppFeedBack/AppFeedBackPermission";
import AppFeedBackPriority from "../TMS/MD/AppFeedBack/AppFeedBackPriority";
import AppFeedBackQuality from "../TMS/MD/AppFeedBack/AppFeedBackQuality";
import AppFeedBackStatus from "../TMS/MD/AppFeedBack/AppFeedBackStatus";
import AppFeedBackStep from "../TMS/MD/AppFeedBack/AppFeedBackStep";
import AppFeedBackType from "../TMS/MD/AppFeedBack/AppFeedBackType";
import AppPath from "../Layout/AppPath";
import Area from "../TMS/MD/Area";
import AreaType from "../TMS/MD/AreaType";
import BaseDAActionLog from "../TMS/MD/BaseDAActionLog";
import BaseDAComputeSchedule from "../TMS/MD/BaseDAComputeSchedule";
import { COOKIELOGIN } from "../../constants/systemVars.js";
import CacheManager from "../../views/System/CacheManager";
import CancelDeliveryReason from "../../views/TMS/MD/CancelDeliveryReason";
import CarrierType from "../../views/TMS/MD/CarrierType";
import ChangePassword from "../../views/ChangePassword";
import ComprehensiveReport from "../TMS/ReportShipmentOrder/ComprehensiveReport";
import Compute from "../../views/TMS/PartnerPayable/Compute";
import ConfirmReward from "../TMS/Reward/ConfirmReward";
import ControlStatusReport from "../TMS/ReportShipmentOrder/ControlStatusReport";
import CoordinatorGroup from "../TMS/MD/CoordinatorGroup";
import CoordinatorStore from "../../views/TMS/MD/CoordinatorStore";
import CrossCheckReport from "../TMS/ReportShipmentOrder/CrossCheckReport";
import CurrentAdvanceDebt from "../TMS/CurrentAdvanceDebt";
import Dashboard from "../../views/Dashboard";
import DataExportTemplate from "../TMS/MD/DataExportTemplate";
import DataExportTemplate_Format from "../TMS/MD/DataExportTemplate_Format";
import DebtByUser from "../TMS/ReportShipmentOrder/DebtByUser";
import DeliveryAbility from "../../views/TMS/DeliveryAbility";
import DeliveryAbilityStore from "../TMS/MD/DeliveryAbilityStore";
import DeliveryDateUpdateReason from "../TMS/MD/DeliveryDateUpdateReason";
import DeliveryDateUpdateType from "../TMS/MD/DeliveryDateUpdateType";
import DeliveryGoodsGroup from "../TMS/MD/DeliveryGoodsGroup";
import DeliveryTimeFrame from "../TMS/MD/DeliveryTimeFrame";
import DestroyRequest from "../TMS/DestroyRequest";
import DestroyRequestType from "../TMS/MD/DestroyRequestType";
import Documents from "../TMS/Documents";
import DocumentsFolder from "../TMS/MD/DocumentFolder";
import DocumentsType from "../TMS/MD/DocumentType";
import Footer from "../Layout/Footer";
import Forms from "../../views/Test/Forms";
import FuelPrice from "../TMS/MD/FuelPrice";
import FuelSubsIDizePeriod from "../TMS/Reward/FuelSubsIDizePeriod";
import Header from "../Layout/Header";
import IDDocumentType from "../../views/TMS/MD/IDDocumentType";
import IgnoreCheckRcGeoLocReason from "../TMS/MD/IgnoreCheckRcGeoLocReason";
import InstallBundle from "../../views/TMS/MD/Installed/InstallBundle";
import InstallMaterial from "../../views/TMS/MD/Installed/InstallMaterial";
import InventoryMaterials from "../TMS/ReportShipmentOrder/InventoryMaterials";
import InventoryComponent from "../TMS/ReportShipmentOrder/InventoryComponent";
import ShipmentOrderSymptom from "../TMS/ReportShipmentOrder/ShipmentOrderSymptom";
import InventoryRequest from "../TMS/InventoryRequest";
import InventoryRequestType from "../TMS/MD/InventoryRequestType";
import InvestigationShipmentOrderStatus from "../TMS/ReportShipmentOrder/InvestigationShipmentOrderStatus";
import LimitType from "../TMS/MD/Limit/LimitType";
import MTReturnRequest from "../TMS/MTReturnRequest";
import MTReturnRequestType from "../TMS/MD/MTReturnRequestType";
import ManagerShipmentOrder from "../../views/TMS/ManagerShipmentOrder";
import MapContainer from "../../views/TMS/ShipmentOrder/Component/MapContainer ";
import Maps from "../../views/TMS/ShipmentOrder/Component/Maps";
import MaterialGroup from "../TMS/MD/MaterialGroup";
import MaterialReclaim from "../TMS/MaterialReclaim";
import MaterialReturn from "../TMS/MaterialReturn";
import McPriviledge from "../../views/TMS/MD/PartnerPriviledge/McPriviledge";
import MonthlyCoordGroup from "../TMS/MD/MonthlyCoordGroup";
import MonthlySaleOrder from "../TMS/ReportShipmentOrder/MonthlySaleOrder";
import NotFound from "../NotFound";
import OTTimeKeeping from "../TMS/MD/OTTimeKeeping";
import OtherRewardTotal from "../TMS/Reward/OtherRewardTotal";
import OverdueOrderReport from "../TMS/ReportShipmentOrder/OverdueOrderReport";
import OverdueStaffDebt from "../TMS/ReportShipmentOrder/OverdueStaffDebt";
import PNRCComputeLog from "../TMS/MD/PNRCComputeLog";
import PNRCComputeSchedule from "../TMS/MD/PNRCComputeSchedule";
import PNServicePriceTable from "../TMS/MD/RewardPrice/PNServicePriceTable";
import PackageType from "../../views/TMS/MD/PackageType";
import { PagePath, HiddenAppPath } from "./constants";
import PageTest from "../../views/Test/PageTest";
import PageUI from "../../views/Test/PageUI";
import Partner from "../../views/TMS/MD/Partner";
import PartnerPayable from "../../views/TMS/PartnerPayable";
import PartnerPayableDetail from "../../views/TMS/PartnerPayable/PartnerPayableDetail";
import PartnerPriviledgeGroup from "../../views/TMS/MD/PartnerPriviledge/PartnerPriviledgeGroup";
import PartnerRole from "../../views/TMS/MD/PartnerPriviledge/PartnerRole";
import PartnerSaleChannel from "../TMS/MD/PartnerSaleChannel";
import PartnerTransaction from "../../views/TMS/MD/PartnerTransaction";
import PartnerType from "../../views/TMS/PartnerType";
import PartnerUI from "../../views/Test/PartnerUI";
import PartnerUser from "../../views/TMS/MD/PartnerPriviledge/PartnerUser";
import PeriodUserRWPosition from "../TMS/MD/PeriodUserRWPosition";
import PnReceivableDetail from "../TMS/ReportShipmentOrder/PnReceivableDetail";
import PnReceivableDetailReport from "../TMS/ReportShipmentOrder/PnReceivableDetailReport";
import PosToRWPosTable from "../TMS/MD/PosToRWPosTable";
import PrivateRoute from "../../Route/PrivateRoute";
import QualityAssessGroup from "../TMS/MD/QualityAssessGroup";
import QualityAssessType from "../TMS/MD/QualityAssessType";
import QualityReportBranch from "../TMS/ReportShipmentOrder/QualityReport/QualityReportBranch";
import QualityReportBranchGeneral from "../TMS/ReportShipmentOrder/QualityReport/QualityReportBranchGeneral";
import QualityReportByUser from "../TMS/ReportShipmentOrder/QualityReport/QualityReportByUser";
import QualityReportMainGroup from "../TMS/ReportShipmentOrder/QualityReport/QualityReportMainGroup";
import QuanlityReportAll from "../TMS/ReportShipmentOrder/QualityReport/QuanlityReportAll";
import React from "react";
import ReportByDate from "../TMS/ReportShipmentOrder/ReportByDate";
import ReportByStore from "../TMS/ReportShipmentOrder/ReportByStore";
import ReportByUser from "../TMS/ReportShipmentOrder/ReportByUser";
import ReportCoordinatorByDate from "../TMS/ReportShipmentOrder/ReportCoordinatorByDate";
import ReportCoordinatorByUser from "../TMS/ReportShipmentOrder/ReportCoordinatorByUser";
import ReportLate from "../TMS/ReportShipmentOrder/ReportLate";
import ReportShipmentOrderExport from "../TMS/ReportShipmentOrder/ReportShipmentOrderExport";
import RewardCompute from "../TMS/Reward/RewardCompute";
import RewardComputeList from "../TMS/Reward/RewardComputeList";
import RewardComputeLog from "../TMS/MD/RewardComputeLog";
import RewardComputeSchedule from "../TMS/MD/RewardComputeSchedule";
import RewardComputeType from "../TMS/MD/RewardComputeType";
import RewardDetailExport from "../TMS/Reward/RewardDetailExport";
import RewardPointReview from "../TMS/Reward/RewardPointReview";
import RewardPosImportSchedule from "../TMS/MD/RewardPosImportSchedule";
import RewardPosition from "../TMS/MD/RewardPosition";
import RewardPosition_User from "../TMS/MD/RewardPosition_User";
import RewardPriceTable from "../TMS/MD/RewardPrice/RewardPriceTable";
import RewardPriceType from "../TMS/MD/RewardPriceType";
import RewardShipmentOrder from "../TMS/Reward/RewardShipmentOrder";
import RewardShipmentOrderByType from "../TMS/Reward/RewardShipmentOrderByType";
import RewardShipmentOrderByUser from "../TMS/Reward/RewardShipmentOrderByUser";
import RewardType from "../TMS/MD/RewardType";
import SMSTemplate from "../TMS/MD/SMSTemplate";
import SaleSummaryReport from "../TMS/ReportShipmentOrder/SaleSummaryReport";
import ServiceAgreement from "../../views/TMS/ServiceAgreement";
import ServiceAgreementType from "../../views/TMS/MD/ServiceAgreementType";
import ServiceGroup from "../TMS/MD/ServiceGroup";
import ServicePriceApply from "../TMS/MD/ServicePriceApply";
import ServicePriceTable from "../TMS/MD/ServicePriceTable";
import ServiceRequestType from "../TMS/MD/ServiceRequestType";
import ServiceSeasonType from "../../views/TMS/MD/ServiceSeasonType";
import ServiceType from "../../views/TMS/MD/ServiceType";
import ShipmentFeePaymentMethod from "../../views/TMS/MD/ShipmentFeePaymentMethod";
import ShipmentFeeType from "../../views/TMS/MD/ShipmentFeeType";
import ShipmentGoodsType from "../../views/TMS/MD/ShipmentGoodsType";
import ShipmentOrder from "../../views/TMS/ShipmentOrder";
import ShipmentOrderControl from "../../views/TMS/ShipmentOrderControl";
import ShipmentOrderStatus from "../../views/TMS/MD/ShipmentOrderStatus";
import ShipmentOrderStatusGroup from "../TMS/MD/ShipmentOrderStatusGroup";
import ShipmentOrderStep from "../../views/TMS/MD/ShipmentOrderStep";
import ShipmentOrderStepGroup from "../TMS/MD/ShipmentOrderStepGroup";
import ShipmentOrderType from "../../views/TMS/MD/ShipmentOrder/ShipmentOrderType";
import ShipmentQualityAssess from "../TMS/ShipmentQualityAssess";
import ShipmentRoute from "../../views/TMS/ShipmentRoute";
import ShipmentServiceType from "../../views/TMS/MD/ShipmentServiceType";
import ShipmentSetupType from "../TMS/MD/ShipmentSetupType";
import Skill from "../TMS/MD/Skill";
import SkillCategory from "../TMS/MD/SkillCategory";
import SkillRank from "../TMS/MD/SkillRank";
import SoAssessSynSchedule from "../TMS/MD/SoAssessSynSchedule";
import { Spin } from "antd";
import StaffDebt from "../TMS/ReportShipmentOrder/StaffDebt";
import StaffTransfer from "../TMS/StaffTransfer";
import StaffTransferType from "../TMS/MD/StaffTransferType";
import SvCategory from "../TMS/MD/SvCategory";
import SvCategoryType from "../TMS/MD/SvCategoryType";
import SvTimeConvert from "../TMS/MD/SvTimeConvert";
import TMSConfig from "../TMS/MD/TMSConfig";
import TMSFuelSubsidize from "../TMS/MD/TMSFuelSubsidize";
import TMSFuelSubsidizeCompute from "../TMS/MD/TMSFuelSubsidize/Compute";
import TMSGroupReward from "../TMS/MD/TMSGroupReward";
import TMSGroupRewardCompute from "../TMS/MD/TMSGroupReward/Compute";
import TestCache from "../../views/Test/TestCache";
import TestFormContainer from "../../views/Test/TestFormContainer";
import TestModal from "../../views/Test/TestModal";
import TestPageLayout from "../../views/Test/TestPageLayout";
import TestTabs from "../../views/Test/TestTabs";
import TotalRewardExport from "../TMS/Reward/TotalRewardExport";
import UseGuide from "../../views/UseGuide";
import UserCoordinator from "../../views/TMS/User/UserCoordinator";
import UserDebtLimit from "../TMS/MD/UserDebtLimit";
import UserGroup from "../../views/TMS/User/UserGroup";
import UserLimit from "../TMS/MD/Limit/UserLimit";
import UserLimitTest from "../TMS/MD/Limit/UserLimit/Search/indexNew.js";
import UserRewardStore from "../TMS/MD/RewardStoreUser";
import UserSkill from "../TMS/User/UserSkill";
import User_DeliveryGoodsGroup from "../TMS/MD/User_DeliveryGoodsGroup";
import Vehicle from "../../views/TMS/MD/Vehicle";
import VehicleActivityStatus from "../TMS/MD/VehicleActivityStatus";
import VehicleGroup from "../TMS/MD/VehicleGroup";
import VehicleModel from "../TMS/MD/VehicleModel";
import VehicleRentalRequest from "../TMS/VehicleRentalRequest";
import VehicleRentalRequestStep from "../../views/TMS/MD/VehicleRentalRequestStep";
import VehicleRentalStatus from "../../views/TMS/MD/VehicleRentalStatus";
import VehicleRentalRequestType from "../../views/TMS/MD/VehicleRentalRequestType";
import VehicleType from "../TMS/MD/VehicleType";
import RentalType from "../../views/TMS/MD/VehicleRentalType";
import WeekDay from "../TMS/MD/WeekDay";
import WorkingPlan from "../../views/TMS/WorkingPlan";
import WorkingShift from "../../views/TMS/MD/WorkingShift";
import WorkingShift_TimeFrame from "../../views/TMS/MD/WorkingShift_TimeFrame";
import { callFetchAPI } from "../../actions/fetchAPIAction";
import { connect } from "react-redux";
import { getCookie } from "../../common/library/CommonLib.js";
import { updatePagePath } from "../../actions/pageAction";
import BaseDeliveryAbility from "../TMS/MD/BaseDeliveryAbility";
import SymptomApply from "../TMS/MD/SymptomApply";
import SymptomGroup from "../TMS/MD/SymptomGroup";
import Symptom from "../TMS/MD/Symptom";
import ShipmentRouteAuto from "./../TMS/ShipmentRouteAuto/index";
import ListNoteRewardReport from "../TMS/Reward/ListNoteRewardReport";

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
                                    <PrivateRoute path="/VehicleActivityStatus" component={VehicleActivityStatus} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/VehicleRentalRequestStep" component={VehicleRentalRequestStep} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/VehicleRentalStatus" component={VehicleRentalStatus} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/VehicleRentalRequestType" component={VehicleRentalRequestType} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/RentalType" component={RentalType} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/WorkingShift" component={WorkingShift} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/WorkingShiftTimeFrame" component={WorkingShift_TimeFrame} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />

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
                                    <PrivateRoute path="/InventoryComponent" component={InventoryComponent} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/ShipmentOrderSymptomReport" component={ShipmentOrderSymptom} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/ComprehensiveReport" component={ComprehensiveReport} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/SaleSummaryReport" component={SaleSummaryReport} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/ShipmentQualityAssess" component={ShipmentQualityAssess} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/StaffTransfer" component={StaffTransfer} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/OverdueOrderReport" component={OverdueOrderReport} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/OverdueStaffDebt" component={OverdueStaffDebt} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/ControlStatusReport" component={ControlStatusReport} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/CrossCheckReport" component={CrossCheckReport} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />

                                    <PrivateRoute path="/QuanlityReportAll" component={QuanlityReportAll} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/QualityReportBranch" component={QualityReportBranch} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/QualityReportBranchGeneral" component={QualityReportBranchGeneral} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/QualityReportMainGroup" component={QualityReportMainGroup} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/QualityReportByUser" component={QualityReportByUser} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />

                                    <PrivateRoute path="/RewardShipmentOrderByType" component={RewardShipmentOrderByType} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/RewardShipmentOrder" component={RewardShipmentOrder} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/OtherRewardTotal" component={OtherRewardTotal} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/RewardShipmentOrderByUser" component={RewardShipmentOrderByUser} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/RewardCompute" component={RewardCompute} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/TotalRewardExport" component={TotalRewardExport} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/RewardDetailExport" component={RewardDetailExport} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/RewardPointReview" component={RewardPointReview} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/RewardComputeList" component={RewardComputeList} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/FuelSubsIDizePeriod" component={FuelSubsIDizePeriod} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/RewardComputeType" component={RewardComputeType} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/ConfirmReward" component={ConfirmReward} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/ListNoteRewardReport" component={ListNoteRewardReport} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />

                                    <PrivateRoute path="/AreaType" component={AreaType} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/Area" component={Area} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/ShipmentOrder" component={ShipmentOrder} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/ShipmentRoute" component={ShipmentRoute} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/ShipmentRouteAuto" component={ShipmentRouteAuto} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/ShipmentRouteNew" component={ShipmentRoute} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
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
                                    <PrivateRoute path="/PartnerPayableCompute" component={Compute} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/PartnerPayableDetail" component={PartnerPayableDetail} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/DestroyRequest" component={DestroyRequest} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/InventoryRequest" component={InventoryRequest} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/UseGuide" component={UseGuide} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />

                                    <PrivateRoute path="/MTReturnRequest" component={MTReturnRequest} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/MaterialReclaim" component={MaterialReclaim} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/MaterialReturn" component={MaterialReturn} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />

                                    <PrivateRoute path="/RewardType" component={RewardType} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/RewardPriceType" component={RewardPriceType} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/RewardPosition" component={RewardPosition} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/RewardPosition_User" component={RewardPosition_User} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/PeriodUserRWPosition" component={PeriodUserRWPosition} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/UserRewardStore" component={UserRewardStore} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/FuelPrice" component={FuelPrice} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/RewardComputeSchedule" component={RewardComputeSchedule} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/RewardComputeLog" component={RewardComputeLog} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/PosToRWPosTable" component={PosToRWPosTable} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/RewardPosImportSchedule" component={RewardPosImportSchedule} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />

                                    <PrivateRoute path="/AppFeedBackPriority" component={AppFeedBackPriority} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/AppFeedBackStatus" component={AppFeedBackStatus} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/AppFeedBackQuality" component={AppFeedBackQuality} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/AppFeedBackPermission" component={AppFeedBackPermission} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/AppFeedBackStep" component={AppFeedBackStep} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/AppFeedBackGroup" component={AppFeedBackGroup} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/AppFeedBackCategory" component={AppFeedBackCategory} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/AppFeedBackType" component={AppFeedBackType} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/TMSConfig" component={TMSConfig} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/SvCategoryType" component={SvCategoryType} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/SvCategory" component={SvCategory} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
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
                                    <PrivateRoute path="/MonthlyCoordGroup" component={MonthlyCoordGroup} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/StaffTransferType" component={StaffTransferType} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/ReportLate" component={ReportLate} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/SMSTemplate" component={SMSTemplate} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/ServiceGroup" component={ServiceGroup} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/ServicePriceApply" component={ServicePriceApply} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/ServicePriceTable" component={ServicePriceTable} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/PartnerSaleChannel" component={PartnerSaleChannel} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/DataExportTemplate" component={DataExportTemplate} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/DataExportTemplate_Format" component={DataExportTemplate_Format} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/SvTimeConvert" component={SvTimeConvert} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/MonthlySaleOrder" component={MonthlySaleOrder} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />

                                    <PrivateRoute path="/DocumentsFolder" component={DocumentsFolder} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/DocumentsType" component={DocumentsType} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/Documents" component={Documents} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/TMSFuelSubsidize" component={TMSFuelSubsidize} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/TMSFuelSubsidizeCompute" component={TMSFuelSubsidizeCompute} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />

                                    <PrivateRoute path="/TMSGroupReward" component={TMSGroupReward} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/TMSGroupRewardCompute" component={TMSGroupRewardCompute} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/OTTimeKeeping" component={OTTimeKeeping} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/AppDataSyncType" component={AppDataSyncType} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/AppDataSyncList" component={AppDataSyncList} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/AppDataSyncLog" component={AppDataSyncLog} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/IgnoreCheckRcGeoLocReason" component={IgnoreCheckRcGeoLocReason} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/DeliveryAbilityStore" component={DeliveryAbilityStore} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/ServiceRequestType" component={ServiceRequestType} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />

                                    <PrivateRoute path="/PnReceivableDetail" component={PnReceivableDetail} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/AirConditionerMTOrderReport" component={AirConditionerMTOrderReport} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/PnReceivableDetailReport" component={PnReceivableDetailReport} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/PNRCComputeSchedule" component={PNRCComputeSchedule} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/PNRCComputeLog" component={PNRCComputeLog} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />

                                    <PrivateRoute path="/UserDebtLimit" component={UserDebtLimit} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/User_DeliveryGoodsGroup" component={User_DeliveryGoodsGroup} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/AfterReclaimProcessType" component={AfterReclaimProcessType} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/BaseDAComputeSchedule" component={BaseDAComputeSchedule} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/BaseDAActionLog" component={BaseDAActionLog} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/BaseDeliveryAbility" component={BaseDeliveryAbility} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />

                                    <PrivateRoute path="/VehicleGroup" component={VehicleGroup} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/VehicleType" component={VehicleType} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/VehicleModel" component={VehicleModel} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/VehicleRentalRequest" component={VehicleRentalRequest} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />

                                    <PrivateRoute path="/SymptomApply" component={SymptomApply} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/SymptomGroup" component={SymptomGroup} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />
                                    <PrivateRoute path="/Symptom" component={Symptom} isLoggedIn={isLoggedIn} isRelogin={isRelogin} />

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
