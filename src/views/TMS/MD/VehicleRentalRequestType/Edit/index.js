import React from "react";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import ReactNotification from "react-notifications-component";
import { Prompt } from 'react-router';

import {
    APIHostName,
    BackLink,
    EditAPIPath,
    EditPagePath,
    IDSelectColumnName,
    LoadAPIPath,
    EditMLObjectDefinition,
    MLObjectDefinitionVehicleRentalRequestType,
    RentalRequestType_WFMLObjectDefinition,
    RentalRequestType_WFListColumn,
    DelAPIPath_RentalRequestType_WF
} from "../constants";

import { ERPCOMMONCACHE_FUNCTION } from '../../../../../constants/keyCache';

import { MODAL_TYPE_COMMONTMODALS } from '../../../../../constants/actionTypes';
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { callGetCache } from "../../../../../actions/cacheAction";
import { MessageModal } from "../../../../../common/components/Modal";
import { showModal, hideModal } from '../../../../../actions/modal';
import { updatePagePath } from "../../../../../actions/pageAction";
import TabContainer from "../../../../../common/components/Tabs/TabContainer";
import TabPage from "../../../../../common/components/Tabs/TabPage";
import FormContainer from '../../../../../common/components/Form/AdvanceForm/FormContainer';
import FormControl from '../../../../../common/components/Form/AdvanceForm/FormControl';
import VehicleRentalRequestType_WFAdd from './VehicleRentalRequestType_WFAdd';
import VehicleRentalRequestType_WFEdit from './VehicleRentalRequestType_WFEdit';
import InputGrid from '../../../../../common/components/Form/AdvanceForm/FormControl/InputGrid';

class EditCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            objVehicleRentalRequestType: null,
            isPrompt: false,
            isEdited: false

        };

        this.searchref = React.createRef();
        this.gridref = React.createRef();
        this.notificationDOMRef = React.createRef();

        this.addNotification = this.addNotification.bind(this);
        this.fetchVehicleRentalRequestTypeInfo = this.fetchVehicleRentalRequestTypeInfo.bind(this);
        this.handleDeleteRentalRequestType_WF = this.handleDeleteRentalRequestType_WF.bind(this);
        this.handleEditRentalRequestType_WF = this.handleEditRentalRequestType_WF.bind(this);
        this.handleInputChangeList = this.handleInputChangeList.bind(this);
        this.handleInsertRentalRequestType_WF = this.handleInsertRentalRequestType_WF.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showMessage = this.showMessage.bind(this);
    }

    componentDidMount() {
        this.props.updatePagePath(EditPagePath);
        this.fetchVehicleRentalRequestTypeInfo();
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

    fetchVehicleRentalRequestTypeInfo() {
        this.props.callFetchAPI(APIHostName, LoadAPIPath, this.props.match.params.id).then(apiResult => {
            if (apiResult.IsError) {
                this.showMessage(apiResult.Message);
            } else {
                // const uptRentalRequestType_WFList = apiResult.ResultObject.RentalRequestType_WFList.map(item => {
                //     return {
                //         ...item,
                //         VehicleRentalRequestStepIDName: `${item.VehicleRentalRequestStepID} - ${item.VehicleRentalRequestStepName}`,
                //         AutoChangetoStatusIDName: `${item.AutoChangetoStatusID} - ${item.AutoChangetoStatusName}`,
                //         AutoChangetoStepIDName: item.AutoChangetoStepID > 0 ? `${item.AutoChangetoStepID} - ${item.AutoChangetoStepName}` : "",
                //         AutoChangeStepTypeName: item.AutoChangeStepType ? "Chuyển bước không điều kiện" : "Không tự động",
                //     }
                // })
                this.setState({
                    // objVehicleRentalRequestType: {
                    //     ...apiResult.ResultObject,
                    //     RentalRequestType_WFList: uptRentalRequestType_WFList
                    // }
                    objVehicleRentalRequestType: apiResult.ResultObject
                })
            }
        })
    }

    handleDeleteRentalRequestType_WF(deleteList) {
        const uptDeteteList = deleteList.map(item => {
            return {
                VehicleRentalRequestTypeID: parseInt(this.props.match.params.id),
                VehicleRentalRequestStepID: item[0].value
            }
        })

        this.props.callFetchAPI(APIHostName, DelAPIPath_RentalRequestType_WF, uptDeteteList).then(apiResult => {
            this.showMessage(apiResult.Message);
            if (!apiResult.IsError) {
                this.fetchVehicleRentalRequestTypeInfo();
            }
        });
    }

    handleEditRentalRequestType_WF(index) {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Chỉnh sửa bước yêu cầu thuê phương tiện',
            content: {
                text: <VehicleRentalRequestType_WFEdit
                    VehicleRentalRequestTypeID={this.props.match.params.id}
                    objRentalRequestType_WF={this.state.objVehicleRentalRequestType.RentalRequestType_WFList[index]}
                    fetchVehicleRentalRequestTypeInfo={() => this.fetchVehicleRentalRequestTypeInfo()}
                />
            },
            maxWidth: '90%'
        });
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

    handleInsertRentalRequestType_WF() {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Thêm mới bước yêu cầu thuê phương tiện',
            content: {
                text: <VehicleRentalRequestType_WFAdd
                    VehicleRentalRequestTypeID={this.props.match.params.id}
                    fetchVehicleRentalRequestTypeInfo={() => this.fetchVehicleRentalRequestTypeInfo()}
                />
            },
            maxWidth: '90%'
        });

    }

    handleSubmit(formData, MLObject) {
        const uptMLObject = {
            ...MLObject.VehicleRentalRequestType,
            // AddFunctionID: MLObject.VehicleRentalRequestType.AddFunctionID.length == 1 ? MLObject.VehicleRentalRequestType.AddFunctionID[0] : MLObject.VehicleRentalRequestType.AddFunctionID,
            AddFunctionID: MLObject.VehicleRentalRequestType.AddFunctionID.length == 1 ? MLObject.VehicleRentalRequestType.AddFunctionID[0] : (MLObject.VehicleRentalRequestType.AddFunctionID.length == 0 ? -1 : MLObject.VehicleRentalRequestType.AddFunctionID)
        }

        this.props.callFetchAPI(APIHostName, EditAPIPath, uptMLObject).then(apiResult => {
            this.showMessage(apiResult.Message);
            if (!apiResult.IsError) {
                this.setState({
                    isPrompt: false,
                    isEdited: false
                })
                this.props.history.push(BackLink);
            }
        });
    }

    render() {
        if (this.state.objVehicleRentalRequestType == null) {
            return (
                <React.Fragment>
                    <ReactNotification ref={this.notificationDOMRef} />
                    Đang nạp dữ liệu ...
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <ReactNotification ref={this.notificationDOMRef} />

                    <Prompt
                        when={this.state.isPrompt}
                        message='Bạn có chắc chắn muốn rời trang?'
                    />

                    <FormContainer
                        BackLink={BackLink}
                        IsAutoLayout={true}
                        listelement={[]}
                        MLObjectDefinition={EditMLObjectDefinition}
                        onSubmit={this.handleSubmit}
                        onInputChangeList={this.handleInputChangeList}
                    >
                        <TabContainer
                            controltype="TabContainer"
                            defaultActiveTabIndex={0}
                            IsAutoLayout={true}
                            IsAutoLoadDataGrid={true}
                        >
                            <TabPage
                                datasource={this.state.objVehicleRentalRequestType}
                                MLObjectDefinition={MLObjectDefinitionVehicleRentalRequestType}
                                name="VehicleRentalRequestType"
                                title="Loại yêu cầu thuê phương tiện"
                            >
                                <FormControl.TextBox
                                    controltype="InputControl"
                                    datasourcemember="VehicleRentalRequestTypeID"
                                    label="Mã loại yêu cầu thuê phương tiện"
                                    name="VehicleRentalRequestTypeID"
                                    readonly={true}
                                    value=""
                                />

                                <FormControl.TextBox
                                    controltype="InputControl"
                                    datasourcemember="VehicleRentalRequestTypeName"
                                    label="Tên loại yêu cầu thuê phương tiện"
                                    name="VehicleRentalRequestTypeName"
                                    value=""
                                    isRequired={true}
                                />

                                <FormControl.MultiSelectComboBox
                                    controltype="InputControl"
                                    datasourcemember="AddFunctionID"
                                    isautoloaditemfromcache={true}
                                    IsLabelDiv={true}
                                    isMulti={false}
                                    KeyFilter="FunctionCategoryID"
                                    label="Quyền thêm"
                                    listoption={[]}
                                    loaditemcachekeyid={ERPCOMMONCACHE_FUNCTION}
                                    name="AddFunctionID"
                                    nameMember="FunctionName"
                                    value={""}
                                    ValueFilter="1,2"
                                    valuemember="FunctionID"
                                    // validatonList={["Comborequired"]}
                                    validatonList={[]}
                                    IsSystem={this.state.objVehicleRentalRequestType.IsSystem}
                                />

                                <FormControl.TextBox
                                    controltype="InputControl"
                                    datasourcemember="OrderIndex"
                                    label="Thứ Tự Hiển Thị"
                                    name="OrderIndex"
                                    value=""
                                />

                                <FormControl.TextArea
                                    controltype="InputControl"
                                    datasourcemember="Description"
                                    label="Mô tả"
                                    name="Description"
                                />

                                <FormControl.CheckBox
                                    datasourcemember="IsActived"
                                    label="Kích hoạt"
                                    name="IsActived"
                                    controltype="InputControl"
                                />

                                <FormControl.CheckBox
                                    controltype="InputControl"
                                    datasourcemember="IsSystem"
                                    label="Hệ thống"
                                    name="IsSystem"
                                />
                            </TabPage>

                            <TabPage title="Quy trình" name="RentalRequestType_WF">
                                <InputGrid
                                    controltype="GridControl"
                                    dataSource={this.state.objVehicleRentalRequestType.RentalRequestType_WFList}
                                    IDSelectColumnName={IDSelectColumnName}
                                    isUseValueInputControl={true}
                                    listColumn={RentalRequestType_WFListColumn}
                                    MLObjectDefinition={RentalRequestType_WFMLObjectDefinition}
                                    name="RentalRequestType_WF"
                                    onDeleteClick_Customize={this.handleDeleteRentalRequestType_WF}
                                    onInsertClick={this.handleInsertRentalRequestType_WF}
                                    onInsertClickEdit={this.handleEditRentalRequestType_WF}
                                    PKColumnName="VehicleRentalRequestStepID"
                                />
                            </TabPage>
                        </TabContainer>
                    </FormContainer>
                </React.Fragment>
            )
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(EditCom);