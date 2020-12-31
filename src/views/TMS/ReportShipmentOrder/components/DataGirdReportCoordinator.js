import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { formatMoney } from '../../../../utils/function';
import GridPage from "../../../../common/components/DataGrid/GridPage";
import { DEFAULT_ROW_PER_PAGE } from "../../../../constants/systemVars.js";

class DataGirdReportCoordinatorCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: this.props.dataSource,
            PageNumber: 1
        }
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

    render() {
        const { PageNumber } = this.state;
        const pageCount = this.getPageCount(this.props.dataSource);
        const dataSource = this.getDisplayData(this.props.dataSource);
        const countTotalMoney = this.props.dataSource.reduce((a, v) => a = a + v.CollectedTotalMoney, 0);
        return (
            <div className="col-12">
                {this.props.Status != undefined && this.props.Status == 7 &&
                    <div class="row mt-20">
                        <div class="col-md-11 text-right">
                            <label class="col-form-label bold txtTotal">Tổng công nợ:</label>
                        </div>
                        <div class="col-md-1 text-right">
                            <label class="col-form-label countTotal">{formatMoney(countTotalMoney, 0)}</label>
                        </div>

                    </div>
                }

                <div className="table-responsive  mt-20">
                    <table className="table table-sm table-striped table-bordered table-hover table-condensed dataGirdReportShipment" cellSpacing="0">
                        <thead className="thead-light">
                            <tr>
                                <th className="jsgrid-header-cell " style={{ width: '20%' }}>Mã vận đơn</th>
                                <th className="jsgrid-header-cell " style={{ width: '25%' }}>Khách hàng/địa chỉ</th>
                                <th className="jsgrid-header-cell " style={{ width: '20%' }}>Sản phẩm</th>
                                <th className="jsgrid-header-cell " style={{ width: '15%' }}>Thời gian giao</th>
                                <th className="jsgrid-header-cell " style={{ width: '10%' }}>Tổng tiền thu</th>
                                <th className="jsgrid-header-cell " style={{ width: '10%' }}>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dataSource.length > 0 ?


                                    dataSource.map((rowItem, rowIndex) => {
                                        return (<tr key={rowIndex}>
                                            <td style={{ width: '20%' }}>

                                                <div className="group-info-row">
                                                    <label className="item fullName-receiver">
                                                        <Link target="_blank" className="txtlink" to={"/ShipmentOrder/Detail/" + rowItem.ShipmentOrderID}>{rowItem.ShipmentOrderID}</Link>
                                                    </label>
                                                    <label className="item address-receiver">
                                                        <span>{rowItem.ShipmentOrderTypeName}</span>
                                                    </label>
                                                    {
                                                        rowItem.CoordinatorUser != "" ? (
                                                            <React.Fragment>
                                                                <label className="item address-receiver">
                                                                    <span>ĐP: {rowItem.CoordinatorUser + "-" + rowItem.CoordinatorUserName}</span>
                                                                </label>
                                                                <label className="item address-receiver">
                                                                    <span>NV: {ReactHtmlParser(rowItem.DeliverUserFullNameList)}</span>
                                                                </label>
                                                            </React.Fragment>
                                                        )
                                                            : ""
                                                    }

                                                </div>
                                            </td>
                                            <td className="group-address" style={{ width: '25%' }}>
                                                <div className="group-info-row">
                                                    <label className="item fullName-receiver">
                                                        <span>{rowItem.ReceiverFullName}</span>
                                                    </label>
                                                    <label className="item address-receiver">
                                                        <span>{rowItem.ReceiverFullAddress}</span>
                                                    </label>
                                                </div>
                                            </td>
                                            <td className="group-productlist" style={{ width: '20%' }}>
                                                <div className="group-info-row">
                                                    <label className="item product">
                                                        <span >{rowItem.ShipItemNameList == "" ? rowItem.PrimaryShipItemName : ReactHtmlParser(rowItem.ShipItemNameList.replace(';', '<br/>'))}</span>
                                                    </label>
                                                </div>
                                            </td>
                                            <td className="group-address" style={{ width: '15%' }}>
                                                <div className="group-info-row">
                                                    <label className="item fullName-receiver">
                                                        <span>{rowItem.ExpectedDeliveryDate != null ? this._genCommentTime(rowItem.ExpectedDeliveryDate) : ""}</span>
                                                    </label>
                                                    <label className="item address-receiver">
                                                        <span>{rowItem.CarrierTypeName}</span>
                                                    </label>
                                                </div>
                                            </td>
                                            <td style={{ width: '10%' }}>{formatMoney(rowItem.CollectedTotalMoney, 0)}</td>
                                            <td style={{ width: '10%' }}>{rowItem.ShipmentOrderStatusName}</td>
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
const DataGirdReportCoordinator = connect(mapStateToProps, mapDispatchToProps)(DataGirdReportCoordinatorCom);
export default DataGirdReportCoordinator;