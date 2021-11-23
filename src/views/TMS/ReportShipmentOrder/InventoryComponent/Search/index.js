import React from "react";
import { connect } from "react-redux";
import { ModalManager } from 'react-dynamic-modal';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import ReactNotification from "react-notifications-component";

import {
    APIExportPath,
    APIHostName,
    listColumn,
    listelement,
    MLObjectDefinition,
    PagePath,
} from "../constants";

import {
    ERPCOMMONCACHE_STORE,
} from '../../../../../constants/keyCache';

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
            StoreID: "",
            StoreName: ""
        };

        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();

        this.addNotification = this.addNotification.bind(this);
        this.handleExportSubmit = this.handleExportSubmit.bind(this);
        this.handleHistorySubmit = this.handleHistorySubmit.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleSetInventoryStatusID = this.handleSetInventoryStatusID.bind(this);
        this.handleSetMLObjectProductID = this.handleSetMLObjectProductID.bind(this);
        this.handleChangeSearchForm = this.handleChangeSearchForm.bind(this);
        this.callGetCacheStore = this.callGetCacheStore.bind(this);
        this.setInventoryStatusName = this.setInventoryStatusName.bind(this);
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

    callGetCacheStore(StoreID) {
        this.props.callGetCache(ERPCOMMONCACHE_STORE).then(result => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                const found = result.ResultObject.CacheData.find(item => item.CompanyID == 10 && item.StoreID == StoreID);

                if (found) {
                    this.setState({
                        StoreID: found.StoreID,
                        StoreName: found.StoreName
                    })
                }
            }
        })
    }

    setInventoryStatusName(InventoryStatusID) {
        switch (InventoryStatusID) {
            case 1:
                return "Mới";
            case 2:
                return "Trả xác";
            case 5:
                return "Thanh lý";
            default:
                break;
        }
    }

    handleExportFile(excelData) {

        const ws = XLSX.utils.json_to_sheet(excelData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });

        FileSaver.saveAs(data, "Danh sách định nghĩa kho điều phối giao hàng.xlsx");

        this.addNotification("Xuất file thành công!")

    }

    handleSetMLObjectProductID(parameter) {
        if (parameter == -1 || parameter == "") {
            return "";
        } else {
            const uptParameter = parameter.reduce((acc, val) => {
                if (val.ProductID == -1) {
                    return acc;
                } else {
                    if (acc == "") {
                        return `${val.ProductID}`;
                    } else {
                        return `${acc},${val.ProductID}`;
                    }
                }
            }, "");

            return uptParameter;
        }
    }

    handleSetInventoryStatusID(parameter) {
        if (parameter == -1 || parameter == "" || parameter == "1,2,5") {
            return "1,2,5";
        } else if (parameter == 1) {
            return "1";
        } else {
            const filtered = parameter.filter((item) => item != -1);
            let result = filtered.toString();
            return result;
        }
    }

    handleExportSubmit(formData, MLObject) {
        if (MLObject.StoreID == -1) {
            this.addNotification("Vui lòng chọn Mã Kho", true);
            return;
        }

        const uptMLObject = {
            StoreID: MLObject.StoreID,
            ProductIDList: this.handleSetMLObjectProductID(MLObject.ProductID),
            InventoryStatusIDList: this.handleSetInventoryStatusID(MLObject.InventoryStatusID),
            // MainGroupIDList: MLObject.MainGroupID == -1 ? "" : MLObject.MainGroupID.toString(),
            // SubGroupIDList: MLObject.SubGroupID == -1 ? "" : MLObject.SubGroupID.toString()
            MainGroupIDList: 624,
            SubGroupIDList: 1771
        }

        this.props.callFetchAPI(APIHostName, APIExportPath, uptMLObject).then(apiResult => {
            if (!apiResult.IsError) {
                if (apiResult.ResultObject == null || apiResult.ResultObject.length == 0) {
                    this.addNotification("Dữ liệu trống không thể xuất file", true);
                } else {
                    const updResultObject = apiResult.ResultObject.map(item => {
                        return {
                            "Mã kho": item.STOREID,
                            "Tên kho": this.state.StoreName,
                            "Mã sản phẩm": item.PRODUCTID,
                            "Tên sản phẩm": item.PRODUCTNAME,
                            "Tên trạng thái": this.setInventoryStatusName(item.INVENTORYSTATUSID),
                            "Số lượng tồn": item.QUANTITY
                        }
                    });

                    this.handleExportFile(updResultObject)
                }
            } else {
                this.showMessage(apiResult.Message);
            }
        });
    }

    handleHistorySubmit() {

    }

    handleSearchSubmit(formData, MLObject) {
        if (MLObject.StoreID == -1) {
            this.addNotification("Vui lòng chọn Mã Kho", true);
            return;
        }

        const uptMLObject = {
            StoreID: MLObject.StoreID,
            ProductIDList: this.handleSetMLObjectProductID(MLObject.ProductID),
            InventoryStatusIDList: this.handleSetInventoryStatusID(MLObject.InventoryStatusID),
            // MainGroupIDList: MLObject.MainGroupID == -1 ? "" : MLObject.MainGroupID.toString(),
            // SubGroupIDList: MLObject.SubGroupID == -1 ? "" : MLObject.SubGroupID.toString()
            MainGroupIDList: 624,
            SubGroupIDList: 1771
        }

        this.props.callFetchAPI(APIHostName, APIExportPath, uptMLObject).then(apiResult => {
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
                            STORENAME: this.state.StoreName,
                            INVENTORYSTATUSNAME: this.setInventoryStatusName(item.INVENTORYSTATUSID)
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
        if (this.state.StoreID != FormDataContolLstd.cbStoreID.value) {
            this.callGetCacheStore(FormDataContolLstd.cbStoreID.value);
        }
    }

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />

                <SearchForm
                    className="multiple"
                    classNamebtnSearch="groupAction"
                    FormName="Báo cáo tồn kho linh kiện"
                    IsButtonExport={true}
                    IsButtonhistory={false}
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