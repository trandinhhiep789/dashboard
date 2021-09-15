import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import InputGrid from "../../../../../common/components/FormContainer/FormControl/InputGrid";
import FormContainer from "../../../../../common/components/FormContainer";
import FormControl from "../../../../../common/components/FormContainer/FormControl";
import { MessageModal } from "../../../../../common/components/Modal";
import { showModal, hideModal } from '../../../../../actions/modal';
import { MODAL_TYPE_SEARCH, MODAL_TYPE_COMMONTMODALS, MODAL_TYPE_CONFIRMATION } from '../../../../../constants/actionTypes';
import SearchModal from "../../../../../common/components/Form/AdvanceForm/FormControl/FormSearchModal"
import InputGridControl from "../../../../../common/components/FormContainer/FormControl/InputGrid/InputGridControl.js";
import MD5Digest from "../../../../../common/library/cryptography/MD5Digest.js";
import {
    APIHostName,
    AddAPIPath,
    MLObjectDefinition,
    BackLink,
    EditPagePath,
    UpdateAPIPath,
    LoadAPIPath,

} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";
import { DELIVERYTIMEFRAME_UPDATE, WORKINGSHIFT_UPDATE } from "../../../../../constants/functionLists";
import CoordinatorStoreWard from '../../CoordinatorStoreWard'
import StoreWard from "../../CoordinatorStoreWard/Component/StoreWard";
import ReactNotification from "react-notifications-component";
import DeliverUserList from "../../../ShipmentOrder/Component/DeliverUserList";
import MultiSelectComboBox from "../../../../../common/components/FormContainer/FormControl/MultiSelectComboBox";
import MultiStoreComboBox from "../../../../../common/components/FormContainer/FormControl/MultiSelectComboBox/MultiStoreComboBox";

import { ERPCOMMONCACHE_CARRIERTYPE, ERPCOMMONCACHE_WORKINGSHIFT, ERPRELATECACHE_DELIVERYTIMEFRAME } from "../../../../../constants/keyCache";


class EditCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);

        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false,
            DataSource: [],
            DataWard: [],
            cssNotification: "",
            iconNotification: "",
            MainDriverUser: "",
            IsSystem: false,
            MainCoordinatorStoreID: "",

        };
        this.searchref = React.createRef();
        this.gridref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }


    componentDidMount() {
        this.props.updatePagePath(EditPagePath);
        this.callLoadData(this.props.match.params.id);

    }

    callLoadData(id) {
        this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then((apiResult) => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
                const start = apiResult.ResultObject.FromTime;
                const hourStart = Math.floor(start / 60);
                const minStart = start % 60;//Math.floor((apiResult.ResultObject.TimeStart - hourStart) / 60);
                const timeStart = (hourStart + ":" + minStart).toString()

                const end = apiResult.ResultObject.ToTime;
                const hourEnd = Math.floor(end / 60);
                const minEnd = end % 60//Math.floor((apiResult.ResultObject.TimeEnd - hourEnd) / 60);

                const timeEnd = (hourEnd + ":" + minEnd).toString()

                apiResult.ResultObject.FromTime = timeStart;
                apiResult.ResultObject.ToTime = timeEnd;

                this.setState({
                    DataSource: apiResult.ResultObject,
                    IsSystem: apiResult.ResultObject.IsSystem,
                    IsLoadDataComplete: true,
                });
            }
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


    handleSubmit(formData, MLObject) {
        //console.log('aa', formData, MLObject)
        MLObject.DeliveryTimeFrameID = this.props.match.params.id;
        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginlogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        const start = MLObject.FromTime.split(':');
        const end = MLObject.ToTime.split(':');
        const countStart = (parseInt(start[0]) * 60) + parseInt(start[1]);
        const countEnd = (parseInt(end[0]) * 60) + parseInt(end[1]);
        MLObject.FromTime = countStart;
        MLObject.ToTime = countEnd;

        if (countEnd < countStart) {
            formData.txtToTime.ErrorLst.IsValidatonError = true;
            formData.txtToTime.ErrorLst.ValidatonErrorMessage = "Thời gian kết thúc phải lớn hơn thời gian bắt đầu";
            return;
        }

        this.props.callFetchAPI(APIHostName, UpdateAPIPath, MLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);
            if (!apiResult.IsError) {
                this.props.callClearLocalCache(ERPRELATECACHE_DELIVERYTIMEFRAME);
            }
        });
    }

    handleChange(formData, MLObject) {
        if (formData.txtToTime.value != '' && formData.txtFromTime.value != '') {
            const start = formData.txtFromTime.value.split(':');
            const end = formData.txtToTime.value.split(':');
            const countStart = (parseInt(start[0]) * 60) + parseInt(start[1]);
            const countEnd = (parseInt(end[0]) * 60) + parseInt(end[1]);
            if (countEnd <= countStart) {
                formData.txtToTime.ErrorLst.IsValidatonError = true;
                formData.txtToTime.ErrorLst.ValidatonErrorMessage = "Thời gian kết thúc phải lớn hơn thời gian bắt đầu";
            }
            else {
                formData.txtToTime.ErrorLst.IsValidatonError = false;
                formData.txtToTime.ErrorLst.ValidatonErrorMessage = "";
            }
        }
    }


    render() {

        const { DataSource } = this.state;
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }

        return (
            <React.Fragment>
                <FormContainer
                    FormName="Cập nhật khung thời gian vận chuyển"
                    MLObjectDefinition={MLObjectDefinition}
                    listelement={[]}
                    onSubmit={this.handleSubmit}
                    dataSource={this.state.DataSource}
                    BackLink={BackLink}
                    onchange={this.handleChange.bind(this)}
                    RequirePermission={DELIVERYTIMEFRAME_UPDATE}
                >

                    <div className="row">
                        {/* <div className="col-md-6">
                            <FormControl.TextBox
                                name="txtDeliveryTimeFrameID"
                                colspan="8"
                                labelcolspan="4"
                                disabled={true}
                                readOnly={true}
                                label="mã khung thời gian vận chuyển"
                                placeholder="Mã khung thời gian vận chuyển"
                                controltype="InputControl"
                                value=""
                                maxSize={9}
                                datasourcemember="DeliveryTimeFrameID"
                                validatonList={['required', 'number']}
                            />
                        </div> */}
                        <div className="col-md-6">
                            <FormControl.TextBox
                                name="txtDeliveryTimeFrameName"
                                colspan="8"
                                labelcolspan="4"
                                readOnly={false}
                                label="tên khung thời gian vận chuyển"
                                placeholder="Tên khung thời gian vận chuyển"
                                controltype="InputControl"
                                value=""
                                maxSize={200}
                                datasourcemember="DeliveryTimeFrameName"
                                validatonList={['required']}
                            />
                        </div>

                        {/* <div className="col-md-6">
                            <FormControl.ComboBoxSelect
                                name="txtCarrierTypeID"
                                colspan="8"
                                labelcolspan="4"
                                //onValueChangeCustom={this.onValueChangeSote.bind(this)}
                                // disabled={this.state.IsSystem}
                                // readOnly={this.state.IsSystem}
                                label="Phương tiện vận chuyển"
                                validatonList={["Comborequired"]}
                                placeholder="-- Vui lòng chọn --"
                                isautoloaditemfromcache={true}
                                isusercache={true}
                                loaditemcachekeyid={ERPCOMMONCACHE_CARRIERTYPE}
                                valuemember="CarrierTypeID"
                                nameMember="CarrierTypeName"
                                controltype="InputControl"
                                value={""}
                                listoption={null}
                                datasourcemember="CarrierTypeID" />
                        </div> */}

                        <div className="col-md-6">
                            <FormControl.FormControlHour
                                name="txtFromTime"
                                colspan="8"
                                labelcolspan="4"
                                readOnly={false}
                                label="Từ thời gian"
                                placeholder="Từ thời gian(tính bằng phút từ 0 giờ)"
                                controltype="InputControl"
                                formatHour="HH:mm"
                                value=""
                                datasourcemember="FromTime"
                                validatonList={['required']}
                            />
                        </div>


                        <div className="col-md-6">
                            <FormControl.FormControlHour
                                name="txtToTime"
                                colspan="8"
                                labelcolspan="4"
                                readOnly={false}
                                formatHour="HH:mm"
                                label="Đến thời gian"
                                placeholder="Đến thời gian(tính bằng phút từ 0 giờ)"
                                controltype="InputControl"
                                value=""
                                datasourcemember="ToTime"
                                validatonList={['required']}
                            />
                        </div>

                        <div className="col-md-6">
                            <FormControl.TextBox
                                name="txtOrderIndex"
                                colspan="8"
                                labelcolspan="4"
                                readOnly={false}
                                label="Thứ tự hiển thị"
                                placeholder="Thứ tự hiển thị"
                                controltype="InputControl"
                                value=""
                                maxSize={9}
                                datasourcemember="OrderIndex"
                                validatonList={['number']}
                            />

                            {/* <FormControl.ComboBoxSelect

                                name="cbShiftNumber"
                                colspan="8"
                                labelcolspan="4"
                                label="khung thời gian vận chuyển số"
                                validatonList={["Comborequired"]}
                                placeholder="-- Vui lòng chọn --"
                                isautoloaditemfromcache={true}
                                loaditemcachekeyid="ERPCOMMONCACHE.WORKINGSHIFT"
                                valuemember="WorkingShiftID"
                                nameMember="WorkingShiftName"
                                controltype="InputControl"
                                value={""}
                                listoption={null}
                                datasourcemember="WorkingShiftID" /> */}


                        </div>

                    </div>

                    <div className="row">

                        <div className="col-md-12">
                            <FormControl.TextArea
                                labelcolspan={2}
                                colspan={10}
                                name="txtDescription"
                                label="Mô tả"
                                placeholder="Mô tả"
                                datasourcemember="Description"
                                controltype="InputControl"
                                rows={6}
                                maxSize={500}
                                classNameCustom="customcontrol"
                                disabled={this.state.IsSystem}
                                readOnly={this.state.IsSystem}
                            />
                        </div>

                        <div className="col-md-6">
                            <FormControl.CheckBox
                                name="chkIsActived"
                                colspan="8"
                                labelcolspan="4"
                                disabled={this.state.IsSystem}
                                readOnly={this.state.IsSystem}
                                label="kích hoạt"
                                controltype="InputControl"
                                value={true}
                                datasourcemember="IsActived"
                                classNameCustom="customCheckbox"
                            />
                        </div>

                        <div className="col-md-6">
                            <FormControl.CheckBox
                                name="chkIsSystem"
                                colspan="8"
                                labelcolspan="4"
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: () => {
            dispatch(hideModal());
        },
        callClearLocalCache: (cacheKeyID) => {
            return dispatch(callClearLocalCache(cacheKeyID));
        }
    };
};

const Edit = connect(mapStateToProps, mapDispatchToProps)(EditCom);
export default Edit;
