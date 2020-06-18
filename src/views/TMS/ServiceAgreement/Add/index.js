import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import FormContainer from "../../../../common/components/FormContainer";
import { MessageModal } from "../../../../common/components/Modal";
import FormControl from "../../../../common/components/FormContainer/FormControl";
import {
    APIHostName,
    AddAPIPath,
    AddElementList,
    MLObjectDefinition,
    BackLink,
    AddPagePath,
    TitleFormAdd

} from "../constants";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import indexedDBLib from "../../../../common/library/indexedDBLib.js";
import { CACHE_OBJECT_STORENAME } from "../../../../constants/systemVars.js";
import { callGetCache, callClearLocalCache } from "../../../../actions/cacheAction";
import MultiSelectComboBox from "../../../../common/components/FormContainer/FormControl/MultiSelectComboBox";

import DeliverUserList from "../../ShipmentOrder/Component/DeliverUserList";


class AddCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.state = {
            IsCallAPIError: false,
            IsCloseForm: false,
            DataSource: {},
        };
    }

    componentDidMount() {
        this.props.updatePagePath(AddPagePath);
    }

    handleSubmit(formData, MLObject) {
        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.DeputyUserName = MLObject.ShipmentOrder_DeliverUserList[0].UserName;
        this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then(apiResult => {
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


    render() {
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        return (
            <FormContainer
                FormName={TitleFormAdd}
                MLObjectDefinition={MLObjectDefinition}
                dataSource={this.state.DataSource}
                listelement={[]}
                BackLink={BackLink}
                onSubmit={this.handleSubmit}
            >

                <div className="row">
                    <div className="col-md-6">
                        <FormControl.TextBox
                            name="txtServiceAgreementID"
                            colspan="8"
                            labelcolspan="4"
                            readOnly={false}
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

                        <DeliverUserList
                            name="ShipmentOrder_DeliverUserList"
                            colspan="8"
                            labelcolspan="4"
                            label="Nhân viên  giao"
                            IsLabelDiv={true}
                            validatonList={["Comborequired"]}
                            controltype="InputMultiControl"
                            //MLObjectDefinition={GridMLDeliverUserDefinition}
                            datasourcemember="ShipmentOrder_DeliverUserList"
                            filterName="txtPartnerID"
                            isMultiSelect={false}
                        />

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
                    </div>

                    <div className="col-md-6">
                        {/* <FormControl.ElementDatetime
                            name="dtSignedDate"
                            colspan="8"
                            labelcolspan="4"
                            readOnly={false}
                            timeFormat={false}
                            dateFormat="DD/MM/YYYY"
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
                            readOnly={true}
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
                            dateFormat="DD/MM/YYYY"
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
                            readOnly={true}
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
                            readOnly={true}
                            showTime={false}
                            timeFormat={false}
                            dateFormat="YYYY-MM-DD"
                            label="gia hạn đến ngày"
                            placeholder="Gia hạn đến ngày"
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
                            readOnly={true}
                            showTime={false}
                            timeFormat={false}
                            dateFormat="YYYY-MM-DD"
                            label="ngày thanh lý hợp đồng"
                            placeholder="Ngày thanh lý hợp đồng"
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
                        />
                    </div>

                    <div className="col-md-6">
                        <FormControl.TextBox
                            name="txtDepositMoney"
                            colspan="8"
                            labelcolspan="4"
                            readOnly={false}
                            label="số tiền ký quỹ"
                            placeholder="Số tiền ký quỹ"
                            controltype="InputControl"
                            value=""
                            datasourcemember="DepositMoney"
                            validatonList={["number"]}
                        />
                    </div>

                    <div className="col-md-6">
                        {/* <FormControl.ElementDatetime
                            name="dtDepositedDate"
                            colspan="8"
                            labelcolspan="4"
                            readOnly={false}
                            timeFormat={false}
                            dateFormat="DD/MM/YYYY"
                            label="ngày ký quỹ"
                            placeholder="Ngày ký quỹ"
                            controltype="InputControl"
                            value=""
                            datasourcemember="DepositedDate"
                        /> */}
                        <FormControl.FormControlDatetime
                            name="dtDepositedDate"
                            colspan="8"
                            labelcolspan="4"
                            readOnly={true}
                            showTime={false}
                            timeFormat={false}
                            dateFormat="YYYY-MM-DD"
                            label="ngày ký quỹ"
                            placeholder="Ngày ký quỹ"
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
                            readOnly={false}
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

const Add = connect(mapStateToProps, mapDispatchToProps)(AddCom);
export default Add;
