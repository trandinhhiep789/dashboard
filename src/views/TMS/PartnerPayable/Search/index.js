import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import DataGrid from "../../../../common/components/DataGrid";
import {
    SearchElementList,
    SearchMLObjectDefinition,
    PagePath,
    InitSearchParams,
    SearchAPIPath,
    APIHostName,
    DataGridColumnList

} from "../constants";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { callGetCache } from "../../../../actions/cacheAction";

import SearchForm from "../../../../common/components/FormContainer/SearchForm";


import { PARTNERPAYABLE_VIEW} from "../../../../constants/functionLists";


class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SearchData: InitSearchParams,
            gridDataSource: []
        }
        this.gridref = React.createRef();
        this.searchref = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        this.callData(this.state.SearchData)
    }

    callData(SearchData) {
        this.props.callFetchAPI(APIHostName, SearchAPIPath, SearchData).then(apiResult => {
            if(!apiResult.IsError){
                this.setState({
                    gridDataSource: apiResult.ResultObject
                })
            }
        })
    }

    handleSearchSubmit(formData, MLObject) {
        const postData = [
            {
                SearchKey: "@MONTH",
                SearchValue: MLObject.PayableDate != '' ? MLObject.PayableDate.format() : MLObject.PayableDate  //.toLocaleString('en_US') //MLObject.PayableDate
            },
            {
                SearchKey: "@PARTNERID",
                SearchValue: MLObject.PartnerID
            },
        ];
        this.setState({ SearchData: postData });
        this.callData(postData);
    }

    render() {
        return (
            <React.Fragment>
                <SearchForm
                    FormName="Tìm kiếm danh sách tiền phải trả cho nhà cung cấp dịch vụ theo ngày"
                    MLObjectDefinition={SearchMLObjectDefinition}
                    listelement={SearchElementList}
                    onSubmit={this.handleSearchSubmit.bind(this)}
                    ref={this.searchref}
                    className="multiple"
                />

                <DataGrid
                    listColumn={DataGridColumnList}
                    dataSource={this.state.gridDataSource}
                    AddLink=""
                    isHideHeaderToolbar={true}
                    IDSelectColumnName="PartnerID"
                    PKColumnName="PartnerID"
                    IsAutoPaging={true}
                    RowsPerPage={10}
                    RequirePermission={PARTNERPAYABLE_VIEW}
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

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchCom);
export default Search;
