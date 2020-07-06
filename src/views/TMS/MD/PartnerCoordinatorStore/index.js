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
    AddAPIPath, UpdateAPIPath, DeleteAPIPath,
    ModalColumnList_Insert, ModalColumnList_Edit, DataGridColumnList, MLObjectDefinition
} from "./constants";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { callGetCache, callClearLocalCache } from "../../../../actions/cacheAction";
import { ERPCOMMONCACHE_STORE } from "../../../../constants/keyCache";
import { store } from "react-notifications-component";

class PartnerCoordinatorStoreCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleInsert = this.handleInsert.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.getStoreName = this.getStoreName.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false,
            Store: this.props.Store,
            PartnerCoordinatorStore: this.props.partnerCoordinatorStore ? this.props.partnerCoordinatorStore : [],
            PartnerID: this.props.PartnerID
        };
    }

    componentWillReceiveProps(nextProps) {
        //console.log("222", nextProps);
        if (nextProps.PartnerID !== this.state.PartnerID) {
            this.setState({ PartnerID: nextProps.PartnerID });
        }
        if(nextProps.Store !== this.state.Store){
            this.setState({ Store: nextProps.Store });
        }
    }

    componentDidMount() {

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

    getStoreName(storeId) {
        let _store = this.state.Store.filter(item => item.StoreID == storeId);
        let _storeName = "";
        if (_store && _store.length > 0) {
            _storeName = _store[0].StoreName;
        }
        return _storeName;
    }

    handleInsert(MLObjectDefinition, modalElementList, dataSource) {
        this.props.showModal(MODAL_TYPE_CONFIRMATION, {
            title: 'Thêm mới danh sách kho điều phối giao hàng cho các kho của đối tác',
            autoCloseModal: false,
            onConfirm: (isConfirmed, formData) => {
                if (isConfirmed) {
                    let MLObject = GetMLObjectData(MLObjectDefinition, formData, dataSource);
                    if (MLObject) {
                        MLObject.PartnerCSID = this.state.PartnerID + "," + MLObject.PartnerStoreID + "," + MLObject.CoordinatorStoreID;
                        MLObject.PartnerID = this.state.PartnerID;
                        MLObject.PartnerStoreName = this.getStoreName(MLObject.PartnerStoreID);
                        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
                        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
                        let match = this.state.PartnerCoordinatorStore.filter(item => item.PartnerID == MLObject.PartnerID
                            && item.CoordinatorStoreID == MLObject.CoordinatorStoreID
                            && item.PartnerStoreID == MLObject.PartnerStoreID);
                        if (match.length) {
                            this.showMessage("Dữ liệu đã tồn tại.");
                            return;
                        }
                        let _PartnerCoordinatorStore = this.state.PartnerCoordinatorStore;
                        _PartnerCoordinatorStore.push(MLObject);
                        _PartnerCoordinatorStore.sort((a, b) => (a.CoordinatorStoreID > b.CoordinatorStoreID) ? 1 : ((b.CoordinatorStoreID > a.CoordinatorStoreID) ? -1 : 0));
                        this.setState({ PartnerCoordinatorStore: _PartnerCoordinatorStore });
                        if (this.props.onPartnerCoordinatorStoreChange) {
                            this.props.onPartnerCoordinatorStoreChange(_PartnerCoordinatorStore);
                        }
                        this.props.hideModal();
                        // this.props.callFetchAPI(APIHostName, AddAPIPath_FixShipmentFee, MLObject).then((apiResult) => {
                        //     if (!apiResult.IsError) {
                        //         this.callLoadData();
                        //         //this.handleSubmitInsertLog(MLObject);
                        //         this.props.hideModal();
                        //         this.addNotification(apiResult.Message, apiResult.IsError);
                        //     } else {
                        //         this.showMessage(apiResult.Message);
                        //     }
                        //     this.setState({ IsCallAPIError: apiResult.IsError });
                        // });
                        //console.log("handleInsert_partber", MLObject);
                    }
                }
            },
            modalElementList: modalElementList,
        });
    }

    handleEdit(value, pkColumnName) {
        let _partnerCoordinatorStore = {};
        this.state.PartnerCoordinatorStore.map((item, index) => {
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
                _partnerCoordinatorStore = item;
            }
        });

        this.props.showModal(MODAL_TYPE_CONFIRMATION, {
            title: 'Chỉnh sửa danh sách kho điều phối giao hàng cho các kho của đối tác',
            onConfirm: (isConfirmed, formData) => {
                if (isConfirmed) {
                    let MLObject = GetMLObjectData(MLObjectDefinition, formData, _partnerCoordinatorStore);
                    if (MLObject) {
                        MLObject.PartnerCSID = this.state.PartnerID + "," + MLObject.PartnerStoreID + "," + MLObject.CoordinatorStoreID;
                        MLObject.PartnerID = this.state.PartnerID;
                        MLObject.PartnerStoreName = this.getStoreName(MLObject.PartnerStoreID);
                        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
                        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
                        let _PartnerCoordinatorStore = this.state.PartnerCoordinatorStore
                            .filter(item => item.PartnerID != MLObject.PartnerID
                                || item.CoordinatorStoreID != MLObject.CoordinatorStoreID
                                || item.PartnerStoreID != MLObject.PartnerStoreID);
                        _PartnerCoordinatorStore.push(MLObject);
                        _PartnerCoordinatorStore.sort((a, b) => (a.CoordinatorStoreID > b.CoordinatorStoreID) ? 1 : ((b.CoordinatorStoreID > a.CoordinatorStoreID) ? -1 : 0));
                        this.setState({ PartnerCoordinatorStore: _PartnerCoordinatorStore });
                        if (this.props.onPartnerCoordinatorStoreChange) {
                            this.props.onPartnerCoordinatorStoreChange(_PartnerCoordinatorStore);
                        }
                        this.props.hideModal();

                        // this.props.callFetchAPI(APIHostName, UpdateAPIPath_FixShipmentFee, MLObject).then((apiResult) => {
                        //     if (!apiResult.IsError) {
                        //         this.callLoadData();
                        //         this.props.hideModal();
                        //         this.addNotification(apiResult.Message, apiResult.IsError);
                        //     } else {
                        //         this.showMessage(apiResult.Message);
                        //     }
                        //     this.setState({ IsCallAPIError: apiResult.IsError });
                        // });
                    }
                }
            },
            modalElementList: ModalColumnList_Edit,
            formData: _partnerCoordinatorStore
        });
    }

    handleDelete(deleteList, pkColumnName) {
        //let datasource = this.state.PartnerCoordinatorStore;
        let _PartnerCoordinatorStore = this.state.PartnerCoordinatorStore;
        deleteList.map((row, index) => {
            let MLObject = {};
            pkColumnName.map((pkItem, pkIndex) => {
                MLObject[pkItem.key] = row.pkColumnName[pkIndex].value;
            });
            let _deleteList = _PartnerCoordinatorStore.filter(item => item.PartnerCSID == MLObject.PartnerCSID);
            _deleteList[0].IsDeleted = true;

            //datasource = datasource.filter(item => item.PartnerCSID != MLObject.PartnerCSID);

            _PartnerCoordinatorStore = _PartnerCoordinatorStore.filter(item => item.PartnerCSID != MLObject.PartnerCSID);
            _PartnerCoordinatorStore.push(_deleteList[0]);
            _PartnerCoordinatorStore.sort((a, b) => (a.CoordinatorStoreID > b.CoordinatorStoreID) ? 1 : ((b.CoordinatorStoreID > a.CoordinatorStoreID) ? -1 : 0));

            //listMLObject.push(MLObject);
        });
        this.setState({ PartnerCoordinatorStore: _PartnerCoordinatorStore });
        if (this.props.onPartnerCoordinatorStoreChange) {
            this.props.onPartnerCoordinatorStoreChange(_PartnerCoordinatorStore);
        }
        // this.props.callFetchAPI(APIHostName, DeleteAPIPath_FixShipmentFee, listMLObject).then((apiResult) => {
        //     this.setState({ IsCallAPIError: apiResult.IsError });
        //     if (!apiResult.IsError) {
        //         this.callLoadData();
        //     }
        //     this.addNotification(apiResult.Message, apiResult.IsError);
        // });
    }

    isNumeric(value) {
        return /^-{0,1}\d+$/.test(value);
    }

    render() {
        //let datasource = this.state.PartnerCoordinatorStore.filter(item => item.IsDeleted == undefined || item.IsDeleted == false);
        let datasource = this.state.PartnerCoordinatorStore.map(function (item, index) {
            if (item.IsDeleted == undefined || item.IsDeleted == false) {
                item.CoordinatorStoreName = item.CoordinatorStoreID + " - " + this.getStoreName(item.CoordinatorStoreID);
                item.PartnerStoreName = item.PartnerStoreID + " - " + this.getStoreName(item.PartnerStoreID);
                return item;
            }

        }.bind(this)).filter(item => item != undefined);


        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        if (!this.state.PartnerID || !this.isNumeric(this.state.PartnerID)) {
            return (
                <Collapsible trigger="Danh sách kho điều phối giao hàng cho các kho của đối tác" easing="ease-in" open={true}>
                    Đang nạp dữ liệu ......
                </Collapsible>
            );
        }
        if (this.state.Store) {
            return (
                <Collapsible trigger="Danh sách kho điều phối giao hàng cho các kho của đối tác" easing="ease-in" open={true}>
                    <DataGrid listColumn={DataGridColumnList}
                        dataSource={datasource}
                        modalElementList={ModalColumnList_Insert}
                        MLObjectDefinition={MLObjectDefinition}
                        IDSelectColumnName={"chkSelectPartnerCSID"}
                        PKColumnName={"PartnerCSID"}
                        onDeleteClick={this.handleDelete}
                        onInsertClick={this.handleInsert}
                        onInsertClickEdit={this.handleEdit}
                        IsAutoPaging={true}
                        RowsPerPage={10}
                        IsCustomAddLink={true}
                    />
                </Collapsible>
            );
        } else {
            return (
                <Collapsible trigger="Danh sách kho điều phối giao hàng cho các kho của đối tác" easing="ease-in" open={true}>
                    Đang nạp dữ liệu ......
                </Collapsible>
            );
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

const PartnerCoordinatorStore = connect(mapStateToProps, mapDispatchToProps)(PartnerCoordinatorStoreCom);
export default PartnerCoordinatorStore;
