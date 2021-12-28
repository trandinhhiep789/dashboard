import React from "react";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
// import SearchForm from "../../../../../common/components/FormContainer/SearchForm";
import SearchForm from "../../../../../common/components/FormContainer/SearchForm";
import { MessageModal } from "../../../../../common/components/Modal";
import DataGrid from "../../../../../common/components/DataGrid";
import {
    PagePath,
    SearchMLObjectDefinition,
    SearchElementList,
    GridColumnList,
    APIHostName,
    SearchAPIPath,
    SearchUnlockLogAPIPath,
    InitSearchParams,
    UpdateUnlockAPIPath,
    SearchDetailAPIPath,
    SearchExportAPIPath,
    SearchWithinPaginationAPI
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { GET_CACHE_USER_FUNCTION_LIST, TMS_PNSERVICEPRICETABLE_VIEW, TMS_STAFFDEBT_EXPORT, TMS_STAFFDEBT_VIEW } from "../../../../../constants/functionLists";
import { MODAL_TYPE_COMMONTMODALS } from "../../../../../constants/actionTypes";
import { callGetCache, callGetUserCache } from "../../../../../actions/cacheAction";
import { showModal, hideModal } from '../../../../../actions/modal';
import { toIsoStringCus } from '../../../../../utils/function';
import { Base64 } from 'js-base64';
//import DataGirdStaffDebt from "../DataGirdStaffDebt";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { MODAL_TYPE_DOWNLOAD_EXCEL, MODAL_TYPE_SHOWDOWNLOAD_EXCEL } from "../../../../../constants/actionTypes";
import { ERPCOMMONCACHE_TMSCONFIG } from "../../../../../constants/keyCache";

class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        // this.callSearchData = this.callSearchData.bind(this);
        this.callDataFirstPage = this.callDataFirstPage.bind(this);
        this.callDataThroughtPage = this.callDataThroughtPage.bind(this);
        this.handleExportCSV = this.handleExportCSV.bind(this);
        this.updateStaffDebtStatus = this.updateStaffDebtStatus.bind(this);
        this.handleHistorySearch = this.handleHistorySearch.bind(this);
        this.getCacheMTG = this.getCacheMTG.bind(this);

        this.state = {
            IsCallAPIError: false,
            gridDataSource: [],
            IsLoadDataComplete: false,
            SearchData: InitSearchParams,
            widthPercent: "",
            dataExport: [],
            PageNumber: 1,
            exportTemplateID: ""

        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        this.getCacheMTG();
        this.props.updatePagePath(PagePath);
        //  this.checkPermission();
        //this.callDataFirstPage(this.state.SearchData)
        window.addEventListener("resize", this.updateWindowDimensions);
    }

    getCacheMTG() {
        this.props.callGetCache(ERPCOMMONCACHE_TMSCONFIG).then((result) => {
            if (result && !result.IsError && result.ResultObject) {
                let _configValue = result.ResultObject.CacheData.filter(x => x.TMSConfigID == "TEMPLATE_EXPORT_CONSTRUCTREVENUE");
                if (_configValue) {
                    this.setState({
                        exportTemplateID: _configValue[0].TMSConfigValue
                    })
                }


            }
        });
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({
            widthPercent: (window.innerWidth * 90) / 100
        })
    };


    checkPermission() {
        let IsAllowedAdd = false;

        this.props.callGetUserCache(GET_CACHE_USER_FUNCTION_LIST).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                let isAllowAdd = result.ResultObject.CacheData.filter(x => x.FunctionID == TMS_PNSERVICEPRICETABLE_VIEW);
                if (isAllowAdd && isAllowAdd.length > 0) {
                    IsAllowedAdd = true;
                }

                this.setState({
                    IsAllowedAdd: IsAllowedAdd
                });
            }
        });
    }


    handleSearchSubmit(formData, MLObject) {
        const postData = [
            {
                SearchKey: "@CONSTRUCTSERVICETYPEID",
                SearchValue: MLObject.ConstructServiceTypeID
            },
            {
                SearchKey: "@PRODUCTID",
                SearchValue: MLObject.ProductID
            },
            {
                SearchKey: "@FROMDATE",
                SearchValue: toIsoStringCus(new Date(MLObject.FromDate).toISOString())
            },
            {
                SearchKey: "@TODATE",
                SearchValue: toIsoStringCus(new Date(MLObject.ToDate).toISOString())
            }

        ];

        this.setState({
            SearchData: postData
        })

        this.callDataFirstPage(postData)
    }

    callDataFirstPage(searchData) {
        this.props.callFetchAPI(APIHostName, SearchWithinPaginationAPI, searchData).then(apiResult => {
            if (!apiResult.IsError) {
                let objStaffDebtID = {}
                const tempData = apiResult.ResultObject.map((item, index) => {
                    objStaffDebtID = {
                        UserName: item.UserName,
                        StoreID: item.StoreID
                    }
                    item.StaffDebtID = Base64.encode(JSON.stringify(objStaffDebtID));
                    item.FullNameMember = item.UserName + " - " + item.FullName
                    item.Note = "Chi tiết"
                    if (item.IsLockDelivery) {
                        item.DeliveryStatus = <span className='lblstatusLock'>Đã khóa</span>;
                    }
                    else {
                        item.DeliveryStatus = <span className='lblstatusUnlock'>Hoạt động</span>;
                    }
                    return item;
                })

                this.setState({
                    gridDataSource: tempData
                })
            }
            else {
                this.setState({
                    gridDataSource: []
                })
                this.showMessage(apiResult.MessageDetail)
            }
        })
    }

    callDataThroughtPage(PageNumber) {
        const { SearchData } = this.state

        const listMLObject = Object.assign([], SearchData, {
            [6]: {
                SearchKey: "@PAGEINDEX",
                SearchValue: PageNumber - 1
            }
        });

        this.props.callFetchAPI(APIHostName, SearchWithinPaginationAPI, listMLObject).then(apiResult => {
            if (!apiResult.IsError) {
                let objStaffDebtID = {}
                const tempData = apiResult.ResultObject.map((item, index) => {
                    objStaffDebtID = {
                        UserName: item.UserName,
                        StoreID: item.StoreID
                    }
                    item.StaffDebtID = Base64.encode(JSON.stringify(objStaffDebtID));
                    item.FullNameMember = item.UserName + " - " + item.FullName
                    item.Note = "Xem"
                    if (item.IsLockDelivery) {
                        item.DeliveryStatus = <span className='lblstatusLock'>Đã khóa</span>;
                    }
                    else {
                        item.DeliveryStatus = <span className='lblstatusUnlock'>Hoạt động</span>;
                    }
                    return item;
                })

                this.setState({
                    gridDataSource: tempData
                })
            }
            else {
                this.setState({
                    gridDataSource: []
                })
                this.showMessage(apiResult.MessageDetail)
            }
        })
    }

    handleonChangePage(PageNumber) {
        this.callDataThroughtPage(PageNumber)

        this.setState({
            PageNumber
        })
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

    updateStaffDebtStatus(objDataRequest) {
        this.props.callFetchAPI(APIHostName, UpdateUnlockAPIPath, objDataRequest).then(apiResult => {
            this.addNotification(apiResult.Message, apiResult.IsError);
            this.callDataFirstPage(this.state.SearchData);
        });
    }

    onhandleUpdateItem(objId) {
        const { gridDataSource, widthPercent } = this.state;

        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: "Mô tả lý do thay đổi trạng thái",
            content: {
                text: <ChangeActiveModal
                    dataSource={gridDataSource}
                    objId={objId}
                    ObjDataRequest={this.updateStaffDebtStatus}
                />
            },
            maxWidth: '800px'
        });
    }

    onhandleHistoryItem(objId) {
        const { gridDataSource } = this.state;
        const dataFind = gridDataSource.find(n => {
            return n.StaffDebtID == objId[0].value
        });

        const postData = [
            {
                SearchKey: "@USERNAME",
                SearchValue: dataFind.UserName
            },
            {
                SearchKey: "@STOREID",
                SearchValue: dataFind.StoreID
            },

        ];

        this.props.callFetchAPI(APIHostName, SearchUnlockLogAPIPath, postData).then(apiResult => {
            if (apiResult.IsError) {
                this.showMessage(apiResult.Message);
            }
            else {
                const tempData = apiResult.ResultObject.map((item, index) => {

                    item.FullName = item.UserName + " - " + item.FullName;
                    item.StoreFullName = item.StoreID + " - " + item.StoreName;
                    item.UnLockFullName = item.unLockDeliveryUser + " - " + item.unLockDeliveryFullName;
                    return item;
                })
                this.onShowModalHistory(tempData, dataFind);
            }
        })

    }

    onShowModalHistory(dataSource = [], dataItem) {
        const { widthPercent } = this.state;
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: "Danh sách lịch sử quản lý công nợ",
            content: {
                text: <DataGirdHistoryStaffDebt
                    dataSource={dataSource}
                    dataItem={dataItem}
                />

            },
            maxWidth: widthPercent + 'px'
        });
    }

    onShowModal(dataSource, dataItem, param) {
        const { widthPercent } = this.state;
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: "Chi tiết danh sách nợ tiền thu hộ theo nhân viên",
            content: {
                text: <DataGirdStaffDebt
                    dataSource={dataSource}
                    dataItem={dataItem}
                    param={param}
                />

            },
            maxWidth: widthPercent + 'px'
        });
    }


    onShowModalDetail(objValue, name) {
        const { gridDataSource } = this.state;
        const tempItme = gridDataSource.find(n => {
            return n.StaffDebtID == objValue[0].value
        });
        const obj = JSON.parse(Base64.decode(objValue[0].value));
        const param = [

            {
                SearchKey: "@USERNAME",
                SearchValue: obj.UserName
            },
            {
                SearchKey: "@STOREID",
                SearchValue: obj.StoreID
            },

        ]

        this.props.callFetchAPI(APIHostName, SearchDetailAPIPath, param).then(apiResult => {
            //console.log("aaa", param, apiResult)
            if (!apiResult.IsError) {
                const dataTemp = apiResult.ResultObject.map((item, index) => {
                    item.FullNameMemer = item.UserName + " - " + item.FullName
                    if (item.IsLockDelivery) {
                        item.DeliveryStatus = <span className='lblstatusLock'>Đã khóa</span>;
                    }
                    else {
                        item.DeliveryStatus = <span className='lblstatusUnlock'>Hoạt động</span>;
                    }
                    return item;
                })
                this.onShowModal(dataTemp, tempItme, param)
            }
            else {
                this.showMessage(apiResult.Message)
            }
        })

    }

    // handleExportFile() {
    // this.addNotification(result.Message, result.IsError);
    // }

    handleExportSubmit(formData, MLObject) {
        const { exportTemplateID } = this.state
        // if (MLObject.ServiceGroupID == -1) {
        //     this.addNotification("Vui lòng chọn nhóm dịch vụ", true);
        //     return;
        // }

        var curDate = new Date();
        var curMonth = curDate.getMonth();
        var fromdate = new Date(MLObject.FromDate).getMonth() + 1;
        var todate = new Date(MLObject.ToDate).getMonth() + 1;
        var diffDays = parseInt((new Date(MLObject.ToDate) - new Date(MLObject.FromDate)) / (1000 * 60 * 60 * 24), 10);
        // if (fromdate > curMonth || todate > curMonth) {
        //     this.addNotification("Vui lòng chọn tháng < " + (curMonth + 1), true);
        //     return;
        // } else if (MLObject.FromDate > MLObject.ToDate) {
        //     this.addNotification("Ngày tháng không hợp lệ", true);
        //     return;
        // }
        // } else if (diffDays >= 31) {
        //     this.addNotification("Chỉ được chọn trong vòng 31 ngày", true);
        //     return;
        // }

        if (MLObject.FromDate > MLObject.ToDate) {
            this.addNotification("Ngày tháng không hợp lệ", true);
            return;
        }


        const searchData = [
            {
                SearchKey: "@CONSTRUCTSERVICETYPEID",
                SearchValue: MLObject.ConstructServiceTypeID
            },
            {
                SearchKey: "@PRODUCTID",
                SearchValue: MLObject.ProductID
            },
            {
                SearchKey: "@FROMDATE",
                SearchValue: toIsoStringCus(new Date(MLObject.FromDate).toISOString())
            },
            {
                SearchKey: "@TODATE",
                SearchValue: toIsoStringCus(new Date(MLObject.ToDate).toISOString())
            }
        ];

        // console.log("searchData", searchData, MLObject, diffDays);
        //  return;

        const postData = {
            DataExportTemplateID: exportTemplateID,
            LoadDataStoreName: 'TMS.TMS_CONSTRUCTREVENUE_REPORT',
            KeyCached: "MAINTAINCONSTRUCT_VIEW",
            SearchParamList: searchData,
            ExportDataParamsDescription: "Từ ngày: " + toIsoStringCus(new Date(MLObject.FromDate).toISOString()) + " - Đến ngày: " +toIsoStringCus(new Date(MLObject.ToDate).toISOString()) 
        }
        this.props.callFetchAPI(APIHostName, "api/DataExportQueue/AddQueueExport", postData).then(apiResult => {
            if (!apiResult.IsError) {
                this.props.showModal(MODAL_TYPE_SHOWDOWNLOAD_EXCEL, {
                    title: "Tải file",
                    maxWidth: '1200px',
                    ParamRequest: { DataExportTemplateID: exportTemplateID }
                });
            }
            else {
                this.showMessage(apiResult.Message)
            }
        });
    }
    handleHistorySearch() {
        const { exportTemplateID } = this.state
        this.props.showModal(MODAL_TYPE_SHOWDOWNLOAD_EXCEL, {
            title: "Tải file",
            maxWidth: '1200px',
            ParamRequest: { DataExportTemplateID: exportTemplateID }
        });
    }

    handleExportCSV(dataExport) {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const fileName = 'Doanh thu chi tiết';

        const ws = XLSX.utils.json_to_sheet(dataExport);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });

        FileSaver.saveAs(data, fileName + fileExtension);

        const result = {
            IsError: false,
            Message: "Xuất file thành công!"
        }

        this.addNotification(result.Message, result.IsError);
    }

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <SearchForm
                    FormName="Tìm kiếm danh sách sách các công trình xây dựng bảo trì đang tính doanh thu"
                    MLObjectDefinition={SearchMLObjectDefinition}
                    listelement={SearchElementList}
                    onSubmit={this.handleSearchSubmit}
                    IsShowButtonSearch={false}
                    IsButtonExport={true}
                    IsButtonhistory={true}
                    onHistorySubmit={this.handleHistorySearch}
                    onExportSubmit={this.handleExportSubmit.bind(this)}
                    TitleButtonExport="Xuất dữ liệu"
                    ref={this.searchref}
                    className="multiple"
                    classNamebtnSearch="groupAction"
                />
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
        },
        hideModal: (type, props) => {
            dispatch(hideModal(type, props));
        },
        callGetUserCache: (cacheKeyID) => {
            return dispatch(callGetUserCache(cacheKeyID));
        }
    };
};

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchCom);
export default Search;
