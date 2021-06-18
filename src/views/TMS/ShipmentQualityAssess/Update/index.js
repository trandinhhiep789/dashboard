import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ModalManager } from "react-dynamic-modal";
import Select from 'react-select';

import ReactContext from '../ReactContext'
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import {
    APIHostName, APIQualityAssessTypeSRH, APICommentSRH,
    APICommentAdd, APIQualityAssessType_RVLevelLoad, APIShipmentQualityAssessRvkLoadNew,
    APIAddQualityAssessAndRVK,
    MLObjectDefinitionEdit, arrOptReviewStatus
} from "../constants";
import { MessageModal } from "../../../../common/components/Modal";
import FormContainer from "../../../../common/components/FormContainer";
import FormControl from "../../../../common/components/FormContainer/FormControl";
import Comment from "../../../../common/components/Comment";
import { hideModal } from '../../../../actions/modal';

export class Update extends Component {
    constructor(props) {
        super(props);

        this.state = {
            arrFetchQualityAssessType: null,
            arrOptQualityAssessType: [{ value: -1, label: "" }],
            objValueQualityAssessType: {},
            arrFetchComment: null,
            arrFetchQualityAssessType_RVLevel: null,
            arrOptQualityAssessType_RVLevel: [],
            arrFetchShipmentQualityAssess_RVK: null
        }

        this.fetchArrQualityAssessType = this.fetchArrQualityAssessType.bind(this);
        this.fetchArrComment = this.fetchArrComment.bind(this);
        this.fetchArrQualityAssessType_RVLevel = this.fetchArrQualityAssessType_RVLevel.bind(this);

        this.handleArrQualityAssessType_RVLevel = this.handleArrQualityAssessType_RVLevel.bind(this);
        this.handleEnterComment = this.handleEnterComment.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.handleChangeReviewStatus = this.handleChangeReviewStatus.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        this.handleValueReviewStatus = this.handleValueReviewStatus.bind(this);
        this.handleValueReviewUser = this.handleValueReviewUser.bind(this);
    }

