import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactNotification from "react-notifications-component";
import { ModalManager } from 'react-dynamic-modal';

import { updatePagePath } from "../../../../actions/pageAction";
import { callGetCache } from "../../../../actions/cacheAction";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { showModal, hideModal } from '../../../../actions/modal';
import { MessageModal } from "../../../../common/components/Modal";
import DataGrid from "../../../../common/components/DataGrid";
import {
    APIHostName, PagePath, SearchElementList,
    tableHead, SearchMLObjectDefinition,
    DataGridColumnList,
    IDSelectColumnName, PKColumnName, AddLink ,TitleFormSearch, InitSearchParams
} from '../constants'
import SearchForm from "../../../../common/components/FormContainer/SearchForm";
import { MODAL_TYPE_CONFIRMATION } from '../../../../constants/actionTypes';
import { DELIVERYABILITY_VIEW, DELIVERYABILITY_DELETE } from "../../../../constants/functionLists";

export class Search extends Component {
    constructor(props) {
        super(props)
        this.callSearchData = this.callSearchData.bind(this);
        this.state = {
            CallAPIMessage: "",
            gridDataSource: [],
            SearchData: InitSearchParams,
            IsCallAPIError: false,
            IsLoadDataComplete: false,
            dataExport: []
        }

        this.notificationDOMRef = React.createRef()
        this.gridref = React.createRef();
        this.searchref = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath)
    }

    handleSearchSubmit(formData, MLObject) {
        const DataSearch = [
          
            {
                SearchKey: "@SERVICETYPEID",
                SearchValue: MLObject.ServiceTypeID
            },
            {
                SearchKey: "@AREAID",
                SearchValue: MLObject.AreaID
            },
        ];
        this.setState({
            SearchData: DataSearch
        });
        this.callSearchData(DataSearch);
    }

    callSearchData(searchData) {
        console.log("searchData", searchData)
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

    handleExportFile(result) {
        this.addNotification(result.Message);
    }



    handleImportFile(){

    }

    handleExportFile(){

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
        this.props.callFetchAPI(APIHostName, DeleteNewAPIPath, listMLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.addNotification(apiResult.Message, apiResult.IsError);
            if (!apiResult.IsError) {
                this.callSearchData(this.state.SearchData);
            }
        });

    }

    addNotification(message1, IsError) {
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
                        <p className="notification-message">{message1}</p>
                    </div>
                </div>
            ),
            dismiss: { duration: 6000 },
            dismissable: { click: true }
        });
    }

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />

                <SearchForm
                    FormName={TitleFormSearch}
                    MLObjectDefinition={SearchMLObjectDefinition}
                    listelement={SearchElementList}
                    onSubmit={this.handleSearchSubmit.bind(this)}
                    ref={this.searchref}
                    className="multiple"
                />

                <DataGrid
                    listColumn={DataGridColumnList}
                    dataSource={this.state.gridDataSource}
                    AddLink={AddLink}
                    IDSelectColumnName={IDSelectColumnName}
                    PKColumnName={PKColumnName}
                    onDeleteClick={this.handleDelete.bind(this)}
                    IsDelete={true}
                    IsAutoPaging={true}
                    RowsPerPage={10}
                    // RequirePermission={DELIVERYABILITY_VIEW}
                    // DeletePermission={DELIVERYABILITY_DELETE}
                    IsExportFile={true}
                    DataExport={this.state.dataExport}
                    fileName="Danh sách tải giao hàng"
                    onExportFile={this.handleExportFile.bind(this)}
                    IsImportFile={true}
                    // onImportFile={this.handleImportFile.bind(this)}

                />



            </React.Fragment>

        )
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
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search)
