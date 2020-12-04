import React from "react";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import TabContainer from "../../../../../common/components/Tabs/TabContainer";
import TabPage from "../../../../../common/components/Tabs/TabPage";
import FormContainer from '../../../../../common/components/Form/AdvanceForm/FormContainer';
import FormControl from '../../../../../common/components/Form/AdvanceForm/FormControl';
import InputGrid from '../../../../../common/components/Form/AdvanceForm/FormControl/InputGrid';
import {
    MLObjectDefinition, GridMLObjectModelPermission, GridMLObjectModelNext
    , MTabList, MLAppFeedBackType_WF_Permis, InputNextColumnList
} from "./constants"
import { showModal, hideModal } from '../../../../../actions/modal';
import { APIHostName, AddAPIPath, UpdateAPIPath } from './constants';
import { ModalManager } from 'react-dynamic-modal/lib';
import { MessageModal } from "../../../../../common/components/Modal";
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";
import { ERPCOMMONCACHE_FUNCTION, ERPCOMMONCACHE_USERGROUP, ERPCOMMONCACHE_SHIPMENTORDERSTATUS, ERPCOMMONCACHE_AppFeedBackStep, ERPCOMMONCACHE_SHIPMENTSETUPTYPE } from "../../../../../constants/keyCache";
import { intervalToDuration } from "date-fns";


class AppFeedBackTypeWorkFlowCom extends React.Component {
    constructor(props) {
        super(props);
        this.addAppFeedBackTypeWorkFlowPermis = this.addAppFeedBackTypeWorkFlowPermis.bind(this);
        this.removeAppFeedBackTypeWorkFlowPermis = this.removeAppFeedBackTypeWorkFlowPermis.bind(this);
        this.addAppFeedBackTypeWorkFlowNext = this.addAppFeedBackTypeWorkFlowNext.bind(this);
        this.removeAppFeedBackTypeWorkFlowNext = this.removeAppFeedBackTypeWorkFlowNext.bind(this);
        this.handleInputChangeList = this.handleInputChangeList.bind(this);
        this.valueChangeInputGridPermisData = this.valueChangeInputGridPermisData.bind(this);
        this.valueChangeInputGridNextData = this.valueChangeInputGridNextData.bind(this);
        this.changeSelectUser = this.changeSelectUser.bind(this);
        this.createInputPermissColumnList = this.createInputPermissColumnList.bind(this);
        this.getFunctionCache = this.getFunctionCache.bind(this);
        this.handleClosePopup = this.handleClosePopup.bind(this);
        this.state = {
            FormData: {
                AppFeedBackTypeWorkFlow: [],
                AppFeedBackType_WF_Permis: [],
                AppFeedBackType_WF_Next: [],
                NextAppFeedBackStep: "",
                ChooseFunctionID: ""
            },
            AppFeedBackType_WF_PermisData: [],
            AppFeedBackType_WF_NextData: [],
            AppFeedBackType_WF_Permis: [],
            SelectedOption: [],
            NextAppFeedBackStepListOption: [],
            ChooseFunctionCache: []
        };
        if (this.props.dataSource) {
            let dataSource = this.props.dataSource;
            if (dataSource.MaxProcessTime) {
                let day = parseInt(dataSource.MaxProcessTime / 60 / 24);
                if (day > 0)
                    dataSource.MaxProcessTimeDay = day;
                let hour = parseInt((dataSource.MaxProcessTime / 60) % 24);
                if (hour > 0)
                    dataSource.MaxProcessTimeHour = hour;
                let minute = dataSource.MaxProcessTime - (day * 24 * 60 + hour * 60);
                if (minute > 0)
                    dataSource.MaxProcessTimeMinute = parseInt(minute);
            }
            let SelectedOption = [];
            if (dataSource.AppFeedBackType_WF_Permis) {
                dataSource.AppFeedBackType_WF_Permis.map(row => {
                    SelectedOption.push({ value: row.UserGroupID, label: row.UserGroupName });
                })
            }
            let NextAppFeedBackStepListOption = [{ value: -1, label: "--Vui lòng chọn--" }];
            if (this.props.AppFeedBackTypeWorkFlow) {
                this.props.AppFeedBackTypeWorkFlow.map(row => {
                    NextAppFeedBackStepListOption.push({ value: row.AppFeedBackStepID, label: row.AppFeedBackStepName });
                })
            }
            this.state = {
                FormData: {
                    AppFeedBackTypeWorkFlow: dataSource,
                    AppFeedBackType_WF_Permis: dataSource.AppFeedBackType_WF_Permis ? dataSource.AppFeedBackType_WF_Permis : [],
                    AppFeedBackType_WF_Next: dataSource.AppFeedBackType_WF_Next ? dataSource.AppFeedBackType_WF_Next : [],
                    NextAppFeedBackStep: "",
                    ChooseFunctionID: ""
                },
                AppFeedBackType_WF_PermisData: dataSource.AppFeedBackType_WF_Permis ? dataSource.AppFeedBackType_WF_Permis : [],
                AppFeedBackType_WF_NextData: dataSource.AppFeedBackType_WF_Next ? dataSource.AppFeedBackType_WF_Next : [],
                InputPermissColumnList: [],
                SelectedOption: SelectedOption,
                NextAppFeedBackStepListOption: NextAppFeedBackStepListOption
            }
        }
    }

