import React from "react";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import ReactNotification from "react-notifications-component";

import {
    AddDAStoreGoodsGroup,
    APIHostName,
    lstColImpDAStoreGoodGroup,
} from '../constants';

import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { callGetCache } from "../../../../../actions/cacheAction";
import { hideModal } from '../../../../../actions/modal';
import { MessageModal } from "../../../../../common/components/Modal";
import { MDMCOMMONCACHE_DELIVERYGOODSGROUP } from '../../../../../constants/keyCache';
import DataGrid from "../../../../../common/components/DataGrid";

class ImpDAStoreGoodGroupCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataGrid: [],
            dataSubmit: [],
            countValid: 0,
            countInValid: 0,
            disableBtnSubmit: false
        };

        this.addNotification = this.addNotification.bind(this);
        this.handleCheckImportData = this.handleCheckImportData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.notificationDOMRef = React.createRef();
        this.returnHeadingTitle = this.returnHeadingTitle.bind(this);
        this.showMessage = this.showMessage.bind(this);
    }

    componentDidMount() {
        this.handleCheckImportData();
    }

    addNotification(message, IsError) {
        let cssNotification, iconNotification;
        if (!IsError) {
            cssNotification = "notification-custom-success";
            iconNotification = "fa fa-check"
        } else {
            cssNotification = "notification-danger";
            iconNotification = "fa fa-exclamation"
        }
        this.notificationDOMRef.current.addNotification({
            container: "bottom-right",
            content: (
                <div className={cssNotification}>
                    <div className="notification-custom-icon">
                        <i className={iconNotification} />
                    </div>
                    <div className="notification-custom-content">
                        <div className="notification-close">
                            <span>×</span>
                        </div>
                        <h4 className="notification-title">Thông Báo</h4>
                        <p className="notification-message">{message}</p>
                    </div>
                </div>
            ),
            dismiss: { duration: 6000 },
            dismissable: { click: true }
        });
    }

    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
                onCloseModal={this.handleCloseMessageModal}
            />
        );
    }

    handleCheckImportData() {
        //#region tạo promise với nhóm hàng hóa vận chuyển cache
        const DeliveryGoodsGroupPromise = new Promise((resolve, reject) => {
            this.props.callGetCache(MDMCOMMONCACHE_DELIVERYGOODSGROUP).then((result) => {
                if (!result.IsError && result.ResultObject.CacheData != null) {
                    resolve(result.ResultObject.CacheData);
                } else {
                    reject("Lỗi lấy danh sách nhóm hàng hóa vận chuyển");
                }
            })
        })
        //#endregion

        //#region tạo promise DeliveryAbilityStore
        const DeliveryAbilityStorePromise = new Promise((resolve, reject) => {
            this.props.callGetCache("ERPCOMMONCACHE.DELIVERYABILITYSTORE").then((result) => {
                if (!result.IsError && result.ResultObject.CacheData != null) {
                    resolve(result.ResultObject.CacheData);
                } else {
                    reject("Lỗi lấy danh sách kho lấy tải");
                }
            })
        })
        //#endregion

        //#region kiểm tra mã kho và danh sách nhóm hàng hóa vận chuyển nhập vào từ excel
        Promise.all([DeliveryGoodsGroupPromise, DeliveryAbilityStorePromise]).then((values) => {
            let countValid = 0, countInValid = 0, dataSubmit = [];

            const uptDataGrid = this.props.importData.rows.map(item => {
                //#region kiểm tra có tồn tại mã nhóm hàng hóa vận chuyển không
                const DeliveryGoodsGroupFound = values[0].find(element => element.DeliveryGoodsGroupID == item.DeliveryGoodsGroupID);
                //#endregion

                //#region kiểm tra xem có tồn tại mã kho tải không
                const DeliveryAbilityStoreFound = values[1].find(element => element.DeliveryAbilityStoreID == item.DeliveryAbilityStoreID);
                //#endregion

                if (!DeliveryGoodsGroupFound && !DeliveryAbilityStoreFound) {
                    countInValid++;

                    return {
                        ...item,
                        errorContent: `Không tìm thấy kho lấy tải và nhóm hàng hóa vận chuyển`
                    }
                } else if (!DeliveryAbilityStoreFound) {
                    countInValid++;

                    return {
                        ...item,
                        errorContent: `Không tìm thấy kho lấy tải`,
                        DeliveryGoodsGroupName: DeliveryGoodsGroupFound.DeliveryGoodsGroupName
                    }
                } else if (!DeliveryGoodsGroupFound) {
                    countInValid++;

                    return {
                        ...item,
                        errorContent: `Không tìm thấy nhóm hàng hóa vận chuyển`,
                        DeliveryAbilityStoreName: DeliveryAbilityStoreFound.DeliveryAbilityStoreName
                    }
                } else {
                    countValid++;

                    dataSubmit.push({
                        ...item,
                        DeliveryAbilityStoreName: DeliveryAbilityStoreFound.DeliveryAbilityStoreName,
                        DeliveryGoodsGroupName: DeliveryGoodsGroupFound.DeliveryGoodsGroupName
                    })

                    return {
                        ...item,
                        DeliveryAbilityStoreName: DeliveryAbilityStoreFound.DeliveryAbilityStoreName,
                        DeliveryGoodsGroupName: DeliveryGoodsGroupFound.DeliveryGoodsGroupName
                    }
                }
            });

            this.setState({
                dataGrid: uptDataGrid,
                dataSubmit,
                countValid,
                countInValid,
                disableBtnSubmit: countValid == 0 ? true : false
            })
        }).catch(error => this.addNotification(error, true));
        //#endregion
    }

    returnHeadingTitle() {
        return (
            <React.Fragment>
                <h5 className="d-flex mb-2">Danh sách kho lấy tải<i><small className="text-danger">&nbsp;(Chỉ chấp nhận những dòng hợp lệ)</small></i></h5>

                <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0">Không hợp lệ: {this.state.countInValid}</p>
                    <p className="mb-0">Hợp lệ: {this.state.countValid}</p>
                    <p className="mb-0">Tổng cộng: {this.state.dataSubmit.length}</p>

                    <button type="button" className="btn btn-info mr-2" disabled={this.state.disableBtnSubmit} onClick={this.handleSubmit}>Đồng ý</button>
                </div>
            </React.Fragment>
        )
    }

    handleSubmit() {
        const uptDataSubmit = this.state.dataSubmit.map(item => {
            return {
                ...item,
                CreatedUser: this.props.AppInfo.LoginInfo.Username,
                IsActived: true,
                IsSystem: false,
                LoginLogID: JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID,
            }
        })

        this.props.callFetchAPI(APIHostName, AddDAStoreGoodsGroup, uptDataSubmit).then(apiResult => {
            if (apiResult.IsError) {
                this.showMessage(apiResult.Message);
            } else {
                this.showMessage(apiResult.Message);
                this.props.hideModal();
            }
        });
    }

    render() {
        return <React.Fragment>
            <ReactNotification ref={this.notificationDOMRef} />

            <DataGrid
                dataSource={this.state.dataGrid}
                headingTitle={this.returnHeadingTitle("Danh sách tỷ lệ phân bố tải theo từng kho")}
                IsAutoPaging={true}
                isHideHeaderToolbar={true}
                listColumn={lstColImpDAStoreGoodGroup}
                PKColumnName={""}
                RowsPerPage={10}
            />
        </React.Fragment>
    }
}

ImpDAStoreGoodGroupCom.defaultProps = {
    importData: {
        rows: [],
        errors: []
    }
};

const mapStateToProps = state => {
    return {
        AppInfo: state,
        FetchAPIInfo: state.FetchAPIInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        hideModal: (type, props) => {
            dispatch(hideModal(type, props));
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImpDAStoreGoodGroupCom);