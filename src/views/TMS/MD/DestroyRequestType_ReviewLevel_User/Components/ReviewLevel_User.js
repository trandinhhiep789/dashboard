import React from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import SimpleForm from "../../../../../common/components/Form/SimpleForm";
import { MessageModal } from "../../../../../common/components/Modal";
import {
    APIHostName,
    AddAPIPath,
    UpdateAPIPath,
    MLObjectDefinition,
    BackLink,
    GetUserAPIPath
} from "../constants";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";
import FormContainer from "../../../../../common/components/FormContainer";
import FormControl from "../../../../../common/components/FormContainer/FormControl";
import MultiSelectComboBox from "../../../../../common/components/FormContainer/FormControl/MultiSelectComboBox";
import { ERPCOMMONCACHE_STORE } from "../../../../../constants/keyCache";
class ReviewLevel_UserCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            cssNotification: "",
            iconNotification: "",
            FormContent: "",
            IsLoadDataComplete: false,
            IsCloseForm: false,
            StoreID: 0,
            ReviewUser: []
        };
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        window.addEventListener('keydown', function (e) { if (e.keyIdentifier == 'U+000A' || e.keyIdentifier == 'Enter' || e.keyCode == 13) { if (e.target.nodeName == 'INPUT' && e.target.type == 'text') { e.preventDefault(); return false; } } }, true);
    }

    addNotification(message1, IsError) {
        if (!IsError) {
            this.setState({
                cssNotification: "notification-custom-success",
                iconNotification: "fa fa-check"
            });
        } else {
            this.setState({
                cssNotification: "notification-danger",
                iconNotification: "fa fa-exclamation"
            });
        }
        this.notificationDOMRef.current.addNotification({
            container: "bottom-right",
            content: (
                <div className={this.state.cssNotification}>
                    <div className="notification-custom-icon">
                        <i className={this.state.iconNotification} />
                    </div>
                    <div className="notification-custom-content">
                        <div className="notification-close">
                            <span>×</span>
                        </div>
                        <h4 className="notification-title">Thông Báo</h4>
                        <p className="notification-message">{message1}</p>
                    </div>
                </div>
            ),
            dismiss: { duration: 6000 },
            dismissable: { click: true }
        });
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
                }

            });
        }
    }


    handleSubmit(formData, MLObject) {
        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        MLObject.ReviewLevelID = this.props.ReviewLevelID;
        MLObject.UserName = MLObject.UserName && Array.isArray(MLObject.UserName) ? MLObject.UserName[0] : MLObject.UserName;

        this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            //this.showMessage(apiResult.Message);
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
        //console.log("FormData", MLObject);
    }

    handleCloseMessage() {
        //if (!this.state.IsCallAPIError) this.setState({ IsCloseForm: true });
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
            //console.log("objUser", objUser);
            if (objUser.value != "") {
                const postData = [
                    {
                        SearchKey: "@USERNAME",
                        SearchValue: objUser.value
                    }
                ];
                //this.callLoadData(postData);

            }
        }
    }


    render() {
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <FormContainer
                    //FormName="Người duyệt"
                    MLObjectDefinition={MLObjectDefinition}
                    IsAutoLayout={true}
                    listelement={[]}
                    onSubmit={this.handleSubmit}
                    FormMessage={this.state.CallAPIMessage}
                    IsErrorMessage={this.state.IsCallAPIError}
                    dataSource={null}
                    //BackLink={BackLink}
                    IsCloseModal={true}
                    onchange={this.handleChange.bind(this)}
                //RequirePermission={AREA_UPDATE}
                >

                    {/* <FormControl.FormControlComboBox
                        name="ReviewLevelID"
                        label="Mức duyệt"
                        isautoloaditemfromcache={false}
                        controltype="InputControl"
                        value={-1}
                        listoption={this.props.ReviewLevelOptions}
                        datasourcemember="ReviewLevelID"
                        labelcolspan={4} colspan={8} rowspan={8}
                        validatonList={["Comborequired"]}
                    /> */}


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

                    {/* <MultiSelectComboBox
                        name="User"
                        labelcolspan={4} colspan={8} rowspan={8}
                        label="Người duyệt"
                        disabled={false}
                        IsLabelDiv={true}
                        isautoloaditemfromcache={false}
                        onChange={this.onChangeUser.bind(this)}
                        controltype="InputControl"
                        value={this.state.Username}
                        listoption={[]}
                        isMultiSelect={false}
                        datasourcemember="User"
                        validationErrorMessage={''}
                        validatonList={["Comborequired"]}
                        isRequired={true}
                    /> */}
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

const ReviewLevel_User = connect(
    mapStateToProps,
    mapDispatchToProps
)(ReviewLevel_UserCom);
export default ReviewLevel_User;
