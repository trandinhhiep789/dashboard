import React, { Component } from "react";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import {
    PKColumnNameFeeAppendix, 
    TitleFromFeeAppendix,
    DataGridColumnItemListFeeAppendix
} from "../Detail/contants";
import InputGridControl from "../../../../common/components/FormContainer/FormControl/InputGrid/InputGridControl.js";
class FeeAppendixCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            FeeAppendix: this.props.FeeAppendix,
            DataSource: this.props.FeeAppendix
        }
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.FeeAppendix) !== JSON.stringify(nextProps.FeeAppendix)) {
            this.setState({
                DataSource: nextProps.FeeAppendix
            })
        }
    }

    componentDidMount() {
    }

    handleItemDelete(){

    }
    handleItemEdit(){

    }

    handleItemInsert(){
        console.log('handleItemInsert FeeAppendix')
    }


    render() {
        console.log('FeeAppendixCom', this.props.FeeAppendix, this.state.DataSource)

        return (
            <InputGridControl
                name="FeeAppendix_ItemList"
                controltype="InputGridControl"
                IsCustomAddLink={true}
                AddLink="/ServiceAgreement/FeeAppendix/Add"
                title={TitleFromFeeAppendix}
                IDSelectColumnName={PKColumnNameFeeAppendix}
                listColumn={DataGridColumnItemListFeeAppendix}
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


const FeeAppendix = connect(mapStateToProps, mapDispatchToProps)(FeeAppendixCom);
export default FeeAppendix;