import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import { MessageModal } from "../../../../../../common/components/Modal";
// import FormContainer from "../../../../../../common/components/Form/AdvanceForm/FormContainer";
// import InputGrid from "../../../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
import FormContainer from "../../../../../../common/components/Form/AdvanceForm/FormContainer";
import InputGrid from "../../../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
import { showModal } from '../../../../../../actions/modal';
import { MODAL_TYPE_SEARCH } from '../../../../../../constants/actionTypes';
import SearchModal from "../../../../../../common/components/Form/AdvanceForm/FormControl/FormSearchModal"
import {
    APIHostName,
    LoadAPIPath,
    UpdateAPIPath,
    EditElementList,
    MLObjectDefinition,
    BackLink,
    EditPagePath,
    SearchMLmoldeDefinition,
    SearchElementModeList,
    DataGridColumnListMultiple,
    InputMcRoleColumnList,
    GridMLMcRoleDefinition,
    SearchMcRoleAPIPath

} from "../constants";
import { callFetchAPI } from "../../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../../actions/pageAction";
import { callGetCache } from "../../../../../../actions/cacheAction";
import { MCROLE_EDIT, MCPRIVILEGE_VIEW, MCPRIVILEGE_DELETE } from "../../../../../../constants/functionLists";

class EditCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleinsertItem = this.handleinsertItem.bind(this);
        this.handleInputUserRoleInsert = this.handleInputUserRoleInsert.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            FormContent: "",
            IsLoadDataComplete: false,
            IsCloseForm: false,
            EditElementList: EditElementList
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
                this.setState({ DataSource: apiResult.ResultObject });
            }
            this.setState({
                IsLoadDataComplete: true
            });
        });
        this.props.updatePagePath(EditPagePath);
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
        const formData = Object.assign({}, this.state.DataSource,{["LstMcRole_Priviledge"] :listMLObject});
        this.setState({ DataSource: formData });
    }

    handleInputUserRoleInsert()
    {    
        this.props.showModal(MODAL_TYPE_SEARCH, {
            title: "Danh sách quyền",
            content: {
                text: <SearchModal
                    PKColumnName={"McPriviledgeID,McPriviledgeName"}
                    multipleCheck={true}
                    SearchMLObjectDefinition={SearchMLmoldeDefinition}
                    DataGridColumnList={DataGridColumnListMultiple}
                    GridDataSource={[]}
                    SearchAPIPath={SearchMcRoleAPIPath}
                    SearchElementList={SearchElementModeList}
                    onClickInsertItem={this.handleinsertItem.bind(this)}
                    RequirePermission={MCPRIVILEGE_VIEW}
                    DeletePermission={MCPRIVILEGE_DELETE}
                    IDSelectColumnName={"chkSelect"}
                    name={"McPriviledgeID"}
                    value={"McPriviledgeName"}
                >
                </SearchModal>
            }
        });
    }

    handleSubmit(formData, MLObject) {
        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
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
                FormName="Cập nhật Vai trò người dùng"
                MLObjectDefinition={MLObjectDefinition}
                listelement={this.state.EditElementList}
                onSubmit={this.handleSubmit}
                IsAutoLayout={true}
                ref={this.searchref}
                BackLink={BackLink}
                dataSource={this.state.DataSource}
                RequirePermission={MCROLE_EDIT}
            >
                <InputGrid
                    name="LstMcRole_Priviledge"
                    controltype="InputControl"
                    IDSelectColumnName={"checkboxAll"}
                    listColumn={InputMcRoleColumnList}
                    isHideHeaderToolbar={false}
                    dataSource={this.state.DataSource.LstMcRole_Priviledge}
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
