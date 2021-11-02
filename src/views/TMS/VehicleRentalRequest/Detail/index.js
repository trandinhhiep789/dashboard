import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from "react-router-dom";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import { MessageModal } from "../../../../common/components/Modal";

import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import {
    APIHostName,
    BackLink,
    TitleFormDetail,
    DetailAPIPath,
    LoadAPIPath,
    UpdateAbilityAPIPath
} from "../constants";
import VehicleRentalRequestInfo from "../Component/VehicleRentalRequestInfo";
import ReactNotification from "react-notifications-component";
import { updatePagePath } from "../../../../actions/pageAction";


class DetailCom extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            VehicleRentalRequest: {},
            IsCallAPIError: true,
            AbilityID: 0
        };
        this.notificationDOMRef = React.createRef();
        this.callLoadData = this.callLoadData.bind(this)
    }

    componentDidMount() {
        this.props.updatePagePath(DetailAPIPath);
        this.callLoadData(this.props.match.params.id);
    }

    callLoadData(id) {
        this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then((apiResult) => {
            console.log("1111", id, apiResult)
            if (apiResult.IsError) {
                this.showMessage(apiResult.Message)
                this.setState({
                    IsCallAPIError: apiResult.IsError
                })
            }
            else {
                this.setState({
                    VehicleRentalRequest: apiResult.ResultObject,
                    IsCallAPIError: apiResult.IsError,
                    AbilityID: apiResult.ResultObject.Ability
                })
            }
        })
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

    handleChangeAbility(value) {
        this.setState({
            AbilityID: value
        })
    }
    handleSubmitAbility(){
        const {AbilityID, VehicleRentalRequest}= this.state;

        let MLObject ={}
        MLObject.Ability = AbilityID,
        MLObject.VehicleRentalRequestID = VehicleRentalRequest.VehicleRentalRequestID,
        //
        this.props.callFetchAPI(APIHostName, UpdateAbilityAPIPath, MLObject).then(apiResult => {
            console.log("submit", MLObject, apiResult)
             this.setState({ IsCallAPIError: apiResult.IsError });
             this.addNotification(apiResult.Message,  apiResult.IsError);
             this.callLoadData(VehicleRentalRequest.VehicleRentalRequestID)
        });
    }

    render() {
        const { VehicleRentalRequest, IsCallAPIError, AbilityID } = this.state;
        if (!IsCallAPIError) {
            return (
                <React.Fragment>
                    <div className="col-lg-12">
                        <ReactNotification ref={this.notificationDOMRef} />

                        <div className="card">
                            <h4 className="card-title">
                                <strong>{TitleFormDetail}</strong>
                            </h4>
                            <div className="card-body">
                                <VehicleRentalRequestInfo
                                    VehicleRentalRequest={VehicleRentalRequest}
                                    AbilityID={AbilityID}
                                    onChangeAbility={this.handleChangeAbility.bind(this)}
                                />
                            </div>


                            <footer className="card-footer text-right">
                                < div className="btn-group btn-group-dropdown mr-3">
                                    <button className="btn btn-light dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="true">chuyển bước</button>
                                    <div className="dropdown-menu" x-placement="bottom-start" >
                                        <button className="dropdown-item" type="button">Đồng ý</button>
                                        <button className="dropdown-item" type="button">Từ chối</button>
                                    </div>
                                </div>
                                < div className="btn-group btn-group-dropdown mr-3">
                                    <button className="btn btn-primary" type="button" onClick={this.handleSubmitAbility.bind(this)}>Cập nhật năng lực xe</button>
                                </div>
                                <Link to="/VehicleRentalRequest">
                                    <button className="btn btn-sm btn-outline btn-primary" type="button">Quay lại</button>
                                </Link>
                            </footer>

                        </div>
                    </div>
                </React.Fragment>
            );
        }
        else {
            return (
                <React.Fragment>
                    <div>Đang tải dữ liệu...</div>
                </React.Fragment>
            )
        }

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
        },
        updatePagePath: pagePath => {
            dispatch(updatePagePath(pagePath));
        },
    };
};

const Detail = connect(mapStateToProps, mapDispatchToProps)(DetailCom);
export default Detail;
