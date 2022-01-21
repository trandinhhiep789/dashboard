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
    MLObjectDefinitionLeadOrderType_WF,
} from "../constants";
// import FormControl from "../../../../../../../common/components/Form/AdvanceForm/FormControl";
import InputGrid from './../../../../../../../common/components/Form/AdvanceForm/FormControl/InputGrid/index';
import TabContainer from './../../../../../../../common/components/Tabs/TabContainer/index';
import TabPage from './../../../../../../../common/components/FormContainer/TabPage/index';
import { ERPCOMMONCACHE_FUNCTION, ERPCOMMONCACHE_LEADORDERSTEP } from "../../../../../../../constants/keyCache";
import { callFetchAPI } from "../../../../../../../actions/fetchAPIAction";
import { callGetCache } from './../../../../../../../actions/cacheAction';
import { MessageModal } from './../../../../../../../common/components/Modal/index';
import { showModal, hideModal } from './../../../../../../../actions/modal';
import FormContainerAvance from './../../../../../../../common/components/Form/AdvanceForm/FormContainer/index';
import FormControl from "../../../../../../../common/components/FormContainer/FormControl";
import FormContainer from './../../../../../../../common/components/FormContainer/index';
import { ERPCOMMONCACHE_LEADORDERSTATUS } from './../../../../../../../constants/keyCache';
import { BackLink } from "../../../constants";


class AddCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            DataSourceFunctionCache: null,
            DataSourceLeadOrderTypeCache: null,
            IsDisableAutoChangeStepTypeID: true,
            ListLeadOrderType_WF_NextDataGrid: [],
            CacheData: {
                LeadOrderNextStep: [],
                FunctionCache: []
            },
            FormData: {
                LeadOrderNextStepID: 0,
                AddFunctionID: ""
            },
            DataSource: {
                AutoChangeStepType: false,
                AutoChangeToStatusID: 0,
                AutoChangeToStepID: 0,
                IsActived: true,
                IsFinishStep: false,
                IsInitStep: false,
                IsSystem: false,
                LeadOrderStepID: ""
            }
        };

        this.searchref = React.createRef();
        this.gridref = React.createRef();
        this.notificationDOMRef = React.createRef();
        this.formLeadOrderTypeWFNextRef = React.createRef(null);
        this.addNotification = this.addNotification.bind(this);
        this.showMessage = this.showMessage.bind(this);
        this.handleDeleteLeadOrderType_WF_Next = this.handleDeleteLeadOrderType_WF_Next.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleFormChange_1 = this.handleFormChange_1.bind(this);
        this.handleInsertLeadOrderType_WF_Next = this.handleInsertLeadOrderType_WF_Next.bind(this);
        this.handleSearchCache = this.handleSearchCache.bind(this);
        this.handleCallGetCache = this.handleCallGetCache.bind(this);
        this.handleFormAdvanceChange = this.handleFormAdvanceChange.bind(this);
    }

    componentDidMount() {
        this.handleCallGetCache()
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

    handleInsertLeadOrderType_WF_Next(MLObject, elementList, dataSource, formData) {
        this.formLeadOrderTypeWFNextRef.current.click();

        let isExist = this.state.ListLeadOrderType_WF_NextDataGrid.findIndex(x => x.LeadOrderNextStepID == this.state.FormData.LeadOrderNextStepID);
        if (isExist != -1) {
            this.showMessage("Đã tồn tại bước kế tiếp");
            return;
        }

        if (this.state.DataSource.LeadOrderStepID !== 0 && this.state.FormData.LeadOrderNextStepID != 0 && this.state.DataSource.LeadOrderStepID == this.state.FormData.LeadOrderNextStepID) {
            this.showMessage("Bước kế tiếp không được phép chọn trùng bước xử lý");
            return;
        }

        let changeState = this.state;
        let lstLeadOrderType_WF_NextDataGrid = changeState.ListLeadOrderType_WF_NextDataGrid;
        const { Function, LeadOrderNextStep } = this.handleSearchCache(this.state.FormData.LeadOrderNextStepID, this.state.FormData.AddFunctionID);

        lstLeadOrderType_WF_NextDataGrid.push({ LeadOrderNextStepID: LeadOrderNextStep.LeadOrderStepID, LeadOrderNextStepName: LeadOrderNextStep.LeadOrderStepName, ChooseFunctionID: Function.FunctionID, ChooseFunctionName: Function.FunctionName });
        changeState = { ...changeState, ListLeadOrderType_WF_NextDataGrid: lstLeadOrderType_WF_NextDataGrid };

        this.setState(changeState);
    }

    handleDeleteLeadOrderType_WF_Next(listDeleteObject, dataSource, ListDataSourceMember) {
        let lstLeadOrderType_WF_NextDataGrid = this.state.ListLeadOrderType_WF_NextDataGrid;

        listDeleteObject.filter(itemDelete => {
            let index_2 = lstLeadOrderType_WF_NextDataGrid.findIndex(itemSource => {
                return itemDelete.every(itemDeletePro =>
                    itemSource[itemDeletePro.key] == itemDeletePro.value
                );
            });

            lstLeadOrderType_WF_NextDataGrid.splice(index_2, 1);
        });

        let changeState = this.state;
        changeState = { ...changeState, ListLeadOrderType_WF_NextDataGrid: lstLeadOrderType_WF_NextDataGrid };
        this.setState(changeState);
    }

    handleFormChange(formData, MLObject) {

        let changeState = this.state;
        let dataSource = this.state.DataSource;

        dataSource = {
            AutoChangeStepType: formData.chkAutoChangeStepType.value,
            AutoChangeToStatusID: formData.cbAutoChangeToStatusID.value,
            AutoChangeToStepID: formData.chkAutoChangeStepType.value ? formData.cbAutoChangeToStepID.value : 0,
            IsActived: formData.chkIsActived.value,
            IsFinishStep: formData.chkIsFinishStep.value,
            IsInitStep: formData.chkIsInitStep.value,
            LeadOrderStepID: formData.cbLeadOrderStepID.value
        }

        changeState = { ...changeState, IsDisableAutoChangeStepTypeID: !formData.chkAutoChangeStepType.value, DataSource: dataSource };
        this.setState(changeState);
    }

    handleCallGetCache() {
        const promiseLeadOrderNextStep = new Promise((resolve, reject) => {
            this.props.callGetCache(ERPCOMMONCACHE_LEADORDERSTEP).then((result) => {
                if (!result.IsError && result.ResultObject.CacheData != null) {
                    resolve(result.ResultObject.CacheData);
                } else {
                    reject([]);
                }
            })
        })

        const promiseFunction = new Promise((resolve, reject) => {
            this.props.callGetCache(ERPCOMMONCACHE_FUNCTION).then((result) => {
                if (!result.IsError && result.ResultObject.CacheData != null) {
                    resolve(result.ResultObject.CacheData);
                } else {
                    reject([]);
                }
            })
        })

        Promise.all([promiseLeadOrderNextStep, promiseFunction]).then((values) => {
            let changeState = this.state;

            changeState = {
                ...changeState, CacheData: {
                    LeadOrderNextStep: values[0],
                    FunctionCache: values[1]
                }
            }
            this.setState(changeState)
        }).catch(err => this.showMessage("Lỗi tải dữ liệu"));
    }

    handleSearchCache(leadOrderNextStepID, AddFunctionID) {
        const cacheFunction = this.state.CacheData.FunctionCache.find(item => item.FunctionID == AddFunctionID);
        const cacheLeadOrderNextStep = this.state.CacheData.LeadOrderNextStep.find(item => item.LeadOrderStepID == leadOrderNextStepID);
        return {
            Function: cacheFunction, LeadOrderNextStep: cacheLeadOrderNextStep
        }
    }

    handleFormChange_1(formData, MLObject) {
        let changeState = this.state;
        let formData_1 = changeState.FormData;

        formData_1 = { ...formData_1, LeadOrderNextStepID: formData["cbLeadOrderNextStepID"].value, AddFunctionID: formData["cbAddFunctionID"].value };
        changeState = { ...changeState, FormData: formData_1 };

        this.setState(changeState);
    }

    handleFormAdvanceChange(formDataTemp, tabNameList, tabMLObjectDefinitionList, formValidationTemp) {
        console.log(formDataTemp, tabNameList, tabMLObjectDefinitionList, formValidationTemp)
    }

    handleSubmit(formData, MLObject) {

        if (MLObject.AutoChangeStepType && MLObject.AutoChangeToStepID == 0) {
            this.addNotification("Vui lòng chọn Bước tự động chuyển", true);
            return;
        }

        if (MLObject.IsInitStep) {
            let isExistIsInitStep = this.props.ListLeadOrderType_WFItem.some((item) => item.IsInitStep == true);
            if (isExistIsInitStep) {
                this.showMessage("Bước khởi tạo đã tồn tại");
                return;
            }
        }

        if (MLObject.IsFinishStep) {
            let isExistIsFinishStep = this.props.ListLeadOrderType_WFItem.some((item) => item.IsFinishStep == true);
            if (isExistIsFinishStep) {
                this.showMessage("Bước kết thúc đã tồn tại");
                return;
            }
        }

        if (MLObject.LeadOrderStepID != 0 && MLObject.AutoChangeToStepID != 0 && MLObject.LeadOrderStepID == MLObject.AutoChangeToStepID) {
            this.showMessage("Bước tự động chuyển không được phép chọn trùng bước xử lý");
            return;
        }

        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        MLObject.LeadOrderTypeID = this.props.LeadOrderTypeID;

        let lstLeadOrderType_WF_NextRequest = this.state.ListLeadOrderType_WF_NextDataGrid.map(item => ({
            LeadOrderNextStepID: item.LeadOrderNextStepID,
            ChooseFunctionID: item.ChooseFunctionID,
            LeadOrderStepID: this.state.DataSource.LeadOrderStepID,
            LeadOrderTypeID: this.props.LeadOrderTypeID,
            CreatedUser: this.props.AppInfo.LoginInfo.Username,
            IsActived: MLObject.IsActived,
            IsSystem: false
        }));

        MLObject.ListLeadOrderType_WF_Next = lstLeadOrderType_WF_NextRequest;

        // MLObject.ListLeadOrderType_WF_Next = [
        //     {
        //         LeadOrderTypeID: this.props.LeadOrderTypeID,
        //         LeadOrderStepID: 1,
        //         LeadOrderNextStepID: 2,
        //         ChooseFunctionID: "DatabaseConfig_Add",
        //         IsSystem: 0,
        //         IsActived: 1,
        //         CreatedUser: "73309"
        //     },
        // ];

        this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            if (!apiResult.IsError) {
                if (this.props.handleReloadData) {
                    this.props.handleReloadData();
                }

                if (this.props.handleCloseModal) {
                    this.props.handleCloseModal();
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
                    IsHideFooter={true}
                >
                    <TabContainer
                        controltype="TabContainer"
                        defaultActiveTabIndex={0}
                        IsAutoLayout={true}
                        IsAutoLoadDataGrid={false}
                    >
                        <TabPage
                            name="LeadOrderType_WF"
                            title="Thông tin chung"
                        >
                            <FormContainer
                                IsCloseModal={true}
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
                                    loaditemcachekeyid={ERPCOMMONCACHE_LEADORDERSTEP}
                                    name="cbLeadOrderStepID"
                                    nameMember="LeadOrderStepName"
                                    value={""}
                                    valuemember="LeadOrderStepID"
                                    validatonList={["Comborequired"]}
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
                                    loaditemcachekeyid={ERPCOMMONCACHE_LEADORDERSTATUS}
                                    name="cbAutoChangeToStatusID"
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
                                {/* <FormControl.FormControlComboBox
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
                                    loaditemcachekeyid={ERPCOMMONCACHE_LEADORDERSTEP}
                                    name="cbAutoChangeToStepID"
                                    nameMember="LeadOrderStepName"
                                    valuemember="LeadOrderStepID"
                                    validatonList={!this.state.IsDisableAutoChangeStepTypeID ? ["Comborequired"] : []}
                                    placeholder="Bước tự động chuyển"
                                /> */}
                                <FormControl.FormControlComboBox
                                    key={this.state.IsDisableAutoChangeStepTypeID}
                                    labelcolspan={4}
                                    colspan={8}
                                    rowspan={6}
                                    controltype="InputControl"
                                    datasourcemember="AutoChangeToStepID"
                                    disabled={this.state.IsDisableAutoChangeStepTypeID == null ? false : this.state.IsDisableAutoChangeStepTypeID}
                                    isautoloaditemfromcache={true}
                                    isSystem={false}
                                    label="Bước tự động chuyển"
                                    listoption={[]}
                                    loaditemcachekeyid={ERPCOMMONCACHE_LEADORDERSTEP}
                                    value={""}
                                    name="cbAutoChangeToStepID"
                                    nameMember="LeadOrderStepName"
                                    valuemember="LeadOrderStepID"
                                    placeholder="Bước tự động chuyển"
                                // validatonList={!this.state.IsDisableAutoChangeStepTypeID ? ["Comborequired"] : []}
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
                            </FormContainer>
                        </TabPage>

                        <TabPage
                            name="LeadOrderType_WF_Next"
                            title="Bước xử lý kế tiếp"
                            MLObjectDefinition={[]}
                        >
                            <div>
                                <FormContainer
                                    IsAutoLayout={true}
                                    IsHideFooter={true}
                                    onchange={this.handleFormChange_1}
                                    isSubmitForm={false}
                                    customSubmit={true}
                                    customRef={this.formLeadOrderTypeWFNextRef}
                                    MLObjectDefinition={[{
                                        Name: "LeadOrderNextStepID",
                                        DataSourceMember: "LeadOrderNextStepID",
                                        DefaultValue: "",
                                        BindControlName: "cbLeadOrderNextStepID",
                                    },
                                    {
                                        Name: "AddFunctionID",
                                        DataSourceMember: "AddFunctionID",
                                        DefaultValue: "",
                                        BindControlName: "cbAddFunctionID",
                                    },]}
                                >
                                    <div className="form-row">
                                        <FormControl.FormControlComboBox
                                            labelcolspan={4}
                                            colspan={8}
                                            rowspan={6}
                                            controltype="InputControl"
                                            datasourcemember="LeadOrderNextStepID"
                                            isautoloaditemfromcache={true}
                                            IsLabelDiv={true}
                                            isMulti={false}
                                            label="Bước xử lý kế tiếp"
                                            listoption={[]}
                                            loaditemcachekeyid={ERPCOMMONCACHE_LEADORDERSTEP}
                                            name="cbLeadOrderNextStepID"
                                            nameMember="LeadOrderStepName"
                                            valuemember="LeadOrderStepID"
                                            value={""}
                                            validatonList={["Comborequired"]}
                                            placeholder="Bước xử kế lý"
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
                                            name="cbAddFunctionID"
                                            nameMember="FunctionName"
                                            value={""}
                                            valuemember="FunctionID"
                                            validatonList={["Comborequired"]}
                                            placeholder="Quyền thêm"
                                        />

                                    </div>
                                </FormContainer>
                            </div>
                            <FormContainerAvance
                                ClosePopup={() => {
                                    this.props.hideModal();
                                }}
                                backLinkButtonText="Đóng"
                                IsAutoLayout={true}
                                IsHideFooter={false}
                                IsDisableButtonSubmit={true}
                            >
                                <InputGrid
                                    key={this.state.ListLeadOrderType_WF_NextDataGrid}
                                    controltype="GridControl"
                                    IDSelectColumnName={IDSelectColumnName}
                                    isUseValueInputControl={true}
                                    listColumn={LeadOrderType_WF_NextListColumn}
                                    MLObjectDefinition={LeadOrderType_WF_NextMLObjectDefinition}
                                    onDeleteClick_Customize={this.handleDeleteLeadOrderType_WF_Next}
                                    onInsertClick={this.handleInsertLeadOrderType_WF_Next}
                                    dataSource={this.state.ListLeadOrderType_WF_NextDataGrid}
                                />
                            </FormContainerAvance>
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

const LeadOrderType_WF_Add = connect(mapStateToProps, mapDispatchToProps)(AddCom);

export default LeadOrderType_WF_Add;