import React, { Component } from "react";
import { connect } from 'react-redux';
import FormContainer from "../../../../../common/components/FormContainer";
import FormControl from "../../../../../common/components/FormContainer/FormControl";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";

import {
    LoadAPIPath,
    MLObjectAbilitiItem,
    EditAPIRPTDetailPath,
    APIHostName,
    AddAPIRPTDetailPath,
    MLObjectRPTDetailItem
} from "../RewardPriceTable/constants";
import { ERPCOMMONCACHE_SERVICESEASONTYPE, ERPCOMMONCACHE_SUBGROUP, ERPCOMMONCACHE_SUBGROUPTECHSPECS, ERPCOMMONCACHE_TECHSPECSVALUE } from "../../../../../constants/keyCache";
import ProductComboBox from "../../../../../common/components/FormContainer/FormControl/MultiSelectComboBox/ProductComboBox.js";

class RewardPriceTableDetailCom extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            IsSystem: false,
            IsUpdate: false,
            IsDisableTechspecsValue: true,
            IsDisableCbTechspecsValue: false,
            IsRequiredTechspecsValue: ''
        }

    }

    componentDidMount() {
        console.log(this.props.dataSource.RewardPriceTableDetailList[this.props.index])
        if (this.props.index != undefined) {
            if(this.props.dataSource.RewardPriceTableDetailList[this.props.index].IsPriceByTechspecsValueRange){
                this.setState({
                    IsDisableTechspecsValue: false
                })
            }
            else{
                this.setState({
                    IsDisableTechspecsValue: true
                })
            }
            this.setState({
                IsSystem: this.props.dataSource.RewardPriceTableDetailList[this.props.index].IsSystem,
                IsUpdate: true
            })
        }
    }

    handleSubmit(formData, MLObject) {
        console.log("From, MLObject",formData, MLObject)
        MLObject.RewardPriceTableID = this.props.dataSource.RewardPriceTableID;
        MLObject.ProductID = MLObject.ProductID && Array.isArray(MLObject.ProductID) ? MLObject.ProductID[0].ProductID : MLObject.ProductID;
        if (this.props.index != undefined) {
            this.props.callFetchAPI(APIHostName, EditAPIRPTDetailPath, MLObject).then(apiResult => {
                this.props.onInputChangeObj(this.props.dataSource.RewardPriceTableID, apiResult);
            });
        }
        else {
            this.props.callFetchAPI(APIHostName, AddAPIRPTDetailPath, MLObject).then(apiResult => {
                this.props.onInputChangeObj(this.props.dataSource.RewardPriceTableID, apiResult);
            });
        }
        // }


    }

    handleChange(formData, MLObject) {
        if (formData.ckIsPriceByTechspecsValueRange.value) {
            this.setState({
                IsDisableTechspecsValue: false,
            })
        }
        else {
            
            this.setState({
                IsDisableTechspecsValue: true,
            })
        }
        if(formData.cbProductID.value != undefined ){
            if(formData.cbProductID.value[0].ProductID != null){
                this.setState({
                    IsDisableCbTechspecsValue: true
                })
            }
            else{
                this.setState({
                    IsDisableCbTechspecsValue: false
                })
            }
        }
        else{
            this.setState({
                IsDisableCbTechspecsValue: false
            })
        }
    }


    render() {

        const { IsSystem, IsUpdate, IsDisableTechspecsValue, IsDisableCbTechspecsValue } = this.state;
        let isDisableCB = false;
        if(IsUpdate == false && IsDisableCbTechspecsValue == false){
            isDisableCB= false
        }
        else{
            isDisableCB= true
        }

        return (
            <FormContainer
                MLObjectDefinition={MLObjectRPTDetailItem}
                dataSource={this.props.index != undefined ? this.props.dataSource.RewardPriceTableDetailList[this.props.index] : null}
                listelement={[]}
                onSubmit={this.handleSubmit}
                IsCloseModal={true}
                onchange={this.handleChange.bind(this)}
            >

                <div className="row">
                    <div className="col-md-12">
                        <FormControl.FormControlTextBox
                            name="txtRewardPriceTableID"
                            colspan="9"
                            labelcolspan="3"
                            readOnly={true}
                            hidenControll={true}
                            label="mã đơn giá thưởng"
                            placeholder="Mã đơn giá thưởng tự động nhập"
                            controltype="InputControl"
                            value=""
                            datasourcemember="RewardPriceTableID"
                        />

                    </div>

                    <div className="col-md-6">
                        <FormControl.FormControlComboBox
                            name="cbSubGroup"
                            colspan="6"
                            labelcolspan="6"
                            label="nhóm hàng"
                            validatonList={["Comborequired"]}
                            isautoloaditemfromcache={true}
                            loaditemcachekeyid={ERPCOMMONCACHE_SUBGROUP} //"ERPCOMMONCACHE.SUBGROUP"
                            valuemember="SubGroupID"
                            nameMember="SubGroupName"
                            controltype="InputControl"
                            value={-1}
                            disabled={IsUpdate}
                            listoption={[]}
                            datasourcemember="SubGroupID"
                            filterrest="cbTechSpecsValue,cbTechSpecs"

                        />

                    </div>

                    <div className="col-md-6">
                        <FormControl.FormControlComboBox
                            name="cbTechSpecs"
                            colspan="6"
                            labelcolspan="6"
                            label="thông số kỹ thuật"
                            // validatonList={["Comborequired"]}
                            isautoloaditemfromcache={true}
                            loaditemcachekeyid={ERPCOMMONCACHE_SUBGROUPTECHSPECS} //"ERPCOMMONCACHE.SUBGROUPTECHSPECS"
                            valuemember="TechspecsID"
                            nameMember="TechspecsName"
                            controltype="InputControl"
                            value={-1}
                            disabled={isDisableCB}
                            listoption={[]}
                            datasourcemember="TechspecsID"
                            filterobj="SubGroupID"
                            filterName="cbSubGroup"
                            filterValue=''
                            filterrest="cbTechSpecsValue"
                        />
                    </div>

                    <div className="col-md-6">
                        <FormControl.FormControlComboBox
                            name="cbTechSpecsValue"
                            colspan="6"
                            labelcolspan="6"
                            label="giá trị"
                            // validatonList={["Comborequired"]}
                            isautoloaditemfromcache={true}
                            disabled={isDisableCB}
                            loaditemcachekeyid={ERPCOMMONCACHE_TECHSPECSVALUE}//"ERPCOMMONCACHE.TECHSPECSVALUE"
                            valuemember="TechSpecsValueID"
                            nameMember="Value"
                            controltype="InputControl"
                            value=""
                            placeholder="Chọn giá trị"
                            listoption={[]}
                            datasourcemember="TechspecsValueID"
                            filterName="cbTechSpecs"
                            filterValue=""
                            filterobj="TechSpecsID"
                            isMultiSelect={false}
                        />
                    </div>

                    <div className="col-md-6">
                        <FormControl.CheckBox
                            name="ckIsPriceByTechspecsValueRange"
                            colspan="3"
                            labelcolspan="9"
                            readOnly={false}
                            label="Giá theo khoảng giá trị thông số kỹ thuật"
                            controltype="InputControl"
                            value=""
                            datasourcemember="IsPriceByTechspecsValueRange"
                            classNameCustom="customCheckbox"
                        />
                    </div>

                    <div className="col-md-6">

                        <FormControl.TextBoxCurrency
                            name="txtFromTechspecsValue"
                            colspan="6"
                            labelcolspan="6"
                            readOnly={IsDisableTechspecsValue}
                            disabled={IsDisableTechspecsValue}
                            label="Giá trị thông số kỹ thuật từ"
                            placeholder="Giá trị thông số kỹ thuật từ"
                            controltype="InputControl"
                            value="0"
                            validatonList={["required"]}
                            datasourcemember="FromTechspecsValue"
                            maxSize={19}
                        />
                    </div>

                    <div className="col-md-6">
                        <FormControl.TextBoxCurrency
                            name="txtToTechspecsValue"
                            colspan="6"
                            labelcolspan="6"
                            readOnly={IsDisableTechspecsValue}
                            disabled={IsDisableTechspecsValue}
                            label="Giá trị thông số kỹ thuật đến"
                            placeholder="Giá trị thông số kỹ thuật đến"
                            controltype="InputControl"
                            value="0"
                            validatonList={["required"]}
                            datasourcemember="ToTechspecsValue"
                            maxSize={19}
                        />

                    </div>

                    <div className="col-md-6">
                        <ProductComboBox
                           colspan="6"
                           labelcolspan="6"
                            label="sản phẩm"
                            placeholder="Tên sản phẩm"
                            controltype="InputControl"
                            datasourcemember="ProductID"
                            name="cbProductID"
                            //validatonList={[]}
                            IsLabelDiv={true}
                            isMulti={false}
                            disabled={IsSystem}
                        />
                    </div>

                    <div className="col-md-6"></div>

                    <div className="col-md-6">

                        <FormControl.TextBoxCurrency
                            name="txtRewardPrice"
                            colspan="6"
                            labelcolspan="6"
                            readOnly={IsSystem}
                            disabled={IsSystem}
                            label="giá"
                            placeholder="Giá "
                            controltype="InputControl"
                            value="0"
                            validatonList={['required']}
                            datasourcemember="RewardPrice"
                            disabled={IsSystem}
                            maxSize={19}
                        />
                    </div>

                    <div className="col-md-6">
                        <FormControl.TextBoxCurrency
                            name="txtRewardPriceWithoutInstall"
                            colspan="6"
                            labelcolspan="6"
                            readOnly={IsSystem}
                            disabled={IsSystem}
                            label="giá không lắp đặt"
                            placeholder="giá không lắp đặt"
                            controltype="InputControl"
                            value="0"
                            validatonList={['required']}
                            datasourcemember="RewardPriceWithoutInstall"
                            disabled={IsSystem}
                            maxSize={19}
                        />

                    </div>

                    <div className="col-md-6">
                        <FormControl.CheckBox
                            name="ckIsSystem"
                            colspan="6"
                            labelcolspan="6"
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
        },

    }
}


const RewardPriceTableDetail = connect(mapStateToProps, mapDispatchToProps)(RewardPriceTableDetailCom);
export default RewardPriceTableDetail;