import React from "react";
import { connect } from "react-redux";
import ReactNotification from "react-notifications-component";
import readXlsxFile from 'read-excel-file';
import { Button, Popover, Tooltip } from "antd";
import { EyeOutlined, PartitionOutlined } from "@ant-design/icons";

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import ModalVietBanDoShipmentRouteAuto from "../../ShipmentRouteAuto/Components/ModalVietBanDoShipmentRouteAuto";

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
        this.handleShowModalMap = this.handleShowModalMap.bind(this);
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
            'ACTUALRECEIVERGEOLOCATION': {
                prop: 'ACTUALRECEIVERGEOLOCATION',
                type: String,
            },
            'SHIPMENTORDERID': {
                prop: 'SHIPMENTORDERID',
                type: String,
            },
            'RECEIVERFULLNAME': {
                prop: 'RECEIVERFULLNAME',
                type: String,
            },
            'RECEIVERFULLADDRESS': {
                prop: 'RECEIVERFULLADDRESS',
                type: String,
            },
            'WEIGHT': {
                prop: 'WEIGHT',
                type: Number,
            },
            'LENGTH': {
                prop: 'LENGTH',
                type: Number,
            },
            'WIDTH': {
                prop: 'WIDTH',
                type: Number,
            },
            'HEIGHT': {
                prop: 'HEIGHT',
                type: Number,
            },
        }

        const input = document.getElementById('buttonImportFile');
        input.click();

        input.addEventListener("change", () => {
            readXlsxFile(input.files[0], { sheet: "data", schema }).then((data) => {
                console.log(data.rows)
                const input = data.rows.map(item => {
                    return {
                        ShipmentOrderID: item.SHIPMENTORDERID ? item.SHIPMENTORDERID : 0,
                        ReceiverGeoLocation: item.ACTUALRECEIVERGEOLOCATION,
                        ReceiverFullName: item.RECEIVERFULLNAME ? item.RECEIVERFULLNAME : "",
                        ReceiverPhoneNumber: item.RECEIVERPHONENUMBER ? item.RECEIVERPHONENUMBER : "",
                        ReceiverFullAddress: item.RECEIVERFULLADDRESS ? item.RECEIVERFULLADDRESS : "",
                        Weight: item.WEIGHT ? item.WEIGHT : 0,
                        Length: item.LENGTH ? item.LENGTH : 0,
                        Width: item.WIDTH ? item.WIDTH : 0,
                        Height: item.HEIGHT ? item.HEIGHT : 0
                    }
                })

                console.log("input", input);

                this.props.callFetchAPI("TMSAPI", "api/test/VehicleRouting", input).then(apiResult => {
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

    handleShowModalMap(index) {
        this.setState({ dataSourceMap: this.state.dataSource.ListShipmentOrderRoute[index], isShowModalMap: true })
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
                    this.state.dataSource != null && <div style={{ width: "100%", backgroundColor: "white", padding: "20px", height: "57vh", overflow: "auto", border: "1px solid #0000ff3d", marginBottom: "15px" }}>
                        <h4>Danh sách các tuyến đề xuất</h4>
                        <h5>Tổng cộng số km các tuyến: <i style={{ fontWeight: "700" }}>{parseInt(this.state.dataSource.TotalDistance / 1000)}</i> km</h5>
                        <div style={{ width: "100%", backgroundColor: "white", padding: "20px", height: "60vh", overflow: "auto", border: "1px solid #0000ff3d", marginBottom: "15px" }}>
                            {
                                this.state.dataSource.ListShipmentOrderRoute && this.state.dataSource.ListShipmentOrderRoute.map((line, index) => (
                                    <div key={index}>
                                        <p style={{ display: "none" }}>{(randomColor = this.state.pickRandomColor[Math.floor(Math.random() * 11)])}</p>
                                        <div style={{ display: "flex" }}>
                                            <span style={{ fontWeight: "700", fontSize: "15px" }}>
                                                {index}
                                            </span>&ensp;
                                            <div style={{ display: "flex", width: "100%", marginBottom: "12px" }}>
                                                <div style={{ width: "90%", marginBottom: "30px" }}>
                                                    <div>
                                                        <i>Số km: {parseInt(this.state.dataSource.ListTotalDistance[index] / 1000)}</i>&ensp;
                                                        <i>Tổng khối lượng: {this.state.dataSource.ListTotalLoad[index]}</i>
                                                    </div>
                                                    <div style={{ display: "flex" }}>
                                                        {
                                                            this.state.dataSource.ListShipmentOrderRoute[index].map((objShipmentOrder, i) => (
                                                                <div key={objShipmentOrder.ShipmentOrderID} style={{ display: "flex", width: i != 0 && "100%" }}>
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
                                                                                    </div>
                                                                                }
                                                                                title={objShipmentOrder.ShipmentOrderID}>
                                                                                <div style={{ width: "16px", height: "16px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                                                                                    {
                                                                                        objShipmentOrder.IsCompleteDeliverIed ?
                                                                                            <div
                                                                                                style={{ position: "relative", width: "12px", height: "12px", border: `3px solid ${randomColor}`, backgroundColor: `${randomColor}`, borderRadius: "50%", cursor: "pointer" }}
                                                                                            >
                                                                                                <div style={{ position: "absolute", top: "10px", left: "50%", transform: "translateX(-50%)" }}>{objShipmentOrder.ShipmentOrderID}</div>
                                                                                            </div> :
                                                                                            <div
                                                                                                style={{ position: "relative", width: "12px", height: "12px", border: `3px solid ${randomColor}`, backgroundColor: "white", borderRadius: "50%", cursor: "pointer" }}
                                                                                            >
                                                                                                <div style={{ position: "absolute", top: "10px", left: "50%", transform: "translateX(-50%)" }}>{objShipmentOrder.ShipmentOrderID}</div>
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
                                                        <Button type="primary" shape="circle" icon={<EyeOutlined />} onClick={() => this.handleShowModalMap(index)} />
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