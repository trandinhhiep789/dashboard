import React from "react";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import ReactNotification from "react-notifications-component";
import {
    AddAPIPath,
    APIHostName,
    IDSelectColumnName,
    LeadOrderType_WF_NextListColumn,
    LeadOrderType_WF_NextMLObjectDefinition,
    LoadListInfo_WF_Next_APIPath,
    MLObjectDefinitionLeadOrderType_WF,
} from "../constants";
// import FormControl from "../../../../../../../common/components/Form/AdvanceForm/FormControl";
import InputGrid from './../../../../../../../common/components/Form/AdvanceForm/FormControl/InputGrid/index';
import TabContainer from './../../../../../../../common/components/Tabs/TabContainer/index';
import TabPage from './../../../../../../../common/components/FormContainer/TabPage/index';
import { ERPCOMMONCACHE_FUNCTION, ERPCOMMONCACHE_VEHICLERENTALREQSTEP, ERPCOMMONCACHE_VEHICLERENTALSTATUS, } from "../../../../../../../constants/keyCache";
import { callFetchAPI } from "../../../../../../../actions/fetchAPIAction";
import { callGetCache } from './../../../../../../../actions/cacheAction';
import { MessageModal } from './../../../../../../../common/components/Modal/index';
import { showModal, hideModal } from './../../../../../../../actions/modal';
import FormContainerAvance from './../../../../../../../common/components/Form/AdvanceForm/FormContainer/index';
import FormControl from "../../../../../../../common/components/FormContainer/FormControl";
import FormContainer from './../../../../../../../common/components/FormContainer/index';


class EditCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            DataSourceLeadOrderTypeCache: null,
            IsDisableAutoChangeStepTypeID: true,
            DataSource: this.props.DataSource
        };

        this.searchref = React.createRef();
        this.gridref = React.createRef();
        this.notificationDOMRef = React.createRef();

        this.addNotification = this.addNotification.bind(this);
        this.showMessage = this.showMessage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleCallLoadWFNext = this.handleCallLoadWFNext.bind(this);
        this.handleDeleteLeadOrderType_WF_Next = this.handleDeleteLeadOrderType_WF_Next.bind(this);
    }

    componentDidMount() {
        this.handleCallLoadWFNext();
    }

    handleCallLoadWFNext() {
        let dataRequest = {
            LeadOrderTypeID: this.props.DataSource.LeadOrderTypeID,
            LeadOrderStepID: this.props.DataSource.LeadOrderStepID,
            LeadOrderNextStepID: 0,
            ChooseFunctionID: "",
            IsActived: false,
            IsSystem: false,
            CreatedUser: "",
            CreatedDate: null,
            UpdatedUser: "",
            UpdatedDate: null,
            IsDeleted: false,
            DeletedNote: "",
            DeletedUser: "",
            DeletedDate: null,
        };

        this.props.callFetchAPI(APIHostName, LoadListInfo_WF_Next_APIPath, dataRequest).then(apiResult => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            } else {
                let changeState = this.setState;
                let dataSource = changeState.DataSource;

                dataSource = { ...dataSource, ListLeadOrderType_WF_Next: apiResult.ResultObject };
                changeState = { ...changeState, DataSource: dataSource };
                this.setState(changeState);
            }
            this.setState({
                IsLoadDataComplete: true
            });
        });
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
            />
        );
    }

    handleDeleteLeadOrderType_WF_Next(listDeleteObject, dataSource, ListDataSourceMember) {
        let lstLeadOrderType_WF_Next = this.state.DataSource.ListLeadOrderType_WF_Next;

        listDeleteObject.filter(itemDelete => {
            let index = lstLeadOrderType_WF_Next.findIndex(itemSource => {
                return itemDelete.every(itemDeletePro =>
                    itemSource[itemDeletePro.key] == itemDeletePro.value
                );
            });
            lstLeadOrderType_WF_Next.splice(index, 1);
        });

        let changeState = this.state;
        let dataSource_1 = changeState.DataSource;

        dataSource_1 = { ...dataSource_1, ListLeadOrderType_WF_Next: lstLeadOrderType_WF_Next };
        changeState = { ...changeState, DataSource: dataSource_1 };

        this.setState(changeState);
    }

    handleFormChange(formData, MLObject) {

        let changeState = this.state;
        changeState = { ...changeState, IsDisableAutoChangeStepTypeID: !formData.chkAutoChangeStepType.value };
        this.setState(changeState);

    }

    handleSubmit(formData, MLObject) {
        MLObject.AutoChangeStepType = 0;
        MLObject.AutoChangeToStatusID = 0;
        MLObject.AutoChangeToStepID = 0;
        MLObject.IsActived = 1;
        MLObject.IsFinishStep = 0;
        MLObject.IsInitStep = 1;
        MLObject.IsSystem = 0;
        MLObject.LeadOrderStepID = 2;
        MLObject.LeadOrderTypeID = this.props.LeadOrderTypeID;

        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;

        MLObject.ListLeadOrderType_WF_Next = [
            {
                LeadOrderTypeID: this.props.LeadOrderTypeID,
                LeadOrderStepID: 1,
                LeadOrderNextStepID: 2,
                ChooseFunctionID: "DatabaseConfig_Add",
                IsSystem: 0,
                IsActived: 1,
                CreatedUser: "73309"
            },
            {
                LeadOrderTypeID: this.props.LeadOrderTypeID,
                LeadOrderStepID: 1,
                LeadOrderNextStepID: 3,
                ChooseFunctionID: "DatabaseConfig_Add",
                IsSystem: 0,
                IsActived: 1,
                CreatedUser: "73309"
            }
        ];

        this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            if (!apiResult.IsError) {
                if (this.props.handleReloadData) {
                    this.props.handleReloadData();
                }
            }
            this.showMessage(apiResult.Message);
        });
    }

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />

                <FormContainerAvance
                    IsAutoLayout={true}
                    // MLObjectDefinition={MLObjectDefinitionFormContainerLeadOrderType_WF}
                    IsHideFooter={true}
                >
                    <TabContainer
                        controltype="TabContainer"
                        defaultActiveTabIndex={0}
                        IsAutoLayout={true}
                        IsAutoLoadDataGrid={false}
                    >
                        <TabPage
                            // MLObjectDefinition={MLObjectDefinitionLeadOrderType_WF}
                            name="LeadOrderType_WF"
                            title="Thông tin chung"
                        >
                            <FormContainer
                                IsAutoLayout={true}
                                listelement={[]}
                                MLObjectDefinition={MLObjectDefinitionLeadOrderType_WF}
                                onSubmit={this.handleSubmit}
                                onchange={(formData, MLObject) => this.handleFormChange(formData, MLObject)}
                                dataSource={this.state.DataSource}
                            >
                                <FormControl.FormControlComboBox
                                    labelcolspan={4}
                                    colspan={8}
                                    rowspan={6}
                                    controltype="InputControl"
                                    datasourcemember="LeadOrderStepID"
                                    isautoloaditemfromcache={true}
                                    IsLabelDiv={true}
                                    isMulti={false}
                                    label="Bước xử lý"
                                    listoption={[]}
                                    loaditemcachekeyid={"ERPCOMMONCACHE.LEADORDERSTEP"}
                                    name="cbLeadOrderStepID"
                                    nameMember="LeadOrderStepName"
                                    value={""}
                                    valuemember="LeadOrderStepID"
                                    // validatonList={["Comborequired"]}
                                    placeholder="Bước xử lý"
                                // IsSystem={this.state.DataSource.IsSystem}
                                />
                                <FormControl.FormControlComboBox
                                    labelcolspan={4}
                                    colspan={8}
                                    rowspan={6}
                                    controltype="InputControl"
                                    datasourcemember="AutoChangeToStatusID"
                                    isautoloaditemfromcache={true}
                                    IsLabelDiv={true}
                                    isMulti={false}
                                    label="Tự động chuyển sang trạng thái"
                                    listoption={[]}
                                    loaditemcachekeyid={"ERPCOMMONCACHE.LEADORDERSTATUS"}
                                    name="chkAutoChangeToStatusID"
                                    nameMember="LeadOrderStatusName"
                                    value={""}
                                    valuemember="LeadOrderStatusID"
                                    // validatonList={["Comborequired"]}
                                    placeholder="Tự động chuyển sang trạng thái"
                                // IsSystem={this.state.DataSource.IsSystem}
                                />
                                <FormControl.CheckBox
                                    labelcolspan={4}
                                    colspan={8}
                                    rowspan={6}
                                    controltype="InputControl"
                                    datasourcemember="AutoChangeStepType"
                                    label="Tự động chuyển bước"
                                    name="chkAutoChangeStepType"
                                />
                                <FormControl.FormControlComboBox
                                    key={this.state.IsDisableAutoChangeStepTypeID}
                                    labelcolspan={4}
                                    colspan={8}
                                    rowspan={6}
                                    controltype="InputControl"
                                    datasourcemember="AutoChangeToStepID"
                                    disabled={this.state.IsDisableAutoChangeStepTypeID}
                                    isautoloaditemfromcache={true}
                                    isSystem={false}
                                    label="Bước tự động chuyển"
                                    listoption={[]}
                                    loaditemcachekeyid={"ERPCOMMONCACHE.LEADORDERSTEP"}
                                    name="cbAutoChangeToStepID"
                                    nameMember="LeadOderStepName"
                                    valuemember="LeadOderStepID"
                                    // validatonList={["Comborequired"]}
                                    placeholder="Bước tự động chuyển"
                                />
                                <FormControl.CheckBox
                                    labelcolspan={4}
                                    colspan={8}
                                    rowspan={6}
                                    controltype="InputControl"
                                    datasourcemember="IsInitStep"
                                    name="chkIsInitStep"
                                    label="Là bước khởi tạo"
                                />
                                <FormControl.CheckBox
                                    labelcolspan={4}
                                    colspan={8}
                                    rowspan={6}
                                    controltype="InputControl"
                                    datasourcemember="IsFinishStep"
                                    name="chkIsFinishStep"
                                    label="Là bước kết thúc"
                                />
                                <FormControl.CheckBox
                                    labelcolspan={4}
                                    colspan={8}
                                    rowspan={6}
                                    controltype="InputControl"
                                    datasourcemember="IsActived"
                                    name="chkIsActived"
                                    label="Kích hoạt"
                                />
                                <FormControl.CheckBox
                                    labelcolspan={4}
                                    colspan={8}
                                    rowspan={6}
                                    controltype="InputControl"
                                    datasourcemember="IsSystem"
                                    name="chkIsSystem"
                                    label="Hệ thống"
                                />
                            </FormContainer>
                        </TabPage>

                        <TabPage
                            name="LeadOrderType_WF_Next"
                            title="Bước xử lý kế tiếp"
                        >
                            <div className="form-row">
                                <FormControl.FormControlComboBox
                                    labelcolspan={4}
                                    colspan={8}
                                    rowspan={6}
                                    controltype="InputControl"
                                    datasourcemember="LeadOrderStepID"
                                    isautoloaditemfromcache={true}
                                    IsLabelDiv={true}
                                    isMulti={false}
                                    label="Bước xử lý kế tiếp"
                                    listoption={[]}
                                    loaditemcachekeyid={"ERPCOMMONCACHE.LEADORDERSTEP"}
                                    name="cbLeadOrderStep"
                                    nameMember="LeadOrderStepName"
                                    value={""}
                                    valuemember="LeadOrderStepID"
                                    validatonList={["Comborequired"]}
                                    placeholder="Bước xử lý kế tiếp"
                                // IsSystem={this.state.DataSource.IsSystem}
                                />

                                <FormControl.FormControlComboBox
                                    labelcolspan={4}
                                    colspan={8}
                                    rowspan={6}
                                    controltype="InputControl"
                                    datasourcemember="AddFunctionID"
                                    isautoloaditemfromcache={true}
                                    IsLabelDiv={true}
                                    isMulti={false}
                                    label="Quyền thêm"
                                    listoption={[]}
                                    loaditemcachekeyid={ERPCOMMONCACHE_FUNCTION}
                                    name="AddFunctionID"
                                    nameMember="FunctionName"
                                    value={""}
                                    valuemember="FunctionID"
                                    validatonList={["Comborequired"]}
                                    placeholder="Quyền thêm"
                                // IsSystem={this.state.DataSource.IsSystem}
                                />
                            </div>

                            <InputGrid
                                controltype="GridControl"
                                IDSelectColumnName={IDSelectColumnName}
                                isUseValueInputControl={true}
                                listColumn={LeadOrderType_WF_NextListColumn}
                                dataSource={this.state.DataSource.ListLeadOrderType_WF_Next}
                                MLObjectDefinition={LeadOrderType_WF_NextMLObjectDefinition}
                                name="LeadOrderType_WF_Next"
                                onDeleteClick_Customize={this.handleDeleteLeadOrderType_WF_Next}
                                onInsertClick={this.handleInsertLeadOrderType_WF_Next}
                                PKColumnName="NextVehicleRentalRequestTypeStep"
                            />

                        </TabPage>

                    </TabContainer>
                </FormContainerAvance>
            </React.Fragment >
        )
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

const LeadOrderType_WF_Edit = connect(mapStateToProps, mapDispatchToProps)(EditCom);

export default LeadOrderType_WF_Edit;