import React from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import FormContainer from "../../../../../common/components/FormContainer";
import FormControl from "../../../../../common/components/FormContainer/FormControl";
import { MessageModal } from "../../../../../common/components/Modal";
import {
    APIHostName,
    LoadLoadWebAPIPath,
    GetAdvanceRequestAPIPath,
    EditElementList,
    MLObjectDefinition,
    BackLink,
    EditPagePath,
} from "../constants";
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import { callGetCache } from "../../../../../actions/cacheAction";
import AdvanceRequestDetailNew from "../Component/AdvanceRequestDetailNew";



class EditNewCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsLoadDataComplete: false,
            IsCloseForm: false,
            gridDataSource: [],
            AdvanceRequestDetailList: [],
            StoreID: -1,
            AdvanceRequestTypeID: -1,
            errorAdvanceRequestDetail: ""
        };
    }

    componentDidMount() {
        this.props.updatePagePath(EditPagePath);
        const id = this.props.match.params.id;
        this.props.callFetchAPI(APIHostName, LoadLoadWebAPIPath, id).then(apiResult => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            } else {
                this.setState({
                    DataSource: apiResult.ResultObject,
                    StoreID:apiResult.ResultObject.ReceiverStoreID, 
                    AdvanceRequestTypeID:apiResult.ResultObject.AdvanceRequestTypeID,
                    gridDataSource: apiResult.ResultObject.AdvanceRequestDetailList
                });
            }
            this.setState({
                IsLoadDataComplete: true
            });
            //console.log("apiResult", apiResult);
        });
    }

    handleSubmit(formData, MLObject) {
        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        MLObject.AdvanceRequestDetailList = this.state.AdvanceRequestDetailList

        var msgTotal = MLObject.AdvanceRequestDetailList.reduce(function (prev, cur) {
            return prev + cur.Quantity;
        }, 0);

        if (msgTotal < 1) {
            this.setState({ errorAdvanceRequestDetail: "Vui lòng chọn vật tư tạm ứng" });
        }
        else {
            this.setState({ errorAdvanceRequestDetail: "" });
            this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then(apiResult => {

                this.setState({ IsCallAPIError: !apiResult.IsError });
                this.showMessage(apiResult.Message);
            });

        }

    }
    onValueChangeCustom(name, value) {
        if (value > -1 && this.state.StoreID > -1) {
            const postData = [
                {
                    SearchKey: "@ADVANCEREQUESTTYPEID",
                    SearchValue: value
                },
                {
                    SearchKey: "@STOREID",
                    SearchValue: this.state.StoreID
                },
                {
                    SearchKey: "@ADVANCEREQUESTID",
                    SearchValue: this.props.match.params.id
                }
            ];

            this.props.callFetchAPI(APIHostName, GetAdvanceRequestAPIPath, postData).then(apiResult => {
                if (!apiResult.IsError) {
                    this.setState({
                        AdvanceRequestDetailList: apiResult.ResultObject,
                        gridDataSource: apiResult.ResultObject,
                        AdvanceRequestTypeID: value
                    });
                }
                else {
                    this.setState({
                        gridDataSource: [],
                        AdvanceRequestTypeID: value
                    });

                }
            });

        }
        else {
            this.setState({
                AdvanceRequestDetailList: [],
                gridDataSource: [],
                AdvanceRequestTypeID: value
            });
        }

    }
    onValueChangeSote(name, value) {

        if (value > -1 && this.state.AdvanceRequestTypeID > -1) {
            const postData = [
                {
                    SearchKey: "@ADVANCEREQUESTTYPEID",
                    SearchValue: this.state.AdvanceRequestTypeID
                },
                {
                    SearchKey: "@STOREID",
                    SearchValue: value
                },
                {
                    SearchKey: "@ADVANCEREQUESTID",
                    SearchValue: this.props.match.params.id
                }
            ];

            this.props.callFetchAPI(APIHostName, GetAdvanceRequestAPIPath, postData).then(apiResult => {
                if (!apiResult.IsError) {
                    this.setState({
                        AdvanceRequestDetailList: apiResult.ResultObject,
                        gridDataSource: apiResult.ResultObject,
                        StoreID: value
                    });
                }
                else {
                    this.setState({
                        gridDataSource: [],
                        StoreID: value
                    });

                }
            });

        }
        else {
            this.setState({
                AdvanceRequestDetailList: [],
                gridDataSource: [],
                StoreID: value
            });
        }
    }
    handleInputChangeGrid(obj) {
        this.setState({
            AdvanceRequestDetailList: obj,
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
        const { errorAdvanceRequestDetail } = this.state;
        if (this.state.IsLoadDataComplete && !this.state.IsCallAPIError) {
            return (
                <React.Fragment>
                    <ReactNotification ref={this.notificationDOMRef} />
                    <FormContainer
                        FormName="Cập nhật thông tin yêu cầu tạm ứng"
                        MLObjectDefinition={MLObjectDefinition}
                        dataSource={this.state.DataSource}
                        listelement={[]}
                        BackLink={BackLink}
                        onSubmit={this.handleSubmit.bind(this)}
                    >
                        <div className="row">
                            <div className="col-md-6">
                                <FormControl.ComboBoxSelect
                                    name="txtReceiverStoreID"
                                    colspan="8"
                                    labelcolspan="4"
                                    onValueChangeCustom={this.onValueChangeSote.bind(this)}
                                    disabled={this.state.IsSystem}
                                    readOnly={this.state.IsSystem}
                                    label="Kho tạm ứng"
                                    validatonList={["Comborequired"]}
                                    placeholder="-- Vui lòng chọn --"
                                    isautoloaditemfromcache={true}
                                    loaditemcachekeyid="ERPCOMMONCACHE.USER_COOSTORE_BYUSER"
                                    valuemember="StoreID"
                                    nameMember="StoreName"
                                    controltype="InputControl"
                                    value={""}
                                    listoption={null}
                                    datasourcemember="ReceiverStoreID" />
                            </div>
                            <div className="col-md-6"></div>
                            <div className="col-md-6">
                                <FormControl.ComboBoxSelect
                                    name="txtAdvanceRequestTypeID"
                                    colspan="8"
                                    labelcolspan="4"
                                    onValueChangeCustom={this.onValueChangeCustom.bind(this)}
                                    disabled={this.state.IsSystem}
                                    readOnly={this.state.IsSystem}
                                    label="loại yêu cầu tạm ứng"
                                    validatonList={["Comborequired"]}
                                    placeholder="-- Vui lòng chọn --"
                                    isautoloaditemfromcache={true}
                                    loaditemcachekeyid="ERPCOMMONCACHE.ADVANCEREQUESTTYPE"
                                    valuemember="AdvanceRequestTypeID"
                                    nameMember="AdvanceRequestTypeName"
                                    controltype="InputControl"
                                    value={''}
                                    listoption={null}
                                    datasourcemember="AdvanceRequestTypeID" />
                            </div>

                            <div className="col-md-6">
                                <FormControl.TextBox
                                    name="txtShipmentOrderID"
                                    colspan="8"
                                    labelcolspan="4"
                                    readOnly={false}
                                    label="mã yêu cầu vận chuyển"
                                    placeholder="mã yêu cầu vận chuyển"
                                    controltype="InputControl"
                                    value=""
                                    maxSize={19}
                                    datasourcemember="ShipmentOrderID"
                                    disabled={false}
                                />
                            </div>
                            <div className="col-md-12">
                                <FormControl.TextBox
                                    name="txtAdvanceRequestTitle"
                                    colspan="10"
                                    labelcolspan="2"
                                    readOnly={false}
                                    disabled={false}
                                    label="tiêu đề yêu cầu tạm ứng"
                                    placeholder="tiêu đề yêu cầu tạm ứng"
                                    controltype="InputControl"
                                    value=""
                                    datasourcemember="AdvanceRequestTitle"
                                    validatonList={['required']}
                                />
                            </div>

                            <div className="col-md-12">
                                <FormControl.TextArea
                                    labelcolspan={2}
                                    colspan={10}
                                    name="txtDescription"
                                    label="Mô tả"
                                    placeholder="Mô tả"
                                    datasourcemember="Description"
                                    controltype="InputControl"
                                    rows={6}
                                    maxSize={500}
                                    classNameCustom="customcontrol"
                                    readOnly={this.state.IsSystem}
                                    disabled={this.state.IsSystem}
                                />
                            </div>
                            <div className="col-md-6">
                                <FormControl.CheckBox
                                    label="hệ thống"
                                    name="chkIsSystem"
                                    datasourcemember="IsSystem"
                                    controltype="InputControl"
                                    colspan={8}
                                    labelcolspan={4}
                                    value={false}
                                    classNameCustom="customCheckbox"
                                />
                            </div>

                            {
                                errorAdvanceRequestDetail != '' ?
                                    <div className="col-md-12 errorAdvanceRequestDetail">
                                        <p>{this.state.errorAdvanceRequestDetail}</p>
                                    </div>
                                    : <div></div>
                            }

                            <AdvanceRequestDetailNew
                                AdvanceRequestDetail={this.state.gridDataSource}
                                onValueChangeGrid={this.handleInputChangeGrid.bind(this)}
                            />

                        </div>
                    </FormContainer>
                </React.Fragment>
            );
        }
        return (
            <div>
                <label>Đang nạp dữ liệu...</label>
            </div>
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
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        }
    };
};

const EditNew = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditNewCom);
export default EditNew;