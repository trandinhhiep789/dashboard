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
    DataGridModalChangeTotalQuantity
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { SHIPMENTORDER_REPORT_EXPORT, SHIPMENTORDER_REPORT_VIEW } from "../../../../../constants/functionLists";
import { callGetCache } from "../../../../../actions/cacheAction";
import { showModal, hideModal } from '../../../../../actions/modal';
import { ERPCOMMONCACHE_TMSCONFIG } from "../../../../../constants/keyCache";
import { MODAL_TYPE_COMMONTMODALS } from "../../../../../constants/actionTypes";
import ModalBox from "../components/ModalBox";
import ModalDownloadFile from "../components/ModalDownloadFile";

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


            }


        });
    }

    handleSearchSubmit(formData, MLObject) {

        const objData = {
            UserName: MLObject.UserName == -1 ? "" : MLObject.UserName.value,
            Month: MLObject.Month

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
            console.log("apiResult", searchData, apiResult)
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
            default:
                return 0;
        }
    }

    onShowModal(data, typeDataGrid) {
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
                            UserName={MLObject.UserName.label}
                            Month={Month}
                            listColumn={DataGridModalQuantityHanOverDone}
                            dataSource={data}
                            fileName={"Nhận trong kỳ"}
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
                            UserName={MLObject.UserName.label}
                            Month={Month}
                            listColumn={DataGridModalQuantityHanOverDoing}
                            dataSource={data}
                            fileName={"Chờ bàn giao"}
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
                            UserName={MLObject.UserName.label}
                            Month={Month}
                            listColumn={DataGridModalQuantityReturn}
                            dataSource={data}
                            fileName={"Nhập trả"}
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
                            UserName={MLObject.UserName.label}
                            Month={Month}
                            listColumn={DataGridModalChangeTotalQuantity}
                            dataSource={data}
                            fileName={"Sử dụng trong kỳ"}
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

    onShowModalDetail(objValue, name) {
        const { UserName, Month, ConfigValueMTReturn } = this.state;
        const status = this.getStatusDelivery(name);

        let objData = {};
        if (status == 1) { //	Nhận trong kỳ
            objData = {
                Month: Month,
                UserName: UserName,
                ProductID: objValue[0].value,
                IsHandOverMaterial: 1 // v_ISHANDOVERMATERIAL
            }
            this.props.callFetchAPI(APIHostName, "api/AdvanceRequest/LoadByHandOverMaterial", objData).then(apiResult => {
                console.log("nhan trong ky", apiResult)
                if (!apiResult.IsError) {
                    this.onShowModal(apiResult.ResultObject, status);
                }
                else {
                    this.showMessage(apiResult.MessageDetail)
                }
            });

        }
        if (status == 2) { //	Chờ bàn giao
            objData = {
                Month: Month,
                UserName: UserName,
                ProductID: objValue[0].value,
                IsHandOverMaterial: 0 // v_ISHANDOVERMATERIAL
            }
            this.props.callFetchAPI(APIHostName, "api/AdvanceRequest/LoadByHandOverMaterial", objData).then(apiResult => {
                console.log("n22", apiResult)
                if (!apiResult.IsError) {
                    this.onShowModal(apiResult.ResultObject, status);
                }
                else {
                    this.showMessage(apiResult.MessageDetail)
                }
            });
        }
        if (status == 3) { //Nhập trả
            objData = {
                Month: Month,
                UserNameList: UserName,
                OrderTypeID: ConfigValueMTReturn
                // ProductID: objValue[0].value,
                // IsHandOverMaterial: 0 // v_ISHANDOVERMATERIAL
            }
            //this.showMessage("Tính năng đang phát triển.")
            this.props.callFetchAPI(APIHostName, "api/AdvanceRequest/GetExchangeOrderByUser", objData).then(apiResult => {
                console.log("33", apiResult)
                if (!apiResult.IsError) {
                    this.onShowModal(apiResult.ResultObject, status);
                }
                else {
                    this.showMessage(apiResult.MessageDetail)
                }
            });
        }
        if (status == 4) { //	Sử dụng trong kỳ
            objData = {
                Month: Month,
                UserName: UserName,
                ProductID: objValue[0].value
            }
            this.props.callFetchAPI(APIHostName, "api/AdvanceDebtFlow/LoadAdvanceDebtFlowUsing", objData).then(apiResult => {
                console.log("44", apiResult)
                if (!apiResult.IsError) {
                    this.onShowModal(apiResult.ResultObject, status);
                }
                else {
                    this.showMessage(apiResult.MessageDetail)
                }
            });
        }

    }

    onShowModalDownloadFile(data) {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: "Tải file",
            content: {
                text: <ModalDownloadFile

                    URLDownloadFile={data}

                />
            },
            maxWidth:  '300px'
        });
    }

    handleExportFileFormSearch(FormData, MLObject) {
        console.log("aa", FormData, MLObject)
        const objData = {
            UserName: MLObject.UserName == -1 ? "" : MLObject.UserName.value,
            Month: MLObject.Month

        }
        console.log("objData", objData)
        // this.onShowModalDownloadFile("aaa")

        this.props.callFetchAPI(APIHostName, "api/BeginTermAdvanceDebt/LoadInStockExport", objData).then(apiResult => {
            console.log("export", objData, apiResult)
            if (!apiResult.IsError) {
                this.onShowModalDownloadFile(apiResult.Message)
            }
            else{
                this.showMessage(apiResult.Message)
            }
        });
    };


    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <SearchForm
                    FormName="Tìm kiếm danh sách thống kê vận đơn theo kho điều phối"
                    MLObjectDefinition={SearchMLObjectDefinition}
                    listelement={SearchElementList}
                    onSubmit={this.handleSearchSubmit.bind(this)}
                    ref={this.searchref}
                    className="multiple"
                    IsButtonExport={true}
                    onExportSubmit={this.handleExportFileFormSearch.bind(this)}
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
                    IsExportFile={true}
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
                    IsExportFile={true}
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
