import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from "react-router-dom";
import { ModalManager } from "react-dynamic-modal";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import FormContainer from "../../../../common/components/FormContainer";
import DataGrid from "../../../../common/components/DataGrid/getdataserver.js";

import {
    APIHostName,
    DetailAPIPath,
    LoadNewAPIPath,
    TitleFormDetail,
    TitleFromAbiliti,
    PKColumnNameFeeAppendix,
    TitleFromFeeAppendix,
    DataGridColumnItemListFeeAppendix,
    DeleteAPIPath,
    DataGridColumnItemListAbiliti,
    PKColumnNameAbiliti,
    DeleteAbilityAPIPath

} from "../constants";
import { MessageModal } from "../../../../common/components/Modal";
import ServiceAgreementInfo from "./ServiceAgreementInfo";
import Abiliti from "./Abiliti";
import FeeAppendix from './FeeAppendix';

import InputGridControl from "../../../../common/components/FormContainer/FormControl/InputGrid/InputGridControl.js";
import { showModal, hideModal } from '../../../../actions/modal';
import { MODAL_TYPE_COMMONTMODALS } from '../../../../constants/actionTypes';
import AbilityElement from "./Component/AbilityElement.js";
import FeeAppendixDetailElement from "./Component/FeeAppendixDetailElement.js";
import ReactNotification from "react-notifications-component";

class DetailCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputChangeObjItem = this.handleInputChangeObjItem.bind(this);
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
                        "Tên Phụ lục" : item.FeeAppendixName,
                        "Loại thời vụ" : item.ServiceSeasonTypeName,
                        "Từ ngày" : item.ApplyFromDate,
                        "Đến ngày" :  item.ApplyToDate,
                    };
                  
                    return elementFeeAppendix;

                })
                const tempDataAbility = apiResult.ResultObject.Ability_ItemList.map((item, index) => {
                    let elementAbility = {
                        "Tên Phụ lục": item.ServiceSeasonTypeName,
                        "Từ ngày" : item.FromDate,
                        "Đến ngày" : item.ToDate,
                        "Theo tháng": item.MonthlyAbilityValue,
                        "Theo ngày" : item.DailyAbilityValue,
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

    handleInputChangeObjItem(id, apiResult) {
        if(apiResult.IsError){
            this.showMessage(apiResult.Message);
        }
        else{
            this.addNotification(apiResult.Message, apiResult.IsError);
            this.callLoadData(id);
            this.props.hideModal();
        }
        
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
                                name="FeeAppendix_ItemList"
                                controltype="InputGridControl"
                                title={TitleFromFeeAppendix}
                                IDSelectColumnName={"FeeAppendixID"}
                                listColumn={DataGridColumnItemListFeeAppendix}
                                PKColumnName={PKColumnNameFeeAppendix}
                                dataSource={this.state.ServiceAgreementInfo.FeeAppendix_ItemList}
                                onInsertClick={this.handleItemInsertFeeAppendix.bind(this)}
                                onEditClick={this.handleItemEditFeeAppendix.bind(this)}
                                onDeleteClick={this.handleItemDeleteFeeAppendix.bind(this)}
                                ref={this.gridref}
                                IsExportFile={true}
                                DataExport={this.state.dataExportFeeAppendix}
                                fileName={TitleFromFeeAppendix}
                                onExportFile={this.handleExportFileFeeAppendix.bind(this)}
                                isSystem= {IsSystem}
                            />

                            <InputGridControl
                                name="Ability_ItemList"
                                controltype="InputGridControl"
                                title={TitleFromAbiliti}
                                IDSelectColumnName={"AbilityID"}
                                PKColumnName={PKColumnNameAbiliti}
                                listColumn={DataGridColumnItemListAbiliti}
                                dataSource={this.state.ServiceAgreementInfo.Ability_ItemList}
                                onInsertClick={this.handleItemInsertAbiliti.bind(this)}
                                onEditClick={this.handleItemEditAbiliti.bind(this)}
                                onDeleteClick={this.handleItemDeleteAbiliti.bind(this)}
                                ref={this.gridref}
                                IsExportFile={true}
                                DataExport={this.state.dataExportAbility}
                                fileName={TitleFromAbiliti}
                                onExportFile={this.handleExportFileAbility.bind(this)}
                                isSystem= {IsSystem}
                            />
                        </div>
                        <footer className="card-footer text-right">
                            <Link to="/ServiceAgreement">
                                <button className="btn btn-sm btn-outline btn-primary" type="button">Quay lại</button>
                            </Link>
                        </footer>
                    </div>
                </div>
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
