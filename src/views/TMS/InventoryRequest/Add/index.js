import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import FormContainer from "../../../../common/components/FormContainer";
// import FormContainer from "../../../../common/components/Form/AdvanceForm/FormContainer";
import { MessageModal } from "../../../../common/components/Modal";
import FormControl from "../../../../common/components/FormContainer/FormControl";
import InventoryRequestDetailList from "../Component/InventoryRequestDetailList";
import InventoryRequestRVList from "../Component/InventoryRequestRVList";


import {
    APIHostName,
    AddAPIPath,
    MLObjectDefinition,
    BackLink,
    AddPagePath,
    TitleFormAdd,
    LoadInventoryRequestAdd

} from "../constants";

import Select from 'react-select';

import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { callGetCache, callClearLocalCache } from "../../../../actions/cacheAction";
import { formatDate, formatDateNew } from "../../../../common/library/CommonLib.js";
import { showModal, hideModal } from '../../../../actions/modal';
import { INVENTORYREQUEST_ADD } from "../../../../constants/functionLists";

class AddCom extends React.Component {
    constructor(props) {
        super(props);
        this.prevDataSubmit = this.prevDataSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.state = {
            IsCallAPIError: false,
            IsCloseForm: false,
            DataSource: {},
            IsExtended: false,
            IsLiquidated: false,
            IsDeposited: false,
            InventoryRequestDetail: [],
            InventoryRequest: {},
            InventoryRequestRVLst: [],
            InventoryRequestTypeID: '',
            RequestStoreID: '',
            InventoryRequestRL: [],
            ListOption: [],
            IsLoadDataComplete: false,
            isError: false,
            isValidationSelect: false,
            isAutoReview: false,
            isAutoOutput: false,
        };
    }

    componentDidMount() {
        this.setState({
            InventoryRequestTypeID: this.props.location.state.InventoryRequestTypeID,
            RequestStoreID: this.props.location.state.RequestStoreID,
        })
        this.props.hideModal()
        this.props.updatePagePath(AddPagePath);

        const InventoryRequest =
        {
            InventoryRequestTypeID: this.props.location.state.InventoryRequestTypeID,
            RequestStoreID: this.props.location.state.RequestStoreID
        };

        this.LoadInventoryRequestAdd(InventoryRequest);
    }


    LoadInventoryRequestAdd(param) {
        this.props.callFetchAPI(APIHostName, LoadInventoryRequestAdd, param).then(apiResult => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
            }
            else {

                if(apiResult.ResultObject.InventoryRequestDetail != null) 
                {
                    apiResult.ResultObject.InventoryRequestDetail.map((rowItem, rowIndex) => {
                        rowItem.ActualQuantity=rowItem.RecordQuantity;
                    });
                }
                   

                this.setState({
                    InventoryRequestDetail: apiResult.ResultObject.InventoryRequestDetail,
                    InventoryRequestRVLst: apiResult.ResultObject.InventoryRequest_RVList,
                    InventoryRequest: apiResult.ResultObject,
                    IsLoadDataComplete: true,
                });
            }
        });
    }

    prevDataSubmit(formData, MLObject) {
        const { InventoryRequestDetail,
            InventoryRequestRVLst, InventoryRequest } = this.state;
        MLObject.InventoryRequest_RVList = InventoryRequestRVLst;
        MLObject.InventoryRequestDetail = InventoryRequestDetail;
        MLObject.CurrentReviewLevelID = InventoryRequest.CurrentReviewLevelID

        this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.MessageDetail);
        });
    }

    handleCloseMessage() {
        if (!this.state.IsCallAPIError) this.setState({ IsCloseForm: true });
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

    handleInputChangeGrid(obj) {
        this.setState({ InventoryRequestDetail: obj });

    }
    handleInputChangeGridRV(obj) {
        console.log("obj", obj)
        this.setState({ InventoryRequestRVLst: obj });
    }

    render() {
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        let currentDate = new Date();

        const { InventoryRequestDetail,
            InventoryRequestRVLst,
            InventoryRequest } = this.state;
        if (this.state.IsLoadDataComplete) {
            return (
                <React.Fragment>
                    <FormContainer
                        FormName={TitleFormAdd}
                        MLObjectDefinition={MLObjectDefinition}
                        listelement={[]}
                        BackLink={BackLink}
                        onSubmit={this.prevDataSubmit}
                    >
                        <div className="row">
                            <div className="col-md-6">
                                <FormControl.FormControlComboBox
                                    name="cboInventoryRequestType"
                                    colspan="8"
                                    labelcolspan="4"
                                    label="loại yêu cầu kiểm kê"
                                    validatonList={["Comborequired"]}
                                    placeholder="-- Vui lòng chọn --"
                                    isautoloaditemfromcache={true}
                                    disabled={true}
                                    loaditemcachekeyid="ERPCOMMONCACHE.INVENTORYREQUESTTYPE"
                                    valuemember="InventoryRequestTypeID"
                                    nameMember="InventoryRequestTypeName"
                                    controltype="InputControl"
                                    value={this.props.location.state.InventoryRequestTypeID}
                                    listoption={null}
                                    datasourcemember="InventoryRequestTypeID" />
                            </div>
                            <div className="col-md-6">
                                <FormControl.FormControlDatetimeNew
                                    name="dtRequestDate"
                                    colspan="8"
                                    labelcolspan="4"
                                    readOnly={true}
                                    disabled={true}
                                    showTime={false}
                                    timeFormat={false}
                                    dateFormat="DD-MM-YYYY"//"YYYY-MM-DD"
                                    label="Ngày yêu cầu"
                                    placeholder={formatDate(currentDate, true)}
                                    controltype="InputControl"
                                    value={new Date()}
                                    validatonList={["required"]}
                                    datasourcemember="RequestDate"
                                />
                            </div>
                            <div className="col-md-12">
                                <FormControl.FormControlComboBox
                                    name="cboRequestStore"
                                    colspan="10"
                                    labelcolspan="2"
                                    label="kho yêu cầu"
                                    disabled={true}
                                    validatonList={["Comborequired"]}
                                    placeholder="-- Vui lòng chọn --"
                                    isautoloaditemfromcache={true}
                                    isusercache={true}
                                    loaditemcachekeyid="ERPCOMMONCACHE.USER_COOSTORE_BYUSER"
                                    valuemember="StoreID"
                                    nameMember="StoreName"
                                    controltype="InputControl"
                                    value={this.props.location.state.RequestStoreID}
                                    listoption={null}
                                    datasourcemember="RequestStoreID"
                                    classNameCustom="customcontrol"
                                />

                            </div>
                            <div className="col-md-12">
                                <FormControl.TextBox
                                    name="txtInventoryRequestTitle"
                                    labelcolspan={2}
                                    colspan={10}
                                    readOnly={false}
                                    label="tiêu đề"
                                    placeholder="Tiêu đề"
                                    controltype="InputControl"
                                    value=""
                                    datasourcemember="InventoryRequestTitle"
                                    validatonList={['required']}
                                    classNameCustom="customcontrol"
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
                                />
                            </div>
                        </div>

                        <InventoryRequestDetailList
                            dataSource={InventoryRequestDetail}
                            onValueChangeGrid={this.handleInputChangeGrid.bind(this)}
                        />

                        {InventoryRequest.IsAutoReview == false ?
                            <InventoryRequestRVList
                                dataSource={InventoryRequestRVLst}
                                onValueChangeGridRV={this.handleInputChangeGridRV.bind(this)}
                            />
                            : <div></div>
                        }

                    </FormContainer>
                </React.Fragment>
            );
        }
        return (
            <React.Fragment>
                <label>Đang nạp dữ liệu...</label>
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
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        },
        callClearLocalCache: (cacheKeyID) => {
            return dispatch(callClearLocalCache(cacheKeyID));
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: (type, props) => {
            dispatch(hideModal(type, props));
        }
    };
};

const Add = connect(mapStateToProps, mapDispatchToProps)(AddCom);
export default Add;
