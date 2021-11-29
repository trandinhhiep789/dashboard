import React from "react";
import { connect } from "react-redux";
import { ModalManager } from 'react-dynamic-modal';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import ReactNotification from "react-notifications-component";

import {
    APIHostName,
    listColumn,
    listelement,
    MLObjectDefinition,
    PagePath,
    APISearchPath,
} from "../constants";

import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";
import { MessageModal } from "../../../../../common/components/Modal";
import { showModal, hideModal } from '../../../../../actions/modal';
import { updatePagePath } from "../../../../../actions/pageAction";
import DataGrid from "../../../../../common/components/DataGrid";
import SearchForm from "../../../../../common/components/FormContainer/SearchForm";

class SearchCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gridData: [],
            IsDisabledBtn: false,
        };

        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();

        this.addNotification = this.addNotification.bind(this);
        this.handleExportSubmit = this.handleExportSubmit.bind(this);
        this.handleHistorySubmit = this.handleHistorySubmit.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleChangeSearchForm = this.handleChangeSearchForm.bind(this);
        this.showMessage = this.showMessage.bind(this);
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
    }

    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
            />
        );
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

    handleExportFile(excelData) {

        const ws = XLSX.utils.json_to_sheet(excelData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });

        FileSaver.saveAs(data, "Danh sách lỗi thực tế cho dịch vụ BHUQ và sửa chữa mới.xlsx");

        this.addNotification("Xuất file thành công!")

    }

    handleExportSubmit(formData, MLObject) {
        const SearchParamList = [
            {
                SearchKey: "@FROMDATE",
                SearchValue: MLObject.FromDate
            },
            {
                SearchKey: "@TODATE",
                SearchValue: MLObject.ToDate
            },
            {
                SearchKey: "@AREAID",
                SearchValue: MLObject.AreaID
            },
            {
                SearchKey: "@COORDINATORSTOREID",
                SearchValue: MLObject.CoordinatorStoreID
            },
            {
                SearchKey: "@SHIPMENTORDERTYPEID",
                SearchValue: MLObject.ShipmentOrderTypeID
            },
        ];

        this.props.callFetchAPI(APIHostName, APISearchPath, SearchParamList).then(apiResult => {
            if (!apiResult.IsError) {
                if (apiResult.ResultObject.length == 0) {
                    this.addNotification("Dữ liệu trống", apiResult.IsError);
                    this.setState({
                        gridData: []
                    })
                } else {
                    const uptResultObject = apiResult.ResultObject.map(item => {
                        return {
                            "Khu vực": `${item.AreaID} - ${item.AreaName}`,
                            "Kho điều phối": `${item.CoordinatorStoreID} - ${item.CoordinatorStoreName}`,
                            "Loại yêu cầu vận chuyển": `${item.ShipmentOrderTypeID} - ${item.ShipmentOrderTypeName}`,
                            "Mã vận đơn": item.ShipmentOrderID,
                            "Ngày hẹn giao": item.ExpectedDeliveryDate,
                            "Ngày cập nhật lỗi": item.UpdatedDate,
                            "Nhân viên cập nhật": `${item.UpdatedUser} - ${item.UpdatedUserFullName}`,
                            "Trường lỗi": `${item.SymptomID} - ${item.SymptomName}`,
                        }
                    })

                    this.handleExportFile(uptResultObject);
                }
            } else {
                this.showMessage(apiResult.Message);
            }
        });
    }

    handleHistorySubmit() {

    }

    handleSearchSubmit(formData, MLObject) {
        const SearchParamList = [
            {
                SearchKey: "@FROMDATE",
                SearchValue: MLObject.FromDate
            },
            {
                SearchKey: "@TODATE",
                SearchValue: MLObject.ToDate
            },
            {
                SearchKey: "@AREAID",
                SearchValue: MLObject.AreaID
            },
            {
                SearchKey: "@COORDINATORSTOREID",
                SearchValue: MLObject.CoordinatorStoreID
            },
            {
                SearchKey: "@SHIPMENTORDERTYPEID",
                SearchValue: MLObject.ShipmentOrderTypeID
            },
        ];

        this.props.callFetchAPI(APIHostName, APISearchPath, SearchParamList).then(apiResult => {
            if (!apiResult.IsError) {
                if (apiResult.ResultObject.length == 0) {
                    this.addNotification("Dữ liệu trống", apiResult.IsError);
                    this.setState({
                        gridData: []
                    })
                } else {
                    const uptResultObject = apiResult.ResultObject.map(item => {
                        return {
                            ...item,
                            AreaIDName: `${item.AreaID} - ${item.AreaName}`,
                            CoordinatorStoreIDName: `${item.CoordinatorStoreID} - ${item.CoordinatorStoreName}`,
                            ShipmentOrderTypeIDName: `${item.ShipmentOrderTypeID} - ${item.ShipmentOrderTypeName}`,
                            UpdatedUserIDName: `${item.UpdatedUser} - ${item.UpdatedUserFullName}`,
                            SymptomIDName: `${item.SymptomID} - ${item.SymptomName}`,
                        }
                    })

                    this.setState({
                        gridData: uptResultObject
                    })
                }
            } else {
                this.showMessage(apiResult.Message);
            }
        });
    }

    handleChangeSearchForm(FormDataContolLstd, MLObjectDefinition) {
        const FromDate = new Date(FormDataContolLstd.dtFromDate.value)
        const ToDate = new Date(FormDataContolLstd.dtToDate.value)

        if (FromDate > ToDate) {
            this.setState({
                IsDisabledBtn: true
            })
            this.addNotification("Từ ngày phải nhỏ hơn đến ngày", true);
        } else {
            this.setState({
                IsDisabledBtn: false
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />

                <SearchForm
                    className="multiple"
                    classNamebtnSearch="groupAction"
                    FormName="Báo cáo lỗi thực tế cho dịch vụ BHUQ và sửa chữa mới"
                    IsButtonExport={true}
                    IsButtonhistory={false}
                    IsDisabledBtnExport={this.state.IsDisabledBtn}
                    IsDisabledBtnSearch={this.state.IsDisabledBtn}
                    IsShowButtonSearch={true}
                    listelement={listelement}
                    MLObjectDefinition={MLObjectDefinition}
                    onchange={this.handleChangeSearchForm}
                    onExportSubmit={this.handleExportSubmit}
                    onHistorySubmit={this.handleHistorySubmit}
                    onSubmit={this.handleSearchSubmit}
                    ref={this.searchref}
                    TitleButtonExport="Xuất dữ liệu"
                />

                <DataGrid
                    dataSource={this.state.gridData}
                    IDSelectColumnName={""}
                    IsAutoPaging={true}
                    IsDelete={false}
                    IsExportFile={false}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    listColumn={listColumn}
                    PKColumnName={""}
                    RowsPerPage={20}
                />

            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        AppInfo: state,
        FetchAPIInfo: state.FetchAPIInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updatePagePath: pagePath => {
            dispatch(updatePagePath(pagePath));
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: (type, props) => {
            dispatch(hideModal(type, props));
        },
        callClearLocalCache: (cacheKeyID) => {
            return dispatch(callClearLocalCache(cacheKeyID));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchCom);