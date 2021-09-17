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
    schema, DataTemplateExport, AddByFileAPIPath
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";
import { ERPCOMMONCACHE_QUALITYASSESSGROUP } from "../../../../../constants/keyCache";
import { QUALITYASSESSGROUP_VIEW, QUALITYASSESSGROUP_DELETE, DELIVERYGOODSGROUP_VIEW, DELIVERYGOODSGROUP_DELETE } from "../../../../../constants/functionLists";

class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.state = {
            CallAPIMessage: "",
            gridDataSource: [],
            IsCallAPIError: false,
            SearchData: InitSearchParams,
            DataTemplateExport
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
                this.setState({
                    gridDataSource: apiResult.ResultObject,
                    IsShowForm: true
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

            }else if ((itemObject.DeliveryAbility > 100) && _isError == false) {
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
                        listColumn={DataGridColumnList}
                        dataSource={this.state.gridDataSource}
                        AddLink={AddLink}
                        IDSelectColumnName={IDSelectColumnName}
                        PKColumnName={PKColumnName}
                        onDeleteClick={this.handleDelete}
                        ref={this.gridref}
                        RequirePermission={DELIVERYGOODSGROUP_VIEW}
                        DeletePermission={DELIVERYGOODSGROUP_DELETE}
                        IsAutoPaging={true}
                        RowsPerPage={10}

                        IsImportFile={true}
                        SchemaData={schema}
                        onImportFile={this.handleImportFile.bind(this)}
                        isExportFileTemplate={true}
                        DataTemplateExport={this.state.DataTemplateExport}
                        fileNameTemplate={"Danh sách nhân viên giao hàng thuộc 1 nhóm chi nhánh quản lý"}
                        onExportFileTemplate={this.handleExportFileTemplate.bind(this)}
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
