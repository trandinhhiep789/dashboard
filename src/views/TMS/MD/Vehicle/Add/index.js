import React from "react";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";

import {
    APIHostName,
    BackLink,
    EditPagePath,
    MLObjectDefinition,
    AddAPIPath,
} from "../constants";

import {
    ERPCOMMONCACHE_STORE,
    ERPCOMMONCACHE_VEHICLEACTIVITYSTATUS,
    ERPCOMMONCACHE_VEHICLETYPE,
    ERPCOMMONCACHE_PARTNER
} from "../../../../../constants/keyCache";

import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { callGetCache } from "../../../../../actions/cacheAction";
import { MessageModal } from "../../../../../common/components/Modal";
import { showModal, hideModal } from '../../../../../actions/modal';
import { updatePagePath } from "../../../../../actions/pageAction";
import { VEHICLE_UPDATE } from "../../../../../constants/functionLists";
import FormContainer from "../../../../../common/components/FormContainer";
import FormControl from "../../../../../common/components/FormContainer/FormControl";
import MultiSelectComboBox from "../../../../../common/components/FormContainer/FormControl/MultiSelectComboBox";
import MultiStoreComboBox from "../../../../../common/components/FormContainer/FormControl/MultiSelectComboBox/MultiStoreComboBox";
import ReactNotification from "react-notifications-component";

