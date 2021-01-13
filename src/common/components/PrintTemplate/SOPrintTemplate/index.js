

import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { formatMoney } from '../../../../utils/function';
import tantamlogo from '../../../../img/tantamlogo.png'
import mavach from '../../../../img/mavach.jpg'

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
                <div className="soprint" style={{ width: '100%', fontFamily: "verdana", fontSize: "12px", }}>
                    <div className="group" style={{ display: "table", width: "100%" }}>
                        <div className="item" style={{ display: "table-cell", width: "50%", border: "1px solid", boxSizing: " border-box", padding: "6px", height: "100%" }}>
                            <div className="content" style={{ paddingLeft: "10px" }}>
                                <img src={tantamlogo} className="logo" style={{ float: "left", width: "80px", verticalAlign: "middle", marginRight: "10px" }} />
                                <div>
                                    <p><b>CÔNG TY TNHH DỊCH VỤ LẮP ĐẶT SỬA CHỮA - BẢO HÀNH TẬN TÂM</b></p>
                                    <p>128 Trần Quang Khải, Phường Tân Định , Q1, Hồ Chí Minh, Việt Nam</p>
                                </div>
                            </div>
                            <hr style={{borderBottom: "0"}} />
                            <h3 style={{ textAlign: "center" }}>ĐƠN VẬN CHUYỂN</h3>
                        </div>
                        <div className="item bleft" style={{ display: "table-cell", width: "50%", border: "1px solid", boxSizing: " border-box", padding: "6px", height: "100%", borderLeft: "0px" }}>
                            <div className="content" style={{ paddingLeft: "10px" }}>
                                <p><span className="bold" style={{ paddingRight: "10px", fontWeight: "bold" }}>Đối tác:</span> Công ty cổ phần đầu tư Thế giới di động </p>
                                <p><span className="bold" style={{ paddingRight: "10px", fontWeight: "bold" }}>Loại dịch vụ:</span> TMS - Giao hàng có lắp đặt</p>
                                <p><span className="bold" style={{ paddingRight: "10px", fontWeight: "bold" }}>Ngày tạo phiếu:</span> 20/10/2020 10:06</p>
                            </div>
                        </div>
                    </div>

                    <div className="group" style={{ display: "table", width: "100%" }}>
                        <div className="item btop" style={{ display: "table-cell", width: "50%", border: "1px solid", boxSizing: " border-box", padding: "6px", height: "100%", borderTop: "0px" }}>
                            <div className="content" style={{ paddingLeft: "10px" }}>
                                <p><span className="bold" style={{ paddingRight: "10px", fontWeight: "bold" }}>Mã đơn vận chuyển:</span>210111000000058</p>
                                <img src={mavach} className="mavach" style={{ display: "block", margin: "0 auto", height: "60px", width: "70%" }} />
                            </div>
                        </div>
                        <div className="item btop bleft" style={{ display: "table-cell", width: "50%", border: "1px solid", boxSizing: " border-box", padding: "6px", height: "100%", borderLeft: "0px", borderTop: "0px" }}>
                            <div className="content" style={{ paddingLeft: "10px" }}>
                                <p><span className="bold" style={{ paddingRight: "10px", fontWeight: "bold" }}>Mã đơn hàng của đối tác:</span>210111000000058</p>
                                <img src={mavach} className="mavach" style={{ display: "block", margin: "0 auto", height: "60px", width: "70%" }} />
                            </div>
                        </div>
                    </div>

                    <div className="group" style={{ display: "table", width: "100%" }}>
                        <div className="item btop" style={{ display: "table-cell", width: "50%", border: "1px solid", boxSizing: " border-box", padding: "6px", height: "100%", borderTop: "0px" }}>
                            <div className="content" style={{ paddingLeft: "10px" }}>
                                <p><span className="bold" style={{ paddingRight: "10px", fontWeight: "bold" }}>Người gửi:</span></p>
                                <p><i>HCM1_ĐMX - Xô Viết Nghệ Tĩnh (Mới)</i></p>
                                <p>12 Nguyễn Trọng Lội, Phường 4, Quận Tân Bình, Hồ Chí Minh</p>

                            </div>
                        </div>
                        <div className="item btop bleft" style={{ display: "table-cell", width: "50%", border: "1px solid", boxSizing: " border-box", padding: "6px", height: "100%", borderLeft: "0px", borderTop: "0px" }}>
                            <div className="content" style={{ paddingLeft: "10px" }}>
                                <p><span className="bold" style={{ paddingRight: "10px", fontWeight: "bold" }}>Ngày hẹn giao:</span>10/10/2020 10:30</p>
                                <p><span className="bold" style={{ paddingRight: "10px", fontWeight: "bold" }}>Ghi chú:</span></p>
                                <p>0938488 Anh Bình, không xuất hóa đơn công ty</p>

                            </div>
                        </div>
                    </div>

                    <div className="group" style={{ display: "table", width: "100%" }}>
                        <div className="item btop" style={{ display: "table-cell", width: "50%", border: "1px solid", boxSizing: " border-box", padding: "6px", height: "100%", borderTop: "0px" }}>
                            <div className="content" style={{ paddingLeft: "10px" }}>
                                <p><span className="bold" style={{ paddingRight: "10px", fontWeight: "bold" }}>Người nhận hàng:</span></p>
                                <p><i className="customername">Chị Nguyệt</i> <i>0988584485</i></p>
                                <p><i>12 Nguyễn Trọng Lội, Phường 4, Quận Tân Bình, Hồ Chí Minh</i></p>

                            </div>
                        </div>
                        <div className="item btop bleft" style={{ display: "table-cell", width: "50%", border: "1px solid", boxSizing: " border-box", padding: "6px", height: "100%", borderLeft: "0px", borderTop: "0px" }}>
                            <div className="content" style={{ paddingLeft: "10px" }}>
                                <p><span className="bold" style={{ paddingRight: "10px", fontWeight: "bold" }}>Người mua hàng:</span></p>
                                <p><i className="customername">Chị Nguyệt</i> <i>0988584485</i></p>
                                <p><i>12 Nguyễn Trọng Lội, Phường 4, Quận Tân Bình, Hồ Chí Minh</i></p>
                            </div>
                        </div>
                    </div>

                    <br />

                    <div className="group" style={{ display: "table", width: "100%" }}>
                        <div className="item" style={{ display: "table-cell", width: "50%", border: "1px solid", boxSizing: " border-box", padding: "6px", height: "100%" }}>
                            <div className="content" style={{ paddingLeft: "10px" }}>
                                <p><span className="bold" style={{ paddingRight: "10px", fontWeight: "bold" }}>Nhân viên điều phối:</span> 70445-Huỳnh Đức Kỳ</p>
                                <p><span className="bold" style={{ paddingRight: "10px", fontWeight: "bold" }}>Nhân viên giao nhận:</span> 70445-Huỳnh Đức Kỳ</p>
                            </div>
                        </div>
                        <div className="item bleft" style={{ display: "table-cell", width: "50%", border: "1px solid", boxSizing: " border-box", padding: "6px", height: "100%", borderLeft: "0px" }}>
                            <div className="content" style={{ paddingLeft: "10px" }}>
                                <p><span className="bold" style={{ paddingRight: "10px", fontWeight: "bold" }}>Ghi chú điều phối:</span></p>
                                <p>0938488 Anh Bình, không xuất hóa đơn công ty</p>
                            </div>
                        </div>
                    </div>
                    <br />

                    <table style={{ width: "100%", borderSpacing: "10px", borderCollapse: "collapse", textAlign: "center", fontSize: "12px" }}>
                        <thead>
                            <tr>
                                <td colspan="6" style={{ border: "1px solid", padding: "8px" }}><b>Danh sách hàng hóa</b></td>
                            </tr>
                            <tr style={{ backgroundColor: "#d7d7d7" }}>
                                <td style={{ border: "1px solid", padding: "8px" }}>Có lắp đặt</td>
                                <td style={{ border: "1px solid", padding: "8px" }}>Mã sản phẩm</td>
                                <td style={{ border: "1px solid", padding: "8px", width: "30%" }}>Tên sản phẩm</td>
                                <td style={{ border: "1px solid", padding: "8px" }}>Imei</td>
                                <td style={{ border: "1px solid", padding: "8px" }}>Số lượng</td>
                                <td style={{ border: "1px solid", padding: "8px" }}>Đơn vị tính</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.girdDataSource && this.state.girdDataSource.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td style={{ border: "1px solid", padding: "8px" }}><input type="checkbox" value="" /></td>
                                            <td style={{ border: "1px solid", padding: "8px" }}>{item.product}</td>
                                            <td style={{ border: "1px solid", padding: "8px" }}>{item.product}</td>
                                            <td style={{ border: "1px solid", padding: "8px" }}>
                                                <img src={mavach} style={{ height: "30px", width: "100px", display: "block", margin: "0 auto" }} />
                                                {item.product}
                                            </td>
                                            <td style={{ border: "1px solid", padding: "8px" }}>{item.product}</td>
                                            <td style={{ border: "1px solid", padding: "8px" }}>{item.product}</td>
                                        </tr>
                                    )
                                })
                            }

                            <tr>
                                <td style={{ border: "1px solid", padding: "8px" }}><input type="checkbox" value="" /></td>
                                <td style={{ border: "1px solid", padding: "8px" }}>3051099000089</td>
                                <td style={{ border: "1px solid", padding: "8px" }}>Máy giặt Samsung WW10K6410QX/SV</td>
                                <td style={{ border: "1px solid", padding: "8px" }}>
                                    <img src={mavach} style={{ height: "30px", width: "100px", display: "block", margin: "0 auto" }} />
                                    WW10K790716708
                                </td>
                                <td style={{ border: "1px solid", padding: "8px" }}>1</td>
                                <td style={{ border: "1px solid", padding: "8px" }}>Cái</td>
                            </tr>

                            <tr>
                                <td style={{ border: "1px solid", padding: "8px" }}><input type="checkbox" value="" /></td>
                                <td style={{ border: "1px solid", padding: "8px" }}>3051099000089</td>
                                <td style={{ border: "1px solid", padding: "8px" }}>Máy giặt Samsung WW10K6410QX/SV</td>
                                <td style={{ border: "1px solid", padding: "8px" }}>
                                    <img src={mavach} style={{ height: "30px", width: "100px", display: "block", margin: "0 auto" }} />
                                    WW10K790716708
                                </td>
                                <td style={{ border: "1px solid", padding: "8px" }}>1</td>
                                <td style={{ border: "1px solid", padding: "8px" }}>Cái</td>
                            </tr>
                        </tbody>
                    </table>



                    <br />

                    <div className="footer" style={{ display: "table", border: "1px solid", width: "100%", padding: "6px", boxSizing: "border-box" }}>
                        <div className="f-left" style={{ display: "table-cell", width: "40%", paddingLeft: "10px" }}>
                            <p><b>TỔNG TIỀN COD: &nbsp;&nbsp;<i>10,250,000đ</i></b></p>
                            <p><b>Hình thức thanh toán</b></p>
                            <p>
                                <label><input type="checkbox" value="" checked="true" />Thanh toán thẻ</label>&nbsp;&nbsp;
                    <label><input type="checkbox" value="" />Tiền mặt</label>&nbsp;&nbsp;
                    <label><input type="checkbox" value="" />Chuyển khoản</label>
                            </p>
                        </div>
                        <div className="f-item" style={{ position: "relative", display: "table-cell", width: "20%", paddingLeft: "0px", textAlign: "center" }}>
                            <p><b>Chữ ký NV giao hàng</b></p>
                            <hr style={{ width: "80%", margin: "0 auto", left: "0", right: "0", bottom: "15px", position: "absolute" }} />
                        </div>
                        <div className="f-item" style={{ position: "relative", display: "table-cell", width: "20%", paddingLeft: "0px", textAlign: "center" }}>
                            <p><b>Chữ ký khách hàng</b></p>
                            <hr style={{ width: "80%", margin: "0 auto", left: "0", right: "0", bottom: "15px", position: "absolute" }} />
                        </div>
                    </div>
                </div>
                <br />


            </div >

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
