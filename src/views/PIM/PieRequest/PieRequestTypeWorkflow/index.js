import React from "react";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import TabContainer from "../../../../common/components/Tabs/TabContainer";
import TabPage from "../../../../common/components/Tabs/TabPage";
import FormContainer from '../../../../common/components/Form/AdvanceForm/FormContainer';
import FormControl from '../../../../common/components/Form/AdvanceForm/FormControl';
import InputGrid from '../../../../common/components/Form/AdvanceForm/FormControl/InputGrid';
import {
    MLObjectDefinition, GridMLObjectModelPermission, GridMLObjectModelNext
    , MTabList, MLPieRequestType_WF_Permis, InputNextColumnList
} from "./constants"
import { showModal, hideModal } from '../../../..//actions/modal';
import { APIHostName, AddAPIPath, UpdateAPIPath } from './constants';
import { ModalManager } from 'react-dynamic-modal/lib';
import { MessageModal } from "../../../../common/components/Modal";

class PieRequestTypeWorkflowCom extends React.Component {
    constructor(props) {
        super(props);
        this.addPieRequestWFPermis = this.addPieRequestWFPermis.bind(this);
        this.removePieRequestWFPermis = this.removePieRequestWFPermis.bind(this);
        this.addPieRequestWFNext = this.addPieRequestWFNext.bind(this);
        this.removePieRequestWFNext = this.removePieRequestWFNext.bind(this);
        this.handleInputChangeList = this.handleInputChangeList.bind(this);
        this.valueChangeInputGridPermisData = this.valueChangeInputGridPermisData.bind(this);
        this.valueChangeInputGridNextData = this.valueChangeInputGridNextData.bind(this);
        this.changeSelectUser = this.changeSelectUser.bind(this);
        this.createInputPermissColumnList = this.createInputPermissColumnList.bind(this);
        this.state = {
            FormData: {
                PieRequestTypeWorkflow: [],
                PieRequestType_WF_Permis: [],
                PieRequestType_WF_Next: [],
                NextPieRequestStepID: "",
                ChooseFunctionID: ""
            },
            PieRequestType_WF_PermisData: [],
            PieRequestType_WF_NextData: [],
            PieRequestType_WF_Permis: [],
            SelectedOption: [],
            NextPieRequestStepListOption: []
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
            if (dataSource.PieRequestType_WF_Permis) {
                dataSource.PieRequestType_WF_Permis.map(row => {
                    SelectedOption.push({ value: row.UserName, label: row.FullName });
                })
            }
            let NextPieRequestStepListOption = [{ value: -1, label: "--Vui lòng chọn--" }];
            if (this.props.PieRequestTypeWorkflow) {
                this.props.PieRequestTypeWorkflow.map(row => {
                    NextPieRequestStepListOption.push({ value: row.PieRequestStepID, label: row.PieRequestStepName });
                })
            }
            this.state = {
                FormData: {
                    PieRequestTypeWorkflow: dataSource,
                    PieRequestType_WF_Permis: dataSource.PieRequestType_WF_Permis ? dataSource.PieRequestType_WF_Permis : [],
                    PieRequestType_WF_Next: dataSource.PieRequestType_WF_Next ? dataSource.PieRequestType_WF_Next : [],
                    NextPieRequestStepID: "",
                    ChooseFunctionID: ""
                },
                PieRequestType_WF_PermisData: dataSource.PieRequestType_WF_Permis ? dataSource.PieRequestType_WF_Permis : [],
                PieRequestType_WF_NextData: dataSource.PieRequestType_WF_Next ? dataSource.PieRequestType_WF_Next : [],
                InputPermissColumnList: [],
                SelectedOption: SelectedOption,
                NextPieRequestStepListOption: NextPieRequestStepListOption
            }
        }
    }

    componentDidMount() {
        this.createInputPermissColumnList();
    }

