import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ModalManager } from "react-dynamic-modal";
import ReactNotification from "react-notifications-component";

import { updatePagePath } from '../../../../actions/pageAction'
import { callFetchAPI } from '../../../../actions/fetchAPIAction'
import { MessageModal } from '../../../../common/components/Modal'
import RenfundSuppliesInfo from './RenfundSuppliesInfo'
import {
    APIHostName,
    LoadAPIPath,
    DetailAPIPath,
    TitleFormDetail,
    GirdMTReturnRequestDetailColumnList,
    GirdMTReturnRequestReviewLevelColumnList
} from '../constants'
import InputGrid from '../../../../common/components/Form/AdvanceForm/FormControl/InputGrid'

export class Detail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            DestroyRequestID: '',
            IsCallAPIError: false,
            RenfundSupplies: {},
            MTReturnRequestDetail: [],
            MTReturnRequestReviewLevel: [],
            isAutoReview: false,
            CurrentReviewLevelID: '',
            isUserNameReviewLevel: false
        }

        this.callLoadData = this.callLoadData.bind(this);
        this.showMessage = this.showMessage.bind(this);
    }

    componentDidMount() {
        const { updatePagePath } = this.props;
        updatePagePath(DetailAPIPath);
        this.setState({
            DestroyRequestID: this.props.match.params.id
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
                console.log(apiResult)
                const { lstMTReturnRequestDetail, lstMTReturnRequestReviewLevel, IsreViewed } = apiResult.ResultObject;

                const resultRenfundSuppliesReviewLevel = lstMTReturnRequestReviewLevel.map((item, index) => {
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
                if (apiResult.ResultObject.IsSystem) {
                    disabledIsOutPut = true
                }
                else {
                    if (apiResult.ResultObject.IsreViewed == true && apiResult.ResultObject.IsCreatedInputVoucher == false) {
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
                })
            }
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

    render() {
        const { RenfundSupplies, MTReturnRequestDetail, MTReturnRequestReviewLevel, isAutoReview, CurrentReviewLevelID } = this.state;

        let IsAutoReview;

        if (isAutoReview == true && CurrentReviewLevelID == 0) {
            IsAutoReview = true
        }
        else {
            IsAutoReview = false
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
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
