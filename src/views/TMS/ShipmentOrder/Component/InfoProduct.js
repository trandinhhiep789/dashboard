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
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
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

        this.sortDataShipmentOrderItemList = this.sortDataShipmentOrderItemList.bind(this);
        this.notificationDOMRef = React.createRef();
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

    handleCODSubmit() {
        this.props.callFetchAPI(APIHostName, "api/ShipmentOrder/UpdateCODWeb", this.props.ShipmentOrderID.Trim()).then((apiResult) => {
            this.addNotification(apiResult.Message, apiResult.IsError);
            if (!apiResult.IsError) {
                this.state.ShipmentOrder.TotalCOD = apiResult.ResultObject;
                this.setState({ ShipmentOrder: this.state.ShipmentOrder });
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

    sortDataShipmentOrderItemList(data) {
        try {
            if (data.length == 1) {
                return data;
            }

            let cloneData = [...data], tempIndex = [];

            // lấy sản phẩm chính
            const mainProduct = cloneData.filter((item, index) => {
                // if (item.Price != 0 || item.ProductSerial != "") {
                if (item.Price != 0) {
                    tempIndex.push(index);
                    return true;
                }
                return false;
            });

            // xóa sản phẩm chính khỏi arr ban đầu
            tempIndex.sort((a, b) => b - a);
            for (let index = 0; index < tempIndex.length; index++) {
                cloneData.splice(tempIndex[index], 1);
            }
            tempIndex.length = 0;

            let result = mainProduct.reduce((acc, val) => {
                let arrTemp = [];

                // lấy danh sách sản phẩm khuyến mãi theo sp chính
                cloneData.forEach((ele, index) => {
                    if (val.ProductID.trim() == ele.RelateProductID.trim()) {
                        let isExist = false;

                        // không lấy trùng lặp
                        arrTemp.forEach(ele1 => {
                            if (ele1.ProductID == ele.ProductID) {
                                isExist = true;
                            }
                        });
                        if (isExist == false) {
                            arrTemp.push(ele);
                            tempIndex.push(index);
                        }
                    }
                });

                // remove những sp khuyến mãi khỏi mảng ban đầu
                tempIndex.sort((a, b) => b - a);
                for (let index = 0; index < tempIndex.length; index++) {
                    cloneData.splice(tempIndex[index], 1);
                }
                tempIndex.length = 0;

                // sắp xếp thứ tự sp khuyến mãi
                arrTemp.sort((a, b) => a.ProductID.trim() - b.ProductID.trim());

                return [...acc, val, ...arrTemp];
            }, []);

            // push những sản phẩm không liên quan còn lại
            if (cloneData.length > 0) {
                cloneData.sort((a, b) => a.ProductID.trim() - b.ProductID.trim());
                result.push(...cloneData);
            };

            // kiem tra có đúng so luong san pham
            if (result.length != data.length) {
                return data;
            } else {
                return result;
            }

        } catch (error) {
            return data;
        }
    }


    addNotification(message1, IsError) {
        if (!IsError) {
            this.setState({
                cssNotification: "notification-custom-success",
                iconNotification: "fa fa-check"
            });
        } else {
            this.setState({
                cssNotification: "notification-danger",
                iconNotification: "fa fa-exclamation"
            });
        }
        this.notificationDOMRef.current.addNotification({
            container: "bottom-right",
            content: (
                <div className={this.state.cssNotification}>
                    <div className="notification-custom-icon">
                        <i className={this.state.iconNotification} />
                    </div>
                    <div className="notification-custom-content">
                        <div className="notification-close">
                            <span>×</span>
                        </div>
                        <h4 className="notification-title">Thông Báo</h4>
                        <p className="notification-message">{message1}</p>
                    </div>
                </div>
            ),
            dismiss: { duration: 6000 },
            dismissable: { click: true }
        });
    }

    render() {

        let objgroupByInstallBundleID = [];

        if (this.state.ShipmentOrder.ShipmentOrder_Material2List != undefined && this.state.ShipmentOrder.ShipmentOrder_Material2List.length > 0) {
            objgroupByInstallBundleID = this.groupByNew(this.state.ShipmentOrder.ShipmentOrder_Material2List, ['InstallProductID', 'InstallProductName', 'InstallBundleID', 'InstallSaleOrderDetailID']);
        }
        let objShipmentOrderQualityAssessData = this.props.ShipmentOrderQualityAssessData ? this.props.ShipmentOrderQualityAssessData : [];
        let totalShipmentOrderQualityAssessData = 0;
        console.log('ShipmentOrderQualityAssessData:', this.props.ShipmentOrderQualityAssessData);
        console.log("objgroupByInstallBundleID", objgroupByInstallBundleID)
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
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
                            <div className="form-group col-md-4 groupCOD">
                                <label className="col-form-label lbl-currency">
                                    {formatMoney(this.state.ShipmentOrder.TotalCOD, 0)}đ

                                </label>
                                <div className="group-changeCOD">
                                    <button className="btn btn-icon-modal btn-history" data-tip data-for="btn-history-updateCOD" data-id="btn-history-updateCOD" onClick={this.handleShowCodUpdLog.bind(this)}>
                                        <i className="fa fa-eye"></i>
                                    </button>
                                    <ReactTooltip id="btn-history-updateCOD" type='warning'>
                                        <span>Xem lịch sử cập nhật COD</span>
                                    </ReactTooltip>
                                    <button className="btn btn-update-submit btn-update" data-tip data-for="btn-updateCOD" data-id="btn-updateCOD" onClick={this.handleCODSubmit.bind(this)}>
                                        <i className="ti ti-pencil-alt"></i>
                                    </button>
                                    <ReactTooltip id="btn-updateCOD" type='warning'>
                                        <span>Cập nhật COD</span>
                                    </ReactTooltip>
                                </div>

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
                                <label className="col-form-label bold">Tổng tiền đã thu khách hàng:</label>
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
                                <label className="col-form-label lbl-currency-total" >{(this.state.ShipmentOrder.TotalSaleMaterialMoney + this.state.ShipmentOrder.TotalCOD - this.state.ShipmentOrder.TotalReturnPrice) > 0 ? formatMoney((this.state.ShipmentOrder.TotalSaleMaterialMoney + this.state.ShipmentOrder.TotalCOD) - this.state.ShipmentOrder.TotalReturnPrice, 0) : formatMoney(this.state.ShipmentOrder.TotalSaleMaterialMoney)}đ</label>
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

                                {this.state.ShipmentOrder.CollectedTotalMoney > 0 ?
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
                                <label className="col-form-label bold"> Số tiền nộp:</label>
                            </div>
                            <div className="form-group col-md-4">
                                <label className="col-form-label">
                                    <span className="badge badge-success">{formatMoney(this.state.ShipmentOrder.TotalPaidInMoney, 0)}đ</span>
                                </label>
                            </div>
                            <div className="form-group col-md-2">
                                <label className="col-form-label bold"> Thông tin xuất:</label>
                            </div>
                            <div className="form-group col-md-4">
                                {this.state.ShipmentOrder.IsOutputGoods == true ? <span className="badge badge-success">Đã xuất hàng</span> : <span className="badge badge-danger">Chưa xuất hàng </span>}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-2">
                                <label className="col-form-label bold">Số tiền chưa nộp:</label>
                            </div>
                            <div className="form-group col-md-4">
                                {(this.state.ShipmentOrder.TotalPaidInMoney + this.state.ShipmentOrder.TotalUnPaidInMoney) > 0 ?
                                    (this.state.ShipmentOrder.TotalUnPaidInMoney > 0 ?
                                        (
                                            <span className="badge badge-danger">{formatMoney(this.state.ShipmentOrder.TotalUnPaidInMoney, 0)}đ</span>
                                        ) :
                                        (
                                            <span className="badge badge-success">{formatMoney(this.state.ShipmentOrder.TotalUnPaidInMoney, 0)}đ</span>
                                        )
                                    ) :
                                    (
                                        <span className="badge badge-danger" >{(this.state.ShipmentOrder.TotalSaleMaterialMoney + this.state.ShipmentOrder.TotalCOD - this.state.ShipmentOrder.TotalReturnPrice) > 0 ? formatMoney((this.state.ShipmentOrder.TotalSaleMaterialMoney + this.state.ShipmentOrder.TotalCOD) - this.state.ShipmentOrder.TotalReturnPrice, 0) : formatMoney(this.state.ShipmentOrder.TotalSaleMaterialMoney)}đ</span>
                                    )
                                }

                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-2">
                                <label className="col-form-label bold"> Thời gian nộp tiền:</label>
                            </div>
                            <div className="form-group col-md-4">
                                {formatDate(this.state.ShipmentOrder.PaidInTime)}
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
                                                return <tr
                                                    key={"Product" + index}
                                                    className={parseFloat(item.Price) != 0 || item.ProductSerial.trim() != ""
                                                        ? "row-main-product" : undefined}
                                                >
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
                                                <th className="jsgrid-header-cell">Nhóm vật tư</th>
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
                                                    let obj = this.state.ShipmentOrder.ShipmentOrder_Material2List.filter(n => n.InstallProductID == [rowItem.InstallProductID] && n.InstallBundleID == [rowItem.InstallBundleID] && n.InstallSaleOrderDetailID == [rowItem.InstallSaleOrderDetailID]);
                                                    return (
                                                        <React.Fragment key={rowIndex}>
                                                            <tr className="totalCurrency" key={"totalCurrency" + rowIndex}>
                                                                <td colSpan={8}>
                                                                    <div className="groupTotalCurrency">
                                                                        <span className="item txtTotal">{rowItem.InstallProductID + " - " + rowItem.InstallProductName + " (" + rowItem.InstallBundleID + ")" + "-" + obj[0].InstallProductSerial}</span>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            {
                                                                obj.sort((a, b) => (a.IsMaterialReclaimed > b.IsMaterialReclaimed) ? 1 : -1).map((item, Index) => {
                                                                    if (item.ProductID != "" && item.ProductID != null) {
                                                                        if (item.ProductID != item.ConvertAdvanceProductID) {
                                                                            return (
                                                                                <tr key={rowIndex + Index}>

                                                                                    <td>{!item.MaterialGroupID ? "" : `${item.MaterialGroupID} - ${item.MaterialGroupName}`}</td>

                                                                                    {item.IsMaterialReclaimed == false ?
                                                                                        (<td>{item.ProductID + '-' + item.ProductName}</td>) :
                                                                                        (<td><span className="text-danger"> {item.ProductID + '-' + item.ProductName}</span></td>)
                                                                                    }

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
                                                                                <td>{!item.MaterialGroupID ? "" : `${item.MaterialGroupID} - ${item.MaterialGroupName}`}</td>

                                                                                {item.IsMaterialReclaimed == false ?
                                                                                    (<td>{item.ProductID + '-' + item.ProductName}</td>) :
                                                                                    (<td><span className="text-danger"> {item.ProductID + '-' + item.ProductName}</span></td>)
                                                                                }
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
                                                <td colSpan={7}>
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
                {objShipmentOrderQualityAssessData.length > 0 &&
                    <Collapsible trigger="Đánh giá chất lượng giao hàng" easing="ease-in" open={true}>
                        <div className="card-body">
                            <div className="form-row">
                                <div className="col-md-12">
                                    <div className="table-responsive">
                                        <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                            <thead className="thead-light">
                                                <tr>
                                                    <th className="jsgrid-header-cell">Loại tiêu chí đánh giá</th>
                                                    {objShipmentOrderQualityAssessData != null &&
                                                        objShipmentOrderQualityAssessData.map((item, index) => {
                                                            return (
                                                                <React.Fragment key={index}>
                                                                    <th className="jsgrid-header-cell">{item.QualityAssessTypeName}</th>
                                                                </React.Fragment>
                                                            )
                                                        })
                                                    }
                                                    <th className="jsgrid-header-cell">Tổng điểm đánh giá</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Giá trị đánh giá</td>
                                                    {objShipmentOrderQualityAssessData != null &&
                                                        objShipmentOrderQualityAssessData.map((item, index) => {
                                                            if (item.QualityAssessvalue == 1) {
                                                                totalShipmentOrderQualityAssessData = totalShipmentOrderQualityAssessData + item.QualityAssessPoint;
                                                            }
                                                            return (
                                                                <React.Fragment key={index}>
                                                                    <td>{item.QualityAssessvalue == 1 ? `Đạt(${item.QualityAssessPoint})` : (item.QualityAssessvalue == 0 ? 'Không đạt(0)' : '')}</td>
                                                                </React.Fragment>
                                                            )
                                                        })
                                                    }

                                                    <td>{totalShipmentOrderQualityAssessData}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Collapsible>
                }

                {/* thông tin báo giá sửa chữa */}
                {(this.state.ShipmentOrder.ShipmentOrderQuoteList && this.state.ShipmentOrder.ShipmentOrderQuoteList.length > 0) &&
                    <Collapsible trigger="Thông tin báo giá sửa chữa" easing="ease-in" open={true}>
                        <div className="card-body">
                            <div className="form-row">
                                <div className="col-md-12">
                                    <div className="table-responsive">
                                        <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                            <thead className="thead-light">
                                                <tr>
                                                    <th className="jsgrid-header-cell">Mã sản phẩm</th>
                                                    <th className="jsgrid-header-cell">Sản phẩm</th>
                                                    <th className="jsgrid-header-cell">Giá bán</th>
                                                    <th className="jsgrid-header-cell">Số lượng sử dụng</th>
                                                    <th className="jsgrid-header-cell">Đơn vị tính</th>
                                                    <th className="jsgrid-header-cell">Thành tiền</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.ShipmentOrder.ShipmentOrderQuoteList && this.state.ShipmentOrder.ShipmentOrderQuoteList.map((item, index) => {
                                                    return (<tr key={index}>
                                                        <td>{item.ProductID}</td>
                                                        <td>{item.ProductName}</td>
                                                        <td>{formatMoney(item.Price,0)}</td>
                                                        <td>{item.Quantity}</td>
                                                        <td>{item.QuantityUnitName}</td>
                                                        <td>{formatMoney(item.TotalAmount, 0)}</td>
                                                    </tr>)
                                                })
                                                }
                                                <tr className="totalCurrency">
                                                    <td colSpan={5}>
                                                        <div className="groupTotalCurrency">
                                                            <span className="item txtTotal">Tổng</span>
                                                        </div>
                                                    </td>
                                                    <td colSpan="1">
                                                        <div className="groupTotalCurrency">
                                                            <span className="item txttotalCurrency">{formatMoney(this.state.ShipmentOrder.ShipmentOrderQuoteList[0].SumTotal, 0)}</span>
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
                }
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