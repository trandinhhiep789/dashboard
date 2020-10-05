import React, { Component } from "react";
import { connect } from 'react-redux';
import DataGrid from "../../../../common/components/DataGrid";
import {DataGridHistoryColumnList} from '../constants'



class CurrentAdvanceDebtListCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CurrentAdvanceDebtList: this.props.dataSource

        }
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.dataSource) !== JSON.stringify(nextProps.dataSource)) {
            this.setState({
                CurrentAdvanceDebtList: nextProps.dataSource
            })
        }
    }


    render() {
        const { CurrentAdvanceDebtList } = this.state;
        return (
            <DataGrid
                listColumn={DataGridHistoryColumnList}
                dataSource={CurrentAdvanceDebtList}
                IDSelectColumnName={""}
                PKColumnName={""}
                IsDelete={false}
                IsAutoPaging={true}
                IsShowButtonAdd={false}
                IsShowButtonDelete={false}
                RowsPerPage={10}
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
const CurrentAdvanceDebtList = connect(mapStateToProps, mapDispatchToProps)(CurrentAdvanceDebtListCom);
export default CurrentAdvanceDebtList;