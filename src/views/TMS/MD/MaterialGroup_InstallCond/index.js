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
import { GET_CACHE_USER_FUNCTION_LIST, MATERIALGROUP_ADD, MATERIALGROUP_DELETE, MATERIALGROUP_UPDATE } from "../../../../constants/functionLists";

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
        this.checkPermission = this.checkPermission.bind(this);
        this.onClose = this.onClose.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false,
            cssNotification: "notification-custom-success",
            iconNotification: "fa fa-check",
            MaterialGroup_InstallCondDataSource: this.props.MaterialGroup_InstallCondDataSource ? this.props.MaterialGroup_InstallCondDataSource : [],
            MaterialGroup_ProductDataSource: this.props.MaterialGroup_ProductDataSource ? this.props.MaterialGroup_ProductDataSource : [],
            MaterialGroupID: this.props.MaterialGroupID,
            IsInsert: true,
            ModalColumnList_Insert: ModalColumnList_Insert,
            ModalColumnList_Edit: ModalColumnList_Edit
        };
        this.notificationDOMRef = React.createRef();
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.MaterialGroupID !== this.state.MaterialGroupID) {
            this.setState({ MaterialGroupID: nextProps.MaterialGroupID });
        }

        if (nextProps.MaterialGroup_ProductDataSource !== this.state.MaterialGroup_ProductDataSource) {
            this.setState({ MaterialGroup_ProductDataSource: nextProps.MaterialGroup_ProductDataSource });
            this.initComboboxMaterialProduct(nextProps.MaterialGroup_ProductDataSource);
        }

        if (nextProps.MaterialGroup_InstallCondDataSource !== this.state.MaterialGroup_InstallCondDataSource) {
            this.setState({ MaterialGroup_InstallCondDataSource: nextProps.MaterialGroup_InstallCondDataSource });
        }
    }

    componentDidMount() {
        this.initCache();
        this.initComboboxMaterialProduct(this.state.MaterialGroup_ProductDataSource);
        this.checkPermission();
    }

    checkPermission() {
        let IsAllowedAdd = false;
        let IsAllowedDelete = false;
        let IsAllowedUpdate = false;
        this.props.callGetUserCache(GET_CACHE_USER_FUNCTION_LIST).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                let _isAllowedAdd = result.ResultObject.CacheData.filter(x => x.FunctionID == MATERIALGROUP_ADD);
                if (_isAllowedAdd && _isAllowedAdd.length > 0) {
                    IsAllowedAdd = true;
                }

                let _isAllowedUpdate = result.ResultObject.CacheData.filter(x => x.FunctionID == MATERIALGROUP_UPDATE);
                if (_isAllowedUpdate && _isAllowedUpdate.length > 0) {
                    IsAllowedUpdate = true;
                }

                let _isAlloweDelete = result.ResultObject.CacheData.filter(x => x.FunctionID == MATERIALGROUP_DELETE);
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
        let _listoption = [{ value: -1, label: "------ Chọn ------" }]
        if (Array.isArray(datasource) && datasource.length > 0) {
            datasource.map((item, index) => {
                if (!item.IsDeleted) {
                    _listoption.push({ value: item.ProductID, label: item.ProductName });
                }

            })
        }

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
                        listOption.push({ value: cacheItem[valueMember], label: cacheItem[valueMember] + " - " + cacheItem[nameMember], name: cacheItem[nameMember] });
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
                    formData.ApplySubGroupID = ["-1"];
                }
                if (objElement.Name == "ApplyBrandID") {
                    listOption = this.getDataCombobox(this.state.Brand, "BrandID", "BrandName", "MainGroupID", elementValue);
                    objElement.listoption = listOption;
                    objElement.value = "-1";
                    formData.ApplyBrandID = ["-1"];
                }
                if (objElement.Name == "ApplyTechspecsID") {
                    objElement.listoption = listOptionNull;
                    objElement.value = "-1";
                    formData.ApplyTechspecsID = ["-1"];
                }
                if (objElement.Name == "ApplyTechspecsValueID") {
                    objElement.listoption = listOptionNull;
                    objElement.value = "-1";
                    formData.ApplyTechspecsValueID = ["-1"];
                }
            } else if (elementName == "ApplySubGroupID") {
                if (objElement.Name == "ApplySubGroupID") {
                    objElement.value = elementValue;
                }

                if (objElement.Name == "ApplyTechspecsID") {
                    listOption = this.getDataCombobox(this.state.Techspecs, "TechspecsID", "TechspecsName", "SubGroupID", elementValue);
                    objElement.listoption = listOption;
                    objElement.value = "-1";
                    formData.ApplyTechspecsID = ["-1"];
                }
                if (objElement.Name == "ApplyTechspecsValueID") {
                    objElement.listoption = listOptionNull;
                    objElement.value = "-1";
                    formData.ApplyTechspecsValueID = ["-1"];
                }
            } else if (elementName == "ApplyTechspecsID") {
                if (objElement.Name == "ApplyTechspecsID") {
                    objElement.value = elementValue;
                }
                if (objElement.Name == "ApplyTechspecsValueID") {
                    listOption = this.getDataCombobox(this.state.TechspecsValue, "TechSpecsValueID", "Value", "TechSpecsID", elementValue);
                    objElement.listoption = listOption;
                    objElement.value = "-1";
                    formData.ApplyTechspecsValueID = ["-1"];
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
        //console.log("formData", formData);
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
        //console.log("MaterialGroup_InstallCondDataSource", this.state.MaterialGroup_InstallCondDataSource);
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
                        MLObject.ApplyProductID = MLObject.ApplyProductID && Array.isArray(MLObject.ApplyProductID) ? MLObject.ApplyProductID[0].ProductID : MLObject.ApplyProductID;
                        //MLObject.ApplyProductID = MLObject.ApplyProductID && MLObject.ApplyProductID[0].ProductID ? MLObject.ApplyProductID[0].ProductID : MLObject.ApplyProductID;
                        //MLObject.MaterialProductID = MLObject.MaterialProductID && MLObject.MaterialProductID[0].ProductID ? MLObject.MaterialProductID[0].ProductID : MLObject.MaterialProductID;
                        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
                        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;

                        //check duplicated data
                        let _exitsduplicated = this.state.MaterialGroup_InstallCondDataSource.filter(x => x.ApplyProductID == MLObject.ApplyProductID && x.ApplySubGroupID == MLObject.ApplySubGroupID
                            && x.ApplyTechspecsID == MLObject.ApplyTechspecsID && x.ApplyTechspecsValueID == MLObject.ApplyTechspecsValueID && x.BrandID == MLObject.BrandID && x.MaterialProductID == MLObject.MaterialProductID
                        );
                        if (_exitsduplicated.length > 0) {
                            this.addNotification("Dữ liệu đã tồn tại", true);
                            return;
                        }

                        this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then(apiResult => {
                            if (!apiResult.IsError) {
                                if (this.props.onMaterialGroup_InstallCondChange) {
                                    this.props.onMaterialGroup_InstallCondChange();
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
                        MLObject.ApplyProductID = MLObject.ApplyProductID && Array.isArray(MLObject.ApplyProductID) ? MLObject.ApplyProductID[0].ProductID : MLObject.ApplyProductID;
                        // MLObject.ApplyProductID = MLObject.ApplyProductID && MLObject.ApplyProductID[0].ProductID ? MLObject.ApplyProductID[0].ProductID : MLObject.ApplyProductID;
                        //MLObject.MaterialProductID = MLObject.MaterialProductID && MLObject.MaterialProductID[0].ProductID ? MLObject.MaterialProductID[0].ProductID : MLObject.MaterialProductID;
                        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
                        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;

                        //check duplicated data
                        let _exitsduplicated = this.state.MaterialGroup_InstallCondDataSource.filter(x => x.ApplyProductID == MLObject.ApplyProductID && x.ApplySubGroupID == MLObject.ApplySubGroupID
                            && x.ApplyTechspecsID == MLObject.ApplyTechspecsID && x.ApplyTechspecsValueID == MLObject.ApplyTechspecsValueID && x.BrandID == MLObject.BrandID && x.MaterialProductID == MLObject.MaterialProductID && MLObject.InstallCondID != x.InstallCondID
                        );
                        if (_exitsduplicated.length > 0) {
                            this.addNotification("Dữ liệu đã tồn tại", true);
                            return;
                        }

                        this.props.callFetchAPI(APIHostName, UpdateAPIPath, MLObject).then(apiResult => {
                            if (!apiResult.IsError) {
                                if (this.props.onMaterialGroup_InstallCondChange) {
                                    this.props.onMaterialGroup_InstallCondChange();
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
            formData: _MaterialGroup_InstallCondDataSource
        });
    }

    handleDelete(deleteList, pkColumnName) {
        if (!this.state.IsAllowedDelete) {
            this.showMessage("Bạn không có quyền");
            return;
        }
        let listMLObject = [];
        let _MaterialGroup_InstallCondDataSource = this.state.MaterialGroup_InstallCondDataSource;
        deleteList.map((row, index) => {
            let MLObject = {};
            pkColumnName.map((pkItem, pkIndex) => {
                MLObject[pkItem.key] = row.pkColumnName[pkIndex].value;
            });

            MLObject.DeletedUser = this.props.AppInfo.LoginInfo.Username;
            listMLObject.push(MLObject);

        });
        this.props.callFetchAPI(APIHostName, DeleteAPIPath, listMLObject).then(apiResult => {
            if (!apiResult.IsError) {
                if (this.props.onMaterialGroup_InstallCondChange) {
                    this.props.onMaterialGroup_InstallCondChange();
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
            <div className="sub-grid detail">
                <ReactNotification ref={this.notificationDOMRef} />
                <DataGrid listColumn={DataGridColumnList}
                    dataSource={datasource}
                    modalElementList={this.state.ModalColumnList_Insert}
                    MLObjectDefinition={MLObjectDefinition}
                    IDSelectColumnName={"chkSelectInstallCondID"}
                    PKColumnName={"InstallCondID"}
                    onDeleteClick={this.handleDelete}
                    onInsertClick={this.handleInsert}
                    onInsertClickEdit={this.handleEdit}
                    IsAutoPaging={false}
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
        },
        callGetUserCache: (cacheKeyID) => {
            return dispatch(callGetUserCache(cacheKeyID));
        }

    };
};

const MaterialGroup_InstallCond = connect(mapStateToProps, mapDispatchToProps)(MaterialGroup_InstallCondCom);
export default MaterialGroup_InstallCond;
