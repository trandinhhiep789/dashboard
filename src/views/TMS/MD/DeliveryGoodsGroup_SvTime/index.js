import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import { MessageModal } from "../../../../common/components/Modal";
import DataGrid from "../../../../common/components/DataGrid";
import { MODAL_TYPE_CONFIRMATION } from '../../../../constants/actionTypes';
import { showModal, hideModal } from '../../../../actions/modal';
import { GetMLObjectData } from "../../../../common/library/form/FormLib";
import Collapsible from 'react-collapsible';
import {
    APIHostName, AddAPIPath, UpdateAPIPath, DeleteAPIPath,
    ModalColumnList_Insert, ModalColumnList_Edit, DataGridColumnList, MLObjectDefinition
} from "./constants";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { callGetCache, callClearLocalCache, callGetUserCache } from "../../../../actions/cacheAction";
import { ERPCOMMONCACHE_MAINGROUP, ERPCOMMONCACHE_SUBGROUP, ERPCOMMONCACHE_SUBGROUPTECHSPECS, ERPCOMMONCACHE_TECHSPECSVALUE, ERPCOMMONCACHE_BRAND } from "../../../../constants/keyCache";
import { DELIVERYGOODSGROUP_ADD, DELIVERYGOODSGROUP_DELETE, DELIVERYGOODSGROUP_UPDATE, GET_CACHE_USER_FUNCTION_LIST, MATERIALGROUP_ADD, MATERIALGROUP_DELETE, MATERIALGROUP_UPDATE } from "../../../../constants/functionLists";

