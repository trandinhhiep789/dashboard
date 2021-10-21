import React from "react";
import { connect } from "react-redux";
import ReactNotification from "react-notifications-component";
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';

import {
    APIDAStoreGoodsGroupDelete,
    APIDAStoreGoodsGroupLoadList,
    APIHostName,
    listColumnDAStoreGoodsGroup,
    MLObjectDefinitionModal,
} from "../constants";

import {
    AddDAStoreGoodsGroup
} from '../../DeliveryAbilityStore/constants';

import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { MessageModal } from "../../../../../common/components/Modal";
import { MODAL_TYPE_COMMONTMODALS } from '../../../../../constants/actionTypes';
import { showModal, hideModal } from '../../../../../actions/modal';
import DataGrid from "../../../../../common/components/DataGrid";
import FormContainer from "../../../../../common/components/FormContainer";
import FormControl from "../../../../../common/components/FormContainer/FormControl";

class DataGridCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: null
        };

        this.addNotification = this.addNotification.bind(this);
        this.callSearchData = this.callSearchData.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleInsertClick = this.handleInsertClick.bind(this);
        this.handleSubmitModalAdd = this.handleSubmitModalAdd.bind(this);
        this.notificationDOMRef = React.createRef();
        this.showMessage = this.showMessage.bind(this);
    }

    componentDidMount() {
        this.callSearchData();
    }

    handleDeleteClick(listDeleteID, ListPKColumnName) {
        const deleteData = listDeleteID.map(item => {
            return {
                DeliveryAbilityStoreID: item.pkColumnName[0].value,
                DeliveryGoodsGroupID: item.pkColumnName[1].value,
            }
        })

        this.props.callFetchAPI(APIHostName, APIDAStoreGoodsGroupDelete, deleteData).then(apiResult => {
            if (apiResult.IsError) {
                this.addNotification(apiResult.Message, apiResult.IsError);
            } else {
                this.callSearchData();
            }
        });
    }

    handleInsertClick() {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Thêm tỷ lệ phân bổ tải theo từng kho',
            content: {
                text: <FormContainer
                    IsCloseModal={true}
                    listelement={[]}
                    MLObjectDefinition={MLObjectDefinitionModal}
                    onSubmit={this.handleSubmitModalAdd}
                >
                    <div className="row">
                        {/* <div className="col-md-12">
                            <FormControl.FormControlComboBox
                                // filterrest="DeliveryAbilityStoreID"
                                colspan="8"
                                controltype="InputControl"
                                datasourcemember="DeliveryAbilityStoreID"
                                isautoloaditemfromcache={true}
                                label="Kho lấy tải"
                                labelcolspan="4"
                                listoption={null}
                                loaditemcachekeyid={"ERPCOMMONCACHE.DELIVERYABILITYSTORE"}
                                name="DeliveryAbilityStoreID"
                                nameMember="DeliveryAbilityStoreName"
                                placeholder="-- Vui lòng chọn --"
                                validatonList={["Comborequired"]}
                                value={""}
                                valuemember="DeliveryAbilityStoreID"
                            />
                        </div> */}
                        <div className="col-md-12">
                            <FormControl.FormControlComboBox
                                // filterrest="DeliveryGoodsGroupID"
                                colspan="8"
                                controltype="InputControl"
                                datasourcemember="DeliveryGoodsGroupID"
                                isautoloaditemfromcache={true}
                                label="Nhóm hàng hóa vận chuyển"
                                labelcolspan="4"
                                listoption={null}
                                loaditemcachekeyid={"MDMCOMMONCACHE.DELIVERYGOODSGROUP"}
                                name="DeliveryGoodsGroupID"
                                nameMember="DeliveryGoodsGroupName"
                                placeholder="-- Vui lòng chọn --"
                                validatonList={["Comborequired"]}
                                value={""}
                                valuemember="DeliveryGoodsGroupID"
                            />
                        </div>
                        <div className="col-md-12">
                            <FormControl.TextBox
                                colspan="8"
                                controltype="InputControl"
                                datasourcemember="ApportionFactor"
                                label="Tỷ lệ phân bổ (theo phần trăm)"
                                labelcolspan="4"
                                maxSize="7"
                                name="ApportionFactor"
                                placeholder={"Số nguyên hoặc thập phân < 100"}
                                readOnly={false}
                                validatonList={["required", "numberDecimal"]}
                                value={""}
                            />
                        </div>
                        <div className="col-md-12">
                            <FormControl.TextBox
                                // validatonList={['required']}
                                colspan="8"
                                controltype="InputControl"
                                datasourcemember="Note"
                                label="ghi chú"
                                labelcolspan="4"
                                maxSize={2000}
                                name="Note"
                                placeholder="Ghi chú"
                                readOnly={false}
                                value=""
                            />
                        </div>
                        <div className="col-md-12">
                            <FormControl.CheckBox
                                classNameCustom="customCheckbox"
                                colspan="8"
                                controltype="InputControl"
                                datasourcemember="IsActived"
                                label="Kích hoạt"
                                labelcolspan="4"
                                name="IsActived"
                                value={true}
                            />
                        </div>
                        <div className="col-md-12">
                            <FormControl.CheckBox
                                classNameCustom="customCheckbox"
                                colspan="8"
                                controltype="InputControl"
                                datasourcemember="IsSystem"
                                label="Hệ thống"
                                labelcolspan="4"
                                name="IsSystem"
                                value={false}
                            />
                        </div>
                    </div>
                </FormContainer>
            },
            maxWidth: '800px'
        });
    }

    handleSubmitModalAdd(FormData, MLObject) {
        if (parseFloat(MLObject.ApportionFactor) > 100) {
            this.addNotification("Tỷ lệ phân bổ phải nhỏ hơn 100", true);
        } else {
            const submitData = [{
                ...MLObject,
                DeliveryAbilityStoreID: parseInt(this.props.deliveryAbilityStoreID),
                ApportionFactor: parseFloat(MLObject.ApportionFactor)
            }]

            this.props.callFetchAPI(APIHostName, AddDAStoreGoodsGroup, submitData).then(apiResult => {
                if (apiResult.IsError) {
                    this.showMessage(apiResult.Message);
                } else {
                    this.callSearchData();
                    this.props.hideModal();
                }
            });
        }
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

    addNotification(message, IsError) {
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
                        <p className="notification-message">{message}</p>
                    </div>
                </div>
            ),
            dismiss: { duration: 6000 },
            dismissable: { click: true }
        });
    }

    callSearchData() {
        if (this.props.deliveryAbilityStoreID == null) {
            this.addNotification("Lỗi nạp danh sách tỷ lệ phân bổ tải theo từng kho", true);
        } else {
            this.props.callFetchAPI(APIHostName, APIDAStoreGoodsGroupLoadList, this.props.deliveryAbilityStoreID).then(apiResult => {
                if (apiResult.IsError) {
                    this.addNotification(apiResult.Message, true);
                } else {
                    const updateDataSource = apiResult.ResultObject.map(item => {
                        return {
                            ...item,
                            DeliveryAbilityStoreIDName: `${item.DeliveryAbilityStoreID} - ${item.DeliveryAbilityStoreName}`,
                            DeliveryGoodsGroupIDName: `${item.DeliveryGoodsGroupID} - ${item.DeliveryGoodsGroupName}`,
                            UpdatedUserIDName: `${item.UpdatedUser} - ${item.UpdatedUserName}`
                        }
                    })
                    this.setState({
                        dataSource: updateDataSource
                    })
                }
            });
        }
    }

    render() {
        if (this.state.dataSource == null) {
            return <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
            </React.Fragment>
        } else {
            return (
                <div className="sub-grid detail">
                    <ReactNotification ref={this.notificationDOMRef} />

                    <DataGrid
                        dataSource={this.state.dataSource}
                        headingTitle="Danh sách tỷ lệ phân bố tải theo từng kho"
                        IDSelectColumnName={"chkSelect"}
                        IsAutoPaging={false}
                        IsCustomAddLink={true}
                        listColumn={listColumnDAStoreGoodsGroup}
                        onInsertClick={this.handleInsertClick}
                        PKColumnName={"DeliveryAbilityStoreID,DeliveryGoodsGroupID"}
                        onDeleteClick={this.handleDeleteClick}
                    />
                </div>
            );
        }
    }
}

DataGridCom.defaultProps = {
    deliveryAbilityStoreID: null
}

const mapStateToProps = state => {
    return {
        AppInfo: state,
        FetchAPIInfo: state.FetchAPIInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: (type, props) => {
            dispatch(hideModal(type, props));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGridCom);