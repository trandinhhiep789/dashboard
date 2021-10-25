import React from "react";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import ReactNotification from "react-notifications-component";

import {
    EditAPIPath,
    APIHostName,
    BackLink,
    EditPagePath,
    MLObjectDefinition,
    EditElementList,
    LoadAPIPath
} from "../constants";

import {
} from "../../../../../constants/keyCache";

import SimpleForm from "../../../../../common/components/Form/SimpleForm";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { callGetCache } from "../../../../../actions/cacheAction";
import { MessageModal } from "../../../../../common/components/Modal";
import { showModal, hideModal } from '../../../../../actions/modal';
import { updatePagePath } from "../../../../../actions/pageAction";
import { RENTALTYPE_UPDATE } from "../../../../../constants/functionLists";
class EditCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: {},
            IsLoadDataComplete: false,
            IsCloseForm: false,
        };

        this.searchref = React.createRef();
        this.gridref = React.createRef();
        this.notificationDOMRef = React.createRef();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.showMessage = this.showMessage.bind(this);
        this.fetchDataInfo = this.fetchDataInfo.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
    }

    componentDidMount() {
        this.props.updatePagePath(EditPagePath);
        this.fetchDataInfo();
    }

    fetchDataInfo() {
        this.props.callFetchAPI(APIHostName, LoadAPIPath, this.props.match.params.id).then(apiResult => {
            if (apiResult.IsError) {
                this.showMessage(apiResult.Message);
            } else {
                this.setState({dataSource: apiResult.ResultObject});
                console.log(this.state.dataSource);
            }
            this.setState({IsLoadDataComplete: true});
        });
    }

    handleSubmit(formData, MLObject) {
        let LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        MLObject.LoginLogID = LoginLogID;
        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;

        this.props.callFetchAPI(APIHostName, EditAPIPath, MLObject).then(apiResult => {
            this.showMessage(apiResult.Message);
            if (!apiResult.IsError) {
                this.props.history.push(BackLink);
            }
        });
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

    handleCloseMessage() {
        if (!this.state.IsCallAPIError) this.setState({ IsCloseForm: true });
    }
    render() {
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        if (this.state.IsLoadDataComplete) {
            return (
                <React.Fragment>
                    <ReactNotification ref={this.notificationDOMRef} />
                    <SimpleForm
                        BackLink={BackLink}
                        dataSource={this.state.dataSource}
                        FormMessage={""}
                        FormName="Sửa hình thức thuê xe"
                        IsErrorMessage={false}
                        listelement={EditElementList}
                        MLObjectDefinition={MLObjectDefinition}
                        onSubmit={this.handleSubmit}
                        ref={this.searchref}
                        RequirePermission={""}
                    />
                </React.Fragment>
            )
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: () => {
            dispatch(hideModal());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCom);