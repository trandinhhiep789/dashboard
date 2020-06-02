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
    InputLanguageColumnList,
    GridMLObjectDefinition,
    AddLogAPIPath,
    ElementQHPXList,
    GridMLObjectQTQHPX,
    DataGridColumnItemList
} from "../constants";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { BRAND_UPDATE } from "../../../../constants/functionLists";
import { callGetCache } from "../../../../actions/cacheAction";
import indexedDBLib from "../../../../common/library/indexedDBLib.js";
import { CACHE_OBJECT_STORENAME } from "../../../../constants/systemVars.js";
import MultiSelectComboBox from "../../../../common/components/FormContainer/FormControl/MultiSelectComboBox";
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

    handleItemInsert() {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Cập nhật danh sách hàng hóa',
            content: {
                text: <ShipmentOrderItemObj></ShipmentOrderItemObj>
            },
            maxWidth: '1000px'
        });
    }

 


    handleSubmit(formData, MLObject) {
        let ResultLanguage = this.state.ResultLanguage.filter(x => x.HasChanged == true && x.BrandName !== null);
        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.ResultLanguage = ResultLanguage;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;

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
                >
                    <div className="card">
                        <div className="card-title">
                            <h4 className="title">Thông tin chung</h4>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <FormControl.TextBox
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
                                    <FormControl.ComboBox
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
                                    <FormControl.ComboBox
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
                                    <FormControl.ComboBox
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
                                    <FormControl.ComboBox
                                        name="txtShipmentGoodsTypeID"
                                        colspan="8"
                                        labelcolspan="4"
                                        label="loại dịch vụ"
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
                                    <FormControl.ComboBox
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
                                    <FormControl.ElementDatetime
                                        name="dtCreatedOrderTime"
                                        colspan="8"
                                        labelcolspan="4"
                                        readOnly={true}
                                        timeFormat={false}
                                        dateFormat="DD/MM/YYYY"
                                        label="ngày tạo yêu cầu"
                                        placeholder="Ngày tạo yêu cầu"
                                        controltype="InputControl"
                                        value=""
                                        validatonList={["required"]}
                                        datasourcemember="CreatedOrderTime"
                                    />
                                </div>

                                <div className="col-md-6">
                                    <FormControl.ElementDatetime
                                        name="dtExpectedDeliveryDate"
                                        colspan="8"
                                        labelcolspan="4"
                                        readOnly={true}
                                        timeFormat={false}
                                        dateFormat="DD/MM/YYYY"
                                        label="thời gian giao hàng"
                                        placeholder="Thời gian giao hàng"
                                        controltype="InputControl"
                                        value=""
                                        validatonList={["required"]}
                                        datasourcemember="ExpectedDeliveryDate" />

                                </div>
                                <div className="col-md-6">
                                    <FormControl.ElementDatetime
                                        name="dtEarliestPickUpTime"
                                        colspan="8"
                                        labelcolspan="4"
                                        readOnly={true}
                                        timeFormat={false}
                                        dateFormat="DD/MM/YYYY"
                                        label="lấy hàng từ"
                                        placeholder="Lấy hàng từ"
                                        controltype="InputControl"
                                        value=""
                                        validatonList={["required"]}
                                        datasourcemember="EarliestPickUpTime" />
                                </div>
                                <div className="col-md-6">
                                    <FormControl.ElementDatetime
                                        name="dtLatestPickUpTime"
                                        colspan="8"
                                        labelcolspan="4"
                                        readOnly={true}
                                        timeFormat={false}
                                        dateFormat="DD/MM/YYYY"
                                        label="đến"
                                        placeholder="Đến"
                                        controltype="InputControl"
                                        value=""
                                        validatonList={["required"]}
                                        datasourcemember="LatestPickUpTime" />
                                </div>
                                <div className="col-md-6">
                                    <FormControl.ElementDatetime
                                        name="dtEarliestDeliveryTime"
                                        colspan="8"
                                        labelcolspan="4"
                                        readOnly={true}
                                        timeFormat={false}
                                        dateFormat="DD/MM/YYYY"
                                        label="giao hàng từ"
                                        placeholder="Giao hàng từ"
                                        controltype="InputControl"
                                        value=""
                                        validatonList={["required"]}
                                        datasourcemember="EarliestDeliveryTime" />
                                </div>
                                <div className="col-md-6">
                                    <FormControl.ElementDatetime
                                        name="dtLatestDeliveryTime"
                                        colspan="8"
                                        labelcolspan="4"
                                        readOnly={true}
                                        timeFormat={false}
                                        dateFormat="DD/MM/YYYY"
                                        label="đến"
                                        placeholder="Đế"
                                        controltype="InputControl"
                                        value=""
                                        validatonList={["required"]}
                                        datasourcemember="LatestDeliveryTime" />
                                </div>

                                {/* <FormControl.ComboboxQTQHPX
                                    name="objQHPX"
                                    controltype="InputControlNew"
                                    listelement={ElementQHPXList}
                                    dataSource={this.state.DataSource}
                                    MLObjectDefinition={GridMLObjectQTQHPX}
                                /> */}
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
                                            <FormControl.ComboBox
                                                name="cbSenderPartnerID"
                                                colspan="8"
                                                labelcolspan="4"
                                                label="đối tác gửi"
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
                                            <FormControl.ComboBox
                                                name="cbSenderStoreID"
                                                colspan="8"
                                                labelcolspan="4"
                                                label="kho gửi hàng"
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
                                            name="objQHPX"
                                            controltype="InputControlNew"
                                            listelement={ElementQHPXList}
                                            dataSource={this.state.DataSource}
                                            MLObjectDefinition={GridMLObjectQTQHPX}
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
                                            <FormControl.ComboBox
                                                name="cbReceiverPartnerID"
                                                colspan="8"
                                                labelcolspan="4"
                                                label="đối tác nhận"
                                                validatonList={["Comborequired"]}
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
                                            <FormControl.ComboBox
                                                name="cbReceiverStoreID"
                                                colspan="8"
                                                labelcolspan="4"
                                                label="kho nhận"
                                                validatonList={["Comborequired"]}
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
                                            <FormControl.ComboBox
                                                name="cbShipmentGoodsTypeID"
                                                colspan="8"
                                                labelcolspan="4"
                                                label="loại hàng"
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
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <FormControl.TextBox
                                                name=""
                                                colspan="8"
                                                labelcolspan="4"
                                                readOnly={true}
                                                label="kích thước(DxRxC)"
                                                placeholder="Kích thước(DxRxC)"
                                                controltype="InputControl"
                                                value={""}
                                                datasourcemember=""
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <FormControl.ComboBox
                                                name="cbShipmentFeePaymentMethodID"
                                                colspan="8"
                                                labelcolspan="4"
                                                label="phương thức thanh toán phí dịch vụ vc"
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
                                            <FormControl.TextBox
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
                            />

                            <div className="card">
                                <div className="card-title">
                                    <h4 className="title">Vật tư lắp đặt</h4>
                                    <button className="btn btnEditCard">thêm vật tư</button>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                            <thead className="thead-light">
                                                <tr>
                                                    <th className="jsgrid-header-cell">Xuất bán</th>
                                                    <th className="jsgrid-header-cell">Mã sản phẩm</th>
                                                    <th className="jsgrid-header-cell">Tên sản phẩm</th>
                                                    <th className="jsgrid-header-cell">Số lượng</th>
                                                    <th className="jsgrid-header-cell">Đơn vị tính</th>
                                                    <th className="jsgrid-header-cell">Giá</th>
                                                    <th className="jsgrid-header-cell">Mã đơn hàng xuất</th>
                                                    <th className="jsgrid-header-cell">Tác vụ</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div className="checkbox">
                                                            <label>
                                                                <input type="checkbox" className="form-control form-control-sm" defaultChecked />
                                                                <span className="cr">
                                                                    <i className="cr-icon fa fa-check"></i>
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td></td>
                                                    <td>Ống đồng</td>
                                                    <td>5</td>
                                                    <td>Mét</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td className="table-actions">
                                                        <a className="table-action hover-primary" href="#">
                                                            <i className="ti-pencil"></i>
                                                        </a>
                                                        <a className="table-action hover-danger" href="#">
                                                            <i className="ti-trash"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="checkbox">
                                                            <label>
                                                                <input type="checkbox" className="form-control form-control-sm" defaultChecked />
                                                                <span className="cr">
                                                                    <i className="cr-icon fa fa-check"></i>
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td></td>
                                                    <td>Ống đồng</td>
                                                    <td>5</td>
                                                    <td>Mét</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td className="table-actions">
                                                        <a className="table-action hover-primary" href="#">
                                                            <i className="ti-pencil"></i>
                                                        </a>
                                                        <a className="table-action hover-danger" href="#">
                                                            <i className="ti-trash"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-title">
                            <h4 className="title">Điều phối</h4>
                        </div>
                        <div className="card-body">

                            <MultiSelectComboBox
                                name="ArryProduct_ShippingMethod"
                                colspan="10"
                                labelcolspan="2"
                                label="Nhân viên  giao"
                                IsLabelDiv={true}
                                isautoloaditemfromcache={false}
                                loaditemcachekeyid={"PIMCACHE_PIM_SHIPPINGMETHOD"}
                                valuemember="ShippingMethodID"
                                nameMember="ShippingMethodName"
                                controltype="InputControl"
                                value={[]}
                                ShipmentOrder={this.state.ShipmentOrder}
                                listoption={[]}
                                datasourcemember="ArryProduct_ShippingMethod"
                            />
                            <FormControl.TextBox
                                name=""
                                colspan="10"
                                labelcolspan="2"
                                readOnly={true}
                                label="ghi chú"
                                placeholder="Ghi chú"
                                controltype="InputControl"
                                value={""}
                                datasourcemember=""
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
        }
    };
};

const Edit = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditCom);
export default Edit;
