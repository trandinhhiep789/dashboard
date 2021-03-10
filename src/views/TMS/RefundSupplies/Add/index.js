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
    MLObjectDefinition,
    BackLink,
    TitleFormAdd,
    AddPagePath,
    InputMTReturnRequestDetailColumnList,
    InputMTReturnRequestDetailColumnListNew,
    GridMLObjectDefinition,
    LoadAPIByMtreturnRequestTypeIDPath,
    LoadAPIByRequestTypeIDPath,
    LoadAPIByMTRRequestTypeIDPath

} from "../constants";
import MTReturnRequestRVList from '../Component/MTReturnRequestRVList'

import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { callGetCache, callClearLocalCache } from "../../../../actions/cacheAction";
import { formatDate, formatDateNew } from "../../../../common/library/CommonLib.js";
import { showModal, hideModal } from '../../../../actions/modal';
import { REFUNDSUPPLIES_ADD } from "../../../../constants/functionLists";
import InputGridControl from "../../../../common/components/FormContainer/FormControl/InputGrid/InputGridControl.js";
import { MODAL_TYPE_COMMONTMODALS } from '../../../../constants/actionTypes';
import MTReturnRequestDetailElement from "../Component/MTReturnRequestDetailElementCom";
class AddCom extends React.Component {
    constructor(props) {
        super(props);
        this.prevDataSubmit = this.prevDataSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.state = {
            IsCallAPIError: false,
            IsCloseForm: false,
            DataSource: {},
            MTReturnRequestDetail: [],
            MTReturnRequestDetailNew: [],
            isAutoReview: false,
            gridMTReturnRequestRLSort: [],
            gridMTReturnRequestRL: {},
            validationErrorMessageSelect: '',
            isValidationSelect: false,
        };
    }

    componentDidMount() {
        this.props.hideModal();
        this.props.updatePagePath(AddPagePath);
        console.log("props:", this.props);
        this.GetDataByRequestTypeID(this.props.location.state.MtreturnRequestTypeID);
        const param = [
            {
                SearchKey: "@MTRETURNREQUESTTYPEID",
                SearchValue: this.props.location.state.MtreturnRequestTypeID
            },
            {
                SearchKey: "@STOREID",
                SearchValue: this.props.location.state.RequestStoreID
            }
        ];
        this.getDataMTReturnRequestRLByMTReturnRequestType(param);
    }

