import React, { Component } from "react";
import { connect } from 'react-redux';
import FormContainer from "../../../../../common/components/FormContainer";
import FormControl from "../../../../../common/components/FormContainer/FormControl";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { MessageModal } from "../../../../../common/components/Modal";
import {
    LoadAPIPath,
    MLObjectAbilitiItem,
    EditAPIRPTDetailPath,
    APIHostName,
    AddAPIRPTDetailPath,
    MLObjectRPTDetailItem
} from "../RewardPriceTable/constants";
import {  ERPCOMMONCACHE_SUBGROUP, ERPCOMMONCACHE_SUBGROUPTECHSPECS, ERPCOMMONCACHE_TECHSPECSVALUE, ERPCOMMONCACHE_MAINGROUP } from "../../../../../constants/keyCache";
import ProductComboBox from "../../../../../common/components/FormContainer/FormControl/MultiSelectComboBox/ProductComboBox.js";
import { ModalManager } from "react-dynamic-modal";
import { showModal, hideModal } from '../../../../../actions/modal';

class RewardPriceTableDetailCom extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            IsSystem: false,
            IsUpdate: false,
            IsDisableTechspecsValue: true,
            IsDisableCbTechspecsValue: false,
            IsRequiredTechspecsValue: '',
            isDisableValue: false,
        }

    }

    componentDidMount() {
        if (this.props.index != undefined) {
            if (this.props.dataSource.RewardPriceTableDetailList[this.props.index].IsSystem.ProductID != undefined && this.props.dataSource.RewardPriceTableDetailList[this.props.index].IsSystem.ProductID.length > 0) {
                this.setState({
                    isDisableValue: true
                })
            }
            else {
                this.setState({
                    isDisableValue: false
                })
            }
            this.setState({
                IsSystem: this.props.dataSource.RewardPriceTableDetailList[this.props.index].IsSystem,
                IsUpdate: true
            })
        }
    }

    handleSubmit(formData, MLObject) {
        console.log("MLObject", MLObject);
        MLObject.RewardPriceTableID = this.props.dataSource.RewardPriceTableID;
        MLObject.ProductID = MLObject.ProductID && Array.isArray(MLObject.ProductID) ? MLObject.ProductID[0].ProductID : MLObject.ProductID;

        if (MLObject.IsPriceByTechspecsValueRange || MLObject.IsPriceByTechspecsValueRange != "") {
            MLObject.TechSpecsValueID = -1;
        }
        else {
            MLObject.TechSpecsValueID = MLObject.TechSpecsValueID;
        }


        if (MLObject.ProductID != undefined) {
            if (MLObject.ProductID.length > 0) {
                MLObject.MainGroupID = -1;
                MLObject.SubGroupID = -1;
                MLObject.TechspecsID = -1;
                MLObject.FromTechspecsValue = 0
                MLObject.ToTechspecsValue = 0
                MLObject.IsPriceByTechspecsValueRange = 0
            }
            else {
                MLObject.MainGroupID = MLObject.MainGroupID;
                MLObject.SubGroupID = MLObject.SubGroupID;
                MLObject.TechspecsID = MLObject.TechspecsID;
                MLObject.FromTechspecsValue = MLObject.FromTechspecsValue;
                MLObject.ToTechspecsValue = MLObject.ToTechspecsValue;
            }
        }

        if(parseFloat(MLObject.RewardPrice) < 0 || parseFloat(MLObject.RewardPriceWithoutInstall) < 0 ){
            this.showMessage("Dữ liệu bạn nhập vào không đúng. Vui lòng nhập lại!")
            return;
        }

        if ((MLObject.ProductID == undefined || MLObject.ProductID.length == 0) && MLObject.MainGroupID < 0) {
            this.showMessage("Dữ liệu bạn nhập vào không đúng. Vui lòng nhập lại!")
            return;
        }
        else {
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
        }

    }

    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
            />
        );
    }

    handleChange(formData, MLObject) {
        if (formData.ckIsPriceByTechspecsValueRange.value) {

            if (formData.txtFromTechspecsValue.value.toString().length > 0) {

                if (!/^\d*\.?\d+$/.test(formData.txtFromTechspecsValue.value)) {
                    formData.txtFromTechspecsValue.ErrorLst.IsValidatonError = true;
                    formData.txtFromTechspecsValue.ErrorLst.ValidatonErrorMessage = 'Vui lòng nhập số';
                }
                else {
                    formData.txtFromTechspecsValue.ErrorLst.IsValidatonError = false;
                    formData.txtFromTechspecsValue.ErrorLst.ValidatonErrorMessage = '';
                }
            }
            if (formData.txtToTechspecsValue.value.toString().length > 0) {
                if (!/^\d*\.?\d+$/.test(formData.txtToTechspecsValue.value)) {
                    formData.txtToTechspecsValue.ErrorLst.IsValidatonError = true;
                    formData.txtToTechspecsValue.ErrorLst.ValidatonErrorMessage = 'Vui lòng nhập số';
                }
                else {
                    if (parseFloat(formData.txtToTechspecsValue.value) <= parseFloat(formData.txtFromTechspecsValue.value)) {
                        formData.txtToTechspecsValue.ErrorLst.IsValidatonError = true;
                        formData.txtToTechspecsValue.ErrorLst.ValidatonErrorMessage = 'Vui lòng nhập giá trị từ bé hơn giá trị đến';
                    }
                    else {
                        formData.txtToTechspecsValue.ErrorLst.IsValidatonError = false;
                        formData.txtToTechspecsValue.ErrorLst.ValidatonErrorMessage = '';
                    }
                }

            }

            if (formData.cbProductID.value != undefined) {
                if (formData.cbProductID.value[0].ProductID != null) {
                    this.setState({
                        IsDisableTechspecsValue: true,
                    })
                    formData.txtToTechspecsValue.ErrorLst.IsValidatonError = false;
                    formData.txtToTechspecsValue.ErrorLst.ValidatonErrorMessage = '';
                }
                else {
                    this.setState({
                        IsDisableTechspecsValue: false,
                    })
                }

            }
            else {
                this.setState({
                    IsDisableTechspecsValue: false,
                })
            }


        }
        else {
            formData.txtToTechspecsValue.ErrorLst.IsValidatonError = false;
            formData.txtToTechspecsValue.ErrorLst.ValidatonErrorMessage = '';
            this.setState({
                IsDisableTechspecsValue: true,
            })
        }
        if (formData.cbProductID.value != undefined) {
            if (formData.cbProductID.value[0].ProductID != null) {
                this.setState({
                    IsDisableCbTechspecsValue: true
                })
            }
            else {
                this.setState({
                    IsDisableCbTechspecsValue: false
                })
            }
        }
        else {
            this.setState({
                IsDisableCbTechspecsValue: false
            })
        }


    }


    render() {

        const { IsSystem, IsUpdate, IsDisableCbTechspecsValue, isDisableValue, IsDisableTechspecsValue } = this.state;
        let isDisableCB = false;


        if (IsUpdate == false && IsDisableCbTechspecsValue == false) {
            isDisableCB = false
        }
        else {
            isDisableCB = true
        }

        let isDisableCBTechspecsValue = false;
        if (IsUpdate == false && IsDisableCbTechspecsValue == false) {
            if (IsDisableTechspecsValue == false) {
                isDisableCBTechspecsValue = true
                // if (isDisableValue == false) {
                //     isDisableCBTechspecsValue = false
                // }
                // else {
                //     isDisableCBTechspecsValue = true
                // }
            }
            else {
                isDisableCBTechspecsValue = false
            }
        }
        else {

            isDisableCBTechspecsValue = true
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
                            name="txtRewardPriceTableDetailID"
                            colspan="9"
                            labelcolspan="3"
                            readOnly={true}
                            hidenControll={true}
                            label="Mã chi tiết bảng giá thưởng"
                            placeholder="Mã chi tiết bảng giá thưởng"
                            controltype="InputControl"
                            value=""
                            datasourcemember="RewardPriceTableDetailID"
                        />
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
                            name="cbMainGroup"
                            colspan="6"
                            labelcolspan="6"
                            label="ngành hàng"
                            // validatonList={["Comborequired"]}
                            isautoloaditemfromcache={true}
                            loaditemcachekeyid={ERPCOMMONCACHE_MAINGROUP} //"ERPCOMMONCACHE.SUBGROUP"
                            valuemember="MainGroupID"
                            nameMember="MainGroupName"
                            controltype="InputControl"
                            value={-1}
                            disabled={isDisableCB}
                            listoption={[]}
                            datasourcemember="MainGroupID"
                            filterrest="cbSubGroup,cbTechSpecsValue,cbTechSpecs"

                        />

                    </div>

                    <div className="col-md-6">
                        <FormControl.FormControlComboBox
                            name="cbSubGroup"
                            colspan="6"
                            labelcolspan="6"
                            label="nhóm hàng"
                            // validatonList={["Comborequired"]}
                            isautoloaditemfromcache={true}
                            loaditemcachekeyid={ERPCOMMONCACHE_SUBGROUP} //"ERPCOMMONCACHE.SUBGROUP"
                            valuemember="SubGroupID"
                            nameMember="SubGroupName"
                            controltype="InputControl"
                            value={-1}
                            disabled={isDisableCB}
                            listoption={[]}
                            datasourcemember="SubGroupID"
                            filterobj="MainGroupID"
                            filterName="cbMainGroup"
                            filterValue=''
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
                            disabled={isDisableCBTechspecsValue}
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
                            readOnly={isDisableCB}
                            disabled={isDisableCB}
                            label="Giá theo khoảng giá trị thông số kỹ thuật"
                            controltype="InputControl"
                            value=""
                            datasourcemember="IsPriceByTechspecsValueRange"
                            classNameCustom="customCheckbox"
                        />
                    </div>
                    <div className="col-md-6"></div>
                    <div className="col-md-6">

                        <FormControl.TextBox
                            name="txtFromTechspecsValue"
                            colspan="6"
                            labelcolspan="6"
                            readOnly={IsDisableTechspecsValue}
                            disabled={IsDisableTechspecsValue}
                            label="Giá trị thông số kỹ thuật từ"
                            placeholder="Giá trị thông số kỹ thuật từ"
                            controltype="InputControl"
                            value="0"
                            // validatonList={["required"]}
                            datasourcemember="FromTechspecsValue"
                            maxSize={9}
                        />
                    </div>

                    <div className="col-md-6">
                        <FormControl.TextBox
                            name="txtToTechspecsValue"
                            colspan="6"
                            labelcolspan="6"
                            readOnly={IsDisableTechspecsValue}
                            disabled={IsDisableTechspecsValue}
                            label="Giá trị thông số kỹ thuật đến"
                            placeholder="Giá trị thông số kỹ thuật đến"
                            controltype="InputControl"
                            value="0"
                            // validatonList={["required"]}
                            datasourcemember="ToTechspecsValue"
                            maxSize={9}
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
                            disabled={IsUpdate}
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
                            isNegativeNumber={false}
                            label="giá"
                            placeholder="Giá "
                            controltype="InputControl"
                            value="0"
                            validatonList={['required']}
                            datasourcemember="RewardPrice"
                            maxSize={11}
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
                            maxSize={11}
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: () => {
            dispatch(hideModal());
        }
    }
}


const RewardPriceTableDetail = connect(mapStateToProps, mapDispatchToProps)(RewardPriceTableDetailCom);
export default RewardPriceTableDetail;