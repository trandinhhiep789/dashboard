import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import FormContainer from "../../../../common/components/FormContainer";
// import FormContainer from "../../../../common/components/Form/AdvanceForm/FormContainer";
import { MessageModal } from "../../../../common/components/Modal";
import FormControl from "../../../../common/components/FormContainer/FormControl";
import InputGrid from "../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
import {
    APIHostName,
    AddAPIPath,
    MLObjectDefinition,
    BackLink,
    TitleFormAdd,
    AddPagePath,
    InputMTReturnRequestAddColumnList,
    InputMTReturnRequestDetailColumnListNew,
    GridMLObjectDefinition,
    GirdMTReturnRequestDetailColumnList,
    LoadAPIByMtreturnRequestTypeIDPath,
    LoadAPIByRequestTypeIDPath,
    LoadAPIByMTRRequestTypeIDPath,
    addImportMaterialModalWidth,
    cacheInventoryStatus
} from "../constants";

import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { callGetCache, callClearLocalCache } from "../../../../actions/cacheAction";
import { formatDate, formatDateNew } from "../../../../common/library/CommonLib.js";
import { showModal, hideModal } from '../../../../actions/modal';
import { TMS_MTRETURNREQUEST_ADD } from "../../../../constants/functionLists";
import InputGridControl from "../../../../common/components/FormContainer/FormControl/InputGrid/InputGridControl.js";
import { MODAL_TYPE_COMMONTMODALS } from '../../../../constants/actionTypes';
import { Base64 } from 'js-base64';
import DeliverUserList from "../../ShipmentOrder/Component/DeliverUserList";
import FileAttachment from "../../../../common/components/Form/FileAttachment";
class AddCom extends React.Component {
    constructor(props) {
        super(props);
        this.prevDataSubmit = this.prevDataSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);


