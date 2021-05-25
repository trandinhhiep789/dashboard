import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNotification from "react-notifications-component";
import { ModalManager } from 'react-dynamic-modal';

import { updatePagePath } from "../../../../../actions/pageAction";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import {
    APIHostName, PagePath, SearchElementList,
    SearchMLObjectDefinition, SearchAPIPath,
    GridColumnList
} from '../constants';
import SearchForm from "../../../../../common/components/FormContainer/SearchForm";
import DataGrid from "../../../../../common/components/DataGrid";
import { MessageModal } from "../../../../../common/components/Modal";

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gridDataSource: [],
            dataExport: [],
            PageNumber: 1,
        }

        this.searchref = React.createRef();
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.showMessage = this.showMessage.bind(this);
        this.callSearchData = this.callSearchData.bind(this);
        this.handleExportFile = this.handleExportFile.bind(this);
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
    };

    showMessage(message) {
        ModalManager.open(<MessageModal title="Thông báo"
            message={message} onRequestClose={() => true}
            onCloseModal={this.handleCloseMessage}
        />);
    };

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, "api/ShipmentOrder/OverdueOrderReport", searchData).then(apiResult => {
            console.log("search", searchData, apiResult)
            if (!apiResult.IsError) {
                this.setState({
                    gridDataSource: apiResult.ResultObject
                });
            }
            else {
                this.showMessage(apiResult.Message, apiResult.IsError);
            }
        });
    };

    handleSearchSubmit(formData, MLObject) {
        console.log("param",formData, MLObject )
        const postData = [
        
            {
                SearchKey: "@FromDate",
                SearchValue: MLObject.FromDate
            },
            {
                SearchKey: "@ToDate",
                SearchValue: MLObject.ToDate
            },
            {
                SearchKey: "@TYPECOD",
                SearchValue: MLObject.COD
            },
            {
                SearchKey: "@SHIPMENTORDERSTATUSGROUPID",
                SearchValue: MLObject.ShipmentOrderStatusGroupID
            },
            {
                SearchKey: "@Keyword",
                SearchValue: MLObject.Keyword
            },
            {
                SearchKey: "@Typename",
                SearchValue: MLObject.Typename
            },
            {
                SearchKey: "@PAGESIZE",
                SearchValue: 50
            },
            {
                SearchKey: "@PAGEINDEX",
                SearchValue: 0
            }
          
        ];
        console.log("postData", postData )

        this.callSearchData(postData);
    };

    handleExportFile() {
        this.showMessage("Tính năng đang phát triển");
    }

    handleonChangePage(pageNum) {
        let listMLObject = [];
        const aa = { SearchKey: "@PAGEINDEX", SearchValue: pageNum - 1 };
        listMLObject = Object.assign([], this.state.SearchData, { [3]: aa });
        // console.log(this.state.SearchData,listMLObject)
        this.callSearchData(listMLObject)
        this.setState({
            PageNumber: pageNum
        });
    }

    render() {
        const { gridDataSource } = this.state;

        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />

                <SearchForm
                    FormName="Tìm kiếm chi tiết vận đơn quá hạn"
                    listelement={SearchElementList}
                    MLObjectDefinition={SearchMLObjectDefinition}
                    onSubmit={this.handleSearchSubmit}
                    ref={this.searchref}
                    className="multiple multiple-custom"
                />

                <DataGrid
                    fileName="Danh sách chi tiết vận đơn quá hạn"
                    listColumn={GridColumnList}
                    dataSource={gridDataSource}
                    IsFixheaderTable={true}
                    IDSelectColumnName={'ShipmentOrderID'}
                    PKColumnName={'ShipmentOrderID'}
                    isHideHeaderToolbar={false}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    IsShowButtonPrint={false}
                    IsPrint={false}
                    IsAutoPaging={true}
                    RowsPerPage={50}
                    ref={this.gridref}
                    IsExportFile={false}
                    DataExport={this.state.dataExport}
                    onExportFile={this.handleExportFile}
                    isPaginationServer={true}
                    PageNumber={this.state.PageNumber}
                    onChangePage={this.handleonChangePage.bind(this)}
                // RequirePermission={SHIPMENTORDER_REPORT_VIEW}
                // ExportPermission={SHIPMENTORDER_REPORT_EXPORT}
                // onShowModal={this.onShowModalDetail.bind(this)}
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