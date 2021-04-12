import React from "react";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import SearchForm from "../../../../common/components/FormContainer/SearchForm";
//import DataGrid from "../../../../common/components/DataGrid/getdataserver.js";
import DataGrid from "../../../../common/components/DataGrid";
import InputGridNew from "../../../../common/components/FormContainer/FormControl/InputGridNew";
import { MessageModal } from "../../../../common/components/Modal";
import { formatDate } from "../../../../common/library/CommonLib.js";
import { showModal, hideModal } from '../../../../actions/modal';
import { MODAL_TYPE_COMMONTMODALS } from '../../../../constants/actionTypes';
import {

    APIHostName,
    SearchAPIPath,
    PagePath,
    DataGridColumnList,
    IDSelectColumnName,
    PKColumnName,
    TitleFormSearch,
    SearchMLObjectDefinition,
    SearchElementList,
    AddLink,
    InitSearchParams,
    DeleteNewAPIPath

} from "../constants";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { callGetCache } from "../../../../actions/cacheAction";
import ListMTReturnRequestType from "../Component/ListMTReturnRequestType";

import {
    TMS_MTRETURNREQUEST_VIEW, TMS_MTRETURNREQUEST_DELETE, TMS_MTRETURNREQUEST_EXPORT
} from "../../../../constants/functionLists";

class SearchCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            CallAPIMessage: "",
            gridDataSource: [],
            IsCallAPIError: false,
            SearchData: InitSearchParams,
            dataExport: []
        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.callSearchData = this.callSearchData.bind(this);
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        this.callSearchData(this.state.SearchData);
        this.testMObi();
    }

    testMObi(){
        const pramObj = {"ShipmentOrderID":"210225000000087","ShipmentOrderStepID":106,"CurrentShipmentOrderStepID":105,"ProcessUser":"0041017","Note":"","ImageUploadingRequestList":[{"ImageCaptureTime":"2021-04-09T10:55:33.000Z","ImageUpLoadTime":"4/9/2021, 8:59:00 AM","ImageCaptureGeoLocation":"37.4219983,-122.084","ImageContent":"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\\n","IsCompressImageContent":false,"Note":"","UploadUser":"0041017","SampleImageID":""}],"ProcessGeoLocation":"37.4219983,-122.084","ReceiverHandoverToReceiverUser":""}

        this.props.callFetchAPI(APIHostName, "api/ShipmentOrder/ProcessWorkFlow", pramObj).then(apiResult => {
            console.log("testMObi", pramObj, apiResult)
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
        let listMLObject = [];
        deleteList.map((row, index) => {
            let MLObject = {};
            pkColumnName.map((pkItem, pkIndex) => {
                MLObject[pkItem.key] = row.pkColumnName[pkIndex].value;
            });
            MLObject.DeletedUser = this.props.AppInfo.LoginInfo.Username;
            listMLObject.push(MLObject);
        });
        this.props.callFetchAPI(APIHostName, DeleteNewAPIPath, listMLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.addNotification(apiResult.Message, apiResult.IsError);
            if (!apiResult.IsError) {
                this.callSearchData(this.state.SearchData);
            }
        });
    }

    handleInputGridInsert(MLObjectDefinition, modalElementList, dataSource) {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Loại yêu cầu nhập trả vật tư',
            content: {
                text: <ListMTReturnRequestType />
            },
            maxWidth: '800px'
        });


    }

    callSearchData(searchData) {
        const { callFetchAPI } = this.props;
        callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
                const dataSource = apiResult.ResultObject.map((item, index) => {
                    item.ApproverName = item.RequestUser + " - " + item.RequestFullName;
                    if (item.IsCreatedInputVoucher) {
                        item.CreatedInputVoucherStatusLable = <span className='lblstatus text-success'>Đã tạo phiếu nhập</span>;
                    }
                    else {
                        item.CreatedInputVoucherStatusLable = <span className='lblstatus text-warning'>Chưa tạo phiếu nhập</span>;
                    }
                    if (item.IsreViewed) {
                        item.ReviewStatusLable = <span className='lblstatus text-success'>Đã duyệt</span>;

                    }
                    else {
                        item.ReviewStatusLable = <span className='lblstatus text-warning'>Chưa duyệt</span>;

                    }
                    return item;
                })

                const tempData = apiResult.ResultObject.map((item, index) => {
                    let element = {
                        "Mã yêu cầu": item.MTReturnRequestID,
                        "Loại yêu cầu nhập trả vật tư": item.MTReturnRequestTypeName,
                        "Kho yêu cầu": item.StoreName,
                        "Ngày yêu cầu": formatDate(item.RequestDate, true),
                        "Người yêu cầu": item.ApproverName,
                        "Đã duyệt": item.ReviewStatusLable.props.children,
                        "Phiếu nhập": item.CreatedInputVoucherStatusLable.props.children
                    };

                    return element;
                })

                this.setState({
                    gridDataSource: dataSource,
                    IsCallAPIError: apiResult.IsError,
                    dataExport: tempData
                });
                //this.callDataTest()
            }
        })
    }

    handleSearchSubmit(formData, MLObject) {
        const DataSearch = [
            {
                SearchKey: "@Keyword",
                SearchValue: MLObject.Keyword
            },
            {
                SearchKey: "@MTRETURNREQUESTTYPEID",
                SearchValue: MLObject.MTReturnRequestTypeID
            },
            {
                SearchKey: "@REQUESTSTOREID",
                SearchValue: MLObject.RequestStoreID
            },
            {
                SearchKey: "@FROMDATE",
                SearchValue: MLObject.FromDate
            },
            {
                SearchKey: "@TODATE",
                SearchValue: MLObject.ToDate
            },
            {
                SearchKey: "@ISREVIEWED",
                SearchValue: MLObject.IsreViewed
            },
            {
                SearchKey: "@ISCREATEDINPUTVOUCHERT",
                SearchValue: MLObject.IsCreatedInputVouchert
            },
            {
                SearchKey: "@REQUESTUSER",
                SearchValue: MLObject.RequestUser == -1 ? MLObject.RequestUser : MLObject.RequestUser.value
            }
        ];

        this.setState({
            SearchData: DataSearch
        });

        this.callSearchData(DataSearch);
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

    onExportFile(result) {
        this.addNotification(result.Message, result.IsError);
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
                    ref={this.searchref}
                    className="multiple multiple-custom multiple-custom-display"
                    classNamebtnSearch="btn-custom-bottom"

                />
                <DataGrid
                    listColumn={DataGridColumnList}
                    dataSource={this.state.gridDataSource}
                    //AddLink={AddLink}
                    IDSelectColumnName={IDSelectColumnName}
                    PKColumnName={PKColumnName}
                    onDeleteClick={this.handleDelete.bind(this)}
                    onInsertClick={this.handleInputGridInsert.bind(this)}
                    IsCustomAddLink={true}
                    IsDelete={true}
                    IsAutoPaging={true}
                    RowsPerPage={20}
                    IsExportFile={true}
                    DataExport={this.state.dataExport}
                    onExportFile={this.onExportFile.bind(this)}
                    fileName="Danh sách yêu cầu nhập trả vật tư"
                    RequirePermission={TMS_MTRETURNREQUEST_VIEW}
                    DeletePermission={TMS_MTRETURNREQUEST_DELETE}
                    ExportPermission={TMS_MTRETURNREQUEST_EXPORT}
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
