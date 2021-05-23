import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNotification from "react-notifications-component";
import { ModalManager } from 'react-dynamic-modal';

import { updatePagePath } from "../../../../../actions/pageAction";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import {
    APIHostName, PagePath, SearchElementList,
    SearchMLObjectDefinition, SearchAPIPath
} from '../constants';
import SearchForm from "../../../../../common/components/FormContainer/SearchForm";
import DataGrid from "../../../../../common/components/DataGrid";
import { MessageModal } from "../../../../../common/components/Modal";

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.searchref = React.createRef();
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.showMessage = this.showMessage.bind(this);
        this.callSearchData = this.callSearchData.bind(this);
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        this.showMessage("Tính năng đang phát triển");
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
    };

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />

                {/* <SearchForm
                    FormName="Tìm kiếm báo cáo đơn hàng"
                    listelement={SearchElementList}
                    MLObjectDefinition={SearchMLObjectDefinition}
                    onSubmit={this.handleSearchSubmit}
                    ref={this.searchref}
                    className="multiple multiple-custom"
                /> */}


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