        this.state = {
            IsCallAPIError: false,
            IsCloseForm: false,
            DataSource: {},
            isError: false,
            AttachmentListData: [],
            AttachmentList: [],
            fileSize: 0,
        };
    }

    componentDidMount() {
        console.log("prop", this.props)
        this.props.hideModal();
        this.props.updatePagePath(AddPagePath);

    }



    prevDataSubmit(formData, MLObject) {
        const { AttachmentList, fileSize } = this.state;
        console.log("add", formData, MLObject, AttachmentList, fileSize)
        MLObject.RequestUser = MLObject.RequestUser[0].UserName;
        MLObject.CurrentVehicleRentalRequestStepID= 1;
        MLObject.CurrentVehicleRentalStatusID =1;
        let data = new FormData();
        data.append("vehicleRentalRequestATTObj", AttachmentList.FileURL);
        data.append("vehicleRentalRequestObj", JSON.stringify(MLObject));

        console.log("data", data, MLObject)
        this.handleSubmit(data)

    }

    handleSubmit(MLObject) {
        this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then(apiResult => {
            console.log("submit", MLObject, apiResult)
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);
        });

    }


    handleCloseMessage() {
        if (!this.state.IsCallAPIError) this.setState({ IsCloseForm: true });
    }

    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
                onCloseModal={this.handleCloseMessage}
            />
        );
    }

    handleSelectFile(file, nameValue) {
        console.log("file", file[0], file, nameValue)
        const filelist = { [nameValue]: file[0] };
        this.setState({
            AttachmentList: filelist,
            AttachmentListData: file,
            fileSize: file[0].size

        })

    }

    handleDeletefile(id) {
        this.setState({
            AttachmentListData: [],
            AttachmentList: [],
            fileSize: 0
        })
    }


    handleChange(formData, MLObject) {
        if (formData.dtEndTime.value.length > 0) {
            let StartTime = new Date(formData.dtStartTime.value);
            let EndTime = new Date(formData.dtEndTime.value);

            if (EndTime >= StartTime) {

                formData.dtEndTime.ErrorLst.IsValidatonError = false;
                formData.dtEndTime.ErrorLst.ValidatonErrorMessage = "";
            }
            else {
                formData.dtEndTime.ErrorLst.IsValidatonError = true;
                formData.dtEndTime.ErrorLst.ValidatonErrorMessage = "Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu thuê xe";
            }
        }
    }

    render() {
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        let currentDate = new Date();

        const { AttachmentListData } = this.state;

        return (
            <React.Fragment>
                <FormContainer
                    FormName={TitleFormAdd}
                    MLObjectDefinition={MLObjectDefinition}
                    listelement={[]}
                    BackLink={BackLink}
                     RequirePermission={this.props.location.state.AddFunctionID}
                    onSubmit={this.prevDataSubmit}
                    onchange={this.handleChange.bind(this)}
                >

                    <div className="row">

                        <div className="col-md-6">
                            <FormControl.FormControlComboBox
                                name="cboVehicleRentalRequestType"
                                colspan="8"
                                labelcolspan="4"
                                label="loại yêu cầu thuê xe"
                                validatonList={["Comborequired"]}
                                placeholder="-- Vui lòng chọn --"
                                isautoloaditemfromcache={true}
                                disabled={true}
                                loaditemcachekeyid="ERPCOMMONCACHE.VEHICLERENTALREQTYPE"
                                valuemember="VehicleRentalReqTypeID"
                                nameMember="VehicleRentalReqTypeName"
                                controltype="InputControl"
                                value={this.props.location.state.VehicleRentalReqTypeID}
                                listoption={null}
                                datasourcemember="VehicleRentalRequestTypeID" />
                        </div>

                        <div className="col-md-6">
                            <FormControl.FormControlComboBox
                                name="cboRequestStore"
                                colspan="8"
                                labelcolspan="4"
                                label="kho yêu cầu"
                                disabled={true}
                                validatonList={["Comborequired"]}
                                placeholder="-- Vui lòng chọn --"
                                isautoloaditemfromcache={true}
                                isusercache={true}
                                loaditemcachekeyid="ERPCOMMONCACHE.USER_COOSTORE_BYUSER"
                                valuemember="StoreID"
                                nameMember="StoreName"
                                controltype="InputControl"
                                value={this.props.location.state.RequestStoreID}
                                listoption={null}
                                datasourcemember="StoreID"
                                classNameCustom="customcontrol"
                            />

                        </div>

                        <div className="col-md-6">
                            <FormControl.FormControlComboBox
                                name="cboVehicle"
                                colspan="8"
                                labelcolspan="4"
                                label="Mã xe"
                                disabled={false}
                                validatonList={["Comborequired"]}
                                placeholder="-- Vui lòng chọn --"
                                isautoloaditemfromcache={true}
                                loaditemcachekeyid="ERPCOMMONCACHE.VEHICLES"
                                valuemember="VehicleID"
                                nameMember="VehicleName"
                                controltype="InputControl"
                                value={''}
                                listoption={null}
                                datasourcemember="VehicleID"
                                classNameCustom="customcontrol"
                            />

                        </div>

                        <div className="col-md-6">

                            <DeliverUserList
                                name="cboRequestUser"
                                colspan="8"
                                labelcolspan="4"
                                label="Người yêu cầu"
                                IsLabelDiv={true}
                                validatonList={["Comborequired"]}
                                controltype="InputMultiControl"
                                datasourcemember="RequestUser"
                                isMultiSelect={false}
                            />

                        </div>

                        <div className="col-md-6">
                            <FormControl.FormControlComboBox
                                name="cboRentalType"
                                colspan="8"
                                labelcolspan="4"
                                label="Hình thức thuê"
                                disabled={false}
                                validatonList={["Comborequired"]}
                                placeholder="-- Vui lòng chọn --"
                                isautoloaditemfromcache={true}
                                loaditemcachekeyid="ERPCOMMONCACHE.RENTALTYPE"
                                valuemember="RentalTypeID"
                                nameMember="RentalTypeName"
                                controltype="InputControl"
                                value={''}
                                listoption={null}
                                datasourcemember="RentalTypeID"
                                classNameCustom="customcontrol"
                            />

                        </div>

                        <div className="col-md-6">
                            <FormControl.TextBox
                                name="txtContractID"
                                labelcolspan={4}
                                colspan={8}
                                readOnly={false}
                                label="Mã hợp đồng"
                                placeholder="Mã hợp đồng"
                                controltype="InputControl"
                                value=""
                                datasourcemember="ContractID"
                                validatonList={['required']}
                            //classNameCustom="customcontrol"
                            />
                        </div>

                        <div className="col-md-6">

                            <FormControl.FormControlDatetimeNew
                                name="dtStartTime"
                                colspan="8"
                                labelcolspan="4"
                                readOnly={true}
                                showTime={false}
                                timeFormat={false}
                                dateFormat="DD-MM-YYYY"//"YYYY-MM-DD"
                                label="thời gian bắt đầu"
                                placeholder={formatDate(currentDate, true)}
                                controltype="InputControl"
                                value=""
                                validatonList={["required"]}
                                datasourcemember="StartTime"
                            />
                        </div>

                        <div className="col-md-6">
                            <FormControl.FormControlDatetimeNew
                                name="dtEndTime"
                                colspan="8"
                                labelcolspan="4"
                                readOnly={true}
                                showTime={false}
                                timeFormat={false}
                                dateFormat="DD-MM-YYYY"//"YYYY-MM-DD"
                                label="thời gian kết thúc"
                                placeholder={formatDate(currentDate, true)}
                                controltype="InputControl"
                                value=""
                                validatonList={["required"]}
                                datasourcemember="EndTime"
                            />
                        </div>

                        {/* <div className="col-md-6">
                            <FormControl.FormControlComboBox
                                name="cboAbility"
                                colspan="8"
                                labelcolspan="4"
                                label="Năng lực xe"
                                disabled={true}
                                validatonList={["Comborequired"]}
                                placeholder="-- Vui lòng chọn --"
                                isautoloaditemfromcache={false}
                                loaditemcachekeyid="ERPCOMMONCACHE.USER_COOSTORE_BYUSER"
                                valuemember="StoreID"
                                nameMember="StoreName"
                                controltype="InputControl"
                                value={''}
                                listoption={null}
                                datasourcemember="Ability"
                                classNameCustom="customcontrol"
                            />

                        </div> */}


                        <div className="col-md-6">
                            <FormControl.CheckBox
                                label="kích hoạt"
                                name="chkIsActived"
                                datasourcemember="IsActived"
                                controltype="InputControl"
                                colspan={8}
                                labelcolspan={4}
                                classNameCustom="customCheckbox"
                                value={true}
                            />
                        </div>

                        <div className="col-md-6">
                            <FormControl.CheckBox
                                label="hệ thống"
                                name="chkIsSystem"
                                datasourcemember="IsSystem"
                                controltype="InputControl"
                                colspan={8}
                                labelcolspan={4}
                                classNameCustom="customCheckbox"
                            />
                        </div>
                        <div className="col-md-6">

                            <FileAttachment
                                name="FileAttachmentData"
                                nameMember="FileURL"
                                labelcolspan={4}
                                colspan={8}
                                label="Tập tin đính kèm"
                                IsMultiple={false}
                                onSelectFile={this.handleSelectFile.bind(this)}
                                onDeletefile={this.handleDeletefile.bind(this)}
                                DataAttachment={AttachmentListData}
                                IsAttachment={true}
                            />

                        </div>
                    </div>


                </FormContainer>
            </React.Fragment>
        );

    }
}

const mapStateToProps = state => {
    return {
        AppInfo: state,
        FetchAPIInfo: state.FetchAPIInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updatePagePath: pagePath => {
            dispatch(updatePagePath(pagePath));
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
        callClearLocalCache: (cacheKeyID) => {
            return dispatch(callClearLocalCache(cacheKeyID));
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: (type, props) => {
            dispatch(hideModal(type, props));
        }
    };
};

const Add = connect(mapStateToProps, mapDispatchToProps)(AddCom);
export default Add;
