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
    FixShipmentFeeColumnList, MLObjectShipmentOrderType_FixShipmentFee, ModalFixShipmentFeeColumnList, ModalFixShipmentFeeColumnList_Edit,
    AddAPIPath_FixShipmentFee, UpdateAPIPath_FixShipmentFee, DeleteAPIPath_FixShipmentFee,
} from "./constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";


class FixShipmentFeeCom extends React.Component {
    constructor(props) {
        super(props);
        this.addShipmentOrderType_FixShipmentFeePopup = this.addShipmentOrderType_FixShipmentFeePopup.bind(this);
        this.editShipmentOrderType_FixShipmentFeePopup = this.editShipmentOrderType_FixShipmentFeePopup.bind(this);
        this.delete_ShipmentOrderType_FixShipmentFee = this.delete_ShipmentOrderType_FixShipmentFee.bind(this);
        this.handleModalFixShipmentChange = this.handleModalFixShipmentChange.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.notificationDOMRef = React.createRef();
        this.state = {
            IsCallAPIError: false,
            IsCloseForm: false,
            IsLoading: true,
            ShipmentOrderTypeFixShipmentFee: this.props.ShipmentOrderTypeFixShipmentFee ? this.props.ShipmentOrderTypeFixShipmentFee : [],
            ShipmentFeeType: this.props.ShipmentFeeType ? this.props.ShipmentFeeType : [],
            ModalFixShipmentFeeColumnList: ModalFixShipmentFeeColumnList,
            ModalFixShipmentFeeColumnList_Edit: ModalFixShipmentFeeColumnList_Edit,
            IsInsert: true
        };
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.ShipmentOrderTypeFixShipmentFee) != JSON.stringify(this.state.ShipmentOrderTypeFixShipmentFee)) {
            this.setState({ ShipmentOrderTypeFixShipmentFee: nextProps.ShipmentOrderTypeFixShipmentFee });
        }
    }

    componentDidMount() {

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


    handleModalFixShipmentChange(formData, formValidation, elementName, elementValue) {
        let shipmentFeeType = this.state.ShipmentFeeType;
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

    //----------------------- Chi phí vận chuyển cố định ------------------------------------------------------------

    addShipmentOrderType_FixShipmentFeePopup(MLObjectDefinition, modalElementList, dataSource) {
        this.setState({ IsInsert: true });

        this.props.showModal(MODAL_TYPE_CONFIRMATION, {
            title: 'Thêm mới chi phí vận chuyển cố định của một loại yêu cầu vận chuyển',
            autoCloseModal: false,
            onValueChange: this.handleModalFixShipmentChange,
            onConfirm: (isConfirmed, formData) => {
                if (isConfirmed) {
                    let MLObject = GetMLObjectData(MLObjectDefinition, formData, dataSource);
                    if (MLObject) {
                        MLObject.ShipmentOrderTypeID = this.props.ShipmentOrderTypeID;
                        MLObject.OutputServiceProductID = MLObject.OutputServiceProductID && Array.isArray(MLObject.OutputServiceProductID) ? MLObject.OutputServiceProductID[0].ProductID : MLObject.OutputServiceProductID;
                        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
                        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
                        this.props.callFetchAPI(APIHostName, AddAPIPath_FixShipmentFee, MLObject).then((apiResult) => {
                            if (!apiResult.IsError) {
                                //this.handleSubmitInsertLog(MLObject);
                                //this.props.hideModal();
                                this.props.onFixShipmentFeeComplete(formData);
                                this.addNotification(apiResult.Message, apiResult.IsError);
                            } else {
                                this.showMessage(apiResult.Message);
                            }
                            this.setState({ IsCallAPIError: apiResult.IsError });
                        });
                        //console.log("MLObject", MLObject);
                    }
                }
            },
            modalElementList: modalElementList,
        });
    }

    editShipmentOrderType_FixShipmentFeePopup(value, pkColumnName) {
        this.setState({ IsInsert: false });
        let _fixShipmentFee = {};
        this.state.ShipmentOrderTypeFixShipmentFee.map((item, index) => {
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
                _fixShipmentFee = item;
            }
        });

        this.state.ModalFixShipmentFeeColumnList_Edit.forEach(function (objElement) {
            if (objElement.Name == "FeeValue") {
                if (_fixShipmentFee.GetFeeType == 2) {//lấy từ bảng làm giá
                    objElement.readonly = true;
                } else {
                    objElement.readonly = false;
                }

            }
        }.bind(this));

        this.props.showModal(MODAL_TYPE_CONFIRMATION, {
            title: 'Chỉnh sửa chi phí vận chuyển cố định của một loại yêu cầu vận chuyển',
            onValueChange: this.handleModalFixShipmentChange,
            autoCloseModal: false,
            onConfirm: (isConfirmed, formData) => {
                if (isConfirmed) {
                    let MLObject = GetMLObjectData(MLObjectShipmentOrderType_FixShipmentFee, formData, _fixShipmentFee);
                    if (MLObject) {
                        MLObject.ShipmentOrderTypeID = this.props.ShipmentOrderTypeID;
                        MLObject.OutputServiceProductID = MLObject.OutputServiceProductID && Array.isArray(MLObject.OutputServiceProductID) ? MLObject.OutputServiceProductID[0].ProductID : MLObject.OutputServiceProductID;
                        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
                        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
                        this.props.callFetchAPI(APIHostName, UpdateAPIPath_FixShipmentFee, MLObject).then((apiResult) => {
                            if (!apiResult.IsError) {
                                //this.props.hideModal();
                                this.props.onFixShipmentFeeComplete(formData);
                                this.addNotification(apiResult.Message, apiResult.IsError);
                            } else {
                                this.showMessage(apiResult.Message);
                            }
                            this.setState({ IsCallAPIError: apiResult.IsError });
                        });
                    }
                }
            },
            modalElementList: this.state.ModalFixShipmentFeeColumnList_Edit,
            formData: _fixShipmentFee
        });
    }

    delete_ShipmentOrderType_FixShipmentFee(deleteList, pkColumnName) {
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
        this.props.callFetchAPI(APIHostName, DeleteAPIPath_FixShipmentFee, listMLObject).then((apiResult) => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            if (!apiResult.IsError) {
                this.props.onFixShipmentFeeComplete(listMLObject);
            }
            this.addNotification(apiResult.Message, apiResult.IsError);
        });
    }





    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <Collapsible trigger="Chi phí vận chuyển cố định" easing="ease-in" open={true}>
                    <DataGrid listColumn={FixShipmentFeeColumnList}
                        dataSource={this.state.ShipmentOrderTypeFixShipmentFee}
                        modalElementList={this.state.ModalFixShipmentFeeColumnList}
                        MLObjectDefinition={MLObjectShipmentOrderType_FixShipmentFee}
                        IDSelectColumnName={"chkSelectShipmentFeeTypeID"}
                        PKColumnName={"ShipmentFeeTypeID"}
                        onDeleteClick={this.delete_ShipmentOrderType_FixShipmentFee}
                        onInsertClick={this.addShipmentOrderType_FixShipmentFeePopup}
                        onInsertClickEdit={this.editShipmentOrderType_FixShipmentFeePopup}
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

const FixShipmentFee = connect(mapStateToProps, mapDispatchToProps)(FixShipmentFeeCom);
export default FixShipmentFee;
