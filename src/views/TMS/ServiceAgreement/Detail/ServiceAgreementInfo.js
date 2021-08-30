import React, { Component } from "react";
import { connect } from 'react-redux';
import { ModalManager } from 'react-dynamic-modal';
import ReactNotification from "react-notifications-component";
import readXlsxFile from 'read-excel-file';

import {
    APIHostName,
    AreaSchema,
    DataTemplateExportArea,
    DataTemplateExportStore,
    listColumnArea,
    listColumnImportFileArea,
    listColumnImportFileStore,
    listColumnStore,
    StoreSchema
} from "../constants";

import { MessageModal } from "../../../../common/components/Modal";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { callGetCache } from "../../../../actions/cacheAction";
import { formatDate } from "../../../../common/library/CommonLib.js";
import { MODAL_TYPE_COMMONTMODALS } from '../../../../constants/actionTypes';
import { showModal, hideModal } from '../../../../actions/modal';
import DataGrid from "../../../../common/components/DataGrid";
import AreaModalCom from '../Area/Modal';
import StoreModalCom from '../Store/Modal';
import ImportExcelModalCom from '../ImportExcelModal';
import { formatMoney } from '../../../../utils/function';

class ServiceAgreementInfoCom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ServiceAgreementAreaData: this.props.ServiceAgreementInfo.ServiceAgreement_AreaList,
            ServiceAgreementStoreData: this.props.ServiceAgreementInfo.ServiceAgreement_StoreList
        }

        this.addNotification = this.addNotification.bind(this);
        this.callLoadData_ServiceAgreementArea = this.callLoadData_ServiceAgreementArea.bind(this);
        this.callLoadData_ServiceAgreementStore = this.callLoadData_ServiceAgreementStore.bind(this);
        this.handleDataSubmit_ServiceAgreementArea = this.handleDataSubmit_ServiceAgreementArea.bind(this);
        this.handleDataSubmit_ServiceAgreementStore = this.handleDataSubmit_ServiceAgreementStore.bind(this);
        this.handleDeleteClick_ServiceAgreementArea = this.handleDeleteClick_ServiceAgreementArea.bind(this);
        this.handleDeleteClick_ServiceAgreementStore = this.handleDeleteClick_ServiceAgreementStore.bind(this);
        this.handleExportFileTemplate_ServiceAgreementArea = this.handleExportFileTemplate_ServiceAgreementArea.bind(this);
        this.handleExportFileTemplate_ServiceAgreementStore = this.handleExportFileTemplate_ServiceAgreementStore.bind(this);
        this.handleImportFile_ServiceAgreementArea = this.handleImportFile_ServiceAgreementArea.bind(this);
        this.handleImportFile_ServiceAgreementStore = this.handleImportFile_ServiceAgreementStore.bind(this);
        this.handleInsertClick_ServiceAgreementArea = this.handleInsertClick_ServiceAgreementArea.bind(this);
        this.handleInsertClick_ServiceAgreementStore = this.handleInsertClick_ServiceAgreementStore.bind(this);
        this.handleInsertClickEdit_ServiceAgreementArea = this.handleInsertClickEdit_ServiceAgreementArea.bind(this);
        this.handleInsertClickEdit_ServiceAgreementStore = this.handleInsertClickEdit_ServiceAgreementStore.bind(this);
        this.handleSetImportData_ServiceAgreementArea = this.handleSetImportData_ServiceAgreementArea.bind(this);
        this.handleSetImportData_ServiceAgreementStore = this.handleSetImportData_ServiceAgreementStore.bind(this);
        this.handleSubmitEdit_ServiceAgreementArea = this.handleSubmitEdit_ServiceAgreementArea.bind(this);
        this.handleSubmitEdit_ServiceAgreementStore = this.handleSubmitEdit_ServiceAgreementStore.bind(this);
        this.handleSubmitImportFile_ServiceAgreementArea = this.handleSubmitImportFile_ServiceAgreementArea.bind(this);
        this.handleSubmitImportFile_ServiceAgreementStore = this.handleSubmitImportFile_ServiceAgreementStore.bind(this);
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

    callLoadData_ServiceAgreementArea() {
        this.props.callFetchAPI(APIHostName, "api/ServiceAgreement_Area/Search", this.props.ServiceAgreementInfo.ServiceAgreementID).then(apiResult => {
            if (!apiResult.IsError) {
                this.setState({
                    ServiceAgreementAreaData: apiResult.ResultObject
                })
            }
        });
    }

    callLoadData_ServiceAgreementStore() {
        this.props.callFetchAPI(APIHostName, "api/ServiceAgreement_Store/Search", this.props.ServiceAgreementInfo.ServiceAgreementID).then(apiResult => {
            if (!apiResult.IsError) {
                this.setState({
                    ServiceAgreementStoreData: apiResult.ResultObject
                })
            }
        });
    }

    handleDataSubmit_ServiceAgreementArea(ServiceArgeementAreaTotal, newServiceArgeementArea) {
        const dataSubmit = {
            ...newServiceArgeementArea,
            CreatedUser: this.props.AppInfo.LoginInfo.Username,
            ServiceAgreementID: this.props.ServiceAgreementInfo.ServiceAgreementID,
            SignedDate: this.props.ServiceAgreementInfo.SignedDate
        };

        this.props.callFetchAPI(APIHostName, "api/ServiceAgreement_Area/Add", dataSubmit).then(apiResult => {
            if (!apiResult.IsError) {
                this.callLoadData_ServiceAgreementArea();
            }
            this.addNotification(apiResult.Message, apiResult.IsError);
        });
    }

    handleDataSubmit_ServiceAgreementStore(ServiceArgeementStoreTotal, newServiceArgeementStore) {
        const dataSubmit = {
            ...newServiceArgeementStore,
            CreatedUser: this.props.AppInfo.LoginInfo.Username,
            ServiceAgreementID: this.props.ServiceAgreementInfo.ServiceAgreementID,
            SignedDate: this.props.ServiceAgreementInfo.SignedDate
        };

        this.props.callFetchAPI(APIHostName, "api/ServiceAgreement_Store/AddList", [dataSubmit]).then(apiResult => {
            if (!apiResult.IsError) {
                this.callLoadData_ServiceAgreementStore();
            }
            this.addNotification(apiResult.Message, apiResult.IsError);
        });
    }

    handleDeleteClick_ServiceAgreementArea(listDeleteID, ListPKColumnName) {
        const listDeleteArea = listDeleteID.map(item => {
            return {
                ServiceAgreementID: this.props.ServiceAgreementInfo.ServiceAgreementID,
                AreaID: item.pkColumnName[0].value,
                DeletedUser: this.props.AppInfo.LoginInfo.Username
            }
        })

        this.props.callFetchAPI(APIHostName, "api/ServiceAgreement_Area/DeleteList", listDeleteArea).then(apiResult => {
            if (!apiResult.IsError) {
                this.callLoadData_ServiceAgreementArea();
            }
            this.addNotification(apiResult.Message, apiResult.IsError);
        });
    }

    handleDeleteClick_ServiceAgreementStore(listDeleteID, ListPKColumnName) {
        const listDeleteStore = listDeleteID.map(item => {
            return {
                ServiceAgreementID: this.props.ServiceAgreementInfo.ServiceAgreementID,
                StoreID: item.pkColumnName[0].value,
                DeletedUser: this.props.AppInfo.LoginInfo.Username
            }
        })

        this.props.callFetchAPI(APIHostName, "api/ServiceAgreement_Store/DeleteList", listDeleteStore).then(apiResult => {
            if (!apiResult.IsError) {
                this.callLoadData_ServiceAgreementStore();
            }
            this.addNotification(apiResult.Message, apiResult.IsError);
        });
    }

    handleExportFileTemplate_ServiceAgreementArea(result) {
        this.addNotification(result.Message, result.IsError);
    }

    handleExportFileTemplate_ServiceAgreementStore(result) {
        this.addNotification(result.Message, result.IsError);
    }

    handleImportFile_ServiceAgreementArea() {
        const input = document.getElementById("inputImportFile");
        input.click();

        input.addEventListener("change", () => {
            readXlsxFile(input.files[0], { sheet: "data", schema: AreaSchema }).then((data) => {
                this.handleSetImportData_ServiceAgreementArea(data);
            }).catch(error => {
                console.log("handleImportFile_ServiceAgreementArea", error);
                alert("File vừa chọn lỗi. Vui lòng chọn file khác");
            }).finally(() => {
                input.value = "";
            })
        }, { once: true })
    }

    handleImportFile_ServiceAgreementStore() {
        const input = document.getElementById("inputImportFile");
        input.click();

        input.addEventListener("change", () => {
            readXlsxFile(input.files[0], { sheet: "data", schema: StoreSchema }).then((data) => {
                this.handleSetImportData_ServiceAgreementStore(data);
            }).catch(error => {
                console.log("handleImportFile_ServiceAgreementStore", error);
                alert("File vừa chọn lỗi. Vui lòng chọn file khác");
            }).finally(() => {
                input.value = "";
            })
        }, { once: true })
    }

    handleInsertClick_ServiceAgreementArea() {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Thêm khu vực áp dụng hợp đồng này',
            content: {
                text: <AreaModalCom
                    dataGrid={this.state.ServiceAgreementAreaData}
                    dataSubmit={this.handleDataSubmit_ServiceAgreementArea}
                    modalType="ADD"
                />
            },
            maxWidth: '800px'
        });
    }

    handleInsertClick_ServiceAgreementStore() {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Thêm kho áp dụng hợp đồng này',
            content: {
                text: <StoreModalCom
                    dataGrid={this.state.ServiceAgreementStoreData}
                    dataSubmit={this.handleDataSubmit_ServiceAgreementStore}
                    modalType="ADD"
                />
            },
            maxWidth: '800px'
        });
    }

    handleInsertClickEdit_ServiceAgreementArea(id, pkColumnName) {
        const dataItem = this.state.ServiceAgreementAreaData.find(item => item.AreaID == id.pkColumnName[0].value);

        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Cập nhật khu vực áp dụng hợp đồng này',
            content: {
                text: <AreaModalCom
                    dataGrid={this.state.ServiceAgreementAreaData}
                    dataItem={dataItem}
                    dataSubmit={this.handleSubmitEdit_ServiceAgreementArea}
                    isDisabledArea={true}
                    modalType="EDIT"
                />
            },
            maxWidth: '800px'
        });
    }

    handleInsertClickEdit_ServiceAgreementStore(id, pkColumnName) {
        const dataItem = this.state.ServiceAgreementStoreData.find(item => item.StoreID == id.pkColumnName[0].value);

        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Cập nhật kho áp dụng hợp đồng này',
            content: {
                text: <StoreModalCom
                    dataGrid={this.state.ServiceAgreementStoreData}
                    dataItem={dataItem}
                    dataSubmit={this.handleSubmitEdit_ServiceAgreementStore}
                    isDisabledStore={true}
                    modalType="EDIT"
                />
            },
            maxWidth: '800px'
        });
    }

    handleSetImportData_ServiceAgreementArea(values) {
        let dataSource = values.rows.map(item => {
            return {
                ...item,
                Errors: ""
            }
        });

        //#region set nội dung lỗi
        // if (values.errors.length != 0) {
        //     for (const item of values.errors) {
        //         let errorText = "";
        //         if (dataSource[item.row - 1]) {
        //             if (dataSource[item.row - 1].Errors == "") {
        //                 errorText = item.column;
        //             } else {
        //                 errorText = `${dataSource[item.row - 1].Errors}, ${item.column}`
        //             }
        //             dataSource[item.row - 1].Errors = errorText;
        //         }
        //     }
        // }
        //#endregion

        //#region check nhập trùng
        if (this.state.ServiceAgreementAreaData.length != 0) {
            dataSource.forEach((element, index) => {
                const found = this.state.ServiceAgreementAreaData.find(item => item.AreaID == element.AreaID);

                if (found) {
                    let errorText = "";
                    if (dataSource[index].Errors == "") {
                        errorText = "Nhập trùng";
                    } else {
                        errorText = `Nhập trùng, ${dataSource[index].Errors}`
                    }

                    dataSource[index].Errors = errorText;
                }
            });
        }
        //#endregion

        this.props.callGetCache("ERPCOMMONCACHE.AREATT")
            .then((result) => {
                if (!result.IsError && result.ResultObject.CacheData != null) {

                    //#region check tồn tại mã khu vực
                    dataSource.forEach((element, index) => {
                        const found = result.ResultObject.CacheData.find(item => item.AreaID == element.AreaID);

                        if (found) {
                            dataSource[index] = {
                                ...dataSource[index],
                                ...found
                            };
                        } else {
                            let errorText = "";
                            if (dataSource[index].Errors == "") {
                                errorText = "Không tồn tại mã khu vực";
                            } else {
                                errorText = `Không tồn tại mã khu vực, ${dataSource[index].Errors}`
                            }

                            dataSource[index].AreaName = "";
                            dataSource[index].Errors = errorText;
                        }
                    });
                    //#endregion

                    this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
                        title: 'Kết quả nhập từ excel',
                        content: {
                            text: <ImportExcelModalCom
                                dataSource={dataSource}
                                listColumn={listColumnImportFileArea}
                                onSubmit={this.handleSubmitImportFile_ServiceAgreementArea}
                                PKColumnName="AreaID"
                                titleModal="Danh sách khu vực áp dụng hợp đồng"
                            />
                        },
                        maxWidth: '80%'
                    })
                } else {
                    this.showMessage("Lỗi import file");
                }
            })
            .catch(error => {
                console.log("handleSetImportData_ServiceAgreementArea", error);
                this.showMessage("Lỗi import file");
            })
    }

    handleSetImportData_ServiceAgreementStore(values) {
        let dataSource = values.rows.map(item => {
            return {
                ...item,
                Errors: ""
            }
        });

        //#region set nội dung lỗi
        // if (values.errors.length != 0) {
        //     for (const item of values.errors) {
        //         let errorText = "";
        //         if (dataSource[item.row - 1]) {
        //             if (dataSource[item.row - 1].Errors == "") {
        //                 errorText = item.column;
        //             } else {
        //                 errorText = `${dataSource[item.row - 1].Errors}, ${item.column}`
        //             }
        //             dataSource[item.row - 1].Errors = errorText;
        //         }
        //     }
        // }
        //#endregion

        //#region check nhập trùng
        if (this.state.ServiceAgreementStoreData.length != 0) {
            dataSource.forEach((element, index) => {
                const found = this.state.ServiceAgreementStoreData.find(item => item.StoreID == element.StoreID);

                if (found) {
                    let errorText = "";
                    if (dataSource[index].Errors == "") {
                        errorText = "Nhập trùng";
                    } else {
                        errorText = `Nhập trùng, ${dataSource[index].Errors}`
                    }

                    dataSource[index].Errors = errorText;
                }
            });
        }
        //#endregion

        this.props.callGetCache("ERPCOMMONCACHE.STORE")
            .then((result) => {
                if (!result.IsError && result.ResultObject.CacheData != null) {

                    //#region check tồn tại mã kho
                    dataSource.forEach((element, index) => {
                        const found = result.ResultObject.CacheData.find(item => item.StoreID == element.StoreID);

                        if (found) {
                            dataSource[index] = {
                                ...dataSource[index],
                                ...found
                            };
                        } else {
                            let errorText = "";
                            if (dataSource[index].Errors == "") {
                                errorText = "Không tồn tại mã kho";
                            } else {
                                errorText = `Không tồn tại mã kho, ${dataSource[index].Errors}`
                            }

                            dataSource[index].StoreName = "";
                            dataSource[index].Errors = errorText;
                        }
                    });
                    //#endregion

                    this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
                        title: 'Kết quả nhập từ excel',
                        content: {
                            text: <ImportExcelModalCom
                                dataSource={dataSource}
                                listColumn={listColumnImportFileStore}
                                onSubmit={this.handleSubmitImportFile_ServiceAgreementStore}
                                PKColumnName="StoreID"
                                titleModal="Danh sách kho áp dụng hợp đồng"
                            />
                        },
                        maxWidth: '80%'
                    })
                } else {
                    this.showMessage("Lỗi import file");
                }
            })
            .catch(error => {
                console.log("handleSetImportData_ServiceAgreementStore", error);
                this.showMessage("Lỗi import file");
            })
    }

    handleSubmitEdit_ServiceAgreementArea(ServiceArgeementAreaTotal = [], newServiceArgeementArea) {
        this.props.callFetchAPI(APIHostName, "api/ServiceAgreement_Area/UpdateList", [newServiceArgeementArea]).then(apiResult => {
            if (!apiResult.IsError) {
                this.callLoadData_ServiceAgreementArea();
                this.props.hideModal();
            }
            this.addNotification(apiResult.Message, apiResult.IsError);
        });
    }

    handleSubmitEdit_ServiceAgreementStore(ServiceArgeementStoreTotal = [], newServiceArgeementStore) {
        this.props.callFetchAPI(APIHostName, "api/ServiceAgreement_Store/UpdateList", [newServiceArgeementStore]).then(apiResult => {
            if (!apiResult.IsError) {
                this.callLoadData_ServiceAgreementStore();
                this.props.hideModal();
            }
            this.addNotification(apiResult.Message, apiResult.IsError);
        });
    }

    handleSubmitImportFile_ServiceAgreementArea(data = []) {
        const uptData = data.map(item => {
            return {
                ...item,
                CreatedUser: this.props.AppInfo.LoginInfo.Username,
                ServiceAgreementID: this.props.ServiceAgreementInfo.ServiceAgreementID,
                SignedDate: this.props.ServiceAgreementInfo.SignedDate,
                IsActived: true,
                IsSystem: false
            }
        });

        this.props.callFetchAPI(APIHostName, "api/ServiceAgreement_Area/AddList", uptData).then(apiResult => {
            if (!apiResult.IsError) {
                this.callLoadData_ServiceAgreementArea();
                this.props.hideModal();
            }
            this.addNotification(apiResult.Message, apiResult.IsError);
        });
    }

    handleSubmitImportFile_ServiceAgreementStore(data = []) {
        const uptData = data.map(item => {
            return {
                ...item,
                CreatedUser: this.props.AppInfo.LoginInfo.Username,
                ServiceAgreementID: this.props.ServiceAgreementInfo.ServiceAgreementID,
                SignedDate: this.props.ServiceAgreementInfo.SignedDate,
                IsActived: true,
                IsSystem: false
            }
        });

        this.props.callFetchAPI(APIHostName, "api/ServiceAgreement_Store/AddList", uptData).then(apiResult => {
            if (!apiResult.IsError) {
                this.callLoadData_ServiceAgreementStore();
                this.props.hideModal();
            }
            this.addNotification(apiResult.Message, apiResult.IsError);
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

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Số hợp đồng:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{this.props.ServiceAgreementInfo.ServiceAgreementNumber}</label>
                    </div><div className="form-group col-md-2">
                        <label className="col-form-label bold">Loại hợp đồng:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {`${this.props.ServiceAgreementInfo.ServiceAgreementTypeID} - ${this.props.ServiceAgreementInfo.ServiceAgreementTypeName}`}
                        </label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Loại dịch vụ:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{`${this.props.ServiceAgreementInfo.ServiceTypeID} - ${this.props.ServiceAgreementInfo.ServiceTypeName}`}</label>
                    </div><div className="form-group col-md-2">
                        <label className="col-form-label bold">Đơn vị vận chuyển:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{`${this.props.ServiceAgreementInfo.PartnerID} - ${this.props.ServiceAgreementInfo.PartnerName}`}</label>
                    </div>
                </div>

                <div className="form-row">
                    {/* <div className="form-group col-md-2">
                        <label className="col-form-label bold">Khu vực:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{this.props.ServiceAgreementInfo.AreaName}</label>
                    </div> */}
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Nhân viên đại diện:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{this.props.ServiceAgreementInfo.DeputyUserName} - {this.props.ServiceAgreementInfo.FullName}</label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Ngày ký hợp đồng:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{formatDate(this.props.ServiceAgreementInfo.SignedDate, true)}</label>
                    </div><div className="form-group col-md-2">
                        <label className="col-form-label bold">Ngày hết hạn hợp đồng:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{formatDate(this.props.ServiceAgreementInfo.ExpiredDate, true)}</label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Đã gia hạn hợp đồng:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <div className="checkbox customCheckbox">
                            <label><input type="checkbox" disabled={true} defaultChecked={this.props.ServiceAgreementInfo.IsExtended} />
                                <span className="cr"><i className="cr-icon fa fa-check"></i>
                                </span>
                            </label>
                        </div>
                    </div><div className="form-group col-md-2">
                        <label className="col-form-label bold">Gia hạn đến ngày:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{formatDate(this.props.ServiceAgreementInfo.ExtendedDate, true)}</label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Đã thanh lý hợp đồng:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <div className="checkbox customCheckbox">
                            <label><input type="checkbox" disabled={true} defaultChecked={this.props.ServiceAgreementInfo.IsLiquidated} />
                                <span className="cr"><i className="cr-icon fa fa-check"></i>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Ngày thanh lý hợp đồng:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{formatDate(this.props.ServiceAgreementInfo.Liquidateddate, true)}</label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Đã ký quỹ:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <div className="checkbox customCheckbox">
                            <label><input type="checkbox" disabled={true} defaultChecked={this.props.ServiceAgreementInfo.IsDeposited} />
                                <span className="cr"><i className="cr-icon fa fa-check"></i>
                                </span>
                            </label>
                        </div>

                    </div><div className="form-group col-md-2">
                        <label className="col-form-label bold">Số tiền ký quỹ:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{formatMoney(this.props.ServiceAgreementInfo.DepositMoney, 0)}</label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Ngày ký quỹ:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{formatDate(this.props.ServiceAgreementInfo.DepositedDate, true)}</label>
                    </div><div className="form-group col-md-2">
                        <label className="col-form-label bold">Ghi chú ký quỹ:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{this.props.ServiceAgreementInfo.DepositNote}</label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Mô tả:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <label className="col-form-label">{this.props.ServiceAgreementInfo.Description}</label>
                    </div>
                </div>

                <div className="form-row mb-4">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Kích hoạt:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <div className="checkbox customCheckbox">
                            <label><input type="checkbox" disabled={true} defaultChecked={this.props.ServiceAgreementInfo.IsActived} />
                                <span className="cr"><i className="cr-icon fa fa-check"></i>
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Hệ thống:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <div className="checkbox customCheckbox">
                            <label><input type="checkbox" disabled={true} defaultChecked={this.props.ServiceAgreementInfo.IsSystem} />
                                <span className="cr"><i className="cr-icon fa fa-check"></i>
                                </span>
                            </label>
                        </div>

                    </div>
                </div>

                <div className="form-row mb-4">
                    {/* <DataGrid
                        dataSource={this.props.ServiceAgreementInfo.ServiceAgreement_AreaList}
                        headingTitle="Danh sách khu vực áp dụng hợp đồng"
                        IDSelectColumnName={""}
                        IsAutoPaging={false}
                        IsExportFile={false}
                        isHideHeaderToolbar={false}
                        IsPrint={false}
                        IsShowButtonAdd={false}
                        IsShowButtonDelete={false}
                        IsShowButtonPrint={false}
                        listColumn={listColumnArea2}
                        PKColumnName={"AreaID"}
                        RowsPerPage={10}
                    /> */}

                    <DataGrid
                        dataSource={this.state.ServiceAgreementAreaData}
                        DataTemplateExport={DataTemplateExportArea}
                        fileNameTemplate="Danh sách khu vực áp dụng hợp đồng"
                        headingTitle="Danh sách khu vực áp dụng hợp đồng"
                        IDSelectColumnName={"chkSelect"}
                        IsAdd={true}
                        IsAutoPaging={false}
                        IsCustomAddLink={true}
                        isCustomImportFile={true}
                        IsDelete={true}
                        IsExportFile={false}
                        isExportFileTemplate={true}
                        isHideHeaderToolbar={false}
                        IsImportFile={true}
                        IsPrint={false}
                        IsShowButtonAdd={true}
                        IsShowButtonDelete={true}
                        IsShowButtonPrint={false}
                        listColumn={listColumnArea}
                        onDeleteClick={this.handleDeleteClick_ServiceAgreementArea}
                        onExportFileTemplate={this.handleExportFileTemplate_ServiceAgreementArea}
                        onImportFile={this.handleImportFile_ServiceAgreementArea}
                        onInsertClick={this.handleInsertClick_ServiceAgreementArea}
                        onInsertClickEdit={this.handleInsertClickEdit_ServiceAgreementArea}
                        PKColumnName={"AreaID"}
                        RowsPerPage={10}
                    />
                </div>

                <div className="form-row mb-4">
                    {/* <DataGrid
                        dataSource={this.props.ServiceAgreementInfo.ServiceAgreement_StoreList}
                        headingTitle="Danh sách kho áp dụng hợp đồng"
                        IDSelectColumnName={""}
                        IsAutoPaging={false}
                        IsExportFile={false}
                        isHideHeaderToolbar={false}
                        IsPrint={false}
                        IsShowButtonAdd={false}
                        IsShowButtonDelete={false}
                        IsShowButtonPrint={false}
                        listColumn={listColumnStore2}
                        PKColumnName={"StoreID"}
                        RowsPerPage={10}
                    /> */}

                    <DataGrid
                        dataSource={this.state.ServiceAgreementStoreData}
                        DataTemplateExport={DataTemplateExportStore}
                        fileNameTemplate="Danh sách kho áp dụng hợp đồng"
                        headingTitle="Danh sách kho áp dụng hợp đồng"
                        IDSelectColumnName={"chkSelect"}
                        IsAdd={true}
                        IsAutoPaging={false}
                        IsCustomAddLink={true}
                        isCustomImportFile={true}
                        IsDelete={true}
                        IsExportFile={false}
                        isExportFileTemplate={true}
                        isHideHeaderToolbar={false}
                        IsImportFile={true}
                        IsPrint={false}
                        IsShowButtonAdd={true}
                        IsShowButtonDelete={true}
                        IsShowButtonPrint={false}
                        listColumn={listColumnStore}
                        onDeleteClick={this.handleDeleteClick_ServiceAgreementStore}
                        onExportFileTemplate={this.handleExportFileTemplate_ServiceAgreementStore}
                        onImportFile={this.handleImportFile_ServiceAgreementStore}
                        onInsertClick={this.handleInsertClick_ServiceAgreementStore}
                        onInsertClickEdit={this.handleInsertClickEdit_ServiceAgreementStore}
                        PKColumnName={"StoreID"}
                        RowsPerPage={10}
                    />
                </div>

                <input type="file" id="inputImportFile" hidden />
            </React.Fragment>
        );
    }
}

ServiceAgreementInfoCom.defaultProps = {
    ServiceAgreementInfo: {
        ServiceAgreement_AreaList: [],
        ServiceAgreement_StoreList: []
    }
};

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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: (type, props) => {
            dispatch(hideModal(type, props));
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        }
    }
}

const ServiceAgreementInfo = connect(mapStateToProps, mapDispatchToProps)(ServiceAgreementInfoCom);
export default ServiceAgreementInfo;