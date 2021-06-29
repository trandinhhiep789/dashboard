import React from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import SimpleForm from "../../../../../common/components/Form/SimpleForm";
import { MessageModal } from "../../../../../common/components/Modal";
import {
    APIHostName,
    LoadAPIPath,
    UpdateAPIPath,
    EditElementList,
    MLObjectDefinition,
    BackLink,
    EditPagePath
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { SKILL_UPDATE } from "../../../../../constants/functionLists";
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";
import Skill_InstallAbility from "../../Skill_InstallAbility";
import Skill_SkillRank from "../../Skill_SkillRank";
class EditCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.onSkillInstallAbilityChange = this.onSkillInstallAbilityChange.bind(this);
        this.onSkillSkillRankChange = this.onSkillSkillRankChange.bind(this);
        this.onReload = this.onReload.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            FormContent: "",
            IsLoadDataComplete: false,
            IsCloseForm: false,
            EditElementList: EditElementList,
            SkillInstallAbility: []
        };
        
    }

    componentDidMount() {
        this.props.updatePagePath(EditPagePath);
        this.callLoadData();

    }

    callLoadData(){
        const id = this.props.match.params.id;
        this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then(apiResult => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            } else {
                this.setState({ 
                    DataSource: apiResult.ResultObject, 
                    SkillInstallAbility: apiResult.ResultObject.SkillInstallAbility ? apiResult.ResultObject.SkillInstallAbility : [],
                    SkillSkillRank: apiResult.ResultObject.SkillSkillRank ? apiResult.ResultObject.SkillSkillRank : [], 
                });
            }
            this.setState({
                IsLoadDataComplete: true
            });
        });
    }

    onReload(){
        this.callLoadData();
    }
    
    onSkillInstallAbilityChange(list) {
        this.setState({ SkillInstallAbility: list });
        //console.log("onSkillInstallAbilityChange", list);
    }

    onSkillSkillRankChange(list){
        this.setState({ SkillSkillRank: list });
        //console.log("onSkillSkillRankChange", list);
    }

    handleSubmit(formData, MLObject) {
        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        MLObject.SkillInstallAbility = this.state.SkillInstallAbility;
        MLObject.SkillSkillRank = this.state.SkillSkillRank;
        this.props.callFetchAPI(APIHostName, UpdateAPIPath, MLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);
            if (!apiResult.IsError) {
                //this.props.callClearLocalCache(ERPCOMMONCACHE_PARTNER);
            }
        });
        //console.log("MLObject",MLObject);
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

    render() {
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        if (this.state.IsLoadDataComplete) {
            return (
                <React.Fragment>
                    <SimpleForm
                        FormName="Cập nhật kỹ năng"
                        MLObjectDefinition={MLObjectDefinition}
                        listelement={this.state.EditElementList}
                        onSubmit={this.handleSubmit}
                        FormMessage={this.state.CallAPIMessage}
                        IsErrorMessage={this.state.IsCallAPIError}
                        dataSource={this.state.DataSource}
                        BackLink={BackLink}
                        RequirePermission={SKILL_UPDATE}
                        ref={this.searchref}>

                        <br />
                        <Skill_InstallAbility
                            SkillID={this.props.match.params.id}
                            SkillInstallAbilityDataSource={this.state.SkillInstallAbility}
                            onSkillInstallAbilityChange={this.onSkillInstallAbilityChange}
                            onReload = {this.onReload}
                        />
                        <br />
                        <Skill_SkillRank
                            SkillID={this.props.match.params.id}
                            SkillSkillRankDataSource={this.state.SkillSkillRank}
                            onSkillSkillRankChange={this.onSkillSkillRankChange}
                        />
                    </SimpleForm>



                </React.Fragment>
            );
        }
        return (
            <div>
                <label>Đang nạp dữ liệu...</label>
            </div>
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
        callClearLocalCache: (cacheKeyID) => {
            return dispatch(callClearLocalCache(cacheKeyID));
        }

    };
};

const Edit = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditCom);
export default Edit;
