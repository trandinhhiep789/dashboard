import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
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
    InitSearchParamsModeList
} from "../constants";

import { callFetchAPI } from "../../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../../actions/pageAction";
import { callGetCache } from "../../../../../../actions/cacheAction";
import Collapsible from 'react-collapsible';

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
        this.setState({ DataSource: formData });
        // let listMLObject = [];
        // lstOption.map((row, index) => {
        //     let MLObject = {};
        //     row["pkColumnName"].map((pkItem, pkIndex) => {
        //         MLObject[pkItem.key] = row.pkColumnName[pkIndex].value;
        //     });

        //     listMLObject.push(MLObject);
        // });
        // const formData = Object.assign({}, this.state.DataSource, { ["LstMcUser_Role"]: listMLObject });
        // this.setState({ DataSource: formData });
    }

    handleInputUserRoleInsert() {
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
                    InitSearchParams={InitSearchParamsModeList}
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

        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        MLObject.FirstName = firstName.trim();
        MLObject.LastName = lastName.trim();
        MLObject.ListPartnerUser_Role = this.state.DataSource.ListPartnerUser_Role;

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
                    FormName="Cập nhật người dùng của nhà cung cấp"
                    MLObjectDefinition={MLObjectDefinition}
                    listelement={this.state.EditElementList}
                    onSubmit={this.handleSubmit}
                    IsAutoLayout={true}
                    ref={this.searchref}
                    BackLink={BackLink}
                    dataSource={this.state.DataSource}
                    onValueChange={this.handleOnInputChange}
                //RequirePermission={MCUSER_EDIT}
                >
                    <br />
                    <Collapsible trigger="Danh sách vai trò của người dùng" easing="ease-in" open={true}>
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
                        />
                    </Collapsible>
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
