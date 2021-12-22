import React from "react";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
// import SearchForm from "../../../../../common/components/Form/SearchForm";
import SearchForm from "../../../../../common/components/FormContainer/SearchForm";
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
    AddLogAPIPath
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { GET_CACHE_USER_FUNCTION_LIST, MAINTAINCONSTRUCT_ADD, REWARDCOMPUTELOG_VIEW } from "../../../../../constants/functionLists";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import indexedDBLib from "../../../../../common/library/indexedDBLib.js";
import { CACHE_OBJECT_STORENAME } from "../../../../../constants/systemVars.js";
import { callGetCache, callGetUserCache } from "../../../../../actions/cacheAction";
import { toIsoStringCus } from "../../../../../utils/function";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import readXlsxFile from 'read-excel-file'
import { formatDate } from "../../../../../common/library/CommonLib";

const divStyle = {
    marginLeft: '4px',
};

class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleOnValueChange = this.handleOnValueChange.bind(this);
        this.handleExportCSV = this.handleExportCSV.bind(this);
        this.checkAddPermission = this.checkAddPermission.bind(this);
        this.state = {
            CallAPIMessage: "",
            gridDataSource: [],
            IsCallAPIError: false,
            SearchData: InitSearchParams,
            cssNotification: "",
            iconNotification: "",
            IsShowForm: true
        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        //this.callSearchData(this.state.SearchData);
        this.props.updatePagePath(PagePath);
        this.checkAddPermission();
    }

    checkAddPermission() {
        this.props.callGetUserCache(GET_CACHE_USER_FUNCTION_LIST).then((result) => {
            if (result && !result.IsError && result.ResultObject) {
                let _export = result.ResultObject.CacheData.filter(x => x.FunctionID == MAINTAINCONSTRUCT_ADD);
                //console.log("handleGetCache: ", _export);
                if (_export && _export.length > 0) {
                    this.setState({ IsAllowExport: true });
                }
            }

        });
    }

    handleOnValueChange(FormDataContolLstd, MLObject) {
        //console.log("FormDataContolLstd", FormDataContolLstd, MLObject);
        const postData = [
            {
                SearchKey: "@FROMDATE",
                SearchValue: toIsoStringCus(new Date(FormDataContolLstd.dtFromDate.value).toISOString())
            },
            {
                SearchKey: "@TODATE",
                SearchValue: toIsoStringCus(new Date(FormDataContolLstd.dtToDate.value).toISOString())
            }
        ];

        this.setState({ SearchData: postData });
        //console.log("postData", postData);
    }




    handleSearchSubmit(formData, MLObject) {
        const postData = [
            // {
            //     SearchKey: "@Keyword",
            //     SearchValue: MLObject.Keyword
            // },
            // {
            //     SearchKey: "@IsComputeError",
            //     SearchValue: MLObject.IsComputeError
            // },
            // {
            //     SearchKey: "@PartnerTransactionTypeID",
            //     SearchValue: MLObject.PartnerTransactionTypeID
            // },
            // {
            //     SearchKey: "@PartnerID",
            //     SearchValue: MLObject.PartnerID
            // },
            {
                SearchKey: "@FROMDATE",
                SearchValue: toIsoStringCus(new Date(MLObject.FromDate).toISOString())
            },
            {
                SearchKey: "@TODATE",
                SearchValue: toIsoStringCus(new Date(MLObject.ToDate).toISOString())
            }
        ];
        this.setState({ SearchData: postData });
        this.callSearchData(postData);
        //this.gridref.current.clearData();
        //console.log("handleSearchSubmit",MLObject);
    }

    // callSearchData(searchData) {
    //     this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
    //         //this.searchref.current.changeLoadComplete();
    //         //console.log("callSearchData",apiResult)
    //         this.setState({ IsCallAPIError: apiResult.IsError });
    //         if (apiResult && !apiResult.IsError) {
    //             let _data = apiResult.ResultObject.map((item, index) => {
    //                 item.ComputeInterval = parseFloat((item.ComputeInterval / 1000) % 60).toFixed(2);
    //                 return item;
    //             })
    //             this.setState({
    //                 gridDataSource: _data,
    //                 IsShowForm: true
    //             });

    //         } else {
    //             this.showMessage(apiResult.Message);
    //             this.setState({ IsShowForm: false });
    //         }

    //     });
    // }

    //Xuất Excel các công trình nâng cấp
    SearchProjectUpgrade() {
        this.props.callFetchAPI(APIHostName, "api/ArchitechtureType_PRJType/SearchProjectUpgradeA", this.state.SearchData).then(apiResult => {
            //console.log("apiResult", apiResult);
            if (!apiResult.IsError && apiResult.ResultObject != null) {
                const exelData = apiResult.ResultObject.map((item, index) => {
                    let element = {
                        "Mã công trình nâng cấp": item.ProjectUpgradeID,
                        "Mã loại mô hình": item.ArchitectureID,
                        "Mã kênh": item.ChannelID,
                        "Mã siêu thị": item.StoreID,
                        "Số ngày đêm": item.NumberOfDay,
                        "Ngày bắt đầu": item.StartDate,
                        "Trưởng phòng": item.ManagerUser,
                        "Trưởng nhóm": item.vIceManagerUser,
                        "Nhân viên": item.StaffUser,
                        "Ngày kết thúc": item.EndDate,
                        "Trạng thái duyệt": item.ApprovedStatus,
                        "Ngày duyệt": item.ApprovedDate,
                        "Mã đối tác": item.PartnerID,
                        "Loại đối tác": item.PartnerType,
                        "Người nhận": item.ReceivedUser,
                        "Trạng thái nhận": item.ReceivedStatus,
                        "Ngày nhận": item.ReceivedDate
                    };
                    return element;

                })
                this.handleExportCSV(exelData, "Danh sách các công trình nâng cấp");
                // this.setState({
                //     DataExport: exelData
                // });
            } else {
                this.addNotification(apiResult.Message, apiResult.IsError);
            }
        });
    }


    //Xuất Excel các loại mô hình nâng cấp
    SearchProjectArchitecture() {
        this.props.callFetchAPI(APIHostName, "api/ArchitechtureType_PRJType/SearchProjectArchitecture", this.state.SearchData).then(apiResult => {
            //console.log("apiResult", apiResult);
            if (!apiResult.IsError && apiResult.ResultObject != null) {
                const exelData = apiResult.ResultObject.map((item, index) => {
                    let element = {
                        "Mã loại mô hình": item.ArchitectureID,
                        "Tên loại mô hình": item.ArchitectureName,
                        "Mã kênh": item.ChannelID,
                        "Số ngày đêm": item.NumberOfDay
                    };
                    return element;

                })
                this.handleExportCSV(exelData, "Danh sách các loại mô hình nâng cấp");
                // this.setState({
                //     DataExport: exelData
                // });
            } else {
                this.addNotification(apiResult.Message, apiResult.IsError);
            }
        });
    }

    //Xuất Excel các công trình xây dựng
    SearchProject() {
        this.props.callFetchAPI(APIHostName, "api/ArchitechtureType_PRJType/SearchProject", this.state.SearchData).then(apiResult => {
            console.log("apiResult", apiResult);
            if (!apiResult.IsError && apiResult.ResultObject != null) {
                const exelData = apiResult.ResultObject.map((item, index) => {
                    let element = {
                        "Mã công trình mở mới": item.ProjectID,
                        "Tên công trình": item.ProjectName,
                        "Mã loại công trình": item.ProjectTypeID,
                        "Mã tỉnh": item.ProvinceID,
                        "Mã siêu thị": item.StoreID,
                        "Tình trạng": item.Status,
                        "Số ngày": item.ProjectDay,
                        "Ngày bắt đầu thi công": formatDate(item.StartDate, true),
                        "Đã kết thúc": item.ISend,
                        "Ngày bàn giao dự kiến": formatDate(item.EndDate, true),
                        "Giám đốc phòng xây dựng và sau bán hàng": item.DirectUser,
                        "Trưởng phòng": item.ManagerUser,
                        "Trưởng nhóm": item.vIceManagerUser,
                        "Nhân viên": item.StaffUser,
                        "Mã đối tác": item.PartnerID,
                        "Trạng thái duyệt": item.ApprovedStatus,
                        "Ngày duyệt": formatDate(item.ApprovedDate, true),
                        "Ngày bàn giao dự kiến": formatDate(item.FinalPayDeadLine, true),
                        "Người nhận": item.ReceivedUser,
                        "Trạng thái nhận": item.ReceivedStatus,
                        "Ngày nhận": item.ReceivedDate,
                        "Mã mô hình": item.ArchitectureID

                    };
                    return element;

                })
                this.handleExportCSV(exelData, "Danh sách các công trình xây dựng");
                // this.setState({
                //     DataExport: exelData
                // });
            } else {
                this.addNotification(apiResult.Message, apiResult.IsError);
            }
        });
    }


    //Xuất Excel các loại công trình xây dựng
    SearchProjectType() {
        this.props.callFetchAPI(APIHostName, "api/ArchitechtureType_PRJType/SearchProjectType", this.state.SearchData).then(apiResult => {
            console.log("apiResult", apiResult);
            if (!apiResult.IsError && apiResult.ResultObject != null) {
                const exelData = apiResult.ResultObject.map((item, index) => {
                    let element = {
                        "Mã loại công trình": item.ProjecTypeID,
                        "Tên loại công trình": item.ProjectTypeName,
                        "Xây mới : Số ngày hoàn tất": item.BuildDay,
                        "Sửa chữa - Số ngày hoàn tất": item.RepairDay,
                        "Nâng cấp - Số ngày hoàn tất": item.UpgradeDay,
                        "Mô tả": item.Description,
                        "BrainId của siêu thị": item.BrandID
                    };
                    return element;

                })
                this.handleExportCSV(exelData, "Danh sách các loại công trình xây dựng ");
                // this.setState({
                //     DataExport: exelData
                // });
            } else {
                this.addNotification(apiResult.Message, apiResult.IsError);
            }
        });
    }



    handleExportCSV(DataExport, title) {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        let result;
        if (!this.state.IsAllowExport) {
            result = {
                IsError: true,
                Message: "Bạn không có quyền xuất file exel!"
            };
        }
        else if (DataExport.length == 0) {
            result = {
                IsError: true,
                Message: "Dữ liệu không tồn tại. Không thể xuất file!"
            };
        }
        else {

            const ws = XLSX.utils.json_to_sheet(DataExport);
            const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: fileType });


            FileSaver.saveAs(data, title + fileExtension);

            result = {
                IsError: false,
                Message: "Xuất file thành công!"
            };
        }
        //this.props.onExportFile(result);
        this.addNotification(result.Message, result.IsError);

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
                        FormName="Tìm kiếm công trình xây dựng"
                        MLObjectDefinition={SearchMLObjectDefinition}
                        listelement={SearchElementList}
                        onSubmit={this.handleSearchSubmit}
                        onchange={this.handleOnValueChange}
                        ref={this.searchref}

                        IsShowButtonSearch={false}
                        // IsButtonExport={true}
                        // IsButtonhistory={true}
                        // TitleButtonExport="Xuất dữ liệu"

                        className="multiple"
                        classNamebtnSearch="groupAction"
                    />

                    <div className="btn-group btn-group-sm" style={divStyle}>
                        <button type="button" className="btn btn-success ml-10" title="" data-provide="tooltip" data-original-title="Xuất file" onClick={this.SearchProject.bind(this)}>
                            <span className="fa fa-file-excel-o"> Xuất Excel các công trình xây dựng</span>
                        </button>

                        <button type="button" className="btn btn-success ml-10" title="" data-provide="tooltip" data-original-title="Xuất file" onClick={this.SearchProjectType.bind(this)}>
                            <span className="fa fa-file-excel-o"> Xuất Excel các loại công trình xây dựng</span>
                        </button>

                        <button type="button" className="btn btn-success ml-10" title="" data-provide="tooltip" data-original-title="Xuất file" onClick={this.SearchProjectUpgrade.bind(this)}>
                            <span className="fa fa-file-excel-o"> Xuất Excel các công trình nâng cấp</span>
                        </button>

                        <button type="button" className="btn btn-success ml-10" title="" data-provide="tooltip" data-original-title="Xuất file" onClick={this.SearchProjectArchitecture.bind(this)}>
                            <span className="fa fa-file-excel-o"> Xuất Excel các loại mô hình nâng cấp</span>
                        </button>
                    </div>

                    {/* <DataGrid
                        listColumn={DataGridColumnList}
                        dataSource={this.state.gridDataSource}
                        //AddLink={AddLink}
                        IsShowButtonAdd={false}
                        IsShowButtonDelete={false}
                        IDSelectColumnName={IDSelectColumnName}
                        PKColumnName={PKColumnName}
                        //onDeleteClick={this.handleDelete}
                        ref={this.gridref}
                        RequirePermission={REWARDCOMPUTELOG_VIEW}
                        //DeletePermission={CANCELDELIVERYREASON_DELETE}
                        IsAutoPaging={true}
                        RowsPerPage={10}
                    /> */}
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
        callGetUserCache: (cacheKeyID) => {
            return dispatch(callGetUserCache(cacheKeyID));
        }
    };
};

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchCom);
export default Search;
