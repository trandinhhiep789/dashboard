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

import AttributeCategoryType from '../../views/PIM/Attribute/AttributeCategoryType';
import AttributeCategory from '../../views/PIM/Attribute/AttributeCategory';
import AttributeType from '../../views/PIM/Attribute/AttributeType';
import AttributeDataType from '../../views/PIM/Attribute/AttributeDataType';
import AttributeValue from '../../views/PIM/Attribute/AttributeValue';
import Attribute from '../../views/PIM/Attribute/Attribute';
import Product from '../../views/PIM/Products/Product';
import ProductAssocType from '../../views/PIM/Products/ProductAssocType';
import ProductImageType from '../../views/PIM/Products/ProductImageType';
import ProductFeatureGroup from '../../views/PIM/ProductFeature/ProductFeatureGroup';
import ProductFeature from '../../views/PIM/ProductFeature/ProductFeature';
import UOMType from '../../views/PIM/UOM/UOMType';
import UOM from '../../views/PIM/UOM/UOM';
import InventoryStatus from '../../views/PIM/InventoryStatus';
import ShippingMethod from '../../views/PIM/SHIPPINGMETHOD/SHIPPINGMETHOD';
import QuantityUnit from '../../views/PIM/QuantityUnit/QuantityUnit';
import ProductStatus from '../../views/PIM/ProductStatus/ProductStatus';
import ChangePassword from '../../views/ChangePassword';
import TestModal from '../../views/Test/TestModal';
import Brand from '../../views/PIM/BRAND';
import CategoryType from '../../views/PIM/Category/CategoryType';
import Category from '../../views/PIM/Category/Category';
import Manufacturer from '../../views/PIM/Manufacturer/Manufacturer';
import Model from '../../views/PIM/Model/Model';
import PieType from '../../views/PIM/PieType';
import ProductOpreration from '../../views/PIM/ProductOpreration';
import PieRequest from '../../views/PIM/PieRequest/PieRequest';
import PieRequestType from '../../views/PIM/PieRequest/PieRequestType';
import PieRequestTypeWorkflow from '../../views/PIM/PieRequest/PieRequestTypeWorkflow';
import PiePermission from '../../views/PIM/PiePermisson';
import TestCache from '../../views/Test/TestCache';
import ContentType from '../../views/PIM/ContentType/ContentType';
import ProductType from '../../views/PIM/ProductType/ProductType';
import PartnerProductMapType from '../../views/PIM/PartnerProductMapType';
import PieRequestProduct from '../../views/PIM/PierequestProduct/PierequestProduct';
import TestFormContainer from '../../views/Test/TestFormContainer';
import TestTabs from '../../views/Test/TestTabs';
import TestPageLayout from '../../views/Test/TestPageLayout';
import PieRequestAdd from '../../views/PIM/PieRequest/PieRequest/Add/index';
import CacheManager from '../../views/System/CacheManager';
import Dashboard from '../../views/Dashboard';
import AccountInfo from '../../views/Account';
import PartnerType from '../../views/TMS/PartnerType';
import CancelDeliveryReason from '../../views/TMS/MD/CancelDeliveryReason';
import CarrierType from '../../views/TMS/MD/CarrierType';
import PackageType from '../../views/TMS/MD/PackageType';

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
                                <PrivateRoute path="/AttributeCategoryType" component={AttributeCategoryType} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/AttributeCategory" component={AttributeCategory} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/AttributeType" component={AttributeType} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/AttributeDataType" component={AttributeDataType} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/AttributeValue" component={AttributeValue} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/Attribute" component={Attribute} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/CategoryType" component={CategoryType} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/Category" component={Category} isLoggedIn={true} />
                                <PrivateRoute path="/Product" component={Product} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/ProductAssocType" component={ProductAssocType} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/ProductImageType" component={ProductImageType} isLoggedIn={isLoggedIn} />

                                <PrivateRoute path="/ProductFeatureGroup" component={ProductFeatureGroup} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/ProductFeature" component={ProductFeature} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/changepassword" component={ChangePassword} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/UOMType" component={UOMType} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/InventoryStatus" component={InventoryStatus} isLoggedIn={isLoggedIn} />


                                <PrivateRoute path="/TestModal" component={TestModal} isLoggedIn={isLoggedIn} />


                                <PrivateRoute path="/UOM" component={UOM} isLoggedIn={isLoggedIn} />

                                {/* phương tiện vận chuyển */}
                                <PrivateRoute path="/ShippingMethod" component={ShippingMethod} isLoggedIn={isLoggedIn} />

                                {/* đơn vị tính */}
                                <PrivateRoute path="/QuantityUnit" component={QuantityUnit} isLoggedIn={isLoggedIn} />

                                {/* trạng thái sản phẩm */}
                                <PrivateRoute path="/ProductStatus" component={ProductStatus} isLoggedIn={isLoggedIn} />

                                {/* Nhãn hiệu */}
                                <PrivateRoute path="/Brand" component={Brand} isLoggedIn={isLoggedIn} />

                                {/* Nhà sản xuất */}
                                <PrivateRoute path="/Manufacturer" component={Manufacturer} isLoggedIn={isLoggedIn} />

                                {/* Model sản phẩm */}
                                <PrivateRoute path="/Model" component={Model} isLoggedIn={isLoggedIn} />

                                {/* Loại chỉnh sửa thông tin sản phẩm */}
                                <PrivateRoute path="/PieType" component={PieType} isLoggedIn={isLoggedIn} />

                                {/* Tác vụ liên quan đến hàng hóa */}
                                <PrivateRoute path="/ProductOperation" component={ProductOpreration} isLoggedIn={isLoggedIn} />

                                {/* Tác vụ liên quan đến hàng hóa */}
                                <PrivateRoute path="/PiePermission" component={PiePermission} isLoggedIn={isLoggedIn} />

                                {/* Loại yêu cầu chỉnh sửa thông tin sản phẩm */}
                                <PrivateRoute path="/PieRequestType" component={PieRequestType} isLoggedIn={isLoggedIn} />
                                {/* <PrivateRoute path="/PieRequestTypeWorkflow" component={PieRequestTypeWorkflow} isLoggedIn={isLoggedIn} /> */}
                                {/* Yêu cầu chỉnh sửa thông tin sản phẩm */}
                                <PrivateRoute path="/PieRequest" component={PieRequest} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/PieRequestAdd" component={PieRequestAdd} isLoggedIn={isLoggedIn} />

                                <PrivateRoute path="/TestCache" component={TestCache} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/TestFormContainer" component={TestFormContainer} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/TestTabs" component={TestTabs} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/TestPageLayout" component={TestPageLayout} isLoggedIn={isLoggedIn} />


                                {/* Loại nội dung sản phẩm */}
                                <PrivateRoute path="/ContentType" component={ContentType} isLoggedIn={isLoggedIn} />
                                {/* Loại nội dung sản phẩm */}
                                <PrivateRoute path="/ProductType" component={ProductType} isLoggedIn={isLoggedIn} />

                                {/* Danh sách loại bảng mã sản phẩm của đối tác */}
                                <PrivateRoute path="/PartnerProductMapType" component={PartnerProductMapType} isLoggedIn={isLoggedIn} />


                                <PrivateRoute path="/PieRequestProduct/:action/:id/:pierequestlistid" component={PieRequestProduct} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/CacheManager" component={CacheManager} isLoggedIn={isLoggedIn} />
                                {/* <PrivateRoute path="*" component={Category} isLoggedIn={isLoggedIn} /> */}

                                {/*menu tận tâm*/}
                                <PrivateRoute path="/CancelDeliveryReason" component={CancelDeliveryReason} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/CarrierType" component={CarrierType} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/PartnerType" component={PartnerType} isLoggedIn={isLoggedIn} />
                                <PrivateRoute path="/PackageType" component={PackageType} isLoggedIn={isLoggedIn} />
                                
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