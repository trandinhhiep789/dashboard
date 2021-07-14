import React from "react";
import { connect } from "react-redux";
import ReactNotification from "react-notifications-component";
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';
import { DatePicker } from 'antd';
import moment from 'moment';

import SearchForm from "../../../../../common/components/FormContainer/SearchForm";
import { MessageModal } from "../../../../../common/components/Modal";
import DataGrid from "../../../../../common/components/DataGrid";
import { PagePath, APIHostName, APIAdd, dtFromDate } from "./constants";
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
            stateDates: [moment(dtFromDate, 'DD/MM/YYYY'), moment(new Date(), 'DD/MM/YYYY')],
            stateNote: ""
        };

        this.gridref = React.createRef();
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
        this.handleUserSelect = this.handleUserSelect.bind(this);
        this.handleChangeRangePicker = this.handleChangeRangePicker.bind(this);
        this.handleChangeNote = this.handleChangeNote.bind(this);
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

    handleChangeRangePicker(dates, dateStrings) {
        this.setState({
            stateDates: dates
        })
    }

    handleChangeNote(event) {
        this.setState({ stateNote: event.target.value });
    }

    handleSubmit() {
        const { stateSelectedUser, stateDates, stateNote } = this.state;
        if (!stateSelectedUser) {
            this.showMessage("Vui lòng chọn mã nhân viên");
            return;
        }
        if (stateNote == "") {
            this.showMessage("Vui lòng điền nội dung ghi chú");
            return;
        }

        const postData = {
            ...stateSelectedUser,
            FromDate: stateDates[0],
            ToDate: stateDates[1],
            Note: stateNote
        };
        console.log(postData)
        // return
        this.props.callFetchAPI(APIHostName, APIAdd, postData).then(apiResult => {
            this.showMessage(apiResult.Message);
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
                                <div className="col-md-9 d-flex align-items-center">
                                    <DatePicker.RangePicker
                                        // defaultValue={[moment(dtFromDate, 'DD/MM/YYYY'), moment(new Date(), 'DD/MM/YYYY')]}
                                        value={this.state.stateDates}
                                        format={'DD/MM/YYYY'}
                                        size="large"
                                        style={{ width: "100%" }}
                                        placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
                                        onChange={this.handleChangeRangePicker}
                                    />
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
