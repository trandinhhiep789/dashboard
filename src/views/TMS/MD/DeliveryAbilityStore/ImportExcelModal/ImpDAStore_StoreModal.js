import React from "react";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import ReactNotification from "react-notifications-component";

import {
    APIHostName,
    ImportDAStore_StorePath,
    lstColImpDAStore_StoreModal,
} from '../constants';

import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { callGetCache } from "../../../../../actions/cacheAction";
import { ERPCOMMONCACHE_STORE } from "../../../../../constants/keyCache";
import { hideModal } from '../../../../../actions/modal';
import { MessageModal } from "../../../../../common/components/Modal";
import DataGrid from "../../../../../common/components/DataGrid";

class ImpDAStore_StoreModal extends React.Component {
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
        //#region tạo promise với Store cache
        const SenderStorePromise = new Promise((resolve, reject) => {
            this.props.callGetCache(ERPCOMMONCACHE_STORE).then((result) => {
                if (!result.IsError && result.ResultObject.CacheData != null) {
                    const uptCacheData = result.ResultObject.CacheData.filter(x => x.CompanyID == 1 && x.IsActive == true);

                    resolve(uptCacheData);
                } else {
                    reject("Lỗi lấy danh sách kho xuất");
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

        //#region kiểm tra mã kho nhập vào từ excel
        Promise.all([SenderStorePromise, DeliveryAbilityStorePromise]).then((values) => {
            let countValid = 0, countInValid = 0, dataSubmit = [];

            const uptDataGrid = this.props.importData.rows.map(item => {
                //#region kiểm tra có tồn tại mã kho xuất không
                const SenderStoreFound = values[0].find(element => element.StoreID == item.SenderStoreID);
                //#endregion

                //#region kiểm tra xem có tồn tại mã kho tải không
                const DeliveryAbilityStoreFound = values[1].find(element => element.DeliveryAbilityStoreID == item.DeliveryAbilityStoreID);
                //#endregion

                if (!SenderStoreFound && !DeliveryAbilityStoreFound) {
                    countInValid++;

                    return {
                        ...item,
                        errorContent: `Không tìm thấy kho lấy tải và kho xuất`
                    }
                } else if (!DeliveryAbilityStoreFound) {
                    countInValid++;

                    return {
                        ...item,
                        errorContent: `Không tìm thấy kho lấy tải`,
                        SenderStoreName: SenderStoreFound.StoreName
                    }
                } else if (!SenderStoreFound) {
                    countInValid++;

                    return {
                        ...item,
                        errorContent: `Không tìm thấy kho xuất`,
                        DeliveryAbilityStoreName: DeliveryAbilityStoreFound.DeliveryAbilityStoreName
                    }
                } else {
                    countValid++;

                    dataSubmit.push({
                        ...item,
                        DeliveryAbilityStoreName: DeliveryAbilityStoreFound.DeliveryAbilityStoreName,
                        SenderStoreName: SenderStoreFound.StoreName
                    })

                    return {
                        ...item,
                        DeliveryAbilityStoreName: DeliveryAbilityStoreFound.DeliveryAbilityStoreName,
                        SenderStoreName: SenderStoreFound.StoreName
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
                LoginlogID: JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID
            }
        });

        this.props.callFetchAPI(APIHostName, ImportDAStore_StorePath, uptDataSubmit).then(apiResult => {
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
                headingTitle={this.returnHeadingTitle("Danh sách kho xuất của kho lấy tải")}
                listColumn={lstColImpDAStore_StoreModal}
                dataSource={this.state.dataGrid}
                PKColumnName={"SenderStoreID"}
                IsAutoPaging={true}
                RowsPerPage={10}
                isHideHeaderToolbar={true}
            />
        </React.Fragment>
    }
}

ImpDAStore_StoreModal.defaultProps = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ImpDAStore_StoreModal);