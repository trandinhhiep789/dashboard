import React from "react";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
// import SearchForm from "../../../../../common/components/FormContainer/SearchForm";
import SearchForm from "../../../../../common/components/FormContainer/SearchForm";
import { MessageModal } from "../../../../../common/components/Modal";
import DataGrid from "../../../../../common/components/DataGrid";
import {
    PagePath,
    SearchMLObjectDefinition,
    SearchElementList,
    GridColumnList,
    APIHostName,
    SearchAPIPath,
    GridColumnListPrice
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { SHIPMENTORDER_REPORT_VIEW } from "../../../../../constants/functionLists";
import { callGetCache } from "../../../../../actions/cacheAction";
import { showModal, hideModal } from '../../../../../actions/modal';


class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            IsCallAPIError: false,
            gridDataSource: [],
            IsLoadDataComplete: false,
            widthPercent: "",
            dataExport: []
        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
    }

    handleSearchSubmit(formData, MLObject) {
        const postData = [
            {
                SearchKey: "@MONTH",
                SearchValue: MLObject.Month
            },
            {
                SearchKey: "@USERNAME",
                SearchValue: MLObject.UserName == -1 ? MLObject.UserName :  MLObject.UserName.value
            },

        ];

        console.log("search",formData, MLObject, postData);
        this.callSearchData(postData);
    }

    callSearchData(searchData) {
        // this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
        //     console.log("apiResult", apiResult)
        //     if (!apiResult.IsError) {


        //         this.setState({
        //             IsLoadDataComplete: true,
        //         });
        //     }
        //     else {
        //         this.showMessage(apiResult.MessageDetail)
        //     }
        // });
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

    handleExportFile() {

    }

    handleExportFilePrice() {

    }

    addNotification(message1, IsError) {
        let cssNotification = "";
        let iconNotification = "";
        if (!IsError) {

            cssNotification = "notification-custom-success"
            iconNotification = "fa fa-check"

        } else {

            cssNotification = "notification-danger",
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


    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <SearchForm
                    FormName="Tìm kiếm danh sách thống kê vận đơn theo kho điều phối"
                    MLObjectDefinition={SearchMLObjectDefinition}
                    listelement={SearchElementList}
                    onSubmit={this.handleSearchSubmit.bind(this)}
                    ref={this.searchref}
                    className="multiple"
                />

                <DataGrid
                    listColumn={GridColumnList}
                    dataSource={this.state.gridDataSource}
                    IsFixheaderTable={true}
                    IDSelectColumnName={''}
                    PKColumnName={''}
                    isHideHeaderToolbar={false}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    IsShowButtonPrint={false}
                    IsPrint={false}
                    IsAutoPaging={true}
                    RowsPerPage={20}
                    ref={this.gridref}
                    RequirePermission={SHIPMENTORDER_REPORT_VIEW}
                    IsExportFile={true}
                    DataExport={this.state.dataExport}
                    fileName="Danh sách báo cáo tồn vật tư ống đồng"
                    onExportFile={this.handleExportFile.bind(this)}
                />

                <DataGrid
                    listColumn={GridColumnListPrice}
                    dataSource={this.state.gridDataSource}
                    IsFixheaderTable={true}
                    IDSelectColumnName={''}
                    PKColumnName={''}
                    isHideHeaderToolbar={false}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    IsShowButtonPrint={false}
                    IsPrint={false}
                    IsAutoPaging={true}
                    RowsPerPage={20}
                    ref={this.gridref}
                    //RequirePermission={SHIPMENTORDER_REPORT_VIEW}
                    IsExportFile={true}
                    DataExport={this.state.dataExport}
                    fileName="Danh sách báo cáo tồn vật tư khác"
                    onExportFile={this.handleExportFilePrice.bind(this)}
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
