import React, { Component } from "react";
import { connect } from 'react-redux';
import FormContainer from "../../../../../common/components/FormContainer";
import FormControl from "../../../../../common/components/FormContainer/FormControl";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";

import {
    APIHostName,
    MLObjectFeeAppendixDetailItem,
    AddAPIFeeAppendixPath,
    EditAPIFeeAppendixPath
} from "../contants/index.js";


class FeeAppendixDetailElementCom extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {

        }
    }

    componentDidMount() {
        console.log('FeeAppendixDetailElementCom', this.props)
    }

    handleSubmit(From, MLObject) {
        MLObject.SignedDate = this.props.dataSource.SignedDate;
        MLObject.ServiceAgreementID = this.props.dataSource.ServiceAgreementID;
        if (this.props.index != undefined) {
            MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
            this.props.callFetchAPI(APIHostName, EditAPIFeeAppendixPath, MLObject).then(apiResult => {
                this.props.onInputChangeObj(this.props.dataSource.ServiceAgreementID, apiResult);
            });
        }
        else {
            MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;

            this.props.callFetchAPI(APIHostName, AddAPIFeeAppendixPath, MLObject).then(apiResult => {
                this.props.onInputChangeObj(this.props.dataSource.ServiceAgreementID, apiResult);

            });
        }
    }

    render() {
        const AddElementListFeeAppendix = []

        return (
            <FormContainer
                MLObjectDefinition={MLObjectFeeAppendixDetailItem}
                dataSource={this.props.index != undefined ? this.props.dataSource.FeeAppendix_ItemList[this.props.index] : null}
                listelement={AddElementListFeeAppendix}
                onSubmit={this.handleSubmit}
                IsCloseModal={true}
            >
                <div className="row">
                    <div className="col-md-6">
                        <FormControl.FormControlTextBox
                            name="txtFeeAppendixID"
                            colspan="9"
                            labelcolspan="3"
                            readOnly={true}
                            hidenControll={true}
                            label="mã phụ lục"
                            placeholder="Mã phụ lục tự động nhập"
                            controltype="InputControl"
                            value=""
                            datasourcemember="FeeAppendixID"
                        />

                    </div>
                    <div className="col-md-6"></div>
                    <div className="col-md-6">
                        <FormControl.FormControlComboBox
                            name="cbServiceSeasonTypeID"
                            colspan="9"
                            labelcolspan="3"
                            label="loại thời vụ"
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

                    <div className="col-md-6">
                        <FormControl.FormControlTextBox
                            name="txtFeeAppendixName"
                            colspan="9"
                            labelcolspan="3"
                            readOnly={false}
                            label="tên phụ lục"
                            placeholder="Tên phụ lục"
                            controltype="InputControl"
                            value=""
                            validatonList={["required"]}
                            datasourcemember="FeeAppendixName"
                        />

                    </div>


                    <div className="col-md-6">


                        <FormControl.FormControlDatetime
                            name="dtApplyFromDate"
                            colspan="9"
                            labelcolspan="3"
                            readOnly={true}
                            timeFormat={false}
                            dateFormat="YYYY-MM-DD"
                            label="từ ngày"
                            placeholder="Từ ngày"
                            controltype="InputControl"
                            value=""
                            validatonList={["required"]}
                            datasourcemember="ApplyFromDate"

                        />
                    </div>

                    <div className="col-md-6">
                        <FormControl.FormControlDatetime
                            name="dtApplyToDate"
                            colspan="9"
                            labelcolspan="3"
                            readOnly={true}
                            timeFormat={false}
                            dateFormat="YYYY-MM-DD"
                            label="đến ngày"
                            placeholder="Đến ngày"
                            controltype="InputControl"
                            value=""
                            validatonList={["required"]}
                            datasourcemember="ApplyToDate"
                        />
                    </div>



                    <div className="col-md-6">
                        <FormControl.TextArea
                            name="txtDescription"
                            colspan="9"
                            labelcolspan="3"
                            readOnly={false}
                            label="mô tả"
                            controltype="InputControl"
                            placeholder="Mô tả"
                            value=""
                            datasourcemember="Description"
                            classNameCustom="customcontrol"
                        />
                    </div>
                    <div className="col-md-6">
                    </div>
                    <div className="col-md-6">
                        <FormControl.CheckBox
                            name="chkIsActived"
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
                            name="chkIsSystem"
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


const FeeAppendixDetailElement = connect(mapStateToProps, mapDispatchToProps)(FeeAppendixDetailElementCom);
export default FeeAppendixDetailElement;