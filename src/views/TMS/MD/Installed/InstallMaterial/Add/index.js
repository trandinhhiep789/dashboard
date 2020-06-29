import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
// import FormContainer from "../../../../../../common/components/Form/AdvanceForm/FormContainer";
import InputGrid from "../../../../../../common/components/FormContainer/FormControl/InputGrid";
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
import { INSTALLMATERIAL_ADD } from "../../../../../../constants/functionLists";

class AddCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false,
            AddElementList: AddElementList,
            DataSource: {},

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


    handleSubmit(formData, MLObject) {
        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
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
                FormName="Thêm nhóm sản phẩm cần vật tư lắp đặt"
                MLObjectDefinition={MLObjectDefinition}
                listelement={this.state.AddElementList}
                onSubmit={this.handleSubmit}
                BackLink={BackLink}
                dataSource={[]}
                RequirePermission={INSTALLMATERIAL_ADD}
            >
                <InputGrid
                    name="InstallMaterial_ProductList"
                    key="InstallMaterial_ProductList"
                    controltype="GridControl"
                    title=" vật tư lắp đặt cho nhóm sản phẩm"
                    IDSelectColumnName={"ProductID"}
                    listColumn={InputMcRoleColumnList}
                    isHideHeaderToolbar={false}
                    dataSource={[]}
                    Ispopup={true}
                    MLObjectDefinition={GridMLMcRoleDefinition}
                    colspan="12"
                />
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
