import React from "react";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';
import { DatePicker } from 'antd';
import moment from 'moment';

import { MessageModal } from "../../../../../common/components/Modal";
import { PagePath, APIHostName, APIAdd } from "./constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import { callGetCache } from "../../../../../actions/cacheAction";
import { showModal, hideModal } from '../../../../../actions/modal';
import FormContainer from "../../../../../common/components/FormContainer";
import SelectUserCom from './SelectUser';
import MyContext from './Context';

class AddCom extends React.Component {
    static contextType = MyContext;
    constructor(props) {
        super(props);

        this.state = {
            stateIsError: false,
            stateSelectedUser: null,
            stateDate: {
                FromDate: null,
                ToDate: null
            },
            stateNote: ""
        };

        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
        this.handleUserSelect = this.handleUserSelect.bind(this);
        this.handleChangeNote = this.handleChangeNote.bind(this);
        this.handleChangeFromDate = this.handleChangeFromDate.bind(this);
        this.disableFromDate = this.disableFromDate.bind(this);
        this.handleChangeToDate = this.handleChangeToDate.bind(this);
        this.disableToDate = this.disableToDate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
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

    handleUserSelect(data) {
        this.setState({
            stateSelectedUser: data
        })
    }

    handleChangeNote(event) {
        this.setState({ stateNote: event.target.value });
    }

    handleChangeFromDate(dateMoment, dateString) {
        this.setState({
            stateDate: {
                ...this.state.stateDate,
                FromDate: dateMoment,
            }
        })
    }

    handleChangeToDate(dateMoment, dateString) {
        this.setState({
            stateDate: {
                ...this.state.stateDate,
                ToDate: dateMoment
            }
        })
    }

    disableFromDate(current) {
        return current > moment().startOf('year').add(2, 'y') || current < moment().startOf('year');
    }

    disableToDate(current) {
        return current > moment().startOf('year').add(2, 'y') || current < moment().startOf('year');
    }

    handleSubmit() {
        const { stateSelectedUser, stateDate, stateNote } = this.state;
        if (!stateSelectedUser) {
            this.showMessage("Vui lòng chọn mã nhân viên");
            return;
        }
        if (stateDate.FromDate == null || stateDate.ToDate == null) {
            this.showMessage("Vui lòng chọn khoảng thời gian nhân viên được phụ cấp xăng");
            return;
        }
        if (stateDate.ToDate < stateDate.FromDate) {
            this.showMessage("Nhập sai khoảng thời gian");
            return;
        }
        if (stateNote == "") {
            this.showMessage("Vui lòng điền nội dung ghi chú");
            return;
        }

        const postData = {
            ...stateSelectedUser,
            FromDate: stateDate.FromDate,
            ToDate: stateDate.ToDate,
            Note: stateNote
        };

        this.props.callFetchAPI(APIHostName, APIAdd, postData).then(apiResult => {
            if (!apiResult.IsError) {
                this.showMessage(apiResult.Message);
                this.props.history.push("/FuelSubsIDizePeriod");
            } else {
                this.showMessage(apiResult.Message);
            }
        });
    }

    render() {
        return (
            <React.Fragment>
                <FormContainer
                    FormName={"Thêm khoảng thời gian nhân viên được phụ cấp xăng"}
                    MLObjectDefinition={[]}
                    listelement={[]}
                    BackLink={"/FuelSubsIDizePeriod"}
                    onSubmit={this.handleSubmit}
                >
                    <div className="row mb-4">
                        <div className="col-md-6">
                            <MyContext.Provider value={{ handleSelectUser: this.handleUserSelect }}>
                                <SelectUserCom />
                            </MyContext.Provider>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-3 d-flex align-items-center">
                                    <span>Khoảng thời gian nhân viên được phụ cấp xăng</span>
                                </div>
                                <div className="col-md-9 d-flex justify-content-between align-items-center">
                                    <span>Từ</span>
                                    <DatePicker onChange={this.handleChangeFromDate} size="large" disabledDate={this.disableFromDate} format={'DD/MM/YYYY'} placeholder="Từ ngày" />
                                    <span>đến</span>
                                    <DatePicker onChange={this.handleChangeToDate} size="large" disabledDate={this.disableToDate} format={'DD/MM/YYYY'} placeholder="Đến ngày" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-3 d-flex align-items-center">
                                    <span>Ghi chú</span>
                                </div>
                                <div className="col-md-9 d-flex align-items-center">
                                    <textarea className="form-control form-control-sm" rows={3} value={this.state.stateNote} onChange={this.handleChangeNote} />
                                </div>
                            </div>
                        </div>
                    </div>
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: (type, props) => {
            dispatch(hideModal(type, props));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCom);
