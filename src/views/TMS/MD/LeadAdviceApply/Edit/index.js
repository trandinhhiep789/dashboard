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
    EditPagePath,
    AddLogAPIPath
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callGetCache } from "../../../../../actions/cacheAction";

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
            IsCloseForm: false
        };
    }

    componentDidMount() {
        const id = this.props.LeadAdviceApplyID;
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
    }

    handleSubmit(formData, MLObject) {

        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;

        MLObject.LeadAdviceApplyID = this.props.LeadAdviceApplyID;

        if (MLObject.MainGroupID != this.state.DataSource.MainGroupID) {
            MLObject.MainGroupID = MLObject.MainGroupID[0];
        } else {
            MLObject.SubGroupID = this.state.DataSource.SubGroupID;
        }

        if (MLObject.SubGroupID != this.state.DataSource.SubGroupID) {
            MLObject.SubGroupID = MLObject.SubGroupID[0];
        } else {
            MLObject.SubGroupID = this.state.DataSource.SubGroupID;
        }

        if (MLObject.ProductID != this.state.DataSource.ProductID) {
            MLObject.ProductID = MLObject.ProductID[0].ProductID;
        } else {
            MLObject.ProductID = this.state.DataSource.ProductID;
        }

        this.props.callFetchAPI(APIHostName, UpdateAPIPath, MLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            if (!apiResult.IsError) {
                // this.handleClearLocalCache();
                // this.handleSubmitInsertLog(MLObject);
            }
            this.showMessage(apiResult.Message);
        });
    }

    handleCloseMessage() {
        if (!this.state.IsCallAPIError) {
            if (!this.state.IsCallAPIError) {
                if (this.props.closePopup) {
                    this.props.closePopup();
                }
            }
        }
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

        if (this.state.IsLoadDataComplete) {
            return (
                <SimpleForm
                    MLObjectDefinition={MLObjectDefinition}
                    listelement={EditElementList}
                    onSubmit={this.handleSubmit}
                    FormMessage={this.state.CallAPIMessage}
                    IsErrorMessage={this.state.IsCallAPIError}
                    dataSource={this.state.DataSource}
                    // BackLink={`/LeadAdvice/Detail/${this.props.LeadAdviceID}`}
                    // RequirePermission={PACKAGETYPE_UPDATE}
                    ref={this.searchref}
                />
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
        }
    };
};

const Edit = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditCom);
export default Edit;
