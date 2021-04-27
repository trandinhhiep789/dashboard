import React, { Component } from 'react'
import { connect } from 'react-redux'

import { formatDate } from '../../../../common/library/CommonLib'

export class RenfundSuppliesInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            RenfundSupplies: {}
        }
    }

    componentDidMount() {
        this.setState({
            RenfundSupplies: this.props.RenfundSupplies
        })
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.RenfundSupplies) !== JSON.stringify(nextProps.RenfundSupplies)) {
            this.setState({ RenfundSupplies: nextProps.RenfundSupplies });
        }
    }

    render() {
        const { RenfundSupplies } = this.state;

        return (
            <React.Fragment>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Mã yêu cầu:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {RenfundSupplies.MTReturnRequestID}
                        </label>
                    </div><div className="form-group col-md-2">
                        <label className="col-form-label bold">Loại yêu cầu:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {RenfundSupplies.MTReturnRequestTypeName}
                        </label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Tiêu đề:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {RenfundSupplies.MTReturnRequestTitle}
                        </label>
                    </div>

                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Người yêu cầu:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {
                                `${RenfundSupplies.RequestUser} ${RenfundSupplies.RequestFullName && '-'} ${RenfundSupplies.RequestFullName}`
                            }
                        </label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Kho yêu cầu:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {RenfundSupplies.StoreName}
                        </label>
                    </div>

                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Ngày yêu cầu:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {formatDate(RenfundSupplies.RequestDate, false)}
                        </label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Đã duyệt:</label>
                    </div>
                    <div className="form-group col-md-4">

                        <div className="checkbox customCheckbox">
                            <label>
                                <input type="checkbox" disabled={true} defaultChecked={RenfundSupplies.IsreViewed} />
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
                                `${RenfundSupplies.reViewedUser} ${RenfundSupplies.ReViewedFullName && "-"} ${RenfundSupplies.ReViewedFullName}`
                            }
                        </label>
                    </div>
                </div>

                <div className="form-row">

                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Ngày duyệt:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {formatDate(RenfundSupplies.reViewedDate, false)}
                        </label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Đã tạo phiếu nhập:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <div className="checkbox customCheckbox">
                            <label>
                                <input type="checkbox" disabled={true} defaultChecked={RenfundSupplies.IsCreatedInputVoucher} />
                                <span className="cr"><i className="cr-icon fa fa-check"></i>
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Người tạo phiếu nhập vật tư:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {
                                `${RenfundSupplies.CreatedInputVoucherUser} ${RenfundSupplies.CreatedInputVoucherUser && "-"} ${RenfundSupplies.CreatedInputVoucherFullName}`
                            }
                        </label>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Ngày tạo phiếu nhập:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <div className="checkbox customCheckbox">
                            <label className="col-form-label">
                                {formatDate(RenfundSupplies.CreatedInputVoucherDate, false)}
                            </label>
                        </div>

                    </div>

                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Mã đơn hàng nhập vật tư:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {RenfundSupplies.InputVoucherID}
                        </label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Mô tả:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {RenfundSupplies.Description}
                        </label>
                    </div>

                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Hệ thống:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <div className="checkbox customCheckbox">
                            <label>
                                <input type="checkbox" disabled={true} defaultChecked={RenfundSupplies.IsSystem} />
                                <span className="cr"><i className="cr-icon fa fa-check"></i>
                                </span>
                            </label>
                        </div>

                    </div>
                </div>

            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(RenfundSuppliesInfo)
