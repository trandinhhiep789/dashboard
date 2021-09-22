import React from "react";
import { connect } from "react-redux";
import "react-notifications-component/dist/theme.css";
import { ModalManager } from "react-dynamic-modal";
import ReactNotification from "react-notifications-component";

import {
    AddByFileAPIPath,
    AddLink,
    APIHostName,
    DataGridColumnList,
    DataTemplateExport,
    DeleteAPIPath,
    IDSelectColumnName,
    InitSearchParams,
    PagePath,
    PKColumnName,
    schema,
    SearchAPIPath,
    SearchElementList,
    SearchMLObjectDefinition,
} from "../constants";

import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";
import { ERPCOMMONCACHE_QUALITYASSESSGROUP } from "../../../../../constants/keyCache";
import { MessageModal } from "../../../../../common/components/Modal";
import { QUALITYASSESSGROUP_VIEW, QUALITYASSESSGROUP_DELETE, DELIVERYGOODSGROUP_VIEW, DELIVERYGOODSGROUP_DELETE } from "../../../../../constants/functionLists";
import { updatePagePath } from "../../../../../actions/pageAction";
import DataGrid from "../../../../../common/components/DataGrid";
import SearchForm from "../../../../../common/components/Form/SearchForm";

class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleExportFile = this.handleExportFile.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.state = {
            CallAPIMessage: "",
            DataExport: [],
            DataTemplateExport,
            gridDataSource: [],
            IsCallAPIError: false,
            SearchData: InitSearchParams,
        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        this.callSearchData(this.state.SearchData);
        this.props.updatePagePath(PagePath);
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
                // this.props.callClearLocalCache(ERPCOMMONCACHE_QUALITYASSESSGROUP);
                // this.handleSubmitInsertLog();
            }
        });
    }

    handleExportFile(result) {
        this.addNotification(result.Message, result.IsError);
    }

    handleSearchSubmit(formData, MLObject) {
        const postData = [
            {
                SearchKey: "@Keyword",
                SearchValue: MLObject.Keyword
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
                const dataExport = apiResult.ResultObject.map(item => {
                    return {
                        "Mã nhân viên": item.UserName,
                        "Tên nhân viên": item.FullName,
                        "Nhóm hàng hóa vận chuyển": item.DeliveryGoodsGroupName,
                        "Khả năng giao hàng và lắp đặt": item.DeliveryAbility,
                        "Tỷ lệ phân bổ": item.ApportionFactor,
                        "Ngày cập nhật": item.UpdatedDate,
                        "Người cập nhật": item.UpdatedUserFullName
                    }
                })

                this.setState({
                    DataExport: dataExport,
                    gridDataSource: apiResult.ResultObject,
                    IsShowForm: true,
                });
            } else {
                this.showMessage(apiResult.Message);
                this.setState({ IsShowForm: false });
            }

        });
    }

    handleExportFileTemplate(result) {
        this.addNotification(result.Message, result.IsError);
    }

    handleImportFile(resultRows, errors) {

        const CreatedUser = this.props.AppInfo.LoginInfo.Username;
        const LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        //const CoordinatorGroupID = this.props.CoordinatorGroupID;
        const importData = resultRows.map(item => {
            //const { UserName, IsSystem } = item
            return {
                ...item,
                CreatedUser,
                LoginLogID
                //ProvinceFullName: `${ProvinceID} - ${ProvinceName}`,
                //WardFullName: `${WardID} - ${WardName}`
            }
        })

        let data = [];
        let _isError = false;
        importData.map((itemObject, index) => {
            if (!itemObject.UserName && _isError == false) {
                this.addNotification("Vui lòng chọn người dùng.", true);
                _isError = true;
            }
            else if ((isNaN(itemObject.DeliveryAbility)) && _isError == false) {
                this.addNotification("khả năng giao hàng và lắp đặt => vui lòng nhập số.", true);
                _isError = true;
            }
            else if ((isNaN(itemObject.ApportionFactor)) && _isError == false) {
                this.addNotification("Tỷ lệ phân bổ => vui lòng nhập số.", true);
                _isError = true;
            }
            else if ((itemObject.DeliveryAbility < 0 || itemObject.ApportionFactor < 0) && _isError == false) {
                this.addNotification("Vui lòng nhập số dương.", true);
                _isError = true;

            } else if ((itemObject.DeliveryAbility > 100) && _isError == false) {
                this.addNotification("khả năng giao hàng và lắp đặt vượt quá 100.", true);
                _isError = true;
            }
            else if ((itemObject.ApportionFactor > 100) && _isError == false) {
                this.addNotification("Tỷ lệ phân bổ vượt quá 100.", true);
                _isError = true;
            } else {
                itemObject.IsActived = true;
                data.push(itemObject);
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
                        FormName="Tìm kiếm danh sách nhóm tiêu chí đánh giá chất lượng"
                        MLObjectDefinition={SearchMLObjectDefinition}
                        listelement={SearchElementList}
                        onSubmit={this.handleSearchSubmit}
                        ref={this.searchref}
                    />
                    <DataGrid
                        AddLink={AddLink}
                        DataExport={this.state.DataExport}
                        dataSource={this.state.gridDataSource}
                        DataTemplateExport={this.state.DataTemplateExport}
                        DeletePermission={DELIVERYGOODSGROUP_DELETE}
                        fileName={"Danh sách khả năng giao hàng-lắp đặt và tỷ lệ phân bổ tải trên nhóm hàng hóa vận chuyển của một nhân viên"}
                        fileNameTemplate={"Danh sách nhân viên giao hàng thuộc 1 nhóm chi nhánh quản lý"}
                        IDSelectColumnName={IDSelectColumnName}
                        IsAutoPaging={true}
                        IsExportFile={true}
                        isExportFileTemplate={true}
                        IsImportFile={true}
                        listColumn={DataGridColumnList}
                        onDeleteClick={this.handleDelete}
                        onExportFile={this.handleExportFile}
                        onExportFileTemplate={this.handleExportFileTemplate.bind(this)}
                        onImportFile={this.handleImportFile.bind(this)}
                        PKColumnName={PKColumnName}
                        ref={this.gridref}
                        RequirePermission={DELIVERYGOODSGROUP_VIEW}
                        RowsPerPage={10}
                        SchemaData={schema}
                    />
                </React.Fragment>
            );
        } else {
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
