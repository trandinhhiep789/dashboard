import React from "react";
import { connect } from "react-redux";
import ReactNotification from "react-notifications-component";
import { ModalManager } from 'react-dynamic-modal';

import {
    APIHostName,
    listColumn,
    listelement,
    MLObjectDefinition,
    PagePath,
} from "../constants";

import SearchForm from "../../../../../common/components/FormContainer/SearchForm";
import { MessageModal } from "../../../../../common/components/Modal";
import DataGrid from "../../../../../common/components/DataGrid";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callGetCache } from "../../../../../actions/cacheAction";
import { showModal, hideModal } from '../../../../../actions/modal';

class SearchCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: null
        };

        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();

        // this.callSearchData = this.callSearchData.bind(this);
        // this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.addNotification = this.addNotification.bind(this);
        this.handleExportSubmit = this.handleExportSubmit.bind(this);
        this.handleHistorySubmit = this.handleHistorySubmit.bind(this);
        this.showMessage = this.showMessage.bind(this);
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);

        // this.props.callGetCache("ERPCOMMONCACHE.BRAND").then(a => console.log(a))
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

    // callSearchData(searchData) {
    //     this.props.callFetchAPI(APIHostName, "", searchData).then(apiResult => {
    //         if (!apiResult.IsError) {

    //         } else {
    //             this.showMessage(apiResult.Message);
    //         }
    //     });
    // }

    // handleSearchSubmit(formData, MLObject) {
    //     console.log(MLObject)
    // }

    handleExportSubmit(formData, MLObject) {
        console.log(MLObject)
    }

    handleHistorySubmit() {

    }

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />

                <SearchForm
                    className="multiple"
                    classNamebtnSearch="groupAction"
                    FormName="Báo cáo tồn kho linh kiện"
                    IsButtonExport={true}
                    IsButtonhistory={false}
                    IsShowButtonSearch={false}
                    listelement={listelement}
                    MLObjectDefinition={MLObjectDefinition}
                    onExportSubmit={this.handleExportSubmit}
                    onHistorySubmit={this.handleHistorySubmit}
                    // onSubmit={}
                    ref={this.searchref}
                    TitleButtonExport="Xuất dữ liệu"
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