import React, { Component } from "react";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { MessageModal } from "../../../../common/components/Modal";
import {
    APIHostName,
} from "../constants";
import { ModalManager } from 'react-dynamic-modal';
class ShipmentOrderCommentCom extends Component {
    constructor(props) {
        super(props);
        this._handleInputChange = this._handleInputChange.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);
        this.state = {
            ShipmentOrder: this.props.ShipmentOrderComment.ShipmentOrder_CommentList,
            MObjectDefine: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.ShipmentOrderComment) !== JSON.stringify(nextProps.ShipmentOrderComment)) {
            this.setState({
                ShipmentOrder: nextProps.ShipmentOrderComment.ShipmentOrder_CommentList
            })
        }
    }

    _handleInputChange(e) {
        let inputvalue = e.target ? e.target.value : e.Value;
        let newMOject = Object.assign({}, this.state.MObjectDefine);
        newMOject.CommentContent = inputvalue;
        this.setState({ MObjectDefine: newMOject });
    }
    _showMessage(message) {
        ModalManager.open(<MessageModal title="Thông báo"
            message={message}
        />);
    }
    _genCommentTime(dates) {
        const date = new Date(Date.parse(dates));
        let currentDate = new Date();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let timeDisplay = (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute)
        var timeDiff = Math.abs(currentDate.getTime() - date.getTime());
        var diffDays = parseInt((timeDiff / (1000 * 3600 * 24)));
        var diffMinutes = parseInt((timeDiff / ( 3600 * 24)));
        if (diffDays < 1) {
            if(diffMinutes<20)
            {
                return 'Vừa mới';
            }
            else
            {
                return 'Hôm nay ' + timeDisplay;
            }
        } else if (diffDays == 1) {
            return 'Hôm qua ' + timeDisplay;
        } else {
            let month = date.getMonth() + 1;
            return date.getDate() + '/' + (month < 10 ? '0' + month : month) + date.getFullYear() + " " + timeDisplay;
        }
    }
    _handleKeyPress(e) {
        if (e.key === 'Enter') {
            this._sendComment();
        }
    }
    _sendComment() {
        if (this._validateComment()) {
            let MLObject = this.state.MObjectDefine;
            MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
            MLObject.ShipmentOrderID = this.props.ShipmentOrderComment.ShipmentOrderID;
            MLObject.CreatedOrderTime = this.props.ShipmentOrderComment.CreatedOrderTime;

            this.setState({ IsAddingComment: true });
            this.props.callFetchAPI(APIHostName, 'api/ShipmentOrder_Comment/Add', MLObject).then((apiResult) => {
                if (apiResult) {
                    if (apiResult.IsError == false) {
                     
                        this.setState({
                            ShipmentOrder: apiResult.ResultObject,
                            MObjectDefine: { CommentContent: '' }
                        })
                    } else {
                        this._showMessage(apiResult.ResultObject.Message);
                    }
                } else {
                    this._showMessage('Lỗi kết nỗi! Vui lòng thử lại');
                }
                this.setState({ IsAddingComment: false });
            });
        }

    }
    _validateComment() {
        if (this.state.MObjectDefine.CommentContent == undefined || this.state.MObjectDefine.CommentContent.length == 0 || String(this.state.MObjectDefine.CommentContent).trim() == "") {
            this._showMessage('Vui lòng nhập nội dung!');
            return false;
        }
        return true;
    }

    render() {
        return (
            <div className="card">
                <h4 className="card-title"><strong>Bình luận</strong></h4>
                <div className="card-body">
                    {this.state.ShipmentOrder.map((comment, index) => {
                        return (
                            <div className='form-row form-group lstcomment' key={index}>
                                <div className='comment_account'>
                                    <img className='comment_account_img' src='/src/img/avatar/1.jpg'></img>
                                </div>
                                <div className='comment_info'>
                                    <span className='comment_account_name'>{comment.CreatedUser}</span>
                                    <span className='comment_content'>{comment.CommentContent}</span>
                                    <span className='comment_account_time'>{this._genCommentTime(comment.CommentDate)}</span>
                                </div>
                            </div>
                        )
                    })}
                    {this.state.IsAddingComment ? (<div className='form-row form-group'>
                        ...loading
                    </div>) : ''}

                    <br></br>

                    <div className='form-row comment'>
                        <div className='comment_account'>
                            <img className='comment_account_img' src='/src/img/avatar/1.jpg'></img>
                        </div>
                        <div className='form-group col-md-11'>
                            <textarea maxLength={1950} value={this.state.MObjectDefine.CommentContent} onChange={this._handleInputChange} type='text' onKeyPress={this._handleKeyPress} placeholder='Gửi bình luận' className='form-control' rows={3}></textarea>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        AppInfo: state,
        FetchAPIInfo: state.FetchAPIInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        }
    }
}


const ShipmentOrderComment = connect(mapStateToProps, mapDispatchToProps)(ShipmentOrderCommentCom);
export default ShipmentOrderComment;