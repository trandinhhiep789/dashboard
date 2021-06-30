import React from "react";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import ReactNotification from "react-notifications-component";

import { MLObjectDefinition, listelement, PagePath, InitSearchParams, APIHostName, APISearch, listColumn } from './constants'
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { showModal, hideModal } from '../../../../actions/modal';
import { updatePagePath } from "../../../../actions/pageAction";
import { callGetCache } from "../../../../actions/cacheAction";
import { MessageModal } from "../../../../common/components/Modal";
import { MODAL_TYPE_COMMONTMODALS } from '../../../../constants/actionTypes';
import { formatDate } from "../../../../common/library/CommonLib.js";

import SearchForm from "../../../../common/components/FormContainer/SearchForm";
import DataGrid from "../../../../common/components/DataGrid";
import AddModal from '../AddModal';

class SearchCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            SearchData: InitSearchParams,
            dataSource: null,
            dataExport: []
        };

        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
        this.callSearchData = this.callSearchData.bind(this);

        this.handleSearch = this.handleSearch.bind(this);
        this.handleInsert = this.handleInsert.bind(this);
        this.handleSetDataSource = this.handleSetDataSource.bind(this);
        this.handleSetExportData = this.handleSetExportData.bind(this);
        this.handleExportFile = this.handleExportFile.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
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
                const dataSource = this.handleSetDataSource(apiResult.ResultObject), dataExport = this.handleSetExportData(apiResult.ResultObject);

                this.setState({
                    dataSource,
                    dataExport
                })
            }
        })
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

    handleSetDataSource(DataSource) {
        try {
            const dataSource = DataSource.map(item => {
                if (item.IsTransfered) {
                    item.TransferedStatusLable = <span className='lblstatus text-success'>Đã thuyên chuyển</span>;
                }
                else {
                    item.TransferedStatusLable = <span className='lblstatus text-warning'>Chưa thuyên chuyển</span>;
                }

                if (item.IsReviewed) {
                    item.ReviewStatusLable = <span className='lblstatus text-success'>Đã duyệt</span>;
                }
                else {
                    item.ReviewStatusLable = <span className='lblstatus text-warning'>Chưa duyệt</span>;

                }

                return {
                    ...item,
                    RequestStoreID_Name: `${item.RequestStoreID} - ${item.RequestStoreName}`,
                    RequestUserID_Name: `${item.RequestUser} - ${item.RequestUserFullName}`
                }
            })
            return dataSource;
        } catch (error) {
            return DataSource;
        }
    }

    handleSearch(formData, MLObject) {
        const DataSearch = [
            {
                SearchKey: "@Keyword",
                SearchValue: MLObject.Keyword
            },
            {
                SearchKey: "@STAFFTRANSFERTYPEID",
                SearchValue: MLObject.StaffTransferTypeID
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
                SearchValue: MLObject.IsReviewed
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

    handleSetExportData(ResultObject) {
        try {
            const dataExport = ResultObject.map(item => {
                return {
                    "Mã thuyên chuyển": item.StaffTransferID,
                    "Tên thuyên chuyển": item.StaffTransferTitle,
                    "Kho yêu cầu": `${item.RequestStoreID} - ${item.RequestStoreName}`,
                    "Người yêu cầu": `${item.RequestUser} - ${item.RequestUserFullName}`,
                    "Ngày yêu cầu": formatDate(item.RequestDate, true),
                    "Đã duyệt": item.IsReviewed ? "Đã duyệt" : "Chưa duyệt",
                    "Đã thuyên chuyển": item.IsTransfered ? "Đã thuyên chuyển" : "Chưa thuyên chuyển"
                }
            })

            return dataExport;
        } catch (error) {
            return [];
        }
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

    handleExportFile(result) {
        this.addNotification(result.Message, result.IsError);
    }

    handleDelete() {
        this.showMessage("Tính năng đang phát triển")
    }

    render() {
        const { dataSource, dataExport } = this.state;

        if (dataSource == null) {
            return (
                <React.Fragment></React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <ReactNotification ref={this.notificationDOMRef} />

                    <SearchForm
                        FormName={"Tìm kiếm danh sách thuyên chuyển nhân viên"}
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
                        onInsertClick={this.handleInsert}
                        IsCustomAddLink={true}
                        IsDelete={true}
                        onDeleteClick={this.handleDelete}
                        IsAutoPaging={true}
                        RowsPerPage={20}
                        fileName="Danh sách thuyên chuyển nhân viên"
                        IsExportFile={true}
                        onExportFile={this.handleExportFile}
                        DataExport={dataExport}
                    // RequirePermission={}
                    // DeletePermission={}
                    // ExportPermission={}
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