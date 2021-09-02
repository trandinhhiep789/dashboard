import React from "react";
import { connect } from "react-redux";
import ReactNotification from "react-notifications-component";
import { ModalManager } from 'react-dynamic-modal';

import {
    API_SvCategory_DeleteList,
    API_SvCategory_Search,
    APIHostName,
    initSearchData,
    listColumn_SvCategory,
    listelement_Search,
    MLObjectDefinition_Search,
    PagePath
} from "../constants";

import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { MessageModal } from "../../../../../common/components/Modal";
import { showModal, hideModal } from '../../../../../actions/modal';
import { updatePagePath } from "../../../../../actions/pageAction";
import DataGrid from "../../../../../common/components/DataGrid";
import SearchForm from "../../../../../common/components/FormContainer/SearchForm";

class SearchCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: null,
            searchData: initSearchData
        };

        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();

        this.addNotification = this.addNotification.bind(this);
        this.callSearchData = this.callSearchData.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.showMessage = this.showMessage.bind(this);
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        this.callSearchData(this.state.searchData);
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
        this.props.callFetchAPI(APIHostName, API_SvCategory_Search, searchData).then(apiResult => {
            if (!apiResult.IsError) {
                if (apiResult.ResultObject.length == 0) {
                    this.addNotification("Không tồn tại dữ liệu", false);
                }

                const uptResultObject = apiResult.ResultObject.map(item => {
                    return {
                        ...item,
                        CreatedUserIDName: `${item.CreatedUser} - ${item.CreatedUserName}`,
                        ParentIDName: `${item.ParentID} - ${item.ParentName}`,
                        svCategoryIDName: `${item.svCategoryID} - ${item.svCategoryName}`,
                        svCategoryTypeIDName: `${item.svCategoryTypeID} - ${item.svCategoryTypeName}`
                    }
                })

                this.setState({
                    dataSource: uptResultObject
                })
            } else {
                this.addNotification(apiResult.Message, true);
            }
        });
    }

    handleDeleteClick(listDeleteID, ListPKColumnName) {
        console.log(listDeleteID, ListPKColumnName);
        const dataDelete = listDeleteID.map(item => {
            return {
                svCategoryID: item.pkColumnName[0].value,
                DeletedUser: this.props.AppInfo.LoginInfo.Username
            }
        })

        this.props.callFetchAPI(APIHostName, API_SvCategory_DeleteList, dataDelete).then(apiResult => {
            this.addNotification(apiResult.Message, apiResult.IsError);
            if (!apiResult.IsError) {
                this.callSearchData(this.state.searchData);
            }
        });
    }

    handleSearchSubmit(formData, MLObject) {
        const searchData = [
            {
                SearchKey: "@Keyword",
                SearchValue: MLObject.Keyword
            }
        ];

        this.setState({
            searchData
        });

        this.callSearchData(searchData);
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

    render() {
        if (this.state.dataSource == null) {
            return <React.Fragment>...</React.Fragment>
        } else {
            return (
                <React.Fragment>
                    <ReactNotification ref={this.notificationDOMRef} />

                    <SearchForm
                        FormName="abc"
                        listelement={listelement_Search}
                        MLObjectDefinition={MLObjectDefinition_Search}
                        onSubmit={this.handleSearchSubmit}
                        ref={this.searchref}
                    />

                    <DataGrid
                        AddLink={"/SvCategory/Add"}
                        dataSource={this.state.dataSource}
                        IDSelectColumnName={"chkSelect"}
                        IsAutoPaging={true}
                        IsDelete={true}
                        IsExportFile={false}
                        isHideHeaderToolbar={false}
                        IsPrint={false}
                        IsShowButtonDelete={true}
                        IsShowButtonPrint={false}
                        listColumn={listColumn_SvCategory}
                        onDeleteClick={this.handleDeleteClick}
                        PKColumnName={"svCategoryID"}
                        ref={this.gridref}
                        RowsPerPage={50}
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: (type, props) => {
            dispatch(hideModal(type, props));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchCom);