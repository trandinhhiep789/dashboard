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
    EditPagePath,
    GetParent
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";
import FormContainer from "../../../../../common/components/Form/AdvanceForm/FormContainer";
import FormControl from '../../../../../common/components/Form/AdvanceForm/FormControl';
import MultiSelectComboBox from "../../../../../common/components/FormContainer/FormControl/MultiSelectComboBox";
import { ERPCOMMONCACHE_STORE } from "../../../../../constants/keyCache";
class ReviewLevel_UserCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.handleInputChangeList = this.handleInputChangeList.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            FormContent: "",
            IsLoadDataComplete: false,
            IsCloseForm: false
        };
    }




    componentDidMount() {
        //this.props.updatePagePath(EditPagePath);
        // const id = this.props.match.params.id;
        // this.GetParentList(id);
        // this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then(apiResult => {
        //     if (apiResult.IsError) {
        //         this.setState({
        //             IsCallAPIError: apiResult.IsError
        //         });
        //         this.showMessage(apiResult.Message);
        //     } else {
        //         this.setState({
        //             DataSource: apiResult.ResultObject,
        //             AreaStore: apiResult.ResultObject.AreaStore ? apiResult.ResultObject.AreaStore : [],
        //             //SkillSkillRank: apiResult.ResultObject.SkillSkillRank ? apiResult.ResultObject.SkillSkillRank : [],
        //         });
        //     }
        //     this.setState({
        //         IsLoadDataComplete: true
        //     });
        // });
        window.addEventListener('keydown',function(e){if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.keyCode==13){if(e.target.nodeName=='INPUT'&&e.target.type=='text'){e.preventDefault();return false;}}},true);

    }


    handleInputChangeList(formData, tabNameList, tabMLObjectDefinitionList, formValidation) {

    }


    handleSubmit(formData, MLObject) {

        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        MLObject.UserName = this.state.Username;
        if (!MLObject.UserName || !MLObject.ReviewLevelID || MLObject.ReviewLevelID == -1 || !MLObject.StoreID || MLObject.StoreID == -1) {
            this.showMessage("Vui lòng nhập đầy đủ thông tin.");
            return;
        }
        this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);
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

                <FormContainer
                    // FormName="Người duyệt"
                    MLObjectDefinition={MLObjectDefinition}
                    IsAutoLayout={true}
                    listelement={[]}
                    onInputChangeList={this.handleInputChangeList}
                    onSubmit={this.handleSubmit}
                    FormMessage={this.state.CallAPIMessage}
                    IsErrorMessage={this.state.IsCallAPIError}
                    dataSource={this.state.DataSource}
                    BackLink={BackLink}
                //RequirePermission={AREA_UPDATE}
                >

                    <FormControl.ComboBox
                        name="ReviewLevelID"
                        type="select"
                        isautoloaditemfromcache={false}
                        label="Mức duyệt"
                        controltype="InputControl"
                        listoption={this.props.ReviewLevelOptions}
                        datasourcemember="ReviewLevelID"
                        labelcolspan={4} colspan={8} rowspan={8}
                        isRequired={true}
                    />

                    <FormControl.ComboBox
                        name="StoreID"
                        type="select"
                        isautoloaditemfromcache={true}
                        loaditemcachekeyid={ERPCOMMONCACHE_STORE}
                        valuemember="StoreID"
                        nameMember="StoreName"
                        label="Kho duyệt"
                        controltype="InputControl"
                        listoption={[]}
                        datasourcemember="StoreID"
                        labelcolspan={4} colspan={8} rowspan={8}
                        isRequired={true}
                        KeyFilter="CompanyID"
                        ValueFilter={10}
                    />

                    <MultiSelectComboBox
                        name="User"
                        labelcolspan={4} colspan={8} rowspan={8}
                        label="Người duyệt"
                        disabled={false}
                        IsLabelDiv={true}
                        isautoloaditemfromcache={false}
                        onChange={this.onChangeUser.bind(this)}
                        controltype="InputControl"
                        value={[]}
                        listoption={[]}
                        isMultiSelect={false}
                        datasourcemember="User"
                        validationErrorMessage={''}
                        validatonList={["Comborequired"]}
                        isRequired={true}
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

const ReviewLevel_User = connect(
    mapStateToProps,
    mapDispatchToProps
)(ReviewLevel_UserCom);
export default ReviewLevel_User;