    addPieRequestWFPermis() {
        debugger;
        const InputPermissColumnList = this.state.InputPermissColumnList;
        const UserNameList = this.state.UserNameList;
        let PieRequestType_WF_PermisData = this.state.PieRequestType_WF_PermisData;
        let objPermisData = {};
        UserNameList.map((userItem, userIndex) => {
            objPermisData = {};
            if (this.state.PieRequestType_WF_PermisData.filter(x => x.UserName == userItem.UserName).length <= 0) {
                InputPermissColumnList.map(item => {
                    if (item.Name == "UserName" || item.Name == "FullName") {
                        objPermisData[item.Name] = userItem[item.Name];
                    }
                    else if (item.Name == "chkSelectUserName") {
                        objPermisData[item.Name] = false;
                    }
                    else {
                        objPermisData[item.Name] = true;
                    }
                })
                PieRequestType_WF_PermisData = Object.assign([], PieRequestType_WF_PermisData, { [PieRequestType_WF_PermisData.length]: objPermisData });
            }
        });
        this.setState({ PieRequestType_WF_PermisData });
    }

    removePieRequestWFPermis(listSelect, dataSource, listDataSourceMember) {
        let list = listSelect.map((item, index, listSelect) => { return item[0].value })
        const PieRequestType_WF_PermisData = this.state.PieRequestType_WF_PermisData.filter(f => !list.includes(f[listDataSourceMember[0].key]));
        this.setState({ PieRequestType_WF_PermisData });
    }

    valueChangeInputGridPermisData(elementdata, index) {
        const rowGridData = Object.assign({}, this.state.PieRequestType_WF_PermisData[index], { [elementdata.Name]: elementdata.IsChecked }, { HasChanged: true });
        const PieRequestType_WF_PermisData = Object.assign([], this.state.PieRequestType_WF_PermisData, { [index]: rowGridData });
        this.setState({ PieRequestType_WF_PermisData });
    }

    addPieRequestWFNext() {
        if (this.state.FormData.NextPieRequestStepID != "" && this.state.FormData.NextPieRequestStepID != "-1") {
            const NextPieRequestStepID = this.state.FormData.NextPieRequestStepID;
            const ChooseFunctionID = this.state.FormData.ChooseFunctionID ? this.state.FormData.ChooseFunctionID : "";
            const PieRequestStepID = this.state.FormData.PieRequestTypeWorkflow.PieRequestStepID;
            let elementItem = this.state.FormData.PieRequestType_WF_Next.filter(x => { return x.NextPieRequestStepID == NextPieRequestStepID });
            if (elementItem.length == 0) {
                const NextPieRequestStepListOption = this.state.NextPieRequestStepListOption.filter(x => { return x.value == NextPieRequestStepID });
                const NextPieRequestStepName = NextPieRequestStepListOption[0].label;
                let PieRequestType_WF_Next = this.state.FormData.PieRequestType_WF_Next;
                PieRequestType_WF_Next.push({ PieRequestStepID: PieRequestStepID, NextPieRequestStepID: NextPieRequestStepID, NextPieRequestStepName: NextPieRequestStepName, ChooseFunctionID: ChooseFunctionID })
                const FormData = Object.assign({}, this.state.FormData, { PieRequestType_WF_Next });
                this.setState({ FormData });
            }
            else {
                if (this.state.FormData.PieRequestType_WF_Next.filter(x => { return x.NextPieRequestStepID == NextPieRequestStepID && x.ChooseFunctionID == ChooseFunctionID }).length == 0) {
                    const item = Object.assign({}, elementItem[0], { ChooseFunctionID });
                    const index = this.state.FormData.PieRequestType_WF_Next.findIndex(item => item.NextPieRequestStepID == NextPieRequestStepID);
                    const PieRequestType_WF_Next = Object.assign([], this.state.FormData.PieRequestType_WF_Next, { [index]: item });
                    const FormData = Object.assign({}, this.state.FormData, { PieRequestType_WF_Next });
                    this.setState({ FormData });
                }
            }
        }
    }

