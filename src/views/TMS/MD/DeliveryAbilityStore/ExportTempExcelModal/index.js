import React from "react";
import { connect } from "react-redux";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import ReactNotification from "react-notifications-component";

import {
    TemplateExportDAStoreGoodsGroup
} from "../constants";

class ExportTempExcelModalCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };

        this.handleDAStoreGoodsGroup = this.handleDAStoreGoodsGroup.bind(this);
        this.handleExportFileTemplate = this.handleExportFileTemplate.bind(this);
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
    }

    handleDAStoreGoodsGroup() {
        this.handleExportFileTemplate(TemplateExportDAStoreGoodsGroup, "Danh sách tỷ lệ phân bố tải theo từng kho");
    }


    handleExportFileTemplate(dataTemplate, fileName) {
        try {
            const ws = XLSX.utils.json_to_sheet([{}]);
            XLSX.utils.sheet_add_json(ws, dataTemplate);

            const wb = {
                Sheets: { "data": ws },
                SheetNames: ["data"]
            };
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const data = new Blob(
                [excelBuffer],
                { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' }
            );
            FileSaver.saveAs(data, `${fileName}.xlsx`);

            this.addNotification("Xuất file thành công!", false);
        } catch (error) {
            this.addNotification("Lỗi xuất file!", true);
        }
    }

    addNotification(message, IsError) {
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
                        <p className="notification-message">{message}</p>
                    </div>
                </div>
            ),
            dismiss: { duration: 6000 },
            dismissable: { click: true }
        });
    }

    render() {
        return (
            < React.Fragment >
                <ReactNotification ref={this.notificationDOMRef} />

                <div className="d-flex flex-column p-4">
                    <button type="button" className="btn btn-info mb-2" onClick={this.handleDAStoreGoodsGroup}>
                        Danh sách tỷ lệ phân bố tải theo từng kho
                    </button>
                </div>
            </React.Fragment >
        )
    }
}

export default connect(null, null)(ExportTempExcelModalCom);