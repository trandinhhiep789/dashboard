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

        }
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.dataSource) !== JSON.stringify(nextProps.dataSource)) {
            this.setState({
                dataSource: nextProps.dataSource
            })
        }

    }



    render() {
        const { dataSource } = this.state;
        return (

            <DataGrid
                listColumn={DataGirdStaffDebtColumnList}
                dataSource={dataSource}
                IDSelectColumnName={"ShipmentOrderID"}
                PKColumnName={"ShipmentOrderID"}
                IsDelete={false}
                IsAutoPaging={true}
                IsShowButtonAdd={false}
                IsShowButtonDelete={false}
                RowsPerPage={20}
                IsExportFile={false}
            />
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