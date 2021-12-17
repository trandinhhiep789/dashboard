import React from "react";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import SearchForm from "../../../../../common/components/Form/SearchForm";
import DataGrid from "../../../../../common/components/DataGrid";
import { MessageModal } from "../../../../../common/components/Modal";
import {
    SearchElementList,
    SearchMLObjectDefinition,
    DataGridColumnList,
    AddLink,
    APIHostName,
    SearchAPIPath,
    DeleteAPIPath,
    IDSelectColumnName,
    PKColumnName,
    InitSearchParams,
    PagePath,
    DataTemplateExport,
    schema,
    AddByFileAPIPath,
    AutoAddAPIPath
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { PERIODUSERRWPOSITION_VIEW, PERIODUSERRWPOSITION_DELETE, PERIODUSERRWPOSITION_EXPORT } from "../../../../../constants/functionLists";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";
import { ERPCOMMONCACHE_AREATYPE, ERPCOMMONCACHE_MATERIALGROUP } from "../../../../../constants/keyCache";
import { formatDate } from "../../../../../common/library/CommonLib";
import { toIsoStringCus } from "../../../../../utils/function";

class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAutoAdd = this.handleAutoAdd.bind(this);
        this.state = {
            CallAPIMessage: "",
            gridDataSource: [],
            IsCallAPIError: false,
            SearchData: InitSearchParams,
            dataExport: [],
            DataTemplateExport,
            PageNumber: 1
        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        this.callSearchData(this.state.SearchData);
        this.props.updatePagePath(PagePath);
    }

    handleAutoAdd(){
        this.props.callFetchAPI(APIHostName, AutoAddAPIPath, {}).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            if (!apiResult.IsError) {
                this.callSearchData(this.state.SearchData);
            }
            this.addNotification(apiResult.Message, apiResult.IsError);
        });
    }

    handleExportFile(result) {
        this.addNotification(result.Message, result.IsError);
    }


    handleImportFile(resultRows, errors) {

        const CreatedUser = this.props.AppInfo.LoginInfo.Username;
        const LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        const importData = resultRows.map(item => {
            const { UserName, RewardPositionID, ApplyFromDate, ApplyToDate, IsActived, IsSystem } = item
            return {
                ...item,
                CreatedUser,
                LoginLogID
                //ProvinceFullName: `${ProvinceID} - ${ProvinceName}`,
                //WardFullName: `${WardID} - ${WardName}`
            }
        })

        var dates = {
            convert: function (d) {

                return (
                    d.constructor === Date ? d :
                        d.constructor === Array ? new Date(d[0], d[1], d[2]) :
                            d.constructor === Number ? new Date(d) :
                                d.constructor === String ? new Date(d) :
                                    typeof d === "object" ? new Date(d.year, d.month, d.date) :
                                        NaN
                );
            },
            compare: function (a, b) {
                return (
                    isFinite(a = this.convert(a).valueOf()) &&
                        isFinite(b = this.convert(b).valueOf()) ?
                        (a > b) - (a < b) :
                        NaN
                );
            },
            inRange: function (d, start, end) {
                return (
                    isFinite(d = this.convert(d).valueOf()) &&
                        isFinite(start = this.convert(start).valueOf()) &&
                        isFinite(end = this.convert(end).valueOf()) ?
                        start <= d && d <= end :
                        NaN
                );
            }
        }
        debugger;

        let data = [];
        let _isError = false;
        importData.map((itemObject, index) => {

            if ((!itemObject.ApplyFromDate || !itemObject.ApplyToDate) && _isError == false) {
                this.addNotification("Vui lòng nhập ngày áp dụng.", true);
                _isError = true;
            }
            else if (!itemObject.UserName && _isError == false) {
                this.addNotification("Vui lòng chọn người dùng.", true);
                _isError = true;
            }
            //kiểm tra khoản thời gian phải cùng tháng, năm
            else if (itemObject.ApplyFromDate.getFullYear() != itemObject.ApplyToDate.getFullYear()) {
                this.addNotification("Vui lòng chọn cùng năm (User: " + itemObject.UserName + ")", true);
                _isError = true;
            } else if (itemObject.ApplyFromDate.getMonth() != itemObject.ApplyToDate.getMonth()) {
                this.addNotification("Vui lòng chọn cùng tháng (User: " + itemObject.UserName + ")", true);
                _isError = true;
            }
            else if (!itemObject.RewardPositionID && _isError == false) {
                this.addNotification("Vui lòng chọn mã vị trí thưởng.", true);
                _isError = true;
            }
            else if (_isError == false) {
                let validDate = dates.compare(itemObject.ApplyFromDate, itemObject.ApplyToDate);
                if (validDate == 1) {
                    this.addNotification("Ngày khai báo vị trí thưởng theo khoảng thời gian không hợp lệ. Vui lòng kiểm tra lại.", true);
                    _isError = true;
                } else {
                    itemObject.ApplyFromDate = toIsoStringCus(new Date(itemObject.ApplyFromDate).toISOString());
                    itemObject.ApplyToDate = toIsoStringCus(new Date(itemObject.ApplyToDate).toISOString());
                    data.push(itemObject);
                }

            }
        });


        if (_isError) {
            return;
        }


        this.props.callFetchAPI(APIHostName, AddByFileAPIPath, data).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            if (!apiResult.IsError) {
                //this.props.callClearLocalCache(ERPCOMMONCACHE_MATERIALGROUP);
                this.callSearchData(this.state.SearchData);
            }

            this.addNotification(apiResult.Message, apiResult.IsError);

        });

    }

    handleExportFileTemplate(result) {
        this.addNotification(result.Message, result.IsError);
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
        this.props.callFetchAPI(APIHostName, DeleteAPIPath, listMLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.addNotification(apiResult.Message, apiResult.IsError);
            if (!apiResult.IsError) {
                this.callSearchData(this.state.SearchData);
                //this.props.callClearLocalCache(ERPCOMMONCACHE_MATERIALGROUP);
            }
        });
    }

    handleSearchSubmit(formData, MLObject) {
        const postData = [
            {
                SearchKey: "@Keyword",
                SearchValue: MLObject.Keyword
            },
            {
                SearchKey: "@PAGESIZE",
                SearchValue: 100
            },
            {
                SearchKey: "@PAGEINDEX",
                SearchValue: 0
            }
        ];
        this.setState({ SearchData: postData });
        this.callSearchData(postData);
        //this.gridref.current.clearData();
    }

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
            //this.searchref.current.changeLoadComplete();
            this.setState({ IsCallAPIError: apiResult.IsError });
            if (!apiResult.IsError) {
                // xuất exel
                const exelData = apiResult.ResultObject.map((item, index) => {
                    let element = {
                        "Người dùng": item.UserName,
                        "Vị trí thưởng": item.RewardPositionName,
                        "Áp dụng từ ngày": formatDate(item.ApplyFromDate),
                        "Áp dụng đến ngày": formatDate(item.ApplyToDate),
                        "Kích hoạt": item.IsActived ? "Có" : "Không",
                        "Ngày cập nhật": formatDate(item.UpdatedDate),
                        "Người cập nhật": item.UpdatedUserFullName
                    };
                    return element;

                })

                this.setState({
                    dataExport: exelData,
                    gridDataSource: apiResult.ResultObject,
                    IsCallAPIError: apiResult.IsError,
                    IsShowForm: true
                });
            } else {
                this.setState({
                    dataExport: [],
                    gridDataSource: [],
                    IsShowForm: false,
                    IsCallAPIError: !apiResult.IsError,
                });
                this.showMessage(apiResult.Message);
            }
        });
    }

    handleonChangePage(pageNum) {
        let listMLObject = [];
        const aa = { SearchKey: "@PAGEINDEX", SearchValue: pageNum - 1 };
        listMLObject = Object.assign([], this.state.SearchData, { [2]: aa });
        // console.log(this.state.SearchData,listMLObject)
        this.callSearchData(listMLObject)
        this.setState({
            PageNumber: pageNum
        });
    }

    handleCloseMessage() {
        // if (!this.state.IsCallAPIError) {
        //     this.callSearchData(this.state.SearchData);
        // }
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


    render() {
        if (this.state.IsShowForm) {
            return (
                <React.Fragment>
                    <ReactNotification ref={this.notificationDOMRef} />
                    <SearchForm
                        FormName="Tìm kiếm vị trí thưởng theo khoảng thời gian"
                        MLObjectDefinition={SearchMLObjectDefinition}
                        listelement={SearchElementList}
                        onSubmit={this.handleSearchSubmit}
                        ref={this.searchref}
                    />
                    <div className="rwComputeManual">
                        <button type="button" className="btn btn-success rwbtComputeManual" onClick={()=>{this.handleAutoAdd()}}>Chốt thưởng</button>
                    </div>
                    <DataGrid
                        listColumn={DataGridColumnList}
                        dataSource={this.state.gridDataSource}
                        AddLink={AddLink}
                        IDSelectColumnName={IDSelectColumnName}
                        PKColumnName={PKColumnName}
                        onDeleteClick={this.handleDelete}
                        ref={this.gridref}
                        RequirePermission={PERIODUSERRWPOSITION_VIEW}
                        DeletePermission={PERIODUSERRWPOSITION_DELETE}
                        ExportPermission={PERIODUSERRWPOSITION_EXPORT}
                        IsAutoPaging={true}
                        RowsPerPage={100}
                        isPaginationServer={true}
                        PageNumber={this.state.PageNumber}
                        onChangePage={this.handleonChangePage.bind(this)}


                        IsExportFile={true}
                        DataExport={this.state.dataExport}
                        fileName="Danh sách vị trí thưởng theo khoảng thời gian"
                        onExportFile={this.handleExportFile.bind(this)}

                        IsImportFile={true}
                        SchemaData={schema}
                        onImportFile={this.handleImportFile.bind(this)}
                        isExportFileTemplate={true}
                        DataTemplateExport={this.state.DataTemplateExport}
                        fileNameTemplate={"Danh sách vị trí thưởng theo khoảng thời gian"}
                        onExportFileTemplate={this.handleExportFileTemplate.bind(this)}
                    />
                </React.Fragment>
            );
        }
        else {
            return (
                <div>
                    <label>Đang nạp dữ liệu ......</label>
                </div>
            )
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
        callClearLocalCache: (cacheKeyID) => {
            return dispatch(callClearLocalCache(cacheKeyID));
        }
    };
};

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchCom);
export default Search;
