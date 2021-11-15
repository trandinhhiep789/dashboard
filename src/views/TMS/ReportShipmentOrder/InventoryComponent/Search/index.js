import React from "react";
import { connect } from "react-redux";
import { ModalManager } from 'react-dynamic-modal';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import ReactNotification from "react-notifications-component";

import {
    APIExportPath,
    APIHostName,
    listelement,
    MLObjectDefinition,
    PagePath,
} from "../constants";

import SearchForm from "../../../../../common/components/FormContainer/SearchForm";
import { MessageModal } from "../../../../../common/components/Modal";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callGetCache } from "../../../../../actions/cacheAction";
import { showModal, hideModal } from '../../../../../actions/modal';

class SearchCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            exportData: null
        };

        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();

        this.addNotification = this.addNotification.bind(this);
        this.handleExportSubmit = this.handleExportSubmit.bind(this);
        this.handleHistorySubmit = this.handleHistorySubmit.bind(this);
        this.handleSetMLObjectStoreID = this.handleSetMLObjectStoreID.bind(this);
        this.handleSetInventoryStatusID = this.handleSetInventoryStatusID.bind(this);
        this.handleSetMLObjectProductID = this.handleSetMLObjectProductID.bind(this);
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
        if (excelData.length == 0) {
            this.addNotification("Dữ liệu không tồn tại. Không thể xuất file!")
        } else {
            const ws = XLSX.utils.json_to_sheet(excelData);
            const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });

            FileSaver.saveAs(data, "Danh sách định nghĩa kho điều phối giao hàng.xlsx");

            this.addNotification("Xuất file thành công!")
        }
    }

    handleSetMLObjectStoreID(parameter) {
        if (parameter == -1 || parameter == "") {
            return "";
        } else {
            const result = parameter.reduce((acc, val) => {
                if (val == -1) {
                    return acc;
                } else {
                    return `<${val}>${acc}`
                }
            }, "");
            return result;
        }
    }

    handleSetMLObjectProductID(parameter) {
        if (parameter == -1 || parameter == "") {
            return "";
        } else {
            const uptParameter = parameter.map(item => item.ProductID);
            let result = uptParameter.toString();
            return result;
        }
    }

    handleSetInventoryStatusID(parameter) {
        if (parameter == -1 || parameter == "") {
            return "";
        } else {
            const filtered = parameter.filter((item) => item != -1);
            let result = filtered.toString();
            return result;
        }
    }

    handleExportSubmit(formData, MLObject) {
        const uptMLObject = {
            StoreIDList: this.handleSetMLObjectStoreID(MLObject.StoreID),
            ProductIDList: this.handleSetMLObjectProductID(MLObject.ProductID),
            InventoryStatusIDList: this.handleSetInventoryStatusID(MLObject.InventoryStatusID),
        }

        this.props.callFetchAPI(APIHostName, APIExportPath, uptMLObject).then(apiResult => {
            console.log(uptMLObject, apiResult)
            if (!apiResult.IsError) {
                const updResultObject = apiResult.ResultObject.map(item => {
                    return {
                        "Mã kho": item.STOREID,
                        "Sản phẩm": item.PRODUCTID,
                        "Trạng thái": item.INVENTORYSTATUSID,
                        "Số lượng tồn": item.QUANTITY
                    }
                });

                this.handleExportFile(updResultObject)
            } else {
                this.showMessage(apiResult.Message);
            }
        });
    }

    handleHistorySubmit() {

    }

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />

                <SearchForm
                    className="multiple"
                    FormName="Báo cáo tồn kho linh kiện"
                    IsButtonExport={true}
                    IsButtonhistory={false}
                    IsShowButtonSearch={false}
                    listelement={listelement}
                    MLObjectDefinition={MLObjectDefinition}
                    onExportSubmit={this.handleExportSubmit}
                    onHistorySubmit={this.handleHistorySubmit}
                    // onSubmit={}
                    ref={this.searchref}
                    TitleButtonExport="Xuất dữ liệu"
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
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchCom);