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
    MTabList, BackLink, WFColumnList, AddLogAPIPath, CheckValidStepAPIPath
} from "../constants"
import { callFetchAPI } from "../../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../../actions/pageAction";
import ShipmentOrderTypeWorkflow from '../../ShipmentOrderTypeWorkflow';
import { showModal, hideModal } from '../../../../../../actions/modal';
import { MODAL_TYPE_COMMONTMODALS, MODAL_TYPE_CONFIRMATION } from '../../../../../../constants/actionTypes';
import InputGrid from '../../../../../../common/components/Form/AdvanceForm/FormControl/InputGrid';
import FormContainer from '../../../../../../common/components/Form/AdvanceForm/FormContainer';
import FormControl from '../../../../../../common/components/Form/AdvanceForm/FormControl';
import { DeleteAPIPath } from '../../ShipmentOrderTypeWorkflow/constants';
import DataGrid from "../../../../../../common/components/DataGrid";
import { GetMLObjectData } from "../../../../../../common/library/form/FormLib";
import { Prompt } from 'react-router';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { convertNodeToElement } from "react-html-parser";
import Collapsible from 'react-collapsible';
import { callGetCache, callClearLocalCache } from "../../../../../../actions/cacheAction";
import {
    ERPCOMMONCACHE_SHIPMENTORDERTYPE, ERPCOMMONCACHE_PARTNER, ERPCOMMONCACHE_SHIPMENTORDERSTATUS, ERPCOMMONCACHE_FUNCTION, ERPCOMMONCACHE_SUBGROUPTECHSPECS, ERPCOMMONCACHE_TECHSPECSVALUE, ERPCOMMONCACHE_SERVICEGROUP, ERPUSERCACHE_PAYABLETYPE, ERPCOMMONCACHE_SHIPMENTORDERTYPE_WF, ERPCOMMONCACHE_SHIPMENTOT_WF_NEXT
} from "../../../../../../constants/keyCache";

