import React from "react";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import SearchForm from "../../../../common/components/FormContainer/SearchForm";
//import DataGrid from "../../../../common/components/DataGrid/getdataserver.js";
import DataGrid from "../../../../common/components/DataGrid";
import { MessageModal } from "../../../../common/components/Modal";
import { formatDate } from "../../../../common/library/CommonLib.js";
import { showModal, hideModal } from '../../../../actions/modal';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { TMS_CURRENTADVANCEDEBT_VIEW } from "../../../../constants/functionLists";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import {
    SearchElementList,
    SearchMLObjectDefinition,
    DataGridColumnList,
    APIHostName,
    SearchAPIPath,
    PagePath,
    TitleFormSearch,
    SearchHistoryAPIPath,
    SearchExportAPIPath

} from "../constants";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { MODAL_TYPE_COMMONTMODALS } from "../../../../constants/actionTypes";
import CurrentAdvanceDebtList from "../Component/CurrentAdvanceDebtList";

class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.handleGetDatat = this.handleGetDatat.bind(this);

        this.state = {
            CallAPIMessage: "",
            gridDataSource: [],
            IsCallAPIError: false,
            IsLoadDataComplete: false,
            widthPercent: "",
            userName: '',
            cssNotification: "notification-custom-success",
            iconNotification: "fa fa-check",
            dataExport: []

        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);

        this.setState({
            userName: this.props.AppInfo.LoginInfo.Username
        })
        const LoginInfo = JSON.parse(localStorage.getItem('LoginInfo'));
        this.handleGetDatat(LoginInfo.LoginUserInfo.UserName)
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({
            widthPercent: (window.innerWidth * 90) / 100
        })
    };

    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
            />
        );
    }

    handleGetDatat(id) {
        this.props.callFetchAPI(APIHostName, SearchAPIPath, id).then(apiResult => {//MLObject.UserName.value
            console.log("apiResult", apiResult)
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError,
                    dataExport: [],
                    gridDataSource: [],
                });
                this.showMessage(apiResult.Message);
            }
            else {

                // xuất exel
                const exelData = apiResult.ResultObject.map((item, index) => {
                    let element = {
                        "Mã nhóm vật tư": item.MaterialGroupID,
                        "Tên nhóm vật tư": item.MaterialGroupName,
                        "Mã sản phẩm": item.ProductID,
                        "Tên sản phẩm": item.ProductName,
                        "Tổng số lượng": item.TotalQuantity,
                        "Số lượng khả dụng": item.UsableQuantity
                    };
                    return element;

                })

                this.setState({
                    dataExport: exelData,
                    gridDataSource: apiResult.ResultObject,
                    IsCallAPIError: apiResult.IsError,
                });
            }
        });
    }

    handleSearchSubmit(formData, MLObject) {
        const postData = MLObject.UserName == -1 ? MLObject.UserName : MLObject.UserName.value
        this.props.callFetchAPI(APIHostName, SearchAPIPath, postData).then(apiResult => {//MLObject.UserName.value
            // console.log("apiResult", apiResult)
            if (apiResult.IsError) {
                this.setState({
                    dataExport: [],
                    gridDataSource: [],
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
                // xuất exel
                const exelData = apiResult.ResultObject.map((item, index) => {
                    let element = {
                        "Mã nhóm vật tư": item.MaterialGroupID,
                        "Tên nhóm vật tư": item.MaterialGroupName,
                        "Mã sản phẩm": item.ProductID,
                        "Tên sản phẩm": item.ProductName,
                        "Tổng số lượng": item.TotalQuantity,
                        "Số lượng khả dụng": item.UsableQuantity
                    };
                    return element;

                })

                this.setState({
                    dataExport: exelData,
                    gridDataSource: apiResult.ResultObject,
                    IsCallAPIError: apiResult.IsError,
                });
            }
        });
    }

    handleItemDetail(item) {

        const { gridDataSource } = this.state;
        let MLObject = {}
        MLObject.MaterialGroupID = item.MaterialGroupID;
        MLObject.ProductID = item.ProductID;
        MLObject.UserName = item.UserName;

        this.getdataHistory(MLObject);

    }

    getdataHistory(obj) {

        this.props.callFetchAPI(APIHostName, SearchHistoryAPIPath, obj).then(apiResult => {//

            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
                apiResult.ResultObject.map((item, index) => {

                    //1: Tạm ứng, 2: sử dụng; 3: Hủy vật tư
                    if (item.AdvanceDebtFlowTypeID == 1) {
                        item.AdvanceDebtFlowTypeName = "Tạm ứng";
                    }
                    else if (item.AdvanceDebtFlowTypeID == 2) {
                        item.AdvanceDebtFlowTypeName = "Sử dụng";
                    }
                    else if (item.AdvanceDebtFlowTypeID == 3) {
                        item.AdvanceDebtFlowTypeName = "Hủy vật tư";
                    }

                })
                this.handleShowModal(apiResult.ResultObject)
            }
        });

    }

    addNotification(message1, IsError) {
        if (!IsError) {
            this.setState({
                cssNotification: "notification-custom-success",
                iconNotification: "fa fa-check"
            });
        } else {
            this.setState({
                cssNotification: "notification-danger",
                iconNotification: "fa fa-exclamation"
            });
        }
        this.notificationDOMRef.current.addNotification({
            container: "bottom-right",
            content: (
                <div className={this.state.cssNotification}>
                    <div className="notification-custom-icon">
                        <i className={this.state.iconNotification} />
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
        this.addNotification(result.Message);
    }

    handleShowModal(data) {
        const { widthPercent } = this.state;
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Lịch sử thay đổi số dư tạm ứng',
            content: {
                text: <CurrentAdvanceDebtList
                    dataSource={data}
                />

            },
            maxWidth: widthPercent + 'px'
        });
    }

    handleExportSubmit(formData, MLObject) {
        const userName = MLObject.UserName == -1 ? MLObject.UserName : MLObject.UserName.value
        this.props.callFetchAPI(APIHostName, SearchExportAPIPath, userName).then(apiResult => {
            // console.log("handleExportSubmit", userName, apiResult)
            if (!apiResult.IsError) {
                if (apiResult.ResultObject.length > 0) {
                    const exelData = apiResult.ResultObject.map((item, index) => {
                        let element = {
                            "Mã nhân viên": item.UserName,
                            "Tên nhân viên": item.FullName,
                            "Mã nhóm vật tư": item.MaterialGroupID,
                            "Tên nhóm vật tư": item.MaterialGroupName,
                            "Mã sản phẩm": item.ProductID,
                            "Tên sản phẩm": item.ProductName,
                            "Tổng số lượng": item.TotalQuantity,
                            "Số lượng khả dụng": item.UsableQuantity
                        };
                        return element;

                    })

                    this.handleExportCSV(exelData);
                }
                else {
                    this.showMessage("Dữ liệu không tồn tại nên không thể xuất.")
                }

            }
            else {
                this.showMessage(apiResult.Message)
            }
        })
    }

    handleExportCSV(dataExport) {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const fileName = 'Thông kê hạn mức tạm ứng';
        let result;
        if (dataExport.length == 0) {
            result = {
                IsError: true,
                Message: "Dữ liệu không tồn tại. Không thể xuất file!"
            };
        }
        else {

            const ws = XLSX.utils.json_to_sheet(dataExport);
            const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: fileType });


            FileSaver.saveAs(data, fileName + fileExtension);

            result = {
                IsError: false,
                Message: "Xuất file thành công!"
            };
            this.addNotification(result.Message, result.IsError);
        }
    }

    render() {

        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <SearchForm
                    FormName={TitleFormSearch}
                    MLObjectDefinition={SearchMLObjectDefinition}
                    listelement={SearchElementList}
                    onSubmit={this.handleSearchSubmit}
                    IsButtonExport={true}
                    onExportSubmit={this.handleExportSubmit.bind(this)}
                    TitleButtonExport="Xuất dữ liệu"
                    ref={this.searchref}
                    className="multiple"
                    classNamebtnSearch="groupAction"

                />
                <DataGrid
                    listColumn={DataGridColumnList}
                    dataSource={this.state.gridDataSource}
                    IDSelectColumnName={"ProductID"}
                    PKColumnName={"ProductID"}
                    IsDelete={false}
                    IsAutoPaging={true}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    onDetailModalClick={this.handleItemDetail.bind(this)}
                    RowsPerPage={10}
                    IsExportFile={true}
                    DataExport={this.state.dataExport}
                    fileName="Danh sách thống kê hạn mức tạm ứng"
                    onExportFile={this.handleExportFile.bind(this)}
                    RequirePermission={TMS_CURRENTADVANCEDEBT_VIEW}
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

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchCom);
export default Search;
