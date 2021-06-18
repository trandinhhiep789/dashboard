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
    MLObjectDefinitionEdit
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
            arrFetchShipmentQualityAssess_RVK: null,
            arrIsSelectShipmentQualityAssess_RVK: []
        }

        this.fetchArrQualityAssessType = this.fetchArrQualityAssessType.bind(this);
        this.fetchArrComment = this.fetchArrComment.bind(this);
        this.fetchArrQualityAssessType_RVLevel = this.fetchArrQualityAssessType_RVLevel.bind(this);

        this.handleArrQualityAssessType_RVLevel = this.handleArrQualityAssessType_RVLevel.bind(this);
        this.handleEnterComment = this.handleEnterComment.bind(this);
        this.handleGetIndexSelected = this.handleGetIndexSelected.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
    }

    componentDidMount() {
        this.fetchArrQualityAssessType();
        this.fetchArrComment();
        this.fetchArrQualityAssessType_RVLevel();
        this.fetchArrShipmentQualityAssess_RVK();
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

    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
            />
        );
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

    handleGetIndexSelected(arrOpts) {
        try {
            const { arrFetchShipmentQualityAssess_RVK } = this.state

            const numIndex = arrOpts.findIndex((item, index) => {
                return arrFetchShipmentQualityAssess_RVK.some(item1 => item1.UserName == item.value);
            });

            if (numIndex == -1) {
                return "";
            } else {
                return arrOpts[numIndex];
            }
        } catch (error) {
            return "";
        }
    }

    handleChangeSelect(...data) {
        try {
            const { arrIsSelectShipmentQualityAssess_RVK } = this.state;
            const { name } = data[1];

            const numIndex = arrIsSelectShipmentQualityAssess_RVK.findIndex(item => item.name == name);
            let arrIsSelect = [];

            if (numIndex == -1) {
                arrIsSelect = [
                    ...arrIsSelectShipmentQualityAssess_RVK,
                    {
                        name,
                        value: data[0] == null ? "" : data[0].value
                    }
                ]
            } else {
                arrIsSelect = arrIsSelectShipmentQualityAssess_RVK.map(item => {
                    if (item.name == name) {
                        return {
                            name,
                            value: data[0] == null ? "" : data[0].value
                        }
                    } else {
                        return item;
                    }
                })
            };

            this.setState({
                arrIsSelectShipmentQualityAssess_RVK: arrIsSelect
            });
        } catch (error) {
            this.showMessage("Lỗi chọn người duyệt, vui lòng thử lại.")
        }
    }

    handleSubmitForm(callSearchData, data) {
        const { dataSource } = this.props;
        const { arrIsSelectShipmentQualityAssess_RVK, arrFetchQualityAssessType_RVLevel } = this.state;

        const lstShipmentQualityAssess_rvk = arrIsSelectShipmentQualityAssess_RVK.reduce((acc, val) => {
            const found = arrFetchQualityAssessType_RVLevel.find(item => {
                return item.ReviewLevelID == val.name && item.UserName == val.value;
            })

            if (found == undefined) {
                return acc;
            } else {
                return [...acc, found];
            }
        }, [])

        const objPost = {
            ...data[1],
            UpdatedUser: dataSource.UpdatedUser,
            UpdatedDate: new Date(),
            lstShipmentQualityAssess_rvk
        };

        console.log(objPost)

        this.props.callFetchAPI(APIHostName, APIAddQualityAssessAndRVK, objPost).then(apiResult => {
            if (!apiResult.IsError) {
                this.props.hideModal();
                callSearchData(true);
            } else {
                this.showMessage(apiResult.Message);
            }
        });
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
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            arrOptQualityAssessType_RVLevel.map((item, index) => {

                                                                return (
                                                                    <tr key={index}>
                                                                        <td>{item.ReviewLevelName}</td>
                                                                        <td>
                                                                            <Select
                                                                                name={item.ReviewLevelID}
                                                                                options={item.listOpts}
                                                                                placeholder="--Người duyệt--"
                                                                                onChange={this.handleChangeSelect}
                                                                                isClearable={true}
                                                                                defaultValue={this.handleGetIndexSelected(item.listOpts)}
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
