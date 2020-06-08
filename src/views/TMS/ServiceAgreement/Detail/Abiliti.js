import React, { Component } from "react";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import InputGridControl from "../../../../common/components/FormContainer/FormControl/InputGrid/InputGridControl.js";
import {
    PKColumnNameAbiliti,
    TitleFromAbiliti,
    DataGridColumnItemListAbiliti
} from "../Detail/contants";

class AbilitiCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Abiliti: this.props.Abiliti,
            DataSource: this.props.Abiliti,
        }
    }



    handleItemDelete(index) {

    }
    handleItemEdit() {

    }
    handleItemInsert() {

    }

    render() {
        return (
            <InputGridControl
            name="Abiliti_ItemList"
            controltype="InputGridControl"
            title={TitleFromAbiliti}
            IDSelectColumnName={PKColumnNameAbiliti}
            listColumn={DataGridColumnItemListAbiliti}
            dataSource={this.state.DataSource}
            onInsertClick={this.handleItemInsert}
            onEditClick={this.handleItemEdit}
            onDeleteClick={this.handleItemDelete}
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
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        }
    }
}


const Abiliti = connect(mapStateToProps, mapDispatchToProps)(AbilitiCom);
export default Abiliti;