    removePieRequestWFNext(listSelect, dataSource, listDataSourceMember) {
        // const filteredArray = dataSource.filter(x => listSelect.indexOf(x[pkColumnName].ToString()) < 0);
        // const PieRequestType_WF_Next = this.state.FormData.PieRequestType_WF_Next.filter(f => !listSelect.includes(f[listDataSourceMember[0].key]));
        let list = listSelect.map((item, index, listSelect) => { return item[0].value })
        const PieRequestType_WF_Next = this.state.FormData.PieRequestType_WF_Next.filter(f => !list.includes(f[listDataSourceMember[0].key]));
        const FormData = Object.assign({}, this.state.FormData, { PieRequestType_WF_Next });
        this.setState({ FormData });
    }

    valueChangeInputGridNextData(elementdata, index) {
        const rowGridData = Object.assign({}, this.state.FormData.PieRequestType_WF_Next[index], { [elementdata.Name]: elementdata.IsChecked }, { HasChanged: true });
        const PieRequestType_WF_Next = Object.assign([], this.state.FormData.PieRequestType_WF_Next, { [index]: rowGridData });
        const FormData = Object.assign({}, this.state.FormData, { PieRequestType_WF_Next });
        this.setState({ FormData });
    }

    handleInputChangeList(formData, tabNameList, tabMLObjectDefinitionList) {
        let keys = []
        formData.PieRequestType_WF_Next = this.state.FormData.PieRequestType_WF_Next;
        formData.PieRequestType_WF_Permis = this.state.PieRequestType_WF_PermisData;
        if (this.state.FormData.PieRequestTypeWorkflow) keys = Object.keys(this.state.FormData.PieRequestTypeWorkflow);
        if (formData.PieRequestTypeWorkflow) {
            Object.keys(formData.PieRequestTypeWorkflow).map((key) => {
                if (!keys.find(x => x == key)) {
                    keys.push(key);
                }
            })
        }
        if (keys) {
            let formDataTemp = {};
            const oldPieRequestTypeWorkflow = this.state.FormData.PieRequestTypeWorkflow;
            keys.forEach(function (key) {
                formDataTemp = Object.assign({}, formDataTemp, { [key]: formData.PieRequestTypeWorkflow[key] != undefined ? formData.PieRequestTypeWorkflow[key] : oldPieRequestTypeWorkflow[key] });
            });
            const newFormData = Object.assign({}, formData, { PieRequestTypeWorkflow: formDataTemp })
            this.setState({ FormData: newFormData });
        }
        else {
            this.setState({ FormData: formData });
        }
    }

