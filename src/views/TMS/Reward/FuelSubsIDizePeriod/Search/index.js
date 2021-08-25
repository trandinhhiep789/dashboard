import React from "react";
import { connect } from "react-redux";
import ReactNotification from "react-notifications-component";
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import readXlsxFile from 'read-excel-file';
import moment from 'moment';

import SearchForm from "../../../../../common/components/FormContainer/SearchForm";
import { MessageModal } from "../../../../../common/components/Modal";
import DataGrid from "../../../../../common/components/DataGrid";
import {
    PagePath, listColumn, APIHostName, MLObjectDefinition, listelement, initSearchArgument,
    APISearch, APIDeleteList, APIExportFile, DataTemplateExport, schema
} from "./constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callGetCache } from "../../../../../actions/cacheAction";
import { showModal, hideModal } from '../../../../../actions/modal';
import ImportExcelModalCom from './ImportExcelModal';
import { MODAL_TYPE_COMMONTMODALS } from '../../../../../constants/actionTypes';
import { FUELSUBSIDIZEPERIOD_VIEW, FUELSUBSIDIZEPERIOD_ADD, FUELSUBSIDIZEPERIOD_DEL, FUELSUBSIDIZEPERIOD_EXPORT } from '../../../../../constants/functionLists'

class SearchCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stateIsError: false,
            stateInitSearchArgument: initSearchArgument,
            stateDataSource: null,
            statePageNumber: 1
        };

        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
        this.showMessage = this.showMessage.bind(this);
        this.addNotification = this.addNotification.bind(this);
        this.callSearchData = this.callSearchData.bind(this);
        this.callImportFile = this.callImportFile.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleExportFile = this.handleExportFile.bind(this);
        this.handleImportFile = this.handleImportFile.bind(this);
        this.handleExportFileTemplate = this.handleExportFileTemplate.bind(this);
        this.handleSetImportData = this.handleSetImportData.bind(this);
        this.handleCheckErrorImportFile = this.handleCheckErrorImportFile.bind(this);
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        this.callSearchData(this.state.stateInitSearchArgument);
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

    addNotification(message, IsError) {
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
                        <p className="notification-message">{message}</p>
                    </div>
                </div>
            ),
            dismiss: { duration: 6000 },
            dismissable: { click: true }
        });
    }

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, APISearch, searchData).then(apiResult => {
            if (!apiResult.IsError) {
                const setResultObject = apiResult.ResultObject.map(item => {
                    return {
                        ...item,
                        UserIDName: `${item.UserName} - ${item.UserFullName}`,
                        CreateUserIDName: `${item.CreatedUser} - ${item.CreatedUserFullName}`
                    }
                })
                this.setState({
                    stateDataSource: setResultObject
                })
            } else {
                this.showMessage(apiResult.Message);
            }
        });
    }

    callImportFile(postData) {
        this.props.callFetchAPI(APIHostName, APISearch, postData).then(apiResult => {
            if (!apiResult.IsError) {

            } else {
                this.showMessage(apiResult.Message);
            }
        });
    }

    handleSearchSubmit(formData, MLObject) {
        const postData = [
            {
                SearchKey: "@USERNAME",
                SearchValue: MLObject.UserName ? MLObject.UserName.value : -1
            },
            {
                SearchKey: "@FROMDATE",
                SearchValue: MLObject.FromDate
            },
            {
                SearchKey: "@TODATE",
                SearchValue: MLObject.ToDate
            },
            {
                SearchKey: "@PAGENUMBER",
                SearchValue: 1
            },
            {
                SearchKey: "@PAGESIZE",
                SearchValue: 50
            }
        ]

        if ((MLObject.FromDate != "" && MLObject.ToDate == "")) {
            this.showMessage("Vui lòng nhập đến ngày");
            return;
        } else if ((MLObject.FromDate == "" && MLObject.ToDate != "")) {
            this.showMessage("Vui lòng nhập từ ngày");
            return;
        }

        this.setState({
            stateInitSearchArgument: postData
        })
        this.callSearchData(postData);
    }

    handleChangePage(pageNum) {
        const { stateInitSearchArgument } = this.state;
        const arrStateInitSearchArgument = stateInitSearchArgument.map(item => {
            if (item.SearchKey == "@PAGENUMBER") {
                return {
                    SearchKey: "@PAGENUMBER",
                    SearchValue: pageNum
                }
            } else {
                return item;
            }
        });
        this.setState({
            stateInitSearchArgument: arrStateInitSearchArgument,
            statePageNumber: pageNum
        })
        this.callSearchData(arrStateInitSearchArgument);
    }

    handleDelete(listDeleteID, ListPKColumnName) {
        const arrDeleteUsers = listDeleteID.map(item => item.pkColumnName[0].value);
        const postData = arrDeleteUsers.join();

        this.props.callFetchAPI(APIHostName, APIDeleteList, postData).then(apiResult => {
            if (!apiResult.IsError) {
                this.showMessage(apiResult.Message);
                this.callSearchData(this.state.stateInitSearchArgument);
            } else {
                this.showMessage(apiResult.Message);
            }
        });
    }

    handleExportFile() {
        const { stateInitSearchArgument } = this.state;
        const postData = stateInitSearchArgument.filter(item => {
            return item.SearchKey != "@PAGENUMBER" && item.SearchKey != "@PAGESIZE";
        })

        this.props.callFetchAPI(APIHostName, APIExportFile, postData).then(apiResult => {
            if (!apiResult.IsError) {
                const arrExportData = apiResult.ResultObject.map(item => {
                    return {
                        "Nhân viên": `${item.UserName} - ${item.UserFullName}`,
                        "Từ ngày": moment(item.FromDate).format("DD/MM/YYYY"),
                        "Đến ngày": moment(item.ToDate).format("DD/MM/YYYY"),
                        "Nhân viên tạo": `${item.CreatedUser} - ${item.CreatedUserFullName}`,
                        "Ngày tạo": moment(item.CreatedDate).format("DD/MM/YYYY"),
                        "Ghi chú": item.Note
                    }
                })

                const ws = XLSX.utils.json_to_sheet(arrExportData);

                const wb = {
                    Sheets: { "Sheet1": ws },
                    SheetNames: ["Sheet1"]
                };
                const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
                const data = new Blob(
                    [excelBuffer],
                    { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' }
                );
                FileSaver.saveAs(data, "Danh sách khoảng thời gian nhân viên được phụ cấp xăng.xlsx");

                this.addNotification("Xuất file thành công!", false);
            } else {
                this.addNotification("Xuất file lỗi!", true);
            }
        });
    }

    handleExportFileTemplate() {
        try {
            const ws = XLSX.utils.json_to_sheet([{}]);
            XLSX.utils.sheet_add_json(ws, DataTemplateExport);

            const wb = {
                Sheets: { "Sheet1": ws },
                SheetNames: ["Sheet1"]
            };
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const data = new Blob(
                [excelBuffer],
                { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' }
            );
            FileSaver.saveAs(data, "Mẫu danh sách khoảng thời gian nhân viên được phụ cấp xăng.xlsx");

            this.addNotification("Xuất file thành công!", false);
        } catch (error) {
            this.addNotification("Lỗi xuất file!", true);
        }
    }

    handleCheckErrorImportFile(rows) {
        //kiểm tra những row lỗi cơ bản
        const patternUserName = /^[0-9]{4,}$/;
        const arrRows = rows.map(item => {
            let IsError = false, MessageError = "";
            if (!item.UserName || !patternUserName.test(item.UserName)) {
                IsError = true;
                MessageError = "Mã User không hợp lệ";
            } else if (!item.FromDate) {
                IsError = true;
                MessageError = "Cột từ ngày không hợp lệ";
            } else if (!item.ToDate) {
                IsError = true;
                MessageError = "Cột đến ngày không hợp lệ";
            } else if (item.FromDate.getTime() > item.ToDate.getTime()) {
                IsError = true;
                MessageError = "Khoảng thời gian không hợp lệ";
            }
            return {
                ...item,
                IsError,
                MessageError
            }
        });
        arrRows.sort((a, b) => b.IsError - a.IsError || a.UserName - b.UserName || a.FromDate - b.FromDate);

        //lấy danh sách user không bị lỗi
        const arrNoError = arrRows.filter(item => !item.IsError);

        //Nhóm item có cùng username
        const objGroupUser = arrNoError.reduce((result, currentValue) => {
            ((result[currentValue.UserName] = result[currentValue.UserName] || [])).push(currentValue);
            return result;
        }, {});

        //in ra object mã user cùng trạng thái lỗi có hay không
        let objIsTimeOverlap = {};
        for (const key in objGroupUser) {
            if (Object.hasOwnProperty.call(objGroupUser, key)) {
                const element = objGroupUser[key];

                const isTimeOverlap = element.some((item, index) => {
                    if (index == 0) return false;
                    else return item.FromDate.getTime() < element[index - 1].ToDate.getTime()
                })
                objIsTimeOverlap[key] = isTimeOverlap;
            }
        }

        //lấy danh sách user bị lỗi
        const arrError = arrRows.filter(item => item.IsError);

        //update lại danh sách user không bị lỗi (gán lỗi cho những row có khoảng thời gian trùng nhau)
        const arrUpdateNoError = arrNoError.map(item => {
            return {
                ...item,
                IsError: objIsTimeOverlap[item.UserName],
                MessageError: objIsTimeOverlap[item.UserName] ? "Trùng khoảng thời gian" : ""
            }
        })

        //update lại danh sách user import

        this.handleSetImportData([...arrError, ...arrUpdateNoError]);
    }

    handleImportFile(event) {
        const input = document.getElementById("inputImportFile");
        input.click();

        input.addEventListener("change", () => {
            readXlsxFile(input.files[0], { schema }).then(({ rows, errors }) => {
                this.handleCheckErrorImportFile(rows);
            }).catch(error => {
                alert("File vừa chọn lỗi. Vui lòng chọn file khác");
            }).finally(() => {
                input.value = "";
            });
        }, { once: true })
    }

    handleSetImportData(exportData) {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Kết quả nhập từ excel',
            content: {
                text: <ImportExcelModalCom
                    propsExportData={exportData}
                />
            },
            maxWidth: '1000px'
        })
    }

    render() {
        const { stateDataSource, statePageNumber } = this.state;
        if (stateDataSource == null) {
            return <React.Fragment>...</React.Fragment>
        } else {
            return (
                <React.Fragment>
                    <ReactNotification ref={this.notificationDOMRef} />

                    <SearchForm
                        FormName="abc"
                        MLObjectDefinition={MLObjectDefinition}
                        listelement={listelement}
                        onSubmit={this.handleSearchSubmit}
                        ref={this.searchref}
                        className="multiple multiple-custom multiple-custom-display"
                        classNamebtnSearch="btn-custom-bottom"
                    />

                    <DataGrid
                        AddLink={"/FuelSubsIDizePeriod/Add"}
                        dataSource={stateDataSource}
                        DeletePermission={FUELSUBSIDIZEPERIOD_DEL}
                        ExportPermission={FUELSUBSIDIZEPERIOD_EXPORT}
                        IDSelectColumnName={"chkSelect"}
                        IsAutoPaging={true}
                        isCustomExportFileTemplate={true}
                        isCustomImportFile={true}
                        IsDelete={true}
                        IsExportFile={true}
                        isExportFileTemplate={true}
                        isHideHeaderToolbar={false}
                        IsImportFile={true}
                        isPaginationServer={true}
                        IsShowButtonAdd={true}
                        IsShowButtonDelete={true}
                        listColumn={listColumn}
                        onChangePage={this.handleChangePage}
                        onDeleteClick={this.handleDelete}
                        onExportFile={this.handleExportFile}
                        onExportFileTemplate={this.handleExportFileTemplate}
                        onImportFile={this.handleImportFile}
                        PageNumber={statePageNumber}
                        PKColumnName={"FuelSubsidizePeriodID"}
                        ref={this.gridref}
                        RequirePermission={FUELSUBSIDIZEPERIOD_VIEW}
                        RowsPerPage={50}
                    />

                    <input type="file" id="inputImportFile" style={{ display: "none" }} />
                </React.Fragment>
            );
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: (type, props) => {
            dispatch(hideModal(type, props));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchCom);
