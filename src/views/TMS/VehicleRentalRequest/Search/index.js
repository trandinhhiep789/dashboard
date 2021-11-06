import React from "react";
import "react-notifications-component/dist/theme.css";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import ReactNotification from "react-notifications-component";

import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { callGetCache } from "../../../../actions/cacheAction";
import { formatDate } from "../../../../common/library/CommonLib.js";
import { MessageModal } from "../../../../common/components/Modal";
import { MODAL_TYPE_COMMONTMODALS } from '../../../../constants/actionTypes';
import { showModal } from '../../../../actions/modal';
import { updatePagePath } from "../../../../actions/pageAction";
import DataGrid from "../../../../common/components/DataGrid";
import SearchForm from "../../../../common/components/FormContainer/SearchForm";

import {
    TMS_VEHICLERENTALREQUEST_VIEW, TMS_VEHICLERENTALREQUEST_DELETE
} from "../../../../constants/functionLists";

import {
    AddLink,
    APIHostName,
    DataGridColumnList,
    DeleteAPIPath,
    IDSelectColumnName,
    InitSearchParams,
    PagePath,
    PKColumnName,
    SearchAPIPath,
    SearchElementList,
    SearchMLObjectDefinition,
    TitleFormSearch
} from "../constants";
import VehicleRentalRequestType from "../Component/VehicleRentalRequestType";

class SearchCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            CallAPIMessage: "",
            gridDataSource: [],
            IsCallAPIError: false,
            IsLoadDataComplete: false,
            PageNumber: 1,
            SearchData: InitSearchParams

        };

        this.gridref = React.createRef();
        this.notificationDOMRef = React.createRef();
        this.searchref = React.createRef();

        this.callSearchData = this.callSearchData.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleSubmitImportFile = this.handleSubmitImportFile.bind(this);
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        this.callSearchData(this.state.SearchData);
    }

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
            if (apiResult.IsError) {

                this.showMessage(apiResult.Message);
            }
            else {

                this.setState({
                    gridDataSource: apiResult.ResultObject,
                    IsCallAPIError: apiResult.IsError,
                });
            }
        });
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

    handleDelete(deleteList, pkColumnName) {
        const { gridDataSource } = this.state;

        let listMLObject = [];
        deleteList.map((row, index) => {
            let MLObject = {};
            pkColumnName.map((pkItem, pkIndex) => {
                MLObject[pkItem.key] = row.pkColumnName[pkIndex].value;
            });
            MLObject.DeletedUser = this.props.AppInfo.LoginInfo.Username;
            listMLObject.push(MLObject);
        });



        const tempData = gridDataSource.filter((x) => listMLObject.some((y) => y.VehicleRentalRequestID == x.VehicleRentalRequestID && x.IsCanDelete == false));
        console.log("del", gridDataSource, tempData, listMLObject)
        if (tempData.length > 0) {
            this.showMessage("Danh sách chọn không thể xóa. Vui lòng chọn lại dữ liệu cần xóa.")
        }
        else {
            const tempData1 = gridDataSource.filter((x) => listMLObject.some((y) => y.VehicleRentalRequestID === x.VehicleRentalRequestID && x.IsCanDelete == true));
            console.log("del111", gridDataSource, tempData1, listMLObject)

            this.props.callFetchAPI(APIHostName, DeleteAPIPath, tempData1).then(apiResult => {
                this.setState({ IsCallAPIError: apiResult.IsError });
                this.addNotification(apiResult.Message, apiResult.IsError);
                if (!apiResult.IsError) {
                    this.callSearchData(this.state.SearchData);
                }
            });
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

    handleSearchSubmit(formData, MLObject) {
        const DataSearch = [
            {
                SearchKey: "@KEYWORD",
                SearchValue: MLObject.Keyword
            },
            {
                SearchKey: "@SRHTYPE",
                SearchValue: MLObject.Typename
            },
            {
                SearchKey: "@FROMDATE",
                SearchValue: MLObject.StartTime
            },
            {
                SearchKey: "@TODATE",
                SearchValue: MLObject.EndTime
            },
            {
                SearchKey: "@RENTALYPEID",
                SearchValue: MLObject.RentalTypeID
            },
            {
                SearchKey: "@STOREID",
                SearchValue: MLObject.StoreID
            },
            {
                SearchKey: "@VEHICLERENTALSTATUS",
                SearchValue: MLObject.VehicleRentalStatusID
            },
        ];

        this.setState({
            SearchData: DataSearch
        });

        this.callSearchData(DataSearch);
    }

    handleExportFile() {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Xuất file excel',
            content: {
                text: <ExportExcelModalCom
                    searchParamater={this.state.SearchData}
                />
            },
            maxWidth: '30%'
        })
    }

    handleImportFile() {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Nhập dữ liệu',
            content: {
                text: <ImportSelectionModalCom />
            },
            maxWidth: '30%'
        })
    }

    handleExportFileTemplate() {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Xuất file mẫu',
            content: {
                text: <ExportTempExcelModalCom />
            },
            maxWidth: '30%'
        })
    }

    handleSubmitImportFile(data) {
        this.props.callFetchAPI(APIHostName, "api/ServiceAgreement/AddImport", { ServiceAgreementList: data }).then(apiResult => {
            if (apiResult.IsError) {
                this.showMessage(apiResult.Message);
            }
            else {
                this.addNotification(apiResult.Message, apiResult.IsError);
                this.callSearchData(this.state.SearchData);
            }
        });
    }

    handleInputGridInsert(MLObjectDefinition, modalElementList, dataSource) {
        console.log("adđ", MLObjectDefinition, modalElementList, dataSource)
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'yêu cầu thuê xe',
            content: {
                text: <VehicleRentalRequestType />
            },
            maxWidth: '800px'
        });


    }

    render() {
        const { gridDataSource } = this.state;
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <SearchForm
                    className="multiple"
                    FormName={TitleFormSearch}
                    listelement={SearchElementList}
                    MLObjectDefinition={SearchMLObjectDefinition}
                    onSubmit={this.handleSearchSubmit}
                    ref={this.searchref}
                    className="multiple"
                    classNamebtnSearch="btn-custom-bottom"

                />
                <DataGrid
                    onDeleteClick={this.handleDelete.bind(this)}
                    onInsertClick={this.handleInputGridInsert.bind(this)}
                    IsCustomAddLink={true}
                    // AddLink={AddLink}
                    dataSource={gridDataSource}
                    isCustomExportFile={false}
                    isCustomExportFileTemplate={false}
                    isCustomImportFile={false}
                    IsDelete={true}
                    IsExportFile={false}
                    isExportFileTemplate={false}
                    IsImportFile={false}
                    listColumn={DataGridColumnList}
                    PKColumnName={PKColumnName}
                    IDSelectColumnName={IDSelectColumnName}
                    // RequirePermission={TMS_VEHICLERENTALREQUEST_VIEW}
                    // DeletePermission={TMS_VEHICLERENTALREQUEST_DELETE}
                    RowsPerPage={10}
                    IsAutoPaging={true}

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
        }
    };
};

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchCom);
export default Search;
