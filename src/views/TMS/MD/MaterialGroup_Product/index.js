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
import { ERPCOMMONCACHE_SKILLRANK } from "../../../../constants/keyCache";

class MaterialGroup_ProductCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleInsert = this.handleInsert.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.initCache = this.initCache.bind(this);
        this.resetCombobox = this.resetCombobox.bind(this);
        this.initDatasource = this.initDatasource.bind(this);
        this.onClose = this.onClose.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false,
            MaterialGroupProductDataSource: this.props.MaterialGroupProductDataSource ? this.props.MaterialGroupProductDataSource : [],
            MaterialGroupID: this.props.MaterialGroupID,
            IsInsert: true,
            ModalColumnList_Insert: ModalColumnList_Insert,
            ModalColumnList_Edit: ModalColumnList_Edit
        };
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.MaterialGroupID !== this.state.MaterialGroupID) {
            this.setState({ MaterialGroupID: nextProps.MaterialGroupID });
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
        //lấy cache cấp bậc kỹ năng
        this.props.callGetCache(ERPCOMMONCACHE_SKILLRANK).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                this.setState({
                    SkillRank: result.ResultObject.CacheData
                });
            }
        });

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

    validateForm(formData) {
        debugger;
        let valid = true;
        if ((formData.ProductID == undefined || formData.ProductID == -1 || !formData.ProductID[0] || !formData.ProductID[0].ProductID )) {
            valid = false;
        }

        return valid;
    }

    handleInsert(MLObjectDefinition, modalElementList, dataSource) {
        this.setState({ IsInsert: true });
        this.props.showModal(MODAL_TYPE_CONFIRMATION, {
            title: 'Thêm mới sản phẩm của nhóm vật tư',
            autoCloseModal: false,
            //onValueChange: this.handleModalChange,
            onClose: this.onClose,
            onConfirm: (isConfirmed, formData) => {
                if (isConfirmed) {
                    let valid = this.validateForm(formData);
                    if (!valid) {
                        this.showMessage("Vui lòng nhập mã sản phẩm vật tư");
                        return;
                    }
                    let MLObject = GetMLObjectData(MLObjectDefinition, formData, dataSource);
                    if (MLObject) {
                        MLObject.MaterialGroupProductCSID = this.state.MaterialGroupID + "," + MLObject.ProductID[0].ProductID;
                        MLObject.MaterialGroupID = this.state.MaterialGroupID;
                        MLObject.ProductID = MLObject.ProductID[0].ProductID;
                        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
                        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
                        let match = this.state.MaterialGroupProductDataSource.filter(item =>
                            item.MaterialGroupID == MLObject.MaterialGroupID
                            && item.ProductID == MLObject.ProductID);
                        if (match.length) {
                            this.showMessage("Dữ liệu đã tồn tại.");
                            return;
                        }
                        let _MaterialGroupProductDataSource = this.state.MaterialGroupProductDataSource;
                        _MaterialGroupProductDataSource.push(MLObject);
                        _MaterialGroupProductDataSource.sort((a, b) => (a.ProductID > b.ProductID) ? 1 : ((b.ProductID > a.ProductID) ? -1 : 0));
                        this.setState({ MaterialGroupProductDataSource: _MaterialGroupProductDataSource });
                        if (this.props.onMaterialGroupProductChange) {
                            this.props.onMaterialGroupProductChange(_MaterialGroupProductDataSource);
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
        let _MaterialGroupProductDataSource = {};
        this.state.MaterialGroupProductDataSource.map((item, index) => {
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
                _MaterialGroupProductDataSource = item;
            }
        });

        this.props.showModal(MODAL_TYPE_CONFIRMATION, {
            title: 'Chỉnh sửa sản phẩm của nhóm vật tư',
            //onValueChange: this.handleModalChange,
            onClose: this.onClose,
            onConfirm: (isConfirmed, formData) => {
                if (isConfirmed) {
                    let MLObject = GetMLObjectData(MLObjectDefinition, formData, _MaterialGroupProductDataSource);
                    if (MLObject) {
                        //MLObject.MaterialGroupProductCSID = this.state.MaterialGroupID + "," + MLObject.ProductID;
                        //MLObject.MaterialGroupID = this.state.MaterialGroupID;
                        //MLObject.ProductID = MLObject.ProductID[0].ProductID;
                        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
                        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
                        let _MaterialGroupProductDataSource = this.state.MaterialGroupProductDataSource
                            .filter(item => item.MaterialGroupID != MLObject.MaterialGroupID
                                || item.ProductID != MLObject.ProductID);
                        _MaterialGroupProductDataSource.push(MLObject);
                        _MaterialGroupProductDataSource.sort((a, b) => (a.ProductID > b.ProductID) ? 1 : ((b.ProductID > a.ProductID) ? -1 : 0));
                        this.setState({ MaterialGroupProductDataSource: _MaterialGroupProductDataSource });
                        if (this.props.onMaterialGroupProductChange) {
                            this.props.onMaterialGroupProductChange(_MaterialGroupProductDataSource);
                        }
                        this.props.hideModal();
                        this.resetCombobox();
                    }
                }
            },
            modalElementList: ModalColumnList_Edit,
            formData: _MaterialGroupProductDataSource
        });
    }

    handleDelete(deleteList, pkColumnName) {
        let _MaterialGroupProductDataSource = this.state.MaterialGroupProductDataSource;
        deleteList.map((row, index) => {
            let MLObject = {};
            pkColumnName.map((pkItem, pkIndex) => {
                MLObject[pkItem.key] = row.pkColumnName[pkIndex].value;
            });
            let _deleteList = _MaterialGroupProductDataSource.filter(item => item.MaterialGroupProductCSID == MLObject.MaterialGroupProductCSID);
            _deleteList[0].IsDeleted = true;
            _MaterialGroupProductDataSource = _MaterialGroupProductDataSource.filter(item => item.MaterialGroupProductCSID != MLObject.MaterialGroupProductCSID);
            _MaterialGroupProductDataSource.push(_deleteList[0]);
            _MaterialGroupProductDataSource.sort((a, b) => (a.ProductID > b.ProductID) ? 1 : ((b.ProductID > a.ProductID) ? -1 : 0));
        });
        this.setState({ MaterialGroupProductDataSource: _MaterialGroupProductDataSource });
        if (this.props.onMaterialGroupProductChange) {
            this.props.onMaterialGroupProductChange(_MaterialGroupProductDataSource);
        }
    }

    isNumeric(value) {
        return /^-{0,1}\d+$/.test(value);
    }

    initDatasource(dataSource) {
        let skillRank = this.state.SkillRank ? this.state.SkillRank : [];
        let match = [];
        dataSource = dataSource.map(function (item, index) {
            match = skillRank.filter(x => x.ProductID == item.ProductID);
            if (match && match.length > 0) {
                item.SkillRankName = match[0].SkillRankName;
            }
            return item;
        }.bind(this));
        //console.log("dataSource",dataSource);
        return dataSource;
    }

    render() {
        let datasource = this.state.MaterialGroupProductDataSource.filter(item => item.IsDeleted == undefined || item.IsDeleted == false);
        datasource = this.initDatasource(datasource);


        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        if (!this.state.MaterialGroupID) {
            return (
                <Collapsible trigger="Sản phẩm của nhóm vật tư" easing="ease-in" open={true}>
                    Đang nạp dữ liệu ......
                </Collapsible>
            );
        }

        return (
            <Collapsible trigger="Sản phẩm của nhóm vật tư" easing="ease-in" open={true}>
                <DataGrid listColumn={DataGridColumnList}
                    dataSource={datasource}
                    modalElementList={ModalColumnList_Insert}
                    MLObjectDefinition={MLObjectDefinition}
                    IDSelectColumnName={"chkSelectMaterialGroupProductCSID"}
                    PKColumnName={"MaterialGroupProductCSID"}
                    onDeleteClick={this.handleDelete}
                    onInsertClick={this.handleInsert}
                    onInsertClickEdit={this.handleEdit}
                    IsAutoPaging={true}
                    RowsPerPage={10}
                    IsCustomAddLink={true}
                />
            </Collapsible>
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

const MaterialGroup_Product = connect(mapStateToProps, mapDispatchToProps)(MaterialGroup_ProductCom);
export default MaterialGroup_Product;
