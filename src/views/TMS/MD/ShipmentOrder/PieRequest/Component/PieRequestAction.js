import React from "react";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../../../../actions/fetchAPIAction";
import { ModalManager } from 'react-dynamic-modal';
import { MessageModal } from "../../../../../../common/components/Modal";
import { APIHostName, BackLink } from '../constants';
import Stepper from 'react-stepper-horizontal';
import ModelContainer from "../../../../../../common/components/Modal/ModelContainer";
import { formatDate } from "../../../../../../common/library/CommonLib.js";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { checkPermission } from '../../../../../../actions/permissionAction';

class PieRequestAction extends React.Component {
    constructor(props) {
        super(props);
        this._handleOnchangePirequestStatus = this._handleOnchangePirequestStatus.bind(this);
        this._handleUpdateNextPieRequestStep = this._handleUpdateNextPieRequestStep.bind(this);
        this.handleSubmitStep = this.handleSubmitStep.bind(this);
        this.handleSubmitViewStep = this.handleSubmitViewStep.bind(this);
        this.addNotification = this.addNotification.bind(this);
        this.notification = this.notification.bind(this);
        this.state = {
            PieRequestType_WF_Next: [],
            lstPieRequest_WorkFlow: [],
            lstPieRequestType_WorkFlow: [],
            CurrentPieRequestStepID: -1,
            intPieRequestStepID: -1,
            Permission: {},
            Steps: [],
            ActiveStep: -1,
            cssNotification: "",
            iconNotification: "",
            validationErrorMessage: null
        }
        this._loadPieRequestTypeWF(this.props.PieRequestTypeID, this.props.PieRequestID);
        this.loadPieRequestWFNext(this.props.CurrentPieRequestStepID);
        this.notificationDOMRef = React.createRef();
    }
    componentWillReceiveProps(nextProps) {
        // console.log("componentWillReceiveProps", nextProps.CurrentPieRequestStepID,nextProps,this.state.CurrentPieRequestStepID);
        // if (nextProps.CurrentPieRequestStepID != this.state.CurrentPieRequestStepID) {
        //     console.log("componentWillReceiveProps1", nextProps.CurrentPieRequestStepID,nextProps,this.state.CurrentPieRequestStepID);
        //     this.setState({
        //         CurrentPieRequestStepID: nextProps.CurrentPieRequestStepID,
        //         PieRequestType_WF_Next: [],
        //     });
        //     this.loadPieRequestWFNext(nextProps.CurrentPieRequestStepID);
        //     this.updateActiveIndex(nextProps.CurrentPieRequestStepID);
        // }
    }

    loadPieRequestWFNext(CurrentPieRequestStepID) {
        // console.log("loadPieRequestWFNext0", CurrentPieRequestStepID);
        let searchData = {
            PieRequestStepID: CurrentPieRequestStepID
        }
        this.props.callFetchAPI(APIHostName, 'api/PieRequestType_WF_Next/GetNextPieRequest', searchData).then((apiResult) => {
            if (apiResult && !apiResult.IsError) {
                this.setState({ PieRequestType_WF_Next: (apiResult.ResultObject == null ? [] : apiResult.ResultObject), CurrentPieRequestStepID: CurrentPieRequestStepID, IsCallAPIError: apiResult.IsError, ErrorMessage: apiResult.Message })
            }
            else {
                this.setState({ PieRequestType_WF_Next: [] });

            }
            // console.log("loadPieRequestWFNext1", this.state.CurrentPieRequestStepID, this.state.PieRequestType_WF_Next);
        });
    }

