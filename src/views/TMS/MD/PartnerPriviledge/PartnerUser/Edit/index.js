import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { ModalManager } from "react-dynamic-modal";
import FormContainer from "../../../../../../common/components/Form/AdvanceForm/FormContainer";
import InputGrid from "../../../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
import { MessageModal } from "../../../../../../common/components/Modal";
import { MODAL_TYPE_SEARCH, MODAL_TYPE_CONFIRMATION } from '../../../../../../constants/actionTypes';
import { showModal, hideModal } from '../../../../../../actions/modal';
import SearchModal from "../../../../../../common/components/Form/AdvanceForm/FormControl/FormSearchModal"
import MD5Digest from "../../../../../../common/library/cryptography/MD5Digest.js";
import {
    APIHostName,
    LoadAPIPath,
    UpdateAPIPath,
    EditElementList,
    MLObjectDefinition,
    BackLink,
    EditPagePath,
    GridMLPartnerRoleDefinition,
    InputPartnerRoleColumnList,
    SearchMLmoldeDefinition,
    SearchElementModeList,
    SearchPartnerRoleAPIPath,
    DataGridColumnListMultiple,
    IDSelectColumnName,
    Modal_PartnerUserIDDocument_Add, Modal_PartnerUserIDDocument_Edit, PartnerUserIDDocument_DataGrid_ColumnList, MLObject_PartnerUserIDDocument,
    AddAPIPath_PartnerUserIDDocument, UpdateAPIPath_PartnerUserIDDocument, DeleteAPIPath_PartnerUserIDDocument
} from "../constants";
import DataGrid from "../../../../../../common/components/DataGrid";
import { GetMLObjectData } from "../../../../../../common/library/form/FormLib";
import { callFetchAPI } from "../../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../../actions/pageAction";
import { callGetCache, callClearLocalCache } from "../../../../../../actions/cacheAction";
import Collapsible from 'react-collapsible';
import { Prompt } from 'react-router';
import { PARTNERUSER_UPDATE } from "../../../../../../constants/functionLists";
import { ERPCOMMONCACHE_PARTNERUSER, ERPCOMMONCACHE_TMSCONFIG } from "../../../../../../constants/keyCache";
import { toIsoStringCus } from "../../../../../../utils/function";

class EditCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleInputUserRoleInsert = this.handleInputUserRoleInsert.bind(this);
        this.callLoadData = this.callLoadData.bind(this);
        this.initCache = this.initCache.bind(this);
        //this.initLimit = this.initLimit.bind(this);
        this.handleOnInputChange = this.handleOnInputChange.bind(this);
        this.handleInputUserRoleDelete = this.handleInputUserRoleDelete.bind(this);
        this.handleSelectedFile = this.handleSelectedFile.bind(this);
        this.addPartnerUser_IDDocumentPopup = this.addPartnerUser_IDDocumentPopup.bind(this);
        this.editPartnerUser_IDDocumentPopup = this.editPartnerUser_IDDocumentPopup.bind(this);
        this.delete_PartnerUser_IDDocumentPopup = this.delete_PartnerUser_IDDocumentPopup.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            FormContent: "",
            IsLoadDataComplete: false,
            IsCloseForm: false,
            Password: "",
            PasswordConfirm: "",
            Files: [],
            IsNotSaved: false
        };
        this.searchref = React.createRef();
    }

    handleCloseMessage() {
        if (!this.state.IsCallAPIError) this.setState({ IsCloseForm: true });
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

    showMessage2(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
            />
        );
    }

    //file upload
    handleSelectedFile(file, nameValue, isDeletetedFile) {
        const filelist = { [nameValue]: file, "KeyName": nameValue, IsDeletetedFile: isDeletetedFile };
        let files = this.state.Files;
        let result = [];
        if (files && files.length > 0) {
            result = files.map(function (item, index) {
                if (Object.keys(item)[0] != nameValue) {
                    return item;
                }
            });
        }
        result = result.filter(x => x != undefined);
        result.push(filelist);

        this.setState({ Files: result });
    }

    componentDidMount() {
        this.callLoadData();
        this.props.updatePagePath(EditPagePath);
        this.initCache();
        // setTimeout(() => {
        //     this.initLimit();
        // }, 1000);

    }

    setLimit(name, elementValue) {
        var x = document.getElementsByName(name)[0];
        x.value = Number(elementValue).toLocaleString();
    }

    initCache() {
        this.props.callGetCache(ERPCOMMONCACHE_TMSCONFIG).then((result) => {
            if (result && !result.IsError && result.ResultObject) {
                let _ADVANCELIMIT_LEADERPARTNER = result.ResultObject.CacheData.filter(x => x.TMSConfigID == "ADVANCELIMIT_LEADERPARTNER");
                this.setState({
                    ADVANCELIMIT_LEADERPARTNER: _ADVANCELIMIT_LEADERPARTNER ? _ADVANCELIMIT_LEADERPARTNER[0].TMSConfigValue : 0
                })
            }

        });
    }

    // initLimit() {
    //     let role = this.state.PartnerRoleID;
    //     let limitValue = 0;
    //     if (role == 1) { //quản lý
    //         limitValue = this.state.ADVANCELIMIT_LEADERPARTNER;
    //     }
    //     this.setLimit("txtLimit", limitValue);

    // }



    callLoadData(key) {
        const id = this.props.match.params.id;
        this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then(apiResult => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            } else {
                //apiResult.ResultObject.Birthday = apiResult.ResultObject.BirthdayString;
                apiResult.ResultObject.PartnerRoleID = apiResult.ResultObject.ListPartnerUser_Role ? apiResult.ResultObject.ListPartnerUser_Role[0].PartnerRoleID : -1;
                if (key === undefined) {

                    //khởi tạo kho điều phối
                    let selectedOptionStore = [];
                    if (apiResult.ResultObject.ListUser_CoordinatorStore) {
                        apiResult.ResultObject.ListUser_CoordinatorStore.map(row => {
                            selectedOptionStore.push({ value: row.StoreID, label: row.StoreName, name: row.StoreName });
                        })
                    }

                    const _editElement = EditElementList;
                    _editElement.forEach(function (objElement) {
                        if (objElement.name == 'txtCoordinatorStoreID') {
                            objElement.SelectedOption = selectedOptionStore;
                        }
                    });



                    this.setState({
                        DataSource: apiResult.ResultObject,
                        PassWord: apiResult.ResultObject.PassWord,
                        PassWordConfirm: apiResult.ResultObject.PassWord,
                        ListPartnerUser_IDDocument: apiResult.ResultObject.ListPartnerUser_IDDocument,
                        Birthday: apiResult.ResultObject.Birthday,
                        PartnerRoleID: apiResult.ResultObject.ListPartnerUser_Role ? apiResult.ResultObject.ListPartnerUser_Role[0].PartnerRoleID : -1,
                        EditElementList: _editElement
                    });
                } else {
                    this.setState({ ListPartnerUser_IDDocument: apiResult.ResultObject.ListPartnerUser_IDDocument });
                }
                // apiResult.ResultObject.PassWord = null;
                // apiResult.ResultObject.PassWordConfirm = null;
            }
            this.setState({
                IsLoadDataComplete: true
            });
        });
    }

    //************************************** giấy tờ tùy thân người dùng ***********************************/
    addPartnerUser_IDDocumentPopup(MLObjectDefinition, modalElementList, dataSource) {
        this.props.showModal(MODAL_TYPE_CONFIRMATION, {
            title: 'Thêm mới giấy tờ tùy thân của người dùng',
            autoCloseModal: false,
            onHandleSelectedFile: this.handleSelectedFile,
            onConfirm: (isConfirmed, formData) => {
                if (isConfirmed) {
                    let MLObject = GetMLObjectData(MLObjectDefinition, formData, dataSource);
                    if (MLObject) {
                        MLObject.UserName = this.props.match.params.id;
                        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;

                        var data = new FormData();
                        if (this.state.Files.length > 0) {
                            this.state.Files.map((item, index) => {
                                if (item.KeyName == "FrontIDDocumentImageURL") {
                                    MLObject.FrontIDDocumentImageURL = item.FrontIDDocumentImageURL ? item.FrontIDDocumentImageURL.name : "";
                                    data.append("FrontIDDocumentImageURL", item.FrontIDDocumentImageURL);
                                }
                                if (item.KeyName == "BackSideIDDocumentImageURL") {
                                    MLObject.BackSideIDDocumentImageURL = item.BackSideIDDocumentImageURL ? item.BackSideIDDocumentImageURL.name : "";
                                    data.append("BackSideIDDocumentImageURL", item.BackSideIDDocumentImageURL);
                                }
                            });
                        }

                        data.append("PartnerUserIDDocumentObj", JSON.stringify(MLObject));

                        this.props.callFetchAPI(APIHostName, AddAPIPath_PartnerUserIDDocument, data).then((apiResult) => {
                            if (!apiResult.IsError) {
                                this.callLoadData(1);
                                this.props.hideModal();
                                this.setState({ Files: [] });
                            }
                            this.showMessage2(apiResult.Message);
                            this.setState({ IsCallAPIError: apiResult.IsError });
                        });

                        // let partnerUser_IDDocument = [];
                        // let match = [];
                        // let formData = {};
                        // let filesData = this.state.FilesData;
                        // if (this.state.DataSource.ListPartnerUser_IDDocument) {
                        //     partnerUser_IDDocument = this.state.DataSource.ListPartnerUser_IDDocument;
                        // }          
                        // match = partnerUser_IDDocument.filter(item => item.IDDocumentNumber == MLObject.IDDocumentNumber);
                        // if (match && match.length > 0) {
                        //     this.showMessage2("Giấy tờ tùy thân này đã tồn tại.");
                        // } else { 
                        //     this.state.Files.map(function (item, index) {
                        //         // if (Object.keys(item)[0] == "FrontIDDocumentImageURL") {
                        //         //     MLObject.FrontIDDocumentImageUR = item.FrontIDDocumentImageURL;
                        //         // }
                        //         // if (Object.keys(item)[0] == "BackSideidDocumentImageURL") {
                        //         //     MLObject.BackSideidDocumentImageURL = item.BackSideidDocumentImageURL;
                        //         // }
                        //         item.IDDocumentNumber = MLObject.IDDocumentNumber
                        //         filesData.push(item);
                        //     });
                        //     partnerUser_IDDocument.push(MLObject);
                        //     formData = Object.assign({}, this.state.DataSource, { ["ListPartnerUser_IDDocument"]: partnerUser_IDDocument });
                        //     this.setState({ DataSource: formData, FilesData: filesData });
                        //     this.props.hideModal();
                        // }
                        //this.setState({ Files: [] });
                        // console.log("MLObject", MLObject);
                        // console.log("filesData", this.state.Files);
                    }
                }
            },
            modalElementList: modalElementList,
        });
    }

    editPartnerUser_IDDocumentPopup(value, pkColumnName) {
        let partnerUser_IDDocument = {};
        this.state.ListPartnerUser_IDDocument.map((item, index) => {
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
                partnerUser_IDDocument = item;
            }
        });

        this.props.showModal(MODAL_TYPE_CONFIRMATION, {
            title: 'Chỉnh sửa giấy tờ tùy thân của người dùng',
            autoCloseModal: false,
            onHandleSelectedFile: this.handleSelectedFile,
            onConfirm: (isConfirmed, formData) => {
                if (isConfirmed) {
                    let MLObject = GetMLObjectData(MLObject_PartnerUserIDDocument, formData, partnerUser_IDDocument);
                    if (MLObject) {
                        MLObject.UserName = this.props.match.params.id;
                        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;

                        var data = new FormData();
                        if (this.state.Files.length > 0) {
                            this.state.Files.map((item, index) => {
                                if (item.KeyName == "FrontIDDocumentImageURL") {
                                    MLObject.FrontIDDocumentImageURL = item.FrontIDDocumentImageURL ? item.FrontIDDocumentImageURL.name : "";
                                    data.append("FrontIDDocumentImageURL", item.FrontIDDocumentImageURL);
                                }
                                if (item.KeyName == "BackSideIDDocumentImageURL") {
                                    MLObject.BackSideIDDocumentImageURL = item.BackSideIDDocumentImageURL ? item.BackSideIDDocumentImageURL.name : "";
                                    data.append("BackSideIDDocumentImageURL", item.BackSideIDDocumentImageURL);
                                }
                            });
                        }

                        data.append("PartnerUserIDDocumentObj", JSON.stringify(MLObject));
                        this.props.callFetchAPI(APIHostName, UpdateAPIPath_PartnerUserIDDocument, data).then((apiResult) => {
                            if (!apiResult.IsError) {
                                this.callLoadData(1);
                                this.props.hideModal();
                                this.setState({ Files: [] });
                            }
                            this.showMessage2(apiResult.Message);
                            this.setState({ IsCallAPIError: apiResult.IsError });
                        });
                        // console.log("MLObject", MLObject);
                        // console.log("filesData", this.state.Files);
                    }
                }
            },
            modalElementList: Modal_PartnerUserIDDocument_Edit,
            formData: partnerUser_IDDocument
        });
    }

    delete_PartnerUser_IDDocumentPopup(deleteList, pkColumnName) {
        let listMLObject = [];
        deleteList.map((row, index) => {
            let MLObject = {};
            pkColumnName.map((pkItem, pkIndex) => {
                MLObject[pkItem.key] = row.pkColumnName[pkIndex].value;
            });
            MLObject.DeletedUser = this.props.AppInfo.LoginInfo.Username;
            listMLObject.push(MLObject);
        });
        this.props.callFetchAPI(APIHostName, DeleteAPIPath_PartnerUserIDDocument, listMLObject).then((apiResult) => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            if (!apiResult.IsError) {
                this.callLoadData(1);
            }
            this.showMessage2(apiResult.Message);
        });
    }

    //***********************************************************************************************/

    handleinsertItem(lstOption) {
        let _PartnerUserRole = [];
        if (this.state.DataSource.ListPartnerUser_Role) {
            _PartnerUserRole = this.state.DataSource.ListPartnerUser_Role;
        }
        lstOption.map((row, index) => {
            let match = _PartnerUserRole.filter(item => item.PartnerRoleID == row.PartnerRoleID);
            if (match.length <= 0) {
                _PartnerUserRole.push(row);
            }
        });

        const formData = Object.assign({}, this.state.DataSource, { ["ListPartnerUser_Role"]: _PartnerUserRole });
        this.setState({ DataSource: formData, IsNotSaved: true });
    }

    handleInputUserRoleDelete(listDeleteID) {
        this.setState({ IsNotSaved: true });
    }

    handleInputUserRoleInsert() {
        let SearchValue = "";
        if (this.state.DataSource.ListPartnerUser_Role) {
            this.state.DataSource.ListPartnerUser_Role.map(function (item, index) {
                SearchValue = SearchValue + item.PartnerRoleID + ",";
            });
            SearchValue = SearchValue.substring(0, SearchValue.length - 1);
        }

        let SearchParamsModeList = [
            {
                SearchKey: "@Keyword",
                SearchValue: ""
            },
            {
                SearchKey: "@PartnerRoleListID",
                SearchValue: SearchValue
            }
        ];



        this.props.showModal(MODAL_TYPE_SEARCH, {
            title: "Danh sách vai trò người dùng",
            content: {
                text: <SearchModal
                    PKColumnName={"PartnerRoleID,PartnerRoleName"}
                    multipleCheck={true}
                    SearchMLObjectDefinition={SearchMLmoldeDefinition}
                    DataGridColumnList={DataGridColumnListMultiple}
                    GridDataSource={[]}
                    SearchAPIPath={SearchPartnerRoleAPIPath}
                    SearchElementList={SearchElementModeList}
                    InitSearchParams={SearchParamsModeList}
                    onClickInsertItem={this.handleinsertItem.bind(this)}
                    IDSelectColumnName={"chkSelect"}
                    name={"PartnerRoleName"}
                    value={"PartnerRoleID"}
                >
                </SearchModal>
            }
        });
    }

    handleOnInputChange(name, value) {
        this.setState({ IsNotSaved: true });
        if (name == "txtPassWord") {
            this.setState({ PassWord: value });
        } else if (name == "txtPassWordConfirm") {
            this.setState({ PassWordConfirm: value });
        } else if (name == "chkShowPassWord") {
            this.showPassWord("txtPassWord");
            this.showPassWord("txtPassWordConfirm");
            return;
        }


        // if (name == "txtPartnerRoleID") {
        //     let role = value[0];
        //     let limitValue = 0;
        //     if (role == 1) { //quản lý
        //         limitValue = this.state.ADVANCELIMIT_LEADERPARTNER;
        //     } else if (role == 2) { // nhân viên
        //         limitValue = this.state.ADVANCELIMIT_STAFFPARTNER;
        //     }
        //     this.setLimit("txtLimit", limitValue);
        //     this.setState({
        //         PartnerRoleID: role
        //     });
        // }

        //console.log("formdata", formdata);

    }

    showPassWord(name) {
        var x = document.getElementsByName(name)[0];
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }



    handleSubmit(formData, MLObject) {
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
        MLObject.ListPartnerUser_Role = this.state.DataSource.ListPartnerUser_Role;
        MLObject.PartnerID = MLObject.PartnerID && Array.isArray(MLObject.PartnerID) ? MLObject.PartnerID[0] : MLObject.PartnerID;
        MLObject.PartnerRoleID = MLObject.PartnerRoleID && Array.isArray(MLObject.PartnerRoleID) ? MLObject.PartnerRoleID[0] : this.state.PartnerRoleID;
        // if (MLObject.Birthday) {
        //     let temp = MLObject.Birthday.trim().split('/');
        //     let myDate = new Date(temp[1] + '/' + temp[0] + '/' + temp[2]);
        //     myDate.setDate(myDate.getDate() + 1);
        //     MLObject.Birthday = myDate;
        // }

        try {
            MLObject.Birthday = toIsoStringCus(new Date(MLObject.Birthday).toISOString());
        } catch (error) {
            MLObject.Birthday = toIsoStringCus(new Date(this.state.Birthday).toISOString());
        }

        if (!MLObject.PassWord) {
            MLObject.PassWord = this.state.PassWord;
        } else {
            MLObject.RawPass = PassWord;
            MLObject.PassWord = MD5Digest(PassWord);
        }

        if (MLObject.PartnerRoleID == 1) {// quản lý
            MLObject.LimitValue = this.state.ADVANCELIMIT_LEADERPARTNER;
        } else {
            MLObject.LimitValue = 0;
        }

        //console.log("MLObject", MLObject);


        this.props.callFetchAPI(APIHostName, UpdateAPIPath, MLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.props.callClearLocalCache(ERPCOMMONCACHE_PARTNERUSER);
            this.showMessage(apiResult.Message);
        });
    }
    render() {
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        if (this.state.IsLoadDataComplete) {
            return (
                <React.Fragment>
                    <Prompt
                        when={this.state.IsNotSaved}
                        message='Có dữ liệu chưa được lưu. Bạn có muốn rời trang?'
                    />
                    <FormContainer
                        FormName="Cập nhật người dùng của nhà cung cấp"
                        MLObjectDefinition={MLObjectDefinition}
                        listelement={this.state.EditElementList}
                        onSubmit={this.handleSubmit}
                        IsAutoLayout={true}
                        ref={this.searchref}
                        BackLink={BackLink}
                        dataSource={this.state.DataSource}
                        onValueChange={this.handleOnInputChange}
                        RequirePermission={PARTNERUSER_UPDATE}
                    >
                        <br />
                        {/* <Collapsible trigger="Vai trò của người dùng" easing="ease-in" open={true}>
                            
                        </Collapsible> */}
                        {/* <div>
                            <InputGrid
                                name="LstPartnerUser_Role"
                                controltype="GridControl"
                                IDSelectColumnName={IDSelectColumnName}
                                listColumn={InputPartnerRoleColumnList}
                                PKColumnName={"PartnerRoleID"}
                                isHideHeaderToolbar={false}
                                dataSource={this.state.DataSource.ListPartnerUser_Role}
                                MLObjectDefinition={GridMLPartnerRoleDefinition}
                                colspan="12"
                                onInsertClick={this.handleInputUserRoleInsert}
                                onDeleteClick={this.handleInputUserRoleDelete}
                                headingTitle={"Vai trò của người dùng"}
                            />
                        </div>
                        <br /> */}
                        {/* <Collapsible trigger="Giấy tờ tùy thân của người dùng" easing="ease-in" open={true}>
                            
                        </Collapsible> */}
                        <div className="sub-grid">
                            <DataGrid listColumn={PartnerUserIDDocument_DataGrid_ColumnList}
                                dataSource={this.state.ListPartnerUser_IDDocument}
                                modalElementList={Modal_PartnerUserIDDocument_Add}
                                MLObjectDefinition={MLObject_PartnerUserIDDocument}
                                IDSelectColumnName={"chkSelectIDDocumentID"}
                                PKColumnName={"IDDocumentID"}
                                onDeleteClick={this.delete_PartnerUser_IDDocumentPopup}
                                onInsertClick={this.addPartnerUser_IDDocumentPopup}
                                onInsertClickEdit={this.editPartnerUser_IDDocumentPopup}
                                IsAutoPaging={false}
                                RowsPerPage={10}
                                IsCustomAddLink={true}
                                headingTitle={"Giấy tờ tùy thân của người dùng"}
                            />
                        </div>
                    </FormContainer>
                </React.Fragment>
            );
        }
        return <label>Đang nạp dữ liệu...</label>;
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: () => {
            dispatch(hideModal());
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
        callClearLocalCache: (cacheKeyID) => {
            return dispatch(callClearLocalCache(cacheKeyID));
        }
    };
};

const Edit = connect(mapStateToProps, mapDispatchToProps)(EditCom);
export default Edit;
