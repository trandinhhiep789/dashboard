

import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";



class PartnerPayaleTemplateCom extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="print">
                <div className="header" style={{ textAlign: "center", fontSize: 26, color: '#333', fontWeight: 600, textTransform: "uppercase" }}>
                    <p >Bảng kê tổng hợp đơn hàng lắp đặt theo tháng 4/2020-TT</p>
                    <p>(Siêu thị .............................................)</p>
                </div>
                <div style={{ width: 800, marginTop: 50, width: '100%', display: 'block', }} >
                    <table style={{ width: '100%' }} border='1'>
                        <thead>
                            <tr>
                                <td>STT</td>
                                <td>Tên đối tác</td>
                                <td>Sản phẩm</td>
                                <td>Số lượng đơn hàng</td>
                                <td>Giá tiền</td>
                                <td>Thành tiền</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td rowSpan="1">Tên đối tác</td>
                                <td>Sản phẩm</td>
                                <td>Số lượng đơn hàng</td>
                                <td>Giá tiền</td>
                                <td>Thành tiền</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="footer" style={{ display: 'table', width: '100%', marginTop: 50 }}>
                    <div style={{ display: 'table-cell' }}>
                        <h3 style={{ background: "red" }}>Trưởng nhóm xác nhận</h3>
                        <span>(Ký,ghi rõ user-họ tên)</span>
                    </div>
                    <div style={{ display: 'table-cell', textAlign: 'center' }}>
                        <h3>Đối tác xác nhận</h3>
                        <span>(Ký,ghi rõ họ tên)</span>
                    </div>
                    <div style={{ display: 'table-cell', textAlign: 'right' }}>
                        <h3>Người nhận nhận chứng từ</h3>
                    </div>
                </div>
            </div>

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

const PartnerPayaleTemplate = connect(mapStateToProps, mapDispatchToProps)(PartnerPayaleTemplateCom);
export default PartnerPayaleTemplate;
