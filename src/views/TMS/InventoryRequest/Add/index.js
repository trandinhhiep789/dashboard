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
    InputInventoryRequestDetailColumnList,
    LoadAPIByRequestTypeIDPath,
    InputDestroyRequestRLColumnList,
    GridDestroyRequestRLMLObjectDefinition,
    LoadUserNameAPIByStoreIDPath,
    LoadAPIByDestroyRequestTypeIDPath

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
        this.GetDataByRequestTypeID = this.GetDataByRequestTypeID.bind(this);
        this.valueChangeInputGrid = this.valueChangeInputGrid.bind(this);
        this.getInventoryRequestRLByInventoryRequestType = this.getInventoryRequestRLByInventoryRequestType.bind(this);
        this.state = {
            IsCallAPIError: false,
            IsCloseForm: false,
            DataSource: {},
            IsExtended: false,
            IsLiquidated: false,
            IsDeposited: false,
            DestroyRequestDetail: [],
            InventoryRequestTypeID: '',
            RequestStoreID: '',
            InventoryRequestRL: [],
            ListOption: [],
            IsLoadDataComplete: false,
            InputInventoryRequestDetailColumnList: InputInventoryRequestDetailColumnList,
            isError: false,
            gridInventoryRequestRL: {},
            validationErrorMessageSelect: '',
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

        const param = [
            {
                SearchKey: "@INVENTORYREQUESTTYPEID",
                SearchValue: this.props.location.state.InventoryRequestTypeID
            },
            {
                SearchKey: "@STOREID",
                SearchValue: this.props.location.state.RequestStoreID
            }
        ];

        this.getInventoryRequestRLByInventoryRequestType(param);

    }


    getInventoryRequestRLByInventoryRequestType(param) {
        this.props.callFetchAPI(APIHostName, LoadAPIByDestroyRequestTypeIDPath, param).then(apiResult => {
            console.log("222", apiResult, param)
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
                    if (!r[`${a.ReviewLevelID}`]["Child"]) r[`${a.ReviewLevelID}`]["Child"] = [];
                    a.value = a.UserName
                    a.name = a.UserName + " - " + a.FullName
                    a.label = a.UserName + " - " + a.FullName
                    r[`${a.ReviewLevelID}`]["Child"].push(a);

                    return r;
                }, {});
                // console.log("111", lstoption)
                Object.keys(lstoption).map(function (key) {
                    lstoption[key]["ReviewLevelID"] = lstoption[key]["Child"][0].ReviewLevelID;
                    lstoption[key]["ReviewLevelName"] = lstoption[key]["Child"][0].ReviewLevelName;
                    lstoption[key]["UserName"] = lstoption[key]["Child"][0].UserName
                    lstoption[key]["FullName"] = lstoption[key]["Child"][0].FullName
                    lstoption[key]["Child"].unshift({ value: "-1", name: "-- Vui lòng chọn --", UserName: "-1", FullName: "-- Vui lòng chọn --" })

                })

                // console.log("lstoption", lstoption)

                const dataSource = apiResult.ResultObject.reduce((catsSoFar, item, index) => {
                    if (!catsSoFar[item.ReviewLevelID]) catsSoFar[item.ReviewLevelID] = [];
                    catsSoFar[item.ReviewLevelID].push(item);
                    return catsSoFar;
                }, {});

                // console.log("lstoption", lstoption)
                this.setState({
                    InventoryRequestRL: apiResult.ResultObject,
                    IsLoadDataComplete: true,
                    gridInventoryRequestRL: lstoption
                });
            }
        });
    }


    GetDataByRequestTypeID(DestroyRequestTypeID) {
        this.props.callFetchAPI(APIHostName, LoadAPIByRequestTypeIDPath, DestroyRequestTypeID).then(apiResult => {
            console.log("RequestTypeID", DestroyRequestTypeID, apiResult)
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
                    isAutoReview: apiResult.ResultObject[0].IsAutoReview,
                    isAutoOutput: apiResult.ResultObject[0].IsAutoOutput,
                });
            }
        });
    }

    prevDataSubmit(formData, MLObject) {
        const { isError, gridInventoryRequestRL, isAutoReview, isAutoOutput } = this.state;

        // console.log("gridDestroyRequestRL", gridDestroyRequestRL, MLObject);

        let arrReviewLevel = [];
        Object.keys(gridInventoryRequestRL).map(function (key) {
            let objItem = {}
            objItem.ReviewLevelID = key;
            objItem.UserName = gridInventoryRequestRL[key].UserName;

            arrReviewLevel.push(objItem)
            return objItem;
        })

        MLObject.lstDestroyRequestReviewLevel = arrReviewLevel;

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
                MLObject.CurrentReviewLevelID = 0;
                MLObject.reViewedDate = new Date();
            }
            else {
                MLObject.IsreViewed = isAutoReview;
                MLObject.CurrentReviewLevelID = MLObject.lstDestroyRequestReviewLevel[0].ReviewLevelID;
                if (ReviewLevel == undefined || ReviewLevel == 0) {
                    this.showMessage('Danh sách duyệt người chưa được chọn. Vui lòng kiểm tra lại.');
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
        if (elementdata.Name == 'Quantity') {
            let Quantity = DestroyRequestDetail[index].UsableQuantity;
            let item = elementdata.Name + '_' + index;
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

    handleChange(formData, MLObject) {
        // console.log("handleChange", formData, MLObject)
        // if (formData.cboDestroyRequestType.Name == 'cboDestroyRequestType') {
        //     this.GetDataByRequestTypeID(formData.cboDestroyRequestType.value)
        // }
        // if (formData.cboRequestStore.Name == 'cboRequestStore') {
        //     this.GetUserByStoreID(formData.cboRequestStore.value)
        // }

    }

    render() {
        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        let currentDate = new Date();

        const { DestroyRequestDetail,
            InventoryRequestRL,
            InputInventoryRequestDetailColumnList,
            isError, gridInventoryRequestRL,
            validationErrorMessageSelect, isValidationSelect,
            isAutoReview, isAutoOutput, InventoryRequestTypeID } = this.state;

        const onChange = (aaa, event) => {
            const value = event.target.value;
            const name = event.target.name;
            const InventoryRequestRLID = aaa;

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



            const element = Object.assign({}, gridInventoryRequestRL[InventoryRequestRLID], {
                "UserName": value,
                "FullName": name,
            })
            // console.log("element", element);

            const parent = Object.assign({}, gridInventoryRequestRL, { [InventoryRequestRLID]: element });


            this.setState({ gridInventoryRequestRL: parent })
        }

        // console.log("gridDestroyRequestRL", gridDestroyRequestRL)

        if (this.state.IsLoadDataComplete) {
            return (
                <React.Fragment>
                    <FormContainer
                        FormName={TitleFormAdd}
                        MLObjectDefinition={MLObjectDefinition}
                        listelement={[]}
                        BackLink={BackLink}
                        // RequirePermission={INVENTORYREQUEST_ADD}
                        onSubmit={this.prevDataSubmit}
                        onchange={this.handleChange.bind(this)}
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

                        <div className="row">
                            <div className="col-12">
                                <h4 className="header-title-custom">Danh sách sản phẩm</h4>
                            </div>

                        </div>
                        <div className="row">
                            <InputGrid
                                name="lstDestroyRequestDetail"
                                controltype="GridControl"
                                listColumn={InputInventoryRequestDetailColumnList}
                                dataSource={DestroyRequestDetail}
                                isHideHeaderToolbar={true}
                                MLObjectDefinition={GridMLObjectDefinition}
                                colspan="12"
                                onValueChangeInputGrid={this.valueChangeInputGrid}
                            />
                        </div>

                        {isAutoReview == false ?

                            <div className="card">
                                <div className="card-title group-card-title">
                                    <h4 className="title">Danh sách duyệt</h4>
                                </div>
                                <div className="card-body">

                                    <table className="table table-sm table-striped table-bordered table-hover table-condensed">
                                        <thead className="thead-light">
                                            <tr>
                                                <th className="jsgrid-header-cell">Mức duyệt</th>
                                                <th className="jsgrid-header-cell">Người duyệt</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {!!gridInventoryRequestRL && Object.keys(gridInventoryRequestRL).length > 0 &&
                                                Object.keys(gridInventoryRequestRL).map(function (key) {
                                                    return (

                                                        <tr key={key}>
                                                            <td>{gridInventoryRequestRL[key].ReviewLevelName}</td>
                                                            <td>
                                                                <select id={key} value={gridInventoryRequestRL[key].UserName}
                                                                    className={`form-control form-control-sm ${gridInventoryRequestRL[key].UserName == "-1" ? "is-invalid" : ""}`}
                                                                    onChange={selectOption => onChange(key, selectOption)}>
                                                                    {gridInventoryRequestRL[key]["Child"].map(e => {
                                                                        return <option value={e.value} name={e.name} key={e.value}>{e.name}</option>
                                                                    })}
                                                                </select>
                                                                <div className="invalid-feedback">
                                                                    <ul className="list-unstyled">
                                                                        <li>Vui lòng chọn người duyệt cho mức duyệt.</li>
                                                                    </ul>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>

                                </div>
                            </div>
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
