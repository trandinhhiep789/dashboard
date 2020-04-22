import React from "react";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../../../../actions/fetchAPIAction";
import { ModalManager } from 'react-dynamic-modal';
import { MessageModal } from "../../../../../../common/components/Modal";
import { APIHostName, BackLink } from '../constants';
import Stepper from 'react-stepper-horizontal';
import ModelContainer from "../../../../../../common/components/Modal/ModelContainer";
import { formatDate } from "../../../../../../common/library/CommonLib.js";

class PieRequestAction extends React.Component {
    constructor(props) {
        super(props);
        this._handleOnchangePirequestStatus = this._handleOnchangePirequestStatus.bind(this);
        this._handleUpdateNextPieRequestStep = this._handleUpdateNextPieRequestStep.bind(this);
        this.handleSubmitStep = this.handleSubmitStep.bind(this);
        this.handleSubmitViewStep = this.handleSubmitViewStep.bind(this);
        this.state = {
            PieRequestType_WF_Next: [],
            lstPieRequest_WorkFlow: [],
            CurrentPieRequestStepID: -1,
            intPieRequestStepID: -1,
            Permission: {},
            Steps: [],
            ActiveStep: -1
        }
        this._loadPieRequestTypeWF(this.props.PieRequestTypeID, this.props.PieRequestID);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.CurrentPieRequestStepID !== this.state.CurrentPieRequestStepID) {
            this.setState({
                CurrentPieRequestStepID: nextProps.CurrentPieRequestStepID,
                PieRequestType_WF_Next: [],
            });
            this.loadPieRequestWFNext(nextProps.CurrentPieRequestStepID);
            this.loadPermission(nextProps.CurrentPieRequestStepID);
            this.updateActiveIndex(nextProps.CurrentPieRequestStepID);
        }
    }
    showMessage(message) {
        ModalManager.open(<MessageModal title="Thông báo"
            message={message} onRequestClose={() => true}
        />);
    }
    _reloadAfterUpdateNextStep(CurrentPieRequestStepID) {
        this.setState({
            CurrentPieRequestStepID: CurrentPieRequestStepID,
            PieRequestType_WF_Next: [],
        });
        this.loadPieRequestWFNext(CurrentPieRequestStepID);
        this.loadPermission(CurrentPieRequestStepID);
        this.updateActiveIndex(CurrentPieRequestStepID);
    }
    updateActiveIndex(CurrentPieRequestStepID) {
        let activeIndex = 0;
        this.state.Steps.map((item, index) => {
            if (item.PieRequestStepID == CurrentPieRequestStepID) {
                activeIndex = index;
            }
        })
        this.setState({ ActiveStep: activeIndex });
    }
    loadPieRequestWFNext(CurrentPieRequestStepID) {
        let searchData = {
            PieRequestStepID: CurrentPieRequestStepID
        }
        this.props.callFetchAPI(APIHostName, 'api/PieRequestType_WF_Next/GetNextPieRequest', searchData).then((apiResult) => {
            if (apiResult && !apiResult.IsError) {
                this.setState({ PieRequestType_WF_Next: apiResult.ResultObject, IsCallAPIError: apiResult.IsError, ErrorMessage: apiResult.Message })
            }
        });
    }
    loadPermission(CurrentPieRequestStepID) {
        let searchData = {
            PieRequestStepID: CurrentPieRequestStepID,
            UserName: this.props.AppInfo.LoginInfo.Username,
            PiePermissionID: -1
        }
        if (CurrentPieRequestStepID)
            this.props.callFetchAPI(APIHostName, 'api/PieRequestType_WF_PermIs/Load', searchData).then((apiResult) => {
                if (apiResult && !apiResult.IsError) {
                    this.setState({ PieRequestType_WF_PermIs: apiResult.ResultObject, IsCallAPIError: apiResult.IsError, ErrorMessage: apiResult.Message });
                    let objPermission = {};
                    apiResult.ResultObject && apiResult.ResultObject.map((item) => {
                        switch (item.PiePermissionID) {
                            case 1:
                                objPermission.IsEdit = true;
                                break;
                            case 2:
                                objPermission.IsDelete = true;
                                break;
                            case 3:
                                objPermission.ChangeStep = true;
                                break;
                        }
                    })
                    this.setState({ Permission: objPermission });
                } else {
                    alert("Lỗi kiểm tra quyền");
                    this.setState({ IsProcessPermission: false });
                }
            });
        else {
            this.setState({ Permission: { ChangeStep: false, IsEdit: true } });
        }
    }
    // _handleUpdate() {
    //     this.props.onUpdate();
    // }
    // _handleBackPage() {
    //     this.props.onBackPage();
    // }
    // _handleUpdateNextPieRequestStep() {
    //     this.props.onUpdateNextPieRequestStep(this.state.NextPieRequestStepID);
    // }
    _handleOnchangePirequestStatus(e) {
        if (parseInt(this.state.intPieRequestStepID) > 0) {
            this._handleUpdateNextPieRequestStep(this.state.intPieRequestStepID);
        }
    }
    _handleUpdateNextPieRequestStep(intNextPieRequestStepID) {
        if (intNextPieRequestStepID > 0) {
            let MLObject = {
                PieRequestID: this.props.PieRequestID,
                PieRequestTypeID: this.props.PieRequestTypeID,
                NextPieRequestStepID: intNextPieRequestStepID,
                UpDatedUser: this.props.AppInfo.LoginInfo.Username,
                LoginlogID: JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID
            };
            this.props.callFetchAPI(APIHostName, 'api/PieRequest/UpdateNextStep', MLObject).then((apiResult) => {
                this.setState({ IsCallAPIError: apiResult.IsError });
                this.showMessage(apiResult.Message);
                if (apiResult.IsError == false)
                    this._reloadAfterUpdateNextStep(intNextPieRequestStepID);
            });
        }
    }
    _loadPieRequestTypeWF(PieRequestTypeID, PieRequestID) {
        this.props.callFetchAPI(APIHostName, 'api/PieRequestType/Load', PieRequestTypeID).then((apiResult) => {
            if (apiResult && !apiResult.IsError) {
                let steps = []
                console.log("_loadPieRequestTypeWF", apiResult.ResultObject.PieRequestTypeWorkflow);
                apiResult.ResultObject.PieRequestTypeWorkflow.map((item, index) => {
                    steps.push({ title: item.PieRequestStepName, PieRequestStepID: item.PieRequestStepID });
                })
                this.setState({ Steps: steps });
                this.updateActiveIndex(this.props.CurrentPieRequestStepID);
            }
        });
    }

    handleSubmitStep() {
        this.loadPieRequestWFNext(this.state.CurrentPieRequestStepID);
        this.setState({ PieRequestType_WF_Next: this.state.PieRequestType_WF_Next }, () => {
            this.openSubmitStepModal();
        });
    }
    onChangeInput(e) {
        const name = e.target.name;
        let value = e.target.value;
        if (e.target.type == 'checkbox') {
            value = e.target.type == 'checkbox' ? e.target.checked : false;
        }
        let { intPieRequestStepID } = this.state;
        intPieRequestStepID = value;
        this.setState({ intPieRequestStepID: intPieRequestStepID }, () => {
            this.openSubmitStepModal();
        });
    }
    openSubmitStepModal() {
        ModalManager.open(
            <ModelContainer
                title="Quy trình chọn bước xử lý"
                name=""
                content={"submit thành công!"}
                onRequestClose={() => true}
                onChangeModal={this._handleOnchangePirequestStatus.bind(this)}>
                <div className="form-row">

                    <div className="form-group col-md-3">
                        <label className="col-form-label">Bước xử lý:</label>
                    </div>
                    <div className="form-group col-md-7">
                        <select className="form-control form-control-sm" value={this.state.intPieRequestStepID} onChange={this.onChangeInput.bind(this)} >
                            <option value="-1" label="--Vui lòng chọn bước xử lý--" />
                            {this.state.PieRequestType_WF_Next && this.state.PieRequestType_WF_Next.map((item) => {
                                return (
                                    <option key={item.NextPieRequestStepID} value={item.NextPieRequestStepID}>{item.NextPieRequestStepName}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>


            </ModelContainer>
        );
    }

    openViewStepModal() {
        console.log("handleSubmitViewStep", this.state.lstPieRequest_WorkFlow);
        ModalManager.open(
            <ModelContainer
                title="Lịch sử quy trình xử lý"
                name=""
                content={"submit thành công!"}
                IsButton={true}
                onRequestClose={() => true}>
                <div>
                    <table className="table table-sm table-striped table-bordered table-hover table-condensed" cellspacing="0">
                        <thead className="thead-light">
                            <tr>
                                <th className="jsgrid-header-cell" style={{ width: '15%' }} >Mã bước xử lý</th>
                                <th className="jsgrid-header-cell" style={{ width: '40%' }} >Tên bước xử lý</th>
                                <th className="jsgrid-header-cell" style={{ width: '10%' }}>Đã xử lý</th>
                                <th className="jsgrid-header-cell" style={{ width: '20%' }}>Người xử lý</th>
                                <th className="jsgrid-header-cell" style={{ width: '15%' }}>Ngày xử lý</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.lstPieRequest_WorkFlow.map((optionItem) => {
                                return (
                                    <tr>
                                        <td>{optionItem.PieRequestStepID}</td>
                                        <td>{optionItem.PieRequestStepName}</td>
                                        <td>{(optionItem.IsProcess == true ? <span className='fa fa-check'></span> : "")}</td>
                                        <td>{optionItem.ProcessUserName}</td>
                                        <td>{formatDate(optionItem.ProcessDate, true)}</td>
                                    </tr>
                                )
                            }
                            )}
                        </tbody>
                    </table>
                </div>

            </ModelContainer>
        );
    }
    handleSubmitViewStep() {
        const searchData = [{
            SearchKey: "@PIEREQUESTID",
            SearchValue: this.props.PieRequestID
        }];

        this.props.callFetchAPI(APIHostName, 'api/PieRequest_WorkFlow/Search', searchData).then((apiResult) => {
            if (!apiResult.IsError) {

                this.setState({ lstPieRequest_WorkFlow: apiResult.ResultObject }, () => {
                    this.openViewStepModal();
                });
            }

        }
        );
    }

    render() {
        return (
            <div>
                <div className='col-md-12'>
                    <div className="card">
                        <div className='row'>
                            <div className="col-md-10 pa-tabBar">
                                <ul className="pa-tabs__nav slds-path__nav">
                                    {this.state.Steps && this.state.Steps.map((item, index) => {
                                        if (this.state.ActiveStep - 1 >= index) {
                                            return (
                                                <li className="slds-is-complete slds-path__item runtime_sales_pathassistantPathAssistantTab">
                                                    <a className="tabHeader slds-path__link" data-title={item.title} >
                                                        <span className="complete slds-path__stage" >
                                                            <i className="ti-check"></i>
                                                        </span>
                                                        <span className="title slds-path__title" >{item.title}</span>
                                                    </a>
                                                </li>
                                            )
                                        }
                                        else {
                                            if (this.state.ActiveStep - 1 + 1 == index) {
                                                return (
                                                    <li className="slds-is-current slds-is-active slds-path__item runtime_sales_pathassistantPathAssistantTab" >
                                                        <a className="tabHeader slds-path__link" data-title={"Quy trình " + item.title + " cần được xử lý " + item.MaxProcessTime + " phút"}>
                                                            <span className="current slds-path__stage" ></span>
                                                            <span className="title slds-path__title" >{item.title}</span>
                                                        </a>
                                                    </li>
                                                )
                                            }
                                            else {
                                                return (
                                                    <li className="slds-is-incomplete slds-path__item runtime_sales_pathassistantPathAssistantTab" >
                                                        <a className="tabHeader slds-path__link" tabIndex="-1" data-title={item.title} >
                                                            <span className="ahead slds-path__stage" ></span>
                                                            <span className="title slds-path__title" >{item.title}</span>
                                                        </a>
                                                    </li>
                                                )
                                            }
                                        }
                                    })}
                                </ul>
                            </div>
                            <div className="form-group col-md-2 btnsubmit">
                                <button className="btn btn-w-md btn-info" onClick={this.handleSubmitStep}>Xử Lý</button>
                                <button className="btn btn-square btn-warning" onClick={this.handleSubmitViewStep}><i className="fa fa-eye"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        AppInfo: state
        // FetchAPIInfo: state.FetchAPIInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PieRequestAction);

import React from "react";
import { connect } from 'react-redux';
import { ModalManager } from 'react-dynamic-modal';
import { MessageModal } from "../../../../../common/components/Modal";
import { APIHostName, LoadAPIPath, UpdateAPIPath, AddProductLink, EditElementList, PKColumnProductName, IDSelectColumnProductName, DataGridColumnProductList, MLObjectDefinition, BackLink, EditPagePath } from "../constants"
import { callFetchAPI } from "../../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../../actions/pageAction";
import DataGrid from "../../../../../common/components/DataGrid";
import InputGridCell from "../../../../../common/components/Form/AdvanceForm/FormControl/InputGrid/InputGridCell";
import { showModal, hideModal } from '../../../../../actions/modal';
import { MODAL_TYPE_COMMONTMODALS } from '../../../../../constants/actionTypes';
class PieRequestProduct extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this._getPieRequestProductList = this._getPieRequestProductList.bind(this);
        this.onAddLinkClick = this.onAddLinkClick.bind(this);
        this.onAddProduct = this.onAddProduct.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            FormContent: "",
            IsLoading: false,
            IsCloseForm: false,
            EditElementList: EditElementList,
            ReloadNumber: -1
        };
        if (this.props.PieRequestID)
            DataGridColumnProductList[DataGridColumnProductList.length - 1].Link = "/PierequestProduct/Generalinfo/" + (this.props.PieRequestID + '').trim() + "/";
    }

    handleCloseMessage() {
        if (!this.state.IsCallAPIError)
            this.setState({ IsCloseForm: true });
    }
    showMessage(message) {
        ModalManager.open(<MessageModal title="Thông báo"
            message={message} onRequestClose={() => true}
            onCloseModal={this.handleCloseMessage}
        />);
    }
    componentDidMount() {
        this.props.updatePagePath(EditPagePath);
        this._getPieRequestProductList();
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.ReloadNumber !== this.state.ReloadNumber) {
            this.setState({
                ReloadNumber: nextProps.ReloadNumber,
            });
            this._getPieRequestProductList();
        }

    }
    _getPieRequestProductList() {
        const id = this.props.PieRequestID;
        if (id == -1) return;

        let searchParam = [
            {
                SearchKey: 'v_PIEREQUESTID',
                SearchValue: id
            },
            {
                SearchKey: 'v_Keyword',
                SearchValue: ''
            }

        ]
        this.setState({
            IsLoading: true
        })
        this.props.callFetchAPI(APIHostName, "api/PieRequest_List/Search", searchParam).then((apiResult) => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
                this.setState({ DataSource: apiResult.ResultObject ? apiResult.ResultObject : [] });
            }
            this.setState({
                IsLoading: false
            })

        });
    }
    onAddLinkClick() {
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Nhập thông tin',
            content: { text: <PieRequestAddProduct PieTypeID={this.props.PieTypeID} onAddProduct={this.onAddProduct}></PieRequestAddProduct> }
        });
    }
    // onAddProduct(objProduct) {
    //     this.props.onAddProduct(objProduct);
    // }
    onAddProduct(objProduct) {
        let objPieRequest = {
            PieRequestID: this.props.PieRequestID,
        }
        objProduct.CreatedUser = this.props.AppInfo.LoginInfo.Username;
        objProduct.LoginlogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        let objData = {
            Product: objProduct,
            PieRequest: objPieRequest
        };

        this.props.callFetchAPI(APIHostName, 'api/PieRequest/AddProductToPieRequest', objData).then((apiResult) => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            if (apiResult.IsError == false)
                this._getPieRequestProductList();
            this.showMessage(apiResult.Message);
        });
    }
    onDeleteClick(listID) {
        let data = [];
        listID.map((item) => {
            data.push({
                PieRequestListID: item,
                DeletedUser: this.props.AppInfo.LoginInfo.Username,
                LoginlogID: JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID
            })
        })
        this.props.callFetchAPI(APIHostName, "api/PieRequest_Product/Delete", data).then((apiResult) => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this._getPieRequestProductList();
            this.showMessage(apiResult.Message);
        });
    }
    handleSubmit() {
        let MLObject = this.MObjectDefine;
        MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
        MLObject.LoginlogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID
        this.props.callFetchAPI(APIHostName, UpdateAPIPath, MLObject).then((apiResult) => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.showMessage(apiResult.Message);
        });
    }
    render() {
        if (!this.state.IsLoading) {
            return (
                <div className='col-md-12'>
                    <DataGrid listColumn={DataGridColumnProductList}
                        dataSource={this.state.DataSource}
                        IsCustomAddLink={true}
                        onInsertClick={this.onAddLinkClick}
                        AddLink={AddProductLink + '/' + this.props.PieRequestID + '/-1'}
                        IDSelectColumnName={IDSelectColumnProductName}
                        PKColumnName={"PieRequestListID"}
                        onDeleteClick={this.onDeleteClick}
                        hasSearch={false}
                        onSearchEvent={this.handleSearchEvent}
                        RequirePermission=""
                        DeletePermission=""
                    />
                </div>
            );
        }
        return (
            <label>Đang nạp dữ liệu...</label>
        );
    }
}

