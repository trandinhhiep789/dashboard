import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import ReactNotification from "react-notifications-component";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import { formatMoney } from '../../../../../utils/function';
import GridPage from "../../../../../common/components/DataGrid/GridPage";
import { DEFAULT_ROW_PER_PAGE } from "../../../../../constants/systemVars.js";
import { formatDate } from "../../../../../common/library/CommonLib.js";
import { titleModal } from '../constants'

class DataGirdRewardShipmentOrderCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: this.props.dataSource,
            paramData: this.props.paramData,
            PageNumber: 1
        }

        this.handleExportExcel = this.handleExportExcel.bind(this);
        this.notificationDOMRef = React.createRef();
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.dataSource) !== JSON.stringify(nextProps.dataSource)) {
            this.setState({
                dataSource: nextProps.dataSource
            })
        }

    }

    _genCommentTime(dates) {
        const date = new Date(Date.parse(dates));
        //let currentDate = new Date();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let timeDisplay = (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute)
        let month = date.getMonth() + 1;
        return date.getDate() + '/' + (month < 10 ? '0' + month : month) + '/' + date.getFullYear() + " " + timeDisplay;
    }

    getPageCount(dataSource) {
        if (dataSource == null)
            return 1;
        let rowsPerPage = DEFAULT_ROW_PER_PAGE;
        if (this.props.RowsPerPage != null)
            rowsPerPage = this.props.RowsPerPage;
        let pageCount = parseInt(Math.ceil(dataSource.length / rowsPerPage));
        if (pageCount < 1)
            pageCount = 1;
        return pageCount;
    }

    onChangePageHandle(pageNum) {
        this.setState({ PageNumber: pageNum });
        const temp = this.checkInputisAll(this.getDisplayDataPageNumber(this.props.dataSource, pageNum), this.state.GridData[this.props.IDSelectColumnName]);
        this.setState({ IsCheckAll: temp });
    }

    getDisplayDataPageNumber(dataSource, intPageNumber) {
        if (!this.props.IsAutoPaging)
            return dataSource;
        let resultData = [];
        if (dataSource == null)
            return resultData;
        let rowsPerPage = DEFAULT_ROW_PER_PAGE;
        if (this.props.RowsPerPage != null)
            rowsPerPage = this.props.RowsPerPage;
        let startRowIndex = (intPageNumber - 1) * rowsPerPage;
        let endRowIndex = startRowIndex + rowsPerPage;
        if (endRowIndex > dataSource.length)
            endRowIndex = dataSource.length;
        for (let i = startRowIndex; i < endRowIndex; i++) {
            resultData.push(dataSource[i]);
        }
        return resultData;
    }

    getDisplayData(dataSource) {
        if (!this.props.IsAutoPaging)
            return dataSource;
        let resultData = [];
        if (dataSource == null)
            return resultData;
        let rowsPerPage = DEFAULT_ROW_PER_PAGE;
        if (this.props.RowsPerPage != null)
            rowsPerPage = this.props.RowsPerPage;
        let startRowIndex = (this.state.PageNumber - 1) * rowsPerPage;
        let endRowIndex = startRowIndex + rowsPerPage;
        if (endRowIndex > dataSource.length)
            endRowIndex = dataSource.length;
        for (let i = startRowIndex; i < endRowIndex; i++) {
            resultData.push(dataSource[i]);
        }
        return resultData;
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

    handleExportExcel() {
        const { dataSource } = this.state;
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8', fileExtension = '.xlsx';

        let result;

        try {
            const countTotalMoney = dataSource.reduce((a, v) => a = a + v.TotalReward, 0);

            const infoStaff = [
                ["Từ ngày", "Đến ngày", "Nhân viên", "Tổng"],
                [formatDate(this.state.paramData.FromDate, true), formatDate(this.state.paramData.ToDate, true), dataSource[0].RewardUser + " - " + dataSource[0].FullName, countTotalMoney]
            ];

            const dataExport = dataSource.map(item => {
                return {
                    "Loại thưởng": item.RewardTypeName.trim(),
                    "Mã sản phẩm": item.ProductID.trim(),
                    "Tên sản phẩm": item.ProductName,
                    "Mã vận đơn": item.ShipmentOrderID.trim(),
                    "Số lượng": item.Quantity,
                    "Đơn giá thưởng": item.RewardPrice,
                    "Số tiền thưởng": item.TotalReward,
                }
            })

            let ws = XLSX.utils.json_to_sheet(dataExport, { origin: 'A4' });

            XLSX.utils.sheet_add_aoa(ws, infoStaff, { origin: "A1" }); // thêm thông tin nhân viên

            const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: fileType });

            FileSaver.saveAs(data, titleModal + fileExtension);

            result = {
                IsError: false,
                Message: "Xuất file thành công!"
            };
        } catch (error) {
            result = {
                IsError: true,
                Message: "Lỗi xuất file!"
            };
        }

        this.addNotification(result.Message, result.IsError);
    }

    render() {
        const { PageNumber } = this.state;
        const pageCount = this.getPageCount(this.props.dataSource);
        const dataSource = this.getDisplayData(this.props.dataSource);
        const countTotalMoney = this.props.dataSource.reduce((a, v) => a = a + v.TotalReward, 0);
        return (
            <React.Fragment>

                <ReactNotification ref={this.notificationDOMRef} />

                <div className="col-12">
                    <div className="row mt-20">

                        <div className="col-md-2  text-left">
                            <label className="col-form-label bold txtTotal">Từ ngày:</label>
                        </div>
                        <div className="col-md-4 text-left">
                            <label className="col-form-label">{formatDate(this.state.paramData.FromDate, true)}</label>
                        </div>

                        <div className="col-md-2 text-left">
                            <label className="col-form-label bold txtTotal">Đến ngày:</label>
                        </div>
                        <div className="col-md-4 text-left">
                            <label className="col-form-label">{formatDate(this.state.paramData.ToDate, true)}</label>
                        </div>

                        <div className="col-md-2 text-left">
                            <label className="col-form-label bold txtTotal">Nhân viên:</label>
                        </div>
                        <div className="col-md-4  text-left">
                            <label className="col-form-label">{dataSource[0].RewardUser + " - " + dataSource[0].FullName}</label>
                        </div>

                        <div className="col-md-2 text-left">
                            <label className="col-form-label bold txtTotal">Tổng:</label>
                        </div>
                        <div className="col-md-4  text-left">
                            <label className="col-form-label countTotal">{formatMoney(countTotalMoney, 0)}</label>
                        </div>
                    </div>

                    <div className="table-responsive  mt-20">
                        <div className="d-flex justify-content-end mb-1">
                            <button type="button" className="btn btn-export ml-10" onClick={this.handleExportExcel}>
                                <span className="fa fa-file-excel-o"> Xuất file excel </span>
                            </button>
                        </div>

                        <table className="table table-sm table-striped table-bordered table-hover table-condensed dataGirdReportShipment" cellSpacing="0">
                            <thead className="thead-light">
                                <tr>
                                    <th className="jsgrid-header-cell " style={{ width: '15%' }}>Loại thưởng</th>
                                    <th className="jsgrid-header-cell " style={{ width: '15%' }}>Mã sản phẩm</th>
                                    <th className="jsgrid-header-cell " style={{ width: '25%' }}>Tên sản phẩm</th>
                                    <th className="jsgrid-header-cell " style={{ width: '15%' }}>Mã vận đơn</th>
                                    <th className="jsgrid-header-cell " style={{ width: '10%' }}>Số lượng</th>
                                    <th className="jsgrid-header-cell " style={{ width: '10%' }}>Đơn giá thưởng</th>
                                    <th className="jsgrid-header-cell " style={{ width: '10%' }}>Số tiền thưởng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    dataSource.length > 0 ?
                                        dataSource.map((rowItem, rowIndex) => {
                                            return (<tr key={rowIndex}>
                                                <td style={{ width: '15%' }}>{rowItem.RewardTypeName}</td>
                                                <td style={{ width: '15%' }}>{rowItem.ProductID}</td>
                                                <td style={{ width: '25%' }}>{rowItem.ProductName}</td>
                                                <td style={{ width: '15%' }}>
                                                    <Link target="_blank" className="txtlink" to={"/ShipmentOrder/Detail/" + rowItem.ShipmentOrderID}>{rowItem.ShipmentOrderID}</Link>
                                                </td>
                                                <td style={{ width: '10%' }}>{rowItem.Quantity}</td>
                                                <td style={{ width: '10%' }}>{formatMoney(rowItem.RewardPrice, 0)}</td>
                                                <td style={{ width: '10%' }}>{formatMoney(rowItem.TotalReward, 0)}</td>
                                            </tr>)
                                        })
                                        :
                                        <tr>
                                            <td colSpan="6" align="center" className="text-center">Không tồn tại dữ liệu.</td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                    <GridPage numPage={pageCount} currentPage={PageNumber} maxPageShow={10} onChangePage={this.onChangePageHandle.bind(this)} />
                </div>

            </React.Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {
        AppInfo: state,
        FetchAPIInfo: state.FetchAPIInfo
    }
}
const mapDispatchToProps = dispatch => {
    return {
    }
}
const DataGirdRewardShipmentOrder = connect(mapStateToProps, mapDispatchToProps)(DataGirdRewardShipmentOrderCom);
export default DataGirdRewardShipmentOrder;