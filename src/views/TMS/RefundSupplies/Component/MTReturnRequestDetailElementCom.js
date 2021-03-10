import React, { Component } from "react";
import { connect } from 'react-redux';
import DataGrid from "../../../../common/components/DataGrid";

import {
    APIHostName,
    MLObjectMTReturnRequestDetailItem
} from "../constants/index.js";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";

class MTReturnRequestDetailElementCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            IsSystem: false,
        }
        this.gridref = React.createRef();
    }

    componentDidMount() {

    }


    handleInsertItem(listMLObject) {
        console.log("12231", listMLObject)
        if (this.props.onClickInsertItem)
            this.props.onClickInsertItem(listMLObject)
    }

    render() {
        console.log("data", this.props)
        const { IsSystem } = this.state;
        return (
            <React.Fragment>
                <DataGrid
                    listColumn={this.props.listColumn}
                    dataSource={this.props.dataSource}
                    isMultipleCheck={this.props.multipleCheck}
                    IDSelectColumnName={this.props.IDSelectColumnName}
                    PKColumnName={this.props.PKColumnName}
                    isHideHeaderToolbar={this.props.isHideHeaderToolbar}
                    isHideHeaderToolbarGroupTextBox={this.props.isHideHeaderToolbarGroupTextBox}
                    hasSearch={false}
                    IsAutoPaging={true}
                    RowsPerPage={10}
                    ref={this.gridref}
                    onSubmitItem={this.handleInsertItem.bind(this)}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        AppInfo: state,
        FetchAPIInfo: state.FetchAPIInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        }
    }
}


const MTReturnRequestDetailElement = connect(mapStateToProps, mapDispatchToProps)(MTReturnRequestDetailElementCom);
export default MTReturnRequestDetailElement;