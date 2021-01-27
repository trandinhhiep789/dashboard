import React from "react";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
//import SearchForm from "../../../../../../common/components/Form/SearchForm";
import SearchForm from "../../../../../../common/components/FormContainer/SearchForm";
import DataGrid from "../../../../../../common/components/DataGrid";
import { MessageModal } from "../../../../../../common/components/Modal";
import { MODAL_TYPE_CONFIRMATION } from '../../../../../../constants/actionTypes';
import { showModal, hideModal } from '../../../../../../actions/modal';
import { GetMLObjectData } from "../../../../../../common/library/form/FormLib";
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
    AddElementList,
    MLObjectDefinition,
    AddAPIPath,
    CreateUserNameAPIPath,
    ModalColumnList_Edit,
    UpdateAPIPath
} from "../constants";
import { callFetchAPI } from "../../../../../../actions/fetchAPIAction";
import { callGetCache, callClearLocalCache } from "../../../../../../actions/cacheAction";
import { updatePagePath } from "../../../../../../actions/pageAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { PARTNERUSER_VIEW, PARTNERUSER_DELETE } from "../../../../../../constants/functionLists";
import { ERPCOMMONCACHE_PARTNERUSER } from "../../../../../../constants/keyCache";
import MD5Digest from "../../../../../../common/library/cryptography/MD5Digest";
class SearchCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.addNotification = this.addNotification.bind(this);
        this.handleInsert = this.handleInsert.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleModalChange = this.handleModalChange.bind(this);
        this.CreateUserName = this.CreateUserName.bind(this);
        this.state = {
            CallAPIMessage: "",
            gridDataSource: [],
            IsCallAPIError: false,
            SearchData: InitSearchParams,
            SearchElementList: SearchElementList,
            Password: "",
            PasswordConfirm: "",
        };
        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
    }



    componentDidMount() {
        this.callSearchData(this.state.SearchData);
        this.props.updatePagePath(PagePath);
    }

    CreateUserName() {
        // if (!this.state.UserID) {

        // }

        this.props.callFetchAPI(APIHostName, CreateUserNameAPIPath, "abc").then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            if (!apiResult.IsError) {
                this.setState({ UserID: apiResult.ResultObject })
                document.getElementsByName("txtUserName")[0].value = apiResult.ResultObject;
            } else {
                this.showMessage("Lỗi tạo tên đăng nhập.");
            }
            //console.log("username", apiResult);
        });

    }

    handleModalChange(formData, formValidation, elementName, elementValue) {
        if (elementName == "txtPassWord") {
            this.setState({ PassWord: elementValue });
        } else if (elementName == "txtPassWordConfirm") {
            this.setState({ PassWordConfirm: elementValue });
        } else if (elementName == "chkShowPassWord") {
            this.showPassWord("txtPassWord");
            this.showPassWord("txtPassWordConfirm");
            return;
        }

    }

    showPassWord(name) {
        var x = document.getElementsByName(name)[0];
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    handleInsert(MLObjectDefinition, modalElementList, dataSource) {
        this.setState({ IsInsert: true });
        this.CreateUserName();
        this.props.showModal(MODAL_TYPE_CONFIRMATION, {
            title: 'Thêm mới người dùng của nhà cung cấp',
            autoCloseModal: false,
            onValueChange: this.handleModalChange,
            //onClose: this.onClose,
            onConfirm: (isConfirmed, formData) => {
                if (isConfirmed) {
                    let MLObject = GetMLObjectData(MLObjectDefinition, formData, dataSource);
                    if (MLObject) {
                        //check password valid
                        let { PassWord, PassWordConfirm } = this.state;
                        if (PassWord != PassWordConfirm) {
                            this.setState({ IsCallAPIError: true });
                            this.showMessage("Xác nhận mật khẩu chưa đúng.");
                            return false;
                        }

                        if (!this.state.UserID) {
                            this.setState({ IsCallAPIError: true });
                            this.showMessage("Chưa có tên đăng nhập. Vui lòng bấm nút tạo tên đăng nhập.");
                            return false;
                        }

                        let fullName = MLObject.FullName.split(" ");
                        let firstName = fullName[fullName.length - 1];
                        let lastName = "";
                        fullName.map((item, index) => {
                            if (item != firstName) {
                                lastName += item + " ";
                            }
                        })

                        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
                        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
                        MLObject.PassWord = MD5Digest(PassWord);
                        MLObject.FirstName = firstName.trim();
                        MLObject.LastName = lastName.trim();
                        MLObject.UserName = this.state.UserID;
                        MLObject.PartnerID = MLObject.PartnerID && Array.isArray(MLObject.PartnerID) ? MLObject.PartnerID[0] : MLObject.PartnerID;

                        if (MLObject.Birthday) {
                            let temp = MLObject.Birthday.trim().split('/');
                            let myDate = new Date(temp[1] + '/' + temp[0] + '/' + temp[2]);
                            myDate.setDate(myDate.getDate() + 1);
                            MLObject.Birthday = myDate;
                        }

                        this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then(apiResult => {
                            if (!apiResult.IsError) {
                                this.callSearchData(this.state.SearchData);
                                this.props.callClearLocalCache(ERPCOMMONCACHE_PARTNERUSER);
                                this.props.hideModal();
                            }
                            //this.showMessage(apiResult.Message);
                            this.addNotification(apiResult.Message, apiResult.IsError);
                        });

                        //console.log("MLObject", MLObject);
                    }
                }
            },
            modalElementList: modalElementList,
        });
    }


    handleEdit(value, pkColumnName) {
        this.setState({ IsInsert: false });
        let _partnerUserData = {};
        this.state.gridDataSource.map((item, index) => {
            let isMath = false;
            for (var j = 0; j < pkColumnName.length; j++) {
                if (item[pkColumnName[j].key] != value.pkColumnName[j].value) {
                    isMath = false;
                    break;
                }
                else {
                    isMath = true;
                }
            }
            if (isMath) {
                _partnerUserData = item;
            }
        });

        console.log("_partnerUserData", _partnerUserData, this.state.gridDataSource)



        this.props.showModal(MODAL_TYPE_CONFIRMATION, {
            title: 'Chỉnh sửa người dùng của nhà cung cấp',
            autoCloseModal: false,
            onValueChange: this.handleModalChange,
            onConfirm: (isConfirmed, formData) => {
                if (isConfirmed) {
                    let MLObject = GetMLObjectData(MLObjectDefinition, formData, _partnerUserData);
                    if (MLObject) {
                        MLObject.MaterialGroup = this.state.MaterialGroupID;
                        MLObject.MainGroupID = MLObject.MainGroupID && Array.isArray(MLObject.MainGroupID) ? MLObject.MainGroupID[0] : MLObject.MainGroupID;
                        MLObject.ApplySubGroupID = MLObject.ApplySubGroupID && Array.isArray(MLObject.ApplySubGroupID) ? MLObject.ApplySubGroupID[0] : MLObject.ApplySubGroupID;
                        MLObject.ApplyTechspecsID = MLObject.ApplyTechspecsID && Array.isArray(MLObject.ApplyTechspecsID) ? MLObject.ApplyTechspecsID[0] : MLObject.ApplyTechspecsID;
                        MLObject.ApplyTechspecsValueID = MLObject.ApplyTechspecsValueID && Array.isArray(MLObject.ApplyTechspecsValueID) ? MLObject.ApplyTechspecsValueID[0] : MLObject.ApplyTechspecsValueID;
                        MLObject.ApplyBrandID = MLObject.ApplyBrandID && Array.isArray(MLObject.ApplyBrandID) ? MLObject.ApplyBrandID[0] : MLObject.ApplyBrandID;
                        MLObject.ApplyProductID = MLObject.ApplyProductID && Array.isArray(MLObject.ApplyProductID) ? MLObject.ApplyProductID[0].ProductID : MLObject.ApplyProductID;
                        // MLObject.ApplyProductID = MLObject.ApplyProductID && MLObject.ApplyProductID[0].ProductID ? MLObject.ApplyProductID[0].ProductID : MLObject.ApplyProductID;
                        //MLObject.MaterialProductID = MLObject.MaterialProductID && MLObject.MaterialProductID[0].ProductID ? MLObject.MaterialProductID[0].ProductID : MLObject.MaterialProductID;
                        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
                        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;



                        this.props.callFetchAPI(APIHostName, UpdateAPIPath, MLObject).then(apiResult => {
                            if (!apiResult.IsError) {
                                this.callSearchData(this.state.SearchData);
                                this.props.callClearLocalCache(ERPCOMMONCACHE_PARTNERUSER);
                                this.props.hideModal();
                            }
                            //this.showMessage(apiResult.Message);
                            this.addNotification(apiResult.Message, apiResult.IsError);
                        });


                    }
                }
            },
            modalElementList: ModalColumnList_Edit,
            formData: _partnerUserData
        });
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
            this.props.callClearLocalCache(ERPCOMMONCACHE_PARTNERUSER);
            this.addNotification(apiResult.Message, apiResult.IsError);
            this.callSearchData(this.state.SearchData);
        });
    }

    handleSearchSubmit(formData, MLObject) {
        const postData = [
            {
                SearchKey: "@Keyword",
                SearchValue: MLObject.Keyword
            },
            {
                SearchKey: "@PartnerID",
                SearchValue: MLObject.PartnerID
            },
        ];
        this.setState({ SearchData: postData });
        this.callSearchData(postData);
        //this.gridref.current.clearData();
    }


    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then(apiResult => {
            if (apiResult && !apiResult.IsError) {
                this.setState({
                    gridDataSource: apiResult.ResultObject,
                    IsCallAPIError: apiResult.IsError,
                    IsShowForm: true
                });
            } else {
                this.showMessage(apiResult.Message);
                this.setState({ IsShowForm: false });
            }
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
                    {/* <SearchForm
                        FormName="Tìm kiếm người dùng của nhà cung cấp"
                        MLObjectDefinition={SearchMLObjectDefinition}
                        listelement={this.state.SearchElementList}
                        onSubmit={this.handleSearchSubmit}
                        ref={this.searchref}
                    /> */}
                    <SearchForm
                        FormName="Tìm kiếm người dùng của nhà cung cấp"
                        MLObjectDefinition={SearchMLObjectDefinition}
                        listelement={SearchElementList}
                        onSubmit={this.handleSearchSubmit}
                        ref={this.searchref}
                        className="multiple"

                    />
                    {/* <DataGrid
                        listColumn={DataGridColumnList}
                        dataSource={this.state.gridDataSource}
                        AddLink={AddLink}
                        IDSelectColumnName={IDSelectColumnName}
                        PKColumnName={PKColumnName}
                        onDeleteClick={this.handleDelete}
                        ref={this.gridref}
                        IsAutoPaging={true}
                        RowsPerPage={10}
                        RequirePermission={PARTNERUSER_VIEW}
                        DeletePermission={PARTNERUSER_DELETE}
                    /> */}
                    <DataGrid listColumn={DataGridColumnList}
                        dataSource={this.state.gridDataSource}
                        modalElementList={AddElementList}
                        MLObjectDefinition={MLObjectDefinition}
                        IDSelectColumnName={IDSelectColumnName}
                        PKColumnName={PKColumnName}
                        // IDSelectColumnName={"chkSelectUserName"}
                        // PKColumnName={"UserName"}
                        onDeleteClick={this.handleDelete}
                        onInsertClick={this.handleInsert}
                        onInsertClickEdit={this.handleEdit}
                        IsAutoPaging={false}
                        RowsPerPage={10}
                        IsCustomAddLink={true}
                        //headingTitle={"Người dùng của nhà cung cấp"}
                        RequirePermission={PARTNERUSER_VIEW}
                        DeletePermission={PARTNERUSER_DELETE}
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: () => {
            dispatch(hideModal());
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        callClearLocalCache: (cacheKeyID) => {
            return dispatch(callClearLocalCache(cacheKeyID));
        },
        /*callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        }*/
    };
};

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchCom);
export default Search;
