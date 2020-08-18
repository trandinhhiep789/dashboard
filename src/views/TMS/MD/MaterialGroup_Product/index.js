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
            MaterialGroup_InstallCondDataSource: this.props.MaterialGroup_InstallCondDataSource ? this.props.MaterialGroup_InstallCondDataSource : [],
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

        if (nextProps.MaterialGroupProductDataSource !== this.state.MaterialGroupProductDataSource) {
            this.setState({ MaterialGroupProductDataSource: nextProps.MaterialGroupProductDataSource });
        }

        if (nextProps.MaterialGroup_InstallCondDataSource !== this.state.MaterialGroup_InstallCondDataSource) {
            this.setState({ MaterialGroup_InstallCondDataSource: nextProps.MaterialGroup_InstallCondDataSource });
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
        if ((formData.ProductID == undefined || formData.ProductID == -1 || !formData.ProductID[0] || !formData.ProductID[0].ProductID)) {
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
                    let MLObject = GetMLObjectData(MLObjectDefinition, formData, dataSource);
                    if (MLObject) {
                        MLObject.MaterialGroupProductCSID = this.state.MaterialGroupID + "," + MLObject.ProductID[0].ProductID;
                        MLObject.MaterialGroupID = this.state.MaterialGroupID;
                        MLObject.ProductName = MLObject.ProductID[0].ProductName;
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

                        this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then(apiResult => {
                            if (!apiResult.IsError) {
                                if (this.props.onMaterialGroupProductChange) {
                                    this.props.onMaterialGroupProductChange();
                                }
                                this.props.hideModal();
                            }
                            this.showMessage(apiResult.Message);
                        });
                        //this.resetCombobox();
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
                        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
                        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
                        this.props.callFetchAPI(APIHostName, UpdateAPIPath, MLObject).then(apiResult => {
                            if (!apiResult.IsError) {
                                if (this.props.onMaterialGroupProductChange) {
                                    this.props.onMaterialGroupProductChange();
                                }
                                this.props.hideModal();
                            }
                            this.showMessage(apiResult.Message);
                        });
                        //this.resetCombobox();
                    }
                }
            },
            modalElementList: ModalColumnList_Edit,
            formData: _MaterialGroupProductDataSource
        });
    }

    handleDelete(deleteList, pkColumnName) {
        debugger;
        //kiểm tra xem mã sản phẩm vật tư có đang dc sử dụng hay không
        let match = [];
        let tempMaterialGroupProductDataSource = [];
        let tempMaterialGroup_InstallCondDataSource = [];
        //console.log("this.state.MaterialGroup_InstallCondDataSource.length", this.state.MaterialGroup_InstallCondDataSource);
        if (this.state.MaterialGroup_InstallCondDataSource.length > 0) {
            this.state.MaterialGroup_InstallCondDataSource.forEach(element => {
                if (match.length <= 0) {
                    deleteList.forEach(item => {
                        if (tempMaterialGroup_InstallCondDataSource.length <= 0) {
                            tempMaterialGroupProductDataSource = this.state.MaterialGroupProductDataSource.filter(x => x.MaterialGroupProductCSID == item.pkColumnName[0].value);
                            tempMaterialGroup_InstallCondDataSource = tempMaterialGroupProductDataSource.filter(x => x.ProductID == element.MaterialProductID);
                        }

                    });

                    if (tempMaterialGroup_InstallCondDataSource && tempMaterialGroup_InstallCondDataSource.length > 0) {
                        match = tempMaterialGroup_InstallCondDataSource;
                    }
                }

            });
        }

        if (match && match.length > 0) {
            let _message = "Sản phẩm vật tư " + match[0].ProductName + " đang sử dụng vui lòng không xóa";
            this.showMessage(_message);
            return;
        } else {
            let listMLObject = [];
            deleteList.map((row, index) => {
                let MLObject = {};
                pkColumnName.map((pkItem, pkIndex) => {
                    MLObject[pkItem.key] = row.pkColumnName[pkIndex].value;
                });

                MLObject.DeletedUser = this.props.AppInfo.LoginInfo.Username;
                MLObject.MaterialGroupID = this.state.MaterialGroupID;
                MLObject.ProductID = MLObject.MaterialGroupProductCSID.toString().split(",")[1];
                listMLObject.push(MLObject);
            });


            this.props.callFetchAPI(APIHostName, DeleteAPIPath, listMLObject).then(apiResult => {
                if (!apiResult.IsError) {
                    if (this.props.onMaterialGroupProductChange) {
                        this.props.onMaterialGroupProductChange();
                    }
                    this.props.hideModal();
                }
                this.showMessage(apiResult.Message);
            });
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
            // <Collapsible trigger="Sản phẩm của nhóm vật tư" easing="ease-in" open={true}>

            // </Collapsible>
            <div className="sub-grid">
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
                    headingTitle={"Sản phẩm của nhóm vật tư"}
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

const MaterialGroup_Product = connect(mapStateToProps, mapDispatchToProps)(MaterialGroup_ProductCom);
export default MaterialGroup_Product;
