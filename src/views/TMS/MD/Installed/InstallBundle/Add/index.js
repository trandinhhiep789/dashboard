import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
// import FormContainer from "../../../../../../common/components/Form/AdvanceForm/FormContainer";
import InputGrid from "../../../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
import FormContainer from "../../../../../../common/components/FormContainer";
import FormControl from "../../../../../../common/components/FormContainer/FormControl";
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
    GridMLMcRoleDefinition,
    InputMcRoleColumnList,
    SearchMLmoldeDefinition,
    SearchElementModeList,
    SearchMcRoleAPIPath,
    DataGridColumnListMultiple
} from "../constants";
import { callFetchAPI } from "../../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../../actions/pageAction";
import { callGetCache } from "../../../../../../actions/cacheAction";
import { MCUSER_ADD } from "../../../../../../constants/functionLists";

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
            PasswordConfirm: ""
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
    handleinsertItem(lstOption)
    {
        let listMLObject = [];
        lstOption.map((row, index) => {
            let MLObject = {};
            row["pkColumnName"].map((pkItem, pkIndex) => {
                MLObject[pkItem.key] = row.pkColumnName[pkIndex].value;
            });

            listMLObject.push(MLObject);
        });
        const formData = Object.assign({}, this.state.DataSource,{["LstMcUser_Role"] :listMLObject});
        this.setState({ DataSource: formData });
    }

    handleInputUserRoleInsert()
    {    
        this.props.showModal(MODAL_TYPE_SEARCH, {
            title: "Danh sách vai trò",
            content: {
                text: <SearchModal
                    PKColumnName={"McRoleID,McRoleName"}
                    multipleCheck={true}
                    SearchMLObjectDefinition={SearchMLmoldeDefinition}
                    DataGridColumnList={DataGridColumnListMultiple}
                    GridDataSource={[]}
                    SearchAPIPath={SearchMcRoleAPIPath}
                    SearchElementList={SearchElementModeList}
                    onClickInsertItem={this.handleinsertItem.bind(this)}
                    IDSelectColumnName={"chkSelect"}
                    name={"McRoleID"}
                    value={"McRoleName"}
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

    showPassWord(name){
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

        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        MLObject.PassWord = MD5Digest(PassWord);
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
                    FormName="Thêm gói sản phẩm lắp đặt kèm theo"
                    MLObjectDefinition={MLObjectDefinition}
                    listelement={this.state.AddElementList}
                    onSubmit={this.handleSubmit}
                    BackLink={BackLink}
                    dataSource={this.state.DataSource}
                    onValueChange={this.handleOnInputChange}
                    // RequirePermission={MCUSER_ADD}
                >


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