    componentDidMount() {
        this.fetchArrQualityAssessType();
        this.fetchArrComment();
        this.fetchArrQualityAssessType_RVLevel();
        this.fetchArrShipmentQualityAssess_RVK();
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

    fetchArrQualityAssessType() {
        const { dataSource } = this.props;
        const arrPost = [
            {
                SearchKey: "@Keyword",
                SearchValue: ""
            }
        ]

        this.props.callFetchAPI(APIHostName, APIQualityAssessTypeSRH, arrPost).then(apiResult => {
            if (!apiResult.IsError) {
                const arrMapQualityAssessType = apiResult.ResultObject.map(item => {
                    return {
                        value: item.QualityAssessTypeID,
                        label: `${item.QualityAssessTypeID} - ${item.QualityAssessTypeName}`
                    }
                });

                const objValueQualityAssessType = arrMapQualityAssessType.find(item => item.value == dataSource.QualityAssessTypeID);

                this.setState({
                    arrFetchQualityAssessType: apiResult.ResultObject,
                    arrOptQualityAssessType: arrMapQualityAssessType,
                    objValueQualityAssessType
                })
            } else {
                this.showMessage(apiResult.Message);
            }
        });
    }

    fetchArrComment() {
        const { dataSource } = this.props;

        const arrPost = [
            {
                SearchKey: "@Keyword",
                SearchValue: ""
            },
            {
                SearchKey: "@SHIPMENTQUALITYASSESSID",
                SearchValue: dataSource.ShipmentQualityAssessID
            }
        ]

        this.props.callFetchAPI(APIHostName, APICommentSRH, arrPost).then(apiResult => {
            if (!apiResult.IsError) {
                this.setState({
                    arrFetchComment: apiResult.ResultObject
                })
            } else {
                this.showMessage(apiResult.Message);
            }
        });
    }

    fetchArrQualityAssessType_RVLevel() {
        const { dataSource } = this.props;
        try {
            const postData = [
                {
                    SearchKey: "@QUALITYASSESSTYPEID",
                    SearchValue: dataSource.QualityAssessTypeID
                    // SearchValue: 2
                }
            ]

            this.props.callFetchAPI(APIHostName, APIQualityAssessType_RVLevelLoad, postData).then(apiResult => {
                if (!apiResult.IsError) {
                    this.handleArrQualityAssessType_RVLevel(apiResult.ResultObject);

                    this.setState({
                        arrFetchQualityAssessType_RVLevel: apiResult.ResultObject
                    })
                } else {
                    this.showMessage(apiResult.Message);
                }
            });
        } catch (error) {
            this.showMessage("Lỗi lấy danh sách người duyệt, vui lòng tải lại trang");
        }
    }

    fetchArrShipmentQualityAssess_RVK() {
        const { dataSource } = this.props;

        const dataFetch = [
            {
                SearchKey: "@SHIPMENTQUALITYASSESSID",
                SearchValue: dataSource.ShipmentQualityAssessID
            }
        ];

        this.props.callFetchAPI(APIHostName, APIShipmentQualityAssessRvkLoadNew, dataFetch).then(apiResult => {
            if (!apiResult.IsError) {
                this.setState({
                    arrFetchShipmentQualityAssess_RVK: apiResult.ResultObject
                })

                apiResult.ResultObject.forEach(item => {
                    this.setState({
                        [item.ReviewLevelID]: { UserName: item.UserName, ReviewStatus: item.ReviewStatus }
                    })
                })
            } else {
                this.showMessage(apiResult.Message);
            }
        });
    }

    handleArrQualityAssessType_RVLevel(arrData) {
        const arrResult = arrData.reduce((acc, val) => {
            const numIndex = acc.findIndex(item => item.ReviewLevelID == val.ReviewLevelID);

            if (numIndex == -1) {
                return [
                    ...acc,
                    {
                        ReviewLevelID: val.ReviewLevelID,
                        ReviewLevelName: val.ReviewLevelName,
                        listOpts: [{ value: val.UserName, label: `${val.UserName} - ${val.FullName}` }]
                    }
                ]
            } else {
                acc[numIndex] = {
                    ...acc[numIndex],
                    listOpts: [...acc[numIndex].listOpts, { value: val.UserName, label: `${val.UserName} - ${val.FullName}` }]
                }

                return acc;
            }
        }, []);

        this.setState({
            arrOptQualityAssessType_RVLevel: arrResult
        })

        return arrResult;
    }

    handleEnterComment(CommentContent) {
        const { dataSource } = this.props;

        const data = {
            ReplyToCommentID: "",
            ShipmentQualityAssessID: dataSource.ShipmentQualityAssessID,
            ShipmentOrderID: dataSource.ShipmentOrderID,
            AssessDate: dataSource.AssessDate,
            CommentDate: new Date(),
            CommentContent
        }

        this.props.callFetchAPI(APIHostName, APICommentAdd, data).then(apiResult => {
            if (!apiResult.IsError) {
                this.fetchArrComment();
            } else {
                this.showMessage(apiResult.Message);
            }
        });
    }

    handleChangeSelect(...data) {
        try {
            const { name } = data[1];

            this.setState({
                [name]: { UserName: data[0].value, ReviewStatus: 0 }
            });
        } catch (error) {
            this.showMessage("Lỗi chọn người duyệt, vui lòng thử lại.")
        }
    }

    handleChangeReviewStatus(...data) {
        try {
            const { name } = data[1];

            this.setState({
                [name]: { ...this.state[name], ReviewStatus: data[0].value }
            });
        } catch (error) {
            this.showMessage("Lỗi chọn trạng thái duyệt, vui lòng thử lại.")
        }
    }

    handleValueReviewStatus(ReviewLevelID, arrOptReviewStatus) {
        try {
            if (this.state[ReviewLevelID]) {
                return arrOptReviewStatus.find(item => item.value == this.state[ReviewLevelID].ReviewStatus);
            } else {
                return "";
            }
        } catch (error) {
            this.showMessage("Lỗi trạng thái duyệt.")
        }
    }

    handleValueReviewUser(ReviewLevelID, arrOptReviewUser) {
        try {
            if (this.state[ReviewLevelID]) {
                return arrOptReviewUser.find(item => item.value == this.state[ReviewLevelID].UserName);
            } else {
                return "";
            }
        } catch (error) {
            this.showMessage("Lỗi danh sách người duyệt.")
        }
    }

    handleSubmitForm(callSearchData, data) {
        const { dataSource } = this.props;
        const { arrFetchQualityAssessType_RVLevel } = this.state;

        const lstShipmentQualityAssess_rvk = arrFetchQualityAssessType_RVLevel.reduce((acc, val) => {
            if (this.state[val.ReviewLevelID] && this.state[val.ReviewLevelID].UserName == val.UserName) {
                return [
                    ...acc,
                    {
                        ...val,
                        ReviewStatus: this.state[val.ReviewLevelID].ReviewStatus
                    }
                ]
            } else {
                return acc;
            }
        }, []);

        const objPost = {
            ...data[1],
            IsRevokeAssessReview: lstShipmentQualityAssess_rvk[lstShipmentQualityAssess_rvk.length - 1].ReviewStatus == 1 ? 1 : 0,
            RevokeAssessReviewUser: `${lstShipmentQualityAssess_rvk[lstShipmentQualityAssess_rvk.length - 1].UserName} - ${lstShipmentQualityAssess_rvk[lstShipmentQualityAssess_rvk.length - 1].FullName}`,
            RevokeAssessReviewDate: new Date(),
            UpdatedUser: dataSource.UpdatedUser,
            UpdatedDate: new Date(),
            lstShipmentQualityAssess_rvk
        };

        this.props.callFetchAPI(APIHostName, APIAddQualityAssessAndRVK, objPost).then(apiResult => {
            if (!apiResult.IsError) {
                this.props.hideModal();
                callSearchData(true);
            } else {
                this.showMessage(apiResult.Message);
            }
        });
    }

    isDisabledSelectReviewLevelID(objDefaultValueReviewUser, ReviewLevelID) {
        try {
            const { Username } = this.props.AppInfo.LoginInfo;

            if (Username == objDefaultValueReviewUser.value) {
                return false;
            } else if (this.state[ReviewLevelID] && this.state[ReviewLevelID].UserName == Username) {
                return false;
            } else {
                return true;
            }
        } catch (error) {
            this.showMessage("Lỗi trạng thái duyệt, vui lòng thử lại.")
        }
    }

    render() {
        const { dataSource } = this.props;
        const {
            arrFetchQualityAssessType, arrOptQualityAssessType, objValueQualityAssessType,
            arrFetchComment, arrFetchQualityAssessType_RVLevel, arrOptQualityAssessType_RVLevel,
            arrFetchShipmentQualityAssess_RVK
        } = this.state;

        if (arrFetchQualityAssessType == null || arrFetchComment == null || arrFetchQualityAssessType_RVLevel == null || arrFetchShipmentQualityAssess_RVK == null) {
            return (<React.Fragment>...</React.Fragment>)
        } else {
            return (
                <ReactContext.Consumer>
                    {
                        ({ dataGrid, callSearchData }) => (
                            <React.Fragment>
                                <FormContainer
                                    MLObjectDefinition={MLObjectDefinitionEdit}
                                    listelement={[]}
                                    RequirePermission={""}
                                    IsCloseModal={true}
                                    isSubmitForm={dataSource.IsRevokeAssessReview == 1 ? false : true}
                                    onSubmit={(...data) => this.handleSubmitForm(callSearchData, data)}
                                >
                                    <div className="row">
                                        <div className="col-md-6">
                                            <FormControl.TextBox
                                                name="txtShipmentQualityAssessID"
                                                colspan="8"
                                                labelcolspan="4"
                                                readOnly={true}
                                                label="Mã đánh giá"
                                                placeholder=""
                                                controltype="InputControl"
                                                value={dataSource.ShipmentQualityAssessID}
                                                datasourcemember="ShipmentQualityAssessID"
                                                validatonList={[]}
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <FormControl.TextBox
                                                name="txtShipmentOrderID"
                                                colspan="8"
                                                labelcolspan="4"
                                                readOnly={true}
                                                label="Mã vận đơn"
                                                placeholder=""
                                                controltype="InputControl"
                                                value={dataSource.ShipmentOrderID}
                                                datasourcemember="ShipmentOrderID"
                                                validatonList={[]}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <FormControl.FormControlDatetime
                                                name="txtAssessDate"
                                                colspan="8"
                                                labelcolspan="4"
                                                disabled={true}
                                                label="Ngày đánh giá"
                                                placeholder=""
                                                controltype="InputControl"
                                                value={dataSource.AssessDate}
                                                datasourcemember="AssessDate"
                                                validatonList={[]}
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <FormControl.TextBox
                                                name="txtPartnerSaleOrderID"
                                                colspan="8"
                                                labelcolspan="4"
                                                readOnly={true}
                                                label="Mã đơn hàng đối tác"
                                                placeholder=""
                                                controltype="InputControl"
                                                value={dataSource.PartnerSaleOrderID}
                                                datasourcemember="PartnerSaleOrderID"
                                                validatonList={[]}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <FormControl.ComboBoxNew
                                                name="txtQualityAssessTypeID"
                                                colspan="8"
                                                labelcolspan="4"
                                                disabled={true}
                                                label="Loại tiêu chí đánh giá"
                                                placeholder=""
                                                controltype="InputControl"
                                                defaultValue={objValueQualityAssessType}
                                                datasourcemember="QualityAssessTypeID"
                                                validatonList={[]}
                                                isMultiSelect={false}
                                                listoption={arrOptQualityAssessType}
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <FormControl.TextBox
                                                name="txtCreatedUser"
                                                colspan="8"
                                                labelcolspan="4"
                                                readOnly={true}
                                                label="Người tạo"
                                                placeholder=""
                                                controltype="InputControl"
                                                value={dataSource.FullName}
                                                datasourcemember="CreatedUser"
                                                validatonList={[]}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <FormControl.TextBox
                                                name="txtQualityAssessValue"
                                                colspan="8"
                                                labelcolspan="4"
                                                readOnly={true}
                                                label="Giá trị đánh giá"
                                                placeholder=""
                                                controltype="InputControl"
                                                value={dataSource.QualityAssessValue}
                                                datasourcemember="QualityAssessValue"
                                                validatonList={[]}
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <FormControl.FormControlDatetime
                                                name="txtCreatedDate"
                                                colspan="8"
                                                labelcolspan="4"
                                                disabled={true}
                                                label="Ngày tạo"
                                                placeholder=""
                                                controltype="InputControl"
                                                value={dataSource.CreatedDate}
                                                datasourcemember="CreatedDate"
                                                validatonList={[]}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <FormControl.TextArea
                                                name="txtQualityAssessNote"
                                                colspan="8"
                                                labelcolspan="4"
                                                readonly={true}
                                                label="Ghi chú đánh giá"
                                                placeholder=""
                                                controltype="InputControl"
                                                value={dataSource.QualityAssessNote}
                                                datasourcemember="QualityAssessNote"
                                                validatonList={[]}
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <FormControl.TextBox
                                                name="txtUpdatedUser"
                                                colspan="8"
                                                labelcolspan="4"
                                                readOnly={true}
                                                label="Người cập nhật"
                                                placeholder=""
                                                controltype="InputControl"
                                                value={dataSource.UpdatedUserFullName}
                                                datasourcemember="UpdatedUser"
                                                validatonList={[]}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <FormControl.CheckBox
                                                name="txtIsRevokeAssessReview"
                                                colspan="8"
                                                labelcolspan="4"
                                                readOnly={true}
                                                label="Đã duyệt gỡ đánh giá"
                                                value={dataSource.IsRevokeAssessReview == 1 ? true : false}
                                                datasourcemember="IsRevokeAssessReview"
                                                readonly={true}
                                                validatonList={[]}
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <FormControl.FormControlDatetime
                                                name="txtUpdatedDate"
                                                colspan="8"
                                                labelcolspan="4"
                                                disabled={true}
                                                label="Ngày cập nhật"
                                                placeholder=""
                                                controltype="InputControl"
                                                value={dataSource.UpdatedDate}
                                                datasourcemember="UpdatedDate"
                                                validatonList={[]}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <FormControl.TextBox
                                                name="txtRevokeAssessReviewUser"
                                                colspan="8"
                                                labelcolspan="4"
                                                readOnly={true}
                                                label="Người duyệt gỡ đánh giá"
                                                placeholder=""
                                                controltype="InputControl"
                                                value={dataSource.RevokeAssessReviewUser}
                                                datasourcemember="RevokeAssessReviewUser"
                                                validatonList={[]}
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <FormControl.TextBox
                                                name="txtDeletedUser"
                                                colspan="8"
                                                labelcolspan="4"
                                                readOnly={true}
                                                label="Người xóa"
                                                placeholder=""
                                                controltype="InputControl"
                                                value={dataSource.DeletedUser}
                                                datasourcemember="DeletedUser"
                                                validatonList={[]}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <FormControl.FormControlDatetime
                                                name="txtRevokeAssessReviewDate"
                                                colspan="8"
                                                labelcolspan="4"
                                                disabled={true}
                                                label="Ngày duyệt gỡ đánh giá"
                                                placeholder=""
                                                controltype="InputControl"
                                                value={dataSource.RevokeAssessReviewDate}
                                                datasourcemember="RevokeAssessReviewDate"
                                                validatonList={[]}
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <FormControl.FormControlDatetime
                                                name="txtDeletedDate"
                                                colspan="8"
                                                labelcolspan="4"
                                                disabled={true}
                                                label="Ngày xóa"
                                                placeholder=""
                                                controltype="InputControl"
                                                value={dataSource.DeletedDate}
                                                datasourcemember="DeletedDate"
                                                validatonList={[]}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6"></div>
                                        <div className="col-md-6">
                                            <FormControl.TextArea
                                                name="txtDeletedNote"
                                                colspan="8"
                                                labelcolspan="4"
                                                readonly={true}
                                                label="Lý do xóa"
                                                placeholder=""
                                                controltype="InputControl"
                                                value={dataSource.DeletedNote}
                                                datasourcemember="DeletedNote"
                                                validatonList={[]}
                                            />
                                        </div>
                                    </div>

                                    {
                                        dataSource.IsRevokeAssessReview == 0 && <div className="card">
                                            <div className="card-title group-card-title">
                                                <h4 className="title">Danh sách mức duyệt</h4>
                                            </div>
                                            <div className="card-body">
                                                <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th className="jsgrid-header-cell">Mức duyệt</th>
                                                            <th className="jsgrid-header-cell">Người duyệt</th>
                                                            <th className="jsgrid-header-cell">Trạng thái duyệt</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            arrOptQualityAssessType_RVLevel.map((item, index) => {
                                                                const objValueReviewUser = this.handleValueReviewUser(item.ReviewLevelID, item.listOpts)

                                                                const boolDisableReviewStatus = this.isDisabledSelectReviewLevelID(objValueReviewUser, item.ReviewLevelID);

                                                                return (
                                                                    <tr key={index}>
                                                                        <td>{item.ReviewLevelName}</td>
                                                                        <td>
                                                                            <Select
                                                                                name={item.ReviewLevelID}
                                                                                options={item.listOpts}
                                                                                placeholder="--Người duyệt--"
                                                                                onChange={this.handleChangeSelect}
                                                                                value={objValueReviewUser}
                                                                            />
                                                                        </td>
                                                                        <td>
                                                                            <Select
                                                                                name={item.ReviewLevelID}
                                                                                options={arrOptReviewStatus}
                                                                                placeholder="--Trạng thái duyệt--"
                                                                                onChange={this.handleChangeReviewStatus}
                                                                                value={this.handleValueReviewStatus(item.ReviewLevelID, arrOptReviewStatus)}
                                                                                isDisabled={boolDisableReviewStatus}
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
                                    }

                                    <Comment
                                        DataComments={arrFetchComment}
                                        IsComment={true}
                                        onChangeValue={() => { }}
                                        onKeyPressSumit={this.handleEnterComment}
                                    />

                                </FormContainer>
                            </React.Fragment>
                        )
                    }
                </ReactContext.Consumer>
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
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        hideModal: () => {
            dispatch(hideModal());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Update)
