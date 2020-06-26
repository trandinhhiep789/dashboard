import React, { Component } from "react";
import { connect } from 'react-redux';
import { formatMoney } from '../../../../utils/function';
import { showModal, hideModal } from '../../../../actions/modal';
import { MODAL_TYPE_COMMONTMODALS } from '../../../../constants/actionTypes';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import {
    APIHostName,
} from "../constants";
class InfoProductCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ShipmentOrder: this.props.InfoProduct,
            ShipmentOrder_FeeLst: []
        }
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

    Pricevat(sl, Price, vat) {
        let r = ((1 + (vat / 100)) * Price) * sl
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
                                    {this.state.ShipmentOrder_FeeLst && this.state.ShipmentOrder_FeeLst.map((item, index) => {
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

    render() {
        return (
            <div className="card">
                <h4 className="card-title"><strong>Thông tin hàng hóa</strong></h4>
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
                            <label className="col-form-label">{this.state.ShipmentOrder.Length}x{this.state.ShipmentOrder.Width}x{this.state.ShipmentOrder.Height}cm</label>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-2">
                            <label className="col-form-label bold">Xem thông tin phí dịch vụ:</label>
                        </div>
                        <div className="form-group col-md-4">
                            <button className="btn btn-icon-modal" onClick={this.handleShowTotalSaleMaterialMoney.bind(this)}>
                                <i className="fa fa-pencil"></i>
                            </button>
                        </div>
                        <div className="form-group col-md-2">
                            <label className="col-form-label bold">Tổng tiền COD:</label>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="col-form-label lbl-currency">
                                {formatMoney(this.state.ShipmentOrder.TotalCOD, 0)}đ
                            </label>
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
                            <label className="col-form-label bold">Tổng tiền phải thu:</label>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="col-form-label lbl-currency-total" >{formatMoney(this.state.ShipmentOrder.TotalSaleMaterialMoney + this.state.ShipmentOrder.TotalCOD, 0)}đ</label>
                        </div>

                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-2">
                            <label className="col-form-label bold">Thu tiền khách hàng:</label>
                        </div>
                        <div className="form-group col-md-4">
                            {this.state.ShipmentOrder.IsCollectedMoney == true ? <span className="badge badge-success">Đã thu tiền</span> : <span className="badge badge-danger">Chưa thu tiền</span>}
                        </div>
                        <div className="form-group col-md-2">
                            <label className="col-form-label bold">Tổng tiền thu:</label>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="col-form-label">{formatMoney(this.state.ShipmentOrder.CollectedTotalMoney, 0)}đ</label>
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
                    <div className="form-row">
                        <div className="col-md-12">
                            <h3 className="title">Danh sách hàng hóa:</h3>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                <thead className="thead-light">
                                    <tr>
                                        <th className="jsgrid-header-cell"></th>
                                        <th className="jsgrid-header-cell">Cần lắp đặt</th>
                                        <th className="jsgrid-header-cell">Mã sản phẩm</th>
                                        <th className="jsgrid-header-cell">Sản phẩm</th>
                                        <th className="jsgrid-header-cell">Kiện</th>
                                        <th className="jsgrid-header-cell">Giá</th>
                                        <th className="jsgrid-header-cell">Số lượng</th>
                                        <th className="jsgrid-header-cell">Đơn vị tính</th>
                                        <th className="jsgrid-header-cell">Kích thước(DxRxC)</th>
                                        <th className="jsgrid-header-cell">Khối lượng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.ShipmentOrder.ShipmentOrder_ItemList && this.groupBy(this.state.ShipmentOrder.ShipmentOrder_ItemList, ['ProductID', 'ProductName', 'QuantityUnitName', 'Price', 'IsInstallItem', 'PackingUnitName', 'SizeItem', 'Weight']).map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <img src='/src/img/may-lanh-lg-v10enh-1-1-org.jpg' className="img-product" />
                                                </td>
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
                                                <td>{item.PackingUnitName}</td>
                                                <td>{formatMoney(item.Price, 0)}đ</td>
                                                <td>{item.Quantity}</td>
                                                <td>{item.QuantityUnitName}</td>
                                                <td>{item.SizeItem}</td>
                                                <td>{item.Weight}kg</td>
                                            </tr>

                                        )
                                    })
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>


                    <div className="form-row">
                        <div className="col-md-12">
                            <h3 className="title">Vật tư lắp đặt:</h3>
                            <div className="table-responsive">
                                <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                    <thead className="thead-light">
                                        <tr>
                                            <th className="jsgrid-header-cell">Xuất bán</th>
                                            <th className="jsgrid-header-cell">Mã sản phẩm</th>
                                            <th className="jsgrid-header-cell">Tên sản phẩm</th>
                                            <th className="jsgrid-header-cell">Đơn vị tính</th>
                                            <th className="jsgrid-header-cell">Số lượng</th>
                                            <th className="jsgrid-header-cell">Giá</th>
                                            <th className="jsgrid-header-cell">Thành tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.ShipmentOrder.ShipmentOrder_MaterialList && this.groupBy(this.state.ShipmentOrder.ShipmentOrder_MaterialList, ['ProductID', 'ProductName', 'QuantityUnitName', 'Price', 'IsSaleMaterial', 'VAT']).map((item, index) => {
                                            return (<tr key={index}>
                                                <td>
                                                    <div className="checkbox">
                                                        <label>
                                                            <input type="checkbox" readOnly className="form-control form-control-sm" checked={item.IsSaleMaterial} />
                                                            <span className="cr">
                                                                <i className="cr-icon fa fa-check"></i>
                                                            </span>
                                                        </label>
                                                    </div>
                                                </td>
                                                <td>{item.ProductID}</td>
                                                <td>{item.ProductName}</td>
                                                <td>{item.QuantityUnitName}</td>
                                                <td>{item.Quantity}</td>
                                                <td>{item.Price}</td>
                                                <td>{formatMoney(this.Pricevat(item.Quantity, item.Price, item.VAT), 0)}đ</td>
                                            </tr>)
                                        })}
                                    </tbody>
                                </table>
                            </div>
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