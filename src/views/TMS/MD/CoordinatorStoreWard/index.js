import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import { MessageModal } from "../../../../common/components/Modal";
import DataGrid from "../../../../common/components/DataGrid";
import { MODAL_TYPE_COMMONTMODALS, MODAL_TYPE_CONFIRMATION } from '../../../../constants/actionTypes';
import InputGridControl from "../../../../common/components/FormContainer/FormControl/InputGrid/InputGridControl.js";
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
import StoreWard from "./Component/StoreWard";

class CoordinatorStoreWardCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleInsert = this.handleInsert.bind(this);
        this.handleInsertNew = this.handleInsertNew.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleInputChangeObjItem = this.handleInputChangeObjItem.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false,
            Store: this.props.Store,
            PartnerCoordinatorStore: this.props.partnerCoordinatorStore ? this.props.partnerCoordinatorStore : [],
            PartnerID: this.props.PartnerID,
            DataSource: []
        };
    }

    componentWillReceiveProps(nextProps) {
        //console.log("222", nextProps);
        if (nextProps.PartnerID !== this.state.PartnerID) {
            this.setState({ PartnerID: nextProps.PartnerID });
        }
        if (nextProps.Store !== this.state.Store) {
            this.setState({ Store: nextProps.Store });
        }
    }

    componentDidMount() {

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

    handleInsertNew() {

        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Danh sách phường/xã địa bàn của khách hàng tương ứng với kho điều phối',
            content: {
                text: <StoreWard
                    dataSource={this.state.DataSource}
                    onInputChangeObj={this.handleInputChangeObjItem}

                />
            },
            maxWidth: '1000px'
        })
    }

    handleInputChangeObjItem(ObjItem) {

        // const formData = Object.assign({}, ObjItem);
        //console.log("handleInputChangeObjItem", formData, ObjItem)

        //this.setState({ DataSource: formData });
        this.props.hideModal();

    }

    handleInsert(MLObjectDefinition, modalElementList, dataSource) {
        this.props.showModal(MODAL_TYPE_CONFIRMATION, {
            title: 'Danh sách phường/xã địa bàn của khách hàng tương ứng với kho điều phối',
            autoCloseModal: false,
            onConfirm: (isConfirmed, formData) => {
                console.log("onConfirm", isConfirmed, formData)
                if (isConfirmed) {

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

    }

    render() {

        const { DataSource } = this.state;

        // console.log("DataSource", DataSource)

        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        return (
            <React.Fragment>
                <DataGrid
                    listColumn={DataGridColumnList}
                    dataSource={DataSource}
                    MLObjectDefinition={MLObjectDefinition}
                    IDSelectColumnName={"chkSelectWardID"}
                    PKColumnName={"WardID"}
                    onDeleteClick={this.handleDelete}
                    onInsertClick={this.handleInsertNew}
                    onInsertClickEdit={this.handleEdit}
                    IsAutoPaging={true}
                    RowsPerPage={10}
                    IsCustomAddLink={true}
                />
              
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

const CoordinatorStoreWard = connect(mapStateToProps, mapDispatchToProps)(CoordinatorStoreWardCom);
export default CoordinatorStoreWard;
