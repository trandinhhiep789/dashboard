import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import FormContainer from "../../../../common/components/FormContainer";
// import FormContainer from "../../../../common/components/Form/AdvanceForm/FormContainer";
import { MessageModal } from "../../../../common/components/Modal";
import FormControl from "../../../../common/components/FormContainer/FormControl";
import InputGrid from "../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
import {
    APIHostName,
    AddAPIPath,
    AddElementList,
    MLObjectDefinition,
    BackLink,
    AddPagePath,
    TitleFormAdd,
    GridMLObjectDefinition,
    InputDestroyRequestDetailColumnList,
    LoadAPIByRequestTypeIDPath,
    InputDestroyRequestRLColumnList,
    GridDestroyRequestRLMLObjectDefinition,
    LoadUserNameAPIByStoreIDPath

} from "../constants";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { CACHE_OBJECT_STORENAME } from "../../../../constants/systemVars.js";
import { callGetCache, callClearLocalCache } from "../../../../actions/cacheAction";
import { formatDate, formatDateNew } from "../../../../common/library/CommonLib.js";
import { showModal, hideModal } from '../../../../actions/modal';
import { ERPCOMMONCACHE_DES_RVLEVEL } from "../../../../constants/keyCache";

class AddCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.GetDataByRequestTypeID = this.GetDataByRequestTypeID.bind(this);
        this.GetUserByStoreID = this.GetUserByStoreID.bind(this);
        this.setValueCombobox = this.setValueCombobox.bind(this);
        this.valueChangeInputGrid = this.valueChangeInputGrid.bind(this);

        this.state = {
            IsCallAPIError: false,
            IsCloseForm: false,
            DataSource: {},
            IsExtended: false,
            IsLiquidated: false,
            IsDeposited: false,
            DestroyRequestDetail: [],
            DestroyRequestTypeID: '',
            RequestStoreID: '',
            DestroyRequestRL: [],
            ListOption: [],
            IsLoadDataComplete: false,
            InputDestroyRequestRLColumnList: InputDestroyRequestRLColumnList,
            isError: false
        };
    }

    componentDidMount() {
        console.log("add", this.props, this.props.location.state.DestroyRequestTypeID)
        this.setState({
            DestroyRequestTypeID: this.props.location.state.DestroyRequestTypeID,
            RequestStoreID: this.props.location.state.RequestStoreID,
        })
        this.props.hideModal()
        this.props.updatePagePath(AddPagePath);
        this.GetDataByRequestTypeID(this.props.location.state.DestroyRequestTypeID);
        this.GetUserByStoreID(this.props.location.state.RequestStoreID);
        this.getCacheDesRVL();
    }

    getCacheDesRVL() {
        this.props.callGetCache(ERPCOMMONCACHE_DES_RVLEVEL).then((result) => {

            if (!result.IsError) {
                this.setState({
                    DestroyRequestRL: result.ResultObject.CacheData
                })
            }
            else {
                this.showMessage(result.Message)
            }
        });
    }

    // componentWillReceiveProps(nextProps) {
    //     if (JSON.stringify(this.props.location.state.DestroyRequestTypeID) !== JSON.stringify(nextProps.location.state.DestroyRequestTypeID)) {
    //         this.setState({
    //             DestroyRequestTypeID: nextProps.location.state.DestroyRequestTypeID
    //         })
    //     }
    // }

    GetDataByRequestTypeID(DestroyRequestTypeID) {
        this.props.callFetchAPI(APIHostName, LoadAPIByRequestTypeIDPath, DestroyRequestTypeID).then(apiResult => {
            // console.log('byID', apiResult)
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {

                this.setState({
                    DestroyRequestDetail: apiResult.ResultObject,
                    IsCallAPIError: apiResult.IsError,
                });
            }
        });
    }

    GetUserByStoreID(StoreID) {
        this.props.callFetchAPI(APIHostName, LoadUserNameAPIByStoreIDPath, StoreID).then(apiResult => {
            let listOption = []
            if (!apiResult.IsError) {
                if (apiResult.ResultObject.length > 0) {
                    apiResult.ResultObject.map((item) => {
                        listOption.push({ value: item.UserName, label: item.FullName })
                    })
                }

                this.setState({
                    ListOption: listOption,
                })
                this.setValueCombobox();
            }

        });
    }

    setValueCombobox() {
        let _InputDestroyRequestRLColumnList = this.state.InputDestroyRequestRLColumnList;
        _InputDestroyRequestRLColumnList.forEach(function (objElement) {
            if (objElement.Name == "cboUserName") {
                objElement.listoption = this.state.ListOption;
                objElement.value = -1;
            }
        }.bind(this));
        this.setState({
            InputDestroyRequestRLColumnList: _InputDestroyRequestRLColumnList,
            IsLoadDataComplete: true
        });
    }

    handleSubmit(formData, MLObject) {
        console.log("handleSubmit", formData, MLObject);
        const { isError } = this.state;
        if (!isError) {
            this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then(apiResult => {
                this.setState({ IsCallAPIError: apiResult.IsError });
                this.showMessage(apiResult.MessageDetail);

            });
        }
        else {
            this.showMessage('Thông tin nhập vào bị lỗi. Vui lòng kiểm tra lại.');
        }

    }


    handleCloseMessage() {
        debugger
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

    valueChangeInputGrid(elementdata, index, name, gridFormValidation) {
        const { DestroyRequestDetail } = this.state;
        let Quantity = DestroyRequestDetail[index].UsableQuantity;
        let item = elementdata.Name + '_' + index;
        if (!gridFormValidation[item].IsValidationError) {
            if (elementdata.Name == 'Quantity') {
                if (elementdata.Value > Quantity) {
                    gridFormValidation[item].IsValidationError = true;
                    gridFormValidation[item].ValidationErrorMessage = "Số lượng tạm ứng không được vượt số dư tạm ứng.";
                    this.setState({
                        isError: true,
                        IsCallAPIError: true,
                    })
                }
            }
            this.setState({
                isError: false,
                IsCallAPIError: false,
            })
        }
        else {
            this.setState({
                isError: true,
                IsCallAPIError: true,
            })
        }
       
    }

    handleChange(formData, MLObject) {
        console.log("handleChange", formData, MLObject)
        if (formData.cboDestroyRequestType.Name == 'cboDestroyRequestType') {
            this.GetDataByRequestTypeID(formData.cboDestroyRequestType.value)
        }
        if (formData.cboRequestStore.Name == 'cboRequestStore') {
            this.GetUserByStoreID(formData.cboRequestStore.value)
        }

    }

    render() {
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        let currentDate = new Date();

        const { DestroyRequestDetail, DestroyRequestRL, InputDestroyRequestRLColumnList, isError } = this.state;

        if (this.state.IsLoadDataComplete) {
            return (
                <React.Fragment>
                    <FormContainer
                        FormName={TitleFormAdd}
                        MLObjectDefinition={MLObjectDefinition}
                        listelement={[]}
                        BackLink={BackLink}
                        onSubmit={this.handleSubmit}
                        onchange={this.handleChange.bind(this)}
                    >

                        <div className="row">
                            <div className="col-md-6">
                                <FormControl.TextBox
                                    name="txtDestroyRequestID"
                                    colspan="8"
                                    labelcolspan="4"
                                    readOnly={false}
                                    label="mã yêu cầu"
                                    placeholder="Mã yêu cầu"
                                    controltype="InputControl"
                                    value=""
                                    datasourcemember="DestroyRequestID"
                                    validatonList={['required']}
                                />
                            </div>

                            <div className="col-md-6">
                                <FormControl.FormControlComboBox
                                    name="cboDestroyRequestType"
                                    colspan="8"
                                    labelcolspan="4"
                                    label="loại yêu cầu hủy vật tư"
                                    validatonList={["Comborequired"]}
                                    placeholder="-- Vui lòng chọn --"
                                    isautoloaditemfromcache={true}
                                    disabled={true}
                                    loaditemcachekeyid="ERPCOMMONCACHE.DESTROYREQUESTTYPE"
                                    valuemember="DestroyRequestTypeID"
                                    nameMember="DestroyRequestTypeName"
                                    controltype="InputControl"
                                    value={this.props.location.state.DestroyRequestTypeID}
                                    listoption={null}
                                    datasourcemember="DestroyRequestTypeID" />

                            </div>

                            <div className="col-md-12">
                                <FormControl.TextBox
                                    name="txtDestroyRequestTitle"
                                    labelcolspan={2}
                                    colspan={10}
                                    readOnly={false}
                                    label="tiêu đề"
                                    placeholder="Tiêu đề"
                                    controltype="InputControl"
                                    value=""
                                    datasourcemember="DestroyRequestTitle"
                                    validatonList={['required']}
                                    classNameCustom="customcontrol"
                                />
                            </div>

                            <div className="col-md-6">
                                <FormControl.FormControlComboBox
                                    name="cboRequestStore"
                                    colspan="8"
                                    labelcolspan="4"
                                    label="kho yêu cầu"
                                    disabled={true}
                                    validatonList={["Comborequired"]}
                                    placeholder="-- Vui lòng chọn --"
                                    isautoloaditemfromcache={true}
                                    loaditemcachekeyid="ERPCOMMONCACHE.USER_COOSTORE_BYUSER"
                                    valuemember="StoreID"
                                    nameMember="StoreName"
                                    controltype="InputControl"
                                    value={this.props.location.state.RequestStoreID}
                                    listoption={null}
                                    datasourcemember="RequestStoreID" />

                            </div>

                            <div className="col-md-6">

                                <FormControl.FormControlDatetimeNew
                                    name="dtRequestDate"
                                    colspan="8"
                                    labelcolspan="4"
                                    readOnly={true}
                                    showTime={false}
                                    timeFormat={false}
                                    dateFormat="DD-MM-YYYY"//"YYYY-MM-DD"
                                    label="Ngày yêu cầu"
                                    placeholder={formatDate(currentDate, true)}
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
                                    classNameCustom="customcontrol"
                                />
                            </div>
                        </div>



                        <div className="card">
                            <div className="card-title group-card-title">
                                <h4 className="title">Danh sách vật tư</h4>
                            </div>
                            <div className="card-body">
                                <InputGrid
                                    name="lstDestroyRequestDetail"
                                    controltype="GridControl"
                                    listColumn={InputDestroyRequestDetailColumnList}
                                    dataSource={DestroyRequestDetail}
                                    isHideHeaderToolbar={true}
                                    MLObjectDefinition={GridMLObjectDefinition}
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
                                    listColumn={InputDestroyRequestRLColumnList}
                                    dataSource={DestroyRequestRL}
                                    isHideHeaderToolbar={true}
                                    MLObjectDefinition={GridDestroyRequestRLMLObjectDefinition}
                                    colspan="12"
                                    onValueChangeInputGrid={this.valueChangeInputGrid}
                                />
                            </div>
                        </div>


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
