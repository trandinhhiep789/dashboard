import React, { Component } from "react";
import { connect } from 'react-redux';
import Collapsible from 'react-collapsible';
import { callFetchAPI } from "../../../../../../actions/fetchAPIAction";
import DataGrid from "../../../../../../common/components/DataGrid";
import { DataGridColumnList } from "./Constants";
import {
    GridMLObjectContentDefinition, InputProductContentColumnList
} from "../../Constants";
import InputGridNew from "../../../../../../common/components/FormContainer/FormControl/InputGridNew";

class ContentCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            LstProduct_Content: this.props.Content
        }
    }

    render() {

        let Content;
        if (this.state.LstProduct_Content) {
            Content = this.state.LstProduct_Content;
        }

        return (
            <InputGridNew name="LstProduct_Content" controltype="GridControl"
            title="nội dung"
            listColumn={InputProductContentColumnList}
            dataSource={Content}
            Ispopup={true}
            MLObjectDefinition={GridMLObjectContentDefinition}
            IsAutoPaging={false}
            RowsPerPage={100}
            colspan="10"
            IsPermisionAdd={true}
            IsPermisionDelete={true}
            listvalidationError={{}}
        />
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


const Content = connect(mapStateToProps, mapDispatchToProps)(ContentCom);
export default Content;