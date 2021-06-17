import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNotification from "react-notifications-component";
import { ModalManager } from "react-dynamic-modal";

import { updatePagePath } from "../../../../actions/pageAction";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import {
    PagePath, APISearch, APIHostName,
    listColumn, MLObjectDefinitionSearch,
    listElementSearch, dataSearch
} from "../constants";
import { MessageModal } from "../../../../common/components/Modal";
import DataGrid from "../../../../common/components/DataGrid";
import ReactContext from '../ReactContext';
import { showModal } from '../../../../actions/modal';
import { MODAL_TYPE_COMMONTMODALS } from "../../../../constants/actionTypes";
import Update from '../Update';
import SearchForm from "../../../../common/components/FormContainer/SearchForm";

export class SearchCom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataGrid: null,
            PageNumber: 1,
            dataSearch: dataSearch
        }

        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();

        this.callSearchData = this.callSearchData.bind(this);
        this.showMessage = this.showMessage.bind(this);
        this.onShowModalDetail = this.onShowModalDetail.bind(this);
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

    callSearchData(boolIsFetchSuccess = false) {
        const { dataSearch } = this.state;

        this.props.callFetchAPI(APIHostName, APISearch, dataSearch).then(apiResult => {
            if (!apiResult.IsError) {

                if (apiResult.ResultObject.length > 0) {

                    const arrResult = apiResult.ResultObject.map((item, index) => {
                        return {
                            ...item,
                            IsRevokeAssessReviewStatus: item.IsRevokeAssessReview == 0 ? 'Chưa duyệt' : 'Đã duyệt'
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

                boolIsFetchSuccess && this.showMessage("Cập nhật dữ liệu thành công.")
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
                        callSearchData: (boolIsFetchSuccess) => this.callSearchData(boolIsFetchSuccess),
                    }}
                >
                    <Update
                        dataSource={lstProps.rowItem}
                    />
                </ReactContext.Provider>
            },
            maxWidth: '1000px'
        });

    }

    handleSearch(formData, MLObject) {
        const searchData = dataSearch.map(element => {
            switch (element.SearchKey) {
                case "@Keyword":
                    return {
                        SearchKey: element.SearchKey,
                        SearchValue: MLObject.Keyword
                    }
                case "@TYPENAME":
                    return {
                        SearchKey: element.SearchKey,
                        SearchValue: MLObject.Typename
                    }
                case "@CREATEDUSER":
                    return {
                        SearchKey: element.SearchKey,
                        SearchValue: MLObject.CreatedUser == -1 || MLObject.CreatedUser === null ? "" : MLObject.CreatedUser.value
                    }
                default:
                    return element;
            }
        })

        this.props.callFetchAPI(APIHostName, APISearch, searchData).then(apiResult => {
            if (!apiResult.IsError) {

                if (apiResult.ResultObject.length > 0) {

                    const arrResult = apiResult.ResultObject.map((item, index) => {
                        return {
                            ...item,
                            IsRevokeAssessReviewStatus: item.IsRevokeAssessReview == 0 ? 'Chưa duyệt' : 'Đã duyệt',
                        }
                    });

                    this.setState({
                        dataGrid: arrResult,
                        dataSearch: searchData,
                        PageNumber: 1
                    });

                } else {
                    this.setState({
                        dataGrid: apiResult.ResultObject,
                        dataSearch: searchData,
                        PageNumber: 1
                    });
                }

            } else {
                this.showMessage(apiResult.Message);
            }
        });
    }

    handleChangePage(PageNumber) {
        if (PageNumber == this.state.PageNumber) return;

        const { dataSearch } = this.state;

        const searchData = dataSearch.map(element => {
            if (element.SearchKey == "@PAGEINDEX") {
                return {
                    SearchKey: element.SearchKey,
                    SearchValue: PageNumber
                }
            } else {
                return element;
            }
        })

        this.setState({
            PageNumber,
            dataSearch: searchData
        });

        this.props.callFetchAPI(APIHostName, APISearch, searchData).then(apiResult => {
            if (!apiResult.IsError) {

                if (apiResult.ResultObject.length > 0) {

                    const arrResult = apiResult.ResultObject.map((item, index) => {
                        return {
                            ...item,
                            IsRevokeAssessReviewStatus: item.IsRevokeAssessReview == 0 ? 'Chưa duyệt' : 'Đã duyệt',
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
