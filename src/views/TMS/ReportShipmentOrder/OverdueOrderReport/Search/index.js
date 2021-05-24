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
            dataExport: []
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
        // this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
        //     if (!apiResult.IsError) {
        //         this.setState({
        //             dataSource: apiResult.ResultObject
        //         });
        //     }
        //     else {
        //         this.showMessage(apiResult.Message, apiResult.IsError);
        //     }
        // });
    };

    handleSearchSubmit(formData, MLObject) {
        const postData = [];
        this.callSearchData(postData);
        this.showMessage("Tính năng đang phát triển");
    };

    handleExportFile() {
        this.showMessage("Tính năng đang phát triển");
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
                    IDSelectColumnName={''}
                    PKColumnName={''}
                    isHideHeaderToolbar={false}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    IsShowButtonPrint={false}
                    IsPrint={false}
                    IsAutoPaging={true}
                    RowsPerPage={30}
                    ref={this.gridref}
                    IsExportFile={true}
                    DataExport={this.state.dataExport}
                    onExportFile={this.handleExportFile}
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