    // _handleUpdate() {
    //     this.props.onUpdate();
    // }
    // _handleBackPage() {
    //     this.props.onBackPage();
    // }
    // _handleUpdateNextPieRequestStep() {
    //     this.props.onUpdateNextPieRequestStep(this.state.NextPieRequestStepID);
    // }
    _handleOnchangePirequestStatus(e) {
        //   console.log("_handleOnchangePirequestStatus", this.state.intPieRequestStepID);
        let ChooseFunctionID = this.state.PieRequestType_WF_Next.find(a => a.NextPieRequestStepID === parseInt(this.state.intPieRequestStepID)).ChooseFunctionID;
        if (ChooseFunctionID) {
            this.props.checkPermission(ChooseFunctionID).then((apiResult) => {
                if (apiResult.IsPermission) {
                    if (parseInt(this.state.intPieRequestStepID) > 0) {
                        this._handleUpdateNextPieRequestStep(parseInt(this.state.intPieRequestStepID));
                    }
                }
                else {
                    this.setState({ validationErrorMessage: "Bạn Không có quyền xử lý quy trình bước này" }, () => {
                        this.openSubmitStepModal();
                    });
                }
            });
        }
        else {
            if (parseInt(this.state.intPieRequestStepID) > 0) {
                this._handleUpdateNextPieRequestStep(parseInt(this.state.intPieRequestStepID));
            }

        }

        // ModalManager.close();
        // this.addNotification("thah cong",false);
    }
    _handleUpdateNextPieRequestStep(intNextPieRequestStepID) {
        //     console.log("_handleUpdateNextPieRequestStep", intNextPieRequestStepID);
        if (intNextPieRequestStepID > 0) {
            let MLObject = {
                PieRequestID: this.props.PieRequestID,
                PieRequestTypeID: this.props.PieRequestTypeID,
                NextPieRequestStepID: intNextPieRequestStepID,
                UpDatedUser: this.props.AppInfo.LoginInfo.Username,
                LoginLogID: JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID
            };
            this.props.callFetchAPI(APIHostName, 'api/PieRequest/UpdateNextStep', MLObject).then((apiResult) => {
                if (!apiResult.IsError) {
                    this.setState({ IsCallAPIError: apiResult.IsError });
                    ModalManager.close();
                    this.addNotification(apiResult.Message, apiResult.IsError);
                    this._reloadAfterUpdateNextStep(intNextPieRequestStepID);
                }
                else {
                    this.addNotification(apiResult.Message, apiResult.IsError);
                }

            });
        }
    }

    _reloadAfterUpdateNextStep(CurrentPieRequestStepID) {
        // console.log("_reloadAfterUpdateNextStep1", CurrentPieRequestStepID);
        this.setState({
            CurrentPieRequestStepID: CurrentPieRequestStepID,
            PieRequestType_WF_Next: [],
        });
        //  console.log("_reloadAfterUpdateNextStep2", this.state.CurrentPieRequestStepID, this.state.PieRequestType_WF_Next);
        this.loadPieRequestWFNext(CurrentPieRequestStepID);
        // console.log("_reloadAfterUpdateNextStep3", this.state.CurrentPieRequestStepID, this.state.PieRequestType_WF_Next);
        this.updateActiveIndex(CurrentPieRequestStepID);
        // console.log("_reloadAfterUpdateNextStep4", this.state.CurrentPieRequestStepID, this.state.PieRequestType_WF_Next);
    }

    // Hoclenho

    //Load danh sach theo index  sử dụng CurrentPieRequestStepID
    _loadPieRequestTypeWF(PieRequestTypeID, PieRequestID) {
        const InitSearchParams = [PieRequestTypeID, PieRequestID.trim()];
        this.props.callFetchAPI(APIHostName, 'api/PieRequestType_WorkFlow/LoadDatePieRequestTypeWorkFlow', InitSearchParams).then((apiResult) => {
            if (apiResult && !apiResult.IsError) {
                this.setState({ lstPieRequestType_WorkFlow: apiResult.ResultObject });
                this.updateActiveIndex(this.props.CurrentPieRequestStepID);
            }
        });
    }
    updateActiveIndex(CurrentPieRequestStepID) {
        let activeIndex = 0;
        this.state.lstPieRequestType_WorkFlow.map((item, index) => {
            if (item.PieRequestStepID == CurrentPieRequestStepID) {
                activeIndex = index;
            }
        })
        this.setState({ ActiveStep: activeIndex });
    }
    //End Load danh sach theo index  sử dụng CurrentPieRequestStepID


    handleSubmitStep() {
        this.loadPieRequestWFNext(this.state.CurrentPieRequestStepID);
        let { intPieRequestStepID } = this.state;
        //   console.log("handleSubmitStep", this.state.CurrentPieRequestStepID, this.state.PieRequestType_WF_Next);
        this.setState({ PieRequestType_WF_Next: this.state.PieRequestType_WF_Next, intPieRequestStepID: -1 }, () => {
            this.openSubmitStepModal();
        });
    }
    onChangeInput(e) {
        const name = e.target.name;
        let value = e.target.value;
        if (e.target.type == 'checkbox') {
            value = e.target.type == 'checkbox' ? e.target.checked : false;
        }
        let { intPieRequestStepID } = this.state;
        intPieRequestStepID = value;
        this.setState({ intPieRequestStepID: intPieRequestStepID, validationErrorMessage: null }, () => {
            this.openSubmitStepModal();
        });
    }
    openSubmitStepModal() {
        let formGroupclassName = "form-group col-md-7";
        let selectclassName = "form-control form-control-sm";
        if (this.state.validationErrorMessage != null) {
            if (this.state.validationErrorMessage.length > 0) {
                formGroupclassName += " has-error has-danger";
                selectclassName += " is-invalid";
            }
        }
        ModalManager.open(
            <ModelContainer
                title="Quy trình chọn bước xử lý"
                name=""
                content={"submit thành công!"}
                onRequestClose={() => true}
                onChangeModal={this._handleOnchangePirequestStatus.bind(this)}>

                <div className="form-row">

                    <div className="form-group col-md-3">
                        <label className="col-form-label">Bước xử lý:</label>
                    </div>
                    <div className={formGroupclassName}>
                        <select className={selectclassName} value={this.state.intPieRequestStepID} onChange={this.onChangeInput.bind(this)} >
                            <option value="-1" label="--Vui lòng chọn bước xử lý--" />
                            {this.state.PieRequestType_WF_Next && this.state.PieRequestType_WF_Next.map(item =>
                                <option key={item.NextPieRequestStepID} value={item.NextPieRequestStepID}>{item.NextPieRequestStepName}</option>
                            )}
                        </select>
                        <div className="invalid-feedback"><ul className="list-unstyled"><li>{this.state.validationErrorMessage}</li></ul></div>
                    </div>

                </div>
            </ModelContainer>
        );
    }

