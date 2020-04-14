import React from "react";
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import AttributeCategoryType from '../views/PIM/Attribute/AttributeCategoryType';
import AttributeCategory from '../views/PIM/Attribute/AttributeCategory';
import AttributeType from '../views/PIM/Attribute/AttributeType';
import AttributeDataType from '../views/PIM/Attribute/AttributeDataType';
import AttributeValue from '../views/PIM/Attribute/AttributeValue';
import Attribute from '../views/PIM/Attribute/Attribute';
import Product from '../views/PIM/Products/Product';
import ProductAssocType from '../views/PIM/Products/ProductAssocType';
import ProductImageType from '../views/PIM/Products/ProductImageType';
import ProductFeatureGroup from '../views/PIM/ProductFeature/ProductFeatureGroup';
import ProductFeature from '../views/PIM/ProductFeature/ProductFeature';
import UOMType from '../views/PIM/UOM/UOMType';
import UOM from '../views/PIM/UOM/UOM';
import InventoryStatus from '../views/PIM/InventoryStatus';
import ShippingMethod from '../views/PIM/SHIPPINGMETHOD/SHIPPINGMETHOD';
import QuantityUnit from '../views/PIM/QuantityUnit/QuantityUnit';
import ProductStatus from '../views/PIM/ProductStatus/ProductStatus';
import ChangePassword from '../views/ChangePassword';
import TestModal from '../views/Test/TestModal';
import Brand from '../views/PIM/BRAND';
import CategoryType from '../views/PIM/Category/CategoryType';
import Category from '../views/PIM/Category/Category';
import Manufacturer from '../views/PIM/Manufacturer/Manufacturer';
import Model from '../views/PIM/Model/Model';
import PieType from '../views/PIM/PieType';
import ProductOpreration from '../views/PIM/ProductOpreration';
import PieRequest from '../views/PIM/PieRequest/PieRequest';
import PieRequestType from '../views/PIM/PieRequest/PieRequestType';
import PieRequestTypeWorkflow from '../views/PIM/PieRequest/PieRequestTypeWorkflow';
import PiePermission from '../views/PIM/PiePermisson';
import TestCache from '../views/Test/TestCache';
import ContentType from '../views/PIM/ContentType/ContentType';
import ProductType from '../views/PIM/ProductType/ProductType';
import PartnerProductMapType from '../views/PIM/PartnerProductMapType';
import PieRequestProduct from '../views/PIM/PierequestProduct/PierequestProduct';
import TestFormContainer from '../views/Test/TestFormContainer';
import TestTabs from '../views/Test/TestTabs';
import TestPageLayout from '../views/Test/TestPageLayout';
import PieRequestAdd from '../views/PIM/PieRequest/PieRequest/Add/index';
import CacheManager from '../views/System/CacheManager';
import Dashboard from '../views/Dashboard';
import AccountInfo from '../views/Account';




import PrivateRoute from './PrivateRoute'
const isLoggedIn = true;

export default class AppRoute extends React.Component {
    render() {
        return (
            <Switch>
                <PrivateRoute exact path="" component={Dashboard} isLoggedIn={isLoggedIn} />
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
                {/* <PrivateRoute path="/InventoryStatus" component={InventoryStatus} isLoggedIn={isLoggedIn} /> */}


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


               


            </Switch>

        );
    }

}