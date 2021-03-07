import React, { Component } from 'react';
import DataGrid from '../../../../../common/components/DataGrid'

export default class ModalBox extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        const { firstLabel, secondLabel, listColumn, dataSource } = this.props;
        return (
            <React.Fragment>
                <div className="header-modal-box">
                    <div>{firstLabel}: 123</div>
                    <div>{secondLabel}: 0</div>
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
