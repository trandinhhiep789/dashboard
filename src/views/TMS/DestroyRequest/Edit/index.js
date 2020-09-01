import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import FormContainer from "../../../../common/components/FormContainer";
import { MessageModal } from "../../../../common/components/Modal";
import FormControl from "../../../../common/components/FormContainer/FormControl";
import {

    TitleFormEdit,
    EditPagePath,
    BackLink,
    MLObjectDefinition,
    LoadNewAPIPath,
    APIHostName,
    UpdateAPIPath

} from "../constants";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { callGetCache, callClearLocalCache } from "../../../../actions/cacheAction";


class EditCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.callLoadData = this.callLoadData.bind(this);

        this.state = {
            IsCallAPIError: false,
            IsCloseForm: false,
            DataSource: {},
            IsLoadDataComplete: false,
            IsSystem: false,
            IsExtended: false,
            IsLiquidated: false,
            IsDeposited: false
        };
    }

    componentDidMount() {
        this.props.updatePagePath(EditPagePath);
        this.callLoadData(this.props.match.params.id);
    }

    handleSubmit(formData, MLObject) {


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

    callLoadData(id) {

    }

    handleChange(formData, MLObject) {
        console.log('handleSubmit', formData, MLObject)
    }


    render() {


        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        if (this.state.IsLoadDataComplete) {
            return (
                <React.Fragment>
                    <FormContainer
                        FormName={TitleFormEdit}
                        MLObjectDefinition={MLObjectDefinition}
                        dataSource={this.state.DataSource}
                        listelement={[]}
                        BackLink={BackLink}
                        onSubmit={this.handleSubmit}
                        onchange={this.handleChange.bind(this)}
                    >
                    </FormContainer>

                    <div className="row">
                            <div className="col-md-6">
                                <FormControl.TextBox
                                    name="txtDestroyRequestID"
                                    colspan="8"
                                    labelcolspan="4"
                                    readOnly={false}
                                    label="mã yêu cầu"
                                    placeholder="Mã yêu cầu"
                                    controltype="InputControl"
                                    value=""
                                    datasourcemember="DestroyRequestID"
                                    validatonList={['required']}
                                />
                            </div>

                            <div className="col-md-6">
                                <FormControl.FormControlComboBox
                                    name="cboDestroyRequestType"
                                    colspan="8"
                                    labelcolspan="4"
                                    label="loại yêu cầu hủy vật tư"
                                    validatonList={["Comborequired"]}
                                    placeholder="-- Vui lòng chọn --"
                                    isautoloaditemfromcache={true}
                                    disabled={true}
                                    loaditemcachekeyid="ERPCOMMONCACHE.DESTROYREQUESTTYPE"
                                    valuemember="DestroyRequestTypeID"
                                    nameMember="DestroyRequestTypeName"
                                    controltype="InputControl"
                                    value={this.props.location.state.DestroyRequestTypeID}
                                    listoption={null}
                                    datasourcemember="DestroyRequestTypeID" />

                            </div>

                            <div className="col-md-12">
                                <FormControl.TextBox
                                    name="txtDestroyRequestTitle"
                                    labelcolspan={2}
                                    colspan={10}
                                    readOnly={false}
                                    label="tiêu đề"
                                    placeholder="Tiêu đề"
                                    controltype="InputControl"
                                    value=""
                                    datasourcemember="DestroyRequestTitle"
                                    validatonList={['required']}
                                    classNameCustom="customcontrol"
                                />
                            </div>

                            <div className="col-md-6">
                                <FormControl.FormControlComboBox
                                    name="cboRequestStore"
                                    colspan="8"
                                    labelcolspan="4"
                                    label="kho yêu cầu"
                                    disabled={true}
                                    validatonList={["Comborequired"]}
                                    placeholder="-- Vui lòng chọn --"
                                    isautoloaditemfromcache={true}
                                    loaditemcachekeyid="ERPCOMMONCACHE.USER_COOSTORE_BYUSER"
                                    valuemember="StoreID"
                                    nameMember="StoreName"
                                    controltype="InputControl"
                                    value={this.props.location.state.RequestStoreID}
                                    listoption={null}
                                    datasourcemember="RequestStoreID" />

                            </div>

                            <div className="col-md-6">

                                <FormControl.FormControlDatetimeNew
                                    name="dtRequestDate"
                                    colspan="8"
                                    labelcolspan="4"
                                    readOnly={true}
                                    showTime={false}
                                    timeFormat={false}
                                    dateFormat="DD-MM-YYYY"//"YYYY-MM-DD"
                                    label="Ngày yêu cầu"
                                    placeholder={formatDate(currentDate, true)}
                                    controltype="InputControl"
                                    value=""
                                    validatonList={["required"]}
                                    datasourcemember="RequestDate"
                                />
                            </div>

                            <div className="col-md-12">
                                <FormControl.TextArea
                                    labelcolspan={2}
                                    colspan={10}
                                    name="txtDescription"
                                    label="Mô tả"
                                    placeholder="Mô tả"
                                    datasourcemember="Description"
                                    controltype="InputControl"
                                    rows={6}
                                    maxSize={500}
                                    classNameCustom="customcontrol"
                                />
                            </div>
                        </div>
                </React.Fragment>
            )
    
        }
        return <label>Đang nạp dữ liệu...</label>;
        
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

const Edit = connect(mapStateToProps, mapDispatchToProps)(EditCom);
export default Edit;