class DeliveryGoodsGroup_SvTimeCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleInsert = this.handleInsert.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);      
        this.checkPermission = this.checkPermission.bind(this);
        this.onClose = this.onClose.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false,
            DataSource: this.props.DataSource ? this.props.DataSource : [],
            MaterialGroup_ProductDataSource: this.props.MaterialGroup_ProductDataSource ? this.props.MaterialGroup_ProductDataSource : [],
            DeliveryGoodsGroupID: this.props.DeliveryGoodsGroupID,
            IsInsert: true,
            ModalColumnList_Insert: ModalColumnList_Insert,
            ModalColumnList_Edit: ModalColumnList_Edit
        };
        this.notificationDOMRef = React.createRef();
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.DeliveryGoodsGroupID !== this.state.DeliveryGoodsGroupID) {
            this.setState({ DeliveryGoodsGroupID: nextProps.DeliveryGoodsGroupID });
        }

        if (nextProps.DataSource !== this.state.DataSource) {
            this.setState({ DataSource: nextProps.DataSource });
        }
    }

    componentDidMount() {
        this.checkPermission();
    }

    checkPermission() {
        let IsAllowedAdd = false;
        let IsAllowedDelete = false;
        let IsAllowedUpdate = false;
        this.props.callGetUserCache(GET_CACHE_USER_FUNCTION_LIST).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                let _isAllowedAdd = result.ResultObject.CacheData.filter(x => x.FunctionID == DELIVERYGOODSGROUP_ADD);
                if (_isAllowedAdd && _isAllowedAdd.length > 0) {
                    IsAllowedAdd = true;
                }

                let _isAllowedUpdate = result.ResultObject.CacheData.filter(x => x.FunctionID == DELIVERYGOODSGROUP_ADD);
                if (_isAllowedUpdate && _isAllowedUpdate.length > 0) {
                    IsAllowedUpdate = true;
                }

                let _isAlloweDelete = result.ResultObject.CacheData.filter(x => x.FunctionID == DELIVERYGOODSGROUP_DELETE);
                if (_isAlloweDelete && _isAlloweDelete.length > 0) {
                    IsAllowedDelete = true;
                }

                this.setState({
                    IsAllowedAdd,
                    IsAllowedUpdate,
                    IsAllowedDelete
                });
            }
        });
    }




    handleCloseMessage() {
        //if (!this.state.IsCallAPIError) this.setState({ IsCloseForm: true });
    }

    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
                onCloseModal={this.handleCloseMessage}
            />
        );
    }

    addNotification(message1, IsError) {
        let cssNotification = "";
        let iconNotification = "";
        if (!IsError) {
            cssNotification = "notification-custom-success";
            iconNotification = "fa fa-check";
        } else {
            cssNotification = "notification-danger";
            iconNotification = "fa fa-exclamation";
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

    onClose() {
        this.resetCombobox();
    }

    handleInsert(MLObjectDefinition, modalElementList, dataSource) {
        if (!this.state.IsAllowedAdd) {
            this.showMessage("Bạn không có quyền");
            return;
        }
        this.setState({ IsInsert: true });
        //console.log("DataSource", this.state.DataSource);
        this.props.showModal(MODAL_TYPE_CONFIRMATION, {
            title: 'Thêm mới thời gian phục vụ của một nhóm hàng hóa vận chuyển',
            autoCloseModal: false,
            //onValueChange: this.handleModalChange,
            onClose: this.onClose,
            onConfirm: (isConfirmed, formData) => {
                if (isConfirmed) {
                    let MLObject = GetMLObjectData(MLObjectDefinition, formData, dataSource);
                    if (MLObject) {
                        MLObject.DeliveryGoodsGroupID = this.state.DeliveryGoodsGroupID;
                        MLObject.DeliveryTimeFrameID = MLObject.DeliveryTimeFrameID && Array.isArray(MLObject.DeliveryTimeFrameID) ? MLObject.DeliveryTimeFrameID[0] : MLObject.DeliveryTimeFrameID;
                        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
                        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;

                      



                        this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then(apiResult => {
                            if (!apiResult.IsError) {
                                if (this.props.onComponentChange) {
                                    this.props.onComponentChange();
                                }
                                this.props.hideModal();
                                this.resetCombobox();
                            }
                            //this.showMessage(apiResult.Message);
                            this.addNotification(apiResult.Message, apiResult.IsError);
                        });


                    }
                }
            },
            modalElementList: this.state.ModalColumnList_Insert,
        });
    }

    handleEdit(value, pkColumnName) {
        if (!this.state.IsAllowedUpdate) {
            this.showMessage("Bạn không có quyền");
            return;
        }
        this.setState({ IsInsert: false });
        let _DataSource = {};
        this.state.DataSource.map((item, index) => {
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
                _DataSource = item;
            }
        });

        

        this.props.showModal(MODAL_TYPE_CONFIRMATION, {
            title: 'Chỉnh sửa thời gian phục vụ của một nhóm hàng hóa vận chuyển',
            //onValueChange: this.handleModalChange,
            onClose: this.onClose,
            onConfirm: (isConfirmed, formData) => {
                if (isConfirmed) {
                    let MLObject = GetMLObjectData(MLObjectDefinition, formData, _DataSource);
                    if (MLObject) {
                        MLObject.DeliveryGoodsGroupID = this.state.DeliveryGoodsGroupID;
                        MLObject.DeliveryTimeFrameID = MLObject.DeliveryTimeFrameID && Array.isArray(MLObject.DeliveryTimeFrameID) ? MLObject.DeliveryTimeFrameID[0] : MLObject.DeliveryTimeFrameID;
                        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
                        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;

                        //check duplicated data
                        // let _exitsduplicated = this.state.DataSource.filter(x => x.ApplyProductID == MLObject.ApplyProductID && x.ApplySubGroupID == MLObject.ApplySubGroupID
                        //     && x.ApplyTechspecsID == MLObject.ApplyTechspecsID && x.ApplyTechspecsValueID == MLObject.ApplyTechspecsValueID && x.BrandID == MLObject.BrandID && x.MaterialProductID == MLObject.MaterialProductID && MLObject.DeliveryGoodsGroupApplyID != x.DeliveryGoodsGroupApplyID
                        // );
                        // if (_exitsduplicated.length > 0) {
                        //     this.addNotification("Dữ liệu đã tồn tại", true);
                        //     return;
                        // }

                        this.props.callFetchAPI(APIHostName, UpdateAPIPath, MLObject).then(apiResult => {
                            if (!apiResult.IsError) {
                                if (this.props.onComponentChange) {
                                    this.props.onComponentChange();
                                }
                                this.props.hideModal();
                                this.resetCombobox();
                            }
                            //this.showMessage(apiResult.Message);
                            this.addNotification(apiResult.Message, apiResult.IsError);
                        });


                    }
                }
            },
            modalElementList: this.state.ModalColumnList_Edit,
            formData: _DataSource
        });
    }

    handleDelete(deleteList, pkColumnName) {
        if (!this.state.IsAllowedDelete) {
            this.showMessage("Bạn không có quyền");
            return;
        }
        let listMLObject = [];
        let _DataSource = this.state.DataSource;
        deleteList.map((row, index) => {
            let MLObject = {};
            pkColumnName.map((pkItem, pkIndex) => {
                MLObject[pkItem.key] = row.pkColumnName[pkIndex].value;
            });

            MLObject.DeliveryGoodsGroupID = this.state.DeliveryGoodsGroupID;
            MLObject.DeletedUser = this.props.AppInfo.LoginInfo.Username;
            listMLObject.push(MLObject);

        });
        this.props.callFetchAPI(APIHostName, DeleteAPIPath, listMLObject).then(apiResult => {
            if (!apiResult.IsError) {
                if (this.props.onComponentChange) {
                    this.props.onComponentChange();
                }
                this.props.hideModal();
            }
            //this.showMessage(apiResult.Message);
            this.addNotification(apiResult.Message, apiResult.IsError);
        });
    }

    isNumeric(value) {
        return /^-{0,1}\d+$/.test(value);
    }

    

    render() {
        // let datasource = this.state.DataSource.filter(item => item.IsDeleted == undefined || item.IsDeleted == false);
        // datasource = this.initDatasource(datasource);


        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        if (!this.state.DeliveryGoodsGroupID) {
            return (
                <Collapsible trigger="thời gian phục vụ của một nhóm hàng hóa vận chuyển" easing="ease-in" open={true}>
                    Đang nạp dữ liệu ......
                </Collapsible>
            );
        }

        return (
            <div className="sub-grid detail">
                <ReactNotification ref={this.notificationDOMRef} />
                <DataGrid listColumn={DataGridColumnList}
                    dataSource={this.state.DataSource}
                    modalElementList={this.state.ModalColumnList_Insert}
                    MLObjectDefinition={MLObjectDefinition}
                    IDSelectColumnName={"chkSelectDeliveryTimeFrameID"}
                    PKColumnName={"DeliveryTimeFrameID"}
                    onDeleteClick={this.handleDelete}
                    onInsertClick={this.handleInsert}
                    onInsertClickEdit={this.handleEdit}
                    IsAutoPaging={true}
                    RowsPerPage={10}
                    IsCustomAddLink={true}
                    headingTitle={"Thời gian phục vụ của một nhóm hàng hóa vận chuyển"}
                />
            </div>

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
        },
        callGetUserCache: (cacheKeyID) => {
            return dispatch(callGetUserCache(cacheKeyID));
        }

    };
};

const DeliveryGoodsGroup_SvTime = connect(mapStateToProps, mapDispatchToProps)(DeliveryGoodsGroup_SvTimeCom);
export default DeliveryGoodsGroup_SvTime;
