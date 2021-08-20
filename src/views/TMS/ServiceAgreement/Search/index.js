import React from "react";
import "react-notifications-component/dist/theme.css";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import ReactNotification from "react-notifications-component";
import readXlsxFile from 'read-excel-file';

import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { callGetCache } from "../../../../actions/cacheAction";
import { formatDate } from "../../../../common/library/CommonLib.js";
import { MessageModal } from "../../../../common/components/Modal";
import { MODAL_TYPE_COMMONTMODALS } from '../../../../constants/actionTypes';
import { updatePagePath } from "../../../../actions/pageAction";
import DataGrid from "../../../../common/components/DataGrid";
import ImportExcelModalCom from '../ImportExcelModal';
import SearchForm from "../../../../common/components/FormContainer/SearchForm";
import { showModal } from '../../../../actions/modal';
import {
    SERVICEAGREEMENT_DELETE,
    SERVICEAGREEMENT_EXPORT,
    SERVICEAGREEMENT_VIEW
} from "../../../../constants/functionLists";
import {
    AddAutoAPIPath,
    AddLink,
    AddLogAPIPath,
    APIHostName,
    DataGridColumnList,
    DataMasterTemplateExport,
    DeleteNewAPIPath,
    IDSelectColumnName,
    InitSearchParams,
    PagePath,
    PKColumnName,
    schema,
    SearchAPIPath,
    SearchElementList,
    SearchMLObjectDefinition,
    TitleFormSearch,
} from "../constants";

class SearchCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            CallAPIMessage: "",
            cssNotification: "",
            dataExport: [],
            DataMasterTemplateExport,
            gridDataSource: [],
            iconNotification: "",
            IsCallAPIError: false,
            IsLoadDataComplete: false,
            PageNumber: 1,
            SearchData: InitSearchParams,

        };

        this.gridref = React.createRef();
        this.notificationDOMRef = React.createRef();
        this.searchref = React.createRef();

        this.callSearchData = this.callSearchData.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleSetImportData = this.handleSetImportData.bind(this);
        this.handleSubmitImportFile = this.handleSubmitImportFile.bind(this);
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        this.callSearchData(this.state.SearchData);
    }

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {

                const result = apiResult.ResultObject.map((item) => {

                    item.ExtendLable = item.ExtendedDate ? formatDate(item.ExtendedDate, true) : 'Chưa gia hạn';
                    let currentDate = new Date();
                    if (item.ExtendedDate != null) {
                        const ExtendedDate = new Date(item.ExtendedDate);
                        var timeDiff = Math.abs(currentDate.getTime() - ExtendedDate.getTime());
                        var diffDays = parseInt((timeDiff / (1000 * 3600 * 24)));

                        if (ExtendedDate.getTime() - currentDate.getTime() < 0) {
                            item.StatusLable = <span className='lblstatus text-danger'>Hết hạn</span>;
                        }
                        else {
                            if (diffDays < 30) {
                                item.StatusLable = <span className='lblstatus text-warning'>Còn {diffDays} ngày</span>;
                            }
                            else {
                                item.StatusLable = <span className='lblstatus text-success'>Còn hạn</span>;
                            }
                        }
                    }
                    else {

                        const ExpiredDate = new Date(item.ExpiredDate);
                        var timeDiff = Math.abs(currentDate.getTime() - ExpiredDate.getTime());
                        var diffDays = parseInt((timeDiff / (1000 * 3600 * 24)));
                        if (ExpiredDate.getTime() - currentDate.getTime() < 0) {
                            item.StatusLable = <span className='lblstatus text-danger'>Hết hạn</span>;
                        }
                        else {
                            if (diffDays < 30) {
                                item.StatusLable = <span className='lblstatus text-warning'>Còn {diffDays} ngày</span>;
                            }
                            else {
                                item.StatusLable = <span className='lblstatus text-success'>Còn hạn</span>;
                            }
                        }
                    }

                    if (item.IsdePOSited) {
                        item.DepositedLable = "Đã ký";
                    }
                    else {
                        item.DepositedLable = "Chưa ký";
                    }
                    return item;

                })

                const tempData = apiResult.ResultObject.map((item, index) => {
                    item.ExtendAgreement = item.ExtendedDate ? formatDate(item.ExtendedDate) : 'Chưa gia hạn';

                    const ExpiredDate = new Date(item.ExpiredDate);
                    let currentDate = new Date();


                    if (item.ExtendedDate != null) {
                        const ExtendedDate = new Date(item.ExtendedDate);
                        var timeDiff = Math.abs(currentDate.getTime() - ExtendedDate.getTime());
                        var diffDays = parseInt((timeDiff / (1000 * 3600 * 24)));

                        if (ExtendedDate.getTime() - currentDate.getTime() < 0) {
                            item.StatusAgreement = "Hết hạn";
                        }
                        else {
                            if (diffDays < 30) {
                                item.StatusAgreement = `Còn ${diffDays} ngày`;
                            }
                            else {
                                item.StatusAgreement = "Còn hạn";
                            }
                        }
                    }
                    else {

                        const ExpiredDate = new Date(item.ExpiredDate);
                        var timeDiff = Math.abs(currentDate.getTime() - ExpiredDate.getTime());
                        var diffDays = parseInt((timeDiff / (1000 * 3600 * 24)));
                        if (ExpiredDate.getTime() - currentDate.getTime() < 0) {
                            item.StatusAgreement = "Hết hạn";
                        }
                        else {
                            var timeDiff = Math.abs(currentDate.getTime() - ExpiredDate.getTime());
                            var diffDays = parseInt((timeDiff / (1000 * 3600 * 24)));
                            if (diffDays < 30) {
                                item.StatusAgreement = `Còn ${diffDays} ngày`;
                            }
                            else {
                                item.StatusAgreement = "Còn hạn";
                            }
                        }
                    }

                    let element = {
                        "Số hợp đồng": item.ServiceAgreementNumber,
                        "Đối tác": item.PartnerName,
                        "Loại dịch vụ": item.ServiceTypeName,
                        "Khu vực": item.AreaName,
                        "Ngày ký hợp đồng": item.SignedDate,
                        "Ngày hết hạn hợp đồng": item.ExpiredDate,
                        "Gia hạn đến": item.ExtendAgreement,
                        "Trạng thái": item.StatusAgreement
                    };

                    return element;

                })

                this.setState({
                    gridDataSource: result,
                    dataExport: tempData,
                    IsCallAPIError: apiResult.IsError,
                });
            }
        });
    }

    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
            />
        );
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

        this.props.callFetchAPI(APIHostName, DeleteNewAPIPath, listMLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.addNotification(apiResult.Message, apiResult.IsError);
            if (!apiResult.IsError) {
                this.callSearchData(this.state.SearchData);
            }
        });
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

    handleSearchSubmit(formData, MLObject) {
        const DataSearch = [
            {
                SearchKey: "@Keyword",
                SearchValue: MLObject.Keyword
            },
            {
                SearchKey: "@SERVICETYPEID",
                SearchValue: MLObject.ServiceTypeID
            },
            {
                SearchKey: "@AREAID",
                SearchValue: MLObject.AreaID
            },
            {
                SearchKey: "@FromDate",
                SearchValue: MLObject.SignedDate
            },
            {
                SearchKey: "@ToDate",
                SearchValue: MLObject.ExpiredDate
            },
            {
                SearchKey: "@STATUS",
                SearchValue: MLObject.ServiceStatusID
            }

        ];

        this.setState({
            SearchData: DataSearch
        });

        this.callSearchData(DataSearch);
    }

    handleExportFile(result) {
        this.addNotification(result.Message, result.IsError);
    }

    handleImportFile() {
        const input = document.getElementById("inputImportFile");
        input.click();

        input.addEventListener("change", () => {
            readXlsxFile(input.files[0], { sheet: "Danh sách hợp đồng dịch vụ", schema }).then((data) => {
                this.handleSetImportData(data);
            }).catch(error => {
                console.log("handleImportFile", error);
                alert("File vừa chọn lỗi. Vui lòng chọn file khác")
            }).finally(() => {
                input.value = "";
            })
        }, { once: true })

        //#region 
        // if (errors.length > 0) {
        //     this.showMessage("Dữ liệu thêm vào không đúng. Vui lòng kiểm tra lại file.");
        // } else {
        //     let MLObject = {};
        //     MLObject.ServiceAgreementList = resultRows;
        //     this.props.callFetchAPI(APIHostName, "api/ServiceAgreement/AddImport", MLObject).then(apiResult => {
        //         if (apiResult.IsError) {
        //             this.showMessage(apiResult.Message);
        //         }
        //         else {
        //             this.addNotification(apiResult.Message, apiResult.IsError);
        //             this.callSearchData(this.state.SearchData);
        //         }
        //     });
        // }
        //#endregion
    }

    handleExportFileTemplate() {
        try {
            const ws = XLSX.utils.json_to_sheet([{}]);
            XLSX.utils.sheet_add_json(ws, DataMasterTemplateExport);

            const wb = {
                Sheets: { "Danh sách hợp đồng dịch vụ": ws },
                SheetNames: ["Danh sách hợp đồng dịch vụ"]
            };
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const data = new Blob(
                [excelBuffer],
                { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' }
            );
            FileSaver.saveAs(data, "Danh sách hợp đồng dịch vụ.xlsx");

            this.addNotification("Xuất file thành công!", false);
        } catch (error) {
            this.addNotification("Lỗi xuất file!", true);
        }
    }

    handleSetImportData(values) {
        let dataSource = values.rows.map(item => {
            const uptServiceAgreementNumber = item.ServiceAgreementNumber.replace(/\s/g, "");
            return {
                ...item,
                ServiceAgreementNumber: uptServiceAgreementNumber,
                Errors: ""
            }
        });

        //#region set nội dung lỗi
        if (values.errors.length != 0) {
            for (const item of values.errors) {
                let errorText = "";
                if (dataSource[item.row - 1].Errors == "") {
                    errorText = item.column;
                } else {
                    errorText = `${dataSource[item.row - 1].Errors}, ${item.column}`
                }
                dataSource[item.row - 1].Errors = errorText;
            }
        }
        //#endregion

        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Kết quả nhập từ excel',
            content: {
                text: <ImportExcelModalCom
                    dataSource={dataSource}
                    onSubmit={this.handleSubmitImportFile}
                />
            },
            maxWidth: '100%'
        })
    }

    handleSubmitImportFile(data) {
        this.props.callFetchAPI(APIHostName, "api/ServiceAgreement/AddImport", { ServiceAgreementList: data }).then(apiResult => {
            if (apiResult.IsError) {
                this.showMessage(apiResult.Message);
            }
            else {
                this.addNotification(apiResult.Message, apiResult.IsError);
                this.callSearchData(this.state.SearchData);
            }
        });
    }

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <SearchForm
                    className="multiple multiple-custom"
                    FormName={TitleFormSearch}
                    listelement={SearchElementList}
                    MLObjectDefinition={SearchMLObjectDefinition}
                    onSubmit={this.handleSearchSubmit}
                    ref={this.searchref}

                />
                <DataGrid
                    AddLink={AddLink}
                    DataExport={this.state.dataExport}
                    dataSource={this.state.gridDataSource}
                    DataTemplateExport={this.state.DataMasterTemplateExport}
                    DeletePermission={SERVICEAGREEMENT_DELETE}
                    ExportPermission={SERVICEAGREEMENT_EXPORT}
                    fileName="Danh sách hợp đồng"
                    fileNameTemplate={"Template import hợp đồng"}
                    IDSelectColumnName={IDSelectColumnName}
                    IsAutoPaging={true}
                    IsDelete={true}
                    IsExportFile={true}
                    isExportFileTemplate={true}
                    IsImportFile={true}
                    listColumn={DataGridColumnList}
                    onDeleteClick={this.handleDelete}
                    onExportFile={this.handleExportFile.bind(this)}
                    onExportFileTemplate={this.handleExportFileTemplate.bind(this)}
                    onImportFile={this.handleImportFile.bind(this)}
                    PKColumnName={PKColumnName}
                    propsIsCustomXLSX={true}
                    RequirePermission={SERVICEAGREEMENT_VIEW}
                    RowsPerPage={10}
                    SchemaData={schema}
                />

                <input type="file" id="inputImportFile" style={{ display: "none" }} />
            </React.Fragment>
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
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        }
    };
};

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchCom);
export default Search;
