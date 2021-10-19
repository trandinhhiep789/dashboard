import React from "react";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import ReactNotification from "react-notifications-component";

import {
    APIHostName,
    ImportDeliveryAbilityStorePath,
    lstColImportExcelModal,
} from '../constants';

import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { callGetCache } from "../../../../../actions/cacheAction";
import { hideModal } from '../../../../../actions/modal';
import { MessageModal } from "../../../../../common/components/Modal";
import DataGrid from "../../../../../common/components/DataGrid";

class ImpDAStoreExcelModalCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataGrid: [],
            dataSubmit: [],
            countValid: 0,
            countInValid: 0,
            disableBtnSubmit: false
        };

        this.notificationDOMRef = React.createRef();
        this.addNotification = this.addNotification.bind(this);
        this.showMessage = this.showMessage.bind(this);
        this.returnHeadingTitle = this.returnHeadingTitle.bind(this);
        this.handleCheckStoreID = this.handleCheckStoreID.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.handleCheckStoreID();
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

    handleCheckStoreID() {
        this.props.callGetCache("ERPCOMMONCACHE.STORE").then((result) => {
            let countValid = 0, countInValid = 0, dataSubmit = [];

            if (!result.IsError && result.ResultObject.CacheData != null) {

                //#region kiểm tra có tồn tại kho tận tâm hay không
                let dataGrid = this.props.importData.rows.map(item => {
                    const found = result.ResultObject.CacheData.find(element => element.StoreID == item.StoreID);

                    if (!found) {
                        countInValid++;
                        return {
                            ...item,
                            errorContent: "Không tìm thấy kho Tận Tâm"
                        }
                    } else {
                        countValid++;

                        dataSubmit.push({
                            ...item,
                            errorContent: "",
                            StoreName: found.StoreName
                        })

                        return {
                            ...item,
                            errorContent: "",
                            StoreName: found.StoreName
                        }
                    }
                });
                //#endregion

                //#region kiểm tra dữ liệu nhập vào có đúng định dạng hay không
                if (this.props.importData.errors.length != 0) {
                    this.props.importData.errors.forEach(item => {
                        if (item.row - 1 < dataGrid.length) {
                            switch (item.error) {
                                case "invalid":
                                    dataGrid[item.row - 1] = {
                                        ...dataGrid[item.row - 1],
                                        errorContent: `Cột ${item.column} sai giá trị (vui lòng điền số), ${dataGrid[item.row - 1].errorContent}`
                                    }
                                    break;
                                case "required":
                                    dataGrid[item.row - 1] = {
                                        ...dataGrid[item.row - 1],
                                        errorContent: `Cột ${item.column} chưa có giá trị, ${dataGrid[item.row - 1].errorContent}`
                                    }
                                    break;
                                default:
                                    dataGrid[item.row - 1] = {
                                        ...dataGrid[item.row - 1],
                                        errorContent: `${dataGrid[item.row - 1].errorContent}`
                                    }
                                    break;
                            }
                        }
                    })
                }
                //#endregion

                this.setState({
                    dataGrid,
                    dataSubmit,
                    countValid,
                    countInValid,
                    disableBtnSubmit: countValid == 0 ? true : false
                })

            } else {
                this.addNotification("Lỗi lấy danh sách kho tận tâm");
            }
        })
    }

    returnHeadingTitle() {
        return (
            <React.Fragment>
                <h5 className="d-flex mb-2">Danh sách kho lấy tải<i><small className="text-danger">&nbsp;(Chỉ chấp nhận những dòng hợp lệ)</small></i></h5>
                <div className="container">
                    <div className="row ">
                        <div className="col d-flex justify-content-between align-items-center">
                            <p className="mb-0">Không hợp lệ: {this.state.countInValid}</p>
                            <p className="mb-0">Hợp lệ: {this.state.countValid}</p>
                            <p className="mb-0">Tổng cộng: {this.state.dataSubmit.length}</p>
                        </div>

                        <div className="col d-flex justify-content-end align-items-center">
                            <button type="button" className="btn btn-info mr-2" disabled={this.state.disableBtnSubmit} onClick={this.handleSubmit}>Đồng ý</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    handleSubmit() {
        const uptDataSubmit = this.state.dataSubmit.map(item => {
            return {
                ...item,
                CreatedUser: this.props.AppInfo.LoginInfo.Username,
                IsActived: 1,
                DeliveryAbilityStoreName: `${item.StoreID} - ${item.StoreName}`,
                IsSystem: 0,
                LoginLogID: JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID
            }
        })

        this.props.callFetchAPI(APIHostName, ImportDeliveryAbilityStorePath, uptDataSubmit).then(apiResult => {
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
                headingTitle={this.returnHeadingTitle("Danh sách kho lấy tải")}
                listColumn={lstColImportExcelModal}
                dataSource={this.state.dataGrid}
                PKColumnName={"StoreID"}
                IsAutoPaging={true}
                RowsPerPage={10}
                isHideHeaderToolbar={true}
            />
        </React.Fragment>
    }
}

ImpDAStoreExcelModalCom.defaultProps = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ImpDAStoreExcelModalCom);