import React, { Component } from "react";
import { connect } from 'react-redux';
import { showModal, hideModal } from '../../../../../actions/modal';
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import ElementInputModal from '../../../../../common/components/FormContainer/FormElement/ElementInputModal';
import { formatMoney } from '../../../../../utils/function';
import Select from 'react-select';
import { InputNumber, DatePicker } from "antd";
import "antd/dist/antd.css";
import {
    APIHostName,
} from "../constants";
class AdvanceRequestDetailNewCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AdvanceRequestDetail: this.props.AdvanceRequestDetail,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.AdvanceRequestDetail) !== JSON.stringify(nextProps.AdvanceRequestDetail)) {
            this.setState({
                AdvanceRequestDetail: nextProps.AdvanceRequestDetail
            })
        }
    }
    handleProductChange(e) {
        e.preventDefault();
        let ProductID = e.target.value;
        let MaterialGroupID = e.target.id;
        let ProductName = e.target[e.target.selectedIndex].getAttribute('data-ProductName');
        let QuantityUnitID = e.target[e.target.selectedIndex].getAttribute('data-QuantityUnitID');
        let QuantityUnit = e.target[e.target.selectedIndex].getAttribute('data-QuantityUnit');
        let CostPrice = e.target[e.target.selectedIndex].getAttribute('data-CostPrice');
        let AdvanceProductID = e.target[e.target.selectedIndex].getAttribute('data-AdvanceProductID');
        let AdvanceProductName = e.target[e.target.selectedIndex].getAttribute('data-AdvanceProductName');
        let AdvanceQuantityUnitID = e.target[e.target.selectedIndex].getAttribute('data-AdvanceQuantityUnitID');
        let AdvanceQuantityUnitName = e.target[e.target.selectedIndex].getAttribute('data-AdvanceQuantityUnitName');
        let AdvanceConvertRatio = e.target[e.target.selectedIndex].getAttribute('data-AdvanceConvertRatio');
        let VAT = e.target[e.target.selectedIndex].getAttribute('data-VAT');
        console.log(MaterialGroupID, CostPrice)
        let { AdvanceRequestDetail } = this.state
        const objAdvanceRequestDetail = AdvanceRequestDetail.MaterialList.find(n => n['MaterialGroupID'] == MaterialGroupID)
        objAdvanceRequestDetail.ProductID = ProductID;
        objAdvanceRequestDetail.ProductName = ProductName;
        objAdvanceRequestDetail.QuantityUnitID = QuantityUnitID;
        objAdvanceRequestDetail.QuantityUnit = QuantityUnit;
        objAdvanceRequestDetail.CostPrice = CostPrice == null ? 0 : CostPrice;
        objAdvanceRequestDetail.AdvanceProductID = AdvanceProductID;
        objAdvanceRequestDetail.AdvanceProductName = AdvanceProductName;
        objAdvanceRequestDetail.AdvanceQuantityUnitID = AdvanceQuantityUnitID;
        objAdvanceRequestDetail.AdvanceQuantityUnitName = AdvanceQuantityUnitName;
        objAdvanceRequestDetail.AdvanceConvertRatio = AdvanceConvertRatio;
        objAdvanceRequestDetail.Quantity = 0;
        objAdvanceRequestDetail.AdvanceQuantity = '';
        objAdvanceRequestDetail.VAT = VAT;
        // console.log("objAdvanceRequestDetail",objAdvanceRequestDetail,AdvanceRequestDetail);
        this.setState({
            AdvanceRequestDetail: AdvanceRequestDetail
        })



    }

    handleProductChangeNew(e) {
        e.preventDefault();
        let ProductID = e.target.value;
        let MaterialGroupID = e.target.id;
        let InstallProductID = e.target[e.target.selectedIndex].getAttribute('data-InstallProductID');
        let ProductName = e.target[e.target.selectedIndex].getAttribute('data-ProductName');
        let QuantityUnitID = e.target[e.target.selectedIndex].getAttribute('data-QuantityUnitID');
        let QuantityUnit = e.target[e.target.selectedIndex].getAttribute('data-QuantityUnit');
        let CostPrice = e.target[e.target.selectedIndex].getAttribute('data-CostPrice');
        let AdvanceProductID = e.target[e.target.selectedIndex].getAttribute('data-AdvanceProductID');
        let AdvanceProductName = e.target[e.target.selectedIndex].getAttribute('data-AdvanceProductName');
        let AdvanceQuantityUnitID = e.target[e.target.selectedIndex].getAttribute('data-AdvanceQuantityUnitID');
        let AdvanceQuantityUnitName = e.target[e.target.selectedIndex].getAttribute('data-AdvanceQuantityUnitName');
        let AdvanceConvertRatio = e.target[e.target.selectedIndex].getAttribute('data-AdvanceConvertRatio');
        let VAT = e.target[e.target.selectedIndex].getAttribute('data-VAT');
        console.log(MaterialGroupID, CostPrice)
        let { AdvanceRequestDetail } = this.state
        const objAdvanceRequestDetail = AdvanceRequestDetail.MaterialList.find(n => n['MaterialGroupID'] == MaterialGroupID && n['InstallProductID'] == InstallProductID)
        objAdvanceRequestDetail.ProductID = ProductID;
        objAdvanceRequestDetail.ProductName = ProductName;
        objAdvanceRequestDetail.QuantityUnitID = QuantityUnitID;
        objAdvanceRequestDetail.QuantityUnit = QuantityUnit;
        objAdvanceRequestDetail.CostPrice = CostPrice == null ? 0 : CostPrice;
        objAdvanceRequestDetail.AdvanceProductID = AdvanceProductID;
        objAdvanceRequestDetail.AdvanceProductName = AdvanceProductName;
        objAdvanceRequestDetail.AdvanceQuantityUnitID = AdvanceQuantityUnitID;
        objAdvanceRequestDetail.AdvanceQuantityUnitName = AdvanceQuantityUnitName;
        objAdvanceRequestDetail.AdvanceConvertRatio = AdvanceConvertRatio;
        objAdvanceRequestDetail.Quantity = 0;
        objAdvanceRequestDetail.AdvanceQuantity = '';
        objAdvanceRequestDetail.VAT = VAT;
        // console.log("objAdvanceRequestDetail",objAdvanceRequestDetail,AdvanceRequestDetail);
        this.setState({
            AdvanceRequestDetail: AdvanceRequestDetail
        })



    }

    handleInputChange(name, inputvalue, index) {
        let { AdvanceRequestDetail } = this.state
        AdvanceRequestDetail.MaterialList[index].Quantity = AdvanceRequestDetail.MaterialList[index].AdvanceConvertRatio * inputvalue
        AdvanceRequestDetail.MaterialList[index].AdvanceQuantity = inputvalue
        this.setState({ AdvanceRequestDetail: AdvanceRequestDetail });
        if (this.props.onValueChangeGrid != null)
            this.props.onValueChangeGrid(AdvanceRequestDetail);

    }
    handleInputChangeNew(e) {
        e.preventDefault();
        let value = e.target.value;
        let MaterialGroupID = e.target.getAttribute('data-MaterialGroupID');
        let InstallBundleID = e.target.getAttribute('data-InstallBundleID');
        let { AdvanceRequestDetail } = this.state
        const objAdvanceRequestDetail = AdvanceRequestDetail.MaterialList.find(n => n['MaterialGroupID'] == MaterialGroupID && n['InstallBundleID'] == InstallBundleID)
        if (parseInt(value) > 0) {
            objAdvanceRequestDetail.Quantity = objAdvanceRequestDetail.AdvanceConvertRatio * value
            objAdvanceRequestDetail.AdvanceQuantity = value
        }
        else {
            objAdvanceRequestDetail.Quantity = 0;
            objAdvanceRequestDetail.AdvanceQuantity = "";
        }


        this.setState({
            AdvanceRequestDetail: AdvanceRequestDetail
        })
        if (this.props.onValueChangeGrid != null)
            this.props.onValueChangeGrid(AdvanceRequestDetail);

    }
    handleInputChangeNewProduct(e) {
        e.preventDefault();
        let value = e.target.value;
        let MaterialGroupID = e.target.getAttribute('data-MaterialGroupID');
        let InstallProductID = e.target.getAttribute('data-InstallProductID');
        let { AdvanceRequestDetail } = this.state
        const objAdvanceRequestDetail = AdvanceRequestDetail.MaterialList.find(n => n['MaterialGroupID'] == MaterialGroupID && n['InstallProductID'] == InstallProductID)
        if (value.length > 0) {
            objAdvanceRequestDetail.Quantity = objAdvanceRequestDetail.AdvanceConvertRatio * value
            objAdvanceRequestDetail.AdvanceQuantity = value
        }
        else {
            objAdvanceRequestDetail.Quantity = 0;
            objAdvanceRequestDetail.AdvanceQuantity = "";
        }

        this.setState({
            AdvanceRequestDetail: AdvanceRequestDetail
        })
        if (this.props.onValueChangeGrid != null)
            this.props.onValueChangeGrid(AdvanceRequestDetail);

    }

    groupBy(list, props) {
        return list.reduce((a, b) => {
            (a[b[props]] = a[b[props]] || []).push(b);
            return a;
        }, {});
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
    AdvanceLimitQuantity(MaterialGroupID, ProductID) {
        //this.state.AdvanceRequestDetail.MaterialAdvanceDebtList.
        let { AdvanceRequestDetail } = this.state
        const MaterialAdvanceDebtList = AdvanceRequestDetail.MaterialAdvanceDebtList.find(n => n['MaterialGroupID'] == MaterialGroupID);
        if (MaterialAdvanceDebtList.ProductID != "") {
            return MaterialAdvanceDebtList.TotalQuantity;
        }
        return 0;
    }


    render() {
        let intSumTotalUserLimit = 0;
        let intSumTotalMoney = 0;
        if (this.state.AdvanceRequestDetail.AdvanceCostLimit != undefined) {
            intSumTotalUserLimit = this.state.AdvanceRequestDetail.AdvanceCostLimit;
            // intSumTotalMoney = this.state.AdvanceRequestDetail[0].SumTotalMoney;
        }

        let objgroupByInstallBundleID = [];
        let materialListForAdvance = {};
        if (this.state.AdvanceRequestDetail.MaterialList != undefined && this.state.AdvanceRequestDetail.MaterialList.length > 0) {
            if (!this.state.AdvanceRequestDetail.IsAdvanceByShipmentOrder) {
                intSumTotalMoney = this.state.AdvanceRequestDetail.MaterialList[0].SumTotalMoney;
                objgroupByInstallBundleID = this.groupByNew(this.state.AdvanceRequestDetail.MaterialList, ['InstallBundleID', 'InstallProductName']);
                materialListForAdvance = this.state.AdvanceRequestDetail.MaterialList.reduce((r, a) => {
                    r[`${a.InstallBundleID}`] = [...r[`${a.InstallBundleID}`] || [], a];
                    return r;
                }, {});

            }
            else {
                intSumTotalMoney = this.state.AdvanceRequestDetail.MaterialAdvanceDebtList[0].SumTotalMoney;
                objgroupByInstallBundleID = this.groupByNew(this.state.AdvanceRequestDetail.MaterialList, ['InstallProductID', 'InstallProductName']);
                materialListForAdvance = this.state.AdvanceRequestDetail.MaterialList.reduce((r, a) => {
                    r[`${a.InstallProductID}`] = [...r[`${a.InstallProductID}`] || [], a];
                    return r;
                }, {});
            }
        }

        if (!this.state.AdvanceRequestDetail.IsAdvanceByShipmentOrder) {
            return (
                <React.Fragment>
                    <div className="col-lg-12 page-detail">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                            <thead className="thead-light">
                                                <tr>
                                                    <th className="jsgrid-header-cell" style={{ width: "15%" }}>Nhóm vật tư</th>
                                                    <th className="jsgrid-header-cell" style={{ width: "25%" }}>Sản phẩm</th>
                                                    <th className="jsgrid-header-cell" style={{ width: "10%" }}>Đơn vị tính</th>
                                                    <th className="jsgrid-header-cell" style={{ width: "10%" }}>Số lượng tạm ứng</th>
                                                    <th className="jsgrid-header-cell" style={{ width: "7%" }}>Tỷ lệ qui đổi</th>
                                                    <th className="jsgrid-header-cell" style={{ width: "7%" }}>SL sau qui đổi</th>
                                                    <th className="jsgrid-header-cell" style={{ width: "7%" }}>SL tối Đa</th>
                                                    <th className="jsgrid-header-cell" style={{ width: "7%" }}>SL có thể ứng</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.AdvanceRequestDetail.MaterialList && this.state.AdvanceRequestDetail.MaterialList.map((item, index) => {
                                                    return (
                                                        <tr key={"totalCurrency" + index}>
                                                            <td>{item.MaterialGroupName}</td>
                                                            {item.MaterialProductList.length > 1 ?
                                                                <td>
                                                                    <select className="form-control form-control-sm" name="ProductID"
                                                                        value={item.ProductID}
                                                                        id={item.MaterialGroupID}
                                                                        onChange={this.handleProductChange.bind(this)}
                                                                    >
                                                                        <option key={"ProductID0"} value={0}>--vui lòng chọn--</option>
                                                                        {item.MaterialProductList.map((optionItem) =>
                                                                            <option key={optionItem.MaterialProductID}
                                                                                value={optionItem.MaterialProductID}
                                                                                data-ProductName={optionItem.MaterialProductName}
                                                                                data-QuantityUnitID={optionItem.QuantityUnitID}
                                                                                data-QuantityUnit={optionItem.QuantityUnit}
                                                                                data-AdvanceProductID={optionItem.AdvanceProductID}
                                                                                data-AdvanceProductName={optionItem.AdvanceProductName}
                                                                                data-AdvanceQuantityUnitName={optionItem.AdvanceQuantityUnitName}
                                                                                data-AdvanceQuantityUnitID={optionItem.AdvanceQuantityUnitID}
                                                                                data-AdvanceConvertRatio={optionItem.AdvanceConvertRatio}
                                                                                data-CostPrice={optionItem.CostPrice}
                                                                                data-VAT={optionItem.VAT}
                                                                            >
                                                                                {optionItem.AdvanceProductID+"-"+optionItem.AdvanceProductName}</option>
                                                                        )}
                                                                    </select>
                                                                </td> : <td>{item.AdvanceProductID+"-"+item.AdvanceProductName}</td>}
                                                            <td>{item.AdvanceQuantityUnitName}</td>
                                                            <td>{item.IsAllowDecimal == false ?
                                                                <ElementInputModal.ElementModalNumberParser
                                                                    validationErrorMessage={""}
                                                                    name="Quantity"
                                                                    type="text"
                                                                    caption="số lượng"
                                                                    label=''
                                                                    dataSourcemember="Quantity"
                                                                    Colmd='12'
                                                                    colspan='12'
                                                                    min={0}
                                                                    max={(item.AdvanceLimitType == 1 ? ((item.AdvanceLimitQuantity - item.TotalQuantity * item.AdvanceConvertRatio) > 0 ? item.AdvanceLimitQuantity / item.AdvanceConvertRatio : 0) : 1000)}
                                                                    value={item.AdvanceQuantity > 0 ? item.AdvanceQuantity : ''}
                                                                    indexRow={index}
                                                                    disabled={item.CostPrice == 0 ? true : false}
                                                                    onValueChange={this.handleInputChange.bind(this)}

                                                                /> : <ElementInputModal.ElementModalNumber
                                                                    validationErrorMessage={""}
                                                                    name="Quantity"
                                                                    type="text"
                                                                    caption="số lượng"
                                                                    label=''
                                                                    dataSourcemember="Quantity"
                                                                    Colmd='12'
                                                                    colspan='12'
                                                                    min={0}
                                                                    max={(item.AdvanceLimitType == 1 ? ((item.AdvanceLimitQuantity - item.TotalQuantity * item.AdvanceConvertRatio) > 0 ? (item.AdvanceLimitQuantity - item.TotalQuantity).toFixed(1) : 0) : 1000)}
                                                                    value={item.AdvanceQuantity > 0 ? item.AdvanceQuantity : ''}
                                                                    indexRow={index}
                                                                    disabled={item.CostPrice == 0 ? true : false}
                                                                    onValueChange={this.handleInputChange.bind(this)}

                                                                />
                                                            }</td>
                                                            <td>{item.AdvanceConvertRatio}</td>
                                                            <td>{item.Quantity}</td>
                                                            <td>{(item.AdvanceLimitType == 1 ? item.AdvanceLimitQuantity : "")}</td>
                                                            {/* <td>{item.AdvanceLimitQuantity + "-" + item.TotalQuantity}</td> */}
                                                            <td>{(item.AdvanceLimitType == 1 ? ((item.AdvanceLimitQuantity - item.TotalQuantity * item.AdvanceConvertRatio) > 0 ? (item.AdvanceLimitQuantity - item.TotalQuantity * item.AdvanceConvertRatio).toFixed(1) : 0) : "")}</td>
                                                        </tr>
                                                    )
                                                })
                                                }
                                                <tr className="totalCurrency">
                                                    <td colSpan={3}>
                                                        <div className="groupTotalCurrency">
                                                            <span className="item txtTotal">Tổng tiền hạn mức nhân viên: {formatMoney(intSumTotalUserLimit, 0)}đ</span>
                                                        </div>
                                                    </td>
                                                    <td colSpan={3}>
                                                        <div className="groupTotalCurrency">
                                                            <span className="item txtTotal">Tổng tiền đã tạm ứng: {formatMoney(intSumTotalMoney, 0)}đ</span>
                                                        </div>
                                                    </td>

                                                    <td colSpan={3}>
                                                        <div className="groupTotalCurrency">
                                                            <span className="item txtTotal">Tổng tiền còn lại có thể tạm ứng: {formatMoney(intSumTotalUserLimit - intSumTotalMoney, 0)}đ</span>
                                                        </div>
                                                    </td>

                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
        else {
            return (
                <React.Fragment>
                    <div className="col-lg-12 page-detail">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                            <thead className="thead-light">

                                                <tr>
                                                    <th className="jsgrid-header-cell" style={{ width: "15%" }}>Nhóm vật tư</th>
                                                    <th className="jsgrid-header-cell" style={{ width: "25%" }}>Sản phẩm</th>
                                                    <th className="jsgrid-header-cell" style={{ width: "10%" }}>Đơn vị tính</th>
                                                    <th className="jsgrid-header-cell" style={{ width: "10%" }}>Số lượng tạm ứng</th>
                                                    <th className="jsgrid-header-cell" style={{ width: "7%" }}>Tỷ lệ qui đổi</th>
                                                    <th className="jsgrid-header-cell" style={{ width: "7%" }}>SL sau qui đổi</th>
                                                    <th className="jsgrid-header-cell" style={{ width: "7%" }}>SL tối Đa</th>
                                                    <th className="jsgrid-header-cell" style={{ width: "7%" }}>SL có thể ứng</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {objgroupByInstallBundleID != null &&
                                                    objgroupByInstallBundleID.map((rowItem, rowIndex) => {
                                                        let obj = materialListForAdvance[rowItem.InstallProductID];
                                                        return (
                                                            <React.Fragment>
                                                                <tr className="totalCurrency" key={"totalCurrency" + rowIndex}>
                                                                    <td colSpan={9}>
                                                                        <div className="groupTotalCurrency">
                                                                            <span className="item txtTotal">{rowItem.InstallProductID + " - " + rowItem.InstallProductName}</span>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                {obj.map((rowItemobj, Index) => {
                                                                    let TotalBundleQuantity = 1;
                                                                    let deTotalQuantity = 0;
                                                                    let objMaterialAdvanceDebtList = this.state.AdvanceRequestDetail.MaterialAdvanceDebtList.find(n => n.MaterialGroupID == rowItemobj.MaterialGroupID && n.ProductID == rowItemobj.ProductID);
                                                                    if (objMaterialAdvanceDebtList) {
                                                                        TotalBundleQuantity = objMaterialAdvanceDebtList.TotalBundleQuantity;
                                                                        deTotalQuantity = objMaterialAdvanceDebtList.TotalQuantity;
                                                                    }


                                                                    if (rowItemobj.MaterialProductList.length > 0) {
                                                                        return (
                                                                            <tr key={"totalCurrency" + Index}>
                                                                                <td>{rowItemobj.MaterialGroupName}</td>

                                                                                {rowItemobj.MaterialProductList.length > 1 ?
                                                                                    <td>
                                                                                        <select className="form-control form-control-sm" name="ProductID"
                                                                                            value={rowItemobj.ProductID}
                                                                                            id={rowItemobj.MaterialGroupID}
                                                                                            onChange={this.handleProductChangeNew.bind(this)}
                                                                                        >
                                                                                            <option key={"ProductID0"} value={0}>--vui lòng chọn--</option>
                                                                                            {rowItemobj.MaterialProductList.map((optionItem) =>
                                                                                                <option key={optionItem.MaterialProductID}
                                                                                                    value={optionItem.MaterialProductID}
                                                                                                    data-ProductName={optionItem.MaterialProductName}
                                                                                                    data-QuantityUnitID={optionItem.QuantityUnitID}
                                                                                                    data-QuantityUnit={optionItem.QuantityUnit}
                                                                                                    data-AdvanceProductID={optionItem.AdvanceProductID}
                                                                                                    data-AdvanceProductName={optionItem.AdvanceProductName}
                                                                                                    data-AdvanceQuantityUnitName={optionItem.AdvanceQuantityUnitName}
                                                                                                    data-AdvanceQuantityUnitID={optionItem.AdvanceQuantityUnitID}
                                                                                                    data-AdvanceConvertRatio={optionItem.AdvanceConvertRatio}
                                                                                                    data-CostPrice={optionItem.CostPrice}
                                                                                                    data-InstallProductID={rowItemobj.InstallProductID}
                                                                                                    data-VAT={optionItem.VAT}
                                                                                                >
                                                                                                    {optionItem.AdvanceProductID+"-"+optionItem.AdvanceProductName}</option>
                                                                                            )}
                                                                                        </select>
                                                                                    </td> : <td>{rowItemobj.AdvanceProductID+""+rowItemobj.AdvanceProductName}</td>}
                                                                                <td>{rowItemobj.AdvanceQuantityUnitName}</td>
                                                                                <td>
                                                                                    <input type="text" name={'Quantity'}
                                                                                        onChange={this.handleInputChangeNewProduct.bind(this)}
                                                                                        value={rowItemobj.AdvanceQuantity > 0 ? rowItemobj.AdvanceQuantity : ''}
                                                                                        className={"form-control form-control-sm"}
                                                                                        disabled={rowItemobj.AdvanceProductID == "" ? true : false}
                                                                                        data-MaterialGroupID={rowItemobj.MaterialGroupID}
                                                                                        data-InstallProductID={rowItem.InstallProductID}
                                                                                        maxLength={5}
                                                                                    />
                                                                                </td>
                                                                                <td>{rowItemobj.AdvanceConvertRatio}</td>
                                                                                <td>{rowItemobj.Quantity}</td>
                                                                                <td>{(rowItemobj.AdvanceLimitType == 1 ? rowItemobj.AdvanceLimitQuantity * TotalBundleQuantity : "")}</td>
                                                                                {/* <td>{item.AdvanceLimitQuantity + "-" + item.TotalQuantity}</td> */}
                                                                                <td>{(rowItemobj.AdvanceLimitType == 1 ? ((rowItemobj.AdvanceLimitQuantity - deTotalQuantity * rowItemobj.AdvanceConvertRatio) > 0 ? (rowItemobj.AdvanceLimitQuantity - deTotalQuantity * rowItemobj.AdvanceConvertRatio).toFixed(1) : 0) : "")}</td>
                                                                            </tr>
                                                                        );
                                                                    }
                                                                })
                                                                }

                                                            </React.Fragment>
                                                        );
                                                    })}
                                                <tr className="totalCurrency">
                                                    <td colSpan={3}>
                                                        <div className="groupTotalCurrency">
                                                            <span className="item txtTotal">Tổng tiền hạn mức nhân viên: {formatMoney(intSumTotalUserLimit, 0)}đ</span>
                                                        </div>
                                                    </td>
                                                    <td colSpan={3}>
                                                        <div className="groupTotalCurrency">
                                                            <span className="item txtTotal">Tổng tiền đã tạm ứng: {formatMoney(intSumTotalMoney, 0)}đ</span>
                                                        </div>
                                                    </td>

                                                    <td colSpan={3}>
                                                        <div className="groupTotalCurrency">
                                                            <span className="item txtTotal">Tổng tiền còn lại có thể tạm ứng: {formatMoney(intSumTotalUserLimit - intSumTotalMoney, 0)}đ</span>
                                                        </div>
                                                    </td>

                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
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


const AdvanceRequestDetailNew = connect(mapStateToProps, mapDispatchToProps)(AdvanceRequestDetailNewCom);
export default AdvanceRequestDetailNew;