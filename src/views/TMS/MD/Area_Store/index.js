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
    ModalColumnList_Insert, ModalColumnList_Edit, DataGridColumnList, MLObjectDefinition
} from "./constants";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { callGetCache, callClearLocalCache } from "../../../../actions/cacheAction";
import { ERPCOMMONCACHE_STORE, ERPCOMMONCACHE_AREA } from "../../../../constants/keyCache";

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
            AreaStoreDataSource: this.props.AreaStoreDataSource ? this.props.AreaStoreDataSource : [],
            AreaID: this.props.AreaID,
            IsInsert: true,
            ModalColumnList_Insert: ModalColumnList_Insert,
            ModalColumnList_Edit: ModalColumnList_Edit
        };
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.AreaID !== this.state.AreaID) {
            this.setState({ AreaID: nextProps.AreaID });
        }
    }

    componentDidMount() {
        this.initCache();

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
        this.setState({ IsInsert: true });
        this.props.showModal(MODAL_TYPE_CONFIRMATION, {
            title: 'Thêm mới kho điều phối của khu vực',
            autoCloseModal: false,
            onValueChange: this.handleModalChange,
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
                        let match = this.state.AreaStoreDataSource.filter(item =>
                            item.AreaID == MLObject.AreaID
                            && item.StoreID == MLObject.StoreID);
                        if (match.length) {
                            this.showMessage("Dữ liệu đã tồn tại.");
                            return;
                        }
                        let _AreaStoreDataSource = this.state.AreaStoreDataSource;
                        _AreaStoreDataSource.push(MLObject);
                        _AreaStoreDataSource.sort((a, b) => (a.StoreID > b.StoreID) ? 1 : ((b.StoreID > a.StoreID) ? -1 : 0));
                        this.setState({ AreaStoreDataSource: _AreaStoreDataSource });
                        if (this.props.onAreaStoreChange) {
                            this.props.onAreaStoreChange(_AreaStoreDataSource);
                        }
                        this.props.hideModal();
                        this.resetCombobox();
                    }
                }
            },
            modalElementList: modalElementList,
        });
    }

    handleEdit(value, pkColumnName) {
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
                        let _AreaStoreDataSource = this.state.AreaStoreDataSource
                            .filter(item => item.AreaID != MLObject.AreaID
                                || item.StoreID != MLObject.StoreID);
                        _AreaStoreDataSource.push(MLObject);
                        _AreaStoreDataSource.sort((a, b) => (a.StoreID > b.StoreID) ? 1 : ((b.StoreID > a.StoreID) ? -1 : 0));
                        this.setState({ AreaStoreDataSource: _AreaStoreDataSource });
                        if (this.props.onAreaStoreChange) {
                            this.props.onAreaStoreChange(_AreaStoreDataSource);
                        }
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
        let _AreaStoreDataSource = this.state.AreaStoreDataSource;
        deleteList.map((row, index) => {
            let MLObject = {};
            pkColumnName.map((pkItem, pkIndex) => {
                MLObject[pkItem.key] = row.pkColumnName[pkIndex].value;
            });
            let _deleteList = _AreaStoreDataSource.filter(item => item.AreaStoreCSID == MLObject.AreaStoreCSID);
            _deleteList[0].IsDeleted = true;
            _AreaStoreDataSource = _AreaStoreDataSource.filter(item => item.AreaStoreCSID != MLObject.AreaStoreCSID);
            _AreaStoreDataSource.push(_deleteList[0]);
            _AreaStoreDataSource.sort((a, b) => (a.StoreID > b.StoreID) ? 1 : ((b.StoreID > a.StoreID) ? -1 : 0));
        });
        this.setState({ AreaStoreDataSource: _AreaStoreDataSource });
        if (this.props.onAreaStoreChange) {
            this.props.onAreaStoreChange(_AreaStoreDataSource);
        }
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

            <div className="sub-grid">
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
        }

    };
};

const Area_Store = connect(mapStateToProps, mapDispatchToProps)(Area_StoreCom);
export default Area_Store;
