import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import { connect } from "react-redux";
import { formatDate } from "../../../../common/library/CommonLib.js";
import Select, { components } from 'react-select';


class VehicleRentalRequestInfoCom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            VehicleRentalRequest: this.props.VehicleRentalRequest,
            AbilityID: { value: this.props.AbilityID, label: this.props.AbilityID + '%' },
            IsCallAPIError: false,
        };
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.VehicleRentalRequest) !== JSON.stringify(nextProps.VehicleRentalRequest)) {
            this.setState({
                VehicleRentalRequest: nextProps.VehicleRentalRequest,
            });
        }


    }

    handleValueChange(selectedOption) {
        this.setState({
            AbilityID: { value: selectedOption.value, label: selectedOption.value + '%' }
        });
        this.props.onChangeAbility(selectedOption.value);
    }

    render() {
        const { VehicleRentalRequest, AbilityID } = this.state;
        const listOption = [
            { value: 0, label: '0%' },
            { value: 50, label: '50%' },
            { value: 60, label: '60%' },
            { value: 70, label: '70%' },
            { value: 80, label: '80%' },
            { value: 90, label: '90%' },
            { value: 100, label: '100%' },
        ]
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
                        <label className="col-form-label">{formatDate(VehicleRentalRequest.StartTime, true)}</label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Năng lực xe:</label>
                    </div>
                    <div className="form-group col-md-2">
                        <Select
                            value={AbilityID}
                            onChange={this.handleValueChange.bind(this)}
                            options={listOption}
                            placeholder={"--Vui lòng chọn--"}
                            isDisabled ={this.props.IsUpdateAbility == true ? false : true}
                        />
                    </div>
                    <div className="form-group col-md-2"></div>
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Ngày kết thúc:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{formatDate(VehicleRentalRequest.EndTime, true)}</label>
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
