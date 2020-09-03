import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,

} from "react-router-dom";
import { ModalManager } from "react-dynamic-modal";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import InputGrid from "../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";

import {
    DetailAPIPath,
    LoadAPIPath,
    APIHostName,
    TitleFormDetail,
    GirdDestroyRequestDetailColumnList,
    GirdDestroyRequestRLColumnList,
    UpdateOutputAPIPath

} from "../constants";
import { MessageModal } from "../../../../common/components/Modal";

import { showModal, hideModal } from '../../../../actions/modal';
import ReactNotification from "react-notifications-component";
import DestroyRequestInfo from './DestroyRequestInfo.js'
class DetailCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DataSource: {},
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsLoadDataComplete: false,
            IsSystem: false,
            DestroyRequest: {},
            DestroyRequestDetail: [],
            DestroyRequestRL: [],
            DestroyRequestID: '',
            IsOutPut: false,
        }
        this.callLoadData = this.callLoadData.bind(this);
        this.handleSubmitOutputDestroyRequest = this.handleSubmitOutputDestroyRequest.bind(this);

        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(DetailAPIPath);
        this.setState({
            DestroyRequestID: this.props.match.params.id
        })
        this.callLoadData(this.props.match.params.id);
    }

    callLoadData(id) {
        this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then((apiResult) => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {

                this.setState({
                    DestroyRequest: apiResult.ResultObject,
                    DestroyRequestDetail: apiResult.ResultObject.lstDestroyRequestDetail,
                    DestroyRequestRL: apiResult.ResultObject.lstDestroyRequestReviewLevel,
                    DataSource: apiResult.ResultObject,
                    IsLoadDataComplete: true,
                    IsSystem: apiResult.ResultObject.IsSystem,
                    IsOutPut: apiResult.ResultObject.IsOutput,

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

    addNotification(message1, IsError) {
        let cssNotification, iconNotification;
        if (!IsError) {
            cssNotification = "notification-custom-success";
            iconNotification = "fa fa-check"

        } else {
            cssNotification = "notification-danger";
            iconNotification = "fa fa-exclamation"

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

    handleSubmitOutputDestroyRequest() {
        const { DestroyRequestID } = this.state;
        this.props.callFetchAPI(APIHostName, UpdateOutputAPIPath, DestroyRequestID).then((apiResult) => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
                this.callLoadData(DestroyRequestID);
                this.addNotification(apiResult.Message, apiResult.IsError)
            }
        })
    }

    render() {
        const { IsSystem, IsOutPut, DestroyRequest, DestroyRequestDetail, DestroyRequestRL } = this.state;
        if (this.state.IsLoadDataComplete) {
            return (
                <div className="col-lg-12">
                    <ReactNotification ref={this.notificationDOMRef} />
                    <div className="card">
                        <h4 className="card-title">
                            <strong>{TitleFormDetail}</strong>
                        </h4>
                        <div className="card-body">
                            <DestroyRequestInfo
                                DestroyRequest={DestroyRequest}
                            />

                            <div className="card">
                                <div className="card-title group-card-title">
                                    <h4 className="title">Danh sách vật tư</h4>
                                </div>
                                <div className="card-body">
                                    <InputGrid
                                        name="lstDestroyRequestDetail"
                                        controltype="GridControl"
                                        listColumn={GirdDestroyRequestDetailColumnList}
                                        dataSource={DestroyRequestDetail}
                                        isHideHeaderToolbar={true}
                                        //MLObjectDefinition={GridMLObjectDefinition}
                                        colspan="12"
                                        onValueChangeInputGrid={this.valueChangeInputGrid}
                                    />
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-title group-card-title">
                                    <h4 className="title">Danh sách duyệt</h4>
                                </div>
                                <div className="card-body">
                                    <InputGrid
                                        name="lstDestroyRequestReviewLevel"
                                        controltype="GridControl"
                                        listColumn={GirdDestroyRequestRLColumnList}
                                        dataSource={DestroyRequestRL}
                                        isHideHeaderToolbar={true}
                                        //MLObjectDefinition={GridDestroyRequestRLMLObjectDefinition}
                                        colspan="12"
                                        onValueChangeInputGrid={this.valueChangeInputGrid}
                                    />
                                </div>
                            </div>


                        </div>

                        <footer className="card-footer text-right">
                            <button className="btn btn-primary mr-3" type="submit">Mức duyệt</button>
                            <button disabled={IsOutPut} className="btn btn-primary mr-3" type="submit" onClick={this.handleSubmitOutputDestroyRequest}>Tạo phiếu xuất</button>
                            <Link to="/DestroyRequest">
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
