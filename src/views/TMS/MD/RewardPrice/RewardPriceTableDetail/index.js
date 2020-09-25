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
import { ERPCOMMONCACHE_SERVICESEASONTYPE, ERPCOMMONCACHE_SUBGROUP } from "../../../../../constants/keyCache";

class RewardPriceTableDetailCom extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            IsSystem: false, 
            IsUpdate: false
        }

    }

    componentDidMount() {
        if (this.props.index != undefined) {
            this.setState({
                IsSystem: this.props.dataSource.RewardPriceTableDetailList[this.props.index].IsSystem,
                IsUpdate:  true
            })
        }
    }

    handleSubmit(formData, MLObject) {

        MLObject.RewardPriceTableID = this.props.dataSource.RewardPriceTableID;

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
    }


    render() {

        const { IsSystem, IsUpdate } = this.state;
        return (
            <FormContainer
                MLObjectDefinition={MLObjectRPTDetailItem}
                dataSource={this.props.index != undefined ? this.props.dataSource.RewardPriceTableDetailList[this.props.index] : null}
                listelement={[]}
                onSubmit={this.handleSubmit}
                IsCloseModal={true}
               // onchange={this.handleChange.bind(this)}
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
                            colspan="9"
                            labelcolspan="3"
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

                        />

                    </div>

                    <div className="col-md-6"></div>

                    <div className="col-md-6">

                        <FormControl.TextBoxCurrency
                            name="txtRewardPrice"
                            colspan="9"
                            labelcolspan="3"
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
                            colspan="9"
                            labelcolspan="3"
                            readOnly={IsSystem}
                            disabled={IsSystem}
                            label="giá không cài đặt"
                            placeholder="giá không cài đặt"
                            controltype="InputControl"
                            value="0"
                            validatonList={['required']}
                            datasourcemember="RewardPrice"
                            disabled={IsSystem}
                            maxSize={19}
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