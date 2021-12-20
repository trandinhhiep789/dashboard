import React from "react";
import { connect } from "react-redux";
import ReactNotification from "react-notifications-component";
import readXlsxFile from 'read-excel-file';
import { Button, Popover } from "antd";

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
                        ReceiverFullName: item.RECEIVERFULLADDRESS ? item.RECEIVERFULLADDRESS : "",
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
        console.log(index);
        this.setState({ dataSourceMap: this.state.dataSource.ListShipmentOrderRoute[index], isShowModalMap: true })
    }

    render() {
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
                    this.state.dataSource != null && <div style={{ width: "100%", backgroundColor: "white", padding: "20px", minHeight: "50vh", border: "1px solid blue" }}>
                        <h4>Danh sách các tuyến đề xuất</h4>
                        {this.state.dataSource.ListShipmentOrderRoute.map((line, index) => (
                            <div key={index}>
                                <div>
                                    {`Tổng quảng đường: ${this.state.dataSource.ListTotalDistance[index]}m, tổng khối lượng: ${this.state.dataSource.ListTotalLoad[index]}kg`}
                                </div>

                                <div style={{ display: "flex", width: "100%" }}>
                                    <div style={{ display: "flex", height: "9px", width: "90%", justifyContent: "space-between", borderBottom: `3px solid ${this.state.pickRandomColor[Math.floor(Math.random() * 11)]}`, marginBottom: "30px" }}>
                                        {line.map((item) =>
                                            <Popover
                                                key={item.ShipmentOrderID}
                                                content={`Cân nặng: ${item.Weight}`}
                                                title={`Mã vận đơn ${item.ShipmentOrderID}`}>
                                                <div style={{ position: "relative", width: '12px', height: '12px', border: `3px solid #1f5ff4`, backgroundColor: `#1f5ff4`, borderRadius: '50%', cursor: "pointer" }}>
                                                    <div style={{ position: "absolute", top: "10px", left: "50%", transform: "translateX(-50%)" }}>
                                                        {item.ShipmentOrderID}
                                                    </div>
                                                </div>
                                            </Popover>)
                                        }
                                    </div>
                                    <div style={{ width: "10%", textAlign: "right" }}>
                                        <Button type="primary" size="small" onClick={() => this.handleShowModalMap(index)}>Xem bản đồ</Button>
                                    </div>
                                </div>
                            </div>
                        ))}

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