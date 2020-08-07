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
            gridDataSourcePrint: [],
            IsLoadDataComplete: false,
            totalPayableAmount: 0
        }
        this.gridref = React.createRef();
        this.searchref = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
    }

    groupBy(data, fields, sumBy = 'Quantity') {
        let r = [], cmp = (x, y) => fields.reduce((a, b) => a && x[b] == y[b], true);
        data.forEach(x => {
            let y = r.find(z => cmp(x, z));
            let w = [...fields, sumBy].reduce((a, b) => (a[b] = x[b], a), {})
            y ? y[sumBy] = +y[sumBy] + (+x[sumBy]) : r.push(w);
        });
        return r;
    }



    callData(SearchData) {
        this.props.callFetchAPI(APIHostName, SearchByDateAPIPath, SearchData).then(apiResult => {
            if (!apiResult.IsError) {
                if (apiResult.ResultObject.length > 0) {
                    const totalPayableAmount = apiResult.ResultObject.reduce((sum, curValue, curIndex, []) => {
                        sum += curValue.PayableAmount
                        return sum
                    }, 0);

                    const sortResult = apiResult.ResultObject.sort((a, b) => (a.SubGroupID > b.SubGroupID) ? 1
                        : (a.SubGroupID === b.SubGroupID) ? 1 : -1)

                    let gridDataSourcePrint = [];
                    gridDataSourcePrint = this.groupBy(sortResult, ['SubGroupID', 'SubGroupName', 'PartnerName', 'ServiceFee', 'SubGroupID'])


                    this.setState({
                        gridDataSource: apiResult.ResultObject,
                        IsLoadDataComplete: true,
                        gridDataSourcePrint,
                        totalPayableAmount
                    })
                }
                else {
                    this.showMessage('Không có dữ liệu cần tim.')
                    this.setState({
                        IsLoadDataComplete: true,
                        gridDataSourcePrint : [],
                        totalPayableAmount: 0,
                        gridDataSource: apiResult.ResultObject,
                    })
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
                    isHideHeaderToolbar={false}
                    IsShowButtonAdd={false}
                    IsShowButtonDelete={false}
                    IsShowButtonPrint={true}
                    TitlePrint="Bảng kê tổng hợp đơn hàng lắp đặt"
                    dataPrint={this.state.gridDataSourcePrint}
                    IsPrint={true}
                    IDSelectColumnName="PartnerPayableDetailID"
                    PKColumnName="PartnerPayableDetailID"
                    IsAutoPaging={false}
                    RowsPerPage={10}
                    // RequirePermission={PARTNERPAYABLE_VIEW}
                    ref={this.gridref}
                    totalCurrency={true}
                    totalCurrencyColSpan={13}
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
