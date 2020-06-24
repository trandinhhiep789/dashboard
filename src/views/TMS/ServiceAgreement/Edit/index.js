import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import FormContainer from "../../../../common/components/FormContainer";
import { MessageModal } from "../../../../common/components/Modal";
import FormControl from "../../../../common/components/FormContainer/FormControl";
import {

    TitleFormEdit,
    EditPagePath,
    BackLink,
    MLObjectDefinition,
    LoadNewAPIPath,
    APIHostName,
    UpdateAPIPath

} from "../constants";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import indexedDBLib from "../../../../common/library/indexedDBLib.js";
import { CACHE_OBJECT_STORENAME } from "../../../../constants/systemVars.js";
import { callGetCache, callClearLocalCache } from "../../../../actions/cacheAction";
import MultiSelectComboBox from "../../../../common/components/FormContainer/FormControl/MultiSelectComboBox";
import { formatDate } from "../../../../common/library/CommonLib.js";

import DeliverUserList from "../../ShipmentOrder/Component/DeliverUserList";

class EditCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.state = {
            IsCallAPIError: false,
            IsCloseForm: false,
            DataSource: {},
            IsLoadDataComplete: false,
            IsSystem: false,
            IsExtended: false,
            IsLiquidated: false,
            IsDeposited: false,
        };
    }

    componentDidMount() {
        this.props.updatePagePath(EditPagePath);
        this.callLoadData(this.props.match.params.id);
    }

    handleSubmit(formData, MLObject) {

        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.DeputyUserName = MLObject.ShipmentOrder_DeliverUserList[0].UserName;
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
                this.setState({
                    DataSource: apiResult.ResultObject,
                    IsLoadDataComplete: true,
                    IsSystem: apiResult.ResultObject.IsSystem,
                    IsExtended: apiResult.ResultObject.IsExtended,
                    IsLiquidated: apiResult.ResultObject.IsLiquidated,
                    IsDeposited: apiResult.ResultObject.IsDeposited,
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
            formData.txtDepositMoney.value="";
            formData.dtDepositedDate.value="";
            formData.txtDepositNote.value="";
        }
        if (formData.chkIsLiquidated.value) {
            IsLiquidated = true
        }
        else {
            IsLiquidated = false;
            formData.dtLiquidateddate.value="";
        }

        this.setState({
            IsExtended,
            IsLiquidated,
            IsDeposited
        })
        if(formData.dtExpiredDate.value.length >0){
            if (formData.dtSignedDate.value >= formData.dtExpiredDate.value) {
                formData.dtExpiredDate.ErrorLst.IsValidatonError = true;
                formData.dtExpiredDate.ErrorLst.ValidatonErrorMessage = "Ngày kết thúc hợp đồng phải lớn hơn ngày kí hợp đồng";
            }
            else{
                formData.dtExpiredDate.ErrorLst.IsValidatonError = false;
                formData.dtExpiredDate.ErrorLst.ValidatonErrorMessage = "";
            }
        }
        

        if (this.state.IsExtended) {

            if (formData.dtExpiredDate.value >= formData.dtExtendedDate.value) {
                formData.dtExtendedDate.ErrorLst.IsValidatonError = true;
                formData.dtExtendedDate.ErrorLst.ValidatonErrorMessage = "Ngày gia hạn hợp đồng phải lớn hơn ngày hết hạn hợp đồng";
            }

            else {
                formData.dtExtendedDate.ErrorLst.IsValidatonError = false;
                formData.dtExtendedDate.ErrorLst.ValidatonErrorMessage = "";
            }
        }

        if (this.state.IsLiquidated) {
            if (this.state.IsExtended) {
                if (formData.dtExtendedDate.value <= formData.dtLiquidateddate.value || formData.dtLiquidateddate.value <= formData.dtSignedDate.value) {
                    formData.dtLiquidateddate.ErrorLst.IsValidatonError = true;
                    formData.dtLiquidateddate.ErrorLst.ValidatonErrorMessage = "Ngày thanh lý hợp đồng phải nằm trong khoảng thời gian kí hợp đồng";
                }
                else {
                    formData.dtLiquidateddate.ErrorLst.IsValidatonError = false;
                    formData.dtLiquidateddate.ErrorLst.ValidatonErrorMessage = "";
                }
            }
            else {
                if (formData.dtExpiredDate.value <= formData.dtLiquidateddate.value || formData.dtLiquidateddate.value <= formData.dtSignedDate.value) {
                    formData.dtLiquidateddate.ErrorLst.IsValidatonError = true;
                    formData.dtLiquidateddate.ErrorLst.ValidatonErrorMessage = "Ngày thanh lý hợp đồng phải nằm trong khoảng thời gian kí hợp đồng";
                }
                else {
                    formData.dtLiquidateddate.ErrorLst.IsValidatonError = false;
                    formData.dtLiquidateddate.ErrorLst.ValidatonErrorMessage = "";
                }
            }

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
                <FormContainer
                    FormName={TitleFormEdit}
                    MLObjectDefinition={MLObjectDefinition}
                    dataSource={this.state.DataSource}
                    listelement={[]}
                    BackLink={BackLink}
                    onSubmit={this.handleSubmit}
                    onchange={this.handleChange.bind(this)}
                >

                    <div className="row">
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
                            <FormControl.ComboBoxSelect
                                name="txtServiceAgreementTypeID"
                                colspan="8"
                                labelcolspan="4"
                                disabled={this.state.IsSystem}
                                readOnly={this.state.IsSystem}
                                label="loại hợp đồng"
                                validatonList={["Comborequired"]}
                                isautoloaditemfromcache={true}
                                loaditemcachekeyid="ERPCOMMONCACHE.SERVICEAGREEMENTTYPE"
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
                                validatonList={["Comborequired"]}
                                isautoloaditemfromcache={true}
                                loaditemcachekeyid="ERPCOMMONCACHE.TMS_SERVICETYPE"
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
                                loaditemcachekeyid="ERPCOMMONCACHE.PARTNER"
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

                        <div className="col-md-6">
                            <FormControl.ComboBoxSelect
                                name="txtServiceAreaID"
                                colspan="8"
                                labelcolspan="4"
                                label="khu vực"
                                disabled={this.state.IsSystem}
                                readOnly={this.state.IsSystem}
                                validatonList={["Comborequired"]}
                                isautoloaditemfromcache={true}
                                loaditemcachekeyid="ERPCOMMONCACHE.AREA"
                                valuemember="AreaID"
                                nameMember="AreaName"
                                controltype="InputControl"
                                value={""}
                                listoption={null}
                                datasourcemember="ServiceAreaID" />
                        </div>

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
                                label="Nhân viên  giao"
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
                            <FormControl.FormControlDatetime
                                name="dtSignedDate"
                                colspan="8"
                                labelcolspan="4"
                                disabled={this.state.IsSystem}
                                readOnly={false}
                                showTime={false}
                                timeFormat={false}
                                dateFormat="YYYY-MM-DD"
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
                            <FormControl.FormControlDatetime
                                name="dtExpiredDate"
                                colspan="8"
                                labelcolspan="4"
                                disabled={this.state.IsSystem}
                                readOnly={false}
                                showTime={false}
                                timeFormat={false}
                                dateFormat="YYYY-MM-DD"
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
                            <FormControl.FormControlDatetime
                                name="dtExtendedDate"
                                colspan="8"
                                labelcolspan="4"
                                disabled={isDisableExtended}
                                readOnly={false}
                                showTime={false}
                                timeFormat={false}
                                dateFormat="YYYY-MM-DD"
                                label="gia hạn đến ngày"
                                placeholder={formatDate(currentDate)}
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
                            <FormControl.FormControlDatetime
                                name="dtLiquidateddate"
                                colspan="8"
                                labelcolspan="4"
                                disabled={isDisableLiquidated}
                                readOnly={false}
                                showTime={false}
                                timeFormat={false}
                                dateFormat="YYYY-MM-DD"
                                label="ngày thanh lý hợp đồng"
                                placeholder={formatDate(currentDate)}
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

                            <FormControl.FormControlDatetime
                                name="dtDepositedDate"
                                colspan="8"
                                labelcolspan="4"
                                disabled={isDisableDeposited}
                                readOnly={false}
                                showTime={false}
                                timeFormat={false}
                                dateFormat="YYYY-MM-DD"
                                label="ngày ký quỹ"
                                placeholder={formatDate(currentDate)}
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

                </FormContainer>
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
