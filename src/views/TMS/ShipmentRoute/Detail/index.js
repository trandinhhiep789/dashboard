import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { Modal, ModalManager, Effect } from 'react-dynamic-modal';
import { MessageModal } from "../../../../common/components/Modal";
import { formatDate, formatDateNew } from "../../../../common/library/CommonLib.js";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
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
        let { DataSource } = this.state;
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
                                    <label className="col-form-label bold">Ngày phân tuyến:</label>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="col-form-label">{formatDate(DataSource.CreatedDate)}</label>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-2">
                                    <label className="col-form-label bold">Thời gian bắt đầu đi:</label>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="col-form-label">{formatDate(DataSource.ExpectedBeginDeliveryDate)}</label>
                                </div>
                                <div className="form-group col-md-2">
                                    <label className="col-form-label bold">Khoản cách thực tế:</label>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="col-form-label">{DataSource.ActualDeliveryDistance}</label>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-2">
                                    <label className="col-form-label bold">Nhân viên giao:</label>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="col-form-label">{DataSource.DeliverUserFullNameList}</label>
                                </div>
                                <div className="form-group col-md-2">
                                    <label className="col-form-label bold">Tuyến đường giao:</label>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="col-form-label">{DataSource.RouteNote == "" ? DataSource.RouteNote : ReactHtmlParser(DataSource.RouteNote.replace(/;/g, '<br/>'))}</label>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="form-row">
                                    <div className="col-md-12">
                                        <div className="table-responsive">
                                            <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th className="jsgrid-header-cell">Mã vận đơn</th>
                                                        <th className="jsgrid-header-cell">Thời gian hẹn giao</th>
                                                        <th className="jsgrid-header-cell">Tạo độ thực giao</th>
                                                        <th className="jsgrid-header-cell">Thời gian đến nhà khách</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {DataSource != null &&
                                                        DataSource.ShipmentRoute_OrderItemList.map((rowItem, rowIndex) => {
                                                            return (

                                                                <tr key={"OrderI" + rowIndex}>
                                                                    <td>{rowItem.ShipmentOrderID}</td>
                                                                    <td>{formatDate(rowItem.ExpectedBeginDeliveryDate)}</td>
                                                                    <td>{rowItem.ActualReceiverGeoLocation}</td>
                                                                    <td>{formatDate(rowItem.ActualDeliveryDate)}</td>
                                                                    
                                                                </tr>
                                                            );
                                                        })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
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
