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
    MTabList, BackLink, WFColumnList, AddLogAPIPath, FixShipmentFeeColumnList, MLObjectShipmentOrderType_FixShipmentFee, ModalFixShipmentFeeColumnList
} from "../constants"
import { callFetchAPI } from "../../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../../actions/pageAction";
import ShipmentOrderTypeWorkflow from '../../ShipmentOrderTypeWorkflow';
import ShipmentOrderType_FixShipmentFee from '../../ShipmentOrderType_FixShipmentFee';
import { showModal, hideModal } from '../../../../../../actions/modal';
import { MODAL_TYPE_COMMONTMODALS } from '../../../../../../constants/actionTypes';
import InputGrid from '../../../../../../common/components/Form/AdvanceForm/FormControl/InputGrid';
import FormContainer from '../../../../../../common/components/Form/AdvanceForm/FormContainer';
import FormControl from '../../../../../../common/components/Form/AdvanceForm/FormControl';
import { PIEREQUESTTYPE_UPDATE } from "../../../../../../constants/functionLists";
import { callGetCache } from "../../../../../../actions/cacheAction";
import { DeleteAPIPath } from '../../ShipmentOrderTypeWorkflow/constants';
import DataGrid from "../../../../../../common/components/DataGrid";

class EditCom extends React.Component {
    constructor(props) {
        super(props);
        this.addShipmentOrderTypeWorkflowPopup = this.addShipmentOrderTypeWorkflowPopup.bind(this);
        this.editShipmentOrderTypeWorkflowPopup = this.editShipmentOrderTypeWorkflowPopup.bind(this);
        this.removeShipmentOrderTypeWorkflow = this.removeShipmentOrderTypeWorkflow.bind(this);
        this.addShipmentOrderType_FixShipmentFeePopup = this.addShipmentOrderType_FixShipmentFeePopup.bind(this);
        this.onWorkflowPopupSubmit = this.onWorkflowPopupSubmit.bind(this);
        this.handleInputChangeList = this.handleInputChangeList.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getCachePiePermission = this.getCachePiePermission.bind(this);
        this.getCacheSysUser = this.getCacheSysUser.bind(this);
        this.getCachePartner = this.getCachePartner.bind(this);
        this.getCacheShipmentStatus = this.getCacheShipmentStatus.bind(this);
        this.changeSelecPartner = this.changeSelecPartner.bind(this);
        this.changeSelectShipmentStatus = this.changeSelectShipmentStatus.bind(this);
        this.callLoadData = this.callLoadData.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.state = {
            IsCallAPIError: false,
            IsCloseForm: false,
            IsLoading: true,
            FormData: {
                ShipmentOrderType: {},
                ShipmentOrderTypeWorkflow: [],
                ShipmentOrderType_FixShipmentFee: [],
                TotalStepCompletePercent: 0
            }
            // PartnerList: [],
            // ShipmentStatusList: []
        };
    }

    componentDidMount() {
        this.props.updatePagePath(EditPagePath);
        this.callLoadData();
        this.getCachePiePermission();
        this.getCacheSysUser();
        this.getCachePartner();
        this.getCacheShipmentStatus();
        //console.log("formdata", this.state.FormData);
    }

