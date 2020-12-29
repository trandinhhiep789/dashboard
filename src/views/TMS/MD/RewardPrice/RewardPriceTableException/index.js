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
        // console.log("submit", formData, MLObject)

        if(MLObject.FromQuantity >= MLObject.ToQuantity){
            this.showMessage("Số lượng đến phải lớn hơn số lượng từ")
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

    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
            />
        );
    }

    // handleChange(formData, MLObject) {
    //     console.log("change", formData, MLObject)

    // }


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
                // onchange={this.handleChange.bind(this)}
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
                            label="thông số kỹ thuật"
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

                        />

                    </div>

                    <div className="col-md-6">

                        <FormControl.TextBox
                            name="txtFromQuantity"
                            colspan="6"
                            labelcolspan="6"
                            readOnly={IsSystem}
                            disabled={IsSystem}
                            label="số lượng từ"
                            placeholder="Số lượng từ"
                            controltype="InputControl"
                            value="0"
                            validatonList={["required", "number"]}
                            datasourcemember="FromQuantity"
                            maxSize={10}
                        />
                    </div>

                    <div className="col-md-6">
                        <FormControl.TextBox
                            name="txtToQuantity"
                            colspan="6"
                            labelcolspan="6"
                            readOnly={IsSystem}
                            disabled={IsSystem}
                            label="số lượng đến"
                            placeholder="Số lượng đến"
                            controltype="InputControl"
                            value="0"
                            validatonList={["required","number"]}
                            datasourcemember="ToQuantity"
                            maxSize={10}
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