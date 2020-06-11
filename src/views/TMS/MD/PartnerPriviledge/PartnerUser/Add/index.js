import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import FormContainer from "../../../../../../common/components/Form/AdvanceForm/FormContainer";
import InputGrid from "../../../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
import { MessageModal } from "../../../../../../common/components/Modal";
import { showModal } from '../../../../../../actions/modal';
import { MODAL_TYPE_SEARCH } from '../../../../../../constants/actionTypes';
import SearchModal from "../../../../../../common/components/Form/AdvanceForm/FormControl/FormSearchModal"
import MD5Digest from "../../../../../../common/library/cryptography/MD5Digest.js";
import {
    APIHostName,
    AddAPIPath,
    AddElementList,
    MLObjectDefinition,
    BackLink,
    AddPagePath,
    GridMLPartnerRoleDefinition,
    InputPartnerRoleColumnList,
    SearchMLmoldeDefinition,
    SearchElementModeList,
    SearchPartnerRoleAPIPath,
    DataGridColumnListMultiple,
    IDSelectColumnName,
    InitSearchParamsModeList

} from "../constants";
import { callFetchAPI } from "../../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../../actions/pageAction";
import { callGetCache } from "../../../../../../actions/cacheAction";
import Collapsible from 'react-collapsible';

class AddCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleInputUserRoleInsert = this.handleInputUserRoleInsert.bind(this);
        this.handleOnInputChange = this.handleOnInputChange.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false,
            AddElementList: AddElementList,
            DataSource: {},
            Password: "",
            PasswordConfirm: "",
            ListPartnerUser_Role: []
        };
        this.searchref = React.createRef();
    }


    componentDidMount() {
        this.props.updatePagePath(AddPagePath);
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
    handleinsertItem(lstOption) {
        let _PartnerUserRole = [];
        if (this.state.ListPartnerUser_Role) {
            _PartnerUserRole = this.state.ListPartnerUser_Role;
        }
        lstOption.map((row, index) => {
            let match = _PartnerUserRole.filter(item => item.PartnerRoleID == row.PartnerRoleID);
            if (match.length <= 0) {
                _PartnerUserRole.push(row);
            }
        });
        this.setState({ ListPartnerUser_Role: _PartnerUserRole });
        //console.log("lstOption", lstOption);
    }

    handleInputUserRoleInsert() {

        let SearchValue = "";
        if (this.state.ListPartnerUser_Role) {
            this.state.ListPartnerUser_Role.map(function (item, index) {
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
        if (name == "txtPassWord") {
            this.setState({ PassWord: value });
        } else if (name == "txtPassWordConfirm") {
            this.setState({ PassWordConfirm: value });
        } else if (name == "chkShowPassWord") {
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

        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        MLObject.PassWord = MD5Digest(PassWord);
        MLObject.FirstName = firstName.trim();
        MLObject.LastName = lastName.trim();
        MLObject.ListPartnerUser_Role = this.state.ListPartnerUser_Role;
        
        if (MLObject.Birthday) {
            let temp = MLObject.Birthday.trim().split('/');
            let myDate = new Date(temp[1] + '/' + temp[0] + '/' + temp[2]);
            myDate.setDate(myDate.getDate() + 1);
            MLObject.Birthday = myDate;
        }

        this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);
        });
    }
    render() {
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        return (
            <FormContainer
                FormName="Thêm người dùng của nhà cung cấp"
                MLObjectDefinition={MLObjectDefinition}
                listelement={this.state.AddElementList}
                onSubmit={this.handleSubmit}
                IsAutoLayout={true}
                ref={this.searchref}
                BackLink={BackLink}
                dataSource={this.state.DataSource}
                onValueChange={this.handleOnInputChange}
            //RequirePermission={MCUSER_ADD}
            >
                
                {/* <Collapsible trigger="Danh sách vai trò của người dùng" easing="ease-in" open={true}>
                    <InputGrid
                        name="LstPartnerUser_Role"
                        controltype="GridControl"
                        IDSelectColumnName={IDSelectColumnName}
                        listColumn={InputPartnerRoleColumnList}
                        PKColumnName={"PartnerRoleID"}
                        isHideHeaderToolbar={false}
                        dataSource={this.state.ListPartnerUser_Role}
                        MLObjectDefinition={GridMLPartnerRoleDefinition}
                        colspan="12"
                        onInsertClick={this.handleInputUserRoleInsert}
                    />
                </Collapsible> */}
            </FormContainer>
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
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        }
    };
};

const Add = connect(mapStateToProps, mapDispatchToProps)(AddCom);
export default Add;
