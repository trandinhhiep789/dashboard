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

                // console.log("ResultObject", apiResult.ResultObject)

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
               

                Object.keys(lstoption).map(function (key) {
                    // console.log("key", key)
                    const filterItem = DestroyRequestRL.filter(e => { return e.ReviewLevelID == key });
                    // console.log("DestroyRequestRL", filterItem)
                    lstoption[key]["ReviewLevelID"] = lstoption[key]["Child"][0].ReviewLevelID;
                    lstoption[key]["ReviewLevelName"] = lstoption[key]["Child"][0].ReviewLevelName;
                    lstoption[key]["IsreViewed"] = filterItem[0].IsreViewed
                    lstoption[key]["UserName"] = !!filterItem && filterItem.length > 0 ? filterItem[0].UserName : lstoption[key]["Child"][0].UserName
                    lstoption[key]["FullName"] = !!filterItem && filterItem.length > 0 ? filterItem[0].FullName : lstoption[key]["Child"][0].FullName
                    lstoption[key]["Child"].unshift({ value: "-1", name: "-- Vui lòng chọn --", UserName: "-1", FullName: "-- Vui lòng chọn --" })

                })

                const dataSource = apiResult.ResultObject.reduce((catsSoFar, item, index) => {
                    if (!catsSoFar[item.ReviewLevelID]) catsSoFar[item.ReviewLevelID] = [];
                    catsSoFar[item.ReviewLevelID].push(item);
                    return catsSoFar;
                }, {});

                // console.log("1111", lstoption)
                this.setState({
                    DestroyRequestRL: apiResult.ResultObject,
                    IsLoadDataComplete: true,
                    gridDestroyRequestRL: lstoption
                });
            }
        });
    }


    prevDataSubmit(formData, MLObject) {
        const { isError, gridDestroyRequestRL, isAutoReview, isAutoOutput } = this.state;

        // console.log("prevDataSubmit", gridDestroyRequestRL, MLObject);

        let arrReviewLevel = [];
        Object.keys(gridDestroyRequestRL).map(function (key) {
            let objItem = {}
            objItem.ReviewLevelID = key;
            objItem.UserName = gridDestroyRequestRL[key].UserName;

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
            // console.log("MLObject", MLObject)
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
            // console.log("222", apiResult);
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

                this.setState({
                    DataSource: apiResult.ResultObject,
                    IsLoadDataComplete: true,
                    IsSystem: apiResult.ResultObject.IsSystem,
                    DestroyRequestRL: resultDestroyRequestReviewLevel,
                    DestroyRequestDetail: apiResult.ResultObject.lstDestroyRequestDetail,
                    isAutoReview: apiResult.ResultObject.IsreViewed,
                    isAutoOutput: apiResult.ResultObject.IsOutput
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


    render() {


        if (this.state.IsCloseForm) {
            return <Redirect to={BackLink} />;
        }
        let currentDate = new Date();
        const { DestroyRequestDetail, DestroyRequestRL, gridDestroyRequestRL, isAutoReview } = this.state;

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

            // console.log("parent", parent);

            this.setState({ gridDestroyRequestRL: parent })
        }

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
                                    isHideHeaderToolbar={true}
                                    MLObjectDefinition={GridMLObjectDefinition}
                                    colspan="12"
                                    onValueChangeInputGrid={this.valueChangeInputGrid}
                                />
                            </div>
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
                                            {/* {this.renderChild(this.state.gridDestroyRequestRL)} */}
                                            {!!gridDestroyRequestRL && Object.keys(gridDestroyRequestRL).length > 0 &&
                                                Object.keys(gridDestroyRequestRL).map(function (key) {
                                                    return (

                                                        <tr key={key}>
                                                            <td>{gridDestroyRequestRL[key].ReviewLevelName}</td>
                                                            <td>
                                                                <select id={key} value={gridDestroyRequestRL[key].UserName}
                                                                    className={`form-control form-control-sm ${gridDestroyRequestRL[key].UserName == "-1" ? "is-invalid" : ""}`}
                                                                    disabled = {gridDestroyRequestRL[key].IsreViewed == true ? true : false}
                                                                    onChange={selectOption => onChange(key, selectOption)}>
                                                                    {gridDestroyRequestRL[key]["Child"].map(e => {
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
