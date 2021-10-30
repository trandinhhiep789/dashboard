import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import FormContainer from "../../../../common/components/FormContainer";
import { MessageModal } from "../../../../common/components/Modal";
import FormControl from "../../../../common/components/FormContainer/FormControl";
import {
    APIHostName,
    BackLink,
    TitleFormEdit,
    EditPagePath,
    LoadAPIPath,
    MLObjectDefinition,
    UpdateAPIPath,

} from "../constants";
import { updatePagePath } from "../../../../actions/pageAction";
import DeliverUserList from "../../ShipmentOrder/Component/DeliverUserList";
import FileAttachment from "../../../../common/components/Form/FileAttachment";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { callGetCache, callClearLocalCache } from "../../../../actions/cacheAction";
import { formatDate, formatDateNew } from "../../../../common/library/CommonLib.js";
import { showModal, hideModal } from '../../../../actions/modal';
import MultiSelectComboBox from "../../../../common/components/FormContainer/FormControl/MultiSelectComboBox/MultiSelectUserComboBoxNew";

class EditCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            DataSource: {},
            IsCallAPIError: false,
            IsLoadDataComplete: false,
            AttachmentListData: [],
            AttachmentList: [],
            fileSize: 0,
            UserValue: [],
            RequestUser: ""
        };
        this.notificationDOMRef = React.createRef();
        this.callLoadData = this.callLoadData.bind(this)
    }

    componentDidMount() {
        console.log("prop", this.props)
        this.props.updatePagePath(EditPagePath);
        this.callLoadData(this.props.match.params.id);
    }

    callLoadData(id) {
        const { AttachmentListData } = this.state
        this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then((apiResult) => {
            console.log("data", id, apiResult)
            if (apiResult.IsError) {
                this.showMessage(apiResult.Message)
            }
            else {
                let File = {};
                let UserValue = [
                    {
                        FullName: apiResult.ResultObject.RequestFullName,
                        label: apiResult.ResultObject.RequestUser + " - " + apiResult.ResultObject.RequestFullName,
                        name: apiResult.ResultObject.RequestFullName,
                        value: apiResult.ResultObject.RequestUser,
                    }
                ];

                if (apiResult.ResultObject.objVehicleRentalRequest_ATT.FilePath != "") {
                    File.name = apiResult.ResultObject.objVehicleRentalRequest_ATT.FileName;
                    File.src = apiResult.ResultObject.objVehicleRentalRequest_ATT.FilePath;
                    AttachmentListData.push(File);
                }


                this.setState({
                    DataSource: apiResult.ResultObject,
                    IsLoadDataComplete: true,
                    UserValue: UserValue,
                    AttachmentListData
                })
            }
        })
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

    prevDataSubmit(formData, MLObject) {
        const { AttachmentListData, AttachmentList, fileSize } = this.state;
        MLObject.RequestUser = MLObject.RequestUser.value != undefined ? MLObject.RequestUser.value : MLObject.RequestUser;

        console.log("add", formData, MLObject)

        MLObject.CurrentVehicleRentalRequestStepID = 1;
        MLObject.CurrentVehicleRentalStatusID = 1;
        let data = new FormData();
        data.append("vehicleRentalRequestATTObj", AttachmentList.FileURL);
        data.append("vehicleRentalRequestObj", JSON.stringify(MLObject));

        console.log("data", data, MLObject)
        // this.handleSubmit(data)

    }

    handleSubmit(MLObject) {
        this.props.callFetchAPI(APIHostName, UpdateAPIPath, MLObject).then(apiResult => {
            console.log("submit", MLObject, apiResult)
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);
        });

    }

    handleSelectFile(file, nameValue) {
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

    onChangeUser(name, objUser) {
        this.setState({
            RequestUser: objUser.value
        })
    }


    render() {
        let currentDate = new Date();
        const { AttachmentListData, AttachmentList, fileSize, UserValue } = this.state;
        if (this.state.IsLoadDataComplete) {
            return (
                <React.Fragment>
                    <FormContainer
                        FormName={TitleFormEdit}
                        MLObjectDefinition={MLObjectDefinition}
                        dataSource={this.state.DataSource}
                        listelement={[]}
                        BackLink={BackLink}
                        // RequirePermission={this.props.location.state.AddFunctionID}
                        onSubmit={this.prevDataSubmit.bind(this)}
                        onchange={this.handleChange.bind(this)}
                    >

                        <div className="row">


                            <div className="col-md-6">
                                <FormControl.TextBox
                                    name="txtVehicleRentalRequestID"
                                    labelcolspan={4}
                                    colspan={8}
                                    readOnly={true}
                                    label="Mã yêu cầu"
                                    placeholder="Mã yêu cầu"
                                    controltype="InputControl"
                                    value=""
                                    datasourcemember="VehicleRentalRequestID"
                                    validatonList={['required']}
                                //classNameCustom="customcontrol"
                                />
                            </div>


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
                                    value=""
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
                                    value=""
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

                                <MultiSelectComboBox
                                    colspan="8"
                                    datasourcemember="RequestUser"
                                    disabled={false}
                                    isautoloaditemfromcache={false}
                                    IsLabelDiv={true}
                                    isMultiSelect={false}
                                    label="Người yêu cầu"
                                    labelcolspan="4"
                                    listoption={this.state.UserValue}
                                    name="cboRequestUser"
                                    controltype="InputMultiControl"
                                    // onChange={this.onChangeUser}
                                    validatonList={["Comborequired"]}
                                    value={this.state.UserValue}
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
        else {
            return <label>Đang nạp dữ liệu...</label>;
        }

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

const Edit = connect(mapStateToProps, mapDispatchToProps)(EditCom);
export default Edit;
