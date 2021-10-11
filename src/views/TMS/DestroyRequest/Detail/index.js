import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
} from "react-router-dom";
import { ModalManager } from "react-dynamic-modal";
import { connect } from "react-redux";
import ReactNotification from "react-notifications-component";

import {
    DetailAPIPath,
    LoadAPIPath,
    APIHostName,
    TitleFormDetail,
    GirdDestroyRequestDetailColumnList,
    GirdDestroyRequestRLColumnList,
    UpdateCreateSaleOrderAPIPath,
    UpdateCurrentReviewLevelAPIPath,
    AddAPIAttachment,
    DeleteAPIAttachment,
    AddAPIComment

} from "../constants";

import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { checkFileExtension } from '../../../../common/library/CommonLib';
import { MessageModal } from "../../../../common/components/Modal";
import { MODAL_TYPE_COMMONTMODALS } from "../../../../constants/actionTypes";
import { showModal, hideModal } from '../../../../actions/modal';
import { updatePagePath } from "../../../../actions/pageAction";
import Attachment from "../../../../common/components/Attachment";
import Comment from "../../../../common/components/Comment";
import DestroyRequestInfo from './DestroyRequestInfo.js'
import DestroyRequsestNoteRV from "../Component/DestroyRequsestNoteRV";
import InputGrid from "../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
class DetailCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            CallAPIMessage: "",
            CurrentReviewLevelID: '',
            CurrentReviewLevelName: '',
            DataSource: {},
            DestroyRequest_AttachmentList: [],
            DestroyRequest_ComementList: [],
            DestroyRequest: {},
            DestroyRequestDetail: [],
            DestroyRequestID: '',
            DestroyRequestRL: [],
            isAutoReview: false,
            IsCallAPIError: false,
            isHiddenButtonRV: false,
            IsLoadDataComplete: false,
            IsOutPut: false,
            IsStatus: false,
            IsStatusReject: false,
            IsSystem: false,
            isUserNameReviewLevel: false,
            lastReviewLevelID: '',
            RequestDate: '',
        }
        this.callLoadData = this.callLoadData.bind(this);
        this.handleSubmitOutputDestroyRequest = this.handleSubmitOutputDestroyRequest.bind(this);
        this.handleInputChangeObjItem = this.handleInputChangeObjItem.bind(this);

        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(DetailAPIPath);
        this.setState({
            DestroyRequestID: this.props.match.params.id
        })
        this.callLoadData(this.props.match.params.id);
    }

    callLoadData(id) {
        this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then((apiResult) => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
                const {
                    lstDestroyRequestReviewLevel, lstDestroyRequestDetail,
                    IsSystem, IsCreatedOrder, CurrentReviewLevelID, ReviewLevelName,
                    IsreViewed
                } = apiResult.ResultObject;

                const resultDestroyRequestReviewLevel = lstDestroyRequestReviewLevel.map((item, index) => {
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


                if (lstDestroyRequestReviewLevel.length > 0) {
                    const resultUserNameReviewLevel = lstDestroyRequestReviewLevel.filter((item, index) => {
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

                    const returnStatusDiffer = lstDestroyRequestReviewLevel.filter((item, index) => {
                        if (item.ReviewStatus != 1) {
                            return item;
                        }
                    })
                    const returnStatusReject = lstDestroyRequestReviewLevel.filter((item, index) => {
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
                if (apiResult.ResultObject.IsSystem) {
                    disabledIsOutPut = true
                }
                else {
                    if (apiResult.ResultObject.IsreViewed == true && apiResult.ResultObject.IsCreatedOrder == false) {
                        disabledIsOutPut = false
                    }
                    else {
                        disabledIsOutPut = true
                    }
                }

                this.setState({
                    CurrentReviewLevelID: CurrentReviewLevelID,
                    CurrentReviewLevelName: ReviewLevelName,
                    DataSource: apiResult.ResultObject,
                    DestroyRequest_AttachmentList: apiResult.ResultObject.DestroyRequest_AttachmentList,
                    DestroyRequest_ComementList: apiResult.ResultObject.DestroyRequest_CommentList,
                    DestroyRequest: apiResult.ResultObject,
                    DestroyRequestDetail: lstDestroyRequestDetail,
                    DestroyRequestRL: resultDestroyRequestReviewLevel,
                    isAutoReview: IsreViewed,
                    isHiddenButtonRV: apiResult.ResultObject.IsreViewed,
                    IsLoadDataComplete: true,
                    IsOutPut: disabledIsOutPut,
                    IsSystem: IsSystem,
                    lastReviewLevelID: lstDestroyRequestReviewLevel.length > 0 ? lstDestroyRequestReviewLevel[lstDestroyRequestReviewLevel.length - 1].ReviewLevelID : 0,
                    RequestDate: apiResult.ResultObject.RequestDate,
                });
            }
        });
    }

    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
                onCloseModal={this.handleCloseMessage}
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

    handleSubmitOutputDestroyRequest() {
        const { DestroyRequestID, DestroyRequestDetail } = this.state;
        let MLObject = {};
        MLObject.DestroyRequestID = DestroyRequestID;
        MLObject.SaleOrderID = "";
        MLObject.IsCreatedOrder = true;

        this.props.callFetchAPI(APIHostName, UpdateCreateSaleOrderAPIPath, MLObject).then((apiResult) => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
                this.callLoadData(DestroyRequestID);
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
                text: <DestroyRequsestNoteRV
                    StatusID={id}
                    onInputChangeObj={this.handleInputChangeObjItem}

                />
            },
            maxWidth: '1000px'
        });
    }

    handleRequestRL(objData) {

        let MLObject = {};
        const { DataSource, DestroyRequestRL, CurrentReviewLevelID, DestroyRequestID, lastReviewLevelID } = this.state;
        MLObject.DestroyRequestID = DataSource.DestroyRequestID;

        MLObject.IsreViewed = 1;
        MLObject.ReviewStatus = objData.ReviewStatus;
        MLObject.reViewedNote = objData.reViewedNote;//Trạng thái duyệt;(0: Chưa duyệt, 1: Đồng ý, 2: Từ chối)

        let nextReviewLevelID;

        if (DestroyRequestRL.length > 1) {
            nextReviewLevelID = DestroyRequestRL.filter((item, index) => {
                if (item.ReviewLevelID != CurrentReviewLevelID && item.IsreViewed == false) {
                    return item;
                }
            });
        }
        else {
            nextReviewLevelID = DestroyRequestRL.filter((item, index) => {
                if (item.ReviewLevelID == CurrentReviewLevelID) {
                    return item;
                }
            });
        }

        const isLastList = CurrentReviewLevelID == lastReviewLevelID ? true : false

        if (objData.ReviewStatus == 1) {
            MLObject.IsreViewed = 1;
            MLObject.IsreViewedDestroyRequest = !!isLastList ? 1 : 0;
        }
        else {
            MLObject.IsreViewedDestroyRequest = 0;
        }

        MLObject.ReviewLevelID = CurrentReviewLevelID;
        MLObject.CurrentReviewLevelID = !!isLastList ? CurrentReviewLevelID : nextReviewLevelID[0].ReviewLevelID;

        this.props.callFetchAPI(APIHostName, UpdateCurrentReviewLevelAPIPath, MLObject).then((apiResult) => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
                this.callLoadData(DestroyRequestID);
                this.addNotification(apiResult.Message, apiResult.IsError)
            }
        })
    }

    handleSelectFile(e) {
        const { DestroyRequestID, RequestDate } = this.state;

        let MLObject = {};
        var data = new FormData();

        MLObject.DestroyRequestID = DestroyRequestID;
        MLObject.RequestDate = RequestDate;
        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;

        data.append('file', e.target.files[0])
        data.append("ObjDestroyRequest_Attachment", JSON.stringify(MLObject));

        // check định dạng file
        const fileName = e.target.files[0].name;
        if (checkFileExtension(fileName).IsError) {
            this.showMessage(checkFileExtension(fileName).Message);
        } else {
            this.props.callFetchAPI(APIHostName, AddAPIAttachment, data).then((apiResult) => {
                if (apiResult.IsError) {
                    this.setState({
                        IsCallAPIError: !apiResult.IsError
                    });
                    this.showMessage(apiResult.Message);
                }
                else {
                    this.callLoadData(DestroyRequestID);
                    this.addNotification(apiResult.Message, apiResult.IsError)
                }
            })
        }
    }

    handleDeletefile(id) {
        const { DestroyRequestID } = this.state;
        this.props.callFetchAPI(APIHostName, DeleteAPIAttachment, id).then((apiResult) => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
                this.callLoadData(DestroyRequestID);
                this.addNotification(apiResult.Message, apiResult.IsError)
            }
        })
    }

    handleChangeValue(value) {
    }

    handleKeyPressSumit(valueCommentContent) {
        const { DestroyRequestID, RequestDate } = this.state;

        if (valueCommentContent.trim().length > 0) {
            let MLObject = {};
            MLObject.DestroyRequestID = DestroyRequestID;
            MLObject.RequestDate = RequestDate;
            MLObject.CommentContent = valueCommentContent;
            MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
            MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;

            this.props.callFetchAPI(APIHostName, AddAPIComment, MLObject).then((apiResult) => {
                if (apiResult.IsError) {
                    this.setState({
                        IsCallAPIError: !apiResult.IsError
                    });
                    this.showMessage(apiResult.Message);
                }
                else {
                    this.callLoadData(DestroyRequestID);
                    this.addNotification(apiResult.Message, apiResult.IsError)
                }
            })
        }
        else {
            this.showMessage('Vui lòng nhập nội dụng bình luận.')
        }

    }

    render() {
        const { IsSystem, IsOutPut, DestroyRequest, DestroyRequestDetail, DestroyRequestRL, CurrentReviewLevelName, isAutoReview, CurrentReviewLevelID, isUserNameReviewLevel, DestroyRequest_AttachmentList, DestroyRequest_ComementList, isHiddenButtonRV, IsStatus, IsStatusReject } = this.state;

        let IsAutoReview;

        if (isAutoReview == true && CurrentReviewLevelID == 0) {
            IsAutoReview = true
        }
        else {
            IsAutoReview = false
        }

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

        if (this.state.IsLoadDataComplete) {
            return (
                <div className="col-lg-12">
                    <ReactNotification ref={this.notificationDOMRef} />
                    <div className="card">
                        <h4 className="card-title">
                            <strong>{TitleFormDetail}</strong>
                        </h4>
                        <div className="card-body">
                            <DestroyRequestInfo
                                DestroyRequest={DestroyRequest}
                            />

                            <div className="card">
                                <div className="card-title group-card-title">
                                    <h4 className="title">Danh sách vật tư</h4>
                                </div>
                                <div className="card-body">
                                    <InputGrid
                                        colspan="12"
                                        controltype="GridControl"
                                        dataSource={DestroyRequestDetail}
                                        isHideHeaderToolbar={true}
                                        listColumn={GirdDestroyRequestDetailColumnList}
                                        name="lstDestroyRequestDetail"
                                        onValueChangeInputGrid={this.valueChangeInputGrid}
                                    />
                                </div>
                            </div>

                            {IsAutoReview == false ?
                                <div className="card">
                                    <div className="card-title group-card-title">
                                        <h4 className="title">Danh sách duyệt</h4>
                                    </div>
                                    <div className="card-body">
                                        <InputGrid
                                            name="lstDestroyRequestReviewLevel"
                                            controltype="GridControl"
                                            listColumn={GirdDestroyRequestRLColumnList}
                                            dataSource={DestroyRequestRL}
                                            isHideHeaderToolbar={true}
                                            //MLObjectDefinition={GridDestroyRequestRLMLObjectDefinition}
                                            colspan="12"
                                            onValueChangeInputGrid={this.valueChangeInputGrid}
                                        />
                                    </div>
                                </div>
                                : <div></div>
                            }

                            <Attachment
                                IsAttachment={true}
                                onSelectFile={this.handleSelectFile.bind(this)}
                                onDeletefile={this.handleDeletefile.bind(this)}
                                DataAttachment={DestroyRequest_AttachmentList}
                            />

                            <Comment
                                DataComments={DestroyRequest_ComementList}
                                IsComment={true}
                                onChangeValue={this.handleChangeValue.bind(this)}
                                onKeyPressSumit={this.handleKeyPressSumit.bind(this)}
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
                                <button className="btn btn-primary mr-3" type="button" onClick={this.handleSubmitOutputDestroyRequest}>Tạo phiếu xuất</button>
                                : <button disabled={true} className="btn btn-primary mr-3" type="button">Tạo phiếu xuất</button>
                            }

                            <Link to="/DestroyRequest">
                                <button className="btn btn-sm btn-outline btn-primary" type="button">Quay lại</button>
                            </Link>
                        </footer>
                    </div>
                </div >
            );
        }
        return (
            <label>Đang nạp dữ liệu...</label>
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: () => {
            dispatch(hideModal());
        }
    };
};

const Detail = connect(mapStateToProps, mapDispatchToProps)(DetailCom);
export default Detail;
