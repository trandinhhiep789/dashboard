import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import GridPage from "../../../../../common/components/DataGrid/GridPage";
import { DEFAULT_ROW_PER_PAGE } from "../../../../../constants/systemVars.js";
class QualityReportByUserCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: this.props.dataSource,
            PageNumber: this.props.pageNumber
        }

    }
    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.dataSource) !== JSON.stringify(nextProps.dataSource)) {
            this.setState({ dataSource: nextProps.dataSource });
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

    onChangePageToServerHandle(pageNum) {
        this.setState({ PageNumber: pageNum });
        if (this.props.onChangePage != null)
            this.props.onChangePage(pageNum);
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

    
    getPageCountToServer(dataRows) {
        if (dataRows == null || dataRows.length == 0)
            return 1;
        let rowsPerPage = DEFAULT_ROW_PER_PAGE;
        if (this.props.RowsPerPage != null && dataRows.length > 0)
            rowsPerPage = this.props.RowsPerPage;
        let pageCount = parseInt(Math.ceil(dataRows[0].TotaLRows / rowsPerPage));
        if (pageCount < 1)
            pageCount = 1;
        return pageCount;
    }


    render() {
        const { dataSource, PageNumber } = this.state;
        const pageCount = this.getPageCountToServer(dataSource);
        console.log("dataSource", dataSource, pageCount)
        return (
            <React.Fragment>
                <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                    <thead className="thead-light">
                        <tr>
                            <th className="jsgrid-header-cell text-center" style={{ width: "22%" }} colSpan={4}>Khách hàng</th>
                            <th className="jsgrid-header-cell text-center" style={{ width: "13%" }} colSpan={4}>Tổng lỗi</th>
                            <th className="jsgrid-header-cell text-center" style={{ width: "13%" }} colSpan={4}>Thời gian</th>
                            <th className="jsgrid-header-cell text-center" style={{ width: "13%" }} colSpan={4}>Thái độ</th>
                            <th className="jsgrid-header-cell text-center" style={{ width: "13%" }} colSpan={4}>Thẩm mỹ</th>
                            <th className="jsgrid-header-cell text-center" style={{ width: "13%" }} colSpan={4}>Tay nghề</th>
                            <th className="jsgrid-header-cell text-center" style={{ width: "13%" }} colSpan={4}>Quy trình</th>
                        </tr>
                        <tr>
                            <th className="jsgrid-header-cell text-center" style={{ width: 200 }}>Nhân viên</th>
                            <th className="jsgrid-header-cell text-center" style={{ width: 200 }}>vị trí</th>
                            <th className="jsgrid-header-cell text-center" style={{ width: 200 }}>nhóm hàng</th>
                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>SL giao lắp</th>

                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Không hài lòng</th>
                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Hài lòng</th>
                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Tổng cộng</th>
                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Tỷ lệ hài lòng</th>

                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Không hài lòng</th>
                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Hài lòng</th>
                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Tổng cộng</th>
                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Tỷ lệ hài lòng</th>

                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Không hài lòng</th>
                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Hài lòng</th>
                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Tổng cộng</th>
                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Tỷ lệ hài lòng</th>

                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Không hài lòng</th>
                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Hài lòng</th>
                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Tổng cộng</th>
                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Tỷ lệ hài lòng</th>

                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Không hài lòng</th>
                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Hài lòng</th>
                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Tổng cộng</th>
                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Tỷ lệ hài lòng</th>

                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Không hài lòng</th>
                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Hài lòng</th>
                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Tổng cộng</th>
                            <th className="jsgrid-header-cell text-center" style={{ width: 150 }}>Tỷ lệ hài lòng</th>
                        </tr>
                    </thead>

                    <tbody>
                        {/* <tr className="sum-total">
                            <td style={{ width: 200 }}>Tổng toàn quốc</td>
                            <td style={{ width: 200 }}></td>
                            <td style={{ width: 200 }}></td>
                            <td style={{ width: 150 }}>1</td>

                            <td style={{ width: 150 }}>1</td>
                            <td style={{ width: 150 }}>1</td>
                            <td style={{ width: 150 }}>1</td>
                            <td style={{ width: 150 }}>1</td>

                            <td style={{ width: 150 }}>1</td>
                            <td style={{ width: 150 }}>1</td>
                            <td style={{ width: 150 }}>1</td>
                            <td style={{ width: 150 }}>1</td>

                            <td style={{ width: 150 }}>1</td>
                            <td style={{ width: 150 }}>1</td>
                            <td style={{ width: 150 }}>1</td>
                            <td style={{ width: 150 }}>1</td>

                            <td style={{ width: 150 }}>1</td>
                            <td style={{ width: 150 }}>1</td>
                            <td style={{ width: 150 }}>1</td>
                            <td style={{ width: 150 }}>1</td>

                            <td style={{ width: 150 }}>1</td>
                            <td style={{ width: 150 }}>1</td>
                            <td style={{ width: 150 }}>1</td>
                            <td style={{ width: 150 }}>1</td>

                            <td style={{ width: 150 }}>1</td>
                            <td style={{ width: 150 }}>1</td>
                            <td style={{ width: 150 }}>1</td>
                            <td style={{ width: 150 }}>1</td>

                        </tr> */}

                        {
                            dataSource.map((item, index) => {
                                return <tr key={index}>
                                    <td style={{ width: 200 }}>{item.UserName}</td>
                                    <td style={{ width: 200 }}>{item.PositionName}</td>
                                    <td style={{ width: 200 }}>{item.MainGroupName}</td>
                                    <td style={{ width: 150 }}>{item.TotalQuantity}</td>

                                    <td style={{ width: 150 }}>{item.TotalQuantityUnlike}</td>
                                    <td style={{ width: 150 }}>{item.TotalQuantityLike}</td>
                                    <td style={{ width: 150 }}>{item.TotalQuantityValue}</td>
                                    <td style={{ width: 150 }}>{item.PercentageQuantityLike}</td>

                                    <td style={{ width: 150 }}>{item.TotalQuantityTimeUnlike}</td>
                                    <td style={{ width: 150 }}>{item.TotalQuantityTimeLike}</td>
                                    <td style={{ width: 150 }}>{item.TotalQuantityTimeValue}</td>
                                    <td style={{ width: 150 }}>{item.PercentageTimeLike}</td>

                                    <td style={{ width: 150 }}>{item.TotalQuantityAttitudeUnlike}</td>
                                    <td style={{ width: 150 }}>{item.TotalQuantityAttitudeLike}</td>
                                    <td style={{ width: 150 }}>{item.TotalQuantityAttitudeValue}</td>
                                    <td style={{ width: 150 }}>{item.PercentageAttitudeLike}</td>

                                    <td style={{ width: 150 }}>{item.TotalQuantityBeautyUnlike}</td>
                                    <td style={{ width: 150 }}>{item.TotalQuantityBeautyLike}</td>
                                    <td style={{ width: 150 }}>{item.TotalQuantityBeautyValue}</td>
                                    <td style={{ width: 150 }}>{item.PercentageBeautyLike}</td>

                                    <td style={{ width: 150 }}>{item.TotalQuantityTechUnlike}</td>
                                    <td style={{ width: 150 }}>{item.TotalQuantityTechLike}</td>
                                    <td style={{ width: 150 }}>{item.TotalQuantityTechValue}</td>
                                    <td style={{ width: 150 }}>{item.PercentageTechLike}</td>

                                    <td style={{ width: 150 }}>{item.TotalQuantityFlowUnlike}</td>
                                    <td style={{ width: 150 }}>{item.TotalQuantityFlowLike}</td>
                                    <td style={{ width: 150 }}>{item.TotalQuantityFlowValue}</td>
                                    <td style={{ width: 150 }}>{item.PercentageFlowLike}</td>

                                </tr>
                            })

                        }

                    </tbody>
                </table>

                <GridPage numPage={pageCount} currentPage={PageNumber} maxPageShow={10} onChangePage={this.onChangePageToServerHandle.bind(this)} />
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
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        }
    };
};

const QualityReportByUser = connect(mapStateToProps, mapDispatchToProps)(QualityReportByUserCom);
export default QualityReportByUser;
