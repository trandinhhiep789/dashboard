import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ModalManager } from "react-dynamic-modal";
import FormContainer from "../../../../common/components/FormContainer";
import { MessageModal } from "../../../../common/components/Modal";
import FormControl from "../../../../common/components/FormContainer/FormControl";
import InputGrid from "../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
import { formatDate, formatDateNew } from "../../../../common/library/CommonLib.js";
import {

    TitleFormEdit,
    EditPagePath,
    BackLink,
    MLObjectDefinition,
    LoadAPIPath,
    APIHostName,
    UpdateAPIPath,
    InputDestroyRequestDetailColumnList,
    InputDestroyRequestRLColumnList,
    GridMLObjectDefinition,
    GridDestroyRequestRLMLObjectDefinition,
    LoadAPIByDestroyRequestTypeIDPath

} from "../constants";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { callGetCache, callClearLocalCache } from "../../../../actions/cacheAction";
import { DESTROYREQUEST_UPDATE } from "../../../../constants/functionLists";
import DestroyRequestRVList from '../Component/DestroyRequestRVList.js';

class EditCom extends React.Component {
    constructor(props) {
        super(props);
        this.prevDataSubmit = this.prevDataSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.callLoadData = this.callLoadData.bind(this);
        this.valueChangeInputGrid = this.valueChangeInputGrid.bind(this);
        this.getDataDestroyRequestRLByDestroyRequestType = this.getDataDestroyRequestRLByDestroyRequestType.bind(this);
        this.state = {
            IsCallAPIError: false,
            IsCloseForm: false,
            DataSource: {},
            IsLoadDataComplete: false,
            IsSystem: false,
            IsExtended: false,
            IsLiquidated: false,
            IsDeposited: false,
            DestroyRequestDetail: [],
            DestroyRequestRL: [],
            gridDestroyRequestRL: {},
            isError: false,
            isAutoReview: false,
            isAutoOutput: false,
            RequestUser: '',
            gridDestroyRequestRLSort: []
        };
    }

    componentDidMount() {
        this.props.updatePagePath(EditPagePath);
        this.callLoadData(this.props.match.params.id);
    }

