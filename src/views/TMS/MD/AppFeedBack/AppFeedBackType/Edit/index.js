import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { ModalManager } from 'react-dynamic-modal/lib';
import TabContainer from "../../../../../../common/components/Tabs/TabContainer";
import TabPage from "../../../../../../common/components/Tabs/TabPage";
import { MessageModal } from "../../../../../../common/components/Modal";
import {
    APIHostName, UpdateAPIPath, LoadAPIPath, EditPagePath,
    MLObjectDefinition, MLObjectAppFeedBackTypeWorkFlow,
    MTabList, BackLink, WFColumnList, AddLogAPIPath, CheckValidStepAPIPath
} from "../constants"
import { callFetchAPI } from "../../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../../actions/pageAction";
import AppFeedBackTypeWorkFlow from '../../AppFeedBackTypeWorkFlow';
import { showModal, hideModal } from '../../../../../../actions/modal';
import { MODAL_TYPE_COMMONTMODALS, MODAL_TYPE_CONFIRMATION } from '../../../../../../constants/actionTypes';
import InputGrid from '../../../../../../common/components/Form/AdvanceForm/FormControl/InputGrid';
import FormContainer from '../../../../../../common/components/Form/AdvanceForm/FormContainer';
import FormControl from '../../../../../../common/components/Form/AdvanceForm/FormControl';
import { DeleteAPIPath } from '../../AppFeedBackTypeWorkFlow/constants';
import DataGrid from "../../../../../../common/components/DataGrid";
import { GetMLObjectData } from "../../../../../../common/library/form/FormLib";
import { Prompt } from 'react-router';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { convertNodeToElement } from "react-html-parser";
import Collapsible from 'react-collapsible';
import { callGetCache, callClearLocalCache } from "../../../../../../actions/cacheAction";
import {
    ERPCOMMONCACHE_AppFeedBackType, ERPCOMMONCACHE_PARTNER, ERPCOMMONCACHE_SHIPMENTORDERSTATUS, ERPCOMMONCACHE_FUNCTION, ERPCOMMONCACHE_SUBGROUPTECHSPECS, ERPCOMMONCACHE_TECHSPECSVALUE
} from "../../../../../../constants/keyCache";
import { AppFeedBackType_UPDATE } from "../../../../../../constants/functionLists";

class EditCom extends React.Component {
    constructor(props) {
        super(props);
        this.addAppFeedBackTypeWorkFlowPopup = this.addAppFeedBackTypeWorkFlowPopup.bind(this);
        this.editAppFeedBackTypeWorkFlowPopup = this.editAppFeedBackTypeWorkFlowPopup.bind(this);
        this.removeAppFeedBackTypeWorkFlow = this.removeAppFeedBackTypeWorkFlow.bind(this);
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
        this.checkValidStep = this.checkValidStep.bind(this);
        this.initFlexShipmentFeeDatasource = this.initFlexShipmentFeeDatasource.bind(this);
        this.notificationDOMRef = React.createRef();
        this.state = {
            IsCallAPIError: false,
            IsCloseForm: false,
            IsLoading: true,
            FormData: {
                AppFeedBackType: {},
                AppFeedBackTypeWorkFlow: [],
                TotalStepCompletePercent: 0
            },
            IsValidStep: false,
            IsInsert: true
        };
    }

    componentDidMount() {
        this.props.updatePagePath(EditPagePath);
        this.callLoadData();
        this.getCachePiePermission();
        this.getCacheSysUser();
        this.getCachePartner();
        this.getCacheShipmentStatus();
        this.checkValidStep();
        //console.log("formdata", this.state.FormData);
    }

    //kiểm tra đủ bước khởi tạo hay hoàn thành trước khi rời trang
    checkValidStep() {
        const id = this.props.match.params.id;
        this.props.callFetchAPI(APIHostName, CheckValidStepAPIPath, id).then((apiResult) => {
            if (apiResult.IsError) {
                this.setState({ IsValidStep: true });
            } else {
                this.setState({ IsValidStep: false });
            }
        });
        //console.log("validstep", this.state.IsValidStep);
    }

