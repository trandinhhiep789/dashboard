import React, { Component } from "react";
import { connect } from 'react-redux';
import FormContainer from "../../../../../common/components/FormContainer";
import FormControl from "../../../../../common/components/FormContainer/FormControl";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { MessageModal } from "../../../../../common/components/Modal";
import {
    LoadAPIPath,
    EditAPIRPTExceptionPath,
    APIHostName,
    AddAPIRPTExceptionPath,
    MLObjectRPTExceptionItem
} from "../RewardPriceTable/constants";
import { ERPCOMMONCACHE_MAINGROUP, ERPCOMMONCACHE_SERVICESEASONTYPE, ERPCOMMONCACHE_SUBGROUP, ERPCOMMONCACHE_SUBGROUPTECHSPECS, ERPCOMMONCACHE_TECHSPECSVALUE } from "../../../../../constants/keyCache";
import ProductComboBox from "../../../../../common/components/FormContainer/FormControl/MultiSelectComboBox/ProductComboBox.js";
import { ModalManager } from "react-dynamic-modal";
import { showModal, hideModal } from '../../../../../actions/modal';

class RewardPriceTableExceptionCom extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            IsSystem: false,
            IsUpdate: false,
        }

    }

    componentDidMount() {
        // console.log("111", this.props)
        if (this.props.index != undefined) {
            
            this.setState({
                IsSystem: this.props.dataSource.RewardPriceTable_ExceptionList[this.props.index].IsSystem,
                IsUpdate: true,
            })
        }
    }

    handleSubmit(formData, MLObject) {
        MLObject.RewardPriceTableID = this.props.dataSource.RewardPriceTableID;
        console.log("submit", formData, MLObject)

        if(parseFloat(MLObject.RewardPrice) < 0 || parseFloat(MLObject.RewardPriceWithoutInstall) < 0 ){
            this.showMessage("Dữ liệu bạn nhập vào không đúng. Vui lòng nhập lại!")
            return;
        }
        if(MLObject.MainGroupID == -1 && MLObject.SubGroupID == -1 ){
            this.showMessage("Vui lòng chọn ngành hàng hoặc nhóm hàng.")
            return;
        }
        else{
            if(parseInt(MLObject.FromQuantity)  >= parseInt(MLObject.ToQuantity)){
                this.showMessage("Số lượng đến phải lớn hơn số lượng từ")
                return
            }
            else{
                if (this.props.index != undefined) {

                    this.props.callFetchAPI(APIHostName, EditAPIRPTExceptionPath, MLObject).then(apiResult => {
                        this.props.onInputChangeObj(this.props.dataSource.RewardPriceTableID, apiResult);
                    });
                }
                else {
                    this.props.callFetchAPI(APIHostName, AddAPIRPTExceptionPath, MLObject).then(apiResult => {
                        this.props.onInputChangeObj(this.props.dataSource.RewardPriceTableID, apiResult);
                    });
                }
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
        if (formData.txtFromQuantity.value.toString().length > 0) {

            if (!/^\d*\.?\d+$/.test(formData.txtFromQuantity.value)) {
                formData.txtFromQuantity.ErrorLst.IsValidatonError = true;
                formData.txtFromQuantity.ErrorLst.ValidatonErrorMessage = 'Vui lòng nhập số';
            }
            else {
                formData.txtFromQuantity.ErrorLst.IsValidatonError = false;
                formData.txtFromQuantity.ErrorLst.ValidatonErrorMessage = '';
            }
        }
        if (formData.txtToQuantity.value.toString().length > 0) {
            if (!/^\d*\.?\d+$/.test(formData.txtToQuantity.value)) {
                formData.txtToQuantity.ErrorLst.IsValidatonError = true;
                formData.txtToQuantity.ErrorLst.ValidatonErrorMessage = 'Vui lòng nhập số';
            }
            else {
                
                if(!formData.txtFromQuantity.ErrorLst.IsValidatonError && formData.txtFromQuantity.value.toString().length > 0){
                    if (parseFloat(formData.txtToQuantity.value) <= parseFloat(formData.txtFromQuantity.value)) {
                        formData.txtToQuantity.ErrorLst.IsValidatonError = true;
                        formData.txtToQuantity.ErrorLst.ValidatonErrorMessage = 'Vui lòng nhập giá trị từ bé hơn giá trị đến';
                    }
                    else {
                        formData.txtToQuantity.ErrorLst.IsValidatonError = false;
                        formData.txtToQuantity.ErrorLst.ValidatonErrorMessage = '';
                    }
                }
                else{
                    formData.txtToQuantity.ErrorLst.IsValidatonError = false;
                    formData.txtToQuantity.ErrorLst.ValidatonErrorMessage = '';
                }
                
            }

        }
    }


    render() {

        const { IsSystem, IsUpdate} = this.state;
        let isDisableCB = false;

        return (
            <FormContainer
                MLObjectDefinition={MLObjectRPTExceptionItem}
                dataSource={this.props.index != undefined ? this.props.dataSource.RewardPriceTable_ExceptionList[this.props.index] : null}
                listelement={[]}
                onSubmit={this.handleSubmit}
                IsCloseModal={true}
                onchange={this.handleChange.bind(this)}
            >

                <div className="row">
                    <div className="col-md-12">
                        <FormControl.FormControlTextBox
                            name="txtRewardPriceTableExceptionID"
                            colspan="9"
                            labelcolspan="3"
                            readOnly={true}
                            hidenControll={true}
                            label="mã chi tiết thưởng ngoại lệ"
                            placeholder="Mã chi tiết thưởng ngoại lệ"
                            controltype="InputControl"
                            value=""
                            datasourcemember="RewardPriceTableExceptionID"
                        />

                    </div>

                    <div className="col-md-6">
                        <FormControl.FormControlComboBox
                            name="cbMainGroupID"
                            colspan="6"
                            labelcolspan="6"
                            label="Ngành hàng"
                            // validatonList={["Comborequired"]}
                            isautoloaditemfromcache={true}
                            loaditemcachekeyid={ERPCOMMONCACHE_MAINGROUP}
                            valuemember="MainGroupID"
                            nameMember="MainGroupName"
                            controltype="InputControl"
                            value={-1}
                            disabled={IsUpdate}
                            listoption={[]}
                            datasourcemember="MainGroupID"
                            filterrest="cbSubGroup"
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
                            disabled={IsUpdate}
                            listoption={[]}
                            datasourcemember="SubGroupID"
                            filterName="cbMainGroupID"
                            filterobj="MainGroupID"
                            filterValue=''
                            
                            

                        />

                    </div>

                    <div className="col-md-6">

                        <FormControl.TextBox
                            name="txtFromQuantity"
                            colspan="6"
                            labelcolspan="6"
                            readOnly={IsUpdate}
                            disabled={IsUpdate}
                            label="số lượng từ"
                            placeholder="Số lượng từ"
                            controltype="InputControl"
                            value="0"
                            //validatonList={["required", "number"]}
                            datasourcemember="FromQuantity"
                            maxSize={5}
                        />
                    </div>

                    <div className="col-md-6">
                        <FormControl.TextBox
                            name="txtToQuantity"
                            colspan="6"
                            labelcolspan="6"
                            readOnly={IsUpdate}
                            disabled={IsUpdate}
                            label="số lượng đến"
                            placeholder="Số lượng đến"
                            controltype="InputControl"
                            value="0"
                            //validatonList={["required","number"]}
                            datasourcemember="ToQuantity"
                            maxSize={5}
                        />

                    </div>

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


const RewardPriceTableException = connect(mapStateToProps, mapDispatchToProps)(RewardPriceTableExceptionCom);
export default RewardPriceTableException;