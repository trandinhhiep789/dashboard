import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from "react-router-dom";
import { ModalManager } from "react-dynamic-modal";
import { connect } from "react-redux";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import FormContainer from "../../../../common/components/FormContainer";
import DataGrid from "../../../../common/components/DataGrid/getdataserver.js";

import {
    APIHostName,
    DetailAPIPath,
    LoadAPIPath,
    UpdatePulishAPIPath,
    TitleFormDetail,


} from "../constants";
import { MessageModal } from "../../../../common/components/Modal";

import { showModal, hideModal } from '../../../../actions/modal';
import { MODAL_TYPE_COMMONTMODALS } from '../../../../constants/actionTypes';
import ReactNotification from "react-notifications-component";
import { Base64 } from 'js-base64';
import DocumentInfo from './DocumentInfo.js'
class DetailCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DataSource: {},
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsLoadDataComplete: false,
            DocumentItem: {},
            IsPublished: false,
            IsLockComment: false,
        }
        this.notificationDOMRef = React.createRef();
        this.handlePublish = this.handlePublish.bind(this);
    }

    componentDidMount() {
        this.props.updatePagePath(DetailAPIPath);
        this.callLoadData(this.props.match.params.id);
    }

    callLoadData(id) {
        this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then((apiResult) => {
            console.log("aaaa", id, apiResult)
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {


                this.setState({
                    IsPublished: apiResult.ResultObject.IsPublished,
                    IsLockComment: apiResult.ResultObject.IsLockComment,
                    DocumentItem: apiResult.ResultObject,
                    DataSource: apiResult.ResultObject,
                    IsLoadDataComplete: true,
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


    handlePublish(id) {
        console.log("pulish", id)

        const param={
            DocumentID: this.props.match.params.id,
            IsPublished: id
        }

        this.props.callFetchAPI(APIHostName, UpdatePulishAPIPath, param).then((apiResult) => {
            console.log("handlePublish", param, apiResult)
           
            this.addNotification(apiResult.Message, apiResult.IsError);
            
        });
    }


    render() {
        const {
            DocumentItem,
            IsLoadDataComplete,
            IsPublished,
            IsLockComment
        } = this.state;
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                {IsLoadDataComplete == true ?
                    <div className="col-lg-12">

                        <div className="card">
                            <h4 className="card-title">
                                <strong>{TitleFormDetail}</strong>
                            </h4>
                            <div className="card-body">

                                <DocumentInfo
                                    DocumentItem={DocumentItem}
                                />

                            </div>
                            <footer className="card-footer text-right">

                                {
                                   !!IsPublished && IsPublished == false ?
                                        <button className="btn btn-primary mr-3" type="button" onClick={() => this.handlePublish(0)}>Công bố</button>
                                        : <button className="btn btn-primary mr-3" type="button" onClick={() => this.handlePublish(1)}>Không công bố</button>
                                }


                                <Link to="/Documents">
                                    <button className="btn btn-sm btn-outline btn-primary" type="button">Quay lại</button>
                                </Link>
                            </footer>
                        </div>
                    </div>
                    :
                    <div className="col-lg-12">
                        Đang tải dữ liệu, xin vui lòng chờ
                    </div>
                }
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
