import React, { Component } from "react";
import { connect } from 'react-redux';
import Collapsible from 'react-collapsible';
import { callFetchAPI } from "../../../../../../actions/fetchAPIAction";
import DataGrid from "../../../../../../common/components/DataGrid";
import { DataGridColumnList } from "./Constants";
import {
    InputProductArticleColumnList, GridMLObjectArticleDefinition
} from "../../Constants";
import InputGridNew from "../../../../../../common/components/FormContainer/FormControl/InputGridNew";

class AttributeCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            LstProduct_Attribute: this.props.Attribute
        }
    }

    render() {

        let Attribute;
        if (this.state.LstProduct_Attribute) {
            Attribute = this.state.LstProduct_Attribute;
        }
        return (
            <InputGridNew name="LstProduct_Article" controltype="GridControl"
            title="bài Viết"
            listColumn={InputProductArticleColumnList}
            dataSource={Attribute}
            Ispopup={true}
            MLObjectDefinition={GridMLObjectArticleDefinition}
            IsAutoPaging={false}
            RowsPerPage={100}
            colspan="10"
            IsPermisionAdd={true}
            IsPermisionDelete={true}
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


const Attribute = connect(mapStateToProps, mapDispatchToProps)(AttributeCom);
export default Attribute;