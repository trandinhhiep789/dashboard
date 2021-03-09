import React, { Component } from 'react';
import DataGrid from '../../../../../common/components/DataGrid'

export default class ModalBox extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        const { UserName, Month, listColumn, dataSource } = this.props;
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
                            <label className="col-form-label">{Month}</label>
                        </div>
                    </div>
                </div>

                <DataGrid
                    listColumn={listColumn}
                    dataSource={dataSource}
                    IDSelectColumnName={""}
                    PKColumnName={""}
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
