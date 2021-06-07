import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ModalManager } from "react-dynamic-modal";
import { Link } from 'react-router-dom';

import ReactContext from '../ReactContext'
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import {
    APIHostName, LoadAPIPath
} from "../constants";
import { MessageModal } from "../../../../common/components/Modal";
import { formatDate } from "../../../../common/library/CommonLib";

export class ShipmentQualityAssessDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {}
        }

        this.fetchShipmentQualityAssessDetail = this.fetchShipmentQualityAssessDetail.bind(this);
        this.handleCreatedUser = this.handleCreatedUser.bind(this);
    }

    componentDidMount() {
        this.fetchShipmentQualityAssessDetail();
    }

    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
            />
        );
    }

    fetchShipmentQualityAssessDetail() {
        this.props.callFetchAPI(APIHostName, LoadAPIPath, this.props.ShipmentQualityAssessId).then(apiResult => {
            if (!apiResult.IsError) {
                this.setState({
                    data: apiResult.ResultObject
                })
            } else {
                this.showMessage(apiResult.Message);
            }
        });
    }

    handleCreatedUser(AppInfo) {
        try {
            const { UserName, FullName } = AppInfo.LoginInfo.LoginUserInfo;
            return `${UserName} - ${FullName}`
        } catch (error) {
            return ``;
        }
    }

    render() {
        const { data } = this.state;
        const { AppInfo } = this.props;

        return (
            <ReactContext.Consumer>
                {
                    ({ dataGrid, handleDataGrid }) => (
                        <React.Fragment>
                            {
                                (Object.keys(data).length != 0 && data.constructor === Object) && <div className="container my-3 e-3">
                                    <div className="row mb-2">
                                        <div class="col">
                                            <div className="row">
                                                <div className="col-5 d-flex d-flex">Mã đánh giá</div>
                                                <div>{data.ShipmentQualityAssessID}</div>
                                            </div>
                                        </div>

                                        <div class="col">
                                            <div className="row">
                                                <div className="col-5 d-flex">Mã vận đơn</div>
                                                <div>
                                                    <Link target="_blank" to={`/ShipmentOrder/Detail/${data.ShipmentOrderID}`}>
                                                        {data.ShipmentOrderID}
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mb-2">
                                        <div class="col">
                                            <div className="row">
                                                <div className="col-5 d-flex">Ngày đánh giá</div>
                                                <div>{formatDate(data.AssessDate, false)}</div>
                                            </div>
                                        </div>

                                        <div class="col">
                                            <div className="row">
                                                <div className="col-5 d-flex">Mã đơn hàng đối tác</div>
                                                <div>{data.PartnerSaleOrderID}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mb-2">
                                        <div class="col">
                                            <div className="row">
                                                <div className="col-5 d-flex">Giá trị đánh giá</div>
                                                <div>{data.QualityAssessValue}</div>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div className="row">
                                                <div className="col-5 d-flex">Người tạo</div>
                                                <div>{this.handleCreatedUser(AppInfo)}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mb-2">
                                        <div class="col">
                                            <div className="row">
                                                <div className="col-5 d-flex">Loại tiêu chí đánh giá</div>
                                                <div>{data.QualityAssessTypeID}</div>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div className="row">
                                                <div className="col-5 d-flex">Ngày tạo</div>
                                                <div>{formatDate(data.CreatedDate, false)}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mb-2">
                                        <div class="col">
                                            <div className="row">
                                                <div className="col-5 d-flex">Ngày duyệt gỡ đánh giá</div>
                                                <div>{data.RevokeAssessReviewDate}</div>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div className="row">
                                                <div className="col-5 d-flex">Người cập nhập</div>
                                                <div>{data.UpdatedUser}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mb-2">
                                        <div class="col">
                                            <div className="row">
                                                <div className="col-5 d-flex">Người duyệt gỡ đánh giá</div>
                                                <div>{data.RevokeAssessReviewUser}</div>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div className="row">
                                                <div className="col-5 d-flex">Ngày cập nhật</div>
                                                <div>{data.UpdatedDate}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mb-2">
                                        <div class="col">
                                            <div className="row">
                                                <div className="col-5 d-flex">Đã duyệt gỡ đánh giá</div>
                                                <div>{data.IsRevokeAssessReview}</div>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div className="row">
                                                <div className="col-5 d-flex">Người xóa</div>
                                                <div>{data.DeletedUser}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mb-2">
                                        <div class="col">
                                            <div className="row">
                                                <div className="col-5 d-flex">Ghi chú đánh giá</div>
                                                <div className="col-7 pl-0">
                                                    <textarea
                                                        type='text'
                                                        className='form-control'
                                                        rows={2}
                                                        disabled
                                                    >
                                                        {data.QualityAssessNote}
                                                    </textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div className="row">
                                                <div className="col-5 d-flex">Ngày xóa</div>
                                                <div>{data.DeletedDate}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mb-2">
                                        <div class="col">
                                            <div className="row">
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div className="row">
                                                <div className="col-5 d-flex">Lý do xóa</div>
                                                <div className="col-7 pl-0">
                                                    <textarea
                                                        type='text'
                                                        className='form-control'
                                                        rows={2}
                                                        disabled
                                                    >
                                                        {data.DeletedNote}
                                                    </textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </React.Fragment>
                    )
                }
            </ReactContext.Consumer>

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
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShipmentQualityAssessDetail)
