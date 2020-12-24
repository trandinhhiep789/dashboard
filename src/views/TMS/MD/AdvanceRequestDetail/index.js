import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import { MessageModal } from "../../../../common/components/Modal";
import {
    APIHostName, GetCreateAdSaleOrderAPIPath, BackLink
} from "./constants";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { callGetCache, callClearLocalCache } from "../../../../actions/cacheAction";

class AdvanceRequestDetailCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false,
            AdvanceRequestDetailDataSource: this.props.AdvanceRequestDetailDataSource ? this.props.AdvanceRequestDetailDataSource : [],
            AdvanceRequestID: this.props.AdvanceRequestID,
            AdvanceRequest: this.props.DataSource ? this.props.DataSource : [],
        };
    }

    componentWillReceiveProps(nextProps) {
        //console.log("222", nextProps);
        if (nextProps.AdvanceRequestID !== this.state.AdvanceRequestID) {
            this.setState({ AdvanceRequestID: nextProps.AdvanceRequestID });
        }

        if (nextProps.DataSource !== this.state.AdvanceRequest) {
            this.setState({ AdvanceRequest: nextProps.DataSource });
        }
    }

    componentDidMount() {
    }


    handleAdvanceRequest() {
        this.state.AdvanceRequest.AdvanceRequestDetailList.map((Item) => {
            Item.ReceiverStoreID = this.state.AdvanceRequest.ReceiverStoreID
        });

        this.props.callFetchAPI(APIHostName, GetCreateAdSaleOrderAPIPath, this.state.AdvanceRequest).then(apiResult => {
            this.setState({ IsCallAPIError: !apiResult.IsError });
            this.showMessage(apiResult.Message);
        });
    }

    handleCancelAdvanceRequest() {
        this.props.callFetchAPI(APIHostName, "api/AdvanceRequest/CancelAdvanceRequest", this.state.AdvanceRequestID).then(apiResult => {
            this.setState({ IsCallAPIError: !apiResult.IsError });
            this.showMessage(apiResult.Message);
        });

    }

    handleCloseMessage() {
        if (this.state.IsCallAPIError) this.setState({ IsCloseForm: true });
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
    render() {

        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        return (
            <React.Fragment>
                <div className="col-lg-12 page-detail">
                    <div className="card">
                        <div className="card-title">
                            <h4 className="title">
                                <strong>Chi tiết yêu cầu tạm ứng</strong></h4>
                            {!this.state.AdvanceRequest.IsCreatedOrder&&!this.state.AdvanceRequest.IsDeleted ?
                                <button className="btn btnEditCard" onClick={this.handleAdvanceRequest.bind(this)} type="button">
                                    <span>Tạo lại phiếu xuất</span>
                                </button> :
                                ""
                            }
                             {!this.state.AdvanceRequest.IsDeleted ?
                                <button className="btn btnEditCard" onClick={this.handleCancelAdvanceRequest.bind(this)} type="button">
                                <span>Hủy phiếu xuất</span>
                                </button> :
                                ""
                            }
                           
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                        <thead className="thead-light">
                                            <tr>
                                                <th className="jsgrid-header-cell" style={{ width: "15%" }}>Nhóm vật tư</th>
                                                <th className="jsgrid-header-cell" style={{ width: "15%" }}>Mã sản phẩm</th>
                                                <th className="jsgrid-header-cell" style={{ width: "25%" }}>Tên sản phẩm</th>
                                                <th className="jsgrid-header-cell" style={{ width: "15%" }}>Số lượng tạm ứng</th>
                                                <th className="jsgrid-header-cell" style={{ width: "10%" }}>Đơn vị tính</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.AdvanceRequestDetailDataSource && this.state.AdvanceRequestDetailDataSource.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{item.MaterialGroupID + " - " + item.MaterialGroupName}</td>
                                                        <td>{item.ProductID}</td>
                                                        <td>{item.ProductName}</td>
                                                        <td>{item.Quantity}</td>
                                                        <td>{item.QuantityUnit}</td>
                                                    </tr>
                                                )
                                            })
                                            }

                                        </tbody>
                                    </table>


                                </div>
                            </div>


                        </div>
                    </div>
                </div>

            </React.Fragment>
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
        updatePagePath: pagePath => {
            dispatch(updatePagePath(pagePath));
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
        callClearLocalCache: (cacheKeyID) => {
            return dispatch(callClearLocalCache(cacheKeyID));
        }

    };
};

const AdvanceRequestDetail = connect(mapStateToProps, mapDispatchToProps)(AdvanceRequestDetailCom);
export default AdvanceRequestDetail;
