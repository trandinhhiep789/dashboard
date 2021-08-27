import React from "react";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import ReactNotification from "react-notifications-component";
import readXlsxFile from 'read-excel-file';

import {
    AbilitySchema2,
    APIHostName,
    AreaSchema2,
    DataGridColumnList_ImportFile,
    FeeAppendixSchema2,
    listColumnImportFile_Ability2,
    listColumnImportFile_FeeAppendix2,
    listColumnImportFileArea2,
    listColumnImportFileStore2,
    PKColumnName,
    schema,
    StoreSchema2
} from "../constants";
import {
    AddListAPIAbilitiPath,
    AddListAPIFeeAppendixPath
} from '../Detail/contants';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { callGetCache } from "../../../../actions/cacheAction";
import { MessageModal } from "../../../../common/components/Modal";
import { MODAL_TYPE_COMMONTMODALS } from '../../../../constants/actionTypes';
import { showModal, hideModal } from '../../../../actions/modal';
import ImportExcelModalCom from './index';

class ImportSelectionModalCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };

        this.addNotification = this.addNotification.bind(this);
        this.handleClickAbility = this.handleClickAbility.bind(this);
        this.handleClickFeeAppendix = this.handleClickFeeAppendix.bind(this);
        this.handleClickServiceAgreement = this.handleClickServiceAgreement.bind(this);
        this.handleClickServiceAgreementArea = this.handleClickServiceAgreementArea.bind(this);
        this.handleClickServiceAgreementStore = this.handleClickServiceAgreementStore.bind(this);
        this.handleReadXlsxFile = this.handleReadXlsxFile.bind(this);
        this.handleSetImportAbilityData = this.handleSetImportAbilityData.bind(this);
        this.handleSetImportFeeAppendixData = this.handleSetImportFeeAppendixData.bind(this);
        this.handleSetImportServiceAgreementAreaData = this.handleSetImportServiceAgreementAreaData.bind(this);
        this.handleSetImportServiceAgreementData = this.handleSetImportServiceAgreementData.bind(this);
        this.handleSetImportServiceAgreementStoreData = this.handleSetImportServiceAgreementStoreData.bind(this);
        this.handleSubmitImportAbilityFile = this.handleSubmitImportAbilityFile.bind(this);
        this.handleSubmitImportFeeAppendixFile = this.handleSubmitImportFeeAppendixFile.bind(this);
        this.handleSubmitImportServiceAgreementAreaFile = this.handleSubmitImportServiceAgreementAreaFile.bind(this);
        this.handleSubmitImportServiceAgreementFile = this.handleSubmitImportServiceAgreementFile.bind(this);
        this.handleSubmitImportServiceAgreementStoreFile = this.handleSubmitImportServiceAgreementStoreFile.bind(this);
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

    handleClickAbility() {
        this.handleReadXlsxFile(this.handleSetImportAbilityData, AbilitySchema2);
    }

    handleClickFeeAppendix() {
        this.handleReadXlsxFile(this.handleSetImportFeeAppendixData, FeeAppendixSchema2);
    }

    handleClickServiceAgreement() {
        this.handleReadXlsxFile(this.handleSetImportServiceAgreementData, schema);
    }

    handleClickServiceAgreementArea() {
        this.handleReadXlsxFile(this.handleSetImportServiceAgreementAreaData, AreaSchema2);
    }

    handleClickServiceAgreementStore() {
        this.handleReadXlsxFile(this.handleSetImportServiceAgreementStoreData, StoreSchema2);
    }

    handleReadXlsxFile(setImportData, schema) {
        const input = document.getElementById("inputImportFile");
        input.click();

        input.addEventListener("change", () => {
            readXlsxFile(input.files[0], { sheet: "data", schema }).then((data) => {
                setImportData(data);
            }).catch(error => {
                console.log("handleClickServiceAgreement", error);
                alert("File vừa chọn lỗi. Vui lòng chọn file khác")
            }).finally(() => {
                input.value = "";
            })
        }, { once: true })
    }

    handleSetImportAbilityData(values) {
        let dataSource = values.rows.map(item => {
            return {
                ...item,
                CreatedUser: this.props.AppInfo.LoginInfo.Username,
                Errors: ""
            }
        });

        //#region set nội dung lỗi
        // if (values.errors.length != 0) {
        //     for (const item of values.errors) {
        //         let errorText = "";
        //         if (dataSource[item.row - 1].Errors == "") {
        //             errorText = item.column;
        //         } else {
        //             errorText = `${dataSource[item.row - 1].Errors}, ${item.column}`
        //         }
        //         dataSource[item.row - 1].Errors = errorText;
        //     }
        // }
        //#endregion

        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Kết quả nhập từ excel',
            content: {
                text: <ImportExcelModalCom
                    dataSource={dataSource}
                    listColumn={listColumnImportFile_Ability2}
                    onSubmit={this.handleSubmitImportAbilityFile}
                    PKColumnName="ServiceAgreementID,ServiceSeasonTypeID"
                    titleModal="Năng lực"
                />
            },
            maxWidth: '100%'
        })
    }

    handleSetImportFeeAppendixData(values) {
        let dataSource = values.rows.map(item => {
            return {
                ...item,
                CreatedUser: this.props.AppInfo.LoginInfo.Username,
                Errors: ""
            }
        });

        //#region set nội dung lỗi
        // if (values.errors.length != 0) {
        //     for (const item of values.errors) {
        //         let errorText = "";
        //         if (dataSource[item.row - 1].Errors == "") {
        //             errorText = item.column;
        //         } else {
        //             errorText = `${dataSource[item.row - 1].Errors}, ${item.column}`
        //         }
        //         dataSource[item.row - 1].Errors = errorText;
        //     }
        // }
        //#endregion

        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Kết quả nhập từ excel',
            content: {
                text: <ImportExcelModalCom
                    dataSource={dataSource}
                    listColumn={listColumnImportFile_FeeAppendix2}
                    onSubmit={this.handleSubmitImportFeeAppendixFile}
                    PKColumnName={"ServiceAgreementID,ServiceSeasonTypeID"}
                    titleModal="Phụ lục biểu phí"
                />
            },
            maxWidth: '100%'
        })
    }

    handleSetImportServiceAgreementData(values) {
        let dataSource = values.rows.map(item => {
            const uptServiceAgreementNumber = item.ServiceAgreementNumber ? item.ServiceAgreementNumber.replace(/\s/g, "") : "";
            return {
                ...item,
                CreatedUser: this.props.AppInfo.LoginInfo.Username,
                ServiceAgreementNumber: uptServiceAgreementNumber,
                Errors: ""
            }
        });

        //#region set nội dung lỗi
        // if (values.errors.length != 0) {
        //     for (const item of values.errors) {
        //         let errorText = "";
        //         if (dataSource[item.row - 1].Errors == "") {
        //             errorText = item.column;
        //         } else {
        //             errorText = `${dataSource[item.row - 1].Errors}, ${item.column}`
        //         }
        //         dataSource[item.row - 1].Errors = errorText;
        //     }
        // }
        //#endregion

        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Kết quả nhập từ excel',
            content: {
                text: <ImportExcelModalCom
                    dataSource={dataSource}
                    listColumn={DataGridColumnList_ImportFile}
                    onSubmit={this.handleSubmitImportServiceAgreementFile}
                    PKColumnName="ServiceAgreementNumber"
                    titleModal="Danh sách hợp đồng dịch vụ"
                />
            },
            maxWidth: '100%'
        })
    }

    handleSetImportServiceAgreementAreaData(values) {
        let dataSource = values.rows.map(item => {
            return {
                ...item,
                CreatedUser: this.props.AppInfo.LoginInfo.Username,
                Errors: ""
            }
        });

        //#region set nội dung lỗi
        // if (values.errors.length != 0) {
        //     for (const item of values.errors) {
        //         if (dataSource[item.row - 1]) {
        //             let errorText = "";
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
                                listColumn={listColumnImportFileArea2}
                                onSubmit={this.handleSubmitImportServiceAgreementAreaFile}
                                PKColumnName="ServiceAgreementID,AreaID"
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
                console.log("handleSetImportServiceAgreementAreaData", error);
                this.showMessage("Lỗi import file");
            })
    }

    handleSetImportServiceAgreementStoreData(values) {
        let dataSource = values.rows.map(item => {
            return {
                ...item,
                CreatedUser: this.props.AppInfo.LoginInfo.Username,
                Errors: ""
            }
        });

        //#region set nội dung lỗi
        // if (values.errors.length != 0) {
        //     for (const item of values.errors) {
        //         if (dataSource[item.row - 1]) {
        //             let errorText = "";
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
                                listColumn={listColumnImportFileStore2}
                                onSubmit={this.handleSubmitImportServiceAgreementStoreFile}
                                PKColumnName="ServiceAgreementID,StoreID"
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
                console.log("handleSetImportServiceAgreementStoreData", error);
                this.showMessage("Lỗi import file");
            })
    }

    handleSubmitImportAbilityFile(data) {
        this.props.callFetchAPI(APIHostName, AddListAPIAbilitiPath, data).then(apiResult => {
            if (apiResult.IsError) {
                this.showMessage(apiResult.Message);
            }
            else {
                this.addNotification(apiResult.Message, apiResult.IsError);
                this.props.hideModal();
            }
        });
    }

    handleSubmitImportFeeAppendixFile(data) {
        this.props.callFetchAPI(APIHostName, AddListAPIFeeAppendixPath, data).then(apiResult => {
            if (apiResult.IsError) {
                this.showMessage(apiResult.Message);
            }
            else {
                this.addNotification(apiResult.Message, apiResult.IsError);
                this.props.hideModal();
            }
        });
    }

    handleSubmitImportServiceAgreementAreaFile(data) {
        const uptData = data.map(item => {
            return {
                ...item,
                IsActived: true,
                IsSystem: false
            }
        });

        this.props.callFetchAPI(APIHostName, "api/ServiceAgreement_Area/AddList", uptData).then(apiResult => {
            if (apiResult.IsError) {
                this.showMessage(apiResult.Message);
            }
            else {
                this.addNotification(apiResult.Message, apiResult.IsError);
                this.props.hideModal();
            }
        });
    }

    handleSubmitImportServiceAgreementFile(data) {
        this.props.callFetchAPI(APIHostName, "api/ServiceAgreement/AddImport", { ServiceAgreementList: data }).then(apiResult => {
            if (apiResult.IsError) {
                this.showMessage(apiResult.Message);
            }
            else {
                this.addNotification(apiResult.Message, apiResult.IsError);
                this.props.hideModal();
            }
        });
    }

    handleSubmitImportServiceAgreementStoreFile(data) {
        const uptData = data.map(item => {
            return {
                ...item,
                IsActived: true,
                IsSystem: false
            }
        });

        this.props.callFetchAPI(APIHostName, "api/ServiceAgreement_Store/AddList", uptData).then(apiResult => {
            if (apiResult.IsError) {
                this.showMessage(apiResult.Message);
            }
            else {
                this.addNotification(apiResult.Message, apiResult.IsError);
                this.props.hideModal();
            }
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
            < React.Fragment >
                <ReactNotification ref={this.notificationDOMRef} />

                <div className="d-flex flex-column p-4">
                    <button type="button" className="btn btn-info mb-2" onClick={this.handleClickServiceAgreement}>
                        Hợp đồng dịch vụ
                    </button>
                    <button type="button" className="btn btn-info mb-2" onClick={this.handleClickFeeAppendix}>
                        Phụ lục biểu phí
                    </button>
                    <button type="button" className="btn btn-info mb-2" onClick={this.handleClickAbility}>
                        Năng lực
                    </button>
                    <button type="button" className="btn btn-info mb-2" onClick={this.handleClickServiceAgreementArea}>
                        Khu vực áp dụng hợp đồng
                    </button>
                    <button type="button" className="btn btn-info mb-2" onClick={this.handleClickServiceAgreementStore}>
                        Kho áp dụng hợp đồng
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
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: () => {
            dispatch(hideModal());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImportSelectionModalCom);