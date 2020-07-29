import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import DataGrid from "../../../../common/components/DataGrid";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import { MessageModal } from "../../../../common/components/Modal";
import {
    SearchPartnerPayableDetailElementList,
    SearchPartnerPayableDetailMLObjectDefinition,
    PagePath,
    InitSearchParams,
    SearchByDateAPIPath,
    APIHostName,
    DataPartnerPayableDetailGridColumnList

} from "../constants";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { callGetCache } from "../../../../actions/cacheAction";

import SearchForm from "../../../../common/components/FormContainer/SearchForm";


import { PARTNERPAYABLE_VIEW } from "../../../../constants/functionLists";


class PartnerPayableDetailCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gridDataSource: [],
            IsLoadDataComplete: false,
            totalPayableAmount: 0
        }
        this.gridref = React.createRef();
        this.searchref = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
    }

    callData(SearchData) {
        this.props.callFetchAPI(APIHostName, SearchByDateAPIPath, SearchData).then(apiResult => {
            console.log("MLObject", SearchData, apiResult)
            if (!apiResult.IsError) {
                if (apiResult.ResultObject.length > 0) {
                    const totalPayableAmount = apiResult.ResultObject.reduce((sum, curValue, curIndex, []) => {
                        sum += curValue.PayableAmount
                        return sum
                    }, 0);
                    this.setState({
                        
                        gridDataSource: apiResult.ResultObject,
                        IsLoadDataComplete: true,
                        totalPayableAmount
                    })
                }
                else {
                    this.showMessage('Không có dữ liệu cần tim.')
                }
            }
            else {
                this.showMessage(apiResult.Message)
            }
        })
    }

    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
            />
        );
    }

    handleSearchSubmit(formData, MLObject) {

        const postData = [
            {
                SearchKey: "@FromDate",
                SearchValue: MLObject.FromDate
            },
            {
                SearchKey: "@ToDate",
                SearchValue: MLObject.ToDate
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
                <SearchForm
                    FormName="Tìm kiếm danh sách tiền phải trả cho nhà cung cấp dịch vụ theo ngày"
                    MLObjectDefinition={SearchPartnerPayableDetailMLObjectDefinition}
                    listelement={SearchPartnerPayableDetailElementList}
                    onSubmit={this.handleSearchSubmit.bind(this)}
                    ref={this.searchref}
                    className="multiple"
                />

                <DataGrid
                    listColumn={DataPartnerPayableDetailGridColumnList}
                    dataSource={this.state.gridDataSource}
                    AddLink=""
                    isHideHeaderToolbar={true}
                    IDSelectColumnName="PartnerPayableDetailID"
                    PKColumnName="PartnerPayableDetailID"
                    IsAutoPaging={true}
                    RowsPerPage={10}
                    // RequirePermission={PARTNERPAYABLE_VIEW}
                    ref={this.gridref}
                    totalCurrency={true}
                    totalCurrencyColSpan={12}
                    totalCurrencyNumber={this.state.totalPayableAmount}
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

const PartnerPayableDetail = connect(mapStateToProps, mapDispatchToProps)(PartnerPayableDetailCom);
export default PartnerPayableDetail;
