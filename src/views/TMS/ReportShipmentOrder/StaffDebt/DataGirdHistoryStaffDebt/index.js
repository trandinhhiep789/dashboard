import React, { Component } from "react";
import { connect } from 'react-redux';
import { formatMoney } from '../../../../../utils/function';
import DataGrid from "../../../../../common/components/DataGrid";
import { DataGirdStaffDebtHistoryColumnList } from '../constants'

class DataGirdHistoryStaffDebtCom extends Component {
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
                    </div>
                </div>

                {
                    dataSource.length > 0 && <DataGrid
                        listColumn={DataGirdStaffDebtHistoryColumnList}
                        dataSource={dataSource}
                        IDSelectColumnName={"strunLockLogID"}
                        PKColumnName={"strunLockLogID"}
                        IsDelete={false}
                        IsAutoPaging={true}
                        IsShowButtonAdd={false}
                        IsShowButtonDelete={false}
                        RowsPerPage={10}
                        IsExportFile={false}
                    />
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
    }
}
const DataGirdHistoryStaffDebt = connect(mapStateToProps, mapDispatchToProps)(DataGirdHistoryStaffDebtCom);
export default DataGirdHistoryStaffDebt;