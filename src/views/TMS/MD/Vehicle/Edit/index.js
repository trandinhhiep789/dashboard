import React from "react";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import ReactNotification from "react-notifications-component";

import {
    APIHostName,
    BackLink,
    EditPagePath,
    LoadAPIPath,
    MLObjectDefinition,
    UpdateAPIPath,
} from "../constants";

import {
    ERPCOMMONCACHE_PARTNER,
    ERPCOMMONCACHE_STORE,
    ERPCOMMONCACHE_VEHICLEACTIVITYSTATUS,
    ERPCOMMONCACHE_VEHICLEMODEL,
    ERPCOMMONCACHE_VEHICLETYPE,
} from "../../../../../constants/keyCache";

import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { callGetCache } from "../../../../../actions/cacheAction";
import { MessageModal } from "../../../../../common/components/Modal";
import { showModal, hideModal } from '../../../../../actions/modal';
import { updatePagePath } from "../../../../../actions/pageAction";
import { VEHICLE_UPDATE } from "../../../../../constants/functionLists";
import FormContainer from "../../../../../common/components/FormContainer";
import FormControl from "../../../../../common/components/FormContainer/FormControl";
import MultiSelectUserComboBox from "../../../../../common/components/FormContainer/FormControl/MultiSelectComboBox";

class EditCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            DataSource: null,
            listOptionVehicleModel: [],
            VehicleModelCache: null,
            VehicleTypeCache: null
        };

        this.searchref = React.createRef();
        this.gridref = React.createRef();
        this.notificationDOMRef = React.createRef();

        this.addNotification = this.addNotification.bind(this);
        this.callLoadData = this.callLoadData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeFormContainer = this.onChangeFormContainer.bind(this);
        this.onChangeVehicleType = this.onChangeVehicleType.bind(this);
        this.showMessage = this.showMessage.bind(this);
    }


    componentDidMount() {
        this.props.updatePagePath(EditPagePath);
        this.callLoadData();
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

    callLoadData() {
        const Vehicle = new Promise((resolve, reject) => {
            this.props.callFetchAPI(APIHostName, LoadAPIPath, this.props.match.params.id).then((apiResult) => {
                if (!apiResult.IsError) {
                    resolve(apiResult.ResultObject);
                } else {
                    resolve([]);
                }
            });
        })

        const VehicleModelCache = new Promise((resolve, reject) => {
            this.props.callGetCache(ERPCOMMONCACHE_VEHICLEMODEL).then((result) => {
                if (!result.IsError && result.ResultObject.CacheData != null) {
                    resolve(result.ResultObject.CacheData);
                } else {
                    resolve([]);
                }
            });
        });

        const VehicleTypeCache = new Promise((resolve, reject) => {
            this.props.callGetCache(ERPCOMMONCACHE_VEHICLETYPE).then(result => {
                if (!result.IsError && result.ResultObject.CacheData != null) {
                    resolve(result.ResultObject.CacheData);
                } else {
                    resolve([]);
                }
            })
        })

        Promise.all([Vehicle, VehicleModelCache, VehicleTypeCache]).then((values) => {
            const uptResultObject = {
                ...values[0],
                VehicleTypeID: values[0].VehicleTypeID == 0 ? -1 : values[0].VehicleTypeID,
                ActivityStatusID: values[0].ActivityStatusID == 0 ? -1 : values[0].ActivityStatusID,
                MainDriverUser: {
                    label: `${values[0].MainDriverUser} - ${values[0].MainDriverUserName}`,
                    value: values[0].MainDriverUser,
                }
            };

            const listOptionVehicleModel = values[1].reduce((acc, val) => {
                if (val.VehicleTypeID == values[0].VehicleTypeID) {
                    return [
                        ...acc,
                        { value: val.VehicleModelID, label: `${val.VehicleModelID} - ${val.VehicleModelName}` }
                    ]
                } else {
                    return acc;
                }
            }, [{ value: -1, label: "--Vui lòng chọn--" }]);

            this.setState({
                DataSource: uptResultObject,
                listOptionVehicleModel,
                VehicleModelCache: values[1],
                VehicleTypeCache: values[2],
            });
        }).catch(err => {
            this.showMessage("Lỗi load dữ liệu");
        });
    }

    onChangeVehicleType(name, value) {
        const listOption = this.state.VehicleModelCache.reduce((acc, val) => {
            if (val.VehicleTypeID == value) {
                return [...acc, { value: val.VehicleModelID, label: `${val.VehicleModelID} - ${val.VehicleModelName}` }]
            } else {
                return acc;
            }
        }, [{ value: -1, label: "--Vui lòng chọn--" }])

        const VehicleType = this.state.VehicleTypeCache.find(item => item.VehicleTypeID == value);

        this.setState({
            listOptionVehicleModel: listOption,
            DataSource: {
                ...this.state.DataSource,
                VehicleTypeID: value,
                VehicleModelID: -1,
                Height: VehicleType ? VehicleType.Height : 0,
                Length: VehicleType ? VehicleType.Length : 0,
                Volume: VehicleType ? VehicleType.Volume : 0,
                Weight: VehicleType ? VehicleType.Weight : 0,
                Width: VehicleType ? VehicleType.Width : 0,
            }
        })
    }

    onChangeFormContainer(FormData, MLObjectDefinition) {
        //#region set giá trị vào data source
        this.setState({
            DataSource: {
                ...this.state.DataSource,
                ActivityStatusID: FormData.cbActivityStatusID.value,
                IsActived: FormData.chkIsActived.value,
                IsSystem: FormData.chkIsSystem.value,
                LicensePlateNumber: FormData.txtLicensePlateNumber.value,
                PartnerID: FormData.cbPartnerID.value,
                VehicleModelID: FormData.cbVehicleModelID.value,
                VehicleName: FormData.txtVehicleName.value,
                MainDriverUser: FormData.cbMainDriverUser.value
            }
        })
        //#endregion
    }

    handleSubmit(formData, MLObject) {
        const uptMLObject = {
            ...MLObject,
            MainDriverUser: MLObject.MainDriverUser.value
        }

        this.props.callFetchAPI(APIHostName, UpdateAPIPath, uptMLObject).then(apiResult => {
            this.showMessage(apiResult.Message);
            if (!apiResult.IsError) {
                this.props.history.push("/Vehicle");
            }
        });
    }

    render() {
        if (this.state.DataSource == null || this.state.VehicleTypeCache == null || this.state.VehicleModelCache == null) {
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
                        onchange={this.onChangeFormContainer}
                        onSubmit={this.handleSubmit}
                        RequirePermission={VEHICLE_UPDATE}
                    >

                        <div className="row">
                            <div className="col-md-6">
                                <FormControl.TextBox
                                    // value={}
                                    colspan="8"
                                    controltype="InputControl"
                                    datasourcemember="VehicleID"
                                    label="mã xe"
                                    labelcolspan="4"
                                    maxSize={9}
                                    name="txtVehicleID"
                                    placeholder="Mã xe"
                                    readOnly={true}
                                    validatonList={['required', 'number']}
                                />
                            </div>

                            <div className="col-md-6">
                                <FormControl.ComboBoxSelect
                                    // value={}
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
                                    onValueChangeCustom={this.onChangeVehicleType}
                                    placeholder="-- Vui lòng chọn --"
                                    readOnly={this.state.IsSystem}
                                    validatonList={["Comborequired"]}
                                    valuemember="VehicleTypeID"
                                />
                            </div>

                            <div className="col-md-6">
                                <FormControl.FormControlComboBox
                                    // loaditemcachekeyid={ERPCOMMONCACHE_VEHICLEMODEL}
                                    // value={}
                                    colspan="8"
                                    controltype="InputControl"
                                    datasourcemember="VehicleModelID"
                                    disabled={this.state.DataSource.IsSystem}
                                    isautoloaditemfromcache={false}
                                    label="Model xe"
                                    labelcolspan="4"
                                    listoption={this.state.listOptionVehicleModel}
                                    name="cbVehicleModelID"
                                    nameMember="VehicleModelName"
                                    placeholder="-- Vui lòng chọn --"
                                    readOnly={this.state.IsSystem}
                                    validatonList={["Comborequired"]}
                                    valuemember="VehicleModelID"
                                />
                            </div>

                            <div className="col-md-6">
                                <FormControl.TextBox
                                    // value={}
                                    colspan="8"
                                    controltype="InputControl"
                                    datasourcemember="Weight"
                                    label="tải trọng(kg)"
                                    labelcolspan="4"
                                    maxSize={9}
                                    name="txtWeight"
                                    placeholder="Tải trọng(kg)"
                                    readOnly={true}
                                />
                            </div>

                            <div className="col-md-6">
                                <FormControl.FormControlTextBox
                                    // value={}
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
                                />
                            </div>

                            <div className="col-md-6">
                                <FormControl.TextBox
                                    // value={}
                                    colspan="8"
                                    controltype="InputControl"
                                    datasourcemember="Length"
                                    label="chiều dài(m)"
                                    labelcolspan="4"
                                    maxSize={9}
                                    name="txtLength"
                                    placeholder="Chiều dài(m)"
                                    readOnly={true}
                                />
                            </div>

                            <div className="col-md-6">
                                <FormControl.TextBox
                                    // value={}
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
                                />
                            </div>

                            <div className="col-md-6">
                                <FormControl.TextBox
                                    // value={}
                                    colspan="8"
                                    controltype="InputControl"
                                    datasourcemember="Width"
                                    label="chiều rộng(m)"
                                    labelcolspan="4"
                                    maxSize={9}
                                    name="txtWidth"
                                    placeholder="Chiều rộng(m)"
                                    readOnly={true}
                                />
                            </div>

                            <div className="col-md-6">
                                <FormControl.ComboBoxSelect
                                    // value={}
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
                                    valuemember="PartnerID"
                                />
                            </div>

                            <div className="col-md-6">
                                <FormControl.TextBox
                                    // value=""
                                    colspan="8"
                                    controltype="InputControl"
                                    datasourcemember="Height"
                                    label="chiều cao(m)"
                                    labelcolspan="4"
                                    maxSize={9}
                                    name="txtHeight"
                                    placeholder="Chiều cao(m)"
                                    readOnly={true}
                                />
                            </div>

                            <div className="col-md-6">
                                <FormControl.ComboBoxSelect
                                    // value={}
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
                                    valuemember="ActivityStatusID"
                                />
                            </div>

                            <div className="col-md-6">
                                <FormControl.TextBox
                                    // value=""
                                    colspan="8"
                                    controltype="InputControl"
                                    datasourcemember="Volume"
                                    label="thể tích(m3)"
                                    labelcolspan="4"
                                    maxSize={9}
                                    name="txtVolume"
                                    placeholder="Thể tích(m3)"
                                    readOnly={true}
                                />
                            </div>

                            <div className="col-md-6">
                                <MultiSelectUserComboBox
                                    // value={}
                                    controltype="InputControl"
                                    colspan="8"
                                    datasourcemember="MainDriverUser"
                                    disabled={this.state.DataSource.IsSystem}
                                    isautoloaditemfromcache={false}
                                    IsLabelDiv={true}
                                    isMultiSelect={false}
                                    label="nhân viên tài xế chính"
                                    labelcolspan="4"
                                    listoption={[]}
                                    name="cbMainDriverUser"
                                    validatonList={["Comborequired"]}
                                />
                            </div>

                            <div className="col-md-6">
                                <FormControl.CheckBox
                                    // value={}
                                    classNameCustom="customCheckbox"
                                    colspan="8"
                                    controltype="InputControl"
                                    datasourcemember="IsActived"
                                    disabled={this.state.DataSource.IsSystem}
                                    label="kích hoạt"
                                    labelcolspan="4"
                                    name="chkIsActived"
                                    readOnly={this.state.DataSource.IsSystem}
                                />
                            </div>

                            <div className="col-md-6">
                                <FormControl.CheckBox
                                    // value={}
                                    classNameCustom="customCheckbox"
                                    colspan="8"
                                    controltype="InputControl"
                                    datasourcemember="IsSystem"
                                    label="hệ thống"
                                    labelcolspan="4"
                                    name="chkIsSystem"
                                    readOnly={false}
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

export default connect(mapStateToProps, mapDispatchToProps)(EditCom);