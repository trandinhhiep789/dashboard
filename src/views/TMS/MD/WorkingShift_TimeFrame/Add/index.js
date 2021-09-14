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
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";
import { WORKINGSHIFTTIMEFRAME_ADD, WORKINGSHIFT_ADD } from "../../../../../constants/functionLists";
import CoordinatorStoreWard from '../../CoordinatorStoreWard'
import StoreWard from "../../CoordinatorStoreWard/Component/StoreWard";
import ReactNotification from "react-notifications-component";
import DeliverUserList from "../../../ShipmentOrder/Component/DeliverUserList";
import { ERPCOMMONCACHE_WORKINGSHIFT } from "../../../../../constants/keyCache";

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
            MainCoordinatorStoreID: ""
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


        let tempMLObject = {
            WorkingShiftID:  MLObject.WorkingShiftID,
            DeliveryTimeFrameList: MLObject.DeliveryTimeFrameID.toString(),
            Note :   MLObject.Note,
            IsActived: MLObject.IsActived,
            IsSystem: MLObject.IsSystem,
        };
        console.log("object",MLObject, tempMLObject)


        this.props.callFetchAPI(APIHostName, AddAPIPath, tempMLObject).then(apiResult => {
            console.log("MLObject", tempMLObject, apiResult)
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);
            // if (!apiResult.IsError) {
            //     this.props.callClearLocalCache(ERPCOMMONCACHE_WORKINGSHIFT);
            // }
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

    handleChange(formData, MLObject) {
        if (formData.txtTimeEnd.value != '' && formData.txtTimeStart.value != '') {
            const start = formData.txtTimeStart.value.split(':');
            const end = formData.txtTimeEnd.value.split(':');
            const countStart = (parseInt(start[0]) * 60) + parseInt(start[1]);
            const countEnd = (parseInt(end[0]) * 60) + parseInt(end[1]);
            if (countEnd <= countStart) {
                formData.txtTimeEnd.ErrorLst.IsValidatonError = true;
                formData.txtTimeEnd.ErrorLst.ValidatonErrorMessage = "Thời gian kết thúc phải lớn hơn thời gian bắt đầu làm việc";
            }
            else {
                formData.txtTimeEnd.ErrorLst.IsValidatonError = false;
                formData.txtTimeEnd.ErrorLst.ValidatonErrorMessage = "";
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
                <ReactNotification ref={this.notificationDOMRef} />
                <FormContainer
                    FormName="Thêm khung giờ của một ca làm việcc"
                    MLObjectDefinition={MLObjectDefinition}
                    listelement={[]}
                    onSubmit={this.handleSubmit}
                    BackLink={BackLink}
                // onchange={this.handleChange.bind(this)}
                RequirePermission={WORKINGSHIFTTIMEFRAME_ADD}
                >

                    <div className="row">
                        <div className="col-md-6">
                            <FormControl.ComboBoxSelect

                                name="cbWorkingShift"
                                colspan="8"
                                labelcolspan="4"
                                label="ca làm việc"
                                validatonList={["Comborequired"]}
                                placeholder="-- Vui lòng chọn --"
                                isautoloaditemfromcache={true}
                                loaditemcachekeyid="ERPCOMMONCACHE.WORKINGSHIFT"
                                valuemember="WorkingShiftID"
                                nameMember="WorkingShiftName"
                                controltype="InputControl"
                                value={""}
                                listoption={null}
                                datasourcemember="WorkingShiftID" />
                        </div>
                        <div className="col-md-6">
                            <FormControl.FormControlComboBox

                                name="cbDeliveryTimeFrame"
                                colspan="8"
                                labelcolspan="4"
                                label="khung thời gian"
                                validatonList={["Comborequired"]}
                                placeholder="-- Vui lòng chọn --"
                                isMultiSelect={true}
                                isautoloaditemfromcache={true}
                                loaditemcachekeyid="ERPCOMMONCACHE.DELIVERYTIMEFRAME"
                                valuemember="DeliveryTimeFrameID"
                                nameMember="DeliveryTimeFrame"
                                controltype="InputControl"
                                value={""}
                                listoption={null}
                                datasourcemember="DeliveryTimeFrameID" />
                        </div>

                    </div>

                    <div className="row">

                        <div className="col-md-12">
                            <FormControl.TextArea
                                labelcolspan={2}
                                colspan={10}
                                name="txtNote"
                                label="Ghi chú"
                                placeholder="Ghi chú"
                                datasourcemember="Note"
                                controltype="InputControl"
                                rows={6}
                                maxSize={1500}
                                value=""
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
                                value={false}
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

const Add = connect(mapStateToProps, mapDispatchToProps)(AddCom);
export default Add;