import FixShipmentFee from "../../FixShipmentFee/";
import FlexShipmentFee from "../../FlexShipmentFee/";
import { SHIPMENTORDERTYPE_UPDATE } from "../../../../../../constants/functionLists";

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
        this.getCachePartner = this.getCachePartner.bind(this);
        this.getCacheShipmentStatus = this.getCacheShipmentStatus.bind(this);
        this.changeSelecPartner = this.changeSelecPartner.bind(this);
        this.changeSelectShipmentStatus = this.changeSelectShipmentStatus.bind(this);
        this.changeSelectServiceGroup = this.changeSelectServiceGroup.bind(this);
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
                ShipmentOrderType: {},
                ShipmentOrderTypeWorkflow: [],
                ShipmentOrderTypeFixShipmentFee: [],
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
            if (!apiResult.IsError) {
                this.props.callClearLocalCache(ERPCOMMONCACHE_SHIPMENTORDERTYPE_WF);
                this.props.callClearLocalCache(ERPCOMMONCACHE_SHIPMENTOT_WF_NEXT);
            }
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
                ListStatus: this.state.ShipmentStatusList,
                ListServiceGroup: this.state.ServiceGroupList
            });
        param.AddFunctionID = param.AddFunctionID && Array.isArray(param.AddFunctionID) ? param.AddFunctionID[0] : param.AddFunctionID;
        param.MTOuputPayableTypeID = param.MTOuputPayableTypeID && Array.isArray(param.MTOuputPayableTypeID) ? param.MTOuputPayableTypeID[0] : param.MTOuputPayableTypeID;
        param.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        param.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
        if (param.ShipmentOrderTypeWorkflow) {
            param.ShipmentOrderTypeWorkflow.forEach(function (item, index) {
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
                        this.props.callClearLocalCache(ERPCOMMONCACHE_SHIPMENTORDERTYPE);
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
                    this.props.callClearLocalCache(ERPCOMMONCACHE_SHIPMENTORDERTYPE);
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
        this.props.callGetCache(ERPCOMMONCACHE_PARTNER).then((apiResult) => {
            if (!apiResult.IsError && apiResult.ResultObject.CacheData != null) {
                PartnerList = apiResult.ResultObject.CacheData;
            }
            this.setState({
                PartnerCache: PartnerList
            });
            //console.log("SysUserList", SysUserList);
        });

        let ServiceGroupList = [];
        this.props.callGetCache(ERPCOMMONCACHE_SERVICEGROUP).then((apiResult) => {
            if (!apiResult.IsError && apiResult.ResultObject.CacheData != null) {
                ServiceGroupList = apiResult.ResultObject.CacheData;
            }
            this.setState({
                ServiceGroupCache: ServiceGroupList
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
        this.props.callGetCache(ERPCOMMONCACHE_SHIPMENTORDERSTATUS).then((apiResult) => {
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

                //nhóm dịch vụ
                let selectedOptionServiceGroup = [];
                let listServiceGroup = [];
                if (apiResult.ResultObject.ListServiceGroup) {
                    listServiceGroup = apiResult.ResultObject.ListServiceGroup;
                    apiResult.ResultObject.ListServiceGroup.map(row => {
                        selectedOptionServiceGroup.push({ value: row.ServiceGroupID, label: row.ServiceGroupName });
                    })
                }

                //loại chi phí vận chuyển
                let _shipmentFeeType = [];
                if (apiResult.ResultObject.ShipmentFeeType) {
                    _shipmentFeeType = apiResult.ResultObject.ShipmentFeeType;
                }

                //chi phí vận chuyển cố định
                let _ShipmentOrderTypeFixShipmentFee = [];
                if (apiResult.ResultObject.ShipmentOrderTypeFixShipmentFee) {
                    _ShipmentOrderTypeFixShipmentFee = apiResult.ResultObject.ShipmentOrderTypeFixShipmentFee;
                }

                //chi phí vận chuyển thay đổi
                let _ShipmentOrderTypeFlexShipmentFee = [];
                if (apiResult.ResultObject.ShipmentOrderTypeFlexShipmentFee) {
                    _ShipmentOrderTypeFlexShipmentFee = this.initFlexShipmentFeeDatasource(apiResult.ResultObject.ShipmentOrderTypeFlexShipmentFee);
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
                            ShipmentOrderTypeFixShipmentFee: _ShipmentOrderTypeFixShipmentFee,
                            ShipmentOrderTypeFlexShipmentFee: _ShipmentOrderTypeFlexShipmentFee,
                            ShipmentFeeType: _shipmentFeeType
                        },
                        SelectedPartnerList: selectedOptionPartner,
                        SelectedShipmentStatusList: selectedOptionStatus,
                        SelectedServiceGroupList: selectedOptionServiceGroup,
                        PartnerList: listPartner,
                        ShipmentStatusList: listStatus,
                        ServiceGroupList: listServiceGroup
                    });
                }
                else {
                    this.setState({
                        FormData: {
                            ShipmentOrderType: apiResult.ResultObject,
                            ShipmentOrderTypeWorkflow: [],
                            ShipmentOrderTypeFixShipmentFee: _ShipmentOrderTypeFixShipmentFee,
                            ShipmentOrderTypeFlexShipmentFee: _ShipmentOrderTypeFlexShipmentFee,
                            ShipmentFeeType: _shipmentFeeType
                        },
                        SelectedPartnerList: selectedOptionPartner,
                        SelectedShipmentStatusList: selectedOptionStatus,
                        SelectedServiceGroupList: selectedOptionServiceGroup,
                        PartnerList: listPartner,
                        ShipmentStatusList: listStatus,
                        ServiceGroupList: listServiceGroup
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


    changeSelectServiceGroup(name, listSelect) {
        let ServiceGroupList = [];
        listSelect.map(item => {
            const itemMatch = this.state.ServiceGroupCache.filter(x => { return x.ServiceGroupID == item });
            ServiceGroupList.push(itemMatch[0]);
        })
        this.setState({ ServiceGroupList });
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
                    RequirePermission={SHIPMENTORDERTYPE_UPDATE}
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
                                value={this.state.FormData.ShipmentOrderType && this.state.FormData.ShipmentOrderType.AddFunctionID ? this.state.FormData.ShipmentOrderType.AddFunctionID : null}
                            //onValueChangeCus={this.changeSelecPartner}
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

                            <FormControl.CheckBox label="Có bao gồm lắp đặt" name="IsIncludeInstall"
                                datasourcemember="IsIncludeInstall" controltype="InputControl"
                                labelcolspan={4} colspan={8} rowspan={8}
                            />

                            <FormControl.CheckBox label="Có bắt buộc nhập mã đơn hàng đối tác" name="IsRequireSaleOrderID"
                                datasourcemember="IsRequireSaleOrderID" controltype="InputControl"
                                labelcolspan={4} colspan={8} rowspan={8}
                            />

                            <FormControl.CheckBox label="Có check trùng mã đơn hàng đối tác" name="IsCheckDuplicateSaleOrderID"
                                datasourcemember="IsCheckDuplicateSaleOrderID" controltype="InputControl"
                                labelcolspan={4} colspan={8} rowspan={8}
                            />

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

                            <FormControl.MultiSelectComboBox name="ServiceGroupID" label="Danh sách nhóm dịch vụ"
                                labelcolspan={4} colspan={8} rowspan={8}
                                IsLabelDiv={true} controltype="InputControl"
                                isautoloaditemfromcache={true} loaditemcachekeyid={ERPCOMMONCACHE_SERVICEGROUP} valuemember="ServiceGroupID" nameMember="ServiceGroupName"
                                listoption={[]} datasourcemember="ServiceGroupID"
                                SelectedOption={this.state.SelectedServiceGroupList ? this.state.SelectedServiceGroupList : []}
                                onValueChangeCus={this.changeSelectServiceGroup}
                            />


                            <FormControl.MultiSelectComboBox name="MTOuputPayableTypeID" label="Hình thức thanh toán của yêu cầu xuất dịch vụ"
                                labelcolspan={4} colspan={8} rowspan={8}
                                IsLabelDiv={true} controltype="InputControl"
                                isautoloaditemfromcache={true} loaditemcachekeyid={ERPUSERCACHE_PAYABLETYPE} valuemember="PayableTypeID" nameMember="PayableTypeName"
                                listoption={[]} datasourcemember="MTOuputPayableTypeID"
                                isMulti={false}
                            //SelectedOption={this.state.SelectedServiceGroupList ? this.state.SelectedServiceGroupList : []}
                            //onValueChangeCus={this.changeSelectServiceGroup}
                            />


                            {/* <FormControl.ComboBox
                                name="MTOuputPayableTypeID"
                                type="select"
                                isautoloaditemfromcache={true}
                                loaditemcachekeyid={ERPUSERCACHE_PAYABLETYPE}
                                valuemember="PayableTypeID"
                                nameMember="PayableTypeName"
                                label="Hình thức thanh toán của yêu cầu xuất dịch vụ"
                                controltype="InputControl"
                                listoption={[]}
                                datasourcemember="MTOuputPayableTypeID"
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
                        <TabPage title="Chi phí vận chuyển" name="ShipmentOrderType_FixShipmentFee">
                            <FixShipmentFee
                                ShipmentOrderTypeFixShipmentFee={this.state.FormData.ShipmentOrderTypeFixShipmentFee}
                                ShipmentFeeType={this.state.FormData.ShipmentFeeType}
                                ShipmentOrderTypeID={this.state.FormData.ShipmentOrderType.ShipmentOrderTypeID}
                                onFixShipmentFeeComplete={(data) => this.onWorkflowPopupSubmit(data)}
                            />

                            <br />

                            <FlexShipmentFee
                                ShipmentOrderTypeFlexShipmentFee={this.state.FormData.ShipmentOrderTypeFlexShipmentFee}
                                ShipmentFeeType={this.state.FormData.ShipmentFeeType}
                                ShipmentOrderTypeID={this.state.FormData.ShipmentOrderType.ShipmentOrderTypeID}
                                TechspecsCache={this.state.Techspecs}
                                TechspecsValueCache={this.state.TechspecsValue}
                                onFlexShipmentFeeComplete={(data) => this.onWorkflowPopupSubmit(data)}
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