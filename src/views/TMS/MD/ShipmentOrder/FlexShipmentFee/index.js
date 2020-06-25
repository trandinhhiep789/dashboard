import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import { MessageModal } from "../../../../../common/components/Modal";
import DataGrid from "../../../../../common/components/DataGrid";
import { MODAL_TYPE_CONFIRMATION } from '../../../../../constants/actionTypes';
import { showModal, hideModal } from '../../../../../actions/modal';
import { GetMLObjectData } from "../../../../../common/library/form/FormLib";
import Collapsible from 'react-collapsible';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import {
    APIHostName,
    FlexShipmentFeeColumnList, ModalFlexShipmentFeeColumnList, ModalFlexShipmentFeeColumnList_Edit, MLObjectShipmentOrderType_FlexShipmentFee,
    AddAPIPath_FlexShipmentFee, UpdateAPIPath_FlexShipmentFee, DeleteAPIPath_FlexShipmentFee,
} from "./constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";
import {
    ERPCOMMONCACHE_SUBGROUPTECHSPECS, ERPCOMMONCACHE_TECHSPECSVALUE, ERPCOMMONCACHE_SUBGROUP, ERPCOMMONCACHE_MAINGROUP
} from "../../../../../constants/keyCache";


class FlexShipmentFeeCom extends React.Component {
    constructor(props) {
        super(props);
        this.addShipmentOrderType_FlexShipmentFeePopup = this.addShipmentOrderType_FlexShipmentFeePopup.bind(this);
        this.delete_ShipmentOrderType_FlexShipmentFee = this.delete_ShipmentOrderType_FlexShipmentFee.bind(this);
        this.editShipmentOrderType_FlexShipmentFeePopup = this.editShipmentOrderType_FlexShipmentFeePopup.bind(this);
        this.handleModalFlexShipmentFeeChange = this.handleModalFlexShipmentFeeChange.bind(this);
        this.initMultiSelectCombobox = this.initMultiSelectCombobox.bind(this);
        this.onClose = this.onClose.bind(this);
        this.resetCombobox = this.resetCombobox.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.notificationDOMRef = React.createRef();
        this.state = {
            IsCallAPIError: false,
            IsCloseForm: false,
            IsLoading: true,
            ShipmentOrderTypeFlexShipmentFee: this.props.ShipmentOrderTypeFlexShipmentFee ? this.props.ShipmentOrderTypeFlexShipmentFee : [],
            ShipmentFeeType: this.props.ShipmentFeeType ? this.props.ShipmentFeeType : [],
            ModalFlexShipmentFeeColumnList: ModalFlexShipmentFeeColumnList,
            ModalFlexShipmentFeeColumnList_Edit: ModalFlexShipmentFeeColumnList_Edit,
            IsInsert: true
        };
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.ShipmentOrderTypeFlexShipmentFee) != JSON.stringify(this.state.ShipmentOrderTypeFlexShipmentFee)) {
            this.setState({ ShipmentOrderTypeFlexShipmentFee: nextProps.ShipmentOrderTypeFlexShipmentFee });
        }
    }

    componentDidMount() {
        this.initMultiSelectCombobox();
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

    initMultiSelectCombobox() {
        //lấy cache ngành hàng
        this.props.callGetCache(ERPCOMMONCACHE_MAINGROUP).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                this.setState({
                    MainGroup: result.ResultObject.CacheData
                });
            }
        });

        //lấy cache nhóm hàng
        this.props.callGetCache(ERPCOMMONCACHE_SUBGROUP).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                this.setState({
                    SubGroup: result.ResultObject.CacheData
                });
            }
        });

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

    getDataCombobox(data, valueMember, nameMember, conditionName, conditionValue) {
        let listOption = [{ value: "-1", label: "------ Chọn ------" }];
        if (data) {
            data.map((cacheItem) => {
                if (conditionName && conditionValue != -1) {
                    if (cacheItem[conditionName] == conditionValue) {
                        listOption.push({ value: cacheItem[valueMember], label: cacheItem[nameMember], name: cacheItem[nameMember] });
                    }
                }
                // else {
                //     listOption.push({ value: cacheItem[valueMember], label: cacheItem[nameMember], name: cacheItem[nameMember] });
                // }
            });
            return listOption;
        }

    }

    resetCombobox() {
        this.state.ModalFlexShipmentFeeColumnList.forEach(function (objElement) {
            if (objElement.Name == "GetFeeType") {
                objElement.listoption = [{ value: "1", label: "Lấy giá trị cố định" }, { value: "2", label: "Lấy từ bảng làm giá" }];
            } else {
                objElement.listoption = [];
                objElement.value = "";
            }
        });

        this.state.ModalFlexShipmentFeeColumnList_Edit.forEach(function (objElement) {
            if (objElement.Name == "GetFeeType") {
                objElement.listoption = [{ value: "1", label: "Lấy giá trị cố định" }, { value: "2", label: "Lấy từ bảng làm giá" }];
            } else {
                objElement.listoption = [];
            }
        });
    }

    handleModalFlexShipmentFeeChange(formData, formValidation, elementName, elementValue) {

        //combobox getfeetype
        let shipmentFeeType = this.state.ShipmentFeeType;
        let getFeeType = "";
        let isInsert = this.state.IsInsert;
        let _ModalFlexShipmentFeeColumnList = isInsert ? this.state.ModalFlexShipmentFeeColumnList : this.state.ModalFlexShipmentFeeColumnList_Edit;
        if (elementName == "ShipmentFeeTypeID") {
            let match = shipmentFeeType.filter(x => x.ShipmentFeeTypeID == elementValue);
            if (match && match.length > 0) {
                getFeeType = match[0].GetFeeType;
            }
        }

        _ModalFlexShipmentFeeColumnList.forEach(function (objElement) {
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

        let listOptionNull = [{ value: "-1", label: "------ Chọn ------" }];
        let listOption = [];
        _ModalFlexShipmentFeeColumnList.forEach(function (objElement) {
            if (elementName == "MainGroupID") {
                if (objElement.Name == "MainGroupID") {
                    objElement.value = elementValue;
                }
                if (objElement.Name == "SubGroupID") {
                    listOption = this.getDataCombobox(this.state.SubGroup, "SubGroupID", "SubGroupName", "MainGroupID", elementValue);
                    objElement.listoption = listOption;
                    objElement.value = "-1";
                }
                if (objElement.Name == "TechspecsID") {
                    objElement.listoption = listOptionNull;
                    objElement.value = "-1";
                }
                if (objElement.Name == "TechspecsValueID") {
                    objElement.listoption = listOptionNull;
                    objElement.value = "-1";
                }
            } else if (elementName == "SubGroupID") {
                if (objElement.Name == "SubGroupID") {
                    objElement.value = elementValue;
                }
                if (objElement.Name == "TechspecsID") {
                    listOption = this.getDataCombobox(this.state.Techspecs, "TechspecsID", "TechspecsName", "SubGroupID", elementValue);
                    objElement.listoption = listOption;
                    objElement.value = "-1";
                }
                if (objElement.Name == "TechspecsValueID") {
                    objElement.listoption = listOptionNull;
                    objElement.value = "-1";
                }
            } else if (elementName == "TechspecsID") {
                if (objElement.Name == "TechspecsID") {
                    objElement.value = elementValue;
                }
                if (objElement.Name == "TechspecsValueID") {
                    listOption = this.getDataCombobox(this.state.TechspecsValue, "TechSpecsValueID", "Value", "TechSpecsID", elementValue);
                    objElement.listoption = listOption;
                    objElement.value = "-1";
                }
            } else if (elementName == "TechspecsValueID") {
                if (objElement.Name == "TechspecsValueID") {
                    objElement.value = elementValue;
                }
            }

        }.bind(this));

        if (isInsert) {
            this.setState({
                ModalFlexShipmentFeeColumnList: _ModalFlexShipmentFeeColumnList
            });
        } else {
            this.setState({
                ModalFlexShipmentFeeColumnList_Edit: _ModalFlexShipmentFeeColumnList
            });
        }
        //console.log("formData", listOption);
    }

    onClose() {
        this.resetCombobox();
    }

    //---------------------- chi phí vận chuyển thay đổi -------------------------------------------------
    addShipmentOrderType_FlexShipmentFeePopup(MLObjectDefinition, modalElementList, dataSource) {
        this.setState({ IsInsert: true });
        this.props.showModal(MODAL_TYPE_CONFIRMATION, {
            title: 'Thêm mới chi phí vận chuyển thay đổi của một loại yêu cầu vận chuyển',
            autoCloseModal: false,
            onClose: this.onClose,
            onValueChange: this.handleModalFlexShipmentFeeChange,
            onConfirm: (isConfirmed, formData) => {
                if (isConfirmed) {
                    let MLObject = GetMLObjectData(MLObjectDefinition, formData, dataSource);
                    if (MLObject) {
                        MLObject.ShipmentOrderTypeID = this.props.ShipmentOrderTypeID;
                        MLObject.OutputServiceProductID = MLObject.OutputServiceProductID && MLObject.OutputServiceProductID[0].ProductID ? MLObject.OutputServiceProductID[0].ProductID : MLObject.OutputServiceProductID;
                        MLObject.ProductID = MLObject.ProductID && MLObject.ProductID[0].ProductID ? MLObject.ProductID[0].ProductID : MLObject.ProductID;
                        // MLObject.SubGroupID = MLObject.SubGroupID && Array.isArray(MLObject.SubGroupID) ? MLObject.SubGroupID[0] : MLObject.SubGroupID;
                        // MLObject.TechspecsID = MLObject.TechspecsID && Array.isArray(MLObject.TechspecsID) ? MLObject.TechspecsID[0] : MLObject.TechspecsID;
                        // MLObject.TechspecsValueID = MLObject.TechspecsValueID && Array.isArray(MLObject.TechspecsValueID) ? MLObject.TechspecsValueID[0] : MLObject.TechspecsValueID;
                        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
                        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;

                        this.state.ModalFlexShipmentFeeColumnList.forEach(function (objElement) {
                            if (objElement.Name == "SubGroupID") {
                                MLObject.SubGroupID = objElement.value && Array.isArray(objElement.value) ? objElement.value[0] : objElement.value;
                            }
                            else if (objElement.Name == "TechspecsID") {
                                MLObject.TechspecsID = objElement.value && Array.isArray(objElement.value) ? objElement.value[0] : objElement.value;
                            }
                            else if (objElement.Name == "TechspecsValueID") {
                                MLObject.TechspecsValueID = objElement.value && Array.isArray(objElement.value) ? objElement.value[0] : objElement.value;
                            }
                        }.bind(this));

                        this.props.callFetchAPI(APIHostName, AddAPIPath_FlexShipmentFee, MLObject).then((apiResult) => {
                            if (!apiResult.IsError) {
                                //this.handleSubmitInsertLog(MLObject);
                                //this.props.hideModal();
                                this.props.onFlexShipmentFeeComplete(formData);
                                this.addNotification(apiResult.Message, apiResult.IsError);
                            } else {
                                this.showMessage(apiResult.Message);
                            }
                            this.setState({ IsCallAPIError: apiResult.IsError });
                        });
                        this.resetCombobox();
                        //console.log("MLObject", MLObject);
                    }
                }
            },
            modalElementList: modalElementList,
        });
    }

    editShipmentOrderType_FlexShipmentFeePopup(value, pkColumnName) {
        this.setState({ IsInsert: false });
        let _flexShipmentFee = {};
        this.state.ShipmentOrderTypeFlexShipmentFee.map((item, index) => {
            let isMath = false;
            for (var j = 0; j < pkColumnName.length; j++) {
                if (item[pkColumnName[j].key] != value.pkColumnName[j].value) {
                    isMath = false;
                    break;
                }
                else {
                    isMath = true;
                }
            }
            if (isMath) {
                _flexShipmentFee = item;
            }
        });

        this.state.ModalFlexShipmentFeeColumnList_Edit.forEach(function (objElement) {
            let sub = [];
            let mainGroupID = "";
            let listOption = [];
            if (objElement.Name == "MainGroupID") {
                sub = this.state.SubGroup.filter(x => x.SubGroupID == _flexShipmentFee.SubGroupID);
                if (sub && sub.length > 0) {
                    mainGroupID = sub[0].MainGroupID;
                    objElement.value = mainGroupID;
                }
            }
            else if (objElement.Name == "SubGroupID") {
                objElement.value = _flexShipmentFee.SubGroupID;
            }
            else if (objElement.Name == "TechspecsID") {
                objElement.value = _flexShipmentFee.TechspecsID;
            }
            else if (objElement.Name == "TechspecsValueID") {
                objElement.value = _flexShipmentFee.TechspecsValueID;
            }
            else if (objElement.Name == "FeeValue") {
                if (_flexShipmentFee.GetFeeType == 2) {//lấy từ bảng làm giá
                    objElement.readonly = true;
                } else {
                    objElement.readonly = false;
                }

            }

        }.bind(this));

        this.props.showModal(MODAL_TYPE_CONFIRMATION, {
            title: 'Chỉnh sửa chi phí vận chuyển thay đổi của một loại yêu cầu vận chuyển',
            onValueChange: this.handleModalFlexShipmentFeeChange,
            autoCloseModal: false,
            onClose: this.onClose,
            onConfirm: (isConfirmed, formData) => {
                if (isConfirmed) {
                    let MLObject = GetMLObjectData(MLObjectShipmentOrderType_FlexShipmentFee, formData, _flexShipmentFee);
                    if (MLObject) {
                        MLObject.ShipmentOrderTypeID = this.props.ShipmentOrderTypeID;
                        MLObject.OutputServiceProductID = MLObject.OutputServiceProductID && MLObject.OutputServiceProductID[0].ProductID ? MLObject.OutputServiceProductID[0].ProductID : MLObject.OutputServiceProductID;
                        MLObject.ProductID = MLObject.ProductID && MLObject.ProductID[0].ProductID ? MLObject.ProductID[0].ProductID : MLObject.ProductID;
                        // MLObject.SubGroupID = MLObject.SubGroupID && Array.isArray(MLObject.SubGroupID) ? MLObject.SubGroupID[0] : MLObject.SubGroupID;
                        // MLObject.TechspecsID = MLObject.TechspecsID && Array.isArray(MLObject.TechspecsID) ? MLObject.TechspecsID[0] : MLObject.TechspecsID;
                        // MLObject.TechspecsValueID = MLObject.TechspecsValueID && Array.isArray(MLObject.TechspecsValueID) ? MLObject.TechspecsValueID[0] : MLObject.TechspecsValueID;
                        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
                        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;

                        this.state.ModalFlexShipmentFeeColumnList_Edit.forEach(function (objElement) {
                            if (objElement.Name == "SubGroupID") {
                                MLObject.SubGroupID = objElement.value && Array.isArray(objElement.value) ? objElement.value[0] : objElement.value;
                            }
                            else if (objElement.Name == "TechspecsID") {
                                MLObject.TechspecsID = objElement.value && Array.isArray(objElement.value) ? objElement.value[0] : objElement.value;
                            }
                            else if (objElement.Name == "TechspecsValueID") {
                                MLObject.TechspecsValueID = objElement.value && Array.isArray(objElement.value) ? objElement.value[0] : objElement.value;
                            }
                        }.bind(this));

                        this.props.callFetchAPI(APIHostName, UpdateAPIPath_FlexShipmentFee, MLObject).then((apiResult) => {
                            if (!apiResult.IsError) {
                                //this.props.hideModal();
                                this.props.onFlexShipmentFeeComplete(formData);
                                this.addNotification(apiResult.Message, apiResult.IsError);
                            } else {
                                this.showMessage(apiResult.Message);
                            }
                            this.setState({ IsCallAPIError: apiResult.IsError });
                        });
                        //console.log("showModal", MLObject);
                        this.resetCombobox();
                    }
                }
            },
            modalElementList: this.state.ModalFlexShipmentFeeColumnList_Edit,
            formData: _flexShipmentFee
        });
    }

    delete_ShipmentOrderType_FlexShipmentFee(deleteList, pkColumnName) {
        let listMLObject = [];
        deleteList.map((row, index) => {
            let MLObject = {};
            pkColumnName.map((pkItem, pkIndex) => {
                MLObject[pkItem.key] = row.pkColumnName[pkIndex].value;
            });
            MLObject.ShipmentOrderTypeID = this.props.ShipmentOrderTypeID;
            MLObject.DeletedUser = this.props.AppInfo.LoginInfo.Username;
            listMLObject.push(MLObject);
        });

        this.props.callFetchAPI(APIHostName, DeleteAPIPath_FlexShipmentFee, listMLObject).then((apiResult) => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            if (!apiResult.IsError) {
                this.props.onFlexShipmentFeeComplete(listMLObject);
            }
            this.addNotification(apiResult.Message, apiResult.IsError);
        });
    }

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <Collapsible trigger="Chi phí vận chuyển thay đổi" easing="ease-in" open={true}>
                    <DataGrid listColumn={FlexShipmentFeeColumnList}
                        dataSource={this.state.ShipmentOrderTypeFlexShipmentFee}
                        modalElementList={this.state.ModalFlexShipmentFeeColumnList}
                        MLObjectDefinition={MLObjectShipmentOrderType_FlexShipmentFee}
                        IDSelectColumnName={"chkSelectFlexShipmentFeeID"}
                        PKColumnName={"FlexShipmentFeeID"}
                        onDeleteClick={this.delete_ShipmentOrderType_FlexShipmentFee}
                        onInsertClick={this.addShipmentOrderType_FlexShipmentFeePopup}
                        onInsertClickEdit={this.editShipmentOrderType_FlexShipmentFeePopup}
                        IsAutoPaging={false}
                        RowsPerPage={10}
                        IsCustomAddLink={true}
                    />
                </Collapsible>
            </React.Fragment>
        );
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: () => {
            dispatch(hideModal());
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
        callClearLocalCache: (cacheKeyID) => {
            return dispatch(callClearLocalCache(cacheKeyID));
        }

    };
};

const FlexShipmentFee = connect(mapStateToProps, mapDispatchToProps)(FlexShipmentFeeCom);
export default FlexShipmentFee;
