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
    GirdMTReturnRequestDetailColumnList,
    LoadAPIByMtreturnRequestTypeIDPath,
    LoadAPIByRequestTypeIDPath,
    LoadAPIByMTRRequestTypeIDPath,
    addImportMaterialModalWidth
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
import ModalAddReturnRequestDetail from "../Component/ModalAddReturnRequestDetail";
import { Base64 } from 'js-base64';
class AddCom extends React.Component {
    constructor(props) {
        super(props);
        this.prevDataSubmit = this.prevDataSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.onChangeDataMTRRequestDetail = this.onChangeDataMTRRequestDetail.bind(this);
        this.combineSameMaterial = this.combineSameMaterial.bind(this);
        this.checkValidateArrCombineSameMaterial = this.checkValidateArrCombineSameMaterial.bind(this);
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
            isError: false,
            InventoryStatusID: "",
            IsAllowdUpliCatiOnProduct: false
        };
    }

    componentDidMount() {
        this.props.hideModal();
        this.props.updatePagePath(AddPagePath);
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
                        InventoryStatusID: apiResult.ResultObject[0].InventoryStatusID,
                        IsAllowdUpliCatiOnProduct: apiResult.ResultObject[0].IsAllowdUpliCatiOnProduct,
                    });
                }

                this.setState({
                    MTReturnRequestDetail: apiResult.ResultObject,
                    IsCallAPIError: apiResult.IsError,
                });
            }
        });
    }

    checkValidateArrCombineSameMaterial(arrUniqueMaterial) {
        const { isError, MTReturnRequestDetail } = this.state;
        debugger
        arrUniqueMaterial.forEach(item => {
            if (item.Quantity > item.TotalQuantity) {
                console.log(`Lỗi vật tư ${item.MaterialGroupID}-${item.ProductName} quá số lượng tạm ứng`)
                return;
            }
        })

    }

    combineSameMaterial() {
        const { MTReturnRequestDetailNew } = this.state;
        let arrUniqueMaterial = [];

        if (MTReturnRequestDetailNew.length > 0) {

            arrUniqueMaterial.push({
                ...MTReturnRequestDetailNew[0], Quantity: parseInt(MTReturnRequestDetailNew[0].Quantity)
            });

            if (MTReturnRequestDetailNew.length == 1) return MTReturnRequestDetailNew;

            for (let index = 1; index < MTReturnRequestDetailNew.length; index++) {
                const material = MTReturnRequestDetailNew[index];

                let detectSameMaterial = false, indexSameMaterial = null;
                arrUniqueMaterial.forEach((item, subIndex) => {
                    if (material.MaterialGroupID.localeCompare(item.MaterialGroupID) == 0
                        && material.ProductID.localeCompare(item.ProductID) == 0) {
                        detectSameMaterial = true;
                        indexSameMaterial = subIndex;
                    }
                })

                detectSameMaterial
                    ? arrUniqueMaterial[indexSameMaterial].Quantity = parseInt(arrUniqueMaterial[indexSameMaterial].Quantity) + parseInt(material.Quantity)
                    : arrUniqueMaterial.push({ ...material, Quantity: parseInt(material.Quantity) });
            }
        }
        return arrUniqueMaterial
        //this.checkValidateArrCombineSameMaterial(arrUniqueMaterial);
    }

    prevDataSubmit(formData, MLObject) {
        const { isError, gridMTReturnRequestRL, isAutoReview, gridMTReturnRequestRLSort, MTReturnRequestDetailNew } = this.state;
        let arrReviewLevel = [];
        const arrProductDetai = this.combineSameMaterial();

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

            const MTReturnRequestDetail = MTReturnRequestDetailNew.filter((item, index) => {
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
            let itemCheck = []
            if (!!arrProductDetai) {
                itemCheck = arrProductDetai.filter((item, index) => {
                    if (item.Quantity > item.TotalQuantity) {
                        return item;
                    }
                })
            }


            if (itemCheck.length > 0) {
                this.showMessage('Lỗi vật tư quá số lượng tạm ứng');
                this.setState({
                    IsCallAPIError: true,
                })
                return;
            }


            MLObject.IsCreatedInputVoucher = false;
            MLObject.lstMTReturnRequestDetail = MTReturnRequestDetail;

            this.handleSubmit(MLObject)
        }
        else {
            this.showMessage('Thông tin nhập vào không chính xác. Vui lòng kiểm tra lại.');
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



    handleChange(formData, MLObject) {
    }

    valueChangeInputGrid(elementdata, index, name, gridFormValidation) {

    }


    handleInputChangeGridRV(objMTReturnRequestRL) {
        this.setState({ gridMTReturnRequestRLSort: objMTReturnRequestRL });
    }

    handleinsertItemNew(data) {
        this.setState({
            MTReturnRequestDetailNew: [...this.state.MTReturnRequestDetailNew, ...data]
        })
    }

    onChangeDataMTRRequestDetail(data) {
        this.setState({
            MTReturnRequestDetailNew: data
        })
    }

    handleItemDelete(index, item) {
        const { MTReturnRequestDetailNew } = this.state;

        const result = MTReturnRequestDetailNew.filter((item, i) => {
            if (i != index) return item;
        })

        this.setState({
            MTReturnRequestDetailNew: result
        })
    }

    handleItemInsert() {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Thêm chi tiết nhập trả vật tư',
            content: {
                text: <ModalAddReturnRequestDetail
                    dataSource={this.state.MTReturnRequestDetail}
                    dataCompare={this.state.MTReturnRequestDetailNew}
                    IsAllowdUpliCatiOnProduct={this.state.IsAllowdUpliCatiOnProduct}
                    multipleCheck={false}
                    listColumn={InputMTReturnRequestDetailColumnListNew}
                    onClickInsertItem={this.handleinsertItemNew.bind(this)}
                    IDSelectColumnName={"chkSelect"}
                    PKColumnName={"MaterialGroupID,ProductID"}
                    isHideHeaderToolbarGroupTextBox={true}
                    isHideHeaderToolbar={true}
                // name={"ProductID"}
                // value={"MaterialGroupID"}
                />
            },
            maxWidth: addImportMaterialModalWidth
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


                        <div className="col-md-6">
                            <FormControl.TextBox
                                name="txtMTReturnRequestTitle"
                                labelcolspan={4}
                                colspan={8}
                                readOnly={false}
                                label="tiêu đề"
                                placeholder="Tiêu đề"
                                controltype="InputControl"
                                value=""
                                datasourcemember="MTReturnRequestTitle"
                                validatonList={['required']}
                            //classNameCustom="customcontrol"
                            />
                        </div>

                        <div className="col-md-6">
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label className="col-form-label 5">Cho phép nhập trùng</label>
                                </div>
                                <div className="form-group col-md-8">
                                    <div className="checkbox customCheckbox">
                                        <label>
                                            <input name="ckIsAllowdUpliCatiOnProduct" type="checkbox" defaultChecked={this.state.IsAllowdUpliCatiOnProduct} disabled={true} value={this.state.IsAllowdUpliCatiOnProduct} defaultChecked={this.state.IsAllowdUpliCatiOnProduct} checked={this.state.IsAllowdUpliCatiOnProduct} />
                                            <span className="cr">
                                                <i className="cr-icon fa fa-check"></i>
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
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

                    {/* <div className="card">
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
                                // onValueChangeInputGrid={this.valueChangeInputGrid.bind(this)}
                                onInsertClick={this.handleItemInsert.bind(this)}
                            />


                        </div>
                    </div> */}

                    <InputGridControl
                        name="lstMTReturnRequestDetail"
                        title={"Danh sách vật tư nhập trả"}
                        IDSelectColumnName={"MaterialGroupID"}
                        PKColumnName={"MaterialGroupID"}
                        listColumn={InputMTReturnRequestDetailColumnList}
                        dataSource={MTReturnRequestDetailNew}
                        onInsertClick={this.handleItemInsert.bind(this)}
                        onClickDeleteNew={this.handleItemDelete.bind(this)}
                        ref={this.gridref}
                    />

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
