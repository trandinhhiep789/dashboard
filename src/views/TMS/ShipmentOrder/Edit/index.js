import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import FormContainer from "../../../../common/components/FormContainer";
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
    AddLogAPIPath
} from "../constants";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { BRAND_UPDATE } from "../../../../constants/functionLists";
import { callGetCache } from "../../../../actions/cacheAction";
import indexedDBLib from "../../../../common/library/indexedDBLib.js";
import { CACHE_OBJECT_STORENAME } from "../../../../constants/systemVars.js";
import MultiSelectComboBox from "../../../../common/components/FormContainer/FormControl/MultiSelectComboBox";

class EditCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleSelectedFile = this.handleSelectedFile.bind(this);
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
                                    <FormControl.ComboBox1
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
                                        value= {-1}
                                        listoption={null}
                                        datasourcemember="CarrierTypeID"
                                        placeholder="---Vui lòng chọn---"
                                        isMultiSelect={false}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <FormControl.ElementDatetime
                                        name="dtCreatedOrderTimeTo"
                                        colspan="8"
                                        labelcolspan="4"
                                        readOnly={true}
                                        timeFormat={false}
                                        dateFormat="DD/MM/YYYY"
                                        label="ngày tạo yêu cầu"
                                        placeholder="Ngày tạo yêu cầu"
                                        controltype="InputControl"
                                        value={""}
                                        datasourcemember="CreatedOrderTimeTo"

                                    />
                                </div>
                                <div className="col-md-6">
                                    <FormControl.TextBox
                                        name=""
                                        colspan="8"
                                        labelcolspan="4"
                                        readOnly={true}
                                        label="thời gian giao hàng"
                                        placeholder="Thời gian giao hàng"
                                        controltype="InputControl"
                                        value={""}
                                        datasourcemember=""
                                    />
                                </div>
                                <div className="col-md-6">
                                    <FormControl.TextBox
                                        name=""
                                        colspan="8"
                                        labelcolspan="4"
                                        readOnly={true}
                                        label="lấy hàng từ"
                                        placeholder="Lấy hàng từ"
                                        controltype="InputControl"
                                        value={""}
                                        datasourcemember=""
                                    />
                                </div>
                                <div className="col-md-6">
                                    <FormControl.TextBox
                                        name=""
                                        colspan="8"
                                        labelcolspan="4"
                                        readOnly={true}
                                        label="đến"
                                        placeholder="Đến"
                                        controltype="InputControl"
                                        value={""}
                                        datasourcemember=""
                                    />
                                </div>
                                <div className="col-md-6">
                                    <FormControl.TextBox
                                        name=""
                                        colspan="8"
                                        labelcolspan="4"
                                        readOnly={true}
                                        label="giao hàng từ"
                                        placeholder="Giao hàng từ"
                                        controltype="InputControl"
                                        value={""}
                                        datasourcemember=""
                                    />
                                </div>
                                <div className="col-md-6">
                                    <FormControl.TextBox
                                        name=""
                                        colspan="8"
                                        labelcolspan="4"
                                        readOnly={true}
                                        label="đến"
                                        placeholder="Đến"
                                        controltype="InputControl"
                                        value={""}
                                        datasourcemember=""
                                    />
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
                                            <FormControl.TextBox
                                                name=""
                                                colspan="8"
                                                labelcolspan="4"
                                                readOnly={true}
                                                label="đối tác gửi"
                                                placeholder="Đối tác gửi"
                                                controltype="InputControl"
                                                value={""}
                                                datasourcemember=""
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <FormControl.TextBox
                                                name=""
                                                colspan="8"
                                                labelcolspan="4"
                                                readOnly={true}
                                                label="kho gửi"
                                                placeholder="Kho gửi"
                                                controltype="InputControl"
                                                value={""}
                                                datasourcemember=""
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <FormControl.TextBox
                                                name=""
                                                colspan="8"
                                                labelcolspan="4"
                                                readOnly={true}
                                                label="họ tên người gửi"
                                                placeholder="Họ tên người gửi"
                                                controltype="InputControl"
                                                value={""}
                                                datasourcemember=""
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <FormControl.TextBox
                                                name=""
                                                colspan="8"
                                                labelcolspan="4"
                                                readOnly={true}
                                                label="số điện thoại"
                                                placeholder="Số điện thoại"
                                                controltype="InputControl"
                                                value={""}
                                                datasourcemember=""
                                            />
                                        </div>
                                        <div className="col-md-12">
                                            <FormControl.TextBox
                                                name=""
                                                colspan="10"
                                                labelcolspan="2"
                                                readOnly={true}
                                                label="địa chỉ email"
                                                placeholder="Địa chỉ email"
                                                controltype="InputControl"
                                                value={""}
                                                datasourcemember=""
                                                classNameCustom="customcontrol"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <FormControl.TextBox
                                                name=""
                                                colspan="8"
                                                labelcolspan="4"
                                                readOnly={true}
                                                label="tỉnh/thành phố"
                                                placeholder="Tỉnh/thành phố"
                                                controltype="InputControl"
                                                value={""}
                                                datasourcemember=""
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <FormControl.TextBox
                                                name=""
                                                colspan="8"
                                                labelcolspan="4"
                                                readOnly={true}
                                                label="quận/huyện"
                                                placeholder="Quận/huyện"
                                                controltype="InputControl"
                                                value={""}
                                                datasourcemember=""
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <FormControl.TextBox
                                                name=""
                                                colspan="8"
                                                labelcolspan="4"
                                                readOnly={true}
                                                label="phường/xã"
                                                placeholder="Phường/xã"
                                                controltype="InputControl"
                                                value={""}
                                                datasourcemember=""
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <FormControl.TextBox
                                                name=""
                                                colspan="8"
                                                labelcolspan="4"
                                                readOnly={true}
                                                label="số nhà/đường"
                                                placeholder="Số nhà/đường"
                                                controltype="InputControl"
                                                value={""}
                                                datasourcemember=""
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <FormControl.TextBox
                                                name=""
                                                colspan="8"
                                                labelcolspan="4"
                                                readOnly={true}
                                                label="địa chỉ đầy đủ"
                                                placeholder="Địa chỉ đầy đủ"
                                                controltype="InputControl"
                                                value={""}
                                                datasourcemember=""
                                            />
                                        </div>
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
                                            <FormControl.TextBox
                                                name=""
                                                colspan="8"
                                                labelcolspan="4"
                                                readOnly={true}
                                                label="đối tác nhận"
                                                placeholder="Đối tác nhận"
                                                controltype="InputControl"
                                                value={""}
                                                datasourcemember=""
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <FormControl.TextBox
                                                name=""
                                                colspan="8"
                                                labelcolspan="4"
                                                readOnly={true}
                                                label="kho nhận"
                                                placeholder="Kho nhận"
                                                controltype="InputControl"
                                                value={""}
                                                datasourcemember=""
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <FormControl.TextBox
                                                name=""
                                                colspan="8"
                                                labelcolspan="4"
                                                readOnly={true}
                                                label="họ tên người nhận"
                                                placeholder="Họ tên người nhận"
                                                controltype="InputControl"
                                                value={""}
                                                datasourcemember=""
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <FormControl.TextBox
                                                name=""
                                                colspan="8"
                                                labelcolspan="4"
                                                readOnly={true}
                                                label="số điện thoại"
                                                placeholder="Số điện thoại"
                                                controltype="InputControl"
                                                value={""}
                                                datasourcemember=""
                                            />
                                        </div>
                                        <div className="col-md-12">
                                            <FormControl.TextBox
                                                name=""
                                                colspan="10"
                                                labelcolspan="2"
                                                readOnly={true}
                                                label="địa chỉ email"
                                                placeholder="Địa chỉ email"
                                                controltype="InputControl"
                                                value={""}
                                                datasourcemember=""
                                                classNameCustom="customcontrol"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <FormControl.TextBox
                                                name=""
                                                colspan="8"
                                                labelcolspan="4"
                                                readOnly={true}
                                                label="tỉnh/thành phố"
                                                placeholder="Tỉnh/thành phố"
                                                controltype="InputControl"
                                                value={""}
                                                datasourcemember=""
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <FormControl.TextBox
                                                name=""
                                                colspan="8"
                                                labelcolspan="4"
                                                readOnly={true}
                                                label="quận/huyện"
                                                placeholder="Quận/huyện"
                                                controltype="InputControl"
                                                value={""}
                                                datasourcemember=""
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <FormControl.TextBox
                                                name=""
                                                colspan="8"
                                                labelcolspan="4"
                                                readOnly={true}
                                                label="phường/xã"
                                                placeholder="Phường/xã"
                                                controltype="InputControl"
                                                value={""}
                                                datasourcemember=""
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <FormControl.TextBox
                                                name=""
                                                colspan="8"
                                                labelcolspan="4"
                                                readOnly={true}
                                                label="số nhà/đường"
                                                placeholder="Số nhà/đường"
                                                controltype="InputControl"
                                                value={""}
                                                datasourcemember=""
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <FormControl.TextBox
                                                name=""
                                                colspan="8"
                                                labelcolspan="4"
                                                readOnly={true}
                                                label="địa chỉ đầy đủ"
                                                placeholder="Địa chỉ đầy đủ"
                                                controltype="InputControl"
                                                value={""}
                                                datasourcemember=""
                                            />
                                        </div>
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
                                            <FormControl.TextBox
                                                name=""
                                                colspan="8"
                                                labelcolspan="4"
                                                readOnly={false}
                                                label="Loại hàng"
                                                placeholder="Loại hàng"
                                                controltype="InputControl"
                                                value={""}
                                                datasourcemember=""
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <FormControl.TextBox
                                                name=""
                                                colspan="8"
                                                labelcolspan="4"
                                                readOnly={true}
                                                label="mô tả"
                                                placeholder="Mô tả"
                                                controltype="InputControl"
                                                value={""}
                                                datasourcemember=""
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <FormControl.TextBox
                                                name=""
                                                colspan="8"
                                                labelcolspan="4"
                                                readOnly={true}
                                                label="số kiện"
                                                placeholder="Số kiện"
                                                controltype="InputControl"
                                                value={""}
                                                datasourcemember=""
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <FormControl.TextBox
                                                name=""
                                                colspan="8"
                                                labelcolspan="4"
                                                readOnly={true}
                                                label="số sản phẩm"
                                                placeholder="Số sản phẩm"
                                                controltype="InputControl"
                                                value={""}
                                                datasourcemember=""
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <FormControl.TextBox
                                                name=""
                                                colspan="8"
                                                labelcolspan="4"
                                                readOnly={true}
                                                label="khối lượng"
                                                placeholder="Khối lượng"
                                                controltype="InputControl"
                                                value={""}
                                                datasourcemember=""
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
                                            <FormControl.TextBox
                                                name=""
                                                colspan="8"
                                                labelcolspan="4"
                                                readOnly={true}
                                                label="phương thức thanh toán phí dịch vụ vc"
                                                placeholder="Phương thức thanh toán phí dịch vụ vc"
                                                controltype="InputControl"
                                                value={""}
                                                datasourcemember=""
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <FormControl.TextBox
                                                name=""
                                                colspan="8"
                                                labelcolspan="4"
                                                readOnly={true}
                                                label="phí vận chuyển"
                                                placeholder="Phí vận chuyển"
                                                controltype="InputControl"
                                                value={""}
                                                datasourcemember=""
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <FormControl.CheckBox
                                                name=""
                                                colspan="8"
                                                labelcolspan="4"
                                                readOnly={true}
                                                label="có lắp đặt"
                                                placeholder="Có lắp đặt"
                                                controltype="InputControl"
                                                value={""}
                                                datasourcemember=""
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <FormControl.TextBox
                                                name=""
                                                colspan="8"
                                                labelcolspan="4"
                                                readOnly={true}
                                                label="tiền COD"
                                                placeholder="Tiền COD"
                                                controltype="InputControl"
                                                value={""}
                                                datasourcemember=""
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="card">
                                <div className="card-title">
                                    <h4 className="title">Danh sách hàng hóa</h4>
                                    <button className="btn btnEditCard">thêm hàng hóa</button>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                            <thead className="thead-light">
                                                <tr>
                                                    <th className="jsgrid-header-cell"></th>
                                                    <th className="jsgrid-header-cell">Sản phẩm</th>
                                                    <th className="jsgrid-header-cell">Kiện</th>
                                                    <th className="jsgrid-header-cell">Giá</th>
                                                    <th className="jsgrid-header-cell">Số lượng</th>
                                                    <th className="jsgrid-header-cell">Đơn vị tính</th>
                                                    <th className="jsgrid-header-cell">Kích thước</th>
                                                    <th className="jsgrid-header-cell">Khối lượng</th>
                                                    <th className="jsgrid-header-cell">Tác vụ</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                <tr>
                                                    <td>
                                                        <img src='/src/img/may-lanh-lg-v10enh-1-1-org.jpg' className="img-product" />
                                                    </td>
                                                    <td>Máy lạnh Panasonic Inverter 1 HP CU/CS-PU9WKH-8M</td>
                                                    <td>Mặc định</td>
                                                    <td>10,890,000</td>
                                                    <td>1</td>
                                                    <td>Cái</td>
                                                    <td>77.9 x 20.9 x 29 cm</td>
                                                    <td>8kg</td>
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
        }
    };
};

const Edit = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditCom);
export default Edit;
