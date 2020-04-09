import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { ModalManager } from 'react-dynamic-modal/lib';
import TabContainer from "../../../../../common/components/Tabs/TabContainer";
import TabPage from "../../../../../common/components/Tabs/TabPage";
import { MessageModal } from "../../../../../common/components/Modal";
import {
    APIHostName, UpdateAPIPath, LoadAPIPath, EditPagePath,
    MLObjectDefinition, MLObjectPieRequestTypeWorkflow,
    MTabList, BackLink, WFColumnList, AddLogAPIPath
} from "../constants"
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import PieRequestTypeWorkflow from '../../PieRequestTypeWorkflow';
import { showModal, hideModal } from '../../../../../actions/modal';
import { MODAL_TYPE_COMMONTMODALS } from '../../../../../constants/actionTypes';
import InputGrid from '../../../../../common/components/Form/AdvanceForm/FormControl/InputGrid';
import FormContainer from '../../../../../common/components/Form/AdvanceForm/FormContainer';
import FormControl from '../../../../../common/components/Form/AdvanceForm/FormControl';
import { PIEREQUESTTYPE_UPDATE } from "../../../../../constants/functionLists";
import { callGetCache } from "../../../../../actions/cacheAction";
import { DeleteAPIPath } from '../../PieRequestTypeWorkflow/constants';

class EditCom extends React.Component {
    constructor(props) {
        super(props);
        this.addPieRequestTypeWorkflowPopup = this.addPieRequestTypeWorkflowPopup.bind(this);
        this.editPieRequestTypeWorkflowPopup = this.editPieRequestTypeWorkflowPopup.bind(this);
        this.removePieRequestTypeWorkflow = this.removePieRequestTypeWorkflow.bind(this);
        this.onWorkflowPopupSubmit = this.onWorkflowPopupSubmit.bind(this);
        this.handleInputChangeList = this.handleInputChangeList.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getCachePiePermission = this.getCachePiePermission.bind(this);
        this.getCacheSysUser = this.getCacheSysUser.bind(this);
        this.callLoadData = this.callLoadData.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.state = {
            IsCallAPIError: false,
            IsCloseForm: false,
            IsLoading: true,
            FormData: {
                PieRequestType: {},
                PieRequestTypeWorkflow: [],
                TotalStepCompletePercent: 0
            },
        };
    }

    componentDidMount() {
        this.props.updatePagePath(EditPagePath);
        this.callLoadData();
        this.getCachePiePermission();
        this.getCacheSysUser();
        console.log("formdata",this.state.FormData);
    }

    addPieRequestTypeWorkflowPopup() {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Thêm mới bước xử lý của một loại yêu cầu chỉnh sửa thông tin sản phẩm',
            content: {
                text: <PieRequestTypeWorkflow
                    PieRequestTypeWorkflow={this.state.FormData.PieRequestTypeWorkflow}
                    onAddPieRequestTypeWorkflowComplete={(data) => this.onWorkflowPopupSubmit(data)}
                    PiePermissionCache={this.state.PiePermissionCache}
                    SysUserCache={this.state.SysUserCache}
                    dataSource={[]}
                    PieRequestTypeID={this.state.FormData.PieRequestType.PieRequestTypeID}
                    TotalStepCompletePercent={this.state.FormData.TotalStepCompletePercent}
                />
            },
            afterClose: this.onWorkflowPopupSubmit,
            maxWidth: '1500px'
        });
    }

    editPieRequestTypeWorkflowPopup(index) {
        // let objPieRequestTypeWorkflow = this.state.FormData.PieRequestTypeWorkflow.filter(x => x.PieRequestStepID == pieRequestStepID)[0];
        // let pieRequestNext = this.state.FormData.PieRequestTypeWorkflow.filter((x,i) => x.PieRequestStepID != pieRequestStepID);
        let objPieRequestTypeWorkflow = this.state.FormData.PieRequestTypeWorkflow[index];
        let pieRequestNext = this.state.FormData.PieRequestTypeWorkflow.filter((x, i) => i != index);
        let dataSource = [];
        let ListPieRequestType_WF_Permis = [];
        if (objPieRequestTypeWorkflow.PieRequestType_WF_Permis) {
            let PieRequestType_WF_Permis = {};
            const piePermissionCache = this.state.PiePermissionCache;
            objPieRequestTypeWorkflow.PieRequestType_WF_Permis.map((row, index) => {
                if (PieRequestType_WF_Permis.UserName != row.UserName) {
                    const tempt = Object.assign({}, PieRequestType_WF_Permis);
                    ListPieRequestType_WF_Permis.push(tempt);
                    PieRequestType_WF_Permis.UserName = row.UserName
                    PieRequestType_WF_Permis.FullName = row.FullName
                    piePermissionCache.map(item => {
                        PieRequestType_WF_Permis[item.PiePermissionID] = false;
                    })
                }
                PieRequestType_WF_Permis[row.PiePermissionID] = true;
            });
            if (PieRequestType_WF_Permis.UserName && PieRequestType_WF_Permis.UserName.length > 0) {
                ListPieRequestType_WF_Permis.push(PieRequestType_WF_Permis);
                ListPieRequestType_WF_Permis.shift();
            }
        }
        dataSource = Object.assign({}, objPieRequestTypeWorkflow, { PieRequestType_WF_Permis: ListPieRequestType_WF_Permis })
        let totalStepCompletePercent = pieRequestNext.reduce((StepCompletePercent, rowItem) => {
            return StepCompletePercent += rowItem.StepCompletePercent
        }, 0);
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Chỉnh sửa bước xử lý của một loại yêu cầu chỉnh sửa thông tin sản phẩm',
            content: {
                text: <PieRequestTypeWorkflow
                    PieRequestTypeWorkflow={pieRequestNext}
                    dataSource={dataSource}
                    onAddPieRequestTypeWorkflowComplete={(data) => this.onWorkflowPopupSubmit(data)}
                    PiePermissionCache={this.state.PiePermissionCache}
                    SysUserCache={this.state.SysUserCache}
                    IsUpdateData={true}
                    PieRequestTypeID={this.state.FormData.PieRequestType.PieRequestTypeID}
                    TotalStepCompletePercent={totalStepCompletePercent}
                />
            },
            afterClose: this.onWorkflowPopupSubmit,
            maxWidth: '1500px'
        });
    }

    removePieRequestTypeWorkflow(deleteList, dataSource, pkColumnName) {
        let listMLObject = [];
        // deleteList.map((row, index) => {
        //     let MLObject = {};
        //     MLObject[pkColumnName] = row;
        //     MLObject.DeletedUser = this.props.AppInfo.LoginInfo.Username;
        //     listMLObject.push(MLObject);
        // });
        deleteList.map((selectItem) => {
            let isMath = false;
            dataSource.map((row) => {
                if (!isMath) {
                    for (var i = 0; i < selectItem.length; i++) {
                        if (selectItem[i].value != row[selectItem[i].key]) {
                            isMath = false;
                            break;
                        } else {
                            isMath = true;
                        }
                    }
                    if (isMath) {
                        row.DeletedUser = this.props.AppInfo.LoginInfo.Username;
                        listMLObject.push(row);
                    }
                }
            });
        });
        this.props.callFetchAPI(APIHostName, DeleteAPIPath, listMLObject).then((apiResult) => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);
            this.callLoadData();
        });
    }

    //Sự kiện khi bấm cập nhật popup thêm bước xử lý
    onWorkflowPopupSubmit(formData) {
        this.callLoadData();
        this.props.hideModal();
    }

    handleInputChangeList(formData, tabNameList, tabMLObjectDefinitionList, formValidation) {
        //console.log("edithandel",formValidation);
        let formDataTemp = {};
        const oldPieRequestType = this.state.FormData.PieRequestType;
        Object.keys(this.state.FormData.PieRequestType).forEach(function (key) {
            //formDataTemp = Object.assign({}, formDataTemp, { [key]: formData.PieRequestType[key] ? formData.PieRequestType[key] : oldPieRequestType[key] });
            formDataTemp = Object.assign({}, formDataTemp, { [key]: formData.PieRequestType[key] });
        });
        const newFormData = Object.assign({}, this.state.FormData, { PieRequestType: formDataTemp })
        this.setState({ FormData: newFormData});
    }

    handleSubmitInsertLog(MLObject) {
        MLObject.ActivityTitle = "Cập nhật loại yêu cầu chỉnh sửa thông tin";
        MLObject.ActivityDetail = "Cập nhật loại yêu cầu chỉnh sửa thông tin";
        MLObject.ObjectID = "PIM_PIEREQUESTTYPE";
        MLObject.ActivityUser = MLObject.UpdatedUser;
        this.props.callFetchAPI(APIHostName, AddLogAPIPath, MLObject);
    }

    handleSubmit(formData, MLObject) {
        console.log("handleSubmit", MLObject, formData);
        let param = Object.assign({}, this.state.FormData.PieRequestType, { PieRequestTypeWorkflow: this.state.FormData.PieRequestTypeWorkflow });
        param.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        param.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
        if (param.PieRequestTypeWorkflow) {
            param.PieRequestTypeWorkflow.forEach(function (item, index) {
                if (!item.CreatedUser) {
                    item.PieRequestStepID = -1;
                }
            })
        }
        this.props.callFetchAPI(APIHostName, UpdateAPIPath, param).then((apiResult) => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);
            if (!apiResult.IsError) {
                this.handleSubmitInsertLog(param);
            }
        });
    }

    getCachePiePermission() {
        let PiePermissionList = [];
        this.props.callGetCache("PIMCACHE.PIM_PIEPERMISSION").then((apiResult) => {
            if (!apiResult.IsError && apiResult.ResultObject.CacheData != null) {
                PiePermissionList = apiResult.ResultObject.CacheData;
            }
            this.setState({
                PiePermissionCache: PiePermissionList
            });
        });
    }

    getCacheSysUser() {
        let SysUserList = [];
        this.props.callGetCache("PIMCACHE.SYS_USER").then((apiResult) => {
            if (!apiResult.IsError && apiResult.ResultObject.CacheData != null) {
                SysUserList = apiResult.ResultObject.CacheData;
            }
            this.setState({
                SysUserCache: SysUserList
            });
            //console.log("SysUserList", SysUserList);
        });
    }

    callLoadData() {
        const id = this.props.match.params.id;
        this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then((apiResult) => {
            this.setState({ IsLoading: false })
            if (apiResult) {
                if (apiResult.IsError) {
                    this.setState({IsCallAPIError: apiResult.IsError});
                    this.showMessage(apiResult.Message);
                    return;
                }
                let TotalStepCompletePercent = 0;
                if (apiResult.ResultObject.PieRequestTypeWorkflow) {
                    apiResult.ResultObject.PieRequestTypeWorkflow.map((item) => {
                        if (item.MaxProcessTime) {
                            item.DisplayProcessTime = '';
                            let day = parseInt(item.MaxProcessTime / 60 / 24);
                            if (day > 0)
                                item.DisplayProcessTime += day + ' Ngày '
                            let hour = parseInt((item.MaxProcessTime / 60) % 24);
                            if (hour > 0)
                                item.DisplayProcessTime += hour + ' Giờ '
                            let minute = item.MaxProcessTime - (day * 24 * 60 + hour * 60);
                            if (minute > 0)
                                item.DisplayProcessTime += minute + ' Phút '
                        }
                        TotalStepCompletePercent += item.StepCompletePercent;
                    })
                    this.setState({
                        FormData: {
                            PieRequestType: apiResult.ResultObject,
                            PieRequestTypeWorkflow: apiResult.ResultObject.PieRequestTypeWorkflow,
                            TotalStepCompletePercent: TotalStepCompletePercent
                        }
                    });
                }
                else {
                    this.setState({
                        FormData: {
                            PieRequestType: apiResult.ResultObject
                        }
                    });
                }
            }
        });
    }

    handleCloseMessage() {
        if (!this.state.IsCallAPIError)
            this.setState({ IsCloseForm: true });
    }

    showMessage(message) {
        ModalManager.open(<MessageModal title="Thông báo"
            message={message} onRequestClose={() => true}
            onCloseModal={this.handleCloseMessage}
        />);
    }

    render() {
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        if (this.state.IsLoading) return <p>Đang lấy dữ liệu...</p>
        return (
            <FormContainer
                MLObjectDefinition={MTabList}
                IsAutoLayout={true}
                listelement={[]}
                dataSource={this.state.FormData}
                RequirePermission={PIEREQUESTTYPE_UPDATE}
                onInputChangeList={this.handleInputChangeList}
                onSubmit={(formData, MLObject) => this.handleSubmit(formData, MLObject)}
                BackLink={BackLink}>
                <TabContainer
                    defaultActiveTabIndex={0} IsAutoLayout={true} controltype="TabContainer" IsAutoLoadDataGrid={true}>
                    <TabPage title="Thông tin chung" name="PieRequestType" MLObjectDefinition={MLObjectDefinition} datasource={this.state.FormData.PieRequestType}>
                        <FormControl.TextBox readonly={true} name="PieRequestTypeID" label="Mã loại yêu cầu:"
                            controltype="InputControl" datasourcemember="PieRequestTypeID"
                            labelcolspan={3} colspan={9} rowspan={8}
                        />
                        <FormControl.TextBox name="PieRequestTypeName" label="Tên loại yêu cầu:"
                            controltype="InputControl" datasourcemember="PieRequestTypeName"
                            labelcolspan={3} colspan={9} rowspan={8}
                            maxSize={200}
                        />
                        <FormControl.ComboBox name="PieTypeID" type="select" isautoloaditemfromcache={true}
                            loaditemcachekeyid="PIMCACHE.PIETYPE" valuemember="PieTypeID" nameMember="PieTypeName"
                            label="Loại chỉnh sửa:" controltype="InputControl" listoption={[]} datasourcemember="PieTypeID"
                            labelcolspan={3} colspan={9} rowspan={8}
                        />
                        <FormControl.TextBox name="AddFunctionID" label="Quyền thêm"
                            datasourcemember="AddFunctionID" controltype="InputControl"
                            labelcolspan={3} colspan={9} rowspan={8}
                            maxSize={400}
                        />
                        <FormControl.TextArea name="Description" label="Mô tả"
                            datasourcemember="Description" controltype="InputControl"
                            labelcolspan={3} colspan={9} rowspan={8}
                            maxSize={2000}
                        />
                        <FormControl.Numeric name="OrderIndex" label="Thứ tự hiển thị"
                            datasourcemember="OrderIndex" controltype="InputControl"
                            labelcolspan={3} colspan={9} rowspan={8}
                            value={this.state.FormData ? this.state.FormData.PieRequestType.OrderIndex : ""} 
                            maxSize={10}
                        />
                        <FormControl.CheckBox label="Kích hoạt" name="IsActived"
                            datasourcemember="IsActived" controltype="InputControl"
                            labelcolspan={3} colspan={9} rowspan={8}
                        />
                        <FormControl.CheckBox label="Hệ thống" name="IsSystem"
                            datasourcemember="IsSystem" controltype="InputControl"
                            labelcolspan={3} colspan={9} rowspan={8}
                        />
                    </TabPage>
                    <TabPage title="Quy trình" name="PieRequestTypeWorkflow">
                        <InputGrid name="PieRequestTypeWorkflow" controltype="GridControl"
                            IDSelectColumnName="chkSelectPieRequestStepID"
                            PKColumnName="PieRequestStepID"
                            isUseValueInputControl={true}
                            listColumn={WFColumnList}
                            colspan="12"
                            MLObjectDefinition={MLObjectPieRequestTypeWorkflow}
                            dataSource={this.state.FormData.PieRequestTypeWorkflow}
                            onInsertClick={this.addPieRequestTypeWorkflowPopup}
                            onInsertClickEdit={this.editPieRequestTypeWorkflowPopup}
                            onDeleteClick_Customize={this.removePieRequestTypeWorkflow}
                        />
                    </TabPage>
                </TabContainer>
            </FormContainer >
        );
    }
}

const mapStateToProps = state => {
    return {
        AppInfo: state,
        FetchAPIInfo: state.FetchAPIInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updatePagePath: (pagePath) => {
            dispatch(updatePagePath(pagePath));
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: () => {
            dispatch(hideModal());
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        }
    }
}

const Edit = connect(mapStateToProps, mapDispatchToProps)(EditCom);
export default Edit;