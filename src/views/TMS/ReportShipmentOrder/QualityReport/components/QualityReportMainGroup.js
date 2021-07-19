import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";

class QualityReportMainGroupCom extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                    <thead className="thead-light">
                        <tr>
                            <th className="jsgrid-header-cell text-center" style={{ width: "22%" }} colSpan={4}>Tổng đơn hàng</th>
                            <th className="jsgrid-header-cell text-center" style={{ width: "13%" }} colSpan={4}>Tổng lỗi</th>
                            <th className="jsgrid-header-cell text-center" style={{ width: "13%" }} colSpan={4}>Thời gian</th>
                            <th className="jsgrid-header-cell text-center" style={{ width: "13%" }} colSpan={4}>Thái độ</th>
                            <th className="jsgrid-header-cell text-center" style={{ width: "13%" }} colSpan={4}>Thẩm mỹ</th>
                            <th className="jsgrid-header-cell text-center" style={{ width: "13%" }} colSpan={4}>Tay nghề</th>
                            <th className="jsgrid-header-cell text-center"style={{ width: "13%" }} colSpan={4}>Quy trình</th>
                        </tr>
                        <tr>
                            <th className="jsgrid-header-cell text-center" style={{ width: 200 }}>Miền</th>
                            <th className="jsgrid-header-cell text-center" style={{ width: 200 }}>Ngành hàng</th>
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
                        <tr className="sum-total">
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

                        </tr>
                        <tr>
                            <td style={{ width: 200 }}>1</td>
                            <td style={{ width: 200 }}>1</td>
                            <td style={{ width: 200 }}>1</td>
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

                        </tr>
                    </tbody>
                </table>
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

const QualityReportMainGroup = connect(mapStateToProps, mapDispatchToProps)(QualityReportMainGroupCom);
export default QualityReportMainGroup;
