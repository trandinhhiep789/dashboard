import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import ModelFormContainer from "../../../../common/components/Modal/ModelFormContainer";
import FormContainer from "../../../../common/components/FormContainer";
import InputGridControl from "../../../../common/components/FormContainer/FormControl/InputGrid/InputGridControl.js";
import FormControl from "../../../../common/components/FormContainer/FormControl";
import { MessageModal } from "../../../../common/components/Modal";
import {
    APIHostName,
    LoadAPIPath,
    UpdateAPIPath,
    EditElementList,
    MLObjectDefinition,
    BackLink,
    EditPagePath,
    ElementSenderQHPXList,
    ElementQHPXList,
    GridMLObjectQTQHPX,
    GridMLSenderQTQHPX,
    DataGridColumnItemList,
    DataGridColumnMaterialList,
    GridMLMaterialDefinition,
    GridMLDeliverUserDefinition
} from "../constants";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { BRAND_UPDATE } from "../../../../constants/functionLists";
import { callGetCache } from "../../../../actions/cacheAction";
import indexedDBLib from "../../../../common/library/indexedDBLib.js";
import { CACHE_OBJECT_STORENAME } from "../../../../constants/systemVars.js";
import MultiUserComboBox from "../../../../common/components/FormContainer/FormControl/MultiSelectComboBox/MultiUserComboBox";
import ProductComboBox from "../../../../common/components/FormContainer/FormControl/MultiSelectComboBox/ProductComboBox";

import { showModal, hideModal } from '../../../../actions/modal';
import { MODAL_TYPE_COMMONTMODALS } from '../../../../constants/actionTypes';
import ShipmentOrderItemObj from '../Component/ShipmentOrderItemObj';

class EditCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleSelectedFile = this.handleSelectedFile.bind(this);
        this.handleItemInsert = this.handleItemInsert.bind(this);
        this.handleInputChangeObjItem = this.handleInputChangeObjItem.bind(this);
        this.handleItemEdit = this.handleItemEdit.bind(this);
        this.handleItemDelete = this.handleItemDelete.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsLoadDataComplete: false,
            IsCloseForm: false,
            EditElementList: EditElementList,
            DataSource: [],
            ResultLanguage: [],
            Files: {},
            IsDeletedFile: false
        };
    }

    componentDidMount() {
        this.props.updatePagePath(EditPagePath);
        this.callLoadData(this.props.match.params.id);
    }
    callLoadData(id) {
        this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then((apiResult) => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
                this.setState({
                    DataSource: apiResult.ResultObject,
                    IsLoadDataComplete: true
                });
            }
        });
    }
    handleInputChangeObjItem(ObjItem) {

        const formData = Object.assign({}, this.state.DataSource, { ["ShipmentOrder_ItemList"]: ObjItem });
        this.setState({ DataSource: formData });
        this.props.hideModal();

    }
    handleItemDelete(index) {
        let dataSourceValue = this.state.DataSource.ShipmentOrder_ItemList.filter(function (value, index1) { return index1 != index; });
        const formData = Object.assign({}, this.state.DataSource, { ["ShipmentOrder_ItemList"]: dataSourceValue });
        this.setState({ DataSource: formData });

    }
    handleItemInsert() {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Cập nhật danh sách hàng hóa',
            content: {
                text: <ShipmentOrderItemObj
                    dataSource={this.state.DataSource}
                    onInputChangeObj={this.handleInputChangeObjItem}
                />
            },
            maxWidth: '1000px'
        });
    }
    handleItemEdit(index) {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Cập nhật danh sách hàng hóa',
            content: {
                text: <ShipmentOrderItemObj
                    dataSource={this.state.DataSource}
                    index={index}
                    onInputChangeObj={this.handleInputChangeObjItem}
                />
            },
            maxWidth: '1000px'
        });

    }



    handleSubmit(formData, MLObject) {
        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        console.log("handleSubmit",formData, MLObject);
        this.props.callFetchAPI(APIHostName, UpdateAPIPath, MLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);
            if (!apiResult.IsError) {
                // this.handleClearLocalCache();
            }
        });
    }


    //file upload
    handleSelectedFile(file, nameValue, isDeletetedFile) {
        const filelist = { [nameValue]: file };
        this.setState({ Files: filelist, IsDeletedFile: isDeletetedFile });
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
        if (this.state.IsLoadDataComplete) {
            return (
                <FormContainer
                    FormName="Cập nhật yêu cầu vận chuyển"
                    MLObjectDefinition={MLObjectDefinition}
                    dataSource={this.state.DataSource}
                    listelement={[]}
                    BackLink={BackLink}
                    onSubmit={this.handleSubmit}
                >
                    <div className="card">
                        <div className="card-title">
                            <h4 className="title">Thông tin chung</h4>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <FormControl.FormControlTextBox
                                        name="txtShipmentOrderID"
                                        colspan="8"
                                        labelcolspan="4"
                                        readOnly={true}
                                        label="mã yêu cầu"
                                        placeholder="Mã yêu cầu"
                                        controltype="InputControl"
                                        value=""
                                        datasourcemember="ShipmentOrderID"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <FormControl.FormControlComboBox
                                        name="txtShipmentOrderTypeID"
                                        colspan="8"
                                        labelcolspan="4"
                                        label="loại yêu cầu"
                                        validatonList={["Comborequired"]}
                                        isautoloaditemfromcache={true}
                                        loaditemcachekeyid="ERPCOMMONCACHE.SHIPMENTORDERTYPE"
                                        valuemember="ShipmentOrderTypeID"
                                        nameMember="ShipmentOrderTypeName"
                                        controltype="InputControl"
                                        value={this.state.DataSource.ShipmentOrderTypeID}
                                        listoption={null}
                                        datasourcemember="ShipmentOrderTypeID" />

                                </div>
                                <div className="col-md-6">
                                    <FormControl.FormControlComboBox
                                        name="txtRequestPartnerID"
                                        colspan="8"
                                        labelcolspan="4"
                                        label="đối tác yêu cầu"
                                        validatonList={["Comborequired"]}
                                        isautoloaditemfromcache={true}
                                        loaditemcachekeyid="ERPCOMMONCACHE.PARTNER"
                                        valuemember="PartnerID"
                                        nameMember="PartnerName"
                                        controltype="InputControl"
                                        value={""}
                                        listoption={null}
                                        datasourcemember="RequestPartnerID" />
                                </div>
                                <div className="col-md-6">
                                    <FormControl.FormControlComboBox
                                        name="txtCarrierPartnerID"
                                        colspan="8"
                                        labelcolspan="4"
                                        label="đơn vị vận chuyển"
                                        validatonList={["Comborequired"]}
                                        isautoloaditemfromcache={true}
                                        loaditemcachekeyid="ERPCOMMONCACHE.PARTNER"
                                        valuemember="PartnerID"
                                        nameMember="PartnerName"
                                        controltype="InputControl"
                                        value={""}
                                        listoption={null}
                                        datasourcemember="CarrierPartnerID" />
                                </div>
                                <div className="col-md-6">
                                    <FormControl.FormControlComboBox
                                        name="txtShipmentServiceTypeID"
                                        colspan="8"
                                        labelcolspan="4"
                                        label="loại dịch vụ"
                                        placeholder="---Vui lòng chọn---"
                                        validatonList={["Comborequired"]}
                                        isautoloaditemfromcache={true}
                                        loaditemcachekeyid="ERPCOMMONCACHE.SHIPMENTSERVICETYPE"
                                        valuemember="ShipmentServiceTypeID"
                                        nameMember="ShipmentServiceTypeName"
                                        controltype="InputControl"
                                        value={""}
                                        listoption={null}
                                        datasourcemember="ShipmentServiceTypeID" />
                                </div>
                                <div className="col-md-6">
                                    <FormControl.FormControlComboBox
                                        name="txtCarrierTypeID"
                                        colspan="8"
                                        labelcolspan="4"
                                        label="phương tiện vận chuyển"
                                        validatonList={["Comborequired"]}
                                        isautoloaditemfromcache={true}
                                        loaditemcachekeyid="ERPCOMMONCACHE.CARRIERTYPE"
                                        valuemember="CarrierTypeID"
                                        nameMember="CarrierTypeName"
                                        controltype="InputControl"
                                        value={-1}
                                        listoption={null}
                                        datasourcemember="CarrierTypeID"
                                        placeholder="---Vui lòng chọn---"
                                        isMultiSelect={false}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <FormControl.FormControlDatetime
                                        name="dtCreatedOrderTime"
                                        colspan="8"
                                        labelcolspan="4"
                                        readOnly={true}
                                        timeFormat={false}
                                        dateFormat="YYYY-MM-DD HH:mm"
                                        label="ngày tạo yêu cầu"
                                        placeholder="Ngày tạo yêu cầu"
                                        controltype="InputControl"
                                        value=""
                                        validatonList={["required"]}
                                        datasourcemember="CreatedOrderTime"

                                    />
                                </div>

                                <div className="col-md-6">
                                    <FormControl.FormControlDatetime
                                        name="dtExpectedDeliveryDate"
                                        colspan="8"
                                        labelcolspan="4"
                                        readOnly={true}
                                        timeFormat={false}
                                        dateFormat="YYYY-MM-DD HH:mm"
                                        label="thời gian giao hàng"
                                        placeholder="Thời gian giao hàng"
                                        controltype="InputControl"
                                        value=""
                                        validatonList={["required"]}
                                        datasourcemember="ExpectedDeliveryDate" />

                                </div>
                                <div className="col-md-6">
                                    <FormControl.FormControlDatetime
                                        name="dtEarliestPickUpTime"
                                        colspan="8"
                                        labelcolspan="4"
                                        readOnly={true}
                                        timeFormat={false}
                                        dateFormat="YYYY-MM-DD HH:mm"
                                        label="lấy hàng từ"
                                        placeholder="Lấy hàng từ"
                                        controltype="InputControl"
                                        value=""
                                        validatonList={["required"]}
                                        datasourcemember="EarliestPickUpTime" />
                                </div>
                                <div className="col-md-6">
                                    <FormControl.FormControlDatetime
                                        name="dtLatestPickUpTime"
                                        colspan="8"
                                        labelcolspan="4"
                                        readOnly={true}
                                        timeFormat={false}
                                        dateFormat="YYYY-MM-DD HH:mm"
                                        label="đến"
                                        placeholder="Đến"
                                        controltype="InputControl"
                                        value=""
                                        validatonList={["required"]}
                                        datasourcemember="LatestPickUpTime" />
                                </div>
                                <div className="col-md-6">
                                    <FormControl.FormControlDatetime
                                        name="dtEarliestDeliveryTime"
                                        colspan="8"
                                        labelcolspan="4"
                                        readOnly={true}
                                        timeFormat={false}
                                        dateFormat="YYYY-MM-DD HH:mm"
                                        label="giao hàng từ"
                                        placeholder="Giao hàng từ"
                                        controltype="InputControl"
                                        value=""
                                        validatonList={["required"]}
                                        datasourcemember="EarliestDeliveryTime" />
                                </div>
                                <div className="col-md-6">
                                    <FormControl.FormControlDatetime
                                        name="dtLatestDeliveryTime"
                                        colspan="8"
                                        labelcolspan="4"
                                        readOnly={true}
                                        timeFormat={false}
                                        dateFormat="YYYY-MM-DD HH:mm"
                                        label="đến"
                                        placeholder="Đế"
                                        controltype="InputControl"
                                        value=""
                                        validatonList={["required"]}
                                        datasourcemember="LatestDeliveryTime" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-title">
                            <h4 className="title">Địa chỉ</h4>
                        </div>
                        <div className="card-body">
                            <div className="card">
                                <div className="card-title">
                                    <h4 className="title">Ngưởi gửi</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <FormControl.FormControlComboBox
                                                name="cbSenderPartnerID"
                                                colspan="8"
                                                labelcolspan="4"
                                                label="đối tác gửi"
                                                placeholder="---Vui lòng chọn---"
                                                validatonList={["Comborequired"]}
                                                isautoloaditemfromcache={true}
                                                loaditemcachekeyid="ERPCOMMONCACHE.PARTNER"
                                                valuemember="PartnerID"
                                                nameMember="PartnerName"
                                                controltype="InputControl"
                                                value={""}
                                                listoption={null}
                                                datasourcemember="SenderPartnerID" />
                                        </div>
                                        <div className="col-md-6">
                                            <FormControl.FormControlComboBox
                                                name="cbSenderStoreID"
                                                colspan="8"
                                                labelcolspan="4"
                                                label="kho gửi hàng"
                                                placeholder="---Vui lòng chọn---"
                                                validatonList={["Comborequired"]}
                                                isautoloaditemfromcache={true}
                                                loaditemcachekeyid="ERPCOMMONCACHE.STORE"
                                                valuemember="StoreID"
                                                nameMember="StoreName"
                                                controltype="InputControl"
                                                value={""}
                                                listoption={null}
                                                datasourcemember="SenderStoreID" />
                                        </div>
                                        <div className="col-md-6">
                                            <FormControl.TextBox
                                                name="txtSenderFullName"
                                                colspan="8"
                                                labelcolspan="4"
                                                readOnly={false}
                                                label="họ tên người gửi"
                                                placeholder="Họ tên người gửi"
                                                controltype="InputControl"
                                                value={""}
                                                validatonList={["required"]}
                                                datasourcemember="SenderFullName"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <FormControl.TextBox
                                                name="txtSenderPhoneNumber"
                                                colspan="8"
                                                labelcolspan="4"
                                                readOnly={false}
                                                label="số điện thoại"
                                                placeholder="Số điện thoại"
                                                controltype="InputControl"
                                                value={""}
                                                validatonList={["required"]}
                                                datasourcemember="SenderPhoneNumber"
                                            />
                                        </div>
                                        <div className="col-md-12">
                                            <FormControl.TextBox
                                                name="txtSenderEmail"
                                                colspan="10"
                                                labelcolspan="2"
                                                readOnly={false}
                                                label="địa chỉ email"
                                                placeholder="Địa chỉ email"
                                                controltype="InputControl"
                                                value={""}
                                                datasourcemember="SenderEmail"
                                                classNameCustom="customcontrol"
                                            />
                                        </div>
                                        <FormControl.ComboboxQTQHPX
                                            name="objSenderQHPX"
                                            controltype="InputControlNew"
                                            listelement={ElementSenderQHPXList}
                                            dataSource={this.state.DataSource}
                                            MLObjectDefinition={GridMLSenderQTQHPX}
                                        />
                                    </div>

                                </div>
                            </div>
                            <div className="card">
                                <div className="card-title">
                                    <h4 className="title">Ngưởi nhận</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <FormControl.FormControlComboBox
                                                name="cbReceiverPartnerID"
                                                colspan="8"
                                                labelcolspan="4"
                                                label="đối tác nhận"
                                                placeholder="---Vui lòng chọn---"
                                                isautoloaditemfromcache={true}
                                                loaditemcachekeyid="ERPCOMMONCACHE.PARTNER"
                                                valuemember="PartnerID"
                                                nameMember="PartnerName"
                                                controltype="InputControl"
                                                value={""}
                                                listoption={null}
                                                datasourcemember="ReceiverPartnerID" />
                                        </div>
                                        <div className="col-md-6">
                                            <FormControl.FormControlComboBox
                                                name="cbReceiverStoreID"
                                                colspan="8"
                                                labelcolspan="4"
                                                label="kho nhận"
                                                placeholder="---Vui lòng chọn---"
                                                isautoloaditemfromcache={true}
                                                loaditemcachekeyid="ERPCOMMONCACHE.PARTNER"
                                                valuemember="PartnerID"
                                                nameMember="PartnerName"
                                                controltype="InputControl"
                                                value={""}
                                                listoption={null}
                                                datasourcemember="ReceiverStoreID" />
                                        </div>
                                        <div className="col-md-6">
                                            <FormControl.TextBox
                                                name="txtReceiverFullName"
                                                colspan="8"
                                                labelcolspan="4"
                                                readOnly={false}
                                                label="họ tên người nhận"
                                                placeholder="Họ tên người nhận"
                                                controltype="InputControl"
                                                value={""}
                                                validatonList={["required"]}
                                                datasourcemember="ReceiverFullName"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <FormControl.TextBox
                                                name="txtReceiverPhoneNumber"
                                                colspan="8"
                                                labelcolspan="4"
                                                readOnly={false}
                                                label="số điện thoại"
                                                placeholder="Số điện thoại"
                                                controltype="InputControl"
                                                value={""}
                                                validatonList={["required"]}
                                                datasourcemember="ReceiverPhoneNumber"
                                            />
                                        </div>
                                        <div className="col-md-12">
                                            <FormControl.TextBox
                                                name="txtReceiverEmail"
                                                colspan="10"
                                                labelcolspan="2"
                                                readOnly={false}
                                                label="địa chỉ email"
                                                placeholder="Địa chỉ email"
                                                controltype="InputControl"
                                                value={""}
                                                datasourcemember="ReceiverEmail"
                                                classNameCustom="customcontrol"
                                            />
                                        </div>
                                        <FormControl.ComboboxQTQHPX
                                            name="objQHPX"
                                            controltype="InputControlNew"
                                            listelement={ElementQHPXList}
                                            dataSource={this.state.DataSource}
                                            MLObjectDefinition={GridMLObjectQTQHPX}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-title">
                            <h4 className="title">Thông tin hàng hóa</h4>
                        </div>
                        <div className="card-body">
                            <div className="card">
                                <div className="card-title">
                                    <h4 className="title">Hàng vận chuyển</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <FormControl.FormControlComboBox
                                                name="cbShipmentGoodsTypeID"
                                                colspan="8"
                                                labelcolspan="4"
                                                label="loại hàng"
                                                placeholder="---Vui lòng chọn---"
                                                validatonList={["Comborequired"]}
                                                isautoloaditemfromcache={true}
                                                loaditemcachekeyid="ERPCOMMONCACHE.SHIPMENTGOODSTYPE"
                                                valuemember="ShipmentGoodsTypeID"
                                                nameMember="ShipmentGoodsTypeName"
                                                controltype="InputControl"
                                                value={""}
                                                listoption={null}
                                                datasourcemember="ShipmentGoodsTypeID" />
                                        </div>

                                        <div className="col-md-6">
                                            <FormControl.TextBox
                                                name="txtNumberOfPackages"
                                                colspan="8"
                                                labelcolspan="4"
                                                readOnly={false}
                                                label="số kiện"
                                                placeholder="Số kiện"
                                                controltype="InputControl"
                                                value={""}
                                                datasourcemember="NumberOfPackages"
                                                validatonList={["numbernew"]}
                                                maxSize="4"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <FormControl.TextBox
                                                name="txtSecondaryItemCount"
                                                colspan="8"
                                                labelcolspan="4"
                                                readOnly={true}
                                                label="số sản phẩm"
                                                placeholder="Số sản phẩm"
                                                controltype="InputControl"
                                                value={""}
                                                datasourcemember="SecondaryItemCount"
                                                validatonList={["numbernew"]}
                                                maxSize="4"
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <FormControl.TextBox
                                                name="txtWeight"
                                                colspan="8"
                                                labelcolspan="4"
                                                readOnly={true}
                                                label="khối lượng"
                                                placeholder="Khối lượng"
                                                controltype="InputControl"
                                                value={""}
                                                datasourcemember="Weight"
                                                validatonList={["number"]}
                                                maxSize="9"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-row ">
                                                <div className="form-group col-md-4">
                                                    <label className="col-form-label">Kích thước(DxRxC)</label>
                                                </div>
                                                <div className="form-group col-md-8">
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <FormControl.TextBox
                                                                name="txtLength"
                                                                colspan="12"
                                                                labelcolspan="4"
                                                                readOnly={false}
                                                                label=""
                                                                placeholder="Kích thước(Dx)"
                                                                controltype="InputControl"
                                                                value={""}
                                                                datasourcemember="Length"
                                                            />
                                                        </div>
                                                        <div className="col-md-4">
                                                            <FormControl.TextBox
                                                                name="txtWidth"
                                                                colspan="12"
                                                                labelcolspan="4"
                                                                readOnly={false}
                                                                label=""
                                                                placeholder="Kích thước(R)"
                                                                controltype="InputControl"
                                                                value={""}
                                                                datasourcemember="Width"
                                                            />
                                                        </div>
                                                        <div className="col-md-4">
                                                            <FormControl.TextBox
                                                                name="txtHeight"
                                                                colspan="12"
                                                                labelcolspan="4"
                                                                readOnly={false}
                                                                label=""
                                                                placeholder="Kích thước(C)"
                                                                controltype="InputControl"
                                                                value={""}
                                                                datasourcemember="Height"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                        <div className="col-md-6">
                                            <FormControl.FormControlComboBox
                                                name="cbShipmentFeePaymentMethodID"
                                                colspan="8"
                                                labelcolspan="4"
                                                label="phương thức thanh toán phí dịch vụ vc"
                                                placeholder="---Vui lòng chọn---"
                                                validatonList={["Comborequired"]}
                                                isautoloaditemfromcache={true}
                                                loaditemcachekeyid="ERPCOMMONCACHE.SHIPMENTFEEPAYMENTMETHOD"
                                                valuemember="ShiPmentFeePaymentMethodID"
                                                nameMember="ShiPmentFeePaymentMethodName"
                                                controltype="InputControl"
                                                value={""}
                                                listoption={null}
                                                datasourcemember="ShipmentFeePaymentMethodID" />
                                        </div>
                                        <div className="col-md-6">
                                            <FormControl.TextBox
                                                name="txtTotalShipmentFee"
                                                colspan="8"
                                                labelcolspan="4"
                                                readOnly={false}
                                                label="phí vận chuyển"
                                                placeholder="Phí vận chuyển"
                                                controltype="InputControl"
                                                value={""}
                                                datasourcemember="TotalShipmentFee"
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <FormControl.TextBoxCurrency
                                                name="txtTotalCOD"
                                                colspan="8"
                                                labelcolspan="4"
                                                readOnly={false}
                                                label="tiền COD"
                                                placeholder="Tiền COD"
                                                controltype="InputControl"
                                                value={""}
                                                datasourcemember="TotalCOD"
                                            />
                                        </div>
                                        <div className="col-md-12">
                                            <FormControl.TextBox
                                                name="txtOrderNote"
                                                colspan="10"
                                                labelcolspan="2"
                                                readOnly={false}
                                                label="mô tả"
                                                placeholder="Mô tả"
                                                controltype="InputControl"
                                                value={""}
                                                datasourcemember="OrderNote"
                                                classNameCustom="customcontrol"
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <InputGridControl
                                name="ShipmentOrder_ItemList"
                                controltype="InputGridControl"
                                title="Danh sách hàng hóa"
                                IDSelectColumnName={"ProductID"}
                                listColumn={DataGridColumnItemList}
                                dataSource={this.state.DataSource.ShipmentOrder_ItemList}
                                onInsertClick={this.handleItemInsert}
                                onEditClick={this.handleItemEdit}
                                onDeleteClick={this.handleItemDelete}
                            />
                            <InputGridControl
                                name="ShipmentOrder_MaterialList"
                                controltype="InputGridControl"
                                title="Vật tư lắp đặt"
                                Ispopup={true}
                                IDSelectColumnName={"ProductID"}
                                MLObjectDefinition={GridMLMaterialDefinition}
                                listColumn={DataGridColumnMaterialList}
                                dataSource={this.state.DataSource.ShipmentOrder_MaterialList}
                            />
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-title">
                            <h4 className="title">Điều phối</h4>
                        </div>
                        <div className="card-body">
                            <MultiUserComboBox
                                name="ShipmentOrder_DeliverUserList"
                                colspan="10"
                                labelcolspan="2"
                                label="Nhân viên  giao"
                                IsLabelDiv={true}
                                controltype="InputMultiControl"
                                MLObjectDefinition={GridMLDeliverUserDefinition}
                                datasourcemember="ShipmentOrder_DeliverUserList"
                            />
{/* 
                            <ProductComboBox
                                name="Product"
                                colspan="10"
                                labelcolspan="2"
                                label="Mã sản phẩm"
                                IsLabelDiv={true}
                                controltype="InputMultiControl"
                                MLObjectDefinition={GridMLDeliverUserDefinition}
                                datasourcemember="Product"
                            /> */}
                            <FormControl.TextBox
                                name="txtCoordinatorNote"
                                colspan="10"
                                labelcolspan="2"
                                readOnly={false}
                                label="ghi chú"
                                placeholder="Ghi chú"
                                controltype="InputControl"
                                value={""}
                                datasourcemember="CoordinatorNote"
                            />
                        </div>
                    </div>
                </FormContainer >
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
        callGetCache: cacheKeyID => {
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

const Edit = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditCom);
export default Edit;
