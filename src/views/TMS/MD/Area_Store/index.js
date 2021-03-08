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
    ModalColumnList_Insert, ModalColumnList_Edit, DataGridColumnList, MLObjectDefinition,
    AddAPIPath, UpdateAPIPath, DeleteAPIPath, APIHostName
} from "./constants";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { callGetCache, callGetUserCache, callClearLocalCache } from "../../../../actions/cacheAction";
import { ERPCOMMONCACHE_STORE, ERPCOMMONCACHE_AREA, ERPCOMMONCACHE_STORE_AREA } from "../../../../constants/keyCache";
import { AREA_ADD, AREA_DELETE, AREA_UPDATE, GET_CACHE_USER_FUNCTION_LIST } from "../../../../constants/functionLists";

class Area_StoreCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleInsert = this.handleInsert.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.initCache = this.initCache.bind(this);
        this.resetCombobox = this.resetCombobox.bind(this);
        this.initDatasource = this.initDatasource.bind(this);
        this.handleModalChange = this.handleModalChange.bind(this);
        this.onClose = this.onClose.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false,
            cssNotification: "",
            iconNotification: "",
            AreaStoreDataSource: this.props.AreaStoreDataSource ? this.props.AreaStoreDataSource : [],
            AreaStoreAllDataSource: this.props.AreaStoreAllDataSource ? this.props.AreaStoreAllDataSource : [],
            AreaID: this.props.AreaID,
            IsInsert: true,
            ModalColumnList_Insert: ModalColumnList_Insert,
            ModalColumnList_Edit: ModalColumnList_Edit
        };
        this.notificationDOMRef = React.createRef();
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.AreaID !== this.state.AreaID) {
            this.setState({ AreaID: nextProps.AreaID });
        }

        if (nextProps.AreaStoreAllDataSource !== this.state.AreaStoreAllDataSource) {
            this.setState({ AreaStoreAllDataSource: nextProps.AreaStoreAllDataSource });
        }

        if (nextProps.AreaStoreDataSource !== this.state.AreaStoreDataSource) {
            this.setState({ AreaStoreDataSource: nextProps.AreaStoreDataSource });
            this.initCache();
        }
    }

    componentDidMount() {
        this.initCache();
        this.checkPermission();

    }

    checkPermission() {
        let IsAllowedAdd = false;
        let IsAllowedDelete = false;
        let IsAllowedUpdate = false;
        this.props.callGetUserCache(GET_CACHE_USER_FUNCTION_LIST).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                let isAllowAdd = result.ResultObject.CacheData.filter(x => x.FunctionID == AREA_ADD);
                if (isAllowAdd && isAllowAdd.length > 0) {
                    IsAllowedAdd = true;
                }

                let isAllowUpdate = result.ResultObject.CacheData.filter(x => x.FunctionID == AREA_UPDATE);
                if (isAllowUpdate && isAllowUpdate.length > 0) {
                    IsAllowedUpdate = true;
                }

                let isAllowDelete = result.ResultObject.CacheData.filter(x => x.FunctionID == AREA_DELETE);
                if (isAllowDelete && isAllowDelete.length > 0) {
                    IsAllowedDelete = true;
                }
                this.setState({
                    IsAllowedAdd: IsAllowedAdd,
                    IsAllowedUpdate: IsAllowedUpdate,
                    IsAllowedDelete: IsAllowedDelete
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


    initCache() {

        // lấy cache khu vực
        this.props.callGetCache(ERPCOMMONCACHE_AREA).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                this.setState({
                    Area: result.ResultObject.CacheData
                });
            }
        });

        //lấy cache chi nhánh
        this.props.callGetCache(ERPCOMMONCACHE_STORE).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                this.setState({
                    Store: result.ResultObject.CacheData
                });
            }
        });

        this.props.callGetCache(ERPCOMMONCACHE_STORE).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                //console.log("FormElement listOption: ", listOption)
                let _AreaStoreAll = this.state.AreaStoreAllDataSource ? this.state.AreaStoreAllDataSource : [];
                //let _list = result.ResultObject.CacheData.filter(x => x.AreaID == this.state.AreaID && datasource.filter(y => y.StoreID == x.StoreID).length == 0)
                let _list = result.ResultObject.CacheData.filter(x => x.CompanyID == 10 && x.IsActive == true && _AreaStoreAll.filter(y => y.StoreID == x.StoreID).length == 0);
                //console.log("_list", _list, _AreaStoreAll)
                let _list2 = [];
                if (_list.length > 0) {
                    _list2 = _list.map((item, index) => {
                        return { value: item.StoreID, label: item.StoreName, name: item.StoreName };
                    });
                }
                this.setState({
                    StoreArea: _list2
                });
            } else {
                this.setState({
                    StoreArea: []
                });
            }
        });

    }

    getDataCombobox(data, valueMember, nameMember, conditionName, conditionValue) {
        let listOption = [{ value: "-1", label: "------ Chọn ------" }];
        if (data) {
            data.map((cacheItem) => {
                if (conditionName && conditionValue != -1 && cacheItem.CompanyID == 10) {
                    if (cacheItem[conditionName] == conditionValue) {
                        listOption.push({ value: cacheItem[valueMember], label: cacheItem[nameMember], name: cacheItem[nameMember] });
                    }
                }
            });
            return listOption;
        }

    }

    handleModalChange(formData, formValidation, elementName, elementValue) {
        let isInsert = this.state.IsInsert;
        let _ModalColumnList = isInsert ? this.state.ModalColumnList_Insert : this.state.ModalColumnList_Edit;
        let listOptionNull = [{ value: "-1", label: "------ Chọn ------" }];
        let listOption = [];
        _ModalColumnList.forEach(function (objElement) {
            if (elementName == "AreaID") {
                // if (objElement.Name == "AreaID") {
                //     objElement.value = elementValue;
                // }
                if (objElement.Name == "StoreID") {
                    listOption = this.getDataCombobox(this.state.Store, "StoreID", "StoreName", "AreaID", elementValue);
                    objElement.listoption = listOption;
                    objElement.value = "-1";
                }
            }

        }.bind(this));

        if (isInsert) {
            this.setState({
                ModalColumnList_Insert: _ModalColumnList
            });
        } else {
            this.setState({
                ModalColumnList_Edit: _ModalColumnList
            });
        }
        //console.log("formData", listOption);
    }

    resetCombobox() {
        // this.state.ModalColumnList_Insert.forEach(function (objElement) {
        //     if (objElement.Name != "IsActived") {
        //         objElement.listoption = [];
        //         objElement.value = "";
        //     }

        // });

        // this.state.ModalColumnList_Edit.forEach(function (objElement) {
        //     objElement.listoption = [];
        // });
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


        modalElementList.map((item, index) => {
            if (item.Name == "StoreID") {
                item.listoption = this.state.StoreArea;
            }
        });



        console.log("modalElementList", modalElementList, this.state.AreaStoreDataSource);
        this.props.showModal(MODAL_TYPE_CONFIRMATION, {
            title: 'Thêm mới kho điều phối của khu vực',
            autoCloseModal: false,
            //onValueChange: this.handleModalChange,
            onClose: this.onClose,
            onConfirm: (isConfirmed, formData) => {
                if (isConfirmed) {
                    let MLObject = GetMLObjectData(MLObjectDefinition, formData, dataSource);
                    if (MLObject) {
                        MLObject.AreaStoreCSID = this.state.AreaID + "," + MLObject.StoreID;
                        MLObject.AreaID = this.state.AreaID;
                        MLObject.StoreID = MLObject.StoreID && Array.isArray(MLObject.StoreID) ? MLObject.StoreID[0] : MLObject.StoreID;
                        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
                        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
                        // let match = this.state.AreaStoreDataSource.filter(item =>
                        //     item.AreaID == MLObject.AreaID
                        //     && item.StoreID == MLObject.StoreID);
                        // if (match.length) {
                        //     this.showMessage("Dữ liệu đã tồn tại.");
                        //     return;
                        // }
                        // let _AreaStoreDataSource = this.state.AreaStoreDataSource;
                        // _AreaStoreDataSource.push(MLObject);
                        // _AreaStoreDataSource.sort((a, b) => (a.StoreID > b.StoreID) ? 1 : ((b.StoreID > a.StoreID) ? -1 : 0));
                        // this.setState({ AreaStoreDataSource: _AreaStoreDataSource });
                        // if (this.props.onAreaStoreChange) {
                        //     this.props.onAreaStoreChange(_AreaStoreDataSource);
                        // }

                        this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then(apiResult => {
                            if (!apiResult.IsError) {
                                if (this.props.onAreaStoreChange) {
                                    this.props.onAreaStoreChange();
                                }
                                this.props.callClearLocalCache(ERPCOMMONCACHE_STORE_AREA);
                                this.props.hideModal();
                            }
                            //this.showMessage(apiResult.Message);
                            this.addNotification(apiResult.Message, apiResult.IsError);
                        });

                        //this.props.hideModal();
                        this.resetCombobox();
                    }
                }
            },
            modalElementList: modalElementList,
        });


    }

    handleEdit(value, pkColumnName) {
        if (!this.state.IsAllowedUpdate) {
            this.showMessage("Bạn không có quyền");
            return;
        }

        this.setState({ IsInsert: false });
        let _AreaStoreDataSource = {};
        this.state.AreaStoreDataSource.map((item, index) => {
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
                _AreaStoreDataSource = item;
            }
        });

        this.props.showModal(MODAL_TYPE_CONFIRMATION, {
            title: 'Chỉnh sửa kho điều phối của khu vực',
            //onValueChange: this.handleModalChange,
            onClose: this.onClose,
            onConfirm: (isConfirmed, formData) => {
                if (isConfirmed) {
                    let MLObject = GetMLObjectData(MLObjectDefinition, formData, _AreaStoreDataSource);
                    if (MLObject) {
                        MLObject.AreaStoreCSID = this.state.AreaID + "," + MLObject.StoreID;
                        MLObject.AreaID = this.state.AreaID;
                        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
                        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
                        // let _AreaStoreDataSource = this.state.AreaStoreDataSource
                        //     .filter(item => item.AreaID != MLObject.AreaID
                        //         || item.StoreID != MLObject.StoreID);
                        // _AreaStoreDataSource.push(MLObject);
                        // _AreaStoreDataSource.sort((a, b) => (a.StoreID > b.StoreID) ? 1 : ((b.StoreID > a.StoreID) ? -1 : 0));
                        // this.setState({ AreaStoreDataSource: _AreaStoreDataSource });
                        // if (this.props.onAreaStoreChange) {
                        //     this.props.onAreaStoreChange(_AreaStoreDataSource);
                        // }

                        this.props.callFetchAPI(APIHostName, UpdateAPIPath, MLObject).then(apiResult => {
                            if (!apiResult.IsError) {
                                if (this.props.onAreaStoreChange) {
                                    this.props.onAreaStoreChange();
                                }
                                this.props.callClearLocalCache(ERPCOMMONCACHE_STORE_AREA);
                                this.props.hideModal();
                            }
                            //this.showMessage(apiResult.Message);
                            this.addNotification(apiResult.Message, apiResult.IsError);
                        });

                        this.props.hideModal();
                        this.resetCombobox();
                    }
                }
            },
            modalElementList: ModalColumnList_Edit,
            formData: _AreaStoreDataSource
        });
    }

    handleDelete(deleteList, pkColumnName) {
        // let _AreaStoreDataSource = this.state.AreaStoreDataSource;
        // deleteList.map((row, index) => {
        //     let MLObject = {};
        //     pkColumnName.map((pkItem, pkIndex) => {
        //         MLObject[pkItem.key] = row.pkColumnName[pkIndex].value;
        //     });
        //     let _deleteList = _AreaStoreDataSource.filter(item => item.AreaStoreCSID == MLObject.AreaStoreCSID);
        //     _deleteList[0].IsDeleted = true;
        //     _AreaStoreDataSource = _AreaStoreDataSource.filter(item => item.AreaStoreCSID != MLObject.AreaStoreCSID);
        //     _AreaStoreDataSource.push(_deleteList[0]);
        //     _AreaStoreDataSource.sort((a, b) => (a.StoreID > b.StoreID) ? 1 : ((b.StoreID > a.StoreID) ? -1 : 0));
        // });
        // this.setState({ AreaStoreDataSource: _AreaStoreDataSource });
        // if (this.props.onAreaStoreChange) {
        //     this.props.onAreaStoreChange(_AreaStoreDataSource);
        // }
        // if (!this.state.IsAllowedDelete) {
        //     this.showMessage("Bạn không có quyền");
        //     return;
        // }

        // let listMLObject = [];
        // deleteList.map((row, index) => {
        //     let MLObject = {};
        //     pkColumnName.map((pkItem, pkIndex) => {
        //         MLObject[pkItem.key] = row.pkColumnName[pkIndex].value;
        //     });

        //     MLObject.DeletedUser = this.props.AppInfo.LoginInfo.Username;
        //     MLObject.AreaID = this.state.AreaID;
        //     listMLObject.push(MLObject);
        // });


        // this.props.callFetchAPI(APIHostName, DeleteAPIPath, listMLObject).then(apiResult => {
        //     if (!apiResult.IsError) {
        //         if (this.props.onAreaStoreChange) {
        //             this.props.onAreaStoreChange();
        //         }
        //         this.props.hideModal();
        //     }
        //     //this.showMessage(apiResult.Message);
        //     this.addNotification(apiResult.Message, apiResult.IsError);
        // });

        if (!this.state.IsAllowedDelete) {
            this.showMessage("Bạn không có quyền");
            return;
        }
        let listMLObject = [];
        let _AreaStoreDataSource = this.state.AreaStoreDataSource;
        deleteList.map((row, index) => {
            let MLObject = {};
            pkColumnName.map((pkItem, pkIndex) => {
                MLObject[pkItem.key] = row.pkColumnName[pkIndex].value;
            });

            let _deleteList = _AreaStoreDataSource.filter(item => item.AreaStoreCSID == MLObject.AreaStoreCSID);
            if (_deleteList && _deleteList.length > 0) {
                _deleteList[0].DeletedUser = this.props.AppInfo.LoginInfo.Username;
                listMLObject.push(_deleteList[0]);
            }

        });


        this.props.callFetchAPI(APIHostName, DeleteAPIPath, listMLObject).then(apiResult => {
            if (!apiResult.IsError) {
                if (this.props.onAreaStoreChange) {
                    this.props.onAreaStoreChange();
                }
                this.props.callClearLocalCache(ERPCOMMONCACHE_STORE_AREA);
                this.props.hideModal();
            }
            //this.showMessage(apiResult.Message);
            this.addNotification(apiResult.Message, apiResult.IsError);
        });
    }

    isNumeric(value) {
        return /^-{0,1}\d+$/.test(value);
    }

    initDatasource(dataSource) {
        let store = this.state.Store ? this.state.Store : [];
        let match = [];
        dataSource = dataSource.map(function (item, index) {
            match = store.filter(x => x.StoreID == item.StoreID);
            if (match && match.length > 0) {
                item.StoreName = match[0].StoreID + " - " + match[0].StoreName;
            }
            return item;
        }.bind(this));
        //console.log("dataSource",dataSource);
        return dataSource;
    }

    render() {
        let datasource = this.state.AreaStoreDataSource.filter(item => item.IsDeleted == undefined || item.IsDeleted == false);
        datasource = this.initDatasource(datasource);


        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        if (!this.state.AreaID || !this.isNumeric(this.state.AreaID)) {
            return (
                <Collapsible trigger="Danh sách các chi nhánh của khu vực" easing="ease-in" open={true}>
                    Đang nạp dữ liệu ......
                </Collapsible>
            );
        }

        return (
            // <Collapsible trigger="Danh sách các chi nhánh của khu vực" easing="ease-in" open={true}>

            // </Collapsible>

            <div className="sub-grid detail">
                <ReactNotification ref={this.notificationDOMRef} />
                <DataGrid listColumn={DataGridColumnList}
                    dataSource={datasource}
                    modalElementList={ModalColumnList_Insert}
                    MLObjectDefinition={MLObjectDefinition}
                    IDSelectColumnName={"chkSelectAreaStoreCSID"}
                    PKColumnName={"AreaStoreCSID"}
                    onDeleteClick={this.handleDelete}
                    onInsertClick={this.handleInsert}
                    onInsertClickEdit={this.handleEdit}
                    IsAutoPaging={true}
                    RowsPerPage={10}
                    IsCustomAddLink={true}
                    headingTitle={"Danh sách kho điều phối của khu vực"}
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
        },

    };
};

const Area_Store = connect(mapStateToProps, mapDispatchToProps)(Area_StoreCom);
export default Area_Store;
