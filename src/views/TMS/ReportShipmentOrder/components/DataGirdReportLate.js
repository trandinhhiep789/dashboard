import React, { Component } from "react";
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { formatMoney } from '../../../../utils/function';
import GridPage from "../../../../common/components/DataGrid/GridPage";
import { DEFAULT_ROW_PER_PAGE } from "../../../../constants/systemVars.js";

class DataGirdReportLateCom extends Component {
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

    handleTotalLateSubmit()
    {
        const win = window.open("/ShipmentOrder/Detail/210521000000202", "_blank");
        win.focus();

        // const history = useHistory();
        //    history.push("/ShipmentOrder", {
        //     ShipmentOrderStatusGroupID: 1
        // })

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
                            <label class="col-form-label bold txtTotal">Tổng vận đơn trễ:</label>
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
                                <th className="jsgrid-header-cell " style={{ width: '25%' }}>Mã kho điều phối</th>
                                <th className="jsgrid-header-cell " style={{ width: '25%' }}>Tên kho điều phối</th>
                                <th className="jsgrid-header-cell " style={{ width: '25%' }}>Tổng vận đơn trễ</th>
                                <th className="jsgrid-header-cell " style={{ width: '25%' }}>Tổng vận đơn trễ dưới 30 phút</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dataSource.length > 0 ?
                                    dataSource.map((rowItem, rowIndex) => {
                                        return (<tr key={rowIndex}>
                                            <td style={{ width: '25%' }}>{rowItem.StoreID}</td>
                                            <td style={{ width: '25%' }}>{rowItem.StoreName}</td>
                                            <td style={{ width: '25%' }}> <a className="nav-link text-primary hover-primary cursor-pointer" onClick={() => this.handleTotalLateSubmit(rowItem.StoreID)}>{rowItem.TotalLate}</a></td>
                                            <td style={{ width: '25%' }}> <a className="nav-link text-primary hover-primary cursor-pointer" onClick={() => this.handleTotalLateSubmit(rowItem.StoreID)}>{rowItem.TotalLate30}</a></td>
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
const DataGirdReportLate = connect(mapStateToProps, mapDispatchToProps)(DataGirdReportLateCom);
export default DataGirdReportLate;