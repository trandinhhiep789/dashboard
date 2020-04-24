import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { ModalManager } from 'react-dynamic-modal/lib';
import TabContainer from "../../../../../../common/components/Tabs/TabContainer";
import TabPage from "../../../../../../common/components/Tabs/TabPage";
import { MessageModal } from "../../../../../../common/components/Modal";
import {
    APIHostName, UpdateAPIPath, LoadAPIPath, EditPagePath,
    MLObjectDefinition, MLObjectShipmentOrderTypeWorkFlow,
    MTabList, BackLink, WFColumnList, AddLogAPIPath
} from "../constants"
import { callFetchAPI } from "../../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../../actions/pageAction";
import ShipmentOrderTypeWorkflow from '../../ShipmentOrderTypeWorkflow';
import { showModal, hideModal } from '../../../../../../actions/modal';
import { MODAL_TYPE_COMMONTMODALS } from '../../../../../../constants/actionTypes';
import InputGrid from '../../../../../../common/components/Form/AdvanceForm/FormControl/InputGrid';
import FormContainer from '../../../../../../common/components/Form/AdvanceForm/FormContainer';
import FormControl from '../../../../../../common/components/Form/AdvanceForm/FormControl';
import { PIEREQUESTTYPE_UPDATE } from "../../../../../../constants/functionLists";
import { callGetCache } from "../../../../../../actions/cacheAction";
import { DeleteAPIPath } from '../../ShipmentOrderTypeWorkflow/constants';

