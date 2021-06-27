import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import FormContainer from "../../../../common/components/FormContainer";
import { MessageModal } from "../../../../common/components/Modal";
import FormControl from "../../../../common/components/FormContainer/FormControl";


import Select from 'react-select';

import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { callGetCache, callClearLocalCache } from "../../../../actions/cacheAction";
import { formatDate, formatDateNew } from "../../../../common/library/CommonLib.js";
import { showModal, hideModal } from '../../../../actions/modal';
import { STAFFTRANSFERTYPE_ADD } from "../../../../constants/functionLists";
import { AddPagePath, APIHostName, APILoadInfo, MLObjectDefinition, BackLink } from './constants'
import StaffTransferType_rvLevelCom from './StaffTransferType_rvLevel'

class AddCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            StaffTransferData: null
        }

        this.fetchStaffTransferType_rvLevelData = this.fetchStaffTransferType_rvLevelData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeStaffTransferType_rvLevel = this.handleChangeStaffTransferType_rvLevel.bind(this);
    }

    componentDidMount() {
        const { StaffTransferTypeID, RequestStoreID } = this.props.location.state;

        this.fetchStaffTransferType_rvLevelData({ StaffTransferTypeID, RequestStoreID });
        this.props.hideModal()
        this.props.updatePagePath(AddPagePath);
    }

    fetchStaffTransferType_rvLevelData(postData) {
        this.props.callFetchAPI(APIHostName, APILoadInfo, postData).then(apiResult => {
            if (apiResult.IsError) {
                this.showMessage(apiResult.Message);
            } else {
                this.setState({
                    StaffTransferData: apiResult.ResultObject
                })
            }
        })
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

    handleChangeStaffTransferType_rvLevel(name, value) {
        this.setState({
            [name]: value
        })
    }

    handleSubmit(formData, MLObject) {
        console.log("🚀 ~ file: index.js ~ line 65 ~ AddCom ~ handleSubmit ~ formData, MLObject", formData, MLObject)
        const { StaffTransferData } = this.state;

        const arrStaffTransferType_rvLevel = StaffTransferData.ListStaffTransferType_rvLevel.filter(item => item.UserName == this.state[item.ReviewLevelID]);

        console.log(arrStaffTransferType_rvLevel)
    }

    render() {
        const { StaffTransferData } = this.state;

        if (StaffTransferData == null) {
            return (
                <React.Fragment>
                    Đang tải dữ liệu ...
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <FormContainer
                        FormName={"Thêm yêu cầu thuyên chuyển"}
                        MLObjectDefinition={MLObjectDefinition}
                        listelement={[]}
                        BackLink={BackLink}
                        onSubmit={this.handleSubmit}
                    >
                        <div className="row mb-4">
                            <div className="col-md-6">
                                <FormControl.FormControlComboBox
                                    name="cboStaffTransferTypeID"
                                    colspan="8"
                                    labelcolspan="4"
                                    label="loại hình thuyên chuyển nhân viên"
                                    validatonList={["Comborequired"]}
                                    placeholder="-- Vui lòng chọn --"
                                    isautoloaditemfromcache={true}
                                    disabled={true}
                                    loaditemcachekeyid="ERPCOMMONCACHE.STAFFTRANSFERTYPE"
                                    valuemember="StaffTransferTypeID"
                                    nameMember="StaffTransferTypeName"
                                    controltype="InputControl"
                                    value={this.props.location.state.StaffTransferTypeID}
                                    listoption={null}
                                    datasourcemember="cboStaffTransferTypeID"
                                />
                            </div>
                            <div className="col-md-6">
                                <FormControl.FormControlDatetimeNew
                                    name="dtRequestDate"
                                    colspan="8"
                                    labelcolspan="4"
                                    readOnly={true}
                                    disabled={true}
                                    showTime={false}
                                    timeFormat={false}
                                    dateFormat="DD-MM-YYYY"
                                    label="Ngày yêu cầu"
                                    placeholder={formatDate(new Date(), true)}
                                    controltype="InputControl"
                                    value={new Date()}
                                    validatonList={["required"]}
                                    datasourcemember="RequestDate"
                                />
                            </div>
                            <div className="col-md-12">
                                <FormControl.FormControlComboBox
                                    name="cboRequestStore"
                                    colspan="10"
                                    labelcolspan="2"
                                    label="kho yêu cầu"
                                    disabled={true}
                                    validatonList={["Comborequired"]}
                                    placeholder="-- Vui lòng chọn --"
                                    isautoloaditemfromcache={true}
                                    isusercache={true}
                                    loaditemcachekeyid="ERPCOMMONCACHE.USER_COOSTORE_BYUSER"
                                    valuemember="StoreID"
                                    nameMember="StoreName"
                                    controltype="InputControl"
                                    value={this.props.location.state.RequestStoreID}
                                    listoption={null}
                                    datasourcemember="RequestStoreID"
                                    classNameCustom="customcontrol"
                                />
                            </div>
                            <div className="col-md-12">
                                <FormControl.TextBox
                                    name="txtStaffTransferTitle"
                                    labelcolspan={2}
                                    colspan={10}
                                    readOnly={false}
                                    label="tiêu đề"
                                    placeholder="Tiêu đề"
                                    controltype="InputControl"
                                    value=""
                                    datasourcemember="StaffTransferTitle"
                                    validatonList={['required']}
                                    classNameCustom="customcontrol"
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

                        {
                            (StaffTransferData.ListStaffTransferType_rvLevel != null && StaffTransferData.ListStaffTransferType_rvLevel[0].IsAutoReview_StaffTransferType == false)
                                ? <div className="row">
                                    <StaffTransferType_rvLevelCom
                                        dataSource={StaffTransferData.ListStaffTransferType_rvLevel}
                                        onChangeSelect={this.handleChangeStaffTransferType_rvLevel}
                                    />
                                </div>
                                : <React.Fragment></React.Fragment>
                        }
                    </FormContainer>
                </React.Fragment>
            )
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(AddCom);