    addAppFeedBackTypeWorkFlowPopup() {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Thêm mới bước xử lý của một loại phản hồi ứng dụng',
            content: {
                text: <AppFeedBackTypeWorkFlow
                    AppFeedBackTypeWorkFlow={this.state.FormData.AppFeedBackTypeWorkFlow}
                    onAddAppFeedBackTypeWorkFlowComplete={(data) => this.onWorkflowPopupSubmit(data)}
                    PiePermissionCache={this.state.PiePermissionCache}
                    SysUserCache={this.state.SysUserCache}
                    dataSource={[]}
                    AppFeedBackTypeID={this.state.FormData.AppFeedBackType.AppFeedBackTypeID}
                    TotalStepCompletePercent={this.state.FormData.TotalStepCompletePercent}
                />
            },
            afterClose: this.onWorkflowPopupSubmit,
            maxWidth: '1500px'
        });
    }

    editAppFeedBackTypeWorkFlowPopup(index) {
        let objAppFeedBackTypeWorkFlow = this.state.FormData.AppFeedBackTypeWorkFlow[index];
        let AppFeedBackTypeWorkFlowNext = this.state.FormData.AppFeedBackTypeWorkFlow.filter((x, i) => i != index);
        let dataSource = [];
        let ListAppFeedBackType_WF_Permis = [];
        if (objAppFeedBackTypeWorkFlow.AppFeedBackType_WF_Permis) {
            let _AppFeedBackType_WF_Permis = {};
            const piePermissionCache = this.state.PiePermissionCache;
            objAppFeedBackTypeWorkFlow.AppFeedBackType_WF_Permis.map((row, index) => {
                if (_AppFeedBackType_WF_Permis.UserGroupID != row.UserGroupID) {
                    const tempt = Object.assign({}, _AppFeedBackType_WF_Permis);
                    ListAppFeedBackType_WF_Permis.push(tempt);
                    _AppFeedBackType_WF_Permis.UserGroupID = row.UserGroupID
                    _AppFeedBackType_WF_Permis.UserGroupName = row.UserGroupName
                    piePermissionCache.map(item => {
                        _AppFeedBackType_WF_Permis[item.ShipmentOrderPermissionID] = false;
                    })
                }
                _AppFeedBackType_WF_Permis[row.ShipmentOrderPermissionID] = true;
            });
            if (_AppFeedBackType_WF_Permis.UserGroupID && _AppFeedBackType_WF_Permis.UserGroupName.length > 0) {
                ListAppFeedBackType_WF_Permis.push(_AppFeedBackType_WF_Permis);
                ListAppFeedBackType_WF_Permis.shift();
            }
        }
        dataSource = Object.assign({}, objAppFeedBackTypeWorkFlow, { AppFeedBackType_WF_Permis: ListAppFeedBackType_WF_Permis })
        //dataSource = objAppFeedBackTypeWorkFlow;
        let totalStepCompletePercent = AppFeedBackTypeWorkFlowNext.reduce((StepCompletePercent, rowItem) => {
            return StepCompletePercent += rowItem.StepCompletePercent
        }, 0);
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Chỉnh sửa bước xử lý của một loại phản hồi ứng dụng',
            content: {
                text: <AppFeedBackTypeWorkFlow
                    AppFeedBackTypeWorkFlow={AppFeedBackTypeWorkFlowNext}
                    dataSource={dataSource}
                    onAddAppFeedBackTypeWorkFlowComplete={(data) => this.onWorkflowPopupSubmit(data)}
                    PiePermissionCache={this.state.PiePermissionCache}
                    SysUserCache={this.state.SysUserCache}
                    IsUpdateData={true}
                    AppFeedBackTypeID={this.state.FormData.AppFeedBackType.AppFeedBackTypeID}
                    TotalStepCompletePercent={totalStepCompletePercent}
                />
            },
            afterClose: this.onWorkflowPopupSubmit,
            maxWidth: '1500px'
        });
    }

    removeAppFeedBackTypeWorkFlow(deleteList, dataSource, pkColumnName) {
        let listMLObject = [];
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
            this.checkValidStep();
        });
    }

    handleModalFixShipmentChange(formData, formValidation, elementName, elementValue) {
        let shipmentFeeType = this.state.FormData.ShipmentFeeType ? this.state.FormData.ShipmentFeeType : [];
        let getFeeType = "";
        let isInsert = this.state.IsInsert;
        let _ModalFixShipmentFeeColumnList = isInsert ? this.state.ModalFixShipmentFeeColumnList : this.state.ModalFixShipmentFeeColumnList_Edit;
        if (elementName == "ShipmentFeeTypeID") {
            let match = shipmentFeeType.filter(x => x.ShipmentFeeTypeID == elementValue);
            if (match && match.length > 0) {
                getFeeType = match[0].GetFeeType;
            }
        }

        _ModalFixShipmentFeeColumnList.forEach(function (objElement) {
            if (objElement.Name == "GetFeeType") {
                objElement.selectedValue = getFeeType;
            } else if (getFeeType && objElement.Name == "FeeValue") {
                if (parseInt(getFeeType) == 2) {//lấy từ bảng làm giá
                    objElement.readonly = true;
                } else {
                    objElement.readonly = false;
                }

            }
        }.bind(this));

        if (isInsert) {
            this.setState({ ModalFixShipmentFeeColumnList: _ModalFixShipmentFeeColumnList });
        } else {
            this.setState({ ModalFixShipmentFeeColumnList_Edit: _ModalFixShipmentFeeColumnList });
        }


    }

    //Sự kiện khi bấm cập nhật popup thêm bước xử lý
    onWorkflowPopupSubmit(formData) {
        this.callLoadData();
        this.checkValidStep();
        this.props.hideModal();
    }

    handleInputChangeList(formData, tabNameList, tabMLObjectDefinitionList, formValidation) {
        //console.log("edithandel", this.state.FormData.ShipmentFeeType);
        let formDataTemp = {};
        //const oldPieRequestType = this.state.FormData.PieRequestType;
        Object.keys(this.state.FormData.AppFeedBackType).forEach(function (key) {
            //formDataTemp = Object.assign({}, formDataTemp, { [key]: formData.PieRequestType[key] ? formData.PieRequestType[key] : oldPieRequestType[key] });
            formDataTemp = Object.assign({}, formDataTemp, { [key]: formData.AppFeedBackType[key] });
        });
        const newFormData = Object.assign({}, this.state.FormData, { AppFeedBackType: formDataTemp })
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

        let param = Object.assign({}, this.state.FormData.AppFeedBackType,
            {
                AppFeedBackTypeWorkFlow: this.state.FormData.AppFeedBackTypeWorkFlow,
                ListPartner: this.state.PartnerList,
                ListStatus: this.state.ShipmentStatusList
            });
        param.AddFunctionID = param.AddFunctionID && Array.isArray(param.AddFunctionID) ? param.AddFunctionID[0] : param.AddFunctionID;
        param.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        param.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
        if (param.AppFeedBackTypeWorkFlow) {
            param.AppFeedBackTypeWorkFlow.forEach(function (item, index) {
                if (!item.CreatedUser) {
                    item.PieRequestStepID = -1;
                }
            })
        }

        if (this.state.IsValidStep) {
            if (window.confirm('Thiếu bước khởi tạo hay hoàn thành. Bạn có muốn tiếp tục cập nhật không?')) {
                this.props.callFetchAPI(APIHostName, UpdateAPIPath, param).then((apiResult) => {
                    this.setState({ IsCallAPIError: apiResult.IsError });
                    if (!apiResult.IsError) {
                        this.showMessage1(apiResult.Message);
                        this.props.callClearLocalCache(ERPCOMMONCACHE_AppFeedBackType);
                        //this.handleSubmitInsertLog(param);
                    } else {
                        this.showMessage(apiResult.Message);
                    }

                });
            }

        } else {
            this.props.callFetchAPI(APIHostName, UpdateAPIPath, param).then((apiResult) => {
                this.setState({ IsCallAPIError: apiResult.IsError });
                if (!apiResult.IsError) {
                    this.showMessage1(apiResult.Message);
                    this.props.callClearLocalCache(ERPCOMMONCACHE_AppFeedBackType);
                    //this.handleSubmitInsertLog(param);
                } else {
                    this.showMessage(apiResult.Message);
                }

            });
        }

        //console.log("handleSubmit", param);

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

        //lấy cache thông số kỹ thuật 
        this.props.callGetCache(ERPCOMMONCACHE_SUBGROUPTECHSPECS).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                this.setState({
                    Techspecs: result.ResultObject.CacheData
                });
            }
        });

        //lấy cache giá trị tham số kỹ thuật áp dụng
        this.props.callGetCache(ERPCOMMONCACHE_TECHSPECSVALUE).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                this.setState({
                    TechspecsValue: result.ResultObject.CacheData
                });
            }
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



    initFlexShipmentFeeDatasource(dataSource) {
        let techspecs = this.state.Techspecs ? this.state.Techspecs : [];
        let techspecsValue = this.state.TechspecsValue ? this.state.TechspecsValue : [];
        let match = [];
        let match2 = [];
        dataSource = dataSource.map(function (item, index) {
            match = techspecs.filter(x => x.TechspecsID == item.TechspecsID);
            match2 = techspecsValue.filter(x => x.TechSpecsValueID == item.TechspecsValueID);
            if (match && match.length > 0) {
                item.TechspecsName = match[0].TechspecsName;
            }
            if (match2 && match2.length > 0) {
                item.TechspecsValueName = match2[0].Value;
            }
            return item;
        }.bind(this));
        return dataSource;

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

                // //loại chi phí vận chuyển
                // let _shipmentFeeType = [];
                // if (apiResult.ResultObject.ShipmentFeeType) {
                //     _shipmentFeeType = apiResult.ResultObject.ShipmentFeeType;
                // }

                // //chi phí vận chuyển cố định
                // let _AppFeedBackTypeFixShipmentFee = [];
                // if (apiResult.ResultObject.AppFeedBackTypeFixShipmentFee) {
                //     _AppFeedBackTypeFixShipmentFee = apiResult.ResultObject.AppFeedBackTypeFixShipmentFee;
                // }

                // //chi phí vận chuyển thay đổi
                // let _AppFeedBackTypeFlexShipmentFee = [];
                // if (apiResult.ResultObject.AppFeedBackTypeFlexShipmentFee) {
                //     _AppFeedBackTypeFlexShipmentFee = this.initFlexShipmentFeeDatasource(apiResult.ResultObject.AppFeedBackTypeFlexShipmentFee);
                // }

                let TotalStepCompletePercent = 0;
                if (apiResult.ResultObject.AppFeedBackTypeWorkFlow) {
                    apiResult.ResultObject.AppFeedBackTypeWorkFlow.map((item) => {
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
                            AppFeedBackType: apiResult.ResultObject,
                            AppFeedBackTypeWorkFlow: apiResult.ResultObject.AppFeedBackTypeWorkFlow,
                            TotalStepCompletePercent: TotalStepCompletePercent
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
                            AppFeedBackType: apiResult.ResultObject,
                            AppFeedBackTypeWorkFlow: []
                        },
                        SelectedPartnerList: selectedOptionPartner,
                        SelectedShipmentStatusList: selectedOptionStatus,
                        PartnerList: listPartner,
                        ShipmentStatusList: listStatus
                    });
                }

                this.setState({ IsLoading: false });
                //console.log("apiResult.ResultObject",apiResult.ResultObject);

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

    addNotification(message1, IsError) {
        if (!IsError) {
            this.setState({
                cssNotification: "notification-custom-success",
                iconNotification: "fa fa-check"
            });
        } else {
            this.setState({
                cssNotification: "notification-danger",
                iconNotification: "fa fa-exclamation"
            });
        }
        this.notificationDOMRef.current.addNotification({
            container: "bottom-right",
            content: (
                <div className={this.state.cssNotification}>
                    <div className="notification-custom-icon">
                        <i className={this.state.iconNotification} />
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

    render() {
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        if (this.state.IsLoading) return <p>Đang lấy dữ liệu...</p>
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <Prompt
                    when={this.state.IsValidStep}
                    message='Thiếu bước khởi tạo hay bước hoàn thành. Bạn có muốn rời trang?'
                />

                <FormContainer
                    MLObjectDefinition={MTabList}
                    IsAutoLayout={true}
                    listelement={[]}
                    dataSource={this.state.FormData}
                    RequirePermission={AppFeedBackType_UPDATE}
                    onInputChangeList={this.handleInputChangeList}
                    onSubmit={(formData, MLObject) => this.handleSubmit(formData, MLObject)}
                    BackLink={BackLink}>
                    <TabContainer
                        defaultActiveTabIndex={0} IsAutoLayout={true} controltype="TabContainer" IsAutoLoadDataGrid={true}>
                        <TabPage title="Loại phản hồi ứng dụng" name="AppFeedBackType" MLObjectDefinition={MLObjectDefinition} datasource={this.state.FormData.AppFeedBackType}>
                            <FormControl.TextBox readonly={true} name="AppFeedBackTypeID" label="Mã loại phản hồi ứng dụng:"
                                controltype="InputControl" datasourcemember="AppFeedBackTypeID"
                                labelcolspan={4} colspan={8} rowspan={8}
                                maxSize={10}
                            />
                            <FormControl.TextBox name="AppFeedBackTypeName" label="Tên loại phản hồi ứng dụng:"
                                controltype="InputControl" datasourcemember="AppFeedBackTypeName"
                                labelcolspan={4} colspan={8} rowspan={8}
                                maxSize={200} isRequired={true}
                            />
                            {/* <FormControl.ComboBox
                                name="AddFunctionID"
                                type="select"
                                isautoloaditemfromcache={true}
                                loaditemcachekeyid={ERPCOMMONCACHE_FUNCTION}
                                valuemember="FunctionID"
                                nameMember="FunctionName"
                                label="Quyền thêm yêu cầu này"
                                controltype="InputControl"
                                listoption={[]}
                                datasourcemember="AddFunctionID"
                                labelcolspan={4} colspan={8} rowspan={8}
                            /> */}

                            <FormControl.MultiSelectComboBox name="AddFunctionID" label="Quyền thêm yêu cầu này"
                                labelcolspan={4} colspan={8} rowspan={8}
                                IsLabelDiv={true} controltype="InputControl"
                                isautoloaditemfromcache={true} loaditemcachekeyid={ERPCOMMONCACHE_FUNCTION}
                                valuemember="FunctionID" nameMember="FunctionName"
                                KeyFilter="FunctionCategoryID" ValueFilter="1,2"
                                listoption={[]} datasourcemember="AddFunctionID"
                                isMulti={false}
                                value={this.state.FormData.AppFeedBackType && this.state.FormData.AppFeedBackType.AddFunctionID ? this.state.FormData.AppFeedBackType.AddFunctionID : null}
                            //onValueChangeCus={this.changeSelecPartner}
                            />

                            {/* <FormControl.CheckBox label="Cho phép chọn đối tác gửi" name="IsSelectSenderPartner"
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

                            <FormControl.CheckBox label="Có bao gồm lắp đặt" name="IsIncludeInstall"
                                datasourcemember="IsIncludeInstall" controltype="InputControl"
                                labelcolspan={4} colspan={8} rowspan={8}
                            /> */}

                            {/* ------------------------------------------------------------------ */}

                            <FormControl.MultiSelectComboBox name="PartnerID" label="Danh sách đối tác"
                                labelcolspan={4} colspan={8} rowspan={8}
                                IsLabelDiv={true} controltype="InputControl"
                                isautoloaditemfromcache={true} loaditemcachekeyid={ERPCOMMONCACHE_PARTNER} valuemember="PartnerID" nameMember="PartnerName"
                                listoption={[]} datasourcemember="PartnerID"
                                SelectedOption={this.state.SelectedPartnerList ? this.state.SelectedPartnerList : []}
                                onValueChangeCus={this.changeSelecPartner}
                            />

                            <FormControl.MultiSelectComboBox name="ShipmentOrderStatusID" label="Trạng thái vận chuyển"
                                labelcolspan={4} colspan={8} rowspan={8}
                                IsLabelDiv={true} controltype="InputControl"
                                isautoloaditemfromcache={true} loaditemcachekeyid={ERPCOMMONCACHE_SHIPMENTORDERSTATUS} valuemember="ShipmentOrderStatusID" nameMember="ShipmentOrderStatusName"
                                listoption={[]} datasourcemember="ShipmentOrderStatusID"
                                SelectedOption={this.state.SelectedShipmentStatusList ? this.state.SelectedShipmentStatusList : []}
                                onValueChangeCus={this.changeSelectShipmentStatus}
                            />

                            {/* ------------------------------------------------------------------ */}

                            <FormControl.TextArea name="Description" label="Mô tả"
                                datasourcemember="Description" controltype="InputControl"
                                labelcolspan={4} colspan={8} rowspan={8} rows={6}
                                maxSize={2000}
                            />
                            <FormControl.Numeric name="OrderIndex" label="Thứ tự hiển thị"
                                datasourcemember="OrderIndex" controltype="InputControl"
                                labelcolspan={4} colspan={8} rowspan={8}
                                value={this.state.FormData ? this.state.FormData.AppFeedBackType.OrderIndex : 0}
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
                        <TabPage title="Quy trình" name="AppFeedBackTypeWorkFlow">
                            <InputGrid name="AppFeedBackTypeWorkFlow" controltype="GridControl"
                                IDSelectColumnName="chkSelectAppFeedBackStepID"
                                PKColumnName="AppFeedBackStepID"
                                isUseValueInputControl={true}
                                listColumn={WFColumnList}
                                colspan="12"
                                MLObjectDefinition={MLObjectAppFeedBackTypeWorkFlow}
                                dataSource={this.state.FormData.AppFeedBackTypeWorkFlow}
                                onInsertClick={this.addAppFeedBackTypeWorkFlowPopup}
                                onInsertClickEdit={this.editAppFeedBackTypeWorkFlowPopup}
                                onDeleteClick_Customize={this.removeAppFeedBackTypeWorkFlow}
                            />
                        </TabPage>
                    </TabContainer>
                </FormContainer >
            </React.Fragment>
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
        },
        callClearLocalCache: (cacheKeyID) => {
            return dispatch(callClearLocalCache(cacheKeyID));
        }

    }
}

const Edit = connect(mapStateToProps, mapDispatchToProps)(EditCom);
export default Edit;