import React, { Component } from "react";
import { connect } from 'react-redux';
import DataGrid from "../../../../common/components/DataGrid";
import { DataGridHistoryColumnList } from '../constants'



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
            <React.Fragment>
                <div className="col-lg-12">
                    <div className="row mt-10 ">
                        <div className="col-md-2">
                            <label className="col-form-label bold ">Nhóm vật tư:</label>
                        </div>
                        <div className="col-md-4 text-left">
                            <label className="col-form-label ">{CurrentAdvanceDebtList[0].MaterialGroupID}</label>
                        </div><div className="col-md-2">
                            <label className="col-form-label bold">Mã sản phẩm:</label>
                        </div>
                        <div className="col-md-4 text-left">
                            <label className="col-form-label">
                                {CurrentAdvanceDebtList[0].ProductID}
                            </label>
                        </div>
                    </div>
                </div>

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
const CurrentAdvanceDebtList = connect(mapStateToProps, mapDispatchToProps)(CurrentAdvanceDebtListCom);
export default CurrentAdvanceDebtList;