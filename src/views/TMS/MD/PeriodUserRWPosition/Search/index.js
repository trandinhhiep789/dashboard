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
    DataTemplateExport,
    schema
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { PERIODUSERRWPOSITION_VIEW, PERIODUSERRWPOSITION_DELETE, PERIODUSERRWPOSITION_EXPORT } from "../../../../../constants/functionLists";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";
import { ERPCOMMONCACHE_AREATYPE, ERPCOMMONCACHE_MATERIALGROUP } from "../../../../../constants/keyCache";
import { formatDate } from "../../../../../common/library/CommonLib";

class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.state = {
            CallAPIMessage: "",
            gridDataSource: [],
            IsCallAPIError: false,
            SearchData: InitSearchParams,
            dataExport: [],
            DataTemplateExport
        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        this.callSearchData(this.state.SearchData);
        this.props.updatePagePath(PagePath);
    }

    handleExportFile(result) {
        this.addNotification(result.Message, result.IsError);
    }


    handleImportFile(resultRows, errors) {
        const arrResultRows = resultRows.map(item => {
            const { DistrictID, DistrictName, ProvinceID, ProvinceName, WardID, WardName } = item
            return {
                ...item,
                DistrictFullName: `${DistrictID} - ${DistrictName}`,
                ProvinceFullName: `${ProvinceID} - ${ProvinceName}`,
                WardFullName: `${WardID} - ${WardName}`
            }
        })

        this.setState({
            DataSource1: {
                ...this.state.DataSource,
                CoordinatorStoreWard_ItemList: [...this.state.DataSource.CoordinatorStoreWard_ItemList, ...arrResultRows]
            }
        })
        // this.props.callFetchAPI(APIHostName, AddAutoAPIPath, resultRows).then(apiResult => {
        //     console.log('apiResult', apiResult)
        // });
    }

    handleExportFileTemplate(result) {
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
                this.callSearchData(this.state.SearchData);
                //this.props.callClearLocalCache(ERPCOMMONCACHE_MATERIALGROUP);
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
        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
            //this.searchref.current.changeLoadComplete();
            this.setState({ IsCallAPIError: apiResult.IsError });
            if (!apiResult.IsError) {
                // xuất exel
                const exelData = apiResult.ResultObject.map((item, index) => {
                    let element = {
                        "Người dùng": item.UserName,
                        "Vị trí thưởng": item.RewardPositionName,
                        "Áp dụng từ ngày": formatDate(item.ApplyFromDate),
                        "Áp dụng đến ngày": formatDate(item.ApplyToDate),
                        "Kích hoạt": item.IsActived ? "Có" : "Không",
                        "Ngày cập nhật": formatDate(item.UpdatedDate),
                        "Người cập nhật": item.UpdatedUserFullName
                    };
                    return element;

                })

                this.setState({
                    dataExport: exelData,
                    gridDataSource: apiResult.ResultObject,
                    IsCallAPIError: apiResult.IsError,
                    IsShowForm: true
                });
            } else {
                this.setState({
                    dataExport: [],
                    gridDataSource: [],
                    IsShowForm: false,
                    IsCallAPIError: !apiResult.IsError,
                });
                this.showMessage(apiResult.Message);
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


    render() {
        if (this.state.IsShowForm) {
            return (
                <React.Fragment>
                    <ReactNotification ref={this.notificationDOMRef} />
                    <SearchForm
                        FormName="Tìm kiếm vị trí thưởng theo khoảng thời gian"
                        MLObjectDefinition={SearchMLObjectDefinition}
                        listelement={SearchElementList}
                        onSubmit={this.handleSearchSubmit}
                        ref={this.searchref}
                    />
                    <DataGrid
                        listColumn={DataGridColumnList}
                        dataSource={this.state.gridDataSource}
                        AddLink={AddLink}
                        IDSelectColumnName={IDSelectColumnName}
                        PKColumnName={PKColumnName}
                        onDeleteClick={this.handleDelete}
                        ref={this.gridref}
                        RequirePermission={PERIODUSERRWPOSITION_VIEW}
                        DeletePermission={PERIODUSERRWPOSITION_DELETE}
                        ExportPermission={PERIODUSERRWPOSITION_EXPORT}
                        IsAutoPaging={true}
                        RowsPerPage={30}
                        IsExportFile={true}
                        DataExport={this.state.dataExport}
                        fileName="Danh sách vị trí thưởng theo khoảng thời gian"
                        onExportFile={this.handleExportFile.bind(this)}

                        // isImportFile={true}
                        // schemaData={schema}
                        // onImportFile={this.handleImportFile.bind(this)}
                        // isExportFileTemplate={true}
                        // DataTemplateExport={this.state.DataTemplateExport}
                        // fileNameTemplate={"Danh sách vị trí thưởng theo khoảng thời gian"}
                        // onExportFileTemplate={this.handleExportFileTemplate.bind(this)}
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
        }
    };
};

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchCom);
export default Search;
