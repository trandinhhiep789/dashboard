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
import ReactNotification from "react-notifications-component";

class FeeAppendixDetailElementCom extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {

        }
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        console.log('FeeAppendixDetailElementCom', this.props)
    }

    handleSubmit(From, MLObject) {
        debugger
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        MLObject.SignedDate = this.props.dataSource.SignedDate;
        MLObject.ServiceAgreementID = this.props.dataSource.ServiceAgreementID;
        if (this.props.index != undefined) {
            MLObject.UpdatedUser= this.props.AppInfo.LoginInfo.Username;
            this.props.callFetchAPI(APIHostName, EditAPIFeeAppendixPath, MLObject).then(apiResult => {
                this.addNotification(apiResult.Message, apiResult.IsError);
                if (!apiResult.IsError) {
                    this.props.onInputChangeObj(this.props.dataSource.ServiceAgreementID);
                }
            });
        }
        else {
            MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
            
            this.props.callFetchAPI(APIHostName, AddAPIFeeAppendixPath, MLObject).then(apiResult => {
                console.log('FeeAppendixDetailElementCom', apiResult, MLObject)
                this.addNotification(apiResult.Message, apiResult.IsError);
                if (!apiResult.IsError) {
                    this.props.onInputChangeObj(this.props.dataSource.ServiceAgreementID);
                }
    
            });
        }
    }

    addNotification(message1, IsError) {
        if (!IsError) {
            this.setState({
                cssNotification: "notification-custom-success",
                iconNotification: "fa fa-check"
            });
        } else {
            this.setState({
                cssNotification: "notification-danger",
                iconNotification: "fa fa-exclamation"
            });
        }
        this.notificationDOMRef.current.addNotification({
            container: "bottom-right",
            content: (
                <div className={this.state.cssNotification}>
                    <div className="notification-custom-icon">
                        <i className={this.state.iconNotification} />
                    </div>
                    <div className="notification-custom-content">
                        <div className="notification-close">
                            <span>×</span>
                        </div>
                        <h4 className="notification-title">Thông Báo</h4>
                        <p className="notification-message">{message1}</p>
                    </div>
                </div>
            ),
            dismiss: { duration: 6000 },
            dismissable: { click: true }
        });
    }


    render() {
        const AddElementListFeeAppendix =[

        ]

        return (
            <FormContainer
                MLObjectDefinition={MLObjectFeeAppendixDetailItem}
                dataSource={this.props.index != undefined ? this.props.dataSource.ShipmentOrder_ItemList[this.props.index] : null}
                listelement={AddElementListFeeAppendix}
                onSubmit={this.handleSubmit}
            >
                <ReactNotification ref={this.notificationDOMRef} />
                <div className="row">

                    <div className="col-md-6">
                        <FormControl.FormControlTextBox
                            name="txtFeeAppendixID"
                            colspan="9"
                            labelcolspan="3"
                            readOnly={false}
                            label="mã phụ lục"
                            placeholder="Mã phụ lục"
                            controltype="InputControl"
                            value=""
                            validatonList={["required"]}
                            datasourcemember="FeeAppendixID"
                        />

                    </div>

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
                        <FormControl.ElementDatetime
                            name="dtApplyToDate"
                            colspan="9"
                            labelcolspan="3"
                            readOnly={false}
                            timeFormat={false}
                            dateFormat="DD/MM/YYYY"
                            label="từ ngày"
                            placeholder="Từ ngày"
                            controltype="InputControl"
                            value={""}
                            datasourcemember="ApplyToDate"
                        />
                    </div>

                    <div className="col-md-6">
                        <FormControl.ElementDatetime
                            name="txtApplyFromDate"
                            colspan="9"
                            labelcolspan="3"
                            readOnly={false}
                            timeFormat={false}
                            dateFormat="DD/MM/YYYY"
                            label="từ ngày"
                            placeholder="Từ ngày"
                            controltype="InputControl"
                            value={""}
                            datasourcemember="ApplyFromDate"
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
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        hideModal: () => {
            dispatch(hideModal());
        }
    }
}


const FeeAppendixDetailElement = connect(mapStateToProps, mapDispatchToProps)(FeeAppendixDetailElementCom);
export default FeeAppendixDetailElement;