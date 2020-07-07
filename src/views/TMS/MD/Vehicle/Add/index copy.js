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
    AddPagePath,
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callGetCache } from "../../../../../actions/cacheAction";
import { COORDINATORSTORE_ADD } from "../../../../../constants/functionLists";
import CoordinatorStoreWard from '../../CoordinatorStoreWard'
import StoreWard from "../../CoordinatorStoreWard/Component/StoreWard";
import ReactNotification from "react-notifications-component";
import DeliverUserList from "../../../ShipmentOrder/Component/DeliverUserList";

import MultiSelectComboBox from "../../../../../common/components/FormContainer/FormControl/MultiSelectComboBox";
import MultiStoreComboBox from "../../../../../common/components/FormContainer/FormControl/MultiSelectComboBox/MultiStoreComboBox";

class AddCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.addNotification = this.addNotification.bind(this);

        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false,
            DataSource: [],
            DataWard: [],
            cssNotification: "",
            iconNotification: "",
            MainDriverUser: "",
        };
        this.searchref = React.createRef();
        this.gridref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }


    componentDidMount() {
        this.props.updatePagePath(AddPagePath);

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

        const { MainDriverUser } = this.state;
        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginlogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        MLObject.MainDriverUser = MainDriverUser;
        console.log("handleSubmit", MLObject)
        this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);
        });
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

    onChangeUser(name, objUser) {

        this.setState({
            MainDriverUser: objUser.value
        })
    }

    onChangeStore(name, objstore) {
        console.log("onChangeStore", name, objstore)
    }


    render() {
        const { DataSource } = this.state;
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }

        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <FormContainer
                    FormName="Thêm danh sách xe"
                    MLObjectDefinition={MLObjectDefinition}
                    listelement={[]}
                    onSubmit={this.handleSubmit}
                    BackLink={BackLink}
                //RequirePermission={COORDINATORSTORE_ADD}
                >

                    <div className="row">
                        <div className="col-md-6">
                            <FormControl.TextBox
                                name="txtVehicleID"
                                colspan="8"
                                labelcolspan="4"
                                readOnly={false}
                                label="mã xe"
                                placeholder="Mã xe"
                                controltype="InputControl"
                                value=""
                                maxSize={9}
                                datasourcemember="VehicleID"
                                validatonList={['required', 'number']}
                            />
                        </div>
                        <div className="col-md-6">
                            <FormControl.TextBox
                                name="txtVehicleName"
                                colspan="8"
                                labelcolspan="4"
                                readOnly={false}
                                label="tên xe"
                                placeholder="Tên xe"
                                controltype="InputControl"
                                value=""
                                datasourcemember="VehicleName"
                                validatonList={['required']}
                            />
                        </div>

                        <div className="col-md-6">
                            <FormControl.TextBox
                                name="txtLicensePlateNumber"
                                colspan="8"
                                labelcolspan="4"
                                readOnly={false}
                                label="biển số xe"
                                placeholder="Biển số xe"
                                controltype="InputControl"
                                value=""
                                datasourcemember="LicensePlateNumber"
                                validatonList={['required']}
                            />
                        </div>

                        {/* <div className="col-md-6">

                            <FormControl.FormControlComboBox
                                name="txtPartnerID"
                                colspan="8"
                                labelcolspan="4"
                                label="đơn vị vận chuyển"
                                isautoloaditemfromcache={true}
                                loaditemcachekeyid="ERPCOMMONCACHE.PARTNER"
                                valuemember="PartnerID"
                                nameMember="PartnerName"
                                controltype="InputControl"
                                placeholder="---Vui lòng chọn---"
                                value={""}
                                listoption={null}
                                filterValue={2}
                                filterobj="PartnerTypeID"
                                filterrest="ShipmentOrder_DeliverUserList"
                                datasourcemember="PartnerID" />
                        </div> */}

                        <div className="col-md-6">
                            {/* <DeliverUserList
                                name="ShipmentOrder_DeliverUserList"
                                colspan="8"
                                labelcolspan="4"
                                label="Nhân viên tài xế chính"
                                IsLabelDiv={true}
                                validatonList={["Comborequired"]}
                                controltype="InputMultiControl"
                                datasourcemember="ShipmentOrder_DeliverUserList"
                                filterName="txtPartnerID"
                                isMultiSelect={false}
                            /> */}

                            <MultiSelectComboBox
                                name="MainDriverUser"
                                colspan="8"
                                labelcolspan="4"
                                label="Nhân viên tài xế chính"
                                disabled={false}
                                IsLabelDiv={true}
                                isautoloaditemfromcache={false}
                                onChange={this.onChangeUser.bind(this)}
                                controltype="InputControl"
                                value={[]}
                                listoption={[]}
                                isMultiSelect={false}
                                datasourcemember="MainDriverUser"
                                validationErrorMessage={''}
                            />
                        </div>
                        <div className="col-md-6">
                            <MultiStoreComboBox
                                name="cbMainCoordinatorStoreID"
                                colspan="8"
                                labelcolspan="4"
                                label="kho điều phối chính"
                                disabled={false}
                                IsLabelDiv={false}
                                isautoloaditemfromcache={false}
                                onChange={this.onChangeStore.bind(this)}
                                controltype="InputControl"
                                value={[]}
                                listoption={[]}
                                isMultiSelect={false}
                                datasourcemember="MainCoordinatorStoreID"
                                validationErrorMessage={''}
                                IsLabelDiv="kho điều phối chính"
                            />
                        </div>

                        {/* <div className="col-md-6">
                            <FormControl.FormControlComboBox
                                name="cbDistrictID"
                                colspan="8"
                                labelcolspan="4"
                                disabled=""
                                label="Quận/huyện"
                                validatonList={["Comborequired"]}
                                isautoloaditemfromcache={true}
                                loaditemcachekeyid="ERPCOMMONCACHE.DISTRICT"
                                valuemember="DistrictID"
                                nameMember="DistrictName"
                                controltype="InputControl"
                                value={-1}
                                listoption={[]}
                                datasourcemember="DistrictID"
                                filterValue=""
                                filterobj="DistrictID"
                                filterrest="cbMainCoordinatorStoreID"
                            />
                        </div>
                        <div className="col-md-6">
                            <FormControl.FormControlComboBox
                                name="cbMainCoordinatorStoreID"
                                colspan="8"
                                labelcolspan="4"
                                label="kho điều phối chính"
                                validatonList={["Comborequired"]}
                                placeholder="-- Vui lòng chọn --"
                                isautoloaditemfromcache={true}
                                loaditemcachekeyid="ERPCOMMONCACHE.STORE"
                                valuemember="StoreID"
                                nameMember="StoreName"
                                controltype="InputControl"
                                value={""}
                                listoption={[]}
                                datasourcemember="MainCoordinatorStoreID"
                                filterName="cbDistrictID"
                                filterobj="DistrictID"
                            />
                        </div> */}


                        <div className="col-md-6">
                            <FormControl.TextBox
                                name="txtWeight"
                                colspan="8"
                                labelcolspan="4"
                                readOnly={false}
                                label="tải trọng(kg)"
                                placeholder="Tải trọng(kg)"
                                controltype="InputControl"
                                value=""
                                maxSize={9}
                                datasourcemember="Weight"
                                validatonList={['required', 'number']}
                            />
                        </div>

                        <div className="col-md-6">
                            <FormControl.TextBox
                                name="txtVolume"
                                colspan="8"
                                labelcolspan="4"
                                readOnly={false}
                                label="thể tích(m3)"
                                placeholder="Thể tích(m3)"
                                controltype="InputControl"
                                value=""
                                maxSize={9}
                                datasourcemember="Volume"
                                validatonList={['required', 'number']}
                            />
                        </div>
                        <div className="col-md-6">
                            <FormControl.TextBox
                                name="txtLength"
                                colspan="8"
                                labelcolspan="4"
                                readOnly={false}
                                label="chiều dài(m)"
                                placeholder="Chiều dài(m)"
                                controltype="InputControl"
                                value=""
                                maxSize={9}
                                datasourcemember="Length"
                                validatonList={['required', 'number']}
                            />
                        </div>

                        <div className="col-md-6">
                            <FormControl.TextBox
                                name="txtWidth"
                                colspan="8"
                                labelcolspan="4"
                                readOnly={false}
                                label="chiều rộng(m)"
                                placeholder="Chiều rộng(m)"
                                controltype="InputControl"
                                value=""
                                maxSize={9}
                                datasourcemember="Width"
                                validatonList={['required', 'number']}
                            />
                        </div>

                        <div className="col-md-6">
                            <FormControl.TextBox
                                name="txtHeight"
                                colspan="8"
                                labelcolspan="4"
                                readOnly={false}
                                label="chiều cao(m)"
                                placeholder="Chiều cao(m)"
                                controltype="InputControl"
                                value=""
                                maxSize={9}
                                datasourcemember="Height"
                                validatonList={['required', 'number']}
                            />
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
                            />
                        </div>

                        <div className="col-md-6">
                            <FormControl.CheckBox
                                name="chkIsActived"
                                colspan="8"
                                labelcolspan="4"
                                readOnly={false}
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
        }
    };
};

const Add = connect(mapStateToProps, mapDispatchToProps)(AddCom);
export default Add;
