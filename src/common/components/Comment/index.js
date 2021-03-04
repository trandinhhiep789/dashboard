import React, { Component } from "react";
import { connect } from 'react-redux';
import { CDN_UPLOAD_FILE } from '../../../constants/systemVars.js'

class CommentCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Comments: this.props.DataComments,
            FullName: '',
            CommentValue: ''
        }
    }

    componentDidMount() {
        this.setState({
            FullName: this.props.AppInfo.LoginInfo.LoginUserInfo.UserName + " - " + this.props.AppInfo.LoginInfo.LoginUserInfo.FullName
        })
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.DataComments) !== JSON.stringify(nextProps.DataComments)) {
            this.setState({
                Comments: nextProps.DataComments
            })
        }
    }


    handleInputChange(e) {
        let inputvalue = e.target ? e.target.value : e.Value;
        this.setState({ CommentValue: inputvalue });
        this.props.onChangeValue(inputvalue);
    }

    genCommentTime(dates) {
        const date = new Date(Date.parse(dates));
        let currentDate = new Date();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let timeDisplay = (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute)
        var timeDiff = Math.abs(currentDate.getTime() - date.getTime());
        var diffDays = parseInt((timeDiff / (1000 * 3600 * 24)));
        var diffMinutes = parseInt((timeDiff / (3600 * 24)));
        if (diffDays < 1) {
            if (diffMinutes < 20) {
                return 'Vừa mới';
            }
            else {
                return 'Hôm nay ' + timeDisplay;
            }
        } else if (diffDays == 1) {
            return 'Hôm qua ' + timeDisplay;
        } else {
            let month = date.getMonth() + 1;
            return date.getDate() + '/' + (month < 10 ? '0' + month : month) + date.getFullYear() + " " + timeDisplay;
        }
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.onSendComment();
        }
    }

    onSendComment() {
        const { CommentValue } = this.state;
        this.props.onKeyPressSumit(CommentValue);
        this.setState({ CommentValue: '' });
    }


    render() {
        const { Comments, FullName, CommentValue } = this.state;
        return (
            <div className='card Comments'>
                {Comments.length > 0 ? <div className="card-title group-card-title"><h4 className="title">Bình luận</h4></div> : ''}
                <div className='card-body'>
                    <div className="lstcomment">
                        {this.state.Comments.map((comment, index) => {
                            return (
                                <div className='form-row form-group item' key={index}>
                                    <div className='comment_account'>
                                        <img className='comment_account_img' src='/src/img/avatar/1.jpg'></img>
                                    </div>
                                    <div className='comment_info'>
                                        <div className='comment_info_account'>
                                            <span className='comment_account_name'>{comment.CreatedUser + " - " + comment.FullName}</span>
                                        </div>
                                        <div className='comment_info_conent'>
                                            <span className='comment_content'>{comment.CommentContent}</span>
                                            <span className='comment_account_time'>{this.genCommentTime(comment.CommentDate)}</span>
                                        </div>

                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {this.props.IsComment == true && (
                        <div className='form-row comment frmcomment'>
                            <div className='comment_account'>
                                <img className='comment_account_img' src='/src/img/avatar/1.jpg'></img>
                                <div className="txtFullName">
                                    <span>{FullName}</span>
                                </div>
                            </div>
                            <div className='form-group col-md-12 txtcomment'>
                                <textarea maxLength={1900} value={CommentValue} onChange={this.handleInputChange.bind(this)} type='text' onKeyPress={this.handleKeyPress.bind(this)} placeholder='Gửi bình luận' className='form-control' rows={3}></textarea>
                            </div>
                        </div>)
                    }
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        }
    }
}


const Comment = connect(mapStateToProps, mapDispatchToProps)(CommentCom);
export default Comment;