    getDataDestroyRequestRLByDestroyRequestType(param) {
        const { DataSource, DestroyRequestRL } = this.state;
        this.props.callFetchAPI(APIHostName, LoadAPIByDestroyRequestTypeIDPath, param).then(apiResult => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
            }
            else {
                apiResult.ResultObject.map(e => {
                    e.value = e.UserName
                    e.label = e.UserName + "-" + e.FullName
                    return e;
                })

                console.log("ResultObject", apiResult.ResultObject)

                let lstoption = apiResult.ResultObject.reduce((r, a) => {
                    if (!r[`${a.ReviewLevelID}`]) r[`${a.ReviewLevelID}`] = {};
                    if (!r[`${a.ReviewLevelID}`]["ReviewLevelID"]) r[`${a.ReviewLevelID}`]["ReviewLevelID"] = "";
                    if (!r[`${a.ReviewLevelID}`]["ReviewLevelName"]) r[`${a.ReviewLevelID}`]["ReviewLevelName"] = "";
                    if (!r[`${a.ReviewLevelID}`]["UserName"]) r[`${a.ReviewLevelID}`]["UserName"] = "";
                    if (!r[`${a.ReviewLevelID}`]["FullName"]) r[`${a.ReviewLevelID}`]["FullName"] = "";
                    if (!r[`${a.ReviewLevelID}`]["DestroyRequest_ReviewLevelList"]) r[`${a.ReviewLevelID}`]["DestroyRequest_ReviewLevelList"] = [];
                    if (!r[`${a.ReviewLevelID}`]["ReviewOrderIndex"]) r[`${a.ReviewLevelID}`]["ReviewOrderIndex"] = "";
                    a.value = a.UserName
                    a.name = a.UserName + " - " + a.FullName
                    a.label = a.UserName + " - " + a.FullName
                    r[`${a.ReviewLevelID}`]["DestroyRequest_ReviewLevelList"].push(a);

                    return r;
                }, {});


                Object.keys(lstoption).map(function (key) {
                    // console.log("key", key)
                    const filterItem = DestroyRequestRL.filter(e => { return e.ReviewLevelID == key });
                    if (filterItem.length > 0) {
                        lstoption[key]["ReviewLevelID"] = lstoption[key]["DestroyRequest_ReviewLevelList"][0].ReviewLevelID;
                        lstoption[key]["ReviewLevelName"] = lstoption[key]["DestroyRequest_ReviewLevelList"][0].ReviewLevelName;
                        lstoption[key]["IsreViewed"] = filterItem[0].IsreViewed
                        lstoption[key]["UserName"] = !!filterItem && filterItem.length > 0 ? filterItem[0].UserName : lstoption[key]["Child"][0].UserName
                        lstoption[key]["FullName"] = !!filterItem && filterItem.length > 0 ? filterItem[0].FullName : lstoption[key]["Child"][0].FullName
                        lstoption[key]["ReviewOrderIndex"] = lstoption[key]["DestroyRequest_ReviewLevelList"][0].ReviewOrderIndex
                        // lstoption[key]["Child"].unshift({ value: "-1", name: "-- Vui lòng chọn --", UserName: "-1", FullName: "-- Vui lòng chọn --" })
                    }

                })

                console.log("1111", lstoption)
                let resultSort = Object.values(lstoption).sort((a, b) => a.ReviewOrderIndex - b.ReviewOrderIndex)



                this.setState({
                    DestroyRequestRL: apiResult.ResultObject,
                    IsLoadDataComplete: true,
                    gridDestroyRequestRL: lstoption,
                    gridDestroyRequestRLSort: resultSort
                });
            }
        });
    }


    prevDataSubmit(formData, MLObject) {
        const { isError, gridDestroyRequestRL, isAutoReview, isAutoOutput, RequestUser, gridDestroyRequestRLSort } = this.state;

        //  console.log("prevDataSubmit", gridDestroyRequestRL, MLObject);

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

            if (!isAutoReview) {
                MLObject.CurrentReviewLevelID = MLObject.lstDestroyRequestReviewLevel[0].ReviewLevelID;
                if (ReviewLevel == undefined || ReviewLevel == 0) {
                    this.showMessage('Danh sách duyệt người chưa được chọn. Vui lòng kiểm tra lại.');
                    this.setState({
                        IsCallAPIError: true,
                    })
                    return;
                }
            }



            if (DestroyRequestDetail.length <= 0) {
                this.showMessage('Danh sách vật tư chưa được chọn.');
                this.setState({
                    IsCallAPIError: true,
                })
                return;
            }

            MLObject.lstDestroyRequestDetail = DestroyRequestDetail;
            MLObject.RequestUser = RequestUser;
            console.log("MLObject", MLObject)
            this.handleSubmit(MLObject)

        }
        else {
            this.showMessage('Thông tin nhập vào bị lỗi. Vui lòng kiểm tra lại.');
        }
    }

    handleSubmit(MLObject) {
        this.props.callFetchAPI(APIHostName, UpdateAPIPath, MLObject).then(apiResult => {
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

    callLoadData(id) {
        // console.log('callLoadData', id)
        this.props.callFetchAPI(APIHostName, LoadAPIPath, id).then((apiResult) => {
            console.log("222", apiResult);
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: !apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
                const resultDestroyRequestReviewLevel = apiResult.ResultObject.lstDestroyRequestReviewLevel.map((item, index) => {
                    if (item.ReviewStatus == 0) {
                        item.ReviewStatusLable = "Chưa duyệt";
                    }
                    else {
                        item.ReviewStatusLable = "Đã duyệt";
                    }
                    return item;
                })


                let disabledControll = false;
                if (apiResult.ResultObject.IsSystem) {
                    disabledControll = true
                }
                else {
                    if (apiResult.ResultObject.IsCreatedOrder == true || apiResult.ResultObject.IsreViewed == true) {
                        disabledControll = true
                    }
                    else {
                        if (apiResult.ResultObject.lstDestroyRequestReviewLevel.length > 0) {
                            let IsExitRV = apiResult.ResultObject.lstDestroyRequestReviewLevel.filter(e => { return e.IsreViewed === true });
                            console.log("IsExitRV", IsExitRV)
                            if (IsExitRV.length > 0) {
                                disabledControll = true
                            }
                            else {
                                disabledControll = false
                            }
                        }
                        else {
                            disabledControll = false
                        }

                    }
                }

                this.setState({
                    DataSource: apiResult.ResultObject,
                    IsLoadDataComplete: true,
                    IsSystem: disabledControll,
                    DestroyRequestRL: resultDestroyRequestReviewLevel,
                    DestroyRequestDetail: apiResult.ResultObject.lstDestroyRequestDetail,
                    isAutoReview: apiResult.ResultObject.IsreViewed,
                    isAutoOutput: apiResult.ResultObject.IsOutput,
                    RequestUser: apiResult.ResultObject.RequestUser,
                });


                const param = [
                    {
                        SearchKey: "@DESTROYREQUESTTYPEID",
                        SearchValue: apiResult.ResultObject.DestroyRequestTypeID
                    },
                    {
                        SearchKey: "@STOREID",
                        SearchValue: apiResult.ResultObject.RequestStoreID
                    }
                ];
                this.getDataDestroyRequestRLByDestroyRequestType(param);
            }
        });
    }

    handleChange(formData, MLObject) {
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

    handleInputChangeGridRV(objDestroyRequestRL) {
        this.setState({ gridDestroyRequestRLSort: objDestroyRequestRL });
    }

    render() {


        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        let currentDate = new Date();
        const { DestroyRequestDetail, DestroyRequestRL, gridDestroyRequestRL, isAutoReview, gridDestroyRequestRLSort } = this.state;

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
            //  console.log("element", element);

            const parent = Object.assign({}, gridDestroyRequestRL, { [DestroyRequestRLID]: element });



            this.setState({ gridDestroyRequestRL: parent })
        }

        // console.log("gridDestroyRequestRLSort", gridDestroyRequestRLSort);

        if (this.state.IsLoadDataComplete) {
            return (
                <React.Fragment>
                    <FormContainer
                        FormName={TitleFormEdit}
                        MLObjectDefinition={MLObjectDefinition}
                        dataSource={this.state.DataSource}
                        listelement={[]}
                        BackLink={BackLink}
                        onSubmit={this.prevDataSubmit}
                        RequirePermission={DESTROYREQUEST_UPDATE}
                        onchange={this.handleChange.bind(this)}
                        IsDisabledSubmitForm={this.state.IsSystem}
                    >

                        <div className="row">
                            <div className="col-md-6">
                                <FormControl.TextBox
                                    name="txtDestroyRequestID"
                                    colspan="8"
                                    labelcolspan="4"
                                    readOnly={true}
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
                                    readOnly={this.state.IsSystem}
                                    loaditemcachekeyid="ERPCOMMONCACHE.DESTROYREQUESTTYPE"
                                    valuemember="DestroyRequestTypeID"
                                    nameMember="DestroyRequestTypeName"
                                    controltype="InputControl"
                                    value={""}
                                    listoption={null}
                                    datasourcemember="DestroyRequestTypeID" />

                            </div>

                            <div className="col-md-12">
                                <FormControl.TextBox
                                    name="txtDestroyRequestTitle"
                                    labelcolspan={2}
                                    colspan={10}
                                    disabled={this.state.IsSystem}
                                    readOnly={this.state.IsSystem}
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
                                    readOnly={this.state.IsSystem}
                                    validatonList={["Comborequired"]}
                                    placeholder="-- Vui lòng chọn --"
                                    isautoloaditemfromcache={true}
                                    isusercache={true}
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
                                    disabled={true}
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
                                    readOnly={this.state.IsSystem}
                                    disabled={this.state.IsSystem}
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
                                    isDisabled={this.state.IsSystem}
                                    isHideHeaderToolbar={true}
                                    MLObjectDefinition={GridMLObjectDefinition}
                                    colspan="12"
                                    onValueChangeInputGrid={this.valueChangeInputGrid}
                                />
                            </div>
                        </div>

                        {isAutoReview == false ?
                            <DestroyRequestRVList
                                dataSource={gridDestroyRequestRLSort}
                                disabledControll={this.state.IsSystem}
                                onValueChangeGridRV={this.handleInputChangeGridRV.bind(this)}
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
