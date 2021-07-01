import React from "react";
import { connect } from "react-redux";

import MyContext from "../Context";
import { formatDate } from '../../../../../common/library/CommonLib';

class StaffTransferCom extends React.Component {
    static contextType = MyContext;

    constructor(props) {
        super(props);

        this.state = {

        };

        this.searchref = React.createRef();

    }

    componentDidMount() {

    }

    render() {
        const { contextStaffTransfer } = this.context;

        return (
            <React.Fragment>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Mã yêu cầu thuyên Chuyển: </label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{contextStaffTransfer.StaffTransferID}</label>
                    </div>

                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Loại yêu cầu thuyên chuyển: </label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {`${contextStaffTransfer.StaffTransferTypeID} - ${contextStaffTransfer.StaffTransferTypeName}`}
                        </label>
                    </div>

                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Tiêu Đề: </label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{contextStaffTransfer.StaffTransferTitle}</label>
                    </div>

                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Người Yêu Cầu: </label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {`${contextStaffTransfer.RequestUser} - ${contextStaffTransfer.RequestUserName}`}
                        </label>
                    </div>

                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Kho Yêu Cầu: </label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {`${contextStaffTransfer.RequestStoreID} - ${contextStaffTransfer.RequestStoreName}`}
                        </label>
                    </div>

                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Ngày Yêu Cầu: </label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {formatDate(contextStaffTransfer.RequestDate, true)}
                        </label>
                    </div>

                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Mô tả:</label>
                    </div>
                    <div className="form-group col-md-10">
                        <label className="col-form-label">{contextStaffTransfer.Description}</label>
                    </div>

                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Tự động duyệt:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <div className="checkbox customCheckbox">
                            <label><input type="checkbox" disabled={true} defaultChecked={contextStaffTransfer.IsAutoReview} />
                                <span className="cr"><i className="cr-icon fa fa-check"></i>
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Tự động thuyên chuyển:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <div className="checkbox customCheckbox">
                            <label><input type="checkbox" disabled={true} defaultChecked={contextStaffTransfer.IsAutoTransfer} />
                                <span className="cr"><i className="cr-icon fa fa-check"></i>
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Đã duyệt:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <div className="checkbox customCheckbox">
                            <label><input type="checkbox" disabled={true} defaultChecked={contextStaffTransfer.IsReviewed} />
                                <span className="cr"><i className="cr-icon fa fa-check"></i>
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Đã thuyên chuyển:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <div className="checkbox customCheckbox">
                            <label><input type="checkbox" disabled={true} defaultChecked={contextStaffTransfer.IsTransfered} />
                                <span className="cr"><i className="cr-icon fa fa-check"></i>
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Người duyệt:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {
                                contextStaffTransfer.ReviewedUser != ""
                                    ? `${contextStaffTransfer.ReviewedUser} - ${contextStaffTransfer.ReviewedUserName}`
                                    : ""
                            }
                        </label>
                    </div>

                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Người thuyên chuyển:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {
                                contextStaffTransfer.TransferedUser != ""
                                    ? `${contextStaffTransfer.TransferedUser} - ${contextStaffTransfer.TransferedUserName}`
                                    : ""
                            }
                        </label>
                    </div>

                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Ngày duyệt:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{formatDate(contextStaffTransfer.ReviewedDate, true)}</label>
                    </div>

                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Ngày thuyên chuyển:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{formatDate(contextStaffTransfer.TransferedDate, true)}</label>
                    </div>
                </div>
            </React.Fragment>
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

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StaffTransferCom);