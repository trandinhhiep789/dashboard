import React from "react";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import { Link } from 'react-router'

import { MessageModal } from "../../../../common/components/Modal";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { callGetCache, callClearLocalCache } from "../../../../actions/cacheAction";
import { formatDate } from "../../../../common/library/CommonLib.js";
import { showModal, hideModal } from '../../../../actions/modal';
import { STAFFTRANSFERTYPE_ADD } from "../../../../constants/functionLists";
import { ERPCOMMONCACHE_STAFFTRANSFERTYPE } from "../../../../constants/keyCache";
import { AddPagePath, APIHostName, APILoadInfo, MLObjectDefinition, BackLink, APIAdd } from './constants';

import FormControl from "../../../../common/components/FormContainer/FormControl";
import StaffTransferType_rvLevelCom from './StaffTransferType_rvLevel';
import StaffTransferDetailCom from './StaffTransferDetail';
import MyContext from './Context';
import FormContainer from "../../../../common/components/FormContainer";


class AddCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            StaffTransferData: null,
            StaffTransferDetailData: [],
            StaffTransferType_rvLevelData: []
        }

        this.fetchStaffTransferType_rvLevelData = this.fetchStaffTransferType_rvLevelData.bind(this);
        this.showMessage = this.showMessage.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddStaffTransferDetailData = this.handleAddStaffTransferDetailData.bind(this);
        this.handleDelStaffTransferDetailData = this.handleDelStaffTransferDetailData.bind(this);
        this.handelStaffTransferType_rvLevelData = this.handelStaffTransferType_rvLevelData.bind(this);
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

    handleSubmit(formData, MLObject) {
        const { StaffTransferTypeID, RequestStoreID } = this.props.location.state;
        const { StaffTransferData, StaffTransferDetailData, StaffTransferType_rvLevelData } = this.state;

        if (StaffTransferDetailData.length == 0) {
            this.showMessage("Danh sách nhân viên thuyên chuyển không được để trống");
            return;
        }

        if (StaffTransferData.IsAutoReview == false && StaffTransferType_rvLevelData.length == 0) {
            this.showMessage(`Danh sách mức duyệt trống, vui lòng khai báo mức duyệt. Mã loại yêu cầu thuyên chuyển: ${StaffTransferTypeID}`);
            return;
        }

        const postData = {
            ...MLObject,
            StaffTransferTypeID,
            RequestStoreID,
            RequestDate: new Date(),
            RequestUser: this.props.AppInfo.LoginInfo.Username,
            IsReviewed: StaffTransferData.IsAutoReview,
            ReviewedDate: StaffTransferData.IsAutoReview == true ? new Date() : "",
            IsTransfered: StaffTransferData.IsAutoTransfer,
            TransferedDate: StaffTransferData.IsAutoTransfer == true ? new Date() : "",
            IsSystem: StaffTransferData.IsSystem,
            CreatedUser: this.props.AppInfo.LoginInfo.Username,
            ListStaffTransferDetail: StaffTransferDetailData,
            ListStaffTransferType_rvLevel: StaffTransferType_rvLevelData
        };

        this.props.callFetchAPI(APIHostName, APIAdd, postData).then(apiResult => {
            if (apiResult.IsError) {
                this.showMessage(apiResult.MessageDetail);
            } else {
                this.showMessage(apiResult.MessageDetail);
                this.props.history.push("/StaffTransfer");
            }
        });
    }

    handleAddStaffTransferDetailData(data) {
        this.setState({
            StaffTransferDetailData: [
                ...this.state.StaffTransferDetailData,
                ...data
            ]
        })
    }

    handleDelStaffTransferDetailData(data) {
        this.setState({
            StaffTransferDetailData: data
        })
    }

    handelStaffTransferType_rvLevelData(data) {
        this.setState({
            StaffTransferType_rvLevelData: data
        })
    }

    render() {
        const { StaffTransferData, StaffTransferDetailData } = this.state;

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
                            <div className="col-md-6 mb-2">
                                <FormControl.FormControlComboBox
                                    name="cboStaffTransferTypeID"
                                    colspan="8"
                                    labelcolspan="4"
                                    label="loại hình thuyên chuyển nhân viên"
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
                            <div className="col-md-6 mb-2">
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
                                    datasourcemember="RequestDate"
                                />
                            </div>
                            <div className="col-md-6">
                                <FormControl.CheckBox
                                    colspan="8"
                                    labelcolspan="4"
                                    label="Tự động duyệt"
                                    name="cbIsAutoReview"
                                    value={StaffTransferData.IsAutoReview}
                                    disabled={true}
                                />
                            </div>
                            <div className="col-md-6">
                                <FormControl.CheckBox
                                    colspan="8"
                                    labelcolspan="4"
                                    label="Tự động thuyên chuyển"
                                    name="cbIsAutoTransfer"
                                    value={StaffTransferData.IsAutoTransfer}
                                    disabled={true}
                                />
                            </div>
                            <div className="col-md-12">
                                <FormControl.FormControlComboBox
                                    name="cboRequestStore"
                                    colspan="10"
                                    labelcolspan="2"
                                    label="kho yêu cầu"
                                    disabled={true}
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

                        <MyContext.Provider
                            value={{
                                StaffTransferDetail: StaffTransferDetailData,
                                handleAddStaffTransferDetailData: this.handleAddStaffTransferDetailData,
                                handleDelStaffTransferDetailData: this.handleDelStaffTransferDetailData
                            }}
                        >
                            <div className="mb-4">
                                <StaffTransferDetailCom />
                            </div>
                        </MyContext.Provider>

                        {
                            StaffTransferData.IsAutoReview
                                ? <React.Fragment></React.Fragment>
                                : <MyContext.Provider
                                    value={{
                                        StaffTransferData,
                                        handelStaffTransferType_rvLevelData: this.handelStaffTransferType_rvLevelData
                                    }}
                                >
                                    <div className="mb-4">
                                        <StaffTransferType_rvLevelCom />
                                    </div>
                                </MyContext.Provider>
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