    getDataMTReturnRequestRLByMTReturnRequestType(param) {
        this.props.callFetchAPI(APIHostName, LoadAPIByMtreturnRequestTypeIDPath, param).then(apiResult => {
            console.log("param:", param, apiResult);

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
                    if (!r[`${a.ReviewLevelID}`]["MTReturnRequest_ReviewLevelList"]) r[`${a.ReviewLevelID}`]["MTReturnRequest_ReviewLevelList"] = [];
                    a.value = a.UserName
                    a.name = a.UserName + " - " + a.FullName
                    a.label = a.UserName + " - " + a.FullName
                    r[`${a.ReviewLevelID}`]["MTReturnRequest_ReviewLevelList"].push(a);

                    return r;
                }, {});

                Object.keys(lstoption).map(function (key) {
                    lstoption[key]["ReviewLevelID"] = lstoption[key]["MTReturnRequest_ReviewLevelList"][0].ReviewLevelID;
                    lstoption[key]["ReviewLevelName"] = lstoption[key]["MTReturnRequest_ReviewLevelList"][0].ReviewLevelName;
                    lstoption[key]["UserName"] = lstoption[key]["MTReturnRequest_ReviewLevelList"][0].UserName;
                    lstoption[key]["FullName"] = lstoption[key]["MTReturnRequest_ReviewLevelList"][0].FullName;
                    lstoption[key]["ReviewOrderIndex"] = lstoption[key]["MTReturnRequest_ReviewLevelList"][0].ReviewOrderIndex
                    // lstoption[key]["DestroyRequest_ReviewLevelList"].unshift({ value: "-1", name: "-- Vui lòng chọn --", UserName: "-1", FullName: "-- Vui lòng chọn --" })

                })

                let resultSort = Object.values(lstoption).sort((a, b) => a.ReviewOrderIndex - b.ReviewOrderIndex)


                // console.log("lstoption", lstoption)
                // console.log("resultSort", resultSort)

                this.setState({
                    MTReturnRequestRL: apiResult.ResultObject,
                    IsLoadDataComplete: true,
                    gridMTReturnRequestRL: lstoption,
                    gridMTReturnRequestRLSort: resultSort
                });
            }
        })
    }

    GetDataByRequestTypeID(MtreturnRequestTypeID) {
        this.props.callFetchAPI(APIHostName, LoadAPIByMTRRequestTypeIDPath, MtreturnRequestTypeID).then(apiResult => {
            console.log("products:", apiResult)
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
                    });
                }

                this.setState({
                    MTReturnRequestDetail: apiResult.ResultObject,
                    IsCallAPIError: apiResult.IsError,
                });
            }
        });
    }

    prevDataSubmit(formData, MLObject) {
        console.log("11", formData, MLObject)
        const { isError, gridMTReturnRequestRL, isAutoReview, gridMTReturnRequestRLSort } = this.state;
        let arrReviewLevel = [];
        // console.log("MLObject", MLObject, gridMTReturnRequestRL, gridMTReturnRequestRLSort)

        Object.keys(gridMTReturnRequestRL).map(function (key) {
            let objItem = {}
            objItem.ReviewLevelID = key;
            objItem.UserName = gridMTReturnRequestRL[key].UserName;

            arrReviewLevel.push(objItem)
            return objItem;
        })

        MLObject.lstMTReturnRequestReviewLevel = gridMTReturnRequestRLSort;

        if (isError == false) {
            const ReviewLevel = MLObject.lstMTReturnRequestReviewLevel.reduce(function (prev, cur) {
                return cur.UserName;
            }, 0);

            const MTReturnRequestDetail = MLObject.lstMTReturnRequestDetail.filter((item, index) => {
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
                if (MLObject.lstMTReturnRequestReviewLevel.length > 0) {
                    MLObject.CurrentReviewLevelID = MLObject.lstMTReturnRequestReviewLevel[0].ReviewLevelID;
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


            if (MTReturnRequestDetail.length <= 0) {
                this.showMessage('Danh sách vật tư chưa được chọn.');
                this.setState({
                    IsCallAPIError: true,
                })
                return;
            }

            MLObject.IsCreatedInputVoucher = false;
            MLObject.lstMTReturnRequestDetail = MTReturnRequestDetail;

            console.log("MLObject", MLObject)
            this.handleSubmit(MLObject)
        }
        else {
            this.showMessage('Thông tin nhập vào không chính xác. Vui lòng kiểm tra lại.');
        }
        // this.handleSubmit(MLObject)
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



    handleChange(formData, MLObject) {
        //console.log("handleChange", formData, MLObject)
    }

    valueChangeInputGrid(elementdata, index, name, gridFormValidation) {
        console.log("valueChangeInputGrid", elementdata, index, name, gridFormValidation)
        const { MTReturnRequestDetailNew } = this.state;
        const isAllowDecimal = MTReturnRequestDetailNew[index].IsAllowDecimal;
        let item = elementdata.Name + '_' + index;
        if (!isAllowDecimal) {
            if (elementdata.Value.toString().length > 1) {
                if (/^[0-9][0-9]*$/.test(elementdata.Value)) {
                    if (elementdata.Name == 'Quantity') {
                        let Quantity = MTReturnRequestDetailNew[index].UsableQuantity;

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
                                let Quantity = MTReturnRequestDetailNew[index].UsableQuantity;

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
                        let Quantity = MTReturnRequestDetailNew[index].UsableQuantity;

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
                                let Quantity = MTReturnRequestDetailNew[index].UsableQuantity;

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


    handleInputChangeGridRV(objMTReturnRequestRL) {
        this.setState({ gridMTReturnRequestRLSort: objMTReturnRequestRL });
    }

    handleinsertItemNew(objData) {
        const { MTReturnRequestDetailNew } = this.state;
        let tmpObjectItem = [];

        objData.map((row, index) => {
            let match = this.state.MTReturnRequestDetail.filter(item => {
                return item.MaterialGroupID == row.MaterialGroupID && item.ProductID == row.ProductID;
            });
            if (match.length > 0) {
                tmpObjectItem = tmpObjectItem.concat(match);
            }
        });
        tmpObjectItem =  tmpObjectItem.concat(MTReturnRequestDetailNew);

        this.setState({
            MTReturnRequestDetailNew: tmpObjectItem
        })

        console.log("handleinsertItemNew", objData, tmpObjectItem, this.state.MTReturnRequestDetail)
    }

    handleItemInsert() {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Thêm chi tiết nhập trả vật tư',
            content: {
                text: <MTReturnRequestDetailElement
                    dataSource={this.state.MTReturnRequestDetail}
                    multipleCheck={true}
                    listColumn={InputMTReturnRequestDetailColumnListNew}
                    onClickInsertItem={this.handleinsertItemNew.bind(this)}
                    IDSelectColumnName={"chkSelect"}
                    PKColumnName={"MaterialGroupID,ProductID"}
                    isHideHeaderToolbarGroupTextBox={true}
                    isHideHeaderToolbar={true}
                    name={"ProductID"}
                    value={"MaterialGroupID"}
                />
            },
            maxWidth: '1000px'
        });
    }

    handleItemEdit(index) {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Cập nhật chi tiết nhập trả vật tư',
            content: {
                text: <div>chỉnh sửa</div>
            },
            maxWidth: '1000px'
        });

    }
    
    handleMTReturnRequestDetailItem(id) {
        console.log("id", id)
    }

    render() {
        
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        let currentDate = new Date();

        const {
            MTReturnRequestDetail,
            MTReturnRequestDetailNew,
            isError,
            gridDestroyRequestRL,
            validationErrorMessageSelect,
            isValidationSelect,
            isAutoReview,
            gridMTReturnRequestRLSort
        } = this.state;
        console.log("MTReturnRequestDetailNew", MTReturnRequestDetailNew)
        return (
            <React.Fragment>
                <FormContainer
                    FormName={TitleFormAdd}
                    MLObjectDefinition={MLObjectDefinition}
                    listelement={[]}
                    BackLink={BackLink}
                    // RequirePermission={REFUNDSUPPLIES_ADD}
                    onSubmit={this.prevDataSubmit}
                    onchange={this.handleChange.bind(this)}
                >

                    <div className="row">

                        <div className="col-md-6">
                            <FormControl.FormControlComboBox
                                name="cboMtreturnRequestType"
                                colspan="8"
                                labelcolspan="4"
                                label="loại yêu cầu nhập trả vật tư"
                                validatonList={["Comborequired"]}
                                placeholder="-- Vui lòng chọn --"
                                isautoloaditemfromcache={true}
                                disabled={true}
                                loaditemcachekeyid="ERPCOMMONCACHE.MTRETURNREQUESTTYPE"
                                valuemember="MtreturnRequestTypeID"
                                nameMember="MtreturnRequestTypeName"
                                controltype="InputControl"
                                value={this.props.location.state.MtreturnRequestTypeID}
                                listoption={null}
                                datasourcemember="MtreturnRequestTypeID" />

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
                                name="txtMTReturnRequestTitle"
                                labelcolspan={2}
                                colspan={10}
                                readOnly={false}
                                label="tiêu đề"
                                placeholder="Tiêu đề"
                                controltype="InputControl"
                                value=""
                                datasourcemember="MTReturnRequestTitle"
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
                            <h4 className="title">Danh sách vật tư nhập trả</h4>
                        </div>
                        <div className="card-body">
                            <InputGrid
                                name="lstMTReturnRequestDetail"
                                controltype="GridControl"
                                listColumn={InputMTReturnRequestDetailColumnList}
                                dataSource={MTReturnRequestDetailNew}
                                MLObjectDefinition={GridMLObjectDefinition}
                                colspan="12"
                                onValueChangeInputGrid={this.valueChangeInputGrid.bind(this)}
                                onInsertClick={this.handleItemInsert.bind(this)}
                            />
                        </div>
                    </div>

                    {isAutoReview == false ?
                        <MTReturnRequestRVList
                            dataSource={gridMTReturnRequestRLSort}
                            onValueChangeGridRV={this.handleInputChangeGridRV.bind(this)}
                        />
                        : <div></div>

                    }

                </FormContainer>
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
