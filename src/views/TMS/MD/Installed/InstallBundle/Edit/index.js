import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { ModalManager } from "react-dynamic-modal";
import FormContainer from "../../../../../../common/components/FormContainer";
import InputGrid from "../../../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
import { MessageModal } from "../../../../../../common/components/Modal";
import { showModal } from '../../../../../../actions/modal';
import { MODAL_TYPE_SEARCH } from '../../../../../../constants/actionTypes';
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
import { MCUSER_EDIT } from "../../../../../../constants/functionLists";

class EditCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleInputUserRoleInsert = this.handleInputUserRoleInsert.bind(this);
        this.handleOnInputChange = this.handleOnInputChange.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            FormContent: "",
            IsLoadDataComplete: false,
            IsCloseForm: false,
            EditElementList: EditElementList,
            Password: "",
            PasswordConfirm: ""

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

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then(apiResult => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            } else {
                apiResult.ResultObject.Birthday = apiResult.ResultObject.BirthdayString;
                this.setState({ DataSource: apiResult.ResultObject, PassWord: apiResult.ResultObject.PassWord, PassWordConfirm: apiResult.ResultObject.PassWord });
                // apiResult.ResultObject.PassWord = null;
                // apiResult.ResultObject.PassWordConfirm = null;
            }
            this.setState({
                IsLoadDataComplete: true
            });
        });
        this.props.updatePagePath(EditPagePath);
    }
    handleinsertItem(lstOption) {
        let listMLObject = [];
        lstOption.map((row, index) => {
            let MLObject = {};
            row["pkColumnName"].map((pkItem, pkIndex) => {
                MLObject[pkItem.key] = row.pkColumnName[pkIndex].value;
            });

            listMLObject.push(MLObject);
        });
        const formData = Object.assign({}, this.state.DataSource, { ["LstMcUser_Role"]: listMLObject });
        this.setState({ DataSource: formData });
    }

    handleInputUserRoleInsert() {
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
        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;

        var myDate = new Date(MLObject.Birthday);
        myDate.setDate(myDate.getDate() + 1);
        MLObject.Birthday = myDate;
        if (!MLObject.PassWord) {
            MLObject.PassWord = this.state.PassWord;
        } else {
            MLObject.PassWord = MD5Digest(PassWord);
        }

        this.props.callFetchAPI(APIHostName, UpdateAPIPath, MLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);
        });
    }
    render() {
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        if (this.state.IsLoadDataComplete) {
            return (
                <FormContainer
                    FormName="Cập nhật gói sản phẩm lắp đặt kèm theo"
                    MLObjectDefinition={MLObjectDefinition}
                    listelement={this.state.EditElementList}
                    onSubmit={this.handleSubmit}
                    BackLink={BackLink}
                    dataSource={this.state.DataSource}
                    onValueChange={this.handleOnInputChange}
                >
                    <InputGrid
                        name="LstMcUser_Role"
                        controltype="InputControl"
                        IDSelectColumnName={"checkboxAll"}
                        listColumn={InputMcRoleColumnList}
                        isHideHeaderToolbar={false}
                        dataSource={this.state.DataSource.LstMcUser_Role}
                        MLObjectDefinition={GridMLMcRoleDefinition}
                        colspan="12"
                        onInsertClick={this.handleInputUserRoleInsert}
                    />
                </FormContainer>
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
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        }
    };
};

const Edit = connect(mapStateToProps, mapDispatchToProps)(EditCom);
export default Edit;
