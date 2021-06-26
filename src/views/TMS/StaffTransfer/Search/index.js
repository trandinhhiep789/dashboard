import React from "react";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";

import { FormName, MLObjectDefinition, listelement, PagePath, InitSearchParams, APIHostName, APISearch, listColumn } from './constants'
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { showModal, hideModal } from '../../../../actions/modal';
import { updatePagePath } from "../../../../actions/pageAction";
import { callGetCache } from "../../../../actions/cacheAction";
import { MessageModal } from "../../../../common/components/Modal";
import { MODAL_TYPE_COMMONTMODALS } from '../../../../constants/actionTypes';
import SearchForm from "../../../../common/components/FormContainer/SearchForm";
import DataGrid from "../../../../common/components/DataGrid";
import AddModal from '../AddModal';

class SearchCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            SearchData: InitSearchParams,
            dataSource: null
        };

        this.searchref = React.createRef();
        this.callSearchData = this.callSearchData.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleInsert = this.handleInsert.bind(this);
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        this.callSearchData(this.state.SearchData);
    }

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, APISearch, searchData).then(apiResult => {
            if (apiResult.IsError) {
                this.showMessage(apiResult.Message);
            } else {
                this.setState({
                    dataSource: apiResult.ResultObject
                })
            }
        })
    }

    handleSearch(formData, MLObject) {
        const DataSearch = [
            {
                SearchKey: "@Keyword",
                SearchValue: MLObject.Keyword
            },
            {
                SearchKey: "@STAFFTRANSFERTYPEID",
                SearchValue: MLObject.StaffTransferID
            },
            {
                SearchKey: "@REQUESTSTOREID",
                SearchValue: MLObject.RequestStoreID
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
                SearchKey: "@ISREVIEWED",
                SearchValue: MLObject.IsreViewed
            },
            {
                SearchKey: "@ISTRANSFERED",
                SearchValue: MLObject.IsTransfered
            }
        ];

        this.setState({
            SearchData: DataSearch
        });

        this.callSearchData(DataSearch);
    }

    handleInsert() {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Loại hình thuyên chuyển nhân viên',
            content: {
                text: <AddModal />
            },
            maxWidth: '800px'
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

    render() {
        const { dataSource } = this.state;

        return <React.Fragment>
            Tính năng đang phát triển
        </React.Fragment>

        if (dataSource == null) {
            return (
                <React.Fragment></React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <SearchForm
                        FormName={FormName}
                        MLObjectDefinition={MLObjectDefinition}
                        listelement={listelement}
                        onSubmit={this.handleSearch}
                        ref={this.searchref}
                        className="multiple multiple-custom multiple-custom-display"
                        classNamebtnSearch="btn-custom-bottom"
                    />

                    <DataGrid
                        listColumn={listColumn}
                        dataSource={dataSource}
                        IDSelectColumnName={"chkSelect"}
                        PKColumnName={"StaffTransferID"}
                        // onDeleteClick={this.handleDelete}
                        onInsertClick={this.handleInsert}
                        IsCustomAddLink={true}
                        IsDelete={true}
                        IsAutoPaging={true}
                        RowsPerPage={10}
                        IsExportFile={true}
                        // DataExport={this.state.dataExport}
                        // RequirePermission={}
                        // DeletePermission={}
                        // ExportPermission={}
                        fileName="Danh sách thuyên chuyển nhân viên"
                    // onExportFile={this.handleExportFile.bind(this)}
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