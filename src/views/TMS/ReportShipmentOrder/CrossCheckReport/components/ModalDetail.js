import React, { Component } from "react";
import { connect } from "react-redux";
import ReactNotification from "react-notifications-component";
import { APIHostName, SearchElementDetailList, SearchMLObjectDefinitionDetail } from '../constants'
import SearchForm from "../../../../../common/components/FormContainer/SearchForm";
import DataGrid from '../../../../../common/components/DataGrid'
import { formatMonthYear } from "../../../../../common/library/CommonLib.js";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { showModal, hideModal } from '../../../../../actions/modal';
import { toIsoStringCus, toIsoStringCusNew, formatNumber, formatNumberNew, toIsoStringNew } from '../../../../../utils/function'
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import { MessageModal } from "../../../../../common/components/Modal";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
class ModalDetailCom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isExportFile: false,
            date: toIsoStringNew(this.props.date, false),
            dataSource: this.props.dataSource,
            DataSource: [],
            PageNumber: 1,
            IsLoadDataComplete: false,
            Difference: this.props.Difference,
            cacheConfig: this.props.cacheConfig,
            SearchElementDetailList: SearchElementDetailList,
            IsShowButtonExport: this.props.Difference

        }

        this.handleExportFile = this.handleExportFile.bind(this);
        this.addNotification = this.addNotification.bind(this);
        this.getParamSearchData = this.getParamSearchData.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.getValueKeyConfig = this.getValueKeyConfig.bind(this);
        this.handleExportData = this.handleExportData.bind(this);
        this.handleExportCSV = this.handleExportCSV.bind(this);
        this.handleonChangePage = this.handleonChangePage.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.notificationDOMRef = React.createRef();

    }

    componentDidMount() {
        const { PageNumber, SearchElementDetailList } = this.state;

        SearchElementDetailList[0].value = this.props.Difference > 0 ? true : false;
        // console.log("prop", SearchElementDetailList, this.props)
        this.getParamSearchData(PageNumber)
    }


    getValueKeyConfig(key) {
        const { cacheConfig } = this.state;
        let strListOption = "";
        cacheConfig.filter(item => item.TMSConfigID == key).map((keyItem) => {
            strListOption = keyItem.TMSConfigValue;
        })
        return strListOption;
    }



    getParamSearchData(PageNumber) {
        const { date, typeDataGrid, Difference } = this.props;
        // const keyConfig =  this.getValueKeyConfig("RECONCILIATION_ADVANCEOUTPUTTYPEIDLIST").toString();


        console.log("date", this.props, date, typeDataGrid)
        let searchData = "";
        if (typeDataGrid == 1) {
            searchData = {
                "storedName": "ERP_TMS_RPTDETAIL_ADVANCEREQUEST",
                "params": [
                    {
                        "name": "V_FROMDATE",
                        "value": Date.parse(toIsoStringNew(this.props.date, false)),
                        "op": "timestamp"
                    },
                    {
                        "name": "V_TODATE",
                        "value": Date.parse(toIsoStringNew(this.props.date, false)),
                        "op": "timestamp"
                    },
                    {
                        "name": "V_OUTPUTTYPEIDLIST",
                        "value": this.getValueKeyConfig("RECONCILIATION_ADVANCEOUTPUTTYPEIDLIST").toString(), //"2223"
                        "op": "array"
                    },
                    {
                        "name": "V_OUTPUTTYPEIDLIST2",
                        "value": this.getValueKeyConfig("RECONCILIATION_INVENTORYOUTPUTTYPEIDLIST").toString(), //"2223,9,12"
                        "op": "array"
                    },

                    {
                        "name": "V_ISCHECKVIEWDIFFERENCE",
                        "value": this.state.Difference,
                        "op": "array"
                    },
                    {

                        "name": "V_VIRTUALSTOREIDLIST",
                        "value": this.getValueKeyConfig("RECONCILIATION_VIRTUALSTOREIDLIST").toString(), //"9375",
                    },
                    {
                        "name": "V_PAGEINDEX",
                        "value": PageNumber,
                        "op": "array"
                    },
                    {
                        "name": "V_PAGESIZE",
                        "value": 100,
                        "op": "array"
                    }

                ]
            }

        }
        else if (typeDataGrid == 2) {
            searchData = {
                "storedName": "ERP_TMS_RPTDETAILRETURNREQUEST",
                "params": [
                    {
                        "name": "V_FROMDATE",
                        "value": Date.parse(toIsoStringNew(this.props.date, false)),
                        "op": "timestamp"
                    },
                    {
                        "name": "V_TODATE",
                        "value": Date.parse(toIsoStringNew(this.props.date, false)),
                        "op": "timestamp"
                    },
                    {
                        "name": "V_INPUTTYPEIDLIST",
                        "value": this.getValueKeyConfig("RECONCILIATION_ADVANCEINPUTTYPEIDLIST").toString(), //"2064"
                        "op": "array"
                    },
                    {
                        "name": "V_OUTPUTTYPEIDLIST2",
                        "value": this.getValueKeyConfig("RECONCILIATION_INVENTORYINPUTTYPEIDLIST").toString(), //"2223,9,12"
                        "op": "array"
                    },
                    {
                        "name": "V_ISCHECKVIEWDIFFERENCE",
                        "value": this.state.Difference,
                        "op": "array"
                    }
                    ,
                    {
                        "name": "V_PAGEINDEX",
                        "value": PageNumber,
                        "op": "array"
                    },
                    {

                        "name": "V_VIRTUALSTOREIDLIST",
                        "value": this.getValueKeyConfig("RECONCILIATION_VIRTUALSTOREIDLIST").toString(),//"9375"
                        "op": "array"
                    },
                    {
                        "name": "V_PAGESIZE",
                        "value": 100,
                        "op": "array"
                    }

                ]
            }

        }
        else if (typeDataGrid == 3) {
            searchData = {
                "storedName": "ERP_TMS_RPTDETAIL_OUTPUTMARTERIAL",
                "params": [
                    {
                        "name": "V_FROMDATE",
                        "value": Date.parse(toIsoStringNew(this.props.date, false)),
                        "op": "timestamp"
                    },
                    {
                        "name": "V_TODATE",
                        "value": Date.parse(toIsoStringNew(this.props.date, false)),
                        "op": "timestamp"
                    },
                    {
                        "name": "V_OUTPUTTYPEIDLIST",
                        "value": this.getValueKeyConfig("RECONCILIATION_CONSUMPOUTPUTTYPEIDLIST").toString(),//"2503",
                        "op": "array"
                    },
                    {
                        "name": "V_ISCHECKVIEWDIFFERENCE",
                        "value": this.state.Difference,
                        "op": "array"
                    }
                    ,
                    {
                        "name": "V_PAGEINDEX",
                        "value": PageNumber,
                        "op": "array"
                    },
                    {
                        "name": "V_PAGESIZE",
                        "value": 100,
                        "op": "array"
                    }
                ]
            }

        }
        else if (typeDataGrid == 4) {
            searchData = {
                "storedName": "ERP_TMS_RPTDETAIL_OUTPUTMARTERIALBYCUSTOMER",
                "params": [
                    {
                        "name": "V_FROMDATE",
                        "value": Date.parse(toIsoStringNew(this.props.date, false)),
                        "op": "timestamp"
                    },
                    {
                        "name": "V_TODATE",
                        "value": Date.parse(toIsoStringNew(this.props.date, false)),
                        "op": "timestamp"
                    },
                    {
                        "name": "V_OUTPUTTYPEIDLIST",
                        "value": this.getValueKeyConfig("RECONCILIATION_SALEOUTPUTTYPEIDLIST").toString(),//"3",
                        "op": "array"
                    },
                    {
                        "name": "V_ISCHECKVIEWDIFFERENCE",
                        "value": this.state.Difference,
                        "op": "array"
                    },
                    {
                        "name": "V_PAGEINDEX",
                        "value": PageNumber,
                        "op": "array"
                    },
                    {
                        "name": "V_PAGESIZE",
                        "value": 100,
                        "op": "array"
                    }

                ]
            }

        }

        this.callSearchData(searchData);
    }

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, "api/ShipmentOrder/CrossCheckReportDetail", searchData).then(apiResult => {
            console.log("detail", searchData, apiResult)
            if (!apiResult.IsError) {
                apiResult.ResultObject.map((item) => {
                    item.TotaLRows = item.totalrow
                })

                this.setState({
                    DataSource: apiResult.ResultObject,
                    IsLoadDataComplete: true
                });
            }
            else {
                this.showMessage("Lỗi hệ thống. Vui lòng liên hệ quản trị viên.")
            }
        });
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

    handleExportFile(result) {
        this.addNotification(result.Message, result.IsError);
    }

    handleSearchSubmit(formData, MLObject) {
        this.setState({
            IsLoadDataComplete: false
        })
        const { date, typeDataGrid } = this.props;
        const { PageNumber, Difference } = this.state;
        let searchData = "";
        if (typeDataGrid == 1) {
            searchData = {
                "storedName": "ERP_TMS_RPTDETAIL_ADVANCEREQUEST",
                "params": [
                    {
                        "name": "V_FROMDATE",
                        "value": Date.parse(toIsoStringNew(this.props.date, false)),
                        "op": "timestamp"
                    },
                    {
                        "name": "V_TODATE",
                        "value": Date.parse(toIsoStringNew(this.props.date, false)),
                        "op": "timestamp"
                    },
                    {
                        "name": "V_OUTPUTTYPEIDLIST",
                        "value": this.getValueKeyConfig("RECONCILIATION_ADVANCEOUTPUTTYPEIDLIST").toString(), //"2223"
                        "op": "array"
                    },
                    {
                        "name": "V_OUTPUTTYPEIDLIST2",
                        "value": this.getValueKeyConfig("RECONCILIATION_INVENTORYOUTPUTTYPEIDLIST").toString(), //"2223,9,12"
                        "op": "array"
                    },

                    {
                        "name": "V_ISCHECKVIEWDIFFERENCE",
                        "value": this.state.Difference,
                        "op": "array"
                    },
                    {

                        "name": "V_VIRTUALSTOREIDLIST",
                        "value": this.getValueKeyConfig("RECONCILIATION_VIRTUALSTOREIDLIST").toString(),//"3",
                        "op": "array"
                    },
                    {
                        "name": "V_PAGEINDEX",
                        "value": PageNumber,
                        "op": "array"
                    },
                    {
                        "name": "V_PAGESIZE",
                        "value": 100,
                        "op": "array"
                    }

                ]
            }

        }
        else if (typeDataGrid == 2) {
            searchData = {
                "storedName": "ERP_TMS_RPTDETAILRETURNREQUEST",
                "params": [
                    {
                        "name": "V_FROMDATE",
                        "value": Date.parse(toIsoStringNew(this.props.date, false)),
                        "op": "timestamp"
                    },
                    {
                        "name": "V_TODATE",
                        "value": Date.parse(toIsoStringNew(this.props.date, false)),
                        "op": "timestamp"
                    },
                    {
                        "name": "V_INPUTTYPEIDLIST",
                        "value": this.getValueKeyConfig("RECONCILIATION_ADVANCEINPUTTYPEIDLIST").toString(), //"2064"
                        "op": "array"
                    },
                    {
                        "name": "V_OUTPUTTYPEIDLIST2",
                        "value": this.getValueKeyConfig("RECONCILIATION_INVENTORYINPUTTYPEIDLIST").toString(), //"2223,9,12"
                        "op": "array"
                    },
                    {
                        "name": "V_ISCHECKVIEWDIFFERENCE",
                        "value": this.state.Difference,
                        "op": "array"
                    }
                    ,
                    {
                        "name": "V_PAGEINDEX",
                        "value": PageNumber,
                        "op": "array"
                    },
                    {

                        "name": "V_VIRTUALSTOREIDLIST",
                        "value": this.getValueKeyConfig("RECONCILIATION_VIRTUALSTOREIDLIST").toString(),//"9375",
                        "op": "array"
                    },
                    {
                        "name": "V_PAGESIZE",
                        "value": 100,
                        "op": "array"
                    }

                ]
            }

        }
        else if (typeDataGrid == 3) {
            searchData = {
                "storedName": "ERP_TMS_RPTDETAIL_OUTPUTMARTERIAL",
                "params": [
                    {
                        "name": "V_FROMDATE",
                        "value": Date.parse(toIsoStringNew(this.props.date, false)),
                        "op": "timestamp"
                    },
                    {
                        "name": "V_TODATE",
                        "value": Date.parse(toIsoStringNew(this.props.date, false)),
                        "op": "timestamp"
                    },
                    {
                        "name": "V_OUTPUTTYPEIDLIST",
                        "value": this.getValueKeyConfig("RECONCILIATION_CONSUMPOUTPUTTYPEIDLIST").toString(),//"2503",
                        "op": "array"
                    },
                    {
                        "name": "V_ISCHECKVIEWDIFFERENCE",
                        "value": this.state.Difference,
                        "op": "array"
                    }
                    ,
                    {
                        "name": "V_PAGEINDEX",
                        "value": PageNumber,
                        "op": "array"
                    },
                    {
                        "name": "V_PAGESIZE",
                        "value": 100,
                        "op": "array"
                    }
                ]
            }

        }
        else if (typeDataGrid == 4) {
            searchData = {
                "storedName": "ERP_TMS_RPTDETAIL_OUTPUTMARTERIALBYCUSTOMER",
                "params": [
                    {
                        "name": "V_FROMDATE",
                        "value": Date.parse(toIsoStringNew(this.props.date, false)),
                        "op": "timestamp"
                    },
                    {
                        "name": "V_TODATE",
                        "value": Date.parse(toIsoStringNew(this.props.date, false)),
                        "op": "timestamp"
                    },
                    {
                        "name": "V_OUTPUTTYPEIDLIST",
                        "value": this.getValueKeyConfig("RECONCILIATION_SALEOUTPUTTYPEIDLIST").toString(),//"3",
                        "op": "array"
                    },
                    {
                        "name": "V_ISCHECKVIEWDIFFERENCE",
                        "value": this.state.Difference,
                        "op": "array"
                    },
                    {
                        "name": "V_PAGEINDEX",
                        "value": PageNumber,
                        "op": "array"
                    },
                    {
                        "name": "V_PAGESIZE",
                        "value": 100,
                        "op": "array"
                    }

                ]
            }

        }


        this.callSearchData(searchData);

    }

    handleonChangePage(PageNumber) {
        this.setState({
            PageNumber,
            // IsLoadDataComplete: false,
            DataSource: []
        })
        // console.log("PageNumber", PageNumber)
        this.getParamSearchData(PageNumber)

    }

    handleExportData(FormData, MLObject) {
        console.log("export", FormData, MLObject)

        const { typeDataGrid, } = this.props;

        let searchData = "";
        if (typeDataGrid == 1) {
            searchData = {
                "storedName": "ERP_TMS_RPTDETAIL_ADVANCEREQUEST",
                "params": [
                    {
                        "name": "V_FROMDATE",
                        "value": Date.parse(toIsoStringNew(this.props.date, false)),
                        "op": "timestamp"
                    },
                    {
                        "name": "V_TODATE",
                        "value": Date.parse(toIsoStringNew(this.props.date, false)),
                        "op": "timestamp"
                    },
                    {
                        "name": "V_OUTPUTTYPEIDLIST",
                        "value": this.getValueKeyConfig("RECONCILIATION_ADVANCEOUTPUTTYPEIDLIST").toString(), //"2223"
                        "op": "array"
                    },
                    {
                        "name": "V_OUTPUTTYPEIDLIST2",
                        "value": this.getValueKeyConfig("RECONCILIATION_INVENTORYOUTPUTTYPEIDLIST").toString(), //"2223,9,12"
                        "op": "array"
                    },
                    {

                        "name": "V_VIRTUALSTOREIDLIST",
                        "value": this.getValueKeyConfig("RECONCILIATION_VIRTUALSTOREIDLIST").toString(),// "9375",
                        "op": "array"
                    },
                    {
                        "name": "V_ISCHECKVIEWDIFFERENCE",
                        "value": 1,
                        "op": "array"
                    },
                    {
                        "name": "V_PAGEINDEX",
                        "value": -1,
                        "op": "array"
                    },
                    {
                        "name": "V_PAGESIZE",
                        "value": -1,
                        "op": "array"
                    }

                ]
            }

        }
        else if (typeDataGrid == 2) {
            searchData = {
                "storedName": "ERP_TMS_RPTDETAILRETURNREQUEST",
                "params": [
                    {
                        "name": "V_FROMDATE",
                        "value": Date.parse(toIsoStringNew(this.props.date, false)),
                        "op": "timestamp"
                    },
                    {
                        "name": "V_TODATE",
                        "value": Date.parse(toIsoStringNew(this.props.date, false)),
                        "op": "timestamp"
                    },
                    {
                        "name": "V_INPUTTYPEIDLIST",
                        "value": this.getValueKeyConfig("RECONCILIATION_ADVANCEINPUTTYPEIDLIST").toString(), //"2064"
                        "op": "array"
                    },
                    {
                        "name": "V_OUTPUTTYPEIDLIST2",
                        "value": this.getValueKeyConfig("RECONCILIATION_INVENTORYINPUTTYPEIDLIST").toString(), //"2223,9,12"
                        "op": "array"
                    },
                    {

                        "name": "V_VIRTUALSTOREIDLIST",
                        "value": this.getValueKeyConfig("RECONCILIATION_VIRTUALSTOREIDLIST").toString(),//"9375",
                        "op": "array"
                    },
                    {
                        "name": "V_ISCHECKVIEWDIFFERENCE",
                        "value": 1,
                        "op": "array"
                    }
                    ,
                    {
                        "name": "V_PAGEINDEX",
                        "value": -1,
                        "op": "array"
                    },
                  
                    {
                        "name": "V_PAGESIZE",
                        "value": -1,
                        "op": "array"
                    }

                ]
            }

        }
        else if (typeDataGrid == 3) {
            searchData = {
                "storedName": "ERP_TMS_RPTDETAIL_OUTPUTMARTERIAL",
                "params": [
                    {
                        "name": "V_FROMDATE",
                        "value": Date.parse(toIsoStringNew(this.props.date, false)),
                        "op": "timestamp"
                    },
                    {
                        "name": "V_TODATE",
                        "value": Date.parse(toIsoStringNew(this.props.date, false)),
                        "op": "timestamp"
                    },
                    {
                        "name": "V_OUTPUTTYPEIDLIST",
                        "value": this.getValueKeyConfig("RECONCILIATION_CONSUMPOUTPUTTYPEIDLIST").toString(),//"2503",
                        "op": "array"
                    },
                    {
                        "name": "V_ISCHECKVIEWDIFFERENCE",
                        "value": 1,
                        "op": "array"
                    }
                    ,
                    {
                        "name": "V_PAGEINDEX",
                        "value": -1,
                        "op": "array"
                    },
                    {
                        "name": "V_PAGESIZE",
                        "value": -1,
                        "op": "array"
                    }
                ]
            }

        }
        else if (typeDataGrid == 4) {
            searchData = {
                "storedName": "ERP_TMS_RPTDETAIL_OUTPUTMARTERIALBYCUSTOMER",
                "params": [
                    {
                        "name": "V_FROMDATE",
                        "value": Date.parse(toIsoStringNew(this.props.date, false)),
                        "op": "timestamp"
                    },
                    {
                        "name": "V_TODATE",
                        "value": Date.parse(toIsoStringNew(this.props.date, false)),
                        "op": "timestamp"
                    },
                    {
                        "name": "V_OUTPUTTYPEIDLIST",
                        "value": this.getValueKeyConfig("RECONCILIATION_SALEOUTPUTTYPEIDLIST").toString(),//"3",
                        "op": "array"
                    },
                    {
                        "name": "V_ISCHECKVIEWDIFFERENCE",
                        "value": 1,
                        "op": "array"
                    },
                    {
                        "name": "V_PAGEINDEX",
                        "value": -1,
                        "op": "array"
                    },
                    {
                        "name": "V_PAGESIZE",
                        "value": -1,
                        "op": "array"
                    }

                ]
            }

        }


        this.props.callFetchAPI(APIHostName, "api/ShipmentOrder/CrossCheckReportDetail", searchData).then(apiResult => {
            console.log("export api", searchData, apiResult)
            if (!apiResult.IsError) {
                const exelData = apiResult.ResultObject.map((item, index) => {
                    let element = {
                        "Ngày": item.date,
                        "Chứng từ liên quan": item.voucherconcern,
                        "Mã phiếu TMS": item.ovtms,
                        "Mã phiếu ERP": item.overp,
                        "Số lượng TMS": formatNumberNew(item.quantitytms),
                        "Số lượng ERP": formatNumberNew(item.quantityerp),
                        "Chênh lệch": formatNumberNew(item.differencequantity),
                    };
                    return element;

                })
                this.handleExportCSV(exelData);
            }
            else {
                this.showMessage("Lỗi hệ thống. Vui lòng liên hệ quản trị viên.")
            }
        });

    }

    handleExportCSV(DataExport) {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        let result;
        const { typeDataGrid, } = this.props;

        let strFileName = "";
        switch (typeDataGrid) {
            case 1:
                strFileName = "Báo cáo chi tiết tạm ứng vật tư";
                break
            case 2:
                strFileName = "Báo cáo chi tiết nhập trả tạm ứng";
                break
            case 3:
                strFileName = "Báo cáo chi tiết xuất tiêu hao vật";
                break
            case 4:
                strFileName = "Báo cáo chi tiết xuất bán vật tư cho khác";
                break
            default:
                FileNstrFileNameame = "Báo cáo chi tiết tạm ứng vật tư";
                break
        }


        if (DataExport.length == 0) {
            result = {
                IsError: true,
                Message: "Dữ liệu trong bảng không tồn tại. Không thể xuất file!"
            };
        }
        else {

            const ws = XLSX.utils.json_to_sheet(DataExport);
            const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: fileType });


            FileSaver.saveAs(data, strFileName + fileExtension);

            result = {
                IsError: false,
                Message: "Xuất file thành công!"
            };
        }
        this.handleExportFile(result);


    }

    handleChange(FormData, MLObject) {
        // console.log("change", FormData, MLObject)
        const { PageNumber, SearchElementDetailList } = this.state;
        SearchElementDetailList[0].value = FormData.ckDifferenceDetail.value;
        this.setState({
            IsShowButtonExport: FormData.ckDifferenceDetail.value,
            SearchElementDetailList,
            Difference: FormData.ckDifferenceDetail.value == true ? 1 : 0

        })

    }

    render() {
        const { UserName, Month, listColumn, dataSource, fileName, dataExport } = this.props;
        const { isExportFile, DataSource, IsLoadDataComplete, SearchElementDetailList, IsShowButtonExport } = this.state;
        if (IsLoadDataComplete) {
            return (
                <React.Fragment>
                    <ReactNotification ref={this.notificationDOMRef} />
                    <SearchForm
                        FormName="Tìm kiếm danh sách báo đối soát chi tiết"
                        MLObjectDefinition={SearchMLObjectDefinitionDetail}
                        listelement={this.state.SearchElementDetailList}
                        onSubmit={this.handleSearchSubmit}
                        ref={this.searchref}
                        IsButtonExport={IsShowButtonExport}
                        onExportSubmit={this.handleExportData}
                        onchange={this.handleChange.bind(this)}
                        className="multiple"
                        btnGroup="d-flex align-items-stretch"
                        btnExport="btn ml-1"
                    />

                    <DataGrid
                        listColumn={listColumn}
                        dataSource={DataSource}
                        IDSelectColumnName={""}
                        PKColumnName={""}
                        IsDelete={false}
                        IsAutoPaging={true}
                        IsShowButtonAdd={false}
                        IsShowButtonDelete={false}
                        RowsPerPage={100}
                        IsExportFile={false}
                        DataExport={dataExport}
                        // onExportFile={this.handleExportFile}
                        fileName={fileName}
                        isPaginationServer={true}
                        onChangePage={this.handleonChangePage}
                        PageNumber={this.state.PageNumber}
                        isPaginationServerToModal={true}
                    />
                </React.Fragment >
            )
        }
        else {
            return (
                <React.Fragment>
                    <p>Đang lấy dữ liệu...</p>
                </React.Fragment >
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

        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: (type, props) => {
            dispatch(hideModal(type, props));
        }
    };
};

const ModalDetail = connect(mapStateToProps, mapDispatchToProps)(ModalDetailCom);
export default ModalDetail;
