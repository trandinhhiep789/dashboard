

import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { formatMoney } from '../../../../utils/function';


class PartnerPayaleTemplateCom extends React.Component {
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
                <div className="header" style={{ textAlign: "center", fontSize: 26, color: '#333', fontWeight: 600, textTransform: "uppercase" }}>
                    <p >Bảng kê tổng hợp đơn hàng lắp đặt theo tháng ...................................</p>
                    <p>(Siêu thị .............................................)</p>
                </div>
                <div style={{ width: '100%', marginTop: 50, }} >
                    <div style={{ width: '100%', display: 'block', flex: 1, flexDirection: 'row', border: 1, borderColor: 'red' }}>
                        <div style={{ width: '100%', display: 'inline-block', marginBottom: 30 }}>
                            <div style={{ width: '60%', float: "left", textAlign: 'left' }}>
                                <h3 style={{ textTransform: 'uppercase', fontSize: 15 }}>Đối tác: {this.state.girdDataSource.length > 0 ? this.state.girdDataSource[0].PartnerName : ''}</h3>
                            </div>
                            <div style={{ width: '40%', float: 'right', textAlign: 'right', lineHeight: 2 }}>
                                <span style={{ fontSize: 20, }}>Nhân viên: 74260-Nguyễn Văn Phận</span>
                            </div>
                        </div>
                    </div>
                    <table style={{ width: '100%' }} border='1'>
                        <thead>
                            <tr>
                                <td style={{padding: 6}}>STT</td>
                                <td style={{padding: 6}}>Sản phẩm</td>
                                <td style={{padding: 6}}>Số lượng đơn hàng</td>
                                <td style={{padding: 6}}>Giá tiền</td>
                                <td style={{padding: 6}}>Thành tiền</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.girdDataSource && this.state.girdDataSource.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td style={{padding: 6}}>{index + 1}</td>
                                            <td style={{padding: 6}}>{item.SubGroupName}</td>
                                            <td style={{padding: 6}}>{item.Quantity}</td>
                                            <td style={{padding: 6}}>{item.ServiceFee}</td>
                                            <td style={{padding: 6}}>{formatMoney(item.totalCost, 0)}</td>
                                        </tr>
                                    )
                                })
                            }
                            <tr>
                                <td colSpan="4" style={{ fontSize: 25, fontWeight: 500, padding: 6,}}>Tổng cộng</td>
                                <td style={{padding: 6, fontSize: 25, fontWeight: 500,}}>{formatMoney(this.state.totalPayableAmount, 0)}</td>

                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="footer" style={{ display: 'table', width: '100%', marginTop: 50 }}>
                    <div style={{ display: 'table-cell', width: '33.33%' }}>
                        <h3 style={{}}>Trưởng nhóm xác nhận</h3>
                        <span>(Ký,ghi rõ user-họ tên)</span>
                    </div>
                    <div style={{ display: 'table-cell', width: '33.33%' }}>
                        <div style={{ textAlign: 'center' }}>
                            <h3>Đối tác xác nhận</h3>
                            <span>(Ký,ghi rõ họ tên)</span>
                        </div>


                        <p style={{ marginTop: 100, textAlign: 'left', fontSize: 15 }}>Ngày ký (Bắt buộc):</p>
                    </div>
                    <div style={{ display: 'table-cell', width: '33.33%' }}>
                        <div style={{ textAlign: 'right' }}>
                            <h3>Người nhận nhận chứng từ</h3>
                            <span>(Ký,ghi rõ họ tên)</span>
                        </div>

                        <p style={{ marginTop: 100, textAlign: 'left', fontSize: 15 }}>Ngày nhận:</p>
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
