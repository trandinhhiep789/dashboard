import React from "react";
import { connect } from "react-redux";
import ReactNotification from "react-notifications-component";
import readXlsxFile from 'read-excel-file';
import { Button, Tabs, Popover, Tooltip } from "antd";
import { EyeOutlined, PartitionOutlined } from "@ant-design/icons";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import ModalVietBanDoShipmentRouteAuto from "../../ShipmentRouteAutoBHX/Components/ModalVietBanDoShipmentRouteAuto";
ModalVietBanDoShipmentRouteAuto
class SearchCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: null,
            pickRandomColor: [
                "#1f5ff4",
                "#c55d53",
                "#cb68c5",
                "#65b411",
                "#f4b323",
                "#420e3e",
                "#e80024",
                "#585ccc",
                "#d44371",
                "#14915f",
                "#e79940",
                "#6be54"
            ],
            dataSourceMap: [],
            isShowModalMap: false
        };

        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
        this.handleImport = this.handleImport.bind(this);
        this.handleExport = this.handleExport.bind(this);
        this.handleShowModalMapMotorRoute = this.handleShowModalMapMotorRoute.bind(this);
        this.handleShowModalMapTruckRoute = this.handleShowModalMapTruckRoute.bind(this);
    }

    componentDidMount() {

    }

    handleExport() {
        try {
            const dataTemplate =
                [{
                    "ACTUALRECEIVERGEOLOCATION": "1",
                    "SHIPMENTORDERID": "1",
                    "RECEIVERFULLNAME": "1",
                    "RECEIVERPHONENUMBER": "1",
                    "RECEIVERFULLADDRESS": "1",
                    "WEIGHT": "1",
                    "LENGTH": "1",
                    "WIDTH": "1",
                    "HEIGHT": "1",

                }]

            const ws = XLSX.utils.json_to_sheet([{}]);
            XLSX.utils.sheet_add_json(ws, dataTemplate);

            const wb = {
                Sheets: { "data": ws },
                SheetNames: ["data"]
            };
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const data = new Blob(
                [excelBuffer],
                { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' }
            );
            FileSaver.saveAs(data, `danh sach vi tri.xlsx`);


        } catch (error) {
            console.log(error)
        }
    }

    handleImport() {
        const schema = {
            'SALEORDERID': {
                prop: 'SALEORDERID',
                type: String,
            },
            'AFTERDELIVERYTIME': {
                prop: 'AFTERDELIVERYTIME',
                type: String,
            },
            'QUANTITYPACKAGE': {
                prop: 'QUANTITYPACKAGE',
                type: String,
            },
            'DELIVERYADDRESS': {
                prop: 'DELIVERYADDRESS',
                type: String,
            },
            'WARDNAME': {
                prop: 'WARDNAME',
                type: String,
            },
            'DISTRICTNAME': {
                prop: 'DISTRICTNAME',
                type: String,
            },
            'PROVINCENAME': {
                prop: 'PROVINCENAME',
                type: String,
            },
            'TOTALWEIGHT': {
                prop: 'TOTALWEIGHT',
                type: Number,
            },
            'CARRIERTYPEID': {
                prop: 'CARRIERTYPEID',
                type: Number,
            },
            'COORDINATORSTOREID': {
                prop: 'COORDINATORSTOREID',
                type: Number,
            },
            'COORDINATORSTOREADDRESS': {
                prop: 'COORDINATORSTOREADDRESS',
                type: String,
            },
            'SHIPMENTORDERSTATUSID': {
                prop: 'SHIPMENTORDERSTATUSID',
                type: Number,
            },
        }

        const input = document.getElementById('buttonImportFile');
        input.click();

        input.addEventListener("change", () => {
            readXlsxFile(input.files[0], { sheet: "data", schema }).then((data) => {

                const input = data.rows.map(item => {
                    return {
                        PartnerSaleOrderID: item.SALEORDERID ? item.SALEORDERID : 0,
                        ReceiverFullAddress: `${item.DELIVERYADDRESS}, ${item.WARDNAME}, ${item.DISTRICTNAME}, ${item.PROVINCENAME}`,
                        Weight: item.TOTALWEIGHT ? item.TOTALWEIGHT : 0,
                        CarrierTypeID: item.CARRIERTYPEID ? item.CARRIERTYPEID : "",
                        CoordinatorStoreID: item.COORDINATORSTOREID,
                        CoordinatorStoreAddress: item.COORDINATORSTOREADDRESS,
                        ShipmentOrderStatusID: item.SHIPMENTORDERSTATUSID
                    }
                })

                const input_1 = {
                    ListShipmentOrder: input
                }

                console.log("input_1", input_1);

                this.props.callFetchAPI("TMSAPI", "api/Routing/CapacityConstraints", input_1).then(apiResult => {
                    console.log('output', apiResult);
                    if (apiResult.IsError) {
                        alert("Lỗi gọi api");
                    } else {
                        this.setState({
                            dataSource: apiResult.ResultObject
                        })
                    }
                });
            }).catch(error => {
                console.log("error", error);
            }).finally(() => {
                input.value = "";
            })
        }, { once: true })
    }

    handleShowModalMapMotorRoute(index) {
        this.setState({ dataSourceMap: this.state.dataSource.MotorRoute.ListShipmentOrderRoute[index], isShowModalMap: true })
    }

    handleShowModalMapTruckRoute(index) {
        this.setState({ dataSourceMap: this.state.dataSource.TruckRoute.ListShipmentOrderRoute[index], isShowModalMap: true })
    }

    render() {
        let randomColor = "";
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />

                <button type="button" onClick={this.handleImport}>
                    Import
                </button>

                <button type="button" onClick={this.handleExport}>
                    Xuất file mẫu
                </button>

                {
                    this.state.dataSource != null && <div style={{ width: "100%" }}>
                        <Tabs defaultActiveKey="1" style={{ padding: "15px", backgroundColor: "white" }}>
                            <Tabs.TabPane tab="Xe máy" key="1">
                                <div style={{ width: "100%", backgroundColor: "white", padding: "20px", height: "57vh", overflow: "auto", border: "1px solid #0000ff3d", marginBottom: "15px" }}>
                                    <h5>Danh sách các tuyến đề xuất</h5>
                                    <h6>Tổng cộng số km: <i style={{ fontWeight: "700" }}>{parseInt(this.state.dataSource.MotorRoute.TotalDistance / 1000)}</i> km</h6>
                                    <h6>Tổng cộng số tải: <i style={{ fontWeight: "700" }}>{this.state.dataSource.MotorRoute.TotalLoad}</i> kg</h6>
                                    <div style={{ width: "100%", backgroundColor: "white", padding: "20px", height: "60vh", overflow: "auto", border: "1px solid #0000ff3d", marginBottom: "15px" }}>
                                        {
                                            this.state.dataSource.MotorRoute.ListShipmentOrderRoute && this.state.dataSource.MotorRoute.ListShipmentOrderRoute.map((line, index) => (
                                                <div key={index}>
                                                    <p style={{ display: "none" }}>{(randomColor = this.state.pickRandomColor[Math.floor(Math.random() * 11)])}</p>
                                                    <div style={{ display: "flex" }}>
                                                        <span style={{ fontWeight: "700", fontSize: "15px" }}>
                                                            {index}
                                                        </span>&ensp;
                                                        <div style={{ display: "flex", width: "100%", marginBottom: "12px" }}>
                                                            <div style={{ width: "90%", marginBottom: "30px" }}>
                                                                <div>
                                                                    <i>Số km: {parseInt(this.state.dataSource.MotorRoute.ListTotalDistance[index] / 1000)}</i>&ensp;
                                                                    <i>Tổng khối lượng: {this.state.dataSource.MotorRoute.ListTotalLoad[index]}</i>
                                                                </div>
                                                                <div style={{ display: "flex" }}>
                                                                    {
                                                                        this.state.dataSource.MotorRoute.ListShipmentOrderRoute[index].map((objShipmentOrder, i) => (
                                                                            <div key={objShipmentOrder.PartnerSaleOrderID} style={{ display: "flex", width: i != 0 && "100%" }}>
                                                                                {
                                                                                    i != 0 && (objShipmentOrder.IsCompleteDeliverIed
                                                                                        ? <div style={{ width: "100%", height: "10px", borderBottom: `3px solid ${randomColor}` }}></div>
                                                                                        : <div style={{ width: "100%", height: "10px", borderBottom: `3px solid #80808030` }}></div>)
                                                                                }
                                                                                {
                                                                                    i != 0
                                                                                        ? <Popover
                                                                                            content={
                                                                                                <div>
                                                                                                    <p>{objShipmentOrder.ReceiverFullName}</p>
                                                                                                    <p>{objShipmentOrder.ReceiverFullAddress}</p>
                                                                                                    <p>{objShipmentOrder.Weight}</p>
                                                                                                </div>
                                                                                            }
                                                                                            title={objShipmentOrder.PartnerSaleOrderID}>
                                                                                            <div style={{ width: "16px", height: "16px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                                                                                                {
                                                                                                    objShipmentOrder.IsCompleteDeliverIed ?
                                                                                                        <div
                                                                                                            style={{ position: "relative", width: "12px", height: "12px", border: `3px solid ${randomColor}`, backgroundColor: `${randomColor}`, borderRadius: "50%", cursor: "pointer" }}
                                                                                                        >
                                                                                                            <div style={{ position: "absolute", top: "10px", left: "50%", transform: "translateX(-50%)" }}>{i}</div>
                                                                                                        </div> :
                                                                                                        <div
                                                                                                            style={{ position: "relative", width: "12px", height: "12px", border: `3px solid ${randomColor}`, backgroundColor: "white", borderRadius: "50%", cursor: "pointer" }}
                                                                                                        >
                                                                                                            <div style={{ position: "absolute", top: "10px", left: "50%", transform: "translateX(-50%)" }}>{i}</div>
                                                                                                        </div>
                                                                                                }
                                                                                            </div>
                                                                                        </Popover>
                                                                                        : <div style={{ width: "16px", height: "16px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                                                                                            {
                                                                                                <div
                                                                                                    style={{ position: "relative", width: "12px", height: "12px", border: `3px solid ${randomColor}`, backgroundColor: `${randomColor}`, borderRadius: "50%", cursor: "pointer" }}
                                                                                                >
                                                                                                    <div style={{ position: "absolute", top: "10px", left: "50%", transform: "translateX(-50%)" }}>0</div>
                                                                                                </div>
                                                                                            }
                                                                                        </div>
                                                                                }
                                                                            </div>
                                                                        ))
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div style={{ width: "10%", textAlign: "right", paddingTop: "18px" }}>
                                                                <Tooltip title="Xem bản đồ">
                                                                    <Button type="primary" shape="circle" icon={<EyeOutlined />} onClick={() => this.handleShowModalMapMotorRoute(index)} />
                                                                </Tooltip>&nbsp;
                                                                <Tooltip title="Phân tuyến">
                                                                    <Button type="primary" shape="circle" icon={<PartitionOutlined />} />
                                                                </Tooltip>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </Tabs.TabPane>

                            {/* <Tabs.TabPane tab="Xe tải" key="2">
                                <div style={{ width: "100%", backgroundColor: "white", padding: "20px", height: "57vh", overflow: "auto", border: "1px solid #0000ff3d", marginBottom: "15px" }}>
                                    <h5>Danh sách các tuyến đề xuất</h5>
                                    <h6>Tổng cộng số km: <i style={{ fontWeight: "700" }}>{parseInt(this.state.dataSource.TruckRoute.TotalDistance / 1000)}</i> km</h6>
                                    <h6>Tổng cộng số tải: <i style={{ fontWeight: "700" }}>{this.state.dataSource.TruckRoute.TotalLoad}</i> kg</h6>
                                    <div style={{ width: "100%", backgroundColor: "white", padding: "20px", height: "60vh", overflow: "auto", border: "1px solid #0000ff3d", marginBottom: "15px" }}>
                                        {
                                            this.state.dataSource.TruckRoute.ListShipmentOrderRoute && this.state.dataSource.TruckRoute.ListShipmentOrderRoute.map((line, index) => (
                                                <div key={index}>
                                                    <p style={{ display: "none" }}>{(randomColor = this.state.pickRandomColor[Math.floor(Math.random() * 11)])}</p>
                                                    <div style={{ display: "flex" }}>
                                                        <span style={{ fontWeight: "700", fontSize: "15px" }}>
                                                            {index}
                                                        </span>&ensp;
                                                        <div style={{ display: "flex", width: "100%", marginBottom: "12px" }}>
                                                            <div style={{ width: "90%", marginBottom: "30px" }}>
                                                                <div>
                                                                    <i>Số km: {parseInt(this.state.dataSource.TruckRoute.ListTotalDistance[index] / 1000)}</i>&ensp;
                                                                    <i>Tổng khối lượng: {this.state.dataSource.TruckRoute.ListTotalLoad[index]}</i>
                                                                </div>
                                                                <div style={{ display: "flex" }}>
                                                                    {
                                                                        this.state.dataSource.TruckRoute.ListShipmentOrderRoute[index].map((objShipmentOrder, i) => (
                                                                            <div key={objShipmentOrder.PartnerSaleOrderID} style={{ display: "flex", width: i != 0 && "100%" }}>
                                                                                {
                                                                                    i != 0 && (objShipmentOrder.IsCompleteDeliverIed
                                                                                        ? <div style={{ width: "100%", height: "10px", borderBottom: `3px solid ${randomColor}` }}></div>
                                                                                        : <div style={{ width: "100%", height: "10px", borderBottom: `3px solid #80808030` }}></div>)
                                                                                }
                                                                                {
                                                                                    i != 0
                                                                                        ? <Popover
                                                                                            content={
                                                                                                <div>
                                                                                                    <p>{objShipmentOrder.ReceiverFullName}</p>
                                                                                                    <p>{objShipmentOrder.ReceiverFullAddress}</p>
                                                                                                    <p>{objShipmentOrder.Weight}</p>
                                                                                                </div>
                                                                                            }
                                                                                            title={objShipmentOrder.PartnerSaleOrderID}>
                                                                                            <div style={{ width: "16px", height: "16px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                                                                                                {
                                                                                                    objShipmentOrder.IsCompleteDeliverIed ?
                                                                                                        <div
                                                                                                            style={{ position: "relative", width: "12px", height: "12px", border: `3px solid ${randomColor}`, backgroundColor: `${randomColor}`, borderRadius: "50%", cursor: "pointer" }}
                                                                                                        >
                                                                                                            <div style={{ position: "absolute", top: "10px", left: "50%", transform: "translateX(-50%)" }}>{i}</div>
                                                                                                        </div> :
                                                                                                        <div
                                                                                                            style={{ position: "relative", width: "12px", height: "12px", border: `3px solid ${randomColor}`, backgroundColor: "white", borderRadius: "50%", cursor: "pointer" }}
                                                                                                        >
                                                                                                            <div style={{ position: "absolute", top: "10px", left: "50%", transform: "translateX(-50%)" }}>{i}</div>
                                                                                                        </div>
                                                                                                }
                                                                                            </div>
                                                                                        </Popover>
                                                                                        : <div style={{ width: "16px", height: "16px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                                                                                            {
                                                                                                <div
                                                                                                    style={{ position: "relative", width: "12px", height: "12px", border: `3px solid ${randomColor}`, backgroundColor: `${randomColor}`, borderRadius: "50%", cursor: "pointer" }}
                                                                                                >
                                                                                                    <div style={{ position: "absolute", top: "10px", left: "50%", transform: "translateX(-50%)" }}>0</div>
                                                                                                </div>
                                                                                            }
                                                                                        </div>
                                                                                }
                                                                            </div>
                                                                        ))
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div style={{ width: "10%", textAlign: "right", paddingTop: "18px" }}>
                                                                <Tooltip title="Xem bản đồ">
                                                                    <Button type="primary" shape="circle" icon={<EyeOutlined />} onClick={() => this.handleShowModalMapTruckRoute(index)} />
                                                                </Tooltip>&nbsp;
                                                                <Tooltip title="Phân tuyến">
                                                                    <Button type="primary" shape="circle" icon={<PartitionOutlined />} />
                                                                </Tooltip>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </Tabs.TabPane> */}

                            <Tabs.TabPane tab="Đơn chưa điều phối" key="3">
                                {
                                    this.state.dataSource.ListDroppedShipmentOrder.map(item => <div>{item.PartnerSaleOrderID}</div>)
                                }
                            </Tabs.TabPane>
                        </Tabs>
                    </div>
                }

                < input type="file" id="buttonImportFile" style={{ display: "none" }} />

                {this.state.isShowModalMap && <ModalVietBanDoShipmentRouteAuto ListShipmentOrder={this.state.dataSourceMap} onClose={() => this.setState({ isShowModalMap: false })} />}
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
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchCom);