import React from "react";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import ReactNotification from "react-notifications-component";
import readXlsxFile from 'read-excel-file';

import {
    AbilitySchema2,
    APIHostName,
    DataGridColumnList_ImportFile,
    FeeAppendixSchema2,
    listColumnImportFile_FeeAppendix2,
    listColumnImportFile_Ability2,
    PKColumnName,
    schema
} from "../constants";
import {
    AddListAPIAbilitiPath,
    AddListAPIFeeAppendixPath
} from '../Detail/contants';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { MessageModal } from "../../../../common/components/Modal";
import { showModal, hideModal } from '../../../../actions/modal';
import ImportExcelModalCom from './index';
import { MODAL_TYPE_COMMONTMODALS } from '../../../../constants/actionTypes';

class ImportSelectionModalCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };

        this.addNotification = this.addNotification.bind(this);
        this.handleClickAbility = this.handleClickAbility.bind(this);
        this.handleClickFeeAppendix = this.handleClickFeeAppendix.bind(this);
        this.handleClickServiceAgreement = this.handleClickServiceAgreement.bind(this);
        this.handleReadXlsxFile = this.handleReadXlsxFile.bind(this);
        this.handleSetImportAbilityData = this.handleSetImportAbilityData.bind(this);
        this.handleSetImportFeeAppendixData = this.handleSetImportFeeAppendixData.bind(this);
        this.handleSetImportServiceAgreementData = this.handleSetImportServiceAgreementData.bind(this);
        this.handleSubmitImportAbilityFile = this.handleSubmitImportAbilityFile.bind(this);
        this.handleSubmitImportFeeAppendixFile = this.handleSubmitImportFeeAppendixFile.bind(this);
        this.handleSubmitImportServiceAgreementFile = this.handleSubmitImportServiceAgreementFile.bind(this);
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
        if (values.errors.length != 0) {
            for (const item of values.errors) {
                let errorText = "";
                if (dataSource[item.row - 1].Errors == "") {
                    errorText = item.column;
                } else {
                    errorText = `${dataSource[item.row - 1].Errors}, ${item.column}`
                }
                dataSource[item.row - 1].Errors = errorText;
            }
        }
        //#endregion

        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Kết quả nhập từ excel',
            content: {
                text: <ImportExcelModalCom
                    dataSource={dataSource}
                    listColumn={listColumnImportFile_Ability2}
                    onSubmit={this.handleSubmitImportAbilityFile}
                    PKColumnName={PKColumnName}
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
        if (values.errors.length != 0) {
            for (const item of values.errors) {
                let errorText = "";
                if (dataSource[item.row - 1].Errors == "") {
                    errorText = item.column;
                } else {
                    errorText = `${dataSource[item.row - 1].Errors}, ${item.column}`
                }
                dataSource[item.row - 1].Errors = errorText;
            }
        }
        //#endregion

        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Kết quả nhập từ excel',
            content: {
                text: <ImportExcelModalCom
                    dataSource={dataSource}
                    listColumn={listColumnImportFile_FeeAppendix2}
                    onSubmit={this.handleSubmitImportFeeAppendixFile}
                    PKColumnName={PKColumnName}
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
        if (values.errors.length != 0) {
            for (const item of values.errors) {
                let errorText = "";
                if (dataSource[item.row - 1].Errors == "") {
                    errorText = item.column;
                } else {
                    errorText = `${dataSource[item.row - 1].Errors}, ${item.column}`
                }
                dataSource[item.row - 1].Errors = errorText;
            }
        }
        //#endregion

        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Kết quả nhập từ excel',
            content: {
                text: <ImportExcelModalCom
                    dataSource={dataSource}
                    listColumn={DataGridColumnList_ImportFile}
                    onSubmit={this.handleSubmitImportServiceAgreementFile}
                    PKColumnName={PKColumnName}
                    titleModal="Danh sách hợp đồng dịch vụ"
                />
            },
            maxWidth: '100%'
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

    handleSubmitImportServiceAgreementFile(data) {
        this.props.callFetchAPI(APIHostName, "api/ServiceAgreement/AddImport", { ServiceAgreementList: data }).then(apiResult => {
            if (apiResult.IsError) {
                this.showMessage(apiResult.Message);
            }
            else {
                this.addNotification(apiResult.Message, apiResult.IsError);
                this.callSearchData(this.state.SearchData);
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: () => {
            dispatch(hideModal());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImportSelectionModalCom);