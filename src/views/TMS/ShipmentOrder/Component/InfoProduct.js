import React, { Component } from "react";
import { connect } from 'react-redux';
import { formatMoney } from '../../../../utils/function';
class InfoProductCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ShipmentOrder: this.props.InfoProduct
        }
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.InfoProduct) !== JSON.stringify(nextProps.InfoProduct)) {
            this.setState({
                ShipmentOrder: nextProps.InfoProduct
            })
        }
    }
     groupBy = (array, key) => {
        return array.reduce((result, currentValue) => {
          // get the nested propert value
          const objKey = currentValue[key];
          result[objKey] = (result[objKey] || []).concat(
            currentValue)
          return result;
        }, {});
      };
    render() {
        // if(this.state.ShipmentOrder.ShipmentOrder_MaterialList !=[])
        // {
        //     console.log(this.groupBy(this.state.ShipmentOrder.ShipmentOrder_MaterialList,"ProductID"))

        // }
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
                            <label className="col-form-label bold">Tổng tiền COD:</label>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="col-form-label">{formatMoney(this.state.ShipmentOrder.TotalCOD, 0)}đ</label>
                        </div>
                        <div className="form-group col-md-2">
                            <label className="col-form-label bold">Tổng tiền bán vật tư:</label>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="col-form-label" >{formatMoney(this.state.ShipmentOrder.TotalSaleMaterialMoney, 0)}đ</label>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-2">
                            <label className="col-form-label bold">Tổng tiền phải thu:</label>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="col-form-label" >{formatMoney(this.state.ShipmentOrder.TotalSaleMaterialMoney + this.state.ShipmentOrder.TotalCOD, 0)}đ</label>
                        </div>

                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-2">
                            <label className="col-form-label bold">Thu tiền khách hàng:</label>
                        </div>
                        <div className="form-group col-md-4">
                            {this.state.ShipmentOrder.IsCollectedMoney==true?<span className="badge badge-success">Đã thu tiền</span>: <span className="badge badge-danger">Chưa thu tiền</span>}
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
                                    {this.state.ShipmentOrder.ShipmentOrder_ItemList && this.state.ShipmentOrder.ShipmentOrder_ItemList.map((item, index) => {
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
                                            <th className="jsgrid-header-cell">Số lượng</th>
                                            <th className="jsgrid-header-cell">Đơn vị tính</th>
                                            <th className="jsgrid-header-cell">Giá</th>
                                            <th className="jsgrid-header-cell">Mã đơn hàng xuất</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.ShipmentOrder.ShipmentOrder_MaterialList && this.state.ShipmentOrder.ShipmentOrder_MaterialList.map((item, index) => {
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
                                                <td>{item.Quantity}</td>
                                                <td>{item.QuantityUnitName}</td>
                                                <td>{formatMoney(item.Price, 0)}đ</td>
                                                <td>{item.SaleOrderID}</td>
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
        }
    }
}


const InfoProduct = connect(mapStateToProps, mapDispatchToProps)(InfoProductCom);
export default InfoProduct;