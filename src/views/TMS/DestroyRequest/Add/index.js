import React, { Fragment } from "react";
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
    LoadUserNameAPIByStoreIDPath,
    LoadAPIByDestroyRequestTypeIDPath

} from "../constants";


import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { CACHE_OBJECT_STORENAME } from "../../../../constants/systemVars.js";
import { callGetCache, callClearLocalCache } from "../../../../actions/cacheAction";
import { formatDate, formatDateNew } from "../../../../common/library/CommonLib.js";
import { showModal, hideModal } from '../../../../actions/modal';
import { ERPCOMMONCACHE_DES_RVLEVEL } from "../../../../constants/keyCache";
import { DESTROYREQUEST_ADD } from "../../../../constants/functionLists";
import DestroyRequestRVList from '../Component/DestroyRequestRVList.js';
import DestroyRequestDetailList from "../Component/DestroyRequestDetailList";

class AddCom extends React.Component {
    constructor(props) {
        super(props);
        this.prevDataSubmit = this.prevDataSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.GetDataByRequestTypeID = this.GetDataByRequestTypeID.bind(this);
        // this.GetUserByStoreID = this.GetUserByStoreID.bind(this);
        this.setValueCombobox = this.setValueCombobox.bind(this);
        this.valueChangeInputGrid = this.valueChangeInputGrid.bind(this);
        this.getDataDestroyRequestRLByDestroyRequestType = this.getDataDestroyRequestRLByDestroyRequestType.bind(this);
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
            isError: false,
            gridDestroyRequestRL: {},
            validationErrorMessageSelect: '',
            isValidationSelect: false,
            isAutoReview: false,
            isAutoOutput: false,
            gridDestroyRequestRLSort: [],
        };
    }

    componentDidMount() {
        this.setState({
            DestroyRequestTypeID: this.props.location.state.DestroyRequestTypeID,
            RequestStoreID: this.props.location.state.RequestStoreID,
        })
        this.props.hideModal()
        this.props.updatePagePath(AddPagePath);
        this.GetDataByRequestTypeID(this.props.location.state.DestroyRequestTypeID);
        // this.GetUserByStoreID(this.props.location.state.RequestStoreID);

        const param = [
            {
                SearchKey: "@DESTROYREQUESTTYPEID",
                SearchValue: this.props.location.state.DestroyRequestTypeID
            },
            {
                SearchKey: "@STOREID",
                SearchValue: this.props.location.state.RequestStoreID
            }
        ];
        this.getDataDestroyRequestRLByDestroyRequestType(param);
    }

    getDestroyRequestAdd(param) {
        this.props.callFetchAPI(APIHostName, getDestroyRequestAdd, param).then(apiResult => {
            // console.log("aaa", apiResult.ResultObject)
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

    getDataDestroyRequestRLByDestroyRequestType(param) {
        this.props.callFetchAPI(APIHostName, LoadAPIByDestroyRequestTypeIDPath, param).then(apiResult => {
            // console.log("apiResult", apiResult)
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                //this.showMessage(apiResult.Message);
            }
            else {
                apiResult.ResultObject.map(e => {
                    e.value = e.UserName
                    e.label = e.UserName + "-" + e.FullName
                    return e;
                })

                let lstoption = apiResult.ResultObject.reduce((r, a) => {
                    if (!r[`${a.ReviewLevelID}`]) r[`${a.ReviewLevelID}`] = {};
                    if (!r[`${a.ReviewLevelID}`]["ReviewLevelID"]) r[`${a.ReviewLevelID}`]["ReviewLevelID"] = "";
                    if (!r[`${a.ReviewLevelID}`]["ReviewLevelName"]) r[`${a.ReviewLevelID}`]["ReviewLevelName"] = "";
                    if (!r[`${a.ReviewLevelID}`]["UserName"]) r[`${a.ReviewLevelID}`]["UserName"] = "";
                    if (!r[`${a.ReviewLevelID}`]["FullName"]) r[`${a.ReviewLevelID}`]["FullName"] = "";
                    if (!r[`${a.ReviewLevelID}`]["ReviewOrderIndex"]) r[`${a.ReviewLevelID}`]["ReviewOrderIndex"] = "";
                    if (!r[`${a.ReviewLevelID}`]["DestroyRequest_ReviewLevelList"]) r[`${a.ReviewLevelID}`]["DestroyRequest_ReviewLevelList"] = [];
                    a.value = a.UserName
                    a.name = a.UserName + " - " + a.FullName
                    a.label = a.UserName + " - " + a.FullName
                    r[`${a.ReviewLevelID}`]["DestroyRequest_ReviewLevelList"].push(a);

                    return r;
                }, {});

                Object.keys(lstoption).map(function (key) {
                    lstoption[key]["ReviewLevelID"] = lstoption[key]["DestroyRequest_ReviewLevelList"][0].ReviewLevelID;
                    lstoption[key]["ReviewLevelName"] = lstoption[key]["DestroyRequest_ReviewLevelList"][0].ReviewLevelName;
                    lstoption[key]["UserName"] = lstoption[key]["DestroyRequest_ReviewLevelList"][0].UserName;
                    lstoption[key]["FullName"] = lstoption[key]["DestroyRequest_ReviewLevelList"][0].FullName;
                    lstoption[key]["ReviewOrderIndex"] = lstoption[key]["DestroyRequest_ReviewLevelList"][0].ReviewOrderIndex
                    // lstoption[key]["DestroyRequest_ReviewLevelList"].unshift({ value: "-1", name: "-- Vui lòng chọn --", UserName: "-1", FullName: "-- Vui lòng chọn --" })

                })

                let resultSort = Object.values(lstoption).sort((a, b) => a.ReviewOrderIndex - b.ReviewOrderIndex)


                // console.log("lstoption", lstoption)
                // console.log("resultSort", resultSort)

                this.setState({
                    DestroyRequestRL: apiResult.ResultObject,
                    IsLoadDataComplete: true,
                    gridDestroyRequestRL: lstoption,
                    gridDestroyRequestRLSort: resultSort
                });
            }
        });
    }

    GetDataByRequestTypeID(DestroyRequestTypeID) {
        this.props.callFetchAPI(APIHostName, LoadAPIByRequestTypeIDPath, DestroyRequestTypeID).then(apiResult => {
             console.log('111', apiResult)
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {

                if (apiResult.ResultObject.length > 0) {

                    this.setState({
                        isAutoReview: apiResult.ResultObject[0].IsAutoReview,
                        isAutoOutput: apiResult.ResultObject[0].IsAutoOutput,
                    });
                }

                this.setState({
                    DestroyRequestDetail: apiResult.ResultObject,
                    IsCallAPIError: apiResult.IsError,
                });
            }
        });
    }

    // GetUserByStoreID(StoreID) {
    //     this.props.callFetchAPI(APIHostName, LoadUserNameAPIByStoreIDPath, StoreID).then(apiResult => {
    //          console.log('GetUserByStoreID', apiResult)
    //         let listOption = []
    //         if (!apiResult.IsError) {
    //             if (apiResult.ResultObject.length > 0) {
    //                 apiResult.ResultObject.map((item, index) => {
    //                     listOption.push({ value: item.UserName, label: item.FullName })
    //                 })
    //             }

    //             this.setState({
    //                 ListOption: listOption,
    //             })
    //             this.setValueCombobox();
    //         }

    //     });
    // }

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

    prevDataSubmit(formData, MLObject) {
        const { isError, gridDestroyRequestRL, isAutoReview, isAutoOutput, gridDestroyRequestRLSort } = this.state;

        // console.log("gridDestroyRequestRL", gridDestroyRequestRL, MLObject);

        let arrReviewLevel = [];
        Object.keys(gridDestroyRequestRL).map(function (key) {
            let objItem = {}
            objItem.ReviewLevelID = key;
            objItem.UserName = gridDestroyRequestRL[key].UserName;

            arrReviewLevel.push(objItem)
            return objItem;
        })

        MLObject.lstDestroyRequestReviewLevel = gridDestroyRequestRLSort;

        if (isError == false) {
            const ReviewLevel = MLObject.lstDestroyRequestReviewLevel.reduce(function (prev, cur) {
                return cur.UserName;
            }, 0);

            const DestroyRequestDetail = MLObject.lstDestroyRequestDetail.filter((item, index) => {
                if (item.Quantity != undefined && item.Quantity > 0) {
                    return item;
                }
            });

            if (isAutoReview) {
                MLObject.IsreViewed = isAutoReview;
                MLObject.reViewedUser = this.props.AppInfo.LoginInfo.Username; 
                MLObject.CurrentReviewLevelID = 0;
                MLObject.reViewedDate = new Date();
            }
            else {
                MLObject.IsreViewed = isAutoReview;
                if (MLObject.lstDestroyRequestReviewLevel.length > 0) {
                    MLObject.CurrentReviewLevelID = MLObject.lstDestroyRequestReviewLevel[0].ReviewLevelID;
                    if (ReviewLevel == undefined || ReviewLevel == 0) {
                        this.showMessage('Danh sách duyệt người chưa được chọn. Vui lòng kiểm tra lại.');
                        this.setState({
                            IsCallAPIError: true,
                        })
                        return;
                    }
                }
                else {
                    this.showMessage('Danh sách duyệt người không tồn tại. Vui lòng kiểm tra lại.');
                    this.setState({
                        IsCallAPIError: true,
                    })
                    return;
                }

            }
            if (isAutoOutput) {
                MLObject.IsCreatedOrder = isAutoOutput;
                MLObject.CreatedOrderDate = new Date();
            }

            if (DestroyRequestDetail.length <= 0) {
                this.showMessage('Danh sách vật tư chưa được chọn.');
                this.setState({
                    IsCallAPIError: true,
                })
                return;
            }


            MLObject.lstDestroyRequestDetail = DestroyRequestDetail;

            console.log("MLObject", MLObject)
            this.handleSubmit(MLObject)

        }
        else {
            this.showMessage('Thông tin nhập vào bị lỗi. Vui lòng kiểm tra lại.');
        }
    }

    handleSubmit(MLObject) {
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

    valueChangeInputGrid(elementdata, index, name, gridFormValidation) {
        // console.log("valueChangeInputGrid", elementdata, index, name, gridFormValidation)

        const { DestroyRequestDetail } = this.state;
        // console.log('111', DestroyRequestDetail[index])
        const isAllowDecimal = DestroyRequestDetail[index].IsAllowDecimal;
        let item = elementdata.Name + '_' + index;
        if (!isAllowDecimal) {
            if (elementdata.Value.toString().length > 1) {
                if (/^[0-9][0-9]*$/.test(elementdata.Value)) {
                    if (elementdata.Name == 'Quantity') {
                        let Quantity = DestroyRequestDetail[index].UsableQuantity;

                        if (!gridFormValidation[item].IsValidationError) {
                            if (elementdata.Value > Quantity) {
                                gridFormValidation[item].IsValidationError = true;
                                gridFormValidation[item].ValidationErrorMessage = "Số lượng tạm ứng không được vượt số dư tạm ứng.";
                                this.setState({
                                    isError: true,
                                    IsCallAPIError: true,
                                })
                            }
                            else {
                                this.setState({
                                    isError: false,
                                    IsCallAPIError: false,
                                })
                            }
                        }
                    }
                    else {
                        this.setState({
                            isError: false,
                            IsCallAPIError: false,
                        })
                    }
                }
                else {
                    gridFormValidation[item].IsValidationError = true;
                    gridFormValidation[item].ValidationErrorMessage = "Vui lòng nhập số";
                    this.setState({
                        isError: true,
                        IsCallAPIError: true,
                    })
                }
            }
            else {
                if (elementdata.Value.length > 0) {
                    if (/^[0-9][0-9]*$/.test(elementdata.Value)) {
                        if (parseInt(elementdata.Value) > 0) {
                            if (elementdata.Name == 'Quantity') {
                                let Quantity = DestroyRequestDetail[index].UsableQuantity;
    
                                if (!gridFormValidation[item].IsValidationError) {
                                    if (elementdata.Value > Quantity) {
                                        gridFormValidation[item].IsValidationError = true;
                                        gridFormValidation[item].ValidationErrorMessage = "Số lượng tạm ứng không được vượt số dư tạm ứng.";
                                        this.setState({
                                            isError: true,
                                            IsCallAPIError: true,
                                        })
                                    }
                                    else {
                                        this.setState({
                                            isError: false,
                                            IsCallAPIError: false,
                                        })
                                    }
                                }
                            }
                            else {
                                this.setState({
                                    isError: false,
                                    IsCallAPIError: false,
                                })
                            }
                        }
                        else {
                            gridFormValidation[item].IsValidationError = true;
                            gridFormValidation[item].ValidationErrorMessage = "Vui lòng nhập số lớn hơn 0";
                            this.setState({
                                isError: true,
                                IsCallAPIError: true,
                            })
                        }
                    }
                    else {
                        gridFormValidation[item].IsValidationError = true;
                        gridFormValidation[item].ValidationErrorMessage = "Vui lòng nhập số";
                        this.setState({
                            isError: true,
                            IsCallAPIError: true,
                        })
                    }
                }
                else {
                    gridFormValidation[item].IsValidationError = false;
                    gridFormValidation[item].ValidationErrorMessage = "";
                    this.setState({
                        isError: false,
                        IsCallAPIError: false,
                    })
                }
                
            }

        }
        else {
            if (elementdata.Value.toString().length > 1) {

                if (/^\d*\.?\d+$/.test(elementdata.Value)) {
                    if (elementdata.Name == 'Quantity') {
                        let Quantity = DestroyRequestDetail[index].UsableQuantity;

                        if (!gridFormValidation[item].IsValidationError) {
                            if (elementdata.Value > Quantity) {
                                gridFormValidation[item].IsValidationError = true;
                                gridFormValidation[item].ValidationErrorMessage = "Số lượng tạm ứng không được vượt số dư tạm ứng.";
                                this.setState({
                                    isError: true,
                                    IsCallAPIError: true,
                                })
                            }
                            else {
                                this.setState({
                                    isError: false,
                                    IsCallAPIError: false,
                                })
                            }
                        }
                    }
                    else {
                        this.setState({
                            isError: false,
                            IsCallAPIError: false,
                        })
                    }
                }
                else {
                    gridFormValidation[item].IsValidationError = true;
                    gridFormValidation[item].ValidationErrorMessage = "Vui lòng nhập số";
                    this.setState({
                        isError: true,
                        IsCallAPIError: true,
                    })
                }
            }
            else {
                if (elementdata.Value.length > 0) {
                    if (/^[0-9][0-9]*$/.test(elementdata.Value)) {
                        if (parseInt(elementdata.Value) > 0) {
                            if (elementdata.Name == 'Quantity') {
                                let Quantity = DestroyRequestDetail[index].UsableQuantity;

                                if (!gridFormValidation[item].IsValidationError) {
                                    if (elementdata.Value > Quantity) {
                                        gridFormValidation[item].IsValidationError = true;
                                        gridFormValidation[item].ValidationErrorMessage = "Số lượng tạm ứng không được vượt số dư tạm ứng.";
                                        this.setState({
                                            isError: true,
                                            IsCallAPIError: true,
                                        })
                                    }
                                    else {
                                        this.setState({
                                            isError: false,
                                            IsCallAPIError: false,
                                        })
                                    }
                                }
                            }
                        }
                        else {
                            gridFormValidation[item].IsValidationError = true;
                            gridFormValidation[item].ValidationErrorMessage = "Vui lòng nhập số lớn hơn 0";
                            this.setState({
                                isError: true,
                                IsCallAPIError: true,
                            })
                        }
                    }
                    else {
                        gridFormValidation[item].IsValidationError = true;
                        gridFormValidation[item].ValidationErrorMessage = "Vui lòng nhập số";
                        this.setState({
                            isError: true,
                            IsCallAPIError: true,
                        })
                    }
                }
                else {
                    gridFormValidation[item].IsValidationError = false;
                    gridFormValidation[item].ValidationErrorMessage = "";
                    this.setState({
                        isError: false,
                        IsCallAPIError: false,
                    })
                }

            }

        }

    }

    handleChange(formData, MLObject) {
        // console.log("handleChange", formData, MLObject)
        // if (formData.cboDestroyRequestType.Name == 'cboDestroyRequestType') {
        //     this.GetDataByRequestTypeID(formData.cboDestroyRequestType.value)
        // }
        // if (formData.cboRequestStore.Name == 'cboRequestStore') {
        //     this.GetUserByStoreID(formData.cboRequestStore.value)
        // }

    }

    handleInputChangeGridRV(objDestroyRequestRL) {
        this.setState({ gridDestroyRequestRLSort: objDestroyRequestRL });
    }

    render() {
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        let currentDate = new Date();

        const { DestroyRequestDetail, DestroyRequestRL, InputDestroyRequestRLColumnList, isError, gridDestroyRequestRL, validationErrorMessageSelect, isValidationSelect, isAutoReview, isAutoOutput, gridDestroyRequestRLSort } = this.state;

        const onChange = (aaa, event) => {
            const value = event.target.value;
            const name = event.target.name;
            const DestroyRequestRLID = aaa;

            if (value <= 0) {

                this.setState({
                    IsCallAPIError: true,
                    isError: true
                })
            }
            else {
                this.setState({
                    IsCallAPIError: false,
                    isError: false

                })
            }

            const element = Object.assign({}, gridDestroyRequestRL[DestroyRequestRLID], {
                "UserName": value,
                "FullName": name,
            })
            // console.log("element", element);

            const parent = Object.assign({}, gridDestroyRequestRL, { [DestroyRequestRLID]: element });

            // console.log("parent", parent);

            this.setState({ gridDestroyRequestRL: parent })
        }

        if (this.state.IsLoadDataComplete) {
            return (
                <React.Fragment>
                    <FormContainer
                        FormName={TitleFormAdd}
                        MLObjectDefinition={MLObjectDefinition}
                        listelement={[]}
                        BackLink={BackLink}
                        RequirePermission={DESTROYREQUEST_ADD}
                        onSubmit={this.prevDataSubmit}
                        onchange={this.handleChange.bind(this)}
                    >

                        <div className="row">
                            {/* <div className="col-md-6">
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
                            </div> */}

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

                        {/* <DestroyRequestDetailList
                            dataSource={DestroyRequestDetail}
                        /> */}

                        {isAutoReview == false ?
                            <DestroyRequestRVList
                                dataSource={gridDestroyRequestRLSort}
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
