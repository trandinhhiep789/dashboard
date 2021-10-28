import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import { connect } from "react-redux";
import { formatDate } from "../../../../common/library/CommonLib.js";



class VehicleRentalRequestInfoCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            VehicleRentalRequest: this.props.VehicleRentalRequest,
            IsCallAPIError: false,
        };
    }

    componentDidMount() {
        console.log("info", this.props)
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.VehicleRentalRequest) !== JSON.stringify(nextProps.VehicleRentalRequest)) {
            this.setState({
                VehicleRentalRequest: nextProps.VehicleRentalRequest,
            });
        }


    }

    render() {
        const { VehicleRentalRequest } = this.state;
        console.log("data", VehicleRentalRequest)
        return (
            <React.Fragment>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Mã yêu cầu thuê xe:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{VehicleRentalRequest.VehicleRentalRequestID}</label>
                    </div><div className="form-group col-md-2">
                        <label className="col-form-label bold">Chi phí thuê xe:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{VehicleRentalRequest.Cost}</label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Mã phương tiện:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{VehicleRentalRequest.LicensePlateNumber}</label>
                    </div><div className="form-group col-md-2">
                        <label className="col-form-label bold">Kho thuê:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{VehicleRentalRequest.StoreName}</label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Hình thức thuê:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{VehicleRentalRequest.RentalTypeName}</label>
                    </div><div className="form-group col-md-2">
                        <label className="col-form-label bold">Người yêu cầu:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{VehicleRentalRequest.RequestFullName}</label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Mã hợp đồng:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{VehicleRentalRequest.ContractID}</label>
                    </div><div className="form-group col-md-2">
                        <label className="col-form-label bold">Thời gian bắt đầu:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{formatDate(VehicleRentalRequest.StartTime, true) }</label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Năng lực xe:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{VehicleRentalRequest.Ability}</label>
                    </div><div className="form-group col-md-2">
                        <label className="col-form-label bold">Ngày kết thúc:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{formatDate(VehicleRentalRequest.EndTime, true) }</label>
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
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        }
    };
};

const VehicleRentalRequestInfo = connect(mapStateToProps, mapDispatchToProps)(VehicleRentalRequestInfoCom);
export default VehicleRentalRequestInfo;
