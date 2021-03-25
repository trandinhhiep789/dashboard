import React, { Component } from 'react';
import DataGrid from '../../../../../common/components/DataGrid'
import { formatMonthYear } from "../../../../../common/library/CommonLib.js";
export default class ModalBox extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        const { UserName, Month, listColumn, dataSource } = this.props;
        console.log("1212", this.props)
        return (
            <React.Fragment>
                <div className="col-12" style={{ textAlign: "initial" }}>
                    <div className="row">
                        <div className="col-md-2">
                            <label className="col-form-label bold">Nhân viên:</label>
                        </div>
                        <div className="col-md-4">
                            <label className="col-form-label">{UserName}</label>
                        </div>

                        <div className="col-md-2">
                            <label className="col-form-label bold">Tháng:</label>
                        </div>
                        <div className="col-md-4">
                            <label className="col-form-label">{formatMonthYear(Month, true)}</label>
                        </div>
                    </div>
                </div>

                <DataGrid
                    listColumn={listColumn}
                    dataSource={dataSource}
                    IDSelectColumnName={"AdvanceRequestID"}
                    PKColumnName={"AdvanceRequestID"}
                    IsDelete={false}
                    IsAutoPaging={true}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    RowsPerPage={10}
                    IsExportFile={false}
                />
            </React.Fragment >
        )
    }
}
