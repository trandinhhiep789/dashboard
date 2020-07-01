import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { ModalManager } from "react-dynamic-modal";
import FormContainer from "../../../../../../common/components/FormContainer";
import InputGrid from "../../../../../../common/components/FormContainer/FormControl/InputGrid";
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
import { INSTALLMATERIAL_UPDATE } from "../../../../../../constants/functionLists";

class EditCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
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

    handleSubmit(formData, MLObject) {
        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        this.props.callFetchAPI(APIHostName, UpdateAPIPath, MLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);
        });
    }
    render() {
        console.log("h",this.state.DataSource)
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        if (this.state.IsLoadDataComplete) {
            return (
                <FormContainer
                    FormName="Cập nhật nhóm sản phẩm cần vật tư lắp đặt"
                    MLObjectDefinition={MLObjectDefinition}
                    listelement={this.state.EditElementList}
                    onSubmit={this.handleSubmit}
                    BackLink={BackLink}
                    dataSource={this.state.DataSource}
                    RequirePermission={INSTALLMATERIAL_UPDATE}
                >
                    <InputGrid
                        name="InstallMaterial_ProductList"
                        controltype="GridControl"
                        title="vật tư lắp đặt cho nhóm sản phẩm"
                        IDSelectColumnName={"ProductID"}
                        listColumn={InputMcRoleColumnList}
                        isHideHeaderToolbar={false}
                        dataSource={this.state.DataSource.InstallMaterial_ProductList}
                        Ispopup={true}
                        isSystem={this.state.DataSource.IsSystem}
                        MLObjectDefinition={GridMLMcRoleDefinition}
                        colspan="12"
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
