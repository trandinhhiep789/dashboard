import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import SearchForm from "../../../../common/components/FormContainer/SearchForm";
import DataGrid from "../../../../common/components/DataGrid";
import {
    SearchElementList,
    SearchMLObjectDefinition,
    DataGridColumnList,
    BackLink,
    AddLink,
    PagePath,
    IDSelectColumnName,
    PKColumnName
} from "../constants";
import { showModal, hideModal } from '../../../../actions/modal';


class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            widthPercent: "",
            gridDataSource: [],
        };
        this.searchref = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({
            widthPercent: (window.innerWidth * 60) / 100
        })
    };


    
    handleSearchSubmit(formData, MLObject){
        console.log("Search", formData, MLObject)
    }

    handleDelete(deleteList, pkColumnName) {
        console.log("delete", deleteList, pkColumnName)
    }

    render() {
     
        return (
            <React.Fragment>
                <SearchForm
                    FormName="Tìm kiếm danh sách vận đơn"
                    listelement={SearchElementList}
                    MLObjectDefinition={SearchMLObjectDefinition}
                    onSubmit={this.handleSearchSubmit.bind(this)}
                    ref={this.searchref}
                    colGroupAction={6}
                    IsButtonExport={false}
                    IsButtonhistory={false}
                    className=""
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
                    // RequirePermission={SERVICEAGREEMENT_VIEW}
                    // DeletePermission={SERVICEAGREEMENT_DELETE}
                    // ExportPermission={SERVICEAGREEMENT_EXPORT}
                    IsExportFile={false}
                    IsImportFile={false}
                    

                />
                

            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        AppInfo: state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updatePagePath: pagePath => {
            dispatch(updatePagePath(pagePath));
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        callClearLocalCache: (cacheKeyID) => {
            return dispatch(callClearLocalCache(cacheKeyID))
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: (type, props) => {
            dispatch(hideModal(type, props));
        }

    }
}

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchCom);
export default Search;