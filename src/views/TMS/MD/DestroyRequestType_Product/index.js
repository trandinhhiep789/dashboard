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
    AddAPIPath, UpdateAPIPath, DeleteAPIPath, APIHostName,
    ModalColumnList_Insert, ModalColumnList_Edit, DataGridColumnList, MLObjectDefinition
} from "./constants";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { callGetCache, callClearLocalCache } from "../../../../actions/cacheAction";
import { GET_CACHE_USER_FUNCTION_LIST, DESTROYREQUESTTYPE_ADD, DESTROYREQUESTTYPE_DELETE } from "../../../../constants/functionLists";

class DestroyRequestType_ProductCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleInsert = this.handleInsert.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.onClose = this.onClose.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false,
            DestroyRequestType_Product_DataSource: this.props.DestroyRequestType_Product_DataSource ? this.props.DestroyRequestType_Product_DataSource : [],
            DestroyRequestTypeID: this.props.DestroyRequestTypeID,
            IsInsert: true,
            ModalColumnList_Insert: ModalColumnList_Insert,
            ModalColumnList_Edit: ModalColumnList_Edit
        };
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.DestroyRequestTypeID !== this.state.DestroyRequestTypeID) {
            this.setState({ DestroyRequestTypeID: nextProps.DestroyRequestTypeID });
        }

        if (nextProps.DestroyRequestType_Product_DataSource !== this.state.DestroyRequestType_Product_DataSource) {
            this.setState({ DestroyRequestType_Product_DataSource: nextProps.DestroyRequestType_Product_DataSource });
        }
    }

    componentDidMount() {
        this.checkPermission();
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

    checkPermission() {
        let IsAllowedAdd = false;
        let IsAllowedDelete = false;
        this.props.callGetCache(GET_CACHE_USER_FUNCTION_LIST).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                let isAllowAdd = result.ResultObject.CacheData.filter(x => x.FunctionID == DESTROYREQUESTTYPE_ADD);
                if (isAllowAdd && isAllowAdd.length > 0) {
                    IsAllowedAdd = true;
                }

                let isAllowDelete = result.ResultObject.CacheData.filter(x => x.FunctionID == DESTROYREQUESTTYPE_DELETE);
                if (isAllowDelete && isAllowDelete.length > 0) {
                    IsAllowedDelete = true;
                }
                this.setState({
                    IsAllowedAdd: IsAllowedAdd,
                    IsAllowedDelete: IsAllowedDelete
                });
            }
        });
    }




    onClose() {

    }

    handleInsert(MLObjectDefinition, modalElementList, dataSource) {
        if(!this.state.IsAllowedAdd){
            this.showMessage("Bạn không có quyền");
            return;
        }
        this.setState({ IsInsert: true });
        this.props.showModal(MODAL_TYPE_CONFIRMATION, {
            title: 'Thêm mới sản phẩm tạm ứng',
            autoCloseModal: false,
            //onValueChange: this.handleModalChange,
            onClose: this.onClose,
            onConfirm: (isConfirmed, formData) => {
                if (isConfirmed) {
                    let MLObject = GetMLObjectData(MLObjectDefinition, formData, dataSource);
                    if (MLObject) {
                        MLObject.DestroyRequestTypeID = this.state.DestroyRequestTypeID;
                        MLObject.ProductID = MLObject.ProductID[0].ProductID;
                        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
                        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
                        this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then(apiResult => {
                            if (!apiResult.IsError) {
                                if (this.props.onComponentChange) {
                                    this.props.onComponentChange();
                                }
                                this.props.hideModal();
                            }
                            this.showMessage(apiResult.Message);
                        });
                    }
                }
            },
            modalElementList: modalElementList,
        });
    }


    handleDelete(deleteList, pkColumnName) {
        if(!this.state.IsAllowedDelete){
            this.showMessage("Bạn không có quyền");
            return;
        }
        let listMLObject = [];
        deleteList.map((row, index) => {
            let MLObject = {};
            pkColumnName.map((pkItem, pkIndex) => {
                MLObject[pkItem.key] = row.pkColumnName[pkIndex].value;
            });

            MLObject.DeletedUser = this.props.AppInfo.LoginInfo.Username;
            MLObject.DestroyRequestTypeID = this.state.DestroyRequestTypeID;
            listMLObject.push(MLObject);
        });


        this.props.callFetchAPI(APIHostName, DeleteAPIPath, listMLObject).then(apiResult => {
            if (!apiResult.IsError) {
                if (this.props.onComponentChange) {
                    this.props.onComponentChange();
                }
                this.props.hideModal();
            }
            this.showMessage(apiResult.Message);
        });

    }


    render() {
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }

        return (
            <div className="sub-grid detail">
                <DataGrid listColumn={DataGridColumnList}
                    dataSource={this.state.DestroyRequestType_Product_DataSource}
                    modalElementList={ModalColumnList_Insert}
                    MLObjectDefinition={MLObjectDefinition}
                    IDSelectColumnName={"chkSelectProductID"}
                    PKColumnName={"ProductID"}
                    onDeleteClick={this.handleDelete}
                    onInsertClick={this.handleInsert}
                    IsAutoPaging={false}
                    //RowsPerPage={10}
                    IsCustomAddLink={true}
                    headingTitle={"Sản phẩm vật tư"}
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
        }

    };
};

const DestroyRequestType_Product = connect(mapStateToProps, mapDispatchToProps)(DestroyRequestType_ProductCom);
export default DestroyRequestType_Product;