    addShipmentOrderTypeWorkflowPopup() {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Thêm mới bước xử lý của một loại yêu cầu vận chuyển',
            content: {
                text: <ShipmentOrderTypeWorkflow
                    ShipmentOrderTypeWorkflow={this.state.FormData.ShipmentOrderTypeWorkflow}
                    onAddShipmentOrderTypeWorkflowComplete={(data) => this.onWorkflowPopupSubmit(data)}
                    PiePermissionCache={this.state.PiePermissionCache}
                    SysUserCache={this.state.SysUserCache}
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
        debugger;
        // let objPieRequestTypeWorkflow = this.state.FormData.PieRequestTypeWorkflow.filter(x => x.PieRequestStepID == pieRequestStepID)[0];
        // let shipmentOrderTypeWorkflowNext = this.state.FormData.PieRequestTypeWorkflow.filter((x,i) => x.PieRequestStepID != pieRequestStepID);
        let objShipmentOrderTypeWorkflow = this.state.FormData.ShipmentOrderTypeWorkflow[index];
        let shipmentOrderTypeWorkflowNext = this.state.FormData.ShipmentOrderTypeWorkflow.filter((x, i) => i != index);
        let dataSource = [];
        let ListShipmentOrderType_WF_Permis = [];
        if (objShipmentOrderTypeWorkflow.ShipmentOrderType_WF_Permis) {
            let _shipmentOrderType_WF_Permis = {};
            const piePermissionCache = this.state.PiePermissionCache;
            objShipmentOrderTypeWorkflow.ShipmentOrderType_WF_Permis.map((row, index) => {
                if (_shipmentOrderType_WF_Permis.UserGroupID != row.UserGroupID) {
                    const tempt = Object.assign({}, _shipmentOrderType_WF_Permis);
                    ListShipmentOrderType_WF_Permis.push(tempt);
                    _shipmentOrderType_WF_Permis.UserGroupID = row.UserGroupID
                    _shipmentOrderType_WF_Permis.UserGroupName = row.UserGroupName
                    piePermissionCache.map(item => {
                        _shipmentOrderType_WF_Permis[item.ShipmentOrderPermissionID] = false;
                    })
                }
                _shipmentOrderType_WF_Permis[row.ShipmentOrderPermissionID] = true;
            });
            if (_shipmentOrderType_WF_Permis.UserGroupID && _shipmentOrderType_WF_Permis.UserGroupName.length > 0) {
                ListShipmentOrderType_WF_Permis.push(_shipmentOrderType_WF_Permis);
                ListShipmentOrderType_WF_Permis.shift();
            }
        }
        dataSource = Object.assign({}, objShipmentOrderTypeWorkflow, { ShipmentOrderType_WF_Permis: ListShipmentOrderType_WF_Permis })
        //dataSource = objShipmentOrderTypeWorkflow;
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
                    PiePermissionCache={this.state.PiePermissionCache}
                    SysUserCache={this.state.SysUserCache}
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

    //----------------------- Chi phí vận chuyển cố định ------------------------------------------------------------

    // addShipmentOrderType_FixShipmentFeePopup() {
    //     this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
    //         title: 'Thêm mới chi phí vận chuyển cố định của một loại yêu cầu vận chuyển',
    //         content: {
    //             text: <ShipmentOrderType_FixShipmentFee
    //                 ShipmentOrderTypeWorkflow={this.state.FormData.ShipmentOrderTypeWorkflow}
    //                 onAddShipmentOrderTypeWorkflowComplete={(data) => this.onWorkflowPopupSubmit(data)}
    //                 dataSource={[]}
    //                 ShipmentOrderTypeID={this.state.FormData.ShipmentOrderType.ShipmentOrderTypeID}
    //             />
    //         },
    //         afterClose: this.onWorkflowPopupSubmit,
    //         maxWidth: '1500px'
    //     });
    // }

    addShipmentOrderType_FixShipmentFeePopup(MLObjectDefinition, modalElementList, dataSource) {
        this.props.showModal(MODAL_TYPE_CONFIRMATION, {
            title: 'Thêm mới chi phí vận chuyển cố định của một loại yêu cầu vận chuyển',
            autoCloseModal: false,
            onConfirm: (isConfirmed, formData) => {
                if (isConfirmed) {
                    let MLObject = GetMLObjectData(MLObjectDefinition, formData, dataSource);
                    if (MLObject) {
                        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
                        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
                        this.props.callFetchAPI(APIHostName, UpdateAPIPath, MLObject).then((apiResult) => {
                            if (!apiResult.IsError) {
                                this.callSearchData(this.state.SearchData);
                                //this.handleSubmitInsertLog(MLObject);
                                this.props.hideModal();
                                this.addNotification(apiResult.Message, apiResult.IsError);
                            } else {
                                this.showMessage(apiResult.Message);
                            }
                            this.setState({ IsCallAPIError: apiResult.IsError });
                        });
                    }
                }
            },
            modalElementList: modalElementList
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
        //const oldPieRequestType = this.state.FormData.PieRequestType;
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

        let param = Object.assign({}, this.state.FormData.ShipmentOrderType,
            {
                ShipmentOrderTypeWorkflow: this.state.FormData.ShipmentOrderTypeWorkflow,
                ListPartner: this.state.PartnerList,
                ListStatus: this.state.ShipmentStatusList
            });
        param.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        param.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
        if (param.ShipmentOrderTypeWorkflow) {
            param.ShipmentOrderTypeWorkflow.forEach(function (item, index) {
                if (!item.CreatedUser) {
                    item.PieRequestStepID = -1;
                }
            })
        }

        //console.log("handleSubmit", param);
        this.props.callFetchAPI(APIHostName, UpdateAPIPath, param).then((apiResult) => {
            debugger;
            this.setState({ IsCallAPIError: apiResult.IsError });
            if (!apiResult.IsError) {
                this.showMessage1(apiResult.Message);
                //this.handleSubmitInsertLog(param);
            } else {
                this.showMessage(apiResult.Message);
            }

        });
    }

    getCachePiePermission() {
        let PiePermissionList = [];
        this.props.callGetCache("ERPCOMMONCACHE.SHIPMENTORDERPERMISSION").then((apiResult) => {
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
        this.props.callGetCache("ERPCOMMONCACHE.USERGROUP").then((apiResult) => {
            if (!apiResult.IsError && apiResult.ResultObject.CacheData != null) {
                SysUserList = apiResult.ResultObject.CacheData;
            }
            this.setState({
                SysUserCache: SysUserList
            });
            //console.log("SysUserList", SysUserList);
        });
    }

    getCachePartner() {
        let PartnerList = [];
        this.props.callGetCache("ERPCOMMONCACHE.PARTNER").then((apiResult) => {
            if (!apiResult.IsError && apiResult.ResultObject.CacheData != null) {
                PartnerList = apiResult.ResultObject.CacheData;
            }
            this.setState({
                PartnerCache: PartnerList
            });
            //console.log("SysUserList", SysUserList);
        });
    }

    getCacheShipmentStatus() {
        let ShipmentStatusList = [];
        this.props.callGetCache("ERPCOMMONCACHE.SHIPMENTORDERSTATUS").then((apiResult) => {
            if (!apiResult.IsError && apiResult.ResultObject.CacheData != null) {
                ShipmentStatusList = apiResult.ResultObject.CacheData;
            }
            this.setState({
                ShipmentStatusCache: ShipmentStatusList
            });
            //console.log("SysUserList", SysUserList);
        });
    }

    callLoadData() {
        const id = this.props.match.params.id;
        this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then((apiResult) => {

            if (apiResult) {
                if (apiResult.IsError) {
                    this.setState({ IsCallAPIError: apiResult.IsError });
                    this.showMessage(apiResult.Message);
                    return;
                }
                

                let selectedOptionPartner = [];
                let listPartner = [];
                if (apiResult.ResultObject.ListPartner) {
                    listPartner = apiResult.ResultObject.ListPartner;
                    apiResult.ResultObject.ListPartner.map(row => {
                        selectedOptionPartner.push({ value: row.PartnerID, label: row.PartnerName });
                    })
                }

                let listStatus = [];
                let selectedOptionStatus = [];
                if (apiResult.ResultObject.ListStatus) {
                    listStatus = apiResult.ResultObject.ListStatus;
                    apiResult.ResultObject.ListStatus.map(row => {
                        selectedOptionStatus.push({ value: row.ShipmentOrderStatusID, label: row.ShipmentOrderStatusName });
                    })
                }

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
                        },
                        SelectedPartnerList: selectedOptionPartner,
                        SelectedShipmentStatusList: selectedOptionStatus,
                        PartnerList: listPartner,
                        ShipmentStatusList: listStatus
                    });
                }
                else {
                    this.setState({
                        FormData: {
                            ShipmentOrderType: apiResult.ResultObject,
                            ShipmentOrderTypeWorkflow: [],
                            ShipmentOrderType_FixShipmentFee: [],
                        },
                        SelectedPartnerList: selectedOptionPartner,
                        SelectedShipmentStatusList: selectedOptionStatus,
                        PartnerList: listPartner,
                        ShipmentStatusList: listStatus
                    });
                }

                this.setState({ IsLoading: false });
                
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
        //onCloseModal={this.handleCloseMessage}
        />);
    }

    showMessage1(message) {
        ModalManager.open(<MessageModal title="Thông báo"
            message={message} onRequestClose={() => true}
            onCloseModal={this.handleCloseMessage}
        />);
    }

    changeSelecPartner(name, listSelect) {
        debugger;
        let PartnerList = [];
        listSelect.map(partner => {
            const partnerMatch = this.state.PartnerCache.filter(x => { return x.PartnerID == partner });
            PartnerList.push(partnerMatch[0]);
        })
        this.setState({ PartnerList });
    }

    changeSelectShipmentStatus(name, listSelect) {
        let ShipmentStatusList = [];
        listSelect.map(shipmentStatus => {
            const shipmentStatusMatch = this.state.ShipmentStatusCache.filter(x => { return x.ShipmentOrderStatusID == shipmentStatus });
            ShipmentStatusList.push(shipmentStatusMatch[0]);
        })
        this.setState({ ShipmentStatusList });
    }


    // comboPartner(data) {
    //     const convertdata = data.map(function (objData) {
    //         return { value: objData.PartnerID, name: objData.PartnerName, label: objData.PartnerName }
    //     });
    //     convertdata.unshift({ value: -1, name: "---Vui lòng chọn---", label: "---Vui lòng chọn---" });
    //     return convertdata;

    // }

    // comboStatus(data) {
    //     const convertdata = data.map(function (objData) {
    //         return { value: objData.ShipmentOrderStatusID, name: objData.StatusName, label: objData.ShipmentOrderStatusName }
    //     });
    //     convertdata.unshift({ value: -1, name: "---Vui lòng chọn---", label: "---Vui lòng chọn---" });
    //     return convertdata;

    // }

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
                //RequirePermission={PIEREQUESTTYPE_UPDATE}
                onInputChangeList={this.handleInputChangeList}
                onSubmit={(formData, MLObject) => this.handleSubmit(formData, MLObject)}
                BackLink={BackLink}>
                <TabContainer
                    defaultActiveTabIndex={0} IsAutoLayout={true} controltype="TabContainer" IsAutoLoadDataGrid={true}>
                    <TabPage title="Loại yêu cầu vận chuyển" name="ShipmentOrderType" MLObjectDefinition={MLObjectDefinition} datasource={this.state.FormData.ShipmentOrderType}>
                        <FormControl.TextBox readonly={true} name="ShipmentOrderTypeID" label="Mã loại yêu cầu vận chuyển:"
                            controltype="InputControl" datasourcemember="ShipmentOrderTypeID"
                            labelcolspan={4} colspan={8} rowspan={8}
                            maxSize={10}
                        />
                        <FormControl.TextBox name="ShipmentOrderTypeName" label="Tên loại yêu cầu vận chuyển:"
                            controltype="InputControl" datasourcemember="ShipmentOrderTypeName"
                            labelcolspan={4} colspan={8} rowspan={8}
                            maxSize={200} isRequired={true}
                        />
                        {/* <FormControl.ComboBox name="PieTypeID" type="select" isautoloaditemfromcache={true}
                            loaditemcachekeyid="PIMCACHE.PIETYPE" valuemember="PieTypeID" nameMember="PieTypeName"
                            label="Loại chỉnh sửa:" controltype="InputControl" listoption={[]} datasourcemember="PieTypeID"
                            labelcolspan={3} colspan={9} rowspan={8}
                        /> */}
                        <FormControl.TextBox name="AddFunctionID" label="Quyền thêm yêu cầu này"
                            datasourcemember="AddFunctionID" controltype="InputControl"
                            labelcolspan={4} colspan={8} rowspan={8}
                            maxSize={400}
                        />

                        <FormControl.CheckBox label="Cho phép chọn đối tác gửi" name="IsSelectSenderPartner"
                            datasourcemember="IsSelectSenderPartner" controltype="InputControl"
                            labelcolspan={4} colspan={8} rowspan={8}
                        />

                        <FormControl.CheckBox label="Cho phép chọn kho gửi" name="IsSelectSenderStore"
                            datasourcemember="IsSelectSenderStore" controltype="InputControl"
                            labelcolspan={4} colspan={8} rowspan={8}
                        />

                        <FormControl.CheckBox label="Cho phép chọn đối tác nhận" name="IsSelectReceiverPartner"
                            datasourcemember="IsSelectReceiverPartner" controltype="InputControl"
                            labelcolspan={4} colspan={8} rowspan={8}
                        />

                        <FormControl.CheckBox label="Cho phép chọn kho nhận" name="IsSelectReceiverStore"
                            datasourcemember="IsSelectReceiverStore" controltype="InputControl"
                            labelcolspan={4} colspan={8} rowspan={8}
                        />

                        {/* ------------------------------------------------------------------ */}

                        <FormControl.MultiSelectComboBox name="PartnerID" label="Danh sách đối tác"
                            labelcolspan={4} colspan={8} rowspan={8}
                            IsLabelDiv={true} controltype="InputControl"
                            isautoloaditemfromcache={true} loaditemcachekeyid="ERPCOMMONCACHE.PARTNER" valuemember="PartnerID" nameMember="PartnerName"
                            listoption={[]} datasourcemember="PartnerID"
                            SelectedOption={this.state.SelectedPartnerList ? this.state.SelectedPartnerList : []}
                            onValueChangeCus={this.changeSelecPartner}
                        />

                        <FormControl.MultiSelectComboBox name="ShipmentOrderStatusID" label="Trạng thái vận chuyển"
                            labelcolspan={4} colspan={8} rowspan={8}
                            IsLabelDiv={true} controltype="InputControl"
                            isautoloaditemfromcache={true} loaditemcachekeyid="ERPCOMMONCACHE.SHIPMENTORDERSTATUS" valuemember="ShipmentOrderStatusID" nameMember="ShipmentOrderStatusName"
                            listoption={[]} datasourcemember="ShipmentOrderStatusID"
                            SelectedOption={this.state.SelectedShipmentStatusList ? this.state.SelectedShipmentStatusList : []}
                            onValueChangeCus={this.changeSelectShipmentStatus}
                        />

                        {/* <FormControl.ComboBox name="PartnerID" type="select" isautoloaditemfromcache={false}
                            loaditemcachekeyid="" valuemember="PartnerID" nameMember="PartnerName" value={this.state.FormData.ShipmentOrderType.PartnerID}
                            label="Mã đối tác" controltype="InputControl" listoption={this.state.FormData.ListPartner} datasourcemember="PartnerID"
                            labelcolspan={4} colspan={8} rowspan={8}
                        /> */}

                        {/* <FormControl.ComboBox name="StatusID" type="select" isautoloaditemfromcache={false}
                            loaditemcachekeyid="" valuemember="StatusID" nameMember="StatusName" value={this.state.FormData.ShipmentOrderType.StatusID}
                            label="Trạng thái vận chuyển" controltype="InputControl" listoption={this.state.FormData.ListStatus} datasourcemember="StatusID"
                            labelcolspan={4} colspan={8} rowspan={8}
                        /> */}
                        {/* ------------------------------------------------------------------ */}

                        <FormControl.TextArea name="Description" label="Mô tả"
                            datasourcemember="Description" controltype="InputControl"
                            labelcolspan={4} colspan={8} rowspan={8} rows={6}
                            maxSize={2000}
                        />
                        <FormControl.Numeric name="OrderIndex" label="Thứ tự hiển thị"
                            datasourcemember="OrderIndex" controltype="InputControl"
                            labelcolspan={4} colspan={8} rowspan={8}
                            value={this.state.FormData ? this.state.FormData.ShipmentOrderType.OrderIndex : 0}
                            maxSize={10}
                        />
                        <FormControl.CheckBox label="Kích hoạt" name="IsActived"
                            datasourcemember="IsActived" controltype="InputControl"
                            labelcolspan={4} colspan={8} rowspan={8}
                        />
                        <FormControl.CheckBox label="Hệ thống" name="IsSystem"
                            datasourcemember="IsSystem" controltype="InputControl"
                            labelcolspan={4} colspan={8} rowspan={8}
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
                    <TabPage title="Chi phí vận chuyển cố định" name="ShipmentOrderType_FixShipmentFee">
                        {/* <InputGrid name="ShipmentOrderType_FixShipmentFee" controltype="GridControl"
                            IDSelectColumnName="chkSelectShipmentFeeTypeID"
                            PKColumnName="ShipmentFeeTypeID"
                            isUseValueInputControl={true}
                            listColumn={FixShipmentFeeColumnList}
                            colspan="12"
                            MLObjectDefinition={MLObjectShipmentOrderType_FixShipmentFee}
                            dataSource={this.state.FormData.ShipmentOrderType_FixShipmentFee}
                            onInsertClick={this.addShipmentOrderType_FixShipmentFeePopup}
                            onInsertClickEdit={this.editShipmentOrderTypeWorkflowPopup}
                            onDeleteClick_Customize={this.removeShipmentOrderTypeWorkflow}
                        /> */}
                        <DataGrid listColumn={FixShipmentFeeColumnList}
                            dataSource={this.state.gridDataSource}
                            modalElementList={ModalFixShipmentFeeColumnList}
                            MLObjectDefinition={MLObjectShipmentOrderType_FixShipmentFee}
                            IDSelectColumnName={"chkSelect"}
                            PKColumnName={"ShipmentFeeTypeID"}
                            onDeleteClick={this.handleDelete}
                            onInsertClick={this.handleInputGridInsert}
                            IsAutoPaging={true}
                            RowsPerPage={10}
                            IsCustomAddLink={true}
                        // RequirePermission={PIEREQUESTTYPE_VIEW}
                        // DeletePermission={PIEREQUESTTYPE_DELETE}
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