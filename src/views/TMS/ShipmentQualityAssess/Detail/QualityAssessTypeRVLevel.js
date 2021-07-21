import React from "react";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';
import Select from 'react-select';

import { MessageModal } from "../../../../common/components/Modal";
import MyContext from './Context';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { APIHostName, optionsReviewSelect, APIUpdateReview } from './constants';
import MyModal from './MyModal';

class QualityAssessTypeRVLevelCom extends React.Component {
    static contextType = MyContext;

    constructor(props) {
        super(props);

        this.state = {
            stateQualityAssessTypeReviewLevel: null,
            stateTableData: [],
            stateReviewedNote: ""
        };

        this.notificationDOMRef = React.createRef();
        this.showMessage = this.showMessage.bind(this);
        this.addNotification = this.addNotification.bind(this);
        this.fetchMDQualityAssessTypeRLUser = this.fetchMDQualityAssessTypeRLUser.bind(this);
        this.handleSetTableData = this.handleSetTableData.bind(this);
        this.handleIsDisableSelect = this.handleIsDisableSelect.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.handleChangeReviewedNote = this.handleChangeReviewedNote.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
                    stateTableData: this.handleSetTableData(arrQualityAssessTypeReviewLevel)
                });
            } else {
                this.showMessage(apiResult.Message);
            }
        });
    }

    handleSetTableData(arrQualityAssessTypeReviewLevel) {
        const { contextShipmentQualityAssess } = this.context;

        const arrTableData = contextShipmentQualityAssess.lstShipmentQualityAssess_rvk.map(item => {
            const found = arrQualityAssessTypeReviewLevel.find(item1 => item1.ReviewLevelID == item.ReviewLevelID && item1.UserName == item.UserName);
            return {
                ...item,
                ReviewLevelName: found.ReviewLevelName,
                FullName: found.FullName
            }
        })

        return arrTableData;
    }

    handleIsDisableSelect(item) {
        const { stateTableData } = this.state;
        let boolFlag = false;

        if (item.UserName != this.props.AppInfo.LoginInfo.Username || item.IsReViewed) {
            boolFlag = true;
            return boolFlag;
        }

        for (let index = 0; index < stateTableData.length; index++) {
            const element = stateTableData[index];
            if (!element.IsReViewed && element.RevokeAssessReviewID != item.RevokeAssessReviewID) {
                boolFlag = true;
                break;
            } else if (element.RevokeAssessReviewID == item.RevokeAssessReviewID) {
                break;
            }
        }

        return boolFlag;
    }

    handleChangeSelect(value, name, itemReviewLevelName) {
        ModalManager.open(<MyModal text="Cập nhật mức duyệt"
            onRequestClose={() => true}
            handleSubmitModal={() => this.handleSubmit(value, name)}>
            <div className="form-row">
                <div className="form-group col-md-2">
                    <label className="col-form-label bold">Mức duyệt</label>
                </div>
                <div className="form-group col-md-10">
                    <label className="col-form-label">{itemReviewLevelName}</label>
                </div>
            </div>

            <div className="form-row">
                <div className="form-group col-md-2">
                    <label className="col-form-label bold">Nội dung </label>
                </div>
                <div className="form-group col-md-10">
                    <textarea className="form-control form-control-sm" maxLength={1950} rows="2" cols="50" name="Title" placeholder="Nội dung" onChange={this.handleChangeReviewedNote} />
                </div>
            </div>
        </MyModal>);
    }

    handleChangeReviewedNote(e) {
        const strValue = e.target.value;
        this.setState({
            stateReviewedNote: strValue
        })
    }

    handleSubmit(value, name) {
        const { stateReviewedNote, stateTableData } = this.state;
        const { contextShipmentQualityAssess } = this.context;

        const findReviewUser = stateTableData.findIndex(item => item.RevokeAssessReviewID == name.name);

        let postData = {};
        if (findReviewUser == stateTableData.length - 1) {
            postData = {
                ...contextShipmentQualityAssess,
                IsRevokeAssessReview: 1,
                RevokeAssessReviewUser: this.props.AppInfo.LoginInfo.Username,
                RevokeAssessReviewDate: new Date(),
                lstShipmentQualityAssess_rvk: [{
                    ...stateTableData[findReviewUser],
                    IsReViewed: true,
                    ReViewedDate: new Date(),
                    ReViewedNote: stateReviewedNote,
                    ReviewStatus: value.value
                }]
            }
        } else {
            postData = {
                ...contextShipmentQualityAssess,
                lstShipmentQualityAssess_rvk: [{
                    ...stateTableData[findReviewUser],
                    IsReViewed: true,
                    ReViewedDate: new Date(),
                    ReViewedNote: stateReviewedNote,
                    ReviewStatus: value.value
                }]
            }
        }

        console.log(postData)

        this.props.callFetchAPI(APIHostName, APIUpdateReview, postData).then(apiResult => {
            this.showMessage(apiResult.Message);
            if (!apiResult.IsError) {
                this.props.history.push("/ShipmentQualityAssess");
            }
        });
        ModalManager.close();
    }

    render() {
        const { stateQualityAssessTypeReviewLevel, stateTableData } = this.state;

        if (stateQualityAssessTypeReviewLevel == null) {
            return <React.Fragment></React.Fragment>
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
                                            <th className="jsgrid-header-cell">Duyệt</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            stateTableData.map(item => {
                                                return (
                                                    <tr key={item.RevokeAssessReviewID}>
                                                        <td>{item.ReviewLevelName}</td>
                                                        <td>{item.FullName}</td>
                                                        <td>
                                                            <Select
                                                                name={item.RevokeAssessReviewID}
                                                                options={optionsReviewSelect}
                                                                placeholder="Duyệt"
                                                                defaultValue={optionsReviewSelect[item.ReviewStatus - 1]}
                                                                isDisabled={this.handleIsDisableSelect(item)}
                                                                onChange={(value, name) => this.handleChangeSelect(value, name, item.ReviewLevelName)}
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
