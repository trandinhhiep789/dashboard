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
                            name="txtShipmentOrderID"
                            colspan="9"
                            labelcolspan="3"
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
                            colspan="9"
                            labelcolspan="3"
                            label="loại yêu cầu"
                            validatonList={["Comborequired"]}
                            isautoloaditemfromcache={true}
                            loaditemcachekeyid="ERPCOMMONCACHE.SHIPMENTORDERTYPE"
                            valuemember="ShipmentOrderTypeID"
                            nameMember="ShipmentOrderTypeName"
                            controltype="InputControl"
                            value={1}
                            listoption={null}
                            datasourcemember="ShipmentOrderTypeID" />

                    </div>
                </div>
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
                            value={1}
                            listoption={null}
                            datasourcemember="ShipmentOrderTypeID" />

                    </div>
                </div>
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
                            value={1}
                            listoption={null}
                            datasourcemember="ShipmentOrderTypeID" />

                    </div>
                </div>
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
                            value={1}
                            listoption={null}
                            datasourcemember="ShipmentOrderTypeID" />

                    </div>
                </div>
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
                            value={1}
                            listoption={null}
                            datasourcemember="ShipmentOrderTypeID" />

                    </div>
                </div>
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
                            value={1}
                            listoption={null}
                            datasourcemember="ShipmentOrderTypeID" />

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