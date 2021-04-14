import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactNotification from "react-notifications-component"
import { ModalManager } from 'react-dynamic-modal';

import {
    SearchMLObjectDefinition, SearchElementList, PagePath,
    APIHostName, ListColumnGrid
} from '../constants'
import { updatePagePath } from "../../../../../actions/pageAction"
import { callFetchAPI } from "../../../../../actions/fetchAPIAction"
import { callGetCache } from "../../../../../actions/cacheAction"
import { showModal, hideModal } from '../../../../../actions/modal'
import SearchForm from "../../../../../common/components/FormContainer/SearchForm"
import DataGrid from "../../../../../common/components/DataGrid"
import { SHIPMENTORDER_REPORT_EXPORT, SHIPMENTORDER_REPORT_VIEW } from "../../../../../constants/functionLists"
import { MessageModal } from "../../../../../common/components/Modal";


export class Search extends Component {

    constructor(props) {
        super(props)

        this.state = {
            dataSource: [],
            IsShowForm: false
        }

        this.searchref = React.createRef()
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        this.showMessage("Tính năng đang phát triển.")
    }

    handleCloseMessage() {

    }
    showMessage(message) {
        ModalManager.open(<MessageModal title="Thông báo"
            message={message} onRequestClose={() => true}
            onCloseModal={this.handleCloseMessage}
        />);
    }

    handleSearchSubmit(formData, MLObject) {
        console.log("formData, MLObject", formData, MLObject)
        this.showMessage("Tính năng đang phát triển")
    }

    render() {

        const { dataSource } = this.state
        if (this.state.IsShowForm) {
            return (
                <React.Fragment>
                    <ReactNotification ref={this.notificationDOMRef} />
    
                    <SearchForm
                        FormName="Tìm kiếm báo cáo tổng hợp"
                        listelement={SearchElementList}
                        MLObjectDefinition={SearchMLObjectDefinition}
                        onSubmit={this.handleSearchSubmit.bind(this)}
                        ref={this.searchref}
                        className="multiple"
                    />
    
                    <DataGrid
                        listColumn={ListColumnGrid}
                        dataSource={dataSource}
                        IsFixheaderTable={false}
                        // IDSelectColumnName={}
                        PKColumnName={""}
                        isHideHeaderToolbar={false}
                        IsShowButtonAdd={false}
                        IsShowButtonDelete={false}
                        IsShowButtonPrint={false}
                        IsPrint={false}
                        IsAutoPaging={true}
                        RowsPerPage={20}
                        ref={this.gridref}
                        RequirePermission={SHIPMENTORDER_REPORT_VIEW}
                    />
    
                </React.Fragment>
            )
        }
        else{
            return (
                <div>
                    <label>Đang nạp dữ liệu ......</label>
                </div>
            )
        }
        
        
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

export default connect(mapStateToProps, mapDispatchToProps)(Search)
