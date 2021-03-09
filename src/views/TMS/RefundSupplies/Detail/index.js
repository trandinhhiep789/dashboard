import React, { Component } from 'react';
import {
    Link
} from "react-router-dom";
import { connect } from 'react-redux';
import { ModalManager } from "react-dynamic-modal";
import ReactNotification from "react-notifications-component";

import { updatePagePath } from '../../../../actions/pageAction';
import { callFetchAPI } from '../../../../actions/fetchAPIAction';
import { MessageModal } from '../../../../common/components/Modal';
import RenfundSuppliesInfo from './RenfundSuppliesInfo';
import {
    APIHostName,
    LoadAPIPath,
    DetailAPIPath,
    TitleFormDetail,
    GirdMTReturnRequestDetailColumnList,
    GirdMTReturnRequestReviewLevelColumnList
} from '../constants';
import InputGrid from '../../../../common/components/Form/AdvanceForm/FormControl/InputGrid';
import Attachment from "../../../../common/components/Attachment";
import Comment from "../../../../common/components/Comment";

export class DetailCom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            RenfundSuppliesID: '',
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
        this.handleSubmitOutputRenfundSupplies = this.handleSubmitOutputRenfundSupplies.bind(this);
        this.handleInsertDRNoteRV = this.handleInsertDRNoteRV.bind(this);
    }

    componentDidMount() {
        const { updatePagePath } = this.props;
        updatePagePath(DetailAPIPath);
        this.setState({
            RenfundSuppliesID: this.props.match.params.id
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
                })
            }
        });


    }

    handleSelectFile() {
        this.showMessage("Tính năng đang phát triển")
    }

    handleDeletefile() {

    }

    handleChangeValue() {

    }

    handleKeyPressSumit() {
        this.showMessage("Tính năng đang phát triển")
    }

    handleSubmitOutputRenfundSupplies() {
        this.showMessage("Tính năng đang phát triển")
    }

    handleInsertDRNoteRV(id) {
        this.showMessage("Tính năng đang phát triển")
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
                                    listColumn={GirdMTReturnRequestDetailColumnList}
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
                            DataComments={[]}
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
                            <button className="btn btn-primary mr-3" type="button" onClick={this.handleSubmitOutputRenfundSupplies}>Tạo phiếu xuất</button>
                            : <button disabled={true} className="btn btn-primary mr-3" type="button">Tạo phiếu nhập</button>
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
