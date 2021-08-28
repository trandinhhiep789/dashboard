import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from "react-router-dom";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import ReactNotification from "react-notifications-component";
import readXlsxFile from 'read-excel-file';

import {
    AbilitySchema,
    APIHostName,
    DataGridColumnItemListAbiliti,
    DataGridColumnItemListFeeAppendix,
    DataTemplateExportAbility,
    DataTemplateExportFeeAppendix,
    DeleteAbilityAPIPath,
    DeleteAPIPath,
    DetailAPIPath,
    FeeAppendixSchema,
    listColumnImportFile_Ability,
    listColumnImportFile_FeeAppendix,
    LoadNewAPIPath,
    PKColumnNameAbiliti,
    PKColumnNameFeeAppendix,
    TitleFormDetail,
    TitleFromAbiliti,
    TitleFromFeeAppendix
} from "../constants";

import { AddListAPIAbilitiPath, AddListAPIFeeAppendixPath } from './contants';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { MessageModal } from "../../../../common/components/Modal";
import { MODAL_TYPE_COMMONTMODALS } from '../../../../constants/actionTypes';
import { showModal, hideModal } from '../../../../actions/modal';
import { updatePagePath } from "../../../../actions/pageAction";
import AbilityElement from "./Component/AbilityElement.js";
import FeeAppendixDetailElement from "./Component/FeeAppendixDetailElement.js";
import ImportExcelModalCom from '../ImportExcelModal';
import InputGridControl from "../../../../common/components/FormContainer/FormControl/InputGrid/InputGridControl.js";
import ServiceAgreementInfo from "./ServiceAgreementInfo";
import { formatDate } from '../../../../common/library/CommonLib';


class DetailCom extends React.Component {
    constructor(props) {
        super(props);

        this.handleExportFileTeamplate = this.handleExportFileTeamplate.bind(this);
        this.handleImportFileAbility = this.handleImportFileAbility.bind(this);
        this.handleImportFileFeeAppendix = this.handleImportFileFeeAppendix.bind(this);
        this.handleInputChangeObjItem = this.handleInputChangeObjItem.bind(this);
        this.handleSetImportFileAbility = this.handleSetImportFileAbility.bind(this);
        this.handleSetImportFileFeeAppendix = this.handleSetImportFileFeeAppendix.bind(this);
        this.handleSubmitImportFileAbility = this.handleSubmitImportFileAbility.bind(this);
        this.handleSubmitImportFileFeeAppendix = this.handleSubmitImportFileFeeAppendix.bind(this);

        this.state = {
            DataSource: {},
            CallAPIMessage: "",
            IsCallAPIError: false,
            ServiceAgreementInfo: {},
            FeeAppendix: {},
            PageNumber: 1,
            Abiliti: {},
            IsLoadDataComplete: false,
            dataExportFeeAppendix: [],
            dataExportAbility: [],
            IsSystem: false,
        }
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(DetailAPIPath);
        this.callLoadData(this.props.match.params.id);
    }

    callLoadData(id) {
        this.props.callFetchAPI(APIHostName, LoadNewAPIPath, id).then((apiResult) => {

            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
                const tempDataFeeAppendix = apiResult.ResultObject.FeeAppendix_ItemList.map((item, index) => {
                    let elementFeeAppendix = {
                        "Tên Phụ lục": item.FeeAppendixName,
                        "Loại mùa dịch vụ": item.ServiceSeasonTypeName,
                        "Từ ngày": item.ApplyFromDate,
                        "Đến ngày": item.ApplyToDate,
                    };

                    return elementFeeAppendix;

                })
                const tempDataAbility = apiResult.ResultObject.Ability_ItemList.map((item, index) => {
                    let elementAbility = {
                        "Loại mùa dịch vụ": item.ServiceSeasonTypeName,
                        "Từ ngày": item.FromDate,
                        "Đến ngày": item.ToDate,
                        "Theo tháng": item.MonthlyAbilityValue,
                        "Theo ngày": item.DailyAbilityValue,
                    };

                    return elementAbility;

                })

                this.setState({
                    dataExportFeeAppendix: tempDataFeeAppendix,
                    dataExportAbility: tempDataAbility,
                    DataSource: apiResult.ResultObject,
                    ServiceAgreementInfo: apiResult.ResultObject,
                    IsLoadDataComplete: true,
                    IsSystem: apiResult.ResultObject.IsSystem
                });
            }
        });
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

