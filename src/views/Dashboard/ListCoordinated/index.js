import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { callFetchAPI } from "../../../actions/fetchAPIAction";
import { formatDate } from "../../../common/library/CommonLib.js";
import { formatMoney } from '../../../utils/function';

class ListCoordinatedCom extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
    }
    _genCommentTime(dates) {
        const date = new Date(Date.parse(dates));
        //let currentDate = new Date();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let timeDisplay = (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute)
        let month = date.getMonth() + 1;
        return date.getDate() + '/' + (month < 10 ? '0' + month : month) + '/' + date.getFullYear() + " " + timeDisplay;
        // var timeDiff = Math.abs(currentDate.getTime() - date.getTime());
        // var diffDays = currentDate.getDate() - date.getDate();
        // var diffMinutes = parseInt((timeDiff / (3600 * 24)));

        // if (diffDays < 1 && diffDays > -1) {
        //     if (diffMinutes < 120) {
        //         return 'Cần giao gấp (' + timeDisplay + ')';
        //     }
        //     else {
        //         return 'Hôm nay ' + timeDisplay;
        //     }
        // } else if (diffDays == 1) {
        //     return 'Hôm qua ' + timeDisplay;
        // } else {
        //     let month = date.getMonth() + 1;
        //     return date.getDate() + '/' + (month < 10 ? '0' + month : month) + '/' + date.getFullYear() + " " + timeDisplay;
        // }
    }
    _genCommentCarrierPartner(CarrierTypeID, CarrierTypeName) {
        if (CarrierTypeID < 1) {

            return (<label className="item vehicle"><span>Chưa chọn phương tiện</span></label>)

        } else if (CarrierTypeID == 1) {
            return (<label className="item vehicle">
                <i className="fa fa-motorcycle"></i>
                <span>{CarrierTypeName}</span>
            </label>
            );
        }
        else {
            return (<label className="item vehicle">
                <i className="fa fa-truck"></i>
                <span>{CarrierTypeName}</span>
            </label>
            );
        }

    }
    getDisplayData(dataSource) {
        let resultData = [];
        if (dataSource.length < 1 || dataSource == null) {
            return resultData;
        }
        else {
            dataSource.sort((a, b) => (a.ExpectedDeliveryDate < b.ExpectedDeliveryDate) ? 1 : -1)
            let rowindex = 10
            if (dataSource.length < 10)
                rowindex = dataSource.length
            for (let i = 0; i < rowindex; i++) {
                resultData.push(dataSource[i]);
            }
            return resultData;
        }
    }

    render() {
        const dataSource = this.props.DataSource.filter(n => n.CoordinatorUser == "");
        return (
            <div className="col-lg-12">
                <div className="card shadow-1">
                    <div className="card-header">
                        <h5 className="card-title">Danh sách vận đơn chưa điều phối</h5>
                    </div>
                    <div className="card-body">
                        <div className=" table-responsive">
                            <table className="table table-sm table-striped table-bordered table-hover table-condensed" cellSpacing="0" >
                                <thead className="thead-light">
                                    <tr>
                                        <th className="jsgrid-header-cell" style={{ width: 190, minWidth: 190 }} >Thời gian giao</th>
                                        <th className="jsgrid-header-cell" style={{ width: 300, minWidth: 350 }}>Địa chỉ</th>
                                        <th className="jsgrid-header-cell" style={{ width: 200 }}>Mã/Loại yêu cầu vận chuyển</th>
                                        <th className="jsgrid-header-cell" style={{ width: 250, minWidth: 200 }} >Ghi chú</th>
                                        <th className="jsgrid-header-cell" style={{ width: 150, minWidth: 150 }} >COD/Vật tư/Tổng tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataSource.length > 0 &&
                                        dataSource.map((rowItem, rowIndex) => {
                                            let rowClass = "jsgrid-row";
                                            if (index % 2 != 0) {
                                                rowClass = "jsgrid-alt-row";
                                            }
                                            // console.log("check",rowItem.ShipmentOrderID,this.state.GridDataShip,this.state.GridDataShip.some(n => n.ShipmentOrderID == rowItem.ShipmentOrderID))
                                            return (<tr key={rowIndex}>

                                                <td className="groupInfoAction">
                                                    <div className="group-info-row">
                                                        <label className="item time">
                                                            <i className="ti ti-timer"></i>
                                                            <span>{rowItem.ExpectedDeliveryDate != null ? this._genCommentTime(rowItem.ExpectedDeliveryDate) : ""}</span>
                                                        </label>
                                                        <label className="item status">
                                                            <i className="fa fa-location-arrow"></i>
                                                            <span>{rowItem.ShipmentOrderStatusName}</span>
                                                        </label>
                                                        <label className="item vehicle">
                                                            {
                                                                this._genCommentCarrierPartner(rowItem.CarrierTypeID, rowItem.CarrierTypeName)
                                                            }
                                                        </label>
                                                    </div>
                                                </td>
                                                <td className="group-address">
                                                    <div className="group-info-row">
                                                        <label className="item person">
                                                            <i className="fa fa-user"></i>
                                                            <span className="person-info">
                                                                <span className="name">
                                                                    {rowItem.ReceiverFullName}
                                                                </span>
                                                                <span className="line">-</span>
                                                                <span className="phone">({rowItem.ReceiverPhoneNumber.substr(0, 6)}****)</span>
                                                            </span>
                                                        </label>
                                                        <label className="item address-receiver">
                                                            <span>{rowItem.ReceiverFullAddress}</span>
                                                        </label>
                                                        <label className="item address-repository-created">
                                                            <span>
                                                                {rowItem.SenderFullName}
                                                            </span>
                                                        </label>
                                                        <label className="item creacte-time">
                                                            <i className="ti ti-timer"></i>
                                                            <span className="times">
                                                                <span className="item pull-left">Tạo lúc: </span>
                                                                <span className="item pull-right"> {formatDate(rowItem.CreatedOrderTime)}</span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="group-info-row">
                                                        <label className="item person">
                                                            <span className="person-info" style={{ fontSize: 15 }}>
                                                                <Link to={"/ShipmentOrder/Detail/" + rowItem.ShipmentOrderID}>{rowItem.ShipmentOrderID}</Link>
                                                            </span>
                                                        </label>
                                                        <label className="item address-receiver">
                                                            <span>{rowItem.ShipmentOrderTypeName}</span>
                                                        </label>
                                                    </div>
                                                </td>
                                                <td>{rowItem.OrderNote.split("-")[0]}</td>
                                                <td className="group-price">
                                                    <div className="group-row">
                                                        <span className="item pricecod"> {formatMoney(rowItem.TotalCOD, 0)}</span>
                                                        <span className="item price-supplies">{formatMoney(rowItem.TotalSaleMaterialMoney, 0)}</span>
                                                        {rowItem.IsCollectedMoney == true ?
                                                            (
                                                                <span className="item price3 price-success">
                                                                    <span className="price-title ">Đã thu: </span>
                                                                    <span className="price-debt">{formatMoney(rowItem.CollectedTotalMoney, 0)}</span>
                                                                </span>
                                                            ) :
                                                            (
                                                                <span className="item price3">
                                                                    <span className="price-title">Nợ: </span>
                                                                    <span className="price-debt">-{formatMoney(rowItem.TotalSaleMaterialMoney + rowItem.TotalCOD, 0)}</span>
                                                                </span>
                                                            )
                                                        }
                                                    </div>
                                                </td>
                                            </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        }
    }
}

const ListCoordinated = connect(mapStateToProps, mapDispatchToProps)(ListCoordinatedCom);
export default ListCoordinated;