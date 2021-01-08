import React from "react";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
// import SearchForm from "../../../../../common/components/FormContainer/SearchForm";
import SearchForm from "../../../../../common/components/FormContainer/SearchForm";
import { MessageModal } from "../../../../../common/components/Modal";
import DataGrid from "../../../../../common/components/DataGrid";
import {
    PagePath,
    APIHostName,
    SearchMLObjectDefinition,
    SearchElementList,
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { SHIPMENTORDER_REPORT_VIEW } from "../../../../../constants/functionLists";
import { callGetCache } from "../../../../../actions/cacheAction";
import { showModal, hideModal } from '../../../../../actions/modal';
import { MODAL_TYPE_COMMONTMODALS } from "../../../../../constants/actionTypes";
import DataGirdReportShipmentOrder from '../../components/DataGirdReportShipmentOrder'

import { toIsoStringCus } from '../../../../../utils/function'


class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            IsCallAPIError: false,
        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }

    handleSearchSubmit(){

    }

    render() {
        return (
            <React.Fragment>
               <SearchForm
                    FormName="Tìm kiếm danh sách vận đơn để xuất dữ liệu"
                    MLObjectDefinition={SearchMLObjectDefinition}
                    listelement={SearchElementList}
                    TitleButton="Xuất dữ liệu"
                    onSubmit={this.handleSearchSubmit.bind(this)}
                    ref={this.searchref}
                    className="multiple"
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

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchCom);
export default Search;
