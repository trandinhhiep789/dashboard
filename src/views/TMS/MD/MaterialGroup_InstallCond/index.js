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
import { ERPCOMMONCACHE_MAINGROUP, ERPCOMMONCACHE_SUBGROUP, ERPCOMMONCACHE_SUBGROUPTECHSPECS, ERPCOMMONCACHE_TECHSPECSVALUE, ERPCOMMONCACHE_BRAND } from "../../../../constants/keyCache";

class MaterialGroup_InstallCondCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleInsert = this.handleInsert.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleModalChange = this.handleModalChange.bind(this);
        this.initCache = this.initCache.bind(this);
        this.resetCombobox = this.resetCombobox.bind(this);
        this.initDatasource = this.initDatasource.bind(this);
        this.setValueCombobox = this.setValueCombobox.bind(this);
        this.initComboboxMaterialProduct = this.initComboboxMaterialProduct.bind(this);
        this.onClose = this.onClose.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false,
            MaterialGroup_InstallCondDataSource: this.props.MaterialGroup_InstallCondDataSource ? this.props.MaterialGroup_InstallCondDataSource : [],
            MaterialGroup_ProductDataSource: this.props.MaterialGroup_ProductDataSource ? this.props.MaterialGroup_ProductDataSource : [],
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

        if (nextProps.MaterialGroup_ProductDataSource) {
            this.initComboboxMaterialProduct(nextProps.MaterialGroup_ProductDataSource);
        }
    }

    componentDidMount() {
        this.initCache();
        this.initComboboxMaterialProduct(this.state.MaterialGroup_ProductDataSource);
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

        //lấy cache thông số kỹ thuật 
        this.props.callGetCache(ERPCOMMONCACHE_SUBGROUPTECHSPECS).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                this.setState({
                    Techspecs: result.ResultObject.CacheData
                });
            }
        });

        //lấy cache giá trị thông số kỹ thuật 
        this.props.callGetCache(ERPCOMMONCACHE_TECHSPECSVALUE).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                this.setState({
                    TechspecsValue: result.ResultObject.CacheData
                });
            }
        });

        //lấy cache nhà sản xuất
        this.props.callGetCache(ERPCOMMONCACHE_BRAND).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                this.setState({
                    Brand: result.ResultObject.CacheData
                });
            }
        });
    }

    //khỏi tạo combo mã sp vật tư
    initComboboxMaterialProduct(datasource) {
        //load combo sản phẩm vật tư
        if (datasource.length > 0) {
            let _listoption = [{ value: -1, label: "------ Chọn ------" }]
            datasource.map((item, index) => {
                if (!item.IsDeleted) {
                    _listoption.push({ value: item.ProductID, label: item.ProductName });
                }

            })
            this.state.ModalColumnList_Insert.forEach(function (objElement) {
                if (objElement.Name == "MaterialProductID") {
                    objElement.listoption = _listoption;
                    objElement.value = "";
                }

            });
            this.state.ModalColumnList_Edit.forEach(function (objElement) {
                if (objElement.Name == "MaterialProductID") {
                    objElement.listoption = _listoption;
                }

            });
            //console.log("this.state.ModalColumnList_Insert", this.state.ModalColumnList_Insert);
        }
    }

    resetCombobox() {
        this.state.ModalColumnList_Insert.forEach(function (objElement) {
            if (objElement.Name != "IsActived" && objElement.Name != "MaterialProductID") {
                objElement.listoption = [];
                objElement.value = "";
            }

        });

        this.state.ModalColumnList_Edit.forEach(function (objElement) {
            if (objElement.Name != "MaterialProductID") {
                objElement.listoption = [];
            }
            //objElement.listoption = [];
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
            });
            return listOption;
        }

    }

    setValueCombobox(maingroup, subgroup, brand, techspecs, techspecsValue) {
        let _EditElementList = this.state.ModalColumnList_Edit;
        _EditElementList.forEach(function (objElement) {
            if (objElement.Name == "MainGroupID") {
                if (maingroup) {
                    objElement.value = maingroup;
                }
            }
            if (objElement.Name == "ApplySubGroupID") {
                if (maingroup) {
                    objElement.listoption = this.getDataCombobox(this.state.SubGroup, "SubGroupID", "SubGroupName", "MainGroupID", maingroup);;
                }
                if (subgroup) {
                    objElement.value = subgroup;
                }
            }
            if (objElement.Name == "ApplyBrandID") {
                objElement.listoption = this.getDataCombobox(this.state.Brand, "BrandID", "BrandName", "MainGroupID", maingroup);
                if (brand) {
                    objElement.value = brand;
                }
            }
            if (objElement.Name == "ApplyTechspecsID") {
                objElement.listoption = this.getDataCombobox(this.state.Techspecs, "TechspecsID", "TechspecsName", "SubGroupID", subgroup);
                if (techspecs) {
                    objElement.value = techspecs;
                }
            }

            if (objElement.Name == "ApplyTechspecsValueID") {
                objElement.listoption = this.getDataCombobox(this.state.TechspecsValue, "TechSpecsValueID", "Value", "TechSpecsID", techspecs);
                if (techspecsValue) {
                    objElement.value = techspecsValue;
                }
            }
        }.bind(this));
        this.setState({
            ModalColumnList_Edit: _EditElementList
        });
    }

    handleModalChange(formData, formValidation, elementName, elementValue) {
        let isInsert = this.state.IsInsert;
        let _ModalColumnList = isInsert ? this.state.ModalColumnList_Insert : this.state.ModalColumnList_Edit;
        let listOptionNull = [{ value: "-1", label: "------ Chọn ------" }];
        let listOption = [];
        _ModalColumnList.forEach(function (objElement) {
            if (elementName == "MainGroupID") {
                if (objElement.Name == "MainGroupID") {
                    objElement.value = elementValue;
                }
                if (objElement.Name == "ApplySubGroupID") {
                    listOption = this.getDataCombobox(this.state.SubGroup, "SubGroupID", "SubGroupName", "MainGroupID", elementValue);
                    objElement.listoption = listOption;
                    objElement.value = "-1";
                }
                if (objElement.Name == "ApplyBrandID") {
                    listOption = this.getDataCombobox(this.state.Brand, "BrandID", "BrandName", "MainGroupID", elementValue);
                    objElement.listoption = listOption;
                    objElement.value = "-1";
                }
                if (objElement.Name == "ApplyTechspecsID") {
                    objElement.listoption = listOptionNull;
                    objElement.value = "-1";
                }
                if (objElement.Name == "ApplyTechspecsValueID") {
                    objElement.listoption = listOptionNull;
                    objElement.value = "-1";
                }
            } else if (elementName == "ApplySubGroupID") {
                if (objElement.Name == "ApplySubGroupID") {
                    objElement.value = elementValue;
                }

                if (objElement.Name == "ApplyTechspecsID") {
                    listOption = this.getDataCombobox(this.state.Techspecs, "TechspecsID", "TechspecsName", "SubGroupID", elementValue);
                    objElement.listoption = listOption;
                    objElement.value = "-1";
                }
                if (objElement.Name == "ApplyTechspecsValueID") {
                    objElement.listoption = listOptionNull;
                    objElement.value = "-1";
                }
            } else if (elementName == "ApplyTechspecsID") {
                if (objElement.Name == "ApplyTechspecsID") {
                    objElement.value = elementValue;
                }
                if (objElement.Name == "ApplyTechspecsValueID") {
                    listOption = this.getDataCombobox(this.state.TechspecsValue, "TechSpecsValueID", "Value", "TechSpecsID", elementValue);
                    objElement.listoption = listOption;
                    objElement.value = "-1";
                }
            } else if (elementName == "ApplyTechspecsValueID") {
                if (objElement.Name == "ApplyTechspecsValueID") {
                    objElement.value = elementValue;
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

    onClose() {
        this.resetCombobox();
    }

    handleInsert(MLObjectDefinition, modalElementList, dataSource) {
        this.setState({ IsInsert: true });
        this.props.showModal(MODAL_TYPE_CONFIRMATION, {
            title: 'Thêm mới điều kiện lắp đặt của nhóm vật tư',
            autoCloseModal: false,
            onValueChange: this.handleModalChange,
            onClose: this.onClose,
            onConfirm: (isConfirmed, formData) => {
                if (isConfirmed) {
                    let MLObject = GetMLObjectData(MLObjectDefinition, formData, dataSource);
                    if (MLObject) {
                        MLObject.InstallCondID = Math.random();
                        MLObject.MaterialGroup = this.state.MaterialGroupID;
                        MLObject.MainGroupID = MLObject.MainGroupID && Array.isArray(MLObject.MainGroupID) ? MLObject.MainGroupID[0] : MLObject.MainGroupID;
                        MLObject.ApplySubGroupID = MLObject.ApplySubGroupID && Array.isArray(MLObject.ApplySubGroupID) ? MLObject.ApplySubGroupID[0] : MLObject.ApplySubGroupID;
                        MLObject.ApplyTechspecsID = MLObject.ApplyTechspecsID && Array.isArray(MLObject.ApplyTechspecsID) ? MLObject.ApplyTechspecsID[0] : MLObject.ApplyTechspecsID;
                        MLObject.ApplyTechspecsValueID = MLObject.ApplyTechspecsValueID && Array.isArray(MLObject.ApplyTechspecsValueID) ? MLObject.ApplyTechspecsValueID[0] : MLObject.ApplyTechspecsValueID;
                        MLObject.ApplyBrandID = MLObject.ApplyBrandID && Array.isArray(MLObject.ApplyBrandID) ? MLObject.ApplyBrandID[0] : MLObject.ApplyBrandID;
                        MLObject.ApplyProductID = MLObject.ApplyProductID && MLObject.ApplyProductID[0].ProductID ? MLObject.ApplyProductID[0].ProductID : MLObject.ApplyProductID;
                        //MLObject.MaterialProductID = MLObject.MaterialProductID && MLObject.MaterialProductID[0].ProductID ? MLObject.MaterialProductID[0].ProductID : MLObject.MaterialProductID;
                        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
                        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
                        
                        // let match = this.state.MaterialGroup_InstallCondDataSource.filter(item =>
                        //     item.MaterialGroupID == MLObject.MaterialGroupID
                        //     && item.ApplySubGroupID == MLObject.ApplySubGroupID
                        //     && item.ApplyTechspecsID == MLObject.ApplyTechspecsID
                        //     && item.ApplyTechspecsValueID == MLObject.ApplyTechspecsValueID
                        //     && item.ApplyBrandID == MLObject.ApplyBrandID);
                        // if (match.length) {
                        //     this.showMessage("Dữ liệu đã tồn tại.");
                        //     return;
                        // }

                        let _MaterialGroup_InstallCondDataSource = this.state.MaterialGroup_InstallCondDataSource;
                        _MaterialGroup_InstallCondDataSource.push(MLObject);
                        _MaterialGroup_InstallCondDataSource.sort((a, b) => (a.ApplySubGroupID > b.ApplySubGroupID) ? 1 : ((b.ApplySubGroupID > a.ApplySubGroupID) ? -1 : 0));
                        this.setState({ MaterialGroup_InstallCondDataSource: _MaterialGroup_InstallCondDataSource });
                        if (this.props.onMaterialGroup_InstallCondChange) {
                            this.props.onMaterialGroup_InstallCondChange(_MaterialGroup_InstallCondDataSource);
                        }
                        this.props.hideModal();
                        this.resetCombobox();
                    }
                }
            },
            modalElementList: this.state.ModalColumnList_Insert,
        });
    }

    handleEdit(value, pkColumnName) {
        this.setState({ IsInsert: false });
        let _MaterialGroup_InstallCondDataSource = {};
        this.state.MaterialGroup_InstallCondDataSource.map((item, index) => {
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
                _MaterialGroup_InstallCondDataSource = item;
            }
        });

        if (_MaterialGroup_InstallCondDataSource) {
            this.setValueCombobox(
                _MaterialGroup_InstallCondDataSource.MainGroupID,
                _MaterialGroup_InstallCondDataSource.ApplySubGroupID,
                _MaterialGroup_InstallCondDataSource.ApplyBrandID,
                _MaterialGroup_InstallCondDataSource.ApplyTechspecsID,
                _MaterialGroup_InstallCondDataSource.ApplyTechspecsValueID
            );

        }

        this.props.showModal(MODAL_TYPE_CONFIRMATION, {
            title: 'Chỉnh sửa điều kiện lắp đặt của nhóm vật tư',
            onValueChange: this.handleModalChange,
            onClose: this.onClose,
            onConfirm: (isConfirmed, formData) => {
                if (isConfirmed) {
                    let MLObject = GetMLObjectData(MLObjectDefinition, formData, _MaterialGroup_InstallCondDataSource);
                    if (MLObject) {
                        MLObject.MaterialGroup = this.state.MaterialGroupID;
                        MLObject.MainGroupID = MLObject.MainGroupID && Array.isArray(MLObject.MainGroupID) ? MLObject.MainGroupID[0] : MLObject.MainGroupID;
                        MLObject.ApplySubGroupID = MLObject.ApplySubGroupID && Array.isArray(MLObject.ApplySubGroupID) ? MLObject.ApplySubGroupID[0] : MLObject.ApplySubGroupID;
                        MLObject.ApplyTechspecsID = MLObject.ApplyTechspecsID && Array.isArray(MLObject.ApplyTechspecsID) ? MLObject.ApplyTechspecsID[0] : MLObject.ApplyTechspecsID;
                        MLObject.ApplyTechspecsValueID = MLObject.ApplyTechspecsValueID && Array.isArray(MLObject.ApplyTechspecsValueID) ? MLObject.ApplyTechspecsValueID[0] : MLObject.ApplyTechspecsValueID;
                        MLObject.ApplyBrandID = MLObject.ApplyBrandID && Array.isArray(MLObject.ApplyBrandID) ? MLObject.ApplyBrandID[0] : MLObject.ApplyBrandID;
                        MLObject.ApplyProductID = MLObject.ApplyProductID && MLObject.ApplyProductID[0].ProductID ? MLObject.ApplyProductID[0].ProductID : MLObject.ApplyProductID;
                        //MLObject.MaterialProductID = MLObject.MaterialProductID && MLObject.MaterialProductID[0].ProductID ? MLObject.MaterialProductID[0].ProductID : MLObject.MaterialProductID;
                        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
                        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;

                        // let match = this.state.MaterialGroup_InstallCondDataSource.filter(item =>
                        //     item.InstallCondID != MLObject.InstallCondID
                        //     && item.MaterialGroupID == MLObject.MaterialGroupID
                        //     && item.ApplySubGroupID == MLObject.ApplySubGroupID
                        //     && item.ApplyTechspecsID == MLObject.ApplyTechspecsID
                        //     && item.ApplyTechspecsValueID == MLObject.ApplyTechspecsValueID
                        //     && item.ApplyBrandID == MLObject.ApplyBrandID);
                        // if (match.length) {
                        //     this.showMessage("Dữ liệu đã tồn tại.");
                        //     return;
                        // }

                        let _MaterialGroup_InstallCondDataSource = this.state.MaterialGroup_InstallCondDataSource
                            .filter(item => item.InstallCondID != MLObject.InstallCondID);
                        _MaterialGroup_InstallCondDataSource.push(MLObject);
                        _MaterialGroup_InstallCondDataSource.sort((a, b) => (a.ApplySubGroupID > b.ApplySubGroupID) ? 1 : ((b.ApplySubGroupID > a.ApplySubGroupID) ? -1 : 0));
                        this.setState({ MaterialGroup_InstallCondDataSource: _MaterialGroup_InstallCondDataSource });
                        if (this.props.onMaterialGroup_InstallCondChange) {
                            this.props.onMaterialGroup_InstallCondChange(_MaterialGroup_InstallCondDataSource);
                        }
                        this.props.hideModal();
                        this.resetCombobox();
                    }
                }
            },
            modalElementList: this.state.ModalColumnList_Edit,
            formData: _MaterialGroup_InstallCondDataSource
        });
    }

    handleDelete(deleteList, pkColumnName) {
        let _MaterialGroup_InstallCondDataSource = this.state.MaterialGroup_InstallCondDataSource;
        deleteList.map((row, index) => {
            let MLObject = {};
            pkColumnName.map((pkItem, pkIndex) => {
                MLObject[pkItem.key] = row.pkColumnName[pkIndex].value;
            });
            let _deleteList = _MaterialGroup_InstallCondDataSource.filter(item => item.InstallCondID == MLObject.InstallCondID);
            _deleteList[0].IsDeleted = true;
            _MaterialGroup_InstallCondDataSource = _MaterialGroup_InstallCondDataSource.filter(item => item.InstallCondID != MLObject.InstallCondID);
            _MaterialGroup_InstallCondDataSource.push(_deleteList[0]);
            _MaterialGroup_InstallCondDataSource.sort((a, b) => (a.SubGroupID > b.SubGroupID) ? 1 : ((b.SubGroupID > a.SubGroupID) ? -1 : 0));
        });
        this.setState({ MaterialGroup_InstallCondDataSource: _MaterialGroup_InstallCondDataSource });
        if (this.props.onMaterialGroup_InstallCondChange) {
            this.props.onMaterialGroup_InstallCondChange(_MaterialGroup_InstallCondDataSource);
        }
    }

    isNumeric(value) {
        return /^-{0,1}\d+$/.test(value);
    }

    initDatasource(dataSource) {
        let techspecs = this.state.Techspecs ? this.state.Techspecs : [];
        let techspecsValue = this.state.TechspecsValue ? this.state.TechspecsValue : [];
        let subgroup = this.state.SubGroup ? this.state.SubGroup : [];
        let materialProduct = this.state.MaterialGroup_ProductDataSource ? this.state.MaterialGroup_ProductDataSource : []
        let brand = this.state.Brand ? this.state.Brand : [];
        let match = [];
        let match2 = [];
        let match3 = [];
        let match4 = [];
        let match5 = [];
        dataSource = dataSource.map(function (item, index) {
            match = techspecs.filter(x => x.TechspecsID == item.ApplyTechspecsID);
            match2 = techspecsValue.filter(x => x.TechSpecsValueID == item.ApplyTechspecsValueID);
            match3 = subgroup.filter(x => x.SubGroupID == item.ApplySubGroupID);
            match4 = materialProduct.filter(x => x.ProductID == item.MaterialProductID);
            match5 = brand.filter(x => x.BrandID == item.ApplyBrandID);
            if (match && match.length > 0) {
                item.ApplyTechspecsName = match[0].TechspecsName;
            } else {
                item.ApplyTechspecsName = "";
            }
            if (match2 && match2.length > 0) {
                item.ApplyTechspecsValueName = match2[0].Value;
            } else {
                item.ApplyTechspecsValueName = "";
            }
            if (match3 && match3.length > 0) {
                item.ApplySubGroupName = match3[0].SubGroupName;
            } else {
                item.ApplySubGroupName = "";
            }
            if (match4 && match4.length > 0) {
                item.MaterialProductName = match4[0].ProductName;
            } else {
                item.MaterialProductName = "";
            }
            if (match5 && match5.length > 0) {
                item.ApplyBrandName = match5[0].BrandName;
            } else {
                item.ApplyBrandName = "";
            }

            return item;
        }.bind(this));

        return dataSource;


    }

    render() {
        let datasource = this.state.MaterialGroup_InstallCondDataSource.filter(item => item.IsDeleted == undefined || item.IsDeleted == false);
        datasource = this.initDatasource(datasource);


        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        if (!this.state.MaterialGroupID) {
            return (
                <Collapsible trigger="Điều kiện lắp đặt của nhóm vật tư" easing="ease-in" open={true}>
                    Đang nạp dữ liệu ......
                </Collapsible>
            );
        }

        return (
            // <Collapsible trigger="Điều kiện lắp đặt của nhóm vật tư" easing="ease-in" open={true}>

            // </Collapsible>
            <div className="sub-grid">
                <DataGrid listColumn={DataGridColumnList}
                    dataSource={datasource}
                    modalElementList={this.state.ModalColumnList_Insert}
                    MLObjectDefinition={MLObjectDefinition}
                    IDSelectColumnName={"chkSelectInstallCondID"}
                    PKColumnName={"InstallCondID"}
                    onDeleteClick={this.handleDelete}
                    onInsertClick={this.handleInsert}
                    onInsertClickEdit={this.handleEdit}
                    IsAutoPaging={true}
                    RowsPerPage={10}
                    IsCustomAddLink={true}
                    headingTitle={"Điều kiện lắp đặt của nhóm vật tư"}
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

const MaterialGroup_InstallCond = connect(mapStateToProps, mapDispatchToProps)(MaterialGroup_InstallCondCom);
export default MaterialGroup_InstallCond;
