import React, { Component } from "react";
import { connect } from 'react-redux';
import FormContainer from "../../../../../common/components/FormContainer";
import FormControl from "../../../../../common/components/FormContainer/FormControl";

import {
    APIHostName,
    LoadAPIPath,
    MLObjectFeeAppendixDetailItem
} from "../contants/index.js";

class FeeAppendixDetailElementCom extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {

        }
    }

    componentDidMount(){
        console.log("FeeAppendixDetailElementCom", this.props)
    }

    handleSubmit(From, MLObject) {
        let newFeeAppendixDetail_ItemList= this.props.dataSource.FeeAppendixDetail_ItemList;
        let formDatanew = [];
        if (this.props.index != undefined) {
            formDatanew = Object.assign([], newFeeAppendixDetail_ItemList, { [this.props.index]: MLObject });
            if (this.props.onInputChangeObj != null) {
                this.props.onInputChangeObj(formDatanew);
            }
        }
        else {
            newFeeAppendixDetail_ItemList.push(MLObject)
            if (this.props.onInputChangeObj != null) {
                this.props.onInputChangeObj(newFeeAppendixDetail_ItemList);
            }
        }
    }

    render() {

        const AddElementList = [
            {
                type: "hidden",
                name: "QuantityUnitName",
                label: "",
                datasourcemember: "QuantityUnitName",
                DataSourceMember: "QuantityUnitName"
            },
            {
                type: "hidden",
                name: "PackingUnitName",
                label: "",
                datasourcemember: "PackingUnitName",
                DataSourceMember: "PackingUnitName"
            },
        ]
        return (
            <FormContainer
                MLObjectDefinition={MLObjectFeeAppendixDetailItem}
                dataSource={this.props.index != undefined ? this.props.dataSource.ShipmentOrder_ItemList[this.props.index] : null}
                listelement={AddElementList}
                onSubmit={this.handleSubmit}
            >
                <div className="row">

                    <div className="col-md-6">
                        <FormControl.FormControlComboBox
                            name="cbSubGroupID"
                            colspan="9"
                            labelcolspan="3"
                            label="nhóm hàng"
                            validatonList={["Comborequired"]}
                            isautoloaditemfromcache={true}
                            loaditemcachekeyid="ERPCOMMONCACHE.SUBGROUP"
                            valuemember="SubGroupID"
                            nameMember="SubGroupName"
                            controltype="InputControl"
                            value={-1}
                            listoption={[]}
                            datasourcemember="SubGroupID"
                        />

                    </div>

                    <div className="col-md-6">
                        <FormControl.FormControlComboBox
                            name="cbTechSpecsID"
                            colspan="9"
                            labelcolspan="3"
                            label="thông số kỹ thuật"
                            validatonList={["Comborequired"]}
                            isautoloaditemfromcache={true}
                            loaditemcachekeyid="ERPCOMMONCACHE.TECHSPECS"
                            valuemember="TechSpecsID"
                            nameMember="TechSpecsName"
                            controltype="InputControl"
                            value={-1}
                            listoption={[]}
                            namelabel="PackingUnitName"
                            datasourcemember="TechSpecsID"
                        />

                    </div>

                    <div className="col-md-6">
                        <FormControl.FormControlComboBox
                            name="cbTechSpecsValueID"
                            colspan="9"
                            labelcolspan="3"
                            label="giá trị"
                            validatonList={["Comborequired"]}
                            isautoloaditemfromcache={true}
                            loaditemcachekeyid="ERPCOMMONCACHE.TECHSPECSVALUE"
                            valuemember="TechSpecsValueID"
                            nameMember="Value"
                            controltype="InputControl"
                            value={-1}
                            listoption={[]}
                            datasourcemember="TechSpecsValueID"
                        />

                    </div>

                    <div className="col-md-6">
                        <FormControl.FormControlTextBox
                            name="txtProductID"
                            colspan="9"
                            labelcolspan="3"
                            readOnly={false}
                            label="sản phẩm"
                            placeholder="Tên sản phẩm"
                            controltype="InputControl"
                            value=""
                            validatonList={["required"]}
                            datasourcemember="ProductID"
                        />
                    </div>

                    <div className="col-md-6">
                        <FormControl.FormControlTextBox
                            name="txtServiceFee"
                            colspan="9"
                            labelcolspan="3"
                            readOnly={false}
                            label="giá dịch vụ"
                            placeholder="Giá dịch vụ"
                            controltype="InputControl"
                            value=""
                            validatonList={["required"]}
                            datasourcemember="ServiceFee"
                        />
                    </div>

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
                        <FormControl.CheckBox
                            name="ckIsActived"
                            colspan="9"
                            labelcolspan="3"
                            readOnly={false}
                            label="kích hoạt"
                            controltype="InputControl"
                            value=""
                            datasourcemember="IsActived"
                            classNameCustom="customCheckbox"
                        />
                    </div>
                    <div className="col-md-6">
                        <FormControl.CheckBox
                            name="ckIsSystem"
                            colspan="9"
                            labelcolspan="3"
                            readOnly={false}
                            label="hệ thống"
                            controltype="InputControl"
                            value=""
                            datasourcemember="IsSystem"
                            classNameCustom="customCheckbox"
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


const FeeAppendixDetailElement = connect(mapStateToProps, mapDispatchToProps)(FeeAppendixDetailElementCom);
export default FeeAppendixDetailElement;