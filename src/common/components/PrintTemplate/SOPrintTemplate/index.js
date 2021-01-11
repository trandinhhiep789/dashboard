

import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { formatMoney } from '../../../../utils/function';

class SOPrintTemplateCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titlePartnerName: '',
            girdDataSource: this.props.data,
            totalPayableAmount: 0
        }
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data)) {
            const result = nextProps.data.map((item) => {
                item.totalCost = item.ServiceFee * item.Quantity
                return item
            })
            const totalPayableAmount = result.reduce((sum, curValue, curIndex, []) => {
                sum += curValue.totalCost
                return sum
            }, 0);

            this.setState({
                girdDataSource: result,
                totalPayableAmount

            })
        }

    }

    componentDidMount() {
    }

    render() {

        return (
            <div id="print">
                <div className="header" style={{ textAlign: "center", fontSize: 20, color: '#333', fontWeight: 600, textTransform: "uppercase" }}>
                    <p>THỐNG TIN ĐƠN HÀNG</p>
                </div>
                <hr style={{ borderBottom: '0' }} />
                <div style={{ width: '100%', marginTop: 0, lineHeight: "0.5rem" }} >
                    <div style={{ width: '100%', display: 'block', flex: 1, flexDirection: 'row', }}>
                        <div style={{ width: '100%', display: 'inline-block', marginBottom: 0 }}>
                            <div style={{ width: '50%', float: "left", textAlign: 'left' }}>
                                <p>Website: dienmayxanh.com </p>
                                <p>Kho xuất: HCM - kho quận 7</p>
                                <p>Nhân viên tư vấn: nguyễn văn A</p>
                                <p>Khách hàng: Nguyễn văn long</p>
                                <p>Người nhận: Nguyễn văn long</p>
                            </div>
                            <div style={{ width: '50%', float: 'left', textAlign: 'left' }}>
                                <p>Ngày giao hàng: </p>
                                <p>Thời gian xuất: 2/2/2021 10:20AM</p>
                                <p>Thời gian yêu cầu: 2/2/2021 10:20AM</p>
                                <p>Điện thoại: 096385829</p>
                                <p>Điện thoại: 096385829</p>
                            </div>
                        </div>
                        <hr style={{ borderBottom: '0' }} />
                        <div style={{ width: '100%', display: 'inline-block', marginBottom: 0 }}>
                            <div style={{ width: '100%', float: "left", textAlign: 'left' }}>
                                <p>Phương thức thanh toán: Công nợ tiền mặt </p>
                                <p>Nội dung: thu tiền mặt, gọi khách trước khi giao</p>
                            </div>
                        </div>
                        <hr style={{ borderBottom: '0' }} />
                        <div style={{ width: '100%', display: 'inline-block', marginBottom: 15 }}>
                            <div style={{ width: '100%', float: "left", textAlign: 'left' }}>
                                <p>Loại yêu cầu: <b>Yêu cầu xuất điện máy giao hàng tại nhà</b> </p>
                                <p>Ghi chú đơn hàng: tivi 32 inch, gắn treo tường cho khách</p>
                                <p>Ghi chú điều phối: </p>
                            </div>
                        </div>

                    </div>
                    <table style={{ width: '100%', border: 1, borderColor: '#dee2e6', borderStyle: 'solid', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ padding: 0, }}>
                                <td style={{ padding: 6, border: 1, borderColor: '#dee2e6', borderStyle: 'solid', margin: 0, borderTop: 0, borderLeft: 0, borderBottom: 0, fontSize: 15 }} align="center">STT</td>
                                <td style={{ padding: 6, border: 1, borderColor: '#dee2e6', borderStyle: 'solid', margin: 0, borderTop: 0, borderLeft: 0, borderBottom: 0, fontSize: 15 }} align="center">Hình thức xuất</td>
                                <td style={{ padding: 6, border: 1, borderColor: '#dee2e6', borderStyle: 'solid', margin: 0, borderTop: 0, borderLeft: 0, borderBottom: 0, fontSize: 15 }} align="center">Tên sản phẩm</td>
                                <td style={{ padding: 6, border: 1, borderColor: '#dee2e6', borderStyle: 'solid', margin: 0, borderTop: 0, borderLeft: 0, borderBottom: 0, fontSize: 15 }} align="center">SL</td>
                                <td style={{ padding: 6, border: 1, borderColor: '#dee2e6', borderStyle: 'solid', margin: 0, borderTop: 0, borderLeft: 0, borderBottom: 0, fontSize: 15 }} align="center">Đơn giá</td>
                                <td style={{ padding: 6, border: 1, borderColor: '#dee2e6', borderStyle: 'solid', margin: 0, borderTop: 0, borderLeft: 0, borderBottom: 0, fontSize: 15 }} align="center">VAT</td>
                                <td style={{ padding: 6, border: 1, borderColor: '#dee2e6', borderStyle: 'solid', margin: 0, borderTop: 0, borderLeft: 0, borderBottom: 0, borderRight: 0, fontSize: 15 }} align="center">Xuất</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.girdDataSource && this.state.girdDataSource.map((item, index) => {
                                    return (
                                        <tr key={index} style={{ padding: 0, }}>
                                            <td style={{ padding: 6, border: 1, borderColor: '#dee2e6', borderStyle: 'solid', borderBottom: 0, borderLeft: 0, fontSize: 15 }} align="center">{index + 1}</td>
                                            <td style={{ padding: 6, border: 1, borderColor: '#dee2e6', borderStyle: 'solid', borderBottom: 0, borderLeft: 0, fontSize: 15 }}>{item.SubGroupName}</td>
                                            <td style={{ padding: 6, border: 1, borderColor: '#dee2e6', borderStyle: 'solid', borderBottom: 0, borderLeft: 0, fontSize: 15 }} align="center">{item.Quantity}</td>
                                            <td style={{ padding: 6, border: 1, borderColor: '#dee2e6', borderStyle: 'solid', borderBottom: 0, borderLeft: 0, fontSize: 15 }} align="right">{formatMoney(item.ServiceFee, 0)}</td>
                                            <td style={{ padding: 6, border: 1, borderColor: '#dee2e6', borderStyle: 'solid', borderBottom: 0, borderLeft: 0, fontSize: 15 }} align="right">{formatMoney(item.ServiceFee, 0)}</td>
                                            <td style={{ padding: 6, border: 1, borderColor: '#dee2e6', borderStyle: 'solid', borderBottom: 0, borderLeft: 0, fontSize: 15 }} align="right">{formatMoney(item.ServiceFee, 0)}</td>
                                            <td style={{ padding: 6, border: 1, borderColor: '#dee2e6', borderStyle: 'solid', borderBottom: 0, borderLeft: 0, fontSize: 15, borderRight: 0 }} align="right">{formatMoney(item.totalCost, 0)}</td>
                                        </tr>
                                    )
                                })
                            }
                            {/* <tr style={{}}>
                                <td colSpan="6" style={{ fontSize: 16, fontWeight: 600, padding: 6, border: 1, borderColor: '#dee2e6', borderStyle: 'solid', borderBottom: 0, borderLeft: 0 }}>Tổng cộng</td>
                                <td style={{ padding: 6, fontSize: 16, fontWeight: 600, border: 1, borderColor: '#dee2e6', borderStyle: 'solid', borderRight: 0, borderBottom: 0, borderLeft: 0 }} align="right">{formatMoney(this.state.totalPayableAmount, 0)}</td>

                            </tr> */}
                        </tbody>
                    </table>
                    <hr style={{ borderBottom: '0' }} />
                    <div style={{ width: '100%', display: 'inline-block', marginBottom: 0 }}>
                        <div style={{ width: '40%', float: "right", textAlign: 'left' }}>
                            <p>Tổng tiền: <span style={{ float: 'right' }}>2.000.000đ</span> </p>
                            <p>Đã thu: <span style={{ float: 'right' }}>0đ</span></p>
                            <p>Giảm giá: <span style={{ float: 'right' }}>0đ</span></p>
                            <p>Chi phí giao hàng: <span style={{ float: 'right' }}>0đ</span></p>
                            <p>Còn lại phải thu: <span style={{ float: 'right' }}>0đ</span></p>
                        </div>
                    </div>
                    <hr style={{ borderBottom: '0' }} />
                </div>
                <div className="footer" style={{ display: 'table', width: '100%', marginTop: 30 }}>
                    <div style={{ display: 'table-cell', width: '33.33%', textAlign: 'center' }}>
                        <h3 style={{ fontSize: 15 }}>Thủ kho</h3>
                        {/* <span style={{ fontSize: 12 }}>(Ký,ghi rõ user-họ tên)</span> */}
                    </div>
                    <div style={{ display: 'table-cell', width: '33.33%' }}>
                        <div style={{ textAlign: 'center' }}>
                            <h3 style={{ fontSize: 15 }}>Trung tâm điều phối</h3>
                            {/* <span style={{ fontSize: 12 }}>(Ký,ghi rõ họ tên)</span> */}
                        </div>


                        {/* <p style={{ marginTop: 100, textAlign: 'left', fontSize: 15 }}>Ngày ký (Bắt buộc):</p> */}
                    </div>
                    <div style={{ display: 'table-cell', width: '33.33%', textAlign: 'center' }}>
                        <div style={{ textAlign: 'center' }}>
                            <h3 style={{ fontSize: 15 }}>Nhân viên triển khai</h3>
                            {/* <span style={{ fontSize: 12 }}>(Ký,ghi rõ họ tên)</span> */}
                        </div>

                        {/* <p style={{ marginTop: 100, textAlign: 'left', fontSize: 15 }}>Ngày nhận:</p> */}
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

const SOPrintTemplate = connect(mapStateToProps, mapDispatchToProps)(SOPrintTemplateCom);
export default SOPrintTemplate;
