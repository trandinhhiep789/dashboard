

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
        this.state = {
            titlePartnerName:'',
            girdDataSource: this.props.data,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data)) {
            this.setState({
                girdDataSource: nextProps.data
            })
        }
    }

    componentDidMount(){
        
    }

    render() {
        console.log('this', this.state.girdDataSource)
        return (
            <div id="print">
                <div className="header" style={{ textAlign: "center", fontSize: 26, color: '#333', fontWeight: 600, textTransform: "uppercase" }}>
                    <p >Bảng kê tổng hợp đơn hàng lắp đặt theo tháng ...................................</p>
                    <p>(Siêu thị .............................................)</p>
                </div>
                <div style={{ width: '100%', marginTop: 50, }} >
                    <div style={{width: '100%', display: 'block', flex: 1, flexDirection: 'row', border: 1, borderColor: 'red'}}>
                        <div style={{ width: '100%', display: 'inline-block', marginBottom: 30 }}>
                            <div style={{width: '60%',float: "left", textAlign: 'left'}}>
                                <h3 style={{textTransform: 'uppercase', fontSize: 15}}>Đối tác: 101-Công ty TNHH TMDV kỹ thuật bão nguyên cơ </h3>
                            </div>
                            <div style={{width: '40%',float: 'right', textAlign: 'right', lineHeight: 2}}>
                                <span style={{ fontSize: 20,  }}>Nhân viên: 74260-Nguyễn Văn Phận</span>
                            </div>
                        </div>
                    </div>
                    <table style={{ width: '100%' }} border='1'>
                        <thead>
                            <tr>
                                <td>STT</td>
                                <td>Sản phẩm</td>
                                <td>Số lượng đơn hàng</td>
                                <td>Giá tiền</td>
                                <td>Thành tiền</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Máy lạnh 1 HP</td>
                                <td>0</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Máy lạnh 1.5 HP</td>
                                <td>0</td>
                                <td></td>
                                <td></td>
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
