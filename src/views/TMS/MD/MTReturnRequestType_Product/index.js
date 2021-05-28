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
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { callGetCache, callClearLocalCache, callGetUserCache } from "../../../../actions/cacheAction";
import { GET_CACHE_USER_FUNCTION_LIST, MTRETURNREQUESTTYPE_ADD, MTRETURNREQUESTTYPE_DELETE, MTRETURNREQUESTTYPE_UPDATE } from "../../../../constants/functionLists";
import { ERPCOMMONCACHE_MTRETURNRQTYPE_PR } from "../../../../constants/keyCache";

class MTReturnRequestType_ProductCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleInsert = this.handleInsert.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleModalChange = this.handleModalChange.bind(this);
        this.onClose = this.onClose.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false,
            cssNotification: "",
            iconNotification: "",
            DataSource: this.props.DataSource ? this.props.DataSource : [],
            MaterialProductDataSource: this.props.MaterialProductDataSource ? this.props.MaterialProductDataSource : [],
            MTReturnRequestTypeID: this.props.MTReturnRequestTypeID,
            IsInsert: true,
            ModalColumnList_Insert: ModalColumnList_Insert,
            ModalColumnList_Edit: ModalColumnList_Edit
        };
        this.notificationDOMRef = React.createRef();
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.MTReturnRequestTypeID !== this.state.MTReturnRequestTypeID) {
            this.setState({ MTReturnRequestTypeID: nextProps.MTReturnRequestTypeID });
        }

        if (nextProps.DataSource !== this.state.DataSource) {
            this.setState({ DataSource: nextProps.DataSource });
        }

        if (nextProps.MaterialProductDataSource !== this.state.MaterialProductDataSource) {
            this.setState({ MaterialProductDataSource: nextProps.MaterialProductDataSource });
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

    checkPermission() {
        let IsAllowedAdd = false;
        let IsAllowedUpdate = false;
        let IsAllowedDelete = false;
        this.props.callGetUserCache(GET_CACHE_USER_FUNCTION_LIST).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                let _isAllowedAdd = result.ResultObject.CacheData.filter(x => x.FunctionID == MTRETURNREQUESTTYPE_ADD);
                if (_isAllowedAdd && _isAllowedAdd.length > 0) {
                    IsAllowedAdd = true;
                }

                let _isAllowUpdate = result.ResultObject.CacheData.filter(x => x.FunctionID == MTRETURNREQUESTTYPE_UPDATE);
                if (_isAllowUpdate && _isAllowUpdate.length > 0) {
                    IsAllowedUpdate = true;
                }

                let _isAllowedDelete = result.ResultObject.CacheData.filter(x => x.FunctionID == MTRETURNREQUESTTYPE_DELETE);
                if (_isAllowedDelete && _isAllowedDelete.length > 0) {
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

    displayInputControl(elementValue) {
        var selector = document.getElementsByClassName("form-row");
        selector[5].style.display = elementValue ? "" : "none";
        selector[6].style.display = elementValue ? "" : "none";
    }

    handleModalChange(formData, formValidation, elementName, elementValue) {
        if (elementName == "IsCheckMinMaxQuality") {
            var selector = document.getElementsByClassName("form-row");
            selector[5].style.display = elementValue ? "" : "none";
            selector[6].style.display = elementValue ? "" : "none";
            selector[7].style.display = elementValue ? "" : "none";
        } else if (elementName == "MaterialGroupID" && this.state.IsInsert) {
            let options = [];
            this.props.MaterialProductDataSource.map((item, index) => {
                if (item.MaterialGroupID == elementValue) {
                    options.push({ value: item.ProductID, name: item.ProductName })
                }
            })
            const elementlist = ModalColumnList_Insert;
            elementlist.forEach(function (objElement) {
                if (objElement.Name == "ProductID") {
                    objElement.listoption = options;
                    objElement.value = [];
                    formData.ProductID = [];
                }


            });
            this.setState({
                ModalColumnList_Insert: elementlist
            });
            return formData;
        }


        //console.log("formdata",formData);

        //return 1;
    }



    onClose() {

    }

    handleInsert(MLObjectDefinition, modalElementList, dataSource) {
        if (!this.state.IsAllowedAdd) {
            this.showMessage("Bạn không có quyền");
            return;
        }
        this.setState({ IsInsert: true });
        this.props.showModal(MODAL_TYPE_CONFIRMATION, {
            title: 'Thêm mới vật tư được phép trả của một yêu cầu nhập trả vật tư',
            autoCloseModal: false,
            onValueChange: this.handleModalChange,
            onClose: this.onClose,
            onConfirm: (isConfirmed, formData) => {
                if (isConfirmed) {
                    let MLObject = GetMLObjectData(MLObjectDefinition, formData, dataSource);
                    if (MLObject) {
                        MLObject.MTReturnRequestTypeID = this.state.MTReturnRequestTypeID;
                        MLObject.MaterialGroupID = MLObject.MaterialGroupID && Array.isArray(MLObject.MaterialGroupID) ? MLObject.MaterialGroupID[0] : MLObject.MaterialGroupID;
                        //MLObject.ProductID = MLObject.ProductID[0].ProductID;
                        MLObject.ProductID = MLObject.ProductID && Array.isArray(MLObject.ProductID) ? MLObject.ProductID[0] : -1;
                        MLObject.InventoryStatusID = MLObject.InventoryStatusID && Array.isArray(MLObject.InventoryStatusID) ? MLObject.InventoryStatusID[0] : MLObject.InventoryStatusID;
                        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
                        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;

                        //có kiểm tra số lượng lớn nhất nhỏ nhất
                        if (MLObject.IsCheckMinMaxQuality) {
                            if (MLObject.MinQuality === "") {
                                this.addNotification("Vui lòng nhập số lượng nhỏ nhất", true);
                                return;
                            } else if (MLObject.MaxQuality === "") {
                                this.addNotification("Vui lòng nhập số lượng lớn nhất", true);
                                return;
                            } else if (!(parseFloat(MLObject.MaxQuality) > parseFloat(MLObject.MinQuality))) {
                                this.addNotification("Số lượng lớn nhất phải > số lượng nhỏ nhất", true);
                                return;
                            } else if (parseFloat(MLObject.MaxQuality) < 0 || parseFloat(MLObject.MinQuality) < 0) {
                                this.addNotification("Vui lòng nhập số dương", true);
                                return;
                            } else if (!MLObject.IsAllowDecimal && (!Number.isInteger(parseFloat(MLObject.MaxQuality)) || !Number.isInteger(parseFloat(MLObject.MinQuality)))) {
                                this.addNotification("Vui lòng nhập số nguyên", true);
                                return;
                            }

                        }

                        //số lượng chỉ được 1 số thập phân
                        if (MLObject.MinQuality.toString().indexOf(".") != -1 && !(/^\d+(\.\d{3})$/).test(parseFloat(MLObject.MinQuality))) {
                            this.addNotification("Số lượng nhỏ nhất chỉ được phép nhập 3 số thập phân", true);
                            return;
                        } else if (MLObject.MaxQuality.toString().indexOf(".") != -1 && !(/^\d+(\.\d{3})$/).test(parseFloat(MLObject.MaxQuality))) {
                            this.addNotification("Số lượng lớn nhất chỉ được phép nhập 3 số thập phân", true);
                            return;
                        }


                        this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then(apiResult => {
                            if (!apiResult.IsError) {
                                if (this.props.onComponentChange) {
                                    this.props.onComponentChange();
                                }
                                this.props.callClearLocalCache(ERPCOMMONCACHE_MTRETURNRQTYPE_PR);
                                this.props.hideModal();
                            }
                            //this.showMessage(apiResult.Message);
                            this.addNotification(apiResult.Message, apiResult.IsError);
                        });
                        //console.log("dsadad", MLObject);
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

        let _IsCheckMinMaxQuality = _DataSource.IsCheckMinMaxQuality;
        setTimeout(() => {
            this.displayInputControl(_IsCheckMinMaxQuality);
        }, 100);

        this.props.showModal(MODAL_TYPE_CONFIRMATION, {
            title: 'Chỉnh sửa vật tư được phép trả của một yêu cầu nhập trả vật tư',
            onValueChange: this.handleModalChange,
            onClose: this.onClose,
            onConfirm: (isConfirmed, formData) => {
                if (isConfirmed) {
                    let MLObject = GetMLObjectData(MLObjectDefinition, formData, _DataSource);
                    if (MLObject) {
                        MLObject.MTReturnRequestTypeID = this.state.MTReturnRequestTypeID;
                        //MLObject.MaterialGroupID = MLObject.MaterialGroupID && Array.isArray(MLObject.MaterialGroupID) ? MLObject.MaterialGroupID[0] : MLObject.MaterialGroupID;
                        //MLObject.ProductID = MLObject.ProductID && Array.isArray(MLObject.ProductID) ? MLObject.ProductID[0].ProductID : MLObject.ProductID;
                        MLObject.InventoryStatusID = MLObject.InventoryStatusID && Array.isArray(MLObject.InventoryStatusID) ? MLObject.InventoryStatusID[0] : MLObject.InventoryStatusID;
                        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
                        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;

                        if (MLObject.IsCheckMinMaxQuality) {
                            if (MLObject.MinQuality === "") {
                                this.addNotification("Vui lòng nhập số lượng nhỏ nhất", true);
                                return;
                            } else if (MLObject.MaxQuality === "") {
                                this.addNotification("Vui lòng nhập số lượng lớn nhất", true);
                                return;
                            } else if (!(parseFloat(MLObject.MaxQuality) > parseFloat(MLObject.MinQuality))) {
                                this.addNotification("Số lượng lớn nhất phải > số lượng nhỏ nhất", true);
                                return;
                            } else if (parseFloat(MLObject.MaxQuality) < 0 || parseFloat(MLObject.MinQuality) < 0) {
                                this.addNotification("Vui lòng nhập số dương", true);
                                return;
                            } else if (!MLObject.IsAllowDecimal && (!Number.isInteger(parseFloat(MLObject.MaxQuality)) || !Number.isInteger(parseFloat(MLObject.MinQuality)))) {
                                this.addNotification("Vui lòng nhập số nguyên", true);
                                return;
                            }

                        }


                        //số lượng chỉ được 1 số thập phân
                        if (MLObject.MinQuality.toString().indexOf(".") != -1 && !(/^\d+(\.\d{3})$/).test(parseFloat(MLObject.MinQuality))) {
                            this.addNotification("Số lượng nhỏ nhất chỉ được phép nhập 3 số thập phân", true);
                            return;
                        } else if (MLObject.MaxQuality.toString().indexOf(".") != -1 && !(/^\d+(\.\d{3})$/).test(parseFloat(MLObject.MaxQuality))) {
                            this.addNotification("Số lượng lớn nhất chỉ được phép nhập 3 số thập phân", true);
                            return;
                        }

                        this.props.callFetchAPI(APIHostName, UpdateAPIPath, MLObject).then(apiResult => {
                            if (!apiResult.IsError) {
                                if (this.props.onComponentChange) {
                                    this.props.onComponentChange();
                                }
                                this.props.callClearLocalCache(ERPCOMMONCACHE_MTRETURNRQTYPE_PR);
                                this.props.hideModal();
                            }
                            //this.showMessage(apiResult.Message);
                            this.addNotification(apiResult.Message, apiResult.IsError);
                        });
                        this.resetCombobox();
                        //console.log("edit", MLObject);
                    }
                }
            },
            modalElementList: ModalColumnList_Edit,
            formData: _DataSource
        });
    }



    handleDelete(deleteList, pkColumnName) {
        if (!this.state.IsAllowedDelete) {
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
            MLObject.MTReturnRequestTypeID = this.state.MTReturnRequestTypeID;
            listMLObject.push(MLObject);
        });


        this.props.callFetchAPI(APIHostName, DeleteAPIPath, listMLObject).then(apiResult => {
            if (!apiResult.IsError) {
                if (this.props.onComponentChange) {
                    this.props.onComponentChange();
                }
                this.props.callClearLocalCache(ERPCOMMONCACHE_MTRETURNRQTYPE_PR);
                this.props.hideModal();
            }
            //this.showMessage(apiResult.Message);
            this.addNotification(apiResult.Message, apiResult.IsError);
        });

    }


    render() {
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }

        return (
            <div className="sub-grid detail">
                <ReactNotification ref={this.notificationDOMRef} />
                <DataGrid listColumn={DataGridColumnList}
                    dataSource={this.state.DataSource}
                    modalElementList={this.state.ModalColumnList_Insert}
                    MLObjectDefinition={MLObjectDefinition}
                    IDSelectColumnName={"chkSelectProductID"}
                    PKColumnName={"ProductID,MaterialGroupID"}
                    onDeleteClick={this.handleDelete}
                    onInsertClick={this.handleInsert}
                    onInsertClickEdit={this.handleEdit}
                    IsAutoPaging={false}
                    //RowsPerPage={10}
                    IsCustomAddLink={true}
                    headingTitle={"Vật tư được phép trả của một yêu cầu nhập trả vật tư"}
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

const MTReturnRequestType_Product = connect(mapStateToProps, mapDispatchToProps)(MTReturnRequestType_ProductCom);
export default MTReturnRequestType_Product;
