import React from "react";
import { connect } from "react-redux";
// import SearchForm from "../../../../../common/components/FormContainer/SearchForm";
import SearchForm from "../../../../../common/components/FormContainer/SearchForm";
import DataGrid from "../../../../../common/components/DataGrid";
import {
    PagePath,
    SearchMLObjectDefinition,
    SearchElementList,
    GridColumnList,
    APIHostName,
    SearchAPIPath
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import "react-notifications-component/dist/theme.css";
import { WORKINGPLAN_VIEW, WORKINGPLAN_DELETE } from "../../../../../constants/functionLists";
import { ERPCOMMONCACHE_WORKINGSHIFT } from "../../../../../constants/keyCache";
import { callGetCache } from "../../../../../actions/cacheAction";

class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.state = {
            IsCallAPIError: false,
            gridDataSource: [],
            IsLoadDataComplete: false
        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
    }

    handleSearchSubmit(formData, MLObject) {
        let result, result2;

        if (MLObject.ShipmentOrderType != -1 && MLObject.ShipmentOrderType != null) {
            result = MLObject.ShipmentOrderType.reduce((data, item, index) => {
                const comma = data.length ? "," : "";
                return data + comma + item;
            }, '');
        }
        else {
            result = ""
        }

        if (MLObject.CoordinatorStore != -1 && MLObject.CoordinatorStore != null) {
            result2 = MLObject.CoordinatorStore.reduce((data, item, index) => {
                const comma = data.length ? "," : "";
                return data + comma + item;
            }, '');
        }
        else {
            result2 = ""
        }

        // console.log("MLObject", MLObject, result, result2)


        const postData = [
            {
                SearchKey: "@FROMDATE",
                SearchValue: MLObject.FromDate
            },
            {
                SearchKey: "@TODATE",
                SearchValue: MLObject.ToDate
            },
            {
                SearchKey: "@SHIPMENTORDERTYPEIDLIST",
                SearchValue: result  //MLObject.ShipmentOrderType
            },
            {
                SearchKey: "@COORDINATORSTOREIDLIST",
                SearchValue: result2  //MLObject.CoordinatorStoreID
            }, 

        ];


        this.callSearchData(postData);
    }

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
            // console.log('aa', apiResult, searchData)
            if (!apiResult.IsError) {
                this.setState({
                    gridDataSource:  apiResult.ResultObject,
                    IsCallAPIError: apiResult.IsError,
                    IsLoadDataComplete: true
                });
            }
        });
    }


    render() {
        return (
            <React.Fragment>
                <SearchForm
                    FormName="Tìm kiếm danh sách thống kê vận đơn theo kho điều phối"
                    MLObjectDefinition={SearchMLObjectDefinition}
                    listelement={SearchElementList}
                    onSubmit={this.handleSearchSubmit}
                    ref={this.searchref}
                    className="multiple"
                />

                <DataGrid
                    listColumn={GridColumnList}
                    dataSource={this.state.gridDataSource}
                    // AddLink=""
                    IDSelectColumnName={''}
                    PKColumnName={''}
                    isHideHeaderToolbar={false}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    IsShowButtonPrint={false}
                    IsPrint={false}
                    IsExportFile={false}
                    IsAutoPaging={true}
                    RowsPerPage={10}
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
        updatePagePath: pagePath => {
            dispatch(updatePagePath(pagePath));
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        }
    };
};

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchCom);
export default Search;
