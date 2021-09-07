import React from "react";
import { connect } from "react-redux";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import ReactNotification from "react-notifications-component";

import {
    APIExportServiceAgreementAbility,
    APIExportServiceAgreementArea,
    APIExportServiceAgreementFeeAppendix,
    APIExportServiceAgreementStore,
    APIHostName,
    InitSearchParams,
    SearchAPIPath,
} from '../constants';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { formatDate } from "../../../../common/library/CommonLib.js";

class ExportExcelModalCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };

        this.handleClickAbility = this.handleClickAbility.bind(this);
        this.handleClickFeeAppendix = this.handleClickFeeAppendix.bind(this);
        this.handleClickServiceAgreement = this.handleClickServiceAgreement.bind(this);
        this.handleClickServiceAgreementArea = this.handleClickServiceAgreementArea.bind(this);
        this.handleClickServiceAgreementStore = this.handleClickServiceAgreementStore.bind(this);
        this.handleExportFileTemplate = this.handleExportFileTemplate.bind(this);
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
    }

    handleClickAbility() {
        this.props.callFetchAPI(APIHostName, APIExportServiceAgreementAbility, this.props.searchParamater).then(apiResult => {
            if (apiResult.IsError) {
                this.addNotification(apiResult.Message, apiResult.IsError);
            }
            else {
                const dataExport = apiResult.ResultObject.map((item) => {
                    return {
                        "Mã hợp đồng": item.ServiceAgreementID,
                        "Số hợp đồng": item.ServiceAgreementNumber,
                        "Loại mùa dịch vụ": item.ServiceSeasonTypeName,
                        "Từ ngày": item.FromDate,
                        "Đến ngày": item.ToDate,
                        "Theo tháng": item.MonthlyAbilityValue,
                        "Theo ngày": item.DailyAbilityValue
                    }
                });

                this.handleExportFileTemplate(dataExport, "Năng lực");
            }
        })
    }

    handleClickFeeAppendix() {
        this.props.callFetchAPI(APIHostName, APIExportServiceAgreementFeeAppendix, this.props.searchParamater).then(apiResult => {
            if (apiResult.IsError) {
                this.addNotification(apiResult.Message, apiResult.IsError);
            }
            else {
                const dataExport = apiResult.ResultObject.map((item) => {
                    return {
                        "Mã hợp đồng": item.ServiceAgreementID,
                        "Số hợp đồng": item.ServiceAgreementNumber,
                        "Tên Phụ lục": item.FeeAppendixName,
                        "Loại mùa dịch vụ": item.ServiceSeasonTypeName,
                        "Bảng giá": item.PNServicePriceTableName,
                        "Từ ngày": item.ApplyFromDate,
                        "Đến ngày": item.ApplyToDate,
                        "Thứ tự ưu tiên": item.PriorityIndex
                    }
                });

                this.handleExportFileTemplate(dataExport, "Phụ lục biểu phí");
            }
        })
    }

    handleClickServiceAgreement() {
        this.props.callFetchAPI(APIHostName, SearchAPIPath, this.props.searchParamater).then(apiResult => {
            if (apiResult.IsError) {
                this.addNotification(apiResult.Message, apiResult.IsError);
            }
            else {
                const dataExport = apiResult.ResultObject.map((item, index) => {
                    item.ExtendAgreement = item.ExtendedDate ? formatDate(item.ExtendedDate) : 'Chưa gia hạn';

                    let currentDate = new Date();


                    if (item.ExtendedDate != null) {
                        const ExtendedDate = new Date(item.ExtendedDate);
                        var timeDiff = Math.abs(currentDate.getTime() - ExtendedDate.getTime());
                        var diffDays = parseInt((timeDiff / (1000 * 3600 * 24)));

                        if (ExtendedDate.getTime() - currentDate.getTime() < 0) {
                            item.StatusAgreement = "Hết hạn";
                        }
                        else {
                            if (diffDays < 30) {
                                item.StatusAgreement = `Còn ${diffDays} ngày`;
                            }
                            else {
                                item.StatusAgreement = "Còn hạn";
                            }
                        }
                    }
                    else {

                        const ExpiredDate = new Date(item.ExpiredDate);
                        var timeDiff = Math.abs(currentDate.getTime() - ExpiredDate.getTime());
                        var diffDays = parseInt((timeDiff / (1000 * 3600 * 24)));
                        if (ExpiredDate.getTime() - currentDate.getTime() < 0) {
                            item.StatusAgreement = "Hết hạn";
                        }
                        else {
                            var timeDiff = Math.abs(currentDate.getTime() - ExpiredDate.getTime());
                            var diffDays = parseInt((timeDiff / (1000 * 3600 * 24)));
                            if (diffDays < 30) {
                                item.StatusAgreement = `Còn ${diffDays} ngày`;
                            }
                            else {
                                item.StatusAgreement = "Còn hạn";
                            }
                        }
                    }


                    let element = {
                        "Mã hợp đồng": item.ServiceAgreementID,
                        "Số hợp đồng": item.ServiceAgreementNumber,
                        "Loại hợp đồng": item.ServiceTypeID + "-" + item.ServiceTypeName,
                        "Loại dịch vụ": item.ServiceTypeName,
                        "Đơn vị vận chuyển": item.PartnerID + "-" + item.PartnerName,
                        "Người đại diện": item.DeputyUserName,
                        "Ngày ký hợp đồng": formatDate(item.SignedDate, true),
                        "Ngày hết hạn hợp đồng": formatDate(item.ExpiredDate, true),
                        "Đã gia hạn hợp đồng": item.IsExtended == false ? 0 : 1,
                        "Gia hạn đến ngày": formatDate(item.ExtendedDate, true),
                        "Đã thanh lý hợp đồng": item.IsLiquidated == false ? 0 : 1,
                        "Ngày thanh lý hợp đồng": formatDate(item.Liquidateddate, true),
                        "Đã ký quỹ": item.IsDeposited == false ? 0 : 1,
                        "Số tiền ký quỹ": item.dePoSitMoney,
                        "Ngày ký quỹ": formatDate(item.dePOSitedDate, true),
                        "Ghi chú ký quỹ": item.dePoSitNote,
                        "Mô tả": item.Description,
                    };

                    return element;
                });

                this.handleExportFileTemplate(dataExport, "Danh sách hợp đồng dịch vụ");
            }
        });
    }

    handleClickServiceAgreementArea() {
        this.props.callFetchAPI(APIHostName, APIExportServiceAgreementArea, this.props.searchParamater).then(apiResult => {
            if (apiResult.IsError) {
                this.addNotification(apiResult.Message, apiResult.IsError);
            }
            else {
                const dataExport = apiResult.ResultObject.map((item) => {
                    return {
                        "Mã hợp đồng": item.ServiceAgreementID,
                        "Số hợp đồng": item.ServiceAgreementNumber,
                        "Mã khu vực": item.AreaID,
                        "Tên khu vực": item.AreaName,
                        "Ngày ký": item.SignedDate,
                        "Kích hoạt": item.IsActived ? "Có" : "",
                        "Hệ thống": item.IsSystem ? "Có" : ""
                    }
                });

                this.handleExportFileTemplate(dataExport, "Danh sách khu vực áp dụng hợp đồng");
            }
        })
    }

    handleClickServiceAgreementStore() {
        this.props.callFetchAPI(APIHostName, APIExportServiceAgreementStore, this.props.searchParamater).then(apiResult => {
            if (apiResult.IsError) {
                this.addNotification(apiResult.Message, apiResult.IsError);
            }
            else {
                const dataExport = apiResult.ResultObject.map((item) => {
                    return {
                        "Mã hợp đồng": item.ServiceAgreementID,
                        "Số hợp đồng": item.ServiceAgreementNumber,
                        "Mã kho": item.StoreID,
                        "Tên kho": item.StoreName,
                        "Ngày ký": item.SignedDate,
                        "Kích hoạt": item.IsActived ? "Có" : "",
                        "Hệ thống": item.IsSystem ? "Có" : ""
                    }
                });

                this.handleExportFileTemplate(dataExport, "Danh sách kho áp dụng hợp đồng");
            }
        })
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
                    <button type="button" className="btn btn-info mb-2" onClick={this.handleClickServiceAgreement}>
                        Hợp đồng dịch vụ
                    </button>
                    <button type="button" className="btn btn-info mb-2" onClick={this.handleClickFeeAppendix}>
                        Phụ lục biểu phí
                    </button>
                    <button type="button" className="btn btn-info mb-2" onClick={this.handleClickAbility}>
                        Năng lực
                    </button>
                    <button type="button" className="btn btn-info mb-2" onClick={this.handleClickServiceAgreementArea}>
                        Khu vực áp dụng hợp đồng
                    </button>
                    <button type="button" className="btn btn-info mb-2" onClick={this.handleClickServiceAgreementStore}>
                        Kho áp dụng hợp đồng
                    </button>
                </div>
            </React.Fragment >
        )
    }
}

ExportExcelModalCom.defaultProps = {
    searchParamater: InitSearchParams
}

const mapDispatchToProps = dispatch => {
    return {
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        }
    };
};

export default connect(null, mapDispatchToProps)(ExportExcelModalCom);