class EditCom extends React.Component {
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
            UserValue: [],
            VehicleTypeCache: null
        };

        this.searchref = React.createRef();
        this.gridref = React.createRef();
        this.notificationDOMRef = React.createRef();

        this.addNotification = this.addNotification.bind(this);
        this.callGetCacheVehicleType = this.callGetCacheVehicleType.bind(this);
        this.handleChangeFormContainer = this.handleChangeFormContainer.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeStore = this.onChangeStore.bind(this);
        this.onChangeUser = this.onChangeUser.bind(this);
        this.showMessage = this.showMessage.bind(this);
    }


    componentDidMount() {
        this.props.updatePagePath(EditPagePath);
        this.callGetCacheVehicleType();
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

    callGetCacheVehicleType() {
        this.props.callGetCache(ERPCOMMONCACHE_VEHICLETYPE).then(result => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                this.setState({
                    VehicleTypeCache: result.ResultObject.CacheData
                })
            } else {
                this.addNotificatadd("Lỗi load thông tin loại xe");
            }
        })
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

    handleSubmit(formData, MLObject) {
        const uptMLObject = {
            ...this.state.DataSource,
            MainDriverUser: this.state.MainDriverUser
        }

        this.props.callFetchAPI(APIHostName, AddAPIPath, uptMLObject).then(apiResult => {
            this.showMessage(apiResult.Message);
            if (!apiResult.IsError) {
                this.props.history.push("/Vehicle");
            }
        });
    }

    handleChangeFormContainer(FormData, MLObjectDefinition) {
        const newDataSource = MLObjectDefinition.reduce((acc, val, index) => {
            console.log(val.BindControlName, FormData[val.BindControlName])
            return {
                ...acc,
                [val.Name]: FormData[val.BindControlName].value
            }
        }, {});

        if (newDataSource.VehicleTypeID == this.state.DataSource.VehicleTypeID) {
            this.setState({
                DataSource: {
                    ...this.state.DataSource,
                    ...newDataSource
                }
            })
        } else {
            const foundVehicleTypeInfo = this.state.VehicleTypeCache.find(item => item.VehicleTypeID == newDataSource.VehicleTypeID);

            this.setState({
                DataSource: {
                    ...this.state.DataSource,
                    ...newDataSource,
                    Weight: foundVehicleTypeInfo.Weight,
                    Length: foundVehicleTypeInfo.Length,
                    Width: foundVehicleTypeInfo.Width,
                    Height: foundVehicleTypeInfo.Height,
                    Volume: foundVehicleTypeInfo.Volume
                }
            })
        }
    }

    render() {
        if (this.state.DataSource == null || this.state.VehicleTypeCache == null) {
            return (
                <React.Fragment>
                    <ReactNotification ref={this.notificationDOMRef} />
                    Đang nạp dữ liệu ...
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <ReactNotification ref={this.notificationDOMRef} />
                    <FormContainer
                        BackLink={BackLink}
                        dataSource={this.state.DataSource}
                        FormName="Cập nhật danh sách xe"
                        listelement={[]}
                        MLObjectDefinition={MLObjectDefinition}
                        onchange={this.handleChangeFormContainer}
                        onSubmit={this.handleSubmit}
                        RequirePermission={VEHICLE_UPDATE}
                    >
                        <div className="row">
                            <div className="col-md-6">
                                <FormControl.ComboBoxSelect
                                    colspan="8"
                                    controltype="InputControl"
                                    datasourcemember="VehicleTypeID"
                                    disabled={this.state.DataSource.IsSystem}
                                    isautoloaditemfromcache={true}
                                    label="loại xe"
                                    labelcolspan="4"
                                    listoption={[]}
                                    loaditemcachekeyid={ERPCOMMONCACHE_VEHICLETYPE}
                                    name="cbVehicleTypeID"
                                    nameMember="VehicleTypeName"
                                    placeholder="-- Vui lòng chọn --"
                                    readOnly={this.state.IsSystem}
                                    validatonList={["Comborequired"]}
                                    value={""}
                                    valuemember="VehicleTypeID"
                                />
                            </div>

                            <div className="col-md-6">
                                <FormControl.ComboBoxSelect
                                    colspan="8"
                                    controltype="InputControl"
                                    datasourcemember="PartnerID"
                                    disabled={this.state.DataSource.IsSystem}
                                    isautoloaditemfromcache={true}
                                    label="đối tác"
                                    labelcolspan="4"
                                    listoption={[]}
                                    loaditemcachekeyid={ERPCOMMONCACHE_PARTNER}
                                    name="cbPartnerID"
                                    nameMember="PartnerName"
                                    placeholder="-- Vui lòng chọn --"
                                    readOnly={this.state.IsSystem}
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
                                <FormControl.FormControlTextBox
                                    colspan="8"
                                    controltype="InputControl"
                                    datasourcemember="VehicleName"
                                    disabled={this.state.DataSource.IsSystem}
                                    label="tên xe"
                                    labelcolspan="4"
                                    maxSize={200}
                                    name="txtVehicleName"
                                    placeholder="Tên xe"
                                    readOnly={this.state.DataSource.IsSystem}
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
                                    disabled={this.state.DataSource.IsSystem}
                                    label="biển số xe"
                                    labelcolspan="4"
                                    maxSize={50}
                                    name="txtLicensePlateNumber"
                                    placeholder="Biển số xe"
                                    readOnly={this.state.DataSource.IsSystem}
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
                                    readOnly={this.state.DataSource.IsSystem}
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
                                    disabled={this.state.DataSource.IsSystem}
                                    isautoloaditemfromcache={true}
                                    label="Trạng thái hoạt động"
                                    labelcolspan="4"
                                    listoption={[]}
                                    loaditemcachekeyid={ERPCOMMONCACHE_VEHICLEACTIVITYSTATUS}
                                    name="cbActivityStatusID"
                                    nameMember="ActivityStatusName"
                                    placeholder="-- Vui lòng chọn --"
                                    readOnly={this.state.DataSource.IsSystem}
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
                                    datasourcemember="MainDriverUser"
                                    disabled={this.state.DataSource.IsSystem}
                                    isautoloaditemfromcache={false}
                                    IsLabelDiv={true}
                                    isMultiSelect={false}
                                    label="nhân viên tài xế chính"
                                    labelcolspan="4"
                                    listoption={this.state.UserValue}
                                    name="cbMainDriverUser"
                                    onChange={this.onChangeUser}
                                    validatonList={["Comborequired"]}
                                    value={this.state.UserValue}
                                />
                            </div>

                            <div className="col-md-6">
                                <FormControl.CheckBox
                                    classNameCustom="customCheckbox"
                                    colspan="8"
                                    controltype="InputControl"
                                    datasourcemember="IsActived"
                                    disabled={this.state.DataSource.IsSystem}
                                    label="kích hoạt"
                                    labelcolspan="4"
                                    name="chkIsActived"
                                    readOnly={this.state.DataSource.IsSystem}
                                    value={true}
                                />
                            </div>

                            <div className="col-md-6">
                                <FormControl.FormControlComboBox
                                    colspan="8"
                                    controltype="InputControl"
                                    datasourcemember="MainCoordinatorStoreID"
                                    disabled={this.state.DataSource.IsSystem}
                                    filterobj="CompanyID"
                                    filterValue={10}
                                    isautoloaditemfromcache={true}
                                    label="kho điều phối chính"
                                    labelcolspan="4"
                                    listoption={null}
                                    loaditemcachekeyid={ERPCOMMONCACHE_STORE}
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
                                <FormControl.CheckBox
                                    classNameCustom="customCheckbox"
                                    colspan="8"
                                    controltype="InputControl"
                                    datasourcemember="IsSystem"
                                    label="hệ thống"
                                    labelcolspan="4"
                                    name="chkIsSystem"
                                    readOnly={false}
                                    value=""
                                />
                            </div>

                            <div className="col-md-6">
                                <FormControl.TextArea
                                    classNameCustom="customcontrol"
                                    colspan={8}
                                    controltype="InputControl"
                                    datasourcemember="Description"
                                    disabled={this.state.DataSource.IsSystem}
                                    label="Mô tả"
                                    labelcolspan={4}
                                    maxSize={500}
                                    name="txtDescription"
                                    placeholder="Mô tả"
                                    readOnly={this.state.DataSource.IsSystem}
                                    rows={4}
                                />
                            </div>
                        </div>
                    </FormContainer>
                </React.Fragment>
            );
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: () => {
            dispatch(hideModal());
        }
    };
};

const Edit = connect(mapStateToProps, mapDispatchToProps)(EditCom);
export default Edit;