    openViewStepModal() {
        // console.log("handleSubmitViewStep", this.state.lstPieRequest_WorkFlow);
        ModalManager.open(
            <ModelContainer
                title="Lịch sử quy trình xử lý"
                name=""
                content={"submit thành công!"}
                IsButton={true}
                onRequestClose={() => true}>
                <div style={{ height: '500px', overflow: 'scroll' }}>
                    <table className="table table-sm table-striped table-bordered table-hover table-condensed" cellspacing="0">
                        <thead className="thead-light">
                            <tr>
                                <th className="jsgrid-header-cell" style={{ width: '15%' }} >Mã bước xử lý</th>
                                <th className="jsgrid-header-cell" style={{ width: '40%' }} >Tên bước xử lý</th>
                                <th className="jsgrid-header-cell" style={{ width: '10%' }}>Đã xử lý</th>
                                <th className="jsgrid-header-cell" style={{ width: '20%' }}>Người xử lý</th>
                                <th className="jsgrid-header-cell" style={{ width: '15%' }}>Ngày xử lý</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.lstPieRequest_WorkFlow.map((optionItem) => {
                                return (
                                    <tr>
                                        <td>{optionItem.PieRequestStepID}</td>
                                        <td>{optionItem.PieRequestStepName}</td>
                                        <td>{(optionItem.IsProcess == true ? <span className='fa fa-check'></span> : "")}</td>
                                        <td>{optionItem.ProcessUserName}</td>
                                        <td>{formatDate(optionItem.ProcessDate, true)}</td>
                                    </tr>
                                )
                            }
                            )}
                        </tbody>
                    </table>
                </div>

            </ModelContainer>
        );
    }
    handleSubmitViewStep() {
        const searchData = [{
            SearchKey: "@PIEREQUESTID",
            SearchValue: this.props.PieRequestID
        }];

        this.props.callFetchAPI(APIHostName, 'api/PieRequest_WorkFlow/Search', searchData).then((apiResult) => {
            if (!apiResult.IsError) {

                this.setState({ lstPieRequest_WorkFlow: apiResult.ResultObject }, () => {
                    this.openViewStepModal();
                });
            }

        }
        );
    }

    // Notification
    addNotification(message1, IsError) {
        if (!IsError) {
            this.setState({
                cssNotification: "notification-custom-success",
                iconNotification: "fa fa-check"
            })
        }
        else {
            this.setState({
                cssNotification: "notification-danger",
                iconNotification: "fa fa-exclamation"
            })
        }
        this.notificationDOMRef.current.addNotification({
            container: "bottom-right",
            content: (
                <div className={this.state.cssNotification}>
                    <div className="notification-custom-icon">
                        <i className={this.state.iconNotification} />
                    </div>
                    <div className="notification-custom-content">
                        <div className="notification-close"><span>×</span></div>
                        <h4 className="notification-title">Thông Báo</h4>
                        <p className="notification-message">{message1}</p>
                    </div>
                </div>
            ),
            dismiss: { duration: 3000 },
            dismissable: { click: true }
        });
    }
    notification() {
        this.notificationDOMRef.current.addNotification({
            title: "Awesomeness",
            message: "Awesome Notifications!",
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"]
        });
    }
    //End Notification


    handleonClickStep(id) {
        // console.log("handleonClickStep", id)
        this.loadPieRequestWFNext(this.state.CurrentPieRequestStepID);
        let { intPieRequestStepID } = this.state;
        intPieRequestStepID = id;
        this.setState({ PieRequestType_WF_Next: this.state.PieRequestType_WF_Next, intPieRequestStepID: intPieRequestStepID, validationErrorMessage: null }, () => {
            this.openSubmitStepModal();
        });
    }

    //End  hoclenho

    render() {
        return (
            <div>
                <ReactNotification ref={this.notificationDOMRef} />
                <div className='col-md-12'>
                    <div className="card">
                        <div className='row'>
                            <div className="col-md-10 pa-tabBar">
                                <ul className="pa-tabs__nav slds-path__nav">
                                    {this.state.lstPieRequestType_WorkFlow && this.state.lstPieRequestType_WorkFlow.map((item, index) => {
                                        //  console.log("lstPieRequestType_WorkFlow", this.state.ActiveStep, index, this.state.lstPieRequestType_WorkFlow, this.state.PieRequestType_WF_Next)
                                        if (this.state.ActiveStep >= index && this.state.PieRequestType_WF_Next.find(a => a.NextPieRequestStepID === parseInt(item.PieRequestStepID)) == undefined) {
                                            return (
                                                <li className="slds-is-complete slds-path__item runtime_sales_pathassistantPathAssistantTab" key={index}>
                                                    <a className="tabHeader slds-path__link" data-title={"Quy trình " + item.PieRequestStepName + " được " + item.ProcessUser + " xử lý"} >
                                                        <span className="complete slds-path__stage" >
                                                            <span className="txtstepname">{item.PieRequestStepName}</span>
                                                            <i className="ti-check"></i>
                                                        </span>
                                                        <span className="title slds-path__title" >{item.PieRequestStepName}</span>
                                                    </a>
                                                </li>
                                            )
                                        }
                                        else if (this.state.ActiveStep >= index && this.state.PieRequestType_WF_Next.find(a => a.NextPieRequestStepID === parseInt(item.PieRequestStepID)) != undefined) {
                                            return (
                                                <li className="slds-is-complete slds-path__item runtime_sales_pathassistantPathAssistantTab" key={index}>
                                                    <a onClick={this.handleonClickStep.bind(this, item.PieRequestStepID)} id={item.PieRequestStepID} className="tabHeader slds-path__link" data-title={"Quy trình " + item.PieRequestStepName + " được " + item.ProcessUser + " xử lý"} >
                                                        <span className="complete slds-path__stage" >
                                                            <span className="txtstepname">{item.PieRequestStepName}</span>
                                                            <i className="ti-check"></i>
                                                        </span>
                                                        <span className="title slds-path__title" >{item.PieRequestStepName}</span>
                                                    </a>
                                                </li>
                                            )
                                        }
                                        else {
                                            if (this.state.PieRequestType_WF_Next.find(a => a.NextPieRequestStepID === parseInt(item.PieRequestStepID)) != undefined) {
                                                return (
                                                    <li className="slds-is-current slds-is-active slds-path__item runtime_sales_pathassistantPathAssistantTab" key={index}>
                                                        <a onClick={this.handleonClickStep.bind(this, item.PieRequestStepID)} className="tabHeader slds-path__link" data-title={"Quy trình " + item.PieRequestStepName + " cần được xử lý " + item.MaxProcessTime + " phút"}>
                                                            <span className="current slds-path__stage" ></span>
                                                            <span className="title slds-path__title" >{item.PieRequestStepName}</span>
                                                        </a>
                                                    </li>
                                                )
                                            }
                                            else {
                                                return (
                                                    <li className="slds-is-incomplete slds-path__item runtime_sales_pathassistantPathAssistantTab" key={index}>
                                                        <a className="tabHeader slds-path__link" tabIndex="-1" data-title={item.PieRequestStepName} >
                                                            <span className="ahead slds-path__stage" ></span>
                                                            <span className="title slds-path__title" >{item.PieRequestStepName}</span>
                                                        </a>
                                                    </li>
                                                )
                                            }
                                        }
                                    })}
                                </ul>
                            </div>
                            <div className="form-group col-md-2 btnsubmit">
                                <button className="btn btn-w-md btn-info" onClick={this.handleSubmitStep}>Xử Lý</button>
                                <button className="btn btn-square btn-warning" onClick={this.handleSubmitViewStep}><i className="fa fa-eye"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        AppInfo: state
        // FetchAPIInfo: state.FetchAPIInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        checkPermission: (permissionKey) => {
            return dispatch(checkPermission(permissionKey));
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PieRequestAction);