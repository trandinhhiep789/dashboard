import React from "react";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { ModalManager } from 'react-dynamic-modal';
import { MessageModal } from "../../../../common/components/Modal";
import InputGrid from "../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
import { GetMLObjectData, } from "../../../../common/library/form/FormLib";


import "../../../../../node_modules/react-datetime/css/react-datetime.css";
import { showModal } from '../../../../actions/modal';
import { MODAL_TYPE_NOTIFICATION, MODAL_TYPE_CONFIRMATION } from '../../../../constants/actionTypes';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import {
    GridColumnList,
    GridMLObjectDefinition,
    ModalMLObjectDefinition,
    AddAPIPath,
    APIHostName,
    SearchAPIPath,
    DeleteAPIPath,
    IDSelectColumnName,
    PKColumnName,
    InitSearchParams,
    PagePath,
    UpdateAPIPath,
    AddModalColumnList,
    ModifyModalColumnList,
} from "./constants";
import { PIE_REQUEST_PRODUCT_PART_VIEW, PIE_REQUEST_PRODUCT_PART_DELETE } from "../../../../constants/functionLists";

class PartnerCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputGridInsert = this.handleInputGridInsert.bind(this);
        this.handleInputGridEdit = this.handleInputGridEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.callSearchData = this.callSearchData.bind(this);
        this.addNotification = this.addNotification.bind(this);
        this.state = {
            gridDataSource: [],
            IsCallAPIError: false,
            IsCloseForm: false,
            FormData: {},
            SearchData: InitSearchParams,
            PieRequestListID: "",
            DataSourcePieRequest:[]
        };
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        this.props.updatePagePath(PagePath);
        let searchParams = InitSearchParams.slice();
        searchParams.push({
            SearchKey: "@PIEREQUESTLISTID",
            SearchValue: this.props.match.params.pierequestlistid.trim()
        })
        this.setState({
            PieRequestListID: this.props.match.params.pierequestlistid.trim(),
            SearchData: searchParams
        });
        this.callSearchData(searchParams);

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

    handleInputGridInsert(MLObjectDefinition, modalElementList, dataSource) {
        this.props.showModal(MODAL_TYPE_CONFIRMATION, {
            title: 'Thêm mới Đối tác của sản phẩm',
            onConfirm: (isConfirmed, formData) => {
                if (isConfirmed) {
                    let MLObject = GetMLObjectData(MLObjectDefinition, formData, dataSource);
                    if (MLObject) {
                        MLObject.PieRequestListID = this.props.match.params.pierequestlistid.trim();
                        MLObject.CreatedUser = this.props.AppInfo.LoginInfo.Username;
                        MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID
                        this.props.callFetchAPI(APIHostName, AddAPIPath, MLObject).then((apiResult) => {
                            if (!apiResult.IsError) {
                                this.callSearchData(this.state.SearchData);
                            }
                            this.setState({ IsCallAPIError: apiResult.IsError });
                            this.addNotification(apiResult.Message, apiResult.IsError);
                            //this.showMessage(apiResult.Message);
                        });
                    }
                }
            },
            modalElementList: modalElementList
        });
    }

    handleInputGridEdit(MLObjectDefinition, modalElementList, dataSource, formData) {
        this.props.showModal(MODAL_TYPE_CONFIRMATION, {
            title: 'Chỉnh sửa Đối tác của sản phẩm',
            onConfirm: (isConfirmed, formData) => {
                if (isConfirmed) {
                    const MLObject = GetMLObjectData(MLObjectDefinition, formData, dataSource);
                    MLObject.PieRequestListID = this.props.match.params.pierequestlistid.trim();
                    MLObject.UpdatedUser = this.props.AppInfo.LoginInfo.Username;
                    MLObject.LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID
                    this.props.callFetchAPI(APIHostName, UpdateAPIPath, MLObject).then((apiResult) => {
                        if (!apiResult.IsError) {
                            this.callSearchData(this.state.SearchData);
                        }
                        this.setState({ IsCallAPIError: apiResult.IsError });
                        this.addNotification(apiResult.Message, apiResult.IsError);
                        //this.showMessage(apiResult.Message);
                    });
                }
            },
            modalElementList: modalElementList,
            formData: formData
        });
    }

    handleDelete(deleteList) {
        let listProductMap = [];
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
                        row.DeletedUser = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
                        listProductMap.push(row);
                    }
                }
            });
        });

        this.props.callFetchAPI(APIHostName, DeleteAPIPath, listProductMap).then((apiResult) => {
            if (!apiResult.IsError) {
                this.callSearchData(this.state.SearchData);
            }
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.addNotification(apiResult.Message, apiResult.IsError);
        });
    }

    handleDeleteAll() {
        this.props.callFetchAPI(APIHostName, DeleteAPIPath, this.state.gridDataSource).then((apiResult) => {
            if (!apiResult.IsError) {
                this.callSearchData(this.state.SearchData);
            }
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.addNotification(apiResult.Message, apiResult.IsError);
        }
        );
    }

    valueChangeInputGrid() {
        console.log("valueChangeInputGrid");
    }

    callSearchData(searchData) {
        this.props.callFetchAPI(APIHostName, SearchAPIPath, searchData).then((apiResult) => {
            if (!apiResult.IsError) {
                this.setState({
                    gridDataSource: apiResult.ResultObject,
                    IsCallAPIError: apiResult.IsError,
                })
            }
        });
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

    addNotification(message1, IsError) {
        let cssNotification = "";
        let iconNotification = "";
        if (!IsError) {
            cssNotification = "notification-custom-success";
            iconNotification = "fa fa-check";
        }
        else {
            cssNotification = "notification-danger";
            iconNotification = "fa fa-exclamation";
        }
        this.notificationDOMRef.current.addNotification({
            container: "bottom-right",
            content: (
                <div className={cssNotification}>
                    <div className="notification-custom-icon">
                        <i className={iconNotification} />
                    </div>
                    <div className="notification-custom-content">
                        <div className="notification-close"><span>×</span></div>
                        <h4 className="notification-title">Thông Báo</h4>
                        <p className="notification-message">{message1}</p>
                    </div>
                </div>
            ),
            dismiss: { duration: 6000 },
            dismissable: { click: true }
        });
    }

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <div className="col-md-9 col-lg-10">
                    <div className="card">
                        <header className="card-header">
                            <h4 className="card-title"><strong>Đối tác của sản phẩm</strong></h4>
                        </header>
                        <div className="card-body">
                            <InputGrid name="LstProduct_Part" controltype="GridControl"
                                listColumn={GridColumnList}
                                dataSource={this.state.gridDataSource}
                                MLObjectDefinition={GridMLObjectDefinition}
                                IDSelectColumnName={IDSelectColumnName}
                                modalElementList={AddModalColumnList}
                                modifyModalElementList={ModifyModalColumnList}
                                modalMLObjectDefinition={ModalMLObjectDefinition}
                                onInsertClick={this.handleInputGridInsert}
                                onDeleteClick_Customize={this.handleDelete}
                                onDeleteAll={this.handleDeleteAll}
                                onhandleEditClick={this.handleInputGridEdit}
                                onValueChangeInputGrid={this.valueChangeInputGrid}
                                PKColumnName="CustomerID,PartnerProductMapTypeID,PartnerProductCode"
                                // RequirePermission={PIE_REQUEST_PRODUCT_PART_VIEW}
                                // DeletePermission={PIE_REQUEST_PRODUCT_PART_DELETE}
                                RowsPerPage={10}
                                colspan="12"
                                IsShowRowNull={true}
                                isHideHeaderToolbar={false}
                                IsAutoPaging={false}
                                IsAdd={ this.CheckPermissionUser(16)}
                                IsDelete={ this.CheckPermissionUser(16) }
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
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        }

    }
}

const Partner = connect(mapStateToProps, mapDispatchToProps)(PartnerCom);
export default Partner;
