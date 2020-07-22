import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import DataGrid from "../../../../common/components/DataGrid";
import {
    SearchByPartnerElementList,
    SearchByPartnerMLObjectDefinition,
    PagePathPartner,
    InitSearchByPartnerParams,
    SearchByPartnerAPIPath,
    APIHostName,
    DataGridByPartnerColumnList

} from "../constants";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { callGetCache } from "../../../../actions/cacheAction";

import SearchForm from "../../../../common/components/FormContainer/SearchForm";

class DetailByPartnerCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SearchData: InitSearchByPartnerParams,
            gridDataSource: [],
            totalPayableAmount: 0
        }
        this.gridref = React.createRef();
        this.searchref = React.createRef();
    }

    componentDidMount() {
        console.log("this.props", this.props)
        this.props.updatePagePath(PagePathPartner);
        this.callData(this.props.match.params.id)
    }

    callData(id) {

        this.props.callFetchAPI(APIHostName, SearchByPartnerAPIPath, id).then(apiResult => {
            
            if(!apiResult.IsError){

                const totalPayableAmount = apiResult.ResultObject.reduce((sum, curValue, curIndex, []) => {
                    sum += curValue.PayableAmount
                    return sum
                }, 0);

                console.log('apiResult', apiResult, totalPayableAmount)

                this.setState({
                    gridDataSource: apiResult.ResultObject,
                    totalPayableAmount
                })
            }
        })
    }

    handleSearchSubmit(formData, MLObject) {
        this.callData(MLObject.PartnerID);
    }

    render() {
        return (
            <React.Fragment>
                <React.Fragment>
                <SearchForm
                    FormName="Tìm kiếm danh sách tiền phải trả cho nhà cung cấp dịch vụ theo đối tác"
                    MLObjectDefinition={SearchByPartnerMLObjectDefinition}
                    listelement={SearchByPartnerElementList}
                    onSubmit={this.handleSearchSubmit.bind(this)}
                    ref={this.searchref}
                    className="multiple"
                />

                <DataGrid
                    listColumn={DataGridByPartnerColumnList}
                    dataSource={this.state.gridDataSource}
                    AddLink=""
                    IDSelectColumnName="PayableDate"
                    PKColumnName="PayableDate"
                    IsAutoPaging={false}
                    RowsPerPage={35}
                    ref={this.gridref}
                    totalCurrency={true}
                    totalCurrencyColSpan={2}
                    totalCurrencyNumber={this.state.totalPayableAmount}
                    
                />
            </React.Fragment>
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
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        updatePagePath: pagePath => {
            dispatch(updatePagePath(pagePath));
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        }
    };
};

const DetailByPartner = connect(mapStateToProps,mapDispatchToProps)(DetailByPartnerCom);
export default DetailByPartner;
