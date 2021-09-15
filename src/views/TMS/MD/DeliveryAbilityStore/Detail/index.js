import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import { MessageModal } from "../../../../../common/components/Modal";

import {
    APIHostName,
    BackLink,
    DetailPagePath,
    LoadAPIPath,
} from "../constants";

import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { callGetCache } from "../../../../../actions/cacheAction";
import { formatDate } from "../../../../../common/library/CommonLib";
import { updatePagePath } from "../../../../../actions/pageAction";
import DAStoreGoodsGroupCom from "../../DAStoreGoodsGroup/DataGrid";
import DeliveryAbilityStore_Store from "../../DeliveryAbilityStore_Store";

class DetailCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.callLoadData = this.callLoadData.bind(this);
        this.onComponentChange = this.onComponentChange.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsLoadDataComplete: false,
            IsCloseForm: false
        };
    }

    componentDidMount() {
        this.props.updatePagePath(DetailPagePath);
        this.callLoadData();

    }

    callLoadData() {
        const id = this.props.match.params.id;
        this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then(apiResult => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            } else {
                this.setState({ DataSource: apiResult.ResultObject });
            }
            this.setState({
                IsLoadDataComplete: true
            });
            //console.log("apiResult", apiResult);
        });

        // this.props.callFetchAPI(APIHostName, GetMaterialProductAPIPath, id).then(apiResult => {
        //     if (apiResult.IsError) {
        //         this.setState({
        //             IsCallAPIError: apiResult.IsError
        //         });
        //         this.showMessage(apiResult.Message);
        //     } else {
        //         this.setState({ MaterialProductDataSource: apiResult.ResultObject });
        //     }
        //     //console.log("apiResult", apiResult);
        // });
    }

    onComponentChange() {
        this.callLoadData();
    }



    handleCloseMessage() {
        if (this.state.IsCallAPIError) this.setState({ IsCloseForm: true });
    }

    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
                onCloseModal={this.handleCloseMessage}
            />
        );
    }

    render() {
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }

        if (this.state.IsLoadDataComplete && !this.state.IsCallAPIError) {
            return (
                <React.Fragment>
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="x_panel">
                            <div className="x_title">
                                <h2>Thông tin kho lấy tải</h2>
                                <div className="clearfix"></div>
                            </div>

                            <div className="x_content col-md-12">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Mã kho lấy tải: </span>
                                            <span className="xcode">{this.state.DataSource.DeliveryAbilityStoreID}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Tên kho lấy tải: </span>
                                            <span>{this.state.DataSource.DeliveryAbilityStoreName}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Kho Tận Tâm: </span>
                                            <span>{this.state.DataSource.StoreName}</span>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span> Thứ tự hiển thị: </span>
                                            <span>{this.state.DataSource.OrderIndex}</span>
                                        </div>
                                    </div>
                                </div>





                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group checkbox customCheckbox">
                                            <span>Kích hoạt: </span>
                                            <label>
                                                <input name="IsActived" type="checkbox" id="IsActived" checked={this.state.DataSource.IsActived} />
                                                <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group checkbox customCheckbox">
                                            <span>Hệ thống: </span>
                                            <label>
                                                <input name="IsSystem" type="checkbox" id="IsSystem" checked={this.state.DataSource.IsSystem} />
                                                <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>



                                {/* <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span> Kiểu lấy chi phí: </span>
                                            <span>{this.state.DataSource.GetFeeTypeName}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span> Mô tả: </span>
                                            <span>{this.state.DataSource.Description}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group checkbox customCheckbox">
                                            <span>Có tự động duyệt: </span>
                                            <label>
                                                <input name="IsAutoReview" type="checkbox" id="IsAutoReview" checked={this.state.DataSource.IsAutoReview} />
                                                <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                                            </label>
                                        </div>
                                    </div>
                                </div> */}

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Người cập nhật: </span>
                                            <span>{this.state.DataSource.UpdatedUserFullName}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Ngày cập nhật: </span>
                                            <span>{formatDate(this.state.DataSource.UpdatedDate)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group checkbox customCheckbox">
                                            <span>Cho phép nhập trùng SP </span>
                                            <label>
                                                <input name="IsAllowDuplicationProduct" type="checkbox" id="IsAllowDuplicationProduct" checked={this.state.DataSource.IsAllowDuplicationProduct} />
                                                <span className="cr"><i className="cr-icon fa fa-check"></i></span>
                                            </label>
                                        </div>
                                    </div>
                                </div> */}



                            </div>
                        </div>
                    </div>

                    <DeliveryAbilityStore_Store
                        DeliveryAbilityStoreID={this.props.match.params.id}
                        DataSource={this.state.DataSource.ListDeliveryAbilityStore_Store ? this.state.DataSource.ListDeliveryAbilityStore_Store : []}
                        //MTReturnRequestType_ReviewLevel_User_DataSource={this.state.DataSource.ListMTReturnRequestType_ReviewLevel_User ? this.state.DataSource.ListMTReturnRequestType_ReviewLevel_User : []}
                        onComponentChange={this.onComponentChange}
                    />

                    <DAStoreGoodsGroupCom
                        deliveryAbilityStoreID={this.props.match.params.id}
                    />

                    {/* <br />
                    <MTReturnRequestType_Product
                        MTReturnRequestTypeID={this.props.match.params.id}
                        DataSource={this.state.DataSource.ListMTReturnRequestType_Product ? this.state.DataSource.ListMTReturnRequestType_Product : []}
                        onComponentChange={this.onComponentChange}
                        MaterialProductDataSource={this.state.MaterialProductDataSource ? this.state.MaterialProductDataSource : []}
                    /> */}

                    {/* <br />
                    {!this.state.DataSource.IsAutoReview ?
                        <MTReturnRequestType_ReviewLevel
                            MTReturnRequestTypeID={this.props.match.params.id}
                            DataSource={this.state.DataSource.ListMTReturnRequestType_ReviewLevel ? this.state.DataSource.ListMTReturnRequestType_ReviewLevel : []}
                            //MTReturnRequestType_ReviewLevel_User_DataSource={this.state.DataSource.ListMTReturnRequestType_ReviewLevel_User ? this.state.DataSource.ListMTReturnRequestType_ReviewLevel_User : []}
                            onComponentChange={this.onComponentChange}
                        />
                        : ""
                    } */}


                    {/* <MTReturnRequestType_ReviewLevel_User
                        MTReturnRequestTypeID={this.props.match.params.id}
                        MTReturnRequestType_ReviewLevel_DataSource={this.state.DataSource.ListMTReturnRequestType_ReviewLevel ? this.state.DataSource.ListMTReturnRequestType_ReviewLevel : []}
                        MTReturnRequestType_ReviewLevel_User_DataSource={this.state.DataSource.ListMTReturnRequestType_ReviewLevel_User ? this.state.DataSource.ListMTReturnRequestType_ReviewLevel_User : []}
                        onComponentChange={this.onComponentChange}
                    /> */}
                </React.Fragment >
            );
        }
        return (
            <div>
                <label>Đang nạp dữ liệu...</label>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        AppInfo: state,
        FetchAPIInfo: state.FetchAPIInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updatePagePath: pagePath => {
            dispatch(updatePagePath(pagePath));
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        }
    };
};

const Detail = connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailCom);
export default Detail;
