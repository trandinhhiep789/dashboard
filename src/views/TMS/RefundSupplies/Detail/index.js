import React, { Component } from 'react';
import {
    Link
} from "react-router-dom";
import { connect } from 'react-redux';
import { ModalManager } from "react-dynamic-modal";
import ReactNotification from "react-notifications-component";

import { updatePagePath } from '../../../../actions/pageAction';
import { callFetchAPI } from '../../../../actions/fetchAPIAction';
import { showModal, hideModal } from '../../../../actions/modal';
import { MessageModal } from '../../../../common/components/Modal';
import RenfundSuppliesInfo from './RenfundSuppliesInfo';
import {
    APIHostName,
    LoadAPIPath,
    DetailAPIPath,
    TitleFormDetail,
    InputMTReturnRequestDetailColumnList,
    GirdMTReturnRequestReviewLevelColumnList,
    UpdateCurrentReviewLevelAPIPath,
    UpdateCreateVocherAPIPath,
    AddAPIComment,
    AddAPIAttachment,
    DeleteAPIAttachment
} from '../constants';
import InputGrid from '../../../../common/components/Form/AdvanceForm/FormControl/InputGrid';
import Attachment from "../../../../common/components/Attachment";
import Comment from "../../../../common/components/Comment";
import RenfundSuppliesNoteRV from '../Component/RenfundSuppliesNoteRV';
import { MODAL_TYPE_COMMONTMODALS } from "../../../../constants/actionTypes";

