

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
            PrintDataSource: this.props.data,
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
                fontSize: props.fontSize ? props.fontSize : 20,
                margin: 0
                //margin: props.margin ? props.margin : "auto",
            }
        });

        return <svg ref={inputRef} />;
    };



    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data)) {

            this.setState({
                PrintDataSource: nextProps.data,

            })
        }

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

    //nh??n vi??n giao nh???n
    getDeliver() {
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
        //this.getData();
        //console.log("printdatasource", this.props.data);
    }


    render() {
        //console.log('aa', this.props, this.state)
        if (this.state.PrintDataSource) {
            return (
                <div id="printSO">
                    <div className="soprint" style={{ width: '100%', fontFamily: "verdana", fontSize: "11px", }}>
                        <div className="group" style={{ display: "table", width: "100%" }}>
                            <div className="item" style={{ display: "table-cell", width: "50%", border: "1px solid", boxSizing: " border-box", padding: "6px", height: "100%" }}>
                                <div className="content" style={{ paddingLeft: "0px", display: "inline-flex" }}>
                                    <img src={tantamlogo} className="logo" style={{ float: "", height: "20px", alignSelf: "center", marginRight: "6px", display: "" }} />
                                    <div style={{ fontSize: "7px" }}>
                                        <p><b>C??NG TY TNHH D???CH V??? L???P ?????T S???A CH???A - B???O H??NH T???N T??M</b></p>
                                        <p>128 Tr???n Quang Kh???i, Ph?????ng T??n ?????nh , Q1, H??? Ch?? Minh, Vi???t Nam</p>
                                    </div>
                                </div>
                                <hr style={{ borderBottom: "0" }} />
                                <h3 style={{ textAlign: "center", margin: "1px auto" }}>????N V???N CHUY???N</h3>
                            </div>
                            <div className="item bleft" style={{ display: "table-cell", width: "50%", border: "1px solid", boxSizing: " border-box", padding: "6px", height: "100%", borderLeft: "0px", verticalAlign: "middle", position: "relative" }}>
                                <div className="content" style={{ paddingLeft: "0px", fontSize: "11px", position: "absolute", top: "0px", left: "10px" }}>
                                    <p><span className="bold" style={{ paddingRight: "10px", fontWeight: "bold" }}>?????i t??c:</span>{this.state.PrintDataSource.PartnerName} </p>
                                    <p><span className="bold" style={{ paddingRight: "10px", fontWeight: "bold" }}>Lo???i d???ch v???:</span>{this.state.PrintDataSource.ShipmentOrderTypeName}</p>
                                    <p><span className="bold" style={{ paddingRight: "10px", fontWeight: "bold" }}>Ng??y t???o phi???u:</span> {formatDate(this.state.PrintDataSource.CreatedOrderTime)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="group" style={{ display: "table", width: "100%" }}>
                            <div className="item btop" style={{ display: "table-cell", width: "50%", border: "1px solid", boxSizing: " border-box", padding: "6px", height: "100%", borderTop: "0px" }}>
                                <div className="content" style={{ paddingLeft: "0px" }}>
                                    <p><span className="bold" style={{ paddingRight: "10px", fontWeight: "bold" }}>M?? ????n v???n chuy???n:</span></p>
                                    {/* <img src={mavach} className="mavach" style={{ display: "block", margin: "0 auto", height: "60px", width: "70%" }} /> */}
                                    <div style={{ marginTop: "-6px", marginBottom: "", textAlign: "center" }}>
                                        <this.getBarcode value={this.state.PrintDataSource.ShipmentOrderID} height={25} width={1.5} fontSize={15} />
                                    </div>
                                </div>
                            </div>
                            <div className="item btop bleft" style={{ display: "table-cell", width: "50%", border: "1px solid", boxSizing: " border-box", padding: "6px", height: "100%", borderLeft: "0px", borderTop: "0px" }}>
                                <div className="content" style={{ paddingLeft: "0px" }}>
                                    <p><span className="bold" style={{ paddingRight: "10px", fontWeight: "bold" }}>M?? ????n h??ng c???a ?????i t??c:</span></p>
                                    {/* <img src={mavach} className="mavach" style={{ display: "block", margin: "0 auto", height: "60px", width: "70%" }} /> */}
                                    <div style={{ marginTop: "-6px", marginBottom: "", textAlign: "center" }}>
                                        <this.getBarcode value={this.state.PrintDataSource.PartnerSaleOrderID} height={25} width={1.5} fontSize={15} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="group" style={{ display: "table", width: "100%" }}>
                            <div className="item btop" style={{ display: "table-cell", width: "50%", border: "1px solid", boxSizing: " border-box", padding: "6px", height: "100%", borderTop: "0px" }}>
                                <div className="content" style={{ paddingLeft: "0px" }}>
                                    <p><span className="bold" style={{ paddingRight: "10px", fontWeight: "bold" }}>Ng?????i g???i:</span></p>
                                    <p><i>{this.state.PrintDataSource.SenderFullName}</i></p>
                                    <p>{this.state.PrintDataSource.SenderFullAddress}</p>
                                </div>
                            </div>
                            <div className="item btop bleft" style={{ display: "table-cell", width: "50%", border: "1px solid", boxSizing: " border-box", padding: "6px", height: "100%", borderLeft: "0px", borderTop: "0px" }}>
                                <div className="content" style={{ paddingLeft: "0px" }}>
                                    <p><span className="bold" style={{ paddingRight: "10px", fontWeight: "bold" }}>Ng??y h???n giao:</span>{formatDate(this.state.PrintDataSource.ExpectedDeliveryDate)}</p>
                                    <p><span className="bold" style={{ paddingRight: "10px", fontWeight: "bold" }}>Ghi ch??:</span></p>
                                    <p>{this.state.PrintDataSource.OrderNote}</p>

                                </div>
                            </div>
                        </div>

                        <div className="group" style={{ display: "table", width: "100%" }}>
                            <div className="item btop" style={{ display: "table-cell", width: "50%", border: "1px solid", boxSizing: " border-box", padding: "6px", height: "100%", borderTop: "0px" }}>
                                <div className="content" style={{ paddingLeft: "0px" }}>
                                    <p><span className="bold" style={{ paddingRight: "10px", fontWeight: "bold" }}>Ng?????i nh???n h??ng:</span></p>
                                    <p><i className="customername" style={{ marginRight: "30px" }}>{this.state.PrintDataSource.ReceiverFullName}</i> <i>{this.state.PrintDataSource.ReceiverPhoneNumber}</i></p>
                                    <p><i>{this.state.PrintDataSource.ReceiverFullAddress}</i></p>

                                </div>
                            </div>
                            <div className="item btop bleft" style={{ display: "table-cell", width: "50%", border: "1px solid", boxSizing: " border-box", padding: "6px", height: "100%", borderLeft: "0px", borderTop: "0px" }}>
                                <div className="content" style={{ paddingLeft: "0px" }}>
                                    <p><span className="bold" style={{ paddingRight: "10px", fontWeight: "bold" }}>Ng?????i mua h??ng:</span></p>
                                    <p><i className="customername" style={{ marginRight: "30px" }}>{this.state.PrintDataSource.CustomerName}</i> <i>{this.state.PrintDataSource.CustomerPhone}</i></p>
                                    <p><i>{this.state.PrintDataSource.CustomerAddress}</i></p>
                                </div>
                            </div>
                        </div>

                        <br />

                        <div className="group" style={{ display: "table", width: "100%" }}>
                            <div className="item" style={{ display: "table-cell", width: "50%", border: "1px solid", boxSizing: " border-box", padding: "6px", height: "100%" }}>
                                <div className="content" style={{ paddingLeft: "0px" }}>
                                    <p><span className="bold" style={{ paddingRight: "10px", fontWeight: "bold" }}>Nh??n vi??n ??i???u ph???i:</span> {this.state.PrintDataSource.CoordinatorUser ? `${this.state.PrintDataSource.CoordinatorUser}-${this.state.PrintDataSource.CoordinatorUserName}` : ""}</p>
                                    <p><span className="bold" style={{ paddingRight: "10px", fontWeight: "bold" }}>Nh??n vi??n giao nh???n:</span> <span style={{ lineHeight: "1rem" }}>{this.getDeliver()}</span></p>
                                </div>
                            </div>
                            <div className="item bleft" style={{ display: "table-cell", width: "50%", border: "1px solid", boxSizing: " border-box", padding: "6px", height: "100%", borderLeft: "0px" }}>
                                <div className="content" style={{ paddingLeft: "0px" }}>
                                    <p><span className="bold" style={{ paddingRight: "10px", fontWeight: "bold" }}>Ghi ch?? ??i???u ph???i:</span></p>
                                    <p>{this.state.PrintDataSource.CoordinatorNote}</p>
                                </div>
                            </div>
                        </div>
                        <br />

                        <table style={{ width: "100%", borderSpacing: "10px", borderCollapse: "collapse", textAlign: "center", fontSize: "10px" }}>
                            <thead>
                                <tr>
                                    <td colSpan="6" style={{ border: "1px solid", padding: "8px" }}><b>Danh s??ch h??ng h??a</b></td>
                                </tr>
                                <tr style={{ backgroundColor: "#d7d7d7" }}>
                                    {/* <td style={{ border: "1px solid", padding: "3px" }}>C?? l???p ?????t</td> */}
                                    <td style={{ border: "1px solid", padding: "3px" }}>M?? s???n ph???m</td>
                                    <td style={{ border: "1px solid", padding: "3px", width: "" }}>T??n s???n ph???m</td>
                                    <td style={{ border: "1px solid", padding: "3px" }}>Imei</td>
                                    <td style={{ border: "1px solid", padding: "3px" }}>SL</td>
                                    <td style={{ border: "1px solid", padding: "3px" }}>??VT</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.PrintDataSource.ShipmentOrder_ItemList && this.state.PrintDataSource.ShipmentOrder_ItemList.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                {/* <td style={{ border: "1px solid", padding: "3px" }}><input type="checkbox" value={item.IsInstallItem} /></td> */}
                                                <td style={{ border: "1px solid", padding: "3px" }}>{item.ProductID}</td>
                                                <td style={{ border: "1px solid", padding: "3px", textAlign: "left" }}>{item.ProductName}</td>
                                                <td style={{ border: "1px solid", padding: "3px" }}>
                                                    {
                                                        item.ProductSerial && <this.getBarcode value={item.ProductSerial} height={12} width={1} fontSize={10} />
                                                    }
                                                </td>
                                                <td style={{ border: "1px solid", padding: "3px" }}>{item.Quantity}</td>
                                                <td style={{ border: "1px solid", padding: "3px" }}>{item.QuantityUnitName}</td>
                                            </tr>
                                        )
                                    })
                                }

                                {/* <tr>
                                    <td style={{ border: "1px solid", padding: "8px" }}><input type="checkbox" value="" /></td>
                                    <td style={{ border: "1px solid", padding: "8px" }}>3051099000089</td>
                                    <td style={{ border: "1px solid", padding: "8px" }}>M??y gi???t Samsung WW10K6410QX/SV</td>
                                    <td style={{ border: "1px solid", padding: "8px" }}>
                                        <this.getBarcode value={210111000000058} height={20} width={1} fontSize={15} />
                                    </td>
                                    <td style={{ border: "1px solid", padding: "8px" }}>1</td>
                                    <td style={{ border: "1px solid", padding: "8px" }}>C??i</td>
                                </tr>

                                <tr>
                                    <td style={{ border: "1px solid", padding: "8px" }}><input type="checkbox" value="" /></td>
                                    <td style={{ border: "1px solid", padding: "8px" }}>3051099000089</td>
                                    <td style={{ border: "1px solid", padding: "8px" }}>M??y gi???t Samsung WW10K6410QX/SV</td>
                                    <td style={{ border: "1px solid", padding: "8px" }}>
                                        <this.getBarcode value={210111000000058} height={20} width={1} fontSize={15} />
                                    </td>
                                    <td style={{ border: "1px solid", padding: "8px" }}>1</td>
                                    <td style={{ border: "1px solid", padding: "8px" }}>C??i</td>
                                </tr> */}
                            </tbody>
                        </table>
                        <br />

                        <div className="footer" style={{ display: "table", border: "1px solid", width: "100%", padding: "6px", boxSizing: "border-box" }}>
                            <div className="f-left" style={{ display: "table-cell", width: "40%", paddingLeft: "0px" }}>
                                <p><b>T???NG TI???N COD: &nbsp;&nbsp;<i>{this.state.PrintDataSource.TotalCOD != undefined ? formatMoney(this.state.PrintDataSource.TotalCOD, 0) : 0}</i></b></p>
                                <p><b>H??nh th???c thanh to??n</b></p>
                                <p>
                                    <label><input type="checkbox" value="" defaultChecked={false} />Thanh to??n th???</label>&nbsp;&nbsp;
                                    <label><input type="checkbox" value="" defaultChecked={false} />Ti???n m???t</label>&nbsp;&nbsp;
                                    <label><input type="checkbox" value="" defaultChecked={false} />Chuy???n kho???n</label>
                                    {/* <label><input type="checkbox" value="" defaultChecked={this.state.PrintDataSource.ShipmentFeePaymentMethodID == 1 ? true : false} />Ti???n m???t</label>&nbsp;&nbsp;
                    <label><input type="checkbox" value="" defaultChecked={this.state.PrintDataSource.ShipmentFeePaymentMethodID == 0 ? true : false} />Chuy???n kho???n</label> */}
                                </p>
                            </div>
                            <div className="f-item" style={{ position: "relative", display: "table-cell", width: "20%", paddingLeft: "0px", textAlign: "center" }}>
                                <p><b>Ch??? k?? NV giao h??ng</b></p>
                                <hr style={{ width: "80%", margin: "0 auto", left: "0", right: "0", bottom: "15px", position: "absolute" }} />
                            </div>
                            <div className="f-item" style={{ position: "relative", display: "table-cell", width: "20%", paddingLeft: "0px", textAlign: "center" }}>
                                <p><b>Ch??? k?? kh??ch h??ng</b></p>
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
