import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import { MessageModal } from "../../../../../common/components/Modal";
import SimpleForm from "../../../../../common/components/Form/SimpleForm";
import {
    APIHostName,
    AddAPIPath,
    AddElementList,
    MLObjectDefinition,
    BackLink,
    AddPagePath,
    TitleFormAdd
} from "../../../ServiceAgreement/FeeAppendix/contants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { FEEAPPENDIX_ADD } from "../../../../../constants/functionLists";


class AddCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.state = {
            IsCallAPIError: false,
            IsCloseForm: false,
            DataSource: {},
            CallAPIMessage: "",
            ServiceAgreementID: this.props.location.state.params,
            ServiceAgreement: {}
        };
        this.searchref = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(AddPagePath);
        this.getServiceAgreementById(this.props.location.state.params);
    }

    handleSubmit(formData, MLObject) {
        const { ServiceAgreement } = this.state;


        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        MLObject.SignedDate = ServiceAgreement.SignedDate;
        MLObject.ServiceAgreementID = ServiceAgreement.ServiceAgreementID;
        this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);

        });
    }

    getServiceAgreementById(id) {

        this.props.callFetchAPI(APIHostName, 'api/ServiceAgreement/Load', id).then(apiResult => {
            if (!apiResult.IsError) {
                this.setState({
                    ServiceAgreement: apiResult.ResultObject,
                })
            } else {
                this.showMessage(apiResult.Message);
            }
        });
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
        const dataSource = {
            IsActived: true
        };
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        return (

            <SimpleForm
                FormName={TitleFormAdd}
                MLObjectDefinition={MLObjectDefinition}
                listelement={AddElementList}
                onSubmit={this.handleSubmit}
                FormMessage={this.state.CallAPIMessage}
                IsErrorMessage={this.state.IsCallAPIError}
                dataSource={dataSource}
                BackLink={BackLink}
                ref={this.searchref}
            //RequirePermission={FEEAPPENDIX_ADD}
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
        },
        callClearLocalCache: (cacheKeyID) => {
            return dispatch(callClearLocalCache(cacheKeyID));
        }
    };
};

const Add = connect(mapStateToProps, mapDispatchToProps)(AddCom);
export default Add;
