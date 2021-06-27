import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ModalManager } from "react-dynamic-modal";
import Select from 'react-select';

import ReactContext from '../ReactContext'
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import {
    APIHostName, MLObjectDefinitionEdit, APIComment, APICommentAdd,
    APIQualityAssessType, APIQualityAssessType_RVLevelLoad, APIAddQualityAssessAndRVK,
    APIShipmentQualityAssessRvkLoadNew
} from "../constants";
import { MessageModal } from "../../../../common/components/Modal";
import FormContainer from "../../../../common/components/FormContainer";
import FormControl from "../../../../common/components/FormContainer/FormControl";
import Comment from "../../../../common/components/Comment";
import { hideModal } from '../../../../actions/modal';

export class ShipmentQualityAssessDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataCmt: null,
            dataApproveUserList: null,
            dataQualityAssessType: null,
            dataShipmentQualityAssess_RVK: null,
            dataPostAppoveUser: [],
            optQualityAssessType: [],
            indexOptQualityAssessType: null,
            optApproveUser: [],
            selectedOption: []
        }

        this.fetchComment = this.fetchComment.bind(this);
        this.fetchApproveUserList = this.fetchApproveUserList.bind(this);
        this.fetchQualityAssessType = this.fetchQualityAssessType.bind(this);
        this.fetchShipmentQualityAssess_RVK = this.fetchShipmentQualityAssess_RVK.bind(this);
        this.handleApproveUserList = this.handleApproveUserList.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.handleKeyPressSumit = this.handleKeyPressSumit.bind(this);
        this.indexOptRevokeAssessReview = this.indexOptRevokeAssessReview.bind(this);
    }

    componentDidMount() {
        this.fetchComment();
        this.fetchApproveUserList();
        this.fetchQualityAssessType();
        this.fetchShipmentQualityAssess_RVK();
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

    fetchComment() {
        const { dataSource } = this.props;

        const dataFetch = [
            {
                SearchKey: "@Keyword",
                SearchValue: ""
            },
            {
                SearchKey: "@SHIPMENTQUALITYASSESSID",
                SearchValue: dataSource.ShipmentQualityAssessID
            }
        ]

        this.props.callFetchAPI(APIHostName, APIComment, dataFetch).then(apiResult => {
            if (!apiResult.IsError) {
                this.setState({
                    dataCmt: apiResult.ResultObject
                })
            } else {
                this.showMessage(apiResult.Message);
            }
        });
    }

    fetchApproveUserList() {
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
                    this.handleApproveUserList(apiResult.ResultObject);

                    this.setState({
                        dataApproveUserList: apiResult.ResultObject
                    })
                } else {
                    this.showMessage(apiResult.Message);
                }
            });
        } catch (error) {
            this.showMessage("Lỗi lấy danh sách người duyệt, vui lòng tải lại trang");
        }
    }

    fetchQualityAssessType() {
        const { dataSource } = this.props;

        const dataFetch = [
            {
                SearchKey: "@Keyword",
                SearchValue: ""
            }
        ];

        this.props.callFetchAPI(APIHostName, APIQualityAssessType, dataFetch).then(apiResult => {
            if (!apiResult.IsError) {
                const options = apiResult.ResultObject.map(item => {
                    return {
                        value: item.QualityAssessTypeID,
                        label: `${item.QualityAssessTypeID} - ${item.QualityAssessTypeName}`
                    }
                });

                const indexOptQualityAssessType = options.findIndex(item => item.value == dataSource.QualityAssessTypeID);

                this.setState({
                    dataQualityAssessType: apiResult.ResultObject,
                    optQualityAssessType: options,
                    indexOptQualityAssessType
                })
            } else {
                this.showMessage(apiResult.Message);
            }
        });
    }

    fetchShipmentQualityAssess_RVK() {
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
                    dataShipmentQualityAssess_RVK: apiResult.ResultObject
                })
            } else {
                this.showMessage(apiResult.Message);
            }
        });
    }

    handleApproveUserList(data) {
        try {
            if (data !== null) {
                const optionsApproveUser = data.reduce((acc, val) => {
                    const indexExistApproveUser = acc.findIndex(item => item.ReviewLevelID == val.ReviewLevelID);

                    if (indexExistApproveUser != -1) {
                        acc[indexExistApproveUser].options = [
                            ...acc[indexExistApproveUser].options,
                            { label: `${val.UserName} - ${val.FullName}`, value: val.UserName }
                        ];

                        return acc;
                    } else {
                        return [
                            ...acc,
                            {
                                ReviewLevelID: val.ReviewLevelID,
                                ReviewLevelName: val.ReviewLevelName,
                                options: [{ label: `${val.UserName} - ${val.FullName}`, value: val.UserName }]
                            }
                        ]
                    }
                }, []);

                this.setState({
                    optApproveUser: optionsApproveUser
                })
            }
        } catch (error) {
            this.showMessage("Lỗi hệ thống...");
        }
    }

    handleChangeSelect(...data) {
        try {
            const { selectedOption, dataApproveUserList, dataPostAppoveUser } = this.state;

            const tempSelectedOption = selectedOption.filter(item => item.ReviewLevelID != data[1].name);
            const tempDTtPostAppoveUser = dataPostAppoveUser.filter(item => item.ReviewLevelID != data[1].name)

            if (data[0] != null) {
                tempSelectedOption.push({ ReviewLevelID: data[1].name, UserName: data[0].value });

                const itemApproveUser = dataApproveUserList.find(item => item.ReviewLevelID == data[1].name && item.UserName == data[0].value);
                tempDTtPostAppoveUser.push(itemApproveUser);
            }

            this.setState({
                selectedOption: tempSelectedOption,
                dataPostAppoveUser: tempDTtPostAppoveUser
            })
        } catch (error) {
            this.showMessage(error)
        }
    }

    handleSubmit(handleDataGrid, data) {
        const { dataSource } = this.props;
        const { dataPostAppoveUser } = this.state;

        const dataPost = {
            ...data[1],
            UpdatedUser: dataSource.UpdatedUser,
            UpdatedDate: new Date(),
            lstShipmentQualityAssess_rvk: dataPostAppoveUser
        };

        this.props.callFetchAPI(APIHostName, APIAddQualityAssessAndRVK, dataPost).then(apiResult => {
            if (!apiResult.IsError) {
                this.props.hideModal();
                handleDataGrid();
            } else {
                this.showMessage(apiResult.Message);
            }
        });
    }

    handleKeyPressSumit(CommentValue) {
        const { dataSource } = this.props;

        const data = {
            ReplyToCommentID: "",
            ShipmentQualityAssessID: dataSource.ShipmentQualityAssessID,
            ShipmentOrderID: dataSource.ShipmentOrderID,
            AssessDate: dataSource.AssessDate,
            CommentDate: new Date(),
            CommentContent: CommentValue
        }

        this.props.callFetchAPI(APIHostName, APICommentAdd, data).then(apiResult => {
            if (!apiResult.IsError) {
                this.fetchComment();
            } else {
                this.showMessage(apiResult.Message);
            }
        });
    }

    indexOptRevokeAssessReview(...data) {
        const options = data[0];
        const { dataShipmentQualityAssess_RVK } = this.state;

        const indexOpt = options.findIndex(element => {
            return dataShipmentQualityAssess_RVK.some(item => item.UserName == element.value);
        })

        return indexOpt;
    }

    render() {
        const { dataSource } = this.props;
        const { dataCmt, dataApproveUserList, dataQualityAssessType,
            optQualityAssessType, indexOptQualityAssessType, optApproveUser,
            selectedOption, dataShipmentQualityAssess_RVK
        } = this.state;

        if (dataCmt === null || dataApproveUserList === null || dataQualityAssessType === null || dataShipmentQualityAssess_RVK === null) {
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
                                    onSubmit={(...data) => this.handleSubmit(callSearchData, data)}
                                    IsDisabledSubmitForm={selectedOption.length === 0 ? true : false}
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
                                                defaultValue={optQualityAssessType[indexOptQualityAssessType]}
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
                                        dataSource.IsRevokeAssessReview == 0 ? <div className="card">
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
                                                            optApproveUser.map((rowItem, rowIndex) => {
                                                                return (
                                                                    <tr key={rowIndex}>
                                                                        <td>{rowItem.ReviewLevelName}</td>
                                                                        <td>
                                                                            <Select
                                                                                name={rowItem.ReviewLevelID}
                                                                                options={rowItem.options}
                                                                                placeholder="--Chọn người duyệt--"
                                                                                onChange={this.handleChangeSelect}
                                                                                isClearable={true}
                                                                                defaultValue={rowItem.options[this.indexOptRevokeAssessReview(rowItem.options)]}
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
                                            : <React.Fragment></React.Fragment>
                                    }

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

export default connect(mapStateToProps, mapDispatchToProps)(ShipmentQualityAssessDetail)
