import React from "react";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import { Redirect } from "react-router-dom";
import ReactNotification from "react-notifications-component";

import {
    APIHostName,
    BackLink,
    EditPagePath,
    LoadNewAPIPath,
    MLObjectDefinition,
    TitleFormEdit,
    UpdateAPIPath
} from "../constants";
import {
    ERPCOMMONCACHE_PARTNER,
    ERPCOMMONCACHE_SERVICEAGREEMENTTYPE,
    ERPCOMMONCACHE_TMS_SERVICETYPE
} from "../../../../constants/keyCache";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { callGetCache, callClearLocalCache } from "../../../../actions/cacheAction";
import { formatDate } from "../../../../common/library/CommonLib.js";
import { MessageModal } from "../../../../common/components/Modal";
import { updatePagePath } from "../../../../actions/pageAction";
import AreaCom from '../Area';
import DeliverUserList from "../../ShipmentOrder/Component/DeliverUserList";
import FormContainer from "../../../../common/components/FormContainer";
import FormControl from "../../../../common/components/FormContainer/FormControl";
import StoreCom from '../Store';

class EditCom extends React.Component {
    constructor(props) {
        super(props);

        this.addNotification = this.addNotification.bind(this);
        this.notificationDOMRef = React.createRef();
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleServiceAgreementAreaSubmit = this.handleServiceAgreementAreaSubmit.bind(this);
        this.handleServiceAgreementStoreSubmit = this.handleServiceAgreementStoreSubmit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            DataSource: {},
            IsCallAPIError: false,
            IsCloseForm: false,
            IsDeposited: false,
            IsExtended: false,
            IsLiquidated: false,
            IsLoadDataComplete: false,
            IsSystem: false,
            ServiceAgreementAreaSubmit: [],
            ServiceAgreementStoreSubmit: []
        };
    }

    componentDidMount() {
        this.props.updatePagePath(EditPagePath);
        this.callLoadData(this.props.match.params.id);
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

    handleServiceAgreementAreaSubmit(value) {
        this.setState({
            ServiceAgreementAreaSubmit: value
        })
    }

    handleServiceAgreementStoreSubmit(value) {
        this.setState({
            ServiceAgreementStoreSubmit: value
        })
    }

    handleSubmit(formData, MLObject) {
        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.DeputyUserName = MLObject.ShipmentOrder_DeliverUserList[0].UserName;

        if (MLObject.IsExtended) {
            if (MLObject.ExtendedDate == null) {
                formData.dtExtendedDate.ErrorLst.IsValidatonError = true;
                formData.dtExtendedDate.ErrorLst.ValidatonErrorMessage = "Ngày gia hạn hợp đồng không được để trống";
                return;
            }
        }

        if (MLObject.IsLiquidated) {
            if (MLObject.Liquidateddate == null) {
                formData.dtLiquidateddate.ErrorLst.IsValidatonError = true;
                formData.dtLiquidateddate.ErrorLst.ValidatonErrorMessage = "Ngày thanh lý hợp đồng không được để trống";
                return;
            }

        }

        if (MLObject.IsDeposited) {
            if (MLObject.DepositedDate == null) {
                formData.dtDepositedDate.ErrorLst.IsValidatonError = true;
                formData.dtDepositedDate.ErrorLst.ValidatonErrorMessage = "Ngày kí quỹ không được để trống";
                return;
            }
        }

        MLObject.ServiceAgreementNumber = MLObject.ServiceAgreementNumber.replace(/\s/g, '');
        MLObject.ServiceAgreementID = this.props.match.params.id;

        //#region xử lý ServiceAgreementArea data
        const cloneServiceAgreementAreaSubmit = this.state.ServiceAgreementAreaSubmit.filter(item => !item.IsDeleted);
        if (cloneServiceAgreementAreaSubmit.length == 0) {
            this.addNotification("Danh sách khu vực áp dụng hợp đồng không được để trống", true);
            return;
        }

        const uptServiceAgreement_AreaList = this.state.ServiceAgreementAreaSubmit.map(item => {
            if (item.IsDeleted) {
                return {
                    ...item,
                    DeletedUser: this.props.AppInfo.LoginInfo.Username,
                    DeletedDate: new Date()
                }
            } else if (!item.ServiceAgreementID) {
                return {
                    ...item,
                    ServiceAgreementID: this.state.DataSource.ServiceAgreementID,
                    SignedDate: this.state.DataSource.SignedDate,
                    CreatedUser: this.props.AppInfo.LoginInfo.Username,
                    CreatedDate: new Date(),
                    UpdatedUser: this.props.AppInfo.LoginInfo.Username,
                    UpdatedDate: new Date()
                }
            } else {
                return {
                    ...item,
                    UpdatedUser: this.props.AppInfo.LoginInfo.Username,
                    UpdatedDate: new Date()
                }
            }
        })

        MLObject.ServiceAgreement_AreaList = uptServiceAgreement_AreaList;
        //#endregion

        //#region xử lý ServiceAgreementStore data
        const cloneServiceAgreementStoreSubmit = this.state.ServiceAgreementStoreSubmit.filter(item => !item.IsDeleted);
        if (cloneServiceAgreementStoreSubmit.length == 0) {
            this.addNotification("Danh sách kho áp dụng hợp đồng không được để trống", true);
            return;
        }

        const uptServiceAgreement_StoreList = this.state.ServiceAgreementStoreSubmit.map(item => {
            if (item.IsDeleted) {
                return {
                    ...item,
                    DeletedUser: this.props.AppInfo.LoginInfo.Username,
                    DeletedDate: new Date()
                }
            } else if (!item.ServiceAgreementID) {
                return {
                    ...item,
                    ServiceAgreementID: this.state.DataSource.ServiceAgreementID,
                    SignedDate: this.state.DataSource.SignedDate,
                    CreatedUser: this.props.AppInfo.LoginInfo.Username,
                    CreatedDate: new Date(),
                    UpdatedUser: this.props.AppInfo.LoginInfo.Username,
                    UpdatedDate: new Date()
                }
            } else {
                return {
                    ...item,
                    UpdatedUser: this.props.AppInfo.LoginInfo.Username,
                    UpdatedDate: new Date()
                }
            }
        })

        MLObject.ServiceAgreement_StoreList = uptServiceAgreement_StoreList;
        //#endregion

        this.props.callFetchAPI(APIHostName, UpdateAPIPath, MLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);
        });

    }


    handleCloseMessage() {
        if (!this.state.IsCallAPIError) this.setState({ IsCloseForm: true });
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

    callLoadData(id) {
        this.props.callFetchAPI(APIHostName, LoadNewAPIPath, id).then((apiResult) => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
                apiResult.ResultObject.ShipmentOrder_DeliverUserList = [{ UserName: apiResult.ResultObject.DeputyUserName, FullName: apiResult.ResultObject.FullName }]

                apiResult.ResultObject.SignedDateNew = formatDate(apiResult.ResultObject.SignedDate, true)
                apiResult.ResultObject.ExpiredDateNew = formatDate(apiResult.ResultObject.ExpiredDate, true)
                this.setState({
                    DataSource: apiResult.ResultObject,
                    IsDeposited: apiResult.ResultObject.IsDeposited,
                    IsExtended: apiResult.ResultObject.IsExtended,
                    IsLiquidated: apiResult.ResultObject.IsLiquidated,
                    IsLoadDataComplete: true,
                    IsSystem: apiResult.ResultObject.IsSystem,
                    ServiceAgreementAreaSubmit: apiResult.ResultObject.ServiceAgreement_AreaList,
                    ServiceAgreementStoreSubmit: apiResult.ResultObject.ServiceAgreement_StoreList
                });
            }
        });
    }

    handleChange(formData, MLObject) {

        let IsExtended, IsLiquidated, IsDeposited;
        if (formData.chkIsExtended.value) {
            IsExtended = true
        }
        else {
            IsExtended = false
            formData.dtExtendedDate.value = ""
        }
        if (formData.chkIsDeposited.value) {
            IsDeposited = true
        }
        else {
            IsDeposited = false
            formData.txtDepositMoney.value = "";
            formData.dtDepositedDate.value = "";
            formData.txtDepositNote.value = "";
        }
        if (formData.chkIsLiquidated.value) {
            IsLiquidated = true
        }
        else {
            IsLiquidated = false;
            formData.dtLiquidateddate.value = "";
        }

        this.setState({
            IsExtended,
            IsLiquidated,
            IsDeposited,

        })

        // console.log("formData, MLObject", formData, MLObject)



        if (formData.dtExpiredDate.value.length > 0) {

            const SignedDate = new Date(formData.dtSignedDate.value);
            const ExpiredDate = new Date(formData.dtExpiredDate.value);

            if (ExpiredDate >= SignedDate) {
                formData.dtExpiredDate.ErrorLst.IsValidatonError = false;
                formData.dtExpiredDate.ErrorLst.ValidatonErrorMessage = "";
            }
            else {
                formData.dtExpiredDate.ErrorLst.IsValidatonError = true;
                formData.dtExpiredDate.ErrorLst.ValidatonErrorMessage = "Ngày kết thúc hợp đồng phải lớn hơn ngày kí hợp đồng";
            }
        }

        // kiểm tra ngày gia hạn hợp đồng
        if (IsExtended) {
            if (formData.dtExtendedDate.value != null && formData.dtExtendedDate.value != "") {

                let ExpiredDate = new Date(formData.dtExpiredDate.value);
                let ExtendedDate = new Date(formData.dtExtendedDate.value);
                // console.log("11",ExtendedDate > ExpiredDate)
                if (ExpiredDate < ExtendedDate) {

                    formData.dtExtendedDate.ErrorLst.IsValidatonError = false;
                    formData.dtExtendedDate.ErrorLst.ValidatonErrorMessage = "";
                }
                else {
                    formData.dtExtendedDate.ErrorLst.IsValidatonError = true;
                    formData.dtExtendedDate.ErrorLst.ValidatonErrorMessage = "Ngày gia hạn hợp đồng phải lớn hơn ngày hết hạn hợp đồng";
                }

                // if (formData.dtExpiredDate.value >= formData.dtExtendedDate.value) {
                //     formData.dtExtendedDate.ErrorLst.IsValidatonError = true;
                //     formData.dtExtendedDate.ErrorLst.ValidatonErrorMessage = "Ngày gia hạn hợp đồng phải lớn hơn ngày hết hạn hợp đồng";
                // }

                // else {
                //     formData.dtExtendedDate.ErrorLst.IsValidatonError = false;
                //     formData.dtExtendedDate.ErrorLst.ValidatonErrorMessage = "";
                // }
            }
            else {
                formData.dtExtendedDate.ErrorLst.IsValidatonError = false;
                formData.dtExtendedDate.ErrorLst.ValidatonErrorMessage = "";
            }

        }
        else {
            formData.dtExtendedDate.ErrorLst.IsValidatonError = false;
            formData.dtExtendedDate.ErrorLst.ValidatonErrorMessage = "";
        }

        //kiểm ngày thanh lý hợp đồng

        if (IsLiquidated) {
            if (IsExtended) {
                if (formData.dtExtendedDate.value != '' && formData.dtLiquidateddate.value != '' && formData.dtExtendedDate.value != null && formData.dtLiquidateddate.value != null) {
                    let SignedDate = new Date(formData.dtSignedDate.value);
                    let ExpiredDate = new Date(formData.dtExpiredDate.value);
                    let ExtendedDate = new Date(formData.dtExtendedDate.value);
                    let Liquidateddate = new Date(formData.dtLiquidateddate.value);

                    // if (formData.dtExtendedDate.value <= formData.dtLiquidateddate.value || formData.dtLiquidateddate.value <= formData.dtSignedDate.value) {
                    if (Liquidateddate >= SignedDate && ExtendedDate >= Liquidateddate) {
                        formData.dtLiquidateddate.ErrorLst.IsValidatonError = false;
                        formData.dtLiquidateddate.ErrorLst.ValidatonErrorMessage = "";

                    }
                    else {
                        formData.dtLiquidateddate.ErrorLst.IsValidatonError = true;
                        formData.dtLiquidateddate.ErrorLst.ValidatonErrorMessage = "Ngày thanh lý hợp đồng phải nằm trong khoảng thời gian kí hợp đồng";
                    }
                }
                else {
                    formData.dtLiquidateddate.ErrorLst.IsValidatonError = false;
                    formData.dtLiquidateddate.ErrorLst.ValidatonErrorMessage = "";
                }

            }
            else {
                if (formData.dtLiquidateddate.value != '' && formData.dtLiquidateddate.value != null) {
                    let SignedDate = new Date(formData.dtSignedDate.value);
                    let ExpiredDate = new Date(formData.dtExpiredDate.value);
                    let ExtendedDate = new Date(formData.dtExtendedDate.value);
                    let Liquidateddate = new Date(formData.dtLiquidateddate.value);

                    if (Liquidateddate <= ExpiredDate && Liquidateddate >= SignedDate) {
                        formData.dtLiquidateddate.ErrorLst.IsValidatonError = false;
                        formData.dtLiquidateddate.ErrorLst.ValidatonErrorMessage = "";
                    }
                    else {
                        formData.dtLiquidateddate.ErrorLst.IsValidatonError = true;
                        formData.dtLiquidateddate.ErrorLst.ValidatonErrorMessage = "Ngày thanh lý hợp đồng phải nằm trong khoảng thời gian kí hợp đồng";
                    }
                }
                else {
                    formData.dtLiquidateddate.ErrorLst.IsValidatonError = false;
                    formData.dtLiquidateddate.ErrorLst.ValidatonErrorMessage = "";
                }

            }

        }
        else {
            formData.dtLiquidateddate.ErrorLst.IsValidatonError = false;
            formData.dtLiquidateddate.ErrorLst.ValidatonErrorMessage = "";
        }

        if (IsDeposited) {

            if (formData.dtDepositedDate.value == "") {
                formData.dtDepositedDate.ErrorLst.IsValidatonError = true;
                formData.dtDepositedDate.ErrorLst.ValidatonErrorMessage = "Ngày kí quỹ không được để trống";
            }
            else {
                formData.dtDepositedDate.ErrorLst.IsValidatonError = false;
                formData.dtDepositedDate.ErrorLst.ValidatonErrorMessage = "";
            }
        }
        else {
            formData.dtDepositedDate.ErrorLst.IsValidatonError = false;
            formData.dtDepositedDate.ErrorLst.ValidatonErrorMessage = "";
        }


    }

    render() {
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        const { IsExtended, IsLiquidated, IsDeposited } = this.state;

        let isDisableExtended, isDisableLiquidated, isDisableDeposited;

        if (this.state.IsSystem == true) {
            isDisableExtended = true;
            isDisableLiquidated = true;
            isDisableDeposited = true;
        }
        else {
            if (IsExtended == true) {
                isDisableExtended = false;
            }
            else {
                isDisableExtended = true;
            }

            if (IsLiquidated == true) {
                isDisableLiquidated = false;
            }
            else {
                isDisableLiquidated = true;
            }
            if (IsDeposited == true) {
                isDisableDeposited = false;
            }
            else {
                isDisableDeposited = true;
            }
        }

        let currentDate = new Date();
        if (this.state.IsLoadDataComplete) {
            return (
                <React.Fragment>
                    <ReactNotification ref={this.notificationDOMRef} />

                    <FormContainer
                        FormName={TitleFormEdit}
                        MLObjectDefinition={MLObjectDefinition}
                        dataSource={this.state.DataSource}
                        listelement={[]}
                        BackLink={BackLink}
                        onSubmit={this.handleSubmit}
                        onchange={this.handleChange.bind(this)}
                    >

                        <div className="row mb-4">
                            <div className="col-md-6">
                                <FormControl.TextBox
                                    name="txtServiceAgreementID"
                                    colspan="8"
                                    labelcolspan="4"
                                    readOnly={true}
                                    label="mã hợp đồng"
                                    placeholder="Mã hợp đồng"
                                    controltype="InputControl"
                                    value=""
                                    datasourcemember="ServiceAgreementID"
                                    validatonList={['required']}
                                />
                            </div>
                            <div className="col-md-6">
                                <FormControl.TextBox
                                    name="txtServiceAgreementNumber"
                                    colspan="8"
                                    labelcolspan="4"
                                    readOnly={false}
                                    label="số hợp đồng"
                                    placeholder="Mã hợp đồng"
                                    controltype="InputControl"
                                    value=""
                                    datasourcemember="ServiceAgreementNumber"
                                    validatonList={['required']}
                                />
                            </div>

                            <div className="col-md-6">
                                <FormControl.ComboBoxSelect
                                    name="txtServiceAgreementTypeID"
                                    colspan="8"
                                    labelcolspan="4"
                                    disabled={this.state.IsSystem}
                                    readOnly={this.state.IsSystem}
                                    label="loại hợp đồng"
                                    validatonList={["Comborequired"]}
                                    placeholder="-- Vui lòng chọn --"
                                    isautoloaditemfromcache={true}
                                    loaditemcachekeyid={ERPCOMMONCACHE_SERVICEAGREEMENTTYPE} //"ERPCOMMONCACHE.SERVICEAGREEMENTTYPE"
                                    valuemember="ServiceAgreementTypeID"
                                    nameMember="ServiceAgreementTypeName"
                                    controltype="InputControl"
                                    value={""}
                                    listoption={null}
                                    datasourcemember="ServiceAgreementTypeID" />

                            </div>

                            <div className="col-md-6">
                                <FormControl.ComboBoxSelect
                                    name="txtServiceTypeID"
                                    colspan="8"
                                    labelcolspan="4"
                                    label="loại dịch vụ"
                                    disabled={this.state.IsSystem}
                                    readOnly={this.state.IsSystem}
                                    placeholder="-- Vui lòng chọn --"
                                    validatonList={["Comborequired"]}
                                    isautoloaditemfromcache={true}
                                    loaditemcachekeyid={ERPCOMMONCACHE_TMS_SERVICETYPE} //"ERPCOMMONCACHE.TMS_SERVICETYPE"
                                    valuemember="ServiceTypeID"
                                    nameMember="ServiceTypeName"
                                    controltype="InputControl"
                                    value={""}
                                    listoption={null}
                                    datasourcemember="ServiceTypeID" />
                            </div>

                            <div className="col-md-6">
                                {/* <FormControl.ComboBoxSelect
                                name="txtPartnerID"
                                colspan="8"
                                labelcolspan="4"
                                label="đối tác"
                                validatonList={["Comborequired"]}
                                isautoloaditemfromcache={true}
                                loaditemcachekeyid="ERPCOMMONCACHE.PARTNER"
                                valuemember="PartnerID"
                                nameMember="PartnerName"
                                controltype="InputControl"
                                value={""}
                                listoption={null}
                                datasourcemember="PartnerID" /> */}

                                <FormControl.FormControlComboBox
                                    name="txtPartnerID"
                                    colspan="8"
                                    labelcolspan="4"
                                    label="đơn vị vận chuyển"
                                    disabled={this.state.IsSystem}
                                    readOnly={this.state.IsSystem}
                                    isautoloaditemfromcache={true}
                                    loaditemcachekeyid={ERPCOMMONCACHE_PARTNER}//"ERPCOMMONCACHE.PARTNER"
                                    valuemember="PartnerID"
                                    nameMember="PartnerName"
                                    controltype="InputControl"
                                    placeholder="---Vui lòng chọn---"
                                    value={""}
                                    listoption={null}
                                    filterValue={2}
                                    filterobj="PartnerTypeID"
                                    filterrest="ShipmentOrder_DeliverUserList"
                                    datasourcemember="PartnerID" />
                            </div>

                            {/* <div className="col-md-6">
                                <FormControl.ComboBoxSelect
                                    name="txtServiceAreaID"
                                    colspan="8"
                                    labelcolspan="4"
                                    label="khu vực"
                                    disabled={this.state.IsSystem}
                                    placeholder="-- Vui lòng chọn --"
                                    readOnly={this.state.IsSystem}
                                    validatonList={["Comborequired"]}
                                    isautoloaditemfromcache={true}
                                    loaditemcachekeyid={ERPCOMMONCACHE_AREATT} //"ERPCOMMONCACHE.AREATT"
                                    valuemember="AreaID"
                                    nameMember="AreaName"
                                    controltype="InputControl"
                                    value={""}
                                    listoption={null}
                                    datasourcemember="ServiceAreaID" />
                            </div> */}

                            <div className="col-md-6">

                                {/* <MultiSelectComboBox
                                name="ShipmentOrder_DeliverUserList"
                                colspan="8"
                                labelcolspan="4"
                                label="Nhân viên  giao"
                                IsLabelDiv={true}
                                isautoloaditemfromcache={false}
                                loaditemcachekeyid={"PIMCACHE_PIM_SHIPPINGMETHOD"}
                                valuemember="ShippingMethodID"
                                nameMember="ShippingMethodName"
                                controltype="InputControl"
                                value={''}
                                ShipmentOrder={this.state.ShipmentOrder}
                                onChange={this.handleValueChange1}
                                listoption={[]}
                                datasourcemember="ShipmentOrder_DeliverUserList"
                                //validatonList={["Comborequired"]}
                                validationErrorMessage={''}
                            /> */}

                                <DeliverUserList
                                    name="ShipmentOrder_DeliverUserList"
                                    colspan="8"
                                    labelcolspan="4"
                                    label="Nhân viên đại diện"
                                    disabled={this.state.IsSystem}
                                    readOnly={this.state.IsSystem}
                                    IsLabelDiv={true}
                                    validatonList={["Comborequired"]}
                                    controltype="InputMultiControl"
                                    //MLObjectDefinition={GridMLDeliverUserDefinition}
                                    datasourcemember="ShipmentOrder_DeliverUserList"
                                    filterName="txtPartnerID"
                                    isMultiSelect={false}
                                />
                            </div>
                            <div className="col-md-6">

                            </div>
                            <div className="col-md-6">
                                {/* <FormControl.ElementDatetime
                                name="dtSignedDate"
                                colspan="8"
                                labelcolspan="4"
                                readOnly={false}
                                timeFormat={false}
                                dateFormat="YYYY-MM-DD HH:mm"
                                label="ngày ký hợp đồng"
                                placeholder="Ngày ký hợp đồng"
                                controltype="InputControl"
                                value=""
                                validatonList={["required"]}
                                datasourcemember="SignedDate"
                            /> */}
                                <FormControl.FormControlDatetimeNew
                                    name="dtSignedDate"
                                    colspan="8"
                                    labelcolspan="4"
                                    disabled={this.state.IsSystem}
                                    readOnly={false}
                                    showTime={false}
                                    timeFormat={false}
                                    dateFormat="DD-MM-YYYY"//"YYYY-MM-DD"
                                    label="ngày ký hợp đồng"
                                    placeholder="Ngày ký hợp đồng"
                                    controltype="InputControl"
                                    value=""
                                    validatonList={["required"]}
                                    datasourcemember="SignedDate"
                                />
                            </div>

                            <div className="col-md-6">
                                {/* <FormControl.ElementDatetime
                                name="dtExpiredDate"
                                colspan="8"
                                labelcolspan="4"
                                readOnly={false}
                                timeFormat={false}
                                dateFormat="YYYY-MM-DD HH:mm"
                                label="ngày hết hạn hợp đồng"
                                placeholder="Ngày hết hạn hợp đồng"
                                controltype="InputControl"
                                value=""
                                validatonList={["required"]}
                                datasourcemember="ExpiredDate"
                            /> */}
                                <FormControl.FormControlDatetimeNew
                                    name="dtExpiredDate"
                                    colspan="8"
                                    labelcolspan="4"
                                    disabled={this.state.IsSystem}
                                    readOnly={false}
                                    showTime={false}
                                    timeFormat={false}
                                    dateFormat="DD-MM-YYYY"//"YYYY-MM-DD"
                                    label="ngày hết hạn hợp đồng"
                                    placeholder="Ngày hết hạn hợp đồng"
                                    controltype="InputControl"
                                    value=""
                                    validatonList={["required"]}
                                    datasourcemember="ExpiredDate"
                                />
                            </div>

                            <div className="col-md-6">
                                <FormControl.CheckBox
                                    label="Đã gia hạn hợp đồng"
                                    name="chkIsExtended"
                                    datasourcemember="IsExtended"
                                    controltype="InputControl"
                                    colspan="8"
                                    labelcolspan="4"
                                    classNameCustom="customCheckbox"
                                    readOnly={this.state.IsSystem}
                                    disabled={this.state.IsSystem}
                                />
                            </div>

                            <div className="col-md-6">
                                {/* <FormControl.ElementDatetime
                                name="dtExtendedDate"
                                colspan="8"
                                labelcolspan="4"
                                readOnly={false}
                                timeFormat={false}
                                dateFormat="DD/MM/YYYY"
                                label="gia hạn đến ngày"
                                placeholder="Gia hạn đến ngày"
                                controltype="InputControl"
                                value=""
                                //validatonList={[]}
                                datasourcemember="ExtendedDate"
                            /> */}
                                <FormControl.FormControlDatetimeNew
                                    name="dtExtendedDate"
                                    colspan="8"
                                    labelcolspan="4"
                                    disabled={isDisableExtended}
                                    readOnly={false}
                                    showTime={false}
                                    timeFormat={false}
                                    dateFormat="DD-MM-YYYY"//"YYYY-MM-DD"
                                    label="gia hạn đến ngày"
                                    placeholder={formatDate(currentDate, true)}
                                    controltype="InputControl"
                                    value=""
                                    datasourcemember="ExtendedDate"
                                />
                            </div>

                            <div className="col-md-6">
                                <FormControl.CheckBox
                                    label="đã thanh lý hợp đồng"
                                    name="chkIsLiquidated"
                                    datasourcemember="IsLiquidated"
                                    controltype="InputControl"
                                    colspan="8"
                                    labelcolspan="4"
                                    classNameCustom="customCheckbox"
                                    readOnly={this.state.IsSystem}
                                    disabled={this.state.IsSystem}
                                />
                            </div>

                            <div className="col-md-6">
                                {/* <FormControl.ElementDatetime
                                name="dtLiquidateddate"
                                colspan="8"
                                labelcolspan="4"
                                readOnly={false}
                                timeFormat={false}
                                dateFormat="DD/MM/YYYY"
                                label="ngày thanh lý hợp đồng"
                                placeholder="Ngày thanh lý hợp đồng"
                                controltype="InputControl"
                                value=""
                                // validatonList={[]}
                                datasourcemember="Liquidateddate"
                            /> */}
                                <FormControl.FormControlDatetimeNew
                                    name="dtLiquidateddate"
                                    colspan="8"
                                    labelcolspan="4"
                                    disabled={isDisableLiquidated}
                                    readOnly={false}
                                    showTime={false}
                                    timeFormat={false}
                                    dateFormat="DD-MM-YYYY"//"YYYY-MM-DD"
                                    label="ngày thanh lý hợp đồng"
                                    placeholder={formatDate(currentDate, true)}
                                    controltype="InputControl"
                                    value=""
                                    datasourcemember="Liquidateddate"
                                />
                            </div>

                            <div className="col-md-6">
                                <FormControl.CheckBox
                                    label="đã ký quỹ"
                                    name="chkIsDeposited"
                                    datasourcemember="IsDeposited"
                                    controltype="InputControl"
                                    colspan="8"
                                    labelcolspan="4"
                                    classNameCustom="customCheckbox"
                                    readOnly={this.state.IsSystem}
                                    disabled={this.state.IsSystem}
                                />
                            </div>

                            <div className="col-md-6">
                                <FormControl.TextBoxCurrency
                                    name="txtDepositMoney"
                                    colspan="8"
                                    labelcolspan="4"
                                    readOnly={isDisableDeposited}
                                    label="số tiền ký quỹ"
                                    placeholder="Số tiền ký quỹ"
                                    controltype="InputControl"
                                    value=""
                                    maxSize={15}
                                    datasourcemember="DepositMoney"
                                />
                            </div>

                            <div className="col-md-6">

                                <FormControl.FormControlDatetimeNew
                                    name="dtDepositedDate"
                                    colspan="8"
                                    labelcolspan="4"
                                    disabled={isDisableDeposited}
                                    readOnly={false}
                                    showTime={false}
                                    timeFormat={false}
                                    dateFormat="DD-MM-YYYY"//"YYYY-MM-DD"
                                    label="ngày ký quỹ"
                                    placeholder={formatDate(currentDate, true)}
                                    controltype="InputControl"
                                    value=""
                                    datasourcemember="DepositedDate"
                                />
                            </div>

                            <div className="col-md-6">
                                <FormControl.TextBox
                                    name="txtDepositNote"
                                    colspan="8"
                                    labelcolspan="4"
                                    readOnly={isDisableDeposited}
                                    label="ghi chú ký quỹ"
                                    placeholder="Ghi chú ký quỹ"
                                    controltype="InputControl"
                                    value=""
                                    datasourcemember="DepositNote"
                                />
                            </div>

                            <div className="col-md-12">
                                <FormControl.TextArea
                                    labelcolspan={2}
                                    colspan={10}
                                    name="txtDescription"
                                    label="Mô tả"
                                    placeholder="Mô tả"
                                    datasourcemember="Description"
                                    controltype="InputControl"
                                    rows={6}
                                    maxSize={500}
                                    classNameCustom="customcontrol"
                                    readOnly={this.state.IsSystem}
                                    disabled={this.state.IsSystem}
                                />
                            </div>

                            <div className="col-md-12">
                                <FormControl.CheckBox
                                    label="kích hoạt"
                                    name="chkIsActived"
                                    datasourcemember="IsActived"
                                    controltype="InputControl"
                                    colspan={10}
                                    labelcolspan={2}
                                    classNameCustom="customCheckbox"
                                    readOnly={this.state.IsSystem}
                                    disabled={this.state.IsSystem}
                                />
                            </div>

                            <div className="col-md-12">
                                <FormControl.CheckBox
                                    label="hệ thống"
                                    name="chkIsSystem"
                                    datasourcemember="IsSystem"
                                    controltype="InputControl"
                                    colspan={10}
                                    labelcolspan={2}
                                    classNameCustom="customCheckbox"
                                />
                            </div>

                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <AreaCom
                                    dataSource={this.state.DataSource.ServiceAgreement_AreaList}
                                    serviceAgreementAreaSubmit={this.handleServiceAgreementAreaSubmit}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <StoreCom
                                    dataSource={this.state.DataSource.ServiceAgreement_StoreList}
                                    serviceAgreementStoreSubmit={this.handleServiceAgreementStoreSubmit}
                                />
                            </div>
                        </div>
                    </FormContainer>
                </React.Fragment>
            );
        }
        return <label>Đang nạp dữ liệu...</label>;

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
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
        callClearLocalCache: (cacheKeyID) => {
            return dispatch(callClearLocalCache(cacheKeyID));
        }
    };
};

const Edit = connect(mapStateToProps, mapDispatchToProps)(EditCom);
export default Edit;
