import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import ShipmentOrderDetail from '../Component/ShipmentOrderDetail.js';
import ShipmentOrderTypeWF from '../Component/ShipmentOrderTypeWF.js';
import ShipmentOrderAddress from '../Component/ShipmentOrderAddress.js';
import InfoProduct from '../Component/InfoProduct.js';
import InfoCoordinator from '../Component/InfoCoordinator.js';
import InfoHistoryWF from '../Component/InfoHistoryWF.js';
import ShipmentOrderAttachment from '../Component/ShipmentOrderAttachment.js';
import ShipmentOrderComment from '../Component/ShipmentOrderComment.js';
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';
import { MessageModal } from "../../../../common/components/Modal";
import {
    APIHostName,
    LoadAPIPath,
    PagePath,
    DetailAPIPath
} from "../constants";


class DetailCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.state = {
            DataSource: {},
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsLoadDataComplete: false,
        }
    }

    handleCloseMessage() {
        if (!this.state.IsCallAPIError) {
            this.callSearchData(this.state.SearchData);
        }
    }
    showMessage(message) {
        ModalManager.open(
            <MessageModal
                title="Thông báo"
                message={message}
                onRequestClose={() => true}
                onCloseModal={this.handleCloseMessage}
            />
        );
    }
    componentDidMount() {
        this.props.updatePagePath(DetailAPIPath);
        this.callLoadData(this.props.match.params.id);
    }
    callLoadData(id) {
        this.props.callFetchAPI(APIHostName, "api/ShipmentRoute/Load", id).then((apiResult) => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
                this.setState({
                    DataSource: apiResult.ResultObject,
                    IsLoadDataComplete: true
                });
            }
        });
    }

    render() {
        let {DataSource}= this.state;
        if (this.state.IsLoadDataComplete) {
            return (
                <div className="col-lg-12 page-detail">
                    <div className="card">
                        <h4 className="card-title">
                            <strong>thông tin phân tuyến</strong>
                        </h4>
                        <div className="card-body">
                        <div className="form-row">
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Tên bảng đơn giá thưởng:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{DataSource.ShipmentRouteID}</label>
                    </div>
                    <div className="form-group col-md-2">
                        <label className="col-form-label bold">Loại mùa vụ:</label>
                    </div>
                    <div className="form-group col-md-4">
                        <label className="col-form-label">{PNRewardPriceTableInfo.ServiceSeasonTypeID + " - " + PNRewardPriceTableInfo.ServiceSeasonTypeName}</label>
                    </div>
                </div>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <label>Đang nạp dữ liệu...</label>
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
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        }
    };
};

const Detail = connect(mapStateToProps, mapDispatchToProps)(DetailCom);
export default Detail;
