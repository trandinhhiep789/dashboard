import React from "react";
import { connect } from 'react-redux';
import {
    UpdateAPIPath,
    InputProductBarCodeColumnList,
    GridMLObjectProductBarCodeDefinition,
    AddAPIPath,
    APIHostName,
    SearchByPieRequestListIdAPIPath,
    DeleteAPIPath,
    PKColumnName,
    InitSearchParams,
    PagePath,
    InitPieRequestProductBarCode
} from "./constants";
import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { updatePagePath } from "../../../../actions/pageAction";
import { ModalManager } from 'react-dynamic-modal';
import ModelContainer from "../../../../common/components/Modal/ModelContainer";
import { MessageModal } from "../../../../common/components/Modal";
import InputGrid from "../../../../common/components/Form/AdvanceForm/FormControl/InputGrid";
import { PIE_REQUEST_PRODUCT_BARCODE_VIEW, PIE_REQUEST_PRODUCT_BARCODE_DELETE } from "../../../../constants/functionLists";
import FormControl from "../../../../common/components/Form/AdvanceForm/FormControl";

import "../../../../../node_modules/react-datetime/css/react-datetime.css";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

class BarcodeCom extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleInputGridInsert = this.handleInputGridInsert.bind(this);
        this.handleBarCodeInsert = this.handleBarCodeInsert.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.handleDateTimeChange = this.handleDateTimeChange.bind(this)
        this.handleInputGridEdit = this.handleInputGridEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCloseMessage = this.handleCloseMessage.bind(this);
        this.addNotification = this.addNotification.bind(this);
        this.notification = this.notification.bind(this);
        this.state = {
            CallAPIMessage: "",
            gridDataSource: [],
            LstProduct_BarCode: [],
            IsCallAPIError: false,
            IsCloseForm: false,
            Isedit: false,
            FormData: {},
            PieRequest_Product_BarCode: InitPieRequestProductBarCode,
            SearchData: InitSearchParams,
            PieRequestListID: "",
            RequestDate: "",
            PieRequestID: "",
            IsOldValue: 0,
            PieRequestDate: "",
            isChecked: true,
            cssNotification: "",
            iconNotification: "",
            DataSourcePieRequest: []
        };

        this.searchref = React.createRef();
        this.notificationDOMRef = React.createRef();
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

    componentDidMount() {
        this.getPieRequestDateByID();
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
        this.props.callFetchAPI(APIHostName, SearchByPieRequestListIdAPIPath, InitSearchParams).then((apiResult) => {
            if (!apiResult.IsError) {
                this.setState({
                    gridDataSource: apiResult.ResultObject,
                    IsCallAPIError: apiResult.IsError,
                    LstProduct_BarCode: apiResult.ResultObject
                });
            }
        }
        );
    }

    // xóa barCode
    handleDelete(deleteList) {
        let listProductBarcode = [];
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
                        listProductBarcode.push(row);
                    }
                }
            });
        });

        this.props.callFetchAPI(APIHostName, DeleteAPIPath, listProductBarcode).then((apiResult) => {
            this.setState({ IsCallAPIError: apiResult.IsError });
            this.addNotification(apiResult.Message, apiResult.IsError);
            ModalManager.close();
            this.callSearchData();
        });
    }

    onChangeInput(name, value) {
        const PieRequest_Product_BarCode = Object.assign({}, this.state.PieRequest_Product_BarCode, { [name]: value });
        // this.setState({PieRequest_Product_BarCode: PieRequest_Product_BarCode});
        this.setState({ PieRequest_Product_BarCode: PieRequest_Product_BarCode }, () => {
            this.openBarCodeModal();
        });
    }

    handleDateTimeChange(moment) {
        let dateSelected = moment ? moment._d : null;
        let PieRequest_Product_BarCode = Object.assign({}, this.state.PieRequest_Product_BarCode);
        PieRequest_Product_BarCode.RequestDate = dateSelected;
        this.setState({ PieRequest_Product_BarCode: PieRequest_Product_BarCode }, () => {
            this.openBarCodeModal();
        });
    }

    //Barcode
    handleInputGridInsert() {
        this.setState({
            Isedit: false
        });
        this.setState({ PieRequest_Product_BarCode: InitPieRequestProductBarCode }, () => {
            this.openBarCodeModal();
        });
    }


    getPieRequestDateByID() {
        const strPieRequestID = this.props.match.params.id;
        this.props.callFetchAPI(APIHostName, "api/PieRequest/GetPieRequestDateById", strPieRequestID).then((apiResult) => {

            if (!apiResult.IsError) {
                this.setState({
                    PieRequestDate: apiResult.ResultObject.RequestDate,
                });
            }
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

    notification() {
        this.notificationDOMRef.current.addNotification({
            title: "Awesomeness",
            message: "Awesome Notifications!",
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"]
        });
    }

    // them barcode
    handleBarCodeInsert() {
        let Username = this.props.AppInfo.LoginInfo.Username;
        let PieRequestListID = this.props.match.params.pierequestlistid;
        let LoginLogID = JSON.parse(this.props.AppInfo.LoginInfo.TokenString).AuthenLogID;

        if (this.state.Isedit) {
            const IsOldValue = this.state.IsOldValue
            const PieRequest_Product_BarCode = Object.assign({},
                this.state.PieRequest_Product_BarCode,
                { "UpDatedUser": Username },
                { "IsOldValue": IsOldValue },
                { "CreatedUser": Username },
                { "RequestDate": this.state.PieRequestDate },
                { "PieRequestListID": PieRequestListID.trim() },
                { "LoginLogID": LoginLogID }
            )
            this.props.callFetchAPI(APIHostName, UpdateAPIPath, PieRequest_Product_BarCode).then((apiResult) => {
                if (!apiResult.IsError) {
                    this.setState({
                        IsCallAPIError: apiResult.IsError,
                    });

                }
                this.addNotification(apiResult.Message, apiResult.IsError);
                ModalManager.close();
                this.callSearchData();

            });
        }
        else {
            const IsOldValue = this.state.IsOldValue
            const PieRequest_Product_BarCode = Object.assign({},
                this.state.PieRequest_Product_BarCode,
                { "IsOldValue": IsOldValue },
                { "CreatedUser": Username },
                { "RequestDate": this.state.PieRequestDate },
                { "PieRequestListID": PieRequestListID.trim() },
                { "LoginLogID": LoginLogID }

            )
            this.props.callFetchAPI(APIHostName, AddAPIPath, PieRequest_Product_BarCode).then((apiResult) => {
                if (!apiResult.IsError) {
                    this.setState({
                        IsCallAPIError: apiResult.IsError,
                    });
                }
                this.addNotification(apiResult.Message, apiResult.IsError);
                ModalManager.close();
                this.callSearchData();
            });
        }
    }

    // cap nhay barcode
    handleInputGridEdit(index) {
        this.setState({ Isedit: true });
        this.setState({ PieRequest_Product_BarCode: this.state.LstProduct_BarCode[index] }, () => {
            this.openBarCodeModal();
        });
    }
    openBarCodeModal() {
        ModalManager.open(
            <ModelContainer
                title="Thêm Barcode"
                name="PieRequest_Product_BarCode"
                content={"Thêm Barcode sản phẩm thành công!"}
                onRequestClose={() => true}
                onChangeModal={this.handleBarCodeInsert}
            >
                <FormControl.TextBox name="BarCode" onValueChange={this.onChangeInput} colspan="9" labelcolspan="3" label="Mã BarCode:" placeholder="Mã barcode" componenttype="InputControl" value={this.state.PieRequest_Product_BarCode.BarCode} datasourcemember="BarCode" readonly={this.state.Isedit} />

                <FormControl.TextArea name="BarCodeDescription" rows="6" onValueChange={this.onChangeInput} colspan="9" labelcolspan="3" label="Mô tả barcode sản phẩm:" placeholder="Mô tả barcode sản phẩm" componenttype="InputControl" value={this.state.PieRequest_Product_BarCode.BarCodeDescription} datasourcemember="BarCodeDescription" />

                <FormControl.CheckBox name="IsActived" onValueChange={this.onChangeInput} colspan="9" labelcolspan="3" label="Kích hoạt:" placeholder="Kích hoạt" componenttype="InputControl" checked={this.state.isChecked} value={this.state.PieRequest_Product_BarCode.IsActived} datasourcemember="IsActived" />

            </ModelContainer>
        );

    }
    //End Barcode

    handleSearchSubmit(formData, MLObject) {
        const postData = [{
            SearchKey: "@Keyword",
            SearchValue: MLObject.Keyword
        }];
        this.setState({ SearchData: postData });
        this.callSearchData(postData);
        this.gridref.current.clearData();
    }

    render() {
        return (
            <React.Fragment>
                <div className="col-md-9 col-lg-10">
                    <ReactNotification ref={this.notificationDOMRef} />
                    {/* <button onClick={this.notification} className="btn btn-primary">
                        Add Awesome Notification
                    </button> */}
                    <div className="card">
                        <header className="card-header">
                            <h4 className="card-title"><strong>Barcode</strong></h4>
                        </header>
                        <div className="card-body">
                            <InputGrid
                                name="LstProduct_BarCode"
                                controltype="GridControl"
                                listColumn={InputProductBarCodeColumnList}
                                isHideHeaderToolbar={false}
                                IDSelectColumnName={"chkSelect"}
                                PKColumnName={PKColumnName}
                                dataSource={this.state.gridDataSource}
                                value={this.state.LstProduct_BarCode}
                                onInsertClick={this.handleInputGridInsert}
                                onInsertClickEdit={this.handleInputGridEdit}
                                onDeleteClick_Customize={this.handleDelete}
                                MLObjectDefinition={GridMLObjectProductBarCodeDefinition}
                                RequirePermission={PIE_REQUEST_PRODUCT_BARCODE_VIEW}
                                DeletePermission={PIE_REQUEST_PRODUCT_BARCODE_DELETE}
                                colspan="12"
                                IsAutoPaging={false}
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
        }

    }
}

const Barcode = connect(mapStateToProps, mapDispatchToProps)(BarcodeCom);
export default Barcode;
