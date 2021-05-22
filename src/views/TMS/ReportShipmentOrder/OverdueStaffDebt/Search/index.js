import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNotification from "react-notifications-component";
import { ModalManager } from 'react-dynamic-modal';

import { updatePagePath } from "../../../../../actions/pageAction";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import {
    APIHostName, PagePath, SearchElementList,
    SearchMLObjectDefinition, SearchAPIPath, GridColumnList
} from '../constants';
import SearchForm from "../../../../../common/components/FormContainer/SearchForm";
import DataGrid from "../../../../../common/components/DataGrid";
import { MessageModal } from "../../../../../common/components/Modal";
import { toIsoStringCus } from '../../../../../utils/function';

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.searchref = React.createRef();
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.showMessage = this.showMessage.bind(this);
        this.callSearchData = this.callSearchData.bind(this);
        this.state = {
            IsCallAPIError: false,
            gridDataSource: [],
            dataExport: []
        };
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        // this.showMessage("Tính năng đang phát triển");
    };

    showMessage(message) {
        ModalManager.open(<MessageModal title="Thông báo"
            message={message} onRequestClose={() => true}
            onCloseModal={this.handleCloseMessage}
        />);
    };

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
            if (!apiResult.IsError) {
                this.setState({
                    dataSource: apiResult.ResultObject
                });
            }
            else {
                this.showMessage(apiResult.Message, apiResult.IsError);
            }
        });
    };

    handleSearchSubmit(formData, MLObject) {
        const postData = [
            {
                SearchKey: "@FROMDATE",
                SearchValue: toIsoStringCus(new Date(MLObject.FromDate).toISOString())
            },
            {
                SearchKey: "@TODATE",
                SearchValue: toIsoStringCus(new Date(MLObject.ToDate).toISOString())
            },
            {
                SearchKey: "@STOREID",
                SearchValue: MLObject.CoordinatorStoreID != "" ? MLObject.CoordinatorStoreID : -1
            },

        ];
        this.showMessage("Tính năng đang phát triển");
        console.log("param", formData, MLObject)
        console.log("postData", postData)

        //this.callSearchData(postData);
    };

    handleExportFile(){

    }

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />

                <SearchForm
                    FormName="Tìm kiếm báo cáo thống kê công nợ công nợ"
                    listelement={SearchElementList}
                    MLObjectDefinition={SearchMLObjectDefinition}
                    onSubmit={this.handleSearchSubmit}
                    ref={this.searchref}
                    className="multiple"
                />

                <DataGrid
                    listColumn={GridColumnList}
                    dataSource={this.state.gridDataSource}
                    // AddLink=""
                    IsFixheaderTable={true}
                    IDSelectColumnName={''}
                    PKColumnName={''}
                    // onShowModal={this.onShowModalDetail.bind(this)}
                    isHideHeaderToolbar={false}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    IsShowButtonPrint={false}
                    IsPrint={false}
                    IsAutoPaging={true}
                    RowsPerPage={30}
                    ref={this.gridref}
                    // RequirePermission={SHIPMENTORDER_REPORT_VIEW}
                    // ExportPermission={SHIPMENTORDER_REPORT_EXPORT}
                    IsExportFile={true}
                    DataExport={this.state.dataExport}
                    fileName="Danh sách thống kê công nợ quá hạn"
                    onExportFile={this.handleExportFile.bind(this)}
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);