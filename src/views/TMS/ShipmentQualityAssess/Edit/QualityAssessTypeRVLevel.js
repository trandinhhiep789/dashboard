import React from "react";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';
import Select from 'react-select'

import { MessageModal } from "../../../../common/components/Modal";
import MyContext from './Context';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { APIHostName } from './constants';

class QualityAssessTypeRVLevelCom extends React.Component {
    static contextType = MyContext;

    constructor(props) {
        super(props);

        this.state = {
            stateQualityAssessTypeReviewLevel: null,
            stateDataTable: [],
            stateObjSelectedUsers: {}
        };

        this.notificationDOMRef = React.createRef();
        this.showMessage = this.showMessage.bind(this);
        this.addNotification = this.addNotification.bind(this);
        this.fetchMDQualityAssessTypeRLUser = this.fetchMDQualityAssessTypeRLUser.bind(this);
        this.handleSetDataTable = this.handleSetDataTable.bind(this);
        this.handleSetDefaultValue = this.handleSetDefaultValue.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.fetchMDQualityAssessTypeRLUser();
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

    handleSetDataTable(argumentData) {
        const { contextObjShipmentQualityAssess_rvk } = this.context;

        const arrDataTable = argumentData.reduce((acc, val) => {
            const foundIndex = acc.findIndex(element => element.ReviewLevelID == val.ReviewLevelID);
            if (foundIndex != -1) {
                acc[foundIndex] = {
                    ReviewLevelID: val.ReviewLevelID,
                    ReviewLevelName: val.ReviewLevelName,
                    options: [...acc[foundIndex].options, { value: val.UserName, label: val.FullName }]
                }
                return acc;
            } else {
                return [
                    ...acc,
                    {
                        ReviewLevelID: val.ReviewLevelID,
                        ReviewLevelName: val.ReviewLevelName,
                        options: [{ value: val.UserName, label: val.FullName }]
                    }
                ]
            }
        }, []);

        this.setState({
            stateObjSelectedUsers: contextObjShipmentQualityAssess_rvk
        })

        return arrDataTable;
    }

    handleSetDefaultValue(item) {
        const { contextObjShipmentQualityAssess_rvk } = this.context;
        const found = item.options.find(i => i.value == contextObjShipmentQualityAssess_rvk[item.ReviewLevelID]);
        return found;
    }

    handleChange(value, name) {
        const { stateQualityAssessTypeReviewLevel, stateObjSelectedUsers } = this.state;

        const tempObjSelectedUsers = { ...stateObjSelectedUsers, [name.name]: value.value };

        const arrSelectedUser = stateQualityAssessTypeReviewLevel.filter(item => item.UserName == tempObjSelectedUsers[item.ReviewLevelID]);

        this.setState({
            stateObjSelectedUsers: tempObjSelectedUsers
        })

        this.context.contextHandleSelectUser(arrSelectedUser, tempObjSelectedUsers);
    }

    fetchMDQualityAssessTypeRLUser() {
        const { contextShipmentQualityAssess } = this.context;

        const arrReviewLevelId = contextShipmentQualityAssess.lstShipmentQualityAssess_rvk.map(item => item.ReviewLevelID);
        const strReviewLevelIds = arrReviewLevelId.join();

        this.props.callFetchAPI(APIHostName, "api/QualityAssessType_ReviewLevel/LoadList", strReviewLevelIds).then(apiResult => {
            if (!apiResult.IsError) {
                const arrQualityAssessTypeReviewLevel = [...apiResult.ResultObject];
                arrQualityAssessTypeReviewLevel.sort((a, b) => a.ReviewLevelID - b.ReviewLevelID);
                this.setState({
                    stateQualityAssessTypeReviewLevel: arrQualityAssessTypeReviewLevel,
                    stateDataTable: this.handleSetDataTable(arrQualityAssessTypeReviewLevel)
                });
            } else {
                this.showMessage(apiResult.Message);
            }
        });
    }

    render() {
        const { stateQualityAssessTypeReviewLevel, stateDataTable } = this.state;

        if (stateQualityAssessTypeReviewLevel == null) {
            return <React.Fragment>...</React.Fragment>
        } else {
            return (
                <React.Fragment>
                    <div className="col-lg-12 SearchForm">
                        <div className="card">
                            <div className="card-title group-card-title">
                                <h4 className="title">Danh sách mức duyệt</h4>
                            </div>
                            <div className="card-body">
                                <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                    <thead className="thead-light">
                                        <tr>
                                            <th className="jsgrid-header-cell">Mức duyệt</th>
                                            <th className="jsgrid-header-cell">Người duyệt</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            stateDataTable.map(item => {
                                                return (
                                                    <tr key={item.ReviewLevelID}>
                                                        <td>{item.ReviewLevelName}</td>

                                                        <td>
                                                            <Select
                                                                name={item.ReviewLevelID}
                                                                options={item.options}
                                                                onChange={this.handleChange}
                                                                placeholder="Mã nhân viên"
                                                                defaultValue={this.handleSetDefaultValue(item)}
                                                                isDisabled={item.IsReViewed}
                                                            />
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
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
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(QualityAssessTypeRVLevelCom);