    handleSubmit(formData, MLObject) {
        let newPieRequestType_WF_PermisData = this.state.PieRequestType_WF_PermisData;
        let newPieRequestType_WF_NextData = this.state.FormData.PieRequestType_WF_Next;
        const newFormData = Object.assign({}, this.state.FormData.PieRequestTypeWorkflow, {
            PieRequestType_WF_Permis: newPieRequestType_WF_PermisData,
            PieRequestType_WF_Next: newPieRequestType_WF_NextData
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
        if (newFormData.PieRequestType_WF_Permis) {
            let PieRequestType_WF_PermisData = [];
            newFormData.PieRequestType_WF_Permis.map((row, index) => {
                const UserName = row.UserName;
                const FullName = row.FullName;
                Object.keys(row).forEach(key => {
                    if (Number.isInteger(parseInt(key)) && row[key] == true) {
                        PieRequestType_WF_PermisData.push({
                            PieRequestStepID: newFormData.PieRequestStepID,
                            UserName: UserName,
                            FullName: FullName,
                            PiePermissionID: key
                        })
                    }
                });
            })
            newFormData.PieRequestType_WF_Permis = PieRequestType_WF_PermisData;
        }
        if (!this.props.IsUpdateData)
            newFormData.PieRequestTypeID = this.props.PieRequestTypeID;
        if ((parseInt(this.props.TotalStepCompletePercent) + parseInt(newFormData.StepCompletePercent)) > 100) {
            if(this.props.IsUpdateData){
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
                if (this.props.onAddPieRequestTypeWorkflowComplete) {
                    this.props.onAddPieRequestTypeWorkflowComplete(newFormData);
                }
            });
            this.props.hideModal();
        }
    }

    changeSelectUser(name, listSelect) {
        let UserNameList = [];
        listSelect.map(user => {
            const usermatch = this.props.SysUserCache.filter(x => { return x.UserName == user });
            UserNameList.push(usermatch[0]);
        })
        this.setState({ UserNameList });
    }

    createInputPermissColumnList() {
        const PiePermissionCache = this.props.PiePermissionCache;
        let InputPermissColumnList = [
            {
                Name: "chkSelectUserName",
                Type: "checkbox",
                Caption: "Chọn",
                DataSourceMember: "UserName",
                Width: 100
            },
            {
                Name: "UserName",
                Type: "text",
                Caption: "Mã người dùng",
                DataSourceMember: "UserName",
                Width: 150
            },
            {
                Name: "FullName",
                Type: "text",
                Caption: "Tên người dùng",
                DataSourceMember: "FullName",
                Width: 200
            },
        ];
        if (PiePermissionCache) {
            PiePermissionCache.map((item, index) => {
                InputPermissColumnList.push({
                    Name: item.PiePermissionID,
                    Type: "checkbox",
                    Caption: item.PiePermissionName,
                    DataSourceMember: item.PiePermissionID,
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

    render() {
        return (
            <div className="row" style={{ textAlign: 'left' }}>
                <FormContainer
                    MLObjectDefinition={MTabList}
                    IsAutoLayout={true}
                    listelement={[]}
                    onInputChangeList={this.handleInputChangeList}
                    onSubmit={(formData, MLObject) => this.handleSubmit(formData, MLObject)}
                >
                    <TabContainer
                        defaultActiveTabIndex={0} IsAutoLayout={true} controltype="TabContainer">
                        <TabPage MLObjectDefinition={MLObjectDefinition} datasource={this.state.FormData.PieRequestTypeWorkflow}
                            title="Thông tin chung" name="PieRequestTypeWorkflow" >
                            <div className="form-row">
                                <div className="col-sm-8">
                                    <FormControl.TextBox labelcolspan={4} colspan={8} placeholder="ID tự tăng" readonly={true}
                                        name="PieRequestStepID" label="Mã bước xử lý"
                                        controltype="InputControl" datasourcemember="PieRequestStepID"
                                    />
                                    <FormControl.TextBox labelcolspan={4} colspan={8} name="PieRequestStepName" label="Tên bước xử lý"
                                        controltype="InputControl" datasourcemember="PieRequestStepName"
                                        required={true}
                                    />
                                    <FormControl.Number labelcolspan={4} colspan={8} name="StepCompletePercent" label="Tỷ lệ hoàn thành"
                                        datasourcemember="StepCompletePercent" controltype="InputControl"
                                        min={0} max={100}
                                    />
                                    <FormControl.Number labelcolspan={4} colspan={8} name="MaxProcessTimeDay" label="Thời gian XL tối đa(Ngày)"
                                        datasourcemember="MaxProcessTimeDay" controltype="InputControl"
                                        min={0} max={30} required={true}
                                    />
                                    <FormControl.Number labelcolspan={4} colspan={8} name="MaxProcessTimeHour" label="Thời gian XL tối đa(Giờ)"
                                        datasourcemember="MaxProcessTimeHour" controltype="InputControl"
                                        min={0} max={24}
                                    />
                                    <FormControl.Number labelcolspan={4} colspan={8} name="MaxProcessTimeMinute" label="Thời gian XL tối đa(phút)"
                                        datasourcemember="MaxProcessTimeMinute" controltype="InputControl"
                                        min={0} max={60} 
                                    />
                                    <FormControl.TextArea labelcolspan={4} colspan={8} name="Description" label="Mô tả"
                                        datasourcemember="Description" controltype="InputControl" value="Kiểm tra kỹ"
                                        rows={6}
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
                                    <FormControl.CheckBox labelcolspan={1} colspan={11} label="Kích hoạt" name="IsActived"
                                        controltype="InputControl" datasourcemember="IsActived"
                                        swaplabelModal={true}
                                    />
                                    <FormControl.CheckBox labelcolspan={1} colspan={11} label="Hệ thống" name="IsSystem"
                                        controltype="InputControl" datasourcemember="IsSystem"
                                        swaplabelModal={true}
                                    />
                                </div>
                            </div>
                        </TabPage>
                        <TabPage title="Quyền" name="PieRequestType_WF_Permis"
                            MLObjectDefinition={MLPieRequestType_WF_Permis}
                        >
                            <FormControl.MultiSelectComboBox name="UserName" label="Người dùng"
                                labelcolspan={1} colspan={11} rowspan={12}
                                IsLabelDiv={true} controltype="InputControl"
                                isautoloaditemfromcache={true} loaditemcachekeyid="PIMCACHE.SYS_USER" valuemember="UserName" nameMember="FullName"
                                listoption={[]} datasourcemember="UserName"
                                SelectedOption={this.state.SelectedOption ? this.state.SelectedOption : []}
                                onValueChangeCus={this.changeSelectUser}
                            />
                            <InputGrid
                                name="PieRequestType_WF_Permis"
                                controltype="InputControl"
                                colspan="12"
                                IDSelectColumnName="chkSelectUserName"
                                PKColumnName={"UserName"}
                                isUseValueInputControl={true}
                                MLObjectDefinition={GridMLObjectModelPermission}
                                listColumn={this.state.InputPermissColumnList}
                                dataSource={this.state.PieRequestType_WF_PermisData}
                                onValueChangeInputGrid={this.valueChangeInputGridPermisData}
                                onInsertClick={this.addPieRequestWFPermis}
                                onDeleteClick_Customize={this.removePieRequestWFPermis}
                                isUseConfirmMessage={false}
                            />
                        </TabPage>
                        <TabPage title="Bước kế tiếp" name="PieRequestType_WF_Next">
                            <div className="form-row">
                                <FormControl.ComboBox
                                    name="NextPieRequestStepID"
                                    label="Chọn bước kế tiếp"
                                    controltype="InputControl"
                                    listoption={this.state.NextPieRequestStepListOption}
                                    datasourcemember="NextPieRequestStepID"
                                    labelcolspan={3}
                                    rowspan={6}
                                    colspan={9}
                                />
                                <FormControl.TextBox
                                    name="ChooseFunctionID"
                                    label="Quyền chuyển bước"
                                    controltype="InputControl"
                                    datasourcemember="ChooseFunctionID"
                                    readonly={false}
                                    labelcolspan={3}
                                    rowspan={6}
                                    colspan={9}
                                />
                            </div>
                            <InputGrid name="PieRequestType_WF_Next"
                                controltype="GridControl"
                                colspan="12"
                                isUseValueInputControl={true}
                                IDSelectColumnName="chkSelectNextPieRequestStepID"
                                PKColumnName={"NextPieRequestStepID"}
                                MLObjectDefinition={GridMLObjectModelNext}
                                listColumn={InputNextColumnList}
                                dataSource={this.state.FormData.PieRequestType_WF_Next}
                                onInsertClick={this.addPieRequestWFNext}
                                onDeleteClick_Customize={this.removePieRequestWFNext}
                                onValueChangeInputGrid={this.valueChangeInputGridNextData}
                                isUseConfirmMessage={false}
                            />
                        </TabPage>
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: () => {
            dispatch(hideModal());
        },
    }
}

const PieRequestTypeWorkflow = connect(mapStateToProps, mapDispatchToProps)(PieRequestTypeWorkflowCom);
export default PieRequestTypeWorkflow;