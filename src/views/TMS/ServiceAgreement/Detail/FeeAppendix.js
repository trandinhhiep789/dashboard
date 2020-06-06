import React, { Component } from "react";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import {
    PKColumnNameFeeAppendix,
    TitleFromFeeAppendix,
    DataGridColumnItemListFeeAppendix,
    IDSelectColumnName,
    AddLinkFeeAppendix
} from "../Detail/contants";
import InputGridControl from "../../../../common/components/FormContainer/FormControl/InputGrid/InputGridControl.js";
import DataGrid from "../../../../common/components/DataGrid/getdataserver.js";
class FeeAppendixCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            FeeAppendix: this.props.FeeAppendix,
            DataSource: this.props.FeeAppendix,
            PageNumber: 1,
        }
        this.gridref = React.createRef();
        this.searchref = React.createRef();
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

    handleItemDelete() {

    }
    handleItemEdit() {

    }

    handleItemInsert() {
        console.log('handleItemInsert FeeAppendix')
    }

    handleonChangePage() {

    }


    render() {

        console.log('FeeAppendixCom', this.props, this.props.ServiceAgreementID)
        const ServiceAgreementID = this.props.ServiceAgreementID;

        return (
            <React.Fragment>
                <DataGrid
                    listColumn={DataGridColumnItemListFeeAppendix}
                    dataSource={this.state.DataSource}
                    title={TitleFromFeeAppendix}
                    AddLink={AddLinkFeeAppendix}
                    params={ServiceAgreementID}
                    IDSelectColumnName={IDSelectColumnName}
                    PKColumnName={PKColumnNameFeeAppendix}
                    onDeleteClick={this.handleItemDelete}
                    onChangePage={this.handleonChangePage}
                    IsDelete={false}
                    PageNumber={this.state.PageNumber}
                    IsAutoPaging={false}
                    RowsPerPage={10}
                    classCustom=""
                    ref={this.gridref}
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
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        }
    }
}


const FeeAppendix = connect(mapStateToProps, mapDispatchToProps)(FeeAppendixCom);
export default FeeAppendix;