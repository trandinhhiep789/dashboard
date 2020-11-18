import React from "react";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import SearchForm from "../../../../common/components/FormContainer/SearchForm";
//import DataGrid from "../../../../common/components/DataGrid/getdataserver.js";
import DataGrid from "../../../../common/components/DataGrid";
import InputGridNew from "../../../../common/components/FormContainer/FormControl/InputGridNew";
import { MessageModal } from "../../../../common/components/Modal";
import { formatDate } from "../../../../common/library/CommonLib.js";
import isBefore from 'date-fns/isBefore';
import formatDistance from 'date-fns/formatDistance';
import viLocale from "date-fns/locale/vi";
import { compareAsc, format, add } from 'date-fns';

import { SERVICEAGREEMENT_VIEW, SERVICEAGREEMENT_DELETE } from "../../../../constants/functionLists";


import {
    SearchElementList,
    SearchMLObjectDefinition,
    DataGridColumnList,
    AddLink,
    APIHostName,
    SearchAPIPath,
    DeleteNewAPIPath,
    IDSelectColumnName,
    PKColumnName,
    InitSearchParams,
    PagePath,
    AddLogAPIPath,
    TitleFormSearch,
    schema,
    AddAutoAPIPath
} from "../constants";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Base64 } from 'js-base64';
import { callGetCache } from "../../../../actions/cacheAction";

