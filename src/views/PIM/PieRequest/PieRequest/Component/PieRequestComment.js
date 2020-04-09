import React from "react";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { APIHostName } from '../constants';
import "../../../../../../node_modules/react-datetime/css/react-datetime.css";
import { ModalManager } from 'react-dynamic-modal';
import './PieRequest.css';
class PieRequestComment extends React.Component {
    constructor(props) {
        super(props);
        this._handleInputChange = this._handleInputChange.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);
        this.state = {
            PieRequestID: -1,
            PieRequest: {},
            MObjectDefine: {},
            DataSource: [
            ]
        }
    }
    componentDidMount() {
        this.loadPieRequestComment(this.props.PieRequestID);
    }
    loadPieRequestComment(PieRequestID) {
        if (PieRequestID) {
            this.setState({ IsLoading: true });
            let objSearchData = [
                {
                    SearchKey: 'v_Keyword',
                    SearchValue: PieRequestID
                }
            ]
            this.props.callFetchAPI(APIHostName, 'api/PieRequest_Comment/Search', objSearchData).then((apiResult) => {
                if (apiResult && !apiResult.IsError && apiResult.ResultObject) {
                    apiResult.ResultObject.map((item) => {
                        item.CreatedDate = new Date(item.CreatedDate);
                        item.CommentTime = this._genCommentTime(item.CreatedDate);
                    })
                    this.setState({
                        DataSource: apiResult.ResultObject,
                        MObjectDefine: apiResult.ResultObject,
                        IsCallAPIError: apiResult.IsError, ErrorMessage: apiResult.Message
                    })
                }
                this.setState({ IsLoading: false });
            });
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
    _genCommentTime(date) {
        let currentDate = new Date();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let timeDisplay = (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute)

        var timeDiff = Math.abs(currentDate.getTime() - date.getTime());
        var diffDays = parseInt((timeDiff / (1000 * 3600 * 24)));
        if (diffDays < 1) {
            return 'Hôm nay ' + timeDisplay;
        } else if (diffDays == 1) {
            return 'Hôm qua ' + timeDisplay;
        } else {
            let month = date.getMonth() + 1;
            return date.getDate() + '/' + (month < 10 ? '0' + month : month) + date.getFullYear() + " " + timeDisplay;
        }
    }
    _handleKeyPress(e) {
      //  console.log(e);
        if (e.key === 'Enter') {
            this._sendComment();
        }
    }
    _sendComment() {
        if (this.props.PieRequestID) {
            if (this._validateComment()) {
                let MLObject = this.state.MObjectDefine;
                MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
                MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID
                MLObject.PieRequestID = this.props.PieRequestID;
                this.setState({ IsAddingComment: true });
                this.props.callFetchAPI(APIHostName, 'api/PieRequest_Comment/Add', MLObject).then((apiResult) => {
                    if (apiResult) {
                        if (apiResult.IsError == false) {
                            let newComment = {};
                            newComment.CreatedUser = this.props.AppInfo.LoginInfo.Username;
                            newComment.CommentContent = MLObject.CommentContent;
                            newComment.CommentTime = 'Vừa mới';
                            this.setState({
                                DataSource: this.state.DataSource.concat([newComment]),
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
    }
    _validateComment() {
        if (!this.state.MObjectDefine.CommentContent) {
            this._showMessage('Vui lòng nhập nội dung!');
            return false;
        }
        return true;
    }
    render() {
        if (this.state.IsLoading) return <p>Đang lấy dữ liệu...</p>;
        if (this.state.IsCallAPIError) return <p>{this.state.ErrorMessage}</p>
        return (
            <div className='col-lg-12'>
                <div className="card">
                    <h4 className="card-title"><strong>Bình luận: </strong></h4>
                    <div className="card-body">
                        {/* <div className='form-row form-group lstcomment'>
                            <div className='comment_account'>
                                <img className='comment_account_img' src='/src/img/avatar/1.jpg'></img>
                            </div>
                            <div className='comment_info'>
                                <span className='comment_account_name'>administrator</span>
                                <span className='comment_content'>Tạo yêu cầu</span>
                                <span className='comment_account_time'>27/022019 08:35</span>
                            </div>
                            <div className='form-row form-group'>
                                <div className='comment_account'>
                                    <img className='comment_account_img' src='/src/img/avatar/1.jpg'></img>
                                </div>
                                <div className='comment_info'>
                                    <span className='comment_account_name'>administrator</span>
                                    <span className='comment_content'>Tạo yêu cầu 34123123</span>
                                    <span className='comment_account_time'>27/022019 08:35</span>
                                </div>

                            </div>
                            <div className='form-row form-group'>
                                <div className='comment_account'>
                                    <img className='comment_account_img' src='/src/img/avatar/1.jpg'></img>
                                </div>
                                <div className='comment_info'>
                                    <span className='comment_account_name'>administrator</span>
                                    <span className='comment_content'>Tạo yêu cầu 34123123</span>
                                    <span className='comment_account_time'>27/022019 08:35</span>
                                </div>

                            </div>
                        </div> */}
                        {this.state.DataSource.map((comment, index) => {
                            return (
                                <div className='form-row form-group lstcomment' key={index}>
                                    <div className='comment_account'>
                                        <img className='comment_account_img' src='/src/img/avatar/1.jpg'></img>
                                    </div>
                                    <div className='comment_info'>
                                        <span className='comment_account_name'>{comment.CreatedUser}</span>
                                        <span className='comment_content'>{comment.CommentContent}</span>
                                        <span className='comment_account_time'>{comment.CommentTime}</span>
                                    </div>
                                </div>
                            )
                        })}
                        {this.state.IsAddingComment ? (<div className='form-row form-group'>
                            ...loading
                        </div>) : ''}

                        <br></br>
                        {this.props.IsComment == true &&(
                        <div className='form-row comment'>
                            <div className='comment_account'>
                                <img className='comment_account_img' src='/src/img/avatar/1.jpg'></img>
                            </div>
                                <div className='form-group col-md-11'>
                                    <textarea value={this.state.MObjectDefine.CommentContent} onChange={this._handleInputChange} type='text' onKeyPress={this._handleKeyPress} placeholder='Gửi bình luận' className='form-control' rows={3}></textarea>
                                </div>
                        </div>)}
                    
                    
                    </div>
                </div>
            </div >
        )
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
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PieRequestComment);