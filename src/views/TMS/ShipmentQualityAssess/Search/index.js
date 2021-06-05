import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNotification from "react-notifications-component";
import { ModalManager } from "react-dynamic-modal";

import { updatePagePath } from "../../../../actions/pageAction";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import {
    PagePath, SearchAPIPath, APIHostName, listColumn
} from "../constants";
import { MessageModal } from "../../../../common/components/Modal";
import DataGrid from "../../../../common/components/DataGrid/getdataserver";

export class SearchCom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataGrid: []
        }

        this.notificationDOMRef = React.createRef();
        this.callSearchData = this.callSearchData.bind(this);
        this.showMessage = this.showMessage.bind(this);
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        this.callSearchData()
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

    callSearchData() {
        const searchData = [
            {
                SearchKey: "@Keyword",
                SearchValue: ""
            }
        ];

        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
            if (!apiResult.IsError) {
                console.log("🚀 ~ file: index.js ~ line 34 ~ SearchCom ~ this.props.callFetchAPI ~ apiResult", apiResult)
                this.setState({
                    dataGrid: apiResult.ResultObject
                })
            } else {
                console.log("🚀 ~ file: index.js ~ line 36 ~ SearchCom ~ this.props.callFetchAPI ~ apiResult", apiResult)
                this.showMessage(apiResult.Message);
            }
        });
    }

    render() {
        const { dataGrid } = this.state;

        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />

                <DataGrid
                    listColumn={listColumn}
                    dataSource={dataGrid}
                    // AddLink={AddLink}
                    // IDSelectColumnName={IDSelectColumnName}
                    PKColumnName={"ShipmentOrderID"}
                    // onDeleteClick={this.handleDelete}
                    // onChangePage={this.handleonChangePage}
                    isHideHeaderToolbar={true}
                    // PageNumber={this.state.PageNumber}
                    IsAutoPaging={true}
                    RowsPerPage={10}
                />
            </React.Fragment>
        )
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
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchCom);
