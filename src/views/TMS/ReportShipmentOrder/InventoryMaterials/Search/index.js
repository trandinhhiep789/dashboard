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
    GridColumnListPrice,
    DataGridModalQuantityHanOverDone,
    DataGridModalQuantityHanOverDoing,
    DataGridModalQuantityReturn,
    DataGridModalChangeTotalQuantity,
    DataGridModalQuantityExpend
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { SHIPMENTORDER_REPORT_EXPORT, SHIPMENTORDER_REPORT_VIEW } from "../../../../../constants/functionLists";
import { callGetCache } from "../../../../../actions/cacheAction";
import { showModal, hideModal } from '../../../../../actions/modal';
import { ERPCOMMONCACHE_TMSCONFIG } from "../../../../../constants/keyCache";
import { MODAL_TYPE_COMMONTMODALS, MODAL_TYPE_DOWNLOAD_EXCEL, MODAL_TYPE_SHOWDOWNLOAD_EXCEL } from "../../../../../constants/actionTypes";
import ModalBox from "../components/ModalBox";
// import ModalDownloadFile from "../components/ModalDownloadFile";

class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.getCacheMTG = this.getCacheMTG.bind(this);
        this.state = {
            IsCallAPIError: false,
            gridDataSource: [],
            IsLoadDataComplete: false,
            widthPercent: "",
            ConfigValue: "",
            dataMaterialGroupExport: [],
            dataSimiliGroupExport: [],
            dataMaterialGroup: [],
            dataSimiliGroup: [],
            UserName: "",
            Month: "",
            MLObject: {},
            ConfigValueMTReturn: "",
            exportTemplateID: ""
        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
        this.onShowModalDetail = this.onShowModalDetail.bind(this);
        this.onShowModal = this.onShowModal.bind(this);
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        this.getCacheMTG()
        // this.handleSearchSubmit();
        window.addEventListener("resize", this.updateWindowDimensions);

        // const objDatatest = {
        //     UserName: "0041017", //MLObject.UserName == -1 ? "" : MLObject.UserName.value,
        //     Month: new Date()//MLObject.Month

        // }

        // this.callSearchData(objDatatest);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({
            widthPercent: (window.innerWidth * 90) / 100
        })
    }

    getCacheMTG() {
        this.props.callGetCache(ERPCOMMONCACHE_TMSCONFIG).then((result) => {
            if (result && !result.IsError && result.ResultObject) {
                let _configValue = result.ResultObject.CacheData.filter(x => x.TMSConfigID == "MATERIALGROUP_COPPERPIPE");
                if (_configValue) {
                    this.setState({
                        ConfigValue: _configValue[0].TMSConfigValue
                    })
                }
                let _configValue1 = result.ResultObject.CacheData.filter(x => x.TMSConfigID == "EXCHANGEORDER_SALEORDERTYPEID");
                if (_configValue1) {
                    this.setState({
                        ConfigValueMTReturn: _configValue1[0].TMSConfigValue
                    })
                }
                let _configValueTemplateID = result.ResultObject.CacheData.filter(x => x.TMSConfigID == "TEMPLATE_EXPORT_INVENTORYMATERIAL");
                if (_configValueTemplateID) {
                    this.setState({
                        exportTemplateID: _configValueTemplateID[0].TMSConfigValue
                    })
                }

            }


        });
    }

    handleSearchSubmit(formData, MLObject) {
        const objData = {
            UserName: (MLObject.UserName == -1 || MLObject.UserName == null) ? "" : MLObject.UserName.value,
            Month: MLObject.Month,
            AreaID: MLObject.AreaID

        }

        this.setState({
            UserName: objData.UserName,
            Month: objData.Month,
            MLObject: MLObject
        })

        const objDatatest = {
            UserName: "0041017", //MLObject.UserName == -1 ? "" : MLObject.UserName.value,
            Month: new Date()//MLObject.Month

        }

        this.callSearchData(objData);
    }

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
            if (apiResult && !apiResult.IsError && apiResult.ResultObject) {

                const tempData = apiResult.ResultObject.filter(a => a.MaterialGroupID.trim() == this.state.ConfigValue);
                const tempData1 = apiResult.ResultObject.filter(a => a.MaterialGroupID.trim() != this.state.ConfigValue);

                // xuất exel
                let exelDataSimiliGroupExport = [];
                let exelDataMaterialGroupExport = [];

                if (tempData) {
                    exelDataSimiliGroupExport = tempData.map((item, index) => {
                        let element = {
                            "Nhóm vật tư": item.MaterialGroupID,
                            "Ống đồng": item.ProductName,
                            "Đơn vị": item.QuantityUnit,
                            "Số dư đầu kỳ": item.TotalQuantityBegin,
                            "Nhận trong kỳ": item.QuantityHanOverDone,
                            "Chờ bàn giao": item.QuantityHanOverDoing,
                            "Nhập trả": item.QuantityReturn,
                            "Sử dụng trong kỳ": item.ChangeTotalQuantity,
                            "Tiêu hao khác": item.QuantityExpend,
                            "Cuối kỳ": item.TotalQuantity
                        };
                        return element;

                    })
                }


                if (tempData1) {
                    exelDataMaterialGroupExport = tempData1.map((item, index) => {
                        let element = {
                            "Nhóm vật tư": item.MaterialGroupID,
                            "Vật tư khác": item.ProductName,
                            "Đơn vị": item.QuantityUnit,
                            "Số dư đầu kỳ": item.TotalQuantityBegin,
                            "Nhận trong kỳ": item.QuantityHanOverDone,
                            "Chờ bàn giao": item.QuantityHanOverDoing,
                            "Nhập trả": item.QuantityReturn,
                            "Sử dụng trong kỳ": item.ChangeTotalQuantity,
                            "Tiêu hao khác": item.QuantityExpend,
                            "Cuối kỳ": item.TotalQuantity,
                            "Đơn giá (giá vốn)": item.SalePrice,
                            "Số tiền quy đổi": item.TotalSalePrice
                        };
                        return element;

                    })

                }

                this.setState({
                    IsLoadDataComplete: true,
                    dataMaterialGroup: tempData1,
                    dataSimiliGroup: tempData,
                    dataSimiliGroupExport: exelDataSimiliGroupExport,
                    dataMaterialGroupExport: exelDataMaterialGroupExport
                });

            }
            else {
                this.showMessage(apiResult.MessageDetail);
                this.setState({
                    IsLoadDataComplete: false,
                    dataMaterialGroup: [],
                    dataSimiliGroup: [],
                    dataSimiliGroupExport: [],
                    dataMaterialGroupExport: []
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

    handleExportFile(result) {
        this.addNotification(result.Message, result.IsError);
    }

    handleExportFilePrice() {

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


    getStatusDelivery(status) {
        switch (status) {
            case 'QuantityHanOverDone':  // Nhận trong kỳ
                return 1;
            case 'QuantityHanOverDoing': // Chờ bàn giao
                return 2;
            case 'QuantityReturn':       // Nhập trả
                return 3;
            case 'ChangeTotalQuantity':  // Sử dụng trong kỳ
                return 4;
            case 'QuantityExpend':  // Sử dụng trong kỳ
                return 5;
            default:
                return 0;
        }
    }

    onShowModal(data, typeDataGrid, userName) {
        const { widthPercent, MLObject, Month, ConfigValueMTReturn } = this.state;
        let dataExcel = [];

        switch (typeDataGrid) {
            case 1:
                dataExcel = data.map(item => {
                    const result = DataGridModalQuantityHanOverDone.reduce((acc, val) => {
                        acc[val.Caption] = item[val.DataSourceMember]

                        return acc;
                    }, {})

                    return result;
                })


                this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
                    title: "Nhận trong kỳ",
                    content: {
                        text: <ModalBox
                            UserName={userName}
                            Month={Month}
                            listColumn={DataGridModalQuantityHanOverDone}
                            dataSource={data}
                            fileName={"Nhận trong kỳ"}
                            idSelectColumnName={"AdvanceRequestID"}
                            pkColumnName={"AdvanceRequestID"}
                            dataExport={dataExcel}
                        />
                    },
                    maxWidth: widthPercent + 'px'
                });
                break;

            case 2:
                dataExcel = data.map(item => {
                    const result = DataGridModalQuantityHanOverDoing.reduce((acc, val) => {
                        acc[val.Caption] = item[val.DataSourceMember]

                        return acc;
                    }, {})

                    return result;
                })


                this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
                    title: "Chờ bàn giao",
                    content: {
                        text: <ModalBox
                            UserName={userName}
                            Month={Month}
                            listColumn={DataGridModalQuantityHanOverDoing}
                            dataSource={data}
                            fileName={"Chờ bàn giao"}
                            idSelectColumnName={"AdvanceRequestID"}
                            pkColumnName={"AdvanceRequestID"}
                            dataExport={dataExcel}
                        />
                    },
                    maxWidth: widthPercent + 'px'
                });
                break;

            case 3:
                dataExcel = data.map(item => {
                    const result = DataGridModalQuantityReturn.reduce((acc, val) => {
                        acc[val.Caption] = item[val.DataSourceMember]

                        return acc;
                    }, {})

                    return result;
                })


                this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
                    title: "Nhập trả",
                    content: {
                        text: <ModalBox
                            UserName={userName}
                            Month={Month}
                            listColumn={DataGridModalQuantityReturn}
                            dataSource={data}
                            fileName={"Nhập trả"}
                            idSelectColumnName={"SaleOrderID"}
                            pkColumnName={"SaleOrderID"}
                            dataExport={dataExcel}
                        />
                    },
                    maxWidth: widthPercent + 'px'
                });
                break;

            case 4:
                dataExcel = data.map(item => {
                    const result = DataGridModalChangeTotalQuantity.reduce((acc, val) => {
                        acc[val.Caption] = item[val.DataSourceMember]

                        return acc;
                    }, {})

                    return result;
                })


                this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
                    title: "Sử dụng trong kỳ",
                    content: {
                        text: <ModalBox
                            UserName={userName}
                            Month={Month}
                            listColumn={DataGridModalChangeTotalQuantity}
                            dataSource={data}
                            fileName={"Sử dụng trong kỳ"}
                            idSelectColumnName={"ShipmentOrderID"}
                            pkColumnName={"ShipmentOrderID"}
                            dataExport={dataExcel}
                        />
                    },
                    maxWidth: widthPercent + 'px'
                });
                break;
            case 5:
                dataExcel = data.map(item => {
                    const result = DataGridModalQuantityExpend.reduce((acc, val) => {
                        acc[val.Caption] = item[val.DataSourceMember]

                        return acc;
                    }, {})

                    return result;
                })


                this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
                    title: "Tiêu hao khác",
                    content: {
                        text: <ModalBox
                            UserName={userName}
                            Month={Month}
                            listColumn={DataGridModalQuantityExpend}
                            dataSource={data}
                            fileName={"Tiêu hao khác"}
                            idSelectColumnName={"MTReturnRequestID"}
                            pkColumnName={"MTReturnRequestID"}
                            dataExport={dataExcel}
                        />
                    },
                    maxWidth: widthPercent + 'px'
                });
                break;

            default:
                break;
        }
    }

    onShowModalDetail(objValue, name, { ...lstProps }) {
        const { UserName, Month, ConfigValueMTReturn } = this.state;
        const status = this.getStatusDelivery(name);

        const rowItem = { ...lstProps.rowItem }

        let objData = {};
        if (status == 1) { //	Nhận trong kỳ
            objData = {
                Month: Month,
                UserName: rowItem.RequestUser,//UserName
                ProductID: rowItem.ProductID,//objValue[0].value,
                IsHandOverMaterial: 1 // v_ISHANDOVERMATERIAL
            }
            this.props.callFetchAPI(APIHostName, "api/AdvanceRequest/LoadByHandOverMaterial", objData).then(apiResult => {
                if (!apiResult.IsError) {
                    this.onShowModal(apiResult.ResultObject, status, rowItem.RequestUser);
                }
                else {
                    this.showMessage(apiResult.MessageDetail)
                }
            });

        }
        if (status == 2) { //	Chờ bàn giao
            objData = {
                Month: Month,
                UserName: rowItem.RequestUser,//UserName
                ProductID: rowItem.ProductID,//objValue[0].value,
                IsHandOverMaterial: 0 // v_ISHANDOVERMATERIAL
            }
            this.props.callFetchAPI(APIHostName, "api/AdvanceRequest/LoadByHandOverMaterial", objData).then(apiResult => {
                if (!apiResult.IsError) {
                    this.onShowModal(apiResult.ResultObject, status, rowItem.RequestUser);
                }
                else {
                    this.showMessage(apiResult.MessageDetail)
                }
            });
        }
        if (status == 3) { //Nhập trả
            objData = {
                Month: Month,
                UserName: rowItem.RequestUser,
                ProductID: rowItem.ProductID,
                //OrderTypeID: ConfigValueMTReturn
                // ProductID: objValue[0].value,
                // IsHandOverMaterial: 0 // v_ISHANDOVERMATERIAL
            }
            //this.showMessage("Tính năng đang phát triển.")
            this.props.callFetchAPI(APIHostName, "api/AdvanceRequest/GetExchangeOrderByUser", objData).then(apiResult => {
                if (!apiResult.IsError) {
                    this.onShowModal(apiResult.ResultObject, status, rowItem.RequestUser);
                }
                else {
                    this.showMessage(apiResult.MessageDetail)
                }
            });
        }
        if (status == 4) { //	Sử dụng trong kỳ
            objData = {
                Month: Month,
                UserName: rowItem.RequestUser,//UserName
                ProductID: rowItem.ProductID,//objValue[0].value,
            }
            this.props.callFetchAPI(APIHostName, "api/AdvanceDebtFlow/LoadAdvanceDebtFlowUsing", objData).then(apiResult => {
                if (!apiResult.IsError) {
                    this.onShowModal(apiResult.ResultObject, status, rowItem.RequestUser);
                }
                else {
                    this.showMessage(apiResult.MessageDetail)
                }
            });
        }
        if (status == 5) { //Tiêu hao khác
            objData = {
                Month: Month,
                UserName: rowItem.RequestUser,
                ProductID: rowItem.ProductID,
            }
            // this.showMessage("Tính năng đăng phát triển.")
            this.props.callFetchAPI(APIHostName, "api/AdvanceDebtFlow/LoadQuantityExpend", objData).then(apiResult => {
                if (!apiResult.IsError) {
                    this.onShowModal(apiResult.ResultObject, status, rowItem.RequestUser);
                }
                else {
                    this.showMessage(apiResult.MessageDetail)
                }
            });
        }

    }

    onShowModalDownloadFile(data) {
        this.props.showModal(MODAL_TYPE_DOWNLOAD_EXCEL, {
            title: "Tải file",
            URLDownloadFile: data,
            maxWidth: '300px'
        });
    }

    handleExportFileFormSearch(FormData, MLObject) {
        const { exportTemplateID } = this.state;
        const objData = {
            UserName: (MLObject.UserName == -1 || MLObject.UserName == null) ? "" : MLObject.UserName.value,
            Month: MLObject.Month,
            AreaID: MLObject.AreaID

        }

        const userName = (MLObject.UserName == -1 || MLObject.UserName == null) ? "" : MLObject.UserName.value;


        const postData = [
            {
                SearchKey: "@USERNAME",
                SearchValue: userName
            },
            {
                SearchKey: "@MONTH",
                SearchValue: MLObject.Month
            },
            {
                SearchKey: "@AREAID",
                SearchValue: MLObject.AreaID
            },
            {
                SearchKey: "@PAGEINDEX",
                SearchValue: -1
            },
            {
                SearchKey: "@PAGESIZE",
                SearchValue: -1
            }
        ];


        const postDataNew = {
            DataExportTemplateID: exportTemplateID,
            LoadDataStoreName: 'TMS.RPT_TMS_ADVANCEREQUEST_INSTOCK',
            KeyCached: "SHIPMENTORDER_REPORT_VIEW",
            SearchParamList: postData,
            ExportDataParamsDescription: "USERNAME: " + userName + " - MONTH: " + MLObject.Month + " - AREAID: " + MLObject.AreaID + " - PAGEINDEX: " + "-1" + " - PAGESIZE: " + "-1",
        }

        this.props.callFetchAPI(APIHostName, "api/DataExportQueue/AddQueueExport", postDataNew).then(apiResult => {
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
    };


    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <SearchForm
                    className="multiple"
                    classNamebtnSearch="d-flex align-items-end"
                    colGroupAction="3"
                    FormName="Tìm kiếm danh sách thống kê vận đơn theo kho điều phối"
                    IsButtonExport={true}
                    listelement={SearchElementList}
                    MLObjectDefinition={SearchMLObjectDefinition}
                    onExportSubmit={this.handleExportFileFormSearch.bind(this)}
                    onSubmit={this.handleSearchSubmit.bind(this)}
                    ref={this.searchref}
                />

                <DataGrid
                    listColumn={GridColumnList}
                    dataSource={this.state.dataSimiliGroup}
                    IsFixheaderTable={false}
                    IDSelectColumnName={'ProductID'}
                    PKColumnName={'ProductID'}
                    isHideHeaderToolbar={false}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    IsShowButtonPrint={false}
                    IsPrint={false}
                    IsAutoPaging={true}
                    RowsPerPage={20}
                    ref={this.gridref}
                    RequirePermission={SHIPMENTORDER_REPORT_VIEW}
                    ExportPermission={SHIPMENTORDER_REPORT_EXPORT}
                    IsExportFile={false}
                    DataExport={this.state.dataSimiliGroupExport}
                    fileName="Danh sách báo cáo tồn vật tư ống đồng"
                    onExportFile={this.handleExportFile.bind(this)}
                    onShowModal={this.onShowModalDetail}
                />

                <DataGrid
                    listColumn={GridColumnListPrice}
                    dataSource={this.state.dataMaterialGroup}
                    IsFixheaderTable={false}
                    IDSelectColumnName={'ProductID'}
                    PKColumnName={'ProductID'}
                    isHideHeaderToolbar={false}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    IsShowButtonPrint={false}
                    IsPrint={false}
                    IsAutoPaging={true}
                    RowsPerPage={20}
                    ref={this.gridref}
                    RequirePermission={SHIPMENTORDER_REPORT_VIEW}
                    ExportPermission={SHIPMENTORDER_REPORT_EXPORT}
                    IsExportFile={false}
                    DataExport={this.state.dataMaterialGroupExport}
                    fileName="Danh sách báo cáo tồn vật tư khác"
                    onExportFile={this.handleExportFile.bind(this)}
                    onShowModal={this.onShowModalDetail}
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
