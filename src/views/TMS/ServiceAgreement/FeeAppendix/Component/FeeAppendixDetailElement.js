import React, { Component } from "react";
import { connect } from 'react-redux';
import FormContainer from "../../../../../common/components/FormContainer";
import FormControl from "../../../../../common/components/FormContainer/FormControl";
import ProductComboBox from "../../../../../common/components/FormContainer/FormControl/MultiSelectComboBox/ProductComboBox.js";

import {
    APIHostName,
    LoadAPIPath,
    MLObjectFeeAppendixDetailItem,
    EditFeeAppendixDetailPath,
    AddFeeAppendixDetailPath
} from "../contants/index.js";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";

class FeeAppendixDetailElementCom extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {

        }
    }

    componentDidMount() {
        console.log("FeeAppendixDetailElementCom", this.props)
    }

    handleSubmit(From, MLObject) {

        MLObject.ServiceAgreementID = this.props.dataSource.ServiceAgreementID.trim();
        MLObject.FeeAppendixID = this.props.dataSource.FeeAppendixID.trim();
        MLObject.SignedDate = this.props.dataSource.SignedDate;
        MLObject.ApplyFromDate = this.props.dataSource.ApplyFromDate;
        MLObject.ProductID = MLObject.Product[0].ProductID;
        if (this.props.index != undefined) {
            MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
            this.props.callFetchAPI(APIHostName, EditFeeAppendixDetailPath, MLObject).then(apiResult => {
                this.props.onInputChangeObj(this.props.dataSource.FeeAppendixID, apiResult);
            });
        }
        else {
            MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
            this.props.callFetchAPI(APIHostName, AddFeeAppendixDetailPath, MLObject).then(apiResult => {
                this.props.onInputChangeObj(this.props.dataSource.FeeAppendixID, apiResult);
            });
        }
    }

    render() {

        return (
            <FormContainer
                MLObjectDefinition={MLObjectFeeAppendixDetailItem}
                dataSource={this.props.index != undefined ? this.props.dataSource.FeeAppendixDetail_ItemList[this.props.index] : null}
                listelement={[]}
                onSubmit={this.handleSubmit}
            >
                <div className="row">

                    <div className="col-md-6">
                        <FormControl.FormControlComboBox
                            name="cbMainGroupID"
                            colspan="9"
                            labelcolspan="3"
                            label="nghành hàng"
                            validatonList={["Comborequired"]}
                            isautoloaditemfromcache={true}
                            loaditemcachekeyid="ERPCOMMONCACHE.MAINGROUP"
                            valuemember="MainGroupID"
                            nameMember="MainGroupName"
                            controltype="InputControl"
                            value={-1}
                            listoption={[]}
                            datasourcemember="MainGroupID"
                            filterrest="cbSubGroupID"
                        />

                    </div>

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
                            filterName="cbMainGroupID"
                            filterValue=""
                            filterobj="MainGroupID"
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
                            datasourcemember="TechSpecsID"
                            filterrest="cbTechSpecsValueID"
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
                            filterName="cbTechSpecsID"
                            filterValue=""
                            filterobj="TechSpecsID"
                        />
                    </div>

                    <div className="col-md-6">
                        {/* <FormControl.FormControlTextBox
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
                        /> */}
                        <ProductComboBox
                            colspan="9"
                            labelcolspan="3"
                            label="sản phẩm"
                            placeholder="Tên sản phẩm"
                            controltype="InputControl"
                            datasourcemember="ProductID"
                            name="cbProductID"
                            validatonList={["required"]}
                            IsLabelDiv={true}
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
                        <FormControl.TextArea
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
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        }
    }
}


const FeeAppendixDetailElement = connect(mapStateToProps, mapDispatchToProps)(FeeAppendixDetailElementCom);
export default FeeAppendixDetailElement;