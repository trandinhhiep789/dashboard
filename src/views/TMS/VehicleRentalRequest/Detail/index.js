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
import { callGetCache, callGetUserCache } from "../../../../actions/cacheAction";

import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import {
    APIHostName,
    BackLink,
    TitleFormDetail,
    DetailAPIPath,
    LoadAPIPath,
    UpdateAbilityAPIPath,
    PKColumnNameWF,
    TitleFromWF,
    DataGridColumnItemListWF
} from "../constants";
import VehicleRentalRequestInfo from "../Component/VehicleRentalRequestInfo";
import ReactNotification from "react-notifications-component";
import { updatePagePath } from "../../../../actions/pageAction";
import InputGridControl from "../../../../common/components/FormContainer/FormControl/InputGrid/InputGridControl.js";
import { DatePicker, Menu, Dropdown, Button } from 'antd';
import { GET_CACHE_USER_FUNCTION_LIST } from "../../../../constants/functionLists";

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
        this.gridref = React.createRef();

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
    handleSubmitAbility() {
        const { AbilityID, VehicleRentalRequest } = this.state;

        let MLObject = {}
        MLObject.Ability = AbilityID,
            MLObject.VehicleRentalRequestID = VehicleRentalRequest.VehicleRentalRequestID,
            //
            this.props.callFetchAPI(APIHostName, UpdateAbilityAPIPath, MLObject).then(apiResult => {
                console.log("submit", MLObject, apiResult)
                this.setState({ IsCallAPIError: apiResult.IsError });
                this.addNotification(apiResult.Message, apiResult.IsError);
                this.callLoadData(VehicleRentalRequest.VehicleRentalRequestID)
            });
    }

    checkPermission(permissionKey) {
        return new Promise((resolve, reject) => {
            this.props.callGetUserCache(GET_CACHE_USER_FUNCTION_LIST).then((result) => {
                if (!result.IsError && result.ResultObject.CacheData != null) {
                    for (let i = 0; i < result.ResultObject.CacheData.length; i++) {
                        if (result.ResultObject.CacheData[i].FunctionID == permissionKey) {
                            resolve(true);
                            return;
                        }
                    }
                    resolve(false)
                } else {
                    resolve('error');
                }
            });
        });
    }

    onChangeInput(e) {
        e.preventDefault();
        let value = e.currentTarget.dataset.option;
        let lable = e.currentTarget.dataset.lable;
        console.log("change",  value, lable)
        let ChooseFunctionID = e.currentTarget.dataset.functionid;
        let { VehicleRentalRequest } = this.state;
        if (ChooseFunctionID != "") {
            this.checkPermission(ChooseFunctionID).then(result => {
               console.log("checkPermission:", result)
                if(result){

                }
                else{
                    this.showMessage("Bạn không có quyền chuyển bước.")
                }
            })
        }
        else{
            this.showMessage("Bạn không có quyền chuyển bước.")
        }
    }

    render() {
        const { VehicleRentalRequest, IsCallAPIError, AbilityID } = this.state;

        const dropdownItem = () => {
            return <Menu>

                {VehicleRentalRequest.RentalRequestType_WF_NextList.map((optionItem) => <Menu.Item key={optionItem.NextVehicleRentalReqTypeStep}>
                    <a className={optionItem.NextVehicleRentalReqTypeStep === VehicleRentalRequest.CurrentVehicleRentalRequestStepID ? "dropdown-item active" : "dropdown-item"}
                        key={optionItem.NextVehicleRentalReqTypeStep}
                        name={optionItem.NextVehicleRentalReqTypeStep}
                        data-option={optionItem.NextVehicleRentalReqTypeStep}
                        data-functionid={optionItem.ChooseFuntionID}
                        data-lable={optionItem.NextVehicleRentalRequestTypeStepName}
                        onClick={this.onChangeInput.bind(this)}
                    >
                        {optionItem.NextVehicleRentalRequestTypeStepName}
                    </a>
                </Menu.Item>)}
            </Menu>
        }
        if (!IsCallAPIError) {
            let strCurrentVehicleRentalRequestStepName = "";
            if (VehicleRentalRequest.RentalRequestType_WF_NextList.filter(a => a.CurrentVehicleRentalRequestStepID === VehicleRentalRequest.CurrentVehicleRentalRequestStepID).length > 0) {
                strCurrentVehicleRentalRequestStepName = VehicleRentalRequest.RentalRequestType_WF_NextList.filter(a => a.CurrentVehicleRentalRequestStepID === VehicleRentalRequest.CurrentVehicleRentalRequestStepID)[0].CurrentVehicleRentalRequestStepName
            }
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

                                <InputGridControl
                                    controltype="InputGridControl"
                                    dataSource={VehicleRentalRequest.VehicleRentalRequest_WFList}
                                    IDSelectColumnName={"VehicleRentalreqWorkFlowID"}
                                    isCustomImportFile={false}
                                    IsExportFile={false}
                                    isExportFileTemplate={false}
                                    isImportFile={false}
                                    isHiddenButtonAdd={true}
                                    listColumn={DataGridColumnItemListWF}
                                    name="VehicleRentalRequest_WFList"
                                    PKColumnName={PKColumnNameWF}
                                    ref={this.gridref}
                                    title={TitleFromWF}
                                />

                            </div>

                            <footer className="card-footer text-right">
                               
                                <div className="btn-group btn-group-dropdown mr-3">
                                <div className="input-group input-group-dropdown-custom">
                                        <Dropdown overlay={dropdownItem} >
                                            <div className="btn dropdown-toggle">
                                                {strCurrentVehicleRentalRequestStepName}
                                            </div>
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className="btn-group btn-group-dropdown mr-3">
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
        callGetUserCache: (cacheKeyID) => {
            return dispatch(callGetUserCache(cacheKeyID));
        },
    };
};

const Detail = connect(mapStateToProps, mapDispatchToProps)(DetailCom);
export default Detail;
