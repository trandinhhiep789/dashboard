import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import { MessageModal } from "../../../../../../common/components/Modal";
import {
    APIHostName,
    APIAdd,
    MLObjectDefinition,
    GetUserAPIPath
} from "../constants";
import { callFetchAPI } from "../../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../../actions/pageAction";
import { callGetCache, callClearLocalCache } from "../../../../../../actions/cacheAction";
import FormContainer from "../../../../../../common/components/FormContainer";
import FormControl from "../../../../../../common/components/FormContainer/FormControl";
import { ERPCOMMONCACHE_STORE } from "../../../../../../constants/keyCache";

class ReviewLevel_UserCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            FormContent: "",
            IsLoadDataComplete: false,
            StoreID: 0,
            ReviewUser: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
    }

    componentDidMount() {
        window.addEventListener('keydown', function (e) { if (e.keyIdentifier == 'U+000A' || e.keyIdentifier == 'Enter' || e.keyCode == 13) { if (e.target.nodeName == 'INPUT' && e.target.type == 'text') { e.preventDefault(); return false; } } }, true);
    }

    handleChange(formData, MLObject) {
        if (formData.StoreID.value != -1 && formData.StoreID.value != this.state.StoreID) {

            this.setState({ StoreID: formData.StoreID.value, ReviewUser: [{ value: -1, label: "--Vui lòng chọn--" }] });

            this.props.callFetchAPI(APIHostName, GetUserAPIPath, formData.StoreID.value).then(apiResult => {

                this.setState({ IsCallAPIError: apiResult.IsError });

                if (!apiResult.IsError) {
                    let listOption = [];
                    apiResult.ResultObject.map((item, index) => {
                        listOption.push({ value: item.UserName, label: item.FullName });
                    });
                    this.setState({ ReviewUser: listOption });
                } else {
                    this.showMessage(apiResult.Message);
                }
            });
        }
    }

    handleSubmit(formData, MLObject) {
        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        MLObject.UserName = MLObject.UserName && Array.isArray(MLObject.UserName) ? MLObject.UserName[0] : MLObject.UserName;
        MLObject.ReviewLevelID = this.props.ReviewLevelID;
        this.props.callFetchAPI(APIHostName, APIAdd, MLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });

            if (this.props.onComplete) {
                this.props.onComplete(apiResult.Message, apiResult.IsError);
            }
            if (!apiResult.IsError) {
                if (this.props.onComponentChange) {
                    this.props.onComponentChange();
                    this.props.closePopup();
                }
            }
        });
    }

    handleCloseMessage() {

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

    onChangeUser(name, objUser) {
        if (name == "StoreUser") {
            let validationStoreUser = ""
            if (objUser.value == "") {
                validationStoreUser = "vui lòng chọn nhân viên";
            }

            let objStoreUser = {
                UserName: objUser.value,
                FullName: objUser.FullName
            }
            this.setState({
                objStoreUser: objStoreUser,
                validationStoreUser: validationStoreUser
            });
        }
        else {
            this.setState({
                Username: objUser.value,
                DepartmentName: objUser.DepartmentName,
                PositionName: objUser.PositionName,
                Address: objUser.Address,
                FullName: objUser.label
            });
        }
    }

    render() {
        return (
            <React.Fragment>
                <FormContainer
                    MLObjectDefinition={MLObjectDefinition}
                    IsAutoLayout={true}
                    listelement={[]}
                    onSubmit={this.handleSubmit}
                    FormMessage={this.state.CallAPIMessage}
                    IsErrorMessage={this.state.IsCallAPIError}
                    dataSource={null}
                    onchange={this.handleChange.bind(this)}
                >
                    <FormControl.FormControlComboBox
                        name="StoreID"
                        label="Kho duyệt"
                        isautoloaditemfromcache={true}
                        loaditemcachekeyid={ERPCOMMONCACHE_STORE}
                        valuemember="StoreID"
                        nameMember="StoreName"
                        filterobj={"CompanyID"}
                        filterValue={"10"}
                        controltype="InputControl"
                        value={-1}
                        listoption={[]}
                        datasourcemember="StoreID"
                        labelcolspan={4} colspan={8} rowspan={8}
                        validatonList={["Comborequired"]}
                    />

                    <FormControl.FormControlComboBox
                        name="UserName"
                        label="Người duyệt"
                        isautoloaditemfromcache={false}
                        controltype="InputControl"
                        value={-1}
                        listoption={this.state.ReviewUser}
                        datasourcemember="UserName"
                        labelcolspan={4} colspan={8} rowspan={8}
                        validatonList={["Comborequired"]}
                    />
                </FormContainer>
            </React.Fragment>
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

const ReviewLevel_User = connect(mapStateToProps, mapDispatchToProps)(ReviewLevel_UserCom);
export default ReviewLevel_User;