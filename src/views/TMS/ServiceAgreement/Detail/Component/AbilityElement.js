import React, { Component } from "react";
import { connect } from 'react-redux';
import FormContainer from "../../../../../common/components/FormContainer";
import FormControl from "../../../../../common/components/FormContainer/FormControl";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";

import {
    LoadAPIPath,
    MLObjectAbilitiItem,
    AddAPIAbilityPath,
    APIHostName,
    AddAPIAbilitiPath,
    EditAPIAbilitiPath
} from "../contants/index.js";

class AbilityElementCom extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {

        }
        
    }

    componentDidMount() {
        console.log("AbilityElementCom", this.props, this.props.index)
    }

    handleSubmit(From, MLObject) {
        
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        MLObject.ServiceAgreementID = this.props.dataSource.ServiceAgreementID.trim();
        MLObject.SignedDate = this.props.dataSource.SignedDate;
        MLObject.AbilityID = 4;
        if(this.props.index != undefined){
            MLObject.UpdatedUser= this.props.AppInfo.LoginInfo.Username;
            this.props.callFetchAPI(APIHostName, EditAPIAbilitiPath, MLObject).then(apiResult => {
                if (!apiResult.IsError) {
                    this.props.onInputChangeObj(this.props.dataSource.ServiceAgreementID, apiResult);
                }
            });
        }
        else{
            MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
            this.props.callFetchAPI(APIHostName, AddAPIAbilitiPath, MLObject).then(apiResult => {
                if (!apiResult.IsError) {
                    this.props.onInputChangeObj(this.props.dataSource.ServiceAgreementID, apiResult);
                }
            });
        }
        
    }

 

    render() {
        const AddElementList = [

        ]
        return (
            <FormContainer
                MLObjectDefinition={MLObjectAbilitiItem}
                dataSource={this.props.index != undefined ? this.props.dataSource.Ability_ItemList[this.props.index] : null}
                listelement={AddElementList}
                onSubmit={this.handleSubmit}
            >
                
                <div className="row">

                    <div className="col-md-6">
                        <FormControl.FormControlComboBox
                            name="cbServiceSeasonTypeID"
                            colspan="9"
                            labelcolspan="3"
                            label="loại mùa vụ"
                            validatonList={["Comborequired"]}
                            isautoloaditemfromcache={true}
                            loaditemcachekeyid="ERPCOMMONCACHE.SERVICESEASONTYPE"
                            valuemember="ServiceSeasonTypeID"
                            nameMember="ServiceSeasonTypeName"
                            controltype="InputControl"
                            value={-1}
                            listoption={[]}
                            datasourcemember="ServiceSeasonTypeID"
                        />

                    </div>

                    <div className="col-md-6"></div>

                    <div className="col-md-6">
                        <FormControl.ElementDatetime
                            name="dtFromDate"
                            colspan="9"
                            labelcolspan="3"
                            readOnly={false}
                            timeFormat={false}
                            dateFormat="DD/MM/YYYY"
                            label="Từ ngày"
                            placeholder="Từ ngày"
                            controltype="InputControl"
                            value={""}
                            datasourcemember="FromDate"

                        />
                    </div>

                    <div className="col-md-6">
                        <FormControl.ElementDatetime
                            name="dtToDate"
                            colspan="9"
                            labelcolspan="3"
                            readOnly={false}
                            timeFormat={false}
                            dateFormat="DD/MM/YYYY"
                            label="đến ngày"
                            placeholder="đến ngày"
                            controltype="InputControl"
                            value={""}
                            datasourcemember="ToDate"

                        />
                    </div>

                    <div className="col-md-6">
                        <FormControl.TextBox
                            name="txtMonthlyAbilityValue"
                            colspan="9"
                            labelcolspan="3"
                            readOnly={false}
                            label="theo tháng"
                            placeholder="theo tháng"
                            controltype="InputControl"
                            value=""
                            datasourcemember="MonthlyAbilityValue"
                            classNameCustom="customcontrol"
                        />
                    </div>
                    <div className="col-md-6">
                        <FormControl.TextBox
                            name="txtDailyAbilityValue"
                            colspan="9"
                            labelcolspan="3"
                            readOnly={false}
                            label="theo ngày"
                            placeholder="theo ngày"
                            controltype="InputControl"
                            value=""
                            datasourcemember="DailyAbilityValue"
                            classNameCustom="customcontrol"
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
                    <div className="col-md-6"></div>

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
        },
        hideModal: () => {
            dispatch(hideModal());
        }
    }
}


const AbilityElement = connect(mapStateToProps, mapDispatchToProps)(AbilityElementCom);
export default AbilityElement;