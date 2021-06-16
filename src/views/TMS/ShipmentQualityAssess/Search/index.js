import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNotification from "react-notifications-component";
import { ModalManager } from "react-dynamic-modal";

import { updatePagePath } from "../../../../actions/pageAction";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import {
    PagePath, APISearch, APIHostName,
    listColumn, MLObjectDefinitionSearch,
    listElementSearch
} from "../constants";
import { MessageModal } from "../../../../common/components/Modal";
import DataGrid from "../../../../common/components/DataGrid";
import ReactContext from '../ReactContext';
import { showModal } from '../../../../actions/modal';
import { MODAL_TYPE_COMMONTMODALS } from "../../../../constants/actionTypes";
import ShipmentQualityAssessDetail from '../ShipmentQualityAssessDetail';
import SearchForm from "../../../../common/components/FormContainer/SearchForm";

export class SearchCom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataGrid: null,
            PageNumber: 1
        }

        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
        this.callSearchData = this.callSearchData.bind(this);
        this.showMessage = this.showMessage.bind(this);
        this.onShowModalDetail = this.onShowModalDetail.bind(this);
        this.onUpdateClick = this.onUpdateClick.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        this.callSearchData()
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

    callSearchData() {
        const searchData = [
            {
                SearchKey: "@Keyword",
                SearchValue: ""
            },
            {
                SearchKey: "@TYPENAME",
                SearchValue: ""
            },
            {
                SearchKey: "@CREATEDUSER",
                SearchValue: ""
            },
            {
                SearchKey: "@PAGEINDEX",
                SearchValue: 1
            },
            {
                SearchKey: "@PAGESIZE",
                SearchValue: 50
            }
        ];

        this.props.callFetchAPI(APIHostName, APISearch, searchData).then(apiResult => {
            if (!apiResult.IsError) {

                if (apiResult.ResultObject.length > 0) {

                    const arrResult = apiResult.ResultObject.map((item, index) => {
                        if (index == 1) {
                            return {
                                ...item,
                                IsRevokeAssessReviewStatus: item.IsRevokeAssessReview == 0 ? 'Chưa duyệt' : 'Đã duyệt',
                                TotaLRows: apiResult.ResultObject.length
                            }
                        } else {
                            return {
                                ...item,
                                IsRevokeAssessReviewStatus: item.IsRevokeAssessReview == 0 ? 'Chưa duyệt' : 'Đã duyệt'
                            }
                        }
                    });

                    this.setState({
                        dataGrid: arrResult
                    });

                } else {
                    this.setState({
                        dataGrid: apiResult.ResultObject
                    });
                }

            } else {
                this.showMessage(apiResult.Message);
            }
        });
    }

    onShowModalDetail(objValue, name, { ...lstProps }) {
        const { dataGrid } = this.state;

        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Chi tiết đánh giá chất lượng giao hàng',
            content: {
                text: <ReactContext.Provider
                    value={{
                        dataGrid: dataGrid,
                        callSearchData: () => this.callSearchData(),
                    }}
                >
                    <ShipmentQualityAssessDetail
                        dataSource={lstProps.rowItem}
                    />
                </ReactContext.Provider>
            },
            maxWidth: '1000px'
        });

    }

    onUpdateClick() {
        this.showMessage("Tính năng đang phát triển")
    }

    handleSearch(formData, MLObject) {
        const searchData = [
            {
                SearchKey: "@Keyword",
                SearchValue: MLObject.Keyword
            },
            {
                SearchKey: "@TYPENAME",
                SearchValue: MLObject.Typename
            },
            {
                SearchKey: "@CREATEDUSER",
                SearchValue: MLObject.CreatedUser ? MLObject.CreatedUser.value : ""
            },
            {
                SearchKey: "@PAGENUMBER",
                SearchValue: 1
            }
        ];

        this.props.callFetchAPI(APIHostName, APISearch, searchData).then(apiResult => {
            if (!apiResult.IsError) {

                if (apiResult.ResultObject.length > 0) {
                    apiResult.ResultObject[0].TotaLRows = apiResult.ResultObject.length;
                }

                this.setState({
                    dataGrid: apiResult.ResultObject
                })
            } else {
                this.showMessage(apiResult.Message);
            }
        });
    }

    handleChangePage(PageNumber) {
        if (PageNumber == this.state.PageNumber) return;

        const searchData = [
            {
                SearchKey: "@Keyword",
                SearchValue: ""
            },
            {
                SearchKey: "@TYPENAME",
                SearchValue: ""
            },
            {
                SearchKey: "@CREATEDUSER",
                SearchValue: ""
            },
            {
                SearchKey: "@PAGEINDEX",
                SearchValue: PageNumber
            },
            {
                SearchKey: "@PAGESIZE",
                SearchValue: 1
            }
        ];

        this.props.callFetchAPI(APIHostName, APISearch, searchData).then(apiResult => {
            if (!apiResult.IsError) {

                if (apiResult.ResultObject.length > 0) {

                    const arrResult = apiResult.ResultObject.map((item, index) => {
                        if (index == 1) {
                            return {
                                ...item,
                                IsRevokeAssessReviewStatus: item.IsRevokeAssessReview == 0 ? 'Chưa duyệt' : 'Đã duyệt',
                                TotaLRows: apiResult.ResultObject.length
                            }
                        } else {
                            return {
                                ...item,
                                IsRevokeAssessReviewStatus: item.IsRevokeAssessReview == 0 ? 'Chưa duyệt' : 'Đã duyệt'
                            }
                        }
                    });

                    this.setState({
                        dataGrid: arrResult,
                        PageNumber
                    });

                } else {
                    this.setState({
                        dataGrid: apiResult.ResultObject,
                        PageNumber
                    });
                }

            } else {
                this.showMessage(apiResult.Message);
            }
        });
    }

    render() {
        const { dataGrid, PageNumber } = this.state;

        if (dataGrid === null) {
            return <React.Fragment>...</React.Fragment>
        } else {
            return (
                <React.Fragment>
                    <ReactNotification ref={this.notificationDOMRef} />

                    <SearchForm
                        FormName="Tìm kiếm đánh giá chất lượng giao hàng"
                        MLObjectDefinition={MLObjectDefinitionSearch}
                        listelement={listElementSearch}
                        onSubmit={this.handleSearch}
                        ref={this.searchref}
                        className="multiple"
                    />

                    <DataGrid
                        listColumn={listColumn}
                        dataSource={dataGrid}
                        IsFixheaderTable={false}
                        isHideHeaderToolbar={false}
                        IsShowButtonAdd={false}
                        IsCustomAddLink={true}
                        IsShowButtonDelete={false}
                        IsShowButtonPrint={false}
                        IsPrint={false}
                        IsAutoPaging={true}
                        IsExportFile={false}
                        DataExport={[]}
                        fileName=""
                        PKColumnName={'ShipmentQualityAssessID'}
                        isPaginationServer={true}
                        RowsPerPage={50}
                        PageNumber={PageNumber}
                        onChangePage={this.handleChangePage}
                        onShowModal={this.onShowModalDetail}
                    />
                </React.Fragment>
            )
        }
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchCom);
