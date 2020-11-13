import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { formatMoney } from '../../../../utils/function';

class DataGirdReportShipmentOrderCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: this.props.dataSource,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.dataSource) !== JSON.stringify(nextProps.dataSource)) {
            this.setState({
                dataSource: nextProps.dataSource
            })
        }

    }

    _genCommentTime(dates) {
        const date = new Date(Date.parse(dates));
        //let currentDate = new Date();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let timeDisplay = (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute)
        let month = date.getMonth() + 1;
        return date.getDate() + '/' + (month < 10 ? '0' + month : month) + '/' + date.getFullYear() + " " + timeDisplay;
    }


    render() {
        const { dataSource } = this.state;
        return (
            <div className="col-12 mt-30">
                <div className="table-responsive">
                    <table className="table table-sm table-striped table-bordered table-hover table-condensed dataGirdReportShipment" cellSpacing="0">
                        <thead className="thead-light">
                            <tr>
                                <th className="jsgrid-header-cell " style={{ width: '20%' }}>Mã vận đơn</th>
                                <th className="jsgrid-header-cell " style={{ width: '25%' }}>Khách hàng/địa chỉ</th>
                                <th className="jsgrid-header-cell " style={{ width: '20%' }}>Sản Phẩm</th>
                                <th className="jsgrid-header-cell " style={{ width: '15%' }}>Thời gian giao</th>
                                <th className="jsgrid-header-cell " style={{ width: '10%' }}>Tiền COD</th>
                                <th className="jsgrid-header-cell " style={{ width: '10%' }}>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataSource != null &&
                                dataSource.map((rowItem, rowIndex) => {
                                    return (<tr key={rowIndex}>
                                        <td style={{ width: '20%' }}>

                                            <div className="group-info-row">
                                                <label className="item fullName-receiver">
                                                    <Link target="_blank" className="txtlink" to={"/ShipmentOrder/Detail/" + rowItem.ShipmentOrderID}>{rowItem.ShipmentOrderID}</Link>
                                                </label>
                                                <label className="item address-receiver">
                                                    <span>{rowItem.ShipmentOrderTypeName}</span>
                                                </label>
                                            </div>
                                        </td>
                                        <td className="group-address" style={{ width: '25%' }}>
                                            <div className="group-info-row">
                                                <label className="item fullName-receiver">
                                                    <span>{rowItem.ReceiverFullName}</span>
                                                </label>
                                                <label className="item address-receiver">
                                                    <span>{rowItem.ReceiverFullAddress}</span>
                                                </label>
                                            </div>
                                        </td>
                                        <td className="group-productlist" style={{ width: '20%' }}>
                                            <div className="group-info-row">
                                                <label className="item product">
                                                    <span >{rowItem.ShipItemNameList == "" ? rowItem.PrimaryShipItemName : ReactHtmlParser(rowItem.ShipItemNameList.replace(';', '<br/>'))}</span>
                                                </label>
                                            </div>
                                        </td>
                                        <td className="group-address" style={{ width: '15%' }}>
                                            <div className="group-info-row">
                                                <label className="item fullName-receiver">
                                                    <span>{rowItem.ExpectedDeliveryDate != null ? this._genCommentTime(rowItem.ExpectedDeliveryDate) : ""}</span>
                                                </label>
                                                <label className="item address-receiver">
                                                    <span>{rowItem.CarrierTypeName}</span>
                                                </label>
                                            </div>
                                        </td>
                                        <td style={{ width: '10%' }}>{formatMoney(rowItem.TotalCOD, 0)}</td>
                                        <td style={{ width: '10%' }}>{rowItem.ShipmentOrderStatusName}</td>
                                    </tr>)
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        );
    }
}
const mapStateToProps = state => {
    return {
        AppInfo: state,
        FetchAPIInfo: state.FetchAPIInfo
    }
}
const mapDispatchToProps = dispatch => {
    return {
    }
}
const DataGirdReportShipmentOrder = connect(mapStateToProps, mapDispatchToProps)(DataGirdReportShipmentOrderCom);
export default DataGirdReportShipmentOrder;