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
            stateListQualityAssessType_ReviewLevel: [],
            stateTableData: [],
            stateReviewedNote: ""
        };

        this.notificationDOMRef = React.createRef();
        this.showMessage = this.showMessage.bind(this);
        this.addNotification = this.addNotification.bind(this);
        this.handleSetTableData = this.handleSetTableData.bind(this);
        this.handleIsDisableSelect = this.handleIsDisableSelect.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.handleChangeReviewedNote = this.handleChangeReviewedNote.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.handleSetTableData();
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

    handleSetTableData() {
        try {
            const { contextShipmentQualityAssess } = this.context;

            const { ListQualityAssessType_ReviewLevel } = contextShipmentQualityAssess.objQualityAssessType;

            const tableData = ListQualityAssessType_ReviewLevel.map(item => {
                const ListQualityAssessType_ReviewLevel_UserID = item.ListQualityAssessType_ReviewLevel_User ? item.ListQualityAssessType_ReviewLevel_User.map(item1 => item1.UserName) : [];

                const foundShipmentQualityAssess_rvk = contextShipmentQualityAssess.lstShipmentQualityAssess_rvk.find(item2 => item2.ReviewLevelID == item.ReviewLevelID);

                return {
                    ReviewLevelID: item.ReviewLevelID,
                    ReviewLevelName: item.ReviewLevelName,
                    ReviewOrderIndex: item.ReviewOrderIndex,
                    ListQualityAssessType_ReviewLevel_UserID,
                    ReviewStatus: foundShipmentQualityAssess_rvk == undefined ? 0 : foundShipmentQualityAssess_rvk.ReviewStatus,
                    IsReViewed: foundShipmentQualityAssess_rvk == undefined ? false : foundShipmentQualityAssess_rvk.IsReViewed
                }
            })

            this.setState({
                stateListQualityAssessType_ReviewLevel: ListQualityAssessType_ReviewLevel,
                stateTableData: tableData
            })

        } catch (error) {
            this.setState({
                stateListQualityAssessType_ReviewLevel: [],
                stateTableData: []
            })
        }
    }

    handleIsDisableSelect(index) {
        const { stateTableData } = this.state;
        let boolFlag = false;

        const foundUsername = stateTableData[index].ListQualityAssessType_ReviewLevel_UserID.find(item => item == this.props.AppInfo.LoginInfo.Username)

        if (!foundUsername || stateTableData[index].IsReViewed) {
            boolFlag = true;
            return boolFlag;
        }

        for (let i = 0; i < stateTableData.length; i++) {
            const element = stateTableData[i];
            if (!element.IsReViewed && element.ReviewLevelID != stateTableData[index].ReviewLevelID) {
                boolFlag = true;
                break;
            } else if (element.ReviewLevelID == stateTableData[index].ReviewLevelID) {
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

        const findReviewUser = stateTableData.findIndex(item => item.ReviewLevelID == name.name);

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

        this.props.callFetchAPI(APIHostName, APIUpdateReview, postData).then(apiResult => {
            this.showMessage(apiResult.Message);
            if (!apiResult.IsError) {
                this.context.conextPushHistory()
            }
        });
        ModalManager.close();
    }

    render() {
        const { stateTableData } = this.state;

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
                                        <th className="jsgrid-header-cell">Duyệt</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        stateTableData.map((item, index) => {
                                            return (
                                                <tr key={item.ReviewLevelID}>
                                                    <td>{item.ReviewLevelName}</td>
                                                    <td>
                                                        <Select
                                                            name={item.ReviewLevelID}
                                                            options={optionsReviewSelect}
                                                            placeholder="Duyệt"
                                                            defaultValue={optionsReviewSelect[item.ReviewStatus - 1]}
                                                            isDisabled={this.handleIsDisableSelect(index)}
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
