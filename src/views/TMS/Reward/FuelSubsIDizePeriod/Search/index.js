import React from "react";
import { connect } from "react-redux";
import ReactNotification from "react-notifications-component";
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';

import SearchForm from "../../../../../common/components/FormContainer/SearchForm";
import { MessageModal } from "../../../../../common/components/Modal";
import DataGrid from "../../../../../common/components/DataGrid";
import {
    PagePath, listColumn, APIHostName, MLObjectDefinition, listelement, initSearchArgument,
    APISearch, APIDeleteList
} from "./constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callGetCache } from "../../../../../actions/cacheAction";
import { showModal, hideModal } from '../../../../../actions/modal';

class SearchCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stateIsError: false,
            stateInitSearchArgument: initSearchArgument,
            stateDataSource: null,
            statePageNumber: 1
        };

        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.callSearchData = this.callSearchData.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        this.callSearchData(this.state.stateInitSearchArgument);
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

    addNotification(message, IsError) {
        let cssNotification, iconNotification;
        if (!IsError) {
            cssNotification = "notification-custom-success";
            iconNotification = "fa fa-check"
        } else {
            cssNotification = "notification-danger";
            iconNotification = "fa fa-exclamation"
        }
        this.notificationDOMRef.current.addNotification({
            container: "bottom-right",
            content: (
                <div className={cssNotification}>
                    <div className="notification-custom-icon">
                        <i className={iconNotification} />
                    </div>
                    <div className="notification-custom-content">
                        <div className="notification-close">
                            <span>×</span>
                        </div>
                        <h4 className="notification-title">Thông Báo</h4>
                        <p className="notification-message">{message}</p>
                    </div>
                </div>
            ),
            dismiss: { duration: 6000 },
            dismissable: { click: true }
        });
    }

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, APISearch, searchData).then(apiResult => {
            if (!apiResult.IsError) {
                const setResultObject = apiResult.ResultObject.map(item => {
                    return {
                        ...item,
                        UserIDName: `${item.UserName} - ${item.UserFullName}`
                    }
                })
                this.setState({
                    stateDataSource: setResultObject
                })
            } else {
                this.showMessage(apiResult.Message);
            }
        });
    }

    handleSearchSubmit(formData, MLObject) {
        const postData = [
            {
                SearchKey: "@USERNAME",
                SearchValue: MLObject.UserName[0] ? MLObject.UserName[0].value : -1
            },
            {
                SearchKey: "@FROMDATE",
                SearchValue: MLObject.FromDate
            },
            {
                SearchKey: "@TODATE",
                SearchValue: MLObject.ToDate
            },
            {
                SearchKey: "@PAGENUMBER",
                SearchValue: 1
            },
            {
                SearchKey: "@PAGESIZE",
                SearchValue: 50
            }
        ]
        this.setState({
            stateInitSearchArgument: postData
        })
        this.callSearchData(postData);
    }

    handleChangePage(pageNum) {
        const { stateInitSearchArgument } = this.state;
        const arrStateInitSearchArgument = stateInitSearchArgument.map(item => {
            if (item.SearchKey == "@PAGENUMBER") {
                return {
                    SearchKey: "@PAGENUMBER",
                    SearchValue: pageNum
                }
            } else {
                return item;
            }
        });
        this.setState({
            stateInitSearchArgument: arrStateInitSearchArgument,
            statePageNumber: pageNum
        })
        this.callSearchData(arrStateInitSearchArgument);
    }

    handleDelete(listDeleteID, ListPKColumnName) {
        const arrDeleteUsers = listDeleteID.map(item => item.pkColumnName[0].value);
        const postData = arrDeleteUsers.join();

        this.props.callFetchAPI(APIHostName, APIDeleteList, postData).then(apiResult => {
            if (!apiResult.IsError) {
                this.showMessage(apiResult.Message);
                this.callSearchData(this.state.stateInitSearchArgument);
            } else {
                this.showMessage(apiResult.Message);
            }
        });
    }

    render() {
        const { stateDataSource, statePageNumber } = this.state;
        if (stateDataSource == null) {
            return <React.Fragment>...</React.Fragment>
        } else {
            return (
                <React.Fragment>
                    <ReactNotification ref={this.notificationDOMRef} />

                    <SearchForm
                        FormName="abc"
                        MLObjectDefinition={MLObjectDefinition}
                        listelement={listelement}
                        onSubmit={this.handleSearchSubmit}
                        ref={this.searchref}
                        className="multiple multiple-custom multiple-custom-display"
                        classNamebtnSearch="btn-custom-bottom"
                    />

                    <DataGrid
                        listColumn={listColumn}
                        dataSource={stateDataSource}
                        IDSelectColumnName={"chkSelect"}
                        PKColumnName={"FuelSubsidizePeriodID"}
                        isHideHeaderToolbar={false}
                        IsShowButtonAdd={true}
                        AddLink={"/FuelSubsIDizePeriod/Add"}
                        IsShowButtonDelete={true}
                        IsDelete={true}
                        onDeleteClick={this.handleDelete}
                        IsShowButtonPrint={false}
                        IsPrint={false}
                        IsExportFile={false}
                        IsAutoPaging={true}
                        RowsPerPage={50}
                        PageNumber={statePageNumber}
                        isPaginationServer={true}
                        onChangePage={this.handleChangePage}
                        ref={this.gridref}
                    />
                </React.Fragment>
            );
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
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: (type, props) => {
            dispatch(hideModal(type, props));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchCom);
