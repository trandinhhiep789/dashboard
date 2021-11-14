import React from "react";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import ReactNotification from "react-notifications-component";
import readXlsxFile from 'read-excel-file';

import {
    SchemaMaterialGroup, SchemaMaterialGroupInstallCond, SchemaMaterialGroupProduct,
} from "../constants";

import { MessageModal } from "../../../../../common/components/Modal";
import { showModal, hideModal } from '../../../../../actions/modal';
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { callGetCache } from "../../../../../actions/cacheAction";
import { MODAL_TYPE_COMMONTMODALS } from '../../../../../constants/actionTypes';
import ErrorMessageModalCom from './ErrorMessageModal';
import ImpMaterialGroup from "./ImpMaterialGroup";
import ImpMaterialGroupProduct from "./ImpMaterialGroupProduct";
import ImpMaterialGroupInstallCond from './ImpMaterialGroupInstallCond';

class ImportSelectionModalCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };

        this.addNotification = this.addNotification.bind(this);
        this.handleMaterialGroupProduct = this.handleMaterialGroupProduct.bind(this);
        this.handleMaterialGroupInstallCond = this.handleMaterialGroupInstallCond.bind(this);
        this.handleMaterialGroup = this.handleMaterialGroup.bind(this);
        this.handleReadXlsxFile = this.handleReadXlsxFile.bind(this);
        this.handleSubmitMaterialGroupProduct = this.handleSubmitMaterialGroupProduct.bind(this);
        this.handleSubmitMaterialGroupInstallCond = this.handleSubmitMaterialGroupInstallCond.bind(this);
        this.handleSubmitMaterialGroup = this.handleSubmitMaterialGroup.bind(this);
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

    handleMaterialGroup() {
        this.handleReadXlsxFile(this.handleSubmitMaterialGroup, SchemaMaterialGroup)
    }

    handleMaterialGroupProduct() {
        this.handleReadXlsxFile(this.handleSubmitMaterialGroupProduct, SchemaMaterialGroupProduct);
    }

    handleMaterialGroupInstallCond() {
        this.handleReadXlsxFile(this.handleSubmitMaterialGroupInstallCond, SchemaMaterialGroupInstallCond);
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

    handleSubmitMaterialGroup(data) {
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
                        text: <ImpMaterialGroup
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

    handleSubmitMaterialGroupProduct(data) {
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
                        text: <ImpMaterialGroupProduct
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

    handleSubmitMaterialGroupInstallCond(data) {
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
                        text: <ImpMaterialGroupInstallCond
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

                    <button type="button" className="btn btn-info mb-2" onClick={this.handleMaterialGroup}>
                        Nhóm vật tư
                    </button>

                    <button type="button" className="btn btn-info mb-2" onClick={this.handleMaterialGroupProduct}>
                        Sản phẩm của nhóm vật tư
                    </button>

                    <button type="button" className="btn btn-info mb-2" onClick={this.handleMaterialGroupInstallCond}>
                        Điều kiện lắp đặt của nhóm vật tư
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