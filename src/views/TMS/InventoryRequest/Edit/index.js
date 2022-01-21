import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import FormContainer from "../../../../common/components/FormContainer";
import { MessageModal } from "../../../../common/components/Modal";
import FormControl from "../../../../common/components/FormContainer/FormControl";
import {
    GetInventoryTerm,
    TitleFormEdit,
    EditPagePath,
    BackLink,
    MLObjectDefinition,
    LoadInfoEditAPIPath,
    APIHostName,
    EditAPIPath

} from "../constants";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { callGetCache, callClearLocalCache } from "../../../../actions/cacheAction";
import InventoryRequestDetailList from "../Component/InventoryRequestDetailList";
import InventoryRequestRVList from "../Component/InventoryRequestRVList";
import { INVENTORYREQUEST_VIEW, INVENTORYREQUEST_DELETE, INVENTORYREQUEST_EXPORT } from "../../../../constants/functionLists";


class EditCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.callLoadData = this.callLoadData.bind(this);

        this.state = {
            IsCallAPIError: false,
            IsCloseForm: false,
            InventoryRequestDetail: [],
            InventoryRequest: {},
            InventoryRequestRVLst: [],
            InventorytermIDListData:null,
            IsLoadDataComplete: false,
            IsSystem: false,
            IsExtended: false,
            IsLiquidated: false,
            IsDeposited: false
        };
    }

    componentDidMount() {
        this.props.updatePagePath(EditPagePath);
        this.callLoadData(this.props.match.params.id);
        this.GetInventoryTermData();
    }

    handleSubmit(formData, MLObject) {


    }

    GetInventoryTermData() {
        let listOption = [{ value: -1, label: "---Vui lòng chọn---" }];
        let param = {};
        this.props.callFetchAPI(APIHostName, GetInventoryTerm, param).then(apiResult => {
            if (apiResult.IsError) {
                listOption = listOptionNull;
                this.setState({
                    InventorytermIDListData: listOption
                });
            } else {
                if (apiResult.ResultObject) {
                    apiResult.ResultObject.map((cacheItem) => {
                        listOption.push({ value: cacheItem["inventoryTermID"], label: cacheItem["inventoryTermID"] + ' - ' + cacheItem['inventoryTermName'] });
                    });
                }
                this.setState({
                    InventorytermIDListData: listOption
                });
                console.log({listOption});
                
            }
           
            

           
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

    callLoadData(id) {
        this.props.callFetchAPI(APIHostName, LoadInfoEditAPIPath, id).then(apiResult => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
            }
            else {
                this.setState({
                    InventoryRequestDetail: apiResult.ResultObject.InventoryRequestDetail,
                    InventoryRequestRVLst: apiResult.ResultObject.InventoryRequest_RVList,
                    InventoryRequest: apiResult.ResultObject,
                    IsLoadDataComplete: true,
                });
            }
        });
    }

    handleInputChangeGrid(obj) {
        this.setState({ InventoryRequestDetail: obj });
    }

    handleInputChangeGridRV(obj) {
        this.setState({ InventoryRequestRVLst: obj });
    }

    handleSubmit(formData, MLObject) {
        const { InventoryRequestDetail,
            InventoryRequestRVLst, InventoryRequest } = this.state;
        MLObject.InventoryRequest_RVList = InventoryRequestRVLst;
        MLObject.InventoryRequestDetail = InventoryRequestDetail;
        MLObject.RequestUser = InventoryRequest.RequestUser;
        this.props.callFetchAPI(APIHostName, EditAPIPath, MLObject).then(apiResult => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.MessageDetail);
        });
    }
    render() {

        const { InventoryRequestDetail,
            InventoryRequestRVLst,
            InventoryRequest } = this.state;
        console.log({InventoryRequest});
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        if (this.state.IsLoadDataComplete && this.state.InventorytermIDListData != null) {
            return (
                <React.Fragment>
                    <FormContainer
                        FormName={TitleFormEdit}
                        MLObjectDefinition={MLObjectDefinition}
                        dataSource={this.state.InventoryRequest}
                        listelement={[]}
                        BackLink={BackLink}
                        onSubmit={this.handleSubmit}
                        RequirePermission={INVENTORYREQUEST_VIEW}
                    >


                        <div className="row">
                            <div className="col-md-6">
                                <FormControl.TextBox
                                    name="txtInventoryRequestID"
                                    colspan="8"
                                    labelcolspan="4"
                                    readOnly={true}
                                    label="mã yêu cầu"
                                    placeholder="Mã yêu cầu"
                                    controltype="InputControl"
                                    value=""
                                    datasourcemember="InventoryRequestID"
                                    validatonList={['required']}
                                />
                            </div>

                            <div className="col-md-6">
                                <FormControl.FormControlComboBox
                                    name="cboInventoryRequestType"
                                    colspan="8"
                                    labelcolspan="4"
                                    label="loại yêu cầu hủy vật tư"
                                    validatonList={["Comborequired"]}
                                    placeholder="-- Vui lòng chọn --"
                                    isautoloaditemfromcache={true}
                                    disabled={true}
                                    loaditemcachekeyid="ERPCOMMONCACHE.INVENTORYREQUESTTYPE"
                                    valuemember="InventoryRequestTypeID"
                                    nameMember="InventoryRequestTypeName"
                                    controltype="InputControl"
                                    value={""}
                                    listoption={null}
                                    datasourcemember="InventoryRequestTypeID" />

                            </div>

                            <div className="col-md-6">
                                <FormControl.TextBox
                                    name="txtInventoryRequestTitle"
                                    labelcolspan={4}
                                    colspan={8}
                                    readOnly={InventoryRequest.IsreViewed}
                                    label="tiêu đề"
                                    placeholder="Tiêu đề"
                                    controltype="InputControl"
                                    value=""
                                    datasourcemember="InventoryRequestTitle"
                                    validatonList={['required']}
                                    classNameCustom="customcontrol"
                                />
                            </div>
                            <div className="col-md-6">
                                <FormControl.FormControlComboBox
                                    name="cboInventorytermID"
                                    colspan="8"
                                    labelcolspan="4"
                                    label="Mã kỳ kiểm kê"
                                    disabled={true}
                                    //validatonList={["Comborequired"]}
                                    placeholder="-- Vui lòng chọn --"
                                    //isautoloaditemfromcache={true}
                                    //loaditemcachekeyid="ERPCOMMONCACHE.USER_COOSTORE_BYUSER"
                                    //valuemember="StoreID"
                                    //nameMember="StoreName"
                                    controltype="InputControl"
                                    value={-1}
                                    listoption={this.state.InventorytermIDListData}
                                    datasourcemember="InventorytermID" />

                            </div>
                            <div className="col-md-6">
                                <FormControl.FormControlComboBox
                                    name="cboRequestStore"
                                    colspan="8"
                                    labelcolspan="4"
                                    label="kho yêu cầu"
                                    disabled={true}
                                    //validatonList={["Comborequired"]}
                                    placeholder="-- Vui lòng chọn --"
                                    isautoloaditemfromcache={true}
                                    loaditemcachekeyid="ERPCOMMONCACHE.USER_COOSTORE_BYUSER"
                                    valuemember="StoreID"
                                    nameMember="StoreName"
                                    controltype="InputControl"
                                    value={""}
                                    listoption={null}
                                    datasourcemember="RequestStoreID" />

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
                                    controltype="InputControl"
                                    value=""
                                    validatonList={["required"]}
                                    datasourcemember="RequestDate"
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
                                    disabled={InventoryRequest.IsreViewed}
                                    classNameCustom="customcontrol"
                                />
                            </div>
                        </div>

                        <InventoryRequestDetailList
                            dataSource={InventoryRequestDetail}
                            onValueChangeGrid={this.handleInputChangeGrid.bind(this)}
                            disabledActualQuantity={(InventoryRequest.SaleOrderID == "" && InventoryRequest.IsreViewed == false) ? false : true}
                        />

                        {InventoryRequest.IsAutoReview == false ?
                            <InventoryRequestRVList
                                dataSource={InventoryRequestRVLst}
                                onValueChangeGridRV={this.handleInputChangeGridRV.bind(this)}
                                IsreViewed={InventoryRequest.IsreViewed}
                            />
                            : <div></div>
                        }
                    </FormContainer>
                </React.Fragment>
            )

        }
        return <label>Đang nạp dữ liệu...</label>;

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

const Edit = connect(mapStateToProps, mapDispatchToProps)(EditCom);
export default Edit;