class EditCom extends React.Component {
    constructor(props) {
        super(props);
        this.addShipmentOrderTypeWorkflowPopup = this.addShipmentOrderTypeWorkflowPopup.bind(this);
        this.editShipmentOrderTypeWorkflowPopup = this.editShipmentOrderTypeWorkflowPopup.bind(this);
        this.removeShipmentOrderTypeWorkflow = this.removeShipmentOrderTypeWorkflow.bind(this);
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
                ShipmentOrderType: {},
                ShipmentOrderTypeWorkflow: [],
                TotalStepCompletePercent: 0
            },
        };
    }

    componentDidMount() {
        this.props.updatePagePath(EditPagePath);
        this.callLoadData();
        // this.getCachePiePermission();
        // this.getCacheSysUser();
        //console.log("formdata", this.state.FormData);
    }

    addShipmentOrderTypeWorkflowPopup() {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Thêm mới bước xử lý của một loại yêu cầu vận chuyển',
            content: {
                text: <ShipmentOrderTypeWorkflow
                    ShipmentOrderTypeWorkflow={this.state.FormData.ShipmentOrderTypeWorkflow}
                    onAddShipmentOrderTypeWorkflowComplete={(data) => this.onWorkflowPopupSubmit(data)}
                    // PiePermissionCache={this.state.PiePermissionCache}
                    // SysUserCache={this.state.SysUserCache}
                    dataSource={[]}
                    ShipmentOrderTypeID={this.state.FormData.ShipmentOrderType.ShipmentOrderTypeID}
                    TotalStepCompletePercent={this.state.FormData.TotalStepCompletePercent}
                />
            },
            afterClose: this.onWorkflowPopupSubmit,
            maxWidth: '1500px'
        });
    }

    editShipmentOrderTypeWorkflowPopup(index) {
        // let objPieRequestTypeWorkflow = this.state.FormData.PieRequestTypeWorkflow.filter(x => x.PieRequestStepID == pieRequestStepID)[0];
        // let shipmentOrderTypeWorkflowNext = this.state.FormData.PieRequestTypeWorkflow.filter((x,i) => x.PieRequestStepID != pieRequestStepID);
        let objShipmentOrderTypeWorkflow = this.state.FormData.ShipmentOrderTypeWorkflow[index];
        let shipmentOrderTypeWorkflowNext = this.state.FormData.ShipmentOrderTypeWorkflow.filter((x, i) => i != index);
        let dataSource = [];
        // let ListPieRequestType_WF_Permis = [];
        // if (objPieRequestTypeWorkflow.PieRequestType_WF_Permis) {
        //     let PieRequestType_WF_Permis = {};
        //     const piePermissionCache = this.state.PiePermissionCache;
        //     objPieRequestTypeWorkflow.PieRequestType_WF_Permis.map((row, index) => {
        //         if (PieRequestType_WF_Permis.UserName != row.UserName) {
        //             const tempt = Object.assign({}, PieRequestType_WF_Permis);
        //             ListPieRequestType_WF_Permis.push(tempt);
        //             PieRequestType_WF_Permis.UserName = row.UserName
        //             PieRequestType_WF_Permis.FullName = row.FullName
        //             piePermissionCache.map(item => {
        //                 PieRequestType_WF_Permis[item.PiePermissionID] = false;
        //             })
        //         }
        //         PieRequestType_WF_Permis[row.PiePermissionID] = true;
        //     });
        //     if (PieRequestType_WF_Permis.UserName && PieRequestType_WF_Permis.UserName.length > 0) {
        //         ListPieRequestType_WF_Permis.push(PieRequestType_WF_Permis);
        //         ListPieRequestType_WF_Permis.shift();
        //     }
        // }
        // dataSource = Object.assign({}, objPieRequestTypeWorkflow, { PieRequestType_WF_Permis: ListPieRequestType_WF_Permis })
        dataSource = objShipmentOrderTypeWorkflow;
        let totalStepCompletePercent = shipmentOrderTypeWorkflowNext.reduce((StepCompletePercent, rowItem) => {
            return StepCompletePercent += rowItem.StepCompletePercent
        }, 0);
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Chỉnh sửa bước xử lý của một loại yêu cầu vận chuyển',
            content: {
                text: <ShipmentOrderTypeWorkflow
                    ShipmentOrderTypeWorkflow={shipmentOrderTypeWorkflowNext}
                    dataSource={dataSource}
                    onAddShipmentOrderTypeWorkflowComplete={(data) => this.onWorkflowPopupSubmit(data)}
                    // PiePermissionCache={this.state.PiePermissionCache}
                    // SysUserCache={this.state.SysUserCache}
                    IsUpdateData={true}
                    ShipmentOrderTypeID={this.state.FormData.ShipmentOrderType.ShipmentOrderTypeID}
                    TotalStepCompletePercent={totalStepCompletePercent}
                />
            },
            afterClose: this.onWorkflowPopupSubmit,
            maxWidth: '1500px'
        });
    }

    removeShipmentOrderTypeWorkflow(deleteList, dataSource, pkColumnName) {
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
            this.callLoadData();
            this.showMessage(apiResult.Message);
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
        Object.keys(this.state.FormData.ShipmentOrderType).forEach(function (key) {
            //formDataTemp = Object.assign({}, formDataTemp, { [key]: formData.PieRequestType[key] ? formData.PieRequestType[key] : oldPieRequestType[key] });
            formDataTemp = Object.assign({}, formDataTemp, { [key]: formData.ShipmentOrderType[key] });
        });
        const newFormData = Object.assign({}, this.state.FormData, { ShipmentOrderType: formDataTemp })
        this.setState({ FormData: newFormData });
        //console.log("this.state.FormData", this.state.FormData);
    }

    handleSubmitInsertLog(MLObject) {
        MLObject.ActivityTitle = "Cập nhật loại yêu cầu chỉnh sửa thông tin";
        MLObject.ActivityDetail = "Cập nhật loại yêu cầu chỉnh sửa thông tin";
        MLObject.ObjectID = "PIM_PIEREQUESTTYPE";
        MLObject.ActivityUser = MLObject.UpdatedUser;
        this.props.callFetchAPI(APIHostName, AddLogAPIPath, MLObject);
    }

    handleSubmit(formData, MLObject) {
        //console.log("handleSubmit", MLObject, formData);
        let param = Object.assign({}, this.state.FormData.ShipmentOrderType, { ShipmentOrderTypeWorkflow: this.state.FormData.ShipmentOrderTypeWorkflow });
        param.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        param.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
        if (param.ShipmentOrderTypeWorkflow) {
            param.ShipmentOrderTypeWorkflow.forEach(function (item, index) {
                if (!item.CreatedUser) {
                    item.PieRequestStepID = -1;
                }
            })
        }
        this.props.callFetchAPI(APIHostName, UpdateAPIPath, param).then((apiResult) => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);
            if (!apiResult.IsError) {
                //this.handleSubmitInsertLog(param);
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
            //console.log("apiResult", apiResult);
            if (apiResult) {
                if (apiResult.IsError) {
                    this.setState({ IsCallAPIError: apiResult.IsError });
                    this.showMessage(apiResult.Message);
                    return;
                }
                //partner
                let listPartner, listStatus= [];
                listPartner = this.comboPartner(apiResult.ResultObject.ListPartner);
                listStatus = this.comboStatus(apiResult.ResultObject.ListStatus);

                let TotalStepCompletePercent = 0;
                if (apiResult.ResultObject.ShipmentOrderTypeWorkflow) {
                    apiResult.ResultObject.ShipmentOrderTypeWorkflow.map((item) => {
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
                    });
                    this.setState({
                        FormData: {
                            ShipmentOrderType: apiResult.ResultObject,
                            ShipmentOrderTypeWorkflow: apiResult.ResultObject.ShipmentOrderTypeWorkflow,
                            TotalStepCompletePercent: TotalStepCompletePercent,
                            ListPartner: listPartner,
                            ListStatus: listStatus
                        }
                    });
                }
                else {
                    this.setState({
                        FormData: {
                            ShipmentOrderType: apiResult.ResultObject,
                            ListPartner: listPartner,
                            ListStatus: listStatus
                        }
                    });
                }

                this.setState({ IsLoading: false });
            }
        });
    }

    handleCloseMessage() {
        // if (!this.state.IsCallAPIError)
        //     this.setState({ IsCloseForm: true });
    }

    showMessage(message) {
        ModalManager.open(<MessageModal title="Thông báo"
            message={message} onRequestClose={() => true}
            onCloseModal={this.handleCloseMessage}
        />);
    }

    comboPartner(data){
        const convertdata = data.map(function (objData) {
            return { value: objData.PartnerID, name: objData.PartnerName, label: objData.PartnerName }
        });
        convertdata.unshift({value: -1, name: "---Vui lòng chọn---", label: "---Vui lòng chọn---"});
        return convertdata;
        
    }

    comboStatus(data){
        const convertdata = data.map(function (objData) {
            return { value: objData.ShipmentOrderStatusID, name: objData.StatusName, label: objData.ShipmentOrderStatusName }
        });
        convertdata.unshift({value: -1, name: "---Vui lòng chọn---", label: "---Vui lòng chọn---"});
        return convertdata;
        
    }

    render() {
        // if (this.state.IsCloseForm) {
        //     return <Redirect to={BackLink} />;
        // }
        if (this.state.IsLoading) return <p>Đang lấy dữ liệu...</p>
        return (
            <FormContainer
                MLObjectDefinition={MTabList}
                IsAutoLayout={true}
                listelement={[]}
                dataSource={this.state.FormData}
                //RequirePermission={PIEREQUESTTYPE_UPDATE}
                onInputChangeList={this.handleInputChangeList}
                onSubmit={(formData, MLObject) => this.handleSubmit(formData, MLObject)}
                BackLink={BackLink}>
                <TabContainer
                    defaultActiveTabIndex={0} IsAutoLayout={true} controltype="TabContainer" IsAutoLoadDataGrid={true}>
                    <TabPage title="Loại yêu cầu vận chuyển" name="ShipmentOrderType" MLObjectDefinition={MLObjectDefinition} datasource={this.state.FormData.ShipmentOrderType}>
                        <FormControl.TextBox readonly={true} name="ShipmentOrderTypeID" label="Mã loại yêu cầu vận chuyển:"
                            controltype="InputControl" datasourcemember="ShipmentOrderTypeID"
                            labelcolspan={3} colspan={9} rowspan={8}
                            maxSize={10}
                        />
                        <FormControl.TextBox name="ShipmentOrderTypeName" label="Tên loại yêu cầu vận chuyển:"
                            controltype="InputControl" datasourcemember="ShipmentOrderTypeName"
                            labelcolspan={3} colspan={9} rowspan={8}
                            maxSize={200}
                        />
                        {/* <FormControl.ComboBox name="PieTypeID" type="select" isautoloaditemfromcache={true}
                            loaditemcachekeyid="PIMCACHE.PIETYPE" valuemember="PieTypeID" nameMember="PieTypeName"
                            label="Loại chỉnh sửa:" controltype="InputControl" listoption={[]} datasourcemember="PieTypeID"
                            labelcolspan={3} colspan={9} rowspan={8}
                        /> */}
                        <FormControl.TextBox name="AddFunctionID" label="Quyền thêm yêu cầu này"
                            datasourcemember="AddFunctionID" controltype="InputControl"
                            labelcolspan={3} colspan={9} rowspan={8}
                            maxSize={400}
                        />

                        <FormControl.CheckBox label="IsSelectSenderPartner" name="IsSelectSenderPartner"
                            datasourcemember="IsSelectSenderPartner" controltype="InputControl"
                            labelcolspan={3} colspan={9} rowspan={8}
                        />

                        <FormControl.CheckBox label="IsSelectSenderStore" name="IsSelectSenderStore"
                            datasourcemember="IsSelectSenderStore" controltype="InputControl"
                            labelcolspan={3} colspan={9} rowspan={8}
                        />

                        <FormControl.CheckBox label="IsSelectReceiverPartner" name="IsSelectReceiverPartner"
                            datasourcemember="IsSelectReceiverPartner" controltype="InputControl"
                            labelcolspan={3} colspan={9} rowspan={8}
                        />

                        <FormControl.CheckBox label="IsSelectReceiverStore" name="IsSelectReceiverStore"
                            datasourcemember="IsSelectReceiverStore" controltype="InputControl"
                            labelcolspan={3} colspan={9} rowspan={8}
                        />

                        {/* ------------------------------------------------------------------ */}
                        <FormControl.ComboBox name="PartnerID" type="select" isautoloaditemfromcache={false}
                            loaditemcachekeyid="" valuemember="PartnerID" nameMember="PartnerName" value={this.state.FormData.ShipmentOrderType.PartnerID}
                            label="Mã đối tác" controltype="InputControl" listoption={this.state.FormData.ListPartner} datasourcemember="PartnerID"
                            labelcolspan={3} colspan={9} rowspan={8}
                        />
                   
                        <FormControl.ComboBox name="StatusID" type="select" isautoloaditemfromcache={false}
                            loaditemcachekeyid="" valuemember="StatusID" nameMember="StatusName" value={this.state.FormData.ShipmentOrderType.StatusID}
                            label="Trạng thái vận chuyển" controltype="InputControl" listoption={this.state.FormData.ListStatus} datasourcemember="StatusID"
                            labelcolspan={3} colspan={9} rowspan={8}
                        />
                        {/* ------------------------------------------------------------------ */}

                        <FormControl.TextArea name="Description" label="Mô tả"
                            datasourcemember="Description" controltype="InputControl"
                            labelcolspan={3} colspan={9} rowspan={8} rows={6}
                            maxSize={2000}
                        />
                        <FormControl.Numeric name="OrderIndex" label="Thứ tự hiển thị"
                            datasourcemember="OrderIndex" controltype="InputControl"
                            labelcolspan={3} colspan={9} rowspan={8}
                            value={this.state.FormData ? this.state.FormData.ShipmentOrderType.OrderIndex : 0}
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
                    <TabPage title="Quy trình" name="ShipmentOrderTypeWorkFlow">
                        <InputGrid name="ShipmentOrderTypeWorkFlow" controltype="GridControl"
                            IDSelectColumnName="chkSelectShipmentOrderStepID"
                            PKColumnName="ShipmentOrderStepID"
                            isUseValueInputControl={true}
                            listColumn={WFColumnList}
                            colspan="12"
                            MLObjectDefinition={MLObjectShipmentOrderTypeWorkFlow}
                            dataSource={this.state.FormData.ShipmentOrderTypeWorkflow}
                            onInsertClick={this.addShipmentOrderTypeWorkflowPopup}
                            onInsertClickEdit={this.editShipmentOrderTypeWorkflowPopup}
                            onDeleteClick_Customize={this.removeShipmentOrderTypeWorkflow}
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