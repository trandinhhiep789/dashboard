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
        let VAT = e.target[e.target.selectedIndex].getAttribute('data-VAT');
        let { AdvanceRequestDetail } = this.state
        const objAdvanceRequestDetail = AdvanceRequestDetail.MaterialList.find(n => n['MaterialGroupID'] == MaterialGroupID)
        objAdvanceRequestDetail.ProductID = ProductID;
        objAdvanceRequestDetail.ProductName = ProductName;
        objAdvanceRequestDetail.QuantityUnitID = QuantityUnitID;
        objAdvanceRequestDetail.QuantityUnit = QuantityUnit;
        objAdvanceRequestDetail.CostPrice = CostPrice;
        objAdvanceRequestDetail.VAT = VAT;
        // console.log("objAdvanceRequestDetail",objAdvanceRequestDetail,AdvanceRequestDetail);
        this.setState({
            AdvanceRequestDetail: AdvanceRequestDetail
        })



    }

    handleInputChange(name, inputvalue, index) {
        let { AdvanceRequestDetail } = this.state
        AdvanceRequestDetail.MaterialList[index].Quantity = inputvalue
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
            objAdvanceRequestDetail.Quantity = parseInt(value);
        }
        else {
            objAdvanceRequestDetail.Quantity = 0;
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
        if (parseInt(value) > 0) {
            objAdvanceRequestDetail.Quantity = parseInt(value);
        }
        else {
            objAdvanceRequestDetail.Quantity = 0;
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
                intSumTotalMoney = this.state.AdvanceRequestDetail.MaterialAdvanceDebtList[0].SumTotalMoney;
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
                                                    <th className="jsgrid-header-cell" style={{ width: "15%" }}>Mã sản phẩm</th>
                                                    <th className="jsgrid-header-cell" style={{ width: "25%" }}>Tên sản phẩm</th>
                                                    <th className="jsgrid-header-cell" style={{ width: "7%" }}>SL tối Đa</th>
                                                    <th className="jsgrid-header-cell" style={{ width: "7%" }}>SL có thể ứng</th>
                                                    <th className="jsgrid-header-cell" style={{ width: "15%" }}>Số lượng tạm ứng</th>
                                                    <th className="jsgrid-header-cell" style={{ width: "10%" }}>Đơn giá</th>
                                                    <th className="jsgrid-header-cell" style={{ width: "10%" }}>Đơn vị tính</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.AdvanceRequestDetail.MaterialList && this.state.AdvanceRequestDetail.MaterialList.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{item.MaterialGroupName}</td>
                                                            {item.MaterialProductList.length > 1 ?
                                                                <div>
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
                                                                                data-CostPrice={optionItem.CostPrice}
                                                                                data-VAT={optionItem.VAT}
                                                                            >
                                                                                {optionItem.MaterialProductID}</option>
                                                                        )}
                                                                    </select>
                                                                </div> : <td>{item.ProductID}</td>}
                                                            <td>{item.ProductName}</td>
                                                            <td>{(item.AdvanceLimitType == 1 ? item.AdvanceLimitQuantity : "")}</td>
                                                            <td>{(item.AdvanceLimitType == 1 ? (item.AdvanceLimitQuantity - item.TotalQuantity) : "")}</td>
                                                            <td><ElementInputModal.ElementModalNumber
                                                                validationErrorMessage={""}
                                                                name="Quantity"
                                                                type="text"
                                                                caption="số lượng"
                                                                label=''
                                                                dataSourcemember="Quantity"
                                                                Colmd='12'
                                                                min={0}
                                                                max={(item.AdvanceLimitType == 1 ? (item.AdvanceLimitQuantity - item.TotalQuantity) : 1000)}
                                                                value={item.Quantity}
                                                                indexRow={index}
                                                                disabled={item.CostPrice == 0 ? true : false}
                                                                onValueChange={this.handleInputChange.bind(this)}

                                                            /></td>
                                                            <td>{item.CostPrice}</td>
                                                            <td>{item.QuantityUnit}</td>
                                                        </tr>
                                                    )
                                                })
                                                }
                                                <tr className="totalCurrency">
                                                    <td colSpan={2}>
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
                                                    <th className="jsgrid-header-cell" style={{ width: "15%" }}>Mã sản phẩm</th>
                                                    <th className="jsgrid-header-cell" style={{ width: "25%" }}>Tên sản phẩm</th>
                                                    <th className="jsgrid-header-cell" style={{ width: "7%" }}>SL tối Đa</th>
                                                    <th className="jsgrid-header-cell" style={{ width: "7%" }}>SL có thể ứng</th>
                                                    <th className="jsgrid-header-cell" style={{ width: "15%" }}>Số lượng tạm ứng</th>
                                                    <th className="jsgrid-header-cell" style={{ width: "10%" }}>Đơn giá</th>
                                                    <th className="jsgrid-header-cell" style={{ width: "10%" }}>Đơn vị tính</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {objgroupByInstallBundleID != null &&
                                                    objgroupByInstallBundleID.map((rowItem, rowIndex) => {
                                                        let obj = materialListForAdvance[rowItem.InstallProductID];
                                                        return (
                                                            <React.Fragment>
                                                                <tr className="totalCurrency" key={"totalCurrency" + rowIndex}>
                                                                    <td colSpan={7}>
                                                                        <div className="groupTotalCurrency">
                                                                            <span className="item txtTotal">{rowItem.InstallProductID + " - " + rowItem.InstallProductName}</span>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                {obj.map((rowItemobj, Index) => {
                                                                    if (rowItemobj.MaterialProductList.length > 0) {
                                                                        return (
                                                                            <tr key={"totalCurrency" + Index}>
                                                                                <td>{rowItemobj.MaterialGroupName}</td>
                                                                                
                                                                                {rowItemobj.MaterialProductList.length > 1 ?
                                                                                    <td>
                                                                                        <select className="form-control form-control-sm" name="ProductID"
                                                                                            value={rowItemobj.ProductID}
                                                                                            id={rowItemobj.MaterialGroupID}
                                                                                            onChange={this.handleProductChange.bind(this)}
                                                                                        >
                                                                                            <option key={"ProductID0"} value={0}>--vui lòng chọn--</option>
                                                                                            {rowItemobj.MaterialProductList.map((optionItem) =>
                                                                                                <option key={optionItem.MaterialProductID}
                                                                                                    value={optionItem.MaterialProductID}
                                                                                                    data-ProductName={optionItem.MaterialProductName}
                                                                                                    data-QuantityUnitID={optionItem.QuantityUnitID}
                                                                                                    data-QuantityUnit={optionItem.QuantityUnit}
                                                                                                    data-CostPrice={optionItem.CostPrice}
                                                                                                    data-VAT={optionItem.VAT}
                                                                                                >
                                                                                                    {optionItem.MaterialProductID}</option>
                                                                                            )}
                                                                                        </select>
                                                                                    </td> : <td>{rowItemobj.ProductID}</td>}
                                                                                <td>{rowItemobj.ProductName}</td>
                                                                                <td>{(rowItemobj.AdvanceLimitType == 1 ? rowItemobj.AdvanceLimitQuantity : "")}</td>
                                                                                <td>{(rowItemobj.AdvanceLimitType == 1 ? (rowItemobj.AdvanceLimitQuantity - this.AdvanceLimitQuantity(rowItemobj.MaterialGroupID, rowItemobj.ProductID)) : "")}</td>
                                                                                <td>
                                                                                    <input type="text" name={'Quantity'}
                                                                                        onChange={this.handleInputChangeNewProduct.bind(this)}
                                                                                        value={rowItemobj.Quantity}
                                                                                        className={"form-control form-control-sm"}
                                                                                        disabled={rowItemobj.CostPrice == 0 ? true : false}
                                                                                        data-MaterialGroupID={rowItemobj.MaterialGroupID}
                                                                                        data-InstallProductID={rowItem.InstallProductID}
                                                                                        maxLength={5}
                                                                                    />
                                                                                </td>
                                                                                <td>{rowItemobj.CostPrice}</td>
                                                                                <td>{rowItemobj.QuantityUnit}</td>
                                                                            </tr>
                                                                        );
                                                                    }
                                                                })
                                                                }

                                                            </React.Fragment>
                                                        );
                                                    })}
                                                <tr className="totalCurrency">
                                                    <td colSpan={2}>
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