import React from "react";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import SearchForm from "../../../../../common/components/Form/SearchForm";
import DataGrid from "../../../../../common/components/DataGrid";
import { MessageModal } from "../../../../../common/components/Modal";
import {
    APIHostName, PagePath, APISearch, InitSearchParams, SearchElementList, SearchMLObjectDefinition,
    AddLink, IDSelectColumnName, DataGridColumnList
} from "./constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";

class SearchCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataGrid: null
        };

        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();

        this.fetchDataGrid = this.fetchDataGrid.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        this.fetchDataGrid(InitSearchParams);
    }

    fetchDataGrid(postData) {
        this.props.callFetchAPI(APIHostName, APISearch, postData).then(apiResult => {
            if (!apiResult.IsError) {
                this.setState({
                    dataGrid: apiResult.ResultObject
                });
            } else {
                this.showMessage(apiResult.Message);
            }
        });
    }

    handleSearchSubmit(formData, MLObject) {
        const postData = [
            {
                SearchKey: "@Keyword",
                SearchValue: MLObject.Keyword
            }
        ];

        this.fetchDataGrid(postData);
    }

    handleDelete(deleteList, pkColumnName) {
        let listMLObject = [];

        deleteList.map((row, index) => {
            let MLObject = {};
            pkColumnName.map((pkItem, pkIndex) => {
                MLObject[pkItem.key] = row.pkColumnName[pkIndex].value;
            });
            MLObject.DeletedUser = this.props.AppInfo.LoginInfo.Username;
            listMLObject.push(MLObject);
        });

        this.props.callFetchAPI(APIHostName, "api/StaffTransferType/DeleteMany", listMLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.addNotification(apiResult.Message, apiResult.IsError);
            if (!apiResult.IsError) {
                this.fetchDataGrid(InitSearchParams);
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

    addNotification(message1, IsError) {
        if (!IsError) {
            this.setState({
                cssNotification: "notification-custom-success",
                iconNotification: "fa fa-check"
            });
        } else {
            this.setState({
                cssNotification: "notification-danger",
                iconNotification: "fa fa-exclamation"
            });
        }
        this.notificationDOMRef.current.addNotification({
            container: "bottom-right",
            content: (
                <div className={this.state.cssNotification}>
                    <div className="notification-custom-icon">
                        <i className={this.state.iconNotification} />
                    </div>
                    <div className="notification-custom-content">
                        <div className="notification-close">
                            <span>×</span>
                        </div>
                        <h4 className="notification-title">Thông Báo</h4>
                        <p className="notification-message">{message1}</p>
                    </div>
                </div>
            ),
            dismiss: { duration: 6000 },
            dismissable: { click: true }
        });
    }

    render() {
        const { dataGrid } = this.state;

        if (dataGrid === null) {
            return (
                <React.Fragment>
                    <label>Đang nạp dữ liệu ......</label>
                </React.Fragment>
            );
        }
        else {
            return (
                <React.Fragment>
                    <ReactNotification ref={this.notificationDOMRef} />

                    <SearchForm
                        FormName="Tìm kiếm danh sách loại hình thuyên chuyển nhân viên"
                        MLObjectDefinition={SearchMLObjectDefinition}
                        listelement={SearchElementList}
                        onSubmit={this.handleSearchSubmit}
                        ref={this.searchref}
                    />

                    <DataGrid
                        listColumn={DataGridColumnList}
                        dataSource={dataGrid}
                        AddLink={AddLink}
                        IDSelectColumnName={IDSelectColumnName}
                        PKColumnName={"StaffTransferTypeID"}
                        onDeleteClick={this.handleDelete}
                        ref={this.gridref}
                        RequirePermission={""}
                        DeletePermission={""}
                        IsAutoPaging={true}
                        RowsPerPage={10}
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
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
        callClearLocalCache: (cacheKeyID) => {
            return dispatch(callClearLocalCache(cacheKeyID));
        }
    };
};

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchCom);
export default Search;
