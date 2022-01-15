import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import SimpleForm from "../../../../../common/components/Form/SimpleForm";
import { MessageModal } from "../../../../../common/components/Modal";
import {
    APIHostName,
    AddAPIPath,
    AddElementList,
    MLObjectDefinition,
    BackLink,
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { callGetCache } from "../../../../../actions/cacheAction";

class AddCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);

        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false
        };
    }

    componentDidMount() {
    }


    handleSubmit(formData, MLObject) {
        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;

        MLObject.LeadAdviceID = this.props.LeadAdviceID;
        MLObject.MainGroupID = MLObject.MainGroupID[0];
        MLObject.SubGroupID = MLObject.SubGroupID[0];
        MLObject.ProductID = MLObject.ProductID[0].ProductID;

        this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            if (!apiResult.IsError) {
            }
            this.showMessage(apiResult.Message);
        });
    }

    handleCloseMessage() {
        if (!this.state.IsCallAPIError) {
            if (this.props.closePopup) {
                this.props.closePopup();
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
        const dataSource = {
            IsActived: true
        };

        return (
            <SimpleForm
                MLObjectDefinition={MLObjectDefinition} ƒ
                listelement={AddElementList}
                onSubmit={this.handleSubmit}
                FormMessage={this.state.CallAPIMessage}
                IsErrorMessage={this.state.IsCallAPIError}
                dataSource={dataSource}
                // BackLink={`/LeadAdvice/Detail/${this.props.LeadAdviceID}`}
                // RequirePermission={PACKAGETYPE_ADD}
                ref={this.searchref}
            />
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

const Add = connect(mapStateToProps, mapDispatchToProps)(AddCom);
export default Add;
