import React, { Component } from "react";
import { connect } from 'react-redux';
import FormContainer from "../../../../common/components/FormContainer";
import FormControl from "../../../../common/components/FormContainer/FormControl";

import {
    APIHostName,
    LoadAPIPath,
    MLObjectShipmentOrderItem
} from "../constants";
class ShipmentOrderItemObjCom extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        return (
            <FormContainer
                MLObjectDefinition={MLObjectShipmentOrderItem}
                dataSource={[]}
                listelement={[]}
            >
                <div className="row">
                    <div className="col-md-6">
                        <FormControl.TextBox
                            name="txtProductID"
                            colspan="9"
                            labelcolspan="3"
                            readOnly={false}
                            label="mã sản phẩm"
                            placeholder="Mã sản phẩm"
                            controltype="InputControl"
                            value=""
                            validatonList={["required"]}
                            datasourcemember="ProductID"
                        />
                    </div>

                    <div className="col-md-6">
                        <FormControl.TextBox
                            name="txtProductName"
                            colspan="9"
                            labelcolspan="3"
                            readOnly={false}
                            label="tên sản phẩm"
                            placeholder="Tên sản phẩm"
                            controltype="InputControl"
                            value=""
                            validatonList={["required"]}
                            datasourcemember="ProductName"
                        />
                    </div>

                    <div className="col-md-6">
                        <FormControl.ComboBox
                            name="cbShipmentOrderPackingUnitID"
                            colspan="9"
                            labelcolspan="3"
                            label="kiện hàng"
                            // validatonList={["Comborequired"]}
                            isautoloaditemfromcache={false}
                            loaditemcachekeyid="ERPCOMMONCACHE.SHIPMENTORDERTYPE"
                            valuemember="ShipmentOrderTypeID"
                            nameMember="ShipmentOrderTypeName"
                            controltype="InputControl"
                            value={-1}
                            listoption={[{ value: -1, label: "--vui lòng chọn--" }, { value: 1, label: "hoclenho" }]}
                            datasourcemember="ShipmentOrderPackingUnitID" />

                    </div>

                    <div className="col-md-6">
                        <FormControl.TextBoxCurrency
                            name="txtPrice"
                            colspan="9"
                            labelcolspan="3"
                            readOnly={false}
                            label="giá sản phẩm "
                            placeholder="Giá sản phẩm "
                            controltype="InputControl"
                            value=""
                            datasourcemember="Price"
                        />
                    </div>

                    <div className="col-md-6">
                        <FormControl.TextBox
                            name="txtQuantity"
                            colspan="9"
                            labelcolspan="3"
                            readOnly={false}
                            label="số lượng"
                            placeholder="Số lượng"
                            controltype="InputControl"
                            value=""
                            datasourcemember="Quantity"
                        />
                    </div>

                    <div className="col-md-6">
                        <FormControl.ComboBox
                            name="cbQuantityUnitID"
                            colspan="9"
                            labelcolspan="3"
                            label="đơn vị tính"
                            validatonList={["Comborequired"]}
                            isautoloaditemfromcache={true}
                            loaditemcachekeyid="ERPCOMMONCACHE.QUANTITYUNIT"
                            valuemember="QuantityUnitID"
                            nameMember="QuantityUnit"
                            controltype="InputControl"
                            value={""}
                            listoption={null}
                            datasourcemember="QuantityUnitID" />

                    </div>

                    <div className="col-md-6">
                        <div className="form-row ">
                            <div className="form-group col-md-3">
                                <label className="col-form-label">Kích thước (DxRxC)</label>
                            </div>
                            <div className="form-group col-md-9">
                                <div className="row">
                                    <div className="col-md-4">
                                        <FormControl.TextBox
                                            name="txtLength"
                                            colspan="12"
                                            labelcolspan="4"
                                            readOnly={false}
                                            label=""
                                            placeholder="Kích thước(D)"
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
                        <FormControl.CheckBox
                            name="ckIsInstallItem"
                            colspan="9"
                            labelcolspan="3"
                            readOnly={false}
                            label="Cần lắp đặt"
                            controltype="InputControl"
                            value=""
                            datasourcemember="IsInstallItem"
                            classNameCustom="customCheckbox"
                        />
                    </div>

                    {/* <div className="col-md-12">
                        <FormControl.TextBox
                            name="txtNote"
                            colspan="10"
                            labelcolspan="2"
                            readOnly={false}
                            label="Ghi chú"
                            controltype="InputControl"
                            value=""
                            datasourcemember="Note"
                            classNameCustom="customcontrol"
                        />
                    </div> */}

                    <div className="col-md-6">
                        <FormControl.TextBox
                            name="txtNote"
                            colspan="9"
                            labelcolspan="3"
                            readOnly={false}
                            label="Ghi chú"
                            controltype="InputControl"
                            value=""
                            datasourcemember="Note"
                            classNameCustom="customcontrol"
                        />
                    </div>
                    <div className="col-md-6">

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
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        }
    }
}


const ShipmentOrderItemObj = connect(mapStateToProps, mapDispatchToProps)(ShipmentOrderItemObjCom);
export default ShipmentOrderItemObj;