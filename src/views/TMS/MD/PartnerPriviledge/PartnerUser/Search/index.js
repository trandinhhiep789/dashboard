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
    Modal_MLObjectDefinition,
    AddAPIPath,
    CreateUserNameAPIPath,
    ModalColumnList_Insert,
    ModalColumnList_Edit,
    UpdateAPIPath
} from "../constants";
import { callFetchAPI } from "../../../../../../actions/fetchAPIAction";
import { callGetCache, callClearLocalCache, callGetUserCache } from "../../../../../../actions/cacheAction";
import { updatePagePath } from "../../../../../../actions/pageAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { PARTNERUSER_VIEW, PARTNERUSER_DELETE, PARTNERUSER_ADD, GET_CACHE_USER_FUNCTION_LIST, PARTNERUSER_UPDATE } from "../../../../../../constants/functionLists";
import { ERPCOMMONCACHE_PARTNERUSER, ERPCOMMONCACHE_TMSCONFIG } from "../../../../../../constants/keyCache";
import MD5Digest from "../../../../../../common/library/cryptography/MD5Digest";
import { toIsoStringCus } from "../../../../../../utils/function";
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
        this.handleModalChangeEdit = this.handleModalChangeEdit.bind(this);
        this.CreateUserName = this.CreateUserName.bind(this);
        this.onClose = this.onClose.bind(this);
        this.checkPermission = this.checkPermission.bind(this);
        this.initCache = this.initCache.bind(this);
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
        this.checkPermission();
        this.initCache();
    }

    CreateUserName() {
        // if (!this.state.UserID) {

        // }

        // this.props.callFetchAPI(APIHostName, CreateUserNameAPIPath, "abc").then(apiResult => {
        //     this.setState({ IsCallAPIError: apiResult.IsError });
        //     if (!apiResult.IsError) {
        //         this.setState({ UserID: apiResult.ResultObject })
        //         document.getElementsByName("txtUserName")[0].value = apiResult.ResultObject;
        //     } else {
        //         this.showMessage("Lỗi tạo tên đăng nhập.");
        //     }
        //     //console.log("username", apiResult);
        // });

    }

    onClose() {
        this.setState({
            PassWord: "",
            PassWordConfirm: ""

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
        }

        if (elementName == "txtPartnerRoleID") {
            let role = formData.txtPartnerRoleID && Array.isArray(formData.txtPartnerRoleID) ? formData.txtPartnerRoleID[0] : -1;
            let limitValue = 0;
            if (role == 1) { //quản lý
                limitValue = this.state.ADVANCELIMIT_LEADERPARTNER;
            } else if (role == 2) { // nhân viên
                limitValue = this.state.ADVANCELIMIT_STAFFPARTNER;
            }

            this.setLimit("txtLimit", limitValue);
        }

        //console.log("dsadsda", formData);


    }

    handleModalChangeEdit(formData, formValidation, elementName, elementValue) {
        if (elementName == "PassWord") {
            this.setState({ PassWord: elementValue });
        } else if (elementName == "PassWordConfirm") {
            this.setState({ PassWordConfirm: elementValue });
        } else if (elementName == "ShowPassWord") {
            this.showPassWord("PassWord");
            this.showPassWord("PassWordConfirm");
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

    setLimit(name, elementValue) {
        var x = document.getElementsByName(name)[0];
        x.value = Number(elementValue).toLocaleString();
    }

    checkPermission() {
        let IsAllowedAdd = false;
        let IsAllowedDelete = false;
        let IsAllowedUpdate = false;
        this.props.callGetUserCache(GET_CACHE_USER_FUNCTION_LIST).then((result) => {
            if (!result.IsError && result.ResultObject.CacheData != null) {
                let _isAllowedAdd = result.ResultObject.CacheData.filter(x => x.FunctionID == PARTNERUSER_ADD);
                if (_isAllowedAdd && _isAllowedAdd.length > 0) {
                    IsAllowedAdd = true;
                }

                let _isAllowedUpdate = result.ResultObject.CacheData.filter(x => x.FunctionID == PARTNERUSER_UPDATE);
                if (_isAllowedUpdate && _isAllowedUpdate.length > 0) {
                    IsAllowedUpdate = true;
                }

                let _isAlloweDelete = result.ResultObject.CacheData.filter(x => x.FunctionID == PARTNERUSER_DELETE);
                if (_isAlloweDelete && _isAlloweDelete.length > 0) {
                    IsAllowedDelete = true;
                }

                this.setState({
                    IsAllowedAdd,
                    //IsAllowedUpdate,
                    IsAllowedDelete
                });
            }
        });
    }

    initCache() {
        this.props.callGetCache(ERPCOMMONCACHE_TMSCONFIG).then((result) => {
            if (result && !result.IsError && result.ResultObject) {
                let _ADVANCELIMIT_LEADERPARTNER = result.ResultObject.CacheData.filter(x => x.TMSConfigID == "ADVANCELIMIT_LEADERPARTNER");
                let _ADVANCELIMIT_STAFFPARTNER = result.ResultObject.CacheData.filter(x => x.TMSConfigID == "ADVANCELIMIT_STAFFPARTNER");
                this.setState({
                    ADVANCELIMIT_LEADERPARTNER: _ADVANCELIMIT_LEADERPARTNER ? _ADVANCELIMIT_LEADERPARTNER[0].TMSConfigValue : 0,
                    ADVANCELIMIT_STAFFPARTNER: _ADVANCELIMIT_STAFFPARTNER ? _ADVANCELIMIT_STAFFPARTNER[0].TMSConfigValue : 0,
                })
            }

        });
    }

    convertFormatDateTime(obj) {
        var date = new Date(obj);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();

        var time = day + "/" + month + "/" + year + " " + hour + ':' + minute + ':' + second;
        return time;
    }

    handleInsert(MLObjectDefinition, modalElementList, dataSource) {
        if (!this.state.IsAllowedAdd) {
            this.showMessage("Bạn không có quyền");
            return;
        }
        this.setState({ IsInsert: true });
        this.CreateUserName();



        this.props.showModal(MODAL_TYPE_CONFIRMATION, {
            title: 'Thêm mới người dùng của nhà cung cấp',
            autoCloseModal: false,
            onValueChange: this.handleModalChange,
            onClose: this.onClose,
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

                        // if (!this.state.UserID) {
                        //     this.setState({ IsCallAPIError: true });
                        //     this.showMessage("Chưa có tên đăng nhập. Vui lòng bấm nút tạo tên đăng nhập.");
                        //     return false;
                        // }

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
                        MLObject.RawPass = PassWord;
                        MLObject.PassWord = MD5Digest(PassWord);
                        MLObject.FirstName = firstName.trim();
                        MLObject.LastName = lastName.trim();
                        MLObject.UserName = this.state.UserID;
                        MLObject.PartnerID = MLObject.PartnerID && Array.isArray(MLObject.PartnerID) ? MLObject.PartnerID[0] : MLObject.PartnerID;
                        MLObject.PartnerRoleID = MLObject.PartnerRoleID && Array.isArray(MLObject.PartnerRoleID) ? MLObject.PartnerRoleID[0] : MLObject.PartnerRoleID;

                        // if (MLObject.Birthday) {
                        //     let temp = MLObject.Birthday.trim().split('/');
                        //     let myDate = new Date(temp[1] + '/' + temp[0] + '/' + temp[2]);
                        //     myDate.setDate(myDate.getDate() + 1);
                        //     MLObject.Birthday = myDate;
                        // }

                        MLObject.Birthday = toIsoStringCus(new Date(MLObject.Birthday).toISOString());

                        if (MLObject.PartnerRoleID == 1) {// quản lý
                            MLObject.LimitValue = this.state.ADVANCELIMIT_LEADERPARTNER;
                        } else if (MLObject.PartnerRoleID == 2) {// nhân viên
                            MLObject.LimitValue = this.state.ADVANCELIMIT_STAFFPARTNER;
                        }else{
                            MLObject.LimitValue = 0;
                        }

                        this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then(apiResult => {
                            if (!apiResult.IsError) {
                                this.callSearchData(this.state.SearchData);
                                this.props.callClearLocalCache(ERPCOMMONCACHE_PARTNERUSER);
                                this.props.hideModal();
                                this.showMessage(apiResult.Message);
                            } else {
                                this.addNotification(apiResult.Message, apiResult.IsError);
                            }
                            //this.showMessage(apiResult.Message);
                            //this.addNotification(apiResult.Message, apiResult.IsError);
                        });

                        //console.log("MLObject", MLObject);
                    }
                }
            },
            modalElementList: modalElementList,
        });
    }


    handleEdit(value, pkColumnName) {
        if (!this.state.IsAllowedUpdate) {
            this.showMessage("Bạn không có quyền");
            return;
        }
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

        this.setState({
            PassWord: _partnerUserData.PassWord,
            PassWordConfirm: _partnerUserData.PassWord
        })

        //console.log("_partnerUserData", _partnerUserData, this.state.gridDataSource)
        _partnerUserData.Birthday = _partnerUserData.BirthdayString;
        _partnerUserData.PassWord = "";


        this.props.showModal(MODAL_TYPE_CONFIRMATION, {
            title: 'Chỉnh sửa người dùng của nhà cung cấp',
            autoCloseModal: false,
            onValueChange: this.handleModalChangeEdit,
            onClose: this.onClose,
            onConfirm: (isConfirmed, formData) => {
                if (isConfirmed) {
                    let MLObject = GetMLObjectData(MLObjectDefinition, formData, _partnerUserData);
                    if (MLObject) {
                        MLObject.UserName = this.props.match.params.id;
                        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
                        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;

                        //check password valid
                        let { PassWord, PassWordConfirm } = this.state;
                        if (PassWord != PassWordConfirm) {
                            this.setState({ IsCallAPIError: true });
                            this.showMessage("Xác nhận mật khẩu chưa đúng.");
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

                        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
                        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
                        MLObject.FirstName = firstName.trim();
                        MLObject.LastName = lastName.trim();
                        //MLObject.ListPartnerUser_Role = this.state.DataSource.ListPartnerUser_Role;
                        MLObject.PartnerID = MLObject.PartnerID && Array.isArray(MLObject.PartnerID) ? MLObject.PartnerID[0] : MLObject.PartnerID;

                        if (MLObject.Birthday) {
                            let temp = MLObject.Birthday.trim().split('/');
                            let myDate = new Date(temp[1] + '/' + temp[0] + '/' + temp[2]);
                            myDate.setDate(myDate.getDate() + 1);
                            MLObject.Birthday = myDate;
                        }

                        if (!MLObject.PassWord) {
                            MLObject.PassWord = this.state.PassWord;
                        } else {
                            MLObject.PassWord = MD5Digest(PassWord);
                        }



                        // this.props.callFetchAPI(APIHostName, UpdateAPIPath, MLObject).then(apiResult => {
                        //     if (!apiResult.IsError) {
                        //         this.callSearchData(this.state.SearchData);
                        //         this.props.callClearLocalCache(ERPCOMMONCACHE_PARTNERUSER);
                        //         this.props.hideModal();
                        //     }
                        //     //this.showMessage(apiResult.Message);
                        //     this.addNotification(apiResult.Message, apiResult.IsError);
                        // });

                        //console.log("dsad1111111", MLObject);


                    }
                }
            },
            modalElementList: ModalColumnList_Edit,
            formData: _partnerUserData
        });
    }



    handleDelete(deleteList, pkColumnName) {
        if (!this.state.IsAllowedDelete) {
            this.showMessage("Bạn không có quyền");
            return;
        }
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
                        IsAutoPaging={true}
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
        callGetUserCache: (cacheKeyID) => {
            return dispatch(callGetUserCache(cacheKeyID));
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        }
    };
};

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchCom);
export default Search;
