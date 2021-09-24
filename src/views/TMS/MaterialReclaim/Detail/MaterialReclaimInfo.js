import React, { Component } from 'react'
import { connect } from 'react-redux'

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
                    </div><div className="form-group col-md-2">
                        <label className="col-form-label bold">Mã yêu cầu nhập trả vật tư:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {MaterialReclaim.MTReturnRequestID}
                        </label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Kho:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {MaterialReclaim.ReturnStore}
                        </label>
                    </div><div className="form-group col-md-2">
                        <label className="col-form-label bold">Người thu hồi:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {MaterialReclaim.ReturnUser}
                        </label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Xứ lý sau thu hồi:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {MaterialReclaim.AfterReclaimProcessTypeName}
                        </label>
                    </div><div className="form-group col-md-2">
                        <label className="col-form-label bold">Mã phiếu nhập trả:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {MaterialReclaim.InputVoucherID}
                        </label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Ngưởi xử lý thu hồi:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {MaterialReclaim.AfterReclaimProcessUser}
                        </label>
                    </div><div className="form-group col-md-2">
                        <label className="col-form-label bold">Mã yêu cầu hủy vật tư:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {MaterialReclaim.MTDestroyRequestID}
                        </label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Ngày xử lý sau thu hồi:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {formatDate(MaterialReclaim.AfterReclaimProcessDate, false)}
                        </label>
                    </div><div className="form-group col-md-2">
                        <label className="col-form-label bold">Mã phiếu xuất tạm ứng:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {MaterialReclaim.OutputVoucherID}
                        </label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Mô tả:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                            {MaterialReclaim.Description}
                        </label>
                    </div><div className="form-group col-md-2">
                        <label className="col-form-label bold">Ngày thu hồi:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">
                        {formatDate(MaterialReclaim.CreatedDate, false)}
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
