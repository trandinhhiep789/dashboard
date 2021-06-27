import React, { Component } from 'react';
import ReactNotification from "react-notifications-component";


import DataGrid from '../../../../../common/components/DataGrid'
import { formatMonthYear } from "../../../../../common/library/CommonLib.js";
export default class ModalBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isExportFile: false,
        }

        this.handleExportFile = this.handleExportFile.bind(this);
        this.addNotification = this.addNotification.bind(this);

        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        const { dataSource } = this.props;

        try {
            dataSource.length > 0 && this.setState({
                isExportFile: true
            })
        } catch (error) {
            console.log(error)
        }
    }

    addNotification(message1, IsError) {
        let cssNotification, iconNotification;
        if (!IsError) {
            cssNotification = "notification-custom-success";
            iconNotification = "fa fa-check"
        } else {
            cssNotification = "notification-danger";
            iconNotification = "fa fa-exclamation"
        }
        this.notificationDOMRef.current.addNotification({
            container: "bottom-right",
            content: (
                <div className={cssNotification}>
                    <div className="notification-custom-icon">
                        <i className={iconNotification} />
                    </div>
                    <div className="notification-custom-content">
                        <div className="notification-close">
                            <span>×</span>
                        </div>
                        <h4 className="notification-title">Thông Báo</h4>
                        <p className="notification-message">{message1}</p>
                    </div>
                </div>
            ),
            dismiss: { duration: 6000 },
            dismissable: { click: true }
        });
    }

    handleExportFile(result) {
        this.addNotification(result.Message, result.IsError);
    }

    render() {
        const { UserName, Month, listColumn, dataSource, fileName, dataExport } = this.props;

        const { isExportFile } = this.state;

        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />

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
                    IsExportFile={isExportFile}
                    DataExport={dataExport}
                    onExportFile={this.handleExportFile}
                    fileName={fileName}
                />
            </React.Fragment >
        )
    }
}
