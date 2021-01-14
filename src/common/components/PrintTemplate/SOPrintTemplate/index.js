

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
import { useBarcode } from 'react-barcodes';
import { formatDate } from "../../../../common/library/CommonLib";


class SOPrintTemplateCom extends React.Component {
    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);
        this.getBarcode = this.getBarcode.bind(this);
        this.state = {
            titlePartnerName: '',
            PrintDataSource: {},
            totalPayableAmount: 0
        }
    }

    getBarcode(props) {
        const { inputRef } = useBarcode({
            value: props.value,
            options: {
                background: '#ffffff',
                height: props.height,
                width: props.width ? props.width : 2,
                fontSize: props.fontSize ? props.fontSize : 20
            }
        });

        return <svg ref={inputRef} />;
    };

    componentWillReceiveProps(nextProps) {
        // if (JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data)) {
        //     const result = nextProps.data.map((item) => {
        //         item.totalCost = item.ServiceFee * item.Quantity
        //         return item
        //     })
        //     const totalPayableAmount = result.reduce((sum, curValue, curIndex, []) => {
        //         sum += curValue.totalCost
        //         return sum
        //     }, 0);

        //     this.setState({
        //         PrintDataSource: result,
        //         totalPayableAmount

        //     })
        // }

    }

    getData() {
        //let _ShipmentOrderID = this.props.ShipmentOrderID ? this.props.ShipmentOrderID : -1;
        this.props.callFetchAPI("TMSAPI", "api/ShipmentOrder/LoadInfoForMobile", "201231000000191").then(apiResult => {
            //this.setState({ IsCallAPIError: apiResult.IsError });
            console.log("dsads", apiResult);
            if (!apiResult.IsError) {
                this.setState({ PrintDataSource: apiResult.ResultObject });
            }

        });
    }

    //nhân viên giao nhận
    getDeliver() {
        debugger;
        if (this.state.PrintDataSource.DeliverUserFullNameList) {
            //let user = this.state.PrintDataSource.DeliverUserLst.split(",");
            let username = this.state.PrintDataSource.DeliverUserFullNameList.split(";");
            let result = "";
            result = username.map((item, index) => {
                if (index != username.length - 1) {
                    return item + ", ";
                } else {
                    return item;
                }

            });
            return result;

        } else {
            return "";
        }
    }

    componentDidMount() {
        this.getData();
        //console.log("printdatasource", this.props.data);
    }


    render() {
        if (this.state.PrintDataSource) {



            return (
                <div id="print">
                    <div className="soprint" style={{ width: '100%', fontFamily: "verdana", fontSize: "11px", }}>
                        <div className="group" style={{ display: "table", width: "100%" }}>
                            <div className="item" style={{ display: "table-cell", width: "50%", border: "1px solid", boxSizing: " border-box", padding: "6px", height: "100%" }}>
                                <div className="content" style={{ paddingLeft: "0px", display: "inline-flex" }}>
                                    <img src={tantamlogo} className="logo" style={{ float: "", height: "20px", alignSelf: "center", marginRight: "6px", display: "" }} />
                                    <div style={{ fontSize: "7px" }}>
                                        <p><b>CÔNG TY TNHH DỊCH VỤ LẮP ĐẶT SỬA CHỮA - BẢO HÀNH TẬN TÂM</b></p>
                                        <p>128 Trần Quang Khải, Phường Tân Định , Q1, Hồ Chí Minh, Việt Nam</p>
                                    </div>
                                </div>
                                <hr style={{ borderBottom: "0" }} />
                                <h3 style={{ textAlign: "center", margin: "" }}>ĐƠN VẬN CHUYỂN</h3>
                            </div>
                            <div className="item bleft" style={{ display: "table-cell", width: "50%", border: "1px solid", boxSizing: " border-box", padding: "6px", height: "100%", borderLeft: "0px", verticalAlign: "middle" }}>
                                <div className="content" style={{ paddingLeft: "0px", fontSize: "11px" }}>
                                    <p><span className="bold" style={{ paddingRight: "10px", fontWeight: "bold" }}>Đối tác:</span>{this.state.PrintDataSource.PartnerName} </p>
                                    <p><span className="bold" style={{ paddingRight: "10px", fontWeight: "bold" }}>Loại dịch vụ:</span>{this.state.PrintDataSource.ShipmentOrderTypeName}</p>
                                    <p><span className="bold" style={{ paddingRight: "10px", fontWeight: "bold" }}>Ngày tạo phiếu:</span> {formatDate(this.state.PrintDataSource.CreatedOrderTime)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="group" style={{ display: "table", width: "100%" }}>
                            <div className="item btop" style={{ display: "table-cell", width: "50%", border: "1px solid", boxSizing: " border-box", padding: "6px", height: "100%", borderTop: "0px" }}>
                                <div className="content" style={{ paddingLeft: "0px" }}>
                                    <p><span className="bold" style={{ paddingRight: "10px", fontWeight: "bold" }}>Mã đơn vận chuyển:</span></p>
                                    {/* <img src={mavach} className="mavach" style={{ display: "block", margin: "0 auto", height: "60px", width: "70%" }} /> */}
                                    <div style={{ textAlign: "center" }}>
                                        <this.getBarcode value={this.state.PrintDataSource.ShipmentOrderID} height={60} width={1.5} />
                                    </div>
                                </div>
                            </div>
                            <div className="item btop bleft" style={{ display: "table-cell", width: "50%", border: "1px solid", boxSizing: " border-box", padding: "6px", height: "100%", borderLeft: "0px", borderTop: "0px" }}>
                                <div className="content" style={{ paddingLeft: "0px" }}>
                                    <p><span className="bold" style={{ paddingRight: "10px", fontWeight: "bold" }}>Mã đơn hàng của đối tác:</span></p>
                                    {/* <img src={mavach} className="mavach" style={{ display: "block", margin: "0 auto", height: "60px", width: "70%" }} /> */}
                                    <div style={{ textAlign: "center" }}>
                                        <this.getBarcode value={this.state.PrintDataSource.PartnerSaleOrderID} height={60} width={1.5} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="group" style={{ display: "table", width: "100%" }}>
                            <div className="item btop" style={{ display: "table-cell", width: "50%", border: "1px solid", boxSizing: " border-box", padding: "6px", height: "100%", borderTop: "0px" }}>
                                <div className="content" style={{ paddingLeft: "0px" }}>
                                    <p><span className="bold" style={{ paddingRight: "10px", fontWeight: "bold" }}>Người gửi:</span></p>
                                    <p><i>{this.state.PrintDataSource.SenderStoreName}</i></p>
                                    <p>{this.state.PrintDataSource.SenderFullAddress}</p>
                                </div>
                            </div>
                            <div className="item btop bleft" style={{ display: "table-cell", width: "50%", border: "1px solid", boxSizing: " border-box", padding: "6px", height: "100%", borderLeft: "0px", borderTop: "0px" }}>
                                <div className="content" style={{ paddingLeft: "0px" }}>
                                    <p><span className="bold" style={{ paddingRight: "10px", fontWeight: "bold" }}>Ngày hẹn giao:</span>{formatDate(this.state.PrintDataSource.ExpectedDeliveryDate)}</p>
                                    <p><span className="bold" style={{ paddingRight: "10px", fontWeight: "bold" }}>Ghi chú:</span></p>
                                    <p>{this.state.PrintDataSource.OrderNote}</p>

                                </div>
                            </div>
                        </div>

                        <div className="group" style={{ display: "table", width: "100%" }}>
                            <div className="item btop" style={{ display: "table-cell", width: "50%", border: "1px solid", boxSizing: " border-box", padding: "6px", height: "100%", borderTop: "0px" }}>
                                <div className="content" style={{ paddingLeft: "0px" }}>
                                    <p><span className="bold" style={{ paddingRight: "10px", fontWeight: "bold" }}>Người nhận hàng:</span></p>
                                    <p><i className="customername" style={{ marginRight: "30px" }}>{this.state.PrintDataSource.ReceiverFullName}</i> <i>{this.state.PrintDataSource.ReceiverPhoneNumber}</i></p>
                                    <p><i>{this.state.PrintDataSource.ReceiverFullAddress}</i></p>

                                </div>
                            </div>
                            <div className="item btop bleft" style={{ display: "table-cell", width: "50%", border: "1px solid", boxSizing: " border-box", padding: "6px", height: "100%", borderLeft: "0px", borderTop: "0px" }}>
                                <div className="content" style={{ paddingLeft: "0px" }}>
                                    <p><span className="bold" style={{ paddingRight: "10px", fontWeight: "bold" }}>Người mua hàng:</span></p>
                                    <p><i className="customername" style={{ marginRight: "30px" }}>{}</i> <i>{}</i></p>
                                    <p><i>{}</i></p>
                                </div>
                            </div>
                        </div>

                        <br />

                        <div className="group" style={{ display: "table", width: "100%" }}>
                            <div className="item" style={{ display: "table-cell", width: "50%", border: "1px solid", boxSizing: " border-box", padding: "6px", height: "100%" }}>
                                <div className="content" style={{ paddingLeft: "0px" }}>
                                    <p><span className="bold" style={{ paddingRight: "10px", fontWeight: "bold" }}>Nhân viên điều phối:</span> {this.state.PrintDataSource.CoordinatorUser ? `${this.state.PrintDataSource.CoordinatorUser}-${this.state.PrintDataSource.CoordinatorUserName}` : ""}</p>
                                    <p><span className="bold" style={{ paddingRight: "10px", fontWeight: "bold" }}>Nhân viên giao nhận:</span> <span style={{ lineHeight: "1rem" }}>{this.getDeliver()}</span></p>
                                </div>
                            </div>
                            <div className="item bleft" style={{ display: "table-cell", width: "50%", border: "1px solid", boxSizing: " border-box", padding: "6px", height: "100%", borderLeft: "0px" }}>
                                <div className="content" style={{ paddingLeft: "0px" }}>
                                    <p><span className="bold" style={{ paddingRight: "10px", fontWeight: "bold" }}>Ghi chú điều phối:</span></p>
                                    <p>{this.state.PrintDataSource.CoordinatorNote}</p>
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
                                    <td style={{ border: "1px solid", padding: "8px", width: "20%" }}>Tên sản phẩm</td>
                                    <td style={{ border: "1px solid", padding: "8px" }}>Imei</td>
                                    <td style={{ border: "1px solid", padding: "8px" }}>Số lượng</td>
                                    <td style={{ border: "1px solid", padding: "8px" }}>Đơn vị tính</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.PrintDataSource.ShipmentOrder_ItemList && this.state.PrintDataSource.ShipmentOrder_ItemList.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td style={{ border: "1px solid", padding: "8px" }}><input type="checkbox" value={item.IsInstallItem} /></td>
                                                <td style={{ border: "1px solid", padding: "8px" }}>{item.ProductID}</td>
                                                <td style={{ border: "1px solid", padding: "8px" }}>{item.ProductName}</td>
                                                <td style={{ border: "1px solid", padding: "8px" }}>
                                                    {
                                                        item.ProductSerial && <this.getBarcode value={item.ProductSerial} height={20} width={1} fontSize={15} />
                                                    }
                                                    
                                                </td>
                                                <td style={{ border: "1px solid", padding: "8px" }}>{item.Quantity}</td>
                                                <td style={{ border: "1px solid", padding: "8px" }}>{item.QuantityUnitName}</td>
                                            </tr>
                                        )
                                    })
                                }

                                {/* <tr>
                                    <td style={{ border: "1px solid", padding: "8px" }}><input type="checkbox" value="" /></td>
                                    <td style={{ border: "1px solid", padding: "8px" }}>3051099000089</td>
                                    <td style={{ border: "1px solid", padding: "8px" }}>Máy giặt Samsung WW10K6410QX/SV</td>
                                    <td style={{ border: "1px solid", padding: "8px" }}>
                                        <this.getBarcode value={210111000000058} height={20} width={1} fontSize={15} />
                                    </td>
                                    <td style={{ border: "1px solid", padding: "8px" }}>1</td>
                                    <td style={{ border: "1px solid", padding: "8px" }}>Cái</td>
                                </tr>

                                <tr>
                                    <td style={{ border: "1px solid", padding: "8px" }}><input type="checkbox" value="" /></td>
                                    <td style={{ border: "1px solid", padding: "8px" }}>3051099000089</td>
                                    <td style={{ border: "1px solid", padding: "8px" }}>Máy giặt Samsung WW10K6410QX/SV</td>
                                    <td style={{ border: "1px solid", padding: "8px" }}>
                                        <this.getBarcode value={210111000000058} height={20} width={1} fontSize={15} />
                                    </td>
                                    <td style={{ border: "1px solid", padding: "8px" }}>1</td>
                                    <td style={{ border: "1px solid", padding: "8px" }}>Cái</td>
                                </tr> */}
                            </tbody>
                        </table>



                        <br />

                        <div className="footer" style={{ display: "table", border: "1px solid", width: "100%", padding: "6px", boxSizing: "border-box" }}>
                            <div className="f-left" style={{ display: "table-cell", width: "40%", paddingLeft: "0px" }}>
                                <p><b>TỔNG TIỀN COD: &nbsp;&nbsp;<i>{formatMoney(this.state.PrintDataSource.TotalCOD, 0)}</i></b></p>
                                <p><b>Hình thức thanh toán</b></p>
                                <p>
                                    <label><input type="checkbox" value="" checked="" />Thanh toán thẻ</label>&nbsp;&nbsp;
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
        else {
            return "";
        }
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