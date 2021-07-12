import React from "react";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import readXlsxFile from 'read-excel-file';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

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
    SchemaData,
    DataTemplateExport
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";
import { ERPCOMMONCACHE_SHIPMENTFEETYPE } from "../../../../../constants/keyCache";
import { SHIPMENTFEETYPE_VIEW, SHIPMENTFEETYPE_DELETE, DESTROYREQUESTTYPE_VIEW, DESTROYREQUESTTYPE_DELETE, COORDINATORGROUP_VIEW, COORDINATORGROUP_DELETE } from "../../../../../constants/functionLists";
import { showModal } from '../../../../../actions/modal';
import { MODAL_TYPE_COMMONTMODALS } from '../../../../../constants/actionTypes';
import ImportExcelModalCom from './ImportExcelModal';

class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleExportFileTemplate = this.handleExportFileTemplate.bind(this);
        this.handleImportFile = this.handleImportFile.bind(this);
        this.handleSetImportData = this.handleSetImportData.bind(this);
        this.state = {
            CallAPIMessage: "",
            gridDataSource: [],
            IsCallAPIError: false,
            SearchData: InitSearchParams,
            cssNotification: "",
            iconNotification: ""
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
                //this.props.callClearLocalCache(ERPCOMMONCACHE_SHIPMENTFEETYPE);
                // this.handleSubmitInsertLog();
            }
        });
    }

    handleSearchSubmit(formData, MLObject) {
        const postData = [
            {
                SearchKey: "@Keyword",
                SearchValue: MLObject.Keyword
            },
            {
                SearchKey: "@AreaID",
                SearchValue: MLObject.AreaID
            }
        ];
        this.setState({ SearchData: postData });
        this.callSearchData(postData);
        //this.gridref.current.clearData();
    }

    handleExportFileTemplate() {
        try {
            const ws = XLSX.utils.json_to_sheet([{}]);
            XLSX.utils.sheet_add_json(ws, DataTemplateExport);

            const wb = {
                Sheets: { "Danh sách trưởng nhóm": ws, "Danh sách nhân viên": ws },
                SheetNames: ["Danh sách trưởng nhóm", "Danh sách nhân viên"]
            };
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const data = new Blob(
                [excelBuffer],
                { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' }
            );
            FileSaver.saveAs(data, "Mẫu danh sách nhóm chi nhánh quản lý.xlsx");

            this.addNotification("Xuất file thành công!", false);
        } catch (error) {
            this.addNotification("Lỗi xuất file!", true);
        }
    }

    handleImportFile() {
        const input = document.getElementById("inputImportFile");
        input.click();

        input.addEventListener("change", () => {
            const myPromise1 = new Promise((resolve, reject) => {
                readXlsxFile(input.files[0], { sheet: "Danh sách trưởng nhóm" }).then((data) => {
                    resolve({ CoordinatorGroupMember: data });
                }).catch(error => reject(error));
            });

            const myPromise2 = new Promise((resolve, reject) => {
                readXlsxFile(input.files[0], { sheet: "Danh sách nhân viên" }).then((data) => {
                    resolve({ CoordinatorGroupDUser: data });
                }).catch(error => reject(error));
            });

            Promise.all([myPromise1, myPromise2]).then((values) => {
                if (values.length > 0) {
                    this.handleSetImportData(values);
                }
            }).catch(error => {
                alert("File vừa chọn lỗi. Vui lòng chọn file khác");
            }).finally(() => {
                input.value = "";
            })
        }, { once: true })
    }

    handleSetImportData(exportData) {
        const { gridDataSource } = this.state;

        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Kết quả nhập từ excel',
            content: {
                text: <ImportExcelModalCom
                    propsExportData={exportData}
                    propsMDCoordinatorGroup={gridDataSource}
                />
            },
            maxWidth: '1000px'
        })
    }

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
            //this.searchref.current.changeLoadComplete();
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
                        FormName="Tìm kiếm danh sách nhóm chi nhánh quản lý"
                        MLObjectDefinition={SearchMLObjectDefinition}
                        listelement={SearchElementList}
                        onSubmit={this.handleSearchSubmit}
                        ref={this.searchref}
                        proClassName={"coordinator-group d-flex flex-column justify-content-end flex-sm-row justify-content-sm-start align-items-sm-end"}
                        proCNItem={"mb-2 mr-sm-2"}
                        proCNBtnSubmit={"d-flex justify-content-end mb-2 mr-sm-2"}
                    />

                    <DataGrid
                        listColumn={DataGridColumnList}
                        dataSource={this.state.gridDataSource}
                        AddLink={AddLink}
                        IDSelectColumnName={IDSelectColumnName}
                        PKColumnName={PKColumnName}
                        onDeleteClick={this.handleDelete}
                        ref={this.gridref}
                        RequirePermission={COORDINATORGROUP_VIEW}
                        DeletePermission={COORDINATORGROUP_DELETE}
                        IsAutoPaging={true}
                        RowsPerPage={20}

                        propsIsCustomXLSX={true}
                        IsImportFile={true}
                        onImportFile={this.handleImportFile}
                        isExportFileTemplate={true}
                        onExportFileTemplate={this.handleExportFileTemplate}
                    />

                    <input type="file" id="inputImportFile" style={{ display: "none" }} />
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
