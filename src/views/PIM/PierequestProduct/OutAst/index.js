import React from "react";
import { connect } from 'react-redux';
import { APIHostName, AddAPIPath, UpdateAPIPath, SearchAPIPath, DeleteAPIPath, GridProductOutAstColumnList, EditObjectDefinition, PKColumnName, InitSearchParams, PagePath } from "./constants";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { callGetCache } from "../../../../actions/cacheAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { ModalManager } from 'react-dynamic-modal';
import { MessageModal } from "../../../../common/components/Modal";
import InputGrid from "../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
import { PIE_REQUEST_PRODUCT_BARCODE_VIEW, PIE_REQUEST_PRODUCT_BARCODE_DELETE } from "../../../../constants/functionLists";
import { showModal, hideModal } from '../../../../actions/modal';
import { MODAL_TYPE_COMMONTMODALS } from '../../../../constants/actionTypes';
import EditOutAst from './components';
import "../../../../../node_modules/react-datetime/css/react-datetime.css";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

class OutAstCom extends React.Component {
    constructor(props) {
        super(props);
        this.showInputForm = this.showInputForm.bind(this);
        this.handleShowInputForm = this.handleShowInputForm.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.handleInputGridEdit = this.handleInputGridEdit.bind(this);
        this.handleInputGridDelete = this.handleInputGridDelete.bind(this);
        this.state = {
            CallAPIMessage: "",
            IsCallAPIError: false,
            IsCloseForm: false,
            IsEdit: false,
            PieRequestProductOutAst: {},
            gridDataSource: [],
            ListProductOutAst: [],
            FormData: {},
            SearchData: InitSearchParams,
            Listoption: "",
            DataSourcePieRequest:[]
        };
        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();

    }
    handleCloseMessage() {
        if (!this.state.IsCallAPIError) {
            this.callSearchData(this.state.SearchData);
        }
    }

    showMessage(message) {
        ModalManager.open(<MessageModal title="Thông báo"
            message={message} onRequestClose={() => true}
            onCloseModal={this.handleCloseMessage}
        />);
    }

    componentDidMount() {
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
        this.props.callFetchAPI(APIHostName, SearchAPIPath, InitSearchParams).then((apiResult) => {
            if (!apiResult.IsError) {
                this.setState({
                    gridDataSource: apiResult.ResultObject,
                    IsCallAPIError: apiResult.IsError,
                    ListProductOutAst: apiResult.ResultObject
                });
            }
        });
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
            dismiss: { duration: 6000 },
            dismissable: { click: true }
        });
    }

    handleDelete(deleteList) {
        this.props.callFetchAPI(APIHostName, DeleteAPIPath, deleteList).then((apiResult) => {
            //this.showMessage(apiResult.Message);
            this.addNotification(apiResult.Message, apiResult.IsError);
        }
        );
    }

    onInputChange(name, value) {
        let { PieRequestProductOutAst } = this.state;
        PieRequestProductOutAst[name.Name] = parseInt(name.Value);
        this.setState({ PieRequestProductOutAst: PieRequestProductOutAst }
        );
    }

    //show popup form nhập dữ liệu 
    handleShowInputForm() {
        this.state.PieRequestProductOutAst = {};
        this.setState({ IsEdit: false });
        this.setState({ PieRequestProductOutAst: this.state.PieRequestProductOutAst }, () => {
            this.showInputForm();
        });
    }

    //hiển thị form chỉnh sửa
    handleInputGridEdit(index) {
        this.setState({ IsEdit: true });
        this.setState({ PieRequestProductOutAst: this.state.gridDataSource[index] }, () => {
            this.showInputForm();
        });
    }

    //Xóa 
    handleInputGridDelete(deleteList) {
        let listProductOutAst = [];
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
                        listProductOutAst.push(row);
                    }
                }
            });
        });
        this.props.callFetchAPI(APIHostName, DeleteAPIPath, listProductOutAst).then((apiResult) => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.addNotification(apiResult.Message, apiResult.IsError);
            this.callSearchData(this.state.SearchData);
        });
    }

    showInputForm() {
        let CreatedUser = this.props.AppInfo.LoginInfo.Username;
        let LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;
        let IsEdit = this.state.IsEdit;
        let PieRequestListID = this.props.match.params.pierequestlistid;
        this.props.showModal(MODAL_TYPE_COMMONTMODALS, {
            title: 'Nhập thông tin',
            content: {
                text:
                    <EditOutAst
                        PieRequestProductOutAst={this.state.PieRequestProductOutAst}
                        CreatedUser={CreatedUser}
                        LoginLogID={LoginLogID}
                        IsEdit={IsEdit}
                        PieRequestListID={PieRequestListID}
                        OnComplete={(message,isError) => this.handleSearchSubmit(message, isError)}
                    >
                    </EditOutAst>
            }
        });
    }

    handleSearchSubmit(message, isError) {
        this.addNotification(message, isError);
        this.callSearchData(this.state.SearchData);
    }

    render() {
        return (
            <React.Fragment>
                <ReactNotification ref={this.notificationDOMRef} />
                <div className="col-md-9 col-lg-10">
                    <div className="card">
                        <header className="card-header">
                            <h4 className="card-title"><strong>Xuất khác nơi tồn kho</strong></h4>
                        </header>
                        <div className="card-body">
                            <InputGrid
                                name="ListProductOutAst"
                                controltype="GridControl"
                                listColumn={GridProductOutAstColumnList}
                                isHideHeaderToolbar={false}
                                IDSelectColumnName="chkSelect"
                                PKColumnName={PKColumnName}
                                dataSource={this.state.gridDataSource}
                                value={this.state.gridDataSource}
                                onInsertClick={this.handleShowInputForm}
                                onInsertClickEdit={this.handleInputGridEdit}
                                onDeleteClick_Customize={this.handleInputGridDelete}
                                MLObjectDefinition={EditObjectDefinition}
                                //RequirePermission={PIE_REQUEST_PRODUCT_BARCODE_VIEW}
                                //DeletePermission={PIE_REQUEST_PRODUCT_BARCODE_DELETE}
                                colspan="12"
                                IsAutoPaging={true}
                                RowsPerPage={10}
                                IsAdd={ this.CheckPermissionUser(15)}
                                IsDelete={ this.CheckPermissionUser(15) }
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
        },
        showModal: (type, props) => {
            dispatch(showModal(type, props));
        }
    }
}

const OutAst = connect(mapStateToProps, mapDispatchToProps)(OutAstCom);
export default OutAst;
