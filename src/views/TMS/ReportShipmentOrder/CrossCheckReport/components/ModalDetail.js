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
            SearchElementDetailList: SearchElementDetailList
        }

        this.handleExportFile = this.handleExportFile.bind(this);
        this.addNotification = this.addNotification.bind(this);
        this.getParamSearchData = this.getParamSearchData.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.getValueKeyConfig = this.getValueKeyConfig.bind(this);


        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        const { PageNumber, SearchElementDetailList } = this.state;
        SearchElementDetailList[0].value = this.props.Difference == 1 ? true : false;

        console.log("1111", SearchElementDetailList)

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
                        "value": this.getValueKeyConfig("RECONCILIATION_ADVANCEOUTPUTTYPEIDLIST").toString(), //"2223,9,12"
                        "op": "array"
                    },
                    {
                        "name": "V_ISCHECKVIEWDIFFERENCE",
                        "value": Difference,
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
                        "value": this.getValueKeyConfig("RECONCILIATION_ADVANCEINPUTTYPEIDLIST").toString(), //"2064,7,13"
                        "op": "array"
                    },
                    {
                        "name": "V_ISCHECKVIEWDIFFERENCE",
                        "value": Difference,
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
                        "value": Difference,
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
                        "value": Difference,
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
                this.showMessage(apiResult.Message)
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
        const { date, typeDataGrid, } = this.props;
        const { PageNumber } = this.state;
        let searchData = "";
        if (typeDataGrid == 1) {
            searchData = {
                "storedName": "ERP_TMS_RPTDETAIL_ADVANCEREQUEST",
                "params": [
                    {
                        "name": "V_FROMDATE",
                        "value": Date.parse(date),
                        "op": "timestamp"
                    },
                    {
                        "name": "V_TODATE",
                        "value": Date.parse(date),
                        "op": "timestamp"
                    },
                    {
                        "name": "V_INPUTTYPEIDLIST",
                        "value": "2064,7,13",
                        "op": "array"
                    },
                    {
                        "name": "V_ISCHECKVIEWDIFFERENCE",
                        "value": MLObject.DifferenceDetail == true ? 1 : 0,
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
                        "value": Date.parse(date),
                        "op": "timestamp"
                    },
                    {
                        "name": "V_TODATE",
                        "value": Date.parse(date),
                        "op": "timestamp"
                    },
                    {
                        "name": "V_INPUTTYPEIDLIST",
                        "value": "2064,7,13",
                        "op": "array"
                    },
                    {
                        "name": "V_ISCHECKVIEWDIFFERENCE",
                        "value": MLObject.DifferenceDetail == true ? 1 : 0,
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
        else if (typeDataGrid == 3) {
            searchData = {
                "storedName": "ERP_TMS_RPTDETAIL_OUTPUTMARTERIAL",
                "params": [
                    {
                        "name": "V_FROMDATE",
                        "value": Date.parse(date),
                        "op": "timestamp"
                    },
                    {
                        "name": "V_TODATE",
                        "value": Date.parse(date),
                        "op": "timestamp"
                    },
                    {
                        "name": "V_OUTPUTTYPEIDLIST",
                        "value": "2503",
                        "op": "array"
                    },
                    {
                        "name": "V_ISCHECKVIEWDIFFERENCE",
                        "value": MLObject.DifferenceDetail == true ? 1 : 0,
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
                        "value": Date.parse(date),
                        "op": "timestamp"
                    },
                    {
                        "name": "V_TODATE",
                        "value": Date.parse(date),
                        "op": "timestamp"
                    },
                    {
                        "name": "V_OUTPUTTYPEIDLIST",
                        "value": "2503",
                        "op": "array"
                    },
                    {
                        "name": "V_ISCHECKVIEWDIFFERENCE",
                        "value": MLObject.DifferenceDetail == true ? 1 : 0,
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
        this.getParamSearchData(PageNumber)
        this.setState({
            PageNumber,
            IsLoadDataComplete: false
        })
    }

    render() {
        const { UserName, Month, listColumn, dataSource, fileName, dataExport } = this.props;
        const { isExportFile, DataSource, IsLoadDataComplete, SearchElementDetailList } = this.state;
        if (IsLoadDataComplete) {
            return (
                <React.Fragment>
                    <ReactNotification ref={this.notificationDOMRef} />
                    <SearchForm
                        FormName="Tìm kiếm danh sách báo đối soát chi tiết"
                        MLObjectDefinition={SearchMLObjectDefinitionDetail}
                        listelement={SearchElementDetailList}
                        onSubmit={this.handleSearchSubmit}
                        ref={this.searchref}
                        className="multiple"
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
                        onChangePage={this.handleonChangePage.bind(this)}
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
