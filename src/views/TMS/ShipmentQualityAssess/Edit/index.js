import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { ModalManager } from "react-dynamic-modal";

import { updatePagePath } from "../../../../actions/pageAction";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { showModal, hideModal } from '../../../../actions/modal';
import { MessageModal } from "../../../../common/components/Modal";
import {
    PagePath, SearchAPIPath, APIHostName, listColumn, LoadAPIPath, PagePathEdit,
    MLObjectDefinitionEdit, CommentAPIPath, AddCommentAPIPath, QualityAssessType
} from "../constants";
import FormContainer from "../../../../common/components/FormContainer";
import FormControl from "../../../../common/components/FormContainer/FormControl";
import Comment from "../../../../common/components/Comment";

export class EditCom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: null,
            dataCmt: null,
            dataQualityAssessType: null,
            optQualityAssessType: [],
            indexQualityAssessType: null
        }

        this.gridref = React.createRef();
        this.notificationDOMRef = React.createRef();
        this.initData = this.initData.bind(this);
        this.handleKeyPressSumit = this.handleKeyPressSumit.bind(this);
        this.initComment = this.initComment.bind(this);
        this.fetchQualityAssessType = this.fetchQualityAssessType.bind(this);
        this.optQualityAssessType = this.optQualityAssessType.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.updatePagePath(PagePathEdit);
        this.initData();
        this.initComment();
        this.fetchQualityAssessType();
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

    initData() {
        const { match, location, history } = this.props;

        this.props.callFetchAPI(APIHostName, LoadAPIPath, match.params.id).then(apiResult => {
            if (!apiResult.IsError) {
                this.setState({
                    dataSource: apiResult.ResultObject
                })
            } else {
                this.showMessage(apiResult.Message);
            }
        });
    }

    initComment() {
        const { match, location, history } = this.props;

        const dataFetch = [
            {
                SearchKey: "@Keyword",
                SearchValue: match.params.id
            },
            {
                SearchKey: "@SHIPMENTQUALITYASSESSID",
                SearchValue: match.params.id
            }
        ]

        this.props.callFetchAPI(APIHostName, CommentAPIPath, dataFetch).then(apiResult => {
            if (!apiResult.IsError) {
                this.setState({
                    dataCmt: apiResult.ResultObject
                })
            } else {
                this.showMessage(apiResult.Message);
            }
        });
    }

    optQualityAssessType(dataQualityAssessType) {
        try {
            const { dataSource } = this.state;

            const options = dataQualityAssessType.map(item => {
                return {
                    value: item.QualityAssessTypeID,
                    label: `${item.QualityAssessTypeID} - ${item.QualityAssessTypeName}`
                }
            });

            const indexQualityAssessType = options.findIndex(item => item.value == dataSource.QualityAssessTypeID);

            this.setState({
                optQualityAssessType: options,
                indexQualityAssessType
            })
        } catch (error) {
            this.showMessage("Lỗi lấy danh sách loại tiêu chí đánh giá chất lượng");
        }
    }

    fetchQualityAssessType() {
        const dataFetch = [
            {
                SearchKey: "@Keyword",
                SearchValue: ""
            }
        ];

        this.props.callFetchAPI(APIHostName, QualityAssessType, dataFetch).then(apiResult => {
            if (!apiResult.IsError) {
                this.optQualityAssessType(apiResult.ResultObject);

                this.setState({
                    dataQualityAssessType: apiResult.ResultObject
                })
            } else {
                this.showMessage(apiResult.Message);
            }
        });
    }

    handleKeyPressSumit(CommentValue) {
        const { dataSource } = this.state;

        const data = {
            ReplyToCommentID: "",
            ShipmentQualityAssessID: dataSource.ShipmentQualityAssessID,
            ShipmentOrderID: dataSource.ShipmentOrderID,
            AssessDate: dataSource.AssessDate,
            CommentDate: new Date(),
            CommentContent: CommentValue
        }

        this.props.callFetchAPI(APIHostName, AddCommentAPIPath, data).then(apiResult => {
            if (!apiResult.IsError) {
                this.initComment();
            } else {
                this.showMessage(apiResult.Message);
            }
        });
    }


    handleSubmit(FormData, MLObject) {
        this.showMessage("Tính năng đang phát triển")
    }


    render() {
        const {
            dataSource, dataCmt, dataQualityAssessType, optQualityAssessType,
            indexQualityAssessType
        } = this.state;

        if (dataSource === null || dataCmt === null || dataQualityAssessType === null) {
            return (
                <React.Fragment></React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <FormContainer
                        MLObjectDefinition={MLObjectDefinitionEdit}
                        listelement={[]}
                        RequirePermission={""}
                        onSubmit={this.handleSubmit}
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
                                    defaultValue={optQualityAssessType[indexQualityAssessType]}
                                    datasourcemember="QualityAssessTypeID"
                                    validatonList={[]}
                                    isMultiSelect={false}
                                    listoption={optQualityAssessType}
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
                                    value={dataSource.CreatedUser}
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
                                    value={dataSource.UpdatedUser}
                                    datasourcemember="UpdatedUser"
                                    validatonList={[]}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <FormControl.TextBox
                                    name="txtIsRevokeAssessReview"
                                    colspan="8"
                                    labelcolspan="4"
                                    readOnly={true}
                                    label="Đã duyệt gỡ đánh giá"
                                    placeholder=""
                                    controltype="InputControl"
                                    value={dataSource.IsRevokeAssessReview}
                                    datasourcemember="IsRevokeAssessReview"
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
                                    label="Ghi chú đánh giá"
                                    placeholder=""
                                    controltype="InputControl"
                                    value={dataSource.DeletedNote}
                                    datasourcemember="DeletedNote"
                                    validatonList={[]}
                                />
                            </div>
                        </div>

                        <Comment
                            DataComments={dataCmt}
                            IsComment={true}
                            onChangeValue={() => { }}
                            onKeyPressSumit={this.handleKeyPressSumit}
                        />
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditCom))