const mapStateToProps = state => {
    return {
        AppInfo: state,
        FetchAPIInfo: state.FetchAPIInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updatePagePath: (pagePath) => {
            dispatch(updatePagePath(pagePath));
        },
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        },
        hideModal: () => {
            dispatch(hideModal());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PieRequestProduct);

class PieRequestAddProduct extends React.Component {
    constructor(props) {
        super(props);
        this._handleInputChange = this._handleInputChange.bind(this);
        this._handleCloseModel = this._handleCloseModel.bind(this);
        this._handleAddProduct = this._handleAddProduct.bind(this);
        this.state = {
            DataSource: {}
        }
    }
    _handleInputChange(data, index) {
        let _data = {}
        _data[data.Name] = data.Value
        let newDataSource = Object.assign(this.state.DataSource, _data)
        this.setState({ DataSource: newDataSource });
    }
    _handleCloseModel() {
        this.props.hideModal();
    }
    _handleAddProduct() {
        this.props.onAddProduct(this.state.DataSource);
        this.props.hideModal();
    }
    render() {
        return (
            <div>
                <br></br>
                {this.props.PieTypeID == 1
                    ? <div className='form-group'>
                        <div className='form-row'>
                            <div className='col-md-3'>
                                <label>Tên sản phẩm</label>
                            </div>
                            <div className='col-md-5'>
                                <InputGridCell type='textbox'
                                    text=''
                                    name='ProductName'
                                    value={this.state.DataSource.ProductName}
                                    onValueChange={this._handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                    : <div className='form-group'>
                        <div className='form-row'>
                            <div className='col-md-3'>
                                <label>Chọn sản phẩm</label>
                            </div>
                            <div className='col-md-5'>
                                <InputGridCell type='combobox'
                                    readOnly={false}
                                    index={1}
                                    text=''
                                    name='ProductID'
                                    value={this.state.DataSource.ProductID}
                                    IsAutoLoadItemFromCache={true}
                                    LoadItemCacheKeyID='PIMCACHE.PIM_PRODUCT'
                                    ValueMember='ProductID'
                                    NameMember='ProductName'
                                    onValueChange={this._handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                }
                <footer className='card-footer text-right'>
                    <button onClick={this._handleAddProduct} className='btn btn-primary'>Thêm</button>&nbsp;
                    <button onClick={this._handleCloseModel} className='btn btn-primary'>Đóng</button>
                </footer>
            </div>
        )
    }
}
PieRequestAddProduct = connect(mapStateToProps, mapDispatchToProps)(PieRequestAddProduct);