export class DetailCom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            MTReturnRequestID: '',
            IsCallAPIError: false,
            RenfundSupplies: {},
            RenfundSuppliesRL: [],
            MTReturnRequestDetail: [],
            MTReturnRequestReviewLevel: [],
            isAutoReview: false,
            CurrentReviewLevelID: '',
            CurrentReviewLevelName: '',
            isUserNameReviewLevel: false,
            MTReturnRequest_AttachmentList: [],
            MTReturnRequest_CommentList: [],
            IsOutPut: false,
            IsStatusReject: false,
            IsStatus: false,
            isHiddenButtonRV: false
        }

        this.callLoadData = this.callLoadData.bind(this);
        this.showMessage = this.showMessage.bind(this);
        this.handleSelectFile = this.handleSelectFile.bind(this);
        this.handleDeletefile = this.handleDeletefile.bind(this);
        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.handleKeyPressSumit = this.handleKeyPressSumit.bind(this);
        this.handleInsertDRNoteRV = this.handleInsertDRNoteRV.bind(this);
        this.handleInputChangeObjItem = this.handleInputChangeObjItem.bind(this);

        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        const { updatePagePath } = this.props;
        updatePagePath(DetailAPIPath);
        this.setState({
            MTReturnRequestID: this.props.match.params.id
        })
        this.callLoadData(this.props.match.params.id);
    }

    callLoadData(id) {
        const { callFetchAPI } = this.props;
        callFetchAPI(APIHostName, LoadAPIPath, id).then((apiResult) => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            } else {
                const { lstMTReturnRequestDetail, lstMTReturnRequestReviewLevel, IsreViewed, IsSystem, IsCreatedInputVoucher, ReviewLevelName, CurrentReviewLevelID } = apiResult.ResultObject;

                const resultMTReturnRequestReviewLevel = lstMTReturnRequestReviewLevel.map((item, index) => {
                    item.ApproverName = item.UserName + " - " + item.FullName;

                    if (item.ReviewStatus == 0) {
                        item.ReviewStatusLable = "Chưa duyệt";
                    }
                    else {
                        if (item.ReviewStatus == 1) {
                            item.ReviewStatusLable = "Đã duyệt";
                        }
                        else {
                            item.ReviewStatusLable = "Từ chối duyệt";
                        }

                    }
                    return item;
                })

                if (lstMTReturnRequestReviewLevel.length > 0) {
                    const resultUserNameReviewLevel = lstMTReturnRequestReviewLevel.filter((item, index) => {
                        if (item.ReviewLevelID == CurrentReviewLevelID) {
                            return item;
                        }
                    })

                    const Username = this.props.AppInfo.LoginInfo.Username;

                    if (resultUserNameReviewLevel.length > 0) {
                        const userName = resultUserNameReviewLevel[0].UserName;
                        if (userName.trim() === Username.trim()) {
                            this.setState({
                                isUserNameReviewLevel: true
                            })
                        }
                        else {
                            this.setState({
                                isUserNameReviewLevel: false
                            })
                        }
                    }

                    const returnStatusDiffer = lstMTReturnRequestReviewLevel.filter((item, index) => {
                        if (item.ReviewStatus != 1) {
                            return item;
                        }
                    })

                    const returnStatusReject = lstMTReturnRequestReviewLevel.filter((item, index) => {
                        if (item.ReviewStatus == 2) {
                            return item;
                        }
                    })

                    if (returnStatusReject.length > 0) {
                        this.setState({
                            IsStatusReject: true
                        })
                    }
                    else {
                        this.setState({
                            IsStatusReject: false
                        })
                    }

                    if (returnStatusDiffer.length > 0) {
                        this.setState({
                            IsStatus: true
                        })
                    }
                    else {
                        this.setState({
                            IsStatus: false
                        })
                    }
                }

                let disabledIsOutPut = false;
                if (IsSystem) {
                    disabledIsOutPut = true
                }
                else {
                    if (IsreViewed == true && IsCreatedInputVoucher == false) {
                        disabledIsOutPut = false
                    }
                    else {
                        disabledIsOutPut = true
                    }
                }

                this.setState({
                    RenfundSupplies: apiResult.ResultObject,
                    MTReturnRequestDetail: lstMTReturnRequestDetail,
                    MTReturnRequestReviewLevel: lstMTReturnRequestReviewLevel,
                    isAutoReview: IsreViewed,
                    MTReturnRequest_AttachmentList: apiResult.ResultObject.MTReturnRequest_AttachmentList,
                    MTReturnRequest_CommentList: apiResult.ResultObject.MTReturnRequest_CommentList,
                    IsOutPut: disabledIsOutPut,
                    CurrentReviewLevelName: ReviewLevelName,
                    CurrentReviewLevelID: CurrentReviewLevelID,
                    RenfundSuppliesRL: resultMTReturnRequestReviewLevel,
                    isHiddenButtonRV: apiResult.ResultObject.IsreViewed,
                    lastReviewLevelID: lstMTReturnRequestReviewLevel.length > 0 ? lstMTReturnRequestReviewLevel[lstMTReturnRequestReviewLevel.length - 1].ReviewLevelID : 0,
                })
            }
        });


    }

    handleSelectFile(e) {
        const { MTReturnRequestID, RenfundSupplies } = this.state;
        var data = new FormData();
        let MLObject = {
            MTReturnRequestID,
            RequestDate: RenfundSupplies.RequestDate,
        }

        data.append('file', e.target.files[0])
        data.append("ObjMTReturnRequest_Attachment", JSON.stringify(MLObject));

        this.props.callFetchAPI(APIHostName, AddAPIAttachment, data).then((apiResult) => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
                this.callLoadData(MTReturnRequestID);
                this.addNotification(apiResult.Message, apiResult.IsError)
            }
        })
    }

    handleDeletefile(id) {
        const { MTReturnRequestID } = this.state;
        let MLObject = {
            AttachmentID: id
        }

        this.props.callFetchAPI(APIHostName, DeleteAPIAttachment, MLObject).then((apiResult) => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
                this.callLoadData(MTReturnRequestID);
                this.addNotification(apiResult.Message, apiResult.IsError)
            }
        })
    }

    handleChangeValue() {

    }

    handleKeyPressSumit(CommentValue) {
        const { MTReturnRequestID, RenfundSupplies } = this.state;
        let MLObject = {
            MTReturnRequestID,
            RequestDate: RenfundSupplies.RequestDate,
            CommentContent: CommentValue
        };

        this.props.callFetchAPI(APIHostName, AddAPIComment, MLObject).then((apiResult) => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
                this.callLoadData(MTReturnRequestID);
                this.addNotification(apiResult.Message, apiResult.IsError)
            }
        })
    }

    handleSubmitCreateVoucheRenfundSupplies() {
        const { MTReturnRequestID } = this.state;
        let MLObject = {};
        MLObject.MTReturnRequestID = MTReturnRequestID;
        MLObject.InputVoucherID = "";
        MLObject.IsCreatedInputVoucher = true;
        console.log("MLObject", MLObject)
        this.props.callFetchAPI(APIHostName, UpdateCreateVocherAPIPath, MLObject).then((apiResult) => {
            console.log("apiResult", apiResult)
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
                this.callLoadData(MTReturnRequestID);
                this.addNotification(apiResult.Message, apiResult.IsError)
            }
        })
    }

    handleRequestRL(objData) {

        let MLObject = {};
        const { RenfundSupplies, RenfundSuppliesRL, CurrentReviewLevelID, MTReturnRequestID, lastReviewLevelID } = this.state;
        MLObject.MTReturnRequestID = RenfundSupplies.MTReturnRequestID;

        MLObject.IsreViewed = 1;
        MLObject.ReviewStatus = objData.ReviewStatus;
        MLObject.reViewedNote = objData.reViewedNote;//Trạng thái duyệt;(0: Chưa duyệt, 1: Đồng ý, 2: Từ chối)

        let nextReviewLevelID;

        if (RenfundSuppliesRL.length > 1) {
            nextReviewLevelID = RenfundSuppliesRL.filter((item, index) => {
                if (item.ReviewLevelID != CurrentReviewLevelID && item.IsreViewed == false) {
                    return item;
                }
            });
        }
        else {
            nextReviewLevelID = RenfundSuppliesRL.filter((item, index) => {
                if (item.ReviewLevelID == CurrentReviewLevelID) {
                    return item;
                }
            });
        }

        const isLastList = CurrentReviewLevelID == lastReviewLevelID ? true : false

        if (objData.ReviewStatus == 1) {
            MLObject.IsreViewed = 1;
            MLObject.IsReViewedMTReturnRequest = !!isLastList ? 1 : 0;
        }
        else {
            MLObject.IsReViewedMTReturnRequest = 0;
        }

        MLObject.ReviewLevelID = CurrentReviewLevelID;

        MLObject.CurrentReviewLevelID = !!isLastList ? CurrentReviewLevelID : nextReviewLevelID[0].ReviewLevelID;

        console.log("aa", MLObject);

        this.props.callFetchAPI(APIHostName, UpdateCurrentReviewLevelAPIPath, MLObject).then((apiResult) => {
            console.log("id", apiResult)
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
                this.callLoadData(MTReturnRequestID);
                this.addNotification(apiResult.Message, apiResult.IsError)
            }
        })
    }

    handleInputChangeObjItem(noteContent, statusId) {
        let MLObject = {};
        MLObject.ReviewStatus = statusId;
        MLObject.reViewedNote = noteContent;
        this.props.hideModal();
        this.handleRequestRL(MLObject)
    }

    handleInsertDRNoteRV(id) {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Thêm ghi chú cho mức duyệt',
            content: {
                text: <RenfundSuppliesNoteRV
                    StatusID={id}
                    onInputChangeObj={this.handleInputChangeObjItem}
                />
            },
            maxWidth: '1000px'
        });
    }

    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
            // onCloseModal={this.handleCloseMessage}
            />
        );
    }

    addNotification(message1, IsError) {
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
                        <p className="notification-message">{message1}</p>
                    </div>
                </div>
            ),
            dismiss: { duration: 6000 },
            dismissable: { click: true }
        });
    }

    render() {
        const { RenfundSupplies, MTReturnRequestDetail, MTReturnRequestReviewLevel, isAutoReview, CurrentReviewLevelID, MTReturnRequest_AttachmentList, MTReturnRequest_CommentList, isUserNameReviewLevel, IsOutPut, CurrentReviewLevelName, IsStatusReject, IsStatus, isHiddenButtonRV } = this.state;

        let IsAutoReview;

        if (isAutoReview == true && CurrentReviewLevelID == 0) {
            IsAutoReview = true
        }
        else {
            IsAutoReview = false
        }

        // let IsDisableButtonOutPut = false;
        // if (IsOutPut == false) {
        //     IsDisableButtonOutPut = false
        // }
        // else {
        //     if (IsStatus == true || IsStatusReject) {
        //         IsDisableButtonOutPut = true
        //     }
        //     else {
        //         IsDisableButtonOutPut = false
        //     }
        // }

        let IsExitBtnReview = false;
        if (isUserNameReviewLevel == true) {
            if (isHiddenButtonRV) {
                IsExitBtnReview = true;
            }
            else {
                if (IsStatusReject) {
                    IsExitBtnReview = true
                }
                else {
                    IsExitBtnReview = false
                }
            }

        }
        else {
            IsExitBtnReview = true
        }

        return (
            <div className="col-lg-12">
                <ReactNotification ref={this.notificationDOMRef} />

                <div className="card">
                    <h4 className="card-title">
                        <strong>{TitleFormDetail}</strong>
                    </h4>
                    <div className="card-body">
                        <RenfundSuppliesInfo
                            RenfundSupplies={RenfundSupplies}
                        />

                        <div className="card">
                            <div className="card-title group-card-title">
                                <h4 className="title">Danh sách vật tư</h4>
                            </div>
                            <div className="card-body">
                                <InputGrid
                                    name="lstMTReturnRequestDetail"
                                    controltype="GridControl"
                                    listColumn={InputMTReturnRequestDetailColumnList}
                                    dataSource={MTReturnRequestDetail}
                                    isHideHeaderToolbar={true}
                                    //MLObjectDefinition={GridMLObjectDefinition}
                                    colspan="12"
                                    onValueChangeInputGrid={this.valueChangeInputGrid}
                                />
                            </div>
                        </div>

                        {
                            !IsAutoReview &&
                            <div className="card">
                                <div className="card-title group-card-title">
                                    <h4 className="title">Danh sách duyệt</h4>
                                </div>
                                <div className="card-body">
                                    <InputGrid
                                        name="lstMTReturnRequestReviewLevel"
                                        controltype="GridControl"
                                        listColumn={GirdMTReturnRequestReviewLevelColumnList}
                                        dataSource={MTReturnRequestReviewLevel}
                                        isHideHeaderToolbar={true}
                                        colspan="12"
                                        onValueChangeInputGrid={this.valueChangeInputGrid}
                                    />
                                </div>
                            </div>
                        }

                        <Attachment
                            IsAttachment={true}
                            onSelectFile={this.handleSelectFile}
                            onDeletefile={this.handleDeletefile}
                            DataAttachment={MTReturnRequest_AttachmentList}
                        />

                        <Comment
                            DataComments={MTReturnRequest_CommentList}
                            IsComment={true}
                            onChangeValue={this.handleChangeValue}
                            onKeyPressSumit={this.handleKeyPressSumit}
                        />
                    </div>

                    <footer className="card-footer text-right ">
                        {IsAutoReview == false ?
                            IsExitBtnReview == false ?

                                < div className="btn-group btn-group-dropdown mr-3">
                                    <button disabled={IsExitBtnReview} className="btn btn-light dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="true">{CurrentReviewLevelName}</button>
                                    <div className="dropdown-menu" x-placement="bottom-start" >
                                        <button className="dropdown-item" type="button" onClick={() => this.handleInsertDRNoteRV(1)}>Đồng ý</button>
                                        <button className="dropdown-item" type="button" onClick={() => this.handleInsertDRNoteRV(2)}>Từ chối</button>
                                    </div>
                                </div>
                                : < div className="btn-group btn-group-dropdown mr-3">
                                    <button disabled={IsExitBtnReview} className="btn btn-light dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="true">{CurrentReviewLevelName}</button>
                                    <div className="dropdown-menu" x-placement="bottom-start" >
                                        <button className="dropdown-item" type="button">Đồng ý</button>
                                        <button className="dropdown-item" type="button">Từ chối</button>
                                    </div>
                                </div>
                            : <div></div>

                        }
                        {IsOutPut == false ?
                            <button className="btn btn-primary mr-3" type="button" onClick={this.handleSubmitCreateVoucheRenfundSupplies.bind(this)}>Nhập kho</button>
                            : <button disabled={true} className="btn btn-primary mr-3" type="button">Nhập kho</button>
                        }

                        <Link to="/RefundSupplies">
                            <button className="btn btn-sm btn-outline btn-primary" type="button">Quay lại</button>
                        </Link>
                    </footer>
                </div>
            </div>
        )
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
        },
        hideModal: () => {
            dispatch(hideModal());
        }
    };
}
const Detail = connect(mapStateToProps, mapDispatchToProps)(DetailCom);
export default Detail;