class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.callSearchData = this.callSearchData.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.state = {
            CallAPIMessage: "",
            gridDataSource: [],
            IsCallAPIError: false,
            SearchData: InitSearchParams,
            cssNotification: "",
            iconNotification: "",
            PageNumber: 1,
            IsLoadDataComplete: false,
            dataExport: []

        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        this.callSearchData(this.state.SearchData);
    }

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
            // console.log("SA:", apiResult)
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {

                const result = apiResult.ResultObject.map((item) => {

                    item.ExtendLable = item.ExtendedDate ? formatDate(item.ExtendedDate) : 'Chưa gia hạn';
                    let currentDate = new Date();
                    if (item.ExtendedDate != null) {
                        const ExtendedDate = new Date(item.ExtendedDate);
                        var timeDiff = Math.abs(currentDate.getTime() - ExtendedDate.getTime());
                        var diffDays = parseInt((timeDiff / (1000 * 3600 * 24)));

                        if (ExtendedDate.getTime() - currentDate.getTime() < 0) {
                            item.StatusLable = <span className='lblstatus text-danger'>Hết hạn</span>;
                        }
                        else {
                            if (diffDays < 30) {
                                item.StatusLable = <span className='lblstatus text-warning'>Còn {diffDays} ngày</span>;
                            }
                            else {
                                item.StatusLable = <span className='lblstatus text-success'>Còn hạn</span>;
                            }
                        }
                    }
                    else {

                        const ExpiredDate = new Date(item.ExpiredDate);
                        var timeDiff = Math.abs(currentDate.getTime() - ExpiredDate.getTime());
                        var diffDays = parseInt((timeDiff / (1000 * 3600 * 24)));
                        if (ExpiredDate.getTime() - currentDate.getTime() < 0) {
                            item.StatusLable = <span className='lblstatus text-danger'>Hết hạn</span>;
                        }
                        else {
                            if (diffDays < 30) {
                                item.StatusLable = <span className='lblstatus text-warning'>Còn {diffDays} ngày</span>;
                            }
                            else {
                                item.StatusLable = <span className='lblstatus text-success'>Còn hạn</span>;
                            }
                        }
                    }
                    return item;

                })

                const tempData = apiResult.ResultObject.map((item, index) => {
                    item.ExtendAgreement = item.ExtendedDate ? formatDate(item.ExtendedDate) : 'Chưa gia hạn';

                    const ExpiredDate = new Date(item.ExpiredDate);
                    let currentDate = new Date();


                    if (item.ExtendedDate != null) {
                        const ExtendedDate = new Date(item.ExtendedDate);
                        var timeDiff = Math.abs(currentDate.getTime() - ExtendedDate.getTime());
                        var diffDays = parseInt((timeDiff / (1000 * 3600 * 24)));

                        if (ExtendedDate.getTime() - currentDate.getTime() < 0) {
                            item.StatusAgreement = "Hết hạn";
                        }
                        else {
                            if (diffDays < 30) {
                                item.StatusAgreement = `Còn ${diffDays} ngày`;
                            }
                            else {
                                item.StatusAgreement = "Còn hạn";
                            }
                        }
                    }
                    else {

                        const ExpiredDate = new Date(item.ExpiredDate);
                        var timeDiff = Math.abs(currentDate.getTime() - ExpiredDate.getTime());
                        var diffDays = parseInt((timeDiff / (1000 * 3600 * 24)));
                        if (ExpiredDate.getTime() - currentDate.getTime() < 0) {
                            item.StatusAgreement = "Hết hạn";
                        }
                        else {
                            var timeDiff = Math.abs(currentDate.getTime() - ExpiredDate.getTime());
                            var diffDays = parseInt((timeDiff / (1000 * 3600 * 24)));
                            if (diffDays < 30) {
                                item.StatusAgreement = `Còn ${diffDays} ngày`;
                            }
                            else {
                                item.StatusAgreement = "Còn hạn";
                            }
                        }
                    }

                    let element = {
                        "Số hợp đồng": item.ServiceAgreementNumber,
                        "Đối tác": item.PartnerName,
                        "Loại dịch vụ": item.ServiceTypeName,
                        "Khu vực": item.AreaName,
                        "Ngày ký hợp đồng": item.SignedDate,
                        "Ngày hết hạn hợp đồng": item.ExpiredDate,
                        "Gia hạn đến": item.ExtendAgreement,
                        "Trạng thái": item.StatusAgreement
                    };

                    return element;

                })

                this.setState({
                    gridDataSource: result,
                    dataExport: tempData,
                    IsCallAPIError: apiResult.IsError,
                });
            }
        });
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
            // this.setState({
            //     cssNotification: "notification-custom-success",
            //     iconNotification: "fa fa-check"
            // });
        } else {
            cssNotification = "notification-danger";
            iconNotification = "fa fa-exclamation"
            // this.setState({
            //     cssNotification: "notification-danger",
            //     iconNotification: "fa fa-exclamation"
            // });
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

    handleSearchSubmit(formData, MLObject) {
        const DataSearch = [
            {
                SearchKey: "@Keyword",
                SearchValue: MLObject.Keyword
            },
            {
                SearchKey: "@SERVICETYPEID",
                SearchValue: MLObject.ServiceTypeID
            },
            {
                SearchKey: "@AREAID",
                SearchValue: MLObject.AreaID
            },
            {
                SearchKey: "@FromDate",
                SearchValue: MLObject.SignedDate
            },
            {
                SearchKey: "@ToDate",
                SearchValue: MLObject.ExpiredDate
            },
            {
                SearchKey: "@STATUS",
                SearchValue: MLObject.ServiceStatusID
            }

        ];

        this.setState({
            SearchData: DataSearch
        });

        this.callSearchData(DataSearch);
    }

    handleExportFile(result) {
        this.addNotification(result.Message);
    }

    handleImportFile(resultRows, errors) {
        console.log('handleImportFile', resultRows, errors)
        // this.props.callFetchAPI(APIHostName, AddAutoAPIPath, resultRows).then(apiResult => {
        //     console.log('apiResult', apiResult)
        // });
    }

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <SearchForm
                    FormName={TitleFormSearch}
                    MLObjectDefinition={SearchMLObjectDefinition}
                    listelement={SearchElementList}
                    onSubmit={this.handleSearchSubmit}
                    ref={this.searchref}
                    className="multiple multiple-custom"

                />
                <DataGrid
                    listColumn={DataGridColumnList}
                    dataSource={this.state.gridDataSource}
                    AddLink={AddLink}
                    IDSelectColumnName={IDSelectColumnName}
                    PKColumnName={PKColumnName}
                    onDeleteClick={this.handleDelete}
                    IsDelete={true}
                    IsAutoPaging={true}
                    RowsPerPage={10}
                    RequirePermission={SERVICEAGREEMENT_VIEW}
                    DeletePermission={SERVICEAGREEMENT_DELETE}
                    IsExportFile={true}
                    DataExport={this.state.dataExport}
                    fileName="Danh sách hợp đồng"
                    onExportFile={this.handleExportFile.bind(this)}
                    IsImportFile={true}
                    SchemaData={schema}
                    onImportFile={this.handleImportFile.bind(this)}

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
