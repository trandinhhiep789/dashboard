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
    AddPagePath,
    GetUserAPIPath
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";
import { ERPCOMMONCACHE_SERVICETYPE, ERPCOMMONCACHE_TMSREWARDTYPE } from "../../../../../constants/keyCache";
import { USER_REWARD_STORE_ADD } from "../../../../../constants/functionLists";

class AddCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false,
            StoreID: 0,
            AddElementList: AddElementList
        };
    }

    componentDidMount() {
        this.props.updatePagePath(AddPagePath);
    }

    handleChange(elementName, elementValue, formData) {
        if (elementName == "StoreID" && elementValue != -1 && elementValue != this.state.StoreID) {
            this.setState({ StoreID: elementValue });
            this.props.callFetchAPI(APIHostName, GetUserAPIPath, elementValue).then(apiResult => {
                this.setState({ IsCallAPIError: apiResult.IsError });
                if (!apiResult.IsError) {
                    let listOption = [];
                    apiResult.ResultObject.map((item, index) => {
                        listOption.push({ value: item.UserName, name: item.FullName });
                    });

                    let _AddElementList = this.state.AddElementList;
                    _AddElementList.forEach(function (objElement) {
                        if (objElement.name == 'UserName') {
                            objElement.listoption = listOption;
                            objElement.value = -1;
                        }
                    });
                    this.setState({
                        AddElementList: _AddElementList
                    });

                    // this.setState({ ReviewUser: listOption });
                    // console.log("dsad",listOption);
                }

            });
        }
    }

    handleSubmit(formData, MLObject) {
        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        MLObject.UserName = MLObject.UserName && Array.isArray(MLObject.UserName) ? MLObject.UserName[0] : MLObject.UserName;

        if (MLObject.ApplyFromDate.getMonth) {
            MLObject.ApplyFromDate.setDate(MLObject.ApplyFromDate.getDate() + 1);
        }

        if (MLObject.ApplyToDate.getMonth) {
            MLObject.ApplyToDate.setDate(MLObject.ApplyToDate.getDate() + 1);
        }

        this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            if (!apiResult.IsError) {
                //this.props.callClearLocalCache(ERPCOMMONCACHE_TMSREWARDTYPE);
                //this.handleSubmitInsertLog(MLObject);
            }
            this.showMessage(apiResult.Message);
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
                FormName="Thêm kho thưởng của nhân viên quản lý"
                MLObjectDefinition={MLObjectDefinition}
                listelement={this.state.AddElementList}
                onSubmit={this.handleSubmit}
                onValueChange={this.handleChange}
                FormMessage={this.state.CallAPIMessage}
                IsErrorMessage={this.state.IsCallAPIError}
                dataSource={dataSource}
                BackLink={BackLink}
                RequirePermission={USER_REWARD_STORE_ADD}
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
        },
        callClearLocalCache: (cacheKeyID) => {
            return dispatch(callClearLocalCache(cacheKeyID));
        }
    };
};

const Add = connect(mapStateToProps, mapDispatchToProps)(AddCom);
export default Add;
