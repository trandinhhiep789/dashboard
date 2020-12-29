import React, { Component } from "react";
import { connect } from 'react-redux';
import { formatMoney } from '../../../../../utils/function';
import DataGrid from "../../../../../common/components/DataGrid";
import { DataGirdStaffDebtColumnList } from '../constants'

class DataGirdStaffDebtCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: this.props.dataSource,
            dataItem: this.props.dataItem

        }
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.dataSource) !== JSON.stringify(nextProps.dataSource)) {
            this.setState({
                dataSource: nextProps.dataSource
            })
        }
        if (JSON.stringify(this.props.dataItem) !== JSON.stringify(nextProps.dataItem)) {
            this.setState({
                dataItem: nextProps.dataItem
            })
        }

    }



    render() {
        const { dataItem, dataSource } = this.state;
        return (
            <React.Fragment>
                <div className="col-12" style={{ textAlign: 'initial' }}>
                    <div className="row">
                        <div className="col-md-2">
                            <label className="col-form-label bold">Nhân viên:</label>
                        </div>
                        <div className="col-md-4">
                            <label className="col-form-label">
                                {dataItem.FullNameMember}
                            </label>
                        </div>
                        <div className="col-md-2">
                            <label className="col-form-label bold">Kho điều phối:</label>
                        </div>
                        <div className="col-md-4">
                            <label className="col-form-label">
                                {dataItem.StoreID + " - " + dataItem.StoreName}
                            </label>
                        </div>

                        <div className="col-md-2">
                            <label className="col-form-label bold">Tổng tiền COD:</label>
                        </div>
                        <div className="col-md-2">
                            <label className="col-form-label">
                                {formatMoney(dataItem.TotalCOD, 0)}
                            </label>
                        </div>
                        <div className="col-md-2">
                            <label className="col-form-label bold">Tổng tiền vật tư:</label>
                        </div>
                        <div className="col-md-2">
                            <label className="col-form-label">
                                {formatMoney(dataItem.TotalSaleMaterialMoney, 0)}
                            </label>
                        </div>
                        <div className="col-md-2">
                            <label className="col-form-label bold">Tổng tiền cần thu:</label>
                        </div>
                        <div className="col-md-2">
                            <label className="col-form-label">
                                {formatMoney(dataItem.TotalMoney, 0)}
                            </label>
                        </div>

                        <div className="col-md-2">
                            <label className="col-form-label bold">Tiền đã thu của khách:</label>
                        </div>
                        <div className="col-md-2">
                            <label className="col-form-label">
                                {formatMoney(dataItem.CollectedTotalMoney, 0)}
                            </label>
                        </div>
                        <div className="col-md-2">
                            <label className="col-form-label bold">Tổng tiền nợ:</label>
                        </div>
                        <div className="col-md-2">
                            <label className="col-form-label">
                                {dataItem.TotalDebtOrders}
                            </label>
                        </div>
                        <div className="col-md-2">
                            <label className="col-form-label bold">Số đơn quá hạn:</label>
                        </div>
                        <div className="col-md-2">
                            <label className="col-form-label">
                                {dataItem.TotALoverDueDebtOrders}
                            </label>
                        </div>

                    </div>
                </div>

                <DataGrid
                    listColumn={DataGirdStaffDebtColumnList}
                    dataSource={dataSource}
                    IDSelectColumnName={"ShipmentOrderID"}
                    PKColumnName={"ShipmentOrderID"}
                    IsDelete={false}
                    IsAutoPaging={true}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    RowsPerPage={10}
                    IsExportFile={false}
                />
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
    }
}
const DataGirdStaffDebt = connect(mapStateToProps, mapDispatchToProps)(DataGirdStaffDebtCom);
export default DataGirdStaffDebt;