    handleItemEditFeeAppendix(index) {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Cập nhật phụ lục biểu phí',
            content: {
                text: <FeeAppendixDetailElement
                    dataSource={this.state.DataSource}
                    index={index}
                    onInputChangeObj={this.handleInputChangeObjItem}
                />
            },
            maxWidth: '1000px'
        });
    }

    handleItemDeleteFeeAppendix(id) {
        let MLObject = {};
        MLObject.DeletedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.FeeAppendixID = id;
        this.props.callFetchAPI(APIHostName, DeleteAPIPath, MLObject).then((apiResult) => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.addNotification(apiResult.Message, apiResult.IsError);
            if (!apiResult.IsError) {
                this.callLoadData(this.props.match.params.id);
            }
        });

    }

    handleItemInsertFeeAppendix() {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Thêm phụ lục biểu phí',
            content: {
                text: <FeeAppendixDetailElement
                    dataSource={this.state.DataSource}
                    onInputChangeObj={this.handleInputChangeObjItem}

                />
            },
            maxWidth: '1000px'
        });
    }

    handleExportFileTeamplate(result) {
        this.addNotification(result.Message, result.IsError);
    }

    handleImportFileAbility() {
        const input = document.getElementById("inputImportFile");
        input.click();

        input.addEventListener("change", () => {
            readXlsxFile(input.files[0], { sheet: "data", schema: AbilitySchema }).then((data) => {
                this.handleSetImportFileAbility(data);
            }).catch(error => {
                console.log("handleImportFileAbility", error);
                alert("File vừa chọn lỗi. Vui lòng chọn file khác");
            }).finally(() => {
                input.value = "";
            })
        }, { once: true })
    }

    handleImportFileFeeAppendix() {
        const input = document.getElementById("inputImportFile");
        input.click();

        input.addEventListener("change", () => {
            readXlsxFile(input.files[0], { sheet: "data", schema: FeeAppendixSchema }).then((data) => {
                this.handleSetImportFileFeeAppendix(data);
            }).catch(error => {
                console.log("handleImportFileFeeAppendix", error);
                alert("File vừa chọn lỗi. Vui lòng chọn file khác");
            }).finally(() => {
                input.value = "";
            })
        }, { once: true })
    }

    handleInputChangeObjItem(id, apiResult) {
        if (apiResult.IsError) {
            this.showMessage(apiResult.Message);
        }
        else {
            this.addNotification(apiResult.Message, apiResult.IsError);
            this.callLoadData(id);
            this.props.hideModal();
        }

    }

    handleSetImportFileAbility(data = { errors: [], rows: [] }) {
        let dataSource = data.rows.map(item => {
            return {
                ...item,
                Errors: ""
            }
        });

        //#region check lỗi file excel
        // if (data.errors.length != 0) {
        //     for (const item of data.errors) {
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

        //#region check lỗi trùng
        for (let index = 0; index < dataSource.length; index++) {
            const found = this.state.DataSource.Ability_ItemList.find(item => item.ServiceSeasonTypeID == dataSource[index].ServiceSeasonTypeID && formatDate(item.FromDate, true) == formatDate(dataSource[index].FromDate, true) && formatDate(item.ToDate, true) == formatDate(dataSource[index].ToDate, true));

            if (found) {
                if (dataSource[index].Errors == "") {
                    dataSource[index].Errors = "Nhập trùng";
                } else {
                    dataSource[index].Errors = `Nhập trùng, ${dataSource[index].Errors}`;
                }
            }
        }
        //#endregion


        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Kết quả nhập từ excel',
            content: {
                text: <ImportExcelModalCom
                    dataSource={dataSource}
                    listColumn={listColumnImportFile_Ability}
                    onSubmit={this.handleSubmitImportFileAbility}
                    PKColumnName={""}
                    titleModal="Năng lực"
                />
            },
            maxWidth: '90%'
        })
    }

    handleSetImportFileFeeAppendix(data = { errors: [], rows: [] }) {
        let dataSource = data.rows.map(item => {
            return {
                ...item,
                Errors: ""
            }
        });

        //#region check lỗi file excel
        // if (data.errors.length != 0) {
        //     for (const item of data.errors) {
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

        //#region check lỗi trùng
        for (let index = 0; index < dataSource.length; index++) {
            const found = this.state.DataSource.FeeAppendix_ItemList.find(item => item.ServiceSeasonTypeID == dataSource[index].ServiceSeasonTypeID && item.PNServicePriceTableID == dataSource[index].PNServicePriceTableID);

            if (found) {
                if (dataSource[index].Errors == "") {
                    dataSource[index].Errors = "Nhập trùng";
                } else {
                    dataSource[index].Errors = `Nhập trùng, ${dataSource[index].Errors}`;
                }
            }
        }
        //#endregion


        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Kết quả nhập từ excel',
            content: {
                text: <ImportExcelModalCom
                    dataSource={dataSource}
                    listColumn={listColumnImportFile_FeeAppendix}
                    onSubmit={this.handleSubmitImportFileFeeAppendix}
                    PKColumnName={""}
                    titleModal="Phụ lục biểu phí"
                />
            },
            maxWidth: '90%'
        })
    }

    handleSubmitImportFileAbility(submitData = []) {
        const uptSubmitData = submitData.map(item => {
            return {
                ...item,
                CreatedUser: this.props.AppInfo.LoginInfo.Username,
                IsActived: true,
                IsSystem: false,
                ServiceAgreementID: this.state.DataSource.ServiceAgreementID,
                SignedDate: this.state.DataSource.SignedDate
            }
        });

        this.props.callFetchAPI(APIHostName, AddListAPIAbilitiPath, uptSubmitData).then(apiResult => {
            if (apiResult.IsError) {
                this.showMessage(apiResult.Message);
            } else {
                this.addNotification(apiResult.Message, apiResult.IsError);
                this.callLoadData(this.state.DataSource.ServiceAgreementID);
                this.props.hideModal();
            }
        });
    }

    handleSubmitImportFileFeeAppendix(submitData) {
        const uptSubmitData = submitData.map(item => {
            return {
                ...item,
                CreatedUser: this.props.AppInfo.LoginInfo.Username,
                IsActived: true,
                IsSystem: false,
                ServiceAgreementID: this.state.DataSource.ServiceAgreementID,
                SignedDate: this.state.DataSource.SignedDate
            }
        });

        this.props.callFetchAPI(APIHostName, AddListAPIFeeAppendixPath, uptSubmitData).then(apiResult => {
            if (apiResult.IsError) {
                this.showMessage(apiResult.Message);
            } else {
                this.addNotification(apiResult.Message, apiResult.IsError);
                this.callLoadData(this.state.DataSource.ServiceAgreementID);
                this.props.hideModal();
            }
        });
    }

    handleItemInsertAbiliti() {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Thêm năng lực',
            content: {
                text: <AbilityElement
                    dataSource={this.state.DataSource}
                    onInputChangeObj={this.handleInputChangeObjItem}

                />
            },
            maxWidth: '1000px'
        });
    }

    handleItemEditAbiliti(index) {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Cập nhật năng lực',
            content: {
                text: <AbilityElement
                    dataSource={this.state.DataSource}
                    index={index}
                    onInputChangeObj={this.handleInputChangeObjItem}
                />
            },
            maxWidth: '1000px'
        });
    }

    handleItemDeleteAbiliti(id) {
        let MLObject = {};
        MLObject.DeletedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.AbilityID = id;
        this.props.callFetchAPI(APIHostName, DeleteAbilityAPIPath, MLObject).then((apiResult) => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.addNotification(apiResult.Message, apiResult.IsError);
            if (!apiResult.IsError) {
                this.callLoadData(this.props.match.params.id);
            }
        });
    }

    addNotification(message1, IsError) {
        let cssNotification, iconNotification;
        if (!IsError) {
            cssNotification = "notification-custom-success";
            iconNotification = "fa fa-check"
            // this.setState({
            //     cssNotification: "notification-custom-success",
            //     iconNotification: "fa fa-check"
            // });
        } else {
            cssNotification = "notification-danger";
            iconNotification = "fa fa-exclamation"
            // this.setState({
            //     cssNotification: "notification-danger",
            //     iconNotification: "fa fa-exclamation"
            // });
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
                        <p className="notification-message">{message1}</p>
                    </div>
                </div>
            ),
            dismiss: { duration: 6000 },
            dismissable: { click: true }
        });
    }

    handleExportFileFeeAppendix(result) {
        this.addNotification(result.Message, result.IsError);
    }

    handleExportFileAbility(result) {
        this.addNotification(result.Message, result.IsError);
    }


    render() {
        const { IsSystem } = this.state;
        if (this.state.IsLoadDataComplete) {
            return (
                <React.Fragment>
                    <div className="col-lg-12">
                        <ReactNotification ref={this.notificationDOMRef} />

                        <div className="card">
                            <h4 className="card-title">
                                <strong>{TitleFormDetail}</strong>
                            </h4>
                            <div className="card-body">

                                <ServiceAgreementInfo
                                    ServiceAgreementInfo={this.state.ServiceAgreementInfo}
                                />

                                <InputGridControl
                                    controltype="InputGridControl"
                                    DataExport={this.state.dataExportFeeAppendix}
                                    dataSource={this.state.ServiceAgreementInfo.FeeAppendix_ItemList}
                                    DataTemplateExport={DataTemplateExportFeeAppendix}
                                    fileName={TitleFromFeeAppendix}
                                    fileNameTemplate="Phụ lục biểu phí"
                                    IDSelectColumnName={"FeeAppendixID"}
                                    isCustomImportFile={true}
                                    IsExportFile={true}
                                    isExportFileTemplate={true}
                                    isImportFile={true}
                                    isSystem={IsSystem}
                                    listColumn={DataGridColumnItemListFeeAppendix}
                                    name="FeeAppendix_ItemList"
                                    onDeleteClick={this.handleItemDeleteFeeAppendix.bind(this)}
                                    onEditClick={this.handleItemEditFeeAppendix.bind(this)}
                                    onExportFile={this.handleExportFileFeeAppendix.bind(this)}
                                    onExportFileTemplate={this.handleExportFileTeamplate}
                                    onImportFile={this.handleImportFileFeeAppendix}
                                    onInsertClick={this.handleItemInsertFeeAppendix.bind(this)}
                                    PKColumnName={PKColumnNameFeeAppendix}
                                    ref={this.gridref}
                                    title={TitleFromFeeAppendix}
                                />

                                <InputGridControl
                                    controltype="InputGridControl"
                                    DataExport={this.state.dataExportAbility}
                                    dataSource={this.state.ServiceAgreementInfo.Ability_ItemList}
                                    DataTemplateExport={DataTemplateExportAbility}
                                    fileName={TitleFromAbiliti}
                                    fileNameTemplate="Năng lực"
                                    IDSelectColumnName={"AbilityID"}
                                    isCustomImportFile={true}
                                    IsExportFile={true}
                                    isExportFileTemplate={true}
                                    isImportFile={true}
                                    isSystem={IsSystem}
                                    listColumn={DataGridColumnItemListAbiliti}
                                    name="Ability_ItemList"
                                    onDeleteClick={this.handleItemDeleteAbiliti.bind(this)}
                                    onEditClick={this.handleItemEditAbiliti.bind(this)}
                                    onExportFile={this.handleExportFileAbility.bind(this)}
                                    onExportFileTemplate={this.handleExportFileTeamplate}
                                    onImportFile={this.handleImportFileAbility}
                                    onInsertClick={this.handleItemInsertAbiliti.bind(this)}
                                    PKColumnName={PKColumnNameAbiliti}
                                    ref={this.gridref}
                                    title={TitleFromAbiliti}
                                />
                            </div>

                            <footer className="card-footer text-right">
                                <Link to="/ServiceAgreement">
                                    <button className="btn btn-sm btn-outline btn-primary" type="button">Quay lại</button>
                                </Link>
                            </footer>
                        </div>
                    </div>

                    <input type="file" id="inputImportFile" hidden />
                </React.Fragment>
            );
        }
        return (
            <label>Đang nạp dữ liệu...</label>
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: () => {
            dispatch(hideModal());
        }
    };
};

const Detail = connect(mapStateToProps, mapDispatchToProps)(DetailCom);
export default Detail;
