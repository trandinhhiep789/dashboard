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
    GetUserAPIPath
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";
import { ERPCOMMONCACHE_SERVICETYPE, ERPCOMMONCACHE_TMSREWARDTYPE } from "../../../../../constants/keyCache";
import { USER_REWARD_STORE_UPDATE } from "../../../../../constants/functionLists";

class EditCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getListUser = this.getListUser.bind(this);
        this.bindData = this.bindData.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            FormContent: "",
            IsLoadDataComplete: false,
            IsCloseForm: false,
            StoreID: 0,
            EditElementList: EditElementList
        };
    }

    componentDidMount() {
        this.props.updatePagePath(EditPagePath);
        this.bindData();
    }

    bindData() {
        const id = this.props.match.params.id;
        this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then(apiResult => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            } else {
                this.getListUser(apiResult.ResultObject);
                //this.setState({ DataSource: apiResult.ResultObject, IsLoadDataComplete: true });
            }
        });
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

                    let _EditElementList = this.state.EditElementList;
                    _EditElementList.forEach(function (objElement) {
                        if (objElement.name == 'UserName') {
                            objElement.listoption = listOption;
                            objElement.value = null;
                        }
                    });

                    this.setState({
                        EditElementList: _EditElementList
                    });



                    // this.setState({ ReviewUser: listOption });
                    // console.log("dsad",listOption);
                }

            });
        }

    }

    getListUser(data) {
        let storeID = data.StoreID;
        if (storeID) {
            this.setState({ StoreID: storeID });
            this.props.callFetchAPI(APIHostName, GetUserAPIPath, storeID).then(apiResult => {
                this.setState({ IsCallAPIError: apiResult.IsError });
                if (!apiResult.IsError) {
                    let listOption = [];
                    apiResult.ResultObject.map((item, index) => {
                        listOption.push({ value: item.UserName, name: item.FullName });
                    });

                    let _EditElementList = EditElementList;
                    _EditElementList.forEach(function (objElement) {
                        if (objElement.name == 'UserName') {
                            objElement.listoption = listOption;
                            objElement.value = data.UserName;
                        }
                        else if (objElement.name == 'StoreID') {
                            objElement.value = data.StoreID;
                        } else if (objElement.name == 'ApplyFromDate') {
                            objElement.value = data.ApplyFromDateString;
                        } else if (objElement.name == 'ApplyToDate') {
                            objElement.value = data.ApplyToDateString;
                        } else if (objElement.name == 'chkIsSystem') {
                            objElement.value = data.IsSystem;
                        }
                    });
                    this.setState({
                        DataSource: data,
                        EditElementList: _EditElementList,

                        IsLoadDataComplete: true

                    });
                }

            });
        }
    }

    handleSubmit(formData, MLObject) {
        MLObject.UserRewardStoreID = this.props.match.params.id;
        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        MLObject.UserName = MLObject.UserName && Array.isArray(MLObject.UserName) ? MLObject.UserName[0] : MLObject.UserName;
        if (MLObject.ApplyFromDate.getMonth) {
            MLObject.ApplyFromDate.setDate(MLObject.ApplyFromDate.getDate() + 1);
        } else {
            MLObject.ApplyFromDate = this.state.DataSource.ApplyFromDate;
        }

        if (MLObject.ApplyToDate.getMonth) {
            MLObject.ApplyToDate.setDate(MLObject.ApplyToDate.getDate() + 1);
        } else {
            MLObject.ApplyToDate = this.state.DataSource.ApplyToDate;
        }


        this.props.callFetchAPI(APIHostName, UpdateAPIPath, MLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            if (!apiResult.IsError) {
                //this.props.callClearLocalCache(ERPCOMMONCACHE_TMSREWARDTYPE);
                // this.handleSubmitInsertLog(MLObject);
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
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        if (this.state.IsLoadDataComplete) {
            return (
                <SimpleForm
                    FormName="Cập nhật kho thưởng của nhân viên quản lý"
                    MLObjectDefinition={MLObjectDefinition}
                    listelement={this.state.EditElementList}
                    onSubmit={this.handleSubmit}
                    onValueChange={this.handleChange}
                    FormMessage={this.state.CallAPIMessage}
                    IsErrorMessage={this.state.IsCallAPIError}
                    dataSource={[]}
                    BackLink={BackLink}
                    RequirePermission={USER_REWARD_STORE_UPDATE}
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
