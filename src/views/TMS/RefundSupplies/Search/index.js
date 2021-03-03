import React from "react";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import SearchForm from "../../../../common/components/FormContainer/SearchForm";
//import DataGrid from "../../../../common/components/DataGrid/getdataserver.js";
import DataGrid from "../../../../common/components/DataGrid";
import InputGridNew from "../../../../common/components/FormContainer/FormControl/InputGridNew";
import { MessageModal } from "../../../../common/components/Modal";
import { formatDate } from "../../../../common/library/CommonLib.js";
import { showModal, hideModal } from '../../../../actions/modal';
import { MODAL_TYPE_COMMONTMODALS } from '../../../../constants/actionTypes';
import { REFUNDSUPPLIES_VIEW, REFUNDSUPPLIES_DELETE } from "../../../../constants/functionLists";
import {

    APIHostName,
    PagePath,
    DataGridColumnList,
    IDSelectColumnName,
    PKColumnName,
    TitleFormSearch,
    SearchMLObjectDefinition,
    SearchElementList

} from "../constants";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";

import { callGetCache } from "../../../../actions/cacheAction";

class SearchCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            CallAPIMessage: "",
            gridDataSource: [],
            IsCallAPIError: false,


        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        this.showMessage("Tính năng đang phát triển. Vui lòng quay lại!")
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

    handleDelete(deleteList, pkColumnName) {

    }

    handleInputGridInsert(MLObjectDefinition, modalElementList, dataSource) {



    }

     handleSearchSubmit(formData, MLObject) {

     }

    render() {
        return (
            <React.Fragment>
                <SearchForm
                    FormName={TitleFormSearch}
                    MLObjectDefinition={SearchMLObjectDefinition}
                    listelement={SearchElementList}
                    onSubmit={this.handleSearchSubmit}
                    ref={this.searchref}
                    className="multiple multiple-custom multiple-custom-display"
                    classNamebtnSearch="btn-custom-bottom"

                />
                <DataGrid
                    listColumn={DataGridColumnList}
                    dataSource={this.state.gridDataSource}
                    //AddLink={AddLink}
                    IDSelectColumnName={IDSelectColumnName}
                    PKColumnName={PKColumnName}
                    onDeleteClick={this.handleDelete.bind(this)}
                    onInsertClick={this.handleInputGridInsert.bind(this)}
                    IsCustomAddLink={true}
                    IsDelete={true}
                    IsAutoPaging={true}
                    RowsPerPage={20}
                    IsExportFile={false}
                // RequirePermission={REFUNDSUPPLIES_VIEW}
                // DeletePermission={REFUNDSUPPLIES_DELETE}
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
