import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { callFetchAPI } from "../../../../../../actions/fetchAPIAction";
import { APIHostName, SearchGeneralInfoAPIPath } from "../Constants";
import { callGetCache } from "../../../../../../actions/cacheAction";
import { formatDate } from "../../../../../../common/library/CommonLib.js";

class GeneralInfoCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            GeneralInfo: {},
            brandName: "",
            LstCacheBrand: [],
            LstCacheShippingMethod: [],
            LstCacheCategory: [],
            LstCacheProductType: [],
            LstCacheQuantity: [],
            LstCacheProductFeature: [],
            Model: {},

        }
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.Model) !== JSON.stringify(nextProps.Model)) {
            this.setState({
                Model: nextProps.Model
            })
        }
    }


    getGeneralInfoProduct() {
        const id = this.props.ProductID;
        this.props.callFetchAPI(APIHostName, SearchGeneralInfoAPIPath, id).then((apiResult) => {
            if (!apiResult.IsError) {
                this.setState({
                    GeneralInfo: apiResult.ResultObject
                })
            }

        });
    }

    _getCacheBrand() {
        this.props.callGetCache("PIMCACHE.BRAND").then((apiResult) => {
            if (!apiResult.IsError && apiResult.ResultObject.CacheData != null) {
                this.setState({
                    LstCacheBrand: apiResult.ResultObject.CacheData,
                });
            }
        });
    }

    _getCacheShippingMethod() {
        this.props.callGetCache("PIMCACHE.PIM_SHIPPINGMETHOD").then((apiResult) => {
            if (!apiResult.IsError && apiResult.ResultObject.CacheData != null) {
                this.setState({
                    LstCacheShippingMethod: apiResult.ResultObject.CacheData,
                });
            }
        });
    }

    _getCacheCategory() {
        this.props.callGetCache("PIMCACHE.CATEGORY").then((apiResult) => {
            if (!apiResult.IsError && apiResult.ResultObject.CacheData != null) {
                this.setState({
                    LstCacheCategory: apiResult.ResultObject.CacheData,
                });
            }
        });
    }

    _getCacheProductType() {
        this.props.callGetCache("PIMCACHE.PRODUCTTYPE").then((apiResult) => {
            if (!apiResult.IsError && apiResult.ResultObject.CacheData != null) {
                this.setState({
                    LstCacheProductType: apiResult.ResultObject.CacheData,
                });
            }
        });
    }

    _getCacheQuantity() {
        this.props.callGetCache("PIMCACHE.QUANTITYUNIT").then((apiResult) => {
            if (!apiResult.IsError && apiResult.ResultObject.CacheData != null) {
                this.setState({
                    LstCacheQuantity: apiResult.ResultObject.CacheData,
                });
            }
        });
    }

    _getCacheProductFeature() {
        this.props.callGetCache("PIMCACHE.PRODUCTFEATURE").then((apiResult) => {
            if (!apiResult.IsError && apiResult.ResultObject.CacheData != null) {
                this.setState({
                    LstCacheProductFeature: apiResult.ResultObject.CacheData,
                });
            }
        });
    }

    componentDidMount() {
        this.getGeneralInfoProduct();
        this._getCacheBrand();
        this._getCacheShippingMethod();
        this._getCacheCategory();
        this._getCacheProductType();
        this._getCacheQuantity();
        this._getCacheProductFeature();
    }

    render() {


        const item = this.state.GeneralInfo;
        const itemModel = this.state.Model;

        let idBrand;
        let idShippingMethod;
        let idDefaultCategoryID;
        let idProductType;
        let idDefaultquantityunitID;
        let ProductFeature;
        let idModel;
        let ModelName;

        if (itemModel) {
            ModelName = itemModel.ModelName
        }

        if (item) {
            idBrand = item.BrandID;

            idDefaultCategoryID = item.DefaultCategoryID;
            idProductType = item.ProductTypeID;
            idDefaultquantityunitID = item.DefaultquantityunitID;
            idModel = item.ModelID;
            if (item.ArryProduct_Feature) {
                ProductFeature = item.ArryProduct_Feature[0];
            }
            if (item.ArryProduct_ShippingMethod) {
                idShippingMethod = item.ArryProduct_ShippingMethod[0];
            }

        }



        return (
            <div className="col-12 col-md-6 col-lg-8">

                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label className="col-form-label">Mã và tên:</label>
                    </div>
                    <div className="form-group col-md-8">
                        <label>{item.ProductID} - {item.ProductName}</label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label className="col-form-label">Model và Tên rút gọn:</label>
                    </div>
                    <div className="form-group col-md-8">
                        <label>{ModelName} - {item.ProductshortName}</label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label className="col-form-label">Danh mục mặc định:</label>
                    </div>
                    <div className="form-group col-md-8">
                        <label>
                            {
                                this.state.LstCacheCategory.map((itemCategory, i) => {
                                    if (idDefaultCategoryID === itemCategory.CategoryID) {
                                        return (
                                            <span key={i} >{itemCategory.CategoryName}</span>
                                        )
                                    }
                                })
                            }
                        </label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label className="col-form-label">Đơn vị tính mặc định:</label>
                    </div>
                    <div className="form-group col-md-8">
                        <label>
                            {
                                this.state.LstCacheQuantity.map((itemQuantity, i) => {
                                    if (idDefaultquantityunitID === itemQuantity.QuantityUnitID) {
                                        return (
                                            <span key={i}>{itemQuantity.QuantityUnitName}</span>
                                        )
                                    }
                                })
                            }
                        </label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label className="col-form-label">Đặc điểm sản phẩm:</label>
                    </div>
                    <div className="form-group col-md-8">
                        <label>
                            {
                                this.state.LstCacheProductFeature.map((itemProductFeature, i) => {
                                    if (ProductFeature === itemProductFeature.ProductFeatureID) {
                                        return (
                                            <span key={i}>
                                                {itemProductFeature.ProductFeatureName}
                                            </span>
                                        )
                                    }

                                })
                            }
                        </label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Loại sản phẩm:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label>
                            {
                                this.state.LstCacheProductType.map((itemProductType, i) => {
                                    if (idProductType === itemProductType.ProductTypeID) {
                                        return (
                                            <span key={i}>{itemProductType.ProductTypeName}</span>
                                        )
                                    }
                                })
                            }
                        </label>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Nhãn hiệu:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label>
                            {
                                this.state.LstCacheBrand.map((itemBrand, i) => {
                                    if (idBrand === itemBrand.BrandID) {
                                        return (
                                            <span key={i}>
                                                {itemBrand.BrandName}
                                            </span>
                                        )
                                    }
                                })
                            }
                        </label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Ngày tạo:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label>{formatDate(item.CreatedDate, true)}</label>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Người tạo:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label>{item.FullName}</label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Không thuế xuất mua hàng:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <div className="custom-control custom-checkbox">
                            <input className=" custom-control-input" type="checkbox" value='' defaultChecked={item.Isnopovat} />
                            <label className="custom-control-label" ></label>
                        </div>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="col-form-label">Không thuế suất:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <div className="custom-control custom-checkbox">
                            <input className=" custom-control-input" type="checkbox" value='' defaultChecked={item.Isnovat} />
                            <label className="custom-control-label" ></label>
                        </div>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label">VAT(%):</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label>10%</label>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="col-form-label">VAT mua hàng(%)</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label>20%</label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label className="col-form-label">Phương thức vận chuyển:</label>
                    </div>
                    <div className="form-group col-md-8">
                        <label>
                            {
                                this.state.LstCacheShippingMethod.map((itemShippingMethod, i) => {
                                    if (idShippingMethod === itemShippingMethod.ShippingMethodID) {
                                        return (
                                            <span key={i}>
                                                {itemShippingMethod.ShippingMethodName}
                                            </span>
                                        )
                                    }
                                })
                            }
                        </label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-12 btn-link">
                        <Link className="btn btn-primary" to={"/Product/Edit/" + this.props.ProductID}>Cập nhật sản phẩm</Link>
                    </div>
                </div>


            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        AppInfo: state,
        FetchAPIInfo: state.FetchAPIInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        }

    }
}

const GeneralInfo = connect(mapStateToProps, mapDispatchToProps)(GeneralInfoCom);
export default GeneralInfo;