    componentDidMount() {
        this.createInputPermissColumnList();
        this.getFunctionCache();
        //this.initShipmentSetupType();

    }

    // initShipmentSetupType(){
    //     debugger;
    //     //this.setState({ MLObjectDefinition: MLObjectDefinition });
    //     let _MLObjectDefinition = MLObjectDefinition;
    //     let validationListIsSetupStep = [];
    //     if (!this.state.FormData.AppFeedBackTypeWorkFlow.IsSetupStep) {
    //         this.state.FormData.AppFeedBackTypeWorkFlow.ShipmentSetupTypeID = "-1";
    //     } else {
    //         validationListIsSetupStep = ["Comborequired"];
    //     }

    //     _MLObjectDefinition.forEach(function (item, index) {
    //         if (item.Name == "ShipmentSetupTypeID") {
    //             item.ValidationList = validationListIsSetupStep;
    //         }
    //     });

    //     this.setState({MLObjectDefinition: _MLObjectDefinition});
    // }

    getFunctionCache() {
        this.props.callGetCache(ERPCOMMONCACHE_FUNCTION).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                //console.log("FormElement listOption: ", listOption)
                let wf_Next = [];
                let match = [];

                if (this.props.dataSource && this.props.dataSource.AppFeedBackType_WF_Next) {
                    wf_Next = this.props.dataSource.AppFeedBackType_WF_Next.map(function (item, index) {
                        match = [];
                        match = result.ResultObject.CacheData.filter(x => x.FunctionID == item.ChooseFunctionID);
                        if (match && match.length > 0) {
                            item.ChooseFunctionName = match[0].FunctionName;
                            return item;
                        }
                    });
                }
                this.setState({
                    ChooseFunctionCache: result.ResultObject.CacheData,
                    AppFeedBackType_WF_Next: wf_Next
                });
            }
        });
    }

    addAppFeedBackTypeWorkFlowPermis() {
        const InputPermissColumnList = this.state.InputPermissColumnList;
        const UserNameList = this.state.UserNameList;
        let AppFeedBackType_WF_PermisData = this.state.AppFeedBackType_WF_PermisData;
        let objPermisData = {};
        UserNameList.map((userItem, userIndex) => {
            objPermisData = {};
            if (this.state.AppFeedBackType_WF_PermisData.filter(x => x.UserGroupID == userItem.UserGroupID).length <= 0) {
                InputPermissColumnList.map(item => {
                    if (item.Name == "UserGroupID" || item.Name == "UserGroupName") {
                        objPermisData[item.Name] = userItem[item.Name];
                    }
                    else if (item.Name == "chkSelectUserGroupID") {
                        objPermisData[item.Name] = false;
                    }
                    else {
                        objPermisData[item.Name] = true;
                    }
                })
                AppFeedBackType_WF_PermisData = Object.assign([], AppFeedBackType_WF_PermisData, { [AppFeedBackType_WF_PermisData.length]: objPermisData });
            }
        });
        this.setState({ AppFeedBackType_WF_PermisData });
        //console.log("AppFeedBackType_WF_PermisData",AppFeedBackType_WF_PermisData);
    }

    removeAppFeedBackTypeWorkFlowPermis(listSelect, dataSource, listDataSourceMember) {
        let list = listSelect.map((item, index, listSelect) => { return item[0].value })
        const AppFeedBackType_WF_PermisData = this.state.AppFeedBackType_WF_PermisData.filter(f => !list.includes(f[listDataSourceMember[0].key]));
        this.setState({ AppFeedBackType_WF_PermisData });
    }

    valueChangeInputGridPermisData(elementdata, index) {
        const rowGridData = Object.assign({}, this.state.AppFeedBackType_WF_PermisData[index], { [elementdata.Name]: elementdata.IsChecked }, { HasChanged: true });
        const AppFeedBackType_WF_PermisData = Object.assign([], this.state.AppFeedBackType_WF_PermisData, { [index]: rowGridData });
        this.setState({ AppFeedBackType_WF_PermisData });
    }

    addAppFeedBackTypeWorkFlowNext() {
        //console.log("this.state.FormData.NextAppFeedBackStep", this.state.FormData.NextAppFeedBackStep);
        if (this.state.FormData.NextAppFeedBackStep != "" && this.state.FormData.NextAppFeedBackStep != "-1") {
            const NextAppFeedBackStep = this.state.FormData.NextAppFeedBackStep;
            //const ChooseFunctionID = this.state.FormData.ChooseFunctionID ? this.state.FormData.ChooseFunctionID : "";
            const ChooseFunctionID = this.state.FormData.ChooseFunctionID && Array.isArray(this.state.FormData.ChooseFunctionID) ? this.state.FormData.ChooseFunctionID[0] : "";
            const ChooseFunctionName = ChooseFunctionID != "" ? (this.state.ChooseFunctionCache.filter(x => x.FunctionID == ChooseFunctionID))[0].FunctionName : "";
            const AppFeedBackStepID = this.state.FormData.AppFeedBackTypeWorkFlow.AppFeedBackStepID;
            let elementItem = this.state.FormData.AppFeedBackType_WF_Next.filter(x => { return x.NextAppFeedBackStep == NextAppFeedBackStep });
            if (elementItem.length == 0) {
                const NextAppFeedBackStepListOption = this.state.NextAppFeedBackStepListOption.filter(x => { return x.value == NextAppFeedBackStep });
                if (NextAppFeedBackStepListOption && NextAppFeedBackStepListOption.length > 0) {
                    const NextAppFeedBackStepName = NextAppFeedBackStepListOption[0].label;
                    let AppFeedBackType_WF_Next = this.state.FormData.AppFeedBackType_WF_Next;
                    AppFeedBackType_WF_Next.push({ AppFeedBackStepID: AppFeedBackStepID, NextAppFeedBackStep: NextAppFeedBackStep, NextAppFeedBackStepName: NextAppFeedBackStepName, ChooseFunctionID: ChooseFunctionID, ChooseFunctionName: ChooseFunctionName })
                    const FormData = Object.assign({}, this.state.FormData, { AppFeedBackType_WF_Next });
                    this.setState({ FormData });
                }
            }
            else {
                this.showMessage("Dữ liệu đã tồn tại");
                // if (this.state.FormData.AppFeedBackType_WF_Next.filter(x => { return x.NextAppFeedBackStep == NextAppFeedBackStep && x.ChooseFunctionID == ChooseFunctionID }).length == 0) {
                //     const item = Object.assign({}, elementItem[0], { ChooseFunctionID });
                //     const index = this.state.FormData.AppFeedBackType_WF_Next.findIndex(item => item.NextAppFeedBackStep == NextAppFeedBackStep);
                //     const AppFeedBackType_WF_Next = Object.assign([], this.state.FormData.AppFeedBackType_WF_Next, { [index]: item });
                //     const FormData = Object.assign({}, this.state.FormData, { AppFeedBackType_WF_Next });
                //     this.setState({ FormData });
                // }
            }
        }
    }

    removeAppFeedBackTypeWorkFlowNext(listSelect, dataSource, listDataSourceMember) {
        // const filteredArray = dataSource.filter(x => listSelect.indexOf(x[pkColumnName].ToString()) < 0);
        // const AppFeedBackType_WF_Next = this.state.FormData.AppFeedBackType_WF_Next.filter(f => !listSelect.includes(f[listDataSourceMember[0].key]));
        let list = listSelect.map((item, index, listSelect) => { return item[0].value })
        const AppFeedBackType_WF_Next = this.state.FormData.AppFeedBackType_WF_Next.filter(f => !list.includes(f[listDataSourceMember[0].key]));
        const FormData = Object.assign({}, this.state.FormData, { AppFeedBackType_WF_Next });
        this.setState({ FormData });
        //console.log("formData", this.state.FormData);
    }

    valueChangeInputGridNextData(elementdata, index) {
        //console.log("valueChangeInputGridNextData",elementdata, index)
        const rowGridData = Object.assign({}, this.state.FormData.AppFeedBackType_WF_Next[index], { [elementdata.Name]: elementdata.IsChecked }, { HasChanged: true });
        const AppFeedBackType_WF_Next = Object.assign([], this.state.FormData.AppFeedBackType_WF_Next, { [index]: rowGridData });
        const FormData = Object.assign({}, this.state.FormData, { AppFeedBackType_WF_Next });
        this.setState({ FormData });
    }

    handleInputChangeList(formData, tabNameList, tabMLObjectDefinitionList) {
        // console.log("handleInputChangeList_wf_formData", formData);
        // console.log("MLObjectDefinition", this.state.MLObjectDefinition);
        // console.log("AppFeedBackTypeWorkFlow", this.props.AppFeedBackTypeWorkFlow);
        // console.log("datasource", this.props.dataSource);

        //load mã bước tự động chuyển
        let listAutoChangeToAppFeedBackStepID = [];
        let autoChangeToAppFeedBackStepID = formData.AppFeedBackTypeWorkFlow.AutoChangeToAppFeedBackStepID;
        if (parseInt(formData.AppFeedBackTypeWorkFlow.AutoChangeStepType) > 0) {
            if (this.props.AppFeedBackTypeWorkFlow && this.props.AppFeedBackTypeWorkFlow.length > 0) {
                if (!autoChangeToAppFeedBackStepID) {
                    autoChangeToAppFeedBackStepID = this.props.AppFeedBackTypeWorkFlow[0].AppFeedBackStepID;
                    formData.AppFeedBackTypeWorkFlow.AutoChangeToAppFeedBackStepID = this.props.AppFeedBackTypeWorkFlow[0].AppFeedBackStepID;
                }
                listAutoChangeToAppFeedBackStepID = this.props.AppFeedBackTypeWorkFlow.map(function (item, index) {
                    return {
                        value: item.AppFeedBackStepID,
                        label: item.AppFeedBackStepName
                    };
                });
            }
        } else {
            formData.AppFeedBackTypeWorkFlow.AutoChangeToAppFeedBackStepID = "";
        }

        this.setState({
            ListAutoChangeToAppFeedBackStepID: listAutoChangeToAppFeedBackStepID,
            AutoChangeToAppFeedBackStepID: autoChangeToAppFeedBackStepID

        });

        //loại lắp đặt
        if (!formData.AppFeedBackTypeWorkFlow.IsSetupStep) {
            formData.AppFeedBackTypeWorkFlow.ShipmentSetupTypeID = "-1";
        }

        // if(this.state.MLObjectDefinition){
        //     this.state.MLObjectDefinition.forEach(function (item, index) {
        //         if (item.Name == "ShipmentSetupTypeID") {
        //             item.ValidationList = validationListIsSetupStep;
        //         }
        //     });
        // }


        let keys = [];
        //formData.AppFeedBackType_WF_Next = this.state.FormData.AppFeedBackType_WF_Next;
        //formData.AppFeedBackType_WF_Permis = this.state.AppFeedBackType_WF_PermisData;
        if (this.state.FormData.AppFeedBackTypeWorkFlow) keys = Object.keys(this.state.FormData.AppFeedBackTypeWorkFlow);
        if (formData.AppFeedBackTypeWorkFlow) {
            Object.keys(formData.AppFeedBackTypeWorkFlow).map((key) => {
                if (!keys.find(x => x == key)) {
                    keys.push(key);
                }
            })
        }
        if (keys) {
            let formDataTemp = {};
            const oldAppFeedBackTypeWorkFlow = this.state.FormData.AppFeedBackTypeWorkFlow;
            keys.forEach(function (key) {
                formDataTemp = Object.assign({}, formDataTemp, { [key]: formData.AppFeedBackTypeWorkFlow[key] != undefined ? formData.AppFeedBackTypeWorkFlow[key] : oldAppFeedBackTypeWorkFlow[key] });
            });
            const newFormData = Object.assign({}, formData, { AppFeedBackTypeWorkFlow: formDataTemp })
            this.setState({ FormData: newFormData });
        }
        else {
            this.setState({ FormData: formData });
        }
    }

    handleSubmit(formData, MLObject) {

        //loại lắp đặt
        let validationListIsSetupStep = [];
        if (this.state.FormData.AppFeedBackTypeWorkFlow.IsSetupStep && parseInt(this.state.FormData.AppFeedBackTypeWorkFlow.ShipmentSetupTypeID) == -1) {
            this.showMessage("Vui lòng chọn loại lắp đặt trước khi cập nhật.");
            return;
        }

        let newAppFeedBackType_WF_PermisData = this.state.AppFeedBackType_WF_PermisData;
        let newAppFeedBackType_WF_NextData = this.state.FormData.AppFeedBackType_WF_Next;
        const newFormData = Object.assign({}, this.state.FormData.AppFeedBackTypeWorkFlow, {
            AppFeedBackType_WF_Permis: newAppFeedBackType_WF_PermisData,
            AppFeedBackType_WF_Next: newAppFeedBackType_WF_NextData
        });
        newFormData.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID
        newFormData.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
        newFormData.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        //Tính tổng số phút
        newFormData.MaxProcessTime = 0;
        newFormData.DisplayProcessTime = '';
        if (newFormData.MaxProcessTimeDay > 0) {
            newFormData.MaxProcessTime += parseInt(newFormData.MaxProcessTimeDay * 24 * 60);
            newFormData.DisplayProcessTime += newFormData.MaxProcessTimeDay + ' Ngày ';
        }
        if (newFormData.MaxProcessTimeHour > 0) {
            newFormData.MaxProcessTime += parseInt(newFormData.MaxProcessTimeHour * 60);
            newFormData.DisplayProcessTime += newFormData.MaxProcessTimeHour + ' Giờ ';
        }
        if (newFormData.MaxProcessTimeMinute) {
            newFormData.MaxProcessTime += parseInt(newFormData.MaxProcessTimeMinute);
            newFormData.DisplayProcessTime += newFormData.MaxProcessTimeMinute + ' Phút ';
        }
        if (newFormData.AppFeedBackType_WF_Permis) {
            let AppFeedBackType_WF_PermisData = [];
            newFormData.AppFeedBackType_WF_Permis.map((row, index) => {
                const UserGroupID = row.UserGroupID;
                Object.keys(row).forEach(key => {
                    if (Number.isInteger(parseInt(key)) && row[key] == true) {
                        AppFeedBackType_WF_PermisData.push({
                            AppFeedBackStepID: newFormData.AppFeedBackStepID,
                            UserGroupID: UserGroupID,
                            ShipmentOrderPermissionID: key
                        })
                    }
                });
            })
            newFormData.AppFeedBackType_WF_Permis = AppFeedBackType_WF_PermisData;
        }
        if (!this.props.IsUpdateData)
            newFormData.AppFeedBackTypeID = this.props.AppFeedBackTypeID;
        if ((parseInt(this.props.TotalStepCompletePercent) + parseInt(newFormData.StepCompletePercent)) > 100) {
            if (this.props.IsUpdateData) {
                this.showMessage("Tổng phần trăm hoàn thành của toàn bộ quy trình vượt quá 100%");
            }
            else {
                this.showMessage("Tổng phần trăm hoàn thành của toàn bộ quy trình hiện tại đã là 100%");
            }
        }
        else {
            this.props.callFetchAPI(APIHostName, this.props.IsUpdateData ? UpdateAPIPath : AddAPIPath, newFormData).then((apiResult) => {
                this.setState({ IsCallAPIError: apiResult.IsError });
                this.showMessage(apiResult.Message);

                if (!apiResult.IsError) {
                    if (this.props.onAddAppFeedBackTypeWorkFlowComplete) {
                        this.props.onAddAppFeedBackTypeWorkFlowComplete(newFormData);
                    }
                    this.props.hideModal();
                }
            });
            //console.log("newFormData", newFormData);

        }
    }

    changeSelectUser(name, listSelect) {
        let UserNameList = [];
        listSelect.map(user => {
            const usermatch = this.props.SysUserCache.filter(x => { return x.UserGroupID == user });
            UserNameList.push(usermatch[0]);
        })
        this.setState({ UserNameList });
    }

    createInputPermissColumnList() {
        const PiePermissionCache = this.props.PiePermissionCache;
        let InputPermissColumnList = [
            {
                Name: "chkSelectUserGroupID",
                Type: "checkbox",
                Caption: "",
                DataSourceMember: "UserGroupID",
                Width: 100
            },
            {
                Name: "UserGroupID",
                Type: "text",
                Caption: "Mã nhóm người dùng",
                DataSourceMember: "UserGroupID",
                Width: 150
            },
            {
                Name: "UserGroupName",
                Type: "text",
                Caption: "Tên nhóm người dùng",
                DataSourceMember: "UserGroupName",
                Width: 200
            },
        ];
        if (PiePermissionCache) {
            PiePermissionCache.map((item, index) => {
                InputPermissColumnList.push({
                    Name: item.ShipmentOrderPermissionID,
                    Type: "checkbox",
                    Caption: item.ShipmentOrderPermissionName,
                    DataSourceMember: item.ShipmentOrderPermissionID,
                    Width: 150
                })
            });
        }
        this.setState({ InputPermissColumnList });
    }

    showMessage(message) {
        ModalManager.open(<MessageModal title="Thông báo"
            message={message} onRequestClose={() => true}
            onCloseModal={this.handleCloseMessage}
        />);
    }

    handleCloseMessage() {
        // if (!this.state.IsCallAPIError)
        //     this.setState({ IsCloseForm: true });
    }

    handleClosePopup() {
        this.props.hideModal();
    }
    render() {
        return (
            <div className="row" style={{ textAlign: 'left' }}>
                <FormContainer
                    MLObjectDefinition={MTabList}
                    IsAutoLayout={true}
                    listelement={[]}
                    onInputChangeList={this.handleInputChangeList}
                    onSubmit={(formData, MLObject) => this.handleSubmit(formData, MLObject)}
                    ClosePopup={this.handleClosePopup}
                >
                    <TabContainer
                        defaultActiveTabIndex={0} IsAutoLayout={true} controltype="TabContainer">
                        <TabPage MLObjectDefinition={MLObjectDefinition} datasource={this.state.FormData.AppFeedBackTypeWorkFlow}
                            title="Thông tin chung" name="AppFeedBackTypeWorkFlow" >
                            <div className="form-row">
                                <div className="col-sm-8">
                                    {/* <FormControl.TextBox labelcolspan={4} colspan={8} placeholder="ID tự tăng"
                                        name="ShipmentOrder" label="Mã bước xử lý"
                                        controltype="InputControl" datasourcemember="AppFeedBackStepID"
                                    /> */}
                                    <FormControl.ComboBox
                                        name="AppFeedBackStepID"
                                        type="select"
                                        isautoloaditemfromcache={true}
                                        loaditemcachekeyid={ERPCOMMONCACHE_AppFeedBackStep}
                                        valuemember="AppFeedBackStepID"
                                        nameMember="AppFeedBackStepName"
                                        label="Tên bước xử lý"
                                        controltype="InputControl"
                                        datasourcemember="AppFeedBackStepID"
                                        listoption={[]}
                                        isRequired={true}
                                        disabled={this.props.IsUpdateData}
                                        labelcolspan={4} colspan={8}
                                    />

                                    <FormControl.ComboBox
                                        name="AutoChangeToShipmentOrderStatusID"
                                        type="select" isautoloaditemfromcache={true}
                                        loaditemcachekeyid={ERPCOMMONCACHE_SHIPMENTORDERSTATUS}
                                        valuemember="ShipmentOrderStatusID"
                                        nameMember="ShipmentOrderStatusName"
                                        label="Tự động chuyển sang trạng thái yêu cầu vận chuyển"
                                        controltype="InputControl"
                                        datasourcemember="AutoChangeToShipmentOrderStatusID"
                                        listoption={[]} isRequired={true}
                                        labelcolspan={4} colspan={8}
                                    />

                                    <FormControl.ComboBox
                                        name="AutoChangeStepType" type="select" isautoloaditemfromcache={false} isRequired={false}
                                        label="Loại tự động chuyển bước" controltype="InputControl" datasourcemember="AutoChangeStepType"
                                        listoption={[{ value: "0", label: "Không tự động" },
                                        { value: "1", label: "Tự động chuyển bước khi không có thu tiền" }, { value: "2", label: "Tự động chuyển bước không điều kiện" }]}
                                        labelcolspan={4} colspan={8}
                                    />

                                    <FormControl.ComboBox
                                        name="AutoChangeToAppFeedBackStepID" type="select" isautoloaditemfromcache={false}
                                        isRequired={false}
                                        value={this.state.AutoChangeToAppFeedBackStepID}
                                        label="Mã bước tự động chuyển" controltype="InputControl" datasourcemember="AutoChangeToAppFeedBackStepID"
                                        listoption={this.state.ListAutoChangeToAppFeedBackStepID ? this.state.ListAutoChangeToAppFeedBackStepID : []} labelcolspan={4} colspan={8}
                                    />

                                    <FormControl.TextBox labelcolspan={4} colspan={8} readonly={false} name="StepColorCode" label="Màu sắc của bước"
                                        controltype="InputControl" datasourcemember="StepColorCode" maxSize={20} required={false}
                                    />

                                    <FormControl.Numeric name="StepCompletePercent" label="Phần trăm hoàn thành của bước" controltype="InputControl"
                                        datasourcemember="StepCompletePercent" readonly={false}
                                        labelcolspan={4} colspan={8} maxValue={100}
                                    />

                                    <FormControl.Numeric name="MaxProcessTimeDay" label="Thời gian XL tối đa(Ngày)" controltype="InputControl"
                                        datasourcemember="MaxProcessTimeDay" readonly={false}
                                        labelcolspan={4} colspan={8} maxValue={30}
                                    />

                                    <FormControl.Numeric name="MaxProcessTimeHour" label="Thời gian XL tối đa(Giờ)" controltype="InputControl"
                                        datasourcemember="MaxProcessTimeHour" readonly={false}
                                        labelcolspan={4} colspan={8} maxValue={24}
                                    />
                                    <FormControl.Numeric name="MaxProcessTimeMinute" label="Thời gian XL tối đa(phút)" controltype="InputControl"
                                        datasourcemember="MaxProcessTimeMinute" readonly={false}
                                        labelcolspan={4} colspan={8} maxValue={60}
                                    />
                                    <FormControl.TextArea labelcolspan={4} colspan={8} name="SMSTemplate" label="Mẫu SMS"
                                        datasourcemember="SMSTemplate" controltype="InputControl"
                                        rows={6} maxSize={500}
                                    />
                                    <FormControl.TextBox labelcolspan={4} colspan={8} name="EmailTitle" label="Tiêu đề Email"
                                        datasourcemember="EmailTitle" controltype="InputControl"
                                        maxSize={200}
                                    />
                                    <FormControl.TextArea labelcolspan={4} colspan={8} name="EmailTemplate" label="Mẫu Email"
                                        datasourcemember="EmailTemplate" controltype="InputControl"
                                        rows={6}
                                    />
                                    <FormControl.TextArea labelcolspan={4} colspan={8} name="Description" label="Mô tả"
                                        datasourcemember="Description" controltype="InputControl"
                                        rows={6} maxSize={2000}
                                    />
                                    <FormControl.Numeric labelcolspan={4} colspan={8} name="OrderIndex" label="Thứ tự hiển thị"
                                        datasourcemember="OrderIndex" controltype="InputControl" maxValue={999999999}
                                    />

                                    <FormControl.ComboBox
                                        name="ShipmentSetupTypeID"
                                        type="select"
                                        isautoloaditemfromcache={true}
                                        loaditemcachekeyid={ERPCOMMONCACHE_SHIPMENTSETUPTYPE}
                                        valuemember="ShipmentSetupTypeID"
                                        nameMember="ShipmentSetupTypeName"
                                        label="Loại lắp đặt"
                                        controltype="InputControl"
                                        datasourcemember="ShipmentSetupTypeID"
                                        listoption={[]}
                                        isRequired={false}
                                        hide={!this.state.FormData.AppFeedBackTypeWorkFlow.IsSetupStep}
                                        labelcolspan={4} colspan={8}
                                    />
                                </div>
                                <div className="col-sm-1"></div>
                                <div className="col-sm-3">
                                    <FormControl.CheckBox labelcolspan={1} colspan={11} label="Là bước khởi tạo" name="IsInitStep"
                                        datasourcemember="IsInitStep" controltype="InputControl"
                                        swaplabelModal={true}
                                    />
                                    <FormControl.CheckBox labelcolspan={1} colspan={11} label="Là bước hoàn thành" name="IsFinishStep"
                                        datasourcemember="IsFinishStep" controltype="InputControl"
                                        swaplabelModal={true}
                                    />
                                    <FormControl.CheckBox labelcolspan={1} colspan={11} label="Bắt buộc chọn người xử lý" name="IsMustChooseProcessUser"
                                        controltype="InputControl" datasourcemember="IsMustChooseProcessUser"
                                        swaplabelModal={true}
                                    />
                                    <FormControl.CheckBox labelcolspan={1} colspan={11} label="Gửi email" name="IsSentEmail"
                                        datasourcemember="IsSentEmail" controltype="InputControl"
                                        swaplabelModal={true}
                                    />

                                    <FormControl.CheckBox labelcolspan={1} colspan={11} label="Gửi SMS" name="IsSentSMS"
                                        datasourcemember="IsSentSMS" controltype="InputControl"
                                        swaplabelModal={true}
                                    />

                                    <FormControl.CheckBox labelcolspan={1} colspan={11} label="Kích hoạt" name="IsActived"
                                        controltype="InputControl" datasourcemember="IsActived"
                                        swaplabelModal={true}
                                    />
                                    <FormControl.CheckBox labelcolspan={1} colspan={11} label="Hệ thống" name="IsSystem"
                                        controltype="InputControl" datasourcemember="IsSystem"
                                        swaplabelModal={true}
                                    />
                                    <FormControl.CheckBox labelcolspan={1} colspan={11} label="Là bước bắt đầu đi giao hàng" name="IsBeginDeliveryStep"
                                        controltype="InputControl" datasourcemember="IsBeginDeliveryStep"
                                        swaplabelModal={true}
                                    />
                                    <FormControl.CheckBox labelcolspan={1} colspan={11} label="Là bước hoàn thành giao hàng" name="IsCompletedDeliveryStep"
                                        controltype="InputControl" datasourcemember="IsCompletedDeliveryStep"
                                        swaplabelModal={true}
                                    />
                                    <FormControl.CheckBox labelcolspan={1} colspan={11} label="Có thông báo đến hệ thống của đối tác" name="IsNotifyToPartnerSystem"
                                        controltype="InputControl" datasourcemember="IsNotifyToPartnerSystem"
                                        swaplabelModal={true}
                                    />
                                    <FormControl.CheckBox labelcolspan={1} colspan={11} label="Chỉ hiển thị khi có phải thu tiền của khách hàng(có tiền COD hoặc tiền vật tư)" name="IsOnlyShowOnHasCollection"
                                        controltype="InputControl" datasourcemember="IsOnlyShowOnHasCollection"
                                        swaplabelModal={true}
                                    />
                                    <FormControl.CheckBox labelcolspan={1} colspan={11} label="Là bước nộp tiền cho thu ngân" name="IsPaidInStep"
                                        controltype="InputControl" datasourcemember="IsPaidInStep"
                                        swaplabelModal={true}
                                    />
                                    <FormControl.CheckBox labelcolspan={1} colspan={11} label="Là bước đến nhà khách" name="IsArrivalReceiverLocationStep"
                                        controltype="InputControl" datasourcemember="IsArrivalReceiverLocationStep"
                                        swaplabelModal={true}
                                    />
                                    <FormControl.CheckBox labelcolspan={1} colspan={11} label="Phải thu tiền mới được chuyển bước kế tiếp" name="IsMustCompleteCollection"
                                        controltype="InputControl" datasourcemember="IsMustCompleteCollection"
                                        swaplabelModal={true}
                                    />
                                    <FormControl.CheckBox labelcolspan={1} colspan={11} label="Là bước xuất vật tư bán cho khách" name="IsOutputSaleMaterialStep"
                                        controltype="InputControl" datasourcemember="IsOutputSaleMaterialStep"
                                        swaplabelModal={true}
                                    />
                                    <FormControl.CheckBox labelcolspan={1} colspan={11} label="Hiển thị nút nhấn thu tiền" name="IsShowCollectionButton"
                                        controltype="InputControl" datasourcemember="IsShowCollectionButton"
                                        swaplabelModal={true}
                                    />
                                    <FormControl.CheckBox labelcolspan={1} colspan={11} label="Là bước hủy giao hàng" name="IsCancelDeliveryStep"
                                        controltype="InputControl" datasourcemember="IsCancelDeliveryStep"
                                        swaplabelModal={true}
                                    />
                                    <FormControl.CheckBox labelcolspan={1} colspan={11} label="Là bước có thể tạm ứng vật tư" name="IsCanAdvanceMaterialStep"
                                        controltype="InputControl" datasourcemember="IsCanAdvanceMaterialStep"
                                        swaplabelModal={true}
                                    />
                                    <FormControl.CheckBox labelcolspan={1} colspan={11} label="Hiển thị danh sách vật tư để chỉnh sửa" name="IsShowMaterialList"
                                        controltype="InputControl" datasourcemember="IsShowMaterialList"
                                        swaplabelModal={true}
                                    />

                                    <FormControl.CheckBox labelcolspan={1} colspan={11} label="Là bước lắp đặt" name="IsSetupStep"
                                        controltype="InputControl" datasourcemember="IsSetupStep"
                                        swaplabelModal={true}
                                    />
                                    <FormControl.CheckBox labelcolspan={1} colspan={11} label="Là bước có thể cập nhật hàng trả lại" name="IsCanUpdateReturnItemStep"
                                        controltype="InputControl" datasourcemember="IsCanUpdateReturnItemStep"
                                        swaplabelModal={true}
                                    />
                                </div>
                            </div>
                        </TabPage>
                        <TabPage title="Quyền" name="AppFeedBackType_WF_Permis"
                            MLObjectDefinition={MLAppFeedBackType_WF_Permis}
                        >
                            <FormControl.MultiSelectComboBox name="UserGroupID" label="Nhóm người dùng"
                                labelcolspan={2} colspan={10} rowspan={12}
                                IsLabelDiv={true} controltype="InputControl"
                                isautoloaditemfromcache={true} loaditemcachekeyid={ERPCOMMONCACHE_USERGROUP} valuemember="UserGroupID" nameMember="UserGroupName"
                                listoption={[]} datasourcemember="UserGroupID"
                                SelectedOption={this.state.SelectedOption ? this.state.SelectedOption : []}
                                onValueChangeCus={this.changeSelectUser}
                            />
                            <br />
                            <div className="permissionGrid">
                                <InputGrid
                                    name="AppFeedBackType_WF_Permis"
                                    controltype="InputControl"
                                    colspan="12"
                                    IDSelectColumnName="chkSelectUserGroupID"
                                    PKColumnName={"UserGroupID"}
                                    isUseValueInputControl={true}
                                    MLObjectDefinition={GridMLObjectModelPermission}
                                    listColumn={this.state.InputPermissColumnList}
                                    dataSource={this.state.AppFeedBackType_WF_PermisData}
                                    onValueChangeInputGrid={this.valueChangeInputGridPermisData}
                                    onInsertClick={this.addAppFeedBackTypeWorkFlowPermis}
                                    onDeleteClick_Customize={this.removeAppFeedBackTypeWorkFlowPermis}
                                    isUseConfirmMessage={false}
                                />
                            </div>
                        </TabPage>
                        <TabPage title="Bước xử lý kế tiếp" name="AppFeedBackType_WF_Next">
                            <div className="form-row">
                                <FormControl.ComboBox
                                    name="NextAppFeedBackStep"
                                    label="Chọn bước kế tiếp"
                                    controltype="InputControl"
                                    listoption={this.state.NextAppFeedBackStepListOption}
                                    datasourcemember="NextAppFeedBackStep"
                                    labelcolspan={3}
                                    rowspan={6}
                                    colspan={9}
                                />

                                <FormControl.MultiSelectComboBox
                                    name="ChooseFunctionID"
                                    label="Quyền chuyển bước"
                                    labelcolspan={3}
                                    colspan={9}
                                    rowspan={6}
                                    IsLabelDiv={true}
                                    controltype="InputControl"
                                    isautoloaditemfromcache={true}
                                    loaditemcachekeyid={ERPCOMMONCACHE_FUNCTION}
                                    valuemember="FunctionID" nameMember="FunctionName"
                                    KeyFilter="FunctionCategoryID" ValueFilter="1,2"
                                    listoption={[]} datasourcemember="ChooseFunctionID"
                                    isMulti={false}
                                    value={this.state.FormData.AppFeedBackType_WF_Next && this.state.FormData.AppFeedBackType_WF_Next.ChooseFunctionID ? this.state.FormData.AppFeedBackType_WF_Next.ChooseFunctionID : null}
                                //onValueChangeCus={this.changeSelecPartner}
                                />

                                {/* <FormControl.ComboBox
                                    name="ChooseFunctionID"
                                    type="select"
                                    isautoloaditemfromcache={true}
                                    loaditemcachekeyid={ERPCOMMONCACHE_FUNCTION}
                                    valuemember="FunctionID"
                                    nameMember="FunctionName"
                                    label="Quyền chuyển bước"
                                    controltype="InputControl"
                                    listoption={[]}
                                    datasourcemember="ChooseFunctionID"
                                    labelcolspan={3} colspan={9} rowspan={6}
                                /> */}
                                {/* <FormControl.TextBox
                                    name="ChooseFunctionID"
                                    label="Quyền chuyển bước"
                                    controltype="InputControl"
                                    datasourcemember="ChooseFunctionID"
                                    readonly={false}
                                    labelcolspan={3}
                                    rowspan={6}
                                    colspan={9}
                                /> */}
                            </div>
                            <br />
                            <InputGrid name="AppFeedBackType_WF_Next"
                                controltype="GridControl"
                                colspan="12"
                                isUseValueInputControl={true}
                                IDSelectColumnName="chkSelectNextAppFeedBackStep"
                                PKColumnName="NextAppFeedBackStep"
                                MLObjectDefinition={GridMLObjectModelNext}
                                listColumn={InputNextColumnList}
                                dataSource={this.state.FormData.AppFeedBackType_WF_Next}
                                onInsertClick={this.addAppFeedBackTypeWorkFlowNext}
                                onDeleteClick_Customize={this.removeAppFeedBackTypeWorkFlowNext}
                                onValueChangeInputGrid={this.valueChangeInputGridNextData}
                                isUseConfirmMessage={false}
                            />
                        </TabPage>

                        {
                            this.props.IsUpdateData ?
                                <TabPage title="Danh sách hình mẫu tại một bước xử lý" name="AppFeedBackType_WF_Img">
                                    <AppFeedBackTypeWorkFlowImage
                                        AppFeedBackTypeID={this.props.AppFeedBackTypeID}
                                        AppFeedBackStepID={this.state.FormData.AppFeedBackTypeWorkFlow.AppFeedBackStepID}
                                    />

                                </TabPage>
                                :
                                <TabPage></TabPage>
                        }


                    </TabContainer>
                </FormContainer >
            </div>
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
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
        callClearLocalCache: (cacheKeyID) => {
            return dispatch(callClearLocalCache(cacheKeyID));
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: () => {
            dispatch(hideModal());
        },
    }
}

const AppFeedBackTypeWorkFlow = connect(mapStateToProps, mapDispatchToProps)(AppFeedBackTypeWorkFlowCom);
export default AppFeedBackTypeWorkFlow;