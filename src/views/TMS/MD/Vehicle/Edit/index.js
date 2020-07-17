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
    MLObjectDefinitionNew,
    BackLink,
    EditPagePath,
    UpdateAPIPath,
    LoadAPIPath,

} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callGetCache } from "../../../../../actions/cacheAction";
import { COORDINATORSTORE_UPDATE, VEHICLE_UPDATE } from "../../../../../constants/functionLists";
import CoordinatorStoreWard from '../../CoordinatorStoreWard'
import StoreWard from "../../CoordinatorStoreWard/Component/StoreWard";
import ReactNotification from "react-notifications-component";
import DeliverUserList from "../../../ShipmentOrder/Component/DeliverUserList";
import MultiSelectComboBox from "../../../../../common/components/FormContainer/FormControl/MultiSelectComboBox";
import MultiStoreComboBox from "../../../../../common/components/FormContainer/FormControl/MultiSelectComboBox/MultiStoreComboBox";


class EditCom extends React.Component {
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
            MainCoordinatorStoreID: "",
            UserValue: [],
            StoreSelect: [],
            IsSystem: false,

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
        const { UserValue, StoreSelect } = this.state;
        this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then((apiResult) => {
            
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
                let UserValueItem = {};
                let StoreItem = {};
                UserValueItem.value = apiResult.ResultObject.MainDriverUser;
                UserValueItem.label = apiResult.ResultObject.MainDriverUser + " - " + apiResult.ResultObject.FullName;

                StoreItem.value = apiResult.ResultObject.MainCoordinatorStoreID;
                StoreItem.label = apiResult.ResultObject.MainCoordinatorStoreID + " - " + apiResult.ResultObject.MainCoordinatorStoreName;
                StoreItem.name = apiResult.ResultObject.MainCoordinatorStoreName;

                StoreSelect.push(StoreItem)
                UserValue.push(UserValueItem)


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
        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginlogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        console.log("handleSubmit", MLObject)

        this.props.callFetchAPI(APIHostName, UpdateAPIPath, MLObject).then(apiResult => {
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
        this.setState({
            MainCoordinatorStoreID: objstore.value
        })

    }

    render() {
        const { DataSource } = this.state;
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        console.log("DataSource", this.state)
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <FormContainer
                    FormName="Cập nhật danh sách xe"
                    MLObjectDefinition={MLObjectDefinitionNew}
                    listelement={[]}
                    onSubmit={this.handleSubmit}
                    dataSource={this.state.DataSource}
                    BackLink={BackLink}
                    RequirePermission={VEHICLE_UPDATE}
                >

                    <div className="row">
                        <div className="col-md-6">
                            <FormControl.TextBox
                                name="txtVehicleID"
                                colspan="8"
                                labelcolspan="4"
                                readOnly={true}
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
                                disabled={this.state.IsSystem}
                                readOnly={this.state.IsSystem}
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
                                disabled={this.state.IsSystem}
                                readOnly={this.state.IsSystem}
                                label="biển số xe"
                                placeholder="Biển số xe"
                                controltype="InputControl"
                                value=""
                                datasourcemember="LicensePlateNumber"
                                validatonList={['required']}
                            />
                        </div>

                        <div className="col-md-6">

                            <MultiSelectComboBox
                                name="cbMainDriverUser"
                                colspan="8"
                                labelcolspan="4"
                                label="Nhân viên tài xế chính"
                                disabled={this.state.IsSystem}
                                readOnly={this.state.IsSystem}
                                IsLabelDiv={true}
                                isautoloaditemfromcache={false}
                                onChange={this.onChangeUser.bind(this)}
                                controltype="InputControl"
                                value={this.state.UserValue}
                                listoption={this.state.UserValue}
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
                                disabled={this.state.IsSystem}
                                readOnly={this.state.IsSystem}
                                IsLabelDiv={false}
                                isautoloaditemfromcache={false}
                                onChange={this.onChangeStore.bind(this)}
                                controltype="InputControl"
                                value={this.state.StoreSelect}
                                listoption={this.state.StoreSelect}
                                isMultiSelect={false}
                                datasourcemember="MainCoordinatorStoreID"
                                validationErrorMessage={''}
                                IsLabelDiv="kho điều phối chính"
                            />
                        </div>


                        <div className="col-md-6">
                            <FormControl.TextBox
                                name="txtWeight"
                                colspan="8"
                                labelcolspan="4"
                                disabled={this.state.IsSystem}
                                readOnly={this.state.IsSystem}
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
                                disabled={this.state.IsSystem}
                                readOnly={this.state.IsSystem}
                                label="thể tích(cm3)"
                                placeholder="Thể tích(cm3)"
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
                                disabled={this.state.IsSystem}
                                readOnly={this.state.IsSystem}
                                label="chiều dài(cm)"
                                placeholder="Chiều dài(cm)"
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
                                disabled={this.state.IsSystem}
                                readOnly={this.state.IsSystem}
                                label="chiều rộng(cm)"
                                placeholder="Chiều rộng(cm)"
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
                                disabled={this.state.IsSystem}
                                readOnly={this.state.IsSystem}
                                label="chiều cao(cm)"
                                placeholder="Chiều cao(cm)"
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
        }
    };
};

const Edit = connect(mapStateToProps, mapDispatchToProps)(EditCom);
export default Edit;
