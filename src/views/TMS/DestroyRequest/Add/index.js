import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import FormContainer from "../../../../common/components/FormContainer";
// import FormContainer from "../../../../common/components/Form/AdvanceForm/FormContainer";
import { MessageModal } from "../../../../common/components/Modal";
import FormControl from "../../../../common/components/FormContainer/FormControl";
import InputGrid from "../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
import {
    APIHostName,
    AddAPIPath,
    AddElementList,
    MLObjectDefinition,
    BackLink,
    AddPagePath,
    TitleFormAdd,
    GridMLObjectDefinition,
    InputDestroyRequestDetailColumnList

} from "../constants";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { CACHE_OBJECT_STORENAME } from "../../../../constants/systemVars.js";
import { callGetCache, callClearLocalCache } from "../../../../actions/cacheAction";
import { formatDate, formatDateNew } from "../../../../common/library/CommonLib.js";
import { showModal, hideModal } from '../../../../actions/modal';

class AddCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.state = {
            IsCallAPIError: false,
            IsCloseForm: false,
            DataSource: {},
            IsExtended: false,
            IsLiquidated: false,
            IsDeposited: false,
            DestroyRequestDetail: [],
            DestroyRequestTypeID: ''
        };
    }

    componentDidMount() {
        console.log("add", this.props, this.props.location.state.DestroyRequestTypeID)
        this.setState({
            DestroyRequestTypeID: this.props.location.state.DestroyRequestTypeID
        })
        this.props.hideModal()
        this.props.updatePagePath(AddPagePath);
    }

    componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps)
        if (JSON.stringify(this.props.location.state.DestroyRequestTypeID) !== JSON.stringify(nextProps.location.state.DestroyRequestTypeID)) {
            this.setState({
                DestroyRequestTypeID: nextProps.location.state.DestroyRequestTypeID
            })
        }
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

    valueChangeInputGrid(elementdata, index, name, gridFormValidation) {
        console.log("valueChangeInputGrid", elementdata, index, name, gridFormValidation)
    }

    render() {
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        let currentDate = new Date();

        const DestroyRequestDetail = [
            {
                LanguageID: 1,
                LanguageName: "English"
            },
            {
                LanguageID: 2,
                LanguageName: "Khmer"
            }
        ]
        return (
            <React.Fragment>
                <FormContainer
                    FormName={TitleFormAdd}
                    MLObjectDefinition={MLObjectDefinition}
                    listelement={[]}
                    BackLink={BackLink}
                    onSubmit={this.handleSubmit}

                >

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
                            <FormControl.ComboBoxSelect
                                name="cboDESTROYREQUESTTYPEID"
                                colspan="8"
                                labelcolspan="4"
                                label="loại yêu cầu hủy vật tư"
                                validatonList={["Comborequired"]}
                                placeholder="-- Vui lòng chọn --"
                                isautoloaditemfromcache={true}
                                loaditemcachekeyid="ERPCOMMONCACHE.DESTROYREQUESTTYPE"
                                valuemember="DestroyRequestTypeID"
                                nameMember="DestroyRequestTypeName"
                                controltype="InputControl"
                                value={this.props.location.state.DestroyRequestTypeID}
                                listoption={null}
                                datasourcemember="DESTROYREQUESTTYPEID" />

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
                            <FormControl.ComboBoxSelect
                                name="cboRequestStoreID"
                                colspan="8"
                                labelcolspan="4"
                                label="kho yêu cầu"
                                validatonList={["Comborequired"]}
                                placeholder="-- Vui lòng chọn --"
                                isautoloaditemfromcache={true}
                                loaditemcachekeyid="ERPCOMMONCACHE.SERVICEAGREEMENTTYPE"
                                valuemember="ServiceAgreementTypeID"
                                nameMember="ServiceAgreementTypeName"
                                controltype="InputControl"
                                value={""}
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

                    <InputGrid
                        name="DestroyRequestDetail"
                        controltype="InputControl"
                        listColumn={InputDestroyRequestDetailColumnList}
                        dataSource={DestroyRequestDetail}
                        isHideHeaderToolbar={true}
                        MLObjectDefinition={GridMLObjectDefinition}
                        colspan="12"
                        onValueChangeInputGrid={this.valueChangeInputGrid}
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
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: (type, props) => {
            dispatch(hideModal(type, props));
        }
    };
};

const Add = connect(mapStateToProps, mapDispatchToProps)(AddCom);
export default Add;
