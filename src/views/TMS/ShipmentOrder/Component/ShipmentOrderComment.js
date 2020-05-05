import React, { Component } from "react";
import { connect } from 'react-redux';
import InputGrid from "../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
import {
    DataGridColumnItemList
} from "../constants";
class ShipmentOrderCommentCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ShipmentOrder: this.props.ShipmentOrderComment
        }
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.ShipmentOrderComment) !== JSON.stringify(nextProps.ShipmentOrderComment)) {
            this.setState({
                ShipmentOrder: nextProps.ShipmentOrderComment
            })
        }
    }

    render() {
        return (
            <div className="card">
                <h4 className="card-title"><strong>Bình luận</strong></h4>
                <div className="card-body">
                    <div className='form-row form-group lstcomment'>
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
                    </div>
                    <div className='form-row comment'>
                        <div className='comment_account'>
                            <img className='comment_account_img' src='/src/img/avatar/1.jpg'></img>
                        </div>
                        <div className='form-group col-md-11'>
                            <textarea value="" type='text' placeholder='Gửi bình luận' className='form-control' rows={3}></textarea>
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        }
    }
}


const ShipmentOrderComment = connect(mapStateToProps, mapDispatchToProps)(ShipmentOrderCommentCom);
export default ShipmentOrderComment;