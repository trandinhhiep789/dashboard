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
                <div className="header-modal-box">
                    <div>Nhân viên: {UserName}</div>
                    <div>Tháng: {Month}</div>
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
            </React.Fragment>
        )
    }
}
