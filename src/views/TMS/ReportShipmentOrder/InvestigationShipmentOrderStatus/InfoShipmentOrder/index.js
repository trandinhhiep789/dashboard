import React from "react";
import { connect } from "react-redux";
import { updatePagePath } from "../../../../../actions/pageAction";
import { formatDate } from "../../../../../common/library/CommonLib.js";

class InfoShipmentOrderCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            IsCallAPIError: false,
            dataSource: this.props.dataShipmentOder,
        };

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.dataShipmentOder) !== JSON.stringify(nextProps.dataShipmentOder)) {
            this.setState({
                dataSource: nextProps.dataShipmentOder
            })
        }
    }

    render() {
        const { dataSource } = this.state;
        return (
            <div className="col-md-12 ">
                <div className="card mb-10">
                    <div className="card-body">
                        <div className="form-row frmInfo">
                            <div className="form-group col-md-2">
                                <label className="col-form-label bold">Mã đơn hàng:</label>
                            </div>
                            <div className="form-group col-md-4">
                                <label className="col-form-label">
                                    {dataSource.PartnerSaleOrderID}
                                </label>
                            </div>
                            <div className="form-group col-md-2">
                                <label className="col-form-label bold">Bước xử lý hiện tại:</label>
                            </div>
                            <div className="form-group col-md-4">
                                <label className="col-form-label">
                                    {dataSource.CurrentShipmentOrderStepName}
                                </label>
                            </div>
                            <div className="form-group col-md-2">
                                <label className="col-form-label bold">Mã vận đơn:</label>
                            </div>
                            <div className="form-group col-md-4">
                                <label className="col-form-label"> {dataSource.ShipmentOrderID}</label>
                            </div>
                            <div className="form-group col-md-2">
                                <label className="col-form-label bold">Trạng thái hiện tại:</label>
                            </div>
                            <div className="form-group col-md-4">
                                <label className="col-form-label">{dataSource.ShipmentOrderStatusName}</label>
                            </div>
                            <div className="form-group col-md-2">
                                <label className="col-form-label bold">Người nhận:</label>
                            </div>
                            <div className="form-group col-md-4">
                                <label className="col-form-label">{dataSource.ReceiverFullName}</label>
                            </div>
                            <div className="form-group col-md-2">
                                <label className="col-form-label bold">Đã giao:</label>
                            </div>
                            <div className="form-group col-md-4">
                                <label className="col-form-label">{dataSource.IsCompleteDeliverIed == true ? "Đã giao" : ""}</label>
                            </div>
                            <div className="form-group col-md-2">
                                <label className="col-form-label bold">Điện thoại:</label>
                            </div>
                            <div className="form-group col-md-4">
                                <label className="col-form-label">{dataSource.ReceiverPhoneNumber!=undefined?dataSource.ReceiverPhoneNumber.substr(0, 5):''}****</label>
                            </div>
                            <div className="form-group col-md-2">
                                <label className="col-form-label bold">Ngày giao:</label>
                            </div>
                            <div className="form-group col-md-4">
                                <label className="col-form-label">{formatDate(dataSource.CompleteDeliverIedTime, true)}</label>
                            </div>
                            <div className="form-group col-md-2">
                                <label className="col-form-label bold">Kho điều phối:</label>
                            </div>
                            <div className="form-group col-md-4">
                                <label className="col-form-label">{dataSource.CoordinatorUser}</label>
                            </div>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updatePagePath: pagePath => {
            dispatch(updatePagePath(pagePath));
        },
    };
};

const InfoShipmentOrder = connect(mapStateToProps, mapDispatchToProps)(InfoShipmentOrderCom);
export default InfoShipmentOrder;
