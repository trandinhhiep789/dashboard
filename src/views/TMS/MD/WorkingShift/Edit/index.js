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
import { callGetCache } from "../../../../../actions/cacheAction";
import { WORKINGSHIFT_UPDATE } from "../../../../../constants/functionLists";
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
                const start = apiResult.ResultObject.TimeStart;
                const hourStart = Math.floor(start/60);
                const minStart =Math.floor((apiResult.ResultObject.TimeStart- hourStart)/60);

                const timeStart = (hourStart+":"+minStart).toString()

                const end = apiResult.ResultObject.TimeEnd;
                const hourEnd = Math.floor(end/60);
                const minEnd =Math.floor((apiResult.ResultObject.TimeEnd- hourEnd)/60);

                const timeEnd  = (hourEnd+":"+minEnd).toString()

                apiResult.ResultObject.TimeStart = timeStart;
                apiResult.ResultObject.TimeEnd = timeEnd;

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
        const start = MLObject.TimeStart.split(':');
        const end = MLObject.TimeEnd.split(':');
        const countStart = (parseInt(start[0]) * 60) + parseInt(start[1]);
        const countEnd = (parseInt(end[0]) * 60) + parseInt(end[1]);
        MLObject.TimeStart = countStart;
        MLObject.TimeEnd = countEnd;

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
                    FormName="Cập nhật ca làm việc"
                    MLObjectDefinition={MLObjectDefinition}
                    listelement={[]}
                    onSubmit={this.handleSubmit}
                    dataSource={this.state.DataSource}
                    BackLink={BackLink}
                //RequirePermission={WORKINGSHIFT_UPDATE}
                >

                    <div className="row">
                        <div className="col-md-6">
                            <FormControl.TextBox
                                name="txtWorkingShiftID"
                                colspan="8"
                                labelcolspan="4"
                                disabled={true}
                                readOnly={true}
                                label="mã ca làm việc"
                                placeholder="Mã ca làm việc"
                                controltype="InputControl"
                                value=""
                                maxSize={9}
                                datasourcemember="WorkingShiftID"
                                validatonList={['required', 'number']}
                            />
                        </div>
                        <div className="col-md-6">
                            <FormControl.TextBox
                                name="txtWorkingShiftName"
                                colspan="8"
                                labelcolspan="4"
                                disabled={this.state.IsSystem}
                                readOnly={this.state.IsSystem}
                                label="ca làm việc"
                                placeholder="Ca làm việc"
                                controltype="InputControl"
                                value=""
                                datasourcemember="WorkingShiftName"
                                validatonList={['required']}
                            />
                        </div>

                        <div className="col-md-6">
                            <FormControl.FormControlHour
                                name="txtTimeStart"
                                colspan="8"
                                labelcolspan="4"
                                disabled={this.state.IsSystem}
                                readOnly={this.state.IsSystem}
                                label="thời gian bắt đầu"
                                placeholder="Thời gian bắt đầu"
                                controltype="InputControl"
                                formatHour="HH:mm"
                                value=""
                                datasourcemember="TimeStart"
                                validatonList={['required']}
                            />
                        </div>


                        <div className="col-md-6">

                            <FormControl.FormControlHour
                                name="txtTimeEnd"
                                colspan="8"
                                labelcolspan="4"
                                disabled={this.state.IsSystem}
                                readOnly={this.state.IsSystem}
                                formatHour="HH:mm"
                                label="thời gian kết thúc làm việc"
                                placeholder="Thời gian kết thúc làm việc"
                                controltype="InputControl"
                                value=""
                                datasourcemember="TimeEnd"
                                validatonList={['required']}
                            />
                        </div>

                        <div className="col-md-6">
                            <FormControl.TextBox
                                name="txtShiftNumber"
                                colspan="8"
                                labelcolspan="4"
                                disabled={this.state.IsSystem}
                                readOnly={this.state.IsSystem}
                                label="ca làm việc"
                                placeholder="Ca làm việc"
                                controltype="InputControl"
                                value=""
                                maxSize={9}
                                datasourcemember="ShiftNumber"
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
