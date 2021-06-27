import React, { Component } from "react";
import { connect } from 'react-redux';
import { formatMoney } from '../../../../utils/function';
import { showModal, hideModal } from '../../../../actions/modal';
import { MODAL_TYPE_COMMONTMODALS } from '../../../../constants/actionTypes';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import Collapsible from 'react-collapsible';
import { Link } from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import { formatDate } from "../../../../common/library/CommonLib.js";
import {
    APIHostName,
} from "../constants";
class InfoProductCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ShipmentOrder: this.props.InfoProduct,
            ShipmentOrder_FeeLst: [],
            ShipmentOrder_CodUpdLogLst: []
        }

        this.groupArrayOfObjects = this.groupArrayOfObjects.bind(this)
        this.sortDataShipmentOrderItemList = this.sortDataShipmentOrderItemList.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.InfoProduct) !== JSON.stringify(nextProps.InfoProduct)) {
            this.setState({
                ShipmentOrder: nextProps.InfoProduct
            })
        }
    }

    groupBy(data, fields, sumBy = 'Quantity') {
        let r = [], cmp = (x, y) => fields.reduce((a, b) => a && x[b] == y[b], true);
        data.forEach(x => {
            let y = r.find(z => cmp(x, z));
            let w = [...fields, sumBy].reduce((a, b) => (a[b] = x[b], a), {})
            y ? y[sumBy] = +y[sumBy] + (+x[sumBy]) : r.push(w);
        });
        return r;
    }

    Pricevat(sl, Price) {
        let r = Price * sl
        return r;
    }

    groupByNew(data, fields, sumBy = 'Quantity') {
        let r = [], cmp = (x, y) => fields.reduce((a, b) => a && x[b] == y[b], true);
        data.forEach(x => {
            let y = r.find(z => cmp(x, z));
            let w = [...fields, sumBy].reduce((a, b) => (a[b] = x[b], a), {})
            y ? y[sumBy] = +y[sumBy] + (+x[sumBy]) : r.push(w);
        });
        return r;
    }

    handleShowTotalSaleMaterialMoney() {
        const postData = [
            {
                SearchKey: "@SHIPMENTORDERID",
                SearchValue: this.props.ShipmentOrderID
            }
        ];

        this.props.callFetchAPI(APIHostName, 'api/ShipmentOrder_Fee/SearchByShipmentOrderID', postData).then((apiResult) => {
            if (!apiResult.IsError) {

                this.setState({ ShipmentOrder_FeeLst: apiResult.ResultObject }, () => {
                    this.showModalFeeLst();
                });
            }
        });
    }

    showModalFeeLst() {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Thông tin phí dịch vụ vận chuyển',
            content: {
                text:
                    <div className="col-lg-12">
                        <div className="table-responsive mt-3">
                            <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                <thead className="thead-light">
                                    <tr>
                                        <th className="jsgrid-header-cell">Mã </th>
                                        <th className="jsgrid-header-cell">Loại phí dịch vụ</th>
                                        <th className="jsgrid-header-cell">Mã sản phẩm</th>
                                        <th className="jsgrid-header-cell">Tên sản phẩm</th>
                                        <th className="jsgrid-header-cell">Phí dịch vụ</th>
                                        <th className="jsgrid-header-cell">Ghi chú</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.ShipmentOrder_FeeLst && this.state.ShipmentOrder_FeeLst.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{item.ShipmentOrderID}</td>
                                                    <td>{item.ShipmentFeeTypeName}</td>
                                                    <td>{item.ProductID}</td>
                                                    <td>{item.ProductName}</td>
                                                    <td>{item.Fee}</td>
                                                    <td>{item.Note}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
            },
            maxWidth: '1000px'
        });

    }


    handleShowCodUpdLog() {
        const postData = [
            {
                SearchKey: "@SHIPMENTORDERID",
                SearchValue: this.props.ShipmentOrderID.Trim()
            }
        ];

        this.props.callFetchAPI(APIHostName, 'api/ShipmentOrder_CodUpdLog/SearchBYSHIPID', postData).then((apiResult) => {
            if (!apiResult.IsError) {
                this.setState({ ShipmentOrder_CodUpdLogLst: apiResult.ResultObject }, () => {
                    this.showModalCodUpdLogLst();
                });
            }
        });
    }

    showModalCodUpdLogLst() {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Lịch sử cập nhật tiền thu hộ',
            content: {
                text:
                    <div className="col-lg-12">
                        <div className="table-responsive mt-3">
                            <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                <thead className="thead-light">
                                    <tr>
                                        <th className="jsgrid-header-cell">Ngày cập nhật</th>
                                        <th className="jsgrid-header-cell">Người cập nhật</th>
                                        <th className="jsgrid-header-cell">Tổng tiền thu hộ cũ</th>
                                        <th className="jsgrid-header-cell">Tổng tiền thu hộ mới</th>
                                        <th className="jsgrid-header-cell">Mã giao dịch với đối tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.ShipmentOrder_CodUpdLogLst && this.state.ShipmentOrder_CodUpdLogLst.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{formatDate(item.CreatedDate)}</td>
                                                    <td>{item.CreatedUser + "-" + item.CreatedUserFullName}</td>
                                                    <td>{formatMoney(item.OldTotalcod, 0)}</td>
                                                    <td>{formatMoney(item.NewTotalcod, 0)}</td>
                                                    <td><Link target="_blank" to={"/PartnerTransaction/Edit/" + item.PartnerTransactionID}>{item.PartnerTransactionID}</Link></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
            },
            maxWidth: '1000px'
        });
    }

    groupArrayOfObjects(list, key) {
        try {
            return list.reduce(function (rv, x) {
                (rv[x[key].trim()] = rv[x[key].trim()] || []).push(x)
                return rv
            }, {});
        } catch (error) {
            return {}
        }
    }

    sortDataShipmentOrderItemList(data) {
        let tempData1 = [...data];
        const paramGroup = ['ProductID', 'ProductName', 'ProductSerial', 'QuantityUnitName', 'Price', 'IsInstallItem', 'PackingUnitName', 'SizeItem', 'Weight'];

        try {
            if (data.length == 1) {
                return data;
            }

            tempData1.sort((a, b) => parseFloat(b.Price) - parseFloat(a.Price));

            let tempIndex = [];

            const result = tempData1.reduce((acc, val, ind, arr) => {
                if (val.Price != 0) {

                    let promotionItem = tempData1.reduce((acc1, val1, ind1, arr1) => {
                        if (val1.RelateProductID.trim() == val.ProductID.trim() && tempIndex.indexOf(ind1) == -1) {
                            tempIndex.push(ind1);
                            return [...acc1, val1];
                        } else {
                            return acc1;
                        }
                    }, []);

                    return [...acc, val, ...promotionItem];
                } else {
                    return acc;
                }
            }, []);

            if (result.length != data.length) {
                return data;
            } else {
                return this.groupBy(result, paramGroup)
            }

        } catch (error) {
            return data;
        }
    }


    render() {

        let objgroupByInstallBundleID = [];

        if (this.state.ShipmentOrder.ShipmentOrder_Material2List != undefined && this.state.ShipmentOrder.ShipmentOrder_Material2List.length > 0) {
            objgroupByInstallBundleID = this.groupByNew(this.state.ShipmentOrder.ShipmentOrder_Material2List, ['InstallProductID', 'InstallProductName']);
        }
        return (
            <React.Fragment>
                <Collapsible trigger="Thông tin vận đơn" easing="ease-in" open={false}>
                    <div className="card-body">
                        <div className="form-row">
                            <div className="form-group col-md-2">
                                <label className="col-form-label bold">Loại hàng hóa:</label>
                            </div>
                            <div className="form-group col-md-4">
                                <label className="col-form-label" >{this.state.ShipmentOrder.ShipmentGoodsDescription}</label>
                            </div>
                            <div className="form-group col-md-2">
                                <label className="col-form-label bold">Tổng số kiện:</label>
                            </div>
                            <div className="form-group col-md-4">
                                <label className="col-form-label">{this.state.ShipmentOrder.NumberOfPackages}</label>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-2">
                                <label className="col-form-label bold">Tổng khối lượng:</label>
                            </div>
                            <div className="form-group col-md-4">
                                <label className="col-form-label" >{this.state.ShipmentOrder.Weight}kg</label>
                            </div>
                            <div className="form-group col-md-2">
                                <label className="col-form-label bold">Tổng kích thước(DxRxC):</label>
                            </div>
                            <div className="form-group col-md-4">
                                <label className="col-form-label">{this.state.ShipmentOrder.Length}x{this.state.ShipmentOrder.Width}x{this.state.ShipmentOrder.Height}m</label>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-2">
                                <label className="col-form-label bold">Mã chương trình bán hàng:</label>
                            </div>
                            <div className="form-group col-md-4">
                                <label className="col-form-label lbl-currency">
                                    {this.state.ShipmentOrder.SaleProgramID}
                                </label>
                            </div>
                            <div className="form-group col-md-2">
                                <label className="col-form-label bold">Mã đối tác cung cấp dịch vụ trả góp(Công ty tài chính):</label>
                            </div>
                            <div className="form-group col-md-4">
                                <label className="col-form-label lbl-currency">
                                    {this.state.ShipmentOrder.InstalmentPartnerID}
                                </label>
                            </div>
                        </div>

                        <div className="form-row">

                            <div className="form-group col-md-2">
                                <label className="col-form-label bold">Tổng tiền COD:</label>
                            </div>
                            <div className="form-group col-md-4">
                                <label className="col-form-label lbl-currency">
                                    {formatMoney(this.state.ShipmentOrder.TotalCOD, 0)}đ

                                </label>
                                <button className="btn btn-icon-modal" onClick={this.handleShowCodUpdLog.bind(this)}>
                                    <i className="fa fa-eye"></i>
                                </button>
                            </div>
                            <div className="form-group col-md-2">
                                <label className="col-form-label bold">Xem thông tin phí dịch vụ:</label>
                            </div>
                            <div className="form-group col-md-4">
                                <button className="btn btn-icon-modal" onClick={this.handleShowTotalSaleMaterialMoney.bind(this)}>
                                    <i className="fa fa-eye"></i>
                                </button>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-2">
                                <label className="col-form-label bold">Tổng tiền bán vật tư:</label>
                            </div>
                            <div className="form-group col-md-4">
                                <label className="col-form-label lbl-currency">{formatMoney(this.state.ShipmentOrder.TotalSaleMaterialMoney, 0)}đ</label>
                            </div>
                            <div className="form-group col-md-2">
                                <label className="col-form-label bold">Thu tiền khách hàng:</label>
                            </div>
                            <div className="form-group col-md-4">
                                {this.state.ShipmentOrder.IsCollectedMoney == true ? <span className="badge badge-success">Đã thu tiền</span> : <span className="badge badge-danger">Chưa thu tiền</span>}
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-2">
                                <label className="col-form-label bold">Tổng tiền nhập trả:</label>
                            </div>
                            <div className="form-group col-md-4 lineTotal">
                                <label className="col-form-label lbl-currency">{formatMoney(this.state.ShipmentOrder.TotalReturnPrice, 0)}đ</label>
                            </div>
                            <div className="form-group col-md-2">
                                <label className="col-form-label bold">Tổng đã tiền thu khách hàng:</label>
                            </div>
                            <div className="form-group col-md-4">
                                <label className="col-form-label">
                                    {this.state.ShipmentOrder.IsCollectedMoney == true ? <span className="badge badge-success">{formatMoney(this.state.ShipmentOrder.CollectedTotalMoney, 0)}đ</span> : <span className="badge badge-danger">{formatMoney(this.state.ShipmentOrder.CollectedTotalMoney, 0)}đ</span>}
                                </label>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-2">
                                <label className="col-form-label bold">Tổng tiền phải thu:</label>
                            </div>
                            <div className="form-group col-md-4">
                                <label className="col-form-label lbl-currency-total" >{formatMoney((this.state.ShipmentOrder.TotalSaleMaterialMoney + this.state.ShipmentOrder.TotalCOD) - this.state.ShipmentOrder.TotalReturnPrice, 0)}đ</label>
                            </div>
                            <div className="form-group col-md-2">
                                <label className="col-form-label bold">Thời gian xuất:</label>
                            </div>
                            <div className="form-group col-md-4">
                                <label className="col-form-label bold">{formatDate(this.state.ShipmentOrder.OutputGoodsDate)}</label>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-2">
                                <label className="col-form-label bold">Nộp tiền thu ngân:</label>
                            </div>
                            <div className="form-group col-md-4">
                                {(this.state.ShipmentOrder.TotalSaleMaterialMoney + this.state.ShipmentOrder.TotalCOD - this.state.ShipmentOrder.TotalReturnPrice) > 0 ?
                                    this.state.ShipmentOrder.IsPaidIn == true ? <span className="badge badge-success">Đã nộp tiền thu ngân</span> : <span className="badge badge-danger">Chưa nộp tiền</span> : ""
                                }
                            </div>
                            <div className="form-group col-md-2">
                                <label className="col-form-label bold">Người xuất:</label>
                            </div>
                            <div className="form-group col-md-4">
                                <label className="col-form-label bold">{this.state.ShipmentOrder.OutputGoodsUser + "-" + this.state.ShipmentOrder.OutputGoodsUserFull}</label>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-2">
                                <label className="col-form-label bold"> Thông tin xuất:</label>
                            </div>
                            <div className="form-group col-md-2">
                                {this.state.ShipmentOrder.IsOutputGoods == true ? <span className="badge badge-success">Đã xuất hàng</span> : <span className="badge badge-danger">Chưa xuất hàng </span>}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-2">
                                <label className="col-form-label bold">Ghi chú:</label>
                            </div>
                            <div className="form-group col-md-10">
                                <label className="col-form-label" >{this.state.ShipmentOrder.OrderNote}</label>
                            </div>
                        </div>
                    </div>
                </Collapsible>

                <Collapsible trigger="Danh sách hàng hóa" easing="ease-in" open={true}>
                    <div className="card-body">
                        <div className="form-row">
                            <div className="table-responsive">
                                <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                    <thead className="thead-light">
                                        <tr>
                                            <th className="jsgrid-header-cell" style={{ width: "6%" }}>Cần lắp đặt</th>
                                            <th className="jsgrid-header-cell" style={{ width: "10%" }}>Mã sản phẩm</th>
                                            <th className="jsgrid-header-cell" style={{ width: "36%" }}>Sản phẩm</th>
                                            <th className="jsgrid-header-cell" style={{ width: "12%" }}>Serial/IMEI</th>
                                            <th className="jsgrid-header-cell" style={{ width: "8%" }}>Kiện</th>
                                            <th className="jsgrid-header-cell" style={{ width: "8%" }}>Giá</th>
                                            <th className="jsgrid-header-cell" style={{ width: "8%" }}>Số lượng</th>
                                            <th className="jsgrid-header-cell" style={{ width: "12%" }}>Đơn vị tính</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.ShipmentOrder.ShipmentOrder_ItemList
                                            && this.sortDataShipmentOrderItemList(this.state.ShipmentOrder.ShipmentOrder_ItemList).map((item, index) => {
                                                return <tr key={"Product" + index} className={parseFloat(item.Price) != 0 ? "row-main-product" : undefined}>
                                                    <td>
                                                        <div className="checkbox">
                                                            <label>
                                                                <input type="checkbox" readOnly className="form-control form-control-sm" checked={item.IsInstallItem} />
                                                                <span className="cr">
                                                                    <i className="cr-icon fa fa-check"></i>
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td>{item.ProductID}</td>
                                                    <td>{item.ProductName}</td>
                                                    <td>{item.ProductSerial}</td>
                                                    <td>{item.PackingUnitName}</td>
                                                    <td>{formatMoney(item.Price, 0)}đ</td>
                                                    <td>{item.Quantity}</td>
                                                    <td>{item.QuantityUnitName}</td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {this.state.ShipmentOrder.ReturnItemList.length > 0 ?
                            (<div className="form-row">
                                <div className="col-md-12">
                                    <h3 className="title">Danh sách sản phẩm trả lại</h3>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                        <thead className="thead-light">
                                            <tr>
                                                <th className="jsgrid-header-cell" style={{ width: "10%" }}>Mã sản phẩm</th>
                                                <th className="jsgrid-header-cell" style={{ width: "25%" }}>Sản phẩm</th>
                                                <th className="jsgrid-header-cell" style={{ width: "10%" }}>Serial/IMEI</th>
                                                <th className="jsgrid-header-cell" style={{ width: "7%" }}>Số lượng trả</th>
                                                <th className="jsgrid-header-cell" style={{ width: "8%" }}>Giá</th>
                                                <th className="jsgrid-header-cell" style={{ width: "6%" }}>Đã trả hàng</th>
                                                <th className="jsgrid-header-cell" style={{ width: "8%" }}>Mã trả hàng</th>
                                                <th className="jsgrid-header-cell" style={{ width: "10%" }}>Ngày trả hàng</th>
                                                <th className="jsgrid-header-cell" style={{ width: "13%" }}>Ghi chú</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.ShipmentOrder.ReturnItemList && this.state.ShipmentOrder.ReturnItemList.map((item, index) => {
                                                    return (
                                                        <tr key={"ReturnItem" + index}>
                                                            <td>{item.ProductID}</td>
                                                            <td>{item.ProductName}</td>
                                                            <td>{item.ProductSerial}</td>
                                                            <td>{item.Quantity}</td>
                                                            <td>{formatMoney(item.ReturnPrice, 0)}đ</td>
                                                            <td>{item.IsCreatedInputVoucherReturn == true ? <span className="fa fa-check"></span> : ""}</td>
                                                            <td>{item.InputVoucherID}</td>
                                                            <td>{formatDate(item.ReturnInputDate)}</td>
                                                            <td>{item.Note}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>) : ""}
                    </div>
                </Collapsible>
                <Collapsible trigger="Vật tư lắp đặt" easing="ease-in" open={true}>
                    <div className="card-body">
                        <div className="form-row">
                            <div className="col-md-12">
                                <div className="table-responsive">
                                    <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                        <thead className="thead-light">
                                            <tr>
                                                <th className="jsgrid-header-cell">Sản phẩm</th>
                                                <th className="jsgrid-header-cell">Số lượng tạm ứng</th>
                                                <th className="jsgrid-header-cell">Số lượng sử dụng</th>
                                                <th className="jsgrid-header-cell">Số lượng miễn phí</th>
                                                <th className="jsgrid-header-cell">Số lượng bán</th>
                                                <th className="jsgrid-header-cell">Giá bán</th>
                                                <th className="jsgrid-header-cell">Thành tiền</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {objgroupByInstallBundleID != null &&
                                                objgroupByInstallBundleID.map((rowItem, rowIndex) => {
                                                    let obj = this.state.ShipmentOrder.ShipmentOrder_Material2List.filter(n => n.InstallProductID == [rowItem.InstallProductID]);
                                                    return (
                                                        <React.Fragment key={rowIndex}>
                                                            <tr className="totalCurrency" key={"totalCurrency" + rowIndex}>
                                                                <td colSpan={8}>
                                                                    <div className="groupTotalCurrency">
                                                                        <span className="item txtTotal">{rowItem.InstallProductID + " - " + rowItem.InstallProductName}</span>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            {
                                                                obj.map((item, Index) => {
                                                                    if (item.ProductID != "" && item.ProductID != null) {
                                                                        if (item.ProductID != item.ConvertAdvanceProductID) {
                                                                            return (
                                                                                <tr key={rowIndex + Index}>
                                                                                    <td>{item.ProductID + '-' + item.ProductName}</td>
                                                                                    <td>
                                                                                        <span className="text-danger" data-tip data-for={item.AdvanceQuantity + "-" + Index} data-id={item.AdvanceQuantity + "-" + Index} >{item.AdvanceQuantity * item.AdvanceConvertRatio}*</span>
                                                                                        <ReactTooltip id={item.AdvanceQuantity + "-" + Index} type='dark'>
                                                                                            {item.ConvertAdvanceProductID + '-' + item.ConvertAdvanceProductName + " đã tạm ứng " + item.AdvanceQuantity * item.AdvanceConvertRatio + "m"}
                                                                                        </ReactTooltip>
                                                                                    </td>
                                                                                    <td>{item.UsageQuantity}</td>
                                                                                    <td>{item.FreeQuantity}</td>
                                                                                    <td>{item.SaleQuantity}</td>
                                                                                    <td>{formatMoney(item.SalePriceWithVAT, 0)}đ</td>
                                                                                    <td>{formatMoney(this.Pricevat(item.SaleQuantity, item.SalePriceWithVAT), 0)}đ</td>
                                                                                </tr>

                                                                            )
                                                                        }
                                                                        else {
                                                                            return (<tr key={rowIndex + Index}>
                                                                                <td>{item.ProductID + '-' + item.ProductName}</td>
                                                                                <td>{item.AdvanceQuantity * item.AdvanceConvertRatio}</td>
                                                                                <td>{item.UsageQuantity}</td>
                                                                                <td>{item.FreeQuantity}</td>
                                                                                <td>{item.SaleQuantity}</td>
                                                                                <td>{formatMoney(item.SalePriceWithVAT, 0)}đ</td>
                                                                                <td>{formatMoney(this.Pricevat(item.SaleQuantity, item.SalePriceWithVAT), 0)}đ</td>
                                                                            </tr>)
                                                                        }


                                                                    }
                                                                })
                                                            }
                                                        </React.Fragment>
                                                    );
                                                })}
                                            <tr className="totalCurrency">
                                                <td colSpan={7 - 1}>
                                                    <div className="groupTotalCurrency">
                                                        <span className="item txtTotal">Tổng</span>
                                                    </div>
                                                </td>
                                                <td colSpan="1">
                                                    <div className="groupTotalCurrency">
                                                        <span className="item txttotalCurrency">{formatMoney(this.state.ShipmentOrder.TotalSaleMaterialMoney, 0)}đ</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </Collapsible>
            </React.Fragment>
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: () => {
            dispatch(hideModal());
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        }
    }
}


const InfoProduct = connect(mapStateToProps, mapDispatchToProps)(InfoProductCom);
export default InfoProduct;