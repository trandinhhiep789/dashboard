import React from "react";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import SearchForm from "../../../../../common/components/Form/SearchForm";
import DataGrid from "../../../../../common/components/DataGrid";
import { MessageModal } from "../../../../../common/components/Modal";
import {
    SearchElementList,
    SearchMLObjectDefinition,
    DataGridColumnList,
    AddLink,
    APIHostName,
    SearchAPIPath,
    DeleteAPIPath,
    IDSelectColumnName,
    PKColumnName,
    InitSearchParams,
    PagePath,
    AddLogAPIPath,
    LoadInfoByLeadAdviceIDAPIPath,
    SchemaMaster,
    DataMasterTemplateExport
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { callGetCache } from "../../../../../actions/cacheAction";
import { MODAL_TYPE_COMMONTMODALS } from "../../../../../constants/actionTypes";
import Add from "../Add";
import Edit from "../Edit";
import { hideModal, showModal } from "../../../../../actions/modal";
import { MD_LEADADVICE_VIEW, MD_LEADADVICE_DELETE } from "../../../../../constants/functionLists";

class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleInsert = this.handleInsert.bind(this);
        this.onClose = this.onClose.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleImportFile = this.handleImportFile.bind(this);
        this.handleExportFileTemplate = this.handleExportFileTemplate.bind(this);

        this.state = {
            CallAPIMessage: "",
            gridDataSource: [],
            IsCallAPIError: false,
            SearchData: InitSearchParams,
            cssNotification: "",
            iconNotification: "",
            IsInsert: false,
            DataMasterTemplateExport: DataMasterTemplateExport
        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        if (!!this.props.LeadAdviceID) {
            this.callSearchData(this.props.LeadAdviceID);
        }
        else {
            this.callSearchData(this.state.SearchData);
        }

        this.props.updatePagePath(PagePath);
    }

    handleExportFile(result) {
        this.addNotification(result.Message, result.IsError);
    }

    handleDelete(deleteList, pkColumnName) {
        let listMLObject = [];
        deleteList.map((row, index) => {
            let MLObject = {};
            pkColumnName.map((pkItem, pkIndex) => {
                MLObject[pkItem.key] = row.pkColumnName[pkIndex].value;
            });
            MLObject.DeletedUser = this.props.AppInfo.LoginInfo.Username;
            listMLObject.push(MLObject);
        });
        this.props.callFetchAPI(APIHostName, DeleteAPIPath, listMLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.addNotification(apiResult.Message, apiResult.IsError);
            if (!apiResult.IsError) {
                this.callSearchData(this.props.LeadAdviceID);
                // this.handleClearLocalCache();
                // this.handleSubmitInsertLog();
            }
        });
    }

    handleSearchSubmit(formData, MLObject) {
        const postData = [
            {
                SearchKey: "@Keyword",
                SearchValue: MLObject.Keyword
            }
        ];
        this.setState({ SearchData: postData });
        this.callSearchData(postData);
        //this.gridref.current.clearData();
    }

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, LoadInfoByLeadAdviceIDAPIPath, searchData).then(apiResult => {
            //this.searchref.current.changeLoadComplete();
            if (!apiResult.IsError) {
                this.setState({
                    gridDataSource: apiResult.ResultObject,
                    IsCallAPIError: apiResult.IsError,
                    IsShowForm: true
                });
            } else {
                this.showMessage(apiResult.Message);
                this.setState({
                    IsShowForm: false,
                    gridDataSource: [],
                });
            }
        });
    }

    handleCloseMessage() {
        // if (!this.state.IsCallAPIError) {
        //     this.callSearchData(this.state.SearchData);
        // }
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

    handleInsert(MLObjectDefinition, modalElementList, dataSource) {
        // if (!this.state.IsAllowedAdd) {
        //     this.showMessage("Bạn không có quyền");
        //     return;
        // }

        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Thêm mới sản phẩm tư vấn khác',
            content: {
                text: (
                    <Add LeadAdviceID={this.props.LeadAdviceID} closePopup={this.onClose} />
                )
            },
            maxWidth: '1000px'
        })
    }

    handleEdit(value, pkColumnName) {

        // if (!this.state.IsAllowedUpdate) {
        //     this.showMessage("Bạn không có quyền");
        //     return;
        // }

        let leadAdviceApplyID = value.pkColumnName[0].value;

        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Cập nhật sản phẩm tư vấn khác',
            content: {
                text: (
                    <Edit LeadAdviceID={this.props.LeadAdviceID} LeadAdviceApplyID={leadAdviceApplyID} closePopup={this.onClose} />
                )
            },
            maxWidth: '1000px'
        });
    }

    onClose() {
        this.props.hideModal();
        if (!!this.props.LeadAdviceID) {
            this.callSearchData(this.props.LeadAdviceID);
        }
    }

    handleExportFileTemplate(result) {
        console.log("template", result)
        this.addNotification(result.Message, result.IsError);
    }

    handleImportFile(resultRows, errors) {
        let MLObject = {};

        resultRows = resultRows.map(item => ({ ...item, LeadAdviceID: this.props.LeadAdviceID }));
        MLObject.ListLeadAdviceApply = resultRows;

        this.props.callFetchAPI(APIHostName, "api/LeadAdviceApply/ImportInsert", MLObject).then(apiResult => {
            if (apiResult.IsError) {
                this.showMessage(apiResult.Message);
            }
            else {
                this.callSearchData(this.props.LeadAdviceID);
                this.addNotification(apiResult.Message, apiResult.IsError);
            }
        });

    }

    render() {
        if (this.state.IsShowForm) {
            return (
                <React.Fragment>
                    <ReactNotification ref={this.notificationDOMRef} />
                    {
                        this.props.IsAdviceOtherProduct && (
                            <DataGrid
                                listColumn={DataGridColumnList}
                                dataSource={this.state.gridDataSource}
                                onInsertClick={this.handleInsert}
                                IDSelectColumnName={IDSelectColumnName}
                                PKColumnName={PKColumnName}
                                onDeleteClick={this.handleDelete}
                                onInsertClickEdit={this.handleEdit}
                                ref={this.gridref}
                                IsCustomAddLink={true}
                                RequirePermission={MD_LEADADVICE_VIEW}
                                DeletePermission={MD_LEADADVICE_DELETE}
                                IsAutoPaging={true}
                                RowsPerPage={10}
                                isExportFileTemplate={true}
                                fileNameTemplate={"Danh sách sản phẩm tư vấn ứng với loại yêu cầu vận chuyển (khác loại)"}
                                onExportFileTemplate={this.handleExportFileTemplate}
                                DataTemplateExport={this.state.DataMasterTemplateExport}
                                IsImportFile={true}
                                SchemaData={SchemaMaster}
                                onImportFile={this.handleImportFile}
                            />
                        )
                    }
                </React.Fragment>
            );
        }
        else {
            return (
                <div>
                    <label>Đang nạp dữ liệu ......</label>
                </div>
            )
        }

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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: () => {
            dispatch(hideModal());
        },
        updatePagePath: pagePath => {
            dispatch(updatePagePath(pagePath));
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        }
    };
};

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchCom);
export default Search;
