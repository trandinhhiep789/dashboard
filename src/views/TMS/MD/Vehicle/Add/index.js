import React from "react";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";

import {
    AddAPIPath,
    APIHostName,
    BackLink,
    AddPagePath,
    MLObjectDefinitionNew,
} from "../constants";

import {
    ERPCOMMONCACHE_PARTNER,
    ERPCOMMONCACHE_VEHICLEACTIVITYSTATUS,
    ERPCOMMONCACHE_VEHICLES,
} from "../../../../../constants/keyCache";

import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { callGetCache } from "../../../../../actions/cacheAction";
import { MessageModal } from "../../../../../common/components/Modal";
import { showModal, hideModal } from '../../../../../actions/modal';
import { updatePagePath } from "../../../../../actions/pageAction";
import { VEHICLE_ADD } from "../../../../../constants/functionLists";
import FormContainer from "../../../../../common/components/FormContainer";
import FormControl from "../../../../../common/components/FormContainer/FormControl";
import MultiSelectComboBox from "../../../../../common/components/FormContainer/FormControl/MultiSelectComboBox";
import MultiStoreComboBox from "../../../../../common/components/FormContainer/FormControl/MultiSelectComboBox/MultiStoreComboBox";
import ReactNotification from "react-notifications-component";

class AddCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            DataSource: {
                VehicleTypeID: "",
                Weight: 0,
                Length: 0,
                Width: 0,
                Height: 0,
                Volume: 0,
                PartnerID: "",
                VehicleName: "",
                LicensePlateNumber: "",
                ActivityStatusID: -1,
                Description: "",
                IsActived: true,
                IsSystem: false
            },
            MainDriverUser: "",
            MainCoordinatorStoreID: ""
        };

        this.searchref = React.createRef();
        this.gridref = React.createRef();
        this.notificationDOMRef = React.createRef();

        this.addNotification = this.addNotification.bind(this);
        this.handleChangeVehicleType = this.handleChangeVehicleType.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeStore = this.onChangeStore.bind(this);
        this.onChangeUser = this.onChangeUser.bind(this);
        this.showMessage = this.showMessage.bind(this);
    }


    componentDidMount() {
        this.props.updatePagePath(AddPagePath);

        this.props.callGetCache("ERPCOMMONCACHE.VEHICLEACTIVITYSTATUS").then(a => console.log("VEHICLEACTIVITYSTATUS", a.ResultObject.CacheData))
        this.props.callGetCache("ERPCOMMONCACHE.VEHICLEMODEL").then(a => console.log("VEHICLEMODEL", a.ResultObject.CacheData))
        this.props.callGetCache("ERPCOMMONCACHE.VEHICLERENTALREQSTEP").then(a => console.log("VEHICLERENTALREQSTEP", a.ResultObject.CacheData))
        this.props.callGetCache("ERPCOMMONCACHE.VEHICLERENTALREQTYPE").then(a => console.log("VEHICLERENTALREQTYPE", a.ResultObject.CacheData))
        this.props.callGetCache("ERPCOMMONCACHE.VEHICLETYPE").then(a => console.log("VEHICLETYPE", a.ResultObject))
    }

    addNotification(message1, IsError) {
        let cssNotification, iconNotification;
        if (!IsError) {
            cssNotification = "notification-custom-success";
            iconNotification = "fa fa-check"
        } else {
            cssNotification = "notification-danger";
            iconNotification = "fa fa-exclamation"
        }
        this.notificationDOMRef.current.addNotification({
            container: "bottom-right",
            content: (
                <div className={cssNotification}>
                    <div className="notification-custom-icon">
                        <i className={iconNotification} />
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

    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
                onCloseModal={() => { }}
            />
        );
    }

    onChangeUser(name, objUser) {
        this.setState({
            MainDriverUser: objUser.value
        })
    }

    onChangeStore(name, objstore) {
        this.setState({
            MainCoordinatorStoreID: objstore.value
        })
    }

    handleChangeVehicleType(name, comboValues) {
        console.log(name, comboValues);

        // oke đợi cache anh Học
        this.props.callGetCache(ERPCOMMONCACHE_VEHICLES).then(result => {
            console.log(result);
            this.setState({
                DataSource: {
                    ...this.state.dataSource,
                    Weight: 100
                }
            })
        })
    }

    handleSubmit(formData, MLObject) {
        const uptMLObject = {
            ...MLObject,
            MainDriverUser: this.state.MainDriverUser
        }

        this.props.callFetchAPI(APIHostName, AddAPIPath, uptMLObject).then(apiResult => {
            this.showMessage(apiResult.Message);
            if (!apiResult.IsError) {
                this.props.history.push("/Vehicle");
            }
        });
    }
    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <FormContainer
                    BackLink={BackLink}
                    dataSource={this.state.DataSource}
                    FormName="Thêm danh sách xe"
                    listelement={[]}
                    MLObjectDefinition={MLObjectDefinitionNew}
                    onSubmit={this.handleSubmit}
                    RequirePermission={VEHICLE_ADD}
                >

                    <div className="row">
                        <div className="col-md-6">
                            <FormControl.ComboBoxSelect
                                colspan="8"
                                controltype="InputControl"
                                datasourcemember="VehicleTypeID"
                                isautoloaditemfromcache={true}
                                label="loại xe"
                                labelcolspan="4"
                                listoption={null}
                                loaditemcachekeyid={ERPCOMMONCACHE_VEHICLES}
                                name="cbVehicleTypeID"
                                nameMember="VehicleTypeName"
                                onValueChangeCustom={this.handleChangeVehicleType}
                                placeholder="-- Vui lòng chọn --"
                                // validatonList={["Comborequired"]}
                                value={""}
                                valuemember="VehicleTypeID"
                            />
                        </div>

                        <div className="col-md-6">
                            <FormControl.FormControlComboBox
                                colspan="8"
                                controltype="InputControl"
                                datasourcemember="PartnerID"
                                isautoloaditemfromcache={true}
                                label="đối tác"
                                labelcolspan="4"
                                listoption={null}
                                loaditemcachekeyid={ERPCOMMONCACHE_PARTNER}
                                name="cbPartnerID"
                                nameMember="PartnerName"
                                placeholder="---Vui lòng chọn---"
                                validatonList={["Comborequired"]}
                                value={""}
                                valuemember="PartnerID"
                            />
                        </div>

                        <div className="col-md-6">
                            <FormControl.TextBox
                                colspan="8"
                                controltype="InputControl"
                                datasourcemember="Weight"
                                label="tải trọng(kg)"
                                labelcolspan="4"
                                maxSize={9}
                                name="txtWeight"
                                placeholder="Tải trọng(kg)"
                                readOnly={true}
                                value={""}
                            />
                        </div>

                        <div className="col-md-6">
                            <FormControl.TextBox
                                colspan="8"
                                controltype="InputControl"
                                datasourcemember="VehicleName"
                                label="tên xe"
                                labelcolspan="4"
                                maxSize={9}
                                name="txtVehicleName"
                                placeholder="Tên xe"
                                validatonList={['required']}
                                value={""}
                            />
                        </div>

                        <div className="col-md-6">
                            <FormControl.TextBox
                                colspan="8"
                                controltype="InputControl"
                                datasourcemember="Length"
                                label="chiều dài(cm)"
                                labelcolspan="4"
                                maxSize={9}
                                name="txtLength"
                                placeholder="Chiều dài(cm)"
                                readOnly={true}
                                value={""}
                            />
                        </div>

                        <div className="col-md-6">
                            <FormControl.TextBox
                                colspan="8"
                                controltype="InputControl"
                                datasourcemember="LicensePlateNumber"
                                label="biển số xe"
                                labelcolspan="4"
                                maxSize={50}
                                name="txtLicensePlateNumber"
                                placeholder="Biển số xe"
                                validatonList={['required']}
                                value={""}
                            />
                        </div>

                        <div className="col-md-6">
                            <FormControl.TextBox
                                colspan="8"
                                controltype="InputControl"
                                datasourcemember="Width"
                                label="chiều rộng(cm)"
                                labelcolspan="4"
                                maxSize={9}
                                name="txtWidth"
                                placeholder="Chiều rộng(cm)"
                                readOnly={true}
                                value={""}
                            />
                        </div>

                        <div className="col-md-6">
                            <FormControl.TextBox
                                colspan="8"
                                controltype="InputControl"
                                datasourcemember="VehicleModelID"
                                label="Model xe"
                                labelcolspan="4"
                                maxSize={10}
                                name="txtVehicleModelID"
                                placeholder="Model xe"
                                validatonList={["number"]}
                                value={""}
                            />
                        </div>

                        <div className="col-md-6">
                            <FormControl.TextBox
                                colspan="8"
                                controltype="InputControl"
                                datasourcemember="Height"
                                label="chiều cao(cm)"
                                labelcolspan="4"
                                maxSize={9}
                                name="txtHeight"
                                placeholder="Chiều cao(cm)"
                                readOnly={true}
                                value=""
                            />
                        </div>

                        <div className="col-md-6">
                            <FormControl.ComboBoxSelect
                                colspan="8"
                                controltype="InputControl"
                                datasourcemember="ActivityStatusID"
                                isautoloaditemfromcache={true}
                                label="Trạng thái hoạt động"
                                labelcolspan="4"
                                listoption={null}
                                loaditemcachekeyid={ERPCOMMONCACHE_VEHICLEACTIVITYSTATUS}
                                name="cbActivityStatusID"
                                nameMember="ActivityStatusName"
                                placeholder="-- Vui lòng chọn --"
                                validatonList={["Comborequired"]}
                                value={""}
                                valuemember="ActivityStatusID"
                            />
                        </div>

                        <div className="col-md-6">
                            <FormControl.TextBox
                                colspan="8"
                                controltype="InputControl"
                                datasourcemember="Volume"
                                label="thể tích(cm3)"
                                labelcolspan="4"
                                maxSize={9}
                                name="txtVolume"
                                placeholder="Thể tích(cm3)"
                                readOnly={true}
                                value=""
                            />
                        </div>

                        <div className="col-md-6">
                            <MultiSelectComboBox
                                colspan="8"
                                controltype="InputControl"
                                datasourcemember="MainDriverUser"
                                isautoloaditemfromcache={false}
                                IsLabelDiv={true}
                                isMultiSelect={false}
                                label="nhân viên tài xế chính"
                                labelcolspan="4"
                                listoption={[]}
                                name="cbMainDriverUser"
                                onChange={this.onChangeUser}
                                validatonList={["Comborequired"]}
                                value={[]}
                            />
                        </div>

                        <div className="col-md-6">
                            <FormControl.TextBox
                                colspan="8"
                                controltype="InputControl"
                                datasourcemember="OrderIndex"
                                label="Thứ tự hiển thị"
                                labelcolspan="4"
                                name="txtOrderIndex"
                                placeholder="Thứ tự hiển thị"
                                validatonList={[]}
                                value={""}
                            />
                        </div>

                        <div className="col-md-6">
                            <FormControl.FormControlComboBox
                                colspan="8"
                                controltype="InputControl"
                                datasourcemember="MainCoordinatorStoreID"
                                disabled={this.state.IsSystem}
                                filterobj="CompanyID"
                                filterValue={10}
                                isautoloaditemfromcache={true}
                                label="kho điều phối chính"
                                labelcolspan="4"
                                listoption={null}
                                loaditemcachekeyid="ERPCOMMONCACHE.STORE"
                                name="cbMainCoordinatorStoreID"
                                nameMember="StoreName"
                                placeholder="-- Vui lòng chọn --"
                                readOnly={this.state.IsSystem}
                                validatonList={["Comborequired"]}
                                value={""}
                                valuemember="StoreID"
                            />
                        </div>

                        <div className="col-md-6">
                            <FormControl.TextArea
                                classNameCustom="customcontrol"
                                colspan={8}
                                controltype="InputControl"
                                datasourcemember="Description"
                                label="Mô tả"
                                labelcolspan={4}
                                maxSize={500}
                                name="txtDescription"
                                placeholder="Mô tả"
                                rows={4}
                            />
                        </div>

                        <div className="col-md-6">
                            <FormControl.CheckBox
                                classNameCustom="customCheckbox"
                                colspan="8"
                                controltype="InputControl"
                                datasourcemember="IsActived"
                                label="kích hoạt"
                                labelcolspan="4"
                                name="chkIsActived"
                                value={""}
                            />
                        </div>

                        <div className="col-md-6">
                            <FormControl.CheckBox
                                classNameCustom="customCheckbox"
                                colspan="8"
                                controltype="InputControl"
                                datasourcemember="IsSystem"
                                label="hệ thống"
                                labelcolspan="4"
                                name="chkIsSystem"
                                value=""
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

const Edit = connect(mapStateToProps, mapDispatchToProps)(AddCom);
export default Edit;
