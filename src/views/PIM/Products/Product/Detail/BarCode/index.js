import React, { Component } from "react";
import { connect } from 'react-redux';
import Collapsible from 'react-collapsible';
import { callFetchAPI } from "../../../../../../actions/fetchAPIAction";
import DataGrid from "../../../../../../common/components/DataGrid";
import { DataGridColumnList } from "./Constants";
import {
    APIHostName, LoadAPIPath, UpdateAPIPath, AddElementList, MLObjectDefinition, BackLink, EditPagePath, GridMLObjectBarcodeDefinition,
    InputBarcodeColumnList
} from "../../Constants";
import InputGridNew from "../../../../../../common/components/FormContainer/FormControl/InputGridNew";

class BarCodeCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            LstProduct_BarCode: this.props.BarCode
        }
    }
    render() {
        let BarCode;
        if (this.state.LstProduct_BarCode) {
            BarCode = this.state.LstProduct_BarCode;
        }
        return (
                <InputGridNew name="LstProduct_Barcode" controltype="GridControl" title="Barcode" 
                    listColumn={InputBarcodeColumnList}
                    dataSource={[]}
                    ObjectDefault={{ Barcode: "", BarcodeDescription: "", IsActived: false, IsSystem: false }}
                    Ispopup={false}
                    MLObjectDefinition={GridMLObjectBarcodeDefinition}
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


const BarCode = connect(mapStateToProps, mapDispatchToProps)(BarCodeCom);
export default BarCode;