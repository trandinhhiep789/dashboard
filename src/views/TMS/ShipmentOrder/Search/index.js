import React from "react";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import SearchForm from "../../../../common/components/FormContainer/SearchForm";
import DataGrid from "../../../../common/components/DataGrid";
import { MessageModal } from "../../../../common/components/Modal";
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
    AddLogAPIPath
} from "../constants";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import { callGetCache } from "../../../../actions/cacheAction";

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
            cssNotification: "",
            iconNotification: ""
        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
       // this.callSearchData(this.state.SearchData);
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
                if(!apiResult.IsError){
                    this.callSearchData(this.state.SearchData);
                    // this.handleClearLocalCache();
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
       // this.callSearchData(postData);
        //this.gridref.current.clearData();
    }

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
                this.searchref.current.changeLoadComplete();
                if (!apiResult.IsError) {
                    this.setState({
                        gridDataSource: apiResult.ResultObject,
                        IsCallAPIError: apiResult.IsError
                    });
                }
            });
    }

    handleCloseMessage() {
        if (!this.state.IsCallAPIError) {
            this.callSearchData(this.state.SearchData);
        }
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
        if (!IsError) {
            this.setState({
                cssNotification: "notification-custom-success",
                iconNotification: "fa fa-check"
            });
        } else {
            this.setState({
                cssNotification: "notification-danger",
                iconNotification: "fa fa-exclamation"
            });
        }
        this.notificationDOMRef.current.addNotification({
            container: "bottom-right",
            content: (
                <div className={this.state.cssNotification}>
                    <div className="notification-custom-icon">
                        <i className={this.state.iconNotification} />
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
        const SearchElementList = [
            {
                type: "text",
                name: "txtKeyword",
                label: "Từ khóa",
                value: "",
                colspan:2,
                placeholder: "Từ khóa",
                icon: "",
                validatonList: ["required"]
            },
            {
                type: "ComboBox",
                name: "cbContryid",
                label: "Công ty",
                colspan:2,
                value: -1,
                isMultiSelect: false,
                validatonList: ["Comborequired"],
                placeholder:"---Vui lòng chọn---",
                listoption: [
                    { value: -1, label: '---Vui lòng chọn---' },
                    { value: 1, label: 'Việt Nam' },
                    { value: 2, label: 'Hoa kỳ' },
                    { value: 3, label: 'Trung Quốc' }
                ]
                
            },
            // {
            //     type: "Datetime",
            //     name: "dtDategeto",
            //     label: "Từ ngày",
            //     value: "",
            //     timeFormat:false,
            //     dateFormat:"DD/MM/YYYY",
            //     colspan:2,
            //     validatonList: ["required"]
            // },
            // {
            //     type: "Datetime",
            //     name: "dtDategetfo",
            //     label: "Đến ngày",
            //     value: "",
            //     timeFormat:false,
            //     dateFormat:"DD/MM/YYYY",
            //     colspan:2,
            //     validatonList: ["required"]
            // },
            // {
            //     type: "ComboBox",
            //     name: "cbContryid56",
            //     label: "Tỉnh /thành phố",
            //     colspan:2,
            //     value: -1,
            //     isMultiSelect: false,
            //     placeholder:"---Vui lòng chọn---",
            //     listoption: [
            //         { value: -1, label: '---Vui lòng chọn---' },
            //         { value: 1, label: 'Việt Nam' },
            //         { value: 2, label: 'Hoa kỳ' },
            //         { value: 3, label: 'Trung Quốc' }
            //     ]
            // },
            // {
            //     type: "ComboBox",
            //     name: "cbContryid14",
            //     label: "Quận/huyện",
            //     colspan:2,
            //     value: -1,
            //     isMultiSelect: false,
            //     placeholder:"---Vui lòng chọn---",
            //     listoption: [
            //         { value: -1, label: '---Vui lòng chọn---' },
            //         { value: 1, label: 'Việt Nam' },
            //         { value: 2, label: 'Hoa kỳ' },
            //         { value: 3, label: 'Trung Quốc' }
            //     ]
            // },
            // {
            //     type: "ComboBox",
            //     name: "cbContryid12",
            //     label: "Kho giao",
            //     colspan:2,
            //     value: -1,
            //     isMultiSelect: false,
            //     placeholder:"---Vui lòng chọn---",
            //     listoption: [
            //         { value: -1, label: '---Vui lòng chọn---' },
            //         { value: 1, label: 'Việt Nam' },
            //         { value: 2, label: 'Hoa kỳ' },
            //         { value: 3, label: 'Trung Quốc' }
            //     ]
            // },
            // {
            //     type: "ComboBox",
            //     name: "cbContryid1",
            //     label: "Trạng thái",
            //     colspan:2,
            //     value: -1,
            //     isMultiSelect: false,
            //     placeholder:"---Vui lòng chọn---",
            //     listoption: [
            //         { value: -1, label: '---Vui lòng chọn---' },
            //         { value: 1, label: 'Việt Nam' },
            //         { value: 2, label: 'Hoa kỳ' },
            //         { value: 3, label: 'Trung Quốc' }
            //     ]
            // },
           

        ];
        const SearchMLObjectDefinition = [
            {
                Name: "Keyword",
                DefaultValue: "",
                BindControlName: "txtKeyword"
            },
            {
                Name: "Contryid",
                DefaultValue: "",
                BindControlName: "cbContryid",
                DataSourceMember: "Contryid"
            }
        ];
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <SearchForm
                   FormName="Tìm "
                   MLObjectDefinition={SearchMLObjectDefinition}
                   listelement={SearchElementList}
                   onSubmit={this.handleSearchSubmit}
                />
                <DataGrid
                    listColumn={DataGridColumnList}
                    dataSource={this.state.gridDataSource}
                    AddLink={AddLink}
                    IDSelectColumnName={IDSelectColumnName}
                    PKColumnName={PKColumnName}
                    onDeleteClick={this.handleDelete}
                    ref={this.gridref}
                    IsAutoPaging={true}
                    RowsPerPage={10}
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

const Search = connect(mapStateToProps,mapDispatchToProps)(SearchCom);
export default Search;
