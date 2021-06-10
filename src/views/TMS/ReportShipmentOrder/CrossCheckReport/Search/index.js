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
    DataGridModalAdvanceMaterial,
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { TMS_BEGINTERMADVANCEDEBT_EXPORT, TMS_BEGINTERMADVANCEDEBT_VIEW } from "../../../../../constants/functionLists";
import { callGetCache } from "../../../../../actions/cacheAction";
import { showModal, hideModal } from '../../../../../actions/modal';
import { toIsoStringCus, toIsoStringCusNew, formatNumber, formatNumberNew, toIsoStringNew } from '../../../../../utils/function'
import { MODAL_TYPE_COMMONTMODALS, MODAL_TYPE_DOWNLOAD_EXCEL } from "../../../../../constants/actionTypes";
import ModalDetail from '../components/ModalDetail'
import { ERPCOMMONCACHE_TMSCONFIG } from "../../../../../constants/keyCache";

class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.callSearchData = this.callSearchData.bind(this);
        this.onShowModal = this.onShowModal.bind(this);
        this.getCacheConfig = this.getCacheConfig.bind(this);
        this.handleTotalLateSubmit = this.handleTotalLateSubmit.bind(this);


        this.state = {
            IsCallAPIError: false,
            gridDataSource: [],
            IsLoadDataComplete: false,
            widthPercent: "",
            params: {},
            dataExport: [],
            cacheConfig: [],
            Difference: 1
        };
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        window.addEventListener("resize", this.updateWindowDimensions);

         this.getCacheConfig();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({
            widthPercent: (window.innerWidth * 90) / 100
        })
    }

    getCacheConfig() {
        //ERPCOMMONCACHE_TMSCONFIG\
        this.props.callGetCache(ERPCOMMONCACHE_TMSCONFIG).then(result => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                this.setState({
                    cacheConfig: result.ResultObject.CacheData
                })
            }
        })
    }

    handleSearchSubmit(formData, MLObject) {
        console.log("MLObject", MLObject, toIsoStringCusNew(new Date(MLObject.FromDate).toISOString(), false), Date.parse(toIsoStringCusNew(new Date(MLObject.FromDate).toISOString(), false)))

        const { cacheConfig } = this.state;
        if (MLObject.BusinessID < 0) {

            this.showMessage("Vui lòng chọn nghiệp vụ cần tìm kiếm.")
        }
        else {

            const objParams = {
                FromDate: Date.parse(toIsoStringCusNew(new Date(MLObject.FromDate).toISOString(), false)),
                ToDate: Date.parse(toIsoStringCusNew(new Date(MLObject.ToDate).toISOString(), false)), //Date.parse(MLObject.ToDate),
                BusinessID: MLObject.BusinessID,
                Difference: MLObject.Difference
            }

            this.setState({
                params: objParams,
                Difference: MLObject.Difference == true ? 1 : 0,
            })
            console.log("object", toIsoStringCusNew(new Date(MLObject.FromDate).toISOString(), false))
            const objDataNewol = {
                "storedName": "ERP_TMS_ADVANCEREQUEST",
                "params": [
                    {
                        "name": "V_FROMDATE",
                        "value": Date.parse(toIsoStringCusNew(new Date(MLObject.FromDate).toISOString(), false)),
                        "op": "timestamp"
                    },
                    {
                        "name": "V_TODATE",
                        "value": Date.parse(toIsoStringCusNew(new Date(MLObject.ToDate).toISOString(), false)),
                        "op": "timestamp"
                    },
                    {
                        "name": "V_REPORTIDLIST",
                        "value": MLObject.BusinessID,
                        "op": "array"
                    },
                    {
                        "name": "V_OUTINPUTTYPEIDREPORT1LIST",
                        "value": "2223,9,12",
                        "op": "array"
                    },
                    {
                        "name": "V_OUTINPUTTYPEIDREPORT2LIST",
                        "value": "2064,7,13",
                        "op": "array"
                    },
                    {
                        "name": "V_OUTINPUTTYPEIDREPORT3LIST",
                        "value": "2503",
                        "op": "array"
                    },
                    {
                        "name": "V_OUTINPUTTYPEIDREPORT4LIST",
                        "value": "3",
                        "op": "array"
                    },
                    {
                        "name": "V_ISCHECKVIEWDIFFERENCE",
                        "value": MLObject.Difference == true ? 1 : 0,
                        "op": "array"
                    }

                ]
            }
            console.log("objDataNewol", objDataNewol)
           this.callSearchData(objDataNewol)
        }
    }

    callSearchData(searchData) {

        this.props.callFetchAPI(APIHostName, "api/ShipmentOrder/CrossCheckReport", searchData).then(apiResult => {
            console.log("aa", searchData, apiResult)
            if (!apiResult.IsError) {
                // const tempData = apiResult.ResultObject.map((item, index) => {
                //     item.DateData = item.date
                //     item.CrossCheckID = item.reportid
                //     item.BusinessID = item.reportname
                //     item.TMS = item.quantitytms
                //     item.ERP = item.quantityerp
                //     item.Difference = item.differencequantity
                // })


                // xuất exel
                const exelData = apiResult.ResultObject.map((item, index) => {
                    let element = {
                        "Nghiệp vụ": item.ProductID,
                        "Tên vật tư": item.ProductName,
                        "Đơn vị tính": item.QuantityUnitName,
                        "Tồn đầu kỳ": item.BeginTermAdvanceDebt,
                        "Tăng trong kỳ": item.IncreaseAdvanceDebt,
                        "Giảm trong kỳ": item.DecreaseAdvanceDebt,
                        "Tồn cuối kỳ": item.EndTermAdvanceDebt,
                        "Đơn giá": item.Price,
                        "Thành tiền": item.TotalAmount
                    };
                    return element;

                })

                this.setState({
                    gridDataSource: apiResult.ResultObject,
                    dataExport: exelData,
                    IsCallAPIError: apiResult.IsError,
                });

            }
            else {
                this.setState({
                    gridDataSource: [],
                    dataExport: [],
                    IsCallAPIError: apiResult.IsError,
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

    onShowModal(data, typeDataGrid, date) {
        const { params, widthPercent, Difference, cacheConfig } = this.state;
        let titleName = "";
        switch (typeDataGrid) {
            case 1:
                titleName = "Báo cáo chi tiết tạm ứng vật tư";
                break
            case 2:
                titleName = "Báo cáo chi tiết nhập trả tạm ứng";
                break
            case 3:
                titleName = "Báo cáo chi tiết xuất tiêu hao vật";
                break
            case 4:
                titleName = "Báo cáo chi tiết xuất bán vật tư cho khác";
                break
            default:
                titleName = "Báo cáo chi tiết tạm ứng vật tư";
                break
        }
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: titleName,
            content: {
                text: <ModalDetail
                    param={params}
                    listColumn={DataGridModalAdvanceMaterial}
                    dataSource={[]}
                    date={date}
                    typeDataGrid={typeDataGrid}
                    Difference={Difference}
                    cacheConfig= {cacheConfig}
                    fileName={"Báo cáo chi tiết tạm ứng vật tư"}
                />
            },
            maxWidth: widthPercent + 'px'
        });
    }

    onShowModalDetail(objValue, name) {
        console.log("onShowModalDetail", objValue, name)
        const { params } = this.state;
        console.log("params", params)
        this.onShowModal()

    }

    handleTotalLateSubmit(reportid, date) {
        const { params } = this.state;

        this.onShowModal([], reportid, date);
       
        // let searchData = {
        //     "storedName": "ERP_TMS_RPTDETAILRETURNREQUEST",
        //     "params": [
        //         {
        //             "name": "V_FROMDATE",
        //             "value": Date.parse(date),
        //             "op": "timestamp"
        //         },
        //         {
        //             "name": "V_TODATE",
        //             "value": Date.parse(date),
        //             "op": "timestamp"
        //         },
        //         {
        //             "name": "V_INPUTTYPEIDLIST",
        //             "value": "2064,7,13",
        //             "op": "array"
        //         },
        //         {
        //             "name": "V_ISCHECKVIEWDIFFERENCE",
        //             "value": 0,
        //             "op": "array"
        //         },
        //         {
        //             "name": "V_PAGEINDEX",
        //             "value": 1,
        //             "op": "array"
        //         },
        //         {
        //             "name": "V_PAGESIZE",
        //             "value": 100,
        //             "op": "array"
        //         }

        //     ]
        // }


        // this.props.callFetchAPI(APIHostName, "api/ShipmentOrder/CrossCheckReportDetail", searchData).then(apiResult => {
           

        //     if (!apiResult.IsError) {
        //         this.onShowModal([], reportid, date,params.Difference);
        //     }
        //     else {
        //         this.showMessage(apiResult.Message);
        //     }
        // });


        // this.onShowModal(reportid,date)


    }

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <SearchForm
                    FormName="Tìm kiếm danh sách báo đối soát"
                    MLObjectDefinition={SearchMLObjectDefinition}
                    listelement={SearchElementList}
                    onSubmit={this.handleSearchSubmit}
                    ref={this.searchref}
                    className="multiple"
                />



                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                            <thead className="thead-light">
                                <tr>
                                    <th className="jsgrid-header-cell" style={{ width: "40%" }} >Nghiệp vụ</th>
                                    <th className="jsgrid-header-cell" style={{ width: "30%" }} >Ngày</th>
                                    <th className="jsgrid-header-cell" style={{ width: "10%" }} >TMS</th>
                                    <th className="jsgrid-header-cell" style={{ width: "10%" }} >ERP</th>
                                    <th className="jsgrid-header-cell" style={{ width: "10%" }} >Chênh lệch</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.gridDataSource
                                    && this.state.gridDataSource.map((item, index) => {
                                        return <tr  key ={index}>
                                            <td > <a className="nav-link text-primary hover-primary cursor-pointer" onClick={() => this.handleTotalLateSubmit(item.reportid, item.date)}>{item.reportname}</a></td>
                                            <td>{item.date}</td>
                                            <td>{formatNumberNew(item.quantitytms)}</td>
                                            <td>{formatNumberNew(item.quantityerp)}</td>
                                            <td>{formatNumberNew(item.differencequantity)}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>




                {/* <DataGrid
                    listColumn={GridColumnList}
                    dataSource={this.state.gridDataSource}
                    // AddLink=""
                    IsFixheaderTable={true}
                    IDSelectColumnName={'CrossCheckID'}
                    PKColumnName={'CrossCheckID'}
                    isHideHeaderToolbar={false}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    IsShowButtonPrint={false}
                    IsPrint={false}
                    IsAutoPaging={true}
                    params={this.state.params}
                    RowsPerPage={20}
                    IsExportFile={true}
                    DataExport={this.state.dataExport}
                    fileName="Danh sách báo đối soát"
                    onExportFile={this.handleExportFile.bind(this)}
                    onShowModal={this.onShowModalDetail.bind(this)}
                /> */}
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
