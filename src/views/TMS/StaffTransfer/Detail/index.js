import React from "react";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import ReactNotification from "react-notifications-component";
import { Link } from "react-router-dom";

import { PagePath, APIHostName, LoadInfoEdit, AddAPIComment, SearchAPIComment, AddAPIAttachment, APIUpdateBrowse } from './constants';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { showModal, hideModal } from '../../../../actions/modal';
import { updatePagePath } from "../../../../actions/pageAction";
import { callGetCache } from "../../../../actions/cacheAction";
import { MessageModal } from "../../../../common/components/Modal";

import MyContext from "./Context";
import StaffTransferCom from './StaffTransfer';
import StaffTransferDetailCom from './StaffTransferDetail';
import StaffTransfer_ReviewListCom from './StaffTransfer_ReviewList';
import Attachment from "../../../../common/components/Attachment";
import Comment from "../../../../common/components/Comment";

class DetailCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stateDataSource: null,
            stateDataComment: null,
            stateDataAttachment: null,
        };

        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();

        this.fetchStaffTransferDetail = this.fetchStaffTransferDetail.bind(this);
        this.fetchCommentData = this.fetchCommentData.bind(this);
        this.handleAgreeOrRefuse = this.handleAgreeOrRefuse.bind(this);
        this.handleSelectFile = this.handleSelectFile.bind(this);
        this.handleDeleteFile = this.handleDeleteFile.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
        this.handleTransferButton = this.handleTransferButton.bind(this);
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        this.fetchStaffTransferDetail();
        this.fetchCommentData();
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

    fetchStaffTransferDetail() {
        let { id } = this.props.match.params;

        this.props.callFetchAPI(APIHostName, LoadInfoEdit, id).then(apiResult => {
            if (apiResult.IsError) {
                this.showMessage(apiResult.Message);
            } else {
                this.setState({
                    stateDataSource: apiResult.ResultObject
                })
            }
        })
    }

    fetchCommentData() {
        const { id } = this.props.match.params;

        this.props.callFetchAPI(APIHostName, SearchAPIComment, id).then((apiResult) => {
            if (apiResult.IsError) {
                this.showMessage(apiResult.Message);
            }
            else {
                this.setState({
                    stateDataComment: apiResult.ResultObject
                })
            }
        })
    }

    handleAgreeOrRefuse(data) {
        const { stateDataSource } = this.state;
        const { ListStaffTransfer_ReviewList } = stateDataSource;

        const postListStaffTransfer_ReviewList = ListStaffTransfer_ReviewList.reduce((acc, val) => {
            if (val.ReviewLevelID == data.ReviewLevelID) {
                return [
                    ...acc,
                    {
                        StaffTransferID: data.StaffTransferID,
                        ReviewLevelID: data.ReviewLevelID,
                        ReviewStatus: data.ReviewStatus,
                        IsReviewed: data.IsReviewed,
                        ReviewedDate: data.ReviewedDate,
                        ReviewedNote: data.ReviewedNote,
                        UserName: data.UserName
                    }
                ]
            } else {
                return acc;
            }
        }, []);

        let postData = {
            StaffTransferID: stateDataSource.StaffTransferID,
            StaffTransferTypeID: stateDataSource.StaffTransferTypeID,
            StaffTransferTypeID: stateDataSource.StaffTransferTypeID,
            UpdatedUser: this.props.AppInfo.LoginInfo.Username,
            CurrentReviewLevelID: data.ReviewLevelID,
            ReviewedDate: data.ReviewedDate,
            ReviewedUser: this.props.AppInfo.LoginInfo.Username,
            ListStaffTransfer_ReviewList: postListStaffTransfer_ReviewList
        }

        if (data.ReviewLevelID == ListStaffTransfer_ReviewList[ListStaffTransfer_ReviewList.length - 1].ReviewLevelID) {
            postData = {
                ...postData,
                IsReviewed: true,
                IsTransfered: true,
                TransferedDate: new Date(),
                TransferedUser: this.props.AppInfo.LoginInfo.Username
            }
        } else {
            postData = {
                ...postData,
                IsReviewed: false,
                IsTransfered: false,
                TransferedDate: stateDataSource.TransferedDate,
                TransferedUser: stateDataSource.TransferedUser
            }
        }

        this.props.callFetchAPI(APIHostName, APIUpdateBrowse, postData).then((apiResult) => {
            if (apiResult.IsError) {
                this.showMessage(apiResult.Message);
            } else {
                this.setState({
                    stateDataSource: null
                })
                this.showMessage(apiResult.Message);
                this.fetchStaffTransferDetail();
            }
        })
    }

    handleSelectFile(e) {
        // const { stateDataSource } = this.state;

        // let data = new FormData();
        // const MLObject = {
        //     StaffTransferID: stateDataSource.StaffTransferID,
        //     RequestDate: stateDataSource.RequestDate,
        //     CreatedUser: this.props.AppInfo.LoginInfo.Username
        // };

        // data.append('file', e.target.files[0])
        // data.append("ObjStaffTransfer_Attachment", JSON.stringify(MLObject));

        // this.props.callFetchAPI(APIHostName, AddAPIAttachment, data).then((apiResult) => {
        //     if (apiResult.IsError) {
        //         this.showMessage(apiResult.Message);
        //     }
        //     else {
        //         this.showMessage("ok")
        //     }
        // })
        this.showMessage("Tính năng đang phát triển")
    }

    handleDeleteFile() {

    }

    handleCommentChange() {

    }

    handleCommentSubmit(valueCommentContent) {
        const { stateDataSource } = this.state;

        if (valueCommentContent.trim().length > 0) {
            const MLObject = {
                StaffTransferID: stateDataSource.StaffTransferID,
                RequestDate: stateDataSource.RequestDate,
                CommentDate: new Date(),
                CommentContent: valueCommentContent,
                CreatedUser: this.props.AppInfo.LoginInfo.Username,
                LoginLogID: JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID
            }

            console.log(MLObject)

            this.props.callFetchAPI(APIHostName, AddAPIComment, MLObject).then((apiResult) => {
                if (apiResult.IsError) {
                    this.showMessage(apiResult.Message);
                }
                else {
                    this.fetchCommentData();
                }
            })
        }
        else {
            this.showMessage('Vui lòng nhập nội dụng bình luận')
        }
    }

    handleTransferButton() {
        const { stateDataSource } = this.state;

        const postData = {
            StaffTransferID: stateDataSource.StaffTransferID,
            StaffTransferTypeID: stateDataSource.StaffTransferTypeID,
            StaffTransferTypeID: stateDataSource.StaffTransferTypeID,
            UpdatedUser: this.props.AppInfo.LoginInfo.Username,
            CurrentReviewLevelID: stateDataSource.CurrentReviewLevelID,
            IsReviewed: true,
            IsTransfered: true,
            TransferedDate: new Date(),
            TransferedUser: this.props.AppInfo.LoginInfo.Username,
            ReviewedDate: stateDataSource.ReviewedDate,
            ReviewedUser: stateDataSource.ReviewedUser,
            ListStaffTransfer_ReviewList: []
        }

        this.props.callFetchAPI(APIHostName, APIUpdateBrowse, postData).then((apiResult) => {
            if (apiResult.IsError) {
                this.showMessage(apiResult.Message);
            } else {
                this.setState({
                    stateDataSource: null
                })
                this.showMessage("Cập nhật thuyên chuyển thành công");
                this.fetchStaffTransferDetail();
            }
        })
    }

    render() {
        const { stateDataSource, stateDataComment } = this.state;

        if (stateDataSource == null || stateDataComment == null) {
            return (
                <React.Fragment></React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <ReactNotification ref={this.notificationDOMRef} />
                    <div className="col-lg-12">
                        <div className="card">
                            <h4 className="card-title">
                                <strong>Thông tin yêu cầu thuyên chuyển</strong>
                            </h4>
                            <div className="card-body">
                                <MyContext.Provider value={{
                                    contextStaffTransfer: stateDataSource,
                                    handleAgreeOrRefuse: this.handleAgreeOrRefuse
                                }}>
                                    <div className="mb-4">
                                        <StaffTransferCom />
                                    </div>
                                    <div className="mb-4">
                                        <StaffTransferDetailCom />
                                    </div>
                                    {
                                        !stateDataSource.IsAutoReview
                                            ? <div className="mb-4"><StaffTransfer_ReviewListCom /></div>
                                            : <React.Fragment></React.Fragment>
                                    }
                                </MyContext.Provider>

                                <Attachment
                                    IsAttachment={true}
                                    onSelectFile={this.handleSelectFile}
                                    onDeletefile={this.handleDeleteFile}
                                    DataAttachment={[]}
                                />

                                <Comment
                                    DataComments={stateDataComment}
                                    IsComment={true}
                                    onChangeValue={this.handleCommentChange}
                                    onKeyPressSumit={this.handleCommentSubmit}
                                />
                            </div>

                            <div className="d-flex justify-content-end mr-4 mb-4">
                                {
                                    (stateDataSource.IsAutoReview && !stateDataSource.IsAutoTransfer)
                                        ? <button className="btn btn-primary mr-3" type="button" onClick={this.handleTransferButton} disabled={stateDataSource.IsTransfered}>
                                            Thuyên chuyển
                                        </button>
                                        : <React.Fragment></React.Fragment>
                                }

                                <Link to="/StaffTransfer">
                                    <button className="btn btn-sm btn-outline btn-primary" type="button">Quay lại</button>
                                </Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailCom);