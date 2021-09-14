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
import { WORKINGSHIFTTIMEFRAME_UPDATE, WORKINGSHIFT_UPDATE } from "../../../../../constants/functionLists";
import CoordinatorStoreWard from '../../CoordinatorStoreWard'
import StoreWard from "../../CoordinatorStoreWard/Component/StoreWard";
import ReactNotification from "react-notifications-component";
import DeliverUserList from "../../../ShipmentOrder/Component/DeliverUserList";
import MultiSelectComboBox from "../../../../../common/components/FormContainer/FormControl/MultiSelectComboBox";
import MultiStoreComboBox from "../../../../../common/components/FormContainer/FormControl/MultiSelectComboBox/MultiStoreComboBox";
import { Base64 } from 'js-base64';
import { ERPCOMMONCACHE_WORKINGSHIFT } from "../../../../../constants/keyCache";


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
            params: {}

        };
        this.searchref = React.createRef();
        this.gridref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }


    componentDidMount() {
        this.props.updatePagePath(EditPagePath);
        const param = Base64.decode(this.props.match.params.id);
        const myParam = JSON.parse(param);
        const params = {
            WorkingShiftID: myParam.WorkingShiftID,
            DeliveryTimeFrameID: myParam.DeliveryTimeFrameID
        }
        this.setState({
            params: params
        })
        this.callLoadData(params);

    }

    callLoadData(params) {
        this.props.callFetchAPI(APIHostName, LoadAPIPath, params).then((apiResult) => {
            console.log("id", params, apiResult)
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {

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
        const { params } = this.state;
        console.log('aa', formData, MLObject)
        MLObject.OldWorkingShiftID = params.WorkingShiftID;
        MLObject.OldDeliveryTimeFrameID = params.DeliveryTimeFrameID;
        this.props.callFetchAPI(APIHostName, UpdateAPIPath, MLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);
        });
    }


    render() {

        const { DataSource } = this.state;
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }

        return (
            <React.Fragment>
                <FormContainer
                    FormName="Thêm khung giờ của một ca làm việcc"
                    MLObjectDefinition={MLObjectDefinition}
                    listelement={[]}
                    dataSource={this.state.DataSource}
                    onSubmit={this.handleSubmit}
                    BackLink={BackLink}
                    // onchange={this.handleChange.bind(this)}
                    RequirePermission={WORKINGSHIFTTIMEFRAME_UPDATE}
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
                                isMultiSelect={false}
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

const Edit = connect(mapStateToProps, mapDispatchToProps)(EditCom);
export default Edit;
