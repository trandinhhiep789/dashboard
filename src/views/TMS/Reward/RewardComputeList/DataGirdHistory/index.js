import React, { Component } from "react";
import { connect } from 'react-redux';
import { formatMoney } from '../../../../../utils/function';
import DataGrid from "../../../../../common/components/DataGrid";
import { DataGirdHistoryColumnList } from '../constants'

class DataGirdHistoryCom extends Component {
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
                {
                    dataSource.length > 0 && <DataGrid
                        listColumn={DataGirdHistoryColumnList}
                        dataSource={dataSource}
                        IDSelectColumnName={"ConfirmLogID"}
                        PKColumnName={"ConfirmLogID"}
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
const DataGirdHistory = connect(mapStateToProps, mapDispatchToProps)(DataGirdHistoryCom);
export default DataGirdHistory;