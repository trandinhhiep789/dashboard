import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import FormContainer from "../../../../../common/components/FormContainer";
import FormControl from "../../../../../common/components/FormContainer/FormControl";
import { MessageModal } from "../../../../../common/components/Modal";
import {
    APIHostName,
    AddAPIPath,
    AddElementList,
    MLObjectDefinition,
    BackLink,
    AddPagePath
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callGetCache, callClearLocalCache } from "../../../../../actions/cacheAction";
import { ERPCOMMONCACHE_REWARDCOMPUTETYPE } from "../../../../../constants/keyCache";
import { REWARDCOMPUTETYPE_ADD } from "../../../../../constants/functionLists";


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
        this.props.updatePagePath(AddPagePath);
    }

    handleSubmit(FormData, MLObject) {
        console.log("submit",FormData, MLObject)
        this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            if (!apiResult.IsError) {
                this.props.callClearLocalCache(ERPCOMMONCACHE_REWARDCOMPUTETYPE);
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
            <FormContainer
                FormName="Thêm loại tính thưởng"
                MLObjectDefinition={MLObjectDefinition}
                listelement={[]}
                onSubmit={this.handleSubmit}
                BackLink={BackLink}
            // onchange={this.handleChange.bind(this)}
            // RequirePermission={REWARDCOMPUTETYPE_ADD}
            >

                <div className="row">
                    <div className="col-md-6">
                        <FormControl.TextBox
                            name="txtRewardComputeTypeID"
                            colspan="8"
                            labelcolspan="4"
                            readOnly={false}
                            label="mã loại tính thưởng"
                            placeholder="Mã loại tính thưởng"
                            controltype="InputControl"
                            value=""
                            datasourcemember="RewardComputeTypeID"
                            validatonList={['required', 'number']}
                        />
                    </div>
                    <div className="col-md-6">
                        <FormControl.TextBox
                            name="txtRewardComputeTypeName"
                            colspan="8"
                            labelcolspan="4"
                            readOnly={false}
                            label="tên loại tính thưởng"
                            placeholder="Tên loại tính thưởng"
                            controltype="InputControl"
                            value=""
                            datasourcemember="RewardComputeTypeName"
                            validatonList={['required']}
                        />
                    </div>
                    <div className="col-md-6">
                        <FormControl.CheckBox
                            name="chkIsDefault"
                            colspan="8"
                            labelcolspan="4"
                            readOnly={false}
                            label="mặc định"
                            controltype="InputControl"
                            value=""
                            datasourcemember="IsDefault"
                            classNameCustom="customCheckbox"
                        />
                    </div>
                    <div className="col-md-6">
                        <FormControl.TextBox
                            name="txtOrderIndex"
                            colspan="8"
                            labelcolspan="4"
                            readOnly={false}
                            label="thứ tự hiển thị"
                            placeholder="Thứ tự hiển thị"
                            controltype="InputControl"
                            value=""
                            datasourcemember="OrderIndex"
                            validatonList={['number']}
                        />
                    </div>

                    <div className="col-md-12">
                        <FormControl.TextArea
                            labelcolspan={2}
                            colspan={10}
                            name="txtDescription"
                            label="mô tả"
                            placeholder="Mô tả"
                            datasourcemember="Description"
                            controltype="InputControl"
                            rows={6}
                            maxSize={500}
                            classNameCustom="customcontrol"
                        />
                    </div>

                    <div className="col-md-6">
                        <FormControl.CheckBox
                            name="chkIsActived"
                            colspan="8"
                            labelcolspan="4"
                            readOnly={false}
                            label="kích hoạt"
                            controltype="InputControl"
                            value={true}
                            datasourcemember="IsActived"
                            classNameCustom="customCheckbox"
                        />
                    </div>

                    <div className="col-md-6">
                        <FormControl.CheckBox
                            name="chkIsSystem"
                            colspan="8"
                            labelcolspan="4"
                            readOnly={false}
                            label="hệ thống"
                            controltype="InputControl"
                            value=""
                            datasourcemember="IsSystem"
                            classNameCustom="customCheckbox"
                        />
                    </div>
                </div>
            </FormContainer>
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
