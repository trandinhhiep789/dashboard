import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,

} from "react-router-dom";
import { ModalManager } from "react-dynamic-modal";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import InputGrid from "../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";

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
import { MessageModal } from "../../../../common/components/Modal";

import { showModal, hideModal } from '../../../../actions/modal';
import ReactNotification from "react-notifications-component";
import DestroyRequestInfo from './DestroyRequestInfo.js'
import Attachment from "../../../../common/components/Attachment";
import Comment from "../../../../common/components/Comment";
import { MODAL_TYPE_COMMONTMODALS } from "../../../../constants/actionTypes";
import DestroyRequsestNoteRV from "../Component/DestroyRequsestNoteRV";
import { el } from "date-fns/locale";
class DetailCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DataSource: {},
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsLoadDataComplete: false,
            IsSystem: false,
            DestroyRequest: {},
            DestroyRequestDetail: [],
            DestroyRequestRL: [],
            DestroyRequest_AttachmentList: [],
            DestroyRequest_ComementList: [],
            DestroyRequestID: '',
            RequestDate: '',
            IsOutPut: false,
            CurrentReviewLevelID: '',
            CurrentReviewLevelName: '',
            isAutoReview: false,
            lastReviewLevelID: '',
            isUserNameReviewLevel: false,
            isHiddenButtonRV: false,
            IsStatus: false,
            IsStatusReject: false
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
            console.log("apiResult", apiResult, id)
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
                        if(item.ReviewStatus == 1){
                            item.ReviewStatusLable = "Đã duyệt";
                        }
                        else{
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
                        if (resultUserNameReviewLevel[0].UserName.trim() == Username.trim()) {
                            this.setState({
                                isUserNameReviewLevel: true
                            })
                        }
                    }

                    const returnStatusDiffer = lstDestroyRequestReviewLevel.filter((item, index) => {
                        if (item.ReviewStatus != 1 ) {
                            return item;
                        }
                    })
                    console.log("returnStatusDiffer", returnStatusDiffer)
                    const returnStatusReject = lstDestroyRequestReviewLevel.filter((item, index) => {
                        if (item.ReviewStatus == 2 ) {
                            return item;
                        }
                    })
                    console.log("returnStatusReject", returnStatusReject)
                    if(returnStatusReject.length > 0){
                        this.setState({
                            IsStatusReject: true
                        })
                    }

                    if(returnStatusDiffer.length > 0){
                        this.setState({
                            IsStatus: true
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

                // console.log("result", resultDestroyRequestReviewLevel)
                this.setState({
                    RequestDate: apiResult.ResultObject.RequestDate,
                    DestroyRequest: apiResult.ResultObject,
                    DestroyRequestDetail: lstDestroyRequestDetail,
                    DestroyRequestRL: resultDestroyRequestReviewLevel,
                    DataSource: apiResult.ResultObject,
                    IsLoadDataComplete: true,
                    isHiddenButtonRV: apiResult.ResultObject.IsreViewed,
                    IsSystem: IsSystem,
                    IsOutPut: disabledIsOutPut,
                    CurrentReviewLevelID: CurrentReviewLevelID,
                    CurrentReviewLevelName: ReviewLevelName,
                    isAutoReview: IsreViewed,
                    lastReviewLevelID: lstDestroyRequestReviewLevel.length > 0 ? lstDestroyRequestReviewLevel[lstDestroyRequestReviewLevel.length - 1].ReviewLevelID : 0,
                    DestroyRequest_AttachmentList: apiResult.ResultObject.DestroyRequest_AttachmentList,
                    DestroyRequest_ComementList: apiResult.ResultObject.DestroyRequest_CommentList,


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
            console.log("MLObject", MLObject, apiResult)
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
        debugger
        console.log(id)
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
                if (item.ReviewLevelID != CurrentReviewLevelID) {
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

        if(objData.ReviewStatus == 1 ){
            MLObject.IsreViewed = 1;
            MLObject.IsreViewedDestroyRequest = !!isLastList ? 1 : 0;
        }
        else{
            MLObject.IsreViewedDestroyRequest = 0;
        }

        MLObject.ReviewLevelID = CurrentReviewLevelID;

        MLObject.CurrentReviewLevelID = !!isLastList ? CurrentReviewLevelID : nextReviewLevelID[0].ReviewLevelID;

         console.log("aa", MLObject);
         
        this.props.callFetchAPI(APIHostName, UpdateCurrentReviewLevelAPIPath, MLObject).then((apiResult) => {
            // console.log("id",  apiResult)
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
        // console.log('value', value)
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

        let IsDisableButtonOutPut = false;
        if(IsOutPut == false ){
            IsDisableButtonOutPut= false
        }
        else{
            if(IsStatus == true || IsStatusReject ){
                IsDisableButtonOutPut= true
            }
            else{
                IsDisableButtonOutPut= false
            }
            
        }

        // console.log('IsStatus', IsStatus, IsOutPut, IsDisableButtonOutPut)

        
        

        let IsExitBtnReview = false;
        if (isUserNameReviewLevel == true ) {
            if(isHiddenButtonRV){
                IsExitBtnReview = true;
            }
            else{
                if(IsStatusReject){
                    IsExitBtnReview = true
                }
                else{
                    IsExitBtnReview = false
                }
            }
            
        }
        else {
            IsExitBtnReview = true
        }


        console.log('IsExitBtnReview',IsExitBtnReview, isHiddenButtonRV, isUserNameReviewLevel)

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
                                        name="lstDestroyRequestDetail"
                                        controltype="GridControl"
                                        listColumn={GirdDestroyRequestDetailColumnList}
                                        dataSource={DestroyRequestDetail}
                                        isHideHeaderToolbar={true}
                                        //MLObjectDefinition={GridMLObjectDefinition}
                                        colspan="12"
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
                                    <div className="btn-group btn-group-dropdown mr-3">
                                        <button className="btn btn-light dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="true">{CurrentReviewLevelName}</button>
                                        <div className="dropdown-menu" x-placement="bottom-start" >
                                            <button className="dropdown-item" type="button" onClick={() => this.handleInsertDRNoteRV(1)}>Đồng ý</button>
                                            <button className="dropdown-item" type="button" onClick={() => this.handleInsertDRNoteRV(2)}>Từ chối</button>
                                        </div>
                                    </div>
                                    :
                                    <div className="btn-group btn-group-dropdown mr-3">
                                        <button className="btn btn-light dropdown-toggle dropdown-toggle-disabled" disabled title="Bạn không có quyền duyệt" type="button" data-toggle="dropdown" aria-expanded="true">{CurrentReviewLevelName}</button>
                                        <div className="dropdown-menu" x-placement="bottom-start" >
                                            <button className="dropdown-item" type="button">Đồng ý</button>
                                            <button className="dropdown-item" type="button">Từ chối</button>
                                        </div>
                                    </div>
                                : <div></div>

                            }
                            {IsDisableButtonOutPut == false ? 
                                <button  className="btn btn-primary mr-3" type="button" onClick={this.handleSubmitOutputDestroyRequest}>Tạo phiếu xuất</button>
                                : <button disabled={true} className="btn btn-primary mr-3" type="button">Tạo phiếu xuất</button>
                            }
                            
                            <Link to="/DestroyRequest">
                                <button className="btn btn-sm btn-outline btn-primary" type="button">Quay lại</button>
                            </Link>
                        </footer>
                    </div>
                </div>
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
