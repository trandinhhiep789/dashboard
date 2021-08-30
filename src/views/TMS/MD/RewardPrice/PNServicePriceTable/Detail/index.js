import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from "react-router-dom";
import { ModalManager } from "react-dynamic-modal";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../../actions/pageAction";
import InputGridControl from "../../../../../../common/components/FormContainer/FormControl/InputGrid/InputGridControl.js";
import {
    APIHostName,
    DetailPagePath,
    LoadNewAPIPath,
    TitleFormDetail,
    DataGridColumnItemListRPTDetail,
    TitleFromRPTDetail,
    DeleteAPIRPTDetailPath

} from "../constants";
import { MessageModal } from "../../../../../../common/components/Modal";
import PNRewardPriceTableInfo from "./PNRewardPriceTableInfo";

import { showModal, hideModal } from '../../../../../../actions/modal';
import { MODAL_TYPE_COMMONTMODALS } from '../../../../../../constants/actionTypes';
import ReactNotification from "react-notifications-component";
import PNServicePriceTableDetail from "../../PNServicePriceTableDetail";

class DetailCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputChangeObjItem = this.handleInputChangeObjItem.bind(this);
        this.state = {
            DataSource: {},
            CallAPIMessage: "",
            IsCallAPIError: false,
            RewardPriceTableInfo: {},
            PageNumber: 1,
            Abiliti: {},
            IsLoadDataComplete: false,
            IsSystem: false,
            PNServicePriceTableDetailID: ''
        }
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(DetailPagePath);
        this.callLoadData(this.props.match.params.id);
        this.setState({
            PNServicePriceTableDetailID: this.props.match.params.id
        })
    }

    callLoadData(id) {
        this.props.callFetchAPI(APIHostName, LoadNewAPIPath, id).then((apiResult) => {
            console.log('apiResult', apiResult)
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {


                this.setState({
                    // DataSource: apiResult.ResultObject,
                    DataSource: apiResult.ResultObject,
                    IsLoadDataComplete: true,
                    IsSystem: apiResult.ResultObject.IsSystem
                });
            }
        });
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

    handleInputChangeObjItem(id, apiResult) {
        if (apiResult.IsError) {
            this.showMessage(apiResult.Message);
        }
        else {
            this.addNotification(apiResult.Message, apiResult.IsError);
            this.callLoadData(id);
            this.props.hideModal();
        }

    }

    handleItemInsertRPTDetail() {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Thêm chi tiết bảng giá dịch vụ của đối tác',
            content: {
                text: <PNServicePriceTableDetail
                    dataSource={this.state.DataSource}
                    onInputChangeObj={this.handleInputChangeObjItem}

                />
            },
            maxWidth: '1000px'
        });
    }

    handleItemEditRPTDetail(index) {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Cập nhật chi tiết bảng giá dịch vụ của đối tác',
            content: {
                text: <PNServicePriceTableDetail
                    dataSource={this.state.DataSource}
                    index={index}
                    onInputChangeObj={this.handleInputChangeObjItem}

                />
            },
            maxWidth: '1000px'
        });
    }

    handleItemDeleteRPTDetail(index) {

        const { PNServicePriceTableDetailID, DataSource } = this.state;

        const resultItem = DataSource.PNServicePriceTableDetailList[index];
        let MLObject = {};
        MLObject.PNServicePriceTableDetailID = resultItem.PNServicePriceTableDetailID.trim();

        this.props.callFetchAPI(APIHostName, DeleteAPIRPTDetailPath, resultItem).then((apiResult) => {
            console.log("del", resultItem, apiResult)
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.addNotification(apiResult.Message, apiResult.IsError);
            if (!apiResult.IsError) {
                this.callLoadData(PNServicePriceTableDetailID);
            }
        });
    }

    addNotification(message1, IsError) {
        let cssNotification, iconNotification;
        if (!IsError) {
            cssNotification = "notification-custom-success";
            iconNotification = "fa fa-check"
            // this.setState({
            //     cssNotification: "notification-custom-success",
            //     iconNotification: "fa fa-check"
            // });
        } else {
            cssNotification = "notification-danger";
            iconNotification = "fa fa-exclamation"
            // this.setState({
            //     cssNotification: "notification-danger",
            //     iconNotification: "fa fa-exclamation"
            // });
        }
        this.notificationDOMRef.current.addNotification({
            container: "bottom-right",
            content: (
                <div className={cssNotification}>
                    <div className="notification-custom-icon">
                        <i className={iconNotification} />
                    </div>
                    <div className="notification-custom-content">
                        <div className="notification-close">
                            <span>×</span>
                        </div>
                        <h4 className="notification-title">Thông Báo</h4>
                        <p className="notification-message">{message1}</p>
                    </div>
                </div>
            ),
            dismiss: { duration: 6000 },
            dismissable: { click: true }
        });
    }

    render() {
        const { IsSystem } = this.state;
        if (this.state.IsLoadDataComplete) {
            return (
                <div className="col-lg-12">
                    <ReactNotification ref={this.notificationDOMRef} />
                    <div className="card">
                        <h4 className="card-title">
                            <strong>{TitleFormDetail}</strong>
                        </h4>
                        <div className="card-body">

                            <PNRewardPriceTableInfo
                                PNRewardPriceTableInfo={this.state.DataSource}
                            />

                            <InputGridControl
                                name="PNServicePriceTableDetailList"
                                controltype="InputGridControl"
                                title={TitleFromRPTDetail}
                                IDSelectColumnName={"pnServicePriceTableDetailID"}
                                PKColumnName={"pnServicePriceTableDetailID"}
                                listColumn={DataGridColumnItemListRPTDetail}
                                dataSource={this.state.DataSource.PNServicePriceTableDetailList}
                                onInsertClick={this.handleItemInsertRPTDetail.bind(this)}
                                onEditClick={this.handleItemEditRPTDetail.bind(this)}
                                onDeleteClick={this.handleItemDeleteRPTDetail.bind(this)}
                                ref={this.gridref}
                                isSystem={IsSystem}
                            />

                           
                        </div>
                        <footer className="card-footer text-right">
                            <Link to="/PNServicePriceTable">
                                <button className="btn btn-sm btn-outline btn-primary" type="button">Quay lại</button>
                            </Link>
                        </footer>
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
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: () => {
            dispatch(hideModal());
        }
    };
};

const Detail = connect(mapStateToProps, mapDispatchToProps)(DetailCom);
export default Detail;
