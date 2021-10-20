import React from "react";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import ReactNotification from "react-notifications-component";
import readXlsxFile from 'read-excel-file';

import {
    schemaDAStore_Store,
    schemaDAStoreGoodsGroup,
    schemaDeliveryAbilityStore,
} from "../constants";

import { MessageModal } from "../../../../../common/components/Modal";
import { showModal, hideModal } from '../../../../../actions/modal';
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { callGetCache } from "../../../../../actions/cacheAction";
import { MODAL_TYPE_COMMONTMODALS } from '../../../../../constants/actionTypes';
import ImpDAStoreExcelModalCom from './ImpDAStoreExcelModal';
import ImpDAStore_StoreModalCom from './ImpDAStore_StoreModal';
import ErrorMessageModalCom from './ErrorMessageModal';
import ImpDAStoreGoodGroupCom from './ImpDAStoreGoodGroup';

class ImportSelectionModalCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };

        this.addNotification = this.addNotification.bind(this);
        this.handleDAStore_Store = this.handleDAStore_Store.bind(this);
        this.handleDAStoreGoodsGroup = this.handleDAStoreGoodsGroup.bind(this);
        this.handleDeliveryAbilityStore = this.handleDeliveryAbilityStore.bind(this);
        this.handleReadXlsxFile = this.handleReadXlsxFile.bind(this);
        this.handleSubmitDAStore_Store = this.handleSubmitDAStore_Store.bind(this);
        this.handleSubmitDAStoreGoodsGroup = this.handleSubmitDAStoreGoodsGroup.bind(this);
        this.handleSubmitDeliveryAbilityStore = this.handleSubmitDeliveryAbilityStore.bind(this);
        this.notificationDOMRef = React.createRef();
        this.showMessage = this.showMessage.bind(this);
    }

    componentDidMount() {
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
            />
        );
    }

    handleDeliveryAbilityStore() {
        this.handleReadXlsxFile(this.handleSubmitDeliveryAbilityStore, schemaDeliveryAbilityStore)
    }

    handleDAStore_Store() {
        this.handleReadXlsxFile(this.handleSubmitDAStore_Store, schemaDAStore_Store);
    }

    handleDAStoreGoodsGroup() {
        this.handleReadXlsxFile(this.handleSubmitDAStoreGoodsGroup, schemaDAStoreGoodsGroup);
    }

    handleReadXlsxFile(setImportData, schema) {
        const input = document.getElementById("inputImportFile");
        input.click();

        input.addEventListener("change", () => {
            readXlsxFile(input.files[0], { sheet: "data", schema }).then((data) => {
                setImportData(data);
            }).catch(error => {
                console.log("ReadXlsxFile", error);
                alert("File vừa chọn lỗi. Vui lòng chọn file khác")
            }).finally(() => {
                input.value = "";
            })
        }, { once: true })
    }

    handleSubmitDeliveryAbilityStore(data) {
        if (data.errors.length != 0) {
            this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
                title: 'Thông báo lỗi',
                content: {
                    text: <ErrorMessageModalCom
                        dataGrid={data}
                    />
                },
                maxWidth: '1000px'
            })
        } else {
            if (data.rows.length != 0) {
                this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
                    title: 'Kết quả nhập từ excel',
                    content: {
                        text: <ImpDAStoreExcelModalCom
                            importData={data}
                        />
                    },
                    maxWidth: '90%'
                })
            } else {
                this.addNotification("Dữ liệu trong file không tồn tại. Không thể nhập file!", true);
            }
        }
    }

    handleSubmitDAStore_Store(data) {
        if (data.errors.length != 0) {
            this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
                title: 'Thông báo lỗi',
                content: {
                    text: <ErrorMessageModalCom
                        dataGrid={data}
                    />
                },
                maxWidth: '1000px'
            })
        } else {
            if (data.rows.length != 0) {
                this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
                    title: 'Kết quả nhập từ excel',
                    content: {
                        text: <ImpDAStore_StoreModalCom
                            importData={data}
                        />
                    },
                    maxWidth: '90%'
                })
            } else {
                this.addNotification("Dữ liệu trong file không tồn tại. Không thể nhập file!", true);
            }
        }
    }

    handleSubmitDAStoreGoodsGroup(data) {
        if (data.errors.length != 0) {
            this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
                title: 'Thông báo lỗi',
                content: {
                    text: <ErrorMessageModalCom
                        dataGrid={data}
                    />
                },
                maxWidth: '1000px'
            })
        } else {
            if (data.rows.length != 0) {
                this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
                    title: 'Kết quả nhập từ excel',
                    content: {
                        text: <ImpDAStoreGoodGroupCom
                            importData={data}
                        />
                    },
                    maxWidth: '90%'
                })
            } else {
                this.addNotification("Dữ liệu trong file không tồn tại. Không thể nhập file!", true);
            }
        }
    }

    render() {
        return (
            < React.Fragment >
                <ReactNotification ref={this.notificationDOMRef} />

                <div className="d-flex flex-column p-4">
                    <button type="button" className="btn btn-info mb-2" onClick={this.handleDeliveryAbilityStore}>
                        Danh sách kho lấy tải
                    </button>

                    <button type="button" className="btn btn-info mb-2" onClick={this.handleDAStore_Store}>
                        Danh sách kho xuất của kho lấy tải
                    </button>

                    <button type="button" className="btn btn-info mb-2" onClick={this.handleDAStoreGoodsGroup}>
                        Danh sách tỷ lệ phân bố tải theo từng kho
                    </button>
                </div>

                <input type="file" id="inputImportFile" hidden />
            </React.Fragment >
        )
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: () => {
            dispatch(hideModal());
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImportSelectionModalCom);