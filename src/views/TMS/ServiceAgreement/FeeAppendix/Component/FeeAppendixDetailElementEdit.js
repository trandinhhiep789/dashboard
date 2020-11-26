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
            IsSystem: false,
            IsUpdateItem: false
        }
    }

    componentDidMount() {
        if (this.props.index != undefined) {
            this.setState({
                IsSystem: this.props.dataSource.FeeAppendixDetail_ItemList[this.props.index].IsSystem,
                IsUpdateItem: true
            })
        }
    }

    handleSubmit(From, MLObject) {
        MLObject.ServiceAgreementID = this.props.dataSource.ServiceAgreementID.trim();
        MLObject.FeeAppendixID = this.props.dataSource.FeeAppendixID.trim();
        MLObject.SignedDate = this.props.dataSource.SignedDate;
        MLObject.ApplyFromDate = this.props.dataSource.ApplyFromDate;
        // if(MLObject.ProductID !=undefined && MLObject.ProductID !="" ){
        //     MLObject.ProductID = MLObject.ProductID[0].ProductID;
        // }
        
        MLObject.ProductID = MLObject.ProductID && Array.isArray(MLObject.ProductID) ? MLObject.ProductID[0].ProductID : MLObject.ProductID;

        if (this.props.index != undefined) {
            MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
            MLObject.FeeAppendixDetailID =
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
        const { IsSystem, IsUpdateItem } = this.state;
        return (
            <FormContainer
                MLObjectDefinition={MLObjectFeeAppendixDetailItem}
                dataSource={this.props.index != undefined ? this.props.dataSource.FeeAppendixDetail_ItemList[this.props.index] : null}
                listelement={[]}
                onSubmit={this.handleSubmit}
                IsCloseModal={true}
            >
                <div className="row">

                    <div className="col-md-12">
                        <FormControl.FormControlTextBox
                            name="txtFeeAppendixDetailID"
                            colspan="9"
                            labelcolspan="3"
                            readOnly={true}
                            label="mã chi tiết biểu phí"
                            hidenControll={true}
                            placeholder="Mã chi tiết biểu phí tự động nhập"
                            controltype="InputControl"
                            value=""
                            datasourcemember="FeeAppendixDetailID"
                        />
                    </div>
                    <div className="col-md-6">
                        <FormControl.FormControlComboBox
                            name="cbMainGroupID"
                            colspan="9"
                            labelcolspan="3"
                            disabled={true}
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
                            filterrest="cbSubGroupID,cbTechSpecsValueID,cbTechSpecsID"
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
                            disabled={true}
                            listoption={[]}
                            datasourcemember="SubGroupID"
                            filterName="cbMainGroupID"
                            filterValue=""
                            filterobj="MainGroupID"
                            filterrest="cbTechSpecsValueID,cbTechSpecsID"
                        />

                    </div>

                    <div className="col-md-6">
                        <FormControl.FormControlComboBox
                            name="cbTechSpecsID"
                            colspan="9"
                            labelcolspan="3"
                            label="thông số kỹ thuật"
                            // validatonList={["Comborequired"]}
                            isautoloaditemfromcache={true}
                            loaditemcachekeyid="ERPCOMMONCACHE.SUBGROUPTECHSPECS"
                            valuemember="TechspecsID"
                            nameMember="TechspecsName"
                            controltype="InputControl"
                            value={-1}
                            disabled={true}
                            listoption={[]}
                            datasourcemember="TechspecsID"
                            filterobj="SubGroupID"
                            filterName="cbSubGroupID"
                            filterValue=''
                            filterrest="cbTechSpecsValueID"
                        />
                    </div>

                    <div className="col-md-6">
                        <FormControl.FormControlComboBox
                            name="cbTechSpecsValueID"
                            colspan="9"
                            labelcolspan="3"
                            label="giá trị"
                            // validatonList={["Comborequired"]}
                            isautoloaditemfromcache={true}
                            disabled={true}
                            loaditemcachekeyid="ERPCOMMONCACHE.TECHSPECSVALUE"
                            valuemember="TechSpecsValueID"
                            nameMember="Value"
                            controltype="InputControl"
                            value={-1}
                            listoption={[]}
                            datasourcemember="TechspecsValueID"
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
                            //validatonList={[]}
                            IsLabelDiv={true}
                            isMulti={false}
                            disabled={true}
                        />
                    </div>

                    <div className="col-md-6">
                        <FormControl.TextBoxCurrency
                            name="txtServiceFee"
                            colspan="9"
                            labelcolspan="3"
                            readOnly={IsSystem}
                            label="giá dịch vụ"
                            placeholder="Giá dịch vụ"
                            controltype="InputControl"
                            value=""
                            validatonList={["required"]}
                            datasourcemember="ServiceFee"
                            disabled={IsSystem}
                            maxSize={15}
                        />
                    </div>

                    <div className="col-md-6">
                        <FormControl.TextArea
                            name="txtNote"
                            colspan="9"
                            labelcolspan="3"
                            readOnly={IsSystem}
                            label="Ghi chú"
                            controltype="InputControl"
                            value=""
                            datasourcemember="Note"
                            classNameCustom="customcontrol"
                            disabled={IsSystem}
                        />
                    </div>
                    <div className="col-md-6">
                        <FormControl.CheckBox
                            name="ckIsActived"
                            colspan="9"
                            labelcolspan="3"
                            readOnly={IsSystem}
                            disabled={IsSystem}
                            label="kích hoạt"
                            controltype="InputControl"
                            value={true}
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
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        }
    }
}


const FeeAppendixDetailElement = connect(mapStateToProps, mapDispatchToProps)(FeeAppendixDetailElementCom);
export default FeeAppendixDetailElement;