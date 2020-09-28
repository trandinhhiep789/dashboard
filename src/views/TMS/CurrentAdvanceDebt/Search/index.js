import React from "react";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import SearchForm from "../../../../common/components/FormContainer/SearchForm";
//import DataGrid from "../../../../common/components/DataGrid/getdataserver.js";
import DataGrid from "../../../../common/components/DataGrid";
import { MessageModal } from "../../../../common/components/Modal";
import { formatDate } from "../../../../common/library/CommonLib.js";

import { SERVICEAGREEMENT_VIEW, SERVICEAGREEMENT_DELETE } from "../../../../constants/functionLists";


import {
    SearchElementList,
    SearchMLObjectDefinition,
    DataGridColumnList,
    APIHostName,
    SearchAPIPath,
    PagePath,
    TitleFormSearch
} from "../constants";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";

class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.state = {
            CallAPIMessage: "",
            gridDataSource: [],
            IsCallAPIError: false,
            IsLoadDataComplete: false,

        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);

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
        this.props.callFetchAPI(APIHostName, SearchAPIPath, MLObject.UserName[0].value).then(apiResult => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {

                this.setState({
                    gridDataSource: apiResult.ResultObject,
                    IsCallAPIError: apiResult.IsError,
                });
            }
        });
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
                    className="multiple"

                />
                <DataGrid
                    listColumn={DataGridColumnList}
                    dataSource={this.state.gridDataSource}
                    IDSelectColumnName={""}
                    PKColumnName={""}
                    IsDelete={false}
                    IsAutoPaging={true}
                    RowsPerPage={10}
                    IsExportFile={false}
                    // RequirePermission={SERVICEAGREEMENT_VIEW}
                    // DeletePermission={SERVICEAGREEMENT_DELETE}
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
        }
    };
};

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchCom);
export default Search;
