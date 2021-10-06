import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import { formatDate } from '../../../../common/library/CommonLib'

export class MaterialReclaimInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MaterialReclaim: {}
        }
    }

    componentDidMount() {
        this.setState({
            MaterialReclaim: this.props.MaterialReclaim
        })
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.MaterialReclaim) !== JSON.stringify(nextProps.MaterialReclaim)) {
            this.setState({ MaterialReclaim: nextProps.MaterialReclaim });
        }
    }

    render() {
        const { MaterialReclaim } = this.state;

        return (
            <React.Fragment>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Mã yêu cầu thu hồi:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {MaterialReclaim.MaterialReclaimID}
                        </label>
                    </div>

                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Xứ lý sau thu hồi:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {MaterialReclaim.AfterReclaimProcessTypeID == 0 ? "Chưa xử lý" : `${MaterialReclaim.AfterReclaimProcessTypeID} - ${MaterialReclaim.AfterReclaimProcessTypeName}`}
                        </label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Kho thu hồi:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {MaterialReclaim.ReturnStore}
                        </label>
                    </div>

                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Ngưởi xử lý sau khi thu hồi:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {MaterialReclaim.AfterReclaimProcessUser != "" ? `${MaterialReclaim.AfterReclaimProcessUser} - ${MaterialReclaim.AfterReclaimProcessUserName}` : ""}
                        </label>
                    </div>

                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Người thu hồi:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {MaterialReclaim.ReturnUser != "" ? `${MaterialReclaim.ReturnUser} - ${MaterialReclaim.ReturnUserFullName}` : ""}
                        </label>
                    </div>

                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Ngày xử lý sau khi thu hồi:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {formatDate(MaterialReclaim.AfterReclaimProcessDate, false)}
                        </label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Ngày thu hồi:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {formatDate(MaterialReclaim.CreatedDate, false)}
                        </label>
                    </div>

                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Mã yêu cầu nhập trả vật tư:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            <Link to={`/MTReturnRequest/Detail/${MaterialReclaim.MTReturnRequestID}`} target="_blank">{MaterialReclaim.MTReturnRequestID}</Link>
                        </label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Mã phiếu nhập trả:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {MaterialReclaim.InputVoucherID}
                        </label>
                    </div>

                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Mã yêu cầu hủy vật tư:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            <Link to={`/DestroyRequest/Detail/${MaterialReclaim.MTDestroyRequestID}`} target="_blank">{MaterialReclaim.MTDestroyRequestID}</Link>
                        </label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Mã phiếu xuất tạm ứng:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {MaterialReclaim.OutputVoucherID}
                        </label>
                    </div>

                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Mô tả:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {MaterialReclaim.Description}
                        </label>
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

export default connect(mapStateToProps, mapDispatchToProps)(MaterialReclaimInfo)
