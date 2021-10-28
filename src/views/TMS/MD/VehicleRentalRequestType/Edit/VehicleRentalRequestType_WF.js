import React from "react";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import ReactNotification from "react-notifications-component";
import { Prompt } from 'react-router';

import {
    APIHostName,
    BackLink,
    EditAPIPath,
    EditElementList,
    EditPagePath,
    LoadAPIPath,
    EditMLObjectDefinition,
    MLObjectDefinitionVehicleRentalRequestType,
    IDSelectColumnName,
    listColumnRentalRequestType_WF,
    MLObjectDefinitionFormContainerVehicleRentalRequestType_WF,
    MLObjectDefinitionVehicleRentalRequestType_WF,
    RentalRequestType_WF_NextListColumn,
    RentalRequestType_WF_NextMLObjectDefinition,
    AddAPIPath_RentalRequestType_WF,
} from "../constants";

import {
    ERPCOMMONCACHE_FUNCTION,
    ERPCOMMONCACHE_VEHICLERENTALREQSTEP,
    ERPCOMMONCACHE_VEHICLERENTALSTATUS,
    ERPCOMMONCACHE_SHIPMENTORDERSTEP
} from '../../../../../constants/keyCache';

import { MODAL_TYPE_COMMONTMODALS } from '../../../../../constants/actionTypes';
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { callGetCache } from "../../../../../actions/cacheAction";
import { MessageModal } from "../../../../../common/components/Modal";
import { showModal, hideModal } from '../../../../../actions/modal';
import { updatePagePath } from "../../../../../actions/pageAction";
import SimpleForm from "../../../../../common/components/Form/SimpleForm";
import TabContainer from "../../../../../common/components/Tabs/TabContainer";
import TabPage from "../../../../../common/components/Tabs/TabPage";
import FormContainer from '../../../../../common/components/Form/AdvanceForm/FormContainer';
import FormControl from '../../../../../common/components/Form/AdvanceForm/FormControl';
import DataGrid from "../../../../../common/components/DataGrid";
import InputGrid from '../../../../../common/components/Form/AdvanceForm/FormControl/InputGrid';

class VehicleRentalRequestType_WFCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            VehicleRentalRequestStepCache: [],
            FunctionCache: [],
            NextVehicleRentalRequestTypeStep: -1,
            NextVehicleRentalRequestTypeStepName: null,
            ChooseFuntionID: -1,
            ChooseFuntionName: null,
            lstRentalRequestType_WF_Next: this.props.lstRentalRequestType_WF_Next
        };

        this.searchref = React.createRef();
        this.gridref = React.createRef();
        this.notificationDOMRef = React.createRef();

        this.addNotification = this.addNotification.bind(this);
        this.showMessage = this.showMessage.bind(this);

        this.handleCallGetCache = this.handleCallGetCache.bind(this);
        this.handleChangeChooseFuntionID = this.handleChangeChooseFuntionID.bind(this)
        this.handleChangeVehicleRentalRequestStepID = this.handleChangeVehicleRentalRequestStepID.bind(this);
        this.handleDeleteRentalRequestType_WF_Next = this.handleDeleteRentalRequestType_WF_Next.bind(this);
        this.handleInputChangeList = this.handleInputChangeList.bind(this);
        this.handleInsertRentalRequestType_WF_Next = this.handleInsertRentalRequestType_WF_Next.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.handleCallGetCache();
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

    handleCallGetCache() {
        const vehicleRentalRequestStepPromise = new Promise((resolve, reject) => {
            this.props.callGetCache(ERPCOMMONCACHE_VEHICLERENTALREQSTEP).then((result) => {
                if (!result.IsError && result.ResultObject.CacheData != null) {
                    resolve(result.ResultObject.CacheData);
                } else {
                    reject([]);
                }
            })
        })

        const functionPromise = new Promise((resolve, reject) => {
            this.props.callGetCache(ERPCOMMONCACHE_FUNCTION).then((result) => {
                if (!result.IsError && result.ResultObject.CacheData != null) {
                    resolve(result.ResultObject.CacheData);
                } else {
                    reject([]);
                }
            })
        })

        Promise.all([vehicleRentalRequestStepPromise, functionPromise]).then((values) => {
            this.setState({
                VehicleRentalRequestStepCache: values[0],
                FunctionCache: values[1]
            })
        }).catch(err => this.showMessage("Lỗi tải dữ liệu"));
    }

    handleChangeChooseFuntionID(name, value) {
        const found = this.state.FunctionCache.find(item => item.FunctionID == value);
        this.setState({
            ChooseFuntionID: found.FunctionID,
            ChooseFuntionName: found.FunctionName
        })
    }

    handleChangeVehicleRentalRequestStepID(name, value) {
        const found = this.state.VehicleRentalRequestStepCache.find(item => item.VehicleRentalRequestStepID == value);
        this.setState({
            NextVehicleRentalRequestTypeStep: found.VehicleRentalRequestStepID,
            NextVehicleRentalRequestTypeStepName: found.VehicleRentalRequestStepName
        })
    }

    handleDeleteRentalRequestType_WF_Next(deleteList, dataSource) {
        const DeleteList = deleteList.map(item => {
            return {
                [item[0].key]: item[0].value
            }
        })

        const uptLstRentalRequestType_WF_Next = this.state.lstRentalRequestType_WF_Next.reduce((acc, val) => {
            const indexFind = DeleteList.findIndex(item => item.NextVehicleRentalRequestTypeStep == val.NextVehicleRentalRequestTypeStep);

            if (indexFind == -1) {
                return [...acc, val];
            } else {
                return acc;
            }
        }, []);

        this.setState({
            lstRentalRequestType_WF_Next: uptLstRentalRequestType_WF_Next
        })
    }

    handleInputChangeList() {

    }

    handleInsertRentalRequestType_WF_Next() {
        if (this.state.NextVehicleRentalRequestTypeStep == -1) {
            this.addNotification("Vui lòng chọn Mã Bước Yêu Cầu Thuê Phương Tiện", true);
            return;
        } else {
            if (this.state.lstRentalRequestType_WF_Next.length != 0) {
                const indexFind = this.state.lstRentalRequestType_WF_Next.findIndex(item => item.NextVehicleRentalRequestTypeStep == this.state.NextVehicleRentalRequestTypeStep);

                if (indexFind != -1) {
                    this.addNotification("Dữ liệu đã tồn tại", true);
                    return;
                }
            }
        }

        if (this.state.ChooseFuntionID == -1) {
            this.addNotification("Vui lòng chọn Quyền Thêm", true);
            return;
        }

        const uptLstRentalRequestType_WF_Next = [
            ...this.state.lstRentalRequestType_WF_Next,
            {
                NextVehicleRentalRequestTypeStep: this.state.NextVehicleRentalRequestTypeStep,
                NextVehicleRentalRequestTypeStepName: this.state.NextVehicleRentalRequestTypeStepName,
                ChooseFuntionID: this.state.ChooseFuntionID,
                ChooseFuntionName: this.state.ChooseFuntionName
            }
        ]

        this.setState({
            lstRentalRequestType_WF_Next: uptLstRentalRequestType_WF_Next
        })
    }

    handleSubmit(formData, MLObject) {
        const RentalRequestType_WF_NextList = this.state.lstRentalRequestType_WF_Next.map(item => {
            return {
                NextVehicleRentalRequestTypeStep: item.NextVehicleRentalRequestTypeStep,
                VehicleRentalRequestTypeID: this.props.VehicleRentalRequestTypeID,
                VehicleRentalRequestStepID: MLObject.RentalRequestType_WF.VehicleRentalRequestStepID,
                ChooseFuntionID: item.ChooseFuntionID,
                IsActived: true
            }
        })
        const uptMLObject = {
            ...MLObject.RentalRequestType_WF,
            VehicleRentalRequestTypeID: this.props.VehicleRentalRequestTypeID,
            RentalRequestType_WF_NextList
        }

        console.log(uptMLObject);

        this.props.callFetchAPI(APIHostName, AddAPIPath_RentalRequestType_WF, uptMLObject).then(apiResult => {
            this.showMessage(apiResult.Message);
            if (!apiResult.IsError) {
                this.props.fetchVehicleRentalRequestTypeInfo()
                this.props.hideModal();
            }
        });
    }

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />

                <FormContainer
                    IsAutoLayout={true}
                    listelement={[]}
                    MLObjectDefinition={MLObjectDefinitionFormContainerVehicleRentalRequestType_WF}
                    onInputChangeList={this.handleInputChangeList}
                    onSubmit={this.handleSubmit}
                >
                    <TabContainer
                        controltype="TabContainer"
                        defaultActiveTabIndex={0}
                        IsAutoLayout={true}
                        IsAutoLoadDataGrid={true}
                    >
                        <TabPage
                            MLObjectDefinition={MLObjectDefinitionVehicleRentalRequestType_WF}
                            name="RentalRequestType_WF"
                            title="Thông tin chung"
                            datasource={this.props.objRentalRequestType_WF}
                        >
                            <FormControl.ComboBox
                                controltype="InputControl"
                                datasourcemember="VehicleRentalRequestStepID"
                                disable={false}
                                isautoloaditemfromcache={true}
                                isRequired={true}
                                isSystem={false}
                                label="Mã bước yêu cầu thuê phương tiện"
                                listoption={[]}
                                loaditemcachekeyid={ERPCOMMONCACHE_VEHICLERENTALREQSTEP}
                                name="VehicleRentalRequestStepID"
                                nameMember="VehicleRentalRequestStepName"
                                valuemember="VehicleRentalRequestStepID"
                                type="select"
                            />

                            <FormControl.ComboBox
                                controltype="InputControl"
                                datasourcemember="AutoChangetoStatusID"
                                disable={false}
                                isautoloaditemfromcache={true}
                                isRequired={true}
                                isSystem={false}
                                label="Tự động chuyển sang trạng thái"
                                listoption={[]}
                                loaditemcachekeyid={ERPCOMMONCACHE_VEHICLERENTALSTATUS}
                                name="AutoChangetoStatusID"
                                nameMember="VehicleRentalStatusName"
                                valuemember="VehicleRentalStatusID"
                                type="select"
                            />

                            <FormControl.ComboBox
                                controltype="InputControl"
                                datasourcemember="AutoChangetoStepID"
                                disable={false}
                                isautoloaditemfromcache={true}
                                isRequired={true}
                                isSystem={false}
                                label="Tự động chuyển sang bước"
                                listoption={[]}
                                loaditemcachekeyid={ERPCOMMONCACHE_VEHICLERENTALREQSTEP}
                                name="AutoChangetoStepID"
                                nameMember="VehicleRentalRequestStepName"
                                valuemember="VehicleRentalRequestStepID"
                            />

                            <FormControl.ComboBox
                                controltype="InputControl"
                                datasourcemember="AutoChangeStepType"
                                isautoloaditemfromcache={false}
                                isRequired={true}
                                label="Loại tự động chuyển bước"
                                name="AutoChangeStepType"
                                listoption={
                                    [
                                        { value: "-1", label: "--Vui lòng chọn--" },
                                        { value: "0", label: "Không tự động" },
                                        { value: "1", label: "Tự động chuyển bước không điều kiện" },
                                    ]
                                }
                            />

                            <FormControl.CheckBox
                                controltype="InputControl"
                                datasourcemember="IsInitStep"
                                name="IsInitStep"
                                label="Là bước khởi tạo"
                            />

                            <FormControl.CheckBox
                                controltype="InputControl"
                                datasourcemember="IsFinishStep"
                                name="IsFinishStep"
                                label="Là bước kết thúc"
                            />

                            <FormControl.TextArea
                                controltype="InputControl"
                                datasourcemember="Description"
                                label="Mô tả"
                                name="Description"
                            />

                            <FormControl.CheckBox
                                controltype="InputControl"
                                datasourcemember="IsAddToWorkingPlan"
                                name="IsAddToWorkingPlan"
                                label="Tự động thêm dữ liệu vào lịch làm việc"
                            />

                            <FormControl.CheckBox
                                controltype="InputControl"
                                datasourcemember="IsActived"
                                name="IsActived"
                                label="Kích hoạt"
                            />

                            <FormControl.CheckBox
                                controltype="InputControl"
                                datasourcemember="IsSystem"
                                name="IsSystem"
                                label="Hệ thống"
                            />
                        </TabPage>

                        <TabPage
                            name="RentalRequestType_WF_Next"
                            title="Bước xử lý kế tiếp"
                            MLObjectDefinition={[
                                {
                                    BindControlName: "RentalRequestType_WF_Next",
                                    DataSourceMember: "RentalRequestType_WF_Next",
                                    DefaultValue: "",
                                    Label: "danh sách bước xử lý kế tiếp",
                                    Name: "RentalRequestType_WF_Next",
                                }
                            ]}
                        >
                            <div className="form-row">
                                <FormControl.ComboBox
                                    // isRequired={true}
                                    colspan={9}
                                    controltype="InputControl"
                                    datasourcemember="VehicleRentalRequestStepID"
                                    disable={false}
                                    isautoloaditemfromcache={true}
                                    isSystem={false}
                                    label="Mã bước yêu cầu thuê phương tiện"
                                    labelcolspan={3}
                                    listoption={[]}
                                    loaditemcachekeyid={ERPCOMMONCACHE_VEHICLERENTALREQSTEP}
                                    name="VehicleRentalRequestStepID"
                                    nameMember="VehicleRentalRequestStepName"
                                    onValueChangeCus={this.handleChangeVehicleRentalRequestStepID}
                                    rowspan={6}
                                    type="select"
                                    valuemember="VehicleRentalRequestStepID"
                                />

                                <FormControl.MultiSelectComboBox
                                    // validatonList={["Comborequired"]}
                                    colspan={9}
                                    controltype="InputControl"
                                    datasourcemember="ChooseFuntionID"
                                    isautoloaditemfromcache={true}
                                    IsLabelDiv={true}
                                    isMulti={false}
                                    KeyFilter="FunctionCategoryID"
                                    label="Quyền thêm"
                                    labelcolspan={3}
                                    listoption={[]}
                                    loaditemcachekeyid={ERPCOMMONCACHE_FUNCTION}
                                    name="ChooseFuntionID"
                                    nameMember="FunctionName"
                                    onValueChangeCus={this.handleChangeChooseFuntionID}
                                    rowspan={6}
                                    ValueFilter="1,2"
                                    valuemember="FunctionID"
                                />
                            </div>

                            <InputGrid
                                controltype="GridControl"
                                dataSource={this.state.lstRentalRequestType_WF_Next}
                                IDSelectColumnName={IDSelectColumnName}
                                isUseValueInputControl={true}
                                listColumn={RentalRequestType_WF_NextListColumn}
                                MLObjectDefinition={RentalRequestType_WF_NextMLObjectDefinition}
                                name="RentalRequestType_WF_Next"
                                onDeleteClick_Customize={this.handleDeleteRentalRequestType_WF_Next}
                                onInsertClick={this.handleInsertRentalRequestType_WF_Next}
                                PKColumnName="NextVehicleRentalRequestTypeStep"
                            />

                        </TabPage>

                    </TabContainer>
                </FormContainer>
            </React.Fragment>
        )
    }
}

VehicleRentalRequestType_WFCom.defaultProps = {
    lstRentalRequestType_WF_Next: [],
    objRentalRequestType_WF: {
        IsActived: true
    },
    VehicleRentalRequestTypeID: 0
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

export default connect(mapStateToProps, mapDispatchToProps)(VehicleRentalRequestType_WFCom);