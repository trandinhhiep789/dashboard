import React, { Component } from "react";
import { connect } from 'react-redux';
import { showModal, hideModal } from '../../../../../actions/modal';
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import ElementInputModal from '../../../../../common/components/FormContainer/FormElement/ElementInputModal';
import { formatMoney } from '../../../../../utils/function';
import Select from 'react-select';
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
        const objAdvanceRequestDetail = AdvanceRequestDetail.find(n => n['MaterialGroupID'] == MaterialGroupID)
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
        AdvanceRequestDetail[index].Quantity = inputvalue
        this.setState({ AdvanceRequestDetail: AdvanceRequestDetail });
        if (this.props.onValueChangeGrid != null)
            this.props.onValueChangeGrid(AdvanceRequestDetail);

    }
    handleInputChangeBox(name, inputvalue, index) {
        let { AdvanceRequestDetail } = this.state
        AdvanceRequestDetail[index].QuantityUnitID = inputvalue
        this.setState({ AdvanceRequestDetail: AdvanceRequestDetail });
        if (this.props.onValueChangeGrid != null)
            this.props.onValueChangeGrid(AdvanceRequestDetail);


    }

    groupBy(list, props) {
        return list.reduce((a, b) => {
            (a[b[props]] = a[b[props]] || []).push(b);
            return a;
        }, {});
    }

    render() {
        let intSumTotalUserLimit = 0;
        let intSumTotalMoney = 0;
        // if (this.state.AdvanceRequestDetail.length > 0) {
        //     // intSumTotalUserLimit = this.state.AdvanceRequestDetail[0].SumTotalUserLimit;
        //     // intSumTotalMoney = this.state.AdvanceRequestDetail[0].SumTotalMoney;

        // }
        console.log("AdvanceRequestDetail",this.props.AdvanceRequestDetail,this.state.AdvanceRequestDetail)
        console.log("MaterialList",this.state.AdvanceRequestDetail,this.state.AdvanceRequestDetail.MaterialList)

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
                                                        {/* {item.AdvanceRequestDetaiChildlList.length > 0 ?
                                                            <div>
                                                                <select className="form-control form-control-sm" name="ProductID"
                                                                    value={item.ProductID}
                                                                    id={item.MaterialGroupID}
                                                                    onChange={this.handleProductChange.bind(this)}
                                                                >
                                                                    <option key={"ProductID0"} value={0}>--vui lòng chọn--</option>
                                                                    {item.AdvanceRequestDetaiChildlList.map((optionItem) =>
                                                                        <option key={optionItem.ProductID}
                                                                            value={optionItem.ProductID}
                                                                            data-ProductName={optionItem.ProductName}
                                                                            data-QuantityUnitID={optionItem.QuantityUnitID}
                                                                            data-QuantityUnit={optionItem.QuantityUnit}
                                                                            data-CostPrice={optionItem.CostPrice}
                                                                            data-VAT={optionItem.VAT}
                                                                        >
                                                                            {optionItem.ProductID}</option>
                                                                    )}
                                                                </select>
                                                            </div> : <td>{item.ProductID}</td>} */}

                                                        <td>{item.ProductName}</td>
                                                        <td>{(item.AdvanceLimitType == 1 ? item.AdvanceLimitQuantity * this.props.ShipmentOrderCount : 0)}</td>
                                                        <td>{(item.AdvanceLimitQuantity * this.props.ShipmentOrderCount) - item.TotalQuantity}</td>
                                                        <td><ElementInputModal.ElementModalNumber
                                                            validationErrorMessage={""}
                                                            name="Quantity"
                                                            type="text"
                                                            caption="số lượng"
                                                            label=''
                                                            dataSourcemember="Quantity"
                                                            Colmd='12'
                                                            min={0}
                                                            max={(item.AdvanceLimitType == 1 ? (item.AdvanceLimitQuantity * this.props.ShipmentOrderCount - item.TotalQuantity) : 1000)}
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