import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { ModalManager } from 'react-dynamic-modal';
import ModelContainer from "../../../../common/components/Modal/ModelContainer";
import { MessageModal } from "../../../../common/components/Modal";
import InputGrid from "../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
import FormControl from "../../../../common/components/Form/AdvanceForm/FormControl";
import { callGetCache } from "../../../../actions/cacheAction";

import Datetime from 'react-datetime';
import "../../../../../node_modules/react-datetime/css/react-datetime.css";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import {
    InputProductAttrColumnList,
    GridMLObjectProductAttrDefinition,
    AddAPIPath,
    BackLink,
    APIHostName,
    DeleteAPIPath,
    PKColumnName,
    InitSearchParams,
    SearchByPieRequestListIDAPIPath,
    PagePath,
    UpdateAPIPath,
    InitSearchParamsAttr
} from "./constants";
import { PIE_REQUEST_PRODUCT_ATTR_VIEW, PIE_REQUEST_PRODUCT_ATTR_DELETE } from "../../../../constants/functionLists";


class AttributeCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputGridInsert = this.handleInputGridInsert.bind(this);
        this.handleAttrInsert = this.handleAttrInsert.bind(this);
        this.handleDateTimeChange = this.handleDateTimeChange.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.handleInputGridEdit = this.handleInputGridEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.state = {
            CallAPIMessage: "",
            gridDataSource: [],
            IsCallAPIError: false,
            IsCloseForm: false,
            FormData: {},
            SearchData: InitSearchParams,
            searchDataAttr: InitSearchParamsAttr,
            gridDataSourceAttr: [],
            LstProduct_PieRequest_Attr: [],
            PieRequest_Product_Attr: {},
            PieRequestListID: "",
            PieRequestID: "",
            IsOldValue: 0,
            LstCacheAttribute: [],
            LstCacheAttributeValueID: [],
            PieRequestDate: "",
            cssNotification: "",
            iconNotification: "",
            DataSourcePieRequest: []
        };
        this.notificationDOMRef = React.createRef();
        this.searchref = React.createRef();
    }

    componentDidMount() {
        this._getPieRequestDateByID();
        this._getCacheAttribute();
        this._getCacheAttributeValue();
        this.props.updatePagePath(PagePath);
        this.callSearchData();

        const id = this.props.match.params.id;
        this.props.callFetchAPI(APIHostName, "api/PieRequest/Load", id).then((apiResult) => {
            if (apiResult.IsError) {
                this.setState({
                    IsCallAPIError: apiResult.IsError
                });
                this.showMessage(apiResult.Message);
            }
            else {
                this.setState({ DataSourcePieRequest: apiResult.ResultObject });
            }
        });
    }

    CheckPermissionUser(id) {
        if (this.state.DataSourcePieRequest.LstPieRequestType_WF_PermIs && this.state.DataSourcePieRequest.LstPieRequestType_WF_PermIs.length > 0) {
            if (this.state.DataSourcePieRequest.LstPieRequestType_WF_PermIs[0].IsFinishStep == true) {
                return false;
            }

            if (this.state.DataSourcePieRequest.LstPieRequestType_WF_PermIs.some(a => a.PiePermissionID === id)) {
                return true;
            }
        }
        return false;
    }

    callSearchData() {
        const PieRequestListID = this.props.match.params.pierequestlistid;
        const InitSearchParams = [{
            SearchKey: "@Keyword",
            SearchValue: PieRequestListID.trim()
        }];
        this.props.callFetchAPI(APIHostName, SearchByPieRequestListIDAPIPath, InitSearchParams).then((apiResult) => {
            if (!apiResult.IsError) {
                this.setState({
                    gridDataSource: apiResult.ResultObject,
                    IsCallAPIError: apiResult.IsError,
                    LstProduct_PieRequest_Attr: apiResult.ResultObject
                })
            }
        }
        );
    }

    addNotification(message1, IsError) {
        if (!IsError) {
            this.setState({
                cssNotification: "notification-custom-success",
                iconNotification: "fa fa-check"
            })
        }
        else {
            this.setState({
                cssNotification: "notification-danger",
                iconNotification: "fa fa-exclamation"
            })
        }
        this.notificationDOMRef.current.addNotification({
            container: "bottom-right",
            content: (
                <div className={this.state.cssNotification}>
                    <div className="notification-custom-icon">
                        <i className={this.state.iconNotification} />
                    </div>
                    <div className="notification-custom-content">
                        <div className="notification-close"><span>×</span></div>
                        <h4 className="notification-title">Thông Báo</h4>
                        <p className="notification-message">{message1}</p>
                    </div>
                </div>
            ),
            dismiss: { duration: 2000 },
            dismissable: { click: true }
        });
    }

    handleCloseMessage() {
        if (!this.state.IsCallAPIError) {
            this.setState({ IsCloseForm: true });
            this.callSearchData();
        }
    }

    showMessage(message) {
        ModalManager.open(<MessageModal title="Thông báo"
            message={message} onRequestClose={() => true}
            onCloseModal={this.handleCloseMessage}
        />);
    }

    onChangeInput(name, value) {
        let { PieRequest_Product_Attr } = this.state;
        PieRequest_Product_Attr[name] = value;
        this.setState({ PieRequest_Product_Attr: PieRequest_Product_Attr }, () => {
            this.openAttrModal();
        });
    }

    handleDateTimeChange(moment) {
        let dateSelected = moment ? moment._d : null;
        let newPieRequest_Product_Attr = Object.assign({}, this.state.PieRequest_Product_Attr);
        newPieRequest_Product_Attr.RequestDate = dateSelected;
        this.setState({ PieRequest_Product_Attr: newPieRequest_Product_Attr }, () => {
            this.openAttrModal();
        });
    }

    _getPieRequestProductList() {
        const strPieRequestID = this.props.match.params.id;
        this.props.callFetchAPI(APIHostName, "api/PieRequest/GetById", strPieRequestID).then((apiResult) => {
            if (!apiResult.IsError) {
                this.setState({
                    PieRequestListID: apiResult.ResultObject.PieRequestListID,
                });
            }
        });
    }

    _getPieRequestDateByID() {
        const strPieRequestID = this.props.match.params.id;
        this.props.callFetchAPI(APIHostName, "api/PieRequest/GetPieRequestDateById", strPieRequestID).then((apiResult) => {
            if (!apiResult.IsError) {
                this.setState({
                    PieRequestDate: apiResult.ResultObject.RequestDate,
                });
            }
        });
    }

    _getCacheAttribute() {
        this.props.callGetCache("PIMCACHE.PIMATTRIBUTE").then((apiResult) => {
            if (!apiResult.IsError && apiResult.ResultObject.CacheData != null) {
                this.setState({
                    LstCacheAttribute: apiResult.ResultObject.CacheData,
                });
            }
        });
    }

    _getCacheAttributeValue() {
        this.props.callGetCache("PIMCACHE.ATTRIBUTEVALUE").then((apiResult) => {
            if (!apiResult.IsError && apiResult.ResultObject.CacheData != null) {
                this.setState({
                    LstCacheAttributeValueID: apiResult.ResultObject.CacheData,
                });
            }
        });
    }

    handleAttrInsert() {
        let PieRequestListID = this.props.match.params.pierequestlistid;
        let Username = this.props.AppInfo.LoginInfo.Username;
        let LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID
        this.state.PieRequest_Product_Attr.RequestDate = this.state.PieRequestDate;
        this.state.PieRequest_Product_Attr.PieRequestListID = PieRequestListID.trim();
        this.state.PieRequest_Product_Attr.LoginLogID = LoginLogID;
        if (this.state.Isedit) {
            this.state.PieRequest_Product_Attr.IsOldValue = this.state.IsOldValue;
            this.state.PieRequest_Product_Attr.RequestDate = this.state.PieRequestDate;
            this.state.PieRequest_Product_Attr.UpDatedUser = Username;
            this.props.callFetchAPI(APIHostName, UpdateAPIPath, this.state.PieRequest_Product_Attr).then((apiResult) => {
                if (!apiResult.IsError) {
                    this.setState({ IsCallAPIError: apiResult.IsError });
                }
                this.addNotification(apiResult.Message, apiResult.IsError);
                ModalManager.close();
                this.callSearchData();
            });
        }
        else {
            this.state.PieRequest_Product_Attr.CreatedUser = Username;
            this.state.PieRequest_Product_Attr.IsOldValue = this.state.IsOldValue;
            this.props.callFetchAPI(APIHostName, AddAPIPath, this.state.PieRequest_Product_Attr).then((apiResult) => {
                if (!apiResult.IsError) {
                    this.setState({ IsCallAPIError: apiResult.IsError });
                }
                this.addNotification(apiResult.Message, apiResult.IsError);
                ModalManager.close();
                this.callSearchData();
            });
        }
    }

    handleInputGridEdit(index) {
        this.setState({ Isedit: true });
        this.setState({ PieRequest_Product_Attr: this.state.LstProduct_PieRequest_Attr[index] }, () => {
            this.openAttrModal();
        });
    }

    handleInputGridInsert() {
        this.state.PieRequest_Product_Attr = {};
        this.setState({ Isedit: false });
        this.setState({ PieRequest_Product_Attr: this.state.PieRequest_Product_Attr }, () => {
            this.openAttrModal();
        });
    }

    onChangeInputCombox(e) {
        const name = e.target.name;
        let value = e.target.value;
        if (e.target.type == 'checkbox') {
            value = e.target.type == 'checkbox' ? e.target.checked : false;
        }
        let { PieRequest_Product_Attr } = this.state;
        PieRequest_Product_Attr[name] = value;
        this.setState({ PieRequest_Product_Attr: PieRequest_Product_Attr }, () => {
            this.openAttrModal();
        });
    }
    onChangeInputComboxAttributeValue(e) {
        const name = e.target.name;
        let value = e.target.value;
        if (e.target.type == 'checkbox') {
            value = e.target.type == 'checkbox' ? e.target.checked : false;
        }
        let { PieRequest_Product_Attr } = this.state;
        PieRequest_Product_Attr[name] = value;
        this.setState({ PieRequest_Product_Attr: PieRequest_Product_Attr }, () => {
            this.openAttrModal();
        });
    }

    handleDelete(deleteList) {
        let listProductAttribute = [];
        deleteList.map((selectItem) => {
            let isMath = false;
            this.state.gridDataSource.map((row) => {
                if (!isMath) {
                    for (var i = 0; i < selectItem.length; i++) {
                        if (selectItem[i].value != row[selectItem[i].key]) {
                            isMath = false;
                            break;
                        } else {
                            isMath = true;
                        }
                    }
                    if (isMath) {
                        row.DeletedUser = this.props.AppInfo.LoginInfo.Username;
                        listProductAttribute.push(row);
                    }
                }
            });
        });
        this.props.callFetchAPI(APIHostName, DeleteAPIPath, listProductAttribute).then((apiResult) => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.addNotification(apiResult.Message, apiResult.IsError);
            this.callSearchData();
        });
    }

    openAttrModal() {
        ModalManager.open(
            <ModelContainer
                title="Thêm thuộc tính sản phẩm"
                name="PieRequest_Product_Attr"
                content={"Thêm thuộc tính sản phẩm thành công!"}
                onRequestClose={() => true}
                onChangeModal={this.handleAttrInsert}
            >
                <div className='form-row'>
                    <div className='form-group col-md-3'>
                        <label className='col-form-label'>Thuộc tính:</label>
                    </div>
                    <div className='form-group col-md-9'>
                        <select className="form-control form-control-sm" value={this.state.PieRequest_Product_Attr.AttributeID} onChange={this.onChangeInputCombox.bind(this)} name="AttributeID">
                            <option value="-1" label="--Vui lòng chọn--" />
                            {this.state.LstCacheAttribute.map((optionItem) => {
                                return (
                                    <option value={optionItem.AttributeID} label={optionItem.AttributeName} />
                                )
                            }
                            )}
                        </select>
                    </div>
                </div>
                <div className='form-row'>
                    <div className='form-group col-md-3'>
                        <label className='col-form-label'>Giá trị thuộc tính:</label>
                    </div>
                    <div className='form-group col-md-9'>
                        <select className="form-control form-control-sm" value={this.state.PieRequest_Product_Attr.AttributeValueID} onChange={this.onChangeInputComboxAttributeValue.bind(this)} name="AttributeValueID">
                            <option value="-1" label="--Vui lòng chọn--" />
                            {this.state.LstCacheAttributeValueID.map((optionItem) => {
                                return (
                                    <option value={optionItem.AttributeValueID} label={optionItem.AttributeValue} />
                                )
                            }
                            )}
                        </select>
                    </div>
                </div>
                <FormControl.TextBox name="AttributeValue" onValueChange={this.onChangeInput} colspan="9" labelcolspan="3" label="Giá trị thuộc tính:" placeholder="Giá trị thuộc tính" componenttype="InputControl" value={this.state.PieRequest_Product_Attr.AttributeValue} datasourcemember="AttributeValue" />
                <FormControl.CheckBox name="IsVariantAttribute" onValueChange={this.onChangeInput} colspan="9" labelcolspan="3" label="Là thuộc tính variant:" placeholder="Là thuộc tính variant" componenttype="InputControl" value={this.state.PieRequest_Product_Attr.IsVariantAttribute} datasourcemember="IsVariantAttribute" />
            </ModelContainer>
        );
    }

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <div className="col-md-9 col-lg-10">
                    <div className="card">
                        <header className="card-header">
                            <h4 className="card-title"><strong>Thuộc tính sản phẩm</strong></h4>
                        </header>
                        <div className="card-body">
                            <InputGrid
                                name="LstProduct_Attr"
                                controltype="GridControl"
                                listColumn={InputProductAttrColumnList}
                                isHideHeaderToolbar={false}
                                IDSelectColumnName={"chkSelect"}
                                PKColumnName={PKColumnName}
                                dataSource={this.state.gridDataSource}
                                value={this.state.LstProduct_PieRequest_Attr}
                                onInsertClick={this.handleInputGridInsert}
                                onInsertClickEdit={this.handleInputGridEdit}
                                onDeleteClick_Customize={this.handleDelete}
                                MLObjectDefinition={GridMLObjectProductAttrDefinition}
                                RequirePermission={PIE_REQUEST_PRODUCT_ATTR_VIEW}
                                DeletePermission={PIE_REQUEST_PRODUCT_ATTR_DELETE}
                                colspan="12"
                                IsAutoPaging={true}
                                RowsPerPage={10}
                                IsAdd={ this.CheckPermissionUser(12)}
                                IsDelete={ this.CheckPermissionUser(12) }
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
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
        callGetCache: (cacheKeyID) => {
            return dispatch(callGetCache(cacheKeyID));
        }
    }
}

const Attribute = connect(mapStateToProps, mapDispatchToProps)(AttributeCom);
export default Attribute;
