import React from "react";
import { connect } from "react-redux";
// import SearchForm from "../../../../../common/components/FormContainer/SearchForm";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import { MessageModal } from "../../../../../common/components/Modal";
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
import { SHIPMENTORDER_REPORT_VIEW } from "../../../../../constants/functionLists";
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

        if (MLObject.ShipmentOrderType != -1 && MLObject.ShipmentOrderType != null && MLObject.ShipmentOrderType != "") {
            result = MLObject.ShipmentOrderType.reduce((data, item, index) => {
                const comma = data.length ? "," : "";
                return data + comma + item;
            }, '');
        }
        else {
            result = ""
        }

        if (MLObject.UserName != -1 && MLObject.UserName != null && MLObject.UserName != "") {
            result2 = MLObject.UserName.reduce((data, item, index) => {
                const comma = data.length ? "," : "";
                return data + comma + item.value;
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
                SearchKey: "@USERNAMELIST",
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
            else{
                this.showMessage(apiResult.MessageDetail)
            }
        });
    }

    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
                onCloseModal={this.handleCloseMessage}
            />
        );
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
                    IsFixheaderTable={true}
                    IDSelectColumnName={''}
                    PKColumnName={''}
                    isHideHeaderToolbar={false}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    IsShowButtonPrint={false}
                    IsPrint={false}
                    IsExportFile={false}
                    IsAutoPaging={true}
                    RowsPerPage={30}
                    ref={this.gridref}
                    RequirePermission={SHIPMENTORDER_REPORT_VIEW}
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
