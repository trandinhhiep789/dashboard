import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import DataGrid from "../../../../common/components/DataGrid";
import {
    SearchByDateElementList,
    SearchByDateMLObjectDefinition,
    PagePathDate,
    InitSearchByDateParams,
    SearchAPIPath,
    APIHostName,
    DataGridByDateColumnList

} from "../constants";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { callGetCache } from "../../../../actions/cacheAction";

import SearchForm from "../../../../common/components/FormContainer/SearchForm";

class DetailByDateCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SearchData: [],
            gridDataSource: []
        }
        this.gridref = React.createRef();
        this.searchref = React.createRef();
    }

    componentDidMount() {
        console.log('this.props', this.props)
        const postData = [
            {
                SearchKey: "@PAYABLEDATE",
                SearchValue: this.props.match.params.id
            },
            {
                SearchKey: "@PARTNERID",
                SearchValue: 101
            },
        ];
        this.setState({
            SearchData: postData
        })
        this.props.updatePagePath(PagePathDate);
        this.callData(postData)
    }

    callData(SearchData) {
        console.log('apiResult', SearchData)
        this.props.callFetchAPI(APIHostName, SearchAPIPath, SearchData).then(apiResult => {
            console.log('apiResult', apiResult)
            if(!apiResult.IsError){
                this.setState({
                    gridDataSource: apiResult.ResultObject
                })
            }
        })
    }

    handleSearchSubmit(formData, MLObject) {
        debugger
        console.log('search', formData, MLObject);
        const postData = [
            {
                SearchKey: "@PAYABLEDATE",
                SearchValue: MLObject.PayableDate
            },
            {
                SearchKey: "@PARTNERID",
                SearchValue: MLObject.PartnerID
            },
        ];
        this.callData(postData);
    }

    render() {
        return (
            <React.Fragment>
                <React.Fragment>
                <SearchForm
                    FormName="Tìm kiếm danh sách tiền phải trả cho nhà cung cấp dịch vụ theo đối tác"
                    MLObjectDefinition={SearchByDateMLObjectDefinition}
                    listelement={SearchByDateElementList}
                    onSubmit={this.handleSearchSubmit.bind(this)}
                    ref={this.searchref}
                    className="multiple"
                />

                <DataGrid
                    listColumn={DataGridByDateColumnList}
                    dataSource={this.state.gridDataSource}
                    AddLink=""
                    IDSelectColumnName="PartnerPayableDetailID"
                    PKColumnName="PartnerPayableDetailID"
                    IsAutoPaging={true}
                    RowsPerPage={10}
                    ref={this.gridref}
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

const DetailByDate = connect(mapStateToProps,mapDispatchToProps)(DetailByDateCom);
export default DetailByDate;
