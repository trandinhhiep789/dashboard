import React from "react";
import { connect } from "react-redux";
import ReactNotification from "react-notifications-component";
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';

import { MessageModal } from "../../../../common/components/Modal";
import { PagePath, APIHostName, APIAdd, MLObjectDefinition, APIQualityAssessTypeLoad } from "./constants";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { callGetCache } from "../../../../actions/cacheAction";
import { showModal, hideModal } from '../../../../actions/modal';
import FormControl from "../../../../common/components/FormContainer/FormControl";
import { ERPCOMMONCACHE_QUALITYASSESSTYPE } from '../../../../constants/keyCache';
import FormContainer from "../../../../common/components/FormContainer";
import MyContext from './Context';
import QualityAssessTypeRVLevelCom from './QualityAssessTypeRVLevel';

class AddCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stateIsError: false,
            stateQualityAssessType: null,
            lstShipmentQualityAssess_rvk: []
        };

        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
        this.showMessage = this.showMessage.bind(this);
        this.addNotification = this.addNotification.bind(this);
        this.fetchListReviewLevel = this.fetchListReviewLevel.bind(this);
        this.handleSelectUser = this.handleSelectUser.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        this.fetchListReviewLevel();
    }

    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
            />
        );
    }

    addNotification(message, IsError) {
        let cssNotification, iconNotification;
        if (!IsError) {
            cssNotification = "notification-custom-success";
            iconNotification = "fa fa-check"
        } else {
            cssNotification = "notification-danger";
            iconNotification = "fa fa-exclamation"
        }
        this.notificationDOMRef.current.addNotification({
            container: "bottom-right",
            content: (
                <div className={cssNotification}>
                    <div className="notification-custom-icon">
                        <i className={iconNotification} />
                    </div>
                    <div className="notification-custom-content">
                        <div className="notification-close">
                            <span>×</span>
                        </div>
                        <h4 className="notification-title">Thông Báo</h4>
                        <p className="notification-message">{message}</p>
                    </div>
                </div>
            ),
            dismiss: { duration: 6000 },
            dismissable: { click: true }
        });
    }

    fetchListReviewLevel() {
        this.props.callFetchAPI(APIHostName, APIQualityAssessTypeLoad, this.props.location.state.QualityAssessTypeID).then(apiResult => {
            if (!apiResult.IsError) {
                this.setState({ stateQualityAssessType: apiResult.ResultObject });
            }
        });
    }

    handleSelectUser(arrSelectedUser) {
        this.setState({
            lstShipmentQualityAssess_rvk: arrSelectedUser
        })
    }

    handleSubmit(FormData, MLObject) {
        const { lstShipmentQualityAssess_rvk, stateQualityAssessType } = this.state;

        if (stateQualityAssessType.ListQualityAssessType_ReviewLevel.length != 0 && lstShipmentQualityAssess_rvk.length == 0) {
            this.showMessage("Vui lòng chọn nhân viên duyệt");
            return;
        }
        if (parseInt(MLObject.QualityAssessValue) < 4 || parseInt(MLObject.QualityAssessValue) > 10) {
            this.showMessage("Giá trị đánh giá nằm trong khoảng từ 4 đến 10");
            return;
        }

        MLObject.lstShipmentQualityAssess_rvk = lstShipmentQualityAssess_rvk;

        this.props.callFetchAPI(APIHostName, APIAdd, MLObject).then(apiResult => {
            this.showMessage(apiResult.Message);
            if (!apiResult.IsError) {
                this.props.history.push("/ShipmentQualityAssess");
            }
        });
    }

    render() {
        const { stateQualityAssessType } = this.state;

        if (stateQualityAssessType == null) {
            return <React.Fragment>...</React.Fragment>
        } else {
            return (
                <React.Fragment>
                    <FormContainer
                        FormName="Thêm tiêu chí đánh giá chất lượng"
                        MLObjectDefinition={MLObjectDefinition}
                        listelement={[]}
                        BackLink={"/ShipmentQualityAssess"}
                        onSubmit={this.handleSubmit}
                    >
                        <div className="row mb-4">
                            <div className="col-md-6 mb-2">
                                <FormControl.TextBox
                                    name="txtShipmentOrderID"
                                    labelcolspan="4"
                                    colspan="8"
                                    readOnly={false}
                                    label="mã yêu cầu vận chuyển"
                                    placeholder="mã yêu cầu vận chuyển"
                                    controltype="InputControl"
                                    value=""
                                    datasourcemember="ShipmentOrderID"
                                    validatonList={['required']}
                                    classNameCustom="customcontrol"
                                />
                            </div>

                            <div className="col-md-6 mb-2">
                                <FormControl.FormControlComboBox
                                    name="cboQualityAssessTypeID"
                                    colspan="8"
                                    labelcolspan="4"
                                    label="loại tiêu chí đánh giá chất lượng"
                                    placeholder="-- Vui lòng chọn --"
                                    isautoloaditemfromcache={true}
                                    disabled={true}
                                    loaditemcachekeyid={ERPCOMMONCACHE_QUALITYASSESSTYPE}
                                    valuemember="QualityAssessTypeID"
                                    nameMember="QualityAssessTypeName"
                                    controltype="InputControl"
                                    value={this.props.location.state.QualityAssessTypeID}
                                    listoption={null}
                                    datasourcemember="cboQualityAssessTypeID"
                                />
                            </div>
                        </div>

                        <div className="row mb-4">
                            <div className="col-md-6 mb-2">
                                <FormControl.TextBox
                                    name="txtQualityAssessValue"
                                    labelcolspan="4"
                                    colspan="8"
                                    readOnly={false}
                                    label="giá trị đánh giá"
                                    placeholder="Nằm trong khoảng từ 4 đến 10"
                                    controltype="InputControl"
                                    value=""
                                    datasourcemember="QualityAssessValue"
                                    validatonList={['required']}
                                    classNameCustom="customcontrol"
                                />
                            </div>

                            <div className="col-md-6 mb-2">
                                <FormControl.TextArea
                                    labelcolspan="4"
                                    colspan="8"
                                    name="txtQualityAssessNote"
                                    label="Ghi chú đánh giá"
                                    placeholder="Ghi chú đánh giá"
                                    datasourcemember="QualityAssessNote"
                                    controltype="InputControl"
                                    rows={6}
                                    maxSize={500}
                                    classNameCustom="customcontrol"
                                />
                            </div>
                        </div>

                        {
                            stateQualityAssessType.ListQualityAssessType_ReviewLevel.length != 0
                                ? <MyContext.Provider value={{ contextQualityAssessType: stateQualityAssessType, contextHandleSelectUser: this.handleSelectUser }}>
                                    <QualityAssessTypeRVLevelCom />
                                </MyContext.Provider>
                                : <React.Fragment></React.Fragment>
                        }
                    </FormContainer>
                </React.Fragment>
            );
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: (type, props) => {
            dispatch(hideModal(type, props));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCom);
