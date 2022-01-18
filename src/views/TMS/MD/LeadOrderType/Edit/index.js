import React from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import SimpleForm from "../../../../../common/components/Form/SimpleForm";
import { MessageModal } from "../../../../../common/components/Modal";
import {
    APIHostName,
    LoadAPIPath,
    UpdateAPIPath,
    EditElementList,
    MLObjectDefinition,
    BackLink,
    EditPagePath,
    AddLogAPIPath,
    EditMLObjectDefinition,
    IDSelectColumnName,
    LeadOrderType_WFListColumn,
    LeadOrderType_WFMLObjectDefinition
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callGetCache } from "../../../../../actions/cacheAction";
import TabPage from './../../../../../common/components/Tabs/TabPage/index';
import FormContainerAvance from './../../../../../common/components/Form/AdvanceForm/FormContainer/index';
import FormControl from './../../../../../common/components/FormContainer/FormControl/index';
import TabContainer from './../../../../../common/components/Tabs/TabContainer/index';
import InputGrid from './../../../../../common/components/Form/AdvanceForm/FormControl/InputGrid/index';
import { ERPCOMMONCACHE_FUNCTION, ERPCOMMONCACHE_LEADORDERTYPEPROCESS } from "../../../../../constants/keyCache";
import { MODAL_TYPE_COMMONTMODALS } from "../../../../../constants/actionTypes";
import LeadOrderType_WF_Add from "../Components/LeadOrderType_WF/Add";
import { showModal, hideModal } from './../../../../../actions/modal';
import FormContainer from './../../../../../common/components/FormContainer/index';
import LeadOrderType_WF_Edit from "../Components/LeadOrderType_WF/Edit";
import { MD_LEADORDERTYPE_UPDATE } from './../../../../../constants/functionLists';
import { DeleteAPIPath } from "../Components/LeadOrderType_WF/constants"

class EditCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleCallData = this.handleCallData.bind(this);
        this.handleInputChangeList = this.handleInputChangeList.bind(this);
        this.handleInsertLeadOrderType_WF = this.handleInsertLeadOrderType_WF.bind(this);
        this.handleEditLeadOrderType_WF = this.handleEditLeadOrderType_WF.bind(this);
        this.handleDeleteLeadOrderType_WF = this.handleDeleteLeadOrderType_WF.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);

        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            FormContent: "",
            IsLoadDataComplete: false,
            IsCloseForm: false,
            DataSource: {}
        };
    }

    componentDidMount() {
        this.props.updatePagePath(EditPagePath);
        this.handleCallData()
    }

    handleCallData() {
        const id = this.props.match.params.id;

        this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then(apiResult => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            } else {
                let changeState = this.setState;
                changeState = { ...changeState, DataSource: apiResult.ResultObject };
                this.setState(changeState);
            }
            this.setState({
                IsLoadDataComplete: true
            });
        });
    }

    handleSubmit(formData, MLObject) {
        if (MLObject.IsInitStep) {
            let isExistIsInitStep = this.props.ListLeadOrderType_WFItem.some((item) => item.IsInitStep == true);
            if (isExistIsInitStep) {
                this.showMessage("Bước khởi tạo đã tồn tại");
                return;
            }
        }

        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;

        this.props.callFetchAPI(APIHostName, UpdateAPIPath, MLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            if (!apiResult.IsError) {
                // this.handleClearLocalCache();
                // this.handleSubmitInsertLog(MLObject);
            }
            this.showMessage(apiResult.Message);
        });
    }

    handleCloseMessage() {
        if (!this.state.IsCallAPIError) this.setState({ IsCloseForm: true });
    }

    showMessage(message, onCloseModal = undefined) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
                onCloseModal={onCloseModal}
            />
        );
    }

    handleInputChangeList() {
        if (this.state.isEdited) {
            this.setState({
                isPrompt: true
            })
        }

        this.setState({
            isEdited: true
        })
    }

    handleCloseModal() {
        this.props.hideModal();
    }

    handleInsertLeadOrderType_WF() {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Thêm mới bước mối bán hàng',
            content: {
                text: <LeadOrderType_WF_Add
                    LeadOrderTypeID={this.props.match.params.id}
                    ListLeadOrderType_WFItem={this.state.DataSource.ListLeadOrderType_WFItem}
                    handleCloseModal={this.handleCloseModal}
                    handleReloadData={this.handleCallData}
                />
            },
            maxWidth: '90%'
        });

    }

    handleEditLeadOrderType_WF(index) {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Chỉnh sửa bước mối bán hàng',
            content: {
                text: <LeadOrderType_WF_Edit
                    LeadOrderTypeID={this.props.match.params.id}
                    DataSource={this.state.DataSource.ListLeadOrderType_WFItem[index]}
                    handleCloseModal={this.handleCloseModal}
                    handleReloadData={this.handleCallData}
                />
            },
            maxWidth: '90%'
        });
    }

    handleDeleteLeadOrderType_WF(deleteList) {

        if (!this.state.DataSource.IsSystem) {
            let deletedUser = this.props.AppInfo.LoginInfo.Username;
            let loginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;

            let lstRequest = deleteList.reduce((p, c) => ([...p, c.reduce((x, y) => ({ ...x, [y.key]: y.value, DeletedUser: deletedUser, LoginLogID: loginLogID }), {})]), {});

            this.props.callFetchAPI(APIHostName, DeleteAPIPath, lstRequest).then(apiResult => {
                this.showMessage(apiResult.Message);
                if (!apiResult.IsError) {
                    this.handleCallData();
                }
            });
        }

    }

    render() {
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        if (this.state.IsLoadDataComplete) {
            // return (
            //     <SimpleForm
            //         FormName="Cập nhật danh sách loại mối bán hàng"
            //         MLObjectDefinition={MLObjectDefinition}
            //         listelement={EditElementList}
            //         onSubmit={this.handleSubmit}
            //         FormMessage={this.state.CallAPIMessage}
            //         IsErrorMessage={this.state.IsCallAPIError}
            //         dataSource={this.state.DataSource}
            //         BackLink={BackLink}
            //         // RequirePermission={PACKAGETYPE_UPDATE}
            //         ref={this.searchref}
            //     />
            // );



            return (
                <FormContainerAvance
                    BackLink={BackLink}
                    IsAutoLayout={true}
                    IsHideFooter={true}
                >
                    <TabContainer
                        controltype="TabContainer"
                        defaultActiveTabIndex={0}
                        IsAutoLayout={true}
                        IsAutoLoadDataGrid={true}
                    >
                        <TabPage
                            datasource={this.state.DataSource}
                            name="LeadOrderType"
                            title="Thông tin chung"
                        >
                            <FormContainer
                                BackLink={BackLink}
                                IsAutoLayout={true}
                                listelement={[]}
                                MLObjectDefinition={MLObjectDefinition}
                                onSubmit={this.handleSubmit}
                                dataSource={this.state.DataSource}
                                RequirePermission={MD_LEADORDERTYPE_UPDATE}
                                IsDisabledSubmitForm={this.state.DataSource.IsSystem}
                            >
                                <FormControl.TextBox
                                    labelcolspan={3}
                                    colspan={6}
                                    controltype="InputControl"
                                    datasourcemember="LeadOrderTypeID"
                                    label="Mã loại mối bán hàng"
                                    name="txtLeadOrderTypeID"
                                    readOnly={true}
                                    maxSize={150}
                                    value=""
                                    validatonList={["required"]}
                                    readOnly={this.state.DataSource.IsSystem}
                                />

                                <FormControl.TextBox
                                    labelcolspan={3}
                                    colspan={6}
                                    controltype="InputControl"
                                    datasourcemember="LeadOrderName"
                                    label="Tên loại mối bán hàng"
                                    name="txtLeadOrderName"
                                    // readonly={true}
                                    maxSize={150}
                                    value=""
                                    validatonList={["required"]}
                                    readOnly={this.state.DataSource.IsSystem}
                                />

                                <FormControl.FormControlComboBox
                                    labelcolspan={3}
                                    colspan={6}
                                    controltype="InputControl"
                                    name="cbLeadOrderTypeProcessID"
                                    datasourcemember="LeadOrderTypeProcessID"
                                    isautoloaditemfromcache={true}
                                    IsLabelDiv={true}
                                    isMulti={false}
                                    label="Phương thức xử lý mối bán hàng"
                                    listoption={[]}
                                    loaditemcachekeyid={ERPCOMMONCACHE_LEADORDERTYPEPROCESS}
                                    name="cbLeadOrderTypeProcessID"
                                    nameMember="LeadOrderTypeProcessName"
                                    value={""}
                                    valuemember="LeadOrderTypeProcessID"
                                    validatonList={["Comborequired"]}
                                    disabled={this.state.DataSource.IsSystem}
                                />


                                <FormControl.FormControlComboBox
                                    labelcolspan={3}
                                    colspan={6}
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
                                    disabled={this.state.DataSource.IsSystem}
                                />

                                <FormControl.TextArea
                                    labelcolspan={3}
                                    colspan={6}
                                    controltype="InputControl"
                                    datasourcemember="Description"
                                    label="Mô tả"
                                    name="txtDescription"
                                    disabled={this.state.DataSource.IsSystem}
                                />

                                <FormControl.CheckBox
                                    labelcolspan={3}
                                    colspan={6}
                                    datasourcemember="IsActived"
                                    label="Kích hoạt"
                                    name="chkIsActived"
                                    controltype="InputControl"
                                    disabled={this.state.DataSource.IsSystem}
                                />

                                <FormControl.CheckBox
                                    labelcolspan={3}
                                    colspan={6}
                                    controltype="InputControl"
                                    datasourcemember="IsSystem"
                                    label="Hệ thống"
                                    name="chkIsSystem"
                                    disabled={this.state.DataSource.IsSystem}
                                />
                            </FormContainer>
                        </TabPage>

                        <TabPage title="Quy trình" name="LeadOrderType_WF">
                            <InputGrid
                                controltype="GridControl"
                                dataSource={this.state.DataSource.ListLeadOrderType_WFItem}
                                IDSelectColumnName={IDSelectColumnName}
                                isUseValueInputControl={true}
                                listColumn={LeadOrderType_WFListColumn}
                                MLObjectDefinition={LeadOrderType_WFMLObjectDefinition}
                                name="LeadOrderType_WF"
                                onDeleteClick_Customize={this.state.DataSource.IsSystem ? null : this.handleDeleteLeadOrderType_WF}
                                onInsertClick={this.state.DataSource.IsSystem ? null : this.handleInsertLeadOrderType_WF}
                                onInsertClickEdit={this.state.DataSource.IsSystem ? null : this.handleEditLeadOrderType_WF}
                                PKColumnName="LeadOrderTypeID,LeadOrderStepID"
                            />
                        </TabPage>
                    </TabContainer >
                </FormContainerAvance>
            );
        }
        return (
            <div>
                <label>Đang nạp dữ liệu...</label>
            </div>
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

const Edit = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditCom);
export default Edit;
