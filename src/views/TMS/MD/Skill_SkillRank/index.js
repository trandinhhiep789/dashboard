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

class Skill_SkillRankCom extends React.Component {
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
            SkillSkillRankDataSource: this.props.SkillSkillRankDataSource ? this.props.SkillSkillRankDataSource : [],
            SkillID: this.props.SkillID,
            IsInsert: true,
            ModalColumnList_Insert: ModalColumnList_Insert,
            ModalColumnList_Edit: ModalColumnList_Edit
        };
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.SkillID !== this.state.SkillID) {
            this.setState({ SkillID: nextProps.SkillID });
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
        if ((formData.SkillRankID == undefined || formData.SkillRankID == -1 || !formData.SkillRankID[0])) {
            valid = false;
        }

        return valid;
    }

    handleInsert(MLObjectDefinition, modalElementList, dataSource) {
        this.setState({ IsInsert: true });
        this.props.showModal(MODAL_TYPE_CONFIRMATION, {
            title: 'Thêm mới cấp bậc kỹ năng của 1 kỹ năng',
            autoCloseModal: false,
            //onValueChange: this.handleModalChange,
            onClose: this.onClose,
            onConfirm: (isConfirmed, formData) => {
                if (isConfirmed) {
                    let valid = this.validateForm(formData);
                    if (!valid) {
                        this.showMessage("Vui lòng chọn đầy đủ thông tin");
                        return;
                    }
                    let MLObject = GetMLObjectData(MLObjectDefinition, formData, dataSource);
                    if (MLObject) {
                        MLObject.SkillSkillRankCSID = this.state.SkillID + "," + MLObject.SkillRankID;
                        MLObject.SkillID = this.state.SkillID;
                        MLObject.SkillRankID = MLObject.SkillRankID[0];
                        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
                        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
                        let match = this.state.SkillSkillRankDataSource.filter(item =>
                            item.SkillID == MLObject.SkillID
                            && item.SkillRankID == MLObject.SkillRankID);
                        if (match.length) {
                            this.showMessage("Dữ liệu đã tồn tại.");
                            return;
                        }
                        let _SkillSkillRankDataSource = this.state.SkillSkillRankDataSource;
                        _SkillSkillRankDataSource.push(MLObject);
                        _SkillSkillRankDataSource.sort((a, b) => (a.SkillRankID > b.SkillRankID) ? 1 : ((b.SkillRankID > a.SkillRankID) ? -1 : 0));
                        this.setState({ SkillSkillRankDataSource: _SkillSkillRankDataSource });
                        if (this.props.onSkillSkillRankChange) {
                            this.props.onSkillSkillRankChange(_SkillSkillRankDataSource);
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
        let _SkillSkillRankDataSource = {};
        this.state.SkillSkillRankDataSource.map((item, index) => {
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
                _SkillSkillRankDataSource = item;
            }
        });

        this.props.showModal(MODAL_TYPE_CONFIRMATION, {
            title: 'Chỉnh sửa cấp bậc kỹ năng của 1 kỹ năng',
            //onValueChange: this.handleModalChange,
            onClose: this.onClose,
            onConfirm: (isConfirmed, formData) => {
                if (isConfirmed) {
                    let MLObject = GetMLObjectData(MLObjectDefinition, formData, _SkillSkillRankDataSource);
                    if (MLObject) {
                        MLObject.SkillSkillRankCSID = this.state.SkillID + "," + MLObject.SkillRankID;
                        MLObject.SkillID = this.state.SkillID;
                        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
                        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
                        let _SkillSkillRankDataSource = this.state.SkillSkillRankDataSource
                            .filter(item => item.SkillID != MLObject.SkillID
                                || item.SkillRankID != MLObject.SkillRankID);
                        _SkillSkillRankDataSource.push(MLObject);
                        _SkillSkillRankDataSource.sort((a, b) => (a.SkillRankID > b.SkillRankID) ? 1 : ((b.SkillRankID > a.SkillRankID) ? -1 : 0));
                        this.setState({ SkillSkillRankDataSource: _SkillSkillRankDataSource });
                        if (this.props.onSkillSkillRankChange) {
                            this.props.onSkillSkillRankChange(_SkillSkillRankDataSource);
                        }
                        this.props.hideModal();
                        this.resetCombobox();
                    }
                }
            },
            modalElementList: ModalColumnList_Edit,
            formData: _SkillSkillRankDataSource
        });
    }

    handleDelete(deleteList, pkColumnName) {
        let _SkillSkillRankDataSource = this.state.SkillSkillRankDataSource;
        deleteList.map((row, index) => {
            let MLObject = {};
            pkColumnName.map((pkItem, pkIndex) => {
                MLObject[pkItem.key] = row.pkColumnName[pkIndex].value;
            });
            let _deleteList = _SkillSkillRankDataSource.filter(item => item.SkillSkillRankCSID == MLObject.SkillSkillRankCSID);
            _deleteList[0].IsDeleted = true;
            _SkillSkillRankDataSource = _SkillSkillRankDataSource.filter(item => item.SkillSkillRankCSID != MLObject.SkillSkillRankCSID);
            _SkillSkillRankDataSource.push(_deleteList[0]);
            _SkillSkillRankDataSource.sort((a, b) => (a.SkillRankID > b.SkillRankID) ? 1 : ((b.SkillRankID > a.SkillRankID) ? -1 : 0));
        });
        this.setState({ SkillSkillRankDataSource: _SkillSkillRankDataSource });
        if (this.props.onSkillSkillRankChange) {
            this.props.onSkillSkillRankChange(_SkillSkillRankDataSource);
        }
    }

    isNumeric(value) {
        return /^-{0,1}\d+$/.test(value);
    }

    initDatasource(dataSource) {
        let skillRank = this.state.SkillRank ? this.state.SkillRank : [];
        let match = [];
        dataSource = dataSource.map(function (item, index) {
            match = skillRank.filter(x => x.SkillRanKid == item.SkillRankID);
            if (match && match.length > 0) {
                item.SkillRankName = match[0].SkillRankName;
            }
            return item;
        }.bind(this));
        //console.log("dataSource",dataSource);
        return dataSource;
    }

    render() {
        let datasource = this.state.SkillSkillRankDataSource.filter(item => item.IsDeleted == undefined || item.IsDeleted == false);
        datasource = this.initDatasource(datasource);


        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        if (!this.state.SkillID || !this.isNumeric(this.state.SkillID)) {
            return (
                <Collapsible trigger="Cấp bậc kỹ năng của 1 kỹ năng" easing="ease-in" open={true}>
                    Đang nạp dữ liệu ......
                </Collapsible>
            );
        }

        return (
            <Collapsible trigger="Cấp bậc kỹ năng của 1 kỹ năng" easing="ease-in" open={true}>
                <DataGrid listColumn={DataGridColumnList}
                    dataSource={datasource}
                    modalElementList={ModalColumnList_Insert}
                    MLObjectDefinition={MLObjectDefinition}
                    IDSelectColumnName={"chkSelectSkillSkillRankCSID"}
                    PKColumnName={"SkillSkillRankCSID"}
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

const Skill_SkillRank = connect(mapStateToProps, mapDispatchToProps)(Skill_SkillRankCom);
export default Skill_SkillRank;
