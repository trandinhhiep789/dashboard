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
    SearchExportAPIPath
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { TMS_STAFFDEBT_VIEW } from "../../../../../constants/functionLists";
import { MODAL_TYPE_COMMONTMODALS } from "../../../../../constants/actionTypes";
import { callGetCache } from "../../../../../actions/cacheAction";
import { showModal, hideModal } from '../../../../../actions/modal';
import { toIsoStringCus } from '../../../../../utils/function';
import { Base64 } from 'js-base64';
import DataGirdStaffDebt from "../DataGirdStaffDebt";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import DataGirdHistoryStaffDebt from "../DataGirdHistoryStaffDebt";

class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.callSearchData = this.callSearchData.bind(this);

        this.state = {
            IsCallAPIError: false,
            gridDataSource: [],
            IsLoadDataComplete: false,
            SearchData: InitSearchParams,
            widthPercent: "",
            dataExport: []

        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        this.callSearchData(this.state.SearchData);
        window.addEventListener("resize", this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({
            widthPercent: (window.innerWidth * 90) / 100
        })
    };


    handleSearchSubmit(formData, MLObject) {
        // console.log("MLObject", MLObject)
        const postData = [
            {
                SearchKey: "@FROMDATE",
                SearchValue: toIsoStringCus(new Date(MLObject.FromDate).toISOString())
            },
            {
                SearchKey: "@TODATE",
                SearchValue: toIsoStringCus(new Date(MLObject.ToDate).toISOString())
            },
            {
                SearchKey: "@USERNAME",
                SearchValue: MLObject.UserName == -1 ? MLObject.UserName : MLObject.UserName.value 
            },
            {
                SearchKey: "@STOREID",
                SearchValue: MLObject.CoordinatorStoreID != "" ? MLObject.CoordinatorStoreID : -1
            },
            // {
            //     SearchKey: "@SHIPMENTORDERSTATUSGROUPID",
            //     SearchValue: MLObject.ShipmentOrderStatusGroupID
            // },
            // {
            //     SearchKey: "@RECEIVERDISTRICTID",
            //     SearchValue: MLObject.ReceiverProvinceID
            // },

        ];

        this.callSearchData(postData)
    }

    callSearchData(searchData) {

        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
            console.log("apiResult",searchData, apiResult)
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

                const tempDataExport = apiResult.ResultObject.map((item, index) => {
                    let element = {
                        "Mã NV nợ": item.FullNameMember,
                        "Kho điều phối": item.StoreID+"-"+item.StoreName,
                        "Tổng tiền phải thu hộ": item.TotalCOD,
                        "Tổng tiền phải thu vật tư": item.TotalSaleMaterialMoney,
                        "Tổng tiền phải thu": item.TotalMoney,
                        "Tổng tiền đã thu của khách hàng": item.CollectedTotalMoney,
                        "Tổng vận đơn còn nợ": item.TotalDebtOrders,
                        "Tổng vận đơn nợ quá hạn": item.TotALoverDueDebtOrders,
                        "Tình trạng": item.IsLockDelivery == false ? "Hoạt động" : "Đã khóa",
                    };

                    return element;
                })

                this.setState({
                    gridDataSource: tempData,
                    dataExport: tempDataExport,
                })
            }
            else {
                this.setState({
                    gridDataSource: []
                })
                this.showMessage(apiResult.MessageDetail)
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

    onhandleUpdateItem(objId) {
        const { gridDataSource } = this.state;
        const objDataRequest = JSON.parse(Base64.decode(objId[0].value));
        const dataFind = gridDataSource.find(n => {
            return n.StaffDebtID == objId[0].value
        });

        if (dataFind.iSunLockDelivery) {
            objDataRequest.IsLockDelivery = 1
            objDataRequest.IsUnLockDelivery= 0
        }
        else {
            objDataRequest.IsLockDelivery = 0
            objDataRequest.IsUnLockDelivery= 1
        }

        this.props.callFetchAPI(APIHostName, UpdateUnlockAPIPath, objDataRequest).then(apiResult => {
            this.addNotification(apiResult.Message, apiResult.IsError)
            this.callSearchData(this.state.SearchData)
        });
    }

    onhandleHistoryItem(objId){
        const { gridDataSource } = this.state;
        const dataFind = gridDataSource.find(n => {
            return n.StaffDebtID == objId[0].value
        });
        console.log("dataFind", dataFind)

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
            if(apiResult.IsError){
                this.showMessage(apiResult.MessageDetail);
            }
            else{
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

    onShowModalHistory(dataSource, dataItem) {
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

    onShowModal(dataSource, dataItem) {
        const { widthPercent } = this.state;
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: "Chi tiết danh sách nợ tiền thu hộ theo nhân viên",
            content: {
                text: <DataGirdStaffDebt
                    dataSource={dataSource}
                    dataItem={dataItem}
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
        const param =[
           
            {
                SearchKey: "@USERNAME",
                SearchValue: obj.UserName
            },
            {
                SearchKey: "@STOREID",
                SearchValue:  obj.StoreID
            },

        ]

        this.props.callFetchAPI(APIHostName, SearchDetailAPIPath, param).then(apiResult => {
            if(!apiResult.IsError){
                const dataTemp=  apiResult.ResultObject.map((item, index) => {
                    item.FullNameMember = item.UserName + " - " + item.FullName
                    return item;
                })
                this.onShowModal(dataTemp, tempItme)
            }
            else{
                this.showMessage(apiResult.Message)
            }
        })

    }

    handleExportFile(result) {
        this.addNotification(result.Message);
    }

    handleExportSubmit(formData, MLObject){
        const postData = [
            {
                SearchKey: "@USERNAME",
                SearchValue: MLObject.UserName ==  -1 ? MLObject.UserName : MLObject.UserName.value
            },
            {
                SearchKey: "@STOREID",
                SearchValue: MLObject.CoordinatorStoreID != "" ? MLObject.CoordinatorStoreID : -1
            },

        ];
        this.props.callFetchAPI(APIHostName, SearchExportAPIPath, postData).then(apiResult => {
            if (!apiResult.IsError) {
                if(apiResult.ResultObject.length > 0){
                    const tempDataExport = apiResult.ResultObject.map((item, index) => {
                        let element = {
                            "Mã NV nợ":  item.UserName + " - " + item.FullName,
                            "Kho điều phối": item.StoreID + "-" + item.StoreName,
                            "Tổng tiền phải thu hộ": item.TotalCOD,
                            "Tổng tiền phải thu vật tư": item.TotalSaleMaterialMoney,
                            "Tổng tiền phải thu": item.TotalMoney,
                            "Tổng tiền đã thu của khách hàng": item.CollectedTotalMoney,
                            "Tổng vận đơn còn nợ": item.TotalDebtOrders,
                            "Tổng vận đơn nợ quá hạn": item.TotALoverDueDebtOrders,
                            "Tình trạng": item.IsLockDelivery == false ? "Hoạt động" : "Đã khóa",
                        };
    
                        return element;
                    })
                    this.handleExportCSV(tempDataExport);
                }
                else{
                    this.showMessage("Dữ liệu không tồn tại nên không thể xuất.")
                }
            }
            else{
                this.showMessage(apiResult.Message)
            }
        })
    }

    
    handleExportCSV(dataExport) {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const fileName = 'Danh sách quản lý công nợ';
        let result;
        if (dataExport.length == 0) {
            result = {
                IsError: true,
                Message: "Dữ liệu không tồn tại. Không thể xuất file!"
            };
        }
        else {

            const ws = XLSX.utils.json_to_sheet(dataExport);
            const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: fileType });


            FileSaver.saveAs(data, fileName + fileExtension);

            result = {
                IsError: false,
                Message: "Xuất file thành công!"
            };
            this.addNotification(result.Message, result.IsError);
        }
    }

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <SearchForm
                    FormName="Tìm kiếm danh sách thống kê công nợ theo nhân viên"
                    MLObjectDefinition={SearchMLObjectDefinition}
                    listelement={SearchElementList}
                    onSubmit={this.handleSearchSubmit}
                    IsButtonExport={true}
                    onExportSubmit={this.handleExportSubmit.bind(this)}
                    TitleButtonExport="Xuất dữ liệu"
                    ref={this.searchref}
                    className="multiple"
                    classNamebtnSearch="groupAction"
                />

                <DataGrid
                    listColumn={GridColumnList}
                    onUpdateItem={this.onhandleUpdateItem.bind(this)}
                    onHistoryItem={this.onhandleHistoryItem.bind(this)}
                    dataSource={this.state.gridDataSource}
                    IsFixheaderTable={false}
                    IDSelectColumnName={'StaffDebtID'}
                    PKColumnName={'StaffDebtID'}
                    onShowModal={this.onShowModalDetail.bind(this)}
                    isHideHeaderToolbar={false}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    IsShowButtonPrint={false}
                    IsPrint={false}
                    IsExportFile={true}
                    DataExport={this.state.dataExport}
                    fileName="Danh sách quản lý công nợ"
                    onExportFile={this.handleExportFile.bind(this)}
                    IsAutoPaging={true}
                    RowsPerPage={20}
                    RequirePermission={TMS_STAFFDEBT_VIEW}
                    ref={this.gridref}
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
        }
    };
};

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchCom);
export default Search;
