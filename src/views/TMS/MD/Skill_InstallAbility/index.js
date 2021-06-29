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
    AddAPIPath, UpdateAPIPath, DeleteAPIPath, AddByFileAPIPath, APIHostName,
    ModalColumnList_Insert, ModalColumnList_Edit, DataGridColumnList, MLObjectDefinition, schema, DataTemplateExport
} from "./constants";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { callGetCache, callClearLocalCache } from "../../../../actions/cacheAction";
import { ERPCOMMONCACHE_STORE, ERPCOMMONCACHE_MAINGROUP, ERPCOMMONCACHE_SUBGROUP, ERPCOMMONCACHE_SUBGROUPTECHSPECS, ERPCOMMONCACHE_TECHSPECSVALUE } from "../../../../constants/keyCache";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
class Skill_InstallAbilityCom extends React.Component {
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
        this.onClose = this.onClose.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false,
            //Store: this.props.Store,
            SkillInstallAbilityDataSource: this.props.SkillInstallAbilityDataSource ? this.props.SkillInstallAbilityDataSource : [],
            SkillID: this.props.SkillID,
            IsInsert: true,
            ModalColumnList_Insert: ModalColumnList_Insert,
            ModalColumnList_Edit: ModalColumnList_Edit,
            DataTemplateExport
        };
        this.notificationDOMRef = React.createRef();
    }


    componentWillReceiveProps(nextProps) {
        //console.log("222", nextProps);
        if (nextProps.SkillID !== this.state.SkillID) {
            this.setState({ SkillID: nextProps.SkillID });
        }

        if(nextProps.SkillInstallAbilityDataSource !== this.state.SkillInstallAbilityDataSource){
            this.setState({ SkillInstallAbilityDataSource: nextProps.SkillInstallAbilityDataSource });
        }
    }

    componentDidMount() {
        this.initCache();

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

        // this.setState({
        //     Techspecs: this.props.TechspecsCache ? this.props.TechspecsCache : [],
        //     TechspecsValue: this.props.TechspecsValueCache ? this.props.TechspecsValueCache : [],

        // });

    }
    resetCombobox() {
        this.state.ModalColumnList_Insert.forEach(function (objElement) {
            if (objElement.Name != "IsActived") {
                objElement.listoption = [];
                objElement.value = "";
            }

        });

        this.state.ModalColumnList_Edit.forEach(function (objElement) {
            objElement.listoption = [];
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
                if (objElement.Name == "SubGroupID") {
                    listOption = this.getDataCombobox(this.state.SubGroup, "SubGroupID", "SubGroupName", "MainGroupID", elementValue);
                    objElement.listoption = listOption;
                    objElement.value = "-1";
                }
                if (objElement.Name == "TechspecsID") {
                    objElement.listoption = listOptionNull;
                    objElement.value = "-1";
                }
                if (objElement.Name == "TechspecsValueID") {
                    objElement.listoption = listOptionNull;
                    objElement.value = "-1";
                }
            } else if (elementName == "SubGroupID") {
                if (objElement.Name == "SubGroupID") {
                    objElement.value = elementValue;
                }
                if (objElement.Name == "TechspecsID") {
                    listOption = this.getDataCombobox(this.state.Techspecs, "TechspecsID", "TechspecsName", "SubGroupID", elementValue);
                    objElement.listoption = listOption;
                    objElement.value = "-1";
                }
                if (objElement.Name == "TechspecsValueID") {
                    objElement.listoption = listOptionNull;
                    objElement.value = "-1";
                }
            } else if (elementName == "TechspecsID") {
                if (objElement.Name == "TechspecsID") {
                    objElement.value = elementValue;
                }
                if (objElement.Name == "TechspecsValueID") {
                    listOption = this.getDataCombobox(this.state.TechspecsValue, "TechSpecsValueID", "Value", "TechSpecsID", elementValue);
                    objElement.listoption = listOption;
                    objElement.value = "-1";
                }
            } else if (elementName == "TechspecsValueID") {
                if (objElement.Name == "TechspecsValueID") {
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

    validateForm(formData) {
        let valid = true;
        if ((formData.SubGroupID == undefined || formData.SubGroupID == -1 || !formData.SubGroupID[0])) {
            //|| (formData.TechspecsID == undefined || formData.SubGTechspecsIDroupID == -1 || !formData.TechspecsID[0])
            //|| (formData.TechspecsValueID == undefined || formData.TechspecsValueID == -1 || !formData.TechspecsValueID[0])) {
            valid = false;
        }

        return valid;
    }

    handleInsert(MLObjectDefinition, modalElementList, dataSource) {
        this.setState({ IsInsert: true });
        this.props.showModal(MODAL_TYPE_CONFIRMATION, {
            title: 'Thêm mới năng lực lắp đặt',
            autoCloseModal: false,
            onValueChange: this.handleModalChange,
            onClose: this.onClose,
            onConfirm: (isConfirmed, formData) => {
                if (isConfirmed) {
                    let valid = this.validateForm(formData);
                    if (!valid) {
                        this.showMessage("Vui lòng chọn nhóm hàng");
                        return;
                    }
                    let MLObject = GetMLObjectData(MLObjectDefinition, formData, dataSource);
                    if (MLObject) {

                        MLObject.SkillInstallAbilityCSID = this.state.SkillID + "," + MLObject.SubGroupID + "," + MLObject.TechspecsID + "," + MLObject.TechspecsValueID;
                        MLObject.SkillID = this.state.SkillID;
                        MLObject.SubGroupID = MLObject.SubGroupID[0];
                        MLObject.TechspecsID = MLObject.TechspecsID[0];
                        MLObject.TechspecsValueID = MLObject.TechspecsValueID[0];
                        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
                        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
                        let match = this.state.SkillInstallAbilityDataSource.filter(item =>
                            item.SkillID == MLObject.SkillID
                            && item.SubGroupID == MLObject.SubGroupID
                            && item.TechspecsID == MLObject.TechspecsID
                            && item.TechspecsValueID == MLObject.TechspecsValueID);
                        if (match.length) {
                            this.showMessage("Dữ liệu đã tồn tại.");
                            return;
                        }
                        let _SkillInstallAbilityDataSource = this.state.SkillInstallAbilityDataSource;
                        _SkillInstallAbilityDataSource.push(MLObject);
                        _SkillInstallAbilityDataSource.sort((a, b) => (a.SubGroupID > b.SubGroupID) ? 1 : ((b.SubGroupID > a.SubGroupID) ? -1 : 0));
                        this.setState({ SkillInstallAbilityDataSource: _SkillInstallAbilityDataSource });
                        if (this.props.onSkillInstallAbilityChange) {
                            this.props.onSkillInstallAbilityChange(_SkillInstallAbilityDataSource);
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
        let _SkillInstallAbilityDataSource = {};
        this.state.SkillInstallAbilityDataSource.map((item, index) => {
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
                _SkillInstallAbilityDataSource = item;
            }
        });

        this.props.showModal(MODAL_TYPE_CONFIRMATION, {
            title: 'Chỉnh sửa năng lực lắp đặt',
            onValueChange: this.handleModalChange,
            onClose: this.onClose,
            onConfirm: (isConfirmed, formData) => {
                if (isConfirmed) {
                    let MLObject = GetMLObjectData(MLObjectDefinition, formData, _SkillInstallAbilityDataSource);
                    if (MLObject) {
                        MLObject.SkillInstallAbilityCSID = this.state.SkillID + "," + MLObject.SubGroupID + "," + MLObject.TechspecsID + "," + MLObject.TechspecsValueID;
                        MLObject.SkillID = this.state.SkillID;
                        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
                        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
                        let _SkillInstallAbilityDataSource = this.state.SkillInstallAbilityDataSource
                            .filter(item => item.SkillID != MLObject.SkillID
                                || item.SubGroupID != MLObject.SubGroupID
                                || item.TechspecsID != MLObject.TechspecsID
                                || item.TechspecsValueID != MLObject.TechspecsValueID);
                        _SkillInstallAbilityDataSource.push(MLObject);
                        _SkillInstallAbilityDataSource.sort((a, b) => (a.SubGroupID > b.SubGroupID) ? 1 : ((b.SubGroupID > a.SubGroupID) ? -1 : 0));
                        this.setState({ SkillInstallAbilityDataSource: _SkillInstallAbilityDataSource });
                        if (this.props.onSkillInstallAbilityChange) {
                            this.props.onSkillInstallAbilityChange(_SkillInstallAbilityDataSource);
                        }
                        this.props.hideModal();
                        this.resetCombobox();
                    }
                }
            },
            modalElementList: ModalColumnList_Edit,
            formData: _SkillInstallAbilityDataSource
        });
    }

    handleDelete(deleteList, pkColumnName) {
        let _SkillInstallAbilityDataSource = this.state.SkillInstallAbilityDataSource;
        deleteList.map((row, index) => {
            let MLObject = {};
            pkColumnName.map((pkItem, pkIndex) => {
                MLObject[pkItem.key] = row.pkColumnName[pkIndex].value;
            });
            let _deleteList = _SkillInstallAbilityDataSource.filter(item => item.SkillInstallAbilityCSID == MLObject.SkillInstallAbilityCSID);
            _deleteList[0].IsDeleted = true;
            _SkillInstallAbilityDataSource = _SkillInstallAbilityDataSource.filter(item => item.SkillInstallAbilityCSID != MLObject.SkillInstallAbilityCSID);
            _SkillInstallAbilityDataSource.push(_deleteList[0]);
            _SkillInstallAbilityDataSource.sort((a, b) => (a.SubGroupID > b.SubGroupID) ? 1 : ((b.SubGroupID > a.SubGroupID) ? -1 : 0));
        });
        this.setState({ SkillInstallAbilityDataSource: _SkillInstallAbilityDataSource });
        if (this.props.onSkillInstallAbilityChange) {
            this.props.onSkillInstallAbilityChange(_SkillInstallAbilityDataSource);
        }
    }

    isNumeric(value) {
        return /^-{0,1}\d+$/.test(value);
    }

    initDatasource(dataSource) {
        let techspecs = this.state.Techspecs ? this.state.Techspecs : [];
        let techspecsValue = this.state.TechspecsValue ? this.state.TechspecsValue : [];
        let subgroup = this.state.SubGroup ? this.state.SubGroup : [];
        let match = [];
        let match2 = [];
        let match3 = [];
        dataSource = dataSource.map(function (item, index) {
            match = techspecs.filter(x => x.TechspecsID == item.TechspecsID);
            match2 = techspecsValue.filter(x => x.TechSpecsValueID == item.TechspecsValueID);
            match3 = subgroup.filter(x => x.SubGroupID == item.SubGroupID);
            if (match && match.length > 0) {
                item.TechspecsName = match[0].TechspecsName;
            }
            if (match2 && match2.length > 0) {
                item.TechspecsValueName = match2[0].Value;
            }
            if (match3 && match3.length > 0) {
                item.SubGroupName = match3[0].SubGroupName;
            }
            return item;
        }.bind(this));

        return dataSource;


    }

    handleExportFileTemplate(result) {
        this.addNotification(result.Message, result.IsError);
    }

    handleImportFile(resultRows, errors) {

        const CreatedUser = this.props.AppInfo.LoginInfo.Username;
        const LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        const SkillID = this.props.SkillID;
        const importData = resultRows.map(item => {
            //const { UserName, IsSystem } = item
            return {
                ...item,
                SkillID,
                CreatedUser,
                LoginLogID
                //ProvinceFullName: `${ProvinceID} - ${ProvinceName}`,
                //WardFullName: `${WardID} - ${WardName}`
            }
        })

        let data = [];
        let _isError = false;
        importData.map((itemObject, index) => {
            if ((!itemObject.SubGroupID || !itemObject.TechspecsID || !itemObject.TechspecsValueID) && _isError == false) {
                this.addNotification("Vui lòng nhập đầy đủ mã nhóm hàng, thông số kỹ thuật, giá trị thông số kỹ thuật.", true);
                _isError = true;
            } else {
                data.push(itemObject);
            }
        });


        if (_isError) {
            return;
        }


        this.props.callFetchAPI(APIHostName, AddByFileAPIPath, data).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            if (!apiResult.IsError) {
                //this.props.callClearLocalCache(ERPCOMMONCACHE_MATERIALGROUP);
                if (this.props.onReload) {
                    this.props.onReload();
                }
            }

            this.addNotification(apiResult.Message, apiResult.IsError);

        });

    }

    render() {
        let datasource = this.state.SkillInstallAbilityDataSource.filter(item => item.IsDeleted == undefined || item.IsDeleted == false);
        datasource = this.initDatasource(datasource);
        // let datasource = this.state.SkillInstallAbilityDataSource.map(function (item, index) {
        //     if (item.IsDeleted == undefined || item.IsDeleted == false) {
        //         item.CoordinatorStoreName = item.SubGroupID + " - " + this.getStoreName(item.SubGroupID);
        //         item.PartnerStoreName = item.PartnerStoreID + " - " + this.getStoreName(item.PartnerStoreID);
        //         return item;
        //     }

        // }.bind(this)).filter(item => item != undefined);


        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        if (!this.state.SkillID || !this.isNumeric(this.state.SkillID)) {
            return (
                <Collapsible trigger="Năng lực lắp đặt" easing="ease-in" open={true}>
                    Đang nạp dữ liệu ......
                </Collapsible>
            );
        }

        return (
            <div className="sub-grid">
                <ReactNotification ref={this.notificationDOMRef} />
                <DataGrid listColumn={DataGridColumnList}
                    dataSource={datasource}
                    modalElementList={ModalColumnList_Insert}
                    MLObjectDefinition={MLObjectDefinition}
                    IDSelectColumnName={"chkSelectSkillInstallAbilityCSID"}
                    PKColumnName={"SkillInstallAbilityCSID"}
                    onDeleteClick={this.handleDelete}
                    onInsertClick={this.handleInsert}
                    onInsertClickEdit={this.handleEdit}
                    IsAutoPaging={true}
                    RowsPerPage={10}
                    IsCustomAddLink={true}
                    headingTitle={"Năng lực lắp đặt"}

                    IsImportFile={true}
                    SchemaData={schema}
                    onImportFile={this.handleImportFile.bind(this)}
                    isExportFileTemplate={true}
                    DataTemplateExport={this.state.DataTemplateExport}
                    fileNameTemplate={"Danh sách năng lực lắp đặt"}
                    onExportFileTemplate={this.handleExportFileTemplate.bind(this)}
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

const Skill_InstallAbility = connect(mapStateToProps, mapDispatchToProps)(Skill_InstallAbilityCom);
export default Skill_InstallAbility;
