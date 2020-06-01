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
    InitSearchParamsModeList,
    DataGridColumnListMultiple,
    InputPartnerRoleColumnList,
    GridMLPartnerRoleDefinition,
    SearchPartnerRoleAPIPath,
    PKColumnName,
    IDSelectColumnName

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
        this.handleInsertItem = this.handleInsertItem.bind(this);
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



    handleInsertItem(lstOption) {
        let _PartnerRolePriviledge = [];
        if (this.state.DataSource.ListPartnerRolePriviledge) {
            _PartnerRolePriviledge = this.state.DataSource.ListPartnerRolePriviledge;
        }
        lstOption.map((row, index) => {
            let match = _PartnerRolePriviledge.filter(item => item.PartnerPriviledgeID == row.PartnerPriviledgeID);
            if (match.length <= 0) {
                _PartnerRolePriviledge.push(row);
            }
        });

        const formData = Object.assign({}, this.state.DataSource, { ["ListPartnerRolePriviledge"]: _PartnerRolePriviledge });
        this.setState({ DataSource: formData });

        // console.log("handleInsertItem",lstOption);
    }


    handleInputUserRoleInsert() {
        this.props.showModal(MODAL_TYPE_SEARCH, {
            title: "Danh sách quyền",
            content: {
                text: <SearchModal
                    PKColumnName={"PartnerPriviledgeID,PartnerPriviledgeName"}
                    multipleCheck={true}
                    SearchMLObjectDefinition={SearchMLmoldeDefinition}
                    DataGridColumnList={DataGridColumnListMultiple}
                    GridDataSource={[]}
                    SearchAPIPath={SearchPartnerRoleAPIPath}
                    SearchElementList={SearchElementModeList}
                    InitSearchParams={InitSearchParamsModeList}
                    onClickInsertItem={this.handleInsertItem.bind(this)}
                    IDSelectColumnName={"chkSelect"}
                    name={"PartnerPriviledgeName"}
                    value={"PartnerPriviledgeID"}
                    inputCheckItem={true}
                >
                </SearchModal>
            }
        });
    }

    handleSubmit(formData, MLObject) {
        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        MLObject.ListPartnerRolePriviledge = this.state.DataSource.ListPartnerRolePriviledge;
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
                    FormName="Cập nhật vai trò người dùng"
                    MLObjectDefinition={MLObjectDefinition}
                    listelement={this.state.EditElementList}
                    onSubmit={this.handleSubmit}
                    IsAutoLayout={true}
                    ref={this.searchref}
                    BackLink={BackLink}
                    dataSource={this.state.DataSource}
                    //RequirePermission={MCROLE_EDIT}
                >
                    <br />
                    <Collapsible trigger="Danh sách quyền của nhà cung cấp" easing="ease-in" open={true}>
                        <InputGrid
                            name="LstPartnerRole_Priviledge"
                            controltype="GridControl"
                            IDSelectColumnName={IDSelectColumnName}
                            listColumn={InputPartnerRoleColumnList}
                            PKColumnName={PKColumnName}
                            isHideHeaderToolbar={false}
                            dataSource={this.state.DataSource.ListPartnerRolePriviledge}
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
