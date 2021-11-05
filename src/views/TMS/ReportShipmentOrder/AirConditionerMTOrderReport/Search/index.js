import { connect } from "react-redux";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import React from "react";
import ReactNotification from "react-notifications-component";

import {
    APIHostName,
    PagePath,
    APISearch,
    initSearchParamater,
    listColumnSearch,
    listelementSearch,
    MLObjectDefinitionSearch
} from "../constants";

import SearchForm from "../../../../../common/components/FormContainer/SearchForm";
import DataGrid from "../../../../../common/components/DataGrid";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";

class SearchCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: null,
            initSearchParamater
        };

        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();

        this.addNotification = this.addNotification.bind(this);
        this.callSearchData = this.callSearchData.bind(this);
        this.handleExoprtExcel = this.handleExoprtExcel.bind(this);
        this.handleExportSearchForm = this.handleExportSearchForm.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        this.callSearchData(initSearchParamater);
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

    callSearchData(searchParamater) {
        this.props.callFetchAPI(APIHostName, APISearch, searchParamater).then(apiResult => {
            if (!apiResult.IsError) {
                this.setState({
                    dataSource: apiResult.ResultObject
                })

                if (apiResult.ResultObject.length == 0) {
                    this.addNotification("Dữ liệu tìm kiếm trống", false);
                }
            } else {
                this.addNotification(apiResult.Message, apiResult.IsError);
            }
        });
    }

    handleExoprtExcel(fetchData) {
        if (fetchData.length == 0) {
            this.addNotification("Dữ liệu không tồn tại. Không thể xuất file!", true);
            return;
        }

        const dataExport = fetchData.map(item => {
            return {
                "Mã vận đơn": item.ShipmentOrderID,
                "Mã đơn hàng gốc": item.PartnerSaleOrderID,
                "Mã đơn hàng vật tư": item.SaleOrderID,
                "Mã sản phẩm chính": item.InstallProductID,
                "Tên sản phẩm chính": item.ProductName,
                "Số lượng": item.BundleQuantity
            }
        })

        const ws = XLSX.utils.json_to_sheet(dataExport);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
        FileSaver.saveAs(data, "Doanh_thu_danh_sách_đơn_hàng_vật_tư_máy_lạnh.xlsx");

        this.addNotification("Xuất file thành công!", false);
    }

    handleExportSearchForm(FormData, MLObject) {
        MLObject.FromDate.set('hour', 12);
        MLObject.ToDate.set('hour', 12);

        const searchParamater = this.state.initSearchParamater.map(item => {
            if (item.SearchKey == "@FROMDATE") {
                return {
                    ...item,
                    SearchValue: MLObject.FromDate
                }
            } else if (item.SearchKey == "@TODATE") {
                return {
                    ...item,
                    SearchValue: MLObject.ToDate
                }
            }
        })

        this.setState({
            initSearchParamater: searchParamater
        });

        this.props.callFetchAPI(APIHostName, APISearch, searchParamater).then(apiResult => {
            if (!apiResult.IsError) {
                this.handleExoprtExcel(apiResult.ResultObject);
            } else {
                this.addNotification(apiResult.Message, apiResult.IsError);
            }
        });
    }

    handleSearchSubmit(formData, MLObject) {
        MLObject.FromDate.set('hour', 12);
        MLObject.ToDate.set('hour', 12);

        const searchParamater = this.state.initSearchParamater.map(item => {
            if (item.SearchKey == "@FROMDATE") {
                return {
                    ...item,
                    SearchValue: MLObject.FromDate
                }
            } else if (item.SearchKey == "@TODATE") {
                return {
                    ...item,
                    SearchValue: MLObject.ToDate
                }
            }
        })

        this.setState({
            initSearchParamater: searchParamater
        });

        this.callSearchData(searchParamater);
    }

    render() {
        if (this.state.dataSource == null) {
            return <React.Fragment>...</React.Fragment>
        } else {
            return (
                <React.Fragment>
                    <ReactNotification ref={this.notificationDOMRef} />

                    <SearchForm
                        className="multiple"
                        colGroupAction={3}
                        FormName="AirConditionerMTOrderReport"
                        IsButtonExport={true}
                        listelement={listelementSearch}
                        MLObjectDefinition={MLObjectDefinitionSearch}
                        onExportSubmit={this.handleExportSearchForm}
                        onSubmit={this.handleSearchSubmit}
                        ref={this.searchref}
                    />

                    <DataGrid
                        listColumn={listColumnSearch}
                        dataSource={this.state.dataSource}
                        IDSelectColumnName={""}
                        PKColumnName={""}
                        isHideHeaderToolbar={false}
                        IsShowButtonAdd={false}
                        IsShowButtonDelete={false}
                        IsShowButtonPrint={false}
                        IsPrint={false}
                        IsExportFile={false}
                        IsAutoPaging={true}
                        RowsPerPage={50}
                        ref={this.gridref}
                    />
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
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchCom);