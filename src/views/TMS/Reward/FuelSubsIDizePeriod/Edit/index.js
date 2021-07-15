import React from "react";
import { connect } from "react-redux";
import ReactNotification from "react-notifications-component";
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';
import { DatePicker } from 'antd';
import moment from 'moment';

import { MessageModal } from "../../../../../common/components/Modal";
import { PagePath, APIHostName, APILoadInfo, APIUpdate } from "./constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callGetCache } from "../../../../../actions/cacheAction";
import { showModal, hideModal } from '../../../../../actions/modal';
import FormContainer from "../../../../../common/components/FormContainer";
import FormControl from "../../../../../common/components/FormContainer/FormControl";

class EditCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stateIsError: false,
            stateDataSource: null,
            stateDates: [],
            stateNote: ""
        };

        this.textareaNoteRef = React.createRef();
        this.notificationDOMRef = React.createRef();
        this.fetchLoadInfo = this.fetchLoadInfo.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeRangePicker = this.handleChangeRangePicker.bind(this);
        this.handleChangeNote = this.handleChangeNote.bind(this);
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        this.fetchLoadInfo(this.props.match.params.id);
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

    fetchLoadInfo(strFuelSubsidizePeriodID) {
        this.props.callFetchAPI(APIHostName, APILoadInfo, strFuelSubsidizePeriodID).then(apiResult => {
            this.setState({
                stateDataSource: {
                    ...apiResult.ResultObject,
                    UserIDName: `${apiResult.ResultObject.UserName} - ${apiResult.ResultObject.UserFullName}`,
                    CreatedUserIDName: `${apiResult.ResultObject.CreatedUser} - ${apiResult.ResultObject.CreatedUserFullName}`
                },
                stateDates: [moment(new Date(apiResult.ResultObject.FromDate), 'DD/MM/YYYY'), moment(new Date(apiResult.ResultObject.ToDate), 'DD/MM/YYYY')],
                stateNote: apiResult.ResultObject.Note
            })
        });
    }

    handleChangeRangePicker(dates, dateStrings) {
        this.setState({
            stateDates: dates
        })
    }

    handleChangeNote(event) {
        this.textareaNoteRef.current.style.borderColor = "";
        this.setState({ stateNote: event.target.value });
    }

    handleSubmit() {
        const { stateDataSource, stateDates, stateNote } = this.state;

        if (stateNote == "") {
            this.textareaNoteRef.current.focus();
            this.textareaNoteRef.current.style.borderColor = "red";
            return;
        }

        const postData = {
            FuelSubsidizePeriodID: stateDataSource.FuelSubsidizePeriodID,
            UserName: stateDataSource.UserName,
            FromDate: stateDates[0],
            ToDate: stateDates[1],
            Note: stateNote
        };

        this.props.callFetchAPI(APIHostName, APIUpdate, postData).then(apiResult => {
            if (!apiResult.IsError) {
                this.showMessage(apiResult.Message);
                this.props.history.push("/FuelSubsIDizePeriod");
            } else {
                this.showMessage(apiResult.Message);
            }
        });
    }

    render() {
        const { stateDataSource, stateDates, stateNote } = this.state;
        if (stateDataSource == null) {
            return <React.Fragment>...</React.Fragment>
        } else {
            return (
                <React.Fragment>
                    <ReactNotification ref={this.notificationDOMRef} />

                    <FormContainer
                        FormName={"Chỉnh sửa khoảng thời gian nhân viên được phụ cấp xăng"}
                        MLObjectDefinition={[]}
                        listelement={[]}
                        BackLink={"/FuelSubsIDizePeriod"}
                        onSubmit={this.handleSubmit}
                        RequirePermission={""}
                        // IsDisabledSubmitForm={false}
                        dataSource={stateDataSource}
                    >
                        <div className="row mb-4">
                            <div className="col-md-6">
                                <FormControl.TextBox
                                    name="txtUserIDName"
                                    colspan="8"
                                    labelcolspan="4"
                                    readOnly={true}
                                    label="mã nhân viên"
                                    placeholder="Mã nhân viên"
                                    controltype="InputControl"
                                    value=""
                                    datasourcemember="UserIDName"
                                    validatonList={[]}
                                />
                            </div>

                            <div className="col-md-6">
                                <FormControl.TextBox
                                    name="txtCreatedUserIDName"
                                    colspan="8"
                                    labelcolspan="4"
                                    readOnly={true}
                                    label="nhân viên tạo"
                                    placeholder="Nhân viên tạo"
                                    controltype="InputControl"
                                    value=""
                                    datasourcemember="CreatedUserIDName"
                                    validatonList={[]}
                                />
                            </div>
                        </div>

                        <div className="row mb-4">
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-4 d-flex align-items-center">
                                        <span>Khoảng thời gian nhân viên được phụ cấp xăng</span>
                                    </div>
                                    <div className="col-md-8 d-flex align-items-center">
                                        <DatePicker.RangePicker
                                            value={stateDates}
                                            format={'DD/MM/YYYY'}
                                            size="large"
                                            style={{ width: "100%" }}
                                            placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
                                            onChange={this.handleChangeRangePicker}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <FormControl.FormControlDatetime
                                    colspan="8"
                                    labelcolspan="4"
                                    label="ngày tạo"
                                    placeholder="Ngày tạo"
                                    value={stateDataSource.CreatedDate}
                                    disabled={true}
                                    dateFormat='DD/MM/YYYY'
                                />
                            </div>
                        </div>

                        <div className="row mb-4">
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-4 d-flex align-items-center">
                                        <span>Ghi chú</span>
                                    </div>
                                    <div className="col-md-8 d-flex align-items-center">
                                        <textarea className="form-control form-control-sm" ref={this.textareaNoteRef} rows={3} value={stateNote} onChange={this.handleChangeNote} />
                                    </div>
                                </div>
                            </div>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditCom);
