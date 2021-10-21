import React from "react";
import "react-notifications-component/dist/theme.css";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import ReactNotification from "react-notifications-component";

import {
    AddLink,
    APIHostName,
    DataGridColumnList,
    DeleteAPIPath,
    IDSelectColumnName,
    InitSearchParams,
    PagePath,
    PKColumnName,
    SearchAPIPath,
    SearchElementList,
    SearchMLObjectDefinition,
} from "../constants";

import {
    DELIVERYABILITY_DELETE,
    DELIVERYABILITY_VIEW,
} from "../../../../../constants/functionLists";

import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";
import { ERPCOMMONCACHE_MTRETURNREQUESTTYPE } from "../../../../../constants/keyCache";
import { MessageModal } from "../../../../../common/components/Modal";
import { MODAL_TYPE_COMMONTMODALS } from '../../../../../constants/actionTypes';
import { showModal } from '../../../../../actions/modal';
import { updatePagePath } from "../../../../../actions/pageAction";
import DataGrid from "../../../../../common/components/DataGrid";
import ExportTempExcelModalCom from '../ExportTempExcelModal';
import ImportExcelModalCom from '../ImportExcelModal';
import SearchForm from "../../../../../common/components/Form/SearchForm";

class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleExportFileTemplate = this.handleExportFileTemplate.bind(this);
        this.handleImportFile = this.handleImportFile.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.state = {
            CallAPIMessage: "",
            cssNotification: "",
            gridDataSource: [],
            iconNotification: "",
            IsCallAPIError: false,
            SearchData: InitSearchParams,
        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        this.callSearchData(this.state.SearchData);
        this.props.updatePagePath(PagePath);
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
                this.callSearchData(this.state.SearchData);
                this.props.callClearLocalCache(ERPCOMMONCACHE_MTRETURNREQUESTTYPE);
            }
        });
    }

    handleExportFileTemplate() {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Xuất file mẫu',
            content: {
                text: <ExportTempExcelModalCom />
            },
            maxWidth: '30%'
        })
    }

    handleImportFile() {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Import File',
            content: {
                text: <ImportExcelModalCom
                />
            },
            maxWidth: '30%',
            afterClose: () => this.callSearchData(this.state.SearchData)
        })
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
    }

    callSearchData(searchData) {
        console.log(searchData)
        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            if (!apiResult.IsError) {
                this.setState({
                    gridDataSource: apiResult.ResultObject,
                    IsShowForm: true
                });
            } else {
                this.showMessage(apiResult.Message);
                this.setState({ IsShowForm: false });
            }
        });
    }

    handleCloseMessage() {
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

    render() {
        if (this.state.IsShowForm) {
            return (
                <React.Fragment>
                    <ReactNotification ref={this.notificationDOMRef} />
                    <SearchForm
                        FormName="Tìm kiếm danh sách kho lấy tải"
                        listelement={SearchElementList}
                        MLObjectDefinition={SearchMLObjectDefinition}
                        onSubmit={this.handleSearchSubmit}
                        ref={this.searchref}
                    />
                    <DataGrid
                        // DataTemplateExport={TemplateExportDAStoreGoodsGroup}
                        // fileNameTemplate="Danh sách tỷ lệ phân bố tải theo từng kho"
                        AddLink={AddLink}
                        dataSource={this.state.gridDataSource}
                        DeletePermission={DELIVERYABILITY_DELETE}
                        IDSelectColumnName={IDSelectColumnName}
                        IsAutoPaging={true}
                        isCustomExportFileTemplate={true}
                        isCustomImportFile={true}
                        isExportFileTemplate={true}
                        IsImportFile={true}
                        listColumn={DataGridColumnList}
                        onDeleteClick={this.handleDelete}
                        onExportFileTemplate={this.handleExportFileTemplate}
                        onImportFile={this.handleImportFile}
                        PKColumnName={PKColumnName}
                        ref={this.gridref}
                        RequirePermission={DELIVERYABILITY_VIEW}
                        RowsPerPage={20}
                    />
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
        updatePagePath: pagePath => {
            dispatch(updatePagePath(pagePath));
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        }
    };
};

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchCom);
export default Search;
